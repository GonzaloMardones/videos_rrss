import React from "react";
import { BrainCircuit, Check, Dices, HardHat, Shuffle } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Frac, Op, serif, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Sombrero } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";
import { FAENAS, MEDIA } from "./datos";

const SERIE = "Cuasi-experimentos · 04";

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

const azar = (i: number) => {
  const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
};

// Dos barras: año 1 y año 2 de las faenas con peor año.
const DosBarras: React.FC<{ at: number; k2: number }> = ({ at, k2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k1 = transicion(frame, at, fps, 700, EXPO_OUT);
  const barra = (lab: string, val: number, col: string, k: number) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: 260 }}>
      <div style={{ fontFamily: serif, fontSize: 64, color: col, opacity: k }}>{val.toFixed(1).replace(".", ",")}</div>
      <div style={{ width: 160, height: 300, display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: 160, height: (val / 20) * 300 * k, background: col, borderRadius: "14px 14px 0 0" }} />
      </div>
      <div style={{ fontSize: 28, color: v.niebla }}>{lab}</div>
    </div>
  );
  return (
    <div style={{ display: "flex", gap: 60, alignItems: "flex-end" }}>
      {barra("peor año", 19.4, ROJO, k1)}
      {barra("año siguiente", 15.6, c.c, k2)}
    </div>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cF = useCue("faena");
  const cS = useCue("solas");
  const largo = useCueAt("faena", 1) - cF;
  const k2 = transicion(frame, cF + largo * 0.55, fps, 900, EXPO_IN_OUT);
  const kS = transicion(frame, cS + 4, fps, 500, EXPO_OUT);
  const res = transicion(frame, cF + largo * 0.7, fps, 500, backOut);
  return (
    <Escena>
      <Escenario alto={640}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, opacity: transicion(frame, cF, fps, 400, EXPO_OUT) }}>
          <HardHat size={44} strokeWidth={1.5} color={v.azafran} /> accidentes por faena
        </div>
        <div style={{ position: "absolute", left: 60, top: 80 }}>
          <DosBarras at={cF + 6} k2={k2} />
        </div>
        <div style={{ position: "absolute", left: 660, top: 200, fontFamily: serif, fontSize: 90, color: c.c, display: "inline-block", transform: `scale(${res})` }}>−20 %</div>
        <div style={{ position: "absolute", left: 640, top: 320, width: 270, fontSize: 28, color: kS > 0.5 ? ROJO : v.niebla }}>{kS > 0.5 ? "sin ningún programa (simulación)" : "¿el programa de seguridad?"}</div>
      </Escenario>
      <div style={{ marginTop: 20 }}>
        <Cinetico at={cS + 20} texto="Bajaron *solas.*" style={{ fontSize: 100 }} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, display: "flex", justifyContent: "center" }}>
      <Constelacion at={-60} ancho={700} forma="red" cantidad={520} />
    </div>
    <div style={{ marginTop: 430 }}>
      <Rotulo at={2}>{SERIE}</Rotulo>
      <Cinetico at={6} texto="Regresión|*a la media.*" style={{ marginTop: 18, fontSize: 130 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>seguridad minera y suerte · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── La idea: estable + suerte; Galton ────────────────────────────────────────
export const Idea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("suerte");
  const cG = useCue("galton");
  const largo = useCueAt("suerte", 1) - cS;
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  const kG = transicion(frame, cG, fps, 900, EXPO_IN_OUT);
  const pares = Array.from({ length: 120 }, (_, i) => {
    const u1 = Math.max(1e-6, azar(i * 2 + 1));
    const u2 = azar(i * 2 + 2);
    const m = Math.sqrt(-2 * Math.log(u1));
    const z1 = m * Math.cos(2 * Math.PI * u2);
    const z2 = m * Math.sin(2 * Math.PI * u2);
    return [z1, 0.5 * z1 + Math.sqrt(0.75) * z2];
  });
  return (
    <Escena>
      <Cabeza at={cS} titulo="Estable|*+ suerte.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, opacity: t(cS + 6) }}>
          <span>resultado</span>
          <span style={{ color: v.niebla }}>=</span>
          <span style={{ color: c.c }}>parte estable</span>
          <span style={{ color: v.niebla }}>+</span>
          <span style={{ color: v.azafran, display: "flex", alignItems: "center", gap: 10 }}>
            <Dices size={40} strokeWidth={1.5} color={v.azafran} /> suerte
          </span>
        </div>
        <Nota at={cS + largo * 0.5} color={v.azafran} tam={28} style={{ marginTop: 20 }}>
          un año extremo suele traer mucha suerte, y la suerte no se repite
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 170, opacity: kG }}>
          <Ejes ancho={912} alto={460} x={[-3, 3]} y={[-3, 3]} at={cG} rotuloX="estatura de los padres →" rotuloY="estatura de los hijos">
            {({ px, py }) => (
              <g>
                {pares.map(([a, b], i) => (
                  <circle key={i} cx={px(a)} cy={py(b)} r={6} fill={v.niebla} opacity={0.6} />
                ))}
                <line x1={px(-3)} y1={py(-3)} x2={px(3)} y2={py(3)} stroke={v.ceniza} strokeWidth={2} strokeDasharray="8 8" />
                <line x1={px(-3)} y1={py(-1.5)} x2={px(3)} y2={py(1.5)} stroke={v.azafran} strokeWidth={5} />
                <text x={px(1.6)} y={py(2.4)} fontFamily={mono} fontSize={22} fill={v.ceniza}>
                  igual a los padres
                </text>
                <text x={px(1.2)} y={py(0.3)} fontFamily={mono} fontSize={22} fill={v.azafran}>
                  pendiente ≈ 0,5
                </text>
              </g>
            )}
          </Ejes>
        </div>
        <Nota at={cG + 20} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 660 }}>
          Galton (1886), «Regression towards mediocrity in hereditary stature» · datos ilustrativos
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── La fórmula ───────────────────────────────────────────────────────────────
export const FormulaEsc: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cF = useCue("formula");
  const cR = useCue("rho");
  const largoF = useCueAt("formula", 1) - cF;
  const largoR = useCueAt("rho", 1) - cR;
  const activas = frame >= cR ? ["r"] : frame >= cF + largoF * 0.75 ? ["r"] : frame >= cF + largoF * 0.45 ? ["d"] : [];
  const X1 = 19.4;
  const casos: [number, string, number][] = [
    [1, "ρ = 1: todo estable", cR + largoR * 0.05],
    [0.5, "ρ = 0,5", cR + largoR * 0.3],
    [0, "ρ = 0: todo suerte", cR + largoR * 0.55],
  ];
  return (
    <Escena>
      <Cabeza at={cF} titulo="Cuánto|*vuelves.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <Foco activas={activas}>
          <Formula tam={62}>
            <Entra at={cF + 6}>
              E[X<sub style={{ fontSize: "0.5em" }}>2</sub> | X<sub style={{ fontSize: "0.5em" }}>1</sub>]<Op>=</Op>
              <V color={c.c}>μ</V>
              <Op>+</Op>
              <V id="r" color={v.azafran}>
                ρ
              </V>
              <span style={{ margin: "0 0.1em" }}>·</span>
              <V id="d" color={ROJO} italica={false}>
                (X<sub style={{ fontSize: "0.5em" }}>1</sub> − μ)
              </V>
            </Entra>
          </Formula>
        </Foco>
        <div style={{ position: "absolute", left: 0, top: 120, display: "flex", flexDirection: "column", gap: 8 }}>
          <Nota at={cF + largoF * 0.45} color={ROJO} tam={26}>
            qué tan lejos de la media quedó el primer año
          </Nota>
          <Nota at={cF + largoF * 0.75} color={v.azafran} tam={26}>
            ρ: correlación entre un año y el siguiente
          </Nota>
        </div>
        <svg width={912} height={380} style={{ position: "absolute", left: 0, top: 260, overflow: "visible" }}>
          {(() => {
            const px = (x: number) => 40 + ((x - 8) / 13) * 820;
            return (
              <g>
                <line x1={px(8)} y1={300} x2={px(21)} y2={300} stroke={v.ceniza} strokeWidth={2} />
                <circle cx={px(MEDIA)} cy={300} r={10} fill={c.c} />
                <text x={px(MEDIA)} y={345} textAnchor="middle" fontFamily={serif} fontSize={30} fill={c.c}>
                  μ = 10
                </text>
                <circle cx={px(X1)} cy={300} r={10} fill={ROJO} />
                <text x={px(X1)} y={345} textAnchor="middle" fontFamily={serif} fontSize={30} fill={ROJO}>
                  X₁ = 19,4
                </text>
                {casos.map(([rho, txt, a], i) => {
                  const k = transicion(frame, a, fps, 700, EXPO_IN_OUT);
                  const x2 = MEDIA + rho * (X1 - MEDIA);
                  const y = 60 + i * 80;
                  return (
                    <g key={txt} opacity={k}>
                      <line x1={px(X1)} y1={y} x2={px(X1) + (px(x2) - px(X1)) * k} y2={y} stroke={v.azafran} strokeWidth={4} />
                      <circle cx={px(X1) + (px(x2) - px(X1)) * k} cy={y} r={9} fill={v.azafran} />
                      <text x={px(X1)} y={y - 16} textAnchor="end" fontFamily={mono} fontSize={22} fill={v.niebla}>
                        {txt}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })()}
        </svg>
      </Escenario>
    </Escena>
  );
};

// ─── Simulación: 2.000 faenas ─────────────────────────────────────────────────
export const Simulacion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("sim");
  const cB = useCue("baja");
  const largo = useCueAt("baja", 1) - cB;
  const kP = transicion(frame, cB + 4, fps, 600, EXPO_OUT);
  const kL = transicion(frame, cB + largo * 0.45, fps, 800, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cS} titulo="2.000 faenas,|*cero programas.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <Ejes ancho={912} alto={540} x={[0, 37]} y={[0, 34]} at={cS} rotuloX="accidentes año 1 →" rotuloY="accidentes año 2">
          {({ px, py }) => (
            <g>
              <line x1={px(0)} y1={py(0)} x2={px(34)} y2={py(34)} stroke={v.ceniza} strokeWidth={2} strokeDasharray="8 8" />
              {FAENAS.map(([a, b, p], i) => (
                <circle key={i} cx={px(a)} cy={py(b)} r={p ? 7 : 5} fill={p && kP > 0 ? ROJO : v.niebla} opacity={transicion(frame, cS + 6 + i * 0.08, fps, 300, EXPO_OUT) * (p ? 0.95 : 0.55 - 0.3 * kP)} />
              ))}
              <g opacity={kL}>
                <line x1={px(19.4)} y1={py(0)} x2={px(19.4)} y2={py(33)} stroke={ROJO} strokeWidth={3} />
                <line x1={px(0)} y1={py(15.6)} x2={px(37)} y2={py(15.6)} stroke={c.c} strokeWidth={3} />
                <text x={px(19.4) + 10} y={py(31)} fontFamily={mono} fontSize={24} fill={ROJO}>
                  peor 10 %: 19,4
                </text>
                <text x={px(25)} y={py(15.6) - 12} fontFamily={mono} fontSize={24} fill={c.c}>
                  año 2: 15,6
                </text>
              </g>
            </g>
          )}
        </Ejes>
        <Nota at={cB + largo * 0.8} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 580 }}>
          −20 % sin ninguna intervención · la línea punteada es «igual que el año 1»
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Bayes: encoger hacia la media ────────────────────────────────────────────
export const Bayes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cE = useCue("encoge");
  const cP = useCue("peso");
  const cH = useCue("hauer");
  const largoP = useCueAt("peso", 1) - cP;
  const k = transicion(frame, cP + largoP * 0.55, fps, 900, EXPO_IN_OUT);
  const px = (x: number) => 40 + ((x - 8) / 13) * 820;
  const est = 19.4 + (15.2 - 19.4) * k;
  return (
    <Escena>
      <Cabeza at={cE} titulo="Encoger|*hacia la media.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <Formula tam={58}>
          <Entra at={cE + 6}>
            <Sombrero color={v.azafran}>θ</Sombrero>
            <Op>=</Op>
            <V color={v.azafran}>w</V>
            <span style={{ margin: "0 0.12em" }}>·</span>
            <V color={ROJO}>X</V>
            <Op>+</Op>(1 − <V color={v.azafran}>w</V>)<span style={{ margin: "0 0.12em" }}>·</span>
            <V color={c.c}>μ</V>
          </Entra>
        </Formula>
        <div style={{ position: "absolute", left: 0, top: 110 }}>
          <Formula tam={50}>
            <Entra at={cP + 4}>
              <V color={v.azafran}>w</V>
              <Op>=</Op>
              <Frac arriba="τ²" abajo="τ² + σ²" />
              <span style={{ fontSize: 30, color: v.niebla, marginLeft: 20 }}>varianza real / varianza total = 0,55</span>
            </Entra>
          </Formula>
        </div>
        <svg width={912} height={220} style={{ position: "absolute", left: 0, top: 290, overflow: "visible" }}>
          <line x1={px(8)} y1={120} x2={px(21)} y2={120} stroke={v.ceniza} strokeWidth={2} />
          <circle cx={px(10)} cy={120} r={10} fill={c.c} />
          <text x={px(10)} y={170} textAnchor="middle" fontFamily={serif} fontSize={28} fill={c.c}>
            μ = 10
          </text>
          <circle cx={px(19.4)} cy={120} r={10} fill={ROJO} />
          <text x={px(19.4)} y={170} textAnchor="middle" fontFamily={serif} fontSize={28} fill={ROJO}>
            su año: 19,4
          </text>
          <g opacity={transicion(frame, cP + largoP * 0.5, fps, 400, EXPO_OUT)}>
            <circle cx={px(est)} cy={70} r={14} fill={v.azafran} />
            <text x={px(est)} y={36} textAnchor="middle" fontFamily={serif} fontSize={30} fill={v.azafran}>
              estimado {est.toFixed(1).replace(".", ",")}
            </text>
          </g>
          <g opacity={transicion(frame, cP + largoP * 0.85, fps, 400, EXPO_OUT)}>
            <line x1={px(15.6)} y1={100} x2={px(15.6)} y2={140} stroke={c.c} strokeWidth={4} />
            <text x={px(15.6)} y={205} textAnchor="middle" fontFamily={mono} fontSize={22} fill={c.c}>
              lo que pasó: 15,6
            </text>
          </g>
        </svg>
        <Panel caja={{ x: 0, y: 540, w: 912, h: 130 }} at={cH + 4} color={c.b} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <HardHat size={48} strokeWidth={1.5} color={c.b} />
          <div>
            <div style={{ fontSize: 28 }}>Bayes empírico de Hauer: el estándar en seguridad vial</div>
            <div style={{ fontSize: 22, fontWeight: 200, color: v.niebla, marginTop: 4 }}>Hauer (1997), Observational Before-After Studies in Road Safety · Efron y Morris (1977)</div>
          </div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── IA: la misma trampa ──────────────────────────────────────────────────────
export const Ia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("modelo");
  const cD = useCue("defensa");
  const largoM = useCueAt("modelo", 1) - cM;
  const largoD = useCueAt("defensa", 1) - cD;
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cM} titulo="La misma trampa|*en IA.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        {[
          ["reentrenar tras la peor semana del modelo", 0.3],
          ["reescribir los prompts con peor puntaje", 0.5],
        ].map(([txt, f], i) => (
          <Panel key={txt as string} caja={{ x: 0, y: i * 130, w: 912, h: 110 }} at={cM + largoM * (f as number)} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
            <BrainCircuit size={44} strokeWidth={1.5} color={ROJO} />
            <div style={{ fontSize: 30 }}>{txt as string}</div>
            <div style={{ marginLeft: "auto", fontFamily: mono, fontSize: 22, color: ROJO }}>mejora… en parte sola</div>
          </Panel>
        ))}
        <div style={{ position: "absolute", left: 0, top: 300, width: 912, borderRadius: 20, border: `2px solid ${c.c}`, background: relleno, padding: "18px 24px", opacity: t(cD + 4) }}>
          <Rol color={c.c}>la defensa</Rol>
          {[
            [Check, "un grupo de comparación también elegido por mal desempeño", 0.15],
            [Shuffle, "o un sorteo entre los peores: a unos los intervienes, a otros no", 0.5],
          ].map(([I, txt, f]) => {
            const Icono = I as typeof Check;
            return (
              <div key={txt as string} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16, fontSize: 28, opacity: t(cD + largoD * (f as number)) }}>
                <Icono size={34} strokeWidth={1.8} color={c.c} /> {txt as string}
              </div>
            );
          })}
        </div>
        <Nota at={cD + largoD * 0.8} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 610 }}>
          Barnett, van der Pols y Dobson (2005), International Journal of Epidemiology 34(1)
        </Nota>
      </Escenario>
    </Escena>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const cCta = useCue("cta");
  return (
    <Escena>
      <div style={{ position: "absolute", left: -80, right: -80, top: -110, display: "flex", justifyContent: "center" }}>
        <Constelacion at={cCta - 30} ancho={560} forma="cerebro" desde="red" cambio={cCta} />
      </div>
      <div style={{ marginTop: 300 }}>
        <Cinetico at={cCta} texto="Si eliges lo extremo,|*vuelve a la media.*" style={{ fontSize: 84 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próximo: 05 · despliegues escalonados
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
