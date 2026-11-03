import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { clamp, Pop, useEase, useSpring, WordsIn } from "../../components/motion";
import { useCue, useCueAt } from "../../components/narracion";
import { Counter, Glass, GradientText, Note } from "../../components/ui";
import { Title } from "../../components/comun";
import {
  Auto,
  Camion,
  Dron,
  Edificio,
  Escudo,
  Gota,
  Hoja,
  Moneda,
  Montana,
  Ojo,
  paletas,
  Persona,
  RelojArena,
} from "../../components/iconos";
import { colors, fonts, gradients } from "../../theme";
import { calculo, costo, denuncias, resultados, zanja } from "./data";

const big: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 800, letterSpacing: -5, lineHeight: 1 };

const Float: React.FC<{ children: React.ReactNode; amp?: number; phase?: number }> = ({ children, amp = 10, phase = 0 }) => {
  const frame = useCurrentFrame();
  return <div style={{ transform: `translateY(${Math.sin(frame * 0.06 + phase) * amp}px)` }}>{children}</div>;
};

const Etiq: React.FC<{ children: React.ReactNode; color?: string; size?: number }> = ({ children, color = colors.dim, size = 34 }) => (
  <div style={{ fontFamily: fonts.display, fontSize: size, fontWeight: 700, color, textAlign: "center", whiteSpace: "nowrap" }}>{children}</div>
);

// Corte de la zanja: el suelo, el hueco que se va cavando y sus medidas.
const ZanjaCorte: React.FC<{ at: number; width?: number; medidas?: boolean }> = ({ at, width = 900, medidas = true }) => {
  const frame = useCurrentFrame();
  const cava = useEase(at, 40);
  const cotas = useEase(at + 34, 16);
  const H = width * 0.62;
  const suelo = H * 0.36;
  const x0 = width * 0.4;
  const w = width * 0.3;
  const prof = w * cava;
  const tierra = Array.from({ length: 9 }, (_, i) => i);
  return (
    <svg width={width} height={H} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="zc-suelo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9824A" />
          <stop offset="100%" stopColor="#4A2A36" />
        </linearGradient>
        <linearGradient id="zc-hueco" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1224" />
          <stop offset="100%" stopColor="#07060B" />
        </linearGradient>
      </defs>
      <rect x={0} y={suelo} width={width} height={H - suelo} rx={24} fill="url(#zc-suelo)" />
      <rect x={0} y={suelo} width={width} height={10} fill={colors.gold} opacity={0.7} />
      <rect x={x0} y={suelo - 1} width={w} height={prof + 1} fill="url(#zc-hueco)" />
      {/* Montículo de tierra que sale del hueco */}
      <path
        d={`M${x0 + w + width * 0.02} ${suelo} Q${x0 + w + width * 0.1} ${suelo - width * 0.08 * cava} ${x0 + w + width * 0.19} ${suelo}`}
        fill="#C9824A"
        opacity={cava}
      />
      {tierra.map((i) => {
        const t = (frame - at - i * 4) % 26;
        const vis = frame > at && frame < at + 40;
        return (
          <circle
            key={i}
            cx={x0 + w * 0.5 + (t / 26) * (120 + i * 6)}
            cy={suelo + prof * 0.6 - Math.sin((t / 26) * Math.PI) * 120}
            r={6 + (i % 3) * 2}
            fill="#E3A56E"
            opacity={vis && t > 0 ? 0.9 : 0}
          />
        );
      })}
      {medidas ? (
        <g opacity={cotas} fontFamily="'Bricolage Grotesque', sans-serif" fontWeight={800} fill={colors.text}>
          <path d={`M${x0} ${suelo - 46} H${x0 + w}`} stroke={colors.cyan} strokeWidth={5} />
          <path d={`M${x0} ${suelo - 60} V${suelo - 32} M${x0 + w} ${suelo - 60} V${suelo - 32}`} stroke={colors.cyan} strokeWidth={5} />
          <text x={x0 + w / 2} y={suelo - 70} textAnchor="middle" fontSize={56}>
            {zanja.ancho} m
          </text>
          <path d={`M${x0 - 34} ${suelo} V${suelo + w}`} stroke={colors.pink} strokeWidth={5} />
          <path d={`M${x0 - 48} ${suelo} H${x0 - 20} M${x0 - 48} ${suelo + w} H${x0 - 20}`} stroke={colors.pink} strokeWidth={5} />
          <text x={x0 - 58} y={suelo + w / 2 + 20} textAnchor="end" fontSize={56}>
            {zanja.profundidad} m
          </text>
        </g>
      ) : null}
    </svg>
  );
};

export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const cZanja = useCue("zanja");
  const cNum = useCue("numeros");
  const cFunciona = useCueAt("numeros", 0.5);
  const latido = 1 + 0.04 * Math.sin(frame * 0.2);
  return (
    <SceneShell entrada="none">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
        <Pop at={cZanja} from="zoom" style={{ position: "relative" }}>
          <ZanjaCorte at={cZanja + 6} />
          <div style={{ position: "absolute", left: 40, top: 900 * 0.62 * 0.36 - 170 }}>
            <Persona size={170} />
          </div>
        </Pop>
        <div style={{ display: "flex", alignItems: "center", gap: 30, minHeight: 200 }}>
          <Pop at={cNum} from="left">
            <Escudo size={150} paleta={paletas.calido} />
          </Pop>
          <Pop at={cFunciona} from="zoom">
            <div style={{ ...big, fontSize: 130, transform: `scale(${latido})` }}>
              <GradientText gradient={gradients.warm}>¿Funciona?</GradientText>
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
        <div style={{ fontFamily: fonts.display, fontSize: 40, fontWeight: 600, color: colors.dim }}>{serie} · Capítulo 4</div>
      </Pop>
      <div style={{ ...big, letterSpacing: -6, lineHeight: 0.98 }}>
        <Pop at={4} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ fontSize: 200, letterSpacing: -9 }}>
            <GradientText gradient={gradients.gold}>La zanja</GradientText>
          </div>
        </Pop>
        <WordsIn at={12} stagger={3} text="de la frontera norte" style={{ fontSize: 110, display: "block", marginTop: 10 }} />
      </div>
      <Pop at={24}>
        <Note style={{ fontSize: 30, marginTop: 20 }}>por {autor}</Note>
      </Pop>
    </div>
  </SceneShell>
);

// La frontera como una línea de 1.030 km y la zanja como un tramo de 60 km.
export const Tamano: React.FC = () => {
  const frame = useCurrentFrame();
  const cMeta = useCue("meta");
  const cFrontera = useCue("frontera");
  const cSeis = useCue("seis");
  const linea = useEase(cFrontera, 34);
  const brillo = 0.6 + 0.4 * Math.sin(frame * 0.25);
  const W = 900;
  const wZanja = (zanja.metaKm / zanja.fronteraKm) * W;
  return (
    <SceneShell entrada="rise" source={zanja.fuente}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <Pop at={cMeta} from="zoom" style={{ transformOrigin: "left bottom" }}>
          <div style={{ ...big, fontSize: 170 }}>
            <GradientText gradient={gradients.gold}>
              <Counter to={zanja.metaKm} at={cMeta} duration={24} decimals={0} />
            </GradientText>
            <span style={{ fontSize: 70, color: colors.dim, letterSpacing: -2 }}> km</span>
          </div>
          <Note style={{ fontSize: 34 }}>de zanja</Note>
        </Pop>
        <Pop at={cFrontera} from="right" style={{ textAlign: "right" }}>
          <div style={{ ...big, fontSize: 110, letterSpacing: -4 }}>
            <GradientText gradient={gradients.cool}>
              <Counter to={zanja.fronteraKm} at={cFrontera} duration={34} decimals={0} />
            </GradientText>
            <span style={{ fontSize: 54, color: colors.dim, letterSpacing: -2 }}> km</span>
          </div>
          <Note style={{ fontSize: 34 }}>de frontera</Note>
        </Pop>
      </div>
      <Pop at={cFrontera - 4} style={{ marginTop: 50, display: "flex", justifyContent: "center" }}>
        <Montana size={640} />
      </Pop>
      <div style={{ position: "relative", height: 60, marginTop: -10 }}>
        <div style={{ position: "absolute", left: 0, top: 18, height: 24, width: W * linea, borderRadius: 12, background: gradients.cool, opacity: 0.9 }} />
        <div
          style={{
            position: "absolute",
            left: W * 0.36,
            top: 6,
            height: 48,
            width: wZanja,
            borderRadius: 10,
            background: gradients.gold,
            boxShadow: `0 0 ${30 * brillo}px ${colors.gold}`,
            opacity: frame >= cMeta + 6 ? 1 : 0,
          }}
        />
      </div>
      <Pop at={cSeis} from="zoom" style={{ marginTop: 40, display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <div style={{ ...big, fontSize: 200, letterSpacing: -9 }}>
          <GradientText gradient={gradients.gold}>
            <Counter to={calculo.cobertura} at={cSeis} duration={20} decimals={0} suffix="%" />
          </GradientText>
        </div>
        <Note style={{ fontSize: 40, maxWidth: 300 }}>de la frontera</Note>
      </Pop>
    </SceneShell>
  );
};

const FilaCosto: React.FC<{ at: number; icono: React.ReactNode; valor: React.ReactNode; texto: string; gradient: string }> = ({
  at,
  icono,
  valor,
  texto,
  gradient,
}) => (
  <Pop at={at} from="left">
    <Glass style={{ display: "flex", alignItems: "center", gap: 30, padding: "26px 34px" }}>
      <div style={{ width: 210, display: "flex", justifyContent: "center" }}>{icono}</div>
      <div>
        <div style={{ ...big, fontSize: 88, letterSpacing: -3, whiteSpace: "nowrap" }}>
          <GradientText gradient={gradient}>{valor}</GradientText>
        </div>
        <Note style={{ fontSize: 32, marginTop: 6 }}>{texto}</Note>
      </div>
    </Glass>
  </Pop>
);

export const Costo: React.FC = () => {
  const frame = useCurrentFrame();
  const cObras = useCueAt("obras", 0.45);
  const cAnual = useCue("anual");
  const cMil = useCue("militares");
  const cNo = useCueAt("militares", 0.65);
  const duda = 1 + 0.08 * Math.sin(frame * 0.3);
  return (
    <SceneShell entrada="slide" source={costo.fuente}>
      <Title at={useCue("obras")} gradient={gradients.gold} size={110}>
        ¿Cuánto cuesta?
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 20 }}>
        <FilaCosto
          at={cObras}
          icono={<Camion size={200} />}
          valor={
            <>
              $<Counter to={costo.obrasMM} at={cObras} duration={26} decimals={0} />
            </>
          }
          texto="millones, construir"
          gradient={gradients.gold}
        />
        <FilaCosto
          at={cAnual}
          icono={<RelojArena size={150} />}
          valor={
            <>
              $<Counter to={costo.anualMM} at={cAnual} duration={26} decimals={0} />
            </>
          }
          texto="millones al año, mantener"
          gradient={gradients.warm}
        />
        <FilaCosto
          at={cMil}
          icono={
            <div style={{ position: "relative" }}>
              <Escudo size={150} />
              <div style={{ position: "absolute", right: -30, top: -30, ...big, fontSize: 90, color: colors.pink, opacity: frame >= cNo ? 1 : 0, transform: `scale(${duda})` }}>
                ?
              </div>
            </div>
          }
          valor={
            <>
              <Counter to={costo.militares} at={cMil} duration={26} decimals={0} />
            </>
          }
          texto="militares, costo sin informar"
          gradient={gradients.cool}
        />
      </div>
    </SceneShell>
  );
};

// Barra horizontal simple: antes (2025) y después (2026).
const BarraH: React.FC<{ at: number; valor: number; max: number; etiqueta: string; gradient: string; width?: number }> = ({
  at,
  valor,
  max,
  etiqueta,
  gradient,
  width = 600,
}) => {
  const p = useSpring(at, { damping: 16 });
  const w = Math.max(14, (valor / max) * width * p);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22, opacity: Math.min(1, p * 2) }}>
      <div style={{ width: 120, fontFamily: fonts.display, fontSize: 40, fontWeight: 700, color: colors.dim }}>{etiqueta}</div>
      <div style={{ height: 80, width: w, borderRadius: 20, background: gradient }} />
      <div style={{ ...big, fontSize: 60, letterSpacing: -2 }}>
        <Counter to={valor} at={at} duration={28} decimals={0} />
      </div>
    </div>
  );
};

export const Resultados: React.FC = () => {
  const cNov = useCueAt("noventa", 0.7);
  const cCol = useCue("colchane");
  const cDesp = useCueAt("colchane", 0.6);
  return (
    <SceneShell entrada="zoom" source={resultados.fuente}>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <Pop at={useCue("noventa")} from="zoom">
          <Ojo size={200} />
        </Pop>
        <Pop at={useCueAt("noventa", 0.3)}>
          <Note style={{ fontSize: 40, lineHeight: 1.2 }}>
            personas detectadas
            <br />
            en la frontera norte
          </Note>
        </Pop>
      </div>
      <Pop at={cNov} from="zoom" style={{ transformOrigin: "left center", marginTop: 10 }}>
        <div style={{ ...big, fontSize: 280, letterSpacing: -12 }}>
          <GradientText gradient={gradients.cool}>
            −<Counter to={resultados.caida} at={cNov} duration={30} decimals={0} suffix="%" />
          </GradientText>
        </div>
      </Pop>
      <Pop at={cCol} style={{ marginTop: 40 }}>
        <Etiq color={colors.text} size={46}>
          Colchane
        </Etiq>
      </Pop>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 30 }}>
        <BarraH at={cCol + 6} valor={resultados.colchane.antes} max={resultados.colchane.antes} etiqueta="2025" gradient={gradients.warm} />
        <BarraH at={cDesp} valor={resultados.colchane.despues} max={resultados.colchane.antes} etiqueta="2026" gradient={gradients.cool} />
      </div>
    </SceneShell>
  );
};

const BarraPct: React.FC<{ at: number; pct: number; texto: string; gradient: string }> = ({ at, pct, texto, gradient }) => {
  const p = useSpring(at, { damping: 16 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: Math.min(1, p * 2) }}>
      <div style={{ width: 300, fontFamily: fonts.display, fontSize: 38, fontWeight: 700, color: colors.dim }}>{texto}</div>
      <div style={{ height: 76, width: (pct / 100) * 400 * p, borderRadius: 20, background: gradient }} />
      <div style={{ ...big, fontSize: 64, letterSpacing: -2 }}>−{Math.round(pct * Math.min(1, p))}%</div>
    </div>
  );
};

// Lo que se ve y lo que no: un cono de vigilancia y alguien que lo rodea.
export const Trampa: React.FC = () => {
  const frame = useCurrentFrame();
  const cOjo = useCue("ojo");
  const cEvita = useCue("evita");
  const cDen = useCue("denuncias");
  const camino = useEase(cEvita + 4, 60);
  const W = 900;
  const H = 420;
  // Recorrido por fuera del cono: de izquierda a derecha, pasando por abajo.
  const t = camino;
  const px = interpolate(t, [0, 1], [30, W - 150]);
  const py = H - 150 + Math.sin(t * Math.PI) * 20;
  return (
    <SceneShell entrada="tilt" source={denuncias.fuente}>
      <Title at={cOjo} gradient={gradients.warm} size={104}>
        Pero ojo
      </Title>
      <div style={{ position: "relative", width: W, height: H }}>
        <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0 }}>
          <defs>
            <linearGradient id="cono" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.cyan} stopOpacity={0.55} />
              <stop offset="100%" stopColor={colors.cyan} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <path d={`M${W / 2} 70 L${W / 2 - 160} ${H - 170} L${W / 2 + 160} ${H - 170} Z`} fill="url(#cono)" opacity={interpolate(frame, [cOjo + 8, cOjo + 20], [0, 1], clamp)} />
          <path
            d={`M30 ${H - 70} Q${W / 2} ${H + 10} ${W - 90} ${H - 70}`}
            stroke={colors.pink}
            strokeWidth={5}
            strokeDasharray="14 14"
            fill="none"
            opacity={interpolate(frame, [cEvita, cEvita + 10], [0, 0.8], clamp)}
          />
        </svg>
        <Pop at={cOjo + 4} from="zoom" style={{ position: "absolute", left: W / 2 - 80, top: 0 }}>
          <Ojo size={160} />
        </Pop>
        <div style={{ position: "absolute", left: px, top: py, opacity: frame >= cEvita ? 1 : 0 }}>
          <Persona size={150} paso={frame * 0.35} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 30 }}>
        <BarraPct at={cDen - 2} pct={resultados.caida} texto="detecciones" gradient={gradients.cool} />
        <BarraPct at={cDen + 14} pct={denuncias.caida} texto="denuncias" gradient={gradients.warm} />
      </div>
    </SceneShell>
  );
};

// Varias causas al mismo tiempo empujan la misma baja.
export const Causas: React.FC = () => {
  const cSola = useCue("sola");
  const cAntes = useCue("antes");
  const curva = useEase(cAntes + 4, 40);
  const items: { at: number; icono: React.ReactNode; texto: string }[] = [
    { at: cSola + 6, icono: <ZanjaCorte at={-100} width={200} medidas={false} />, texto: "zanja" },
    { at: useCueAt("juntos", 0.15), icono: <Escudo size={130} />, texto: "militares" },
    { at: useCueAt("juntos", 0.4), icono: <Edificio size={130} paleta={paletas.calido} />, texto: "controles" },
    { at: useCueAt("juntos", 0.65), icono: <Dron size={170} />, texto: "tecnología" },
  ];
  const puntos = [0, 1, 2, 3, 4].map((i) => ({ x: 40 + i * 200, y: 40 + i * i * 9 + i * 20 }));
  const d = puntos.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");
  return (
    <SceneShell entrada="rise" source="Plan Escudo Fronterizo · Pauta · El Dínamo">
      <Title at={cSola} gradient={gradients.cool} size={100}>
        No llegó sola
      </Title>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 10 }}>
        {items.map((it, i) => (
          <Pop key={it.texto} at={it.at} from="up">
            <Glass style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "22px 16px", height: 230, justifyContent: "center" }}>
              <Float phase={i}>{it.icono}</Float>
              <Etiq color={colors.text}>{it.texto}</Etiq>
            </Glass>
          </Pop>
        ))}
      </div>
      <Pop at={cAntes} style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 20 }}>
        <svg width={880} height={280} style={{ overflow: "visible" }}>
          <path d={d} stroke={colors.gold} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - curva} />
          {puntos.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={14} fill={colors.gold} opacity={curva * 4 > i ? 1 : 0} />
          ))}
          <text x={880} y={60} textAnchor="end" fontSize={36} fontWeight={700} fill={colors.dim} fontFamily="'Bricolage Grotesque', sans-serif">
            ya venía bajando
          </text>
        </svg>
      </Pop>
    </SceneShell>
  );
};

// El beneficio real: la zanja detiene vehículos, pero no a quien camina.
export const Beneficio: React.FC = () => {
  const frame = useCurrentFrame();
  const cReal = useCue("real");
  const cAutos = useCue("autos");
  const cPie = useCue("pie");
  const llega = useEase(cAutos + 4, 30);
  const choque = useSpring(cAutos + 34, { damping: 8 });
  const rodea = useEase(cPie + 6, 70);
  const W = 900;
  const ax = interpolate(llega, [0, 1], [-60, 300]);
  // A pie: va hacia la zanja, la bordea por el extremo y sigue.
  const px = interpolate(rodea, [0, 0.35, 0.65, 1], [40, 380, 560, 760]);
  const py = interpolate(rodea, [0, 0.35, 0.65, 1], [0, 90, 90, 0]);
  const marca = (ok: boolean, at: number) => (
    <Pop at={at} from="zoom" style={{ position: "absolute", right: 10, top: 10 }}>
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          background: ok ? "linear-gradient(135deg,#7CF29A,#22B07D)" : gradients.warm,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...big,
          fontSize: 64,
          color: colors.bg,
        }}
      >
        {ok ? "✓" : "✕"}
      </div>
    </Pop>
  );
  return (
    <SceneShell entrada="zoom">
      <Title at={cReal} gradient={gradients.gold} size={104}>
        ¿El beneficio real?
      </Title>
      <Pop at={cAutos} style={{ position: "relative", marginTop: 10 }}>
        <Glass style={{ position: "relative", height: 330, padding: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 230, height: 100, background: "linear-gradient(180deg,#C9824A,#4A2A36)" }} />
          <div style={{ position: "absolute", left: 520, top: 230, width: 150, height: 100, background: "#07060B" }} />
          <div style={{ position: "absolute", left: ax, top: 118, transform: `rotate(${-(choque - 1) * 4}deg)` }}>
            <Auto size={230} />
          </div>
          {marca(true, cAutos + 40)}
          <div style={{ position: "absolute", left: 30, top: 24 }}>
            <Etiq color={colors.text}>vehículos</Etiq>
          </div>
        </Glass>
      </Pop>
      <Pop at={cPie} style={{ position: "relative", marginTop: 26 }}>
        <Glass style={{ position: "relative", height: 330, padding: 0, overflow: "hidden" }}>
          <svg width={W} height={330} style={{ position: "absolute", left: 0, top: 0 }}>
            {/* Vista desde arriba: la zanja es una franja que termina, y se puede rodear. */}
            <rect x={330} y={0} width={70} height={200} fill="#07060B" stroke="#C9824A" strokeWidth={4} />
            <path d="M60 140 Q360 330 820 140" stroke={colors.pink} strokeWidth={5} strokeDasharray="14 14" fill="none" opacity={0.6 * Math.min(1, rodea * 3)} />
          </svg>
          <div style={{ position: "absolute", left: px, top: 110 + py }}>
            <Persona size={130} paso={frame * 0.35} />
          </div>
          {marca(false, cPie + 40)}
          <div style={{ position: "absolute", left: 30, top: 24 }}>
            <Etiq color={colors.text}>a pie</Etiq>
          </div>
        </Glass>
      </Pop>
    </SceneShell>
  );
};

export const Riesgos: React.FC = () => {
  const frame = useCurrentFrame();
  const cRiesgos = useCue("riesgos");
  const cRutas = useCue("rutas");
  const cBof = useCue("bofedales");
  const cSost = useCue("sostener");
  const giro = interpolate(frame, [cSost + 6, cSost + 50], [0, 180], clamp);
  const fila = (at: number, ilus: React.ReactNode, texto: string, glow: string) => (
    <Pop at={at} from="right">
      <Glass glow={glow} style={{ display: "flex", alignItems: "center", gap: 30, padding: "24px 30px", height: 220 }}>
        <div style={{ width: 380, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>{ilus}</div>
        <Etiq color={colors.text} size={44}>
          {texto}
        </Etiq>
      </Glass>
    </Pop>
  );
  return (
    <SceneShell entrada="slide" source="UAH · Conicet, «El muro invertido» · CIPER">
      <Title at={cRiesgos} gradient={gradients.warm} size={110}>
        Los riesgos
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 10 }}>
        {fila(
          cRutas,
          <>
            <Montana size={230} />
            <Float>
              <Persona size={110} paso={frame * 0.2} />
            </Float>
          </>,
          "rutas peligrosas",
          "rgba(139,92,246,0.35)",
        )}
        {fila(
          cBof,
          <>
            <Float>
              <Hoja size={140} />
            </Float>
            <Float phase={1.5}>
              <Gota size={110} />
            </Float>
          </>,
          "bofedales y fauna",
          "rgba(34,176,125,0.35)",
        )}
        {fila(
          cSost,
          <>
            <Escudo size={130} />
            <div style={{ transform: `rotate(${giro}deg)` }}>
              <RelojArena size={120} />
            </div>
          </>,
          "difícil de sostener",
          "rgba(255,122,61,0.35)",
        )}
      </div>
    </SceneShell>
  );
};

export const Calculo: React.FC = () => {
  const frame = useCurrentFrame();
  const cCalc = useCue("calculo");
  const cKm = useCueAt("km", 0.4);
  const cTotal = useCue("total");
  const cIng = useCueAt("porIngreso", 0.55);
  const barra = useEase(cTotal + 6, 40);
  const pulso = 0.5 + 0.5 * Math.sin(frame * 0.2);
  return (
    <SceneShell entrada="tilt" source="Cálculo propio con cifras públicas · supuesto optimista">
      <Title at={cCalc} gradient={gradients.brand} size={104}>
        Cálculo propio
      </Title>
      <Pop at={cKm} from="left" style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <Moneda size={130} />
        <div>
          <div style={{ ...big, fontSize: 104, letterSpacing: -4 }}>
            <GradientText gradient={gradients.gold}>
              $<Counter to={calculo.porKmMM} at={cKm} duration={24} decimals={0} />
            </GradientText>
            <span style={{ fontSize: 48, color: colors.dim, letterSpacing: -1 }}> millones</span>
          </div>
          <Note style={{ fontSize: 34 }}>por kilómetro</Note>
        </div>
      </Pop>
      <Pop at={cTotal} style={{ marginTop: 40 }}>
        <div style={{ position: "relative", height: 70, width: 900, borderRadius: 20, background: colors.glass, border: `1.5px solid ${colors.line}`, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${interpolate(barra, [0, 1], [(zanja.metaKm / zanja.fronteraKm) * 100, 100])}%`,
              background: gradients.gold,
              opacity: 0.9,
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 14 }}>
          <div style={{ ...big, fontSize: 96, letterSpacing: -4 }}>
            ~$<Counter to={calculo.fronteraMM} from={costo.obrasMM} at={cTotal + 6} duration={40} decimals={0} />
          </div>
          <Note style={{ fontSize: 34 }}>millones, toda la frontera</Note>
        </div>
      </Pop>
      <Pop at={cIng} from="zoom" style={{ marginTop: 50 }}>
        <Glass glow={`rgba(255,77,141,${0.25 + 0.2 * pulso})`} style={{ display: "flex", alignItems: "center", gap: 26, padding: "30px 34px" }}>
          <Persona size={130} />
          <div>
            <div style={{ ...big, fontSize: 104, letterSpacing: -4 }}>
              <GradientText gradient={gradients.warm}>
                $<Counter to={calculo.porIngresoMiles} at={cIng} duration={30} decimals={0} /> mil
              </GradientText>
            </div>
            <Note style={{ fontSize: 32 }}>por cada ingreso menos, al año</Note>
          </div>
        </Glass>
      </Pop>
    </SceneShell>
  );
};

// Lo que falta: costo total, una evaluación con comparación y los países vecinos.
export const Falta: React.FC = () => {
  const frame = useCurrentFrame();
  const cFalta = useCue("falta");
  const cComp = useCue("comparar");
  const cVec = useCue("vecinos");
  const lazo = useEase(cVec + 10, 30);
  const tarjeta = (at: number, n: string, ilus: React.ReactNode, texto: string) => (
    <Pop at={at} from="up">
      <Glass style={{ display: "flex", alignItems: "center", gap: 26, padding: "22px 30px", height: 220 }}>
        <div style={{ ...big, fontSize: 90, width: 70 }}>
          <GradientText gradient={gradients.gold}>{n}</GradientText>
        </div>
        <div style={{ width: 360, display: "flex", justifyContent: "center", alignItems: "center", gap: 14 }}>{ilus}</div>
        <Etiq color={colors.text} size={40}>
          {texto}
        </Etiq>
      </Glass>
    </Pop>
  );
  const tramo = (con: boolean) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ width: 140, height: 70, borderRadius: 12, background: "linear-gradient(180deg,#C9824A,#4A2A36)", position: "relative", overflow: "hidden" }}>
        {con ? <div style={{ position: "absolute", left: 50, top: 0, width: 40, height: 70, background: "#07060B" }} /> : null}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: colors.dim }}>{con ? "con" : "sin"}</div>
    </div>
  );
  const pais = (nombre: string, gradient: string) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ width: 80, height: 80, borderRadius: 40, background: gradient }} />
      <div style={{ fontSize: 26, fontWeight: 700, color: colors.dim }}>{nombre}</div>
    </div>
  );
  return (
    <SceneShell entrada="rise">
      <Title at={cFalta} gradient={gradients.cool} size={110}>
        ¿Qué falta?
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 10 }}>
        {tarjeta(
          useCueAt("falta", 0.35),
          "1",
          <>
            <Moneda size={120} />
            <div style={{ ...big, fontSize: 110, color: colors.pink, transform: `rotate(${Math.sin(frame * 0.15) * 8}deg)` }}>?</div>
          </>,
          "costo total",
        )}
        {tarjeta(
          cComp,
          "2",
          <>
            {tramo(true)}
            <div style={{ ...big, fontSize: 50, color: colors.dim }}>vs</div>
            {tramo(false)}
          </>,
          "comparar",
        )}
        {tarjeta(
          cVec,
          "3",
          <div style={{ position: "relative", display: "flex", gap: 30 }}>
            <div style={{ position: "absolute", left: 40, right: 40, top: 38, height: 6, borderRadius: 3, background: gradients.brand, transform: `scaleX(${lazo})`, transformOrigin: "left" }} />
            {pais("Perú", "linear-gradient(135deg,#FF5E7E,#C2185B)")}
            {pais("Chile", gradients.cool)}
            {pais("Bolivia", "linear-gradient(135deg,#7CF29A,#FFC15E)")}
          </div>,
          "vecinos",
        )}
      </div>
    </SceneShell>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const frame = useCurrentFrame();
  const cAyuda = useCue("ayuda");
  const cMedir = useCue("medir");
  const cCta = useCue("cta");
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.18);
  const mide = useEase(cMedir + 4, 40);
  return (
    <SceneShell entrada="zoom">
      <Title at={cAyuda} gradient={gradients.gold} size={110}>
        Ayuda, pero no basta
      </Title>
      <Pop at={cAyuda + 10} style={{ display: "flex", justifyContent: "center", marginTop: 0 }}>
        <ZanjaCorte at={-100} width={640} medidas={false} />
      </Pop>
      <Pop at={cMedir} style={{ marginTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Ojo size={130} />
          <div style={{ flex: 1, height: 26, borderRadius: 13, background: colors.glass, border: `1.5px solid ${colors.line}`, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${mide * 100}%`, background: gradients.cool }} />
          </div>
        </div>
        <Note style={{ fontSize: 34, marginTop: 10 }}>medir bien para saber si vale la pena</Note>
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
