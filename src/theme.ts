// Fuentes empaquetadas en el proyecto (no dependen de internet al renderizar).
import "@fontsource/libre-baskerville/400.css";
import "@fontsource/libre-baskerville/700.css";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/600.css";
import "@fontsource/public-sans/700.css";
import "@fontsource/public-sans/800.css";

import { continueRender, delayRender } from "remotion";

// Espera a que las fuentes estén listas antes de capturar cualquier frame.
const fontsHandle = delayRender("Cargando fuentes");
Promise.all(
  ["400 32px 'Libre Baskerville'", "400 32px 'Public Sans'", "700 32px 'Public Sans'", "800 32px 'Public Sans'"].map(
    (font) => document.fonts.load(font),
  ),
).then(
  () => continueRender(fontsHandle),
  () => continueRender(fontsHandle),
);

// Misma línea visual de la presentación "Estados Unidos: el déficit de cuenta corriente".
export const fonts = {
  serif: "'Libre Baskerville', Georgia, serif",
  sans: "'Public Sans', Arial, sans-serif",
};

export const colors = {
  navy: "#051C2C",
  navySoft: "#0B2A40",
  blue: "#2251FF",
  blueLight: "#AFC3FF",
  blueOnDark: "#6F8BFF",
  blueMist: "#C9D6F2",
  ink: "#333333",
  muted: "#6E6E6E",
  mutedOnDark: "#8EA3B3",
  border: "#D9D9D9",
  panel: "#F3F5F8",
  paper: "#FFFFFF",
  // Para señales de alerta: naranjo (se distingue del azul también en luminosidad).
  alert: "#D9480F",
  alertSoft: "#FDEBDD",
  alertOnDark: "#FF8A4C",
};

// Formato vertical para Reels / TikTok / Shorts.
export const VIDEO = { width: 1080, height: 1920, fps: 30 };

// Zona segura de Instagram Reels: arriba va la cabecera y abajo la descripción y los botones.
export const SAFE = { top: 190, bottom: 400, left: 80, right: 110 };
