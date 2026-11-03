import React from "react";
import { Check, FileWarning, Gavel, ShieldCheck, Sparkles, Swords, Users } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cabeza, Chip, Cinetico, Ejes, Escena, FormulaCard, Frac, Nota, Op, Pildora, Sube, Tarjeta, Var } from "../../estilos/nube/kit";
import { codigo, n, tipo } from "../../estilos/nube/tokens";

const SERIE = "Tech capsule · Evals & red teaming";
const sub = (t: string) => <sub style={{ fontSize: "0.5em" }}>{t}</sub>;

// Intervalo horizontal: centro y semiancho en puntos porcentuales, sobre una escala [min, max].
const Intervalo: React.FC<{ centro: number; semi: number; min: number; max: number; color: string; k: number; cero?: boolean }> = ({ centro, semi, min, max, color, k, cero }) => {
  const x = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div style={{ position: "relative", height: 46 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 22, height: 2, background: n.borde }} />
      {cero ? <div style={{ position: "absolute", left: `${x(0)}%`, top: 0, bottom: 0, width: 3, background: n.rojo }} /> : null}
      <div style={{ position: "absolute", left: `${x(centro - semi * k)}%`, width: `${x(centro + semi * k) - x(centro - semi * k)}%`, top: 15, height: 16, borderRadius: 8, background: color, opacity: 0.35 }} />
      <div style={{ position: "absolute", left: `calc(${x(centro)}% - 11px)`, top: 12, width: 22, height: 22, borderRadius: 11, background: color, opacity: Math.min(1, k * 3) }} />
    </div>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cD = useCue("dos");
  const cN = useCue("nose");
  const largoN = useCueAt("nose", 1) - cN;
  const k = transicion(frame, cN + 6, fps, 1000, EXPO_OUT);
  return (
    <Escena>
      <div style={{ ...tipo.cuerpo, color: n.texto2 }}>500-question benchmark · accuracy</div>
      <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
        <Tarjeta at={cD + 6} color={n.texto3} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>current model</div>
          <div style={{ fontSize: 72, fontWeight: 500 }}>80%</div>
        </Tarjeta>
        <Tarjeta at={cD + 20} color={n.azul} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>new model</div>
          <div style={{ fontSize: 72, fontWeight: 500, color: n.azul }}>82%</div>
        </Tarjeta>
      </div>
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 30, opacity: k }}>difference: +2 pts · 95% interval −2.9 … +6.9</div>
      <div style={{ marginTop: 8 }}>
        <Intervalo centro={2} semi={4.86} min={-6} max={10} color={n.amarillo} k={k} cero />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: codigo, fontSize: 20, color: n.texto2, opacity: k }}>
        <span>−6</span>
        <span style={{ color: n.rojo }}>0 = no difference</span>
        <span>+10</span>
      </div>
      <div style={{ marginTop: 60 }}>
        <Cinetico at={cN + largoN * 0.5} texto="Measure the|*uncertainty.*" tam={96} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ marginTop: 300 }}>
      <div style={{ ...tipo.rotulo, color: n.azul }}>TECH CAPSULE</div>
      <Cinetico at={8} texto="Evaluations &|*red teaming.*" tam={116} style={{ marginTop: 18 }} />
      <Sube at={28}>
        <div style={{ ...tipo.cuerpo, color: n.texto2, marginTop: 24 }}>error bars · contamination · LLM judges · attacks · by {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Barras de error ──────────────────────────────────────────────────────────
export const Error: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("se");
  const cP = useCue("pares");
  const largoP = useCueAt("pares", 1) - cP;
  const filas: [number, number, string, number][] = [
    [100, 7.84, n.rojo, 0.05],
    [500, 3.51, n.amarillo, 0.2],
    [2000, 1.75, n.verde, 0.35],
  ];
  return (
    <Escena>
      <Cabeza at={cS} serie={SERIE} titulo="Accuracy has|*error bars.*" />
      <FormulaCard
        at={cS + 14}
        tam={54}
        style={{ marginTop: 26 }}
        formula={
          <>
            <Var recta>SE</Var>
            <Op>=</Op>
            <span style={{ fontSize: "1.1em" }}>√</span>
            <span style={{ borderTop: `2px solid ${n.texto}`, paddingTop: 4 }}>
              <Frac arriba={<span><Var color={n.azul}>p</Var>(1 − <Var color={n.azul}>p</Var>)</span>} abajo={<Var color={n.verde}>n</Var>} />
            </span>
            <span style={{ marginLeft: 40 }} />
            95%<Op>≈</Op>±1.96·<Var recta>SE</Var>
          </>
        }
        leyenda={[
          ["p", n.azul, "accuracy (here 0.80)"],
          ["n", n.verde, "number of questions"],
        ]}
        columnas={2}
      />
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 30, opacity: transicion(frame, cP, fps, 400, EXPO_OUT) }}>accuracy 80% · 95% interval</div>
      {filas.map(([q, semi, col, f]) => {
        const k = transicion(frame, cP + largoP * f, fps, 700, EXPO_OUT);
        return (
          <div key={q} style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 10, opacity: Math.min(1, k * 2) }}>
            <div style={{ width: 170, fontFamily: codigo, fontSize: 26 }}>n = {q.toLocaleString("en-US")}</div>
            <div style={{ flex: 1 }}>
              <Intervalo centro={80} semi={semi} min={70} max={90} color={col} k={k} />
            </div>
            <div style={{ width: 120, fontFamily: codigo, fontSize: 26, color: col, textAlign: "right" }}>±{semi.toFixed(1)}</div>
          </div>
        );
      })}
      <Tarjeta at={cP + largoP * 0.6} color={n.azul} style={{ marginTop: 26 }}>
        <div style={{ fontSize: 30, fontWeight: 500 }}>Paired comparison</div>
        <div style={{ fontSize: 24, color: n.texto2, marginTop: 4 }}>both models on the same questions → only the per-question differences add noise</div>
      </Tarjeta>
      <Nota at={cP + largoP * 0.75} tam={22} style={{ marginTop: 14 }}>
        Miller (2024), «Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations», arXiv:2411.00640
      </Nota>
    </Escena>
  );
};

// ─── Contaminación ────────────────────────────────────────────────────────────
export const Contaminacion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cF = useCue("fuga");
  const cD = useCue("detectar");
  const largoF = useCueAt("fuga", 1) - cF;
  const largoD = useCueAt("detectar", 1) - cD;
  const k = transicion(frame, cF + largoF * 0.55, fps, 900, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cF} serie={SERIE} titulo="When the test|*leaks.*" />
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 30, opacity: transicion(frame, cF + 6, fps, 400, EXPO_OUT) }}>same skill, two question sets</div>
      {[
        ["public benchmark (possibly seen)", 100, n.texto3],
        ["fresh, unseen questions", 100 - 8 * k, n.rojo],
      ].map(([lab, v, col], i) => (
        <div key={i} style={{ marginTop: 16, opacity: i === 0 ? transicion(frame, cF + 10, fps, 500, EXPO_OUT) : Math.min(1, k * 3) }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
            <span>{lab as string}</span>
            <span style={{ fontWeight: 500, color: col as string }}>{i === 0 ? "baseline" : `−${(8 * k).toFixed(0)} pts`}</span>
          </div>
          <div style={{ height: 46, borderRadius: 10, background: n.superficie, border: `2px solid ${n.borde}`, marginTop: 8 }}>
            <div style={{ height: "100%", width: `${((v as number) / 100) * 80}%`, borderRadius: 8, background: col as string }} />
          </div>
        </div>
      ))}
      <Nota at={cF + largoF * 0.7} tam={22} style={{ marginTop: 12 }}>
        GSM8K vs GSM1k: drops of up to 8 points · Zhang et al. (2024), NeurIPS · bars schematic
      </Nota>
      <div style={{ display: "flex", gap: 16, marginTop: 26 }}>
        <Tarjeta at={cD + largoD * 0.1} color={n.azul} style={{ flex: 1 }}>
          <div style={{ fontSize: 28, fontWeight: 500 }}>13-gram overlap</div>
          <div style={{ fontSize: 22, color: n.texto2, marginTop: 4 }}>test text found verbatim in the training data (GPT-3)</div>
        </Tarjeta>
        <Tarjeta at={cD + largoD * 0.45} color={n.amarillo} style={{ flex: 1 }}>
          <div style={{ fontSize: 28, fontWeight: 500 }}>Min-K% Prob</div>
          <div style={{ fontSize: 22, color: n.texto2, marginTop: 4 }}>seen text has few very unlikely tokens</div>
        </Tarjeta>
      </div>
      <FormulaCard
        at={cD + largoD * 0.6}
        tam={42}
        style={{ marginTop: 18 }}
        formula={
          <>
            <Var recta>Min-K%</Var>(<Var>x</Var>)<Op>=</Op>
            <Frac arriba="1" abajo={<span>|<Var color={n.amarillo}>K</Var>|</span>} />
            Σ{sub("i ∈ K")} log <Var>p</Var>(<Var>x</Var>
            {sub("i")} | <Var>x</Var>
            {sub("<i")})
          </>
        }
        leyenda={[["K", n.amarillo, "the k% least likely tokens"]]}
      />
      <Nota at={cD + largoD * 0.75} tam={22} style={{ marginTop: 12 }}>
        Brown et al. (2020), NeurIPS · Shi et al. (2024), «Detecting Pretraining Data from Large Language Models», ICLR
      </Nota>
    </Escena>
  );
};

// ─── Evaluaciones dinámicas y desarrollo guiado por evaluaciones ──────────────
export const Dinamicas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cV = useCue("vivas");
  const cT = useCue("tests");
  const largoV = useCueAt("vivas", 1) - cV;
  const largoT = useCueAt("tests", 1) - cT;
  const k = transicion(frame, cV + largoV * 0.2, fps, 1200, EXPO_IN_OUT);
  const pasos: [string, string, string][] = [
    ["1 · write the eval", "cases + expected behavior, before the change", n.azul],
    ["2 · change the system", "prompt, model, retrieval, tools", n.amarillo],
    ["3 · run in CI", "compare to baseline with error bars", n.verde],
    ["4 · ship or block", "regressions stop the release", n.rojo],
  ];
  return (
    <Escena>
      <Cabeza at={cV} serie={SERIE} titulo="Dynamic evals,|*eval-driven development.*" />
      <svg width={912} height={150} style={{ marginTop: 26, overflow: "visible" }}>
        <line x1={20} y1={80} x2={20 + 870 * k} y2={80} stroke={n.texto3} strokeWidth={3} />
        <rect x={20} y={60} width={470 * Math.min(1, k * 1.8)} height={40} rx={8} fill={n.rojoClaro} />
        <rect x={500} y={60} width={Math.max(0, 390 * (k - 0.55) / 0.45)} height={40} rx={8} fill={n.verdeClaro} />
        <line x1={495} y1={40} x2={495} y2={120} stroke={n.rojo} strokeWidth={4} opacity={k > 0.5 ? 1 : 0} />
        <text x={495} y={30} textAnchor="middle" fontFamily={codigo} fontSize={22} fill={n.rojo} opacity={k > 0.5 ? 1 : 0}>
          training cutoff
        </text>
        <text x={250} y={140} textAnchor="middle" fontFamily={codigo} fontSize={22} fill={n.texto2} opacity={k > 0.3 ? 1 : 0}>
          questions it may have seen
        </text>
        <text x={700} y={140} textAnchor="middle" fontFamily={codigo} fontSize={22} fill={n.verde} opacity={k > 0.9 ? 1 : 0}>
          fresh questions → clean
        </text>
      </svg>
      <Nota at={cV + largoV * 0.7} tam={22} style={{ marginTop: 6 }}>
        e.g. LiveBench (White et al., 2025, ICLR) and LiveCodeBench (Jain et al., 2025, ICLR) add new questions over time
      </Nota>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 26 }}>
        {pasos.map(([p, d, col], i) => (
          <Tarjeta key={p} at={cT + largoT * (0.1 + i * 0.18)} color={col}>
            <div style={{ fontSize: 30, fontWeight: 500 }}>{p}</div>
            <div style={{ fontSize: 24, color: n.texto2, marginTop: 2 }}>{d}</div>
          </Tarjeta>
        ))}
      </div>
    </Escena>
  );
};

// ─── LLM como juez ────────────────────────────────────────────────────────────
export const Juez: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("sesgos");
  const cC = useCue("calibrar");
  const largoS = useCueAt("sesgos", 1) - cS;
  const largoC = useCueAt("calibrar", 1) - cC;
  const kK = transicion(frame, cC + largoC * 0.7, fps, 600, backOut);
  const sesgos: [string, string, number][] = [
    ["position", "prefers answer A", 0.35],
    ["verbosity", "prefers the longest", 0.55],
    ["self-preference", "prefers its own", 0.75],
  ];
  const pasos: [string, string][] = [
    ["swap the order", n.azul],
    ["use a rubric", n.amarillo],
    ["agreement with humans", n.verde],
  ];
  return (
    <Escena>
      <Cabeza at={cS} serie={SERIE} titulo="LLM as|*a judge.*" />
      <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
        {sesgos.map(([s, d, f]) => (
          <Tarjeta key={s} at={cS + largoS * f} color={n.rojo} style={{ flex: 1 }}>
            <div style={{ fontSize: 28, fontWeight: 500 }}>{s}</div>
            <div style={{ fontSize: 22, color: n.texto2, marginTop: 4 }}>{d}</div>
          </Tarjeta>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
        {pasos.map(([p, col], i) => (
          <Chip key={p} at={cC + largoC * (0.05 + i * 0.15)} color={col}>
            <Check size={22} strokeWidth={2} /> {p}
          </Chip>
        ))}
      </div>
      <FormulaCard
        at={cC + largoC * 0.45}
        tam={52}
        style={{ marginTop: 26 }}
        formula={
          <>
            <Var color={n.verde}>κ</Var>
            <Op>=</Op>
            <Frac arriba={<span><Var>p</Var>{sub("o")} − <Var>p</Var>{sub("e")}</span>} abajo={<span>1 − <Var>p</Var>{sub("e")}</span>} />
            <span style={{ marginLeft: 36 }} />
            <span style={{ fontSize: "0.75em", color: n.texto2 }}>
              <Frac arriba="0.85 − 0.50" abajo="1 − 0.50" />
            </span>
            <Op>=</Op>
            <Var color={n.verde}>0.70</Var>
          </>
        }
        leyenda={[
          ["p_o", n.texto, "observed agreement judge–human"],
          ["p_e", n.texto, "agreement expected by chance"],
        ]}
      />
      <Tarjeta at={cC + largoC * 0.7} color={n.verde} style={{ marginTop: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, color: n.texto2 }}>
            <Users size={32} strokeWidth={1.6} color={n.verde} /> strong judge vs humans
          </span>
          <span style={{ fontSize: 56, fontWeight: 500, color: n.verde, display: "inline-block", transform: `scale(${Math.max(0, kK)})`, transformOrigin: "right" }}>&gt; 80%</span>
        </div>
      </Tarjeta>
      <Nota at={cC + largoC * 0.8} tam={22} style={{ marginTop: 12 }}>
        Zheng et al. (2023), «Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena», NeurIPS · κ: Cohen (1960) · example values illustrative
      </Nota>
    </Escena>
  );
};

// ─── PPI: corregir al juez con pocas etiquetas ────────────────────────────────
export const Ppi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cR = useCue("rectificar");
  const cG = useCue("ganancia");
  const largoG = useCueAt("ganancia", 1) - cG;
  const k1 = transicion(frame, cG + largoG * 0.1, fps, 800, EXPO_OUT);
  const k2 = transicion(frame, cG + largoG * 0.35, fps, 800, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cR} serie={SERIE} titulo="Correct the judge|*with a few humans.*" />
      <FormulaCard
        at={cR + 14}
        tam={44}
        style={{ marginTop: 26 }}
        formula={
          <>
            <Var color={n.verde}>θ̂</Var>
            {sub("PP")}
            <Op>=</Op>
            <span style={{ color: n.azul }}>
              mean{sub("N")}(<Var color={n.azul}>judge</Var>)
            </span>
            <Op>−</Op>
            <span style={{ color: n.amarillo }}>
              mean{sub("n")}(<Var color={n.amarillo}>judge − human</Var>)
            </span>
          </>
        }
        leyenda={[
          ["N = 10,000", n.azul, "cases scored only by the judge"],
          ["n = 300", n.amarillo, "cases also labeled by people"],
        ]}
      />
      <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", marginTop: 24, fontFamily: codigo, fontSize: 44 }}>
        <Sube at={cR + 50}>
          <span style={{ color: n.azul }}>0.82</span>
        </Sube>
        <Sube at={cR + 60}>
          <span style={{ color: n.texto2 }}>−</span>
        </Sube>
        <Sube at={cR + 70}>
          <span style={{ color: n.amarillo }}>0.06</span>
        </Sube>
        <Sube at={cR + 80}>
          <span style={{ color: n.texto2 }}>=</span>
        </Sube>
        <Sube at={cR + 90}>
          <span style={{ color: n.verde, fontWeight: 500 }}>0.76</span>
        </Sube>
      </div>
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 30 }}>95% interval for the pass rate</div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 10, opacity: Math.min(1, k1 * 2) }}>
        <div style={{ width: 230, fontSize: 26 }}>300 humans only</div>
        <div style={{ flex: 1 }}>
          <Intervalo centro={76} semi={4.83} min={66} max={86} color={n.rojo} k={k1} />
        </div>
        <div style={{ width: 100, fontFamily: codigo, fontSize: 26, color: n.rojo, textAlign: "right" }}>±4.8</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 10, opacity: Math.min(1, k2 * 2) }}>
        <div style={{ width: 230, fontSize: 26 }}>judge + 300 humans</div>
        <div style={{ flex: 1 }}>
          <Intervalo centro={76} semi={3.59} min={66} max={86} color={n.verde} k={k2} />
        </div>
        <div style={{ width: 100, fontFamily: codigo, fontSize: 26, color: n.verde, textAlign: "right" }}>±3.6</div>
      </div>
      <Tarjeta at={cG + largoG * 0.6} color={n.verde} style={{ marginTop: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 26, color: n.texto2 }}>same precision as</span>
          <span style={{ fontSize: 52, fontWeight: 500, color: n.verde }}>≈ 543 human labels</span>
        </div>
      </Tarjeta>
      <Nota at={cG + largoG * 0.75} tam={22} style={{ marginTop: 12 }}>
        Angelopoulos et al. (2023), «Prediction-powered inference», Science · numbers illustrative (judge–human disagreement 10%)
      </Nota>
    </Escena>
  );
};

// ─── Red teaming ──────────────────────────────────────────────────────────────
export const Redteam: React.FC = () => {
  const cA = useCue("ataques");
  const cS = useCue("sufijos");
  const largoA = useCueAt("ataques", 1) - cA;
  const largoS = useCueAt("sufijos", 1) - cS;
  const filas: [string, string, string, React.ReactNode, number, number][] = [
    ["Jailbreak", "role-play or framing that bypasses the rules", n.rojo, <Swords key="s" size={40} strokeWidth={1.6} color={n.rojo} />, cA, 0.35],
    ["Indirect prompt injection", "instructions hidden in a document, email or web page", n.amarillo, <FileWarning key="f" size={40} strokeWidth={1.6} color={n.amarillo} />, cA, 0.6],
    ["Adversarial suffix (GCG)", "gradient-optimized tokens that transfer across models", n.azul, <Sparkles key="k" size={40} strokeWidth={1.6} color={n.azul} />, cS, 0.15],
  ];
  return (
    <Escena>
      <Cabeza at={cA} serie={SERIE} titulo="Red teaming:|*break it on purpose.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 30 }}>
        {filas.map(([t, d, col, ic, base, f]) => (
          <Tarjeta key={t} at={base + (base === cA ? largoA : largoS) * f} color={col}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              {ic}
              <div>
                <div style={{ fontSize: 30, fontWeight: 500 }}>{t}</div>
                <div style={{ fontSize: 24, color: n.texto2, marginTop: 2 }}>{d}</div>
              </div>
            </div>
          </Tarjeta>
        ))}
      </div>
      <FormulaCard
        at={cS + largoS * 0.6}
        tam={52}
        style={{ marginTop: 26 }}
        formula={
          <>
            <Var recta>ASR</Var>
            <Op>=</Op>
            <Frac arriba={<span>successful attacks</span>} abajo={<span>attempts</span>} />
          </>
        }
        leyenda={[["ASR", n.texto, "attack success rate, per category"]]}
      />
      <Nota at={cS + largoS * 0.75} tam={22} style={{ marginTop: 12 }}>
        Perez et al. (2022), EMNLP · Greshake et al. (2023), AISec · Zou et al. (2023), «Universal and Transferable Adversarial Attacks on Aligned LMs»
      </Nota>
    </Escena>
  );
};

// ─── Cero de cien no es cero ──────────────────────────────────────────────────
export const Cero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("cien");
  const cT = useCue("tres");
  const largoC = useCueAt("cien", 1) - cC;
  const k = transicion(frame, cC + largoC * 0.4, fps, 1200, EXPO_IN_OUT);
  const kS = transicion(frame, cC + largoC * 0.75, fps, 700, EXPO_OUT);
  const dens = (p: number) => 101 * Math.pow(1 - p, 100);
  const ps = Array.from({ length: 81 }, (_, i) => (i / 80) * 0.06 * k);
  const q95 = 0.0292;
  return (
    <Escena>
      <Cabeza at={cC} serie={SERIE} titulo="0 of 100|*is not zero risk.*" />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 26 }}>
        {Array.from({ length: 100 }, (_, i) => (
          <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: n.verdeClaro, border: `2px solid ${n.verde}`, opacity: transicion(frame, cC + i * 0.25, fps, 200, EXPO_OUT) }} />
        ))}
      </div>
      <div style={{ fontFamily: codigo, fontSize: 22, color: n.texto2, marginTop: 8 }}>100 attacks · 0 succeeded</div>
      <div style={{ marginTop: 14 }}>
        <Ejes ancho={912} alto={360} x={[0, 0.06]} y={[0, 105]} at={cC + largoC * 0.35} rotuloX="true attack success rate →" rotuloY="posterior density" marcasX={[0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06].map((m) => ({ v: m, t: `${Math.round(m * 100)}%` }))}>
          {({ px, py }) => (
            <g>
              <path d={`M${px(0)},${py(0)} ${Array.from({ length: 41 }, (_, i) => (i / 40) * q95).map((p) => `L${px(p)},${py(dens(p))}`).join(" ")} L${px(q95)},${py(0)} Z`} fill={n.azulClaro} opacity={kS} />
              <path d={`M${ps.map((p) => `${px(p)},${py(dens(p))}`).join("L")}`} fill="none" stroke={n.azul} strokeWidth={6} />
              <g opacity={kS}>
                <line x1={px(q95)} y1={py(0)} x2={px(q95)} y2={py(80)} stroke={n.rojo} strokeWidth={3} strokeDasharray="8 8" />
                <text x={px(q95) + 14} y={py(70)} fontFamily={codigo} fontSize={26} fill={n.rojo}>
                  95% → up to 2.9%
                </text>
              </g>
            </g>
          )}
        </Ejes>
      </div>
      <FormulaCard
        at={cT + 4}
        tam={46}
        style={{ marginTop: 12 }}
        formula={
          <>
            <Var color={n.azul}>p</Var> | 0 of <Var>n</Var>
            <Op>~</Op>
            <Var recta>Beta</Var>(1, <Var>n</Var> + 1)
            <span style={{ marginLeft: 36 }} />
            <Var recta>upper</Var>
            {sub("95%")}
            <Op>≈</Op>
            <Frac arriba="3" abajo={<Var>n</Var>} />
          </>
        }
        leyenda={[["Beta(1, 1)", n.texto, "uniform prior: every rate equally plausible before testing"]]}
      />
      <Nota at={cT + 30} tam={22} style={{ marginTop: 10 }}>
        Hanley & Lippman-Hand (1983), «If nothing goes wrong, is everything all right?», JAMA
      </Nota>
    </Escena>
  );
};

// ─── En Google Cloud ──────────────────────────────────────────────────────────
export const Nube: React.FC = () => {
  const at = useCue("gcp");
  const largo = useCueAt("gcp", 1) - at;
  return (
    <Escena>
      <Cabeza at={at} serie={SERIE} titulo="On|*Google Cloud.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 40 }}>
        <Tarjeta at={at + 8} color={n.azul}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Gavel size={50} strokeWidth={1.5} color={n.azul} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>Vertex AI Gen AI evaluation</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>model-based judges, pointwise or pairwise, plus computed metrics</div>
            </div>
          </div>
        </Tarjeta>
        <Tarjeta at={at + largo * 0.6} color={n.verde}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <ShieldCheck size={50} strokeWidth={1.5} color={n.verde} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>Model Armor</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>screens prompts and responses for prompt injection and jailbreaks</div>
            </div>
          </div>
        </Tarjeta>
      </div>
      <Nota at={at + largo * 0.8} tam={22} style={{ marginTop: 22 }}>
        Google Cloud docs: «Gen AI evaluation service overview» · «Model Armor overview»
      </Nota>
    </Escena>
  );
};

// ─── Las bases ────────────────────────────────────────────────────────────────
export const Bases: React.FC = () => {
  const at = useCue("bases");
  const largo = useCueAt("bases", 1) - at;
  const ideas: [string, string, string, number][] = [
    ["Standard error & pairing", "√(p(1 − p)/n), same questions for both models", n.azul, 0.08],
    ["Contamination", "fresh questions after the cutoff", n.amarillo, 0.3],
    ["Calibrated judges", "agreement with humans, then correct the bias", n.verde, 0.5],
    ["Beta distribution", "0 of n still allows up to ≈ 3/n", n.azul, 0.75],
  ];
  return (
    <Escena>
      <Cabeza at={at} serie={SERIE} titulo="The|*basics.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 40 }}>
        {ideas.map(([p, r, col, f]) => (
          <Tarjeta key={p} at={at + largo * f} color={col}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <Check size={44} strokeWidth={2} color={col} />
              <div>
                <div style={{ fontSize: 32, fontWeight: 500 }}>{p}</div>
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
      <div style={{ marginTop: 260 }}>
        <Cinetico at={at} texto="No error bars,|*no conclusion.*" tam={96} />
        <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={at + 20}>Share · Follow</Pildora>
          <Sube at={at + 26}>
            <div style={{ fontSize: 30, color: n.texto2 }}>{autor}</div>
          </Sube>
        </div>
      </div>
    </Escena>
  );
};
