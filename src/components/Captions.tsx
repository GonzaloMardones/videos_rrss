import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, gradients, SAFE } from "../theme";
import type { Timeline } from "./narracion";
import { clamp } from "./motion";

// Subtítulos estilo Reels: una frase a la vez y la palabra que se está diciendo, resaltada.
export const Captions: React.FC<{ timeline: Timeline }> = ({ timeline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const frase = timeline.frases.find((f) => t >= f.inicio - 0.05 && t < f.fin + 0.12);
  if (!frase) return null;

  const words = frase.texto.split(" ");
  // El tiempo de cada palabra se reparte según su largo.
  const weights = words.map((w) => w.replace(/[^\p{L}\p{N}]/gu, "").length + 2);
  const total = weights.reduce((a, b) => a + b, 0);
  const durac = frase.fin - frase.inicio;
  let acc = 0;
  const starts = weights.map((w) => {
    const s = frase.inicio + (acc / total) * durac;
    acc += w;
    return s;
  });

  const enter = spring({ frame: frame - Math.round(frase.inicio * fps), fps, config: { damping: 16, stiffness: 180 } });

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: SAFE.captionsTop,
        display: "flex",
        justifyContent: "center",
        transform: `translateY(${(1 - enter) * 30}px) scale(${0.94 + 0.06 * enter})`,
        opacity: interpolate(enter, [0, 0.5], [0, 1], clamp),
      }}
    >
      <div
        style={{
          fontFamily: fonts.sans,
          fontWeight: 800,
          fontSize: 54,
          lineHeight: 1.18,
          letterSpacing: -0.5,
          textAlign: "center",
          color: colors.text,
          textShadow: "0 4px 24px rgba(0,0,0,0.55)",
          maxWidth: 940,
        }}
      >
        {words.map((w, i) => {
          const active = t >= starts[i] && (i === words.length - 1 || t < starts[i + 1]);
          const said = t >= starts[i];
          return (
            <span
              key={`${w}-${i}`}
              style={{
                display: "inline-block",
                margin: "0 0.12em",
                opacity: said ? 1 : 0.42,
                ...(active
                  ? {
                      backgroundImage: gradients.gold,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: "none",
                      filter: "drop-shadow(0 4px 18px rgba(255,122,61,0.55))",
                    }
                  : {}),
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </div>
  );
};
