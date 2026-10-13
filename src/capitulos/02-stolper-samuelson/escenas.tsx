import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { clamp, Pop, useEase, useSpring, WordsIn } from "../../components/motion";
import { useCue, useCueAt } from "../../components/narracion";
import { Counter, fmt, fmtSigned, Glass, GradientText, Note } from "../../components/ui";
import { Title } from "../../components/comun";
import { Billetera, Caja, Camion, Cerezas, Engranaje, Etiqueta, Flecha, Moneda, paletas, Pepita, Trabajador } from "../../components/iconos";
import { colors, fonts, gradients } from "../../theme";
import { modelo, cobreRecord, FUENTE_MODELO } from "./data";

const big: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 800, letterSpacing: -5, lineHeight: 1 };

// Flota suavemente, para que las ilustraciones nunca estén quietas.
const Float: React.FC<{ children: React.ReactNode; amp?: number; speed?: number; phase?: number }> = ({
  children,
  amp = 10,
  speed = 0.06,
  phase = 0,
}) => {
  const frame = useCurrentFrame();
  return <div style={{ transform: `translateY(${Math.sin(frame * speed + phase) * amp}px)` }}>{children}</div>;
};

// Gancho: el cobre en récord… ¿y tu sueldo?
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const cCobre = useCue("cobre");
  const cSueldo = useCue("sueldo");
  const sube = useSpring(cSueldo, { damping: 20 });
  return (
    <SceneShell entrada="none">
      <div style={{ position: "relative", flex: 1 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: interpolate(sube, [0, 1], [180, 0]), display: "flex", alignItems: "center", gap: 30 }}>
          <Pop at={cCobre} from="zoom">
            <Float>
              <Pepita size={230} />
            </Float>
          </Pop>
          <div>
            <Pop at={cCobre + 6} from="zoom" style={{ transformOrigin: "left center" }}>
              <div style={{ ...big, fontSize: 150 }}>
                <GradientText gradient={gradients.gold}>
                  <Counter to={cobreRecord} from={3} at={cCobre + 6} duration={36} decimals={2} prefix="US$" />
                </GradientText>
              </div>
            </Pop>
            <Pop at={cCobre + 14}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Flecha up color={colors.gold} size={54} />
                <Note style={{ fontSize: 38 }}>récord</Note>
              </div>
            </Pop>
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, display: "flex", alignItems: "center", gap: 30 }}>
          <Pop at={cSueldo + 4} from="zoom">
            <Float phase={2}>
              <Billetera size={230} />
            </Float>
          </Pop>
          <Pop at={cSueldo + 12} from="zoom">
            <div style={{ ...big, fontSize: 260, transform: `rotate(${Math.sin(frame * 0.15) * 6}deg)` }}>
              <GradientText gradient={gradients.warm}>¿?</GradientText>
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
        <div style={{ fontFamily: fonts.display, fontSize: 40, fontWeight: 600, color: colors.dim }}>{serie} · Capítulo 2</div>
      </Pop>
      <div style={{ ...big, letterSpacing: -6, lineHeight: 0.98 }}>
        <WordsIn at={4} stagger={3} text="¿Quién gana" style={{ fontSize: 140, display: "block" }} />
        <WordsIn at={10} stagger={3} text="cuando sube" style={{ fontSize: 140, display: "block" }} />
        <Pop at={16} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ fontSize: 190, letterSpacing: -8 }}>
            <GradientText gradient={gradients.gold}>el cobre?</GradientText>
          </div>
        </Pop>
      </div>
      <Pop at={24}>
        <Note style={{ fontSize: 30, marginTop: 20 }}>por {autor}</Note>
      </Pop>
    </div>
  </SceneShell>
);

// La idea: precio que sube → gana el ingrediente principal.
export const Idea: React.FC = () => {
  const frame = useCurrentFrame();
  const cNombre = useCue("nombre");
  const cRegla = useCue("regla");
  const cGana = useCueAt("regla", 0.45);
  const spin = frame * 1.4;
  return (
    <SceneShell entrada="rise">
      <Title at={cNombre} gradient={gradients.brand} size={110} sub="Teorema de 1941">
        Stolper–Samuelson
      </Title>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <Pop at={cRegla + 4} from="zoom">
            <Float>
              <Etiqueta size={250} texto="precio" />
            </Float>
          </Pop>
          <Pop at={cRegla + 10} from="zoom">
            <Flecha up color={colors.gold} size={110} />
          </Pop>
        </div>
        <Pop at={cGana} from="zoom">
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <div style={{ transform: `rotate(${spin}deg)` }}>
              <Engranaje size={200} />
            </div>
            <div style={{ ...big, fontSize: 96 }}>
              <GradientText gradient={gradients.cool}>gana su ingrediente</GradientText>
            </div>
          </div>
        </Pop>
      </div>
    </SceneShell>
  );
};

// Fila de íconos que aparecen uno a uno: la "receta" de un producto.
const Receta: React.FC<{ at: number; trabajo: number; capital: number }> = ({ at, trabajo, capital }) => {
  const items = [
    ...Array.from({ length: trabajo }, () => "t"),
    ...Array.from({ length: capital }, () => "c"),
  ];
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      {items.map((k, i) => (
        <Pop key={i} at={at + i * 4} from="zoom">
          {k === "t" ? <Trabajador size={92} /> : <Engranaje size={92} />}
        </Pop>
      ))}
    </div>
  );
};

// Las recetas: cobre = mucho capital; cerezas = mucho trabajo.
export const Recetas: React.FC = () => {
  const cCobre = useCue("cobre");
  const cCerezas = useCue("cerezas");
  const tarjeta = (at: number, ilus: React.ReactNode, nombre: string, receta: React.ReactNode, gradient: string) => (
    <Pop at={at} from="right" distance={140}>
      <Glass style={{ display: "flex", alignItems: "center", gap: 26, padding: "40px 28px" }}>
        <div style={{ width: 250, display: "flex", justifyContent: "center" }}>{ilus}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ ...big, fontSize: 70, letterSpacing: -2 }}>
            <GradientText gradient={gradient}>{nombre}</GradientText>
          </div>
          {receta}
        </div>
      </Glass>
    </Pop>
  );
  return (
    <SceneShell entrada="slide" source={FUENTE_MODELO}>
      <Title at={useCue("dos")} gradient={gradients.brand} size={100}>
        Dos recetas
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 20 }}>
        {tarjeta(cCobre, <Camion size={240} />, "Cobre", <Receta at={cCobre + 10} trabajo={modelo.cobre.trabajo} capital={modelo.cobre.capital} />, gradients.gold)}
        {tarjeta(
          cCerezas,
          <Float>
            <Cerezas size={190} />
          </Float>,
          "Cerezas",
          <Receta at={cCerezas + 10} trabajo={modelo.cerezas.trabajo} capital={modelo.cerezas.capital} />,
          gradients.warm,
        )}
      </div>
      <Pop at={cCerezas + 34} style={{ marginTop: 26, display: "flex", gap: 40, justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Trabajador size={56} />
          <Note style={{ fontSize: 30 }}>trabajo</Note>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Engranaje size={56} />
          <Note style={{ fontSize: 30 }}>capital</Note>
        </div>
      </Pop>
    </SceneShell>
  );
};

// Barra que crece desde el centro con un ícono a la izquierda.
const Efecto: React.FC<{ at: number; icono: React.ReactNode; valor: number; strong?: boolean }> = ({ at, icono, valor, strong }) => {
  const p = useSpring(at, { damping: 15 });
  const half = 300;
  const w = (Math.abs(valor) / 15) * half * p;
  const neg = valor < 0;
  const color = neg ? colors.pink : valor === 0 ? colors.dim : colors.cyan;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: Math.min(1, p * 2) }}>
      <div style={{ width: 120, display: "flex", justifyContent: "center" }}>{icono}</div>
      <div style={{ position: "relative", width: half * 2, height: 64 }}>
        <div style={{ position: "absolute", left: half - 1, top: -10, bottom: -10, width: 3, background: colors.line }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            height: 64,
            width: Math.max(w, valor === 0 ? 6 : 0),
            left: neg ? half - w : half,
            borderRadius: 16,
            background: neg ? gradients.warm : valor === 0 ? colors.glassStrong : gradients.cool,
            boxShadow: valor === 0 ? undefined : `0 0 34px ${neg ? "rgba(255,77,141,0.5)" : "rgba(34,211,238,0.5)"}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 4,
            fontFamily: fonts.display,
            fontSize: strong ? 50 : 44,
            fontWeight: 800,
            color,
            ...(neg ? { right: half + w + 14 } : { left: half + Math.max(w, 6) + 14 }),
          }}
        >
          {valor === 0 ? "0%" : `${fmtSigned(valor * Math.min(1, p), Number.isInteger(valor) ? 0 : 1)}%`}
        </div>
      </div>
    </div>
  );
};

// El experimento: el cobre sube 10%.
export const Experimento: React.FC = () => {
  const frame = useCurrentFrame();
  const cSube = useCue("sube");
  const cDemanda = useCue("demanda");
  const cCapital = useCue("capital");
  const cSalario = useCue("salario");
  const cMag = useCue("magnificacion");
  const spin = interpolate(frame, [cDemanda, cDemanda + 90], [0, 360], clamp);
  const r = modelo.resultado;
  return (
    <SceneShell entrada="tilt" source={FUENTE_MODELO}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, height: 250 }}>
        <Pop at={cSube} from="zoom">
          <Pepita size={180} />
        </Pop>
        <Pop at={cSube + 8} from="left">
          <Etiqueta size={230} texto={`+${fmt(r.precioCobre, 0)}%`} />
        </Pop>
        <Pop at={cDemanda} from="zoom">
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ transform: `rotate(${spin * (i % 2 ? -1 : 1)}deg)` }}>
                <Engranaje size={78} />
              </div>
            ))}
          </div>
        </Pop>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 30 }}>
        <Efecto at={cSube + 14} icono={<Pepita size={86} />} valor={r.precioCobre} />
        <Efecto at={cCapital + 4} icono={<Engranaje size={86} />} valor={r.capital} strong />
        <Efecto at={cSalario - 4} icono={<Cerezas size={86} />} valor={0} />
        <Efecto at={cSalario + 6} icono={<Trabajador size={86} />} valor={r.salario} strong />
      </div>
      <Pop at={cMag + 4} from="zoom" style={{ marginTop: 40 }}>
        <Glass glow="rgba(139,92,246,0.35)" style={{ textAlign: "center", padding: "22px 20px" }}>
          <div style={{ ...big, fontSize: 64, letterSpacing: -2 }}>
            <GradientText gradient={gradients.brand}>Efecto magnificación</GradientText>
          </div>
          <div style={{ fontFamily: fonts.display, fontSize: 40, fontWeight: 700, color: colors.dim, marginTop: 6 }}>
            {fmt(r.capital)} {">"} {fmt(r.precioCobre, 0)} {">"} 0 {">"} {fmtSigned(r.salario)}
          </div>
        </Glass>
      </Pop>
    </SceneShell>
  );
};

// El caso inverso: suben las cerezas.
export const CerezasSuben: React.FC = () => {
  const cSube = useCue("sube");
  const cTrabajo = useCue("trabajo");
  const brillo = useEase(cTrabajo, 20);
  return (
    <SceneShell entrada="zoom" source={FUENTE_MODELO}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, justifyContent: "center", height: 300 }}>
        <Pop at={cSube} from="zoom">
          <Float>
            <Cerezas size={260} />
          </Float>
        </Pop>
        <Pop at={cSube + 8} from="left">
          <Etiqueta size={240} texto="+10%" paleta={paletas.cereza} />
        </Pop>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", marginTop: 40 }}>
        <Pop at={cTrabajo} from="up">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <Flecha up color={colors.cyan} size={110} />
            <div style={{ transform: `scale(${1 + 0.25 * brillo})` }}>
              <Trabajador size={250} paleta={paletas.frio} />
            </div>
            <div style={{ ...big, fontSize: 64, letterSpacing: -2 }}>
              <GradientText gradient={gradients.cool}>gana</GradientText>
            </div>
          </div>
        </Pop>
        <Pop at={cTrabajo + 12} from="up">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: 0.55 }}>
            <Flecha up={false} color={colors.pink} size={80} />
            <Engranaje size={170} paleta={paletas.calido} />
            <div style={{ ...big, fontSize: 52, letterSpacing: -2, color: colors.dim }}>pierde</div>
          </div>
        </Pop>
      </div>
    </SceneShell>
  );
};

// Los matices: factores específicos y enfermedad holandesa.
export const Realidad: React.FC = () => {
  const frame = useCurrentFrame();
  const cMinero = useCue("minero");
  const cPeso = useCue("peso");
  const cruz = interpolate(frame, [cMinero + 30, cMinero + 40], [0, 1], clamp);
  const fila = (children: React.ReactNode) => (
    <Glass style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "44px 34px" }}>{children}</Glass>
  );
  return (
    <SceneShell entrada="rise">
      <Title at={6} gradient={gradients.gold} size={110}>
        Ojo con los matices
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 40, marginTop: 20 }}>
        <Pop at={cMinero}>
          {fila(
            <>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Trabajador size={190} paleta={paletas.cobre} />
                <Note style={{ fontSize: 28 }}>minero</Note>
              </div>
              <div style={{ position: "relative", width: 260, height: 40 }}>
                <div style={{ position: "absolute", top: 18, left: 0, right: 0, borderTop: `5px dashed ${colors.faint}` }} />
                <div
                  style={{
                    position: "absolute",
                    left: 105,
                    top: -36,
                    fontFamily: fonts.display,
                    fontSize: 96,
                    fontWeight: 800,
                    color: colors.pink,
                    opacity: cruz,
                    transform: `scale(${0.5 + 0.5 * cruz})`,
                  }}
                >
                  ×
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Cerezas size={180} />
                <Note style={{ fontSize: 28 }}>temporero</Note>
              </div>
            </>,
          )}
        </Pop>
        <Pop at={cPeso}>
          {fila(
            <>
              <Pepita size={150} />
              <Flecha up color={colors.gold} size={70} />
              <Pop at={cPeso + 10} from="zoom">
                <Moneda size={160} />
              </Pop>
              <Pop at={cPeso + 18}>
                <Flecha up color={colors.cyan} size={60} />
              </Pop>
              <Pop at={cPeso + 30} from="zoom">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Caja size={160} />
                  <Flecha up={false} color={colors.pink} size={60} />
                </div>
              </Pop>
            </>,
          )}
        </Pop>
      </div>
    </SceneShell>
  );
};

const arco = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p = (a: number) => [cx + r * Math.cos(a - Math.PI / 2), cy + r * Math.sin(a - Math.PI / 2)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1},${y1} Z`;
};

// La torta crece, pero se reparte desigual.
const Torta: React.FC<{ cTorta: number; cReparte: number }> = ({ cTorta, cReparte }) => {
  const crece = useSpring(cTorta + 4, { damping: 14 });
  const corta = useSpring(cReparte + 4, { damping: 16 });
  const share = 0.5 + 0.18 * corta; // la porción del capital se agranda
  const sep = 26 * corta;
  const r = 200 * (0.7 + 0.3 * crece);
  const cx = 300;
  const cy = 250;
  const mid1 = Math.PI * 2 * share * 0.5;
  const mid2 = Math.PI * 2 * (share + (1 - share) * 0.5);
  const off = (a: number) => [Math.cos(a - Math.PI / 2) * sep, Math.sin(a - Math.PI / 2) * sep];
  const [dx1, dy1] = off(mid1);
  const [dx2, dy2] = off(mid2);
  return (
    <svg width={600} height={500} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="torta-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.cyan} />
          <stop offset="100%" stopColor={colors.violet} />
        </linearGradient>
        <linearGradient id="torta-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.orange} />
          <stop offset="100%" stopColor={colors.pink} />
        </linearGradient>
      </defs>
      <g transform={`translate(${dx1} ${dy1})`}>
        <path d={arco(cx, cy, r, 0, Math.PI * 2 * share)} fill="url(#torta-a)" />
      </g>
      <g transform={`translate(${dx2} ${dy2})`}>
        <path d={arco(cx, cy, r, Math.PI * 2 * share, Math.PI * 2 - 0.0001)} fill="url(#torta-b)" />
      </g>
    </svg>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const frame = useCurrentFrame();
  const cTorta = useCue("torta");
  const cReparte = useCue("reparte");
  const cCta = useCue("cta");
  const glowP = 0.5 + 0.5 * Math.sin(frame * 0.18);
  const iconos = interpolate(frame, [cReparte + 10, cReparte + 22], [0, 1], clamp);
  return (
    <SceneShell entrada="zoom">
      <Title at={cTorta} gradient={gradients.brand} size={100}>
        Crece la torta…
      </Title>
      <div style={{ position: "relative", display: "flex", justifyContent: "center", height: 520 }}>
        <Torta cTorta={cTorta} cReparte={cReparte} />
        <div style={{ position: "absolute", left: 494, top: 253, opacity: iconos }}>
          <Engranaje size={110} paleta={paletas.blanco} />
        </div>
        <div style={{ position: "absolute", left: 313, top: 142, opacity: iconos }}>
          <Trabajador size={100} paleta={paletas.blanco} />
        </div>
      </div>
      <Pop at={cReparte} from="zoom" style={{ transformOrigin: "left center" }}>
        <div style={{ ...big, fontSize: 84, letterSpacing: -3 }}>
          <GradientText gradient={gradients.warm}>…pero no se reparte igual</GradientText>
        </div>
      </Pop>
      <Pop at={cCta} from="zoom" style={{ marginTop: 40 }}>
        <div
          style={{
            display: "inline-flex",
            padding: "24px 38px",
            borderRadius: 999,
            background: gradients.brand,
            color: colors.bg,
            fontFamily: fonts.display,
            fontSize: 33,
            fontWeight: 800,
            letterSpacing: -1,
            whiteSpace: "nowrap",
            boxShadow: `0 0 ${50 + 40 * glowP}px rgba(255,77,141,${0.35 + 0.3 * glowP})`,
          }}
        >
          Capítulo 3: ¿quién tiene la culpa de la inflación? →
        </div>
      </Pop>
      <Pop at={cCta + 8}>
        <Note style={{ fontSize: 30, marginTop: 18 }}>{autor}</Note>
      </Pop>
    </SceneShell>
  );
};
