// Kit "Be&Go × Material 3 Expressive" para el video de flujos: tipografía Google Sans, formas expresivas (galleta,
// trébol, píldora), las curvas de movimiento de Material (emphasized / standard) y springs, revelados secuenciales.
// Los colores NO son los de Google: es un esquema tonal de Material construido desde el copihue de Be&Go
// (primario), el azul noche del sur (secundario) y el ámbar del sol (terciario).
import "@fontsource/google-sans/400.css";
import "@fontsource/google-sans/500.css";
import "@fontsource/google-sans/700.css";

import React from "react";
import { AbsoluteFill, continueRender, delayRender, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Timeline } from "../../components/narracion";
import { useScene } from "../../components/narracion";

const h = delayRender("Cargando Google Sans");
Promise.all(["400 32px 'Google Sans'", "500 32px 'Google Sans'", "700 32px 'Google Sans'"].map((f) => document.fonts.load(f))).then(
  () => continueRender(h),
  () => continueRender(h),
);

export const gs = "'Google Sans', 'Product Sans', system-ui, sans-serif";

/** Esquema tonal (claro) a partir de la semilla copihue #C2185B. */
export const m = {
  primary: "#A3134C",
  onPrimary: "#FFFFFF",
  primaryContainer: "#FFD9E2",
  onPrimaryContainer: "#3E0020",
  secondary: "#2C5F82",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#CBE6FF",
  onSecondaryContainer: "#001E30",
  tertiary: "#7A5900",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#FFDEA0",
  onTertiaryContainer: "#261900",
  ok: "#2E6A3E",
  okContainer: "#B1F1BB",
  error: "#B3261E",
  errorContainer: "#F9DEDC",
  surface: "#FFF8F7",
  surfaceDim: "#F0E3E5",
  surfaceContainerLow: "#FCF0F2",
  surfaceContainer: "#F6EAEC",
  surfaceContainerHigh: "#F0E4E6",
  surfaceContainerHighest: "#EADEE0",
  onSurface: "#22191B",
  onSurfaceVariant: "#524346",
  outline: "#847376",
  outlineVariant: "#D6C2C5",
  inverseSurface: "#382E30",
  inverseOnSurface: "#FEEDEF",
};

// ---------- Movimiento (Material 3) ----------
export const EMPHASIZED_DECEL = Easing.bezier(0.05, 0.7, 0.1, 1);
export const EMPHASIZED_ACCEL = Easing.bezier(0.3, 0, 0.8, 0.15);
export const STANDARD = Easing.bezier(0.2, 0, 0, 1);
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Spring de Material 3 Expressive (razón de amortiguamiento y rigidez), determinista por fotograma. */
const springCfg = (ratio: number, stiffness: number) => ({ mass: 1, stiffness, damping: 2 * ratio * Math.sqrt(stiffness), overshootClamping: false });
export const SPATIAL_FAST = springCfg(0.6, 800);
export const SPATIAL_DEFAULT = springCfg(0.8, 380);
export const EFFECTS = springCfg(1, 1600);

export const useSpring = (at: number, cfg = SPATIAL_DEFAULT) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - at, fps, config: cfg });
};

/** 0→1 con la curva enfatizada (entradas). */
export const useIn = (at: number, dur = 18) => {
  const frame = useCurrentFrame();
  return interpolate(frame - at, [0, dur], [0, 1], { ...clamp, easing: EMPHASIZED_DECEL });
};

/** Entra subiendo con la curva enfatizada; los hijos de un `Seq` salen uno tras otro. */
export const In: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; y?: number; x?: number; dur?: number }> = ({ at, children, style, y = 24, x = 0, dur = 18 }) => {
  const p = useIn(at, dur);
  return <div style={{ opacity: Math.min(1, p * 1.4), transform: `translate(${(1 - p) * x}px, ${(1 - p) * y}px)`, ...style }}>{children}</div>;
};

/** Escala con spring expresivo (rebote leve). */
export const Grow: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; from?: number; cfg?: ReturnType<typeof springCfg> }> = ({ at, children, style, from = 0.6, cfg = SPATIAL_FAST }) => {
  const s = useSpring(at, cfg);
  return <div style={{ opacity: Math.min(1, s * 2), transform: `scale(${from + (1 - from) * s})`, ...style }}>{children}</div>;
};

/** Revelado secuencial: cada hijo entra `step` fotogramas después del anterior. */
export const Seq: React.FC<{ at: number; step?: number; children: React.ReactNode[]; style?: React.CSSProperties; y?: number; x?: number }> = ({ at, step = 5, children, style, y = 20, x = 0 }) => (
  <div style={style}>
    {React.Children.map(children, (c, i) => (
      <In at={at + i * step} y={y} x={x}>
        {c}
      </In>
    ))}
  </div>
);

// ---------- Formas expresivas ----------
type ShapeKind = "circle" | "cookie9" | "cookie12" | "clover4" | "sunny" | "soft6";
const LOBES: Record<ShapeKind, [number, number]> = {
  circle: [0, 0],
  cookie9: [9, 0.08],
  cookie12: [12, 0.06],
  clover4: [4, 0.2],
  sunny: [8, 0.12],
  soft6: [6, 0.1],
};

/** Contorno polar r(θ) = R·(1 + a·cos(kθ)): las formas de Material Expressive, morfables entre sí con `amp`. */
export function shapePath(kind: ShapeKind, size: number, amp = 1, rot = 0): string {
  const [k, a] = LOBES[kind];
  const R = size / 2 / (1 + a);
  const pts: string[] = [];
  for (let i = 0; i <= 180; i++) {
    const t = (i / 180) * Math.PI * 2;
    const r = R * (1 + a * amp * Math.cos(k * (t + rot)));
    pts.push(`${(size / 2 + r * Math.cos(t)).toFixed(2)},${(size / 2 + r * Math.sin(t)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

export const Shape: React.FC<{ kind: ShapeKind; size: number; color: string; amp?: number; rot?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({ kind, size, color, amp = 1, rot = 0, style, children }) => (
  <div style={{ position: "relative", width: size, height: size, ...style }}>
    <svg width={size} height={size} style={{ position: "absolute", inset: 0 }}>
      <path d={shapePath(kind, size, amp, rot)} fill={color} />
    </svg>
    {children ? <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div> : null}
  </div>
);

/** Número de flujo dentro de una galleta que gira y se forma con un spring. */
export const FlowBadge: React.FC<{ n: number; at: number; size?: number; color?: string; on?: string }> = ({ n, at, size = 120, color = m.primaryContainer, on = m.onPrimaryContainer }) => {
  const frame = useCurrentFrame();
  const s = useSpring(at, SPATIAL_FAST);
  return (
    <div style={{ transform: `scale(${0.4 + 0.6 * s}) rotate(${(1 - s) * -60}deg)`, opacity: Math.min(1, s * 2) }}>
      <Shape kind="cookie9" size={size} color={color} rot={frame / 240}>
        <span style={{ fontFamily: gs, fontWeight: 700, fontSize: size * 0.46, color: on }}>{n}</span>
      </Shape>
    </div>
  );
};

// ---------- Componentes ----------
export const Chip: React.FC<{ children: React.ReactNode; tone?: "neutral" | "primary" | "secondary" | "tertiary" | "ok" | "error"; style?: React.CSSProperties; icon?: React.ReactNode }> = ({ children, tone = "neutral", style, icon }) => {
  const tones = {
    neutral: [m.surfaceContainerHigh, m.onSurfaceVariant],
    primary: [m.primaryContainer, m.onPrimaryContainer],
    secondary: [m.secondaryContainer, m.onSecondaryContainer],
    tertiary: [m.tertiaryContainer, m.onTertiaryContainer],
    ok: [m.okContainer, "#00210B"],
    error: [m.errorContainer, "#410E0B"],
  }[tone];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 52, padding: "0 22px", borderRadius: 16, background: tones[0], color: tones[1], fontFamily: gs, fontWeight: 500, fontSize: 24, whiteSpace: "nowrap", ...style }}>
      {icon}
      {children}
    </span>
  );
};

export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; tone?: string }> = ({ children, style, tone = m.surfaceContainer }) => (
  <div style={{ background: tone, borderRadius: 32, padding: 32, fontFamily: gs, color: m.onSurface, ...style }}>{children}</div>
);

export const Label: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = m.primary }) => (
  <div style={{ fontFamily: gs, fontWeight: 500, fontSize: 24, letterSpacing: "0.02em", color }}>{children}</div>
);

export const Display: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 76, style }) => (
  <div style={{ fontFamily: gs, fontWeight: 500, fontSize: size, lineHeight: 1.08, letterSpacing: "-0.015em", color: m.onSurface, ...style }}>{children}</div>
);

export const Body: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 30, style }) => (
  <div style={{ fontFamily: gs, fontWeight: 400, fontSize: size, lineHeight: 1.4, color: m.onSurfaceVariant, ...style }}>{children}</div>
);

/** Paso numerado de un flujo, con la línea que lo une al siguiente dibujándose en secuencia. */
export const Steps: React.FC<{ at: number; items: string[]; step?: number; active?: number }> = ({ at, items, step = 8, active }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {items.map((it, i) => {
        const p = interpolate(frame - (at + i * step), [0, 16], [0, 1], { ...clamp, easing: EMPHASIZED_DECEL });
        const line = interpolate(frame - (at + i * step + 8), [0, 14], [0, 1], { ...clamp, easing: STANDARD });
        const on = active === undefined || active >= i;
        return (
          <div key={it} style={{ display: "flex", gap: 22, opacity: p }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 26, background: on ? m.primary : m.surfaceContainerHighest, color: on ? m.onPrimary : m.onSurfaceVariant, fontFamily: gs, fontWeight: 700, fontSize: 25, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.6 + 0.4 * p})` }}>
                {i + 1}
              </div>
              {i < items.length - 1 ? <div style={{ width: 4, height: 40, borderRadius: 2, background: m.outlineVariant, transform: `scaleY(${line})`, transformOrigin: "top" }} /> : null}
            </div>
            <div style={{ fontFamily: gs, fontSize: 33, fontWeight: 500, color: on ? m.onSurface : m.onSurfaceVariant, paddingTop: 7, transform: `translateX(${(1 - p) * 16}px)` }}>{it}</div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- Escena y fondo ----------
/** Transición de eje compartido (X): entra desde la derecha con la curva enfatizada y sale hacia la izquierda. */
export const Escena: React.FC<{ children: React.ReactNode; fondo?: string }> = ({ children, fondo }) => {
  const frame = useCurrentFrame();
  const { duration } = useScene();
  const enter = interpolate(frame, [0, 20], [0, 1], { ...clamp, easing: EMPHASIZED_DECEL });
  const exit = interpolate(frame, [duration - 12, duration], [0, 1], { ...clamp, easing: EMPHASIZED_ACCEL });
  return (
    <AbsoluteFill style={{ fontFamily: gs, opacity: Math.min(enter * 1.3, 1) * (1 - exit), background: fondo }}>
      <AbsoluteFill style={{ transform: `translateX(${(1 - enter) * 60 - exit * 60}px)` }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Superficie con dos formas expresivas grandes que giran despacio, en contenedores tonales. */
export const FondoM3: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: m.surface, overflow: "hidden" }}>
      <Shape kind="cookie12" size={1100} color={m.primaryContainer} rot={frame / 900} style={{ position: "absolute", right: -380, top: -420, opacity: 0.55 }} />
      <Shape kind="clover4" size={760} color={m.secondaryContainer} rot={-frame / 1100} style={{ position: "absolute", left: -300, bottom: -360, opacity: 0.45 }} />
      <Shape kind="sunny" size={300} color={m.tertiaryContainer} rot={frame / 600} style={{ position: "absolute", left: 980, bottom: -140, opacity: 0.5 }} />
    </AbsoluteFill>
  );
};

/** Subtítulos en una tarjeta de superficie inversa, la palabra que suena en el contenedor primario. */
export const SubtitulosM3: React.FC<{ timeline: Timeline }> = ({ timeline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  const frase = timeline.frases.find((f) => s >= f.inicio - 0.05 && s < f.fin + 0.12);
  if (!frase) return null;
  const palabras = frase.texto.split(" ");
  const pesos = palabras.map((w) => w.replace(/[^\p{L}\p{N}]/gu, "").length + 2);
  const total = pesos.reduce((a, c) => a + c, 0);
  const dur = frase.fin - frase.inicio;
  let acc = 0;
  const inicios = pesos.map((w) => {
    const v = frase.inicio + (acc / total) * dur;
    acc += w;
    return v;
  });
  const p = interpolate(frame - Math.round(frase.inicio * fps), [0, 10], [0, 1], { ...clamp, easing: EMPHASIZED_DECEL });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 942, display: "flex", justifyContent: "center", opacity: p, transform: `translateY(${(1 - p) * 14}px)` }}>
      <div style={{ maxWidth: 1600, fontFamily: gs, fontWeight: 400, fontSize: 31, lineHeight: 1.32, color: m.inverseOnSurface, background: m.inverseSurface, borderRadius: 24, padding: "13px 30px", textAlign: "center" }}>
        {palabras.map((w, i) => {
          const activa = s >= inicios[i] && (i === palabras.length - 1 || s < inicios[i + 1]);
          const dicha = s >= inicios[i];
          return (
            <span key={`${w}-${i}`} style={{ color: activa ? "#FFB1C8" : m.inverseOnSurface, opacity: dicha ? 1 : 0.45 }}>
              {w}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/** Wordmark Be&Go en Google Sans. */
export const MarcaGS: React.FC<{ tam?: number; color?: string; amp?: string }> = ({ tam = 60, color = m.onSurface, amp = m.primary }) => (
  <span style={{ fontFamily: gs, fontWeight: 700, fontSize: tam, letterSpacing: "-0.02em", color }}>
    Be<span style={{ color: amp }}>&amp;</span>Go
  </span>
);

/** Etiqueta pequeña que dice qué es la pantalla (ejemplo, captura real). */
export const Nota: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <span style={{ display: "inline-block", whiteSpace: "nowrap", fontFamily: gs, fontSize: 18, fontWeight: 500, color: m.onSurfaceVariant, background: m.surfaceContainerHigh, borderRadius: 10, padding: "6px 12px", ...style }}>{children}</span>
);
