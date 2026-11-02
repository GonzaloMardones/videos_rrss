import React from "react";
import { Check, Database, Repeat, Sparkles, Workflow } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cabeza, Chip, Cinetico, Ejes, Escena, FormulaCard, Frac, Nota, Op, Pildora, Sube, Tarjeta, Var } from "../../estilos/nube/kit";
import { codigo, n, tipo } from "../../estilos/nube/tokens";
import { SIGMA, TEXTO_A, TEXTO_B } from "./datos";

const SERIE = "Data Scientist 2027 · stage 2";

const Ruta: React.FC<{ at: number; actual: number }> = ({ at, actual }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const colores = [n.azul, n.amarillo, n.verde];
  return (
    <div style={{ display: "flex", gap: 12 }}>
      {Array.from({ length: 12 }, (_, i) => {
        const k = transicion(frame, at + i * 2, fps, 400, EXPO_OUT);
        const on = i === actual;
        return <div key={i} style={{ width: on ? 64 : 40, height: 14, borderRadius: 7, background: on ? colores[i % 3] : n.borde, opacity: k }} />;
      })}
    </div>
  );
};

const shingles = (t: string) => {
  const w = t.split(" ");
  return w.slice(0, w.length - 2).map((_, i) => w.slice(i, i + 3).join(" "));
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("c4");
  const cD = useCue("diez");
  const largo = useCueAt("c4", 1) - cC;
  const filas = Math.min(14, Math.floor(Math.max(0, frame - cC - 10) / 2));
  const res = transicion(frame, cC + largo * 0.6, fps, 500, backOut);
  const kD = transicion(frame, cD + 10, fps, 900, EXPO_IN_OUT);
  return (
    <Escena>
      <div style={{ ...tipo.cuerpo, color: n.texto2 }}>C4 dataset · one 61-word sentence</div>
      <div style={{ height: 190, marginTop: 20, overflow: "hidden" }}>
        {Array.from({ length: Math.min(8, filas) }, (_, i) => (
          <div key={i} style={{ height: 18, marginTop: 4, borderRadius: 6, width: `${70 + ((i * 37) % 28)}%`, background: n.rojoClaro, border: `1px solid ${n.rojo}` }} />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 6 }}>
        <span style={{ fontSize: 110, fontWeight: 500, color: n.rojo, display: "inline-block", transform: `scale(${res})`, transformOrigin: "left" }}>×60,000</span>
        <span style={{ fontSize: 28, color: n.texto2, opacity: res }}>copies of the same sentence</span>
      </div>
      <Tarjeta at={cD} color={n.verde} style={{ marginTop: 30 }}>
        <div style={{ fontSize: 28, color: n.texto2 }}>memorized text emitted after deduplication</div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 14 }}>
          <div style={{ flex: 1, height: 40, borderRadius: 10, background: n.superficie, border: `2px solid ${n.borde}` }}>
            <div style={{ height: "100%", width: `${100 - 90 * kD}%`, borderRadius: 8, background: n.verde }} />
          </div>
          <div style={{ fontSize: 56, fontWeight: 500, color: n.verde, whiteSpace: "nowrap" }}>10× less</div>
        </div>
      </Tarjeta>
      <Nota at={cD + 20} tam={22} style={{ marginTop: 16 }}>
        Lee et al. (2022), «Deduplicating Training Data Makes Language Models Better», ACL
      </Nota>
      <div style={{ marginTop: 40 }}>
        <Cinetico at={cD + 40} texto="Data quality|*is a model feature.*" tam={84} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ marginTop: 300 }}>
      <Ruta at={0} actual={1} />
      <div style={{ ...tipo.rotulo, color: n.texto2, marginTop: 40 }}>DATA SCIENTIST 2027 · STAGE 2 OF 12</div>
      <Cinetico at={8} texto="Data curation &|*synthetic pipelines.*" tam={100} style={{ marginTop: 18 }} />
      <Sube at={28}>
        <div style={{ ...tipo.cuerpo, color: n.texto2, marginTop: 24 }}>MinHash · LSH · scaling laws · Evol-Instruct · verifiers · by {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Jaccard ──────────────────────────────────────────────────────────────────
export const Jaccard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("shingles");
  const cI = useCue("indice");
  const largoS = useCueAt("shingles", 1) - cS;
  const A = shingles(TEXTO_A);
  const B = shingles(TEXTO_B);
  const comun = new Set(A.filter((s) => B.includes(s)));
  const marcar = frame >= cI;
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  const bloque = (titulo: string, texto: string, lista: string[], a: number) => (
    <div style={{ marginTop: 22, opacity: t(a) }}>
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2 }}>{titulo}</div>
      <div style={{ fontSize: 30, marginTop: 6 }}>“{texto}”</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
        {lista.map((s, i) => {
          const c = comun.has(s);
          return (
            <span key={s} style={{ fontFamily: codigo, fontSize: 19, padding: "6px 10px", borderRadius: 8, border: `2px solid ${marcar ? (c ? n.azul : n.amarillo) : n.borde}`, background: marcar ? (c ? n.azulClaro : n.amarilloClaro) : n.fondo, opacity: t(a + largoS * 0.4 + i * 2) }}>
              {s}
            </span>
          );
        })}
      </div>
    </div>
  );
  return (
    <Escena>
      <Cabeza at={cS} serie={SERIE} titulo="Near-duplicates:|*Jaccard similarity.*" />
      {bloque("A", TEXTO_A, A, cS + 6)}
      {bloque("B", TEXTO_B, B, cS + 12)}
      <FormulaCard
        at={cI + 4}
        tam={58}
        style={{ marginTop: 26 }}
        formula={
          <>
            <Var>J</Var>(<Var>A</Var>, <Var>B</Var>)<Op>=</Op>
            <Frac
              arriba={
                <span>
                  |<Var>A</Var> ∩ <Var>B</Var>|
                </span>
              }
              abajo={
                <span>
                  |<Var>A</Var> ∪ <Var>B</Var>|
                </span>
              }
            />
            <Op>=</Op>
            <Frac arriba={<span style={{ color: n.azul }}>8</span>} abajo="11" />
            <Op>≈</Op>
            <span style={{ color: n.azul }}>0.73</span>
          </>
        }
        leyenda={[
          ["∩", n.azul, "shared 3-word shingles"],
          ["∪", n.amarillo, "all distinct shingles"],
        ]}
        columnas={2}
      />
    </Escena>
  );
};

// ─── MinHash ──────────────────────────────────────────────────────────────────
export const Minhash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("pares");
  const cT = useCue("truco");
  const cF = useCue("firma");
  const largoF = useCueAt("firma", 1) - cF;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const res = transicion(frame, cP + 20, fps, 500, backOut);
  const coincide = (i: number) => (Math.sin(i * 12.9898 + 4.1) * 43758.5453) % 1 < 0.46;
  return (
    <Escena>
      <Cabeza at={cP} serie={SERIE} titulo="MinHash:|*compare signatures.*" />
      <Tarjeta at={cP + 6} color={n.rojo} style={{ marginTop: 30 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontSize: 28, color: n.texto2 }}>10⁹ documents, all pairs</span>
          <span style={{ fontSize: 64, fontWeight: 500, color: n.rojo, transform: `scale(${res})`, display: "inline-block" }}>5 · 10¹⁷</span>
        </div>
        <div style={{ fontFamily: codigo, fontSize: 26, color: n.rojo, textAlign: "right" }}>O(n²)</div>
      </Tarjeta>
      <FormulaCard
        at={cT + 4}
        tam={52}
        style={{ marginTop: 24 }}
        formula={
          <>
            P[ min <Var color={n.azul}>h</Var>(<Var>A</Var>)<Op>=</Op>min <Var color={n.azul}>h</Var>(<Var>B</Var>) ]<Op>=</Op>
            <Var color={n.verde}>J</Var>(<Var>A</Var>, <Var>B</Var>)
          </>
        }
        leyenda={[
          ["h", n.azul, "a random hash function"],
          ["J", n.verde, "Jaccard similarity"],
        ]}
        columnas={2}
      />
      <div style={{ marginTop: 28, opacity: t(cF) }}>
        <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2 }}>signatures · 128 hashes (first 32 shown)</div>
        {["A", "B"].map((nombre, fila) => (
          <div key={nombre} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
            <span style={{ fontFamily: codigo, fontSize: 24, width: 24 }}>{nombre}</span>
            <div style={{ display: "flex", gap: 3 }}>
              {Array.from({ length: 32 }, (_, i) => {
                const ok = coincide(i);
                return <div key={i} style={{ width: 22, height: 34, borderRadius: 4, background: ok ? n.azul : fila === 0 ? n.amarillo : n.texto3, opacity: t(cF + largoF * 0.1 + i * 0.6) }} />;
              })}
            </div>
          </div>
        ))}
        <Nota at={cF + largoF * 0.6} color={n.texto} tam={26} style={{ marginTop: 14 }}>
          share of matching positions ≈ J · standard error ≈ √(J(1−J)/k) ≈ 0.035 at J = 0.8
        </Nota>
        <Nota at={cF + largoF * 0.8} tam={22} style={{ marginTop: 8 }}>
          Broder (1997), «On the resemblance and containment of documents»
        </Nota>
      </div>
    </Escena>
  );
};

// ─── LSH ──────────────────────────────────────────────────────────────────────
export const Lsh: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cB = useCue("bandas");
  const cC = useCue("curva");
  const largoC = useCueAt("curva", 1) - cC;
  const k = transicion(frame, cC, fps, 1200, EXPO_IN_OUT);
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const p = (s: number) => 1 - Math.pow(1 - Math.pow(s, 5), 20);
  const ss = Array.from({ length: 101 }, (_, i) => i / 100);
  return (
    <Escena>
      <Cabeza at={cB} serie={SERIE} titulo="LSH: only compare|*likely matches.*" />
      <div style={{ display: "flex", gap: 6, marginTop: 26 }}>
        {Array.from({ length: 20 }, (_, b) => (
          <div key={b} style={{ display: "flex", flexDirection: "column", gap: 3, padding: 4, borderRadius: 8, border: `2px solid ${b === 6 && frame >= cB + 40 ? n.verde : n.borde}`, background: b === 6 && frame >= cB + 40 ? n.verdeClaro : n.fondo, opacity: t(cB + 6 + b) }}>
            {Array.from({ length: 5 }, (_, r) => (
              <div key={r} style={{ width: 28, height: 14, borderRadius: 3, background: n.azul, opacity: 0.35 + 0.13 * r }} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 24, color: n.texto2, marginTop: 10, opacity: t(cB + 20) }}>20 bands × 5 rows · candidates = documents that match in at least one band</div>
      <FormulaCard
        at={cC}
        tam={54}
        style={{ marginTop: 20 }}
        formula={
          <>
            P(<Var>s</Var>)<Op>=</Op>1<Op>−</Op>(1<Op>−</Op>
            <Var>s</Var>
            <sup style={{ fontSize: "0.55em" }}>r</sup>)<sup style={{ fontSize: "0.55em" }}>b</sup>
          </>
        }
        leyenda={[
          ["s", n.texto, "Jaccard similarity"],
          ["r, b", n.azul, "rows per band, bands"],
        ]}
        columnas={2}
      />
      <div style={{ marginTop: 14 }}>
        <Ejes ancho={912} alto={330} x={[0, 1]} y={[0, 1]} at={cC} rotuloX="similarity s →" rotuloY="P(candidate)" marcasX={[0, 0.3, 0.55, 0.8, 1].map((m) => ({ v: m, t: String(m) }))} marcasY={[0, 0.5, 1].map((m) => ({ v: m, t: String(m) }))}>
          {({ px, py }) => {
            const vis = ss.slice(0, Math.max(2, Math.round(ss.length * k)));
            return (
              <g>
                <path d={`M${vis.map((s) => `${px(s)},${py(p(s))}`).join("L")}`} fill="none" stroke={n.azul} strokeWidth={5} />
                <g opacity={t(cC + largoC * 0.15)}>
                  <circle cx={px(0.8)} cy={py(p(0.8))} r={11} fill={n.verde} />
                  <text x={px(0.8) - 14} y={py(p(0.8)) + 40} textAnchor="end" fontFamily={codigo} fontSize={22} fill={n.verde}>
                    0.8 → 99.96%
                  </text>
                </g>
                <g opacity={t(cC + largoC * 0.45)}>
                  <circle cx={px(0.3)} cy={py(p(0.3))} r={11} fill={n.rojo} />
                  <text x={px(0.3) + 16} y={py(p(0.3)) - 16} fontFamily={codigo} fontSize={22} fill={n.rojo}>
                    0.3 → 4.75%
                  </text>
                </g>
              </g>
            );
          }}
        </Ejes>
      </div>
      <Nota at={cC + largoC * 0.75} color={n.texto} tam={24} style={{ marginTop: 6 }}>
        threshold ≈ (1/b)^(1/r) ≈ 0.55 · cost ≈ O(n) instead of O(n²)
      </Nota>
    </Escena>
  );
};

// ─── Leyes de escala y mezcla ─────────────────────────────────────────────────
export const Escala: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("chinchilla");
  const cM = useCue("mezcla");
  const largoM = useCueAt("mezcla", 1) - cM;
  const t = (a: number) => transicion(frame, a, fps, 700, EXPO_OUT);
  const modelos: [string, number, number, string][] = [
    ["Gopher", 280, 0.3, n.texto3],
    ["Chinchilla", 70, 1.4, n.azul],
  ];
  const mezcla: [string, number, string][] = [
    ["web", 0.55, n.azul],
    ["code", 0.2, n.verde],
    ["books", 0.15, n.amarillo],
    ["other", 0.1, n.texto3],
  ];
  return (
    <Escena>
      <Cabeza at={cC} serie={SERIE} titulo="Scaling laws:|*data grows with size.*" />
      <FormulaCard
        at={cC + 6}
        tam={60}
        style={{ marginTop: 26 }}
        formula={
          <>
            <Var color={n.verde}>D</Var>
            <Op>≈</Op>20<Op>·</Op>
            <Var color={n.azul}>N</Var>
          </>
        }
        leyenda={[
          ["D", n.verde, "training tokens"],
          ["N", n.azul, "parameters"],
        ]}
        columnas={2}
      />
      <div style={{ marginTop: 24 }}>
        {modelos.map(([nom, params, tokens, col], i) => {
          const k = t(cM + largoM * (0.05 + i * 0.2));
          return (
            <div key={nom} style={{ marginTop: 18, opacity: Math.min(1, k * 2) }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
                <span style={{ fontWeight: 500 }}>{nom}</span>
                <span style={{ fontFamily: codigo, color: col }}>
                  {params}B params · {tokens}T tokens
                </span>
              </div>
              <div style={{ height: 30, borderRadius: 8, background: n.superficie, border: `2px solid ${n.borde}`, marginTop: 8 }}>
                <div style={{ height: "100%", width: `${(tokens / 1.4) * 100 * k}%`, borderRadius: 6, background: col }} />
              </div>
            </div>
          );
        })}
        <Nota at={cM + largoM * 0.35} tam={22} style={{ marginTop: 10 }}>
          same compute · Hoffmann et al. (2022), «Training Compute-Optimal Large Language Models»
        </Nota>
      </div>
      <div style={{ marginTop: 26, opacity: t(cM + largoM * 0.55) }}>
        <div style={{ fontSize: 26, color: n.texto2 }}>domain mix = a hyperparameter (illustrative weights)</div>
        <div style={{ display: "flex", height: 54, borderRadius: 12, overflow: "hidden", marginTop: 10 }}>
          {mezcla.map(([nom, w, col]) => (
            <div key={nom} style={{ width: `${w * 100}%`, background: col, display: "flex", alignItems: "center", justifyContent: "center", color: n.fondo, fontSize: 24, fontWeight: 500 }}>
              {nom}
            </div>
          ))}
        </div>
      </div>
    </Escena>
  );
};

// ─── Datos sintéticos: Evol-Instruct ──────────────────────────────────────────
export const Sintetico: React.FC = () => {
  const at = useCue("evol");
  const largo = useCueAt("evol", 1) - at;
  const pasos: [string, string, string, number][] = [
    ["seed", "Sort a list.", n.texto3, 0.15],
    ["in-depth: constraints + reasoning", "Sort 10⁶ records by two keys, stably, in O(n log n), and explain why.", n.azul, 0.45],
    ["in-breadth: a new topic", "Find duplicate invoices in a bank ledger.", n.verde, 0.75],
  ];
  return (
    <Escena>
      <Cabeza at={at} serie={SERIE} titulo="Synthetic data:|*Evol-Instruct.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 34 }}>
        {pasos.map(([rol, txt, col, f]) => (
          <Tarjeta key={rol} at={at + largo * f} color={col}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: codigo, fontSize: 22, color: col }}>
              <Sparkles size={26} strokeWidth={1.6} color={col} /> {rol}
            </div>
            <div style={{ fontSize: 32, marginTop: 8 }}>“{txt}”</div>
          </Tarjeta>
        ))}
      </div>
      <Nota at={at + largo * 0.85} tam={22} style={{ marginTop: 22 }}>
        Xu et al. (2024), «WizardLM: Empowering Large Language Models to Follow Complex Instructions», ICLR · examples illustrative
      </Nota>
    </Escena>
  );
};

// ─── El verificador y Bayes ───────────────────────────────────────────────────
export const Verificador: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cF = useCue("filtro");
  const cB = useCue("bayes");
  const cP = useCue("posterior");
  const largoB = useCueAt("bayes", 1) - cB;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const fase = frame >= cB + largoB * 0.55 ? 2 : frame >= cB + largoB * 0.15 ? 1 : 0;
  // 100 respuestas: 60 correctas; pasan 54 correctas y 8 incorrectas.
  const celda = (i: number) => {
    const correcta = i < 60;
    const pasa = correcta ? i < 54 : i < 68;
    return { correcta, pasa };
  };
  const res = transicion(frame, cP, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cF} serie={SERIE} titulo="Verifiers,|*the Bayesian way.*" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(20, 1fr)", gap: 6, marginTop: 30, width: 912 }}>
        {Array.from({ length: 100 }, (_, i) => {
          const { correcta, pasa } = celda(i);
          const col = fase === 0 ? n.texto3 : correcta ? n.verde : n.rojo;
          const tenue = fase === 2 && !pasa;
          return <div key={i} style={{ height: 34, borderRadius: 6, background: col, opacity: t(cF + 10 + i * 0.4) * (tenue ? 0.15 : 1) }} />;
        })}
      </div>
      <div style={{ display: "flex", gap: 24, marginTop: 14, fontSize: 24, color: n.texto2, opacity: t(cB) }}>
        <span>
          <span style={{ color: n.verde }}>■</span> 60 correct
        </span>
        <span>
          <span style={{ color: n.rojo }}>■</span> 40 wrong
        </span>
        <span style={{ opacity: fase === 2 ? 1 : 0 }}>pass: 54 correct + 8 wrong</span>
      </div>
      <FormulaCard
        at={cP}
        tam={48}
        style={{ marginTop: 26 }}
        formula={
          <>
            P(ok | pass)<Op>=</Op>
            <Frac
              arriba={
                <span>
                  <span style={{ color: n.azul }}>0.9</span> · <span style={{ color: n.verde }}>0.6</span>
                </span>
              }
              abajo={
                <span>
                  <span style={{ color: n.azul }}>0.9</span> · <span style={{ color: n.verde }}>0.6</span> + <span style={{ color: n.rojo }}>0.2</span> · 0.4
                </span>
              }
            />
            <Op>=</Op>
            <span style={{ color: n.verde, fontSize: "1.3em", display: "inline-block", transform: `scale(${res})` }}>0.87</span>
          </>
        }
        leyenda={[
          ["0.6", n.verde, "prior: generator accuracy"],
          ["0.9", n.azul, "verifier passes a correct answer"],
          ["0.2", n.rojo, "verifier passes a wrong answer"],
        ]}
      />
      <Nota at={cP + 30} tam={22} style={{ marginTop: 12 }}>
        Bayes' rule · prior 60% → posterior 87% · numbers illustrative
      </Nota>
    </Escena>
  );
};

// ─── Colapso del modelo ───────────────────────────────────────────────────────
const normal = (x: number, s: number) => Math.exp(-0.5 * (x / s) ** 2) / s;
export const Colapso: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("cola");
  const cS = useCue("sigma");
  const largoS = useCueAt("sigma", 1) - cS;
  const kC = transicion(frame, cC + 10, fps, 1600, EXPO_IN_OUT);
  const kS = transicion(frame, cS, fps, 1400, EXPO_IN_OUT);
  const gen = Math.round(50 * kC);
  const xs = Array.from({ length: 121 }, (_, i) => -3 + (i / 120) * 6);
  const s = SIGMA[gen];
  return (
    <Escena>
      <Cabeza at={cC} serie={SERIE} titulo="Model collapse:|*the tails vanish.*" />
      <div style={{ marginTop: 20 }}>
        <Ejes ancho={912} alto={300} x={[-3, 3]} y={[0, 4.2]} at={cC} rotuloX="value →" rotuloY={`generation ${gen}`}>
          {({ px, py }) => (
            <g>
              <path d={`M${xs.map((x) => `${px(x)},${py(Math.min(4.2, normal(x, 1)))}`).join("L")}`} fill="none" stroke={n.texto3} strokeWidth={3} strokeDasharray="8 8" />
              <path d={`M${xs.map((x) => `${px(x)},${py(Math.min(4.2, normal(x, s)))}`).join("L")}`} fill="none" stroke={n.rojo} strokeWidth={5} />
            </g>
          )}
        </Ejes>
      </div>
      <div style={{ marginTop: 16 }}>
        <Ejes ancho={912} alto={300} x={[0, 100]} y={[0, 1.05]} at={cS} rotuloX="generation →" rotuloY="σ (median)" marcasX={[0, 25, 50, 100].map((m) => ({ v: m, t: String(m) }))} marcasY={[0, 0.5, 1].map((m) => ({ v: m, t: String(m) }))}>
          {({ px, py }) => {
            const vis = SIGMA.slice(0, Math.max(2, Math.round(SIGMA.length * kS)));
            return (
              <g>
                <path d={`M${vis.map((v, i) => `${px(i)},${py(v)}`).join("L")}`} fill="none" stroke={n.rojo} strokeWidth={5} />
                <g opacity={transicion(frame, cS + largoS * 0.5, fps, 400, EXPO_OUT)}>
                  <circle cx={px(50)} cy={py(SIGMA[50])} r={10} fill={n.rojo} />
                  <text x={px(50) + 16} y={py(SIGMA[50]) - 12} fontFamily={codigo} fontSize={22} fill={n.rojo}>
                    gen 50 · σ ≈ {SIGMA[50].toFixed(2)}
                  </text>
                </g>
              </g>
            );
          }}
        </Ejes>
      </div>
      <Chip at={cS + largoS * 0.75} color={n.verde}>
        <Repeat size={24} strokeWidth={2} /> always mix in real data
      </Chip>
      <Nota at={cS + largoS * 0.85} tam={22} style={{ marginTop: 12 }}>
        Shumailov et al. (2024), Nature 631 · simulation: normal refit on 20 samples per generation
      </Nota>
    </Escena>
  );
};

// ─── En Google Cloud ──────────────────────────────────────────────────────────
export const Nube: React.FC = () => {
  const at = useCue("gcp");
  const largo = useCueAt("gcp", 1) - at;
  const cards: [typeof Database, string, string, string, number][] = [
    [Workflow, "Dataflow", "runs the cleaning pipeline (Apache Beam)", n.azul, 0.1],
    [Database, "BigQuery", "stores signatures, finds duplicates with SQL", n.amarillo, 0.4],
    [Sparkles, "Vertex AI", "generates and verifies synthetic data", n.verde, 0.7],
  ];
  return (
    <Escena>
      <Cabeza at={at} serie={SERIE} titulo="On|*Google Cloud.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 40 }}>
        {cards.map(([I, nom, d, col, f]) => (
          <Tarjeta key={nom} at={at + largo * f} color={col}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <I size={50} strokeWidth={1.5} color={col} />
              <div>
                <div style={{ fontSize: 34, fontWeight: 500 }}>{nom}</div>
                <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>{d}</div>
              </div>
            </div>
          </Tarjeta>
        ))}
      </div>
    </Escena>
  );
};

// ─── Las bases ────────────────────────────────────────────────────────────────
export const Bases: React.FC = () => {
  const at = useCue("bases");
  const largo = useCueAt("bases", 1) - at;
  const ideas: [string, string, string, number][] = [
    ["MinHash → compare signatures", "P[same minimum] = Jaccard similarity", n.azul, 0.12],
    ["LSH → skip the O(n²)", "only bucket-mates become candidates", n.amarillo, 0.4],
    ["Synthetic data needs checks", "a verifier + real data in the mix", n.verde, 0.65],
  ];
  return (
    <Escena>
      <Cabeza at={at} serie={SERIE} titulo="The|*basics.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 40 }}>
        {ideas.map(([p, r, col, f]) => (
          <Tarjeta key={p} at={at + largo * f} color={col}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <Check size={44} strokeWidth={2} color={col} />
              <div>
                <div style={{ fontSize: 34, fontWeight: 500 }}>{p}</div>
                <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>{r}</div>
              </div>
            </div>
          </Tarjeta>
        ))}
      </div>
    </Escena>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const at = useCue("cta");
  return (
    <Escena>
      <div style={{ marginTop: 240 }}>
        <Ruta at={at - 10} actual={2} />
        <Cinetico at={at} texto="Clean data,|*better models.*" tam={96} style={{ marginTop: 40 }} />
        <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={at + 20}>Share · Follow</Pildora>
          <Sube at={at + 26}>
            <div style={{ fontSize: 30, color: n.texto2 }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={at + 34} style={{ marginTop: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, color: n.texto2 }}>
            <Check size={30} strokeWidth={2} color={n.verde} /> next: stage 3 · PEFT & model merging
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
