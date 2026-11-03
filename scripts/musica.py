"""Sintetiza la música de fondo y los efectos de sonido (sin samples externos ni derechos de autor).

Uso:
    python3 scripts/musica.py <segundos> <archivo-musica.wav> <carpeta-sfx>

Ejemplo:
    python3 scripts/musica.py 110 public/cap01/musica.mp3 public/sfx

Música: base lo-fi a 96 BPM (Am7 – Fmaj7 – Cmaj7 – G6) con pad, arpegio, bombo suave y shaker.
Efectos: whoosh.wav (transición), pop.wav (aparece una cifra), rise.wav (remate).
"""

import os
import sys

import numpy as np
import soundfile as sf

SR = 44100
BPM = 96
BEAT = 60 / BPM

ACORDES = [  # notas MIDI
    [57, 60, 64, 67],  # Am7
    [53, 57, 60, 64],  # Fmaj7
    [48, 52, 55, 59],  # Cmaj7
    [55, 59, 62, 64],  # G6
]


def guardar(archivo: str, audio, sr: int = SR) -> None:
    """Guarda en WAV o, si el nombre termina en .mp3, comprime con ffmpeg para no inflar el repo."""
    if not archivo.endswith(".mp3"):
        sf.write(archivo, audio, sr)
        return
    import subprocess
    import tempfile

    with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
        sf.write(tmp.name, audio, sr)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", tmp.name, "-b:a", "192k", archivo], check=True)


def hz(nota: int) -> float:
    return 440.0 * 2 ** ((nota - 69) / 12)


def lowpass(x: np.ndarray, corte: float) -> np.ndarray:
    a = np.exp(-2 * np.pi * corte / SR)
    y = np.empty_like(x)
    prev = 0.0
    for i, v in enumerate(x):
        prev = (1 - a) * v + a * prev
        y[i] = prev
    return y


def pad(nota: int, dur: float) -> np.ndarray:
    t = np.arange(int(dur * SR)) / SR
    f = hz(nota)
    onda = sum(np.sin(2 * np.pi * f * d * t + d) for d in (0.997, 1.0, 1.003)) / 3
    onda += 0.25 * np.sin(2 * np.pi * 2 * f * t)
    env = np.minimum(1, t / 0.6) * np.minimum(1, (dur - t) / 0.8)
    return onda * env


def pluck(nota: int, dur: float) -> np.ndarray:
    t = np.arange(int(dur * SR)) / SR
    f = hz(nota)
    return (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * 3 * f * t)) * np.exp(-t * 7)


def bombo() -> np.ndarray:
    t = np.arange(int(0.35 * SR)) / SR
    f = 45 + 75 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)


def shaker(rng: np.random.Generator) -> np.ndarray:
    n = int(0.08 * SR)
    ruido = rng.standard_normal(n)
    ruido = ruido - lowpass(ruido, 5000)  # deja solo los agudos
    return ruido * np.exp(-np.arange(n) / SR * 45)


def mezclar(dest: np.ndarray, src: np.ndarray, inicio: float, gan: float) -> None:
    i = int(inicio * SR)
    if i >= len(dest):
        return
    fin = min(len(dest), i + len(src))
    dest[i:fin] += src[: fin - i] * gan


def musica(segundos: float) -> np.ndarray:
    rng = np.random.default_rng(7)
    n = int(segundos * SR)
    izq, der = np.zeros(n), np.zeros(n)
    compas = 4 * BEAT
    t, k = 0.0, 0
    while t < segundos:
        acorde = ACORDES[k % len(ACORDES)]
        for j, nota in enumerate(acorde):
            p = pad(nota, compas * 2 + 0.6)
            mezclar(izq, p, t, 0.05 * (1.1 if j % 2 else 0.9))
            mezclar(der, p, t, 0.05 * (0.9 if j % 2 else 1.1))
        arpegio = acorde + [acorde[1] + 12, acorde[2] + 12, acorde[3] + 12, acorde[2] + 12]
        for b in range(16):  # corcheas en dos compases
            nota = arpegio[b % len(arpegio)] + 12
            s = pluck(nota, 0.6)
            mezclar(izq if b % 2 else der, s, t + b * BEAT / 2, 0.035)
        for b in range(8):
            if b % 2 == 0:
                mezclar(izq, bombo(), t + b * BEAT, 0.22)
                mezclar(der, bombo(), t + b * BEAT, 0.22)
            s = shaker(rng)
            mezclar(izq, s, t + b * BEAT + BEAT / 2, 0.05)
            mezclar(der, s, t + b * BEAT + BEAT / 2 + 0.01, 0.05)
        t += compas * 2
        k += 1
    estereo = np.stack([izq, der], axis=1)
    tt = np.arange(n) / SR
    fade = np.minimum(1, tt / 2.0) * np.minimum(1, (segundos - tt) / 3.0)
    estereo *= fade[:, None]
    return estereo / np.max(np.abs(estereo)) * 0.8


def whoosh() -> np.ndarray:
    rng = np.random.default_rng(3)
    dur = 0.55
    n = int(dur * SR)
    t = np.arange(n) / SR
    ruido = rng.standard_normal(n)
    corte = 300 + 5000 * np.sin(np.pi * t / dur) ** 2
    y, prev = np.empty(n), 0.0
    for i in range(n):
        a = np.exp(-2 * np.pi * corte[i] / SR)
        prev = (1 - a) * ruido[i] + a * prev
        y[i] = prev
    y *= np.sin(np.pi * t / dur) ** 1.5
    return y / np.max(np.abs(y)) * 0.7


def pop() -> np.ndarray:
    t = np.arange(int(0.18 * SR)) / SR
    f = 600 + 900 * np.exp(-t * 40)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 28)
    return y / np.max(np.abs(y)) * 0.6


def rise() -> np.ndarray:
    dur = 1.2
    t = np.arange(int(dur * SR)) / SR
    f = 220 * 2 ** (t / dur * 2)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * (t / dur) ** 2 * np.minimum(1, (dur - t) / 0.05)
    return y / np.max(np.abs(y)) * 0.5


def main() -> None:
    segundos, archivo, sfx = float(sys.argv[1]), sys.argv[2], sys.argv[3]
    os.makedirs(os.path.dirname(archivo), exist_ok=True)
    os.makedirs(sfx, exist_ok=True)
    guardar(archivo, musica(segundos))
    sf.write(os.path.join(sfx, "whoosh.wav"), whoosh(), SR)
    sf.write(os.path.join(sfx, "pop.wav"), pop(), SR)
    sf.write(os.path.join(sfx, "rise.wav"), rise(), SR)
    print("Listo:", archivo, sfx)


if __name__ == "__main__":
    main()
