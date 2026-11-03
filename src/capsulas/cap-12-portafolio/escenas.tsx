import React from "react";
import { BookOpen, Check, Cloud, FileText, FlaskConical, GitBranch, Layers, Microscope, Play, Scale, Sparkles, Target } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cabeza, Chip, Cinetico, Codigo, Escena, FormulaCard, Frac, Nota, Op, Pildora, Sube, sx, Tarjeta, Var } from "../../estilos/nube/kit";
import { codigo, n, tipo } from "../../estilos/nube/tokens";

const SERIE = "Tech capsule · Open source & portfolio";

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const cL = useCue("linea");
  const cR = useCue("repo");
  const largoR = useCueAt("repo", 1) - cR;
  const items: [string, React.ReactNode, number][] = [
    ["model weights + adapter", <Layers key="l" size={28} strokeWidth={1.8} color={n.verde} />, 0.1],
    ["evaluation with error bars", <FlaskConical key="f" size={28} strokeWidth={1.8} color={n.verde} />, 0.25],
    ["model card", <FileText key="d" size={28} strokeWidth={1.8} color={n.verde} />, 0.4],
    ["code to reproduce it", <GitBranch key="g" size={28} strokeWidth={1.8} color={n.verde} />, 0.55],
  ];
  return (
    <Escena>
      <Tarjeta at={cL + 8} color={n.texto3}>
        <div style={{ fontSize: 24, color: n.texto2 }}>resume</div>
        <div style={{ fontSize: 40, marginTop: 6 }}>“I can fine-tune LLMs.”</div>
      </Tarjeta>
      <Tarjeta at={cR + 4} color={n.verde} style={{ marginTop: 18 }}>
        <div style={{ fontSize: 24, color: n.texto2 }}>public repository</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
          {items.map(([t, ic, f]) => (
            <Sube key={t} at={cR + largoR * f}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30 }}>
                {ic} {t}
              </div>
            </Sube>
          ))}
        </div>
      </Tarjeta>
      <div style={{ marginTop: 50 }}>
        <Cinetico at={cR + largoR * 0.65} texto="Show the work,|*not the claim.*" tam={96} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ marginTop: 300 }}>
      <div style={{ ...tipo.rotulo, color: n.azul }}>TECH CAPSULE</div>
      <Cinetico at={8} texto="Open source &|*a verifiable portfolio.*" tam={108} style={{ marginTop: 18 }} />
      <Sube at={28}>
        <div style={{ ...tipo.cuerpo, color: n.texto2, marginTop: 24 }}>Hub · model cards · reproductions · teardowns · by {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Evidencia bayesiana ──────────────────────────────────────────────────────
export const Evidencia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cO = useCue("odds");
  const cD = useCue("diez");
  const largoD = useCueAt("diez", 1) - cD;
  const k1 = transicion(frame, cD + largoD * 0.15, fps, 700, EXPO_OUT);
  const k2 = transicion(frame, cD + largoD * 0.65, fps, 1000, EXPO_IN_OUT);
  const kP = transicion(frame, cD + largoD * 0.8, fps, 600, backOut);
  const barra = (lab: string, p: number, col: string, k: number) => (
    <div style={{ marginTop: 16, opacity: Math.min(1, k * 2) }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
        <span>{lab}</span>
        <span style={{ fontWeight: 500, color: col }}>{Math.round(p * 100 * k)}%</span>
      </div>
      <div style={{ height: 46, borderRadius: 10, background: n.superficie, border: `2px solid ${n.borde}`, marginTop: 8 }}>
        <div style={{ height: "100%", width: `${p * 100 * k}%`, borderRadius: 8, background: col }} />
      </div>
    </div>
  );
  return (
    <Escena>
      <Cabeza at={cO} serie={SERIE} titulo="A project is|*evidence.*" />
      <FormulaCard
        at={cO + 14}
        tam={48}
        style={{ marginTop: 26 }}
        formula={
          <>
            <Var color={n.verde}>odds</Var>
            <sub style={{ fontSize: "0.5em" }}>after</sub>
            <Op>=</Op>
            <Var color={n.texto3}>odds</Var>
            <sub style={{ fontSize: "0.5em" }}>before</sub>
            <Op>×</Op>
            <Frac arriba={<span><Var recta>P</Var>(project | can)</span>} abajo={<span><Var recta>P</Var>(project | can't)</span>} />
          </>
        }
        leyenda={[["likelihood ratio", n.texto, "how much more likely this evidence is if the skill is real"]]}
      />
      {barra("recruiter's prior", 0.1, n.texto3, k1)}
      {barra("after your project (likelihood ratio 9)", 0.5, n.verde, k2)}
      <div style={{ fontFamily: codigo, fontSize: 30, textAlign: "center", marginTop: 26, opacity: Math.max(0, kP) }}>
        <span style={{ color: n.texto2 }}>1 : 9</span>
        <span style={{ color: n.texto3 }}> × 9 = </span>
        <span style={{ color: n.verde }}>1 : 1 → 50%</span>
      </div>
      <Nota at={cD + largoD * 0.85} tam={22} style={{ marginTop: 14 }}>
        Bayes' rule in odds form · numbers illustrative
      </Nota>
    </Escena>
  );
};

// ─── Publicar un ajuste ───────────────────────────────────────────────────────
export const Finetune: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cA = useCue("adaptador");
  const cL = useCue("licencia");
  const largoA = useCueAt("adaptador", 1) - cA;
  const largoL = useCueAt("licencia", 1) - cL;
  const k = transicion(frame, cA + largoA * 0.45, fps, 900, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cA} serie={SERIE} titulo="Publish|*the fine-tune.*" />
      <FormulaCard
        at={cA + 14}
        tam={40}
        style={{ marginTop: 24 }}
        formula={
          <>
            32 layers <Op>×</Op> 2 (q, v) <Op>×</Op> 16 <Op>×</Op> (4096 + 4096)<Op>=</Op>
            <Var color={n.verde}>8.4 M</Var>
          </>
        }
        leyenda={[["r = 16", n.verde, "LoRA rank on query and value projections · 7B model"]]}
      />
      <div style={{ marginTop: 22, opacity: Math.min(1, k * 2) }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
          <span>base model · FP16</span>
          <span style={{ fontWeight: 500 }}>14 GB</span>
        </div>
        <div style={{ height: 46, borderRadius: 10, background: n.texto3, marginTop: 8 }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, marginTop: 16 }}>
          <span>LoRA adapter · FP16</span>
          <span style={{ fontWeight: 500, color: n.verde }}>≈ 17 MB · 0.12%</span>
        </div>
        <div style={{ height: 46, borderRadius: 10, background: n.superficie, marginTop: 8 }}>
          <div style={{ height: "100%", width: `${0.12 * k}%`, minWidth: 10, borderRadius: 8, background: n.verde }} />
        </div>
      </div>
      <div style={{ marginTop: 26 }}>
        <Codigo
          at={cL + 4}
          archivo="publish.py"
          tam={24}
          lineas={[
            [["model", sx.fn], [".push_to_hub("], ['"you/bank-faq-lora"', sx.texto], [")"]],
            [["card", sx.fn], [".data.license = "], ['"apache-2.0"', sx.texto]],
            [["card", sx.fn], [".data.base_model = "], ['"<base model id>"', sx.texto]],
          ]}
          resaltar={frame >= cL + largoL * 0.5 ? [1, 2] : [0]}
        />
      </div>
      <Nota at={cL + largoL * 0.6} tam={22} style={{ marginTop: 12 }}>
        Hu et al. (2022), LoRA, ICLR · Hugging Face Hub docs: model repositories and model cards · names illustrative
      </Nota>
    </Escena>
  );
};

// ─── Ficha técnica ────────────────────────────────────────────────────────────
export const Ficha: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("secciones");
  const cG = useCue("grupos");
  const largoS = useCueAt("secciones", 1) - cS;
  const largoG = useCueAt("grupos", 1) - cG;
  const secciones: [string, string, React.ReactNode, number][] = [
    ["Intended use", "what it is for, and what not", <Target key="t" size={30} strokeWidth={1.8} color={n.azul} />, 0.2],
    ["Training data", "sources, dates, license", <BookOpen key="b" size={30} strokeWidth={1.8} color={n.azul} />, 0.4],
    ["Evaluation", "metrics, data, error bars", <FlaskConical key="f" size={30} strokeWidth={1.8} color={n.azul} />, 0.6],
    ["Limitations", "where it fails", <Scale key="s" size={30} strokeWidth={1.8} color={n.azul} />, 0.8],
  ];
  const grupos: [string, number, string][] = [
    ["overall", 0.91, n.azul],
    ["Spanish queries", 0.93, n.verde],
    ["English queries", 0.92, n.verde],
    ["queries with typos", 0.74, n.rojo],
  ];
  return (
    <Escena>
      <Cabeza at={cS} serie={SERIE} titulo="The|*model card.*" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 26 }}>
        {secciones.map(([t, d, ic, f]) => (
          <Tarjeta key={t} at={cS + largoS * f} color={n.azul}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {ic}
              <div style={{ fontSize: 28, fontWeight: 500 }}>{t}</div>
            </div>
            <div style={{ fontSize: 22, color: n.texto2, marginTop: 4 }}>{d}</div>
          </Tarjeta>
        ))}
      </div>
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 28, opacity: transicion(frame, cG, fps, 400, EXPO_OUT) }}>accuracy by group (illustrative)</div>
      {grupos.map(([g, v, col], i) => {
        const k = transicion(frame, cG + largoG * (0.15 + i * 0.12), fps, 600, EXPO_OUT);
        return (
          <div key={g} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10, opacity: Math.min(1, k * 2) }}>
            <div style={{ width: 280, fontSize: 26 }}>{g}</div>
            <div style={{ flex: 1, height: 36, borderRadius: 8, background: n.superficie }}>
              <div style={{ height: "100%", width: `${v * 100 * k}%`, borderRadius: 8, background: col }} />
            </div>
            <div style={{ width: 80, fontFamily: codigo, fontSize: 26, color: col, textAlign: "right" }}>{v.toFixed(2)}</div>
          </div>
        );
      })}
      <Nota at={cG + largoG * 0.75} tam={22} style={{ marginTop: 14 }}>
        Mitchell et al. (2019), «Model Cards for Model Reporting», FAT* · Gebru et al. (2021), «Datasheets for Datasets», CACM
      </Nota>
    </Escena>
  );
};

// ─── Reproducir un paper ──────────────────────────────────────────────────────
export const Reproducir: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("paper");
  const cH = useCue("honesto");
  const largoP = useCueAt("paper", 1) - cP;
  const largoH = useCueAt("honesto", 1) - cH;
  const kR = transicion(frame, cP + largoP * 0.6, fps, 800, EXPO_OUT);
  const x = (v: number) => ((v - 70) / 15) * 100;
  return (
    <Escena>
      <Cabeza at={cP} serie={SERIE} titulo="Reproduce|*a paper.*" />
      <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
        {["implement", "run 5 seeds", "compare"].map((s, i) => (
          <Chip key={s} at={cP + largoP * (0.15 + i * 0.15)} color={[n.azul, n.amarillo, n.verde][i]}>
            <Microscope size={22} strokeWidth={2} /> {s}
          </Chip>
        ))}
      </div>
      <div style={{ fontFamily: codigo, fontSize: 24, color: n.texto2, marginTop: 30, opacity: kR }}>accuracy, mean ± 95% interval (illustrative)</div>
      {[
        ["reported in the paper", 81.2, 0, n.texto3],
        ["your reproduction", 79.4, 1.1, n.azul],
      ].map(([lab, v, s, col], i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14, opacity: kR }}>
          <div style={{ width: 300, fontSize: 26 }}>{lab as string}</div>
          <div style={{ flex: 1, position: "relative", height: 40 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 19, height: 2, background: n.borde }} />
            {(s as number) > 0 ? <div style={{ position: "absolute", left: `${x((v as number) - (s as number))}%`, width: `${x((v as number) + (s as number)) - x((v as number) - (s as number))}%`, top: 12, height: 16, borderRadius: 8, background: col as string, opacity: 0.35 }} /> : null}
            <div style={{ position: "absolute", left: `calc(${x(v as number)}% - 10px)`, top: 10, width: 20, height: 20, borderRadius: 10, background: col as string }} />
          </div>
          <div style={{ width: 150, fontFamily: codigo, fontSize: 24, color: col as string, textAlign: "right" }}>
            {(v as number).toFixed(1)}
            {(s as number) > 0 ? ` ± ${(s as number).toFixed(1)}` : ""}
          </div>
        </div>
      ))}
      <Tarjeta at={cH + 4} color={n.amarillo} style={{ marginTop: 28 }}>
        <div style={{ fontSize: 30, fontWeight: 500 }}>A gap is a result too</div>
        <div style={{ fontSize: 24, color: n.texto2, marginTop: 6 }}>document it: which detail was missing? learning-rate schedule, data filtering, evaluation split…</div>
      </Tarjeta>
      <Nota at={cH + largoH * 0.6} tam={22} style={{ marginTop: 14 }}>
        Pineau et al. (2021), «Improving Reproducibility in Machine Learning Research», JMLR · ML Reproducibility Challenge
      </Nota>
    </Escena>
  );
};

// ─── Desmontar un benchmark ───────────────────────────────────────────────────
export const Desmontar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cE = useCue("errores");
  const cR = useCue("ranking");
  const largoE = useCueAt("errores", 1) - cE;
  const largoR = useCueAt("ranking", 1) - cR;
  const malas = new Set([7, 23, 41, 58, 76, 88]);
  const kS = transicion(frame, cR + largoR * 0.4, fps, 800, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cE} serie={SERIE} titulo="Tear down|*a benchmark.*" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(20, 1fr)", gap: 5, marginTop: 28 }}>
        {Array.from({ length: 100 }, (_, i) => {
          const a = transicion(frame, cE + 6 + i * 0.3, fps, 200, EXPO_OUT);
          const mala = malas.has(i) && frame >= cE + largoE * 0.6;
          return <div key={i} style={{ height: 34, borderRadius: 5, background: mala ? n.rojo : n.verdeClaro, border: `1.5px solid ${mala ? n.rojo : n.verde}`, opacity: a }} />;
        })}
      </div>
      <div style={{ fontFamily: codigo, fontSize: 22, color: n.texto2, marginTop: 8 }}>ImageNet validation: ≈ 6 of every 100 labels are wrong (2,916 found)</div>
      <div style={{ display: "flex", gap: 16, marginTop: 22 }}>
        <Tarjeta at={cE + largoE * 0.35} color={n.rojo} style={{ flex: 1 }}>
          <div style={{ fontSize: 22, color: n.texto2 }}>10 popular test sets</div>
          <div style={{ fontSize: 50, fontWeight: 500, color: n.rojo }}>≥ 3.3%</div>
          <div style={{ fontSize: 22, color: n.texto2 }}>wrong labels on average</div>
        </Tarjeta>
        <Tarjeta at={cE + largoE * 0.6} color={n.rojo} style={{ flex: 1 }}>
          <div style={{ fontSize: 22, color: n.texto2 }}>ImageNet validation</div>
          <div style={{ fontSize: 50, fontWeight: 500, color: n.rojo }}>≈ 6%</div>
          <div style={{ fontSize: 22, color: n.texto2 }}>wrong labels</div>
        </Tarjeta>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 28, fontSize: 32 }}>
        <div style={{ padding: "12px 22px", borderRadius: 12, border: `2px solid ${n.azul}`, transform: `translateY(${kS * 70}px)`, background: n.fondo }}>ResNet-50</div>
        <div style={{ padding: "12px 22px", borderRadius: 12, border: `2px solid ${n.verde}`, transform: `translateY(${-kS * 0}px)`, background: n.fondo }}>ResNet-18</div>
      </div>
      <div style={{ textAlign: "center", fontSize: 22, color: n.texto2, marginTop: 84, opacity: kS }}>with 6% more mislabeled test examples, the ranking flips</div>
      <Nota at={cR + largoR * 0.7} tam={22} style={{ marginTop: 10 }}>
        Northcutt, Athalye & Mueller (2021), «Pervasive Label Errors in Test Sets Destabilize Machine Learning Benchmarks», NeurIPS
      </Nota>
    </Escena>
  );
};

// ─── Estructura de cada proyecto ──────────────────────────────────────────────
export const Estructura: React.FC = () => {
  const at = useCue("pasos");
  const largo = useCueAt("pasos", 1) - at;
  const pasos: [string, React.ReactNode][] = [
    ["Problem", <Target key="1" size={30} strokeWidth={1.8} color={n.azul} />],
    ["Baseline", <Scale key="2" size={30} strokeWidth={1.8} color={n.azul} />],
    ["Your method", <Sparkles key="3" size={30} strokeWidth={1.8} color={n.azul} />],
    ["Eval + error bars", <FlaskConical key="4" size={30} strokeWidth={1.8} color={n.amarillo} />],
    ["Model card", <FileText key="5" size={30} strokeWidth={1.8} color={n.amarillo} />],
    ["Demo", <Play key="6" size={30} strokeWidth={1.8} color={n.verde} />],
    ["Short write-up", <BookOpen key="7" size={30} strokeWidth={1.8} color={n.verde} />],
  ];
  return (
    <Escena>
      <Cabeza at={at} serie={SERIE} titulo="One structure,|*every project.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 30 }}>
        {pasos.map(([t, ic], i) => (
          <Tarjeta key={t} at={at + largo * (0.08 + i * 0.11)} color={i < 3 ? n.azul : i < 5 ? n.amarillo : n.verde}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 40, fontFamily: codigo, fontSize: 26, color: n.texto2 }}>{i + 1}</div>
              {ic}
              <div style={{ fontSize: 32, fontWeight: 500 }}>{t}</div>
            </div>
          </Tarjeta>
        ))}
      </div>
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
              <div style={{ fontSize: 34, fontWeight: 500 }}>Model Garden</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>“Deploy from Hugging Face” → a Vertex AI endpoint in one click</div>
            </div>
          </div>
        </Tarjeta>
        <Tarjeta at={at + largo * 0.6} color={n.verde}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Cloud size={50} strokeWidth={1.5} color={n.verde} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>Cloud Run</div>
              <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>hosts your demo · scales to zero when idle</div>
            </div>
          </div>
        </Tarjeta>
      </div>
      <Nota at={at + largo * 0.8} tam={22} style={{ marginTop: 22 }}>
        Hugging Face blog, «Making thousands of open LLMs bloom in the Vertex AI Model Garden» · Google Cloud Run docs
      </Nota>
    </Escena>
  );
};

// ─── Las bases ────────────────────────────────────────────────────────────────
export const Bases: React.FC = () => {
  const at = useCue("bases");
  const largo = useCueAt("bases", 1) - at;
  const ideas: [string, string, string, number][] = [
    ["Odds & likelihood ratios", "posterior odds = prior odds × LR", n.azul, 0.08],
    ["Adapter size", "layers × matrices × r(d + k)", n.amarillo, 0.3],
    ["Reproduce with error bars", "several seeds, compare intervals", n.verde, 0.5],
    ["Label noise", "a few % wrong labels can flip a ranking", n.azul, 0.72],
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
        <Cinetico at={at} texto="Build in public,|*with evidence.*" tam={96} />
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
