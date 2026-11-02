import React from "react";
import { Check, Cpu, Sparkles, ThumbsDown, ThumbsUp, Trophy } from "lucide-react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cabeza, Chip, Cinetico, Ejes, Escena, FormulaCard, Frac, Nota, Op, Pildora, Sube, Tarjeta, Var } from "../../estilos/nube/kit";
import { codigo, n, tipo } from "../../estilos/nube/tokens";
import { CANDIDATOS, KL_BON, PRIOR, RECOMPENSA, posterior } from "./datos";

const SERIE = "Tech capsule · Alignment & preferences";
const sub = (t: string) => <sub style={{ fontSize: "0.5em" }}>{t}</sub>;

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c1 = useCue("13");
  const cP = useCue("pref");
  const largo1 = useCueAt("13", 1) - c1;
  const k1 = transicion(frame, c1 + 6, fps, 900, EXPO_OUT);
  const k2 = transicion(frame, c1 + largo1 * 0.45, fps, 900, EXPO_OUT);
  const barra = (lab: string, b: number, col: string, k: number, gana: boolean) => (
    <div style={{ marginTop: 26, opacity: Math.min(1, k * 2) }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {lab}
          {gana ? (
            <Chip at={cP + 6} color={n.verde}>
              <Trophy size={22} strokeWidth={2} /> preferred
            </Chip>
          ) : null}
        </span>
        <span style={{ fontWeight: 500, color: col }}>{(b * k).toFixed(b < 10 ? 1 : 0)} B params</span>
      </div>
      <div style={{ height: 56, borderRadius: 12, background: n.superficie, border: `2px solid ${n.borde}`, marginTop: 10 }}>
        <div style={{ height: "100%", width: `${(b / 175) * 100 * k}%`, minWidth: k > 0 ? 10 : 0, borderRadius: 10, background: col }} />
      </div>
    </div>
  );
  return (
    <Escena>
      <div style={{ ...tipo.cuerpo, color: n.texto2 }}>human raters compared answers · 2022</div>
      {barra("GPT-3", 175, n.rojo, k1, false)}
      {barra("InstructGPT", 1.3, n.verde, k2, true)}
      <Sube at={cP + 16} style={{ marginTop: 30 }}>
        <Chip at={cP + 16} color={n.azul}>
          100× fewer parameters
        </Chip>
      </Sube>
      <Nota at={cP + 24} tam={22} style={{ marginTop: 18 }}>
        Ouyang et al. (2022), «Training language models to follow instructions with human feedback», NeurIPS
      </Nota>
      <div style={{ marginTop: 50 }}>
        <Cinetico at={cP + 34} texto="Not size.|*Alignment.*" tam={96} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ marginTop: 300 }}>
      <div style={{ ...tipo.rotulo, color: n.azul }}>TECH CAPSULE</div>
      <Cinetico at={8} texto="Alignment &|*preference|optimization.*" tam={116} style={{ marginTop: 18 }} />
      <Sube at={28}>
        <div style={{ ...tipo.cuerpo, color: n.texto2, marginTop: 24 }}>RLHF · DPO · KTO · ORPO · best-of-n · by {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── RLHF ─────────────────────────────────────────────────────────────────────
export const Rlhf: React.FC = () => {
  const cS = useCue("sft");
  const cK = useCue("kl");
  const largoS = useCueAt("sft", 1) - cS;
  const pasos: [string, string, string, number][] = [
    ["1 · SFT", "imitate human demonstrations", n.azul, 0.25],
    ["2 · Reward model", "learn from comparisons: A ≻ B", n.amarillo, 0.45],
    ["3 · RL with PPO", "maximize the learned reward", n.verde, 0.75],
  ];
  return (
    <Escena>
      <Cabeza at={cS} serie={SERIE} titulo="RLHF in|*three steps.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 30 }}>
        {pasos.map(([p, d, col, f]) => (
          <Tarjeta key={p} at={cS + largoS * f} color={col}>
            <div style={{ fontSize: 32, fontWeight: 500 }}>{p}</div>
            <div style={{ fontSize: 26, color: n.texto2, marginTop: 2 }}>{d}</div>
          </Tarjeta>
        ))}
      </div>
      <FormulaCard
        at={cK + 4}
        tam={46}
        style={{ marginTop: 26 }}
        formula={
          <>
            max <span style={{ marginRight: "0.3em" }} />
            <Var recta>𝔼</Var>[<Var color={n.verde}>r</Var>(<Var>x</Var>, <Var>y</Var>)]
            <Op>−</Op>
            <Var color={n.azul}>β</Var>
            <Op>·</Op>
            <Var recta>KL</Var>(<Var>π</Var>
            {sub("θ")} ‖ <Var color={n.texto3}>π</Var>
            {sub("ref")})
          </>
        }
        leyenda={[
          ["r", n.verde, "learned reward"],
          ["π_ref", n.texto3, "the SFT model"],
          ["β", n.azul, "how far you may drift"],
        ]}
        columnas={1}
      />
      <Nota at={cK + 20} tam={22} style={{ marginTop: 14 }}>
        Christiano et al. (2017), NeurIPS · Ouyang et al. (2022), NeurIPS · PPO: Schulman et al. (2017)
      </Nota>
    </Escena>
  );
};

// ─── Bradley-Terry ────────────────────────────────────────────────────────────
const sigm = (z: number) => 1 / (1 + Math.exp(-z));
export const Bradley: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cB = useCue("bt");
  const cS = useCue("sigma");
  const largoS = useCueAt("sigma", 1) - cS;
  const k = transicion(frame, cS + 6, fps, 1200, EXPO_IN_OUT);
  const kP = transicion(frame, cS + largoS * 0.6, fps, 600, backOut);
  const pts = Array.from({ length: 81 }, (_, i) => -4 + (i / 80) * 8 * k);
  return (
    <Escena>
      <Cabeza at={cB} serie={SERIE} titulo="From comparisons|*to numbers.*" />
      <FormulaCard
        at={cB + 16}
        tam={54}
        style={{ marginTop: 26 }}
        formula={
          <>
            <Var recta>P</Var>(<Var color={n.azul}>A</Var> ≻ <Var color={n.rojo}>B</Var>)<Op>=</Op>
            <Var color={n.verde}>σ</Var>(<Var color={n.azul}>r</Var>
            {sub("A")}
            <Op>−</Op>
            <Var color={n.rojo}>r</Var>
            {sub("B")})
            <span style={{ marginLeft: 36 }} />
            <Var color={n.verde}>σ</Var>(<Var>z</Var>)<Op>=</Op>
            <Frac arriba="1" abajo={<span>1 + e<sup style={{ fontSize: "0.55em" }}>−z</sup></span>} />
          </>
        }
        leyenda={[
          ["r", n.texto, "reward score of each answer"],
          ["σ", n.verde, "sigmoid: any number → probability"],
        ]}
      />
      <div style={{ marginTop: 22 }}>
        <Ejes
          ancho={912}
          alto={440}
          x={[-4, 4]}
          y={[0, 1]}
          at={cS}
          rotuloX="r_A − r_B →"
          rotuloY="P(A preferred)"
          marcasX={[-4, -2, 0, 1, 2, 4].map((m) => ({ v: m, t: String(m) }))}
          marcasY={[0, 0.5, 0.73, 1].map((m) => ({ v: m, t: m.toFixed(2) }))}
        >
          {({ px, py }) => (
            <g>
              <path d={`M${pts.map((z) => `${px(z)},${py(sigm(z))}`).join("L")}`} fill="none" stroke={n.verde} strokeWidth={6} />
              <g opacity={Math.min(1, kP)}>
                <line x1={px(1)} y1={py(0)} x2={px(1)} y2={py(sigm(1))} stroke={n.azul} strokeWidth={3} strokeDasharray="8 8" />
                <line x1={px(-4)} y1={py(sigm(1))} x2={px(1)} y2={py(sigm(1))} stroke={n.azul} strokeWidth={3} strokeDasharray="8 8" />
                <circle cx={px(1)} cy={py(sigm(1))} r={14 * kP} fill={n.azul} />
                <text x={px(1) + 26} y={py(sigm(1)) + 44} fontFamily={codigo} fontSize={28} fill={n.azul}>
                  1 point ahead → 73%
                </text>
              </g>
            </g>
          )}
        </Ejes>
      </div>
      <Nota at={cS + largoS * 0.8} tam={22} style={{ marginTop: 8 }}>
        Bradley & Terry (1952), «Rank Analysis of Incomplete Block Designs», Biometrika
      </Nota>
    </Escena>
  );
};

// ─── Bayes: previo × verosimilitud ────────────────────────────────────────────
export const Bayes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("prior");
  const cB = useCue("beta");
  const largoP = useCueAt("prior", 1) - cP;
  const largoB = useCueAt("beta", 1) - cB;
  const kPrior = transicion(frame, cP + largoP * 0.35, fps, 700, EXPO_OUT);
  const kPost = transicion(frame, cP + largoP * 0.7, fps, 700, EXPO_OUT);
  // log β: 0 (β = 1) → log 4 (β grande) → log 0.5 (β chico)
  const logB = interpolate(frame, [cB + largoB * 0.1, cB + largoB * 0.35, cB + largoB * 0.6, cB + largoB * 0.85], [0, Math.log(4), Math.log(4), Math.log(0.5)], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EXPO_IN_OUT,
  });
  const beta = Math.exp(logB);
  const post = posterior(beta);
  const H = 230;
  const nombres = ["answer A", "answer B", "answer C"];
  return (
    <Escena>
      <Cabeza at={cP} serie={SERIE} titulo="The Bayes|*hidden inside.*" />
      <FormulaCard
        at={cP + 10}
        tam={50}
        style={{ marginTop: 24 }}
        formula={
          <>
            <Var color={n.verde}>π</Var>
            <sup style={{ fontSize: "0.5em" }}>*</sup>(<Var>y</Var>|<Var>x</Var>)<Op>=</Op>
            <Frac arriba="1" abajo={<Var>Z</Var>} />
            <Var color={n.texto3}>π</Var>
            {sub("ref")}(<Var>y</Var>|<Var>x</Var>)<Op>·</Op>
            <Var recta>exp</Var>
            <span>(</span>
            <Frac arriba={<Var color={n.azul}>r</Var>} abajo={<Var color={n.azul}>β</Var>} />
            <span>)</span>
          </>
        }
        leyenda={[
          ["π_ref", n.texto3, "prior: the original model"],
          ["exp(r/β)", n.azul, "likelihood: evidence from the reward"],
          ["π*", n.verde, "posterior: the aligned model"],
        ]}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 26 }}>
        <span style={{ fontFamily: codigo, fontSize: 24, color: n.texto2 }}>prior → posterior · rewards 0, 1, 2</span>
        <span style={{ fontFamily: "'STIX Two Text', serif", fontStyle: "italic", fontSize: 44, color: n.azul, opacity: kPost }}>β = {beta.toFixed(1)}</span>
      </div>
      <div style={{ display: "flex", gap: 30, marginTop: 14, height: H + 70 }}>
        {PRIOR.map((p, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end", height: H }}>
              <div style={{ flex: 1, height: p * H * 1.2 * kPrior, background: n.texto3, borderRadius: 8, position: "relative" }}>
                <span style={{ position: "absolute", top: -34, width: "100%", textAlign: "center", fontFamily: codigo, fontSize: 22, color: n.texto2, opacity: kPrior }}>{p.toFixed(2)}</span>
              </div>
              <div style={{ flex: 1, height: post[i] * H * 1.2 * kPost, background: n.verde, borderRadius: 8, position: "relative" }}>
                <span style={{ position: "absolute", top: -34, width: "100%", textAlign: "center", fontFamily: codigo, fontSize: 22, color: n.verde, opacity: kPost }}>{post[i].toFixed(2)}</span>
              </div>
            </div>
            <div style={{ textAlign: "center", fontSize: 24, color: n.texto2, marginTop: 10 }}>
              {nombres[i]} · r = {RECOMPENSA[i]}
            </div>
          </div>
        ))}
      </div>
      <Nota at={cB + largoB * 0.2} tam={22} style={{ marginTop: 10 }}>
        Korbak, Perez & Buckley (2022), «RL with KL penalties is better viewed as Bayesian inference», Findings of EMNLP · toy numbers
      </Nota>
    </Escena>
  );
};

// ─── DPO ──────────────────────────────────────────────────────────────────────
export const Dpo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cD = useCue("dpo");
  const cL = useCue("perdida");
  const largoL = useCueAt("perdida", 1) - cL;
  const kL = transicion(frame, cL + largoL * 0.72, fps, 500, backOut);
  const logRatio = (
    <>
      log <Frac arriba={<span><Var>π</Var>{sub("θ")}(<Var>y</Var>|<Var>x</Var>)</span>} abajo={<span><Var color={n.texto3}>π</Var>{sub("ref")}(<Var>y</Var>|<Var>x</Var>)</span>} />
    </>
  );
  return (
    <Escena>
      <Cabeza at={cD} serie={SERIE} titulo="DPO: the model is|*the reward model.*" />
      <FormulaCard
        at={cD + 14}
        tam={46}
        style={{ marginTop: 24 }}
        formula={
          <>
            <Var color={n.azul}>r̂</Var>(<Var>x</Var>, <Var>y</Var>)<Op>=</Op>
            <Var color={n.azul}>β</Var>
            <Op>·</Op>
            {logRatio}
          </>
        }
        leyenda={[["r̂", n.azul, "implicit reward: no separate reward model"]]}
      />
      <FormulaCard
        at={cL + 6}
        tam={50}
        style={{ marginTop: 18 }}
        formula={
          <>
            <Var recta>L</Var>
            {sub("DPO")}
            <Op>=</Op>−log <Var color={n.texto2}>σ</Var>(<Var color={n.verde}>r̂</Var>
            {sub("w")}
            <Op>−</Op>
            <Var color={n.rojo}>r̂</Var>
            {sub("l")})
          </>
        }
        leyenda={[
          ["w", n.verde, "chosen answer · push up"],
          ["l", n.rojo, "rejected answer · push down"],
        ]}
        columnas={2}
      />
      <div style={{ display: "flex", gap: 16, marginTop: 22 }}>
        <Tarjeta at={cL + largoL * 0.6} color={n.amarillo} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>step 0 · margin = 0</div>
          <div style={{ fontSize: 56, fontWeight: 500, color: n.amarillo, display: "inline-block", transform: `scale(${Math.max(0, kL)})`, transformOrigin: "left" }}>ln 2 ≈ 0.69</div>
        </Tarjeta>
        <Tarjeta at={cL + largoL * 0.8} color={n.verde} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>β = 0.1 · log-ratios +2, −1</div>
          <div style={{ fontSize: 56, fontWeight: 500, color: n.verde }}>0.55</div>
        </Tarjeta>
      </div>
      <Nota at={cL + largoL * 0.4} tam={22} style={{ marginTop: 14 }}>
        Rafailov et al. (2023), «Direct Preference Optimization: Your Language Model is Secretly a Reward Model», NeurIPS
      </Nota>
    </Escena>
  );
};

// ─── KTO ──────────────────────────────────────────────────────────────────────
const valorPT = (z: number) => (z >= 0 ? Math.pow(z, 0.88) : -2.25 * Math.pow(-z, 0.88));
export const Kto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cK = useCue("kto");
  const cH = useCue("kahneman");
  const largoK = useCueAt("kto", 1) - cK;
  const k = transicion(frame, cH + 6, fps, 1200, EXPO_IN_OUT);
  const pts = Array.from({ length: 101 }, (_, i) => -1 + (i / 100) * 2 * k);
  return (
    <Escena>
      <Cabeza at={cK} serie={SERIE} titulo="KTO: no pairs,|*just thumbs.*" />
      <div style={{ display: "flex", gap: 16, marginTop: 30 }}>
        <Tarjeta at={cK + largoK * 0.3} color={n.texto3} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>DPO needs pairs</div>
          <div style={{ fontFamily: codigo, fontSize: 40, marginTop: 6 }}>A ≻ B</div>
        </Tarjeta>
        <Tarjeta at={cK + largoK * 0.6} color={n.azul} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>KTO takes single labels</div>
          <div style={{ display: "flex", gap: 22, marginTop: 8 }}>
            <ThumbsUp size={46} strokeWidth={1.8} color={n.verde} />
            <ThumbsDown size={46} strokeWidth={1.8} color={n.rojo} />
          </div>
        </Tarjeta>
      </div>
      <div style={{ marginTop: 26 }}>
        <Ejes
          ancho={912}
          alto={500}
          x={[-1, 1]}
          y={[-2.4, 1.2]}
          at={cH}
          rotuloX="outcome: loss ← → gain"
          rotuloY="subjective value"
          marcasX={[-1, 0, 1].map((m) => ({ v: m, t: String(m) }))}
          marcasY={[-2, -1, 0, 1].map((m) => ({ v: m, t: String(m) }))}
        >
          {({ px, py }) => (
            <g>
              <line x1={px(0)} y1={py(-2.4)} x2={px(0)} y2={py(1.2)} stroke={n.texto3} strokeWidth={2} />
              <path d={`M${pts.map((z) => `${px(z)},${py(valorPT(z))}`).join("L")}`} fill="none" stroke={n.azul} strokeWidth={6} />
              <g opacity={k > 0.95 ? 1 : 0}>
                <text x={px(0.25)} y={py(1) - 8} fontFamily={codigo} fontSize={24} fill={n.verde}>
                  gain of 1 → +1
                </text>
                <text x={px(-0.95)} y={py(-2.25) + 50} fontFamily={codigo} fontSize={24} fill={n.rojo}>
                  loss of 1 → −2.25
                </text>
              </g>
            </g>
          )}
        </Ejes>
      </div>
      <Nota at={cH + 30} tam={22} style={{ marginTop: 8 }}>
        Tversky & Kahneman (1992), J. Risk Uncertainty: α = 0.88, λ = 2.25 · Ethayarajh et al. (2024), «KTO», ICML
      </Nota>
    </Escena>
  );
};

// ─── ORPO ─────────────────────────────────────────────────────────────────────
export const Orpo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cO = useCue("odds");
  const cM = useCue("modelos");
  const largoM = useCueAt("modelos", 1) - cM;
  const filas: [string, string[], string, number][] = [
    ["PPO", ["policy", "reference", "reward", "value"], n.rojo, 0.15],
    ["DPO", ["policy", "reference"], n.amarillo, 0.45],
    ["ORPO", ["policy"], n.verde, 0.75],
  ];
  return (
    <Escena>
      <Cabeza at={cO} serie={SERIE} titulo="ORPO: no reference|*model at all.*" />
      <FormulaCard
        at={cO + 12}
        tam={46}
        style={{ marginTop: 24 }}
        formula={
          <>
            <Var recta>odds</Var>(<Var>y</Var>)<Op>=</Op>
            <Frac arriba={<span><Var recta>P</Var>(<Var>y</Var>|<Var>x</Var>)</span>} abajo={<span>1 − <Var recta>P</Var>(<Var>y</Var>|<Var>x</Var>)</span>} />
          </>
        }
      />
      <FormulaCard
        at={cO + 30}
        tam={44}
        style={{ marginTop: 16 }}
        formula={
          <>
            <Var recta>L</Var>
            <Op>=</Op>
            <Var recta>L</Var>
            {sub("SFT")}
            <Op>−</Op>
            <Var color={n.azul}>λ</Var> log <Var color={n.texto2}>σ</Var>
            <span>(</span>log <Frac arriba={<span><Var recta>odds</Var>(<Var color={n.verde}>y</Var>{sub("w")})</span>} abajo={<span><Var recta>odds</Var>(<Var color={n.rojo}>y</Var>{sub("l")})</span>} />
            <span>)</span>
          </>
        }
        leyenda={[["λ", n.azul, "weight of the preference term"]]}
      />
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 26, opacity: transicion(frame, cM, fps, 400, EXPO_OUT) }}>model copies in GPU memory</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
        {filas.map(([nom, mods, col, f]) => (
          <Sube key={nom} at={cM + largoM * f}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 120, fontSize: 32, fontWeight: 500, color: col }}>{nom}</div>
              {mods.map((m) => (
                <div key={m} style={{ width: 170, height: 64, borderRadius: 10, border: `2px solid ${col}`, background: n.superficie, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: n.texto2 }}>
                  {m}
                </div>
              ))}
            </div>
          </Sube>
        ))}
      </div>
      <Nota at={cM + largoM * 0.85} tam={22} style={{ marginTop: 14 }}>
        Hong, Lee & Thorne (2024), «ORPO: Monolithic Preference Optimization without Reference Model», EMNLP
      </Nota>
    </Escena>
  );
};

// ─── Best-of-n / rejection sampling ───────────────────────────────────────────
export const Rechazo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cB = useCue("bon");
  const cK = useCue("klbon");
  const largoB = useCueAt("bon", 1) - cB;
  const largoK = useCueAt("klbon", 1) - cK;
  const mejor = CANDIDATOS.indexOf(Math.max(...CANDIDATOS));
  const elige = frame >= cB + largoB * 0.75;
  const kC = transicion(frame, cK + largoK * 0.2, fps, 1000, EXPO_IN_OUT);
  const ns = Array.from({ length: 61 }, (_, i) => Math.pow(2, (i / 60) * 8 * kC));
  const kl = (m: number) => Math.log(m) - (m - 1) / m;
  return (
    <Escena>
      <Cabeza at={cB} serie={SERIE} titulo="Best-of-n:|*sample, then pick.*" />
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 24 }}>n = 16 answers · reward-model score</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 10, marginTop: 12 }}>
        {CANDIDATOS.map((s, i) => {
          const a = transicion(frame, cB + 6 + i * 2, fps, 300, EXPO_OUT);
          const win = elige && i === mejor;
          return (
            <div key={i} style={{ height: 76, borderRadius: 10, border: `2px solid ${win ? n.verde : n.borde}`, background: win ? n.verdeClaro : n.superficie, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 24, color: win ? n.verde : n.texto2, opacity: elige && !win ? 0.45 * a : a, fontWeight: win ? 500 : 400 }}>
              {s.toFixed(1)}
            </div>
          );
        })}
      </div>
      <FormulaCard
        at={cK + 4}
        tam={52}
        style={{ marginTop: 24 }}
        formula={
          <>
            <Var recta>KL</Var>
            {sub("best-of-n")}
            <Op>=</Op>log <Var color={n.azul}>n</Var>
            <Op>−</Op>
            <Frac arriba={<span><Var color={n.azul}>n</Var> − 1</span>} abajo={<Var color={n.azul}>n</Var>} />
          </>
        }
        leyenda={[["n", n.azul, "number of samples · result in nats"]]}
      />
      <div style={{ marginTop: 18 }}>
        <Ejes
          ancho={912}
          alto={330}
          x={[0, 8]}
          y={[0, 5]}
          at={cK + 10}
          rotuloX="n (log scale) →"
          rotuloY="KL from the base model"
          marcasX={[1, 4, 16, 64, 256].map((m) => ({ v: Math.log2(m), t: String(m) }))}
          marcasY={[0, 2, 4].map((m) => ({ v: m, t: String(m) }))}
        >
          {({ px, py }) => (
            <g>
              <path d={`M${ns.map((m) => `${px(Math.log2(m))},${py(kl(m))}`).join("L")}`} fill="none" stroke={n.azul} strokeWidth={6} />
              <g opacity={kC > 0.6 ? 1 : 0}>
                <circle cx={px(4)} cy={py(KL_BON[16])} r={13} fill={n.verde} />
                <text x={px(4) + 22} y={py(KL_BON[16]) + 40} fontFamily={codigo} fontSize={26} fill={n.verde}>
                  n = 16 → {(Math.round(KL_BON[16] * 100) / 100).toFixed(2)} nats
                </text>
              </g>
            </g>
          )}
        </Ejes>
      </div>
      <Nota at={cK + largoK * 0.7} tam={22} style={{ marginTop: 6 }}>
        Stiennon et al. (2020), NeurIPS · Gao, Schulman & Hilton (2023), ICML · Llama 2 rejection-sampling fine-tuning (Touvron et al., 2023) · scores illustrative
      </Nota>
    </Escena>
  );
};

// ─── Reward hacking ───────────────────────────────────────────────────────────
const proxy = (d: number) => 0.55 * d;
const real = (d: number) => (d <= 0 ? 0 : d * (1 - 0.35 * Math.log(d)));
export const Hacking: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cG = useCue("goodhart");
  const cC = useCue("curva");
  const largoC = useCueAt("curva", 1) - cC;
  const k = transicion(frame, cC + 4, fps, 1500, EXPO_IN_OUT);
  const ds = Array.from({ length: 81 }, (_, i) => (i / 80) * 10 * k);
  const dMax = Math.exp(1 / 0.35 - 1);
  const remedios: [string, string][] = [
    ["KL penalty", n.azul],
    ["reward-model ensembles", n.amarillo],
    ["early stopping", n.verde],
  ];
  return (
    <Escena>
      <Cabeza at={cG} serie={SERIE} titulo="Reward|*hacking.*" />
      <Tarjeta at={cG + 20} color={n.rojo} style={{ marginTop: 26 }}>
        <div style={{ fontSize: 34, lineHeight: 1.3 }}>“When a measure becomes a target, it ceases to be a good measure.”</div>
        <div style={{ fontSize: 22, color: n.texto2, marginTop: 8 }}>Goodhart’s law · Goodhart (1975), as phrased by Strathern (1997)</div>
      </Tarjeta>
      <div style={{ marginTop: 26 }}>
        <Ejes ancho={912} alto={460} x={[0, 10]} y={[0, 6]} at={cC} rotuloX="optimization: √KL from the start →" rotuloY="reward" marcasX={[0, 5, 10].map((m) => ({ v: m, t: String(m) }))}>
          {({ px, py }) => (
            <g>
              <path d={`M${ds.map((d) => `${px(d)},${py(proxy(d))}`).join("L")}`} fill="none" stroke={n.amarillo} strokeWidth={6} />
              <path d={`M${ds.map((d) => `${px(d)},${py(real(d))}`).join("L")}`} fill="none" stroke={n.verde} strokeWidth={6} />
              <g opacity={k > 0.97 ? 1 : 0}>
                <text x={px(10) - 6} y={py(proxy(10)) - 16} textAnchor="end" fontFamily={codigo} fontSize={26} fill={n.amarillo}>
                  proxy reward
                </text>
                <text x={px(10) - 6} y={py(real(10)) + 42} textAnchor="end" fontFamily={codigo} fontSize={26} fill={n.verde}>
                  true reward
                </text>
                <line x1={px(dMax)} y1={py(0)} x2={px(dMax)} y2={py(real(dMax))} stroke={n.rojo} strokeWidth={3} strokeDasharray="8 8" />
                <circle cx={px(dMax)} cy={py(real(dMax))} r={12} fill={n.rojo} />
                <text x={px(dMax) + 18} y={py(real(dMax)) - 22} fontFamily={codigo} fontSize={24} fill={n.rojo}>
                  stop here
                </text>
              </g>
            </g>
          )}
        </Ejes>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
        {remedios.map(([r, col], i) => (
          <Chip key={r} at={cC + largoC * (0.55 + i * 0.12)} color={col}>
            <Check size={22} strokeWidth={2} /> {r}
          </Chip>
        ))}
      </div>
      <Nota at={cC + largoC * 0.5} tam={22} style={{ marginTop: 14 }}>
        shape illustrative, form d(α − β log d) from Gao, Schulman & Hilton (2023), ICML · ensembles: Coste et al. (2024), ICLR
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
            <Sparkles size={50} strokeWidth={1.5} color={n.azul} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>Vertex AI · preference tuning</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>for Gemini models · one preferred + one dispreferred answer per prompt</div>
            </div>
          </div>
        </Tarjeta>
        <Tarjeta at={at + largo * 0.6} color={n.verde}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Cpu size={50} strokeWidth={1.5} color={n.verde} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>SFT first, then preferences</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>tune on the preferred answers, then continue from that checkpoint</div>
            </div>
          </div>
        </Tarjeta>
      </div>
      <Nota at={at + largo * 0.8} tam={22} style={{ marginTop: 22 }}>
        Google Cloud docs, «About preference tuning for Gemini models» (Vertex AI)
      </Nota>
    </Escena>
  );
};

// ─── Las bases ────────────────────────────────────────────────────────────────
export const Bases: React.FC = () => {
  const at = useCue("bases");
  const largo = useCueAt("bases", 1) - at;
  const ideas: [string, string, string, number][] = [
    ["Sigmoid", "Bradley-Terry: σ(r_A − r_B)", n.azul, 0.1],
    ["KL divergence", "how far from the reference model", n.amarillo, 0.3],
    ["Bayes’ rule", "π* ∝ π_ref · exp(r/β)", n.verde, 0.5],
    ["Maximum likelihood", "DPO is a logistic loss on pairs", n.azul, 0.72],
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
      <div style={{ marginTop: 260 }}>
        <Cinetico at={at} texto="Learn from|*what people prefer.*" tam={96} />
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
