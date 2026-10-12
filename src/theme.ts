// Fuentes empaquetadas en el proyecto (no dependen de internet al renderizar).
import "@fontsource/inter-tight/400.css";
import "@fontsource/inter-tight/500.css";
import "@fontsource/inter-tight/600.css";
import "@fontsource/inter-tight/700.css";
import "@fontsource/inter-tight/800.css";
import "@fontsource/inter-tight/900.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";

import { continueRender, delayRender } from "remotion";

// Espera a que las fuentes estén listas antes de capturar cualquier frame.
const fontsHandle = delayRender("Cargando fuentes");
Promise.all(
  [
    "400 32px 'Inter Tight'",
    "700 32px 'Inter Tight'",
    "800 32px 'Inter Tight'",
    "900 32px 'Inter Tight'",
    "italic 400 32px 'Instrument Serif'",
  ].map((font) => document.fonts.load(font)),
).then(
  () => continueRender(fontsHandle),
  () => continueRender(fontsHandle),
);

export const fonts = {
  sans: "'Inter Tight', 'Helvetica Neue', Arial, sans-serif",
  serif: "'Instrument Serif', Georgia, serif",
};

// Paleta oscura con degradados vivos, inspirada en sitios como lovable.dev.
export const colors = {
  bg: "#07060B",
  text: "#F7F5FF",
  dim: "rgba(247,245,255,0.62)",
  faint: "rgba(247,245,255,0.38)",
  line: "rgba(255,255,255,0.14)",
  glass: "rgba(255,255,255,0.065)",
  glassStrong: "rgba(255,255,255,0.11)",
  orange: "#FF7A3D",
  pink: "#FF4D8D",
  violet: "#8B5CF6",
  blue: "#3B82F6",
  cyan: "#22D3EE",
  gold: "#FFC15E",
};

export const gradients = {
  // Cálido: lo que preocupa (caídas, inflación, desempleo).
  warm: `linear-gradient(100deg, ${colors.orange} 0%, ${colors.pink} 55%, ${colors.violet} 100%)`,
  // Frío: lo que va bien o es neutro.
  cool: `linear-gradient(100deg, ${colors.cyan} 0%, ${colors.blue} 50%, ${colors.violet} 100%)`,
  gold: `linear-gradient(100deg, ${colors.gold} 0%, ${colors.orange} 60%, ${colors.pink} 100%)`,
  brand: `linear-gradient(100deg, ${colors.orange} 0%, ${colors.pink} 40%, ${colors.violet} 75%, ${colors.blue} 100%)`,
};

export const VIDEO = { width: 1080, height: 1920, fps: 30 };

// Zona segura de Instagram Reels. El contenido vive arriba; los subtítulos, sobre la franja inferior.
export const SAFE = { top: 170, left: 72, right: 96, contentBottom: 1250, captionsTop: 1290 };
