import React from "react";
import { AbsoluteFill } from "remotion";
import { Reveal } from "../../../components/Reveal";
import { fmt } from "../../../components/format";
import { colors, fonts, SAFE } from "../../../theme";
import { crecimiento, empleo, fiscal, inflacion, mineria, tasa } from "../data";

type Tile = { label: string; value: string; status: string; tone: "alert" | "good" | "neutral" };

const last = <T,>(arr: T[]) => arr[arr.length - 1];

const tiles: Tile[] = [
  {
    label: "Crecimiento 2026",
    value: `${fmt(crecimiento.proyeccion2026.min, 2)}–${fmt(crecimiento.proyeccion2026.max, 2)}%`,
    status: "Débil",
    tone: "alert",
  },
  { label: "Inflación", value: `${fmt(last(inflacion.serie).value)}%`, status: "Sobre la meta de 3%", tone: "alert" },
  { label: "Tasa (TPM)", value: `${fmt(tasa.tpm)}%`, status: "En pausa", tone: "neutral" },
  { label: "Desocupación", value: `${fmt(last(empleo.serie).value)}%`, status: "Al alza", tone: "alert" },
  { label: "Déficit fiscal 2026", value: `${fmt(fiscal.deficit2026)}% PIB`, status: "Bajando", tone: "good" },
  { label: "Precio del cobre", value: `US$${fmt(mineria.cobreRecord, 2)}`, status: "Récord histórico", tone: "good" },
];

const toneColor = { alert: colors.alert, good: colors.blue, neutral: colors.navy };

export const Resumen: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: colors.paper,
      fontFamily: fonts.sans,
      color: colors.ink,
      padding: `${SAFE.top}px ${SAFE.right}px ${SAFE.bottom - 40}px ${SAFE.left}px`,
      display: "flex",
      flexDirection: "column",
      gap: 26,
    }}
  >
    <Reveal>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.blue }}>
        Resumen
      </div>
    </Reveal>
    <Reveal delay={4}>
      <div style={{ fontFamily: fonts.serif, fontSize: 64, lineHeight: 1.15, color: colors.navy }}>
        El tablero de Chile, octubre 2026
      </div>
    </Reveal>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, paddingTop: 8 }}>
      {tiles.map((tile, i) => (
        <Reveal key={tile.label} delay={12 + i * 7}>
          <div
            style={{
              border: `1px solid ${colors.border}`,
              borderTop: `5px solid ${toneColor[tile.tone]}`,
              padding: "18px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: colors.muted }}>
              {tile.label}
            </div>
            <div style={{ fontSize: 54, fontWeight: 800, color: toneColor[tile.tone], letterSpacing: -1 }}>{tile.value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 26, color: colors.ink }}>
              <span style={{ width: 14, height: 14, borderRadius: 7, background: toneColor[tile.tone] }} />
              {tile.status}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
    <Reveal delay={60}>
      <div
        style={{
          backgroundColor: colors.navy,
          color: colors.paper,
          padding: "26px 30px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: colors.blueLight }}>
          Lo que aprendimos
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 40, lineHeight: 1.3 }}>
          La macroeconomía se lee como un tablero: ningún indicador cuenta la historia solo.
        </div>
      </div>
    </Reveal>
  </AbsoluteFill>
);
