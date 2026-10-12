"""Genera la voz en off de un capítulo y la línea de tiempo que sincroniza el video.

Uso:
    python3 scripts/narrar.py <carpeta-capitulo> <carpeta-public> <carpeta-modelos> [--verificar]

Ejemplo:
    python3 scripts/narrar.py src/capitulos/01-chile-2026 public/cap01 ~/modelos-voz --verificar

Lee `guion.json` del capítulo, sintetiza cada frase y las une con pausas naturales. Escribe:
  - <carpeta-public>/narracion.mp3 : la voz completa, con un procesado suave (ecualización,
    compresión y un toque de sala) para que suene más cálida y menos sintética
  - <carpeta-capitulo>/timeline.json: inicio y fin de cada frase y escena, en segundos

Motores (campo "motor" del guion):
  - "kokoro": voz neuronal Kokoro v1.0 (por defecto em_alex, con fonética latinoamericana es-419)
  - "piper" : voces Piper vía sherpa-onnx (p. ej. es_MX-claude-high)
  - "elevenlabs": API de ElevenLabs. "voz" es el voice_id; lee la clave de la variable de entorno
    ELEVENLABS_API_KEY. Cada frase se genera con la anterior y la siguiente como contexto, para
    que la entonación fluya como un solo relato. Ver scripts/voces_elevenlabs.py para elegir voz.

Cada frase puede definir su propia "pausa" (segundos de silencio después) y "velocidad".
Con --verificar transcribe cada frase con Whisper para revisar que la pronunciación se entienda.

Requisitos: pip install kokoro-onnx sherpa-onnx soundfile numpy, y ffmpeg. Modelos: ver README.
Con ElevenLabs, <carpeta-modelos> solo se usa para Whisper (--verificar).
"""

import json
import os
import subprocess
import sys
import tempfile

import numpy as np
import soundfile as sf

# Solo empareja el volumen: para voces que ya suenan naturales (ElevenLabs).
PROCESADO_SUAVE = "highpass=f=60,loudnorm=I=-16:TP=-1.5:LRA=9"

# Cadena de procesado de la voz: quita graves de ruido, da cuerpo y presencia,
# empareja el volumen y agrega una sala muy corta para que no suene "en seco".
PROCESADO_VOZ = ",".join(
    [
        "highpass=f=75",
        "equalizer=f=170:t=q:w=1.0:g=2.5",
        "equalizer=f=3200:t=q:w=1.4:g=2",
        "equalizer=f=7500:t=q:w=2:g=-1.5",
        "acompressor=threshold=-20dB:ratio=2.5:attack=8:release=140:makeup=2",
        "aecho=0.85:0.5:22|37:0.10|0.06",
        "loudnorm=I=-16:TP=-1.5:LRA=9",
    ]
)


class Kokoro:
    def __init__(self, modelos: str, voz: str, idioma: str):
        from kokoro_onnx import Kokoro as Modelo

        self.modelo = Modelo(os.path.join(modelos, "kokoro-v1.0.onnx"), os.path.join(modelos, "voices-v1.0.bin"))
        self.voz, self.idioma, self.sample_rate = voz, idioma, 24000

    def decir(self, texto: str, velocidad: float, **_) -> np.ndarray:
        audio, self.sample_rate = self.modelo.create(texto, voice=self.voz, speed=velocidad, lang=self.idioma)
        return np.asarray(audio, dtype=np.float32)


class Piper:
    def __init__(self, modelos: str, voz: str):
        import sherpa_onnx

        carpeta = os.path.join(modelos, f"vits-piper-{voz}")
        config = sherpa_onnx.OfflineTtsConfig(
            model=sherpa_onnx.OfflineTtsModelConfig(
                vits=sherpa_onnx.OfflineTtsVitsModelConfig(
                    model=os.path.join(carpeta, f"{voz}.onnx"),
                    tokens=os.path.join(carpeta, "tokens.txt"),
                    data_dir=os.path.join(carpeta, "espeak-ng-data"),
                ),
                num_threads=4,
            )
        )
        self.tts = sherpa_onnx.OfflineTts(config)
        self.sample_rate = self.tts.sample_rate

    def decir(self, texto: str, velocidad: float, **_) -> np.ndarray:
        return np.asarray(self.tts.generate(texto, sid=0, speed=velocidad).samples, dtype=np.float32)


class ElevenLabs:
    URL = "https://api.elevenlabs.io/v1/text-to-speech/{voz}?output_format=mp3_44100_128"

    def __init__(self, voz: str, modelo: str, ajustes: dict):
        self.clave = os.environ.get("ELEVENLABS_API_KEY")
        if not self.clave:
            sys.exit("Falta la variable de entorno ELEVENLABS_API_KEY")
        self.voz, self.modelo, self.ajustes, self.sample_rate = voz, modelo, ajustes, 44100

    def decir(self, texto: str, velocidad: float, previo: str = "", siguiente: str = "") -> np.ndarray:
        import urllib.request

        cuerpo = {
            "text": texto,
            "model_id": self.modelo,
            "previous_text": previo,
            "next_text": siguiente,
            "voice_settings": {**self.ajustes, "speed": max(0.7, min(1.2, velocidad))},
        }
        pedido = urllib.request.Request(
            self.URL.format(voz=self.voz),
            data=json.dumps(cuerpo).encode(),
            headers={"xi-api-key": self.clave, "Content-Type": "application/json", "Accept": "audio/mpeg"},
        )
        with urllib.request.urlopen(pedido, timeout=120) as r:
            mp3 = r.read()
        # Decodifica el MP3 a muestras con ffmpeg.
        pcm = subprocess.run(
            ["ffmpeg", "-loglevel", "error", "-i", "pipe:0", "-f", "f32le", "-ac", "1", "-ar", str(self.sample_rate), "pipe:1"],
            input=mp3,
            capture_output=True,
            check=True,
        ).stdout
        return np.frombuffer(pcm, dtype=np.float32).copy()


def cargar_transcriptor(modelos: str):
    import sherpa_onnx

    carpeta = os.path.join(modelos, "sherpa-onnx-whisper-small")
    return sherpa_onnx.OfflineRecognizer.from_whisper(
        encoder=os.path.join(carpeta, "small-encoder.int8.onnx"),
        decoder=os.path.join(carpeta, "small-decoder.int8.onnx"),
        tokens=os.path.join(carpeta, "small-tokens.txt"),
        language="es",
        num_threads=4,
    )


def transcribir(rec, audio: np.ndarray, sr: int) -> str:
    n = int(len(audio) * 16000 / sr)
    audio16 = np.interp(np.linspace(0, len(audio) - 1, n), np.arange(len(audio)), audio).astype(np.float32)
    stream = rec.create_stream()
    stream.accept_waveform(16000, audio16)
    rec.decode_stream(stream)
    return stream.result.text.strip()


def recortar_silencio(audio: np.ndarray, sr: int, umbral: float = 0.006) -> np.ndarray:
    activos = np.where(np.abs(audio) > umbral)[0]
    if len(activos) == 0:
        return audio
    inicio = max(0, activos[0] - int(0.06 * sr))
    fin = min(len(audio), activos[-1] + int(0.15 * sr))
    return audio[inicio:fin]


def guardar_voz(archivo: str, audio: np.ndarray, sr: int, procesado: str = PROCESADO_VOZ) -> None:
    with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
        sf.write(tmp.name, audio, sr)
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", tmp.name, "-af", procesado, "-ar", "44100", "-b:a", "192k", archivo],
            check=True,
        )


def main() -> None:
    capitulo, publico, modelos = sys.argv[1:4]
    modelos = os.path.expanduser(modelos)
    verificar = "--verificar" in sys.argv
    with open(os.path.join(capitulo, "guion.json"), encoding="utf-8") as f:
        guion = json.load(f)

    motor = guion.get("motor", "piper")
    if motor == "elevenlabs":
        voz = ElevenLabs(guion["voz"], guion.get("modelo", "eleven_multilingual_v2"), guion.get("ajustes", {}))
    elif motor == "kokoro":
        voz = Kokoro(modelos, guion["voz"], guion.get("idioma", "es-419"))
    else:
        voz = Piper(modelos, guion["voz"])
    rec = cargar_transcriptor(modelos) if verificar else None

    piezas: list[np.ndarray] = []
    t = 0.25  # pequeño respiro antes de la primera palabra
    escenas, frases = [], []
    sr = None

    todas = [f["dice"] for e in guion["escenas"] for f in e["frases"]]
    k = 0
    for escena in guion["escenas"]:
        inicio_escena = t
        for i, frase in enumerate(escena["frases"]):
            previo = todas[k - 1] if k > 0 else ""
            siguiente = todas[k + 1] if k + 1 < len(todas) else ""
            k += 1
            muestras = voz.decir(frase["dice"], frase.get("velocidad", guion["velocidad"]), previo=previo, siguiente=siguiente)
            sr = voz.sample_rate
            if not piezas:
                piezas.append(np.zeros(int(t * sr), dtype=np.float32))
            muestras = recortar_silencio(muestras, sr)
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
            pausa = frase.get("pausa", guion["pausaEscena"] if ultima else guion["pausaFrase"])
            if ultima:
                pausa = max(pausa, guion["pausaEscena"])
            piezas.append(np.zeros(int(pausa * sr), dtype=np.float32))
            t += pausa
            if rec is not None:
                print(f"[{escena['id']}] {frase['dice']}\n    → {transcribir(rec, muestras, sr)}")
        escenas.append({"id": escena["id"], "inicio": round(inicio_escena, 3), "fin": round(t, 3)})

    narracion = np.concatenate(piezas)
    narracion = narracion / max(1e-6, np.max(np.abs(narracion))) * 0.89
    os.makedirs(publico, exist_ok=True)
    guardar_voz(os.path.join(publico, "narracion.mp3"), narracion, sr, PROCESADO_SUAVE if motor == "elevenlabs" else PROCESADO_VOZ)

    with open(os.path.join(capitulo, "timeline.json"), "w", encoding="utf-8") as f:
        json.dump({"duracion": round(t, 3), "escenas": escenas, "frases": frases}, f, ensure_ascii=False, indent=1)
    print(f"Narración: {t:.1f} s en {len(frases)} frases")


if __name__ == "__main__":
    main()
