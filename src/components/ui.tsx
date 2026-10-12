import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, gradients } from "../theme";
import { clamp } from "./motion";

// Números en formato chileno: coma decimal.
export const fmt = (value: number, decimals = 1): string =>
  value.toLocaleString("es-CL", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export const fmtSigned = (value: number, decimals = 1): string =>
  `${value > 0 ? "+" : value < 0 ? "−" : ""}${fmt(Math.abs(value), decimals)}`;

// Decimales justos: 2 → "2", 0,25 → "0,25", 2,5 → "2,5".
export const fmtAuto = (n: number): string =>
  fmt(n, Number.isInteger(n) ? 0 : Math.round(n * 10) === n * 10 ? 1 : 2);

export const GradientText: React.FC<{ gradient?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({
  gradient = gradients.brand,
  style,
  children,
}) => (
  <span
    style={{
      backgroundImage: gradient,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      WebkitTextFillColor: "transparent",
      ...style,
    }}
  >
    {children}
  </span>
);

export const Glass: React.FC<{ style?: React.CSSProperties; glow?: string; children: React.ReactNode }> = ({
  style,
  glow,
  children,
}) => (
  <div
    style={{
      background: colors.glass,
      border: `1.5px solid ${colors.line}`,
      borderRadius: 36,
      padding: "28px 32px",
      backdropFilter: "blur(24px)",
      boxShadow: glow ? `0 0 80px -10px ${glow}, inset 0 1px 0 rgba(255,255,255,0.08)` : "inset 0 1px 0 rgba(255,255,255,0.08)",
      ...style,
    }}
  >
    {children}
  </div>
);

// Cifra que se cuenta frente al espectador.
export const Counter: React.FC<{
  to: number;
  from?: number;
  at: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  signed?: boolean;
}> = ({ to, from = 0, at, duration = 28, decimals = 1, prefix = "", suffix = "", signed = false }) => {
  const frame = useCurrentFrame();
  // Easing.cubic llega exactamente al valor final (la curva exponencial se queda en 99,9%).
  const v = interpolate(frame - at, [0, duration], [from, to], { ...clamp, easing: Easing.out(Easing.cubic) });
  const sign = signed && to > 0 ? "+" : v < -0.0001 ? "−" : "";
  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {sign}
      {fmt(Math.abs(v), decimals)}
      {suffix}
    </span>
  );
};

// Texto de apoyo bajo un título o sobre un gráfico: frase corta, sin mayúsculas forzadas.
export const Note: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
  <div style={{ fontFamily: fonts.sans, fontSize: 32, fontWeight: 500, lineHeight: 1.3, color: colors.dim, ...style }}>
    {children}
  </div>
);
