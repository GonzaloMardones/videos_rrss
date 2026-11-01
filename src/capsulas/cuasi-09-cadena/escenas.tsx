import React from "react";
import { Check, FileCode2, Timer, HelpCircle } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Formula, Op, serif } from "../../estilos/vacio/mate";
import { c, Nota, Panel, ROJO } from "../../estilos/vacio/causal";
import { Flecha, Lienzo, Nodo, type P } from "../../estilos/vacio/grafo";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Codigo, Escenario, mono } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "Cuasi-experimentos · 09";
const IND = v.azafran;
const DIR = c.c;

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("gancho");
  const largo = useCueAt("gancho", 1) - at;
  const res = transicion(frame, at + largo * 0.3, fps, 500, backOut);
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  return (
    <Escena>
      <Escenario alto={560}>
        <div style={{ fontSize: 30, color: v.niebla, opacity: t(at) }}>flujo de créditos · nuevo agente de verificación de identidad</div>
        <div style={{ position: "absolute", left: 0, top: 60, display: "flex", alignItems: "baseline", gap: 20 }}>
          <span style={{ fontFamily: serif, fontSize: 140, color: c.c, display: "inline-block", transform: `scale(${res})`, transformOrigin: "left" }}>+5</span>
          <span style={{ fontSize: 32, opacity: res }}>puntos de conversión</span>
        </div>
        <div style={{ position: "absolute", left: 0, top: 300, width: 912, display: "flex", gap: 16 }}>
          {[
            [Timer, "¿más rápido?", IND, 0.55],
            [HelpCircle, "¿o algo más?", DIR, 0.75],
          ].map(([I, txt, col, f]) => {
            const Icono = I as typeof Timer;
            return (
              <div key={txt as string} style={{ flex: 1, height: 170, borderRadius: 22, border: `2.5px solid ${col}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, opacity: t(at + largo * (f as number)) }}>
                <Icono size={54} strokeWidth={1.5} color={col as string} />
                <div style={{ fontSize: 32 }}>{txt as string}</div>
              </div>
            );
          })}
        </div>
      </Escenario>
      <div style={{ marginTop: 10 }}>
        <Cinetico at={at + largo * 0.85} texto="¿Por dónde|*pasó el efecto?*" style={{ fontSize: 92 }} />
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
      <Cinetico at={6} texto="¿Qué agente|*causó la mejora?*" style={{ marginTop: 18, fontSize: 116 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>mediación con trazas en un flujo de créditos · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── La cadena y sus trazas ───────────────────────────────────────────────────
const SPANS: [string, number, number, number, string][] = [
  ["orquestador", 0, 100, 100, v.niebla],
  ["verificación", 4, 52, 22, v.azafran],
  ["riesgo", 54, 78, 46, c.b],
  ["oferta", 80, 98, 70, c.c],
];

export const Cadena: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("cadena");
  const cT = useCue("trazas");
  const kN = transicion(frame, cT + 30, fps, 1200, EXPO_IN_OUT);
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const px = (x: number) => 180 + (x / 100) * 720;
  return (
    <Escena>
      <Cabeza at={cC} titulo="Una cadena|*de agentes.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {SPANS.map(([n, , , , col], i) => (
            <React.Fragment key={n}>
              <div style={{ padding: "16px 14px", borderRadius: 16, border: `2px solid ${col}`, fontSize: 24, opacity: t(cC + 6 + i * 10) }}>{n}</div>
              {i < 3 ? <span style={{ fontFamily: mono, fontSize: 18, color: v.ceniza, opacity: t(cC + 12 + i * 10) }}>A2A→</span> : null}
            </React.Fragment>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: 130, fontFamily: mono, fontSize: 24, color: v.niebla, opacity: t(cT) }}>traza de una solicitud (minutos)</div>
        <svg width={912} height={330} style={{ position: "absolute", left: 0, top: 180, overflow: "visible", opacity: t(cT) }}>
          {SPANS.map(([n, a, b, nb, col], i) => {
            const fin = b + (nb - b) * (i === 1 ? kN : 0);
            return (
              <g key={n}>
                <text x={0} y={i * 70 + 36} fontFamily={mono} fontSize={22} fill={v.niebla}>
                  {n}
                </text>
                <rect x={px(a)} y={i * 70 + 10} width={Math.max(4, px(i === 1 ? fin : b) - px(a))} height={40} rx={8} fill={col} opacity={0.85} />
              </g>
            );
          })}
          <text x={px(26)} y={1 * 70 + 38} fontFamily={mono} fontSize={22} fill={v.azafran} opacity={kN}>
            versión nueva: 30 min menos
          </text>
        </svg>
        <Nota at={cT + 60} color={v.azafran} tam={26} style={{ position: "absolute", left: 0, top: 540 }}>
          quién pidió, cuánto tardó, qué devolvió: los datos de un análisis de mediación
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Indirecto y directo ──────────────────────────────────────────────────────
const T: P = [140, 340];
const M: P = [456, 120];
const Y: P = [772, 340];

export const Mediacion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cD = useCue("divide");
  const cC = useCue("cuenta");
  const largo = useCueAt("cuenta", 1) - cC;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const f = (a: number) => transicion(frame, a, fps, 600, EXPO_IN_OUT);
  const res = transicion(frame, cC + largo * 0.6, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cD} titulo="Indirecto|*y directo.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <Lienzo alto={440}>
          <Flecha de={T} a={M} k={f(cD + 16)} color={IND} ancho={5} />
          <Flecha de={M} a={Y} k={f(cD + 22)} color={IND} ancho={5} />
          <Flecha de={T} a={Y} k={f(cD + 30)} color={DIR} ancho={5} />
          <text x={250} y={210} textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize={38} fill={IND} opacity={t(cC + largo * 0.1)}>
            a = −30
          </text>
          <text x={672} y={210} textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize={38} fill={IND} opacity={t(cC + largo * 0.3)}>
            b = −0,1
          </text>
          <text x={456} y={390} textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize={38} fill={DIR} opacity={t(cC + largo * 0.75)}>
            c′ = 2
          </text>
          <Nodo p={T} letra="T" nombre="agente nuevo" color={v.hueso} k={t(cD + 4)} />
          <Nodo p={M} letra="M" nombre="tiempo de decisión" color={IND} k={t(cD + 8)} arriba />
          <Nodo p={Y} letra="Y" nombre="conversión" color={c.b} k={t(cD + 12)} />
        </Lienzo>
        <div style={{ position: "absolute", left: 0, top: 470 }}>
          <Formula tam={54}>
            <Entra at={cC + largo * 0.4}>
              <span style={{ color: IND }}>(−30)·(−0,1)</span>
              <Op>+</Op>
              <span style={{ color: DIR }}>2</span>
              <Op>=</Op>
              <span style={{ fontSize: 80, display: "inline-block", transform: `scale(${res})` }}>5</span>
            </Entra>
          </Formula>
          <div style={{ display: "flex", gap: 40, marginTop: 10, fontSize: 26, opacity: t(cC + largo * 0.8) }}>
            <span style={{ color: IND }}>indirecto 3 (por el tiempo)</span>
            <span style={{ color: DIR }}>directo 2</span>
          </div>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El confusor del mediador ─────────────────────────────────────────────────
export const Confusor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("complejidad");
  const cS = useCue("sesgo");
  const largo = useCueAt("sesgo", 1) - cS;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const f = (a: number) => transicion(frame, a, fps, 600, EXPO_IN_OUT);
  const C: P = [456, -40];
  const filas: [string, string, string, string, number][] = [
    ["", "verdad", "sin complejidad", "con complejidad", 0],
    ["indirecto", "3", "8,5", "3,1", 0.15],
    ["directo", "2", "−3,5", "1,9", 0.35],
  ];
  return (
    <Escena>
      <Cabeza at={cC} titulo="Lo que confunde|*el camino.*" />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <div style={{ position: "absolute", left: 0, top: 120, width: 912, height: 440, transform: "scale(0.78)", transformOrigin: "top center" }}>
          <Lienzo alto={440}>
            <Flecha de={T} a={M} k={1} color={IND} />
            <Flecha de={M} a={Y} k={1} color={IND} />
            <Flecha de={T} a={Y} k={1} color={DIR} />
            <Flecha de={C} a={M} k={f(cC + 20)} color={ROJO} discontinua />
            <Flecha de={C} a={[Y[0], Y[1] - 10]} k={f(cC + 26)} color={ROJO} discontinua />
            <Nodo p={C} letra="C" nombre="complejidad del cliente" color={ROJO} k={t(cC + 10)} arriba oculto />
            <Nodo p={T} letra="T" color={v.hueso} k={1} />
            <Nodo p={M} letra="M" color={IND} k={1} />
            <Nodo p={Y} letra="Y" color={c.b} k={1} />
          </Lienzo>
        </div>
        <div style={{ position: "absolute", left: 0, top: 470, width: 912 }}>
          {filas.map(([n, a, b, d, fr], i) => (
            <div key={i} style={{ display: "flex", alignItems: "baseline", padding: "8px 0", borderBottom: i === 0 ? "1px solid #2A2A33" : undefined, opacity: t(cS + largo * fr) }}>
              <div style={{ width: 200, fontSize: 28 }}>{n}</div>
              {[a, b, d].map((x, j) => (
                <div key={j} style={{ flex: 1, fontFamily: i === 0 ? mono : serif, fontSize: i === 0 ? 22 : 46, color: i === 0 ? v.niebla : [v.hueso, ROJO, c.c][j] }}>
                  {x}
                </div>
              ))}
            </div>
          ))}
          <Nota at={cS + largo * 0.7} color={v.azafran} tam={26} style={{ marginTop: 14 }}>
            aleatorizar el agente no aleatoriza el tiempo
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Muchos caminos ───────────────────────────────────────────────────────────
export const Caminos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("caminos");
  const largo = useCueAt("caminos", 1) - at;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const f = (a: number) => transicion(frame, a, fps, 600, EXPO_IN_OUT);
  const A: P = [100, 260];
  const B: P = [340, 100];
  const D: P = [580, 100];
  const Z: P = [812, 260];
  return (
    <Escena>
      <Cabeza at={at} titulo="Más agentes,|*más caminos.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <Lienzo alto={420}>
          <Flecha de={A} a={B} k={f(at + 10)} color={IND} />
          <Flecha de={B} a={D} k={f(at + 16)} color={IND} />
          <Flecha de={D} a={Z} k={f(at + 22)} color={IND} />
          <Flecha de={B} a={Z} k={f(at + largo * 0.35)} color={c.b} />
          <Flecha de={A} a={D} k={f(at + largo * 0.45)} color={c.b} />
          <Flecha de={A} a={Z} k={f(at + largo * 0.55)} color={DIR} />
          <Nodo p={A} letra="T" nombre="agente nuevo" color={v.hueso} k={t(at + 4)} />
          <Nodo p={B} letra="M₁" nombre="tiempo" color={IND} k={t(at + 6)} arriba />
          <Nodo p={D} letra="M₂" nombre="puntaje de riesgo" color={IND} k={t(at + 8)} arriba />
          <Nodo p={Z} letra="Y" nombre="conversión" color={c.b} k={t(at + 10)} />
        </Lienzo>
        <Nota at={at + largo * 0.6} color={v.azafran} tam={28} style={{ position: "absolute", left: 0, top: 440 }}>
          efectos específicos por camino: cuánto pasa por cada agente
        </Nota>
        <Nota at={at + largo * 0.75} color={ROJO} tam={26} style={{ position: "absolute", left: 0, top: 500 }}>
          pero cada camino agrega un supuesto de no confusión
        </Nota>
        <Nota at={at + largo * 0.85} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 570 }}>
          Avin, Shpitser y Pearl (2005), «Identifiability of path-specific effects», IJCAI
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── En la práctica ───────────────────────────────────────────────────────────
export const Practica: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useCue("practica");
  const largo = useCueAt("practica", 1) - at;
  const K = "#C792EA";
  const S = "#C3E88D";
  const resaltar = frame >= at + largo * 0.7 ? [5, 6] : frame >= at + largo * 0.4 ? [3, 4] : frame >= at + largo * 0.1 ? [1, 2] : [];
  return (
    <Escena>
      <Cabeza at={at} titulo="Instrumenta|*la cadena.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <Codigo
          caja={{ x: 0, y: 0, w: 912, h: 430 }}
          at={at + 6}
          archivo="span-verificacion.json"
          Icono={FileCode2}
          tam={24}
          resaltar={resaltar}
          lineas={[
            [["{", v.hueso]],
            [["  trace_id", K], [": "], ['"4bf92f35…"', S], [",  ", v.niebla], ["// se propaga entre agentes", "#6B7280"]],
            [["  agente", K], [": "], ['"verificacion-v2"', S], [","]],
            [["  inicio", K], [": "], ['"10:02:11"', S], [", "], ["fin", K], [": "], ['"10:14:40"', S], [","]],
            [["  duracion_min", K], [": "], ["12.5", c.c], [",  ", v.niebla], ["// el mediador", "#6B7280"]],
            [["  cliente", K], [": { "], ["productos", K], [": 3, "], ["antiguedad", K], [": 7 },"]],
            [["  ", v.niebla], ["// los confusores que el agente usó", "#6B7280"]],
            [["}", v.hueso]],
          ]}
        />
        <Panel caja={{ x: 0, y: 460, w: 912, h: 130 }} at={at + largo * 0.8} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Check size={44} strokeWidth={2} color={c.c} />
          <div style={{ fontSize: 28 }}>con trazas propagadas tienes el grafo, el mediador y los confusores</div>
        </Panel>
        <Nota at={at + largo * 0.9} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 610 }}>
          propagación de contexto: estándar W3C Trace Context · OpenTelemetry
        </Nota>
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
        <Cinetico at={cCta} texto="Las trazas dicen *por dónde.*|Los confusores, *si es cierto.*" style={{ fontSize: 74 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próximo: 10 · el modelo de lenguaje como juez
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
