import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors } from "../theme";

type Blob = { color: string; size: number; x: number; y: number; ax: number; ay: number; speed: number; phase: number };

const blobs: Blob[] = [
  { color: colors.orange, size: 900, x: 0.15, y: 0.12, ax: 160, ay: 120, speed: 0.011, phase: 0 },
  { color: colors.pink, size: 850, x: 0.85, y: 0.3, ax: 140, ay: 180, speed: 0.009, phase: 1.7 },
  { color: colors.violet, size: 1000, x: 0.3, y: 0.62, ax: 200, ay: 140, speed: 0.008, phase: 3.1 },
  { color: colors.blue, size: 900, x: 0.9, y: 0.88, ax: 160, ay: 120, speed: 0.012, phase: 4.4 },
];

// Fondo oscuro con manchas de color que respiran, grano fino y viñeta.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      {blobs.map((b, i) => {
        const cx = b.x * 1080 + Math.sin(frame * b.speed + b.phase) * b.ax;
        const cy = b.y * 1920 + Math.cos(frame * b.speed * 0.8 + b.phase) * b.ay;
        const scale = 1 + Math.sin(frame * b.speed * 1.3 + i) * 0.12;
        return (
          <div
            key={b.color}
            style={{
              position: "absolute",
              left: cx - b.size / 2,
              top: cy - b.size / 2,
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)`,
              opacity: 0.38,
              transform: `scale(${scale})`,
              filter: "blur(60px)",
            }}
          />
        );
      })}
      <AbsoluteFill
        style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(7,6,11,0.75) 100%)" }}
      />
      <svg width="1080" height="1920" style={{ position: "absolute", inset: 0, opacity: 0.09, mixBlendMode: "overlay" }}>
        <filter id="grano">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 6} />
        </filter>
        <rect width="100%" height="100%" filter="url(#grano)" />
      </svg>
    </AbsoluteFill>
  );
};
