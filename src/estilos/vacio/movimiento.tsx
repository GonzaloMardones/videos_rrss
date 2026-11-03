import React from "react";
import { anticipate, backOut, cubicBezier, spring } from "framer-motion";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { tipo, v } from "./tokens";

// framer-motion como motor de curvas y resortes, evaluado en el tiempo del cuadro.
// Sus animaciones corren con el reloj del navegador y Remotion renderiza cuadros en paralelo,
// así que no usamos <motion.div>: usamos sus funciones puras, que dan el mismo valor en cada render.

// El reloj "discreto" de hairline: 700 ms sobre (.32, .72, 0, 1).
export const EASE_LIFT = cubicBezier(0.32, 0.72, 0, 1);
// Titulares divididos: expo.out, 400–700 ms (UI UX Pro Max, motion #9).
export const EXPO_OUT = cubicBezier(0.16, 1, 0.3, 1);
// Morph entre estados: expo.inOut, 500–800 ms (UI UX Pro Max, motion #12).
export const EXPO_IN_OUT = cubicBezier(0.87, 0, 0.13, 1);
export { anticipate, backOut };

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

// Progreso 0→1 de una transición de `ms` milisegundos que empieza en el cuadro `at`.
export const transicion = (frame: number, at: number, fps: number, ms = 700, ease: (t: number) => number = EASE_LIFT) =>
  ease(clamp01((frame - at) / ((ms / 1000) * fps)));

// El reloj "continuo" de hairline: un resorte k 100 · c 18 · m 1. framer-motion resuelve el resorte
// de forma analítica, así que next(ms) es una función pura del tiempo.
type Resorte = { k?: number; c?: number; m?: number };
const generadores = new Map<string, ReturnType<typeof spring>>();
export const resorte = (frame: number, at: number, fps: number, { k = 100, c = 18, m = 1 }: Resorte = {}) => {
  if (frame <= at) return 0;
  const clave = `${k}-${c}-${m}`;
  let g = generadores.get(clave);
  if (!g) {
    g = spring({ keyframes: [0, 1], stiffness: k, damping: c, mass: m });
    generadores.set(clave, g);
  }
  return g.next(((frame - at) / fps) * 1000).value as number;
};

export const useTransicion = (at: number, ms = 700, ease: (t: number) => number = EASE_LIFT) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return transicion(frame, at, fps, ms, ease);
};

export const useResorte = (at: number, opts?: Resorte) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return resorte(frame, at, fps, opts);
};

// Titular cinético: cada palabra sube desde detrás de una máscara, una tras otra (35 ms, menos de 8 palabras por línea).
// "Línea uno|línea *dos*": `|` corta línea; *así* va en ámbar.
export const Cinetico: React.FC<{
  at: number;
  texto: string;
  size?: keyof typeof tipo;
  style?: React.CSSProperties;
  escalon?: number; // ms entre palabras
  ms?: number;
  color?: string;
}> = ({ at, texto, size = "titulo", style, escalon = 35, ms = 650, color = v.hueso }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // El acento puede abarcar varias palabras: *ve el error.* abre en la primera y cierra en la última.
  let enAcento = false;
  const lineas = texto.split("|").map((linea) =>
    linea.split(" ").map((w) => {
      const abre = w.startsWith("*");
      const cierra = w.endsWith("*") && (w.length > 1 || enAcento);
      const acento = enAcento || abre;
      if (abre && !cierra) enAcento = true;
      if (cierra) enAcento = false;
      return { palabra: w.replace(/^\*/, "").replace(/\*$/, ""), acento };
    }),
  );
  let n = 0;
  return (
    <div style={{ ...tipo[size], color, ...style }}>
      {lineas.map((palabras, li) => (
        <div key={li} style={{ whiteSpace: "nowrap" }}>
          {palabras.map(({ palabra, acento }, wi) => {
            const p = transicion(frame, at + (n++ * escalon * fps) / 1000, fps, ms, EXPO_OUT);
            return (
              <span key={wi} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span style={{ display: "inline-block", transform: `translateY(${(1 - p) * 105}%)`, color: acento ? v.azafran : undefined }}>
                  {palabra}
                  {wi < palabras.length - 1 ? " " : ""}
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Deriva de cámara: el contenido respira y se acerca muy despacio (paralaje con las partículas del fondo).
export const Deriva: React.FC<{ children: React.ReactNode; amp?: number; zoom?: number; style?: React.CSSProperties }> = ({ children, amp = 8, zoom = 0.04, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const s = 1 + zoom * Math.min(1, frame / Math.max(1, durationInFrames));
  return <div style={{ transform: `translate(${Math.sin(frame * 0.02) * amp}px, ${Math.cos(frame * 0.017) * amp}px) scale(${s})`, ...style }}>{children}</div>;
};
