import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../../components/SceneShell";
import { GlowBars, GlowLine } from "../../../components/charts";
import { clamp, Pop, useEase, useSpring } from "../../../components/motion";
import { useCue } from "../../../components/narracion";
import { Counter, fmt, fmtSigned, Glass, GradientText, Label, Pill } from "../../../components/ui";
import { colors, fonts, gradients } from "../../../theme";
import { crecimiento, empleo, fiscal, inflacion, mineria, reconstruccion, tasa } from "../data";

const Title: React.FC<{ at?: number; gradient: string; children: React.ReactNode; sub?: string }> = ({
  at = 6,
  gradient,
  children,
  sub,
}) => (
  <div style={{ marginBottom: 18 }}>
    <Pop at={at} from="zoom" style={{ transformOrigin: "left center" }}>
      <div style={{ fontFamily: fonts.serif, fontStyle: "italic", fontSize: 124, lineHeight: 1, letterSpacing: -2 }}>
        <GradientText gradient={gradient}>{children}</GradientText>
      </div>
    </Pop>
    {sub ? (
      <Pop at={at + 6}>
        <Label style={{ marginTop: 10 }}>{sub}</Label>
      </Pop>
    ) : null}
  </div>
);

const Arrow: React.FC<{ up: boolean; color: string; size?: number }> = ({ up, color, size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ filter: `drop-shadow(0 0 14px ${color})` }}>
    <path
      d={up ? "M12 3 L20 12 H15 V21 H9 V12 H4 Z" : "M12 21 L20 12 H15 V3 H9 V12 H4 Z"}
      fill={color}
    />
  </svg>
);

// 01 · Crecimiento
export const Crecimiento: React.FC = () => {
  const cDef = useCue("definicion");
  const cBarras = useCue("barras");
  const cProy = useCue("proyeccion");
  return (
    <SceneShell entrada="rise" step={{ n: 1, title: "Crecimiento", color: colors.cyan }} source={crecimiento.fuente}>
      <Pop at={cDef}>
        <Glass style={{ display: "flex", alignItems: "center", gap: 28 }} glow="rgba(59,130,246,0.35)">
          <div style={{ fontSize: 110, fontWeight: 900, letterSpacing: -4 }}>
            <GradientText gradient={gradients.cool}>PIB</GradientText>
          </div>
          <div style={{ fontFamily: fonts.serif, fontStyle: "italic", fontSize: 50, lineHeight: 1.05, color: colors.text }}>
            = todo lo que produce un país en un año
          </div>
        </Glass>
      </Pop>
      <Pop at={cBarras - 4}>
        <Label style={{ marginTop: 44, marginBottom: 6 }}>Crecimiento anual del PIB</Label>
      </Pop>
      <GlowBars
        width={900}
        height={540}
        max={3.2}
        items={[
          ...crecimiento.historico.map((d, i) => ({ label: d.label, value: d.value, tone: "cool" as const, at: cBarras + i * 6 })),
          { label: "2026 proy.", range: crecimiento.proyeccion2026, tone: "warm" as const, at: cProy + 6 },
        ]}
      />
    </SceneShell>
  );
};

// Barras horizontales que nacen desde el cero: negativas a la izquierda, positivas a la derecha.
const Diverging: React.FC<{ at: number; rows: { label: string; value: number; strong?: boolean }[] }> = ({ at, rows }) => {
  const half = 270;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {rows.map((r, i) => (
        <DivergingRow key={r.label} at={at + i * 6} half={half} {...r} />
      ))}
    </div>
  );
};

const DivergingRow: React.FC<{ at: number; half: number; label: string; value: number; strong?: boolean }> = ({
  at,
  half,
  label,
  value,
  strong,
}) => {
  const p = useSpring(at, { damping: 15 });
  const w = (Math.abs(value) / 18) * half * p;
  const neg = value < 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: Math.min(1, p * 2) }}>
      <div style={{ width: 250, fontSize: 30, fontWeight: strong ? 800 : 600, color: strong ? colors.text : colors.dim }}>{label}</div>
      <div style={{ position: "relative", width: half * 2, height: 46 }}>
        <div style={{ position: "absolute", left: half - 1, top: -8, bottom: -8, width: 2, background: colors.line }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            height: 46,
            width: w,
            left: neg ? half - w : half,
            borderRadius: 12,
            background: neg ? gradients.warm : gradients.cool,
            boxShadow: `0 0 30px ${neg ? "rgba(255,77,141,0.5)" : "rgba(34,211,238,0.5)"}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 2,
            fontSize: 34,
            fontWeight: 900,
            color: neg ? colors.pink : colors.cyan,
            ...(neg ? { right: half + w + 12 } : { left: half + w + 12 }),
          }}
        >
          {fmtSigned(value)}%
        </div>
      </div>
    </div>
  );
};

// 02 · El cobre
export const Cobre: React.FC = () => {
  const cEc = useCue("ecuacion");
  const cPrecio = useCue("precio");
  const cCant = useCue("cantidad");
  const cTotal = useCue("total");
  const term = (label: string, at: number) => (
    <Pop at={at} from="zoom" style={{ flex: 1 }}>
      <Glass style={{ textAlign: "center", padding: "22px 10px", fontSize: 60, fontWeight: 900, letterSpacing: -2 }}>{label}</Glass>
    </Pop>
  );
  return (
    <SceneShell entrada="slide" step={{ n: 2, title: "La paradoja del cobre", color: colors.gold }} source={mineria.fuente}>
      <Title gradient={gradients.gold}>El cobre</Title>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {term("Precio", cEc + 2)}
        <Pop at={cEc + 8} from="zoom">
          <div style={{ fontSize: 80, fontWeight: 300, color: colors.dim }}>×</div>
        </Pop>
        {term("Cantidad", cEc + 12)}
      </div>
      <div style={{ display: "flex", gap: 18, marginTop: 22 }}>
        <Pop at={cPrecio + 2} style={{ flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Arrow up color={colors.cyan} />
            <div style={{ fontSize: 76, fontWeight: 900, letterSpacing: -3 }}>
              <GradientText gradient={gradients.cool}>US${fmt(mineria.cobreRecord, 2)}</GradientText>
            </div>
            <div style={{ fontSize: 28, color: colors.dim }}>récord por libra</div>
          </div>
        </Pop>
        <Pop at={cCant + 8} style={{ flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Arrow up={false} color={colors.pink} />
            <div style={{ fontSize: 76, fontWeight: 900, letterSpacing: -3 }}>
              <GradientText gradient={gradients.warm}>{fmtSigned(mineria.imacecMinero)}%</GradientText>
            </div>
            <div style={{ fontSize: 28, color: colors.dim }}>producción minera, agosto</div>
          </div>
        </Pop>
      </div>
      <Pop at={cTotal} style={{ marginTop: 34 }}>
        <Glass style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Label>Imacec agosto 2026 · variación anual</Label>
          <Diverging
            at={cTotal + 6}
            rows={[
              { label: "Minería", value: mineria.imacecMinero },
              { label: "Resto", value: mineria.imacecNoMinero },
              { label: "Economía total", value: mineria.imacec, strong: true },
            ]}
          />
        </Glass>
      </Pop>
    </SceneShell>
  );
};

// 03 · Inflación
export const Inflacion: React.FC = () => {
  const frame = useCurrentFrame();
  const cMeta = useCue("meta");
  const cLinea = useCue("linea");
  const cGuerra = useCue("guerra");
  const cHoy = useCue("hoy");
  const reached = interpolate(
    frame,
    [cLinea, cGuerra, cGuerra + 14, cHoy - 4, cHoy + 16],
    [0, 3, 4, 7, inflacion.serie.length - 1],
    clamp,
  );
  const meta = useEase(cMeta + 6, 16);
  const war = interpolate(frame, [cGuerra, cGuerra + 12], [0, 1], clamp);
  return (
    <SceneShell entrada="tilt" step={{ n: 3, title: "Inflación", color: colors.pink }} source={inflacion.fuente}>
      <Title gradient={gradients.warm} sub="IPC · variación en 12 meses">
        Los precios
      </Title>
      <GlowLine
        data={inflacion.serie}
        yMin={1.4}
        yMax={4.9}
        reached={reached}
        width={900}
        height={680}
        tone="warm"
        band={{ min: inflacion.rango.min, max: inflacion.rango.max, label: "Rango meta 2%–4%", opacity: meta }}
        target={{ value: inflacion.meta, label: "Meta 3%", opacity: meta }}
        annotation={{ index: 4, lines: ["Guerra en Medio Oriente:", "suben los combustibles"], opacity: war }}
      />
    </SceneShell>
  );
};

// La balanza del Banco Central: bajar la tasa o esperar.
const Seesaw: React.FC<{ cBajar: number; cEsperar: number }> = ({ cBajar, cEsperar }) => {
  const s1 = useSpring(cBajar + 8, { damping: 10 });
  const s2 = useSpring(cEsperar + 8, { damping: 10 });
  const s3 = useSpring(cEsperar + 26, { damping: 12 });
  const angle = -11 * s1 + 22 * s2 - 11 * s3;
  const W = 900;
  const cx = W / 2;
  const cy = 380;
  const r = 290;
  const rad = (angle * Math.PI) / 180;
  const left = { x: cx - r * Math.cos(rad), y: cy - r * Math.sin(rad) };
  const right = { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };

  const card = (at: number, pos: { x: number; y: number }, title: string, text: string, gradient: string, glow: string) => (
    <div style={{ position: "absolute", left: pos.x - 150, top: pos.y - 222, width: 300 }}>
      <Pop at={at} from="down" distance={260}>
        <Glass glow={glow} style={{ padding: "22px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 46, fontWeight: 900, letterSpacing: -1 }}>
            <GradientText gradient={gradient}>{title}</GradientText>
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.25, color: colors.dim, marginTop: 6 }}>{text}</div>
        </Glass>
      </Pop>
    </div>
  );

  return (
    <div style={{ position: "relative", width: W, height: 500 }}>
      <svg width={W} height={500} style={{ position: "absolute", overflow: "visible" }}>
        <defs>
          <linearGradient id="viga" x1="0" x2="1">
            <stop offset="0%" stopColor={colors.cyan} />
            <stop offset="50%" stopColor={colors.violet} />
            <stop offset="100%" stopColor={colors.pink} />
          </linearGradient>
        </defs>
        <path d={`M${cx} ${cy + 6} L${cx - 70} ${cy + 120} L${cx + 70} ${cy + 120} Z`} fill={colors.glassStrong} stroke={colors.line} strokeWidth={2} />
        <g transform={`rotate(${angle} ${cx} ${cy})`}>
          <rect x={cx - r - 60} y={cy - 10} width={2 * r + 120} height={20} rx={10} fill="url(#viga)" />
        </g>
        <circle cx={cx} cy={cy} r={16} fill={colors.text} />
      </svg>
      {card(cBajar, left, "Bajar", "La economía está débil", gradients.cool, "rgba(34,211,238,0.35)")}
      {card(cEsperar, right, "Esperar", `La inflación va en ${fmt(4.1)}%`, gradients.warm, "rgba(255,77,141,0.35)")}
    </div>
  );
};

// 04 · Tasa de política monetaria
export const Tasa: React.FC = () => {
  const cBajar = useCue("bajar");
  const cEsperar = useCue("esperar");
  const cQuieta = useCue("quieta");
  return (
    <SceneShell entrada="zoom" step={{ n: 4, title: "Tasa de interés", color: colors.violet }} source={tasa.fuente}>
      <Title gradient={gradients.brand} sub="Tasa de política monetaria · el «precio del dinero»">
        El dilema
      </Title>
      <div style={{ height: 230, display: "flex", alignItems: "center", gap: 26 }}>
        <Pop at={cQuieta + 2} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ fontSize: 180, fontWeight: 900, letterSpacing: -8, lineHeight: 1 }}>
            <GradientText gradient={gradients.brand}>
              <Counter to={tasa.tpm} from={0} at={cQuieta + 2} duration={26} suffix="%" />
            </GradientText>
          </div>
        </Pop>
        <Pop at={cQuieta + 10}>
          <Pill dot={colors.violet} style={{ fontSize: 26, whiteSpace: "nowrap" }}>
            Sin cambios desde {tasa.desde}
          </Pill>
        </Pop>
      </div>
      <Seesaw cBajar={cBajar} cEsperar={cEsperar} />
    </SceneShell>
  );
};

const Person: React.FC<{ lit: number; alert: number }> = ({ lit, alert }) => {
  const fill = alert > 0.5 ? "url(#persona-alerta)" : colors.text;
  return (
    <svg width={74} height={130} viewBox="0 0 74 130" style={{ opacity: 0.25 + 0.75 * lit, overflow: "visible" }}>
      <defs>
        <linearGradient id="persona-alerta" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.orange} />
          <stop offset="100%" stopColor={colors.pink} />
        </linearGradient>
      </defs>
      <g style={{ filter: alert > 0.5 ? `drop-shadow(0 0 18px ${colors.pink})` : undefined }} transform={`translate(37 65) scale(${1 + alert * 0.18}) translate(-37 -65)`}>
        <circle cx={37} cy={24} r={20} fill={fill} />
        <path d="M6 126 V82 Q6 52 37 52 Q68 52 68 82 V126 Z" fill={fill} />
      </g>
    </svg>
  );
};

const People: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", justifyContent: "space-between", width: 900 }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Person
          key={i}
          lit={interpolate(frame, [at + i * 3, at + i * 3 + 8], [0, 1], clamp)}
          alert={i === 9 ? interpolate(frame, [at + 40, at + 50], [0, 1], clamp) : 0}
        />
      ))}
    </div>
  );
};

// 05 · Empleo
export const Empleo: React.FC = () => {
  const frame = useCurrentFrame();
  const cTasa = useCue("tasa");
  const cPersonas = useCue("personas");
  const reached = interpolate(frame, [cTasa + 10, cTasa + 50], [0, empleo.serie.length - 1], clamp);
  return (
    <SceneShell entrada="rise" step={{ n: 5, title: "Empleo", color: colors.orange }} source={empleo.fuente}>
      <Title gradient={gradients.warm} sub="Tasa de desocupación">
        El empleo
      </Title>
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <Pop at={cTasa} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ fontSize: 190, fontWeight: 900, letterSpacing: -8, lineHeight: 1 }}>
            <GradientText gradient={gradients.warm}>
              <Counter to={empleo.serie[empleo.serie.length - 1].value} from={7} at={cTasa} duration={30} suffix="%" />
            </GradientText>
          </div>
        </Pop>
        <Pop at={cTasa + 12}>
          <Pill dot={colors.orange} style={{ fontSize: 26, whiteSpace: "nowrap" }}>
            +{fmt(empleo.alzaDoceMeses)} pp en un año
          </Pill>
        </Pop>
      </div>
      <GlowLine data={empleo.serie} yMin={8.5} yMax={9.9} reached={reached} width={900} height={300} tone="warm" labelSize={22} />
      <Pop at={cPersonas} style={{ marginTop: 26 }}>
        <People at={cPersonas + 4} />
      </Pop>
    </SceneShell>
  );
};

const DebtGauge: React.FC<{ at: number }> = ({ at }) => {
  const p = useEase(at, 40);
  const W = 840;
  const max = 60;
  const fill = (fiscal.deuda2026 / max) * W * p;
  const mark = (fiscal.nivelPrudente / max) * W;
  return (
    <Glass style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Label>Deuda bruta del Gobierno Central · % del PIB, 2026</Label>
      <div style={{ position: "relative", width: W, height: 64, marginTop: 50 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 32, background: "rgba(255,255,255,0.08)" }} />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: fill,
            borderRadius: 32,
            background: gradients.cool,
            boxShadow: "0 0 40px rgba(59,130,246,0.6)",
          }}
        />
        <div style={{ position: "absolute", left: Math.max(16, fill - 190), top: 8, fontSize: 42, fontWeight: 900, color: colors.bg, opacity: p }}>
          {fmt(fiscal.deuda2026 * p)}%
        </div>
        <div style={{ position: "absolute", left: mark - 3, top: -18, bottom: -18, width: 6, borderRadius: 3, background: colors.pink, boxShadow: `0 0 18px ${colors.pink}` }} />
        <div style={{ position: "absolute", left: mark - 150, top: -60, width: 300, textAlign: "center", fontSize: 26, fontWeight: 800, color: colors.pink }}>
          Límite prudente {fiscal.nivelPrudente}%
        </div>
      </div>
    </Glass>
  );
};

// 06 · Cuentas fiscales
export const Fiscal: React.FC = () => {
  const cDef = useCue("deficit");
  const cDeuda = useCue("deuda");
  return (
    <SceneShell entrada="slide" step={{ n: 6, title: "Cuentas fiscales", color: colors.blue }} source={fiscal.fuente}>
      <Title gradient={gradients.cool} sub="Déficit fiscal efectivo · % del PIB">
        El Estado
      </Title>
      <GlowBars
        width={900}
        height={420}
        max={3.2}
        items={[
          { label: "2025", value: fiscal.deficit2025, tone: "warm", at: cDef + 4 },
          { label: "2026 proy.", value: fiscal.deficit2026, tone: "cool", at: cDef + 30 },
        ]}
      />
      <Pop at={cDeuda} style={{ marginTop: 30 }}>
        <DebtGauge at={cDeuda + 6} />
      </Pop>
    </SceneShell>
  );
};

// 07 · Lo que viene
export const Futuro: React.FC = () => {
  const cApuesta = useCue("apuesta");
  const cLey = useCue("ley");
  const cRebote = useCue("rebote");
  const check = (text: string, at: number) => (
    <Pop at={at} from="right">
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, color: colors.text }}>
        <span style={{ width: 16, height: 16, borderRadius: 8, background: gradients.gold, boxShadow: `0 0 14px ${colors.gold}` }} />
        {text}
      </div>
    </Pop>
  );
  return (
    <SceneShell entrada="tilt" step={{ n: 7, title: "Lo que viene", color: colors.gold }} source={reconstruccion.fuente}>
      <Title at={cApuesta} gradient={gradients.gold} sub="La apuesta: la inversión">
        Lo que viene
      </Title>
      <Pop at={cLey}>
        <Glass glow="rgba(255,193,94,0.25)" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>Ley de Reconstrucción Nacional</div>
          {check("Agiliza proyectos de inversión", cLey + 8)}
          {check(`Impuesto a empresas: ${reconstruccion.impuestoDesde}% → ${reconstruccion.impuestoHasta}%, gradual`, cLey + 14)}
        </Glass>
      </Pop>
      <Pop at={cRebote - 2}>
        <Label style={{ marginTop: 34 }}>Crecimiento proyectado del PIB</Label>
      </Pop>
      <GlowBars
        width={900}
        height={430}
        max={3.6}
        items={[
          { label: "2026", range: crecimiento.proyeccion2026, tone: "warm", at: cRebote + 2 },
          { label: "2027", range: crecimiento.proyeccion2027, tone: "cool", at: cRebote + 12 },
          { label: "2028", range: crecimiento.proyeccion2028, tone: "cool", at: cRebote + 22 },
        ]}
      />
    </SceneShell>
  );
};

