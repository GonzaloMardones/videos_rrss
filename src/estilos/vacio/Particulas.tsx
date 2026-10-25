import React, { useMemo } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { espectro, v } from "./tokens";

// Generador pseudoaleatorio con semilla: las partículas quedan iguales en cada frame y en cada render.
const azar = (semilla: number) => {
  let s = semilla >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const triangulo = (x: number, y: number, r: number, rot: number) => {
  const p = [0, 1, 2].map((i) => {
    const a = rot + (i * 2 * Math.PI) / 3;
    return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`;
  });
  return p.join(" ");
};

// Fondo: negro puro con triángulos sueltos que flotan muy despacio hacia arriba.
export const FondoVacio: React.FC<{ cantidad?: number }> = ({ cantidad = 80 }) => {
  const frame = useCurrentFrame();
  const parts = useMemo(() => {
    const r = azar(7);
    return Array.from({ length: cantidad }, () => ({
      x: r() * 1080,
      y: r() * 1920,
      tam: 4 + r() * 7,
      rot: r() * Math.PI * 2,
      giro: (r() - 0.5) * 0.02,
      vel: 0.15 + r() * 0.35,
      color: espectro[Math.floor(r() * espectro.length)],
      alfa: 0.18 + r() * 0.32,
      fase: r() * Math.PI * 2,
    }));
  }, [cantidad]);
  return (
    <AbsoluteFill style={{ backgroundColor: v.vacio }}>
      <svg width={1080} height={1920}>
        {parts.map((p, i) => {
          const y = (((p.y - frame * p.vel) % 1920) + 1920) % 1920;
          const x = p.x + Math.sin(frame * 0.01 + p.fase) * 12;
          const tw = 0.6 + 0.4 * Math.sin(frame * 0.05 + p.fase);
          return <polygon key={i} points={triangulo(x, y, p.tam, p.rot + frame * p.giro)} fill="none" stroke={p.color} strokeWidth={1.5} opacity={p.alfa * tw} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ¿Cae el punto dentro de la silueta de un cerebro visto de lado? Unión de elipses con borde irregular.
const enCerebro = (x: number, y: number) => {
  const borde = 0.06 * Math.sin(x * 9) * Math.cos(y * 7);
  const e = (cx: number, cy: number, rx: number, ry: number) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1 + borde;
  return e(-0.05, -0.08, 0.95, 0.62) || e(0.42, 0.18, 0.5, 0.42) || e(0.48, 0.55, 0.3, 0.18) || e(0.12, 0.42, 0.14, 0.32);
};

type Forma = "cerebro" | "anillo" | "red";

const objetivo = (forma: Forma, r: () => number): [number, number] => {
  if (forma === "anillo") {
    const a = r() * Math.PI * 2;
    const rad = 0.75 + (r() - 0.5) * 0.25;
    return [Math.cos(a) * rad, Math.sin(a) * rad];
  }
  if (forma === "red") {
    // Tres nodos y sus conexiones: el grafo hecho de partículas.
    const nodos: [number, number][] = [
      [-0.75, 0.2],
      [0, -0.35],
      [0.75, 0.2],
    ];
    if (r() < 0.7) {
      const n = nodos[Math.floor(r() * 3)];
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r()) * 0.22;
      return [n[0] + Math.cos(a) * d, n[1] + Math.sin(a) * d];
    }
    const k = Math.floor(r() * 2);
    const t = r();
    const [a, b] = [nodos[k], nodos[k + 1]];
    return [a[0] + (b[0] - a[0]) * t + (r() - 0.5) * 0.04, a[1] + (b[1] - a[1]) * t + (r() - 0.5) * 0.04];
  }
  // Cerebro: contorno marcado, pliegues interiores y relleno disperso, para que se lea la forma.
  const modo = r();
  if (modo < 0.3) {
    for (;;) {
      const a = Math.PI * (0.85 + r() * 1.35);
      const x = -0.05 + Math.cos(a) * 0.95 + (r() - 0.5) * 0.03;
      const y = -0.08 + Math.sin(a) * 0.62 + (r() - 0.5) * 0.03;
      if (y < 0.38) return [x, y];
    }
  }
  if (modo < 0.65) {
    const pliegues = [
      [-0.32, 0.09, 7, 0.0],
      [-0.12, 0.08, 6, 1.3],
      [0.08, 0.07, 8, 2.1],
      [0.26, 0.06, 6, 0.7],
    ];
    for (;;) {
      const [c, amp, k, fase] = pliegues[Math.floor(r() * pliegues.length)];
      const x = (r() - 0.5) * 1.8;
      const y = c + amp * Math.sin(k * x + fase) + (r() - 0.5) * 0.02;
      if (enCerebro(x * 1.04, y * 1.04)) return [x, y];
    }
  }
  for (;;) {
    const x = (r() - 0.5) * 2;
    const y = (r() - 0.5) * 1.6;
    if (enCerebro(x, y)) return [x, y];
  }
};

// Constelación: cientos de triángulos que llegan desde todas partes y forman una figura.
// Es la firma visual de la serie; al cambiar `forma`, las mismas partículas se reordenan.
export const Constelacion: React.FC<{
  at: number;
  ancho?: number;
  forma?: Forma;
  desde?: Forma;
  cambio?: number; // frame (local) en que pasa de `desde` a `forma`
  cantidad?: number;
  semilla?: number;
  style?: React.CSSProperties;
}> = ({ at, ancho = 900, forma = "cerebro", desde, cambio = 0, cantidad = 680, semilla = 11, style }) => {
  const frame = useCurrentFrame();
  const parts = useMemo(() => {
    const r = azar(semilla);
    return Array.from({ length: cantidad }, () => {
      const ang = r() * Math.PI * 2;
      const lejos = 1.4 + r() * 1.2;
      return {
        sx: Math.cos(ang) * lejos,
        sy: Math.sin(ang) * lejos,
        tam: 3 + r() * 6,
        rot: r() * Math.PI * 2,
        color: espectro[Math.floor(r() * espectro.length)],
        retraso: r() * 24,
        fase: r() * Math.PI * 2,
        semilla: Math.floor(r() * 1e9),
      };
    });
  }, [cantidad, semilla]);
  const destinos = useMemo(() => {
    const calc = (f: Forma) => parts.map((p) => objetivo(f, azar(p.semilla + f.length * 97)));
    return { cerebro: calc("cerebro"), anillo: calc("anillo"), red: calc("red") };
  }, [parts]);
  const alto = ancho * 0.8;
  const respira = 1 + 0.015 * Math.sin(frame * 0.05);
  return (
    <svg width={ancho} height={alto} viewBox={`${-ancho / 2} ${-alto / 2} ${ancho} ${alto}`} style={{ overflow: "visible", ...style }}>
      {parts.map((p, i) => {
        const llega = interpolate(frame - at - p.retraso, [0, 40], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        const mezcla = desde
          ? interpolate(frame - cambio - p.retraso * 0.6, [0, 36], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.inOut(Easing.cubic),
            })
          : 1;
        const a = destinos[desde ?? forma][i];
        const b = destinos[forma][i];
        const tx = a[0] + (b[0] - a[0]) * mezcla;
        const ty = a[1] + (b[1] - a[1]) * mezcla;
        const x = (p.sx + (tx - p.sx) * llega) * (ancho / 2) * respira + Math.sin(frame * 0.03 + p.fase) * 3;
        const y = (p.sy + (ty - p.sy) * llega) * (ancho / 2) * respira + Math.cos(frame * 0.027 + p.fase) * 3;
        const brillo = 0.55 + 0.45 * Math.sin(frame * 0.07 + p.fase);
        return <polygon key={i} points={triangulo(x, y, p.tam, p.rot + frame * 0.004)} fill="none" stroke={p.color} strokeWidth={1.6} opacity={llega * brillo} />;
      })}
    </svg>
  );
};
