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
| 3 | `Cap03-InflacionAutonomia` | ¿Quién tiene la culpa de la inflación? | [GUION.md](src/capitulos/03-inflacion-autonomia/GUION.md) |
| 4 | `Cap04-ZanjaFrontera` | La zanja de la frontera norte | [GUION.md](src/capitulos/04-zanja-frontera/GUION.md) |
| 5 | `Cap05-ApuestaAFP` | La apuesta de las AFP (swaps y fondo E) | [GUION.md](src/capitulos/05-apuesta-afp/GUION.md) |
| 6 | `Cap06-QuienGana` | ¿Quién gana cuando el fondo pierde? (incentivos y política) | [GUION.md](src/capitulos/06-quien-gana/GUION.md) |

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
npm run render -- Cap04-ZanjaFrontera cap04-zanja-frontera
# -> out/cap04-zanja-frontera.mp4 y out/cap04-zanja-frontera-movil.mp4
#    (un solo .mp4 con video y audio: -14 LUFS, 48 kHz, faststart)
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

## Be&Go (horizontal 1920×1080)

| Composición | Tema | Guion |
|---|---|---|
| `BeGo-MVP` | Diseño del primer MVP del copiloto de viaje: funciones, pantallas, arquitectura de agentes y plan | [guion.json](src/capsulas/beandgo-mvp/guion.json) |
| `BeGo-Estado` | Estado del MVP al 8-nov-2026: números medidos, qué puede y qué no, capturas reales del iPhone, cómo encenderla | [guion.json](src/capsulas/beandgo-estado/guion.json) |
| `BeGo-App` | Qué es Be&Go y cómo se ve la app nativa de iPhone según el diseño de Figma (10-nov-2026): Inicio, veredicto, combinación, copiloto, viaje en bus con Live Activity, mapa y resumen | [guion.json](src/capsulas/beandgo-app/guion.json) |

Usa el estilo `src/estilos/beandgo/` (identidad de la app: copihue, azul noche, Nunito Sans). Las cifras de las pantallas de ejemplo son ilustrativas y van rotuladas como tales.

`BeGo-App` usa en cambio el kit `src/capsulas/beandgo-app/ios.tsx`, copiado de `DESIGN.md` y `Theme.swift` de la app iOS (fondo crema, tarjetas de radio 28, copihue como único color de acción) y las 29 ilustraciones propias de `ios/BeGo/Resources/Assets.xcassets/Illustrations` en `public/beandgo-app/art/`. SF Pro no se puede usar fuera de Apple: Nunito hace de SF Rounded e Inter de SF Pro Text. Cada pantalla va rotulada: "según Figma" (armada para el video con datos del repo) o "captura real".

```console
npm run render -- BeGo-MVP beandgo-mvp
npm run render -- BeGo-Estado beandgo-estado
npm run render -- BeGo-App beandgo-app
```

## Cápsulas técnicas

Serie aparte, para profesionales que trabajan en IA. Misma tubería (guion → narración → escenas), carpeta `src/capsulas/`.

| # | Composición | Tema | Guion |
|---|---|---|---|
| 01 | `Tec01-AnatomiaIA` | Anatomía de un proyecto de IA: las 5 capas y por qué el RAG acelera | [GUION.md](src/capsulas/01-anatomia-ia/GUION.md) |
| 02 | `Tec02-AgenteGrafo` | El agente como grafo de estados y cómo conversa con frontend, backend y nube | [GUION.md](src/capsulas/02-agente-grafo/GUION.md) |
