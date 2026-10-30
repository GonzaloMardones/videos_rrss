import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { GlowBars } from "../../components/charts";
import { clamp, Pop, useEase, useSpring, WordsIn } from "../../components/motion";
import { useCue, useCueAt } from "../../components/narracion";
import { Counter, fmt, fmtAuto, Glass, GradientText, Note } from "../../components/ui";
import { Icon, IconGradients, Title } from "../../components/comun";
import { Barril, Billetera, Edificio, Escudo, Flecha, Moneda, paletas, RelojArena, Surtidor } from "../../components/iconos";
import { colors, fonts, gradients } from "../../theme";
import { abril, autonomia, herramienta, inflacion, turquia } from "./data";

const big: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 800, letterSpacing: -5, lineHeight: 1 };

const Float: React.FC<{ children: React.ReactNode; amp?: number; phase?: number }> = ({ children, amp = 10, phase = 0 }) => {
  const frame = useCurrentFrame();
  return <div style={{ transform: `translateY(${Math.sin(frame * 0.06 + phase) * amp}px)` }}>{children}</div>;
};

const Etiq: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = colors.dim }) => (
  <div style={{ fontFamily: fonts.display, fontSize: 34, fontWeight: 700, color, textAlign: "center" }}>{children}</div>
);

// Gancho: Hacienda apunta al Banco Central.
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const cQuiroz = useCue("quiroz");
  const cApunta = useCueAt("quiroz", 0.55);
  const cNumeros = useCue("numeros");
  const flecha = useEase(cApunta, 18);
  const zoom = useSpring(cNumeros, { damping: 14 });
  return (
    <SceneShell entrada="none">
      <div style={{ position: "relative", flex: 1 }}>
        <Pop at={cQuiroz} from="zoom" style={{ position: "absolute", top: 20, left: 0, right: 0, textAlign: "center" }}>
          <div style={{ ...big, fontSize: 230 * (1 + 0.15 * zoom) }}>
            <GradientText gradient={gradients.warm}>
              <Counter to={inflacion.hoy} from={0} at={cQuiroz} duration={30} suffix="%" />
            </GradientText>
          </div>
          <Note style={{ fontSize: 36 }}>inflación en 12 meses</Note>
        </Pop>
        <div style={{ position: "absolute", top: 470, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Pop at={cQuiroz + 10} from="left">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <Edificio size={220} paleta={paletas.calido} />
              <Etiq>Hacienda</Etiq>
            </div>
          </Pop>
          <div style={{ flex: 1, position: "relative", height: 40, margin: "0 10px", marginBottom: 60 }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 16,
                height: 8,
                width: `${flecha * 100}%`,
                borderRadius: 4,
                background: gradients.warm,
                boxShadow: "0 0 24px rgba(255,77,141,0.6)",
              }}
            />
            <div style={{ position: "absolute", left: `calc(${flecha * 100}% - 18px)`, top: -2, opacity: flecha, transform: "rotate(90deg)" }}>
              <Flecha up color={colors.pink} size={44} />
            </div>
          </div>
          <Pop at={cQuiroz + 16} from="right">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, transform: `rotate(${frame > cApunta + 14 && frame < cApunta + 26 ? Math.sin(frame * 2) * 3 : 0}deg)` }}>
              <Edificio size={220} paleta={paletas.frio} />
              <Etiq>Banco Central</Etiq>
            </div>
          </Pop>
        </div>
      </div>
    </SceneShell>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ serie, autor }) => (
  <SceneShell entrada="zoom">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
      <Pop at={2}>
        <div style={{ fontFamily: fonts.display, fontSize: 40, fontWeight: 600, color: colors.dim }}>{serie} · Capítulo 3</div>
      </Pop>
      <div style={{ ...big, letterSpacing: -6, lineHeight: 0.98 }}>
        <WordsIn at={4} stagger={3} text="¿Quién tiene" style={{ fontSize: 140, display: "block" }} />
        <WordsIn at={10} stagger={3} text="la culpa de" style={{ fontSize: 140, display: "block" }} />
        <Pop at={16} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ fontSize: 170, letterSpacing: -8 }}>
            <GradientText gradient={gradients.warm}>la inflación?</GradientText>
          </div>
        </Pop>
      </div>
      <Pop at={24}>
        <Note style={{ fontSize: 30, marginTop: 20 }}>por {autor}</Note>
      </Pop>
    </div>
  </SceneShell>
);

// La meta: una diana con el 3% al centro y el dardo cayendo en 4,1%.
const Diana: React.FC<{ cMeta: number; cHoy: number }> = ({ cMeta, cHoy }) => {
  const anillos = useSpring(cMeta, { damping: 16 });
  const dardo = useEase(cHoy + 4, 14);
  const impacto = useSpring(cHoy + 18, { damping: 10 });
  const cx = 300;
  const cy = 300;
  const hitX = cx + 150;
  const hitY = cy - 95;
  const dx = interpolate(dardo, [0, 1], [hitX + 320, hitX]);
  const dy = interpolate(dardo, [0, 1], [hitY - 220, hitY]);
  return (
    <svg width={600} height={600} style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="diana-c">
          <stop offset="0%" stopColor={colors.cyan} />
          <stop offset="100%" stopColor={colors.violet} />
        </radialGradient>
      </defs>
      {[260, 200, 140, 80].map((r, i) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r * anillos}
          fill={i % 2 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.10)"}
          stroke={colors.line}
          strokeWidth={2}
        />
      ))}
      <circle cx={cx} cy={cy} r={60 * anillos} fill="url(#diana-c)" />
      <text x={cx} y={cy + 20} textAnchor="middle" fontSize={56} fontWeight={800} fill={colors.bg} fontFamily="'Bricolage Grotesque', sans-serif" opacity={anillos}>
        3%
      </text>
      <g opacity={dardo > 0 ? 1 : 0}>
        <line x1={dx} y1={dy} x2={dx + 90} y2={dy - 62} stroke={colors.pink} strokeWidth={8} strokeLinecap="round" />
        <path d={`M${dx + 80} ${dy - 72} l26 -6 l-6 26 Z`} fill={colors.orange} />
        <circle cx={dx} cy={dy} r={9} fill={colors.pink} />
      </g>
      <g opacity={impacto} transform={`translate(${hitX + 10} ${hitY + 70}) scale(${0.6 + 0.4 * impacto})`}>
        <text textAnchor="middle" fontSize={76} fontWeight={800} fill={colors.pink} fontFamily="'Bricolage Grotesque', sans-serif">
          {fmt(inflacion.hoy)}%
        </text>
      </g>
    </svg>
  );
};

export const Mandato: React.FC = () => {
  const cFormal = useCue("formal");
  const cMeta = useCue("meta");
  const cHoy = useCue("hoy");
  return (
    <SceneShell entrada="rise" source={inflacion.fuente}>
      <Title at={cFormal} gradient={gradients.cool} size={104} sub="El mandato del Banco Central">
        La meta: 3%
      </Title>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Diana cMeta={cMeta} cHoy={cHoy} />
      </div>
    </SceneShell>
  );
};

// Barra horizontal con la línea de la meta.
const Barra: React.FC<{ at: number; label: string; min: number; max?: number; gradient: string; icono: React.ReactNode }> = ({
  at,
  label,
  min,
  max,
  gradient,
  icono,
}) => {
  const p = useSpring(at, { damping: 16 });
  const W = 640;
  const escala = 5;
  const wMin = (min / escala) * W * p;
  const wMax = ((max ?? min) / escala) * W * p;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: Math.min(1, p * 2) }}>
      <div style={{ width: 120, display: "flex", justifyContent: "center" }}>{icono}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: colors.dim }}>{label}</div>
        <div style={{ position: "relative", width: W, height: 70 }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: 70, width: wMin, borderRadius: 18, background: gradient }} />
          {max ? (
            <div
              style={{
                position: "absolute",
                left: wMin,
                top: 0,
                height: 70,
                width: wMax - wMin,
                borderRadius: "0 18px 18px 0",
                background: gradient,
                opacity: 0.45,
              }}
            />
          ) : null}
          <div style={{ position: "absolute", left: wMax + 16, top: 10, fontFamily: fonts.display, fontSize: 44, fontWeight: 800, whiteSpace: "nowrap" }}>
            {max ? `${fmtAuto(min)}–${fmtAuto(max)}%` : `${fmt(min)}%`}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Volatiles: React.FC = () => {
  const cDonde = useCue("donde");
  const cSin = useCueAt("sinvolatiles", 0.45);
  const cComb = useCue("combustibles");
  const meta = useEase(cDonde + 10, 14);
  const W = 640;
  return (
    <SceneShell entrada="slide" source={inflacion.fuente}>
      <IconGradients />
      <Title at={cDonde} gradient={gradients.warm} size={104}>
        ¿De dónde viene?
      </Title>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 40, marginTop: 90 }}>
        <div
          style={{
            position: "absolute",
            left: 140 + (inflacion.meta / 5) * W,
            top: -20,
            bottom: -20,
            width: 4,
            borderRadius: 2,
            background: colors.text,
            opacity: 0.7 * meta,
          }}
        />
        <div style={{ position: "absolute", left: 140 + (inflacion.meta / 5) * W - 60, top: -64, width: 120, textAlign: "center", fontSize: 28, fontWeight: 800, opacity: meta }}>
          meta 3%
        </div>
        <Barra at={cDonde + 12} label="Inflación total" min={inflacion.hoy} gradient={gradients.warm} icono={<Surtidor size={100} />} />
        <Barra
          at={cSin}
          label="Sin precios volátiles"
          min={inflacion.sinVolatiles.min}
          max={inflacion.sinVolatiles.max}
          gradient={gradients.cool}
          icono={<Icon name="diana" gradientId="ico-cool" size={90} />}
        />
      </div>
      <Pop at={cComb} from="zoom" style={{ marginTop: 70, display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
        <Float>
          <Surtidor size={250} />
        </Float>
        <div style={{ ...big, fontSize: 92, letterSpacing: -3 }}>
          <GradientText gradient={gradients.warm}>
            el
            <br />
            problema
          </GradientText>
        </div>
      </Pop>
    </SceneShell>
  );
};

export const Abril: React.FC = () => {
  const cAbril = useCue("abril");
  const cTres = useCue("tresCuartos");
  const cGuerra = useCue("guerra");
  const cMepco = useCue("mepco");
  const split = useEase(cTres + 6, 30);
  const comb = Math.round((abril.incidenciaCombustibles / abril.mensual) * 100);
  return (
    <SceneShell entrada="tilt" source={abril.fuente}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
        <Pop at={cAbril} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ ...big, fontSize: 190 }}>
            <GradientText gradient={gradients.warm}>
              +<Counter to={abril.mensual} at={cAbril} duration={26} suffix="%" />
            </GradientText>
          </div>
        </Pop>
        <Pop at={cAbril + 10}>
          <Note style={{ fontSize: 36 }}>en un solo mes</Note>
        </Pop>
      </div>
      <Pop at={cTres} style={{ marginTop: 26 }}>
        <div style={{ display: "flex", width: 900, height: 110, borderRadius: 28, overflow: "hidden", gap: 4 }}>
          <div
            style={{
              width: `${comb * split + 50 * (1 - split)}%`,
              background: gradients.warm,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              fontFamily: fonts.display,
              fontSize: 40,
              fontWeight: 800,
              color: colors.bg,
            }}
          >
            <Surtidor size={70} paleta={paletas.blanco} /> {Math.round(comb * split)}%
          </div>
          <div style={{ flex: 1, background: "rgba(139,92,246,0.55)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 700 }}>
            resto
          </div>
        </div>
      </Pop>
      <div style={{ display: "flex", gap: 22, marginTop: 44 }}>
        <Pop at={cGuerra + 4} from="up" style={{ flex: 1 }}>
          <Glass style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "30px 20px" }}>
            <Float>
              <Barril size={170} />
            </Float>
            <Etiq color={colors.text}>Guerra en Medio Oriente</Etiq>
          </Glass>
        </Pop>
        <Pop at={cMepco + 4} from="up" style={{ flex: 1 }}>
          <Glass style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "30px 20px" }}>
            <Edificio size={170} paleta={paletas.calido} />
            <Etiq color={colors.text}>Cambio al Mepco</Etiq>
            <div style={{ fontSize: 28, color: colors.dim, textAlign: "center", lineHeight: 1.3 }}>
              bencina +${abril.mepcoBencina} · diésel +${abril.mepcoDiesel}
            </div>
          </Glass>
        </Pop>
      </div>
    </SceneShell>
  );
};

export const Herramienta: React.FC = () => {
  const frame = useCurrentFrame();
  const cTasa = useCue("tasa");
  const cRezago = useCue("rezago");
  const cReloj = useCueAt("rezago", 0.6);
  const cCosto = useCue("costo");
  const cruz = interpolate(frame, [cRezago + 20, cRezago + 30], [0, 1], clamp);
  const giro = interpolate(frame, [cReloj, cReloj + 40], [0, 180], clamp);
  const chip = (at: number, valor: string, texto: string) => (
    <Pop at={at} from="up" style={{ flex: 1 }}>
      <Glass style={{ textAlign: "center", padding: "24px 14px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Flecha up={false} color={colors.pink} size={56} />
        </div>
        <div style={{ ...big, fontSize: 60, letterSpacing: -2, marginTop: 6 }}>
          <GradientText gradient={gradients.warm}>{valor}</GradientText>
        </div>
        <div style={{ fontSize: 28, color: colors.dim, marginTop: 6 }}>{texto}</div>
      </Glass>
    </Pop>
  );
  return (
    <SceneShell entrada="zoom" source={herramienta.fuente}>
      <IconGradients />
      <Title at={cTasa} gradient={gradients.brand} size={104}>
        Su herramienta
      </Title>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
        <Pop at={cTasa + 8} from="zoom">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Icon name="perilla" gradientId="ico-cool" size={170} />
            <Etiq color={colors.text}>tasa {fmt(herramienta.tpm)}%</Etiq>
          </div>
        </Pop>
        <Pop at={cRezago} style={{ position: "relative", width: 220, height: 60 }}>
          <div style={{ position: "absolute", top: 26, left: 0, right: 0, borderTop: `6px dashed ${colors.faint}` }} />
          <div style={{ position: "absolute", left: 70, top: -40, ...big, fontSize: 110, color: colors.pink, opacity: cruz, transform: `scale(${0.5 + 0.5 * cruz})` }}>
            ×
          </div>
        </Pop>
        <Pop at={cRezago + 6} from="zoom">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Barril size={170} />
            <Etiq>petróleo</Etiq>
          </div>
        </Pop>
      </div>
      <Pop at={cReloj} style={{ marginTop: 34, display: "flex", alignItems: "center", justifyContent: "center", gap: 26 }}>
        <div style={{ transform: `rotate(${giro}deg)` }}>
          <RelojArena size={130} />
        </div>
        <div style={{ ...big, fontSize: 84, letterSpacing: -3 }}>
          <GradientText gradient={gradients.gold}>1 a 2 años</GradientText>
        </div>
      </Pop>
      <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
        {chip(cCosto + 6, `${fmtAuto(herramienta.crecimiento2026.min)}–${fmtAuto(herramienta.crecimiento2026.max)}%`, "crecimiento 2026")}
        {chip(cCosto + 16, `${fmt(herramienta.desempleo)}%`, "desempleo")}
      </div>
    </SceneShell>
  );
};

export const Autonomia: React.FC = () => {
  const cAuto = useCue("autonomo");
  const cAntes = useCueAt("antes", 0.55);
  const cDespues = useCue("despues");
  return (
    <SceneShell entrada="rise" source={autonomia.fuente}>
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <Pop at={cAuto} from="zoom">
          <Escudo size={170} />
        </Pop>
        <Title at={cAuto + 4} gradient={gradients.cool} size={100} sub="Autónomo desde 1989 · Ley 18.840">
          Autonomía
        </Title>
      </div>
      <Pop at={cAntes - 4}>
        <Note style={{ marginTop: 20 }}>Inflación promedio al año</Note>
      </Pop>
      <GlowBars
        width={900}
        height={640}
        max={60}
        items={[
          { label: "1940–1989", value: autonomia.antes, tone: "warm", at: cAntes },
          { label: "1999–2019", value: autonomia.despues, tone: "cool", at: cDespues + 4 },
        ]}
      />
    </SceneShell>
  );
};

export const Turquia: React.FC = () => {
  const frame = useCurrentFrame();
  const cPresion = useCue("presion");
  const cTurquia = useCue("turquia");
  const c85 = useCue("ochenta");
  const caida = interpolate(frame, [c85, c85 + 50], [0, 1], clamp);
  return (
    <SceneShell entrada="slide" source={turquia.fuente}>
      <Title at={cPresion} gradient={gradients.warm} size={104} sub="El caso de Turquía">
        ¿Y si presionan?
      </Title>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40, marginTop: 30 }}>
        <Pop at={cTurquia} from="left">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <Edificio size={190} paleta={paletas.calido} />
            <Etiq>gobierno</Etiq>
          </div>
        </Pop>
        <Pop at={cTurquia + 8} from="zoom">
          <Flecha up={false} color={colors.pink} size={110} />
        </Pop>
        <Pop at={cTurquia + 14} from="right">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <Icon name="perilla" gradientId="ico-warm" size={170} />
            <Etiq>baja la tasa</Etiq>
          </div>
        </Pop>
      </div>
      <IconGradients />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30, marginTop: 50 }}>
        <Pop at={c85} from="zoom">
          <div style={{ ...big, fontSize: 210, letterSpacing: -8 }}>
            <GradientText gradient={gradients.warm}>
              <Counter to={turquia.inflacion} from={0} at={c85} duration={40} decimals={1} suffix="%" />
            </GradientText>
          </div>
          <Note style={{ fontSize: 32, textAlign: "center" }}>inflación, octubre 2022</Note>
        </Pop>
        <div style={{ transform: `translateY(${caida * 120}px) rotate(${caida * 200}deg)`, opacity: frame >= c85 ? 1 - caida * 0.5 : 0 }}>
          <Moneda size={130} paleta={paletas.calido} />
        </div>
      </div>
    </SceneShell>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const frame = useCurrentFrame();
  const cCulpa = useCue("culpa");
  const cReparto = useCue("reparto");
  const cGuerra = useCueAt("reparto", 0.7);
  const cMepco = useCueAt("reparto", 0.9);
  const cCoord = useCue("coordinar");
  const cCta = useCue("cta");
  const link = useEase(cCoord + 6, 24);
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.18);
  const item = (at: number, ilus: React.ReactNode, texto: string) => (
    <Pop at={at} from="up" style={{ flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        {ilus}
        <Etiq>{texto}</Etiq>
      </div>
    </Pop>
  );
  return (
    <SceneShell entrada="zoom">
      <IconGradients />
      <Title at={cCulpa} gradient={gradients.brand} size={100}>
        ¿Quién tiene la culpa?
      </Title>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        {item(cReparto + 4, <Edificio size={140} paleta={paletas.frio} />, "la meta")}
        {item(cGuerra, <Barril size={140} />, "la guerra")}
        {item(cMepco, <Surtidor size={140} />, "el Mepco")}
      </div>
      <Pop at={cCoord} style={{ marginTop: 50 }}>
        <Glass glow={`rgba(139,92,246,${0.2 + 0.2 * pulse})`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "30px 34px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Billetera size={110} />
            <Etiq>Hacienda</Etiq>
          </div>
          <div style={{ flex: 1, height: 8, margin: "0 20px", position: "relative" }}>
            <div style={{ height: 8, width: `${link * 100}%`, borderRadius: 4, background: gradients.brand, boxShadow: `0 0 ${20 + 20 * pulse}px rgba(255,77,141,0.6)` }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Icon name="perilla" gradientId="ico-cool" size={110} />
            <Etiq>Banco Central</Etiq>
          </div>
        </Glass>
      </Pop>
      <Pop at={cCta} from="zoom" style={{ marginTop: 50 }}>
        <div
          style={{
            display: "inline-flex",
            padding: "24px 40px",
            borderRadius: 999,
            background: gradients.brand,
            color: colors.bg,
            fontFamily: fonts.display,
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: -1,
            whiteSpace: "nowrap",
            boxShadow: `0 0 ${50 + 40 * pulse}px rgba(255,77,141,${0.35 + 0.3 * pulse})`,
          }}
        >
          Compártelo · Sígueme →
        </div>
      </Pop>
      <Pop at={cCta + 8}>
        <Note style={{ fontSize: 30, marginTop: 18 }}>{autor}</Note>
      </Pop>
    </SceneShell>
  );
};
