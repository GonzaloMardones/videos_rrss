import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../../components/SceneShell";
import { clamp, Pop, useSpring } from "../../../components/motion";
import { useCue } from "../../../components/narracion";
import { GradientText, Note } from "../../../components/ui";
import { colors, fonts, gradients } from "../../../theme";

// Frase que "cae" con fuerza sobre la pantalla.
const Slam: React.FC<{ at: number; gradient: string; children: React.ReactNode }> = ({ at, gradient, children }) => {
  const p = useSpring(at, { damping: 13, stiffness: 170 });
  const o = interpolate(p, [0, 0.4], [0, 1], clamp);
  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontSize: 104,
        fontWeight: 800,
        letterSpacing: -4,
        lineHeight: 1.04,
        whiteSpace: "nowrap",
        opacity: o,
        transform: `scale(${1.7 - 0.7 * p})`,
        transformOrigin: "left center",
        filter: `blur(${(1 - o) * 20}px)`,
      }}
    >
      <GradientText gradient={gradient}>{children}</GradientText>
    </div>
  );
};

export const Cierre: React.FC<{ autor: string; corte: string }> = ({ autor, corte }) => {
  const frame = useCurrentFrame();
  const cUno = useCue("uno");
  const cDos = useCue("dos");
  const cTres = useCue("tres");
  const cPero = useCue("pero");
  const cCta = useCue("cta");
  const shrink = useSpring(cPero, { damping: 20 });
  const glow = 0.5 + 0.5 * Math.sin(frame * 0.18);
  const iniciales = autor
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <SceneShell entrada="zoom" source={`${corte} · Banco Central, INE, Dipres, Cochilco y Hacienda`}>
      <div style={{ position: "relative", flex: 1 }}>
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 0,
            transform: `scale(${1 - 0.5 * shrink})`,
            transformOrigin: "left top",
            opacity: 1 - 0.6 * shrink,
          }}
        >
          <Slam at={cUno + 10} gradient={gradients.warm}>
            Crece poco.
          </Slam>
          <Slam at={cDos} gradient={gradients.brand}>
            Precios presionan.
          </Slam>
          <Slam at={cTres} gradient={gradients.warm}>
            Falta empleo.
          </Slam>
        </div>

        <div style={{ position: "absolute", top: 230, left: 0, right: 0 }}>
          <Pop at={cPero}>
            <div style={{ fontFamily: fonts.display, fontSize: 52, fontWeight: 700, color: colors.dim }}>Pero ojo:</div>
          </Pop>
          <Pop at={cPero + 8} from="zoom" style={{ transformOrigin: "left center" }}>
            <div style={{ fontFamily: fonts.display, fontSize: 132, fontWeight: 800, lineHeight: 1, letterSpacing: -5, marginTop: 8 }}>
              <GradientText gradient={gradients.gold}>el cobre vale oro</GradientText>
            </div>
          </Pop>
          <Pop at={cPero + 30}>
            <div style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.2, color: colors.text, marginTop: 14 }}>
              y la inversión puede cambiar la historia.
            </div>
          </Pop>
        </div>

        <div style={{ position: "absolute", top: 760, left: 0, right: 0, display: "flex", alignItems: "center", gap: 26 }}>
          <Pop at={cCta - 6} from="left">
            <div style={{ width: 112, height: 112, borderRadius: 56, padding: 5, background: gradients.brand }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 52,
                  background: colors.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: fonts.display,
                  fontSize: 44,
                  fontWeight: 800,
                }}
              >
                {iniciales}
              </div>
            </div>
          </Pop>
          <Pop at={cCta} from="zoom">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "26px 44px",
                borderRadius: 999,
                background: gradients.brand,
                color: colors.bg,
                fontFamily: fonts.display,
                fontSize: 48,
                fontWeight: 800,
                letterSpacing: -1,
                boxShadow: `0 0 ${50 + 40 * glow}px rgba(255,77,141,${0.35 + 0.3 * glow})`,
              }}
            >
              Sígueme · Capítulo 2 →
            </div>
          </Pop>
        </div>
        <Pop at={cCta + 6} style={{ position: "absolute", top: 900, left: 0 }}>
          <Note style={{ fontSize: 30 }}>{autor}</Note>
        </Pop>
      </div>
    </SceneShell>
  );
};
