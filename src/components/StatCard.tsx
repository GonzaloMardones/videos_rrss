import React from "react";
import { colors } from "../theme";
import { Reveal } from "./Reveal";

type Props = {
  value: React.ReactNode;
  label: React.ReactNode;
  accent?: string;
  delay?: number;
  valueSize?: number;
  style?: React.CSSProperties;
};

// Tarjeta de cifra: número grande arriba y su lectura abajo, como en la presentación de EE.UU.
export const StatCard: React.FC<Props> = ({
  value,
  label,
  accent = colors.blue,
  delay = 0,
  valueSize = 76,
  style,
}) => (
  <Reveal delay={delay} style={{ flex: 1, display: "flex", ...style }}>
    <div
      style={{
        flex: 1,
        backgroundColor: colors.paper,
        border: `1px solid ${colors.border}`,
        borderTop: `5px solid ${accent}`,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: valueSize,
          fontWeight: 700,
          lineHeight: 1.02,
          color: accent,
          letterSpacing: -1,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 27, lineHeight: 1.3, color: colors.ink }}>{label}</div>
    </div>
  </Reveal>
);
