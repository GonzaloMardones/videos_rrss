import React from "react";
import { Check, Dices, EyeOff, Phone, Repeat, Ruler, Shuffle, Target, Users } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Formula, Op, serif } from "../../estilos/vacio/mate";
import { c, Panel, ROJO } from "../../estilos/vacio/causal";
import { Flecha, Lienzo, Nodo, type P } from "../../estilos/vacio/grafo";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 17/17";
const IND = v.azafran; // camino indirecto
const DIR = c.c; // camino directo

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

const T: P = [140, 330];
const M: P = [456, 110];
const Y: P = [772, 330];

// El grafo de mediación: capacitación → llamadas → ventas, y el camino directo.
const Mediacion: React.FC<{ at: number; etiquetas?: { a?: number; b?: number; c?: number }; resalte?: boolean; u?: number }> = ({ at, etiquetas = {}, resalte, u }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (a: number) => transicion(frame, a, fps, 500, EXPO_OUT);
  const f = (a: number) => transicion(frame, a, fps, 600, EXPO_IN_OUT);
  const U: P = [456, -60];
  const et = (a: number | undefined, x: number, y: number, txt: string, col: string) =>
    a !== undefined && frame >= a ? (
      <text x={x} y={y} textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize={40} fill={col} opacity={t(a)}>
        {txt}
      </text>
    ) : null;
  return (
    <Lienzo alto={440}>
      <Flecha de={T} a={M} k={f(at + 14)} color={resalte ? IND : v.ceniza} ancho={resalte ? 6 : 4} />
      <Flecha de={M} a={Y} k={f(at + 20)} color={resalte ? IND : v.ceniza} ancho={resalte ? 6 : 4} />
      <Flecha de={T} a={Y} k={f(at + 28)} color={resalte ? DIR : v.ceniza} ancho={resalte ? 6 : 4} />
      {u !== undefined && frame >= u ? (
        <g>
          <Flecha de={U} a={M} k={f(u + 10)} color={ROJO} discontinua />
          <Flecha de={U} a={[Y[0], Y[1] - 10]} k={f(u + 16)} color={ROJO} discontinua />
          <Nodo p={U} letra="U" nombre="talento (no medido)" color={ROJO} k={t(u)} arriba oculto />
        </g>
      ) : null}
      {et(etiquetas.a, 260, 200, "a = 3", IND)}
      {et(etiquetas.b, 660, 200, "b = 2", IND)}
      {et(etiquetas.c, 456, 380, "c′ = 4", DIR)}
      <Nodo p={T} letra="T" nombre="capacitación" color={v.hueso} k={t(at)} />
      <Nodo p={M} letra="M" nombre={u !== undefined ? "" : "llamadas / día"} color={IND} k={t(at + 4)} arriba={u === undefined} />
      <Nodo p={Y} letra="Y" nombre="ventas / mes" color={c.b} k={t(at + 8)} />
    </Lienzo>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("gancho");
  const largo = useCueAt("gancho", 1) - at;
  const res = transicion(frame, at + 8, fps, 500, backOut);
  return (
    <Escena>
      <Escenario alto={560}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 190 }} at={at + 4} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 30 }}>
          <div style={{ fontFamily: serif, fontSize: 110, color: c.c, display: "inline-block", transform: `scale(${res})` }}>+10</div>
          <div style={{ fontSize: 32 }}>ventas al mes con la capacitación</div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 240, width: 912, display: "flex", gap: 16 }}>
          {[
            [Phone, "¿más llamadas?", IND, at + largo * 0.4],
            [Target, "¿mejor en cada una?", DIR, at + largo * 0.55],
          ].map(([I, txt, col, a]) => {
            const Icono = I as typeof Phone;
            return (
              <div key={txt as string} style={{ flex: 1, height: 200, borderRadius: 22, border: `2.5px solid ${col}`, background: relleno, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, opacity: transicion(frame, a as number, fps, 400, EXPO_OUT) }}>
                <Icono size={56} strokeWidth={1.5} color={col as string} />
                <div style={{ fontSize: 32 }}>{txt as string}</div>
              </div>
            );
          })}
        </div>
      </Escenario>
      <div style={{ marginTop: 10 }}>
        <Cinetico at={at + largo * 0.8} texto="Funciona. ¿Pero *por qué?*" style={{ fontSize: 88 }} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, display: "flex", justifyContent: "center" }}>
      <Constelacion at={-60} ancho={700} forma="red" cantidad={520} />
    </div>
    <div style={{ marginTop: 430 }}>
      <Rotulo at={2}>{SERIE}</Rotulo>
      <Cinetico at={6} texto="*Mediación.*" style={{ marginTop: 18, fontSize: 150 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>el porqué de un efecto · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Dos caminos ──────────────────────────────────────────────────────────────
export const Caminos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("caminos");
  const largo = useCueAt("caminos", 1) - at;
  return (
    <Escena>
      <Cabeza at={at} titulo="Dos|*caminos.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <div style={{ position: "absolute", left: 0, top: 60, width: 912, height: 460 }}>
          <Mediacion at={at} resalte={frame >= at + largo * 0.3} />
        </div>
        <div style={{ position: "absolute", left: 0, top: 560, width: 912, display: "flex", gap: 16 }}>
          {[
            ["indirecto", "pasa por las llamadas", IND, 0.35],
            ["directo", "todo lo demás", DIR, 0.75],
          ].map(([t, d, col, f]) => (
            <div key={t as string} style={{ flex: 1, borderRadius: 18, border: `2px solid ${col}`, background: relleno, padding: "14px 20px", opacity: transicion(frame, at + largo * (f as number), fps, 400, EXPO_OUT) }}>
              <div style={{ fontSize: 34, color: col as string }}>{t as string}</div>
              <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>{d as string}</div>
            </div>
          ))}
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El producto de coeficientes ──────────────────────────────────────────────
export const Producto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cA = useCue("a");
  const cB = useCue("b");
  const cS = useCue("suma");
  const largo = useCueAt("suma", 1) - cS;
  const cC = cS + largo * 0.3;
  const kBar = transicion(frame, cS + largo * 0.7, fps, 900, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cA} titulo="Indirecto|*= a · b.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <div style={{ position: "absolute", left: 0, top: 40, width: 912, height: 440 }}>
          <Mediacion at={cA - 40} etiquetas={{ a: cA + 20, b: cB + 10, c: cC }} />
        </div>
        <div style={{ position: "absolute", left: 0, top: 470 }}>
          <Formula tam={52}>
            <Entra at={cS + 4}>
              <span style={{ color: IND }}>3 × 2</span>
              <Op>+</Op>
              <span style={{ color: DIR }}>4</span>
              <Op>=</Op>10
            </Entra>
          </Formula>
        </div>
        <div style={{ position: "absolute", left: 0, top: 570, width: 912, height: 64, borderRadius: 14, overflow: "hidden", display: "flex", opacity: kBar }}>
          <div style={{ width: `${60 * kBar}%`, background: IND, display: "flex", alignItems: "center", paddingLeft: 18, fontSize: 28, color: v.vacio, fontWeight: 600 }}>60 % indirecto</div>
          <div style={{ width: `${40 * kBar}%`, background: DIR, display: "flex", alignItems: "center", paddingLeft: 18, fontSize: 28, color: v.vacio, fontWeight: 600 }}>40 % directo</div>
        </div>
        <div style={{ position: "absolute", left: 0, top: 650, fontSize: 24, fontWeight: 200, color: v.niebla, opacity: kBar }}>Baron y Kenny (1986) · caso lineal, sin interacción</div>
      </Escenario>
    </Escena>
  );
};

// ─── Resultados potenciales ───────────────────────────────────────────────────
const Pot: React.FC<{ t: string; m: string; cruzado?: boolean }> = ({ t, m, cruzado }) => (
  <span style={{ display: "inline-flex", alignItems: "center", padding: cruzado ? "0 8px" : undefined, borderRadius: 10, border: cruzado ? `2px dashed ${ROJO}` : undefined }}>
    <i>Y</i>({t}, <i>M</i>({m}))
  </span>
);

export const Contrafactual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cN = useCue("nie");
  const cU = useCue("nunca");
  const largo = useCueAt("nie", 1) - cN;
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cN} titulo="Dos mundos,|*uno nunca existe.*" tam={80} />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <div style={{ fontSize: 30, color: IND, opacity: t(cN + 6) }}>efecto indirecto natural</div>
        <Formula tam={54} style={{ marginTop: 8 }}>
          <Entra at={cN + 10}>
            <Pot t="1" m="1" />
            <Op>−</Op>
            <Pot t="1" m="0" cruzado={frame >= cU} />
          </Entra>
        </Formula>
        <div style={{ display: "flex", gap: 16, marginTop: 20, fontSize: 26, fontWeight: 200 }}>
          <div style={{ flex: 1, opacity: t(cN + largo * 0.4) }}>capacitado, con las llamadas de un capacitado</div>
          <div style={{ flex: 1, color: frame >= cU ? ROJO : v.hueso, opacity: t(cN + largo * 0.65) }}>capacitado, con las llamadas que habría hecho sin capacitación</div>
        </div>
        <div style={{ fontSize: 30, color: DIR, marginTop: 50, opacity: t(cN + largo * 0.8) }}>efecto directo natural</div>
        <Formula tam={54} style={{ marginTop: 8 }}>
          <Entra at={cN + largo * 0.85}>
            <Pot t="1" m="0" cruzado={frame >= cU} />
            <Op>−</Op>
            <Pot t="0" m="0" />
          </Entra>
        </Formula>
        <Panel caja={{ x: 0, y: 520, w: 912, h: 130 }} at={cU + 4} color={ROJO} discontinuo estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <EyeOff size={48} strokeWidth={1.5} color={ROJO} />
          <div style={{ fontSize: 30 }}>
            <i style={{ fontFamily: serif }}>Y</i>(1, <i style={{ fontFamily: serif }}>M</i>(0)) nunca se observa: la mediación siempre necesita supuestos
          </div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── La trampa: el mediador no está aleatorizado ──────────────────────────────
export const Trampa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cT = useCue("talento");
  const cF = useCue("falso");
  const largo = useCueAt("falso", 1) - cF;
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  const filas: [string, string, string, string, number][] = [
    ["total", "10", "10", c.c, 0.1],
    ["indirecto", "6", "10,5", ROJO, 0.45],
    ["directo", "4", "−0,5", ROJO, 0.7],
  ];
  return (
    <Escena>
      <Cabeza at={cT} titulo="Aleatorizaste T,|*no M.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <div style={{ position: "absolute", left: 0, top: 150, width: 912, height: 440, transform: "scale(0.78)", transformOrigin: "top center" }}>
          <Mediacion at={cT - 40} u={cT + 30} />
        </div>
        <div style={{ position: "absolute", left: 0, top: 330, display: "flex", alignItems: "center", gap: 10, fontFamily: mono, fontSize: 24, color: v.niebla, opacity: t(cT + 10) }}>
          <Dices size={28} strokeWidth={1.6} color={v.niebla} /> al azar
        </div>
        <div style={{ position: "absolute", left: 0, top: 500, width: 912 }}>
          <div style={{ display: "flex", fontSize: 24, color: v.niebla, fontFamily: mono, opacity: t(cF) }}>
            <div style={{ width: 300 }} />
            <div style={{ flex: 1 }}>verdad</div>
            <div style={{ flex: 1 }}>estimado</div>
          </div>
          {filas.map(([n, ver, est, col, f]) => (
            <div key={n} style={{ display: "flex", alignItems: "baseline", marginTop: 10, opacity: t(cF + largo * f) }}>
              <div style={{ width: 300, fontSize: 32 }}>{n}</div>
              <div style={{ flex: 1, fontFamily: serif, fontSize: 48 }}>{ver}</div>
              <div style={{ flex: 1, fontFamily: serif, fontSize: 48, color: col }}>{est}</div>
            </div>
          ))}
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Cuidado ──────────────────────────────────────────────────────────────────
export const Cuidado: React.FC = () => {
  const cO = useCue("ojo");
  const largo = useCueAt("ojo", 1) - cO;
  const items: [typeof Ruler, string, string, number][] = [
    [Users, "mide los confusores de M → Y", "experiencia, talento, cartera", 0.04],
    [Ruler, "análisis de sensibilidad", "¿cuánto confusor borraría el indirecto?", 0.2],
    [Repeat, "bootstrap para el intervalo", "a · b no se distribuye normal", 0.35],
    [Shuffle, "¿hay interacción T × M?", "usa las definiciones contrafactuales", 0.65],
  ];
  return (
    <Escena>
      <Cabeza at={cO} titulo="Para que|*sea creíble.*" />
      <Escenario alto={660} style={{ marginTop: 34 }}>
        {items.map(([I, t, d, f], i) => (
          <Panel key={t} caja={{ x: 0, y: i * 140, w: 912, h: 124 }} at={cO + largo * f} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
            <I size={46} strokeWidth={1.5} color={c.c} />
            <div>
              <div style={{ fontSize: 34 }}>{t}</div>
              <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 4 }}>{d}</div>
            </div>
          </Panel>
        ))}
      </Escenario>
    </Escena>
  );
};

// ─── El mapa completo ─────────────────────────────────────────────────────────
const IDEAS = ["MDE", "CUPED", "mirar antes", "comparaciones múltiples", "SRM", "métricas de guarda", "interferencia", "ATE · ATT · LATE", "HTE / CATE", "uplift", "bandits", "control sintético", "series interrumpidas", "grafos causales", "E-value", "double ML", "mediación"];

export const Mapa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("mapa");
  const largo = useCueAt("mapa", 1) - at;
  return (
    <Escena>
      <Cabeza at={at} titulo="El mapa,|*completo.*" />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, width: 912 }}>
          {IDEAS.map((idea, i) => {
            const ult = i === IDEAS.length - 1;
            const k = transicion(frame, at + 8 + (i * largo * 0.6) / IDEAS.length, fps, 350, EXPO_OUT);
            return (
              <div key={idea} style={{ height: 74, borderRadius: 14, border: `2px solid ${ult ? v.azafran : "#2A2A33"}`, background: relleno, display: "flex", alignItems: "center", gap: 12, padding: "0 14px", opacity: k, transform: `scale(${0.9 + 0.1 * k})` }}>
                <span style={{ fontFamily: mono, fontSize: 22, color: ult ? v.azafran : c.b }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 24, lineHeight: 1.1 }}>{idea}</span>
              </div>
            );
          })}
        </div>
      </Escenario>
    </Escena>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const cCta = useCue("cta");
  return (
    <Escena>
      <div style={{ position: "absolute", left: -80, right: -80, top: -110, display: "flex", justifyContent: "center" }}>
        <Constelacion at={cCta - 30} ancho={560} forma="cerebro" desde="red" cambio={cCta} />
      </div>
      <div style={{ marginTop: 300 }}>
        <Cinetico at={cCta} texto="Saber *que* funciona.|Saber *por qué.*" style={{ fontSize: 88 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> serie completa: 17/17
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
