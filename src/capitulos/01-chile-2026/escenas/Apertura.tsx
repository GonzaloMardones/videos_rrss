import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../../components/SceneShell";
import { clamp, Pop, useSpring, WordsIn } from "../../../components/motion";
import { useCue } from "../../../components/narracion";
import { Counter, fmtAuto, GradientText, Pill } from "../../../components/ui";
import { colors, fonts, gradients } from "../../../theme";
import { crecimiento, mineria } from "../data";

// El gancho: una contradicción en dos cifras.
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const cCobre = useCue("cobre");
  const cPib = useCue("pib");
  const cPregunta = useCue("pregunta");
  const moveUp = useSpring(cPib, { damping: 20 });
  const dim = interpolate(frame, [cPregunta, cPregunta + 10], [1, 0.4], clamp);
  const shake = frame >= cPregunta && frame < cPregunta + 12 ? Math.sin(frame * 3) * 6 : 0;

  return (
    <SceneShell entrada="none">
      <div style={{ position: "relative", flex: 1, transform: `translateX(${shake}px)` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: interpolate(moveUp, [0, 1], [260, 0]), opacity: dim }}>
          <Pop at={cCobre}>
            <Pill dot={colors.gold}>Precio del cobre · récord histórico</Pill>
          </Pop>
          <Pop at={cCobre + 4} from="zoom">
            <div style={{ fontSize: 210, fontWeight: 900, letterSpacing: -8, lineHeight: 1.05, marginTop: 18 }}>
              <GradientText gradient={gradients.gold}>
                <Counter to={mineria.cobreRecord} from={3} at={cCobre + 4} duration={40} decimals={2} prefix="US$" />
              </GradientText>
            </div>
          </Pop>
          <Pop at={cCobre + 14}>
            <div style={{ fontFamily: fonts.serif, fontStyle: "italic", fontSize: 52, color: colors.dim }}>
              por libra · agosto 2026
            </div>
          </Pop>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, top: 440, opacity: dim }}>
          <Pop at={cPib + 4}>
            <Pill dot={colors.pink}>Crecimiento de Chile en 2026</Pill>
          </Pop>
          <Pop at={cPib + 10} from="zoom">
            <div style={{ fontSize: 132, fontWeight: 900, letterSpacing: -5, lineHeight: 1.05, marginTop: 18, whiteSpace: "nowrap" }}>
              <GradientText gradient={gradients.warm}>
                {fmtAuto(crecimiento.proyeccion2026.min)}–{fmtAuto(crecimiento.proyeccion2026.max)}%
              </GradientText>
            </div>
          </Pop>
          <Pop at={cPib + 18}>
            <div style={{ fontFamily: fonts.serif, fontStyle: "italic", fontSize: 52, color: colors.dim }}>
              proyección del Banco Central
            </div>
          </Pop>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, top: 790, textAlign: "center" }}>
          <Pop at={cPregunta} from="zoom">
            <div style={{ fontFamily: fonts.serif, fontStyle: "italic", fontSize: 190, lineHeight: 1 }}>
              <GradientText gradient={gradients.brand}>¿Cómo?</GradientText>
            </div>
          </Pop>
        </div>
      </div>
    </SceneShell>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string; programa: string }> = ({ serie, autor, programa }) => (
  <SceneShell entrada="zoom">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
      <Pop at={4}>
        <Pill dot={colors.pink}>{serie}</Pill>
      </Pop>
      <Pop at={8}>
        <div style={{ fontSize: 40, fontWeight: 700, color: colors.dim, letterSpacing: 1 }}>Capítulo 1</div>
      </Pop>
      <div style={{ lineHeight: 0.98 }}>
        <WordsIn at={10} text="¿Cómo está" style={{ fontSize: 132, fontWeight: 900, letterSpacing: -5, display: "block" }} />
        <Pop at={18} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ fontFamily: fonts.serif, fontStyle: "italic", fontSize: 280, lineHeight: 0.95, letterSpacing: -4 }}>
            <GradientText gradient={gradients.brand}>Chile</GradientText>
          </div>
        </Pop>
        <WordsIn at={24} text="en 2026?" style={{ fontSize: 132, fontWeight: 900, letterSpacing: -5, display: "block" }} />
      </div>
      <Pop at={34}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 20 }}>
          <Pill>7 indicadores</Pill>
          <Pill>Datos oficiales</Pill>
          <Pill>Sin jerga</Pill>
        </div>
      </Pop>
      <Pop at={42}>
        <div style={{ fontSize: 28, color: colors.faint, marginTop: 12 }}>
          {autor} · {programa}
        </div>
      </Pop>
    </div>
  </SceneShell>
);
