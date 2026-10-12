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

Cada capítulo vive en `src/capitulos/<nn>-<tema>/` con sus cifras y fuentes en `data.ts`. Los componentes compartidos (gráficos, tarjetas, láminas) están en `src/components/` y la paleta en `src/theme.ts`.

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
npm run render   # -> out/cap01-chile-2026.mp4
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
