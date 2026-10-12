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

Cada capítulo vive en `src/capitulos/<nn>-<tema>/`: el guion de la voz en `guion.json`, las cifras y fuentes en `data.ts` y las escenas en `escenas/`. Los componentes compartidos (fondo animado, subtítulos, gráficos, transiciones) están en `src/components/` y la paleta en `src/theme.ts`.

## Voz en off, música y efectos

La voz se genera localmente con una voz neuronal Piper (`es_MX-claude-high`) a través de [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx), y se verifica con Whisper. Las animaciones se sincronizan con cada frase mediante `timeline.json`.

```console
pip install sherpa-onnx soundfile numpy

# Modelos (una sola vez), en una carpeta fuera del repo, p. ej. ~/modelos-voz
for m in tts-models/vits-piper-es_MX-claude-high asr-models/sherpa-onnx-whisper-small; do
  curl -L "https://github.com/k2-fsa/sherpa-onnx/releases/download/$m.tar.bz2" | tar xj -C ~/modelos-voz
done

# Voz + línea de tiempo (con --verificar transcribe cada frase para revisar la pronunciación)
python3 scripts/narrar.py src/capitulos/01-chile-2026 public/cap01 ~/modelos-voz --verificar

# Música de fondo y efectos (sintetizados, sin derechos de autor)
python3 scripts/musica.py 112 public/cap01/musica.mp3 public/sfx
```

Otras voces disponibles en el mismo formato: `es_AR-daniela-high` (femenina), `es_MX-ald-medium`. Se cambia en `guion.json` (`"voz"`).

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
