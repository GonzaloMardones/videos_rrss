// Fórmulas que se descomponen: cada variable tiene su color, se enciende cuando la voz la nombra y
// tiene una fila de leyenda con su significado y su valor. Las letras van en STIX Two (itálica de libro
// de matemáticas); la raíz y el techo se dibujan, porque la fuente no trae esos signos.
import "@fontsource/stix-two-text/400.css";
import "@fontsource/stix-two-text/400-italic.css";

import React from "react";
import { continueRender, delayRender, useCurrentFrame, useVideoConfig } from "remotion";
import { EXPO_OUT, resorte, transicion } from "./movimiento";
import { linea, mono, relleno } from "./tecnico";
import { fuente, v } from "./tokens";

const fuentesMate = delayRender("Cargando STIX Two");
Promise.all(["400 48px 'STIX Two Text'", "italic 400 48px 'STIX Two Text'"].map((f) => document.fonts.load(f))).then(
  () => continueRender(fuentesMate),
  () => continueRender(fuentesMate),
);

export const serif = "'STIX Two Text', 'Times New Roman', serif";

// Un color por papel: lo que entra (ámbar), lo que se compara (violeta), lo que resulta (verde agua).
export const colores = { a: v.azafran, b: "#A78BFF", c: "#2BD4B0", d: "#FF7A90", e: v.hueso };

// Contexto: el cuadro desde el que cada variable está encendida. Una variable "activa" brilla; las demás
// se atenúan, para que el ojo siga a la voz.
type Foco = { activas: string[] };
const FocoCtx = React.createContext<Foco>({ activas: [] });
export const Foco: React.FC<{ activas: string[]; children: React.ReactNode }> = ({ activas, children }) => <FocoCtx.Provider value={{ activas }}>{children}</FocoCtx.Provider>;

// Una variable o término. `id` la conecta con la leyenda y con el foco.
export const V: React.FC<{ id?: string; color?: string; children: React.ReactNode; italica?: boolean; style?: React.CSSProperties }> = ({ id, color = v.hueso, children, italica = true, style }) => {
  const { activas } = React.useContext(FocoCtx);
  const hayFoco = activas.length > 0;
  const activa = id ? activas.includes(id) : false;
  return (
    <span
      style={{
        fontStyle: italica ? "italic" : "normal",
        color: hayFoco && !activa ? `${color}66` : color,
        padding: "0 0.06em",
        borderRadius: 10,
        background: activa ? `${color}22` : "transparent",
        boxShadow: activa ? `0 0 0 2px ${color}88` : "none",
        ...style,
      }}
    >
      {children}
    </span>
  );
};

// Operadores y números: rectos.
export const Op: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <span style={{ fontStyle: "normal", color: v.niebla, padding: "0 0.18em", ...style }}>{children}</span>
);

// Una fórmula: una línea de matemática en STIX.
export const Formula: React.FC<{ tam?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ tam = 72, children, style }) => (
  <div style={{ fontFamily: serif, fontSize: tam, lineHeight: 1.2, color: v.hueso, display: "flex", alignItems: "center", whiteSpace: "nowrap", ...style }}>{children}</div>
);

// Fracción: numerador arriba, raya, denominador abajo.
export const Frac: React.FC<{ arriba: React.ReactNode; abajo: React.ReactNode; raya?: number }> = ({ arriba, abajo, raya = 1 }) => (
  <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", margin: "0 0.12em" }}>
    <span style={{ padding: "0 0.15em 0.08em" }}>{arriba}</span>
    <span style={{ alignSelf: "stretch", height: 3, background: v.niebla, transformOrigin: "left", transform: `scaleX(${raya})` }} />
    <span style={{ padding: "0.08em 0.15em 0" }}>{abajo}</span>
  </span>
);

// Techo ⌈x⌉: corchetes con solo la parte de arriba.
export const Techo: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lado = (izq: boolean): React.CSSProperties => ({
    alignSelf: "stretch",
    width: "0.22em",
    borderTop: `3px solid ${v.niebla}`,
    [izq ? "borderLeft" : "borderRight"]: `3px solid ${v.niebla}`,
    margin: izq ? "0.05em 0.08em 0.05em 0" : "0.05em 0 0.05em 0.08em",
  });
  return (
    <span style={{ display: "inline-flex", alignItems: "center", verticalAlign: "middle" }}>
      <span style={lado(true)} />
      {children}
      <span style={lado(false)} />
    </span>
  );
};

// Norma ‖x‖: dos rayas a cada lado.
export const Norma: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const raya: React.CSSProperties = { width: 9, alignSelf: "stretch", borderLeft: `2.5px solid ${v.niebla}`, borderRight: `2.5px solid ${v.niebla}`, boxSizing: "border-box", margin: "0.1em 0.08em" };
  return (
    <span style={{ display: "inline-flex", alignItems: "stretch", verticalAlign: "middle" }}>
      <span style={raya} />
      {children}
      <span style={raya} />
    </span>
  );
};

// Raíz cuadrada dibujada.
export const Raiz: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ display: "inline-flex", alignItems: "stretch", verticalAlign: "middle" }}>
    <svg width="0.6em" viewBox="0 0 30 50" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
      <path d="M2,30 L9,26 L17,48 L29,1" fill="none" stroke={v.niebla} strokeWidth={2.6} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
    <span style={{ borderTop: `3px solid ${v.niebla}`, padding: "0.06em 0.1em 0" }}>{children}</span>
  </span>
);

// Sumatoria con su índice.
export const Suma: React.FC<{ de?: string; hasta?: string }> = ({ de = "i=1", hasta = "d" }) => (
  <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", lineHeight: 1, margin: "0 0.08em" }}>
    <span style={{ fontSize: "0.4em", fontStyle: "italic", color: v.ceniza }}>{hasta}</span>
    <span style={{ fontSize: "1.3em", color: v.niebla }}>Σ</span>
    <span style={{ fontSize: "0.4em", fontStyle: "italic", color: v.ceniza }}>{de}</span>
  </span>
);

export const Sub: React.FC<{ children: React.ReactNode }> = ({ children }) => <sub style={{ fontSize: "0.55em", verticalAlign: "-0.3em" }}>{children}</sub>;
export const Sup: React.FC<{ children: React.ReactNode }> = ({ children }) => <sup style={{ fontSize: "0.55em", verticalAlign: "0.8em", lineHeight: 0 }}>{children}</sup>;

// Fila de leyenda: el símbolo en su color, qué significa y cuánto vale.
export const Leyenda: React.FC<{ at: number; simbolo: React.ReactNode; color: string; que: string; valor?: React.ReactNode; activa?: boolean; ancho?: number }> = ({ at, simbolo, color, que, valor, activa = false, ancho = 912 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = resorte(frame, at, fps, { k: 160, c: 18 });
  if (frame < at) return null;
  return (
    <div
      style={{
        width: ancho,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "12px 20px",
        borderRadius: 18,
        border: `${activa ? 2.5 : 1.5}px solid ${activa ? color : linea}`,
        background: relleno,
        opacity: Math.min(1, p * 1.5),
        transform: `translateX(${(1 - p) * 40}px)`,
      }}
    >
      <div style={{ minWidth: 92, fontFamily: serif, fontStyle: "italic", fontSize: 50, lineHeight: 1, color, textAlign: "center" }}>{simbolo}</div>
      <div style={{ flex: 1, fontFamily: fuente, fontSize: 28, fontWeight: 200, color: v.niebla }}>{que}</div>
      {valor !== undefined ? <div style={{ fontFamily: mono, fontSize: 30, color: v.hueso, whiteSpace: "nowrap" }}>{valor}</div> : null}
    </div>
  );
};

// Número que cuenta hasta su valor, con separador de miles chileno.
export const Cuenta: React.FC<{ at: number; hasta: number; desde?: number; ms?: number; decimales?: number; style?: React.CSSProperties }> = ({ at, hasta, desde = 0, ms = 900, decimales = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, ms, EXPO_OUT);
  const x = desde + (hasta - desde) * k;
  const txt = x.toLocaleString("es-CL", { minimumFractionDigits: decimales, maximumFractionDigits: decimales });
  return <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>{txt}</span>;
};

// Aparece una pieza de la fórmula con una subida corta.
export const Entra: React.FC<{ at: number; children: React.ReactNode; dist?: number }> = ({ at, children, dist = 24 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 500, EXPO_OUT);
  return <span style={{ display: "inline-flex", alignItems: "center", opacity: k, transform: `translateY(${(1 - k) * dist}px)` }}>{children}</span>;
};
