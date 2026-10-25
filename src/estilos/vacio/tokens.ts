// Estilo "vacío" para las cápsulas técnicas: negro puro, un acento violeta, chispas ámbar,
// tipografía liviana que jerarquiza por tamaño y no por peso, y partículas triangulares como identidad.
import "@fontsource/inter/200.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";

import { continueRender, delayRender } from "remotion";

const handle = delayRender("Cargando Inter");
Promise.all(["200 32px Inter", "400 32px Inter", "600 32px Inter"].map((f) => document.fonts.load(f))).then(
  () => continueRender(handle),
  () => continueRender(handle),
);

export const v = {
  vacio: "#000000",
  hueso: "#FFFFFF",
  ceniza: "#9A9A9A",
  niebla: "#BDBDBD",
  iris: "#8052FF",
  azafran: "#FFB829",
  verde: "#15846E",
};

// Colores de las partículas: espectro vivo, nunca gris.
export const espectro = ["#8052FF", "#FFB829", "#2BD4B0", "#FF4FD8", "#4F8BFF", "#B18CFF", "#15846E"];

export const fuente = "Inter, 'Helvetica Neue', Arial, sans-serif";
export const ss01: React.CSSProperties = { fontFeatureSettings: '"ss01" on' };

// Escala tipográfica pensada para 1080 de ancho: el tamaño hace la jerarquía; el peso casi no cambia.
export const tipo = {
  display: { fontSize: 150, fontWeight: 400, letterSpacing: "-0.04em", lineHeight: 0.98 },
  titulo: { fontSize: 112, fontWeight: 400, letterSpacing: "-0.04em", lineHeight: 1.02 },
  subtitulo: { fontSize: 64, fontWeight: 400, letterSpacing: "-0.035em", lineHeight: 1.1 },
  item: { fontSize: 50, fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.15 },
  cuerpo: { fontSize: 36, fontWeight: 200, letterSpacing: "0em", lineHeight: 1.4 },
  rotulo: { fontSize: 26, fontWeight: 600, letterSpacing: "0.12em", lineHeight: 1.2, textTransform: "uppercase" as const },
  dato: { fontSize: 32, fontWeight: 200, letterSpacing: "0em", lineHeight: 1.5 },
} satisfies Record<string, React.CSSProperties>;
