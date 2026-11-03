import React from "react";
import { v } from "./tokens";

// Ilustración isométrica en el lenguaje de hairline (@lucasmarkes/hairline, MIT), dibujada cuadro a cuadro:
// cámara 2:1 a 45°, sólidos redondeados que son el casco de dos anillos (base y tapa), una silueta clara,
// un pliegue tenue en la tapa y nada más; las placas se rellenan con el color del fondo y se pintan
// de atrás hacia adelante, así lo cercano tapa lo lejano. Un solo realce a la vez.
// El paquete original anima con su propio reloj y el puntero; aquí todo depende del número de cuadro.

export const iso = {
  placa: v.vacio,
  sil: "#A1A1AA",
  medio: "#52525B",
  tenue: "#3F3F46",
  luz: "#FAFAFA",
  dato: v.azafran,
  activo: v.iris,
  grosor: 2.2,
};

export type Proy = (x: number, y: number, z: number) => [number, number];
type Muestra = { u: number; v: number; nu: number; nv: number };

// Cámara Cam(45, 0.5, S): +x baja a la derecha, +y baja a la izquierda; el rincón con mayor x + y es el más cercano.
export const camara = (S: number, cx: number, cy: number): Proy => {
  const c = Math.SQRT1_2;
  return (x, y, z) => [cx + (x - y) * c * S, cy + (x + y) * c * 0.5 * S - z * 0.866 * S];
};

export const rrect = (u0: number, v0: number, u1: number, v1: number, r: number, n = 4): Muestra[] => {
  const rr = Math.max(0, Math.min(r, (u1 - u0) / 2, (v1 - v0) / 2));
  const esquinas: [number, number, number][] = [
    [u1 - rr, v0 + rr, -90],
    [u1 - rr, v1 - rr, 0],
    [u0 + rr, v1 - rr, 90],
    [u0 + rr, v0 + rr, 180],
  ];
  const out: Muestra[] = [];
  for (const [cu, cv, a0] of esquinas) {
    for (let i = 0; i <= n; i++) {
      const a = ((a0 + (90 * i) / n) * Math.PI) / 180;
      out.push({ u: cu + rr * Math.cos(a), v: cv + rr * Math.sin(a), nu: Math.cos(a), nv: Math.sin(a) });
    }
  }
  return out;
};

export const circ = (cx: number, cy: number, R: number, n = 32): Muestra[] =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return { u: cx + R * Math.cos(a), v: cy + R * Math.sin(a), nu: Math.cos(a), nv: Math.sin(a) };
  });

const casco = (pts: [number, number][]) => {
  const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cruz = (o: number[], a: number[], b: number[]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: [number, number][] = [];
  for (const q of p) {
    while (lo.length >= 2 && cruz(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop();
    lo.push(q);
  }
  const hi: [number, number][] = [];
  for (const q of p.reverse()) {
    while (hi.length >= 2 && cruz(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop();
    hi.push(q);
  }
  return lo.slice(0, -1).concat(hi.slice(0, -1));
};

const cerrado = (pts: [number, number][]) => (pts.length ? `M${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("L")}Z` : "");
const abierto = (pts: [number, number][]) => (pts.length ? `M${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("L")}` : "");

// La corrida cíclica de muestras que miran a la cámara: el pliegue que se ve en la tapa.
const corrida = (ring: Muestra[]) => {
  const ok = ring.map((m) => m.nu + m.nv > 0.05);
  const i0 = ok.findIndex((b, i) => b && !ok[(i - 1 + ok.length) % ok.length]);
  if (i0 < 0) return ok.every(Boolean) ? ring : [];
  const out: Muestra[] = [];
  for (let k = 0; k < ring.length; k++) {
    const i = (i0 + k) % ring.length;
    if (!ok[i]) break;
    out.push(ring[i]);
  }
  return out;
};

const prisma = (P: Proy, ring: Muestra[], inner: Muestra[], z0: number, z1: number) => ({
  sil: cerrado(casco([...ring.map((m) => P(m.u, m.v, z0)), ...ring.map((m) => P(m.u, m.v, z1))])),
  pliegue: abierto(corrida(inner).map((m) => P(m.u, m.v, z1))),
});

type Comun = { P: Proy; z0?: number; z1: number; luz?: boolean; color?: string; opacidad?: number; b?: number };

// Un sólido de planta rectangular redondeada, de z0 a z1.
export const Solido: React.FC<Comun & { x0: number; y0: number; x1: number; y1: number; r?: number }> = ({ P, x0, y0, x1, y1, z0 = 0, z1, r = 4, b = 1.6, luz = false, color, opacidad = 1 }) => {
  const bb = Math.min(b, (x1 - x0) / 3, (y1 - y0) / 3);
  const { sil, pliegue } = prisma(P, rrect(x0, y0, x1, y1, r), rrect(x0 + bb, y0 + bb, x1 - bb, y1 - bb, Math.max(0, r - bb)), z0, z1);
  const trazo = color ?? (luz ? iso.luz : iso.sil);
  return (
    <g opacity={opacidad}>
      <path d={sil} fill={iso.placa} stroke={trazo} strokeWidth={iso.grosor} strokeLinejoin="round" />
      <path d={pliegue} fill="none" stroke={luz || color ? trazo : iso.tenue} strokeOpacity={luz || color ? 0.55 : 1} strokeWidth={iso.grosor * 0.8} strokeLinecap="round" />
    </g>
  );
};

// Un cilindro: base de datos, bobina, tambor.
export const Cilindro: React.FC<Comun & { cx: number; cy: number; R: number }> = ({ P, cx, cy, R, z0 = 0, z1, b = 2, luz = false, color, opacidad = 1 }) => {
  const { sil, pliegue } = prisma(P, circ(cx, cy, R), circ(cx, cy, Math.max(1, R - b)), z0, z1);
  const anillo = (z: number) => abierto(corrida(circ(cx, cy, R, 32)).map((m) => P(m.u, m.v, z)));
  const trazo = color ?? (luz ? iso.luz : iso.sil);
  const h = z1 - z0;
  return (
    <g opacity={opacidad}>
      <path d={sil} fill={iso.placa} stroke={trazo} strokeWidth={iso.grosor} strokeLinejoin="round" />
      <path d={pliegue} fill="none" stroke={luz || color ? trazo : iso.tenue} strokeOpacity={luz || color ? 0.55 : 1} strokeWidth={iso.grosor * 0.8} />
      {h > 18 ? <path d={`${anillo(z0 + h / 3)}${anillo(z0 + (2 * h) / 3)}`} fill="none" stroke={iso.tenue} strokeWidth={iso.grosor * 0.7} /> : null}
    </g>
  );
};

type P3 = [number, number, number];

const largo = (pts: P3[]) => {
  let L = 0;
  for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1], pts[i][2] - pts[i - 1][2]);
  return L;
};

// El punto a una fracción t del recorrido.
export const sobre = (pts: P3[], t: number): P3 => {
  const L = largo(pts) * Math.min(1, Math.max(0, t));
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1], pts[i][2] - pts[i - 1][2]);
    if (acc + d >= L) {
      const k = d ? (L - acc) / d : 0;
      return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k, pts[i - 1][2] + (pts[i][2] - pts[i - 1][2]) * k];
    }
    acc += d;
  }
  return pts[pts.length - 1];
};

// Un enlace en el espacio que se dibuja de 0 a 1. Discontinuo: una guía, pintada detrás.
export const Enlace: React.FC<{ P: Proy; pts: P3[]; avance?: number; discontinuo?: boolean; color?: string; grosor?: number; opacidad?: number }> = ({
  P,
  pts,
  avance = 1,
  discontinuo = false,
  color = iso.medio,
  grosor = iso.grosor,
  opacidad = 1,
}) => {
  const d = abierto(pts.map((p) => P(p[0], p[1], p[2])));
  if (discontinuo) return <path d={d} fill="none" stroke={color} strokeWidth={grosor} strokeDasharray="6 8" strokeLinecap="round" opacity={opacidad * Math.min(1, avance * 3)} />;
  return <path d={d} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - avance} opacity={opacidad} />;
};

// Un paquete de datos: un cubo pequeño que recorre un enlace.
export const Paquete: React.FC<{ P: Proy; pts: P3[]; t: number; lado?: number; color?: string; visible?: boolean }> = ({ P, pts, t, lado = 7, color = iso.dato, visible = true }) => {
  if (!visible || t <= 0 || t >= 1) return null;
  const [x, y, z] = sobre(pts, t);
  return <Solido P={P} x0={x - lado / 2} y0={y - lado / 2} x1={x + lado / 2} y1={y + lado / 2} z0={z} z1={z + lado} r={2} b={1} color={color} />;
};

export const Punto: React.FC<{ P: Proy; at: P3; r?: number; color?: string; opacidad?: number }> = ({ P, at, r = 5, color = iso.luz, opacidad = 1 }) => {
  const [x, y] = P(at[0], at[1], at[2]);
  return <circle cx={x} cy={y} r={r} fill={color} opacity={opacidad} />;
};

// Lienzo de una figura: un svg del ancho del contenido.
export const Lienzo: React.FC<{ ancho?: number; alto: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ ancho = 912, alto, children, style }) => (
  <svg width={ancho} height={alto} viewBox={`0 0 ${ancho} ${alto}`} style={{ overflow: "visible", ...style }}>
    {children}
  </svg>
);
