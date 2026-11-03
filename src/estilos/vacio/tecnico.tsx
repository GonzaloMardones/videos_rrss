// Piezas de diagrama técnico para las cápsulas: tarjetas con ícono, rol y tecnología; cables con paquetes
// de datos; archivos de código y un navegador. Mantienen el estilo "vacío" (negro, Inter, ámbar y violeta)
// pero nombran lo que muestran, para que se reconozca qué es una base de datos, un backend o la nube.
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { continueRender, delayRender, useCurrentFrame, useVideoConfig } from "remotion";
import { EXPO_IN_OUT, EXPO_OUT, resorte, transicion } from "./movimiento";
import { fuente, v } from "./tokens";

const fuentesMono = delayRender("Cargando JetBrains Mono");
Promise.all(["400 24px 'JetBrains Mono'", "500 24px 'JetBrains Mono'"].map((f) => document.fonts.load(f))).then(
  () => continueRender(fuentesMono),
  () => continueRender(fuentesMono),
);

export const mono = "'JetBrains Mono', ui-monospace, monospace";
export const linea = "#2E2E35";
export const relleno = "#0A0A0D";
export const sintaxis = { clave: "#B18CFF", texto: v.hueso, valor: v.azafran, tenue: v.ceniza, tipo: "#2BD4B0" };

export type Caja = { x: number; y: number; w: number; h: number };
export type Lado = "l" | "r" | "t" | "b";
type Ancla = { p: [number, number]; n: [number, number] };

export const ancla = (c: Caja, lado: Lado, desfase = 0): Ancla => {
  switch (lado) {
    case "l":
      return { p: [c.x, c.y + c.h / 2 + desfase], n: [-1, 0] };
    case "r":
      return { p: [c.x + c.w, c.y + c.h / 2 + desfase], n: [1, 0] };
    case "t":
      return { p: [c.x + c.w / 2 + desfase, c.y], n: [0, -1] };
    default:
      return { p: [c.x + c.w / 2 + desfase, c.y + c.h], n: [0, 1] };
  }
};
export const punto = (x: number, y: number, n: [number, number] = [0, 1]): Ancla => ({ p: [x, y], n });

// El escenario: un área de 912 px de ancho donde todo se posiciona de forma absoluta.
export const Escenario: React.FC<{ alto: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ alto, children, style }) => (
  <div style={{ position: "relative", width: 912, height: alto, fontFamily: fuente, ...style }}>{children}</div>
);

const useAparece = (at: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return resorte(frame, at, fps, { k: 140, c: 16 });
};

// Tarjeta de un componente: ícono, rol (qué hace), título (con qué) y una nota (detalle o equivalentes;
// `\n` la parte en líneas). `vertical` pone el ícono arriba, para tarjetas angostas.
// Los tamaños están pensados para leerse en un teléfono: nada bajo 20 px en un cuadro de 1080.
export const Tarjeta: React.FC<{
  caja: Caja;
  at: number;
  Icono: LucideIcon;
  rol?: string;
  titulo: string;
  sub?: string;
  nota?: string;
  activo?: boolean;
  error?: boolean;
  apagado?: boolean;
  vertical?: boolean;
  children?: React.ReactNode;
}> = ({ caja, at, Icono, rol, titulo, sub, nota, activo = false, error = false, apagado = false, vertical = false, children }) => {
  const frame = useCurrentFrame();
  const p = useAparece(at);
  const tiembla = error ? Math.sin(frame * 1.7) * Math.max(0, 1 - (frame % 40) / 14) * 4 : 0;
  const acento = error ? v.azafran : activo ? v.azafran : v.hueso;
  return (
    <div
      style={{
        position: "absolute",
        left: caja.x,
        top: caja.y,
        width: caja.w,
        height: caja.h,
        boxSizing: "border-box",
        padding: "20px 22px",
        borderRadius: 22,
        border: `${activo || error ? 2.5 : 1.5}px ${error ? "dashed" : "solid"} ${activo || error ? v.azafran : linea}`,
        background: relleno,
        opacity: Math.min(1, p * 1.6) * (apagado ? 0.45 : 1),
        transform: `translate(${tiembla}px, ${(1 - p) * 24}px) scale(${0.94 + 0.06 * Math.min(1, p)})`,
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        gap: vertical ? 14 : 18,
        alignItems: "flex-start",
      }}
    >
      <div style={{ width: 62, height: 62, flexShrink: 0, borderRadius: 16, border: `1.5px solid ${activo || error ? v.azafran : linea}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icono size={34} strokeWidth={1.6} color={acento} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        {rol ? <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: activo ? v.azafran : v.ceniza, whiteSpace: "nowrap" }}>{rol}</div> : null}
        <div style={{ fontSize: 38, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15, color: v.hueso, marginTop: 4, whiteSpace: "nowrap" }}>{titulo}</div>
        {sub ? <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 4, whiteSpace: "nowrap" }}>{sub}</div> : null}
        {nota ? <div style={{ fontSize: 23, fontWeight: 200, lineHeight: 1.3, color: v.ceniza, marginTop: 6, whiteSpace: "pre" }}>{nota}</div> : null}
        {children}
      </div>
    </div>
  );
};

type Bez = [[number, number], [number, number], [number, number], [number, number]];
const curva = (a: Ancla, b: Ancla, curvatura: number): Bez => {
  const d = Math.hypot(b.p[0] - a.p[0], b.p[1] - a.p[1]);
  const k = Math.max(40, d * curvatura);
  return [a.p, [a.p[0] + a.n[0] * k, a.p[1] + a.n[1] * k], [b.p[0] + b.n[0] * k, b.p[1] + b.n[1] * k], b.p];
};
const en = (c: Bez, t: number): [number, number] => {
  const u = 1 - t;
  const f = (i: 0 | 1) => u * u * u * c[0][i] + 3 * u * u * t * c[1][i] + 3 * u * t * t * c[2][i] + t * t * t * c[3][i];
  return [f(0), f(1)];
};

export type Envio = { at: number; ms?: number; color?: string; reverso?: boolean };

// Un cable entre dos anclas que se dibuja, con flecha, etiqueta y paquetes de datos que lo recorren.
export const Cable: React.FC<{
  de: Ancla;
  a: Ancla;
  at: number;
  ms?: number;
  color?: string;
  discontinuo?: boolean;
  etiqueta?: string;
  curvatura?: number;
  envios?: Envio[];
  flujo?: { desde: number; hasta?: number; periodo?: number; n?: number; color?: string };
  opacidad?: number;
}> = ({ de, a, at, ms = 700, color = "#52525B", discontinuo = false, etiqueta, curvatura = 0.4, envios = [], flujo, opacidad = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = curva(de, a, curvatura);
  const d = `M${c[0][0]},${c[0][1]} C${c[1][0]},${c[1][1]} ${c[2][0]},${c[2][1]} ${c[3][0]},${c[3][1]}`;
  const avance = transicion(frame, at, fps, ms, EXPO_IN_OUT);
  if (avance <= 0) return null;
  const fin = en(c, 0.999);
  const ang = Math.atan2(c[3][1] - fin[1], c[3][0] - fin[0]);
  const medio = en(c, 0.5);
  const paquetes: { pos: [number, number]; color: string }[] = [];
  for (const e of envios) {
    const t = transicion(frame, e.at, fps, e.ms ?? 900, EXPO_IN_OUT);
    if (t > 0 && t < 1) paquetes.push({ pos: en(c, e.reverso ? 1 - t : t), color: e.color ?? v.azafran });
  }
  if (flujo && frame >= flujo.desde && frame <= (flujo.hasta ?? 1e9)) {
    const n = flujo.n ?? 3;
    for (let i = 0; i < n; i++) paquetes.push({ pos: en(c, (((frame - flujo.desde) / (flujo.periodo ?? 36) + i / n) % 1)), color: flujo.color ?? v.azafran });
  }
  return (
    <g opacity={opacidad}>
      {discontinuo ? (
        <path d={d} fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeDasharray="7 9" opacity={avance} />
      ) : (
        <path d={d} fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - avance} />
      )}
      {avance >= 1 ? <path d="M0,0 L-14,-7 L-14,7 Z" fill={color} transform={`translate(${c[3][0]},${c[3][1]}) rotate(${(ang * 180) / Math.PI})`} /> : null}
      {etiqueta && avance >= 1 ? (
        <g>
          <rect x={medio[0] - etiqueta.length * 7.2 - 14} y={medio[1] - 21} width={etiqueta.length * 14.4 + 28} height={42} rx={21} fill={v.vacio} stroke={linea} strokeWidth={1.5} />
          <text x={medio[0]} y={medio[1] + 8} textAnchor="middle" fill={v.hueso} fontFamily={mono} fontSize={24}>
            {etiqueta}
          </text>
        </g>
      ) : null}
      {paquetes.map((q, i) => (
        <g key={i}>
          <circle cx={q.pos[0]} cy={q.pos[1]} r={13} fill={q.color} opacity={0.18} />
          <circle cx={q.pos[0]} cy={q.pos[1]} r={7} fill={q.color} />
        </g>
      ))}
    </g>
  );
};

// La capa de cables va detrás de las tarjetas.
export const Cables: React.FC<{ alto: number; children: React.ReactNode }> = ({ alto, children }) => (
  <svg width={912} height={alto} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
    {children}
  </svg>
);

export type Token = [string, string?];

// Un archivo de código: encabezado con nombre y líneas que aparecen una a una.
export const Codigo: React.FC<{
  caja: Caja;
  at: number;
  archivo: string;
  Icono?: LucideIcon;
  lineas: Token[][];
  resaltar?: number[];
  escalon?: number;
  tam?: number;
  derecha?: React.ReactNode;
}> = ({ caja, at, archivo, Icono, lineas, resaltar = [], escalon = 4, tam = 26, derecha }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = useAparece(at);
  return (
    <div
      style={{
        position: "absolute",
        left: caja.x,
        top: caja.y,
        width: caja.w,
        height: caja.h,
        boxSizing: "border-box",
        borderRadius: 20,
        border: `1.5px solid ${linea}`,
        background: relleno,
        overflow: "hidden",
        opacity: Math.min(1, p * 1.6),
        transform: `translateY(${(1 - p) * 24}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", borderBottom: `1.5px solid ${linea}`, fontFamily: mono, fontSize: 23, color: v.niebla }}>
        {Icono ? <Icono size={26} strokeWidth={1.6} color={v.ceniza} /> : null}
        <span style={{ whiteSpace: "nowrap" }}>{archivo}</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>{derecha}</div>
      </div>
      <div style={{ padding: "14px 0" }}>
        {lineas.map((toks, i) => {
          const k = transicion(frame, at + 8 + i * escalon, fps, 450, EXPO_OUT);
          const res = resaltar.includes(i);
          return (
            <div
              key={i}
              style={{
                fontFamily: mono,
                fontSize: tam,
                lineHeight: 1.6,
                padding: "0 20px",
                whiteSpace: "pre",
                opacity: k,
                transform: `translateX(${(1 - k) * 16}px)`,
                background: res ? "rgba(255,184,41,0.08)" : undefined,
                borderLeft: `3px solid ${res ? v.azafran : "transparent"}`,
              }}
            >
              {toks.map(([t, c], j) => (
                <span key={j} style={{ color: c ?? sintaxis.texto }}>
                  {t}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Una pestaña pequeña: ambiente, workspace, etiqueta.
export const Chip: React.FC<{ texto: string; activo?: boolean; tam?: number }> = ({ texto, activo = false, tam = 21 }) => (
  <span style={{ fontFamily: mono, fontSize: tam, padding: "5px 14px", borderRadius: 999, border: `1.5px solid ${activo ? v.azafran : linea}`, color: activo ? v.azafran : v.ceniza, whiteSpace: "nowrap" }}>{texto}</span>
);

// Un navegador: la cara visible del frontend.
export const Navegador: React.FC<{ caja: Caja; at: number; url: string; children: React.ReactNode }> = ({ caja, at, url, children }) => {
  const p = useAparece(at);
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
        border: `1.5px solid ${linea}`,
        background: relleno,
        overflow: "hidden",
        opacity: Math.min(1, p * 1.6),
        transform: `translateY(${(1 - p) * 24}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: `1.5px solid ${linea}` }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 13, height: 13, borderRadius: 7, border: `1.5px solid ${v.ceniza}` }} />
        ))}
        <div style={{ marginLeft: 14, flex: 1, borderRadius: 999, border: `1.5px solid ${linea}`, padding: "6px 16px", fontFamily: mono, fontSize: 22, color: v.ceniza, whiteSpace: "nowrap" }}>{url}</div>
      </div>
      <div style={{ padding: 24, position: "relative", height: caja.h - 70, boxSizing: "border-box" }}>{children}</div>
    </div>
  );
};

// Indicador de carga: un arco que gira.
export const Cargando: React.FC<{ tam?: number; color?: string }> = ({ tam = 34, color = v.azafran }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={tam} height={tam} viewBox="0 0 24 24" style={{ transform: `rotate(${frame * 12}deg)` }}>
      <circle cx="12" cy="12" r="9" fill="none" stroke={linea} strokeWidth="2.4" />
      <path d="M12 3 A9 9 0 0 1 21 12" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
};
