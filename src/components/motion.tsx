import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Progreso 0→1 con resorte suave a partir de `start` (frame local).
export const useSpring = (start: number, config: { damping?: number; stiffness?: number; mass?: number } = {}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - start, fps, config: { damping: 18, stiffness: 140, mass: 0.8, ...config } });
};

export const useEase = (start: number, duration: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame - start, [0, duration], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
};

type PopProps = {
  at: number;
  from?: "up" | "down" | "left" | "right" | "zoom";
  distance?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

// Entrada con resorte, desenfoque y desplazamiento: el "pop" de las interfaces modernas.
export const Pop: React.FC<PopProps> = ({ at, from = "up", distance = 70, style, children }) => {
  const p = useSpring(at);
  const o = interpolate(p, [0, 0.6], [0, 1], clamp);
  const d = (1 - p) * distance;
  const transform =
    from === "zoom"
      ? `scale(${0.6 + 0.4 * p})`
      : from === "up"
        ? `translateY(${d}px)`
        : from === "down"
          ? `translateY(${-d}px)`
          : from === "left"
            ? `translateX(${d}px)`
            : `translateX(${-d}px)`;
  return (
    <div style={{ opacity: o, transform, filter: `blur(${(1 - o) * 14}px)`, ...style }}>{children}</div>
  );
};

// Texto que aparece palabra por palabra.
export const WordsIn: React.FC<{ at: number; text: string; stagger?: number; style?: React.CSSProperties }> = ({
  at,
  text,
  stagger = 3,
  style,
}) => (
  <span style={style}>
    {text.split(" ").map((word, i) => (
      <Pop key={`${word}-${i}`} at={at + i * stagger} distance={40} style={{ display: "inline-block", marginRight: "0.25em" }}>
        {word}
      </Pop>
    ))}
  </span>
);
