import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../../components/SceneShell";
import { clamp, Pop, useSpring } from "../../../components/motion";
import { useCue } from "../../../components/narracion";
import { GradientText, Pill } from "../../../components/ui";
import { colors, fonts, gradients } from "../../../theme";

// Frase que "cae" con fuerza sobre la pantalla.
const Slam: React.FC<{ at: number; gradient: string; children: React.ReactNode }> = ({ at, gradient, children }) => {
  const p = useSpring(at, { damping: 13, stiffness: 170 });
  const o = interpolate(p, [0, 0.4], [0, 1], clamp);
  return (
    <div
      style={{
        fontSize: 104,
        fontWeight: 900,
        letterSpacing: -4,
        lineHeight: 1.08,
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

export const Cierre: React.FC<{ autor: string; programa: string; corte: string }> = ({ autor, programa, corte }) => {
  const frame = useCurrentFrame();
  const cUno = useCue("uno");
  const cDos = useCue("dos");
  const cTres = useCue("tres");
  const cPero = useCue("pero");
  const cAutor = useCue("autor");
  const cCta = useCue("cta");
  const shrink = useSpring(cPero, { damping: 20 });
  const glow = 0.5 + 0.5 * Math.sin(frame * 0.18);
  const iniciales = autor
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <SceneShell entrada="zoom" source={`${corte} · Banco Central · INE · Dipres · Cochilco · Hacienda`}>
      <div style={{ position: "relative", flex: 1 }}>
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            transform: `scale(${1 - 0.42 * shrink})`,
            transformOrigin: "left top",
            opacity: 1 - 0.55 * shrink,
          }}
        >
          <Slam at={cUno + 8} gradient={gradients.warm}>
            Crece poco.
          </Slam>
          <Slam at={cDos} gradient={gradients.brand}>
            Precios presionan.
          </Slam>
          <Slam at={cTres} gradient={gradients.warm}>
            Falta empleo.
          </Slam>
        </div>

        <div style={{ position: "absolute", top: 260, left: 0, right: 0 }}>
          <Pop at={cPero}>
            <Pill dot={colors.gold}>Pero ojo</Pill>
          </Pop>
          <Pop at={cPero + 8} from="zoom" style={{ transformOrigin: "left center" }}>
            <div style={{ fontFamily: fonts.serif, fontStyle: "italic", fontSize: 150, lineHeight: 1, letterSpacing: -3, marginTop: 14 }}>
              <GradientText gradient={gradients.gold}>el cobre vale oro</GradientText>
            </div>
          </Pop>
          <Pop at={cPero + 30}>
            <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.2, color: colors.text, marginTop: 10 }}>
              y la inversión puede cambiar la historia.
            </div>
          </Pop>
        </div>

        <div style={{ position: "absolute", top: 640, left: 0, right: 0 }}>
          <Pop at={cAutor} from="left">
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div
                style={{
                  width: 104,
                  height: 104,
                  borderRadius: 52,
                  padding: 4,
                  background: gradients.brand,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 50,
                    background: colors.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 40,
                    fontWeight: 900,
                  }}
                >
                  {iniciales}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1 }}>{autor}</div>
                <div style={{ fontSize: 28, color: colors.dim }}>{programa}</div>
              </div>
            </div>
          </Pop>
        </div>

        <div style={{ position: "absolute", top: 820, left: 0, right: 0 }}>
          <Pop at={cCta} from="zoom">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 18,
                padding: "26px 44px",
                borderRadius: 999,
                background: gradients.brand,
                color: colors.bg,
                fontSize: 46,
                fontWeight: 900,
                letterSpacing: -1,
                boxShadow: `0 0 ${50 + 40 * glow}px rgba(255,77,141,${0.35 + 0.3 * glow})`,
              }}
            >
              Sígueme · Capítulo 2 →
            </div>
          </Pop>
        </div>
      </div>
    </SceneShell>
  );
};
