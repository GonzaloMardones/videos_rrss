import React from "react";
import { AbsoluteFill } from "remotion";
import { Reveal } from "../../../components/Reveal";
import { AnimatedNumber } from "../../../components/AnimatedNumber";
import { colors, fonts, SAFE } from "../../../theme";
import { crecimiento, mineria } from "../data";
import { fmt } from "../../../components/format";

const darkFrame: React.CSSProperties = {
  backgroundColor: colors.navy,
  color: colors.paper,
  fontFamily: fonts.sans,
  padding: `${SAFE.top}px ${SAFE.right}px ${SAFE.bottom}px ${SAFE.left}px`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 28,
};

const kicker: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  letterSpacing: 4,
  textTransform: "uppercase",
  color: colors.blueLight,
};

// 0–6 s: el gancho. Una contradicción que invita a quedarse.
export const Gancho: React.FC = () => (
  <AbsoluteFill style={darkFrame}>
    <Reveal>
      <div style={kicker}>Chile · octubre 2026</div>
    </Reveal>
    <Reveal delay={8}>
      <div style={{ fontFamily: fonts.serif, fontSize: 62, lineHeight: 1.2 }}>
        El cobre está en su precio más alto de la historia…
      </div>
    </Reveal>
    <Reveal delay={22}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
        <span style={{ fontSize: 150, fontWeight: 800, color: colors.blueLight, letterSpacing: -3 }}>
          <AnimatedNumber value={mineria.cobreRecord} from={4} decimals={2} prefix="US$" delay={22} duration={36} />
        </span>
        <span style={{ fontSize: 34, color: colors.blueMist }}>la libra</span>
      </div>
    </Reveal>
    <Reveal delay={70}>
      <div style={{ fontFamily: fonts.serif, fontSize: 62, lineHeight: 1.2 }}>
        …y aun así la economía chilena casi no crece.
      </div>
    </Reveal>
    <Reveal delay={84}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 132, fontWeight: 800, color: colors.alertOnDark, letterSpacing: -3 }}>
          {fmt(crecimiento.proyeccion2026.min, 2)}–{fmt(crecimiento.proyeccion2026.max, 2)}%
        </span>
        <span style={{ fontSize: 30, color: colors.blueMist }}>
          crecimiento proyectado para 2026 por el Banco Central
        </span>
      </div>
    </Reveal>
    <Reveal delay={128}>
      <div style={{ fontSize: 38, fontWeight: 600, color: colors.paper }}>¿Cómo se explica? Vamos por partes.</div>
    </Reveal>
  </AbsoluteFill>
);

type TituloProps = { serie: string; autor: string; programa: string };

export const Titulo: React.FC<TituloProps> = ({ serie, autor, programa }) => (
  <AbsoluteFill style={darkFrame}>
    <Reveal>
      <div style={kicker}>{serie}</div>
    </Reveal>
    <Reveal delay={6}>
      <div style={{ fontSize: 40, fontWeight: 700, color: colors.blueOnDark }}>
        Capítulo 1
      </div>
    </Reveal>
    <Reveal delay={10}>
      <div style={{ fontFamily: fonts.serif, fontSize: 96, lineHeight: 1.1 }}>¿Cómo está Chile en 2026?</div>
    </Reveal>
    <Reveal delay={18}>
      <div style={{ width: 120, height: 5, backgroundColor: colors.blue }} />
    </Reveal>
    <Reveal delay={24}>
      <div style={{ fontSize: 38, lineHeight: 1.4, color: colors.blueMist }}>
        Siete indicadores para leer la economía del país, explicados sin jerga y con datos oficiales.
      </div>
    </Reveal>
    <Reveal delay={36}>
      <div style={{ fontSize: 28, lineHeight: 1.45, color: colors.mutedOnDark, paddingTop: 24 }}>
        {programa}
        <br />
        {autor}
      </div>
    </Reveal>
  </AbsoluteFill>
);

const glosario = ["PIB", "Imacec", "Inflación (IPC)", "Meta de inflación", "TPM", "Desocupación", "Déficit fiscal", "Deuda pública"];

export const Cierre: React.FC<{ autor: string; corte: string }> = ({ autor, corte }) => (
  <AbsoluteFill style={darkFrame}>
    <Reveal>
      <div style={kicker}>Glosario del capítulo 1</div>
    </Reveal>
    <Reveal delay={6}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        {glosario.map((term) => (
          <span
            key={term}
            style={{
              fontSize: 30,
              fontWeight: 600,
              padding: "10px 22px",
              border: `2px solid ${colors.blueLight}`,
              borderRadius: 999,
              color: colors.paper,
            }}
          >
            {term}
          </span>
        ))}
      </div>
    </Reveal>
    <Reveal delay={20}>
      <div style={{ fontFamily: fonts.serif, fontSize: 60, lineHeight: 1.2, paddingTop: 20 }}>
        ¿Qué indicador te sorprendió más?
      </div>
    </Reveal>
    <Reveal delay={30}>
      <div style={{ fontSize: 36, lineHeight: 1.4, color: colors.blueMist }}>
        Cuéntame en los comentarios y sígueme para el capítulo 2.
      </div>
    </Reveal>
    <Reveal delay={44}>
      <div style={{ fontSize: 24, lineHeight: 1.5, color: colors.mutedOnDark, paddingTop: 30 }}>
        {corte}. Fuentes: Banco Central de Chile, INE, Dipres, Cochilco y Ministerio de Hacienda.
        <br />
        {autor}
      </div>
    </Reveal>
  </AbsoluteFill>
);
