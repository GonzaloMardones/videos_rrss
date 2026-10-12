"""Genera la voz en off de un capítulo y la línea de tiempo que sincroniza el video.

Uso:
    python3 scripts/narrar.py <carpeta-capitulo> <carpeta-public> <carpeta-modelos> [--verificar]

Ejemplo:
    python3 scripts/narrar.py src/capitulos/01-chile-2026 public/cap01 ~/modelos-voz --verificar

Lee `guion.json` del capítulo, sintetiza cada frase con una voz Piper (vía sherpa-onnx),
las une con pausas y escribe:
  - <carpeta-public>/narracion.mp3 : la voz completa
  - <carpeta-capitulo>/timeline.json: inicio y fin de cada frase y escena, en segundos

Con --verificar transcribe cada frase con Whisper para revisar que la pronunciación se entienda.
Requisitos: pip install sherpa-onnx soundfile numpy. Modelos: ver README.
"""

import json
import os
import sys

import numpy as np
import sherpa_onnx
import soundfile as sf


def guardar(archivo: str, audio, sr: int = 44100) -> None:
    """Guarda en WAV o, si el nombre termina en .mp3, comprime con ffmpeg para no inflar el repo."""
    if not archivo.endswith(".mp3"):
        sf.write(archivo, audio, sr)
        return
    import subprocess
    import tempfile

    with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
        sf.write(tmp.name, audio, sr)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", tmp.name, "-b:a", "192k", archivo], check=True)


def cargar_voz(modelos: str, nombre: str) -> sherpa_onnx.OfflineTts:
    carpeta = os.path.join(modelos, f"vits-piper-{nombre}")
    config = sherpa_onnx.OfflineTtsConfig(
        model=sherpa_onnx.OfflineTtsModelConfig(
            vits=sherpa_onnx.OfflineTtsVitsModelConfig(
                model=os.path.join(carpeta, f"{nombre}.onnx"),
                tokens=os.path.join(carpeta, "tokens.txt"),
                data_dir=os.path.join(carpeta, "espeak-ng-data"),
            ),
            num_threads=4,
        )
    )
    return sherpa_onnx.OfflineTts(config)


def cargar_transcriptor(modelos: str) -> sherpa_onnx.OfflineRecognizer:
    carpeta = os.path.join(modelos, "sherpa-onnx-whisper-small")
    return sherpa_onnx.OfflineRecognizer.from_whisper(
        encoder=os.path.join(carpeta, "small-encoder.int8.onnx"),
        decoder=os.path.join(carpeta, "small-decoder.int8.onnx"),
        tokens=os.path.join(carpeta, "small-tokens.txt"),
        language="es",
        num_threads=4,
    )


def transcribir(rec: sherpa_onnx.OfflineRecognizer, audio: np.ndarray, sr: int) -> str:
    n = int(len(audio) * 16000 / sr)
    audio16 = np.interp(np.linspace(0, len(audio) - 1, n), np.arange(len(audio)), audio).astype(np.float32)
    stream = rec.create_stream()
    stream.accept_waveform(16000, audio16)
    rec.decode_stream(stream)
    return stream.result.text.strip()


def recortar_silencio(audio: np.ndarray, umbral: float = 0.01) -> np.ndarray:
    activos = np.where(np.abs(audio) > umbral)[0]
    if len(activos) == 0:
        return audio
    inicio = max(0, activos[0] - int(0.06 * 22050))
    fin = min(len(audio), activos[-1] + int(0.08 * 22050))
    return audio[inicio:fin]


def main() -> None:
    capitulo, publico, modelos = sys.argv[1:4]
    verificar = "--verificar" in sys.argv
    with open(os.path.join(capitulo, "guion.json"), encoding="utf-8") as f:
        guion = json.load(f)

    voz = cargar_voz(os.path.expanduser(modelos), guion["voz"])
    rec = cargar_transcriptor(os.path.expanduser(modelos)) if verificar else None
    sr = voz.sample_rate

    piezas: list[np.ndarray] = []
    t = 0.25  # pequeño respiro antes de la primera palabra
    piezas.append(np.zeros(int(t * sr), dtype=np.float32))
    escenas, frases = [], []

    for escena in guion["escenas"]:
        inicio_escena = t
        for i, frase in enumerate(escena["frases"]):
            audio = voz.generate(frase["dice"], sid=0, speed=guion["velocidad"])
            muestras = recortar_silencio(np.array(audio.samples, dtype=np.float32))
            duracion = len(muestras) / sr
            frases.append(
                {
                    "escena": escena["id"],
                    "inicio": round(t, 3),
                    "fin": round(t + duracion, 3),
                    "texto": frase["muestra"],
                    "cue": frase.get("cue"),
                }
            )
            piezas.append(muestras)
            t += duracion
            ultima = i == len(escena["frases"]) - 1
            pausa = guion["pausaEscena"] if ultima else guion["pausaFrase"]
            piezas.append(np.zeros(int(pausa * sr), dtype=np.float32))
            t += pausa
            if rec is not None:
                print(f"[{escena['id']}] {frase['dice']}\n    → {transcribir(rec, muestras, sr)}")
        escenas.append({"id": escena["id"], "inicio": round(inicio_escena, 3), "fin": round(t, 3)})

    narracion = np.concatenate(piezas)
    # Normaliza a -1 dBFS para que todas las voces suenen parejas.
    narracion = narracion / max(1e-6, np.max(np.abs(narracion))) * 0.89
    os.makedirs(publico, exist_ok=True)
    guardar(os.path.join(publico, "narracion.mp3"), narracion, sr)

    with open(os.path.join(capitulo, "timeline.json"), "w", encoding="utf-8") as f:
        json.dump({"duracion": round(t, 3), "escenas": escenas, "frases": frases}, f, ensure_ascii=False, indent=1)
    print(f"Narración: {t:.1f} s en {len(frases)} frases")


if __name__ == "__main__":
    main()
