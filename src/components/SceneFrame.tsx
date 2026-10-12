import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts, SAFE } from "../theme";
import { Reveal } from "./Reveal";

type Props = {
  chapter: string;
  step: number;
  totalSteps: number;
  topic: string;
  headline: React.ReactNode;
  source: string;
  children: React.ReactNode;
};

// Lámina de contenido: tema, titular, cuerpo y fuente, dentro de la zona segura de Reels.
export const SceneFrame: React.FC<Props> = ({
  chapter,
  step,
  totalSteps,
  topic,
  headline,
  source,
  children,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.paper,
        color: colors.ink,
        fontFamily: fonts.sans,
        padding: `${SAFE.top}px ${SAFE.right}px ${SAFE.bottom - 40}px ${SAFE.left}px`,
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: colors.muted,
        }}
      >
        <span>{chapter}</span>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>
          {step}/{totalSteps}
        </span>
      </div>

      <Reveal delay={2}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: colors.blue,
          }}
        >
          {topic}
        </div>
      </Reveal>

      <Reveal delay={6}>
        <h1
          style={{
            margin: 0,
            fontFamily: fonts.serif,
            fontWeight: 400,
            fontSize: 60,
            lineHeight: 1.16,
            color: colors.navy,
          }}
        >
          {headline}
        </h1>
      </Reveal>

      <Reveal delay={10}>
        <div style={{ width: 72, height: 4, backgroundColor: colors.blue }} />
      </Reveal>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 30, paddingTop: 8 }}>
        {children}
      </div>

      <div style={{ fontSize: 21, lineHeight: 1.35, color: colors.muted }}>{source}</div>
    </AbsoluteFill>
  );
};
