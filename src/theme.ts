// Fuentes empaquetadas en el proyecto (no dependen de internet al renderizar).
// Bricolage Grotesque: titulares y cifras, con carácter. Figtree: subtítulos y textos, cercana y legible.
import "@fontsource/bricolage-grotesque/400.css";
import "@fontsource/bricolage-grotesque/600.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/500.css";
import "@fontsource/figtree/600.css";
import "@fontsource/figtree/700.css";
import "@fontsource/figtree/800.css";
import "@fontsource/figtree/900.css";

import { continueRender, delayRender } from "remotion";

// Espera a que las fuentes estén listas antes de capturar cualquier frame.
const fontsHandle = delayRender("Cargando fuentes");
Promise.all(
  [
    "400 32px 'Bricolage Grotesque'",
    "700 32px 'Bricolage Grotesque'",
    "800 32px 'Bricolage Grotesque'",
    "500 32px 'Figtree'",
    "800 32px 'Figtree'",
  ].map((font) => document.fonts.load(font)),
).then(
  () => continueRender(fontsHandle),
  () => continueRender(fontsHandle),
);

export const fonts = {
  display: "'Bricolage Grotesque', 'Figtree', sans-serif",
  sans: "'Figtree', 'Helvetica Neue', Arial, sans-serif",
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
