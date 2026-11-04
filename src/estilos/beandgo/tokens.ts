// Estilo "Be&Go": la identidad de la app (copihue, azul noche del sur, sol) en formato horizontal.
// Mismos tokens que frontend/src/features/verdict/verdict.css del repo Be_and_Go_Project.
import "@fontsource-variable/nunito-sans";

import { continueRender, delayRender } from "remotion";

const handle = delayRender("Cargando Nunito Sans");
Promise.all(["400 32px 'Nunito Sans Variable'", "600 32px 'Nunito Sans Variable'", "800 32px 'Nunito Sans Variable'"].map((f) => document.fonts.load(f))).then(
  () => continueRender(handle),
  () => continueRender(handle),
);

export const HD = { width: 1920, height: 1080, fps: 30 };

// Márgenes del lienzo horizontal: el contenido vive arriba de la franja de subtítulos.
export const MARCO = { top: 86, left: 110, right: 110, contentBottom: 900, captionsTop: 928 };

export const b = {
  suelo: "#FAFBFC",
  superficie: "#FFFFFF",
  panel: "#F0F3F5",
  linea: "#D9E2E8",
  lineaFuerte: "#B8C6CF",
  tinta: "#192024",
  tinta2: "#4A5862",
  tinta3: "#8FA1AD",
  copihue: "#C2185B",
  copihueSuave: "#FCE7F0",
  noche: "#0B2E4A",
  noche2: "#123F63",
  sol: "#F2B705",
  ok: "#17683F",
  okSuave: "#E4F3EA",
  alerta: "#845400",
  alertaSuave: "#FDF1D8",
  mal: "#B0261C",
  malSuave: "#FBE9E7",
};

// Colores por categoría: el mismo significado que en la app.
export const cat = {
  transporte: "#2563EB",
  alojamiento: "#0F766E",
  traslado: "#C2410C",
  comida: "#4D7C0F",
  actividad: "#BE185D",
};

export const fuente = "'Nunito Sans Variable', 'Nunito Sans', ui-sans-serif, system-ui, sans-serif";

export const tipo = {
  display: { fontSize: 120, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.02 },
  titulo: { fontSize: 76, fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.06 },
  cuerpo: { fontSize: 32, fontWeight: 500, lineHeight: 1.4 },
  rotulo: { fontSize: 22, fontWeight: 700, letterSpacing: "0.08em", lineHeight: 1.2, textTransform: "uppercase" },
} satisfies Record<string, React.CSSProperties>;
