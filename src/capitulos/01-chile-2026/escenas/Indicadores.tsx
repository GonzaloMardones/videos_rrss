import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../../components/SceneShell";
import { GlowBars, GlowLine } from "../../../components/charts";
import { clamp, Pop, useEase, useSpring } from "../../../components/motion";
import { useCue, useCueAt } from "../../../components/narracion";
import { Counter, fmt, fmtSigned, Glass, GradientText, Note } from "../../../components/ui";
import { colors, fonts, gradients } from "../../../theme";
import { crecimiento, empleo, fiscal, inflacion, mineria, tasa } from "../data";
import { Arrow, Title } from "../../../components/comun";

const num: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 800, letterSpacing: -4, lineHeight: 1 };

// Crecimiento
export const Crecimiento: React.FC = () => {
  const cDef = useCue("definicion");
  const cBarras = useCue("barras");
  const cProy = useCue("proyeccion");
  return (
    <SceneShell entrada="rise" source={crecimiento.fuente}>
      <Title at={cDef} gradient={gradients.cool} sub="Todo lo que produce el país en un año: el tamaño de la torta.">
        El PIB
      </Title>
      <Pop at={cBarras - 4}>
        <Note style={{ marginTop: 20 }}>Cuánto creció cada año</Note>
      </Pop>
      <GlowBars
        width={900}
        height={580}
        max={3.2}
        items={[
          ...crecimiento.historico.map((d, i) => ({ label: d.label, value: d.value, tone: "cool" as const, at: cBarras + i * 6 })),
          { label: "2026", range: crecimiento.proyeccion2026, tone: "warm" as const, at: cProy + 6 },
        ]}
      />
    </SceneShell>
  );
};

// Barras horizontales que nacen desde el cero: negativas a la izquierda, positivas a la derecha.
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
      <div style={{ width: 250, fontSize: 32, fontWeight: strong ? 800 : 600, color: strong ? colors.text : colors.dim }}>{label}</div>
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
            top: 0,
            fontFamily: fonts.display,
            fontSize: 36,
            fontWeight: 800,
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

// El cobre
export const Cobre: React.FC = () => {
  const cEc = useCue("ecuacion");
  const cPrecio = useCue("precio");
  const cCant = useCue("cantidad");
  const cTotal = useCue("total");
  const term = (label: string, at: number) => (
    <Pop at={at} from="zoom" style={{ flex: 1 }}>
      <Glass style={{ textAlign: "center", padding: "22px 10px", fontFamily: fonts.display, fontSize: 62, fontWeight: 800, letterSpacing: -2 }}>
        {label}
      </Glass>
    </Pop>
  );
  return (
    <SceneShell entrada="slide" source={mineria.fuente}>
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
            <div style={{ ...num, fontSize: 78 }}>
              <GradientText gradient={gradients.cool}>US${fmt(mineria.cobreRecord, 2)}</GradientText>
            </div>
            <Note style={{ fontSize: 28 }}>récord por libra</Note>
          </div>
        </Pop>
        <Pop at={cCant + 8} style={{ flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Arrow up={false} color={colors.pink} />
            <div style={{ ...num, fontSize: 78 }}>
              <GradientText gradient={gradients.warm}>{fmtSigned(mineria.imacecMinero)}%</GradientText>
            </div>
            <Note style={{ fontSize: 28 }}>producción minera, agosto</Note>
          </div>
        </Pop>
      </div>
      <Pop at={cTotal} style={{ marginTop: 34 }}>
        <Glass style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Note style={{ fontSize: 28 }}>Actividad de agosto vs. un año antes</Note>
          {[
            { label: "Minería", value: mineria.imacecMinero },
            { label: "Resto", value: mineria.imacecNoMinero },
            { label: "Economía total", value: mineria.imacec, strong: true },
          ].map((r, i) => (
            <DivergingRow key={r.label} at={cTotal + 6 + i * 6} half={270} {...r} />
          ))}
        </Glass>
      </Pop>
    </SceneShell>
  );
};

// Inflación
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
  const meta = useEase(useCueAt("meta", 0.75), 16);
  const war = interpolate(frame, [cGuerra, cGuerra + 12], [0, 1], clamp);
  return (
    <SceneShell entrada="tilt" source={inflacion.fuente}>
      <Title at={cMeta} gradient={gradients.warm} sub="Cuánto suben los precios en 12 meses.">
        La inflación
      </Title>
      <GlowLine
        data={inflacion.serie}
        yMin={1.4}
        yMax={4.9}
        reached={reached}
        width={900}
        height={660}
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
          <div style={{ fontFamily: fonts.display, fontSize: 50, fontWeight: 800, letterSpacing: -1 }}>
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

// Tasa de política monetaria
export const Tasa: React.FC = () => {
  const cBajar = useCue("bajar");
  const cEsperar = useCue("esperar");
  const cQuieta = useCue("quieta");
  return (
    <SceneShell entrada="zoom" source={tasa.fuente}>
      <Title at={cBajar} gradient={gradients.brand}>
        El dilema
      </Title>
      <div style={{ height: 230, display: "flex", alignItems: "center", gap: 28 }}>
        <Pop at={cQuieta + 2} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ ...num, fontSize: 200, letterSpacing: -8 }}>
            <GradientText gradient={gradients.brand}>
              <Counter to={tasa.tpm} from={0} at={cQuieta + 2} duration={26} suffix="%" />
            </GradientText>
          </div>
        </Pop>
        <Pop at={cQuieta + 10}>
          <Note style={{ width: 300 }}>sin cambios desde {tasa.desde}</Note>
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
      <g
        style={{ filter: alert > 0.5 ? `drop-shadow(0 0 18px ${colors.pink})` : undefined }}
        transform={`translate(37 65) scale(${1 + alert * 0.18}) translate(-37 -65)`}
      >
        <circle cx={37} cy={24} r={20} fill={fill} />
        <path d="M6 126 V82 Q6 52 37 52 Q68 52 68 82 V126 Z" fill={fill} />
      </g>
    </svg>
  );
};

// Empleo
export const Empleo: React.FC = () => {
  const frame = useCurrentFrame();
  const cTasa = useCue("tasa");
  const cPersonas = useCue("personas");
  const reached = interpolate(frame, [cTasa + 10, cTasa + 50], [0, empleo.serie.length - 1], clamp);
  return (
    <SceneShell entrada="rise" source={empleo.fuente}>
      <Title at={cTasa} gradient={gradients.warm} sub={`Desempleo, ${empleo.serie[empleo.serie.length - 1].label.toLowerCase()} 2026`}>
        El empleo
      </Title>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <Pop at={cTasa + 4} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ ...num, fontSize: 190, letterSpacing: -8 }}>
            <GradientText gradient={gradients.warm}>
              <Counter to={empleo.serie[empleo.serie.length - 1].value} from={7} at={cTasa + 4} duration={30} suffix="%" />
            </GradientText>
          </div>
        </Pop>
        <Pop at={cTasa + 16}>
          <Note style={{ width: 280 }}>+{fmt(empleo.alzaDoceMeses)} punto en un año</Note>
        </Pop>
      </div>
      <GlowLine data={empleo.serie} yMin={8.5} yMax={9.9} reached={reached} width={900} height={280} tone="warm" labelSize={22} />
      <Pop at={cPersonas} style={{ marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: 900 }}>
          {Array.from({ length: 10 }, (_, i) => (
            <Person
              key={i}
              lit={interpolate(frame, [cPersonas + 4 + i * 3, cPersonas + 12 + i * 3], [0, 1], clamp)}
              alert={i === 9 ? interpolate(frame, [cPersonas + 44, cPersonas + 54], [0, 1], clamp) : 0}
            />
          ))}
        </div>
      </Pop>
    </SceneShell>
  );
};

// Ingresos contra gastos: el déficit es la parte que falta y se cubre con deuda.
const DeficitDiagram: React.FC<{ at: number }> = ({ at }) => {
  const a = useEase(at, 22);
  const b = useEase(at + 14, 22);
  const gap = useEase(at + 34, 18);
  const W = 900;
  const ingresos = 0.78 * W;
  const row = (label: string, width: number, p: number, gradient: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <div style={{ width: 170, fontSize: 32, fontWeight: 700, color: colors.dim }}>{label}</div>
      <div style={{ height: 56, width: (width - 190) * p, borderRadius: 18, background: gradient }} />
    </div>
  );
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16 }}>
      {row("Recauda", ingresos, a, gradients.cool)}
      {row("Gasta", W, b, gradients.warm)}
      <div
        style={{
          position: "absolute",
          left: ingresos,
          top: -14,
          height: 154,
          width: W - ingresos - 10,
          border: `3px dashed ${colors.gold}`,
          borderRadius: 18,
          opacity: gap,
        }}
      />
      <div style={{ position: "absolute", left: ingresos - 30, top: 150, width: 260, textAlign: "center", opacity: gap }}>
        <div style={{ fontFamily: fonts.display, fontSize: 40, fontWeight: 800 }}>
          <GradientText gradient={gradients.gold}>Déficit</GradientText>
        </div>
        <div style={{ fontSize: 26, color: colors.dim }}>se paga con deuda</div>
      </div>
    </div>
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
      <Note style={{ fontSize: 28 }}>Deuda del Estado, % del PIB (2026)</Note>
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
        <div style={{ position: "absolute", left: Math.max(16, fill - 190), top: 6, fontFamily: fonts.display, fontSize: 44, fontWeight: 800, color: colors.bg, opacity: p }}>
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

// Cuentas fiscales
export const Fiscal: React.FC = () => {
  const cDef = useCue("definicion");
  const cDeficit = useCue("deficit");
  const cDeuda = useCue("deuda");
  return (
    <SceneShell entrada="slide" source={fiscal.fuente}>
      <Title at={cDef} gradient={gradients.cool}>
        El Estado
      </Title>
      <DeficitDiagram at={useCueAt("definicion", 0.25)} />
      <Pop at={cDeficit} style={{ marginTop: 130 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ ...num, fontSize: 104 }}>
            <GradientText gradient={gradients.warm}>{fmt(fiscal.deficit2025)}%</GradientText>
          </div>
          <Pop at={cDeficit + 8} from="right">
            <div style={{ fontSize: 70, color: colors.dim }}>→</div>
          </Pop>
          <Pop at={cDeficit + 14} from="right">
            <div style={{ ...num, fontSize: 104 }}>
              <GradientText gradient={gradients.cool}>{fmt(fiscal.deficit2026)}%</GradientText>
            </div>
          </Pop>
          <Note style={{ fontSize: 28, width: 210 }}>déficit, % del PIB (2025 → 2026)</Note>
        </div>
      </Pop>
      <Pop at={cDeuda} style={{ marginTop: 34 }}>
        <DebtGauge at={cDeuda + 6} />
      </Pop>
    </SceneShell>
  );
};
