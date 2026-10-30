import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { clamp, Pop, useEase, useSpring, WordsIn } from "../../components/motion";
import { useCue, useCueAt } from "../../components/narracion";
import { Counter, fmt, Glass, GradientText, Note } from "../../components/ui";
import { Title } from "../../components/comun";
import {
  Alerta,
  Candado,
  Documento,
  Edificio,
  Flecha,
  Intercambio,
  Jubilado,
  Moneda,
  Ojo,
  paletas,
  Persona,
  RelojArena,
} from "../../components/iconos";
import { colors, fonts, gradients } from "../../theme";
import { alertas, apuesta, calculo, fondos } from "./data";

const big: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 800, letterSpacing: -5, lineHeight: 1 };

const Float: React.FC<{ children: React.ReactNode; amp?: number; phase?: number }> = ({ children, amp = 10, phase = 0 }) => {
  const frame = useCurrentFrame();
  return <div style={{ transform: `translateY(${Math.sin(frame * 0.06 + phase) * amp}px)` }}>{children}</div>;
};

const Etiq: React.FC<{ children: React.ReactNode; color?: string; size?: number }> = ({ children, color = colors.dim, size = 34 }) => (
  <div style={{ fontFamily: fonts.display, fontSize: size, fontWeight: 700, color, textAlign: "center", whiteSpace: "nowrap" }}>{children}</div>
);

const pesos = (n: number) => `$${n.toLocaleString("es-CL")}`;

// Gancho: el fondo "seguro" cae un 10%.
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const cDiez = useCue("diez");
  const cCae = useCueAt("diez", 0.55);
  const cNum = useCue("numeros");
  const caida = useEase(cCae, 40);
  const latido = 1 + 0.04 * Math.sin(frame * 0.2);
  return (
    <SceneShell entrada="none">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 50 }}>
        <Pop at={cDiez} from="zoom">
          <div style={{ display: "flex", alignItems: "center", gap: 30, marginBottom: 30 }}>
            <Jubilado size={200} />
            <div style={{ position: "relative", width: 220, height: 220 }}>
              <div style={{ position: "absolute", left: 0, top: -40, transform: `translateY(${caida * 50}px) rotate(${caida * 18}deg)`, opacity: 1 - caida * 0.3 }}>
                <Moneda size={200} />
              </div>
            </div>
          </div>
        </Pop>
        <Pop at={cCae} from="zoom">
          <div style={{ ...big, fontSize: 250, letterSpacing: -12 }}>
            <GradientText gradient={gradients.warm}>
              −<Counter to={Math.abs(fondos.real2026.E)} at={cCae} duration={36} suffix="%" />
            </GradientText>
          </div>
          <Note style={{ fontSize: 38, textAlign: "center" }}>el fondo E, el "más seguro"</Note>
        </Pop>
        <Pop at={cNum} from="zoom">
          <div style={{ ...big, fontSize: 110, transform: `scale(${latido})` }}>
            <GradientText gradient={gradients.cool}>¿Cómo pasó?</GradientText>
          </div>
        </Pop>
      </div>
    </SceneShell>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ serie, autor }) => (
  <SceneShell entrada="zoom">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
      <Pop at={2}>
        <div style={{ fontFamily: fonts.display, fontSize: 40, fontWeight: 600, color: colors.dim }}>{serie} · Capítulo 5</div>
      </Pop>
      <div style={{ ...big, letterSpacing: -6, lineHeight: 0.98 }}>
        <Pop at={4} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ fontSize: 190, letterSpacing: -9 }}>
            <GradientText gradient={gradients.warm}>La apuesta</GradientText>
          </div>
        </Pop>
        <WordsIn at={12} stagger={3} text="de las AFP" style={{ fontSize: 150, display: "block", marginTop: 10 }} />
      </div>
      <Pop at={24}>
        <Note style={{ fontSize: 30, marginTop: 20 }}>por {autor}</Note>
      </Pop>
    </div>
  </SceneShell>
);

// Un swap: la AFP recibe tasa fija y paga variable. Gana si la tasa baja.
export const Apuesta: React.FC = () => {
  const frame = useCurrentFrame();
  const cSwap = useCue("swap");
  const cGanan = useCueAt("swap", 0.5);
  const cPierden = useCueAt("swap", 0.82);
  const cNoc = useCue("nocional");
  const cTres = useCueAt("nocional", 0.6);
  const giro = frame * 2;
  const bloque = (at: number, texto: string, color: string, up: boolean) => (
    <Pop at={at} from="up" style={{ flex: 1 }}>
      <Glass style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: "20px 16px" }}>
        <Flecha up={up} color={color} size={60} />
        <Etiq color={colors.text} size={36}>
          {texto}
        </Etiq>
      </Glass>
    </Pop>
  );
  return (
    <SceneShell entrada="rise" source={apuesta.fuente}>
      <Title at={cSwap} gradient={gradients.cool} size={110}>
        Un swap
      </Title>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
        <Pop at={cSwap + 6} from="left">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Edificio size={180} paleta={paletas.calido} />
            <Etiq>AFP</Etiq>
          </div>
        </Pop>
        <Pop at={cSwap + 12} from="zoom">
          <div style={{ transform: `rotate(${giro}deg)` }}>
            <Intercambio size={170} />
          </div>
        </Pop>
        <Pop at={cSwap + 18} from="right">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Edificio size={180} paleta={paletas.frio} />
            <Etiq>banco</Etiq>
          </div>
        </Pop>
      </div>
      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        {bloque(cGanan, "tasa baja: gana", "#7CF29A", false)}
        {bloque(cPierden, "tasa sube: pierde", colors.pink, true)}
      </div>
      <Pop at={cNoc} from="zoom" style={{ marginTop: 50 }}>
        <div style={{ ...big, fontSize: 120, letterSpacing: -5 }}>
          <GradientText gradient={gradients.gold}>
            US$<Counter to={apuesta.nocionalMMUSD / 1000} at={cNoc} duration={34} decimals={0} /> mil
          </GradientText>
        </div>
        <Note style={{ fontSize: 34 }}>millones en contratos</Note>
      </Pop>
      <Pop at={cTres} from="left" style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ ...big, fontSize: 110, letterSpacing: -4 }}>
          <GradientText gradient={gradients.warm}>{calculo.vecesActivos}×</GradientText>
        </div>
        <Note style={{ fontSize: 34, maxWidth: 560 }}>todo lo que administran</Note>
      </Pop>
    </SceneShell>
  );
};

// De ganar a perder: una barra que sube y luego se hunde, con la tasa a 10 años subiendo.
export const Giro: React.FC = () => {
  const frame = useCurrentFrame();
  const cGanaban = useCue("ganaban");
  const cTasa = useCue("tasa");
  const cSube = useCueAt("tasa", 0.6);
  const cPierden = useCue("pierden");
  const sube = useEase(cSube, 40);
  const hunde = useEase(cPierden, 44);
  const escala = 36; // px por cada US$1.000 millones
  const cero = 300;
  const valor = interpolate(hunde, [0, 1], [apuesta.ganabanMMUSD, -apuesta.pierdenMMUSD]);
  const alto = (Math.abs(valor) / 1000) * escala;
  const aparece = useSpring(cGanaban, { damping: 14 });
  return (
    <SceneShell entrada="slide" source={apuesta.fuente}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <Pop at={cGanaban} from="left">
          <Note style={{ fontSize: 36, lineHeight: 1.2 }}>
            valor de los
            <br />
            contratos
          </Note>
        </Pop>
        <Pop at={cTasa} from="right" style={{ textAlign: "right" }}>
          <Note style={{ fontSize: 30 }}>tasa a 10 años · EE.UU.</Note>
          <div style={{ ...big, fontSize: 96, letterSpacing: -4, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 14 }}>
            <GradientText gradient={gradients.warm}>
              <Counter to={apuesta.tasaDespues} from={apuesta.tasaAntes} at={cSube} duration={40} suffix="%" />
            </GradientText>
            <div style={{ transform: `translateY(${-sube * 20}px)`, opacity: sube }}>
              <Flecha up color={colors.pink} size={70} />
            </div>
          </div>
        </Pop>
      </div>
      <div style={{ position: "relative", height: 660, marginTop: 20 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: cero, height: 4, background: colors.line }} />
        <div style={{ position: "absolute", left: 0, top: cero - 44, fontSize: 28, fontWeight: 700, color: colors.faint }}>0</div>
        <div
          style={{
            position: "absolute",
            left: 280,
            width: 300,
            top: valor >= 0 ? cero - alto * aparece : cero,
            height: alto * aparece,
            borderRadius: 24,
            background: valor >= 0 ? "linear-gradient(180deg,#7CF29A,#22B07D)" : gradients.warm,
            boxShadow: valor >= 0 ? "0 0 40px rgba(124,242,154,0.5)" : "0 0 50px rgba(255,77,141,0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 230,
            width: 400,
            textAlign: "center",
            top: valor >= 0 ? cero - alto * aparece - 100 : cero + alto * aparece + 20,
            ...big,
            fontSize: 84,
            letterSpacing: -3,
            opacity: aparece,
            whiteSpace: "nowrap",
          }}
        >
          {valor >= 0 ? "+" : "−"}US${fmt(Math.abs(valor), 0)}
          <div style={{ fontFamily: fonts.sans, fontSize: 30, fontWeight: 500, color: colors.dim, letterSpacing: 0, marginTop: 4 }}>millones</div>
        </div>
        <div style={{ position: "absolute", right: 0, top: 80, opacity: interpolate(frame, [cTasa, cTasa + 12], [0, 1], clamp) }}>
          <Float>
            <Alerta size={150} />
          </Float>
          <Etiq size={28}>guerra en Irán</Etiq>
        </div>
      </div>
    </SceneShell>
  );
};

// Barras por fondo: A gana, E pierde.
export const FondoE: React.FC = () => {
  const cFondo = useCue("fondoE");
  const cCaida = useCue("caida");
  const cPeor = useCueAt("caida", 0.55);
  const letras = ["A", "B", "C", "D", "E"] as const;
  const W = 900;
  const slot = W / 5;
  const cero = 230;
  const escala = 24; // px por punto
  return (
    <SceneShell entrada="zoom" source={fondos.fuente}>
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <Pop at={cFondo} from="zoom">
          <Jubilado size={170} />
        </Pop>
        <Title at={cFondo + 4} gradient={gradients.warm} size={104} sub="rentabilidad real · enero a septiembre 2026">
          El fondo E
        </Title>
      </div>
      <div style={{ position: "relative", width: W, height: 560, marginTop: 10 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: cero, height: 4, background: colors.line }} />
        {letras.map((l, i) => (
          <Barra key={l} letra={l} valor={fondos.real2026[l]} at={cFondo + 14 + i * 5} x={slot * i + slot / 2} cero={cero} escala={escala} destacado={l === "E"} cDestacado={cCaida} />
        ))}
      </div>
      <Pop at={cPeor} from="zoom" style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 10 }}>
        <RelojArena size={110} />
        <div>
          <div style={{ ...big, fontSize: 74, letterSpacing: -3 }}>
            <GradientText gradient={gradients.gold}>2º peor año</GradientText>
          </div>
          <Note style={{ fontSize: 30 }}>desde 2002 · el peor fue 2021: {fmt(fondos.peor2021)}%</Note>
        </div>
      </Pop>
    </SceneShell>
  );
};

const Barra: React.FC<{ letra: string; valor: number; at: number; x: number; cero: number; escala: number; destacado: boolean; cDestacado: number }> = ({
  letra,
  valor,
  at,
  x,
  cero,
  escala,
  destacado,
  cDestacado,
}) => {
  const frame = useCurrentFrame();
  const p = useSpring(at, { damping: 15 });
  const brillo = destacado ? interpolate(frame, [cDestacado, cDestacado + 12], [0, 1], clamp) : 0;
  const h = Math.abs(valor) * escala * p;
  const w = 120;
  const positivo = valor >= 0;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: 0, width: w, height: "100%", opacity: Math.min(1, p * 2) }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: w,
          top: positivo ? cero - h : cero,
          height: h,
          borderRadius: 20,
          background: positivo ? gradients.cool : gradients.warm,
          boxShadow: destacado ? `0 0 ${30 + 40 * brillo}px rgba(255,77,141,${0.3 + 0.5 * brillo})` : "none",
          transform: `scale(${1 + 0.08 * brillo})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -40,
          width: w + 80,
          textAlign: "center",
          top: positivo ? cero - h - 56 : cero + h + 12,
          fontFamily: fonts.display,
          fontSize: destacado ? 46 + 10 * brillo : 36,
          fontWeight: 800,
          color: destacado ? colors.pink : colors.text,
          whiteSpace: "nowrap",
        }}
      >
        {valor > 0 ? "+" : "−"}
        {fmt(Math.abs(valor) * Math.min(1, p))}%
      </div>
      <div style={{ position: "absolute", left: 0, width: w, textAlign: "center", top: positivo ? cero + 16 : cero - 56, fontFamily: fonts.display, fontSize: 44, fontWeight: 800, color: colors.dim }}>
        {letra}
      </div>
    </div>
  );
};

// Qué significa para una persona: saldo, pensión y cuántas personas.
export const Personas: React.FC = () => {
  const cSaldo = useCueAt("saldo", 0.4);
  const cMenos = useCueAt("saldo", 0.75);
  const cPension = useCueAt("pension", 0.3);
  const cQueda = useCueAt("pension", 0.7);
  const cPersonas = useCue("personas");
  const fila = (at: number, icono: React.ReactNode, antes: string, despues: string, cDespues: number, texto: string) => (
    <Pop at={at} from="left">
      <Glass style={{ display: "flex", alignItems: "center", gap: 24, padding: "24px 30px" }}>
        <div style={{ width: 150, display: "flex", justifyContent: "center" }}>{icono}</div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ ...big, fontSize: 64, letterSpacing: -2, color: colors.dim }}>{antes}</div>
            <Pop at={cDespues} from="left" style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ transform: "rotate(90deg)" }}>
                <Flecha up color={colors.pink} size={44} />
              </div>
              <div style={{ ...big, fontSize: 72, letterSpacing: -3 }}>
                <GradientText gradient={gradients.warm}>{despues}</GradientText>
              </div>
            </Pop>
          </div>
          <Note style={{ fontSize: 30, marginTop: 4 }}>{texto}</Note>
        </div>
      </Glass>
    </Pop>
  );
  return (
    <SceneShell entrada="tilt" source={`${calculo.fuente} · ${fondos.fuente}`}>
      <Title at={useCue("saldo")} gradient={gradients.gold} size={104}>
        Para una persona
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 10 }}>
        {fila(cSaldo, <Moneda size={120} />, pesos(calculo.saldoEjemplo / 1_000_000) + " M", `−${pesos(Math.round(calculo.perdidaEjemplo / 100_000) / 10)} M`, cMenos, "ahorro de ejemplo")}
        {fila(cPension, <Jubilado size={130} />, pesos(calculo.pensionAntes), pesos(calculo.pensionDespues), cQueda, "pensión en retiro programado")}
      </div>
      <Pop at={cPersonas} from="zoom" style={{ marginTop: 44, display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex" }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ marginLeft: i ? -40 : 0 }}>
              <Persona size={120} paleta={i % 2 ? paletas.frio : paletas.calido} />
            </div>
          ))}
        </div>
        <div>
          <div style={{ ...big, fontSize: 96, letterSpacing: -4 }}>
            <GradientText gradient={gradients.warm}>
              <Counter to={fondos.afiliadosE / 1000} at={cPersonas} duration={30} decimals={0} /> mil
            </GradientText>
          </div>
          <Note style={{ fontSize: 32 }}>personas en el fondo E</Note>
        </div>
      </Pop>
    </SceneShell>
  );
};

const BonoFila: React.FC<{ plazo: number; at: number; sube: number }> = ({ plazo, at, sube }) => {
  const p = useSpring(at, { damping: 16 });
  const largo = 160 + plazo * 36;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: Math.min(1, p * 2) }}>
      <div style={{ width: 150, fontFamily: fonts.display, fontSize: 34, fontWeight: 700, color: colors.dim, whiteSpace: "nowrap" }}>{plazo} años</div>
      <div style={{ height: 60, width: largo * p, borderRadius: 16, background: gradients.cool, transform: `translateY(${sube * plazo * 2}px)` }} />
      <div style={{ ...big, fontSize: 48, letterSpacing: -2, color: colors.pink, opacity: sube }}>−{plazo}%</div>
    </div>
  );
};

// La regla de duración: a más plazo, más caída por cada punto de tasa.
export const Calculo: React.FC = () => {
  const frame = useCurrentFrame();
  const cRegla = useCue("regla");
  const cDur = useCue("duracion");
  const cAlarga = useCueAt("duracion", 0.6);
  const cCatorce = useCueAt("catorce", 0.5);
  const alarga = useEase(cAlarga, 36);
  const dur = interpolate(alarga, [0, 1], [fondos.duracionAntes, fondos.duracionSwaps]);
  const W = 900;
  const sube = useEase(cRegla + 14, 30);
  return (
    <SceneShell entrada="rise" source="Cálculo propio: caída ≈ duración × alza de tasa · La Tercera">
      <Title at={cRegla} gradient={gradients.cool} size={104} sub="si la tasa sube 1 punto, el bono cae…">
        La regla
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 10 }}>
        <BonoFila plazo={2} at={cRegla + 6} sube={sube} />
        <BonoFila plazo={8} at={cRegla + 12} sube={sube} />
        <BonoFila plazo={14} at={cRegla + 18} sube={sube} />
      </div>
      <Pop at={cDur} style={{ marginTop: 80 }}>
        <Note style={{ fontSize: 32 }}>plazo del fondo E</Note>
        <div style={{ position: "relative", height: 70, width: W, marginTop: 10 }}>
          <div style={{ position: "absolute", left: 0, top: 10, height: 50, width: (dur / 16) * 620, borderRadius: 16, background: gradients.gold, boxShadow: `0 0 ${30 * alarga}px ${colors.gold}` }} />
          <div style={{ position: "absolute", left: (dur / 16) * 620 + 20, top: 0, ...big, fontSize: 70, letterSpacing: -2, whiteSpace: "nowrap" }}>{Math.round(dur)} años</div>
        </div>
      </Pop>
      <Pop at={cCatorce} from="zoom" style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ ...big, fontSize: 150, letterSpacing: -7 }}>
          <GradientText gradient={gradients.warm}>−{calculo.caidaPorPunto}%</GradientText>
        </div>
        <Note style={{ fontSize: 34, maxWidth: 420 }}>por cada punto de alza en la tasa</Note>
        <div style={{ opacity: 0.6, transform: `rotate(${Math.sin(frame * 0.1) * 6}deg)` }}>
          <Intercambio size={110} />
        </div>
      </Pop>
    </SceneShell>
  );
};

// ¿Se podía ver antes? Tres fuentes que lo mostraban.
export const Verlo: React.FC = () => {
  const frame = useCurrentFrame();
  const cVerlo = useCue("verlo");
  const cSuper = useCue("super");
  const cCentral = useCue("central");
  const cPrivado = useCue("privado");
  const abre = useEase(cVerlo + 10, 20);
  const fila = (at: number, ilus: React.ReactNode, texto: string, sub: string) => (
    <Pop at={at} from="right">
      <Glass style={{ display: "flex", alignItems: "center", gap: 26, padding: "22px 30px", height: 200 }}>
        <div style={{ width: 180, display: "flex", justifyContent: "center" }}>{ilus}</div>
        <div>
          <Etiq color={colors.text} size={42}>
            {texto}
          </Etiq>
          <Note style={{ fontSize: 28, marginTop: 4 }}>{sub}</Note>
        </div>
      </Glass>
    </Pop>
  );
  return (
    <SceneShell entrada="slide" source={alertas.fuente}>
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <Pop at={cVerlo} from="zoom">
          <Ojo size={180} cerrado={1 - abre} />
        </Pop>
        <Title at={cVerlo + 4} gradient={gradients.cool} size={100}>
          ¿Se podía ver?
        </Title>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 10 }}>
        {fila(cSuper, <Documento size={130} />, "Superintendencia", "posición en derivados, cada mes")}
        {fila(
          cCentral,
          <Float>
            <Alerta size={130} />
          </Float>,
          "Banco Central",
          "dos Informes de Estabilidad Financiera",
        )}
        {fila(
          cPrivado,
          <div style={{ display: "flex", gap: -10 }}>
            <Edificio size={110} paleta={paletas.calido} />
            <div style={{ ...big, fontSize: 90, color: colors.gold, transform: `rotate(${Math.sin(frame * 0.15) * 8}deg)` }}>?</div>
          </div>,
          "las propias AFP",
          "pidieron límites en privado",
        )}
      </div>
    </SceneShell>
  );
};

// Efecto manada: siete edificios que se mueven juntos y caen casi igual.
export const Manada: React.FC = () => {
  const frame = useCurrentFrame();
  const cManada = useCue("manada");
  const cCastiga = useCueAt("manada", 0.55);
  const cIguales = useCue("iguales");
  const cPierden = useCueAt("iguales", 0.55);
  const mueve = Math.sin(frame * 0.08) * 60;
  const castiga = useSpring(cCastiga, { damping: 10 });
  const caen = useEase(cPierden, 36);
  const afps = Object.entries(alertas.porAFP);
  return (
    <SceneShell entrada="zoom" source={alertas.fuente}>
      <Title at={cManada} gradient={gradients.warm} size={110}>
        Efecto manada
      </Title>
      <div style={{ position: "relative", height: 300, marginTop: 10 }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Pop key={i} at={cManada + 6 + i * 3} from="up" style={{ position: "absolute", left: 20 + i * 125 + mueve, top: 60 + Math.sin(i) * 12 }}>
            <Edificio size={120} paleta={i === 3 ? paletas.cobre : paletas.frio} />
          </Pop>
        ))}
        <div
          style={{
            position: "absolute",
            left: 20 + 3 * 125 + mueve + 10,
            top: -10,
            opacity: castiga,
            transform: `translateY(${(1 - castiga) * 40}px)`,
          }}
        >
          <Alerta size={90} paleta={paletas.calido} />
        </div>
        <Pop at={cCastiga} style={{ position: "absolute", left: 0, right: 0, top: 220, textAlign: "center" }}>
          <Note style={{ fontSize: 32 }}>alejarse del promedio se castiga</Note>
        </Pop>
      </div>
      <Pop at={cIguales} style={{ marginTop: 30 }}>
        <Note style={{ fontSize: 32, marginBottom: 14 }}>caída del fondo E por AFP · enero a septiembre</Note>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {afps.map(([nombre, v]) => (
            <div key={nombre} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 160, fontFamily: fonts.display, fontSize: 34, fontWeight: 700, color: colors.dim }}>{nombre}</div>
              <div style={{ height: 56, width: (Math.abs(v) / 12) * 560 * caen, borderRadius: 16, background: gradients.warm, opacity: 0.85 }} />
              <div style={{ ...big, fontSize: 52, letterSpacing: -2, opacity: caen }}>−{fmt(Math.abs(v) * caen)}%</div>
            </div>
          ))}
        </div>
      </Pop>
    </SceneShell>
  );
};

// Qué hacer: tres consejos con íconos.
export const Mitigar: React.FC = () => {
  const frame = useCurrentFrame();
  const cPanico = useCue("panico");
  const cNo = useCueAt("panico", 0.45);
  const cRetiro = useCue("retiro");
  const cFija = useCueAt("retiro", 0.75);
  const cPost = useCue("postergar");
  const giro = interpolate(frame, [cPost + 6, cPost + 50], [0, 180], clamp);
  const tarjeta = (at: number, n: string, ilus: React.ReactNode, texto: string, sub: string) => (
    <Pop at={at} from="up">
      <Glass style={{ display: "flex", alignItems: "center", gap: 24, padding: "20px 28px", height: 210 }}>
        <div style={{ ...big, fontSize: 90, width: 70 }}>
          <GradientText gradient={gradients.cool}>{n}</GradientText>
        </div>
        <div style={{ width: 200, display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>{ilus}</div>
        <div>
          <Etiq color={colors.text} size={40}>
            {texto}
          </Etiq>
          <Note style={{ fontSize: 28, marginTop: 4 }}>{sub}</Note>
        </div>
      </Glass>
    </Pop>
  );
  return (
    <SceneShell entrada="rise" source="Recomendaciones de expertos citados en prensa · no es asesoría personal">
      <Title at={cPanico} gradient={gradients.cool} size={104}>
        ¿Qué hacer?
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 10 }}>
        {tarjeta(
          cNo,
          "1",
          <div style={{ position: "relative" }}>
            <Intercambio size={120} paleta={paletas.calido} />
            <div style={{ position: "absolute", left: 20, top: 10, ...big, fontSize: 110, color: colors.pink }}>✕</div>
          </div>,
          "no cambiarse por pánico",
          "la pérdida solo se hace real si vendes",
        )}
        {tarjeta(
          cRetiro,
          "2",
          <>
            <Jubilado size={110} />
            <Pop at={cFija} from="zoom">
              <Candado size={90} />
            </Pop>
          </>,
          "retiro programado",
          "la renta vitalicia fija la pérdida",
        )}
        {tarjeta(
          cPost,
          "3",
          <div style={{ transform: `rotate(${giro}deg)` }}>
            <RelojArena size={120} />
          </div>,
          "postergar unos meses",
          "si puedes",
        )}
      </div>
    </SceneShell>
  );
};

// ¿Puede pasar de nuevo? El nuevo límite frente al alza real.
export const DeNuevo: React.FC = () => {
  const frame = useCurrentFrame();
  const cLimite = useCue("limite");
  const cDos = useCueAt("limite", 0.55);
  const cTriple = useCue("triple");
  const cTres = useCueAt("triple", 0.6);
  const cSigue = useCue("sigue");
  const crece = useEase(cTriple + 4, 40);
  const W = 900;
  const escala = W / 1.3;
  const real = interpolate(crece, [0, 1], [alertas.escenarioPP, alertas.alzaRealPP]);
  const mueve = Math.sin(frame * 0.08) * 30;
  return (
    <SceneShell entrada="tilt" source={`${alertas.fuente} · ${calculo.fuente}`}>
      <Title at={cLimite} gradient={gradients.gold} size={104} sub={`nuevo límite desde el ${alertas.vigencia}`}>
        ¿De nuevo?
      </Title>
      <Pop at={cDos} from="left" style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Documento size={120} />
        <div>
          <div style={{ ...big, fontSize: 96, letterSpacing: -4 }}>
            <GradientText gradient={gradients.cool}>máx. −{alertas.limitePerdida}%</GradientText>
          </div>
          <Note style={{ fontSize: 32 }}>si la tasa sube {fmt(alertas.escenarioPP)} puntos</Note>
        </div>
      </Pop>
      <Pop at={cTriple} style={{ marginTop: 40 }}>
        <Note style={{ fontSize: 32 }}>alza de la tasa en 2026</Note>
        <div style={{ position: "relative", height: 120, width: W, marginTop: 10 }}>
          <div style={{ position: "absolute", left: 0, top: 20, height: 50, width: alertas.escenarioPP * escala, borderRadius: 14, background: gradients.cool }} />
          <div style={{ position: "absolute", left: 0, top: 20, height: 50, width: real * escala, borderRadius: 14, background: gradients.warm, opacity: crece > 0 ? 0.9 : 0, boxShadow: `0 0 ${40 * crece}px rgba(255,77,141,0.6)` }} />
          <div style={{ position: "absolute", left: alertas.escenarioPP * escala - 30, top: 78, fontSize: 28, fontWeight: 700, color: colors.cyan, whiteSpace: "nowrap" }}>escenario {fmt(alertas.escenarioPP)}</div>
          <div style={{ position: "absolute", left: real * escala + 16, top: 18, ...big, fontSize: 60, letterSpacing: -2, whiteSpace: "nowrap", opacity: crece }}>{fmt(real, 2)}</div>
        </div>
      </Pop>
      <Pop at={cTres} from="zoom" style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 10 }}>
        <div style={{ ...big, fontSize: 130, letterSpacing: -6 }}>
          <GradientText gradient={gradients.warm}>{fmt(calculo.vecesEscenario)}×</GradientText>
        </div>
        <Note style={{ fontSize: 34, maxWidth: 460 }}>el escenario de la norma</Note>
      </Pop>
      <Pop at={cSigue} style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 10 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ transform: `translateX(${mueve}px)` }}>
            <Edificio size={90} paleta={paletas.frio} />
          </div>
        ))}
        <Note style={{ fontSize: 30, marginLeft: 20 }}>la manada sigue</Note>
      </Pop>
    </SceneShell>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const frame = useCurrentFrame();
  const cLeccion = useCue("leccion");
  const cDatos = useCue("datos");
  const cCta = useCue("cta");
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.18);
  const abre = useEase(cDatos + 4, 24);
  return (
    <SceneShell entrada="zoom">
      <Title at={cLeccion} gradient={gradients.gold} size={104}>
        Conservador ≠ sin riesgo
      </Title>
      <Pop at={cLeccion + 10} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 30, marginTop: 10 }}>
        <Jubilado size={180} />
        <Float>
          <Intercambio size={140} paleta={paletas.calido} />
        </Float>
      </Pop>
      <Pop at={cDatos} style={{ marginTop: 40 }}>
        <Glass style={{ display: "flex", alignItems: "center", gap: 24, padding: "26px 32px" }}>
          <Ojo size={130} cerrado={1 - abre} />
          <Documento size={110} />
          <div>
            <Etiq color={colors.text} size={40}>
              los datos estaban
            </Etiq>
            <Note style={{ fontSize: 30 }}>publicados cada mes</Note>
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
