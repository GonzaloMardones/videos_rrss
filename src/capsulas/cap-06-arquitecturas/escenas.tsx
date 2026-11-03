import React from "react";
import { Check, Cpu, Route, Sparkles } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cabeza, Chip, Cinetico, Escena, FormulaCard, Frac, Nota, Op, Pildora, Sube, Tarjeta, Var } from "../../estilos/nube/kit";
import { codigo, n, tipo } from "../../estilos/nube/tokens";
import { ATENCION, KV_MIB, PROBS, TOP2 } from "./datos";

const SERIE = "Tech capsule · Beyond the dense Transformer";
const sub = (t: string) => <sub style={{ fontSize: "0.5em" }}>{t}</sub>;
const sup = (t: string) => <sup style={{ fontSize: "0.55em" }}>{t}</sup>;

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c1 = useCue("x32");
  const c2 = useCue("x1024");
  const largo2 = useCueAt("x1024", 1) - c2;
  const k1 = transicion(frame, c1 + 10, fps, 900, EXPO_OUT);
  const k2 = transicion(frame, c2 + 4, fps, 1400, EXPO_OUT);
  const barra = (lab: string, x: number, col: string, k: number) => (
    <div style={{ marginTop: 26, opacity: Math.min(1, k * 2) }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
        <span>{lab}</span>
        <span style={{ fontWeight: 500, color: col }}>×{Math.round(x * k).toLocaleString("en-US")}</span>
      </div>
      <div style={{ height: 56, borderRadius: 12, background: n.superficie, border: `2px solid ${n.borde}`, marginTop: 10 }}>
        <div style={{ height: "100%", width: `${(x / 1024) * 100 * k}%`, minWidth: k > 0 ? 10 : 0, borderRadius: 10, background: col }} />
      </div>
    </div>
  );
  return (
    <Escena>
      <div style={{ ...tipo.cuerpo, color: n.texto2 }}>context from 4,096 to 131,072 tokens</div>
      {barra("text length", 32, n.azul, k1)}
      {barra("attention cost (n²)", 1024, n.rojo, k2)}
      <Nota at={c2 + largo2 * 0.4} tam={24} color={n.texto} style={{ marginTop: 22 }}>
        32² = 1,024
      </Nota>
      <div style={{ marginTop: 50 }}>
        <Cinetico at={c2 + largo2 * 0.5} texto="Beyond|*dense attention.*" tam={96} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ marginTop: 300 }}>
      <div style={{ ...tipo.rotulo, color: n.azul }}>TECH CAPSULE</div>
      <Cinetico at={8} texto="Beyond the|*dense Transformer.*" tam={116} style={{ marginTop: 18 }} />
      <Sube at={28}>
        <div style={{ ...tipo.cuerpo, color: n.texto2, marginTop: 24 }}>GQA · MoE · linear attention · SSMs · Mamba · by {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Atención: n² y caché KV ──────────────────────────────────────────────────
export const Atencion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cN = useCue("n2");
  const cK = useCue("kv");
  const k = transicion(frame, cN + 8, fps, 1400, EXPO_IN_OUT);
  const lado = 12;
  const c = 25;
  return (
    <Escena>
      <Cabeza at={cN} serie={SERIE} titulo="Attention is|*quadratic.*" />
      <div style={{ display: "flex", gap: 30, alignItems: "center", marginTop: 30 }}>
        <svg width={lado * c + 40} height={lado * c + 40} style={{ overflow: "visible", opacity: Math.min(1, k * 4) }}>
          {ATENCION.map((fila, i) =>
            fila.map((v, j) => {
              const vis = (i * lado + j) / (lado * lado) <= k;
              return <rect key={`${i}-${j}`} x={30 + j * c} y={30 + i * c} width={c - 3} height={c - 3} rx={4} fill={v > 0 ? n.azul : n.superficie} opacity={vis ? (v > 0 ? v : 1) : 0} />;
            }),
          )}
          <text x={30} y={18} fontFamily={codigo} fontSize={20} fill={n.texto2}>
            keys →
          </text>
          <text x={18} y={30} fontFamily={codigo} fontSize={20} fill={n.texto2} transform={`rotate(90 18 30)`}>
            queries →
          </text>
        </svg>
        <div style={{ flex: 1 }}>
          <Tarjeta at={cN + 30} color={n.azul}>
            <div style={{ fontSize: 24, color: n.texto2 }}>n tokens → scores</div>
            <div style={{ fontSize: 54, fontWeight: 500, color: n.azul }}>n × n</div>
          </Tarjeta>
          <Tarjeta at={cN + 45} color={n.rojo} style={{ marginTop: 14 }}>
            <div style={{ fontSize: 24, color: n.texto2 }}>131,072 tokens</div>
            <div style={{ fontSize: 46, fontWeight: 500, color: n.rojo }}>17 B scores</div>
          </Tarjeta>
        </div>
      </div>
      <FormulaCard
        at={cN + 20}
        tam={46}
        style={{ marginTop: 24 }}
        formula={
          <>
            softmax
            <span>(</span>
            <Frac arriba={<span><Var color={n.azul}>Q</Var><Var color={n.verde}>K</Var>{sup("⊤")}</span>} abajo={<span>√<Var>d</Var></span>} />
            <span>)</span>
            <Var color={n.amarillo}>V</Var>
            <span style={{ marginLeft: 36 }} />
            <Var recta>O</Var>(<Var>n</Var>
            {sup("2")}·<Var>d</Var>)
          </>
        }
      />
      <FormulaCard
        at={cK + 6}
        tam={42}
        style={{ marginTop: 16 }}
        formula={
          <>
            <Var recta>KV cache</Var>
            <Op>=</Op>2<Op>·</Op>
            <Var>L</Var>
            <Op>·</Op>
            <Var color={n.verde}>h</Var>
            {sub("kv")}
            <Op>·</Op>
            <Var>d</Var>
            {sub("h")}
            <Op>·</Op>
            <Var recta>bytes</Var>
            <Op>·</Op>
            <Var color={n.rojo}>n</Var>
          </>
        }
        leyenda={[
          ["h_kv", n.verde, "key/value heads"],
          ["n", n.rojo, "context length"],
        ]}
        columnas={2}
      />
      <Nota at={cK + 30} tam={22} style={{ marginTop: 12 }}>
        Vaswani et al. (2017), «Attention Is All You Need», NeurIPS · attention map illustrative (causal mask)
      </Nota>
    </Escena>
  );
};

// ─── GQA ──────────────────────────────────────────────────────────────────────
export const Gqa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cG = useCue("gqa");
  const cO = useCue("ocho");
  const largoG = useCueAt("gqa", 1) - cG;
  const largoO = useCueAt("ocho", 1) - cO;
  const variantes: [string, number, number][] = [
    ["multi-head", 8, 0.1],
    ["grouped-query", 2, 0.4],
    ["multi-query", 1, 0.7],
  ];
  return (
    <Escena>
      <Cabeza at={cG} serie={SERIE} titulo="Grouped-query|*attention.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 26 }}>
        {variantes.map(([nom, kv, f]) => {
          const a = transicion(frame, cG + largoG * f, fps, 500, EXPO_OUT);
          const W = 640;
          const xq = (i: number) => 20 + (i + 0.5) * (W / 8);
          const xk = (j: number) => 20 + (j + 0.5) * (W / kv);
          return (
            <div key={nom} style={{ display: "flex", alignItems: "center", gap: 10, opacity: a }}>
              <div style={{ width: 230, fontSize: 26, fontWeight: nom === "grouped-query" ? 500 : 400, color: nom === "grouped-query" ? n.azul : n.texto }}>{nom}</div>
              <svg width={W + 40} height={120}>
                {Array.from({ length: 8 }, (_, i) => (
                  <line key={i} x1={xq(i)} y1={26} x2={xk(Math.floor((i * kv) / 8))} y2={96} stroke={n.borde} strokeWidth={2} />
                ))}
                {Array.from({ length: 8 }, (_, i) => (
                  <circle key={i} cx={xq(i)} cy={22} r={15} fill={n.azul} />
                ))}
                {Array.from({ length: kv }, (_, j) => (
                  <rect key={j} x={xk(j) - 22} y={88} width={44} height={26} rx={6} fill={n.verde} />
                ))}
              </svg>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 22, fontSize: 22, color: n.texto2, marginTop: 4 }}>
        <span style={{ color: n.azul }}>● query heads</span>
        <span style={{ color: n.verde }}>■ key/value heads (cached)</span>
      </div>
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 26, opacity: transicion(frame, cO, fps, 400, EXPO_OUT) }}>Llama 2 70B · 80 layers · d_h = 128 · FP16 · per token</div>
      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
        <Tarjeta at={cO + largoO * 0.3} color={n.rojo} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>64 KV heads</div>
          <div style={{ fontSize: 52, fontWeight: 500, color: n.rojo }}>{KV_MIB.mha} MiB</div>
          <div style={{ fontSize: 22, color: n.texto2 }}>4K tokens → 10 GiB</div>
        </Tarjeta>
        <Tarjeta at={cO + largoO * 0.55} color={n.verde} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>8 groups (GQA)</div>
          <div style={{ fontSize: 52, fontWeight: 500, color: n.verde }}>{KV_MIB.gqa.toFixed(2)} MiB</div>
          <div style={{ fontSize: 22, color: n.texto2 }}>4K tokens → 1.25 GiB</div>
        </Tarjeta>
      </div>
      <Nota at={cO + largoO * 0.75} tam={22} style={{ marginTop: 14 }}>
        Ainslie et al. (2023), «GQA», EMNLP · Shazeer (2019), multi-query attention · Touvron et al. (2023), Llama 2
      </Nota>
    </Escena>
  );
};

// ─── Mezcla de expertos ───────────────────────────────────────────────────────
export const Moe: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cE = useCue("expertos");
  const cM = useCue("mixtral");
  const largoE = useCueAt("expertos", 1) - cE;
  const largoM = useCueAt("mixtral", 1) - cM;
  const activos = frame >= cE + largoE * 0.7;
  const W = 912;
  const xs = (i: number) => 30 + i * ((W - 60) / 7);
  return (
    <Escena>
      <Cabeza at={cE} serie={SERIE} titulo="Mixture of|*experts.*" />
      <svg width={W} height={380} style={{ marginTop: 26, overflow: "visible" }}>
        <g opacity={transicion(frame, cE + 6, fps, 500, EXPO_OUT)}>
          <rect x={W / 2 - 80} y={0} width={160} height={56} rx={12} fill={n.azulClaro} stroke={n.azul} strokeWidth={3} />
          <text x={W / 2} y={37} textAnchor="middle" fontFamily={codigo} fontSize={26} fill={n.azul}>
            token
          </text>
          <rect x={W / 2 - 100} y={110} width={200} height={60} rx={30} fill={n.fondo} stroke={n.amarillo} strokeWidth={3} />
          <text x={W / 2} y={149} textAnchor="middle" fontFamily={codigo} fontSize={26} fill={n.texto}>
            router
          </text>
          <line x1={W / 2} y1={56} x2={W / 2} y2={110} stroke={n.texto3} strokeWidth={3} />
        </g>
        {Array.from({ length: 8 }, (_, i) => {
          const a = transicion(frame, cE + largoE * 0.3 + i * 2, fps, 400, EXPO_OUT);
          const on = activos && TOP2.includes(i);
          return (
            <g key={i} opacity={a}>
              <line x1={W / 2} y1={170} x2={xs(i)} y2={250} stroke={on ? n.verde : n.borde} strokeWidth={on ? 5 : 2} />
              <rect x={xs(i) - 44} y={250} width={88} height={110} rx={12} fill={on ? n.verdeClaro : n.superficie} stroke={on ? n.verde : n.borde} strokeWidth={on ? 4 : 2} />
              <text x={xs(i)} y={312} textAnchor="middle" fontFamily={codigo} fontSize={24} fill={on ? n.verde : n.texto3}>
                E{i + 1}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        <Tarjeta at={cM + largoM * 0.15} color={n.texto3} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>Mixtral 8×7B · total</div>
          <div style={{ fontSize: 56, fontWeight: 500 }}>47 B</div>
        </Tarjeta>
        <Tarjeta at={cM + largoM * 0.4} color={n.verde} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>active per token</div>
          <div style={{ fontSize: 56, fontWeight: 500, color: n.verde }}>13 B</div>
        </Tarjeta>
      </div>
      <Chip at={cM + largoM * 0.7} color={n.verde}>
        <Route size={22} strokeWidth={2} /> top-2 of 8 experts per layer
      </Chip>
      <Nota at={cM + largoM * 0.75} tam={22} style={{ marginTop: 14 }}>
        Jiang et al. (2024), «Mixtral of Experts», arXiv:2401.04088 · 46.7 B total, 12.9 B active
      </Nota>
    </Escena>
  );
};

// ─── El enrutador ─────────────────────────────────────────────────────────────
export const Router: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("mezcla");
  const cT = useCue("topk");
  const largoT = useCueAt("topk", 1) - cT;
  const kB = transicion(frame, cT + 4, fps, 900, EXPO_OUT);
  const elige = frame >= cT + largoT * 0.35;
  const H = 130;
  return (
    <Escena>
      <Cabeza at={cM} serie={SERIE} titulo="The router is|*a mixture model.*" />
      <FormulaCard
        at={cM + 14}
        tam={46}
        style={{ marginTop: 20 }}
        formula={
          <>
            <Var>y</Var>
            <Op>=</Op>Σ<Var color={n.amarillo}>g</Var>
            {sub("i")}(<Var>x</Var>)<Op>·</Op>
            <Var color={n.verde}>E</Var>
            {sub("i")}(<Var>x</Var>)
            <span style={{ marginLeft: 36 }} />
            <Var color={n.amarillo}>g</Var>
            <Op>=</Op>softmax(<Var>W</Var>
            <Var>x</Var>)
          </>
        }
        leyenda={[
          ["g_i", n.amarillo, "probability of expert i given the token"],
          ["E_i", n.verde, "expert i (a feed-forward network)"],
        ]}
      />
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: H + 60, marginTop: 18, opacity: kB }}>
        {PROBS.map((p, i) => {
          const on = elige && TOP2.includes(i);
          return (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontFamily: codigo, fontSize: 20, color: on ? n.verde : n.texto2, marginBottom: 6 }}>{p.toFixed(2)}</div>
              <div style={{ height: (p / 0.45) * H * kB, borderRadius: 8, background: on ? n.verde : elige ? n.borde : n.amarillo }} />
              <div style={{ fontFamily: codigo, fontSize: 20, color: n.texto2, marginTop: 6 }}>E{i + 1}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexShrink: 0, marginTop: 10, opacity: transicion(frame, cT + largoT * 0.4, fps, 400, EXPO_OUT) }}>
        <span style={{ fontSize: 26, color: n.texto2 }}>top-2, renormalized</span>
        <span style={{ fontFamily: codigo, fontSize: 36, color: n.verde }}>0.69 · E1 + 0.31 · E2</span>
      </div>
      <FormulaCard
        at={cT + largoT * 0.65}
        tam={42}
        style={{ marginTop: 14 }}
        formula={
          <>
            <Var recta>L</Var>
            {sub("balance")}
            <Op>=</Op>
            <Var color={n.azul}>α</Var>
            <Op>·</Op>
            <Var>N</Var>
            <Op>·</Op>Σ<Var color={n.rojo}>f</Var>
            {sub("i")}
            <Op>·</Op>
            <Var color={n.amarillo}>P</Var>
            {sub("i")}
          </>
        }
        leyenda={[
          ["f_i", n.rojo, "share of tokens sent to i"],
          ["P_i", n.amarillo, "mean router probability"],
        ]}
        columnas={2}
      />
      <Nota at={cT + largoT * 0.8} tam={22} style={{ marginTop: 10 }}>
        Jacobs, Jordan, Nowlan & Hinton (1991), Neural Computation · Shazeer et al. (2017), ICLR · Fedus et al. (2022), «Switch Transformers», JMLR · logits illustrative
      </Nota>
    </Escena>
  );
};

// ─── Atención lineal ──────────────────────────────────────────────────────────
export const Lineal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cA = useCue("asociar");
  const cR = useCue("rnn");
  const largoA = useCueAt("asociar", 1) - cA;
  const largoR = useCueAt("rnn", 1) - cR;
  const k1 = transicion(frame, cA + largoA * 0.15, fps, 700, EXPO_OUT);
  const k2 = transicion(frame, cA + largoA * 0.55, fps, 700, EXPO_OUT);
  const kR = transicion(frame, cR + largoR * 0.6, fps, 600, backOut);
  const fila = (k: number, etiqueta: React.ReactNode, lado: number, col: string, fondo: string, dims: string, costo: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 24, opacity: k, marginTop: 18 }}>
      <div style={{ width: 300, fontFamily: "'STIX Two Text', serif", fontSize: 44 }}>{etiqueta}</div>
      <div style={{ width: 190, height: 170, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: lado * k, height: lado * k, borderRadius: 10, background: fondo, border: `3px solid ${col}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 24, color: col }}>
          {dims}
        </div>
      </div>
      <div style={{ fontFamily: codigo, fontSize: 30, color: col }}>{costo}</div>
    </div>
  );
  return (
    <Escena>
      <Cabeza at={cA} serie={SERIE} titulo="Linear attention:|*reorder the product.*" />
      {fila(
        k1,
        <span>
          (<Var color={n.azul}>Q</Var>
          <Var color={n.verde}>K</Var>
          {sup("⊤")})<Var color={n.amarillo}>V</Var>
        </span>,
        160,
        n.rojo,
        n.rojoClaro,
        "n × n",
        "O(n²·d)",
      )}
      {fila(
        k2,
        <span>
          <Var color={n.azul}>Q</Var>(<Var color={n.verde}>K</Var>
          {sup("⊤")}
          <Var color={n.amarillo}>V</Var>)
        </span>,
        56,
        n.verde,
        n.verdeClaro,
        "d×d",
        "O(n·d²)",
      )}
      <Nota at={cA + largoA * 0.7} tam={24} color={n.texto} style={{ marginTop: 14 }}>
        softmax blocks the reordering → use a feature map φ: φ(Q)(φ(K)ᵀV)
      </Nota>
      <Tarjeta at={cR + largoR * 0.4} color={n.verde} style={{ marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontFamily: codigo, fontSize: 26, color: n.texto2 }}>n = 131,072 · d = 128 · ratio n/d</span>
          <span style={{ fontSize: 60, fontWeight: 500, color: n.verde, display: "inline-block", transform: `scale(${Math.max(0, kR)})`, transformOrigin: "right" }}>1,024×</span>
        </div>
      </Tarjeta>
      <div style={{ marginTop: 16 }}>
        <Chip at={cR + largoR * 0.7} color={n.azul}>
          <Sparkles size={22} strokeWidth={2} /> a running sum Σ φ(k)vᵀ → it is an RNN
        </Chip>
      </div>
      <Nota at={cR + largoR * 0.75} tam={22} style={{ marginTop: 14 }}>
        Katharopoulos et al. (2020), «Transformers are RNNs: Fast Autoregressive Transformers with Linear Attention», ICML
      </Nota>
    </Escena>
  );
};

// ─── Modelos de espacio de estados ────────────────────────────────────────────
export const Ssm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cE = useCue("estado");
  const cC = useCue("conv");
  const largoE = useCueAt("estado", 1) - cE;
  const largoC = useCueAt("conv", 1) - cC;
  const paso = Math.max(0, Math.min(7, Math.floor((frame - cE - largoE * 0.2) / 8)));
  const kP = transicion(frame, cE + largoE * 0.2, fps, 400, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cE} serie={SERIE} titulo="State space|*models.*" />
      <div style={{ display: "flex", gap: 10, marginTop: 34, opacity: kP }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ flex: 1, height: 70, borderRadius: 10, border: `2px solid ${i <= paso ? n.azul : n.borde}`, background: i <= paso ? n.azulClaro : n.superficie, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'STIX Two Text', serif", fontStyle: "italic", fontSize: 30, color: i <= paso ? n.azul : n.texto3 }}>
            x{["₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈"][i]}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 14, opacity: kP }}>
        <div style={{ width: 300, height: 90, borderRadius: 14, border: `3px solid ${n.verde}`, background: n.verdeClaro, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: n.verde }}>
          state h · fixed size
        </div>
      </div>
      <FormulaCard
        at={cE + largoE * 0.5}
        tam={52}
        style={{ marginTop: 24 }}
        formula={
          <>
            <Var color={n.verde}>h</Var>
            {sub("t")}
            <Op>=</Op>
            <Var>A</Var>
            <Var color={n.verde}>h</Var>
            {sub("t−1")}
            <Op>+</Op>
            <Var>B</Var>
            <Var color={n.azul}>x</Var>
            {sub("t")}
            <span style={{ marginLeft: 40 }} />
            <Var>y</Var>
            {sub("t")}
            <Op>=</Op>
            <Var>C</Var>
            <Var color={n.verde}>h</Var>
            {sub("t")}
          </>
        }
        leyenda={[
          ["h", n.verde, "memory of the whole past"],
          ["x", n.azul, "current token"],
        ]}
        columnas={2}
      />
      <div style={{ display: "flex", gap: 16, marginTop: 22 }}>
        <Tarjeta at={cC + largoC * 0.1} color={n.azul} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>training</div>
          <div style={{ fontSize: 34, fontWeight: 500, color: n.azul }}>parallel, as a convolution</div>
        </Tarjeta>
        <Tarjeta at={cC + largoC * 0.35} color={n.verde} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>generation</div>
          <div style={{ fontSize: 34, fontWeight: 500, color: n.verde }}>step by step, as an RNN</div>
        </Tarjeta>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
        <Chip at={cC + largoC * 0.65} color={n.verde}>
          <Check size={22} strokeWidth={2} /> O(n) compute
        </Chip>
        <Chip at={cC + largoC * 0.75} color={n.verde}>
          <Check size={22} strokeWidth={2} /> O(1) memory per step
        </Chip>
      </div>
      <Nota at={cC + largoC * 0.8} tam={22} style={{ marginTop: 14 }}>
        Gu, Goel & Ré (2022), «Efficiently Modeling Long Sequences with Structured State Spaces» (S4), ICLR
      </Nota>
    </Escena>
  );
};

// ─── Mamba ────────────────────────────────────────────────────────────────────
export const Mamba: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("selectivo");
  const cH = useCue("hibrido");
  const largoS = useCueAt("selectivo", 1) - cS;
  const largoH = useCueAt("hibrido", 1) - cH;
  const palabras: [string, boolean][] = [
    ["the", false],
    ["invoice", true],
    ["was", false],
    ["paid", true],
    ["on", false],
    ["March", true],
    ["3", true],
    ["um", false],
  ];
  const decide = frame >= cS + largoS * 0.6;
  const kX = transicion(frame, cH + largoH * 0.25, fps, 600, backOut);
  return (
    <Escena>
      <Cabeza at={cS} serie={SERIE} titulo="Mamba:|*selective memory.*" />
      <FormulaCard
        at={cS + 14}
        tam={50}
        style={{ marginTop: 24 }}
        formula={
          <>
            <Var color={n.azul}>B</Var>
            {sub("t")}, <Var color={n.azul}>C</Var>
            {sub("t")}, <Var color={n.azul}>Δ</Var>
            {sub("t")}
            <Op>=</Op>
            <Var>f</Var>(<Var color={n.verde}>x</Var>
            {sub("t")})
          </>
        }
        leyenda={[["Δ", n.azul, "step size: large → overwrite, small → keep"]]}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
        {palabras.map(([w, keep], i) => {
          const a = transicion(frame, cS + largoS * 0.3 + i * 3, fps, 300, EXPO_OUT);
          const on = !decide || keep;
          return (
            <div key={i} style={{ padding: "12px 22px", borderRadius: 12, border: `2px solid ${on ? n.verde : n.borde}`, background: on ? n.verdeClaro : n.superficie, fontSize: 32, color: on ? n.texto : n.texto3, textDecoration: decide && !keep ? "line-through" : "none", opacity: a }}>
              {w}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 22, fontSize: 22, color: n.texto2, marginTop: 10, opacity: decide ? 1 : 0 }}>
        <span style={{ color: n.verde }}>■ written to the state</span>
        <span>— skipped (illustrative)</span>
      </div>
      <Tarjeta at={cH + 4} color={n.verde} style={{ marginTop: 26 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 26, color: n.texto2 }}>inference throughput vs a Transformer</span>
          <span style={{ fontSize: 60, fontWeight: 500, color: n.verde, display: "inline-block", transform: `scale(${Math.max(0, kX)})`, transformOrigin: "right" }}>up to 5×</span>
        </div>
      </Tarjeta>
      <Chip at={cH + largoH * 0.65} color={n.amarillo}>
        <Sparkles size={22} strokeWidth={2} /> hybrids: Jamba = Mamba + attention + MoE
      </Chip>
      <Nota at={cH + largoH * 0.7} tam={22} style={{ marginTop: 14 }}>
        Gu & Dao (2024), «Mamba: Linear-Time Sequence Modeling with Selective State Spaces», COLM · Lieber et al. (2024), «Jamba»
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
              <div style={{ fontSize: 34, fontWeight: 500 }}>Gemini 1.5 Pro</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>a sparse mixture-of-experts Transformer</div>
            </div>
          </div>
        </Tarjeta>
        <Tarjeta at={at + largo * 0.45} color={n.verde}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Cpu size={50} strokeWidth={1.5} color={n.verde} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>GShard on TPU v3</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>600 B-parameter MoE trained on 2,048 TPUs</div>
            </div>
          </div>
        </Tarjeta>
      </div>
      <Nota at={at + largo * 0.7} tam={22} style={{ marginTop: 22 }}>
        Gemini Team (2024), arXiv:2403.05530 · Lepikhin et al. (2021), «GShard», ICLR
      </Nota>
    </Escena>
  );
};

// ─── Las bases ────────────────────────────────────────────────────────────────
export const Bases: React.FC = () => {
  const at = useCue("bases");
  const largo = useCueAt("bases", 1) - at;
  const ideas: [string, string, string, number][] = [
    ["Attention is O(n²·d)", "every token against every token", n.azul, 0.08],
    ["KV cache", "2 · L · h_kv · d_h · bytes · n", n.amarillo, 0.3],
    ["Softmax & mixture models", "y = Σ gᵢ(x) Eᵢ(x)", n.verde, 0.5],
    ["Linear recurrences", "hₜ = A hₜ₋₁ + B xₜ", n.azul, 0.75],
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
        <Cinetico at={at} texto="Not every token needs|*every weight.*" tam={92} />
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
