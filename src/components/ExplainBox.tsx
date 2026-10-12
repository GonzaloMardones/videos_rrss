import React from "react";
import { colors } from "../theme";
import { Reveal } from "./Reveal";

type Props = {
  delay?: number;
  label?: string;
  children: React.ReactNode;
};

// El recuadro "En simple": el concepto del magíster explicado para cualquier persona.
export const ExplainBox: React.FC<Props> = ({ delay = 14, label = "En simple", children }) => (
  <Reveal delay={delay}>
    <div
      style={{
        backgroundColor: colors.panel,
        borderLeft: `6px solid ${colors.blue}`,
        padding: "22px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: colors.blue,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 33, lineHeight: 1.36, color: colors.ink }}>{children}</div>
    </div>
  </Reveal>
);
