import React from "react";
import { Check, Cpu, Sparkles } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cabeza, Chip, Cinetico, Ejes, Escena, FormulaCard, Frac, Nota, Op, Pildora, Sube, Tarjeta, Var } from "../../estilos/nube/kit";
import { codigo, n, tipo } from "../../estilos/nube/tokens";
import { ENERGIA_R4, SINGULARES } from "./datos";

const SERIE = "Tech capsule · PEFT & model merging";

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c7 = useCue("780");
  const c4 = useCue("48");
  const k1 = transicion(frame, c7 + 10, fps, 900, EXPO_OUT);
  const k2 = transicion(frame, c4 + 4, fps, 900, EXPO_OUT);
  const barra = (lab: string, gb: number, col: string, k: number) => (
    <div style={{ marginTop: 26, opacity: Math.min(1, k * 2) }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
        <span>{lab}</span>
        <span style={{ fontWeight: 500, color: col }}>{gb > 100 ? "> " : "< "}{Math.round(gb * k)} GB</span>
      </div>
      <div style={{ height: 56, borderRadius: 12, background: n.superficie, border: `2px solid ${n.borde}`, marginTop: 10 }}>
        <div style={{ height: "100%", width: `${(gb / 780) * 100 * k}%`, minWidth: k > 0 ? 8 : 0, borderRadius: 10, background: col }} />
      </div>
    </div>
  );
  return (
    <Escena>
      <div style={{ ...tipo.cuerpo, color: n.texto2 }}>fine-tuning a 65B-parameter model · GPU memory</div>
      {barra("16-bit full fine-tuning", 780, n.rojo, k1)}
      {barra("QLoRA", 48, n.verde, k2)}
      <Sube at={c4 + 20} style={{ marginTop: 30 }}>
        <Chip at={c4 + 20} color={n.verde}>
          <Cpu size={24} strokeWidth={2} /> one 48 GB GPU
        </Chip>
      </Sube>
      <Nota at={c4 + 30} tam={22} style={{ marginTop: 18 }}>
        Dettmers et al. (2023), «QLoRA: Efficient Finetuning of Quantized LLMs», NeurIPS
      </Nota>
      <div style={{ marginTop: 50 }}>
        <Cinetico at={c4 + 40} texto="Adapt a giant model|*on one GPU.*" tam={84} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ marginTop: 300 }}>
      <div style={{ ...tipo.rotulo, color: n.azul }}>TECH CAPSULE</div>
      <Cinetico at={8} texto="PEFT &|*model merging.*" tam={120} style={{ marginTop: 18 }} />
      <Sube at={28}>
        <div style={{ ...tipo.cuerpo, color: n.texto2, marginTop: 24 }}>LoRA · QLoRA · DoRA · SLERP · TIES · by {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── LoRA ─────────────────────────────────────────────────────────────────────
export const Lora: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("congela");
  const cB = useCue("ba");
  const cP = useCue("pct");
  const largoP = useCueAt("pct", 1) - cP;
  const t = (a: number) => transicion(frame, a, fps, 500, EXPO_OUT);
  const res = transicion(frame, cP + largoP * 0.7, fps, 500, backOut);
  const caja = (w: number, h: number, col: string, fondo: string, txt: string, a: number) => (
    <div style={{ width: w, height: h, borderRadius: 10, border: `3px solid ${col}`, background: fondo, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'STIX Two Text', serif", fontStyle: "italic", fontSize: 40, color: col, opacity: t(a) }}>{txt}</div>
  );
  return (
    <Escena>
      <Cabeza at={cC} serie={SERIE} titulo="LoRA: a small,|*low-rank correction.*" />
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 34 }}>
        <div style={{ textAlign: "center" }}>
          {caja(230, 230, n.texto3, n.superficie, "W₀", cC + 8)}
          <div style={{ fontSize: 22, color: n.texto2, marginTop: 6, opacity: t(cC + 8) }}>frozen · d × k</div>
        </div>
        <div style={{ fontSize: 56, color: n.texto2, opacity: t(cB) }}>+</div>
        <div style={{ textAlign: "center" }}>
          {caja(46, 230, n.azul, n.azulClaro, "B", cB + 6)}
          <div style={{ fontSize: 22, color: n.azul, marginTop: 6, opacity: t(cB + 6) }}>d × r</div>
        </div>
        <div style={{ fontSize: 40, color: n.texto2, opacity: t(cB + 10) }}>·</div>
        <div style={{ textAlign: "center" }}>
          {caja(230, 46, n.verde, n.verdeClaro, "A", cB + 12)}
          <div style={{ fontSize: 22, color: n.verde, marginTop: 6, opacity: t(cB + 12) }}>r × k</div>
        </div>
      </div>
      <FormulaCard
        at={cB + 20}
        tam={52}
        style={{ marginTop: 26 }}
        formula={
          <>
            <Var>W</Var>
            <Op>=</Op>
            <Var color={n.texto3}>W₀</Var>
            <Op>+</Op>
            <Var color={n.azul}>B</Var>
            <Var color={n.verde}>A</Var>
            <span style={{ marginLeft: 40 }} />
            <Frac
              arriba={
                <span>
                  <Var color={n.azul}>r</Var>(<Var>d</Var> + <Var>k</Var>)
                </span>
              }
              abajo={
                <span>
                  <Var>d</Var> · <Var>k</Var>
                </span>
              }
            />
          </>
        }
        leyenda={[
          ["r", n.azul, "rank (e.g. 8)"],
          ["d, k", n.texto, "layer dimensions"],
        ]}
        columnas={2}
      />
      <Tarjeta at={cP + 4} color={n.verde} style={{ marginTop: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontFamily: codigo, fontSize: 26, color: n.texto2 }}>4096 × 4096, r = 8</span>
          <span style={{ fontSize: 30 }}>
            65,536 <span style={{ color: n.texto2 }}>vs</span> 16.8 M
          </span>
        </div>
        <div style={{ fontSize: 72, fontWeight: 500, color: n.verde, display: "inline-block", transform: `scale(${res})`, transformOrigin: "left" }}>0.39%</div>
      </Tarjeta>
    </Escena>
  );
};

// ─── ¿Por qué basta un rango bajo? ────────────────────────────────────────────
export const Rango: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("svd");
  const cG = useCue("gpt3");
  const largoG = useCueAt("gpt3", 1) - cG;
  const k = transicion(frame, cS + 10, fps, 1200, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cS} serie={SERIE} titulo="Why low rank|*is enough.*" />
      <div style={{ marginTop: 26 }}>
        <Ejes ancho={912} alto={360} x={[0, 24]} y={[0, 280]} at={cS} rotuloX="singular value index →" rotuloY="singular values of ΔW" marcasX={[1, 4, 8, 16, 24].map((m) => ({ v: m - 0.5, t: String(m) }))}>
          {({ px, py }) => (
            <g>
              {SINGULARES.map((s, i) => (
                <rect key={i} x={px(i) + 3} y={py(s * k)} width={px(1) - px(0) - 6} height={py(0) - py(s * k)} rx={4} fill={i < 4 ? n.azul : n.texto3} />
              ))}
            </g>
          )}
        </Ejes>
      </div>
      <Nota at={cS + 50} color={n.texto} tam={26} style={{ marginTop: 6 }}>
        top 4 directions hold {(ENERGIA_R4 * 100).toFixed(1)}% of the energy · simulated update, rank 4 + noise
      </Nota>
      <Nota at={cS + 60} tam={22} style={{ marginTop: 6 }}>
        Aghajanyan, Gupta y Zettlemoyer (2021), «Intrinsic Dimensionality Explains the Effectiveness of Language Model Fine-Tuning», ACL
      </Nota>
      <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
        <Tarjeta at={cG + 4} color={n.azul} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>GPT-3 · trainable params</div>
          <div style={{ fontSize: 60, fontWeight: 500, color: n.azul }}>10,000× less</div>
        </Tarjeta>
        <Tarjeta at={cG + largoG * 0.3} color={n.verde} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>GPU memory</div>
          <div style={{ fontSize: 60, fontWeight: 500, color: n.verde }}>3× less</div>
        </Tarjeta>
      </div>
      <Nota at={cG + largoG * 0.6} color={n.texto} tam={26} style={{ marginTop: 16 }}>
        after training: W = W₀ + BA → zero extra inference latency · Hu et al. (2022), ICLR
      </Nota>
    </Escena>
  );
};

// ─── QLoRA ────────────────────────────────────────────────────────────────────
export const Qlora: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cN = useCue("nf4");
  const cD = useCue("doble");
  const largoD = useCueAt("doble", 1) - cD;
  const t = (a: number) => transicion(frame, a, fps, 500, EXPO_OUT);
  const capas: [string, string, string, string, number][] = [
    ["LoRA adapters", "trainable · BF16", n.verde, n.verdeClaro, 0],
    ["frozen base model", "4-bit NormalFloat (NF4)", n.azul, n.azulClaro, 1],
  ];
  return (
    <Escena>
      <Cabeza at={cN} serie={SERIE} titulo="QLoRA:|*a 4-bit base.*" />
      <div style={{ marginTop: 34 }}>
        {capas.map(([nom, det, col, fondo, i]) => (
          <div key={nom} style={{ height: i === 0 ? 90 : 200, marginTop: i === 0 ? 0 : 10, borderRadius: 18, border: `3px solid ${col}`, background: fondo, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px", opacity: t(cN + 8 + (1 - i) * 24) }}>
            <span style={{ fontSize: 34, fontWeight: 500 }}>{nom}</span>
            <span style={{ fontFamily: codigo, fontSize: 26, color: col }}>{det}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 26 }}>
        <Tarjeta at={cD + 4} color={n.amarillo}>
          <div style={{ fontSize: 30, fontWeight: 500 }}>double quantization</div>
          <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>quantize the quantization constants · saves ≈ 0.37 bits/param</div>
        </Tarjeta>
        <Tarjeta at={cD + largoD * 0.6} color={n.rojo}>
          <div style={{ fontSize: 30, fontWeight: 500 }}>paged optimizers</div>
          <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>move optimizer state to CPU memory during spikes</div>
        </Tarjeta>
      </div>
      <Nota at={cD + largoD * 0.8} tam={24} style={{ marginTop: 18 }} color={n.texto}>
        7B model: full fine-tuning with Adam ≈ 16 bytes/param = 112 GB · base in 4 bits ≈ 3.5 GB
      </Nota>
    </Escena>
  );
};

// ─── DoRA ─────────────────────────────────────────────────────────────────────
export const Dora: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("dora");
  const largo = useCueAt("dora", 1) - at;
  const encM = frame >= at + largo * 0.15 && frame < at + largo * 0.3;
  const encD = frame >= at + largo * 0.3 && frame < at + largo * 0.6;
  const kV = transicion(frame, at + 20, fps, 900, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={at} serie={SERIE} titulo="DoRA: magnitude|*and direction.*" />
      <FormulaCard
        at={at + 6}
        tam={60}
        style={{ marginTop: 34 }}
        formula={
          <>
            <Var>W</Var>
            <Op>=</Op>
            <Var color={n.amarillo} activa={encM}>
              m
            </Var>
            <Op>·</Op>
            <Frac
              arriba={
                <Var color={n.azul} activa={encD}>
                  W₀ + BA
                </Var>
              }
              abajo={
                <span>
                  ‖<Var color={n.azul}>W₀ + BA</Var>‖
                </span>
              }
            />
          </>
        }
        leyenda={[
          ["m", n.amarillo, "magnitude · trained directly"],
          ["BA", n.azul, "LoRA on the direction only"],
        ]}
      />
      <svg width={912} height={360} style={{ marginTop: 26, overflow: "visible" }}>
        <circle cx={260} cy={300} r={6} fill={n.texto} />
        <line x1={260} y1={300} x2={260 + 300 * kV} y2={300 - 220 * kV} stroke={n.azul} strokeWidth={6} />
        <line x1={260} y1={300} x2={260 + 380 * kV} y2={300 - 279 * kV} stroke={n.amarillo} strokeWidth={3} strokeDasharray="10 8" />
        <text x={260 + 150} y={300 - 140} fontFamily="'STIX Two Text', serif" fontStyle="italic" fontSize={36} fill={n.azul} opacity={kV}>
          direction
        </text>
        <text x={260 + 400} y={300 - 270} fontFamily="'STIX Two Text', serif" fontStyle="italic" fontSize={36} fill={n.amarillo} opacity={kV}>
          × m
        </text>
      </svg>
      <Nota at={at + largo * 0.8} tam={22}>
        Liu et al. (2024), «DoRA: Weight-Decomposed Low-Rank Adaptation», ICML
      </Nota>
    </Escena>
  );
};

// ─── Vectores de tarea ────────────────────────────────────────────────────────
export const Vectores: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cT = useCue("tarea");
  const cS = useCue("suma");
  const t = (a: number) => transicion(frame, a, fps, 500, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cT} serie={SERIE} titulo="Model merging:|*task vectors.*" />
      <FormulaCard
        at={cT + 10}
        tam={58}
        style={{ marginTop: 34 }}
        formula={
          <>
            <Var color={n.azul}>τ</Var>
            <sub style={{ fontSize: "0.5em" }}>task</sub>
            <Op>=</Op>
            <Var>θ</Var>
            <sub style={{ fontSize: "0.5em" }}>fine-tuned</sub>
            <Op>−</Op>
            <Var color={n.texto3}>θ</Var>
            <sub style={{ fontSize: "0.5em" }}>base</sub>
          </>
        }
        leyenda={[["τ", n.azul, "what fine-tuning changed"]]}
      />
      <div style={{ opacity: t(cS) }}>
        <FormulaCard
          at={cS}
          tam={58}
          style={{ marginTop: 22 }}
          formula={
            <>
              <Var>θ</Var>
              <sub style={{ fontSize: "0.5em" }}>merged</sub>
              <Op>=</Op>
              <Var color={n.texto3}>θ</Var>
              <sub style={{ fontSize: "0.5em" }}>base</sub>
              <Op>+</Op>
              <Var color={n.verde}>λ</Var>
              <Op>·</Op>Σ <Var color={n.azul}>τ</Var>
              <sub style={{ fontSize: "0.5em" }}>i</sub>
            </>
          }
          leyenda={[["λ", n.verde, "scaling factor"]]}
        />
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 26, flexWrap: "wrap" }}>
        {["SQL", "legal Spanish", "math"].map((s, i) => (
          <Chip key={s} at={cS + 20 + i * 8} color={[n.azul, n.amarillo, n.verde][i]}>
            <Sparkles size={22} strokeWidth={2} /> {s}
          </Chip>
        ))}
      </div>
      <Nota at={cS + 50} tam={22} style={{ marginTop: 18 }}>
        Ilharco et al. (2023), «Editing Models with Task Arithmetic», ICLR · skills illustrative
      </Nota>
    </Escena>
  );
};

// ─── SLERP ────────────────────────────────────────────────────────────────────
export const Slerp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cL = useCue("lerp");
  const cA = useCue("arco");
  const kL = transicion(frame, cL + 20, fps, 800, EXPO_OUT);
  const kA = transicion(frame, cA + 6, fps, 1200, EXPO_IN_OUT);
  const O: [number, number] = [200, 420];
  const R = 300;
  const P = (ang: number) => [O[0] + R * Math.cos(ang), O[1] - R * Math.sin(ang)];
  const [ax, ay] = P(0);
  const [bx, by] = P(Math.PI / 2);
  const arco = Array.from({ length: 41 }, (_, i) => P((i / 40) * (Math.PI / 2) * kA));
  const [mx, my] = P(Math.PI / 4);
  return (
    <Escena>
      <Cabeza at={cL} serie={SERIE} titulo="SLERP:|*along the arc.*" />
      <svg width={912} height={460} style={{ marginTop: 20, overflow: "visible" }}>
        <path d={`M${O[0] + R},${O[1]} A${R},${R} 0 0 0 ${O[0]},${O[1] - R}`} fill="none" stroke={n.borde} strokeWidth={2} strokeDasharray="6 8" />
        <line x1={O[0]} y1={O[1]} x2={ax} y2={ay} stroke={n.azul} strokeWidth={6} />
        <line x1={O[0]} y1={O[1]} x2={bx} y2={by} stroke={n.verde} strokeWidth={6} />
        <text x={ax + 14} y={ay + 10} fontFamily="'STIX Two Text', serif" fontStyle="italic" fontSize={36} fill={n.azul}>
          θ₁
        </text>
        <text x={bx - 10} y={by - 16} fontFamily="'STIX Two Text', serif" fontStyle="italic" fontSize={36} fill={n.verde}>
          θ₂
        </text>
        <g opacity={kL}>
          <line x1={ax} y1={ay} x2={bx} y2={by} stroke={n.rojo} strokeWidth={3} strokeDasharray="10 8" />
          <line x1={O[0]} y1={O[1]} x2={(ax + bx) / 2} y2={(ay + by) / 2} stroke={n.rojo} strokeWidth={5} />
          <text x={(ax + bx) / 2 + 16} y={(ay + by) / 2 + 40} fontFamily={codigo} fontSize={24} fill={n.rojo}>
            linear midpoint · length 0.71
          </text>
        </g>
        <g opacity={kA > 0 ? 1 : 0}>
          <path d={`M${arco.map((q) => q.join(",")).join("L")}`} fill="none" stroke={n.amarillo} strokeWidth={6} />
          <line x1={O[0]} y1={O[1]} x2={mx} y2={my} stroke={n.amarillo} strokeWidth={5} opacity={kA} />
          <text x={mx + 20} y={my - 16} fontFamily={codigo} fontSize={24} fill={n.amarillo} opacity={kA}>
            SLERP midpoint · length 1
          </text>
        </g>
      </svg>
      <FormulaCard
        at={cA + 10}
        tam={44}
        style={{ marginTop: 6 }}
        formula={
          <>
            slerp(<Var>t</Var>)<Op>=</Op>
            <Frac arriba={<span>sin((1−t)Ω)</span>} abajo="sin Ω" />
            <Var color={n.azul}>θ₁</Var>
            <Op>+</Op>
            <Frac arriba={<span>sin(tΩ)</span>} abajo="sin Ω" />
            <Var color={n.verde}>θ₂</Var>
          </>
        }
        leyenda={[["Ω", n.texto, "angle between the two weight vectors"]]}
      />
    </Escena>
  );
};

// ─── TIES ─────────────────────────────────────────────────────────────────────
export const Ties: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("pasos");
  const cE = useCue("ejemplo");
  const largoP = useCueAt("pasos", 1) - cP;
  const largoE = useCueAt("ejemplo", 1) - cE;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const pasos: [string, string, string, number][] = [
    ["1 · Trim", "keep the top 20% of changes by magnitude", n.azul, 0.2],
    ["2 · Elect sign", "one sign per parameter, by total mass", n.amarillo, 0.5],
    ["3 · Disjoint merge", "average only values that agree", n.verde, 0.75],
  ];
  const valores = [0.5, 0.3, -0.6];
  const kEj = t(cE);
  const resultado = frame >= cE + largoE * 0.6;
  return (
    <Escena>
      <Cabeza at={cP} serie={SERIE} titulo="TIES: merging|*without cancelling.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 30 }}>
        {pasos.map(([p, d, col, f]) => (
          <Tarjeta key={p} at={cP + largoP * f} color={col}>
            <div style={{ fontSize: 30, fontWeight: 500 }}>{p}</div>
            <div style={{ fontSize: 24, color: n.texto2, marginTop: 2 }}>{d}</div>
          </Tarjeta>
        ))}
      </div>
      <div style={{ marginTop: 26, opacity: kEj }}>
        <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2 }}>one parameter, three fine-tuned models</div>
        <div style={{ display: "flex", gap: 14, marginTop: 12 }}>
          {valores.map((val, i) => (
            <div key={i} style={{ flex: 1, height: 100, borderRadius: 14, border: `3px solid ${val > 0 ? n.verde : n.rojo}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 40, color: val > 0 ? n.verde : n.rojo, opacity: resultado && val < 0 ? 0.3 : 1 }}>
              {val > 0 ? "+" : "−"}
              {Math.abs(val).toFixed(1)}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 18 }}>
          <Tarjeta at={cE + largoE * 0.35} color={n.rojo} style={{ flex: 1 }}>
            <div style={{ fontSize: 24, color: n.texto2 }}>plain average</div>
            <div style={{ fontSize: 52, fontWeight: 500, color: n.rojo }}>0.07</div>
          </Tarjeta>
          <Tarjeta at={cE + largoE * 0.6} color={n.verde} style={{ flex: 1 }}>
            <div style={{ fontSize: 24, color: n.texto2 }}>TIES (sign +)</div>
            <div style={{ fontSize: 52, fontWeight: 500, color: n.verde }}>0.40</div>
          </Tarjeta>
        </div>
      </div>
      <Nota at={cE + largoE * 0.8} tam={22} style={{ marginTop: 14 }}>
        Yadav et al. (2023), «TIES-Merging: Resolving Interference When Merging Models», NeurIPS
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
              <div style={{ fontSize: 34, fontWeight: 500 }}>Vertex AI</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>supervised tuning · open models like Gemma to adapt with LoRA</div>
            </div>
          </div>
        </Tarjeta>
        <Tarjeta at={at + largo * 0.5} color={n.verde}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Cpu size={50} strokeWidth={1.5} color={n.verde} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>one NVIDIA L4 · 24 GB</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>enough for QLoRA on a 7B model</div>
            </div>
          </div>
        </Tarjeta>
      </div>
    </Escena>
  );
};

// ─── Las bases ────────────────────────────────────────────────────────────────
export const Bases: React.FC = () => {
  const at = useCue("bases");
  const largo = useCueAt("bases", 1) - at;
  const ideas: [string, string, string, number][] = [
    ["LoRA = W₀ + BA", "train r(d + k) instead of d·k", n.azul, 0.1],
    ["QLoRA = LoRA on a 4-bit base", "giant models on one GPU", n.amarillo, 0.35],
    ["Merge with care", "SLERP keeps length · TIES avoids sign cancelling", n.verde, 0.6],
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
      <div style={{ marginTop: 260 }}>
        <Cinetico at={at} texto="Small adapters,|*big models.*" tam={96} />
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
