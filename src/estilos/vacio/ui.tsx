import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useScene } from "../../components/narracion";
import type { Timeline } from "../../components/narracion";
import { SAFE } from "../../theme";
import { fuente, ss01, tipo, v } from "./tokens";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Entrada sobria: sube un poco y aparece. Sin zoom ni desenfoque fuerte: el vacío no se agita.
export const Sube: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; dist?: number }> = ({ at, children, style, dist = 36 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - at, [0, 18], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * dist}px)`, ...style }}>{children}</div>;
};

// Escena: área de contenido de la zona segura, con fundido de entrada y salida.
export const Escena: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { duration } = useScene();
  const entra = interpolate(frame, [0, 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const sale = interpolate(frame, [duration - 12, duration], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill style={{ opacity: entra * (1 - sale), transform: `translateY(${(1 - entra) * 30 - sale * 30}px)`, fontFamily: fuente, color: v.hueso, ...ss01 }}>
      <div style={{ position: "absolute", top: SAFE.top + 30, left: SAFE.left, right: SAFE.right, bottom: 1920 - SAFE.contentBottom + 40, display: "flex", flexDirection: "column" }}>{children}</div>
    </AbsoluteFill>
  );
};

// Rótulo pequeño en mayúsculas, ámbar: dice de qué trata la escena.
export const Rotulo: React.FC<{ at: number; children: React.ReactNode; color?: string }> = ({ at, children, color = v.azafran }) => (
  <Sube at={at} dist={16}>
    <div style={{ ...tipo.rotulo, color }}>{children}</div>
  </Sube>
);

// Titular: peso 400, tracking negativo, blanco. `<b>` dentro se pinta ámbar, no en negrita.
export const Titular: React.FC<{ at: number; children: React.ReactNode; size?: keyof typeof tipo; style?: React.CSSProperties }> = ({ at, children, size = "titulo", style }) => (
  <Sube at={at}>
    <div className="vacio-titular" style={{ ...tipo[size], marginTop: 18, ...style }}>
      {children}
    </div>
  </Sube>
);

export const Acento: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = v.azafran }) => <span style={{ color }}>{children}</span>;

export const Cuerpo: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, children, style }) => (
  <Sube at={at} dist={20}>
    <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18, ...style }}>{children}</div>
  </Sube>
);

// El único botón: píldora violeta llena, en mayúsculas.
export const Pildora: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 14, stiffness: 160 } });
  return (
    <div style={{ display: "inline-flex", alignSelf: "flex-start", padding: "26px 44px", borderRadius: 999, background: v.iris, color: v.hueso, ...tipo.rotulo, fontSize: 30, opacity: Math.min(1, p * 2), transform: `scale(${0.9 + 0.1 * p})` }}>
      {children}
    </div>
  );
};

// Línea fina que se dibuja: el único "trazo" permitido, sin bordes ni cajas.
export const Linea: React.FC<{ at: number; ancho: number; color?: string; grosor?: number; dur?: number; style?: React.CSSProperties }> = ({ at, ancho, color = v.ceniza, grosor = 2, dur = 24, style }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - at, [0, dur], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return <div style={{ width: ancho * p, height: grosor, background: color, ...style }} />;
};

// Subtítulos: peso 400, blancos; lo que falta decir, apagado; la palabra actual, ámbar.
export const SubtitulosVacio: React.FC<{ timeline: Timeline }> = ({ timeline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const frase = timeline.frases.find((f) => t >= f.inicio - 0.05 && t < f.fin + 0.12);
  if (!frase) return null;
  const palabras = frase.texto.split(" ");
  const pesos = palabras.map((w) => w.replace(/[^\p{L}\p{N}]/gu, "").length + 2);
  const total = pesos.reduce((a, b) => a + b, 0);
  const dur = frase.fin - frase.inicio;
  let acc = 0;
  const inicios = pesos.map((w) => {
    const s = frase.inicio + (acc / total) * dur;
    acc += w;
    return s;
  });
  const entra = interpolate(frame - Math.round(frase.inicio * fps), [0, 10], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: 72, right: 72, top: SAFE.captionsTop + 10, opacity: entra, transform: `translateY(${(1 - entra) * 14}px)` }}>
      <div style={{ fontFamily: fuente, ...ss01, fontWeight: 400, fontSize: 50, lineHeight: 1.22, letterSpacing: "-0.02em", color: v.hueso, textAlign: "left" }}>
        {palabras.map((w, i) => {
          const activa = t >= inicios[i] && (i === palabras.length - 1 || t < inicios[i + 1]);
          const dicha = t >= inicios[i];
          return (
            <span key={`${w}-${i}`} style={{ color: activa ? v.azafran : v.hueso, opacity: dicha ? 1 : 0.32 }}>
              {w}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
};
