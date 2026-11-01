import React from "react";
import { Building2, Check, FileCode2, Headset, Landmark, ShieldAlert, Wallet } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Formula, Op, serif, Sub } from "../../estilos/vacio/mate";
import { c, Nota, Panel, ROJO } from "../../estilos/vacio/causal";
import { Flecha, Lienzo } from "../../estilos/vacio/grafo";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Codigo, Escenario, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "Cuasi-experimentos · 08";
const NUEVO = c.c;
const VIEJO = v.niebla;

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

const Barra: React.FC<{ lab: string; val: number; max: number; col: string; k: number; sufijo?: string }> = ({ lab, val, max, col, k, sufijo = " min" }) => (
  <div style={{ marginTop: 20, opacity: Math.min(1, k * 2) }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
      <span>{lab}</span>
      <span style={{ fontFamily: serif, fontSize: 44, color: col }}>
        {(val * k).toFixed(1).replace(".", ",")}
        {sufijo}
      </span>
    </div>
    <div style={{ height: 36, borderRadius: 10, background: "#16161B", marginTop: 8 }}>
      <div style={{ height: 36, width: `${(val / max) * 100 * k}%`, borderRadius: 10, background: col }} />
    </div>
  </div>
);

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cA = useCue("ab");
  const cD = useCue("desaparece");
  const largo = useCueAt("ab", 1) - cA;
  const t = (a: number) => transicion(frame, a, fps, 700, EXPO_OUT);
  const res = transicion(frame, cA + largo * 0.7, fps, 500, backOut);
  return (
    <Escena>
      <Escenario alto={660}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, opacity: t(cA) }}>
          <ShieldAlert size={42} strokeWidth={1.5} color={v.azafran} /> espera hasta resolver una alerta de fraude
        </div>
        <div style={{ position: "absolute", left: 0, top: 50, width: 912 }}>
          <div style={{ fontFamily: mono, fontSize: 22, color: v.niebla, marginTop: 10, opacity: t(cA + 10) }}>prueba A/B por caso</div>
          <Barra lab="agente antiguo" val={17.9} max={20} col={VIEJO} k={t(cA + largo * 0.3)} />
          <Barra lab="agente nuevo" val={10.5} max={20} col={NUEVO} k={t(cA + largo * 0.5)} />
        </div>
        <div style={{ position: "absolute", left: 0, top: 290, fontFamily: serif, fontSize: 64, color: NUEVO, opacity: Math.min(1, res) }}>−41 % en la prueba</div>
        <div style={{ position: "absolute", left: 0, top: 390, width: 912, opacity: t(cD) }}>
          <div style={{ fontFamily: mono, fontSize: 22, color: v.niebla }}>lanzamiento a todos</div>
          <Barra lab="antes" val={13.0} max={20} col={VIEJO} k={t(cD + 4)} />
          <Barra lab="después" val={12.8} max={20} col={ROJO} k={t(cD + 14)} />
        </div>
      </Escenario>
      <div style={{ marginTop: 10 }}>
        <Cinetico at={cD + 30} texto="La mejora *desapareció.*" style={{ fontSize: 90 }} />
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
      <Cinetico at={6} texto="Interferencia|*entre agentes.*" style={{ marginTop: 18, fontSize: 124 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>alertas de fraude en un banco · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Dos agentes y una fila ───────────────────────────────────────────────────
const CASOS = Array.from({ length: 12 }, (_, i) => ({ nuevo: i % 2 === 0, urgente: i % 2 === 0 ? i % 4 !== 2 : i % 6 === 3 }));

export const Pipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cD = useCue("dos");
  const cF = useCue("fila");
  const k = transicion(frame, cF + 20, fps, 1200, EXPO_IN_OUT);
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const orden = [...CASOS.keys()].sort((a, b) => Number(CASOS[b].urgente) - Number(CASOS[a].urgente) || a - b);
  return (
    <Escena>
      <Cabeza at={cD} titulo="Dos agentes,|*una fila.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <Lienzo alto={200}>
          <Flecha de={[230, 80]} a={[682, 80]} k={transicion(frame, cD + 30, fps, 700, EXPO_IN_OUT)} color={v.azafran} r={150} />
          <text x={456} y={60} textAnchor="middle" fontFamily={mono} fontSize={22} fill={v.azafran} opacity={t(cD + 40)}>
            A2A
          </text>
        </Lienzo>
        <Panel caja={{ x: 0, y: 20, w: 360, h: 130 }} at={cD + 6} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 16 }}>
          <ShieldAlert size={44} strokeWidth={1.5} color={v.azafran} />
          <div>
            <div style={{ fontSize: 26 }}>clasifica alertas</div>
            <div style={{ fontSize: 20, fontWeight: 200, color: v.niebla }}>marca las urgentes</div>
          </div>
        </Panel>
        <Panel caja={{ x: 552, y: 20, w: 360, h: 130 }} at={cD + 18} color={c.b} estilo={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Headset size={44} strokeWidth={1.5} color={c.b} />
          <div>
            <div style={{ fontSize: 26 }}>resuelve casos</div>
            <div style={{ fontSize: 20, fontWeight: 200, color: v.niebla }}>urgentes primero</div>
          </div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 220, fontSize: 26, color: v.niebla, opacity: t(cF) }}>fila del agente de resolución →</div>
        <div style={{ position: "absolute", left: 0, top: 270, width: 912, height: 110 }}>
          {CASOS.map((caso, i) => {
            const pos = i + (orden.indexOf(i) - i) * k;
            return (
              <div key={i} style={{ position: "absolute", left: pos * 75, top: 0, width: 66, height: 96, borderRadius: 12, background: caso.nuevo ? NUEVO : "#2A2A33", border: `3px solid ${caso.urgente ? ROJO : "transparent"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 20, color: caso.nuevo ? v.vacio : v.niebla, opacity: t(cD + 40 + i * 2) }}>
                {caso.urgente ? "!" : ""}
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 0, top: 410, display: "flex", gap: 26, fontSize: 24, opacity: t(cF) }}>
          <span>
            <span style={{ color: NUEVO }}>■</span> agente nuevo
          </span>
          <span>
            <span style={{ color: v.ceniza }}>■</span> agente antiguo
          </span>
          <span>
            <span style={{ color: ROJO }}>□</span> marcado urgente
          </span>
        </div>
        <Nota at={cF + 50} color={ROJO} tam={28} style={{ position: "absolute", left: 0, top: 480 }}>
          los casos del agente nuevo se adelantan… a costa de los del grupo de control
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El supuesto roto ─────────────────────────────────────────────────────────
export const Sutva: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("supuesto");
  const cV = useCue("vector");
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cS} titulo="No interferencia|*(SUTVA).*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 190 }} at={cS + 8} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 30 }}>
          <Formula tam={64}>
            <Entra at={cS + 10}>
              Y<Sub>i</Sub>(z<Sub>i</Sub>)
            </Entra>
          </Formula>
          <div style={{ fontSize: 28 }}>tu resultado depende solo de tu tratamiento</div>
        </Panel>
        <Panel caja={{ x: 0, y: 230, w: 912, h: 190 }} at={cV + 4} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 30 }}>
          <Formula tam={64}>
            <Entra at={cV + 6}>
              Y<Sub>i</Sub>(z<Sub>1</Sub>, …, z<Sub>n</Sub>)
            </Entra>
          </Formula>
          <div style={{ fontSize: 28 }}>con interferencia: depende de todas las asignaciones</div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 460, fontSize: 28, color: v.azafran, opacity: t(cV + 40) }}>el tiempo de un caso depende de cuántos otros son urgentes</div>
        <Nota at={cV + 60} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 530 }}>
          Cox (1958), Planning of Experiments · Rubin (1980), JASA 75(371) · Hudgens y Halloran (2008), JASA 103(482)
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Los números ──────────────────────────────────────────────────────────────
export const Numeros: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("sim");
  const cJ = useCue("johari");
  const largo = useCueAt("sim", 1) - cS;
  const t = (a: number) => transicion(frame, a, fps, 600, EXPO_OUT);
  const filas: [string, string, string, number][] = [
    ["prueba A/B por caso", "−41 %", NUEVO, 0.05],
    ["lanzamiento total", "−2 %", ROJO, 0.35],
  ];
  return (
    <Escena>
      <Cabeza at={cS} titulo="La prioridad no|*crea capacidad.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        {filas.map(([n, val, col, f], i) => (
          <Panel key={n} caja={{ x: 0, y: i * 170, w: 912, h: 150 }} at={cS + largo * f} color={col} estilo={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 32 }}>{n}</div>
            <div style={{ fontFamily: serif, fontSize: 84, color: col }}>{val}</div>
          </Panel>
        ))}
        <div style={{ position: "absolute", left: 0, top: 360, fontSize: 30, color: v.azafran, opacity: t(cS + largo * 0.7) }}>solo reordena la fila</div>
        <Nota at={cJ + 4} color={v.niebla} tam={24} style={{ position: "absolute", left: 0, top: 440 }}>
          Johari, Li, Liskovich y Weintraub (2022), Management Science 68(10): el sesgo puede ser tan grande como el efecto
        </Nota>
        <Nota at={cJ + 20} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 520 }}>
          simulación: 400 días, 200 alertas diarias, cola con prioridad
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── La solución: switchback y conglomerados ──────────────────────────────────
export const Solucion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("switch");
  const cG = useCue("grupos");
  const largo = useCueAt("switch", 1) - cS;
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cS} titulo="Aleatoriza lo|*que comparten.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <div style={{ fontFamily: mono, fontSize: 24, color: v.niebla, opacity: t(cS + largo * 0.3) }}>switchback: todo el sistema cambia por día</div>
        <div style={{ position: "absolute", left: 0, top: 50, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10, width: 912 }}>
          {Array.from({ length: 14 }, (_, i) => {
            const nuevo = [1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0][i] === 1;
            return (
              <div key={i} style={{ height: 80, borderRadius: 12, background: nuevo ? NUEVO : "#26262E", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 20, color: nuevo ? v.vacio : v.niebla, opacity: t(cS + largo * 0.35 + i * 1.5) }}>
                {nuevo ? "nuevo" : "antiguo"}
              </div>
            );
          })}
        </div>
        <Nota at={cS + largo * 0.8} color={NUEVO} tam={28} style={{ position: "absolute", left: 0, top: 250 }}>
          en la simulación da cerca de cero, como el lanzamiento real
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 320, fontFamily: mono, fontSize: 24, color: v.niebla, opacity: t(cG) }}>o por grupos completos</div>
        <div style={{ position: "absolute", left: 0, top: 370, width: 912, display: "flex", gap: 16 }}>
          {[
            [Building2, "sucursales"],
            [Landmark, "regiones"],
            [Wallet, "carteras"],
          ].map(([I, txt], i) => {
            const Icono = I as typeof Wallet;
            return (
              <div key={txt as string} style={{ flex: 1, height: 160, borderRadius: 20, border: `2px solid ${c.b}`, background: relleno, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, opacity: t(cG + 6 + i * 8) }}>
                <Icono size={50} strokeWidth={1.5} color={c.b} />
                <div style={{ fontSize: 28 }}>{txt as string}</div>
              </div>
            );
          })}
        </div>
        <Nota at={cG + 30} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 560 }}>
          Bojinov, Simchi-Levi y Zhao (2023), Management Science: diseño y análisis de experimentos switchback
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El costo: efecto de diseño ───────────────────────────────────────────────
export const Costo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cD = useCue("diseno");
  const cS = useCue("seis");
  const res = transicion(frame, cS + 10, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cD} titulo="El precio:|*el efecto de diseño.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <Formula tam={64}>
          <Entra at={cD + 8}>
            ED<Op>=</Op>1<Op>+</Op>(<span style={{ color: v.azafran }}>m</span> − 1)<span style={{ margin: "0 0.12em" }}>·</span>
            <span style={{ color: ROJO }}>ρ</span>
          </Entra>
        </Formula>
        <div style={{ position: "absolute", left: 0, top: 110, display: "flex", flexDirection: "column", gap: 10 }}>
          <Nota at={cD + 40} color={v.azafran} tam={26}>
            <i style={{ fontFamily: serif }}>m</i>: casos por grupo
          </Nota>
          <Nota at={cD + 55} color={ROJO} tam={26}>
            <i style={{ fontFamily: serif }}>ρ</i>: correlación entre casos del mismo grupo
          </Nota>
        </div>
        <div style={{ position: "absolute", left: 0, top: 260 }}>
          <Formula tam={58}>
            <Entra at={cS + 4}>
              1<Op>+</Op>99<span style={{ margin: "0 0.12em" }}>·</span>0,05<Op>=</Op>
              <span style={{ color: ROJO, fontSize: 90, display: "inline-block", transform: `scale(${res})` }}>5,95</span>
            </Entra>
          </Formula>
          <Nota at={cS + 30} color={ROJO} tam={28} style={{ marginTop: 16 }}>
            grupos de 100 casos: necesitas casi 6 veces más datos
          </Nota>
        </div>
        <Nota at={cS + 50} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 500 }}>
          Kish (1965), Survey Sampling · Donner y Klar (2000), Design and Analysis of Cluster Randomization Trials
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Las trazas dicen qué se comparte ─────────────────────────────────────────
export const Trazas: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useCue("contexto");
  const resaltar = frame >= at + 60 ? [2, 3, 4] : [];
  const K = "#C792EA";
  return (
    <Escena>
      <Cabeza at={at} titulo="La pista está|*en las trazas.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <Codigo
          caja={{ x: 0, y: 0, w: 912, h: 420 }}
          at={at + 6}
          archivo="trazas-a2a.jsonl"
          Icono={FileCode2}
          tam={22}
          resaltar={resaltar}
          lineas={[
            [["// cada tarea A2A lleva su contexto", "#6B7280"]],
            [["{ task: ", K], ['"t-901"', c.c], [", context: ", K], ['"cola-resol-07"', v.azafran], [", agente: "], ['"clasificador"', c.c], [" }"]],
            [["{ task: ", K], ['"t-902"', c.c], [", context: ", K], ['"cola-resol-07"', v.azafran], [", agente: "], ['"resolutor"', c.c], [" }"]],
            [["{ task: ", K], ['"t-917"', c.c], [", context: ", K], ['"cola-resol-07"', v.azafran], [", agente: "], ['"resolutor"', c.c], [" }"]],
            [["{ task: ", K], ['"t-933"', c.c], [", context: ", K], ['"cola-resol-07"', v.azafran], [", agente: "], ['"resolutor"', c.c], [" }"]],
            [["{ task: ", K], ['"t-940"', c.c], [", context: ", K], ['"cola-resol-12"', c.b], [", agente: "], ['"resolutor"', c.c], [" }"]],
          ]}
        />
        <Panel caja={{ x: 0, y: 450, w: 912, h: 130 }} at={at + 80} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Check size={44} strokeWidth={2} color={v.azafran} />
          <div style={{ fontSize: 28 }}>mismo contexto = misma fila compartida: esa es tu unidad de aleatorización</div>
        </Panel>
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
        <Cinetico at={cCta} texto="Si comparten algo,|*aleatoriza lo que comparten.*" style={{ fontSize: 76 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próximo: 09 · qué agente causó la mejora
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
