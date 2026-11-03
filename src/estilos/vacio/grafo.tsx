import React from "react";
import { serif } from "./mate";
import { ROJO } from "./causal";
import { relleno } from "./tecnico";
import { v } from "./tokens";

// Kit de grafos causales: nodos circulares y flechas de borde a borde, en un lienzo SVG de 912 px.
export type P = [number, number];
export const R = 46;

export const Nodo: React.FC<{ p: P; letra: string; nombre?: string; color: string; k: number; marco?: boolean; r?: number; arriba?: boolean; oculto?: boolean }> = ({ p, letra, nombre, color, k, marco, r = R, arriba, oculto }) => (
  <g opacity={k} transform={`translate(${p[0]},${p[1]}) scale(${0.7 + 0.3 * k})`}>
    {marco ? <rect x={-r - 12} y={-r - 12} width={2 * r + 24} height={2 * r + 24} rx={14} fill="none" stroke={ROJO} strokeWidth={4} /> : null}
    <circle r={r} fill={relleno} stroke={color} strokeWidth={3.5} strokeDasharray={oculto ? "9 8" : undefined} />
    <text y={r * 0.36} textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize={r * 1.05} fill={color}>
      {letra}
    </text>
    {nombre ? (
      <text y={arriba ? -r - 20 : r + 40} textAnchor="middle" fontSize={28} fill={v.hueso} fontWeight={300}>
        {nombre}
      </text>
    ) : null}
  </g>
);

// Flecha de borde a borde de dos nodos, con la punta dibujada a mano.
export const Flecha: React.FC<{ de: P; a: P; k: number; color?: string; ancho?: number; discontinua?: boolean; r?: number; punta?: boolean }> = ({ de, a, k, color = v.ceniza, ancho = 4, discontinua, r = R, punta = true }) => {
  if (k <= 0) return null;
  const dx = a[0] - de[0];
  const dy = a[1] - de[1];
  const L = Math.hypot(dx, dy);
  const ux = dx / L;
  const uy = dy / L;
  const x1 = de[0] + ux * (r + 8);
  const y1 = de[1] + uy * (r + 8);
  const xf = a[0] - ux * (r + 10);
  const yf = a[1] - uy * (r + 10);
  const x2 = x1 + (xf - x1) * k;
  const y2 = y1 + (yf - y1) * k;
  const s = 16;
  const pa = `${x2},${y2} ${x2 - ux * s * 1.4 - uy * s * 0.8},${y2 - uy * s * 1.4 + ux * s * 0.8} ${x2 - ux * s * 1.4 + uy * s * 0.8},${y2 - uy * s * 1.4 - ux * s * 0.8}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - (punta ? ux * s : 0)} y2={y2 - (punta ? uy * s : 0)} stroke={color} strokeWidth={ancho} strokeDasharray={discontinua ? "10 9" : undefined} strokeLinecap="round" />
      {punta && k > 0.9 ? <polygon points={pa} fill={color} /> : null}
    </g>
  );
};

export const Lienzo: React.FC<{ alto: number; top?: number; children: React.ReactNode }> = ({ alto, top = 0, children }) => (
  <svg width={912} height={alto} style={{ position: "absolute", left: 0, top, overflow: "visible" }}>
    {children}
  </svg>
);
