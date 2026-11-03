import React from "react";
import { Check, Cpu, Server, X } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cabeza, Chip, Cinetico, Escena, FormulaCard, Frac, Nota, Op, Pildora, Sube, Tarjeta, Var } from "../../estilos/nube/kit";
import { codigo, n, tipo } from "../../estilos/nube/tokens";

const SERIE = "Tech capsule · Inference & quantization";
const sub = (t: string) => <sub style={{ fontSize: "0.5em" }}>{t}</sub>;
const sup = (t: string) => <sup style={{ fontSize: "0.55em" }}>{t}</sup>;

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c1 = useCue("140");
  const c2 = useCue("42");
  const largo1 = useCueAt("140", 1) - c1;
  const largo2 = useCueAt("42", 1) - c2;
  const k = transicion(frame, c1 + largo1 * 0.55, fps, 1600, EXPO_IN_OUT);
  return (
    <Escena>
      <div style={{ ...tipo.cuerpo, color: n.texto2 }}>70B model · 16-bit weights · one token</div>
      <Tarjeta at={c1 + 10} color={n.azul} style={{ marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 28, color: n.texto2 }}>weights to read per token</span>
          <span style={{ fontSize: 64, fontWeight: 500, color: n.azul }}>140 GB</span>
        </div>
        <div style={{ height: 30, borderRadius: 8, background: n.superficie, marginTop: 14 }}>
          <div style={{ height: "100%", width: `${k * 100}%`, borderRadius: 8, background: n.azul }} />
        </div>
      </Tarjeta>
      <div style={{ display: "flex", gap: 16, marginTop: 18 }}>
        <Tarjeta at={c2 + largo2 * 0.2} color={n.rojo} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>H100 · 3.35 TB/s</div>
          <div style={{ fontSize: 56, fontWeight: 500, color: n.rojo }}>≥ 42 ms</div>
          <div style={{ fontSize: 22, color: n.texto2 }}>per token, batch 1</div>
        </Tarjeta>
        <Tarjeta at={c2 + largo2 * 0.35} color={n.amarillo} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>ceiling</div>
          <div style={{ fontSize: 56, fontWeight: 500, color: n.amarillo }}>≤ 24 tok/s</div>
          <div style={{ fontSize: 22, color: n.texto2 }}>140 GB ÷ 3.35 TB/s</div>
        </Tarjeta>
      </div>
      <div style={{ marginTop: 60 }}>
        <Cinetico at={c2 + largo2 * 0.55} texto="Memory-bound,|*not compute-bound.*" tam={88} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ marginTop: 300 }}>
      <div style={{ ...tipo.rotulo, color: n.azul }}>TECH CAPSULE</div>
      <Cinetico at={8} texto="Inference physics &|*quantization.*" tam={110} style={{ marginTop: 18 }} />
      <Sube at={28}>
        <div style={{ ...tipo.cuerpo, color: n.texto2, marginTop: 24 }}>KV cache · AWQ · GPTQ · speculative decoding · RoPE · by {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Intensidad aritmética y lotes ────────────────────────────────────────────
export const Memoria: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cI = useCue("intensidad");
  const cL = useCue("lote");
  const largoI = useCueAt("intensidad", 1) - cI;
  const largoL = useCueAt("lote", 1) - cL;
  const filas: [string, number, string, number][] = [
    ["batch 1", 1, n.rojo, cL + largoL * 0.05],
    ["batch 32", 32, n.amarillo, cL + largoL * 0.2],
    ["batch 256", 256, n.verde, cL + largoL * 0.35],
  ];
  const escala = (v: number) => (Math.log10(v) / Math.log10(1000)) * 100;
  return (
    <Escena>
      <Cabeza at={cI} serie={SERIE} titulo="Why decoding|*waits on memory.*" />
      <FormulaCard
        at={cI + 14}
        tam={48}
        style={{ marginTop: 26 }}
        formula={
          <>
            <Var recta>I</Var>
            <Op>=</Op>
            <Frac arriba={<span>2 FLOP · <Var color={n.azul}>B</Var></span>} abajo="2 bytes" />
            <Op>=</Op>
            <Var color={n.azul}>B</Var>
            <span style={{ marginLeft: 36 }} />
            <span style={{ color: n.texto2 }}>ridge ≈ 295</span>
          </>
        }
        leyenda={[
          ["B", n.azul, "batch size: requests sharing one read of the weights"],
          ["ridge", n.texto, "H100: 989 TFLOP/s ÷ 3.35 TB/s"],
        ]}
      />
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 30, opacity: transicion(frame, cI + largoI * 0.6, fps, 400, EXPO_OUT) }}>FLOP per byte (log scale)</div>
      <div style={{ position: "relative", marginTop: 12 }}>
        {filas.map(([lab, v, col, at]) => {
          const k = transicion(frame, at, fps, 800, EXPO_OUT);
          return (
            <div key={lab} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12, opacity: Math.min(1, k * 2) }}>
              <div style={{ width: 160, fontFamily: codigo, fontSize: 24 }}>{lab}</div>
              <div style={{ flex: 1, height: 40, borderRadius: 8, background: n.superficie, position: "relative" }}>
                <div style={{ height: "100%", width: `${Math.max(2, escala(v)) * k}%`, borderRadius: 8, background: col }} />
                <div style={{ position: "absolute", left: `${escala(295)}%`, top: -6, bottom: -6, width: 3, background: n.texto }} />
              </div>
              <div style={{ width: 70, fontFamily: codigo, fontSize: 24, color: col, textAlign: "right" }}>{v}</div>
            </div>
          );
        })}
      </div>
      <Tarjeta at={cL + largoL * 0.6} color={n.rojo} style={{ marginTop: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 26, color: n.texto2 }}>KV cache · 32 users × 4,096 tokens · 70B GQA</span>
          <span style={{ fontSize: 52, fontWeight: 500, color: n.rojo }}>40 GiB</span>
        </div>
      </Tarjeta>
      <Nota at={cL + largoL * 0.75} tam={22} style={{ marginTop: 12 }}>
        Williams, Waterman & Patterson (2009), roofline · KV per token from the previous capsule: 0.3125 MiB
      </Nota>
    </Escena>
  );
};

// ─── Cuantizar ────────────────────────────────────────────────────────────────
export const Cuantizar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cE = useCue("escala");
  const cB = useCue("bits");
  const largoE = useCueAt("escala", 1) - cE;
  const largoB = useCueAt("bits", 1) - cB;
  const x = [0.12, -0.5, 0.03, 2.0, -0.9];
  const q = [8, -32, 2, 127, -57];
  const xr = [0.126, -0.504, 0.031, 2.0, -0.898];
  const fila = (vals: (number | string)[], col: string, at: number, etiqueta: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, opacity: transicion(frame, at, fps, 500, EXPO_OUT) }}>
      <div style={{ width: 150, fontFamily: codigo, fontSize: 22, color: n.texto2 }}>{etiqueta}</div>
      {vals.map((v, i) => (
        <div key={i} style={{ flex: 1, height: 46, borderRadius: 10, border: `2px solid ${col}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 26, color: col }}>
          {v}
        </div>
      ))}
    </div>
  );
  const tiers: [string, string, string, string][] = [
    ["FP16", "140 GB", "≤ 24 tok/s", n.rojo],
    ["INT8", "70 GB", "≤ 48 tok/s", n.amarillo],
    ["INT4", "35 GB", "≤ 96 tok/s", n.verde],
  ];
  return (
    <Escena>
      <Cabeza at={cE} serie={SERIE} titulo="Quantization:|*fewer bits per weight.*" />
      <FormulaCard
        at={cE + 14}
        tam={46}
        style={{ marginTop: 24 }}
        formula={
          <>
            <Var color={n.azul}>q</Var>
            <Op>=</Op>round(<Var>x</Var> / <Var color={n.amarillo}>s</Var>)
            <span style={{ marginLeft: 30 }} />
            <Var color={n.amarillo}>s</Var>
            <Op>=</Op>
            <Frac arriba={<span>max |<Var>x</Var>|</span>} abajo="127" />
            <span style={{ marginLeft: 30 }} />
            <Var>x̂</Var>
            <Op>=</Op>
            <Var color={n.amarillo}>s</Var>·<Var color={n.azul}>q</Var>
          </>
        }
        leyenda={[["s", n.amarillo, "scale: here 2.0 / 127 = 0.0157"]]}
      />
      {fila(x, n.texto, cE + largoE * 0.3, "weights x")}
      {fila(q, n.azul, cE + largoE * 0.5, "int8 q")}
      {fila(xr, n.verde, cE + largoE * 0.75, "restored x̂")}
      <FormulaCard
        at={cB + 4}
        tam={42}
        style={{ marginTop: 14 }}
        formula={
          <>
            <Var recta>Var</Var>(<Var>x̂</Var> − <Var>x</Var>)<Op>≈</Op>
            <Frac arriba={<span><Var color={n.rojo}>Δ</Var>{sup("2")}</span>} abajo="12" />
          </>
        }
        leyenda={[["Δ", n.rojo, "step between levels: halve the bits → much larger Δ"]]}
      />
      <div style={{ display: "flex", gap: 12, marginTop: 14, flexShrink: 0 }}>
        {tiers.map(([t, gb, tok, col], i) => (
          <div key={t} style={{ flex: 1, borderRadius: 12, borderLeft: `6px solid ${col}`, background: n.superficie, padding: "8px 14px", opacity: transicion(frame, cB + largoB * (0.45 + i * 0.12), fps, 400, EXPO_OUT) }}>
            <div style={{ fontFamily: codigo, fontSize: 22, color: col }}>{t} · {tok}</div>
            <div style={{ fontSize: 36, fontWeight: 500 }}>{gb}</div>
          </div>
        ))}
      </div>
      <Nota at={cB + largoB * 0.8} tam={20} style={{ marginTop: 8 }}>
        70B model, H100 bandwidth ceilings at batch 1 · Gray & Neuhoff (1998), «Quantization», IEEE Trans. Inf. Theory
      </Nota>
    </Escena>
  );
};

// ─── Valores atípicos, GPTQ y AWQ ─────────────────────────────────────────────
export const Outliers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cR = useCue("raros");
  const cG = useCue("gptq");
  const largoR = useCueAt("raros", 1) - cR;
  const largoG = useCueAt("gptq", 1) - cG;
  const canales = Array.from({ length: 32 }, (_, i) => (i === 19 ? 1 : 0.06 + 0.1 * Math.abs(Math.sin(i * 1.7))));
  const k = transicion(frame, cR + 10, fps, 900, EXPO_OUT);
  const kN = transicion(frame, cR + largoR * 0.55, fps, 600, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cR} serie={SERIE} titulo="Outliers break|*the scale.*" />
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 26 }}>activation magnitude per channel (illustrative)</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 240, marginTop: 12 }}>
        {canales.map((v, i) => (
          <div key={i} style={{ flex: 1, height: `${v * 100 * k}%`, minHeight: 4, borderRadius: 4, background: i === 19 ? n.rojo : n.azul }} />
        ))}
      </div>
      <div style={{ fontSize: 24, color: n.rojo, marginTop: 10, opacity: kN }}>one huge channel → a big scale s → the small values all round to 0</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 24 }}>
        <Tarjeta at={cG + largoG * 0.05} color={n.azul}>
          <div style={{ fontSize: 30, fontWeight: 500 }}>GPTQ</div>
          <div style={{ fontSize: 24, color: n.texto2, marginTop: 4 }}>quantize one weight at a time, update the rest with the inverse Hessian · 175B in ≈ 4 GPU-hours, 3–4 bits</div>
        </Tarjeta>
        <Tarjeta at={cG + largoG * 0.5} color={n.verde}>
          <div style={{ fontSize: 30, fontWeight: 500 }}>AWQ</div>
          <div style={{ fontSize: 24, color: n.texto2, marginTop: 4 }}>find the ~1% salient channels from activation size and scale them up before quantizing</div>
        </Tarjeta>
      </div>
      <Nota at={cG + largoG * 0.7} tam={22} style={{ marginTop: 12 }}>
        Dettmers et al. (2022), «LLM.int8()», NeurIPS · Frantar et al. (2023), «GPTQ», ICLR · Lin et al. (2024), «AWQ», MLSys
      </Nota>
    </Escena>
  );
};

// ─── Decodificación especulativa ──────────────────────────────────────────────
export const Especulativa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cB = useCue("borrador");
  const cA = useCue("aceptar");
  const largoB = useCueAt("borrador", 1) - cB;
  const largoA = useCueAt("aceptar", 1) - cA;
  const palabras = ["the", "loan", "was", "approved", "today"];
  const ok = [true, true, true, false, false];
  const verif = frame >= cB + largoB * 0.65;
  const kE = transicion(frame, cA + largoA * 0.75, fps, 600, backOut);
  return (
    <Escena>
      <Cabeza at={cB} serie={SERIE} titulo="Speculative|*decoding.*" />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 30 }}>
        <Chip at={cB + 8} color={n.amarillo}>
          <Cpu size={22} strokeWidth={2} /> small draft model
        </Chip>
        <span style={{ fontSize: 24, color: n.texto2 }}>proposes γ = 4 tokens</span>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        {palabras.map((w, i) => {
          const a = transicion(frame, cB + largoB * 0.2 + i * 6, fps, 300, EXPO_OUT);
          const est = verif ? (i < 4 ? (ok[i] ? "ok" : "no") : "skip") : "draft";
          const col = est === "ok" ? n.verde : est === "no" ? n.rojo : est === "skip" ? n.texto3 : n.amarillo;
          return (
            <div key={i} style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: `2px solid ${col}`, background: est === "ok" ? n.verdeClaro : est === "no" ? n.rojoClaro : n.superficie, textAlign: "center", opacity: i === 4 ? (verif ? 0.4 : 0) : a }}>
              <div style={{ fontSize: 28, color: n.texto }}>{w}</div>
              <div style={{ marginTop: 6, display: "flex", justifyContent: "center", height: 28 }}>
                {est === "ok" ? <Check size={26} strokeWidth={2.4} color={n.verde} /> : est === "no" ? <X size={26} strokeWidth={2.4} color={n.rojo} /> : null}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, opacity: verif ? 1 : 0 }}>
        <Chip at={cB + largoB * 0.65} color={n.azul}>
          <Server size={22} strokeWidth={2} /> big model checks all in one pass
        </Chip>
      </div>
      <FormulaCard
        at={cA + 6}
        tam={42}
        style={{ marginTop: 16 }}
        formula={
          <>
            <Var recta>P</Var>(accept <Var>x</Var>)<Op>=</Op>
            min(1, <Frac arriba={<span><Var color={n.azul}>p</Var>(<Var>x</Var>)</span>} abajo={<span><Var color={n.amarillo}>q</Var>(<Var>x</Var>)</span>} />)
          </>
        }
        leyenda={[
          ["p", n.azul, "big model"],
          ["q", n.amarillo, "draft model · on reject, resample from norm(max(0, p − q))"],
        ]}
      />
      <FormulaCard
        at={cA + largoA * 0.55}
        tam={42}
        style={{ marginTop: 12 }}
        formula={
          <>
            <Var recta>𝔼</Var>[tokens]<Op>=</Op>
            <Frac arriba={<span>1 − <Var color={n.verde}>α</Var>{sup("γ+1")}</span>} abajo={<span>1 − <Var color={n.verde}>α</Var></span>} />
            <span style={{ marginLeft: 30 }} />
            <span style={{ color: n.verde, display: "inline-block", transform: `scale(${Math.max(0, kE)})` }}>α = 0.8, γ = 4 → 3.36</span>
          </>
        }
        leyenda={[["α", n.verde, "acceptance rate"]]}
      />
      <Nota at={cA + largoA * 0.8} tam={22} style={{ marginTop: 10 }}>
        Leviathan, Kalman & Matias (2023), ICML · Chen et al. (2023), «Accelerating LLM Decoding with Speculative Sampling»
      </Nota>
    </Escena>
  );
};

// ─── RoPE e interpolación de posiciones ───────────────────────────────────────
export const Rope: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cR = useCue("rotar");
  const cE = useCue("estirar");
  const largoR = useCueAt("rotar", 1) - cR;
  const largoE = useCueAt("estirar", 1) - cE;
  const giro = interpolar(frame, cR + largoR * 0.2, cR + largoR * 0.8);
  const O: [number, number] = [190, 190];
  const R = 150;
  const vec = (ang: number, col: string, et: string) => (
    <g>
      <line x1={O[0]} y1={O[1]} x2={O[0] + R * Math.cos(ang)} y2={O[1] - R * Math.sin(ang)} stroke={col} strokeWidth={6} />
      <circle cx={O[0] + R * Math.cos(ang)} cy={O[1] - R * Math.sin(ang)} r={10} fill={col} />
      <text x={O[0] + (R + 30) * Math.cos(ang)} y={O[1] - (R + 30) * Math.sin(ang) + 8} textAnchor="middle" fontFamily="'STIX Two Text', serif" fontStyle="italic" fontSize={30} fill={col}>
        {et}
      </text>
    </g>
  );
  const kPI = transicion(frame, cE + largoE * 0.3, fps, 1200, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cR} serie={SERIE} titulo="RoPE: position|*as rotation.*" />
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20 }}>
        <svg width={380} height={380} style={{ overflow: "visible", opacity: transicion(frame, cR + 8, fps, 400, EXPO_OUT) }}>
          <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={n.borde} strokeWidth={2} strokeDasharray="6 8" />
          {vec(0.3 + giro * 0.9, n.azul, "q·m")}
          {vec(0.3 + giro * 0.3, n.verde, "k·n")}
        </svg>
        <div style={{ flex: 1 }}>
          <FormulaCard
            at={cR + largoR * 0.3}
            tam={40}
            formula={
              <>
                <Var color={n.amarillo}>θ</Var>
                {sub("i")}
                <Op>=</Op>10000{sup("−2i/d")}
              </>
            }
            leyenda={[["θ_i", n.amarillo, "one frequency per pair of dims"]]}
          />
          <FormulaCard
            at={cR + largoR * 0.6}
            tam={36}
            style={{ marginTop: 12 }}
            formula={
              <>
                ⟨<Var>R</Var>
                {sub("m")}
                <Var color={n.azul}>q</Var>, <Var>R</Var>
                {sub("n")}
                <Var color={n.verde}>k</Var>⟩<Op>=</Op>
                <Var>f</Var>(<Var color={n.azul}>q</Var>, <Var color={n.verde}>k</Var>, <Var color={n.rojo}>m − n</Var>)
              </>
            }
            leyenda={[["m − n", n.rojo, "only the distance matters"]]}
          />
        </div>
      </div>
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 24, opacity: kPI }}>position interpolation: m → m · 2,048 / 32,768</div>
      <div style={{ position: "relative", height: 60, marginTop: 12, opacity: kPI }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: 60, width: `${(2048 / 32768) * 100 + (1 - 2048 / 32768) * 100 * kPI}%`, borderRadius: 10, background: n.verdeClaro, border: `2px solid ${n.verde}` }} />
        <div style={{ position: "absolute", left: 0, top: 0, height: 60, width: `${(2048 / 32768) * 100}%`, borderRadius: 10, background: n.azul }} />
        <div style={{ position: "absolute", right: 16, top: 14, fontFamily: codigo, fontSize: 24, color: n.verde }}>32,768 tokens (×16)</div>
      </div>
      <Nota at={cE + largoE * 0.6} tam={22} style={{ marginTop: 14 }}>
        Su et al. (2024), «RoFormer», Neurocomputing · Chen et al. (2023), «Position Interpolation» · Peng et al. (2024), «YaRN», ICLR
      </Nota>
    </Escena>
  );
};
function interpolar(frame: number, a: number, b: number) {
  return Math.max(0, Math.min(1, (frame - a) / Math.max(1, b - a)));
}

// ─── Sumideros de atención ────────────────────────────────────────────────────
export const Sumideros: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("sink");
  const cV = useCue("ventana");
  const largoV = useCueAt("ventana", 1) - cV;
  const k = transicion(frame, cS + 10, fps, 1000, EXPO_OUT);
  const kV = transicion(frame, cV + 6, fps, 800, EXPO_OUT);
  const lado = 12;
  const c = 26;
  return (
    <Escena>
      <Cabeza at={cS} serie={SERIE} titulo="Attention|*sinks.*" />
      <div style={{ display: "flex", gap: 24, alignItems: "center", marginTop: 26 }}>
        <svg width={lado * c} height={lado * c} style={{ opacity: k }}>
          {Array.from({ length: lado }, (_, i) =>
            Array.from({ length: lado }, (_, j) => {
              if (j > i) return null;
              const v = j === 0 ? 0.95 : j >= i - 2 ? 0.45 : 0.08;
              return <rect key={`${i}-${j}`} x={j * c} y={i * c} width={c - 3} height={c - 3} rx={3} fill={j === 0 ? n.rojo : n.azul} opacity={v} />;
            }),
          )}
        </svg>
        <div style={{ flex: 1, fontSize: 26, color: n.texto2 }}>
          the first column lights up for every query: the softmax needs somewhere to put attention that has nowhere useful to go
        </div>
      </div>
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 30, opacity: kV }}>KV cache kept while streaming</div>
      <div style={{ display: "flex", gap: 5, marginTop: 12, opacity: kV }}>
        {Array.from({ length: 24 }, (_, i) => {
          const sink = i < 4;
          const win = i >= 16;
          return <div key={i} style={{ flex: 1, height: 56, borderRadius: 6, background: sink ? n.rojo : win ? n.verde : n.superficie, border: sink || win ? "none" : `2px dashed ${n.borde}` }} />;
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: n.texto2, marginTop: 8, opacity: kV }}>
        <span style={{ color: n.rojo }}>4 sink tokens</span>
        <span>evicted</span>
        <span style={{ color: n.verde }}>recent window</span>
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
        <Tarjeta at={cV + largoV * 0.5} color={n.verde} style={{ flex: 1 }}>
          <div style={{ fontSize: 22, color: n.texto2 }}>stable streaming</div>
          <div style={{ fontSize: 48, fontWeight: 500, color: n.verde }}>4 M tokens</div>
        </Tarjeta>
        <Tarjeta at={cV + largoV * 0.7} color={n.azul} style={{ flex: 1 }}>
          <div style={{ fontSize: 22, color: n.texto2 }}>vs window + recompute</div>
          <div style={{ fontSize: 48, fontWeight: 500, color: n.azul }}>up to 22×</div>
        </Tarjeta>
      </div>
      <Nota at={cV + largoV * 0.8} tam={22} style={{ marginTop: 12 }}>
        Xiao et al. (2024), «Efficient Streaming Language Models with Attention Sinks», ICLR · does not enlarge the context window
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
            <Cpu size={50} strokeWidth={1.5} color={n.azul} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>JetStream on TPUs</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>int8 weights, activations and KV cache · continuous batching</div>
            </div>
          </div>
        </Tarjeta>
        <Tarjeta at={at + largo * 0.6} color={n.verde}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Server size={50} strokeWidth={1.5} color={n.verde} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>vLLM on GKE (GPUs)</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>serves AWQ or GPTQ quantized models</div>
            </div>
          </div>
        </Tarjeta>
      </div>
      <Nota at={at + largo * 0.8} tam={22} style={{ marginTop: 22 }}>
        Google Cloud blog (2024), «Accelerating AI inference with Google Cloud TPUs and GPUs» · GKE docs: serve LLMs with JetStream / vLLM
      </Nota>
    </Escena>
  );
};

// ─── Las bases ────────────────────────────────────────────────────────────────
export const Bases: React.FC = () => {
  const at = useCue("bases");
  const largo = useCueAt("bases", 1) - at;
  const ideas: [string, string, string, number][] = [
    ["Memory bandwidth", "time per token ≥ bytes ÷ bandwidth", n.azul, 0.08],
    ["Quantization error", "Var ≈ Δ²/12", n.amarillo, 0.3],
    ["Rejection sampling", "accept with min(1, p/q): exact output distribution", n.verde, 0.5],
    ["Rotations", "RoPE: angles m·θᵢ, only m − n survives", n.azul, 0.75],
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
        <Cinetico at={at} texto="Inference is|*a memory problem.*" tam={96} />
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
