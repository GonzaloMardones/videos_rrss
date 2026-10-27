// Piezas compartidas por la serie "Métodos causales": notas de lectura, paneles, rótulos pequeños,
// medias con barra, el sombrero de los estimadores y un plano cartesiano que se dibuja.
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { EXPO_IN_OUT, EXPO_OUT, resorte, transicion } from "./movimiento";
import { colores as c, serif, Sub, V } from "./mate";
import { type Caja, linea, mono, relleno } from "./tecnico";
import { v } from "./tokens";

export const ROJO = "#FF5C6C";
export { c };

// Índice del último cue que ya pasó (-1 si ninguno).
export const ultimo = (frame: number, cues: number[]) => cues.reduce((acc, cue, i) => (frame >= cue ? i : acc), -1);

// Una línea de lectura con punto de color, que entra y (opcionalmente) sale.
export const Nota: React.FC<{ at: number; hasta?: number; color?: string; children: React.ReactNode; style?: React.CSSProperties; tam?: number }> = ({ at, hasta, color = v.azafran, children, style, tam = 32 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 500, EXPO_OUT) * (hasta === undefined ? 1 : 1 - transicion(frame, hasta, fps, 300, EXPO_OUT));
  if (k <= 0) return null;
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start", opacity: k, transform: `translateY(${(1 - k) * 14}px)`, ...style }}>
      <div style={{ width: 12, height: 12, borderRadius: 6, background: color, marginTop: tam * 0.42, flexShrink: 0 }} />
      <div style={{ fontSize: tam, fontWeight: 200, lineHeight: 1.3 }}>{children}</div>
    </div>
  );
};

// Un panel posicionado, con borde de estado.
export const Panel: React.FC<{ caja: Caja; at: number; color?: string; discontinuo?: boolean; children: React.ReactNode; estilo?: React.CSSProperties }> = ({ caja, at, color, discontinuo, children, estilo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = resorte(frame, at, fps, { k: 140, c: 16 });
  if (frame < at - 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: caja.x,
        top: caja.y,
        width: caja.w,
        height: caja.h,
        boxSizing: "border-box",
        borderRadius: 22,
        border: `${color ? 2.5 : 1.5}px ${discontinuo ? "dashed" : "solid"} ${color ?? linea}`,
        background: relleno,
        padding: "16px 20px",
        opacity: Math.min(1, p * 1.6),
        transform: `translateY(${(1 - Math.min(1, p)) * 24}px)`,
        ...estilo,
      }}
    >
      {children}
    </div>
  );
};

export const Rol: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = v.ceniza }) => (
  <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color }}>{children}</div>
);

// Media con barra: Ȳ, x̄. `sub` va como subíndice.
export const Media: React.FC<{ children: React.ReactNode; color?: string; sub?: React.ReactNode; id?: string }> = ({ children, color, sub, id }) => (
  <V color={color} id={id}>
    <span style={{ borderTop: `3px solid ${color ?? v.hueso}`, paddingTop: 2 }}>{children}</span>
    {sub ? <Sub>{sub}</Sub> : null}
  </V>
);

// Estimador con sombrero: τ̂, β̂.
export const Sombrero: React.FC<{ children: React.ReactNode; color?: string; id?: string }> = ({ children, color = c.c, id }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    <V color={color} id={id}>
      {children}
    </V>
    <span style={{ position: "absolute", left: "0.14em", top: "-0.42em", fontSize: "0.7em", color }}>^</span>
  </span>
);

// Un plano cartesiano: ejes que se dibujan, rótulos y una función px/py para lo que vaya adentro.
export type Plano = { px: (x: number) => number; py: (y: number) => number };
export const Ejes: React.FC<{
  ancho: number;
  alto: number;
  x: [number, number];
  y: [number, number];
  at: number;
  rotuloX?: string;
  rotuloY?: string;
  marcasX?: { v: number; t: string }[];
  children: (p: Plano) => React.ReactNode;
}> = ({ ancho, alto, x, y, at, rotuloX, rotuloY, marcasX = [], children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 700, EXPO_IN_OUT);
  const M = { l: 20, r: 20, t: 30, b: 50 };
  const px = (vx: number) => M.l + ((ancho - M.l - M.r) * (vx - x[0])) / (x[1] - x[0]);
  const py = (vy: number) => alto - M.b - ((alto - M.t - M.b) * (vy - y[0])) / (y[1] - y[0]);
  return (
    <svg width={ancho} height={alto} style={{ overflow: "visible", display: "block" }}>
      <line x1={M.l} y1={alto - M.b} x2={M.l + (ancho - M.l - M.r) * k} y2={alto - M.b} stroke={v.ceniza} strokeWidth={2} />
      <line x1={M.l} y1={alto - M.b} x2={M.l} y2={alto - M.b - (alto - M.t - M.b) * k} stroke={v.ceniza} strokeWidth={2} />
      {marcasX.map((m) => (
        <text key={m.t} x={px(m.v)} y={alto - M.b + 32} textAnchor="middle" fontFamily={mono} fontSize={20} fill={v.ceniza} opacity={k}>
          {m.t}
        </text>
      ))}
      {rotuloX ? (
        <text x={ancho - M.r} y={alto - 4} textAnchor="end" fontFamily={serif} fontStyle="italic" fontSize={28} fill={v.niebla} opacity={k}>
          {rotuloX}
        </text>
      ) : null}
      {rotuloY ? (
        <text x={M.l + 10} y={M.t - 8} fontFamily={serif} fontStyle="italic" fontSize={28} fill={v.niebla} opacity={k}>
          {rotuloY}
        </text>
      ) : null}
      {children({ px, py })}
    </svg>
  );
};

// Una polilínea que se dibuja de 0 a 1.
export const Traza: React.FC<{ pts: [number, number][]; k: number; color: string; ancho?: number; discontinuo?: boolean; opacidad?: number }> = ({ pts, k, color, ancho = 4.5, discontinuo, opacidad = 1 }) => {
  if (k <= 0 || pts.length < 2) return null;
  const d = `M${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("L")}`;
  return discontinuo ? (
    <path d={d} fill="none" stroke={color} strokeWidth={ancho} strokeDasharray="9 9" strokeLinecap="round" opacity={k * opacidad} />
  ) : (
    <path d={d} fill="none" stroke={color} strokeWidth={ancho} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - k} opacity={opacidad} />
  );
};
