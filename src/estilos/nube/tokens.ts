// Estilo "nube": claro y minimalista, inspirado en la estética de las consolas de nube.
// Fondo blanco, Google Sans (OFL), cuatro colores de acento y bordes finos en vez de sombras fuertes.
import "@fontsource/google-sans/400.css";
import "@fontsource/google-sans/500.css";
import "@fontsource/google-sans/700.css";
import "@fontsource/google-sans-code/400.css";
import "@fontsource/google-sans-code/500.css";
import "@fontsource/stix-two-text/400.css";
import "@fontsource/stix-two-text/400-italic.css";

import { continueRender, delayRender } from "remotion";

const handle = delayRender("Cargando Google Sans");
Promise.all(["400 32px 'Google Sans'", "500 32px 'Google Sans'", "700 32px 'Google Sans'", "400 32px 'Google Sans Code'", "400 48px 'STIX Two Text'", "italic 400 48px 'STIX Two Text'"].map((f) => document.fonts.load(f))).then(
  () => continueRender(handle),
  () => continueRender(handle),
);

export const n = {
  fondo: "#FFFFFF",
  superficie: "#F8F9FA",
  borde: "#DADCE0",
  texto: "#202124",
  texto2: "#5F6368",
  texto3: "#9AA0A6",
  azul: "#1A73E8",
  azulClaro: "#E8F0FE",
  rojo: "#D93025",
  rojoClaro: "#FCE8E6",
  amarillo: "#F9AB00",
  amarilloClaro: "#FEF7E0",
  verde: "#1E8E3E",
  verdeClaro: "#E6F4EA",
};

export const fuente = "'Google Sans', Roboto, Arial, sans-serif";
export const codigo = "'Google Sans Code', 'Roboto Mono', monospace";

export const tipo = {
  display: { fontSize: 128, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.04 },
  titulo: { fontSize: 88, fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.08 },
  cuerpo: { fontSize: 34, fontWeight: 400, lineHeight: 1.4 },
  rotulo: { fontSize: 26, fontWeight: 500, letterSpacing: "0.04em", lineHeight: 1.2 },
} satisfies Record<string, React.CSSProperties>;
