import React from "react";
import { Check, Cloud, Cpu, Laptop, Network, Route } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cabeza, Chip, Cinetico, Ejes, Escena, FormulaCard, Nota, Op, Pildora, Sube, Tarjeta, Var } from "../../estilos/nube/kit";
import { codigo, n, tipo } from "../../estilos/nube/tokens";

const SERIE = "Tech capsule · Serving & routing";
const sub = (t: string) => <sub style={{ fontSize: "0.5em" }}>{t}</sub>;

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c6 = useCue("60");
  const c4 = useCue("4");
  const largo4 = useCueAt("4", 1) - c4;
  const k1 = transicion(frame, c6 + 10, fps, 900, EXPO_OUT);
  const k2 = transicion(frame, c4 + 4, fps, 900, EXPO_OUT);
  const barra = (lab: string, pct: number, txt: string, col: string, k: number) => (
    <div style={{ marginTop: 26, opacity: Math.min(1, k * 2) }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
        <span>{lab}</span>
        <span style={{ fontWeight: 500, color: col }}>{txt}</span>
      </div>
      <div style={{ height: 56, borderRadius: 12, background: n.superficie, border: `2px solid ${n.borde}`, marginTop: 10 }}>
        <div style={{ height: "100%", width: `${pct * k}%`, minWidth: k > 0 ? 10 : 0, borderRadius: 10, background: col }} />
      </div>
    </div>
  );
  return (
    <Escena>
      <div style={{ ...tipo.cuerpo, color: n.texto2 }}>KV cache memory wasted</div>
      {barra("earlier LLM servers", 80, "60–80%", n.rojo, k1)}
      {barra("vLLM with PagedAttention", 4, "< 4%", n.verde, k2)}
      <Sube at={c4 + largo4 * 0.4} style={{ marginTop: 30 }}>
        <Chip at={c4 + largo4 * 0.4} color={n.verde}>
          <Cpu size={24} strokeWidth={2} /> 2–4× throughput
        </Chip>
      </Sube>
      <Nota at={c4 + largo4 * 0.5} tam={22} style={{ marginTop: 18 }}>
        Kwon et al. (2023), «Efficient Memory Management for Large Language Model Serving with PagedAttention», SOSP
      </Nota>
      <div style={{ marginTop: 50 }}>
        <Cinetico at={c4 + largo4 * 0.6} texto="Serving is|*memory management.*" tam={92} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ marginTop: 300 }}>
      <div style={{ ...tipo.rotulo, color: n.azul }}>TECH CAPSULE</div>
      <Cinetico at={8} texto="Production serving &|*routing.*" tam={112} style={{ marginTop: 18 }} />
      <Sube at={28}>
        <div style={{ ...tipo.cuerpo, color: n.texto2, marginTop: 24 }}>PagedAttention · continuous batching · cascades · by {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Prefill y decode ─────────────────────────────────────────────────────────
export const Fases: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("prefill");
  const cD = useCue("decode");
  const largoP = useCueAt("prefill", 1) - cP;
  const largoD = useCueAt("decode", 1) - cD;
  const kP = transicion(frame, cP + largoP * 0.25, fps, 600, EXPO_OUT);
  const kD = transicion(frame, cD + 4, fps, 1400, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cP} serie={SERIE} titulo="Prefill,|*then decode.*" />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 34, height: 120 }}>
        <div style={{ width: 330 * kP, height: 110, borderRadius: 12, background: n.azul, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 26, overflow: "hidden", whiteSpace: "nowrap" }}>
          prompt · all at once
        </div>
        {Array.from({ length: 14 }, (_, i) => (
          <div key={i} style={{ width: 30, height: 56, borderRadius: 6, background: n.verde, opacity: kD > 0 && i / 14 < kD ? 1 : 0 }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        <Tarjeta at={cP + largoP * 0.5} color={n.azul} style={{ flex: 1 }}>
          <div style={{ fontSize: 30, fontWeight: 500 }}>Prefill</div>
          <div style={{ fontSize: 24, color: n.texto2, marginTop: 4 }}>compute-bound · sets TTFT</div>
          <div style={{ fontSize: 22, color: n.texto2 }}>time to first token</div>
        </Tarjeta>
        <Tarjeta at={cD + largoD * 0.35} color={n.verde} style={{ flex: 1 }}>
          <div style={{ fontSize: 30, fontWeight: 500 }}>Decode</div>
          <div style={{ fontSize: 24, color: n.texto2, marginTop: 4 }}>memory-bound · sets TPOT</div>
          <div style={{ fontSize: 22, color: n.texto2 }}>time per output token</div>
        </Tarjeta>
      </div>
      <FormulaCard
        at={cD + largoD * 0.6}
        tam={46}
        style={{ marginTop: 24 }}
        formula={
          <>
            <Var recta>latency</Var>
            <Op>=</Op>
            <Var color={n.azul}>TTFT</Var>
            <Op>+</Op>(<Var>N</Var>
            {sub("out")} − 1)<Op>·</Op>
            <Var color={n.verde}>TPOT</Var>
          </>
        }
        leyenda={[["e.g.", n.texto, "0.4 s + 199 × 30 ms = 6.4 s for 200 tokens (illustrative)"]]}
      />
      <Nota at={cD + largoD * 0.8} tam={22} style={{ marginTop: 12 }}>
        Agrawal et al. (2024), «Taming Throughput-Latency Tradeoff in LLM Inference with Sarathi-Serve», OSDI
      </Nota>
    </Escena>
  );
};

// ─── PagedAttention ───────────────────────────────────────────────────────────
export const Paged: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cB = useCue("bloques");
  const cP = useCue("prefijo");
  const largoB = useCueAt("bloques", 1) - cB;
  const largoP = useCueAt("prefijo", 1) - cP;
  const kC = transicion(frame, cB + largoB * 0.2, fps, 700, EXPO_OUT);
  const kG = transicion(frame, cB + largoB * 0.55, fps, 700, EXPO_OUT);
  const kS = transicion(frame, cP + largoP * 0.2, fps, 800, EXPO_OUT);
  const colores = [n.azul, n.amarillo, n.verde];
  return (
    <Escena>
      <Cabeza at={cB} serie={SERIE} titulo="PagedAttention:|*memory in pages.*" />
      <div style={{ fontFamily: codigo, fontSize: 22, color: n.texto2, marginTop: 26, opacity: kC }}>contiguous: reserve max length (2,048) · use 500</div>
      <div style={{ display: "flex", height: 54, marginTop: 8, borderRadius: 10, overflow: "hidden", border: `2px solid ${n.borde}`, opacity: kC }}>
        <div style={{ width: `${(500 / 2048) * 100}%`, background: n.azul }} />
        <div style={{ flex: 1, background: n.rojoClaro, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 22, color: n.rojo }}>reserved, unused · 76%</div>
      </div>
      <div style={{ fontFamily: codigo, fontSize: 22, color: n.texto2, marginTop: 24, opacity: kG }}>paged: blocks of 16 tokens, allocated on demand</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 6, marginTop: 8, opacity: kG }}>
        {Array.from({ length: 36 }, (_, i) => {
          const dueño = [0, 1, 2, 0, 2, 1, 1, 0, 2, 0, 1, 2, 2, 0, 1, 0, 1, 2, 0, 2, 1, -1, 0, 1, 2, 1, -1, 0, 2, -1, 1, 0, -1, 2, -1, -1][i];
          return <div key={i} style={{ height: 40, borderRadius: 6, background: dueño < 0 ? n.superficie : colores[dueño], opacity: dueño < 0 ? 1 : 0.85, border: dueño < 0 ? `2px dashed ${n.borde}` : "none" }} />;
        })}
      </div>
      <div style={{ display: "flex", gap: 20, fontSize: 22, color: n.texto2, marginTop: 8, opacity: kG }}>
        <span style={{ color: n.azul }}>■ request A</span>
        <span style={{ color: n.amarillo }}>■ request B</span>
        <span style={{ color: n.verde }}>■ request C</span>
        <span>▢ free</span>
      </div>
      <Tarjeta at={cP + 4} color={n.verde} style={{ marginTop: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 160, height: 60, borderRadius: 10, background: n.verde, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 20 }}>system prompt</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, opacity: kS }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: codigo, fontSize: 20, color: n.texto2 }}>
                ← request {i + 1}
              </div>
            ))}
          </div>
          <div style={{ flex: 1, fontSize: 26 }}>one shared prefix, computed once (copy-on-write)</div>
        </div>
      </Tarjeta>
      <Nota at={cP + largoP * 0.6} tam={22} style={{ marginTop: 12 }}>
        Kwon et al. (2023), SOSP · prefix caching: Zheng et al. (2024), «SGLang» (RadixAttention), NeurIPS
      </Nota>
    </Escena>
  );
};

// ─── Batching estático vs continuo ────────────────────────────────────────────
export const Batching: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cE = useCue("estatico");
  const cC = useCue("continuo");
  const largoE = useCueAt("estatico", 1) - cE;
  const largoC = useCueAt("continuo", 1) - cC;
  const largos = [100, 400, 50, 250];
  const W = 760;
  const kE = transicion(frame, cE + largoE * 0.2, fps, 1200, EXPO_IN_OUT);
  const kI = transicion(frame, cE + largoE * 0.7, fps, 500, EXPO_OUT);
  const kC = transicion(frame, cC + largoC * 0.15, fps, 1400, EXPO_IN_OUT);
  const continuo: number[][] = [
    [100, 120, 180],
    [400],
    [50, 90, 160, 100],
    [250, 150],
  ];
  const cols = [n.azul, n.amarillo, n.verde, "#A142F4", n.rojo];
  const fila = (segs: number[], i: number, k: number) => {
    let x = 0;
    return (
      <div key={i} style={{ position: "relative", height: 44, marginBottom: 8, background: n.superficie, borderRadius: 8 }}>
        {segs.map((s, j) => {
          const left = x;
          x += s;
          const w = Math.max(0, Math.min(s, 400 * k - left));
          return <div key={j} style={{ position: "absolute", left: (left / 400) * W, width: (w / 400) * W - 3, top: 0, bottom: 0, borderRadius: 6, background: cols[(i + j) % cols.length] }} />;
        })}
      </div>
    );
  };
  return (
    <Escena>
      <Cabeza at={cE} serie={SERIE} titulo="Static vs|*continuous batching.*" />
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: codigo, fontSize: 22, color: n.texto2, marginTop: 26 }}>
        <span>static batch · lengths 100 · 400 · 50 · 250</span>
        <span style={{ color: n.rojo, opacity: kI }}>busy 50%</span>
      </div>
      <div style={{ marginTop: 10, width: W }}>
        {largos.map((l, i) => (
          <div key={i} style={{ position: "relative", height: 44, marginBottom: 8, background: kI > 0 ? `repeating-linear-gradient(45deg, ${n.rojoClaro}, ${n.rojoClaro} 8px, #fff 8px, #fff 14px)` : n.superficie, borderRadius: 8 }}>
            <div style={{ position: "absolute", left: 0, width: (Math.min(l, 400 * kE) / 400) * W, top: 0, bottom: 0, borderRadius: 6, background: cols[i] }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: codigo, fontSize: 22, color: n.texto2, marginTop: 24, opacity: transicion(frame, cC, fps, 400, EXPO_OUT) }}>
        <span>continuous · a new request enters when one ends</span>
        <span style={{ color: n.verde, opacity: kC > 0.9 ? 1 : 0 }}>busy ≈ 100%</span>
      </div>
      <div style={{ marginTop: 10, width: W, opacity: transicion(frame, cC, fps, 400, EXPO_OUT) }}>{continuo.map((segs, i) => fila(segs, i, kC))}</div>
      <FormulaCard
        at={cE + largoE * 0.75}
        tam={42}
        style={{ marginTop: 18 }}
        formula={
          <>
            <Var recta>busy</Var>
            <Op>=</Op>
            <span>(100 + 400 + 50 + 250) / (4 × 400)</span>
            <Op>=</Op>
            <Var color={n.rojo}>0.50</Var>
          </>
        }
      />
      <Nota at={cC + largoC * 0.7} tam={22} style={{ marginTop: 12 }}>
        Yu et al. (2022), «Orca: A Distributed Serving System for Transformer-Based Generative Models», OSDI
      </Nota>
    </Escena>
  );
};

// ─── Ley de Little y percentiles ──────────────────────────────────────────────
export const Little: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cL = useCue("ley");
  const cP = useCue("p99");
  const largoP = useCueAt("p99", 1) - cP;
  const kH = transicion(frame, cP + 4, fps, 900, EXPO_OUT);
  const kM = transicion(frame, cP + largoP * 0.45, fps, 500, EXPO_OUT);
  const dens = (x: number) => {
    const mu = Math.log(2.5);
    const s = 0.55;
    return Math.exp(-((Math.log(x) - mu) ** 2) / (2 * s * s)) / (x * s * Math.sqrt(2 * Math.PI));
  };
  const xs = Array.from({ length: 81 }, (_, i) => 0.2 + (i / 80) * 11.8);
  return (
    <Escena>
      <Cabeza at={cL} serie={SERIE} titulo="Little's law|*and the tail.*" />
      <FormulaCard
        at={cL + 14}
        tam={56}
        style={{ marginTop: 26 }}
        formula={
          <>
            <Var color={n.verde}>L</Var>
            <Op>=</Op>
            <Var color={n.azul}>λ</Var>
            <Op>·</Op>
            <Var color={n.amarillo}>W</Var>
            <span style={{ marginLeft: 36 }} />
            <span style={{ fontSize: "0.8em" }}>
              200 <Op>=</Op> 50/s <Op>×</Op> 4 s
            </span>
          </>
        }
        leyenda={[
          ["L", n.verde, "requests in flight"],
          ["λ", n.azul, "arrival rate"],
          ["W", n.amarillo, "time in the system"],
        ]}
        columnas={3}
      />
      <div style={{ marginTop: 26 }}>
        <Ejes ancho={912} alto={400} x={[0, 12]} y={[0, 0.38]} at={cP} rotuloX="latency (s) →" rotuloY="share of requests" marcasX={[0, 2, 4, 6, 8, 10, 12].map((m) => ({ v: m, t: String(m) }))}>
          {({ px, py }) => (
            <g opacity={kH}>
              <path d={`M${px(xs[0])},${py(0)} ${xs.map((x) => `L${px(x)},${py(dens(x))}`).join(" ")} L${px(xs[xs.length - 1])},${py(0)} Z`} fill={n.azulClaro} />
              <path d={`M${xs.map((x) => `${px(x)},${py(dens(x))}`).join("L")}`} fill="none" stroke={n.azul} strokeWidth={5} />
              <g opacity={kM}>
                <line x1={px(2.5)} y1={py(0)} x2={px(2.5)} y2={py(0.3)} stroke={n.verde} strokeWidth={3} strokeDasharray="8 8" />
                <text x={px(2.5) + 10} y={py(0.29)} fontFamily={codigo} fontSize={24} fill={n.verde}>
                  p50 = 2.5 s
                </text>
                <line x1={px(9)} y1={py(0)} x2={px(9)} y2={py(0.12)} stroke={n.rojo} strokeWidth={3} strokeDasharray="8 8" />
                <text x={px(9) - 10} y={py(0.13)} textAnchor="end" fontFamily={codigo} fontSize={24} fill={n.rojo}>
                  p99 = 9 s
                </text>
              </g>
            </g>
          )}
        </Ejes>
      </div>
      <Nota at={cP + largoP * 0.6} tam={22} style={{ marginTop: 10 }}>
        Little (1961), «A Proof for the Queuing Formula: L = λW», Operations Research · latency distribution illustrative (log-normal)
      </Nota>
    </Escena>
  );
};

// ─── Cascadas ─────────────────────────────────────────────────────────────────
export const Ruteo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("cascada");
  const cK = useCue("costo");
  const largoC = useCueAt("cascada", 1) - cC;
  const largoK = useCueAt("costo", 1) - cK;
  const kR = transicion(frame, cK + largoK * 0.7, fps, 600, backOut);
  const caja = (t: string, col: string, fondo: string, at: number) => (
    <div style={{ padding: "16px 22px", borderRadius: 12, border: `2px solid ${col}`, background: fondo, fontSize: 26, color: n.texto, opacity: transicion(frame, at, fps, 400, EXPO_OUT), textAlign: "center" }}>{t}</div>
  );
  return (
    <Escena>
      <Cabeza at={cC} serie={SERIE} titulo="Cascades: small first,|*big when unsure.*" />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 30 }}>
        {caja("question", n.texto3, n.superficie, cC + 10)}
        <div style={{ fontSize: 30, color: n.texto3 }}>↓</div>
        {caja("small model · cost 1", n.verde, n.verdeClaro, cC + largoC * 0.3)}
        <div style={{ display: "flex", gap: 120, fontSize: 24, color: n.texto2, opacity: transicion(frame, cC + largoC * 0.55, fps, 400, EXPO_OUT) }}>
          <span style={{ color: n.verde }}>confident (70%) → answer</span>
          <span style={{ color: n.rojo }}>unsure (30%) ↓</span>
        </div>
        <div style={{ alignSelf: "flex-end" }}>{caja("big model · cost 20", n.rojo, n.rojoClaro, cC + largoC * 0.7)}</div>
      </div>
      <FormulaCard
        at={cK + 4}
        tam={48}
        style={{ marginTop: 26 }}
        formula={
          <>
            <Var recta>𝔼</Var>[cost]<Op>=</Op>
            <Var color={n.verde}>c</Var>
            {sub("s")}
            <Op>+</Op>
            <Var color={n.amarillo}>p</Var>
            <Op>·</Op>
            <Var color={n.rojo}>c</Var>
            {sub("b")}
            <Op>=</Op>1 + 0.3 × 20<Op>=</Op>7
          </>
        }
        leyenda={[["p", n.amarillo, "share escalated to the big model"]]}
      />
      <Tarjeta at={cK + largoK * 0.55} color={n.verde} style={{ marginTop: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 26, color: n.texto2 }}>vs always using the big model (20)</span>
          <span style={{ fontSize: 60, fontWeight: 500, color: n.verde, display: "inline-block", transform: `scale(${Math.max(0, kR)})`, transformOrigin: "right" }}>−65%</span>
        </div>
      </Tarjeta>
      <Nota at={cK + largoK * 0.7} tam={22} style={{ marginTop: 12 }}>
        Chen, Zaharia & Zou (2023), «FrugalGPT» · Ong et al. (2025), «RouteLLM», ICLR · costs illustrative
      </Nota>
    </Escena>
  );
};

// ─── Enrutamiento semántico y borde ───────────────────────────────────────────
export const Semantico: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cI = useCue("intencion");
  const cB = useCue("borde");
  const largoI = useCueAt("intencion", 1) - cI;
  const largoB = useCueAt("borde", 1) - cB;
  const centros: [string, number, number, string][] = [
    ["billing", 180, 120, n.azul],
    ["fraud alert", 690, 150, n.rojo],
    ["general chat", 300, 330, n.verde],
  ];
  const q: [number, number] = [610, 210];
  const kQ = transicion(frame, cI + largoI * 0.45, fps, 500, EXPO_OUT);
  const kL = transicion(frame, cI + largoI * 0.7, fps, 500, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cI} serie={SERIE} titulo="Semantic routing|*and the edge.*" />
      <svg width={912} height={420} style={{ marginTop: 20, overflow: "visible" }}>
        <rect x={0} y={0} width={912} height={420} rx={16} fill={n.superficie} />
        {centros.map(([t, x, y, col], i) => (
          <g key={t} opacity={transicion(frame, cI + 8 + i * 5, fps, 400, EXPO_OUT)}>
            {Array.from({ length: 9 }, (_, j) => (
              <circle key={j} cx={x + 60 * Math.cos(j * 2.3 + i)} cy={y + 45 * Math.sin(j * 1.7 + i)} r={7} fill={col} opacity={0.35} />
            ))}
            <circle cx={x} cy={y} r={16} fill={col} />
            <text x={x} y={y - 64} textAnchor="middle" fontFamily={codigo} fontSize={24} fill={col}>
              {t}
            </text>
          </g>
        ))}
        <g opacity={kQ}>
          <line x1={q[0]} y1={q[1]} x2={690} y2={150} stroke={n.rojo} strokeWidth={4} strokeDasharray="8 6" opacity={kL} />
          <rect x={q[0] - 12} y={q[1] - 12} width={24} height={24} transform={`rotate(45 ${q[0]} ${q[1]})`} fill={n.texto} />
          <text x={q[0] - 10} y={q[1] + 46} textAnchor="middle" fontFamily={codigo} fontSize={22} fill={n.texto}>
            “a charge I don’t recognize”
          </text>
        </g>
      </svg>
      <Nota at={cI + largoI * 0.75} tam={22} color={n.texto} style={{ marginTop: 10 }}>
        nearest intent by cosine similarity → route to the fraud agent (banking example, illustrative)
      </Nota>
      <Tarjeta at={cB + largoB * 0.2} color={n.amarillo} style={{ marginTop: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Laptop size={46} strokeWidth={1.5} color={n.amarillo} />
          <div>
            <div style={{ fontSize: 30, fontWeight: 500 }}>On-device with MLX</div>
            <div style={{ fontSize: 24, color: n.texto2, marginTop: 4 }}>small quantized models on Apple silicon unified memory · data never leaves the device</div>
          </div>
        </div>
      </Tarjeta>
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
            <Cloud size={50} strokeWidth={1.5} color={n.azul} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>Cloud Run with GPUs</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>NVIDIA L4 · scales to zero when idle</div>
            </div>
          </div>
        </Tarjeta>
        <Tarjeta at={at + largo * 0.5} color={n.verde}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Network size={50} strokeWidth={1.5} color={n.verde} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>GKE Inference Gateway</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>routes by load, KV-cache use and active LoRA adapter</div>
            </div>
          </div>
        </Tarjeta>
      </div>
      <div style={{ marginTop: 22 }}>
        <Chip at={at + largo * 0.8} color={n.azul}>
          <Route size={22} strokeWidth={2} /> Google Cloud docs: Cloud Run GPUs · «About GKE Inference Gateway»
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
    ["Paged memory", "blocks + a block table, like an OS", n.azul, 0.08],
    ["Queueing theory", "L = λW", n.amarillo, 0.3],
    ["Percentiles", "p99, not the average", n.verde, 0.5],
    ["Expected value", "E[cost] = c_s + p·c_b", n.azul, 0.72],
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
        <Cinetico at={at} texto="Serve smart,|*not just fast.*" tam={96} />
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
