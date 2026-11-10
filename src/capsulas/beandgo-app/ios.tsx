// Kit "Be&Go iOS" para el video: los mismos tokens, radios y sombras que DESIGN.md / Theme.swift del repo
// Be_and_Go_Project (diseño en Figma, archivo "Be&Go iOS", 7 al 9 de noviembre de 2026).
// SF Pro no se puede usar fuera de Apple: Nunito (redondeada) hace de SF Rounded e Inter de SF Pro Text.
import "@fontsource-variable/nunito";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import React from "react";
import { AbsoluteFill, continueRender, delayRender, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BatteryFull, CircleUser, House, Luggage, Signal, Sparkles, Wifi } from "lucide-react";
import type { Timeline } from "../../components/narracion";

const fontHandle = delayRender("Cargando Nunito e Inter");
Promise.all(
  ["700 32px 'Nunito Variable'", "800 32px 'Nunito Variable'", "400 32px Inter", "500 32px Inter", "600 32px Inter", "700 32px Inter"].map((f) => document.fonts.load(f)),
).then(
  () => continueRender(fontHandle),
  () => continueRender(fontHandle),
);

export const redonda = "'Nunito Variable', 'Nunito', ui-rounded, system-ui, sans-serif";
export const texto = "Inter, ui-sans-serif, system-ui, sans-serif";

// Tokens claros de DESIGN.md.
export const t = {
  ground: "#F7F3EC",
  surface: "#FFFFFF",
  panel: "#F1ECE3",
  line: "#E8E1D6",
  lineStrong: "#C9BFB0",
  ink: "#1C1915",
  inkSoft: "#6B625A",
  copihue: "#C2185B",
  copihueDeep: "#A3134C",
  copihueSoft: "#FBE4EE",
  plate: "#CFE8F7",
  navy: "#0B2E4A",
  navy2: "#123F63",
  sky: "#1E6FB3",
  skySoft: "#E3F0FB",
  sun: "#F2B705",
  sunSoft: "#FFF3C4",
  ok: "#17683F",
  okSoft: "#E4F3EA",
  warn: "#845400",
  warnSoft: "#FDF1D8",
  bad: "#B0261C",
  badSoft: "#FBE9E7",
  noneSoft: "#EEE9E0",
  lodging: "#C2410C",
  local: "#0F766E",
  food: "#D97706",
  activities: "#15803D",
};

export const sombra = {
  card: "0 8px 16px rgba(91,70,52,0.10)",
  pill: "0 5px 12px rgba(91,70,52,0.10)",
  circle: "0 4px 10px rgba(91,70,52,0.10)",
  chip: "0 3px 8px rgba(91,70,52,0.10)",
  glow: "0 6px 14px rgba(194,24,91,0.30)",
};

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const art = (slug: string) => staticFile(`beandgo-app/art/art-${slug}.jpg`);

// ---------- Movimiento ----------
export const useP = (at: number, dur = 16) => {
  const frame = useCurrentFrame();
  return interpolate(frame - at, [0, dur], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
};

export const Sube: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; dist?: number }> = ({ at, children, style, dist = 24 }) => {
  const p = useP(at);
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * dist}px)`, ...style }}>{children}</div>;
};

export const Pop: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; desde?: number }> = ({ at, children, style, desde = 0.9 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 15, stiffness: 160 } });
  return <div style={{ opacity: Math.min(1, p * 1.6), transform: `scale(${desde + (1 - desde) * p})`, ...style }}>{children}</div>;
};

// ---------- Teléfono ----------
export const W = 393;
export const H = 852;

// Marco de iPhone con Isla Dinámica. El contenido se diseña a 393 × 852 pt y se escala entero.
export const Phone: React.FC<{ children: React.ReactNode; escala?: number; style?: React.CSSProperties; hora?: string; oscuro?: boolean; fondo?: string; sinBarra?: boolean }> = ({
  children,
  escala = 0.9,
  style,
  hora = "16:12",
  oscuro,
  fondo = t.ground,
  sinBarra,
}) => {
  const bisel = 13;
  return (
    <div style={{ width: (W + bisel * 2) * escala, height: (H + bisel * 2) * escala, ...style }}>
      <div
        style={{
          width: W + bisel * 2,
          height: H + bisel * 2,
          transform: `scale(${escala})`,
          transformOrigin: "top left",
          borderRadius: 66,
          background: "#16130F",
          padding: bisel,
          boxShadow: "0 40px 80px rgba(60,42,28,0.28), 0 0 0 2px #3A332C inset",
        }}
      >
        <div style={{ position: "relative", width: W, height: H, borderRadius: 54, overflow: "hidden", background: fondo, fontFamily: texto, color: t.ink }}>
          {children}
          {sinBarra ? null : <StatusBar hora={hora} oscuro={oscuro} />}
          <div style={{ position: "absolute", top: 11, left: (W - 124) / 2, width: 124, height: 36, borderRadius: 18, background: "#000" }} />
          <div style={{ position: "absolute", bottom: 8, left: (W - 140) / 2, width: 140, height: 5, borderRadius: 3, background: oscuro ? "rgba(255,255,255,0.85)" : t.ink }} />
        </div>
      </div>
    </div>
  );
};

const StatusBar: React.FC<{ hora: string; oscuro?: boolean }> = ({ hora, oscuro }) => {
  const c = oscuro ? "#FFFFFF" : t.ink;
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 34px 0 46px", color: c, zIndex: 5 }}>
      <span style={{ fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em" }}>{hora}</span>
      <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Signal size={17} strokeWidth={2.6} />
        <Wifi size={17} strokeWidth={2.6} />
        <BatteryFull size={24} strokeWidth={2} />
      </span>
    </div>
  );
};

// Contenido desplazable de una pestaña: deja espacio para la barra de estado y la de pestañas.
export const Pantalla: React.FC<{ children: React.ReactNode; scroll?: number; fondo?: string; tabs?: TabId | null }> = ({ children, scroll = 0, fondo = t.ground, tabs = "inicio" }) => (
  <AbsoluteFill style={{ background: fondo }}>
    <div style={{ position: "absolute", top: 54, left: 0, right: 0, transform: `translateY(${-scroll}px)`, padding: "6px 16px 120px" }}>{children}</div>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 54, background: fondo, zIndex: 3 }} />
    {tabs ? <TabBar activa={tabs} /> : null}
  </AbsoluteFill>
);

export type TabId = "inicio" | "viajes" | "copiloto" | "perfil";

// Cuatro pestañas del sistema (RootView.swift): Inicio, Viajes, Copiloto, Perfil.
export const TabBar: React.FC<{ activa: TabId }> = ({ activa }) => {
  const tabs: { id: TabId; label: string; Icon: typeof House }[] = [
    { id: "inicio", label: "Inicio", Icon: House },
    { id: "viajes", label: "Viajes", Icon: Luggage },
    { id: "copiloto", label: "Copiloto", Icon: Sparkles },
    { id: "perfil", label: "Perfil", Icon: CircleUser },
  ];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 86, background: "rgba(250,248,244,0.94)", borderTop: `1px solid ${t.line}`, display: "flex", padding: "8px 18px 0", zIndex: 4 }}>
      {tabs.map(({ id, label, Icon }) => {
        const on = id === activa;
        return (
          <div key={id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: on ? t.copihue : "#9A9088" }}>
            <Icon size={25} strokeWidth={on ? 2.5 : 2} fill={on && id !== "copiloto" ? `${t.copihue}26` : "none"} />
            <span style={{ fontSize: 10.5, fontWeight: 600 }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

// ---------- Componentes (DESIGN.md) ----------
export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; pad?: number }> = ({ children, style, pad = 18 }) => (
  <div style={{ background: t.surface, borderRadius: 28, border: `1px solid ${t.line}`, boxShadow: sombra.card, padding: pad, display: "flex", flexDirection: "column", gap: 10, ...style }}>{children}</div>
);

type Tono = "neutral" | "ok" | "warn" | "bad" | "accent" | "sky";
const TONOS: Record<Tono, [string, string]> = {
  neutral: [t.noneSoft, t.inkSoft],
  ok: [t.okSoft, t.ok],
  warn: [t.warnSoft, t.warn],
  bad: [t.badSoft, t.bad],
  accent: [t.copihueSoft, t.copihue],
  sky: [t.skySoft, t.sky],
};

export const Pill: React.FC<{ tono?: Tono; children: React.ReactNode; style?: React.CSSProperties; icono?: React.ReactNode }> = ({ tono = "neutral", children, style, icono }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: TONOS[tono][0], color: TONOS[tono][1], borderRadius: 999, padding: "4px 10px", fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", ...style }}>
    {icono}
    {children}
  </span>
);

export const Chip: React.FC<{ children: React.ReactNode; on?: boolean; icono?: React.ReactNode; style?: React.CSSProperties }> = ({ children, on, icono, style }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      borderRadius: 999,
      padding: "9px 15px",
      fontSize: 14.5,
      fontWeight: 600,
      whiteSpace: "nowrap",
      background: on ? t.ink : t.surface,
      color: on ? t.ground : t.ink,
      border: on ? "1px solid transparent" : `1px solid ${t.line}`,
      boxShadow: on ? "none" : sombra.chip,
      ...style,
    }}
  >
    {icono}
    {children}
  </span>
);

export const IconBadge: React.FC<{ color: string; tam?: number; children: React.ReactNode }> = ({ color, tam = 36, children }) => (
  <div style={{ width: tam, height: tam, borderRadius: tam / 2, background: `${color}21`, color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{children}</div>
);

export const CircleButton: React.FC<{ children: React.ReactNode; tam?: number; badge?: string }> = ({ children, tam = 44, badge }) => (
  <div style={{ position: "relative", width: tam, height: tam, borderRadius: tam / 2, background: t.surface, border: `1px solid ${t.line}`, boxShadow: sombra.circle, display: "flex", alignItems: "center", justifyContent: "center", color: t.ink, flexShrink: 0 }}>
    {children}
    {badge ? (
      <div style={{ position: "absolute", top: -4, right: -4, minWidth: 20, height: 20, borderRadius: 10, background: t.copihue, color: "#fff", fontSize: 11.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${t.surface}`, padding: "0 4px" }}>{badge}</div>
    ) : null}
  </div>
);

export const PrimaryButton: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ borderRadius: 999, padding: "15px 0", textAlign: "center", color: "#fff", fontWeight: 600, fontSize: 17, background: `linear-gradient(90deg, ${t.copihue}, ${t.copihueDeep})`, boxShadow: sombra.glow, ...style }}>{children}</div>
);

export const SecondaryButton: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ borderRadius: 999, padding: "13px 0", textAlign: "center", color: t.ink, fontWeight: 600, fontSize: 16, background: t.panel, ...style }}>{children}</div>
);

export const CardButton: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <span style={{ display: "inline-block", borderRadius: 999, padding: "10px 22px", color: "#fff", fontWeight: 700, fontSize: 14.5, background: t.copihue, boxShadow: "0 6px 14px rgba(194,24,91,0.35)", ...style }}>{children}</span>
);

export const Titulo: React.FC<{ children: React.ReactNode; tam?: number; style?: React.CSSProperties }> = ({ children, tam = 22, style }) => (
  <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: tam, letterSpacing: "-0.01em", lineHeight: 1.15, color: t.ink, ...style }}>{children}</div>
);

export const RowHeader: React.FC<{ titulo: string; accion?: string }> = ({ titulo, accion }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 22, marginBottom: 10 }}>
    <Titulo tam={21}>{titulo}</Titulo>
    {accion ? <span style={{ color: t.copihue, fontSize: 14.5, fontWeight: 600 }}>{accion} ›</span> : null}
  </div>
);

// La silueta del arco: medio círculo arriba, pie con esquinas de tarjeta.
export const Arco: React.FC<{ slug: string; ancho: number; alto: number; pie?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({ slug, ancho, alto, pie = 28, style, children }) => {
  const r = ancho / 2;
  return (
    <div
      style={{
        position: "relative",
        width: ancho,
        height: alto,
        background: t.plate,
        borderTopLeftRadius: `${r}px ${Math.min(r, alto * 0.62)}px`,
        borderTopRightRadius: `${r}px ${Math.min(r, alto * 0.62)}px`,
        borderBottomLeftRadius: pie,
        borderBottomRightRadius: pie,
        overflow: "hidden",
        ...style,
      }}
    >
      <Img src={art(slug)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      {children}
    </div>
  );
};

// Ilustración en rectángulo redondeado con el velo azul noche (héroe).
export const Heroe: React.FC<{ slug: string; alto?: number; children?: React.ReactNode; radio?: number }> = ({ slug, alto = 210, children, radio = 28 }) => (
  <div style={{ position: "relative", height: alto, borderRadius: radio, overflow: "hidden", background: t.plate }}>
    <Img src={art(slug)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(11,46,74,0) 30%, rgba(11,46,74,0.55) 65%, rgba(11,46,74,0.95) 100%)` }} />
    <div style={{ position: "absolute", left: 18, right: 18, bottom: 16, color: "#fff", textShadow: "0 2px 6px rgba(11,46,74,0.5)" }}>{children}</div>
  </div>
);

export const Thumb: React.FC<{ slug: string; tam?: number }> = ({ slug, tam = 56 }) => (
  <div style={{ width: tam, height: tam, borderRadius: 16, overflow: "hidden", background: t.plate, flexShrink: 0 }}>
    <Img src={art(slug)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);

// Marca de agua en las pantallas armadas para el video.
export const Rotulo: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; claro?: boolean }> = ({ children, style, claro }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "7px 14px",
      borderRadius: 999,
      background: claro ? "rgba(255,255,255,0.14)" : "rgba(28,25,21,0.06)",
      border: claro ? "1px solid rgba(255,255,255,0.25)" : `1px solid ${t.line}`,
      color: claro ? "#F3EDE4" : t.inkSoft,
      fontFamily: texto,
      fontWeight: 600,
      fontSize: 17,
      ...style,
    }}
  >
    {children}
  </div>
);

// Wordmark Be&Go con el & en copihue.
export const Marca: React.FC<{ tam?: number; claro?: boolean }> = ({ tam = 40, claro }) => (
  <span style={{ fontFamily: redonda, fontWeight: 800, fontSize: tam, letterSpacing: "-0.02em", color: claro ? "#FFFFFF" : t.ink }}>
    Be<span style={{ color: claro ? "#FF8DB8" : t.copihue }}>&amp;</span>Go
  </span>
);

// Fondo del video: el mismo crema de la app con un grano de puntos cálidos.
export const FondoApp: React.FC = () => {
  const frame = useCurrentFrame();
  const d = (frame * 0.1) % 40;
  return (
    <AbsoluteFill style={{ background: t.ground }}>
      <AbsoluteFill style={{ backgroundImage: `radial-gradient(${t.line} 1.5px, transparent 1.5px)`, backgroundSize: "40px 40px", backgroundPosition: `${d}px ${d}px`, opacity: 0.8 }} />
    </AbsoluteFill>
  );
};

// Subtítulos: franja blanca de tarjeta, la palabra que suena en copihue.
export const SubtitulosApp: React.FC<{ timeline: Timeline }> = ({ timeline }) => {
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
  const entra = interpolate(frame - Math.round(frase.inicio * fps), [0, 8], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 940, display: "flex", justifyContent: "center", opacity: entra, transform: `translateY(${(1 - entra) * 10}px)` }}>
      <div style={{ maxWidth: 1560, fontFamily: texto, fontWeight: 600, fontSize: 31, lineHeight: 1.32, color: t.ink, background: "rgba(255,255,255,0.96)", borderRadius: 28, padding: "13px 30px", border: `1px solid ${t.line}`, textAlign: "center", boxShadow: sombra.card }}>
        {palabras.map((w, i) => {
          const activa = s >= inicios[i] && (i === palabras.length - 1 || s < inicios[i + 1]);
          const dicha = s >= inicios[i];
          return (
            <span key={`${w}-${i}`} style={{ color: activa ? t.copihue : t.ink, opacity: dicha ? 1 : 0.42 }}>
              {w}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
};
