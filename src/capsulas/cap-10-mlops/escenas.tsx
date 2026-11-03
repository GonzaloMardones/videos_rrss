import React from "react";
import { Box, Check, Database, FlaskConical, GitBranch, Hash, Settings, Sigma, Workflow } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cabeza, Chip, Cinetico, Ejes, Escena, FormulaCard, Nota, Op, Pildora, Sube, Tarjeta, Var } from "../../estilos/nube/kit";
import { codigo, n, tipo } from "../../estilos/nube/tokens";
import gp from "./gp.json";

const SERIE = "Tech capsule · MLOps & experiments";
const sup = (t: string) => <sup style={{ fontSize: "0.55em" }}>{t}</sup>;

const azar = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cD = useCue("dos");
  const cC = useCue("caja");
  const largoC = useCueAt("caja", 1) - cC;
  const k = transicion(frame, cC + 6, fps, 800, EXPO_OUT);
  const cajas: [string, number, number, number, number][] = [
    ["data collection", 0, 0, 420, 110],
    ["feature extraction", 440, 0, 472, 110],
    ["configuration", 0, 130, 300, 110],
    ["serving infrastructure", 500, 130, 412, 110],
    ["monitoring", 0, 260, 380, 110],
    ["data verification", 400, 260, 512, 110],
  ];
  return (
    <Escena>
      <div style={{ display: "flex", gap: 16 }}>
        <Tarjeta at={cD + 8} color={n.azul} style={{ flex: 1 }}>
          <div style={{ fontFamily: codigo, fontSize: 22, color: n.texto2 }}>run A · same config</div>
          <div style={{ fontSize: 60, fontWeight: 500, color: n.azul }}>0.861</div>
        </Tarjeta>
        <Tarjeta at={cD + 22} color={n.rojo} style={{ flex: 1 }}>
          <div style={{ fontFamily: codigo, fontSize: 22, color: n.texto2 }}>run B · same config</div>
          <div style={{ fontSize: 60, fontWeight: 500, color: n.rojo }}>0.834</div>
        </Tarjeta>
      </div>
      <div style={{ position: "relative", height: 380, marginTop: 34, opacity: k }}>
        {cajas.map(([t, x, y, w, h]) => (
          <div key={t} style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 14, border: `2px solid ${n.borde}`, background: n.superficie, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: n.texto2 }}>
            {t}
          </div>
        ))}
        <div style={{ position: "absolute", left: 325, top: 158, width: 150, height: 54, borderRadius: 10, background: n.azul, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 22, transform: `scale(${k})` }}>ML code</div>
      </div>
      <Nota at={cC + largoC * 0.5} tam={22} style={{ marginTop: 8 }}>
        after Sculley et al. (2015), «Hidden Technical Debt in Machine Learning Systems», NeurIPS · runs illustrative
      </Nota>
      <div style={{ marginTop: 40 }}>
        <Cinetico at={cC + largoC * 0.6} texto="The model is|*the small part.*" tam={92} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ marginTop: 300 }}>
      <div style={{ ...tipo.rotulo, color: n.azul }}>TECH CAPSULE</div>
      <Cinetico at={8} texto="MLOps &|*experiment tracking.*" tam={112} style={{ marginTop: 18 }} />
      <Sube at={28}>
        <div style={{ ...tipo.cuerpo, color: n.texto2, marginTop: 24 }}>runs · seeds · sweeps · Bayesian optimization · by {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Qué registra una corrida ─────────────────────────────────────────────────
export const Run: React.FC = () => {
  const cR = useCue("registro");
  const cM = useCue("metricas");
  const largoR = useCueAt("registro", 1) - cR;
  const largoM = useCueAt("metricas", 1) - cM;
  const entradas: [string, string, React.ReactNode, number][] = [
    ["code", "git commit 3f9a2c1", <GitBranch key="g" size={30} strokeWidth={1.8} color={n.azul} />, 0.25],
    ["data", "sha256 of the dataset", <Hash key="h" size={30} strokeWidth={1.8} color={n.azul} />, 0.4],
    ["config", "lr = 2e-5 · batch = 32", <Settings key="s" size={30} strokeWidth={1.8} color={n.azul} />, 0.55],
    ["seed", "seed = 17", <Sigma key="z" size={30} strokeWidth={1.8} color={n.azul} />, 0.7],
    ["environment", "container image + library versions", <Box key="b" size={30} strokeWidth={1.8} color={n.azul} />, 0.85],
  ];
  return (
    <Escena>
      <Cabeza at={cR} serie={SERIE} titulo="What a run|*must record.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 24 }}>
        {entradas.map(([t, d, ic, f]) => (
          <Tarjeta key={t} at={cR + largoR * f} color={n.azul} style={{ padding: "12px 22px 12px 30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              {ic}
              <div style={{ width: 200, fontSize: 30, fontWeight: 500 }}>{t}</div>
              <div style={{ fontFamily: codigo, fontSize: 22, color: n.texto2 }}>{d}</div>
            </div>
          </Tarjeta>
        ))}
      </div>
      <Tarjeta at={cM + largoM * 0.1} color={n.verde} style={{ marginTop: 14, padding: "12px 22px 12px 30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <FlaskConical size={34} strokeWidth={1.8} color={n.verde} />
          <div style={{ fontSize: 30, fontWeight: 500 }}>outputs</div>
          <div style={{ fontFamily: codigo, fontSize: 22, color: n.texto2 }}>metrics · curves · model artifact</div>
        </div>
      </Tarjeta>
      <FormulaCard
        at={cM + largoM * 0.45}
        tam={44}
        style={{ marginTop: 16 }}
        formula={
          <>
            <Var recta>result</Var>
            <Op>=</Op>
            <Var>f</Var>(<Var color={n.azul}>code</Var>, <Var color={n.azul}>data</Var>, <Var color={n.azul}>config</Var>, <Var color={n.azul}>seed</Var>, <Var color={n.azul}>env</Var>)
          </>
        }
        leyenda={[["", n.texto, "miss one argument and the result cannot be reproduced"]]}
      />
    </Escena>
  );
};

// ─── Semillas ─────────────────────────────────────────────────────────────────
export const Semillas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cV = useCue("varianza");
  const cR = useCue("reportar");
  const largoV = useCueAt("varianza", 1) - cV;
  const largoR = useCueAt("reportar", 1) - cR;
  const vals = Array.from({ length: 12 }, (_, i) => 0.81 + 0.06 * azar(i + 300));
  const media = vals.reduce((a, b) => a + b, 0) / vals.length;
  const sd = Math.sqrt(vals.reduce((a, b) => a + (b - media) ** 2, 0) / (vals.length - 1));
  const mejor = Math.max(...vals);
  const kM = transicion(frame, cR + largoR * 0.2, fps, 700, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cV} serie={SERIE} titulo="Same config,|*different seeds.*" />
      <div style={{ marginTop: 26 }}>
        <Ejes ancho={912} alto={420} x={[0, 13]} y={[0.79, 0.88]} at={cV + 10} rotuloX="seed →" rotuloY="validation accuracy" marcasY={[0.8, 0.82, 0.84, 0.86, 0.88].map((m) => ({ v: m, t: m.toFixed(2) }))}>
          {({ px, py }) => (
            <g>
              <g opacity={kM}>
                <rect x={px(0.3)} y={py(media + sd)} width={px(12.7) - px(0.3)} height={py(media - sd) - py(media + sd)} fill={n.azulClaro} />
                <line x1={px(0.3)} y1={py(media)} x2={px(12.7)} y2={py(media)} stroke={n.azul} strokeWidth={4} />
                <text x={px(12.7)} y={py(media - sd) + 34} textAnchor="end" fontFamily={codigo} fontSize={24} fill={n.azul}>
                  mean ± sd = {media.toFixed(3)} ± {sd.toFixed(3)}
                </text>
              </g>
              {vals.map((v, i) => {
                const a = transicion(frame, cV + largoV * 0.3 + i * 3, fps, 300, EXPO_OUT);
                const top = v === mejor;
                return <circle key={i} cx={px(i + 1)} cy={py(v)} r={top ? 16 : 12} fill={top ? n.rojo : n.texto2} opacity={a} />;
              })}
            </g>
          )}
        </Ejes>
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 18 }}>
        <Tarjeta at={cR + largoR * 0.3} color={n.rojo} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>don't report the best run</div>
          <div style={{ fontSize: 48, fontWeight: 500, color: n.rojo, textDecoration: "line-through" }}>{mejor.toFixed(3)}</div>
        </Tarjeta>
        <Tarjeta at={cR + largoR * 0.5} color={n.verde} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>report over seeds</div>
          <div style={{ fontSize: 48, fontWeight: 500, color: n.verde }}>
            {media.toFixed(3)} ± {sd.toFixed(3)}
          </div>
        </Tarjeta>
      </div>
      <Nota at={cR + largoR * 0.7} tam={22} style={{ marginTop: 12 }}>
        Dodge et al. (2020), «Fine-Tuning Pretrained Language Models: Weight Initializations, Data Orders, and Early Stopping» · values illustrative
      </Nota>
    </Escena>
  );
};

// ─── Grilla vs azar ───────────────────────────────────────────────────────────
export const Busqueda: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cG = useCue("grilla");
  const cA = useCue("azar");
  const largoG = useCueAt("grilla", 1) - cG;
  const largoA = useCueAt("azar", 1) - cA;
  const L = 380;
  const grilla = [0.17, 0.5, 0.83].flatMap((x) => [0.17, 0.5, 0.83].map((y) => [x, y]));
  const azarPts = Array.from({ length: 9 }, (_, i) => [0.05 + 0.9 * azar(i + 700), 0.05 + 0.9 * azar(i + 800)]);
  const panel = (pts: number[][], col: string, at: number, titulo: string) => {
    const k = transicion(frame, at, fps, 500, EXPO_OUT);
    return (
      <div style={{ opacity: k }}>
        <div style={{ fontSize: 26, fontWeight: 500, marginBottom: 8 }}>{titulo}</div>
        <svg width={L + 10} height={L + 70} style={{ overflow: "visible" }}>
          <rect x={0} y={0} width={L} height={L} rx={12} fill={n.superficie} stroke={n.borde} strokeWidth={2} />
          {pts.map(([x, y], i) => (
            <g key={i}>
              <line x1={x * L} y1={y * L} x2={x * L} y2={L + 24} stroke={col} strokeWidth={1.5} strokeDasharray="4 6" opacity={0.6} />
              <circle cx={x * L} cy={y * L} r={11} fill={col} />
              <rect x={x * L - 3} y={L + 20} width={6} height={22} fill={col} />
            </g>
          ))}
          <text x={L / 2} y={L + 66} textAnchor="middle" fontFamily={codigo} fontSize={20} fill={n.texto2}>
            important parameter →
          </text>
        </svg>
      </div>
    );
  };
  return (
    <Escena>
      <Cabeza at={cG} serie={SERIE} titulo="Grid vs|*random search.*" />
      <div style={{ display: "flex", gap: 40, marginTop: 26 }}>
        {panel(grilla, n.rojo, cG + largoG * 0.25, "grid · 3 distinct values")}
        {panel(azarPts, n.verde, cA + 4, "random · 9 distinct values")}
      </div>
      <FormulaCard
        at={cA + largoA * 0.45}
        tam={50}
        style={{ marginTop: 20 }}
        formula={
          <>
            <Var recta>P</Var>(hit top 5%)<Op>=</Op>1 − 0.95{sup("n")}
            <span style={{ marginLeft: 30 }} />
            <Var color={n.verde}>n</Var> = 60<Op>→</Op>
            <Var color={n.verde}>0.95</Var>
          </>
        }
        leyenda={[["n", n.verde, "independent random trials"]]}
      />
      <Nota at={cA + largoA * 0.7} tam={22} style={{ marginTop: 12 }}>
        Bergstra & Bengio (2012), «Random Search for Hyper-Parameter Optimization», JMLR
      </Nota>
    </Escena>
  );
};

// ─── Optimización bayesiana ───────────────────────────────────────────────────
export const Bayes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cG = useCue("gp");
  const cU = useCue("ucb");
  const largoG = useCueAt("gp", 1) - cG;
  const largoU = useCueAt("ucb", 1) - cU;
  const kB = transicion(frame, cG + largoG * 0.4, fps, 900, EXPO_OUT);
  const kU = transicion(frame, cU + largoU * 0.2, fps, 900, EXPO_OUT);
  const kN = transicion(frame, cU + largoU * 0.6, fps, 600, EXPO_OUT);
  const kT = transicion(frame, cU + largoU * 0.85, fps, 600, EXPO_OUT);
  const { xs, f, mu, sd, X, y } = gp;
  const iN = xs.indexOf(gp.next);
  return (
    <Escena>
      <Cabeza at={cG} serie={SERIE} titulo="Bayesian|*optimization.*" />
      <div style={{ marginTop: 22 }}>
        <Ejes ancho={912} alto={520} x={[0, 1.6]} y={[-1.2, 2.2]} at={cG + 8} rotuloX="hyperparameter →" rotuloY="validation score" marcasX={[0, 0.4, 0.8, 1.2, 1.6].map((m) => ({ v: m, t: m.toFixed(1) }))}>
          {({ px, py }) => (
            <g>
              <path d={`M${xs.map((x, i) => `${px(x)},${py(mu[i] + 2 * sd[i])}`).join("L")} L${[...xs].reverse().map((x, i) => `${px(x)},${py(mu[xs.length - 1 - i] - 2 * sd[xs.length - 1 - i])}`).join("L")} Z`} fill={n.azulClaro} opacity={kB} />
              <path d={`M${xs.map((x, i) => `${px(x)},${py(mu[i])}`).join("L")}`} fill="none" stroke={n.azul} strokeWidth={5} opacity={kB} />
              <path d={`M${xs.map((x, i) => `${px(x)},${py(mu[i] + 2 * sd[i])}`).join("L")}`} fill="none" stroke={n.amarillo} strokeWidth={4} strokeDasharray="10 8" opacity={kU} />
              <path d={`M${xs.map((x, i) => `${px(x)},${py(f[i])}`).join("L")}`} fill="none" stroke={n.texto3} strokeWidth={3} strokeDasharray="4 6" opacity={kT} />
              {X.map((x, i) => (
                <circle key={i} cx={px(x)} cy={py(y[i])} r={13} fill={n.texto} opacity={transicion(frame, cG + 10 + i * 6, fps, 300, EXPO_OUT)} />
              ))}
              <g opacity={kN}>
                <line x1={px(gp.next)} y1={py(-1.2)} x2={px(gp.next)} y2={py(mu[iN] + 2 * sd[iN])} stroke={n.verde} strokeWidth={3} strokeDasharray="8 8" />
                <circle cx={px(gp.next)} cy={py(f[iN])} r={16} fill={n.verde} />
                <text x={px(gp.next) + 14} y={py(-0.85)} fontFamily={codigo} fontSize={24} fill={n.verde}>
                  next trial: x = {gp.next} → {f[iN].toFixed(2)}
                </text>
              </g>
            </g>
          )}
        </Ejes>
      </div>
      <div style={{ display: "flex", gap: 22, fontSize: 22, color: n.texto2, marginTop: 6, flexWrap: "wrap" }}>
        <span style={{ color: n.azul, opacity: kB }}>— posterior mean μ</span>
        <span style={{ color: n.azul, opacity: kB }}>▒ ±2σ</span>
        <span style={{ color: n.amarillo, opacity: kU }}>-- UCB</span>
        <span style={{ opacity: kT }}>··· true function</span>
      </div>
      <FormulaCard
        at={cU + 4}
        tam={50}
        style={{ marginTop: 16 }}
        formula={
          <>
            <Var recta>UCB</Var>(<Var>x</Var>)<Op>=</Op>
            <Var color={n.azul}>μ</Var>(<Var>x</Var>)<Op>+</Op>
            <Var color={n.amarillo}>κ</Var>·<Var color={n.azul}>σ</Var>(<Var>x</Var>)
          </>
        }
        leyenda={[["κ = 2", n.amarillo, "how much to reward uncertainty (exploration)"]]}
      />
      <Nota at={cU + largoU * 0.7} tam={22} style={{ marginTop: 10 }}>
        Snoek, Larochelle & Adams (2012), NeurIPS · Srinivas et al. (2010), GP-UCB, ICML · toy function, RBF kernel ℓ = 0.22
      </Nota>
    </Escena>
  );
};

// ─── Successive halving / Hyperband ───────────────────────────────────────────
export const Hyperband: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("mitades");
  const cP = useCue("presupuesto");
  const largoM = useCueAt("mitades", 1) - cM;
  const rondas: [number, number][] = [
    [81, 1],
    [27, 3],
    [9, 9],
    [3, 27],
    [1, 81],
  ];
  return (
    <Escena>
      <Cabeza at={cM} serie={SERIE} titulo="Stop bad runs|*early.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 30 }}>
        {rondas.map(([cfg, ep], r) => {
          const a = transicion(frame, cM + largoM * (0.3 + r * 0.14), fps, 500, EXPO_OUT);
          return (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: 14, opacity: a }}>
              <div style={{ width: 120, fontFamily: codigo, fontSize: 22, color: n.texto2 }}>round {r + 1}</div>
              <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 3 }}>
                {Array.from({ length: cfg }, (_, i) => (
                  <div key={i} style={{ width: cfg > 27 ? 12 : cfg > 9 ? 20 : 40, height: cfg > 27 ? 12 : 20, borderRadius: 3, background: r === 4 ? n.verde : n.azul, opacity: 0.85 }} />
                ))}
              </div>
              <div style={{ width: 250, fontFamily: codigo, fontSize: 22, textAlign: "right" }}>
                {cfg} configs × {ep} epoch{ep > 1 ? "s" : ""}
              </div>
            </div>
          );
        })}
      </div>
      <Tarjeta at={cP + 6} color={n.verde} style={{ marginTop: 26 }}>
        <div style={{ fontSize: 28 }}>each round: keep the best ⅓, give them 3× more budget</div>
        <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 8 }}>81 + 81 + 81 + 81 + 81 = 405 epochs, instead of 81 × 81 = 6,561</div>
      </Tarjeta>
      <Nota at={cP + 30} tam={22} style={{ marginTop: 12 }}>
        Jamieson & Talwalkar (2016), successive halving, AISTATS · Li et al. (2018), «Hyperband», JMLR
      </Nota>
    </Escena>
  );
};

// ─── Versionar datos ──────────────────────────────────────────────────────────
export const Datos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cH = useCue("hash");
  const cS = useCue("sesgo");
  const largoH = useCueAt("hash", 1) - cH;
  const largoS = useCueAt("sesgo", 1) - cS;
  const versiones: [string, string, string][] = [
    ["v1 · 2026-09", "sha256: 9c1e…a07", "model-1.4"],
    ["v2 · 2026-10", "sha256: 41bd…f3e", "model-1.5"],
  ];
  return (
    <Escena>
      <Cabeza at={cH} serie={SERIE} titulo="Version|*the data too.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 30 }}>
        {versiones.map(([v, h, m], i) => (
          <Tarjeta key={v} at={cH + largoH * (0.3 + i * 0.2)} color={n.azul}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Database size={34} strokeWidth={1.6} color={n.azul} />
              <div style={{ width: 210, fontSize: 26, fontWeight: 500 }}>{v}</div>
              <div style={{ flex: 1, fontFamily: codigo, fontSize: 22, color: n.texto2 }}>{h}</div>
              <div style={{ fontFamily: codigo, fontSize: 22, color: n.verde }}>→ {m}</div>
            </div>
          </Tarjeta>
        ))}
      </div>
      <Nota at={cH + largoH * 0.7} tam={22} style={{ marginTop: 10 }}>
        same bytes → same hash · one changed row → a completely different hash (hashes illustrative)
      </Nota>
      <div style={{ display: "flex", gap: 16, marginTop: 30, opacity: transicion(frame, cS + 4, fps, 500, EXPO_OUT) }}>
        <Tarjeta at={cS + 4} color={n.verde} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>training</div>
          <div style={{ fontFamily: codigo, fontSize: 24, marginTop: 6 }}>income → log1p(x)</div>
        </Tarjeta>
        <Tarjeta at={cS + largoS * 0.35} color={n.rojo} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>serving</div>
          <div style={{ fontFamily: codigo, fontSize: 24, marginTop: 6 }}>income → x (forgot)</div>
        </Tarjeta>
      </div>
      <Tarjeta at={cS + largoS * 0.65} color={n.amarillo} style={{ marginTop: 18 }}>
        <div style={{ fontSize: 28, fontWeight: 500 }}>training–serving skew</div>
        <div style={{ fontSize: 24, color: n.texto2, marginTop: 4 }}>fix: one shared transformation, used by both pipelines (e.g. a feature store)</div>
      </Tarjeta>
      <Nota at={cS + largoS * 0.8} tam={22} style={{ marginTop: 12 }}>
        Breck et al. (2017), «The ML Test Score: A Rubric for ML Production Readiness», IEEE Big Data · example illustrative
      </Nota>
    </Escena>
  );
};

// ─── Niveles de madurez ───────────────────────────────────────────────────────
export const Niveles: React.FC = () => {
  const cN = useCue("nivel");
  const largo = useCueAt("nivel", 1) - cN;
  const niveles: [string, string, string, number][] = [
    ["Level 0 · manual", "notebooks, hand-run training, hand-off to deploy", n.rojo, 0.12],
    ["Level 1 · pipeline automation", "continuous training when new data arrives", n.amarillo, 0.4],
    ["Level 2 · CI/CD for pipelines", "the pipeline itself is tested, built and deployed", n.verde, 0.72],
  ];
  return (
    <Escena>
      <Cabeza at={cN} serie={SERIE} titulo="MLOps|*maturity levels.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 40 }}>
        {niveles.map(([t, d, col, f]) => (
          <Tarjeta key={t} at={cN + largo * f} color={col}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <Workflow size={40} strokeWidth={1.6} color={col} />
              <div>
                <div style={{ fontSize: 32, fontWeight: 500 }}>{t}</div>
                <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>{d}</div>
              </div>
            </div>
          </Tarjeta>
        ))}
      </div>
      <Nota at={cN + largo * 0.85} tam={22} style={{ marginTop: 22 }}>
        Google Cloud Architecture Center, «MLOps: Continuous delivery and automation pipelines in machine learning»
      </Nota>
    </Escena>
  );
};

// ─── En Google Cloud ──────────────────────────────────────────────────────────
export const Nube: React.FC = () => {
  const at = useCue("gcp");
  const largo = useCueAt("gcp", 1) - at;
  const filas: [string, string, string, number][] = [
    ["Vertex AI Experiments", "runs, parameters and metrics, with TensorBoard", n.azul, 0.05],
    ["Vertex AI Vizier", "black-box and Bayesian optimization of hyperparameters", n.amarillo, 0.35],
    ["Vertex AI Pipelines + Model Registry", "automated training and versioned models", n.verde, 0.65],
  ];
  return (
    <Escena>
      <Cabeza at={at} serie={SERIE} titulo="On|*Google Cloud.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 40 }}>
        {filas.map(([t, d, col, f]) => (
          <Tarjeta key={t} at={at + largo * f} color={col}>
            <div style={{ fontSize: 34, fontWeight: 500 }}>{t}</div>
            <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>{d}</div>
          </Tarjeta>
        ))}
      </div>
      <div style={{ marginTop: 22 }}>
        <Chip at={at + largo * 0.8} color={n.azul}>
          <Check size={22} strokeWidth={2} /> Golovin et al. (2017), «Google Vizier», KDD
        </Chip>
      </div>
    </Escena>
  );
};

// ─── Las bases ────────────────────────────────────────────────────────────────
export const Bases: React.FC = () => {
  const at = useCue("bases");
  const largo = useCueAt("bases", 1) - at;
  const ideas: [string, string, string, number][] = [
    ["Reproducibility", "code + data + config + seed + environment", n.azul, 0.08],
    ["Variance across seeds", "mean ± sd, never the best run", n.amarillo, 0.3],
    ["Random search probability", "1 − (1 − q)ⁿ", n.verde, 0.5],
    ["Gaussian processes", "prediction μ and uncertainty σ → UCB", n.azul, 0.75],
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
        <Cinetico at={at} texto="If you can't reproduce it,|*it didn't happen.*" tam={88} />
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
