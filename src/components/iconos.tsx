import React, { useId } from "react";
import { colors } from "../theme";

// Ilustraciones planas con degradado, dibujadas a mano en SVG para que sigan la paleta de la serie.
type Paleta = readonly [string, string];
export const paletas = {
  cobre: [colors.gold, colors.orange],
  calido: [colors.orange, colors.pink],
  frio: [colors.cyan, colors.violet],
  cereza: ["#FF5E7E", "#C2185B"],
  hoja: ["#7CF29A", "#22B07D"],
  blanco: ["#FFFFFF", "#CFC9F2"],
} as const satisfies Record<string, Paleta>;

type Props = { size?: number; paleta?: Paleta; style?: React.CSSProperties };

const useGrad = (p: Paleta) => {
  const id = `g${useId().replace(/:/g, "")}`;
  const defs = (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={p[0]} />
        <stop offset="100%" stopColor={p[1]} />
      </linearGradient>
    </defs>
  );
  return { fill: `url(#${id})`, defs };
};

const glow = (c: string): React.CSSProperties => ({ filter: `drop-shadow(0 0 22px ${c}88)`, overflow: "visible" });

// Pepita de cobre facetada.
export const Pepita: React.FC<Props> = ({ size = 160, paleta = paletas.cobre, style }) => {
  const g = useGrad(paleta);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...glow(paleta[1]), ...style }}>
      {g.defs}
      <path d="M22 38 L44 14 L76 20 L90 50 L72 82 L36 86 L12 62 Z" fill={g.fill} />
      <path d="M44 14 L52 44 L22 38 Z M52 44 L90 50 L76 20 Z M52 44 L72 82 L36 86 Z" fill="#FFFFFF" opacity={0.18} />
      <path d="M52 44 L12 62 L36 86 Z" fill="#000000" opacity={0.12} />
    </svg>
  );
};

// Par de cerezas con su hoja.
export const Cerezas: React.FC<Props> = ({ size = 160, style }) => {
  const r = useGrad(paletas.cereza);
  const h = useGrad(paletas.hoja);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...glow("#FF4D8D"), ...style }}>
      {r.defs}
      {h.defs}
      <path d="M56 12 C48 30 38 44 30 60 M56 12 C60 32 66 46 70 62" stroke="#7CF29A" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M56 12 C66 4 82 6 88 16 C76 22 64 20 56 12 Z" fill={h.fill} />
      <circle cx={30} cy={70} r={20} fill={r.fill} />
      <circle cx={70} cy={72} r={20} fill={r.fill} />
      <circle cx={23} cy={63} r={5} fill="#FFFFFF" opacity={0.45} />
      <circle cx={63} cy={65} r={5} fill="#FFFFFF" opacity={0.45} />
    </svg>
  );
};

// Engranaje: el capital (máquinas, equipos).
export const Engranaje: React.FC<Props> = ({ size = 120, paleta = paletas.frio, style }) => {
  const g = useGrad(paleta);
  const teeth = 8;
  const pts: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i * Math.PI) / teeth;
    const rad = i % 2 === 0 ? 46 : 36;
    const a1 = a - Math.PI / (teeth * 2.6);
    const a2 = a + Math.PI / (teeth * 2.6);
    pts.push(`${50 + rad * Math.cos(a1)},${50 + rad * Math.sin(a1)}`, `${50 + rad * Math.cos(a2)},${50 + rad * Math.sin(a2)}`);
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...glow(paleta[1]), ...style }}>
      {g.defs}
      <polygon points={pts.join(" ")} fill={g.fill} />
      <circle cx={50} cy={50} r={14} fill={colors.bg} />
    </svg>
  );
};

// Trabajador con casco.
export const Trabajador: React.FC<Props> = ({ size = 120, paleta = paletas.calido, style }) => {
  const g = useGrad(paleta);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...glow(paleta[1]), ...style }}>
      {g.defs}
      <path d="M28 30 C28 16 72 16 72 30 L76 32 L24 32 Z" fill={g.fill} />
      <circle cx={50} cy={40} r={14} fill={g.fill} />
      <path d="M18 96 V78 C18 62 32 56 50 56 C68 56 82 62 82 78 V96 Z" fill={g.fill} />
    </svg>
  );
};

// Camión minero de alto tonelaje.
export const Camion: React.FC<Props> = ({ size = 220, paleta = paletas.cobre, style }) => {
  const g = useGrad(paleta);
  const w = useGrad(paletas.blanco);
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 160 100" style={{ ...glow(paleta[1]), ...style }}>
      {g.defs}
      {w.defs}
      <path d="M8 22 L104 22 L96 58 L16 58 Z" fill={g.fill} />
      <path d="M30 22 C40 6 70 6 84 22 Z" fill="#B36A2E" />
      <rect x={104} y={34} width={42} height={26} rx={6} fill={g.fill} />
      <rect x={112} y={38} width={20} height={12} rx={3} fill={colors.bg} opacity={0.6} />
      <rect x={10} y={58} width={138} height={10} rx={4} fill={g.fill} opacity={0.85} />
      {[34, 76, 128].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={78} r={17} fill="#1C1A26" stroke={w.fill} strokeWidth={4} />
          <circle cx={cx} cy={78} r={6} fill={w.fill} />
        </g>
      ))}
    </svg>
  );
};

// Billetera.
export const Billetera: React.FC<Props> = ({ size = 150, paleta = paletas.calido, style }) => {
  const g = useGrad(paleta);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...glow(paleta[1]), ...style }}>
      {g.defs}
      <rect x={10} y={26} width={80} height={56} rx={12} fill={g.fill} />
      <path d="M18 26 L66 12 C70 11 74 13 74 18 V26 Z" fill={g.fill} opacity={0.7} />
      <rect x={60} y={44} width={34} height={20} rx={8} fill={colors.bg} opacity={0.55} />
      <circle cx={72} cy={54} r={4} fill="#FFFFFF" />
    </svg>
  );
};

// Moneda con signo peso.
export const Moneda: React.FC<Props> = ({ size = 130, paleta = paletas.cobre, style }) => {
  const g = useGrad(paleta);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...glow(paleta[1]), ...style }}>
      {g.defs}
      <circle cx={50} cy={50} r={42} fill={g.fill} />
      <circle cx={50} cy={50} r={33} fill="none" stroke="#FFFFFF" strokeOpacity={0.35} strokeWidth={3} />
      <text x={50} y={66} textAnchor="middle" fontSize={46} fontWeight={900} fill={colors.bg} fontFamily="Figtree, sans-serif">
        $
      </text>
    </svg>
  );
};

// Etiqueta de precio.
export const Etiqueta: React.FC<Props & { texto?: string }> = ({ size = 160, paleta = paletas.cobre, style, texto = "" }) => {
  const g = useGrad(paleta);
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 160 96" style={{ ...glow(paleta[1]), ...style }}>
      {g.defs}
      <path d="M40 8 H148 C152 8 154 10 154 14 V82 C154 86 152 88 148 88 H40 L8 48 Z" fill={g.fill} />
      <circle cx={34} cy={48} r={7} fill={colors.bg} />
      <text x={100} y={60} textAnchor="middle" fontSize={texto.length > 4 ? 30 : 38} fontWeight={900} fill={colors.bg} fontFamily="'Bricolage Grotesque', sans-serif">
        {texto}
      </text>
    </svg>
  );
};

// Caja de fruta de exportación.
export const Caja: React.FC<Props> = ({ size = 150, style }) => {
  const g = useGrad(["#E9B97A", "#B07A3E"]);
  const r = useGrad(paletas.cereza);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...glow("#E9B97A"), ...style }}>
      {g.defs}
      {r.defs}
      {[24, 40, 56, 72].map((cx, i) => (
        <circle key={cx} cx={cx} cy={i % 2 ? 40 : 44} r={10} fill={r.fill} />
      ))}
      <rect x={10} y={46} width={80} height={40} rx={6} fill={g.fill} />
      <path d="M10 60 H90 M10 73 H90" stroke={colors.bg} strokeOpacity={0.25} strokeWidth={3} />
    </svg>
  );
};

// Flecha gruesa hacia arriba o abajo.
export const Flecha: React.FC<{ up: boolean; color: string; size?: number }> = ({ up, color, size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={glow(color)}>
    <path d={up ? "M12 3 L20 12 H15 V21 H9 V12 H4 Z" : "M12 21 L20 12 H15 V3 H9 V12 H4 Z"} fill={color} />
  </svg>
);

// Edificio institucional con columnas (Hacienda, Banco Central).
export const Edificio: React.FC<Props> = ({ size = 160, paleta = paletas.frio, style }) => {
  const g = useGrad(paleta);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...glow(paleta[1]), ...style }}>
      {g.defs}
      <path d="M50 8 L92 30 H8 Z" fill={g.fill} />
      <rect x={12} y={32} width={76} height={6} rx={2} fill={g.fill} />
      {[20, 36, 52, 68].map((x) => (
        <rect key={x} x={x} y={42} width={10} height={36} rx={3} fill={g.fill} opacity={0.85} />
      ))}
      <rect x={8} y={80} width={84} height={10} rx={3} fill={g.fill} />
    </svg>
  );
};

// Surtidor de combustible.
export const Surtidor: React.FC<Props> = ({ size = 160, paleta = paletas.calido, style }) => {
  const g = useGrad(paleta);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...glow(paleta[1]), ...style }}>
      {g.defs}
      <rect x={14} y={10} width={48} height={82} rx={8} fill={g.fill} />
      <rect x={22} y={20} width={32} height={22} rx={4} fill={colors.bg} opacity={0.6} />
      <path d="M62 30 H72 C78 30 82 34 82 40 V70 C82 76 86 78 88 74 V46 L80 38" stroke={paleta[1]} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 52 C32 60 32 66 38 70 C44 66 44 60 38 52 Z" fill={colors.bg} opacity={0.55} />
    </svg>
  );
};

// Barril de petróleo.
export const Barril: React.FC<Props> = ({ size = 150, paleta = ["#4B4A5C", "#1E1D29"], style }) => {
  const g = useGrad(paleta);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 0 18px #8B5CF655)", ...style }}>
      {g.defs}
      <rect x={20} y={8} width={60} height={84} rx={10} fill={g.fill} stroke="#8B8AA3" strokeWidth={2} />
      <path d="M20 32 H80 M20 68 H80" stroke="#8B8AA3" strokeWidth={4} />
      <path d="M50 40 C42 50 42 56 50 60 C58 56 58 50 50 40 Z" fill="#F7F5FF" opacity={0.8} />
    </svg>
  );
};

// Reloj de arena.
export const RelojArena: React.FC<Props> = ({ size = 140, paleta = paletas.cobre, style }) => {
  const g = useGrad(paleta);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...glow(paleta[1]), ...style }}>
      {g.defs}
      <rect x={20} y={8} width={60} height={8} rx={4} fill={g.fill} />
      <rect x={20} y={84} width={60} height={8} rx={4} fill={g.fill} />
      <path d="M28 16 H72 C72 36 56 44 52 50 C56 56 72 64 72 84 H28 C28 64 44 56 48 50 C44 44 28 36 28 16 Z" fill="none" stroke={g.fill} strokeWidth={4} />
      <path d="M36 28 H64 C62 38 54 44 50 48 C46 44 38 38 36 28 Z M34 82 C38 70 46 66 50 64 C54 66 62 70 66 82 Z" fill={g.fill} opacity={0.85} />
    </svg>
  );
};

// Escudo: la autonomía protege las decisiones.
export const Escudo: React.FC<Props> = ({ size = 160, paleta = paletas.frio, style }) => {
  const g = useGrad(paleta);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...glow(paleta[1]), ...style }}>
      {g.defs}
      <path d="M50 6 L86 18 V46 C86 70 70 86 50 94 C30 86 14 70 14 46 V18 Z" fill={g.fill} />
      <path d="M34 50 L46 62 L68 38" stroke={colors.bg} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
