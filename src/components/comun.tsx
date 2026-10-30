import React from "react";
import { Pop } from "./motion";
import { GradientText, Note } from "./ui";
import { fonts } from "../theme";

// Titular de cada escena: grande, en Bricolage Grotesque y con degradado.
export const Title: React.FC<{ at?: number; gradient: string; size?: number; sub?: string; children: React.ReactNode }> = ({
  at = 6,
  gradient,
  size = 116,
  sub,
  children,
}) => (
  <div style={{ marginBottom: 22 }}>
    <Pop at={at} from="zoom" style={{ transformOrigin: "left center" }}>
      <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: size, lineHeight: 0.98, letterSpacing: -3 }}>
        <GradientText gradient={gradient}>{children}</GradientText>
      </div>
    </Pop>
    {sub ? (
      <Pop at={at + 6}>
        <Note style={{ marginTop: 12 }}>{sub}</Note>
      </Pop>
    ) : null}
  </div>
);

export const Arrow: React.FC<{ up: boolean; color: string; size?: number }> = ({ up, color, size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ filter: `drop-shadow(0 0 14px ${color})` }}>
    <path d={up ? "M12 3 L20 12 H15 V21 H9 V12 H4 Z" : "M12 21 L20 12 H15 V3 H9 V12 H4 Z"} fill={color} />
  </svg>
);

// Íconos de línea simples, dibujados a mano para no depender de librerías.
const paths: Record<string, React.ReactNode> = {
  escudo: <path d="M12 2 L20 5 V11 C20 16 16.5 20 12 22 C7.5 20 4 16 4 11 V5 Z M8.5 12 L11 14.5 L15.5 9.5" />,
  diana: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  perilla: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 13 L16.5 8.5 M5 5 L3 3 M19 5 L21 3 M12 2 V4" />
    </>
  ),
  billetera: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="3" />
      <path d="M3 9 H21 M16 13.5 H18" />
    </>
  ),
  tarjeta: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="3" />
      <path d="M2.5 10 H21.5 M6 15 H10" />
    </>
  ),
  paraguas: <path d="M12 3 C6.5 3 3 7 3 11 H21 C21 7 17.5 3 12 3 Z M12 11 V18.5 C12 20 13 21 14.5 21 C16 21 17 20 17 18.5" />,
};

export const Icon: React.FC<{ name: keyof typeof paths | string; gradientId: string; size?: number }> = ({ name, gradientId, size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={`url(#${gradientId})`} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    {paths[name]}
  </svg>
);

export const IconGradients: React.FC = () => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      <linearGradient id="ico-warm" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF7A3D" />
        <stop offset="100%" stopColor="#FF4D8D" />
      </linearGradient>
      <linearGradient id="ico-cool" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#22D3EE" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="ico-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFC15E" />
        <stop offset="100%" stopColor="#FF7A3D" />
      </linearGradient>
    </defs>
  </svg>
);
