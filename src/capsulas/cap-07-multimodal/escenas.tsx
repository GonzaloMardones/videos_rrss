import React from "react";
import { AudioLines, Car, Check, Coffee, Database, Dog, Image, Mountain, Search, Sparkles, X } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cabeza, Chip, Cinetico, Escena, FormulaCard, Frac, Nota, Op, Pildora, Sube, Tarjeta, Var } from "../../estilos/nube/kit";
import { codigo, n, tipo } from "../../estilos/nube/tokens";
import { SIM, TEXTOS, filaSoftmax } from "./datos";

const SERIE = "Tech capsule · Multimodal & embeddings";
const sub = (t: string) => <sub style={{ fontSize: "0.5em" }}>{t}</sub>;
const ICONOS = [Dog, Car, Mountain, Coffee];

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("clip");
  const cP = useCue("pares");
  const largoC = useCueAt("clip", 1) - cC;
  const k = transicion(frame, cC + largoC * 0.3, fps, 1000, EXPO_OUT);
  return (
    <Escena>
      <div style={{ ...tipo.cuerpo, color: n.texto2 }}>ImageNet top-1 accuracy · 2021</div>
      <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
        <Tarjeta at={cC + largoC * 0.25} color={n.texto3} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>ResNet-50 · trained on labels</div>
          <div style={{ fontSize: 64, fontWeight: 500 }}>≈ 76%</div>
          <div style={{ fontSize: 22, color: n.texto2 }}>1.28 M labeled images</div>
        </Tarjeta>
        <Tarjeta at={cC + largoC * 0.5} color={n.verde} style={{ flex: 1 }}>
          <div style={{ fontSize: 24, color: n.texto2 }}>CLIP · zero-shot</div>
          <div style={{ fontSize: 64, fontWeight: 500, color: n.verde }}>{(76.2 * k).toFixed(1)}%</div>
          <div style={{ fontSize: 22, color: n.texto2 }}>0 of those labels</div>
        </Tarjeta>
      </div>
      <Sube at={cP + 6} style={{ marginTop: 26 }}>
        <Chip at={cP + 6} color={n.azul}>
          <Image size={24} strokeWidth={2} /> 400 M image–text pairs from the web
        </Chip>
      </Sube>
      <Nota at={cP + 16} tam={22} style={{ marginTop: 18 }}>
        Radford et al. (2021), «Learning Transferable Visual Models From Natural Language Supervision», ICML
      </Nota>
      <div style={{ marginTop: 50 }}>
        <Cinetico at={cP + 26} texto="Learn from pairs,|*not labels.*" tam={92} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ marginTop: 300 }}>
      <div style={{ ...tipo.rotulo, color: n.azul }}>TECH CAPSULE</div>
      <Cinetico at={8} texto="Multimodal fusion &|*custom embeddings.*" tam={108} style={{ marginTop: 18 }} />
      <Sube at={28}>
        <div style={{ ...tipo.cuerpo, color: n.texto2, marginTop: 24 }}>CLIP · SigLIP · InfoNCE · cross-attention · by {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Todo es tokens ───────────────────────────────────────────────────────────
export const Tokens: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("parches");
  const cA = useCue("audio");
  const largoP = useCueAt("parches", 1) - cP;
  const largoA = useCueAt("audio", 1) - cA;
  const kG = transicion(frame, cP + largoP * 0.35, fps, 1200, EXPO_IN_OUT);
  const lado = 14;
  const c = 20;
  const kW = transicion(frame, cA + 4, fps, 900, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cP} serie={SERIE} titulo="Everything|*becomes tokens.*" />
      <div style={{ display: "flex", gap: 30, alignItems: "center", marginTop: 30 }}>
        <svg width={lado * c} height={lado * c} style={{ opacity: transicion(frame, cP + 8, fps, 400, EXPO_OUT) }}>
          <defs>
            <linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#AECBFA" />
              <stop offset="0.6" stopColor="#E8F0FE" />
              <stop offset="0.6" stopColor="#81C995" />
              <stop offset="1" stopColor="#1E8E3E" />
            </linearGradient>
          </defs>
          <rect width={lado * c} height={lado * c} rx={10} fill="url(#cielo)" />
          {Array.from({ length: lado + 1 }, (_, i) => (
            <g key={i} opacity={kG}>
              <line x1={i * c} y1={0} x2={i * c} y2={lado * c * kG} stroke="#fff" strokeWidth={2} />
              <line x1={0} y1={i * c} x2={lado * c * kG} y2={i * c} stroke="#fff" strokeWidth={2} />
            </g>
          ))}
        </svg>
        <div style={{ flex: 1 }}>
          <FormulaCard
            at={cP + largoP * 0.5}
            tam={46}
            formula={
              <>
                <Frac arriba="224" abajo="16" />
                <Op>×</Op>
                <Frac arriba="224" abajo="16" />
                <Op>=</Op>
                <Var color={n.azul}>196</Var>
              </>
            }
            leyenda={[["16", n.texto, "patch size in pixels (ViT)"]]}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, height: 110, marginTop: 30, opacity: kW }}>
        <AudioLines size={50} strokeWidth={1.6} color={n.amarillo} style={{ marginRight: 16 }} />
        {Array.from({ length: 60 }, (_, i) => (
          <div key={i} style={{ flex: 1, height: `${(20 + 75 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23))) * kW}%`, background: n.amarillo, borderRadius: 3 }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 22 }}>
        <Tarjeta at={cA + largoA * 0.2} color={n.amarillo} style={{ flex: 1 }}>
          <div style={{ fontSize: 22, color: n.texto2 }}>Whisper · 30 s of audio</div>
          <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 4 }}>3,000 mel frames → stride 2</div>
          <div style={{ fontSize: 46, fontWeight: 500, color: n.amarillo }}>1,500 tokens</div>
        </Tarjeta>
        <Tarjeta at={cA + largoA * 0.55} color={n.verde} style={{ flex: 1 }}>
          <div style={{ fontSize: 22, color: n.texto2 }}>EnCodec · 24 kHz</div>
          <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 4 }}>75/s × 8 codebooks × 10 bits</div>
          <div style={{ fontSize: 46, fontWeight: 500, color: n.verde }}>6 kbit/s</div>
        </Tarjeta>
      </div>
      <Nota at={cA + largoA * 0.7} tam={22} style={{ marginTop: 14 }}>
        Dosovitskiy et al. (2021), ViT, ICLR · Radford et al. (2023), Whisper, ICML · Défossez et al. (2023), EnCodec, TMLR
      </Nota>
    </Escena>
  );
};

// ─── Aprendizaje contrastivo ──────────────────────────────────────────────────
export const Contraste: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("matriz");
  const cD = useCue("diagonal");
  const largoM = useCueAt("matriz", 1) - cM;
  const kD = transicion(frame, cD + 4, fps, 700, EXPO_OUT);
  const celda = 150;
  return (
    <Escena>
      <Cabeza at={cM} serie={SERIE} titulo="Contrastive|*learning.*" />
      <div style={{ display: "flex", marginTop: 30, marginLeft: 130 }}>
        {TEXTOS.map((t, j) => (
          <div key={t} style={{ width: celda, textAlign: "center", fontSize: 21, color: n.texto2, opacity: transicion(frame, cM + largoM * 0.3 + j * 3, fps, 400, EXPO_OUT) }}>
            {t}
          </div>
        ))}
      </div>
      {SIM.map((fila, i) => {
        const Icono = ICONOS[i];
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
            <div style={{ width: 130, display: "flex", justifyContent: "center", opacity: transicion(frame, cM + 8 + i * 3, fps, 400, EXPO_OUT) }}>
              <div style={{ width: 90, height: 90, borderRadius: 14, background: n.azulClaro, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icono size={50} strokeWidth={1.6} color={n.azul} />
              </div>
            </div>
            {fila.map((s, j) => {
              const a = transicion(frame, cM + largoM * 0.45 + (i * 4 + j) * 1.5, fps, 300, EXPO_OUT);
              const diag = i === j;
              const fondo = diag ? `rgba(30,142,62,${0.15 + 0.7 * kD})` : `rgba(26,115,232,${s * (1 - 0.6 * kD)})`;
              return (
                <div key={j} style={{ width: celda - 10, marginRight: 10, height: 90, borderRadius: 10, background: fondo, border: diag && kD > 0.5 ? `3px solid ${n.verde}` : `2px solid ${n.borde}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 28, color: diag && kD > 0.5 ? "#fff" : n.texto, opacity: a }}>
                  {s.toFixed(2)}
                </div>
              );
            })}
          </div>
        );
      })}
      <FormulaCard
        at={cM + largoM * 0.7}
        tam={46}
        style={{ marginTop: 26 }}
        formula={
          <>
            <Var>s</Var>
            {sub("ij")}
            <Op>=</Op>cos(<Var color={n.azul}>f</Var>(img{sub("i")}), <Var color={n.verde}>g</Var>(txt{sub("j")}))
          </>
        }
        leyenda={[
          ["f, g", n.azul, "image and text encoders, same space"],
          ["s_ii", n.verde, "diagonal: the true pairs"],
        ]}
      />
      <Nota at={cD + 20} tam={22} style={{ marginTop: 12 }}>
        similarities illustrative · Radford et al. (2021), CLIP, ICML
      </Nota>
    </Escena>
  );
};

// ─── InfoNCE: clasificación y cota de información ─────────────────────────────
export const Infonce: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("clasificar");
  const cB = useCue("cota");
  const largoC = useCueAt("clasificar", 1) - cC;
  const largoB = useCueAt("cota", 1) - cB;
  const p = filaSoftmax(0);
  const kB = transicion(frame, cC + largoC * 0.5, fps, 900, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cC} serie={SERIE} titulo="InfoNCE: which caption|*is the right one?*" />
      <FormulaCard
        at={cC + 14}
        tam={48}
        style={{ marginTop: 24 }}
        formula={
          <>
            <Var recta>L</Var>
            {sub("i")}
            <Op>=</Op>−log
            <Frac arriba={<span>exp(<Var color={n.verde}>s</Var>{sub("ii")} / <Var color={n.azul}>τ</Var>)</span>} abajo={<span>Σ{sub("j")} exp(<Var>s</Var>{sub("ij")} / <Var color={n.azul}>τ</Var>)</span>} />
          </>
        }
        leyenda={[
          ["τ", n.azul, "temperature (here 0.2)"],
          ["softmax", n.texto, "posterior over N captions, uniform prior"],
        ]}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 24, opacity: kB }}>
        <div style={{ width: 70, height: 70, borderRadius: 12, background: n.azulClaro, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Dog size={40} strokeWidth={1.6} color={n.azul} />
        </div>
        <div style={{ fontSize: 26, color: n.texto2 }}>P(caption | image)</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12, opacity: kB }}>
        {TEXTOS.map((t, j) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 230, fontSize: 24, color: j === 0 ? n.verde : n.texto2 }}>{t}</div>
            <div style={{ flex: 1, height: 34, borderRadius: 8, background: n.superficie }}>
              <div style={{ height: "100%", width: `${p[j] * 100 * kB}%`, minWidth: 6, borderRadius: 8, background: j === 0 ? n.verde : n.texto3 }} />
            </div>
            <div style={{ width: 80, fontFamily: codigo, fontSize: 24, color: j === 0 ? n.verde : n.texto2 }}>{p[j].toFixed(2)}</div>
          </div>
        ))}
      </div>
      <FormulaCard
        at={cB + 4}
        tam={48}
        style={{ marginTop: 24 }}
        formula={
          <>
            <Var recta>I</Var>(<Var>X</Var>; <Var>Y</Var>)<Op>≥</Op>log <Var color={n.amarillo}>N</Var>
            <Op>−</Op>
            <Var recta>L</Var>
          </>
        }
        leyenda={[["N", n.amarillo, "batch size: N = 32,768 → at most 10.4 nats"]]}
      />
      <Nota at={cB + largoB * 0.6} tam={22} style={{ marginTop: 12 }}>
        van den Oord, Li & Vinyals (2018), «Representation Learning with Contrastive Predictive Coding», arXiv:1807.03748
      </Nota>
    </Escena>
  );
};

// ─── SigLIP ───────────────────────────────────────────────────────────────────
export const Siglip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("sigmoide");
  const cB = useCue("sesgo");
  const largoS = useCueAt("sigmoide", 1) - cS;
  const largoB = useCueAt("sesgo", 1) - cB;
  const kX = transicion(frame, cB + largoB * 0.6, fps, 600, backOut);
  return (
    <Escena>
      <Cabeza at={cS} serie={SERIE} titulo="SigLIP: one yes/no|*per pair.*" />
      <FormulaCard
        at={cS + 14}
        tam={44}
        style={{ marginTop: 24 }}
        formula={
          <>
            <Var recta>L</Var>
            <Op>=</Op>−Σ{sub("i,j")} log <Var color={n.verde}>σ</Var>(<Var color={n.amarillo}>z</Var>
            {sub("ij")}·(<Var color={n.azul}>t</Var>·<Var>s</Var>
            {sub("ij")}
            <Op>+</Op>
            <Var color={n.rojo}>b</Var>))
          </>
        }
        leyenda={[
          ["z = ±1", n.amarillo, "match or not"],
          ["t, b", n.azul, "learned scale and bias"],
        ]}
        columnas={2}
      />
      <div style={{ display: "flex", gap: 24, alignItems: "center", marginTop: 26 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 64px)", gap: 8 }}>
          {SIM.flatMap((fila, i) =>
            fila.map((_, j) => {
              const a = transicion(frame, cS + largoS * 0.4 + (i * 4 + j) * 1.5, fps, 300, EXPO_OUT);
              const ok = i === j;
              return (
                <div key={`${i}-${j}`} style={{ width: 64, height: 64, borderRadius: 10, background: ok ? n.verdeClaro : n.superficie, border: `2px solid ${ok ? n.verde : n.borde}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: a }}>
                  {ok ? <Check size={34} strokeWidth={2.4} color={n.verde} /> : <X size={30} strokeWidth={2} color={n.texto3} />}
                </div>
              );
            }),
          )}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          <Tarjeta at={cS + largoS * 0.6} color={n.azul}>
            <div style={{ fontSize: 24, color: n.texto2 }}>softmax (CLIP)</div>
            <div style={{ fontSize: 28 }}>needs the whole row</div>
          </Tarjeta>
          <Tarjeta at={cS + largoS * 0.8} color={n.verde}>
            <div style={{ fontSize: 24, color: n.texto2 }}>sigmoid (SigLIP)</div>
            <div style={{ fontSize: 28 }}>each cell on its own</div>
          </Tarjeta>
        </div>
      </div>
      <Tarjeta at={cB + 4} color={n.rojo} style={{ marginTop: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 26, color: n.texto2 }}>N positives vs N² − N negatives</span>
          <span style={{ fontFamily: codigo, fontSize: 40, color: n.rojo }}>
            b₀ = −10, t₀ = 10
          </span>
        </div>
        <div style={{ fontFamily: codigo, fontSize: 20, color: n.texto2, marginTop: 8, opacity: kX }}>start: σ(10·0.82−10) = 0.14 · σ(10·0.15−10) = 0.0002</div>
      </Tarjeta>
      <Nota at={cB + largoB * 0.7} tam={22} style={{ marginTop: 12 }}>
        Zhai, Mustafa, Kolesnikov & Beyer (2023), «Sigmoid Loss for Language Image Pre-Training», ICCV
      </Nota>
    </Escena>
  );
};

// ─── Fusión ───────────────────────────────────────────────────────────────────
const Caja: React.FC<{ txt: string; col: string; fondo: string; w?: number }> = ({ txt, col, fondo, w = 150 }) => (
  <div style={{ width: w, height: 40, borderRadius: 8, border: `2px solid ${col}`, background: fondo, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 20, color: col }}>{txt}</div>
);
export const Fusion: React.FC = () => {
  const cT = useCue("tipos");
  const cF = useCue("flamingo");
  const largoT = useCueAt("tipos", 1) - cT;
  const largoF = useCueAt("flamingo", 1) - cF;
  const fila = (titulo: string, desc: string, col: string, at: number, dibujo: React.ReactNode) => (
    <Tarjeta at={at} color={col}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ width: 300 }}>
          <div style={{ fontSize: 30, fontWeight: 500 }}>{titulo}</div>
          <div style={{ fontSize: 22, color: n.texto2, marginTop: 4 }}>{desc}</div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>{dibujo}</div>
      </div>
    </Tarjeta>
  );
  return (
    <Escena>
      <Cabeza at={cT} serie={SERIE} titulo="Three ways|*to fuse.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
        {fila(
          "Early fusion",
          "image + text tokens in one model",
          n.azul,
          cT + largoT * 0.4,
          <>
            <Caja txt="img + txt" col={n.azul} fondo={n.azulClaro} />
            <span style={{ fontSize: 26, color: n.texto2 }}>→</span>
            <Caja txt="one model" col={n.texto} fondo={n.superficie} />
          </>,
        )}
        {fila(
          "Late fusion",
          "two encoders, compare at the end (CLIP)",
          n.amarillo,
          cT + largoT * 0.6,
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Caja txt="img enc" col={n.amarillo} fondo={n.amarilloClaro} w={130} />
              <Caja txt="txt enc" col={n.amarillo} fondo={n.amarilloClaro} w={130} />
            </div>
            <span style={{ fontSize: 26, color: n.texto2 }}>→</span>
            <Caja txt="cos" col={n.texto} fondo={n.superficie} w={90} />
          </>,
        )}
        {fila(
          "Cross-attention",
          "text queries attend to image features",
          n.verde,
          cT + largoT * 0.8,
          <>
            <Caja txt="txt Q" col={n.verde} fondo={n.verdeClaro} w={110} />
            <span style={{ fontSize: 26, color: n.texto2 }}>↔</span>
            <Caja txt="img K, V" col={n.verde} fondo={n.verdeClaro} w={130} />
          </>,
        )}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 18, flexShrink: 0 }}>
        <Tarjeta at={cF + largoF * 0.1} color={n.verde} style={{ flex: 1 }}>
          <div style={{ fontSize: 30, fontWeight: 500 }}>Flamingo</div>
          <div style={{ fontSize: 22, color: n.texto2, marginTop: 4 }}>gated cross-attention layers inside a frozen LM</div>
        </Tarjeta>
        <Tarjeta at={cF + largoF * 0.55} color={n.azul} style={{ flex: 1 }}>
          <div style={{ fontSize: 30, fontWeight: 500 }}>LLaVA</div>
          <div style={{ fontSize: 22, color: n.texto2, marginTop: 4 }}>a projection W·v maps image features to LM tokens</div>
        </Tarjeta>
      </div>
      <Nota at={cF + largoF * 0.75} tam={22} style={{ marginTop: 14 }}>
        Alayrac et al. (2022), «Flamingo», NeurIPS · Liu et al. (2023), «Visual Instruction Tuning», NeurIPS
      </Nota>
    </Escena>
  );
};

// ─── Embeddings propios ───────────────────────────────────────────────────────
export const Propios: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cN = useCue("negativos");
  const cM = useCue("matrioska");
  const largoN = useCueAt("negativos", 1) - cN;
  const largoM = useCueAt("matrioska", 1) - cM;
  const ejemplos: [string, string, string, number][] = [
    ["query", "refund a late-payment fee", n.azul, 0.2],
    ["positive", "how to request a late-fee reversal", n.verde, 0.35],
    ["hard negative", "late-payment fee policy and amounts", n.rojo, 0.55],
  ];
  const dims: [number, string][] = [
    [128, n.verde],
    [256, n.amarillo],
    [512, n.azul],
    [1408, n.texto3],
  ];
  const kM = transicion(frame, cM + largoM * 0.15, fps, 1200, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cN} serie={SERIE} titulo="Your own|*embeddings.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 26 }}>
        {ejemplos.map(([r, t, col, f]) => (
          <Tarjeta key={r} at={cN + largoN * f} color={col}>
            <div style={{ fontFamily: codigo, fontSize: 20, color: col }}>{r}</div>
            <div style={{ fontSize: 28, marginTop: 2 }}>“{t}”</div>
          </Tarjeta>
        ))}
      </div>
      <Nota at={cN + largoN * 0.7} tam={22} style={{ marginTop: 10 }}>
        banking example, illustrative · same InfoNCE loss with in-batch + hard negatives
      </Nota>
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 30, opacity: kM }}>Matryoshka: nested prefixes of one 1,408-dim vector</div>
      <div style={{ position: "relative", height: 70, marginTop: 12 }}>
        {[...dims].reverse().map(([d, col]) => (
          <div key={d} style={{ position: "absolute", left: 0, top: 0, height: 70, width: `${(d / 1408) * 100 * kM}%`, borderRadius: 10, background: col, opacity: kM < 0.03 ? 0 : d === 1408 ? 0.35 : 0.9, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8, boxSizing: "border-box", fontFamily: codigo, fontSize: 20, color: "#fff" }}>
            {kM > 0.9 ? d : ""}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 22 }}>
        <Tarjeta at={cM + largoM * 0.55} color={n.texto3} style={{ flex: 1 }}>
          <div style={{ fontSize: 22, color: n.texto2 }}>1 M vectors · 1,408 dims · float32</div>
          <div style={{ fontSize: 48, fontWeight: 500 }}>5.6 GB</div>
        </Tarjeta>
        <Tarjeta at={cM + largoM * 0.75} color={n.verde} style={{ flex: 1 }}>
          <div style={{ fontSize: 22, color: n.texto2 }}>first 128 dims</div>
          <div style={{ fontSize: 48, fontWeight: 500, color: n.verde }}>0.5 GB · 11×</div>
        </Tarjeta>
      </div>
      <Nota at={cM + largoM * 0.8} tam={22} style={{ marginTop: 12 }}>
        Kusupati et al. (2022), «Matryoshka Representation Learning», NeurIPS
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
              <div style={{ fontSize: 34, fontWeight: 500 }}>Vertex AI multimodal embeddings</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>image and text in one space · 1,408 dims (or 512 · 256 · 128)</div>
            </div>
          </div>
        </Tarjeta>
        <Tarjeta at={at + largo * 0.65} color={n.verde}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Search size={50} strokeWidth={1.5} color={n.verde} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>Vertex AI Vector Search</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>approximate nearest neighbors at scale (ScaNN)</div>
            </div>
          </div>
        </Tarjeta>
        <Tarjeta at={at + largo * 0.8} color={n.amarillo}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Database size={50} strokeWidth={1.5} color={n.amarillo} />
            <div style={{ fontSize: 26, color: n.texto2 }}>search images by text, or text by image</div>
          </div>
        </Tarjeta>
      </div>
      <Nota at={at + largo * 0.85} tam={22} style={{ marginTop: 22 }}>
        Google Cloud docs, «Get multimodal embeddings» · Guo et al. (2020), «ScaNN», ICML
      </Nota>
    </Escena>
  );
};

// ─── Las bases ────────────────────────────────────────────────────────────────
export const Bases: React.FC = () => {
  const at = useCue("bases");
  const largo = useCueAt("bases", 1) - at;
  const ideas: [string, string, string, number][] = [
    ["Cosine similarity", "angle between normalized vectors", n.azul, 0.1],
    ["Softmax vs sigmoid", "compete across the batch, or decide each pair", n.amarillo, 0.3],
    ["Temperature τ", "how sharp the probabilities are", n.verde, 0.55],
    ["Mutual information", "I(X;Y) ≥ log N − L", n.azul, 0.75],
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
        <Cinetico at={at} texto="One space for|*every modality.*" tam={96} />
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
