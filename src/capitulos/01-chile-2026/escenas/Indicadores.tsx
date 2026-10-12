import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneFrame } from "../../../components/SceneFrame";
import { ExplainBox } from "../../../components/ExplainBox";
import { BarChart } from "../../../components/BarChart";
import { LineChart } from "../../../components/LineChart";
import { StatCard } from "../../../components/StatCard";
import { Reveal } from "../../../components/Reveal";
import { AnimatedNumber } from "../../../components/AnimatedNumber";
import { fmt, fmtSigned } from "../../../components/format";
import { colors, fonts } from "../../../theme";
import { crecimiento, empleo, fiscal, inflacion, mineria, reconstruccion, tasa } from "../data";

const CHAPTER = "Cap. 1 · Chile 2026";
const STEPS = 7;

const Note: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => (
  <Reveal delay={delay}>
    <div style={{ fontSize: 29, lineHeight: 1.4, color: colors.ink }}>{children}</div>
  </Reveal>
);

const range = (r: { min: number; max: number }) => {
  const d = (n: number) => (Number.isInteger(n) ? 0 : Math.round(n * 10) === n * 10 ? 1 : 2);
  return `${fmt(r.min, d(r.min))}%–${fmt(r.max, d(r.max))}%`;
};

// 1 · Crecimiento
export const Crecimiento: React.FC = () => (
  <SceneFrame
    chapter={CHAPTER}
    step={1}
    totalSteps={STEPS}
    topic="Crecimiento · PIB"
    headline="Chile creció 2,5% en 2025, pero este año crecería menos de 1%"
    source={crecimiento.fuente}
  >
    <ExplainBox>
      El <b>PIB</b> es el valor de todo lo que el país produce en un año. Cuando crece, suele haber más empleo y más
      ingresos.
    </ExplainBox>
    <Reveal delay={26}>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: colors.muted }}>
        Crecimiento anual del PIB
      </div>
    </Reveal>
    <BarChart
      delay={34}
      maxValue={3.2}
      height={470}
      items={[
        ...crecimiento.historico.map((d) => ({ label: d.label, value: d.value })),
        { label: "2026 proy.", range: crecimiento.proyeccion2026 },
      ]}
    />
    <Note delay={80}>
      <span style={{ color: colors.blue, fontWeight: 700 }}>Rayado:</span> rango que proyecta el Banco Central para
      2026.
    </Note>
  </SceneFrame>
);

// Barras que nacen desde el centro: negativas a la izquierda, positivas a la derecha.
const DivergingBars: React.FC<{ rows: { label: string; value: number; strong?: boolean }[]; delay: number; max: number }> = ({
  rows,
  delay,
  max,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const half = 300;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {rows.map((row, i) => {
        const p = spring({ frame: frame - delay - i * 8, fps, config: { damping: 200 }, durationInFrames: 26 });
        const w = (Math.abs(row.value) / max) * half * p;
        const negative = row.value < 0;
        const color = negative ? colors.alert : colors.blue;
        return (
          <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 18, opacity: Math.min(1, p * 2) }}>
            <div style={{ width: 250, fontSize: 28, fontWeight: row.strong ? 700 : 500, color: colors.navy }}>{row.label}</div>
            <div style={{ position: "relative", width: half * 2, height: 46 }}>
              <div style={{ position: "absolute", left: half - 1, top: -6, bottom: -6, width: 2, background: colors.navy }} />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  height: 46,
                  width: w,
                  left: negative ? half - w : half,
                  background: color,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 4,
                  fontSize: 30,
                  fontWeight: 800,
                  color,
                  ...(negative ? { right: half + w + 10 } : { left: half + w + 10 }),
                }}
              >
                {fmtSigned(row.value)}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 2 · Cobre
export const Cobre: React.FC = () => (
  <SceneFrame
    chapter={CHAPTER}
    step={2}
    totalSteps={STEPS}
    topic="La paradoja del cobre"
    headline="El cobre vale más que nunca, pero Chile está sacando mucho menos"
    source={mineria.fuente}
  >
    <div style={{ display: "flex", gap: 20 }}>
      <StatCard delay={14} value={`US$${fmt(mineria.cobreRecord, 2)}`} label="precio récord por libra (agosto 2026)" />
      <StatCard
        delay={22}
        accent={colors.alert}
        value={`${fmtSigned(mineria.imacecMinero)}%`}
        label="producción minera en agosto vs. agosto 2025"
      />
    </div>
    <ExplainBox delay={40}>
      Lo que el país gana con el cobre es <b>precio × cantidad</b>. Si la cantidad cae fuerte, ni un precio récord
      alcanza a compensar.
    </ExplainBox>
    <Reveal delay={60}>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: colors.muted }}>
        Imacec de agosto 2026 · variación anual
      </div>
    </Reveal>
    <DivergingBars
      delay={66}
      max={18}
      rows={[
        { label: "Minería", value: mineria.imacecMinero },
        { label: "Resto (no minero)", value: mineria.imacecNoMinero },
        { label: "Economía total", value: mineria.imacec, strong: true },
      ]}
    />
    <Note delay={100}>
      El Banco Central lo atribuye a menores leyes del mineral, mantenciones y clima adverso.
    </Note>
  </SceneFrame>
);

// 3 · Inflación
export const Inflacion: React.FC = () => (
  <SceneFrame
    chapter={CHAPTER}
    step={3}
    totalSteps={STEPS}
    topic="Inflación · IPC"
    headline="Los precios suben 4,1% en un año: sobre la meta de 3%"
    source={inflacion.fuente}
  >
    <ExplainBox>
      La <b>inflación</b> mide cuánto suben los precios en 12 meses. El Banco Central busca que se mantenga en torno a 3%.
    </ExplainBox>
    <Reveal delay={26}>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: colors.muted }}>
        IPC, variación en 12 meses · dic. 2025 a sept. 2026
      </div>
    </Reveal>
    <LineChart
      delay={34}
      duration={70}
      data={inflacion.serie}
      yMin={1.5}
      yMax={4.8}
      height={560}
      unit="%"
      xLabelSize={23}
      band={{ min: inflacion.rango.min, max: inflacion.rango.max, label: "Rango de tolerancia 2%–4%" }}
      target={{ value: inflacion.meta, label: "Meta 3%" }}
      annotation={{ index: 4, lines: ["Guerra en Medio Oriente:", "suben los combustibles"] }}
    />
    <Note delay={110}>
      El Banco Central proyecta cerrar 2026 en {fmt(inflacion.proyeccionCierre2026)}% y volver a 3% en el 2.º trimestre
      de 2027.
    </Note>
  </SceneFrame>
);

// 4 · Tasa de política monetaria
export const Tasa: React.FC = () => (
  <SceneFrame
    chapter={CHAPTER}
    step={4}
    totalSteps={STEPS}
    topic="Tasa de política monetaria"
    headline="El Banco Central deja la tasa en 4,5% y espera"
    source={tasa.fuente}
  >
    <ExplainBox>
      La <b>TPM</b> es el «precio del dinero». Si baja, los créditos se abaratan y la economía se activa; si sube, se
      frena la inflación.
    </ExplainBox>
    <Reveal delay={30} style={{ display: "flex", alignItems: "baseline", gap: 24, justifyContent: "center", padding: "6px 0" }}>
      <span style={{ fontSize: 190, fontWeight: 800, color: colors.navy, letterSpacing: -4, lineHeight: 1 }}>
        <AnimatedNumber value={tasa.tpm} from={0} decimals={1} delay={30} duration={30} suffix="%" />
      </span>
      <span style={{ fontSize: 30, lineHeight: 1.3, color: colors.muted, width: 230 }}>sin cambios desde {tasa.desde}</span>
    </Reveal>
    <Reveal delay={56}>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: colors.muted }}>
        El dilema
      </div>
    </Reveal>
    <div style={{ display: "flex", gap: 20 }}>
      <StatCard
        delay={62}
        accent={colors.alert}
        valueSize={44}
        value="Bajarla"
        label={`La economía está débil: crecería ${range(crecimiento.proyeccion2026)} este año.`}
      />
      <StatCard
        delay={72}
        valueSize={44}
        value="Esperar"
        label="La inflación (4,1%) sigue sobre la meta y el petróleo presiona."
      />
    </div>
    <Note delay={96}>
      Por ahora pesa más la inflación: la tasa no se ha movido en lo que va de 2026.
    </Note>
  </SceneFrame>
);

// 5 · Empleo
export const Empleo: React.FC = () => (
  <SceneFrame
    chapter={CHAPTER}
    step={5}
    totalSteps={STEPS}
    topic="Mercado laboral"
    headline="Casi 1 de cada 10 personas que quiere trabajar no encuentra empleo"
    source={empleo.fuente}
  >
    <ExplainBox>
      La <b>tasa de desocupación</b> es el porcentaje de quienes trabajan o buscan trabajo que no logra encontrarlo.
    </ExplainBox>
    <Reveal delay={26}>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: colors.muted }}>
        Tasa de desocupación 2026 · trimestres móviles
      </div>
    </Reveal>
    <LineChart
      delay={34}
      duration={55}
      data={empleo.serie}
      yMin={8.5}
      yMax={9.9}
      height={400}
      unit="%"
      color={colors.alert}
      xLabelSize={22}
    />
    <div style={{ display: "flex", gap: 16 }}>
      <StatCard delay={92} accent={colors.alert} valueSize={50} value={`+${fmt(empleo.alzaDoceMeses)} pp`} label="vs. un año antes" />
      <StatCard delay={98} accent={colors.alert} valueSize={50} value={`${fmtSigned(empleo.ocupados)}%`} label="personas con empleo" />
      <StatCard
        delay={104}
        accent={colors.navy}
        valueSize={50}
        value={`${fmt(empleo.mujeres)}%`}
        label={`en mujeres (${fmt(empleo.hombres)}% en hombres)`}
      />
    </div>
  </SceneFrame>
);

const DebtGauge: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const scaleMax = 60;
  const width = 880;
  const p = interpolate(frame - delay, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const fill = (fiscal.deuda2026 / scaleMax) * width * p;
  const mark = (fiscal.nivelPrudente / scaleMax) * width;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: colors.muted }}>
        Deuda bruta del Gobierno Central · % del PIB, 2026
      </div>
      <div style={{ position: "relative", width, height: 70, background: colors.panel, marginTop: 52 }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: fill, background: colors.navy }} />
        <div
          style={{
            position: "absolute",
            left: Math.max(0, fill - 170),
            top: 12,
            fontSize: 40,
            fontWeight: 800,
            color: colors.paper,
            opacity: p,
          }}
        >
          {fmt(fiscal.deuda2026 * p)}%
        </div>
        <div style={{ position: "absolute", left: mark - 2, top: -16, bottom: -16, width: 4, background: colors.alert }} />
        <div
          style={{
            position: "absolute",
            left: mark - 120,
            top: -54,
            width: 240,
            textAlign: "center",
            fontSize: 24,
            fontWeight: 700,
            color: colors.alert,
          }}
        >
          Nivel prudente {fiscal.nivelPrudente}%
        </div>
      </div>
    </div>
  );
};

// 6 · Cuentas fiscales
export const Fiscal: React.FC = () => (
  <SceneFrame
    chapter={CHAPTER}
    step={6}
    totalSteps={STEPS}
    topic="Cuentas fiscales"
    headline="El Estado gasta más de lo que recauda, pero la brecha se achica"
    source={fiscal.fuente}
  >
    <ExplainBox>
      Hay <b>déficit fiscal</b> cuando el Estado gasta más de lo que recibe. La diferencia se cubre con deuda, como un
      hogar que paga con tarjeta.
    </ExplainBox>
    <Reveal delay={26}>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: colors.muted }}>
        Déficit fiscal efectivo · % del PIB
      </div>
    </Reveal>
    <BarChart
      delay={32}
      maxValue={3.2}
      height={340}
      items={[
        { label: "2025", value: fiscal.deficit2025, color: colors.navy },
        { label: "2026 proy.", value: fiscal.deficit2026, color: colors.blue },
      ]}
    />
    <Reveal delay={70}>
      <DebtGauge delay={74} />
    </Reveal>
  </SceneFrame>
);

// 7 · Lo que viene
export const LoQueViene: React.FC = () => (
  <SceneFrame
    chapter={CHAPTER}
    step={7}
    totalSteps={STEPS}
    topic="Lo que viene"
    headline="El Banco Central espera que Chile vuelva a crecer desde 2027"
    source={reconstruccion.fuente}
  >
    <ExplainBox label="La apuesta">
      La <b>Ley de Reconstrucción Nacional</b> busca reactivar la inversión: agiliza proyectos y baja gradualmente el
      impuesto a las empresas de {reconstruccion.impuestoDesde}% a {reconstruccion.impuestoHasta}%.
    </ExplainBox>
    <Reveal delay={30}>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: colors.muted }}>
        Crecimiento proyectado del PIB · rangos del Banco Central
      </div>
    </Reveal>
    <BarChart
      delay={38}
      maxValue={3.6}
      height={430}
      labelSize={32}
      items={[
        { label: "2026", range: crecimiento.proyeccion2026 },
        { label: "2027", range: crecimiento.proyeccion2027 },
        { label: "2028", range: crecimiento.proyeccion2028 },
      ]}
    />
    <Reveal delay={80}>
      <div
        style={{
          borderTop: `3px solid ${colors.navy}`,
          paddingTop: 16,
          fontSize: 29,
          lineHeight: 1.4,
          color: colors.ink,
          fontFamily: fonts.sans,
        }}
      >
        <b style={{ color: colors.navy }}>Riesgos:</b> la producción minera, la guerra en Medio Oriente y tasas de
        interés globales más altas.
      </div>
    </Reveal>
  </SceneFrame>
);
