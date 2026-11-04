import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useScene, type Timeline } from "../../components/narracion";
import { EXPO_OUT, transicion } from "../vacio/movimiento";
import { b, fuente, HD, MARCO, tipo } from "./tokens";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Fondo claro con una grilla de puntos que se desplaza despacio.
export const FondoBG: React.FC = () => {
  const frame = useCurrentFrame();
  const d = (frame * 0.12) % 44;
  return (
    <AbsoluteFill style={{ background: b.suelo }}>
      <AbsoluteFill style={{ backgroundImage: `radial-gradient(${b.linea} 1.6px, transparent 1.6px)`, backgroundSize: "44px 44px", backgroundPosition: `${d}px ${d}px`, opacity: 0.7 }} />
    </AbsoluteFill>
  );
};

// Contenedor de escena: entra y sale con un desplazamiento corto.
export const Escena: React.FC<{ children: React.ReactNode; fondo?: React.ReactNode; pleno?: boolean }> = ({ children, fondo, pleno }) => {
  const frame = useCurrentFrame();
  const { duration } = useScene();
  const entra = interpolate(frame, [0, 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const sale = interpolate(frame, [duration - 12, duration], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill style={{ opacity: entra * (1 - sale), fontFamily: fuente, color: b.tinta }}>
      {fondo}
      <div
        style={{
          position: "absolute",
          top: pleno ? 0 : MARCO.top,
          left: pleno ? 0 : MARCO.left,
          right: pleno ? 0 : MARCO.right,
          bottom: pleno ? 0 : HD.height - MARCO.contentBottom,
          transform: `translateY(${(1 - entra) * 22 - sale * 22}px)`,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const Sube: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; dist?: number }> = ({ at, children, style, dist = 26 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - at, [0, 16], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * dist}px)`, ...style }}>{children}</div>;
};

export const Aparece: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; desde?: number }> = ({ at, children, style, desde = 0.92 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 16, stiffness: 150 } });
  return <div style={{ opacity: Math.min(1, p * 1.6), transform: `scale(${desde + (1 - desde) * p})`, ...style }}>{children}</div>;
};

// Titular cinético: "línea uno|línea *dos*"; lo marcado con * va en el color de acento.
export const Cinetico: React.FC<{ at: number; texto: string; tam?: number; acento?: string; style?: React.CSSProperties }> = ({ at, texto, tam = tipo.titulo.fontSize, acento = b.copihue, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let enAcento = false;
  let k = 0;
  const lineas = texto.split("|").map((l) =>
    l.split(" ").map((w) => {
      const abre = w.startsWith("*");
      const cierra = w.endsWith("*") && (w.length > 1 || enAcento);
      const ac = enAcento || abre;
      if (abre && !cierra) enAcento = true;
      if (cierra) enAcento = false;
      return { w: w.replace(/^\*/, "").replace(/\*$/, ""), ac };
    }),
  );
  return (
    <div style={{ ...tipo.titulo, fontSize: tam, ...style }}>
      {lineas.map((ps, li) => (
        <div key={li} style={{ whiteSpace: "nowrap" }}>
          {ps.map(({ w, ac }, wi) => {
            const p = transicion(frame, at + (k++ * 35 * fps) / 1000, fps, 650, EXPO_OUT);
            return (
              <span key={wi} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.12em", marginBottom: "-0.12em", marginRight: wi < ps.length - 1 ? "0.24em" : 0 }}>
                <span style={{ display: "inline-block", transform: `translateY(${(1 - p) * 105}%)`, color: ac ? acento : undefined }}>{w}</span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Rótulo de sección con la línea de tres colores de la marca.
export const Rotulo: React.FC<{ at: number; children: React.ReactNode; color?: string }> = ({ at, children, color = b.tinta2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 600, EXPO_OUT);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: k }}>
      <div style={{ display: "flex", gap: 4 }}>
        {[b.copihue, b.sol, b.noche].map((c) => (
          <div key={c} style={{ width: 22 * k, height: 6, borderRadius: 3, background: c }} />
        ))}
      </div>
      <span style={{ ...tipo.rotulo, color }}>{children}</span>
    </div>
  );
};

export const Cabeza: React.FC<{ at: number; rotulo: string; titulo: string; tam?: number; acento?: string }> = ({ at, rotulo, titulo, tam, acento }) => (
  <div>
    <Rotulo at={at}>{rotulo}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} tam={tam} acento={acento} style={{ marginTop: 16 }} />
  </div>
);

// Wordmark: Be&Go con el & en copihue.
export const Marca: React.FC<{ tam?: number; claro?: boolean }> = ({ tam = 40, claro }) => (
  <span style={{ fontFamily: fuente, fontWeight: 800, fontSize: tam, letterSpacing: "-0.03em", color: claro ? "#FFFFFF" : b.tinta }}>
    Be<span style={{ color: claro ? "#FF8DB8" : b.copihue }}>&amp;</span>Go
  </span>
);

// Tarjeta blanca con borde fino y franja de color a la izquierda.
export const Tarjeta: React.FC<{ at: number; color?: string; style?: React.CSSProperties; children: React.ReactNode; franja?: boolean }> = ({ at, color = b.copihue, style, children, franja = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 18, stiffness: 140 } });
  if (frame < at - 1) return null;
  return (
    <div
      style={{
        position: "relative",
        background: b.superficie,
        border: `2px solid ${b.linea}`,
        borderRadius: 24,
        padding: franja ? "22px 26px 22px 34px" : "22px 26px",
        boxSizing: "border-box",
        boxShadow: "0 8px 24px rgba(11,46,74,0.08)",
        overflow: "hidden",
        opacity: Math.min(1, p * 1.5),
        transform: `translateY(${(1 - p) * 20}px)`,
        ...style,
      }}
    >
      {franja ? <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: color }} /> : null}
      {children}
    </div>
  );
};

export const Chip: React.FC<{ at: number; color?: string; lleno?: boolean; tam?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, color = b.copihue, lleno, tam = 24, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 420, EXPO_OUT);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: `${tam * 0.38}px ${tam * 0.8}px`,
        borderRadius: 999,
        border: `2px solid ${color}`,
        color: lleno ? "#FFFFFF" : color,
        background: lleno ? color : b.superficie,
        fontSize: tam,
        fontWeight: 700,
        opacity: k,
        transform: `translateY(${(1 - k) * 10}px)`,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
};

// Ícono dentro de un círculo de color suave.
export const Burbuja: React.FC<{ color: string; tam?: number; children: React.ReactNode; lleno?: boolean }> = ({ color, tam = 64, children, lleno }) => (
  <div style={{ width: tam, height: tam, borderRadius: tam / 2, background: lleno ? color : `${color}1A`, color: lleno ? "#FFFFFF" : color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{children}</div>
);

// Sello "datos de ejemplo": el diseño muestra cifras ilustrativas, no cotizaciones reales.
export const Ejemplo: React.FC<{ style?: React.CSSProperties; claro?: boolean }> = ({ style, claro }) => (
  <div style={{ position: "absolute", fontSize: 18, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: claro ? "rgba(255,255,255,0.7)" : b.tinta3, border: `1.5px dashed ${claro ? "rgba(255,255,255,0.45)" : b.lineaFuerte}`, borderRadius: 8, padding: "6px 12px", ...style }}>
    Datos de ejemplo
  </div>
);

// Teléfono: marco oscuro, isla, barra de estado. El contenido va en `children` (ancho interior = ancho - 28).
export const ANCHO_TEL = 400;
export const ALTO_TEL = 820;
export const Telefono: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; hora?: string; oscuro?: boolean; escala?: number }> = ({ children, style, hora = "21:04", oscuro, escala = 1 }) => (
  <div
    style={{
      width: ANCHO_TEL,
      height: ALTO_TEL,
      borderRadius: 64,
      background: "#10161A",
      padding: 14,
      boxSizing: "border-box",
      boxShadow: "0 30px 70px rgba(11,46,74,0.28), inset 0 0 0 2px #2A333A",
      transform: `scale(${escala})`,
      transformOrigin: "top center",
      flexShrink: 0,
      ...style,
    }}
  >
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 50, overflow: "hidden", background: oscuro ? b.noche : b.suelo, fontFamily: fuente, color: oscuro ? "#FFFFFF" : b.tinta }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 34px", fontSize: 17, fontWeight: 800, zIndex: 5, color: oscuro ? "#FFFFFF" : b.tinta }}>
        <span>{hora}</span>
        <div style={{ position: "absolute", left: "50%", top: 12, width: 112, height: 32, marginLeft: -56, borderRadius: 18, background: "#10161A" }} />
        <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <span style={{ display: "inline-flex", gap: 2, alignItems: "flex-end" }}>
            {[6, 9, 12, 15].map((h) => (
              <span key={h} style={{ width: 3.5, height: h, borderRadius: 1, background: "currentColor" }} />
            ))}
          </span>
          <span style={{ width: 26, height: 12, borderRadius: 4, border: "2px solid currentColor", position: "relative" }}>
            <span style={{ position: "absolute", inset: 1.5, right: 7, borderRadius: 2, background: "currentColor" }} />
          </span>
        </span>
      </div>
      <div style={{ position: "absolute", top: 52, left: 0, right: 0, bottom: 0 }}>{children}</div>
    </div>
  </div>
);

// Barra superior de la app dentro del teléfono.
export const BarraApp: React.FC<{ titulo: string; sub?: string; color?: string }> = ({ titulo, sub, color = b.copihue }) => (
  <div style={{ padding: "8px 22px 14px", borderBottom: `1.5px solid ${b.linea}`, background: b.superficie }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Marca tam={22} />
      <div style={{ width: 30, height: 30, borderRadius: 15, background: `${color}1A`, color, fontSize: 15, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>G</div>
    </div>
    <div style={{ marginTop: 10, fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>{titulo}</div>
    {sub ? <div style={{ fontSize: 15, color: b.tinta2, fontWeight: 600, marginTop: 2 }}>{sub}</div> : null}
  </div>
);

// Notificación tipo push que baja desde arriba.
export const Push: React.FC<{ at: number; icono: React.ReactNode; titulo: string; texto: React.ReactNode; color?: string; style?: React.CSSProperties; vibra?: boolean }> = ({ at, icono, titulo, texto, color = b.copihue, style, vibra }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 15, stiffness: 160 } });
  const sacude = vibra ? Math.sin((frame - at) * 2.4) * 5 * interpolate(frame - at, [0, 6, 18], [0, 1, 0], clamp) : 0;
  if (frame < at) return null;
  return (
    <div
      style={{
        margin: "0 12px",
        borderRadius: 26,
        background: "rgba(255,255,255,0.96)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        padding: "14px 16px",
        display: "flex",
        gap: 12,
        color: b.tinta,
        opacity: Math.min(1, p * 1.4),
        transform: `translateY(${(1 - p) * -60}px) translateX(${sacude}px)`,
        ...style,
      }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 11, background: color, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icono}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, color: b.tinta2 }}>
          <span>BE&amp;GO</span>
          <span>ahora</span>
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, marginTop: 2 }}>{titulo}</div>
        <div style={{ fontSize: 15.5, fontWeight: 600, color: b.tinta2, lineHeight: 1.35, marginTop: 2 }}>{texto}</div>
      </div>
    </div>
  );
};

// Fila de una lista dentro de la app.
export const Fila: React.FC<{ at: number; icono?: React.ReactNode; color?: string; titulo: React.ReactNode; detalle?: React.ReactNode; derecha?: React.ReactNode; destacada?: boolean }> = ({ at, icono, color = b.copihue, titulo, detalle, derecha, destacada }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 500, EXPO_OUT);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        margin: "0 14px 10px",
        borderRadius: 16,
        background: b.superficie,
        border: `1.5px solid ${destacada ? color : b.linea}`,
        boxShadow: destacada ? `inset 0 0 0 1.5px ${color}` : undefined,
        opacity: k,
        transform: `translateX(${(1 - k) * 30}px)`,
      }}
    >
      {icono ? (
        <div style={{ width: 42, height: 42, borderRadius: 12, background: `${color}1A`, color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icono}</div>
      ) : null}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.2 }}>{titulo}</div>
        {detalle ? <div style={{ fontSize: 14.5, fontWeight: 600, color: b.tinta2, marginTop: 3, lineHeight: 1.3 }}>{detalle}</div> : null}
      </div>
      {derecha ? <div style={{ fontSize: 17, fontWeight: 800, textAlign: "right", flexShrink: 0 }}>{derecha}</div> : null}
    </div>
  );
};

// Subtítulos horizontales: una franja centrada abajo, la palabra que suena en copihue.
export const SubtitulosHD: React.FC<{ timeline: Timeline }> = ({ timeline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const frase = timeline.frases.find((f) => t >= f.inicio - 0.05 && t < f.fin + 0.12);
  if (!frase) return null;
  const palabras = frase.texto.split(" ");
  const pesos = palabras.map((w) => w.replace(/[^\p{L}\p{N}]/gu, "").length + 2);
  const total = pesos.reduce((a, c) => a + c, 0);
  const dur = frase.fin - frase.inicio;
  let acc = 0;
  const inicios = pesos.map((w) => {
    const s = frase.inicio + (acc / total) * dur;
    acc += w;
    return s;
  });
  const entra = interpolate(frame - Math.round(frase.inicio * fps), [0, 8], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: MARCO.captionsTop, display: "flex", justifyContent: "center", opacity: entra, transform: `translateY(${(1 - entra) * 10}px)` }}>
      <div style={{ maxWidth: 1560, fontFamily: fuente, fontWeight: 700, fontSize: 34, lineHeight: 1.3, color: b.tinta, background: "rgba(255,255,255,0.95)", borderRadius: 20, padding: "14px 28px", border: `2px solid ${b.linea}`, textAlign: "center", boxShadow: "0 6px 20px rgba(11,46,74,0.08)" }}>
        {palabras.map((w, i) => {
          const activa = t >= inicios[i] && (i === palabras.length - 1 || t < inicios[i + 1]);
          const dicha = t >= inicios[i];
          return (
            <span key={`${w}-${i}`} style={{ color: activa ? b.copihue : b.tinta, opacity: dicha ? 1 : 0.4 }}>
              {w}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
};
