import React from "react";
import { Check, Cpu, Layers, Network, Server } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cabeza, Chip, Cinetico, Escena, FormulaCard, Frac, Nota, Op, Pildora, Sube, Tarjeta, Var } from "../../estilos/nube/kit";
import { codigo, n, tipo } from "../../estilos/nube/tokens";
import { BURBUJA, ZERO } from "./datos";

const SERIE = "Tech capsule · Distributed training";
const sub = (t: string) => <sub style={{ fontSize: "0.5em" }}>{t}</sub>;

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c1 = useCue("120");
  const c2 = useCue("19");
  const k1 = transicion(frame, c1 + 10, fps, 900, EXPO_OUT);
  const k2 = transicion(frame, c2 + 4, fps, 900, EXPO_OUT);
  const barra = (lab: string, gb: number, col: string, k: number) => (
    <div style={{ marginTop: 26, opacity: Math.min(1, k * 2) }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
        <span>{lab}</span>
        <span style={{ fontWeight: 500, color: col }}>{(gb * k).toFixed(gb < 10 ? 1 : 0)} GB</span>
      </div>
      <div style={{ height: 56, borderRadius: 12, background: n.superficie, border: `2px solid ${n.borde}`, marginTop: 10 }}>
        <div style={{ height: "100%", width: `${(gb / 120) * 100 * k}%`, minWidth: k > 0 ? 10 : 0, borderRadius: 10, background: col }} />
      </div>
    </div>
  );
  return (
    <Escena>
      <div style={{ ...tipo.cuerpo, color: n.texto2 }}>training a 7.5B-parameter model · memory per GPU</div>
      {barra("one GPU, plain data parallelism", 120, n.rojo, k1)}
      {barra("ZeRO-3 across 64 GPUs", 1.9, n.verde, k2)}
      <Sube at={c1 + 30} style={{ marginTop: 30 }}>
        <Chip at={c1 + 30} color={n.rojo}>
          <Cpu size={24} strokeWidth={2} /> more than one 80 GB GPU holds
        </Chip>
      </Sube>
      <Nota at={c2 + 30} tam={22} style={{ marginTop: 18 }}>
        Rajbhandari et al. (2020), «ZeRO: Memory Optimizations Toward Training Trillion Parameter Models», SC20
      </Nota>
      <div style={{ marginTop: 50 }}>
        <Cinetico at={c2 + 40} texto="Shard|*everything.*" tam={96} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ marginTop: 300 }}>
      <div style={{ ...tipo.rotulo, color: n.azul }}>TECH CAPSULE</div>
      <Cinetico at={8} texto="Distributed training &|*3D parallelism.*" tam={110} style={{ marginTop: 18 }} />
      <Sube at={28}>
        <div style={{ ...tipo.cuerpo, color: n.texto2, marginTop: 24 }}>ZeRO · FSDP · tensor · pipeline · NCCL · by {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── 16 bytes por parámetro ───────────────────────────────────────────────────
export const Memoria: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c16 = useCue("16");
  const cA = useCue("adam");
  const largo16 = useCueAt("16", 1) - c16;
  const largoA = useCueAt("adam", 1) - cA;
  const partes: [string, number, string, number, string][] = [
    ["weights · 16-bit", 2, n.azul, c16 + largo16 * 0.4, "#FFFFFF"],
    ["grads · 16-bit", 2, n.amarillo, c16 + largo16 * 0.6, "#FFFFFF"],
    ["fp32 copy", 4, n.verde, cA + largoA * 0.2, "#FFFFFF"],
    ["momentum", 4, "#34A853", cA + largoA * 0.5, "#FFFFFF"],
    ["variance", 4, "#81C995", cA + largoA * 0.7, n.texto],
  ];
  const ancho = 912;
  return (
    <Escena>
      <Cabeza at={c16} serie={SERIE} titulo="Why 16 bytes|*per parameter.*" />
      <div style={{ display: "flex", marginTop: 40, height: 120, borderRadius: 14, overflow: "hidden", border: `2px solid ${n.borde}` }}>
        {partes.map(([lab, b, col, at, txt]) => {
          const k = transicion(frame, at, fps, 500, EXPO_OUT);
          return (
            <div key={lab} style={{ width: (ancho * b) / 16, background: col, opacity: k, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 30, color: txt, borderRight: "2px solid #fff" }}>
              {b}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px", marginTop: 16 }}>
        {partes.map(([lab, b, col, at]) => (
          <div key={lab} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 24, color: n.texto2, opacity: transicion(frame, at, fps, 500, EXPO_OUT) }}>
            <span style={{ width: 20, height: 20, borderRadius: 4, background: col }} />
            {lab} · {b} B
          </div>
        ))}
      </div>
      <FormulaCard
        at={cA + largoA * 0.5}
        tam={56}
        style={{ marginTop: 34 }}
        formula={
          <>
            <Var recta>mem</Var>
            <Op>=</Op>(<Var color={n.azul}>2</Var>
            <Op>+</Op>
            <Var color={n.amarillo}>2</Var>
            <Op>+</Op>
            <Var color={n.verde}>K</Var>)<Op>·</Op>
            <Var>Ψ</Var>
          </>
        }
        leyenda={[
          ["K = 12", n.verde, "Adam state in mixed precision"],
          ["Ψ", n.texto, "number of parameters"],
        ]}
      />
      <Tarjeta at={cA + largoA * 0.8} color={n.rojo} style={{ marginTop: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontFamily: codigo, fontSize: 26, color: n.texto2 }}>16 B × 7.5 B params</span>
          <span style={{ fontSize: 60, fontWeight: 500, color: n.rojo }}>120 GB</span>
        </div>
      </Tarjeta>
      <Nota at={cA + largoA * 0.85} tam={22} style={{ marginTop: 14 }}>
        activations not included · Rajbhandari et al. (2020), SC20 · Kingma & Ba (2015), «Adam», ICLR
      </Nota>
    </Escena>
  );
};

// ─── Paralelismo de datos + all-reduce en anillo ──────────────────────────────
export const Datos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cD = useCue("dp");
  const cR = useCue("ring");
  const largoR = useCueAt("ring", 1) - cR;
  const cols = [n.azul, n.amarillo, n.verde, n.rojo];
  const kR = transicion(frame, cR + 4, fps, 600, EXPO_OUT);
  const giro = ((frame - cR) / fps) * 90;
  const C: [number, number] = [456, 150];
  const R = 135;
  const pos = (i: number) => [C[0] + R * Math.cos((i * Math.PI) / 2 - Math.PI / 2), C[1] + R * Math.sin((i * Math.PI) / 2 - Math.PI / 2)];
  return (
    <Escena>
      <Cabeza at={cD} serie={SERIE} titulo="Data|*parallelism.*" />
      <div style={{ display: "flex", gap: 14, marginTop: 30 }}>
        {cols.map((col, i) => (
          <Tarjeta key={i} at={cD + 6 + i * 5} color={col} style={{ flex: 1 }}>
            <div style={{ fontFamily: codigo, fontSize: 22, color: n.texto2 }}>GPU {i}</div>
            <div style={{ fontSize: 26, marginTop: 6 }}>full model</div>
            <div style={{ height: 22, borderRadius: 6, background: col, marginTop: 10 }} />
            <div style={{ fontSize: 20, color: n.texto2, marginTop: 6 }}>batch ¼</div>
          </Tarjeta>
        ))}
      </div>
      <svg width={912} height={300} style={{ marginTop: 12, overflow: "visible", opacity: kR }}>
        <circle cx={C[0]} cy={C[1]} r={R} fill="none" stroke={n.borde} strokeWidth={3} strokeDasharray="8 10" />
        {cols.map((col, i) => {
          const [x, y] = pos(i);
          return (
            <g key={i}>
              <rect x={x - 52} y={y - 26} width={104} height={52} rx={10} fill={n.fondo} stroke={col} strokeWidth={4} />
              <text x={x} y={y + 8} textAnchor="middle" fontFamily={codigo} fontSize={21} fill={n.texto}>
                GPU {i}
              </text>
            </g>
          );
        })}
        {[0, 1, 2, 3].map((i) => {
          const a = (((i * 90 + giro) % 360) * Math.PI) / 180 - Math.PI / 2 + Math.PI / 4;
          return <circle key={i} cx={C[0] + R * Math.cos(a)} cy={C[1] + R * Math.sin(a)} r={10} fill={cols[i]} />;
        })}
        <text x={C[0]} y={C[1] + 8} textAnchor="middle" fontFamily={codigo} fontSize={22} fill={n.texto2}>
          all-reduce
        </text>
      </svg>
      <FormulaCard
        at={cR + largoR * 0.4}
        tam={50}
        style={{ marginTop: 6 }}
        formula={
          <>
            <Var recta>sent per GPU</Var>
            <Op>=</Op>
            <Frac arriba={<span>2(<Var color={n.azul}>N</Var> − 1)</span>} abajo={<Var color={n.azul}>N</Var>} />
            <Op>·</Op>|<Var>model</Var>|<Op>→</Op>2
          </>
        }
        leyenda={[["N", n.azul, "number of GPUs · N = 8 → 1.75×"]]}
      />
      <Nota at={cR + largoR * 0.7} tam={22} style={{ marginTop: 12 }}>
        Patarasuk & Yuan (2009), «Bandwidth optimal all-reduce algorithms for clusters of workstations», JPDC · NCCL implements it
      </Nota>
    </Escena>
  );
};

// ─── ZeRO ─────────────────────────────────────────────────────────────────────
export const Zero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("copias");
  const cE = useCue("etapas");
  const largoE = useCueAt("etapas", 1) - cE;
  const filas: [string, string, number, string, number][] = [
    ["baseline", "everything replicated", ZERO[0], n.rojo, cC + 10],
    ["ZeRO-1", "shard optimizer state", ZERO[1], n.amarillo, cE + largoE * 0.25],
    ["ZeRO-2", "+ shard gradients", ZERO[2], n.azul, cE + largoE * 0.4],
    ["ZeRO-3", "+ shard weights", ZERO[3], n.verde, cE + largoE * 0.55],
  ];
  return (
    <Escena>
      <Cabeza at={cC} serie={SERIE} titulo="ZeRO: stop|*repeating yourself.*" />
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 20 }}>7.5B params · 64 GPUs · GB per GPU</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
        {filas.map(([nom, d, gb, col, at]) => {
          const k = transicion(frame, at, fps, 800, EXPO_OUT);
          return (
            <div key={nom} style={{ opacity: Math.min(1, k * 2) }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 30, fontWeight: 500 }}>
                  {nom} <span style={{ fontSize: 24, fontWeight: 400, color: n.texto2 }}>· {d}</span>
                </span>
                <span style={{ fontSize: 32, fontWeight: 500, color: col }}>{(gb * k).toFixed(1)}</span>
              </div>
              <div style={{ height: 30, borderRadius: 8, background: n.superficie, border: `2px solid ${n.borde}`, marginTop: 8 }}>
                <div style={{ height: "100%", width: `${(gb / 120) * 100 * k}%`, minWidth: k > 0 ? 8 : 0, borderRadius: 8, background: col }} />
              </div>
            </div>
          );
        })}
      </div>
      <FormulaCard
        at={cE + largoE * 0.6}
        tam={46}
        style={{ marginTop: 16 }}
        formula={
          <>
            <Var recta>ZeRO-3</Var>
            <Op>=</Op>
            <Frac arriba={<span>(2 + 2 + <Var color={n.verde}>K</Var>) · <Var>Ψ</Var></span>} abajo={<Var color={n.azul}>N</Var>} />
          </>
        }
        leyenda={[["N", n.azul, "GPUs: memory falls linearly"]]}
      />
      <Chip at={cE + largoE * 0.8} color={n.azul}>
        <Layers size={22} strokeWidth={2} /> PyTorch FSDP · same idea
      </Chip>
      <Nota at={cE + largoE * 0.85} tam={22} style={{ marginTop: 14 }}>
        Rajbhandari et al. (2020), SC20 · Zhao et al. (2023), «PyTorch FSDP», VLDB
      </Nota>
    </Escena>
  );
};

// ─── Paralelismo de tensores ──────────────────────────────────────────────────
export const Tensor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cT = useCue("tp");
  const cC = useCue("columnas");
  const largoC = useCueAt("columnas", 1) - cC;
  const kA = transicion(frame, cC + largoC * 0.1, fps, 700, EXPO_IN_OUT);
  const kB = transicion(frame, cC + largoC * 0.3, fps, 700, EXPO_IN_OUT);
  const mat = (w: number, h: number, etiqueta: string, corte: "col" | "fila", k: number) => (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: w, height: h, borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: corte === "col" ? "row" : "column", border: `3px solid ${n.texto3}`, gap: 8 * k, background: n.fondo }}>
        <div style={{ flex: 1, background: k > 0.05 ? n.azulClaro : n.superficie, border: k > 0.05 ? `3px solid ${n.azul}` : "none", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'STIX Two Text', serif", fontStyle: "italic", fontSize: 36, color: n.azul }}>
          {k > 0.5 ? `${etiqueta}₁` : ""}
        </div>
        <div style={{ flex: 1, background: k > 0.05 ? n.verdeClaro : n.superficie, border: k > 0.05 ? `3px solid ${n.verde}` : "none", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'STIX Two Text', serif", fontStyle: "italic", fontSize: 36, color: n.verde }}>
          {k > 0.5 ? `${etiqueta}₂` : ""}
        </div>
      </div>
      <div style={{ fontSize: 22, color: n.texto2, marginTop: 8 }}>{corte === "col" ? "split by columns" : "split by rows"}</div>
    </div>
  );
  return (
    <Escena>
      <Cabeza at={cT} serie={SERIE} titulo="Tensor|*parallelism.*" />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40, marginTop: 40, opacity: transicion(frame, cT + 10, fps, 500, EXPO_OUT) }}>
        {mat(280, 180, "A", "col", kA)}
        <div style={{ fontSize: 30, color: n.texto2 }}>GeLU →</div>
        {mat(180, 280, "B", "fila", kB)}
      </div>
      <FormulaCard
        at={cC + largoC * 0.35}
        tam={52}
        style={{ marginTop: 30 }}
        formula={
          <>
            <Var>Y</Var>
            <Op>=</Op>
            <span style={{ color: n.azul }}>
              GeLU(<Var>X</Var>
              <Var color={n.azul}>A</Var>
              {sub("1")})<Var color={n.azul}>B</Var>
              {sub("1")}
            </span>
            <Op>+</Op>
            <span style={{ color: n.verde }}>
              GeLU(<Var>X</Var>
              <Var color={n.verde}>A</Var>
              {sub("2")})<Var color={n.verde}>B</Var>
              {sub("2")}
            </span>
          </>
        }
        leyenda={[
          ["1", n.azul, "GPU 0"],
          ["2", n.verde, "GPU 1"],
        ]}
        columnas={2}
      />
      <Tarjeta at={cC + largoC * 0.7} color={n.amarillo} style={{ marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Server size={40} strokeWidth={1.6} color={n.amarillo} />
          <div style={{ fontSize: 28 }}>one all-reduce per block, every layer → keep it inside one server (NVLink)</div>
        </div>
      </Tarjeta>
      <Nota at={cC + largoC * 0.8} tam={22} style={{ marginTop: 14 }}>
        Shoeybi et al. (2019), «Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism»
      </Nota>
    </Escena>
  );
};

// ─── Paralelismo de pipeline ──────────────────────────────────────────────────
export const Pipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cE = useCue("etapa");
  const cB = useCue("burbuja");
  const largoB = useCueAt("burbuja", 1) - cB;
  const p = 4;
  const m = 4;
  const T = 2 * (m + p - 1);
  const W = 912 - 110;
  const celda = W / T;
  const kG = transicion(frame, cE + 10, fps, 1600, EXPO_IN_OUT);
  const kBur = transicion(frame, cB + largoB * 0.15, fps, 500, EXPO_OUT);
  const ocupado = (s: number, t: number): [string, number] | null => {
    const iF = t - s;
    if (iF >= 0 && iF < m) return ["F", iF];
    const iB = t - (m + p - 1) - (p - 1 - s);
    if (iB >= 0 && iB < m) return ["B", iB];
    return null;
  };
  return (
    <Escena>
      <Cabeza at={cE} serie={SERIE} titulo="Pipeline|*parallelism.*" />
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 30 }}>p = 4 stages · m = 4 micro-batches · time →</div>
      <div style={{ marginTop: 14 }}>
        {Array.from({ length: p }, (_, s) => (
          <div key={s} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <div style={{ width: 110, fontFamily: codigo, fontSize: 22, color: n.texto2 }}>stage {s}</div>
            {Array.from({ length: T }, (_, t) => {
              const o = ocupado(s, t);
              const vis = t / T <= kG;
              const col = o ? (o[0] === "F" ? n.azul : n.verde) : n.rojoClaro;
              return (
                <div key={t} style={{ width: celda - 4, marginRight: 4, height: 50, borderRadius: 6, background: vis ? (o ? col : kBur > 0 ? col : n.superficie) : "transparent", border: o || !vis ? "none" : `2px solid ${kBur > 0 ? n.rojo : n.borde}`, opacity: o ? 1 : 0.4 + 0.6 * kBur, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 20, color: "#fff" }}>
                  {vis && o ? `${o[0]}${o[1] + 1}` : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 22, fontSize: 22, color: n.texto2, marginTop: 6 }}>
        <span style={{ color: n.azul }}>■ forward</span>
        <span style={{ color: n.verde }}>■ backward</span>
        <span style={{ color: n.rojo, opacity: kBur }}>■ bubble (idle)</span>
      </div>
      <FormulaCard
        at={cB + largoB * 0.2}
        tam={54}
        style={{ marginTop: 22 }}
        formula={
          <>
            <Var recta>bubble</Var>
            <Op>=</Op>
            <Frac arriba={<span><Var color={n.azul}>p</Var> − 1</span>} abajo={<span><Var color={n.verde}>m</Var> + <Var color={n.azul}>p</Var> − 1</span>} />
          </>
        }
        leyenda={[
          ["p", n.azul, "pipeline stages"],
          ["m", n.verde, "micro-batches"],
        ]}
        columnas={2}
      />
      <div style={{ display: "flex", gap: 16, marginTop: 18 }}>
        {BURBUJA.map(([mm, b], i) => (
          <Tarjeta key={mm} at={cB + largoB * (0.6 + i * 0.2)} color={i === 0 ? n.rojo : n.verde} style={{ flex: 1 }}>
            <div style={{ fontSize: 24, color: n.texto2 }}>p = 4 · m = {mm}</div>
            <div style={{ fontSize: 56, fontWeight: 500, color: i === 0 ? n.rojo : n.verde }}>{Math.round(b * 100)}% idle</div>
          </Tarjeta>
        ))}
      </div>
      <Nota at={cB + largoB * 0.7} tam={22} style={{ marginTop: 12 }}>
        Huang et al. (2019), «GPipe», NeurIPS · Narayanan et al. (2021), SC21
      </Nota>
    </Escena>
  );
};

// ─── 3D ───────────────────────────────────────────────────────────────────────
export const Tresd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c3 = useCue("3d");
  const cT = useCue("trillon");
  const largo3 = useCueAt("3d", 1) - c3;
  const largoT = useCueAt("trillon", 1) - cT;
  const ejes: [string, string, string, React.ReactNode, number][] = [
    ["Tensor", "inside a server · fastest links", n.azul, <Cpu key="c" size={40} strokeWidth={1.6} color={n.azul} />, 0.25],
    ["Pipeline", "across servers · few messages", n.amarillo, <Server key="s" size={40} strokeWidth={1.6} color={n.amarillo} />, 0.5],
    ["Data", "replicas on top · all-reduce", n.verde, <Network key="n" size={40} strokeWidth={1.6} color={n.verde} />, 0.75],
  ];
  const k = transicion(frame, cT + largoT * 0.5, fps, 600, backOut);
  return (
    <Escena>
      <Cabeza at={c3} serie={SERIE} titulo="3D: all three|*at once.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 30 }}>
        {ejes.map(([t, d, col, ic, f]) => (
          <Tarjeta key={t} at={c3 + largo3 * f} color={col}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              {ic}
              <div>
                <div style={{ fontSize: 32, fontWeight: 500 }}>{t}</div>
                <div style={{ fontSize: 24, color: n.texto2, marginTop: 2 }}>{d}</div>
              </div>
            </div>
          </Tarjeta>
        ))}
      </div>
      <FormulaCard
        at={c3 + largo3 * 0.85}
        tam={56}
        style={{ marginTop: 22 }}
        formula={
          <>
            <Var recta>GPUs</Var>
            <Op>=</Op>
            <Var color={n.azul}>t</Var>
            <Op>·</Op>
            <Var color={n.amarillo}>p</Var>
            <Op>·</Op>
            <Var color={n.verde}>d</Var>
          </>
        }
      />
      <div style={{ display: "flex", gap: 14, marginTop: 22 }}>
        {[
          ["1 T", "parameters"],
          ["3,072", "GPUs"],
          ["52%", "of peak"],
        ].map(([v, l], i) => (
          <Tarjeta key={l} at={cT + largoT * (0.15 + i * 0.2)} color={n.azul} style={{ flex: 1 }}>
            <div style={{ fontSize: 50, fontWeight: 500, color: n.azul, display: "inline-block", transform: i === 2 ? `scale(${Math.max(0, k)})` : undefined, transformOrigin: "left" }}>{v}</div>
            <div style={{ fontSize: 24, color: n.texto2 }}>{l}</div>
          </Tarjeta>
        ))}
      </div>
      <Nota at={cT + largoT * 0.7} tam={22} style={{ marginTop: 14 }}>
        Narayanan et al. (2021), «Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM», SC21 · 502 petaFLOP/s
      </Nota>
    </Escena>
  );
};

// ─── Gradient checkpointing ───────────────────────────────────────────────────
export const Checkpoint: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cK = useCue("ckpt");
  const cR = useCue("raiz");
  const largoK = useCueAt("ckpt", 1) - cK;
  const largoR = useCueAt("raiz", 1) - cR;
  const capas = 16;
  const guardar = frame >= cK + largoK * 0.45;
  return (
    <Escena>
      <Cabeza at={cK} serie={SERIE} titulo="Gradient|*checkpointing.*" />
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 30 }}>16 layers · activations kept in memory</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 10, marginTop: 14 }}>
        {Array.from({ length: capas }, (_, i) => {
          const a = transicion(frame, cK + 6 + i * 2, fps, 300, EXPO_OUT);
          const cp = i % 4 === 0;
          const on = !guardar || cp;
          return (
            <div key={i} style={{ height: 86, borderRadius: 10, border: `2px solid ${on ? (cp && guardar ? n.verde : n.azul) : n.borde}`, background: on ? (cp && guardar ? n.verdeClaro : n.azulClaro) : n.superficie, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 22, color: on ? n.texto : n.texto3, opacity: a }}>
              {on ? `L${i + 1}` : "↻"}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 22, fontSize: 22, color: n.texto2, marginTop: 12, opacity: guardar ? 1 : 0 }}>
        <span style={{ color: n.verde }}>■ checkpoint: kept</span>
        <span>↻ recomputed in the backward pass</span>
      </div>
      <FormulaCard
        at={cR + 4}
        tam={54}
        style={{ marginTop: 30 }}
        formula={
          <>
            <Var recta>memory</Var>
            <Op>∝</Op>√<Var color={n.azul}>n</Var>
            <span style={{ marginLeft: 50 }} />
            <Var recta>compute</Var>
            <Op>≈</Op>
            <Var recta>+1 forward</Var>
          </>
        }
        leyenda={[["n", n.azul, "layers · 16 layers → 4 checkpoints"]]}
      />
      <Tarjeta at={cR + largoR * 0.6} color={n.amarillo} style={{ marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 26, color: n.texto2 }}>forward + backward ≈ 3 forwards → one more</span>
          <span style={{ fontSize: 56, fontWeight: 500, color: n.amarillo }}>≈ +33%</span>
        </div>
      </Tarjeta>
      <Nota at={cR + largoR * 0.7} tam={22} style={{ marginTop: 14 }}>
        Chen et al. (2016), «Training Deep Nets with Sublinear Memory Cost», arXiv:1604.06174
      </Nota>
    </Escena>
  );
};

// ─── En Google Cloud ──────────────────────────────────────────────────────────
export const Nube: React.FC = () => {
  const at = useCue("gcp");
  const largo = useCueAt("gcp", 1) - at;
  const filas: [string, string, string, React.ReactNode, number][] = [
    ["TPU v5p pods", "3D-torus ICI · up to 8,960 chips per pod", n.azul, <Cpu key="c" size={50} strokeWidth={1.5} color={n.azul} />, 0.05],
    ["JAX sharding", "same code, parallelism by annotations (GSPMD)", n.amarillo, <Layers key="l" size={50} strokeWidth={1.5} color={n.amarillo} />, 0.4],
    ["GKE for GPUs", "orchestrates multi-node training jobs", n.verde, <Server key="s" size={50} strokeWidth={1.5} color={n.verde} />, 0.75],
  ];
  return (
    <Escena>
      <Cabeza at={at} serie={SERIE} titulo="On|*Google Cloud.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 40 }}>
        {filas.map(([t, d, col, ic, f]) => (
          <Tarjeta key={t} at={at + largo * f} color={col}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {ic}
              <div>
                <div style={{ fontSize: 34, fontWeight: 500 }}>{t}</div>
                <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>{d}</div>
              </div>
            </div>
          </Tarjeta>
        ))}
      </div>
      <Nota at={at + largo * 0.8} tam={22} style={{ marginTop: 22 }}>
        Google Cloud TPU docs, «TPU v5p» · Xu et al. (2021), «GSPMD», arXiv:2105.04663
      </Nota>
    </Escena>
  );
};

// ─── Las bases ────────────────────────────────────────────────────────────────
export const Bases: React.FC = () => {
  const at = useCue("bases");
  const largo = useCueAt("bases", 1) - at;
  const ideas: [string, string, string, number][] = [
    ["16 bytes per parameter", "(2 + 2 + 12)·Ψ before activations", n.azul, 0.08],
    ["all-reduce = reduce-scatter + all-gather", "the collectives behind DP and ZeRO", n.amarillo, 0.3],
    ["Pipeline bubble", "(p − 1)/(m + p − 1)", n.verde, 0.55],
    ["Communication is compute", "place each split on the right links", n.azul, 0.75],
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
        <Cinetico at={at} texto="Many GPUs,|*one model.*" tam={96} />
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
