# videos_rrss

Proyecto Remotion dedicado a crear videos para redes sociales (formato vertical 1080×1920, 30 fps, ideal para Reels/TikTok/Shorts).

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

## Capítulos

| # | Composición | Tema | Guion y fuentes |
| --- | --- | --- | --- |
| 1 | `Cap01-Chile2026` | ¿Cómo está Chile en 2026? | [GUION.md](src/capitulos/01-chile-2026/GUION.md) |
| 2 | `Cap02-StolperSamuelson` | Cuando sube el cobre, ¿quién gana? | [GUION.md](src/capitulos/02-stolper-samuelson/GUION.md) |

Cada capítulo vive en `src/capitulos/<nn>-<tema>/`: el guion de la voz en `guion.json`, las cifras y fuentes en `data.ts` y las escenas en `escenas/`. Los componentes compartidos (estructura de capítulo, fondo animado, subtítulos, gráficos, ilustraciones y transiciones) están en `src/components/` y la paleta en `src/theme.ts`.

## Voz en off, música y efectos

La voz se genera localmente con [Kokoro](https://github.com/thewh1teagle/kokoro-onnx) (voz `em_alex` con fonética latinoamericana `es-419`), se procesa con ffmpeg para que suene más cálida y se verifica con Whisper vía [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx). Las animaciones se sincronizan con cada frase mediante `timeline.json`.

```console
pip install kokoro-onnx sherpa-onnx soundfile numpy

# Modelos (una sola vez), en una carpeta fuera del repo, p. ej. ~/modelos-voz
curl -L -o ~/modelos-voz/kokoro-v1.0.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
curl -L -o ~/modelos-voz/voices-v1.0.bin https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
curl -L https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.tar.bz2 | tar xj -C ~/modelos-voz

# Voz + línea de tiempo (con --verificar transcribe cada frase para revisar la pronunciación)
python3 scripts/narrar.py src/capitulos/01-chile-2026 public/cap01 ~/modelos-voz --verificar

# Música de fondo y efectos (sintetizados, sin derechos de autor)
python3 scripts/musica.py 136 public/cap01/musica.mp3 public/sfx
```

Otras voces Kokoro en español: `ef_dora` (femenina), `em_santa`. También funcionan voces Piper (`"motor": "piper"`, p. ej. `es_MX-claude-high`). Se cambia en `guion.json`.

### Voz con ElevenLabs (recomendada)

```console
export ELEVENLABS_API_KEY=...          # nunca la escribas en el repo
python3 scripts/voces_elevenlabs.py buscar chilean male     # voces con acento chileno
python3 scripts/voces_elevenlabs.py agregar <public_owner_id> <voice_id> "Narrador"
```

Luego, en `guion.json`: `"motor": "elevenlabs"`, `"voz": "<voice_id>"` y, opcionalmente, `"modelo"` y `"ajustes"` (stability, similarity_boost, style). Cada frase se genera con la anterior y la siguiente como contexto para que el relato fluya. El capítulo 1 usa unos 2.300 caracteres, dentro del plan gratis.

Para la voz más humana posible, graba la tuya leyendo el guion de `GUION.md` y reemplaza `narracion.mp3` (ajustando los tiempos de `timeline.json`).

## Commands

**Install Dependencies**

```console
npm i --loglevel=error
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npm run render   # -> out/cap01-chile-2026.mp4 (audio normalizado a -14 LUFS para redes)
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
