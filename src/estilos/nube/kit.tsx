import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useScene } from "../../components/narracion";
import type { Timeline } from "../../components/narracion";
import { SAFE } from "../../theme";
import { EXPO_OUT, transicion } from "../vacio/movimiento";
import { codigo, fuente, n, tipo } from "./tokens";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Fondo blanco con una grilla de puntos muy tenue que se desplaza despacio.
export const FondoNube: React.FC = () => {
  const frame = useCurrentFrame();
  const d = (frame * 0.15) % 48;
  return (
    <AbsoluteFill style={{ background: n.fondo }}>
      <AbsoluteFill style={{ backgroundImage: `radial-gradient(${n.borde} 1.6px, transparent 1.6px)`, backgroundSize: "48px 48px", backgroundPosition: `${d}px ${d}px`, opacity: 0.55 }} />
    </AbsoluteFill>
  );
};

export const Sube: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; dist?: number }> = ({ at, children, style, dist = 28 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - at, [0, 16], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * dist}px)`, ...style }}>{children}</div>;
};

export const Escena: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { duration } = useScene();
  const entra = interpolate(frame, [0, 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const sale = interpolate(frame, [duration - 12, duration], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill style={{ opacity: entra * (1 - sale), transform: `translateY(${(1 - entra) * 24 - sale * 24}px)`, fontFamily: fuente, color: n.texto }}>
      <div style={{ position: "absolute", top: SAFE.top + 20, left: SAFE.left, right: SAFE.right, bottom: 1920 - SAFE.contentBottom + 40, display: "flex", flexDirection: "column" }}>{children}</div>
    </AbsoluteFill>
  );
};

// Titular cinético: "línea uno|línea *dos*"; lo marcado con * va en el color de acento.
export const Cinetico: React.FC<{ at: number; texto: string; tam?: number; acento?: string; style?: React.CSSProperties }> = ({ at, texto, tam = tipo.titulo.fontSize, acento = n.azul, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let enAcento = false;
  let k = 0;
  const lineas = texto.split("|").map((l) =>
    l.split(" ").map((w) => {
      const abre = w.startsWith("*");
      const cierra = w.endsWith("*") && (w.length > 1 || enAcento);
      const ac = enAcento || abre;
      if (abre && !cierra) enAcento = true;
      if (cierra) enAcento = false;
      return { w: w.replace(/^\*/, "").replace(/\*$/, ""), ac };
    }),
  );
  return (
    <div style={{ ...tipo.titulo, fontSize: tam, ...style }}>
      {lineas.map((ps, li) => (
        <div key={li} style={{ whiteSpace: "nowrap" }}>
          {ps.map(({ w, ac }, wi) => {
            const p = transicion(frame, at + (k++ * 35 * fps) / 1000, fps, 650, EXPO_OUT);
            return (
              <span key={wi} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.12em", marginBottom: "-0.12em", marginRight: wi < ps.length - 1 ? "0.26em" : 0 }}>
                <span style={{ display: "inline-block", transform: `translateY(${(1 - p) * 105}%)`, color: ac ? acento : undefined }}>
                  {w}
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Encabezado de escena: rótulo de la serie con una línea de tres colores y el titular.
export const Cabeza: React.FC<{ at: number; serie: string; titulo: string; tam?: number }> = ({ at, serie, titulo, tam }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 600, EXPO_OUT);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: k }}>
        <div style={{ display: "flex", gap: 4 }}>
          {[n.azul, n.amarillo, n.verde].map((c) => (
            <div key={c} style={{ width: 22 * k, height: 6, borderRadius: 3, background: c }} />
          ))}
        </div>
        <span style={{ ...tipo.rotulo, color: n.texto2 }}>{serie}</span>
      </div>
      <Cinetico at={at + 3} texto={titulo} tam={tam} style={{ marginTop: 18 }} />
    </div>
  );
};

// Tarjeta blanca con borde fino y una franja de color a la izquierda.
export const Tarjeta: React.FC<{ at: number; color?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ at, color = n.azul, style, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 18, stiffness: 140 } });
  if (frame < at - 1) return null;
  return (
    <div
      style={{
        position: "relative",
        background: n.fondo,
        border: `2px solid ${n.borde}`,
        borderRadius: 20,
        padding: "22px 26px 22px 34px",
        boxSizing: "border-box",
        boxShadow: "0 2px 6px rgba(60,64,67,0.10)",
        overflow: "hidden",
        opacity: Math.min(1, p * 1.5),
        transform: `translateY(${(1 - p) * 20}px)`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: color }} />
      {children}
    </div>
  );
};

export const Chip: React.FC<{ at: number; color?: string; children: React.ReactNode }> = ({ at, color = n.azul, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 400, EXPO_OUT);
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 22px", borderRadius: 999, border: `2px solid ${color}`, color, fontSize: 26, fontWeight: 500, opacity: k, background: n.fondo }}>{children}</span>;
};

export const Nota: React.FC<{ at: number; color?: string; tam?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ at, color = n.texto2, tam = 26, style, children }) => (
  <Sube at={at} dist={12} style={style}>
    <div style={{ fontSize: tam, color, lineHeight: 1.35 }}>{children}</div>
  </Sube>
);

export const Pildora: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 14, stiffness: 160 } });
  return (
    <div style={{ display: "inline-flex", alignSelf: "flex-start", padding: "24px 44px", borderRadius: 999, background: n.azul, color: n.fondo, fontSize: 30, fontWeight: 500, opacity: Math.min(1, p * 2), transform: `scale(${0.9 + 0.1 * p})` }}>
      {children}
    </div>
  );
};

// Bloque de código claro, con números de línea y resaltado de líneas.
export type Tok = [string, string?];
export const Codigo: React.FC<{ at: number; archivo: string; lineas: Tok[][]; resaltar?: number[]; tam?: number; style?: React.CSSProperties }> = ({ at, archivo, lineas, resaltar = [], tam = 24, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 500, EXPO_OUT);
  return (
    <div style={{ border: `2px solid ${n.borde}`, borderRadius: 18, background: n.superficie, overflow: "hidden", opacity: k, transform: `translateY(${(1 - k) * 16}px)`, ...style }}>
      <div style={{ padding: "12px 20px", borderBottom: `2px solid ${n.borde}`, fontFamily: codigo, fontSize: 22, color: n.texto2, background: n.fondo }}>{archivo}</div>
      <div style={{ padding: "12px 0" }}>
        {lineas.map((toks, i) => {
          const kl = transicion(frame, at + 6 + i * 3, fps, 400, EXPO_OUT);
          const res = resaltar.includes(i);
          return (
            <div key={i} style={{ display: "flex", fontFamily: codigo, fontSize: tam, lineHeight: 1.6, whiteSpace: "pre", opacity: kl, background: res ? n.azulClaro : undefined, borderLeft: `4px solid ${res ? n.azul : "transparent"}` }}>
              <span style={{ width: 52, textAlign: "right", paddingRight: 16, color: n.texto3 }}>{i + 1}</span>
              <span>
                {toks.map(([t, c], j) => (
                  <span key={j} style={{ color: c ?? n.texto }}>
                    {t}
                  </span>
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Colores de sintaxis claros.
export const sx = { clave: "#A142F4", texto: "#188038", num: "#B06000", fn: n.azul, com: n.texto3 };

// Ejes claros para gráficos SVG.
type Plano = { px: (x: number) => number; py: (y: number) => number };
export const Ejes: React.FC<{ ancho: number; alto: number; x: [number, number]; y: [number, number]; at: number; rotuloX?: string; rotuloY?: string; marcasX?: { v: number; t: string }[]; marcasY?: { v: number; t: string }[]; children: (p: Plano) => React.ReactNode }> = ({ ancho, alto, x, y, at, rotuloX, rotuloY, marcasX = [], marcasY = [], children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 700, EXPO_OUT);
  const M = { l: 70, r: 20, t: 40, b: 60 };
  const px = (vx: number) => M.l + ((ancho - M.l - M.r) * (vx - x[0])) / (x[1] - x[0]);
  const py = (vy: number) => alto - M.b - ((alto - M.t - M.b) * (vy - y[0])) / (y[1] - y[0]);
  return (
    <svg width={ancho} height={alto} style={{ overflow: "visible", display: "block", opacity: k }}>
      {marcasY.map((m) => (
        <g key={m.t}>
          <line x1={M.l} y1={py(m.v)} x2={ancho - M.r} y2={py(m.v)} stroke={n.borde} strokeWidth={1.5} />
          <text x={M.l - 12} y={py(m.v) + 8} textAnchor="end" fontFamily={codigo} fontSize={20} fill={n.texto2}>
            {m.t}
          </text>
        </g>
      ))}
      <line x1={M.l} y1={alto - M.b} x2={ancho - M.r} y2={alto - M.b} stroke={n.texto3} strokeWidth={2} />
      {marcasX.map((m) => (
        <text key={m.t} x={px(m.v)} y={alto - M.b + 32} textAnchor="middle" fontFamily={codigo} fontSize={20} fill={n.texto2}>
          {m.t}
        </text>
      ))}
      {rotuloX ? (
        <text x={ancho - M.r} y={alto - 2} textAnchor="end" fontFamily={fuente} fontSize={24} fill={n.texto2}>
          {rotuloX}
        </text>
      ) : null}
      {rotuloY ? (
        <text x={M.l} y={M.t - 14} fontFamily={fuente} fontSize={24} fill={n.texto2}>
          {rotuloY}
        </text>
      ) : null}
      {children({ px, py })}
    </svg>
  );
};

// Fórmulas claras (STIX ya está cargada por el kit matemático del estilo vacío).
export const serif = "'STIX Two Text', 'Times New Roman', serif";
export const Formula: React.FC<{ tam?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ tam = 60, children, style }) => (
  <div style={{ fontFamily: serif, fontSize: tam, lineHeight: 1.2, color: n.texto, display: "flex", alignItems: "center", whiteSpace: "nowrap", ...style }}>{children}</div>
);
export const Op: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: n.texto2, padding: "0 0.18em" }}>{children}</span>;
export const Var: React.FC<{ color?: string; activa?: boolean; children: React.ReactNode; recta?: boolean }> = ({ color = n.texto, activa, children, recta }) => (
  <span style={{ fontStyle: recta ? "normal" : "italic", color, padding: "0 0.08em", borderRadius: 10, background: activa ? `${color}1F` : "transparent", boxShadow: activa ? `0 0 0 2px ${color}` : "none" }}>{children}</span>
);
export const Frac: React.FC<{ arriba: React.ReactNode; abajo: React.ReactNode }> = ({ arriba, abajo }) => (
  <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", margin: "0 0.12em" }}>
    <span style={{ padding: "0 0.15em 0.06em" }}>{arriba}</span>
    <span style={{ alignSelf: "stretch", height: 3, background: n.texto2 }} />
    <span style={{ padding: "0.06em 0.15em 0" }}>{abajo}</span>
  </span>
);

// Tarjeta de fórmula: la fórmula grande en STIX y, debajo, qué significa cada símbolo.
export const FormulaCard: React.FC<{ at: number; tam?: number; formula: React.ReactNode; leyenda?: [React.ReactNode, string, string][]; columnas?: number; style?: React.CSSProperties }> = ({ at, tam = 60, formula, leyenda = [], columnas = 1, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 500, EXPO_OUT);
  return (
    <div style={{ background: n.superficie, border: `2px solid ${n.borde}`, borderRadius: 20, padding: "22px 28px", opacity: k, transform: `translateY(${(1 - k) * 14}px)`, ...style }}>
      <Formula tam={tam}>{formula}</Formula>
      {leyenda.length ? (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${columnas}, 1fr)`, columnGap: 24, rowGap: 8, marginTop: 16 }}>
          {leyenda.map(([sim, col, txt], i) => (
            <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 12, opacity: transicion(frame, at + 8 + i * 5, fps, 400, EXPO_OUT) }}>
              <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 34, color: col, minWidth: 34 }}>{sim}</span>
              <span style={{ fontSize: 24, color: n.texto2 }}>{txt}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

// Subtítulos bilingües: español con la palabra que suena en azul y, debajo, la traducción al inglés.
export const SubtitulosNube: React.FC<{ timeline: Timeline }> = ({ timeline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const frase = timeline.frases.find((f) => t >= f.inicio - 0.05 && t < f.fin + 0.12);
  if (!frase) return null;
  const palabras = frase.texto.split(" ");
  const pesos = palabras.map((w) => w.replace(/[^\p{L}\p{N}]/gu, "").length + 2);
  const total = pesos.reduce((a, b) => a + b, 0);
  const dur = frase.fin - frase.inicio;
  let acc = 0;
  const inicios = pesos.map((w) => {
    const s = frase.inicio + (acc / total) * dur;
    acc += w;
    return s;
  });
  const entra = interpolate(frame - Math.round(frase.inicio * fps), [0, 10], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: SAFE.captionsTop, opacity: entra, transform: `translateY(${(1 - entra) * 12}px)` }}>
      <div style={{ fontFamily: fuente, fontWeight: 500, fontSize: frase.en ? 42 : 48, lineHeight: 1.22, color: n.texto, background: "rgba(255,255,255,0.94)", borderRadius: 24, padding: "18px 24px", border: `2px solid ${n.borde}` }}>
        {palabras.map((w, i) => {
          const activa = t >= inicios[i] && (i === palabras.length - 1 || t < inicios[i + 1]);
          const dicha = t >= inicios[i];
          return (
            <span key={`${w}-${i}`} style={{ color: activa ? n.azul : n.texto, opacity: dicha ? 1 : 0.35 }}>
              {w}{" "}
            </span>
          );
        })}
        {frase.en ? (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: `2px solid ${n.borde}`, fontSize: 32, fontWeight: 400, lineHeight: 1.25, color: n.texto2 }}>
            <span style={{ fontFamily: codigo, fontSize: 20, fontWeight: 500, color: n.azul, marginRight: 12, verticalAlign: "2px" }}>EN</span>
            {frase.en}
          </div>
        ) : null}
      </div>
    </div>
  );
};
