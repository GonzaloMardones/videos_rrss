import React from "react";
import { ArrowUpDown, Check, Copy, Gauge, MessagesSquare, Scale, ScrollText, UserCheck } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Frac, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Nota, Panel, ROJO, Sombrero } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "Cuasi-experimentos · 10";
const JUEZ = c.b;
const HUM = v.azafran;
const PPI = c.c;

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
  const r1 = transicion(frame, at + largo * 0.5, fps, 500, backOut);
  const r2 = transicion(frame, at + largo * 0.8, fps, 500, backOut);
  return (
    <Escena>
      <Escenario alto={600}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 140 }} at={at + 4} color={v.niebla} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <MessagesSquare size={52} strokeWidth={1.5} color={v.niebla} />
          <div style={{ fontSize: 30 }}>10.000 conversaciones con clientes · ¿cumplen la normativa?</div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 190, width: 912, display: "flex", gap: 16 }}>
          <Panel caja={{ x: 0, y: 0, w: 448, h: 220 }} at={at + largo * 0.45} color={JUEZ} estilo={{ position: "relative" }}>
            <div style={{ fontSize: 26, color: v.niebla }}>dice el modelo</div>
            <div style={{ fontFamily: serif, fontSize: 96, color: JUEZ, display: "inline-block", transform: `scale(${r1})`, transformOrigin: "left" }}>84,6 %</div>
          </Panel>
          <Panel caja={{ x: 0, y: 0, w: 448, h: 220 }} at={at + largo * 0.75} color={c.c} estilo={{ position: "relative" }}>
            <div style={{ fontSize: 26, color: v.niebla }}>la cifra real</div>
            <div style={{ fontFamily: serif, fontSize: 96, color: c.c, display: "inline-block", transform: `scale(${r2})`, transformOrigin: "left" }}>80 %</div>
          </Panel>
        </div>
      </Escenario>
      <div style={{ marginTop: 10 }}>
        <Cinetico at={at + largo * 0.88} texto="El juez también|*se equivoca.*" style={{ fontSize: 92 }} />
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
      <Cinetico at={6} texto="El modelo|de lenguaje|*como juez.*" style={{ marginTop: 18, fontSize: 110 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>cumplimiento normativo en un banco · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Barato, rápido y con sesgos ──────────────────────────────────────────────
export const Juez: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cB = useCue("barato");
  const cS = useCue("sesgos");
  const largoS = useCueAt("sesgos", 1) - cS;
  const res = transicion(frame, cB + 30, fps, 500, backOut);
  const sesgos: [typeof Copy, string, number][] = [
    [ArrowUpDown, "posición: prefiere la primera", 0.15],
    [ScrollText, "largo: prefiere la más larga", 0.4],
    [Copy, "autopreferencia: prefiere las suyas", 0.65],
  ];
  return (
    <Escena>
      <Cabeza at={cB} titulo="Barato, rápido…|*y con sesgos.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
          <span style={{ fontFamily: serif, fontSize: 110, color: c.c, display: "inline-block", transform: `scale(${res})`, transformOrigin: "left" }}>&gt; 80 %</span>
          <span style={{ fontSize: 28, opacity: res }}>de acuerdo con personas (jueces fuertes)</span>
        </div>
        {sesgos.map(([I, txt, f], i) => (
          <Panel key={txt} caja={{ x: 0, y: 170 + i * 130, w: 912, h: 110 }} at={cS + largoS * f} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
            <I size={42} strokeWidth={1.5} color={ROJO} />
            <div style={{ fontSize: 30 }}>{txt}</div>
          </Panel>
        ))}
        <Nota at={cS + largoS * 0.85} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 590 }}>
          Zheng et al. (2023), «Judging LLM-as-a-judge with MT-Bench and Chatbot Arena», NeurIPS
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El juez es tu instrumento ────────────────────────────────────────────────
export const Instrumento: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("instrumento");
  const largo = useCueAt("instrumento", 1) - at;
  const ang = -60 + 80 * transicion(frame, at + largo * 0.3, fps, 900, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={at} titulo="El juez es|*tu instrumento.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div style={{ position: "relative", width: 260, height: 260 }}>
            <Gauge size={260} strokeWidth={1} color={v.niebla} />
            <div style={{ position: "absolute", left: 128, top: 70, width: 6, height: 70, background: ROJO, transformOrigin: "bottom center", transform: `rotate(${ang}deg)` }} />
          </div>
          <div style={{ fontSize: 32 }}>
            juez indulgente
            <br />
            <span style={{ color: ROJO }}>→ métrica sesgada</span>
          </div>
        </div>
        <Panel caja={{ x: 0, y: 330, w: 912, h: 150 }} at={at + largo * 0.6} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Scale size={46} strokeWidth={1.5} color={v.azafran} />
          <div style={{ fontSize: 28 }}>cambiar de juez a mitad de la prueba = amenaza de instrumentación (capítulo 3)</div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── Inferencia potenciada por predicción ─────────────────────────────────────
export const Ppi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("muestra");
  const cR = useCue("rectificador");
  const cF = useCue("formula");
  const largoF = useCueAt("formula", 1) - cF;
  const activas = frame >= cF + largoF * 0.5 ? ["r"] : frame >= cF ? ["j"] : frame >= cR ? ["r"] : [];
  const kM = transicion(frame, cM + 20, fps, 900, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cM} titulo="Juez + personas:|*lo mejor de ambos.*" tam={80} />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(50, 1fr)", gap: 3, width: 912 }}>
          {Array.from({ length: 50 * 12 }, (_, i) => {
            const humano = i % 20 === 7;
            return <div key={i} style={{ height: 12, borderRadius: 2, background: humano && kM > 0.3 ? HUM : JUEZ, opacity: humano ? 0.95 * kM + 0.3 : 0.35 }} />;
          })}
        </div>
        <div style={{ display: "flex", gap: 30, marginTop: 14, fontSize: 24, opacity: kM }}>
          <span>
            <span style={{ color: JUEZ }}>■</span> 10.000 calificadas por el juez
          </span>
          <span>
            <span style={{ color: HUM }}>■</span> 300 también por personas
          </span>
        </div>
        <div style={{ position: "absolute", left: 0, top: 260 }}>
          <Foco activas={activas}>
            <Formula tam={50}>
              <Entra at={cR + 4}>
                <Sombrero color={PPI}>θ</Sombrero>
                <Sub>PP</Sub>
                <Op>=</Op>
                <V id="j" color={JUEZ} italica={false}>
                  <Frac arriba="1" abajo="N" />Σ f(X̃<Sub>i</Sub>)
                </V>
                <Op>−</Op>
                <V id="r" color={HUM} italica={false}>
                  <Frac arriba="1" abajo="n" />Σ (f(X<Sub>j</Sub>) − Y<Sub>j</Sub>)
                </V>
              </Entra>
            </Formula>
          </Foco>
        </div>
        <div style={{ position: "absolute", left: 0, top: 400, display: "flex", flexDirection: "column", gap: 10 }}>
          <Nota at={cF + 6} color={JUEZ} tam={26}>
            promedio del juez en las 10.000
          </Nota>
          <Nota at={cR + 10} color={HUM} tam={26}>
            rectificador: el error promedio del juez donde hay etiqueta humana
          </Nota>
        </div>
        <Nota at={cF + largoF * 0.8} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 560 }}>
          Angelopoulos, Bates, Fannjiang, Jordan y Zrnic (2023), «Prediction-powered inference», Science 382(6671)
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Los intervalos ───────────────────────────────────────────────────────────
export const Numeros: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("sim");
  const cR = useCue("rinden");
  const largo = useCueAt("sim", 1) - cS;
  const px = (x: number) => 40 + ((x - 72) / 18) * 830;
  const filas: [string, number, number, string, number][] = [
    ["solo el juez", 84.6, 0.7, JUEZ, 0.05],
    ["solo personas (300)", 80, 4.5, HUM, 0.35],
    ["combinados", 80, 3.5, PPI, 0.65],
  ];
  const res = transicion(frame, cR + 6, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cS} titulo="Más angosto|*y sin sesgo.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <svg width={912} height={420} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <line x1={px(80)} y1={0} x2={px(80)} y2={370} stroke={v.hueso} strokeWidth={2} strokeDasharray="8 8" />
          <text x={px(80) + 8} y={20} fontFamily={mono} fontSize={22} fill={v.hueso}>
            real 80 %
          </text>
          {[74, 78, 82, 86, 90].map((m) => (
            <text key={m} x={px(m)} y={400} textAnchor="middle" fontFamily={mono} fontSize={20} fill={v.niebla}>
              {m}
            </text>
          ))}
          {filas.map(([n, m, h, col, f], i) => {
            const k = transicion(frame, cS + largo * f, fps, 700, EXPO_IN_OUT);
            const y = 80 + i * 110;
            return (
              <g key={n} opacity={Math.min(1, k * 2)}>
                <text x={0} y={y - 22} fontFamily={mono} fontSize={22} fill={col}>
                  {n}: {m.toFixed(1).replace(".", ",")} ± {h.toFixed(1).replace(".", ",")}
                </text>
                <line x1={px(m - h * k)} y1={y} x2={px(m + h * k)} y2={y} stroke={col} strokeWidth={8} strokeLinecap="round" />
                <circle cx={px(m)} cy={y} r={12} fill={col} />
              </g>
            );
          })}
        </svg>
        <Panel caja={{ x: 0, y: 450, w: 912, h: 150 }} at={cR + 2} color={PPI} estilo={{ display: "flex", alignItems: "center", gap: 26 }}>
          <UserCheck size={50} strokeWidth={1.5} color={PPI} />
          <div style={{ fontSize: 30 }}>
            300 etiquetas humanas rinden como <span style={{ fontFamily: serif, fontSize: 64, color: PPI, display: "inline-block", transform: `scale(${res})` }}>≈ 500</span>
          </div>
        </Panel>
        <Nota at={cR + 30} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 620 }}>
          simulación: 1.000 repeticiones · cobertura del IC 95 %: juez 0 %, personas 93 %, combinados 96 %
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El mismo principio del capítulo 1 ────────────────────────────────────────
export const Bayes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("principio");
  const largo = useCueAt("principio", 1) - at;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={at} titulo="Pesar cada fuente|*por lo que sabe.*" tam={80} />
      <Escenario alto={600} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", gap: 16, width: 912 }}>
          {[
            ["juez", "mucha información, con sesgo", JUEZ, 0.2],
            ["personas", "poca información, sin sesgo", HUM, 0.45],
          ].map(([n, d, col, f]) => (
            <div key={n as string} style={{ flex: 1, height: 200, borderRadius: 20, border: `2.5px solid ${col}`, background: relleno, padding: "20px 22px", boxSizing: "border-box", opacity: t(at + largo * (f as number)) }}>
              <div style={{ fontSize: 36, color: col as string }}>{n as string}</div>
              <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 10 }}>{d as string}</div>
            </div>
          ))}
        </div>
        <Panel caja={{ x: 0, y: 250, w: 912, h: 140 }} at={at + largo * 0.75} color={PPI} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Check size={46} strokeWidth={2} color={PPI} />
          <div style={{ fontSize: 30 }}>la combinación pesa cada fuente según lo que sabe, como en el capítulo 1</div>
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
        <Cinetico at={cCta} texto="El juez *escala.*|Las personas *calibran.*" style={{ fontSize: 88 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próximo: 11 · un equipo de agentes que hace inferencia causal
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
