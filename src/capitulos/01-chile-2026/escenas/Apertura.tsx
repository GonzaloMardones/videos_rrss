import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../../components/SceneShell";
import { clamp, Pop, useSpring, WordsIn } from "../../../components/motion";
import { useCue } from "../../../components/narracion";
import { Counter, fmtAuto, GradientText, Note } from "../../../components/ui";
import { colors, fonts, gradients } from "../../../theme";
import { crecimiento, mineria } from "../data";

const big: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 800, letterSpacing: -6, lineHeight: 1 };

// El gancho: una contradicción en dos cifras.
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const cCobre = useCue("cobre");
  const cPib = useCue("pib");
  const cPregunta = useCue("pregunta");
  const moveUp = useSpring(cPib, { damping: 20 });
  const dim = interpolate(frame, [cPregunta, cPregunta + 10], [1, 0.35], clamp);
  const shake = frame >= cPregunta && frame < cPregunta + 12 ? Math.sin(frame * 3) * 6 : 0;

  return (
    <SceneShell entrada="none">
      <div style={{ position: "relative", flex: 1, transform: `translateX(${shake}px)` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: interpolate(moveUp, [0, 1], [240, 0]), opacity: dim }}>
          <Pop at={cCobre} from="zoom" style={{ transformOrigin: "left center" }}>
            <div style={{ ...big, fontSize: 220 }}>
              <GradientText gradient={gradients.gold}>
                <Counter to={mineria.cobreRecord} from={3} at={cCobre} duration={40} decimals={2} prefix="US$" />
              </GradientText>
            </div>
          </Pop>
          <Pop at={cCobre + 12}>
            <Note style={{ fontSize: 40, marginTop: 6 }}>la libra de cobre, su récord histórico</Note>
          </Pop>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, top: 420, opacity: dim }}>
          <Pop at={cPib + 6} from="zoom" style={{ transformOrigin: "left center" }}>
            <div style={{ ...big, fontSize: 150, whiteSpace: "nowrap" }}>
              <GradientText gradient={gradients.warm}>
                {fmtAuto(crecimiento.proyeccion2026.min)}–{fmtAuto(crecimiento.proyeccion2026.max)}%
              </GradientText>
            </div>
          </Pop>
          <Pop at={cPib + 16}>
            <Note style={{ fontSize: 40, marginTop: 6 }}>lo que crecería Chile en 2026</Note>
          </Pop>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, top: 760, textAlign: "center" }}>
          <Pop at={cPregunta} from="zoom">
            <div style={{ ...big, fontSize: 210 }}>
              <GradientText gradient={gradients.brand}>¿Cómo?</GradientText>
            </div>
          </Pop>
        </div>
      </div>
    </SceneShell>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ serie, autor }) => (
  <SceneShell entrada="zoom">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
      <Pop at={2}>
        <div style={{ fontFamily: fonts.display, fontSize: 40, fontWeight: 600, color: colors.dim }}>
          {serie} · Capítulo 1
        </div>
      </Pop>
      <div style={{ fontFamily: fonts.display, fontWeight: 800, letterSpacing: -6, lineHeight: 0.95 }}>
        <WordsIn at={4} stagger={2} text="¿Cómo está" style={{ fontSize: 150, display: "block" }} />
        <Pop at={9} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ fontSize: 290, letterSpacing: -12 }}>
            <GradientText gradient={gradients.brand}>Chile</GradientText>
          </div>
        </Pop>
        <WordsIn at={13} stagger={2} text="en 2026?" style={{ fontSize: 150, display: "block" }} />
      </div>
      <Pop at={20}>
        <Note style={{ fontSize: 30, marginTop: 24 }}>por {autor}</Note>
      </Pop>
    </div>
  </SceneShell>
);
