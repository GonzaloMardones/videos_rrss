import React from "react";
import { BrainCircuit, Check, EyeOff, Layers, Shuffle, SlidersHorizontal } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Frac, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Sombrero, Traza } from "../../estilos/vacio/causal";
import { Flecha, Lienzo, Nodo, type P } from "../../estilos/vacio/grafo";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";
import { BORDES, D_CRUDO, D_RES, H_DML, H_INGENUO, H_LINEAL, THETA_CORRIDA, Y_CRUDO, Y_RES } from "./datos";

const SERIE = "El mapa de la experimentación · 16/17";
const DES = c.c; // descuento
const GAS = c.b; // gasto

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

const Barras: React.FC<{ filas: [string, number, string, number][]; max: number; top: number }> = ({ filas, max, top }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 0, top, width: 912 }}>
      {filas.map(([t, val, col, a]) => {
        const k = transicion(frame, a, fps, 700, EXPO_OUT);
        return (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 20, opacity: Math.min(1, k * 2) }}>
            <div style={{ width: 280, fontSize: 30 }}>{t}</div>
            <div style={{ flex: 1, height: 44, borderRadius: 10, background: "#16161B" }}>
              <div style={{ height: 44, width: `${(val / max) * 100 * k}%`, borderRadius: 10, background: col }} />
            </div>
            <div style={{ width: 120, textAlign: "right", fontFamily: serif, fontSize: 50, color: col }}>{(val * k).toFixed(2).replace(".", ",")}</div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const at = useCue("gancho");
  const largo = useCueAt("gancho", 1) - at;
  return (
    <Escena>
      <Escenario alto={480}>
        <div style={{ fontSize: 32, color: v.niebla }}>efecto de $1 de descuento en el gasto</div>
        <Barras
          max={1}
          top={50}
          filas={[
            ["regresión", 0.9, ROJO, at + 6],
            ["con controles", 0.91, ROJO, at + largo * 0.3],
            ["efecto real", 0.5, c.c, at + largo * 0.55],
          ]}
        />
      </Escenario>
      <div style={{ marginTop: 20 }}>
        <Cinetico at={at + largo * 0.8} texto="No es qué controlas.|Es *cómo.*" style={{ fontSize: 84 }} />
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
      <Cinetico at={6} texto="Double|*machine learning.*" style={{ marginTop: 18, fontSize: 116 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>ML para la confusión, estadística para el efecto · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── El problema ──────────────────────────────────────────────────────────────
export const Problema: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("curvas");
  const cM = useCue("ml");
  const largo = useCueAt("ml", 1) - cM;
  const t = (a: number) => transicion(frame, a, fps, 500, EXPO_OUT);
  const f = (a: number) => transicion(frame, a, fps, 600, EXPO_IN_OUT);
  const X: P = [456, 110];
  const D: P = [170, 330];
  const Y: P = [742, 330];
  const items: [string, number][] = [
    ["optimiza para predecir, no para estimar", 0.15],
    ["regulariza: el sesgo se cuela en el coeficiente", 0.45],
    ["no entrega un intervalo de confianza", 0.8],
  ];
  return (
    <Escena>
      <Cabeza at={cC} titulo="Confusión|*no lineal.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <div style={{ opacity: 1 - f(cM) }}>
          <Lienzo alto={420}>
            <Flecha de={X} a={D} k={f(cC + 14)} color={v.azafran} />
            <Flecha de={X} a={Y} k={f(cC + 18)} color={v.azafran} />
            <Flecha de={D} a={Y} k={f(cC + 24)} color={DES} />
            <text x={250} y={190} fontFamily={mono} fontSize={26} fill={v.azafran} opacity={t(cC + 40)}>
              ∿ curva
            </text>
            <text x={590} y={190} fontFamily={mono} fontSize={26} fill={v.azafran} opacity={t(cC + 46)}>
              ∿ curva
            </text>
            <Nodo p={X} letra="X" nombre="historial del cliente" color={v.azafran} k={t(cC + 4)} arriba />
            <Nodo p={D} letra="D" nombre="descuento" color={DES} k={t(cC + 8)} />
            <Nodo p={Y} letra="Y" nombre="gasto" color={GAS} k={t(cC + 12)} />
          </Lienzo>
        </div>
        <div style={{ position: "absolute", left: 0, top: 40, width: 912 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, opacity: t(cM + 12) }}>
            <BrainCircuit size={48} strokeWidth={1.5} color={ROJO} /> machine learning directo
          </div>
          {items.map(([txt, fr]) => (
            <div key={txt} style={{ marginTop: 18, padding: "16px 22px", borderRadius: 18, border: `2px solid ${ROJO}`, background: relleno, fontSize: 30, opacity: t(cM + largo * fr) }}>
              {txt}
            </div>
          ))}
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Residuo contra residuo ───────────────────────────────────────────────────
const NAIVE = 0.894;
export const Residuos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cF = useCue("fwl");
  const cD = useCue("dos");
  const cP = useCue("pendiente");
  const largoD = useCueAt("dos", 1) - cD;
  const k = transicion(frame, cD + largoD * 0.6, fps, 1400, EXPO_IN_OUT);
  const kL = transicion(frame, cP, fps, 800, EXPO_IN_OUT);
  const mD = D_CRUDO.reduce((a, b) => a + b, 0) / D_CRUDO.length;
  const mY = Y_CRUDO.reduce((a, b) => a + b, 0) / Y_CRUDO.length;
  const pend = NAIVE + (THETA_CORRIDA - NAIVE) * k;
  const cx = mD * (1 - k);
  const cy = mY * (1 - k);
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cF} titulo="Residuo contra|*residuo.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", gap: 14 }}>
          {[
            ["modelo 1: historial → descuento", DES, cD + 4],
            ["modelo 2: historial → gasto", GAS, cD + largoD * 0.3],
          ].map(([txt, col, a]) => (
            <div key={txt as string} style={{ flex: 1, padding: "12px 16px", borderRadius: 16, border: `2px solid ${col}`, background: relleno, fontSize: 25, opacity: t(a as number) }}>
              {txt as string}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: 90 }}>
          <Ejes ancho={912} alto={520} x={[-3.5, 5.5]} y={[-4, 10]} at={cF} rotuloX={k > 0.5 ? "residuo del descuento →" : "descuento →"} rotuloY={k > 0.5 ? "residuo del gasto" : "gasto"}>
            {({ px, py }) => (
              <g>
                {D_CRUDO.map((d, i) => {
                  const x = d + (D_RES[i] - d) * k;
                  const y = Y_CRUDO[i] + (Y_RES[i] - Y_CRUDO[i]) * k;
                  return <circle key={i} cx={px(x)} cy={py(y)} r={7} fill={k > 0.5 ? v.azafran : v.niebla} opacity={0.7 * t(cF + 6 + i * 0.15)} />;
                })}
                <line x1={px(-3.3)} y1={py(cy + pend * (-3.3 - cx))} x2={px(5.3)} y2={py(cy + pend * (5.3 - cx))} stroke={k > 0.5 ? c.c : ROJO} strokeWidth={5} opacity={t(cF + 30)} />
              </g>
            )}
          </Ejes>
        </div>
        <div style={{ position: "absolute", left: 0, top: 640, display: "flex", alignItems: "baseline", gap: 18, fontSize: 30 }}>
          <span>pendiente:</span>
          <span style={{ fontFamily: serif, fontSize: 64, color: k > 0.5 ? c.c : ROJO }}>{pend.toFixed(2).replace(".", ",")}</span>
          <span style={{ color: v.niebla, fontWeight: 200, opacity: kL }}>esta corrida · el promedio de 300 es 0,50</span>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── La fórmula ───────────────────────────────────────────────────────────────
export const FormulaEsc: React.FC = () => {
  const frame = useCurrentFrame();
  const cF = useCue("formula");
  const cD = useCue("dres");
  const cY = useCue("yres");
  const cY2 = useCueAt("yres", 0.55);
  const activas = frame >= cY2 ? [] : frame >= cY ? ["y"] : frame >= cD ? ["d"] : [];
  const Dt = (
    <V id="d" color={DES}>
      D̃<Sub>i</Sub>
    </V>
  );
  const Yt = (
    <V id="y" color={GAS}>
      Ỹ<Sub>i</Sub>
    </V>
  );
  return (
    <Escena>
      <Cabeza at={cF} titulo="El estimador|*en una línea.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <Foco activas={activas}>
          <Formula tam={68}>
            <Entra at={cF + 6}>
              <Sombrero color={v.azafran}>θ</Sombrero>
              <Op>=</Op>
              <Frac
                arriba={
                  <>
                    Σ {Dt}
                    <Op>·</Op>
                    {Yt}
                  </>
                }
                abajo={<>Σ {Dt}²</>}
              />
            </Entra>
          </Formula>
          <div style={{ position: "absolute", left: 0, top: 230, display: "flex", flexDirection: "column", gap: 26 }}>
            <Formula tam={54}>
              <Entra at={cD + 4}>
                {Dt}
                <Op>=</Op>
                <V id="d" color={DES}>
                  D<Sub>i</Sub>
                </V>
                <Op>−</Op>
                <V id="d" color={DES}>
                  m̂(X<Sub>i</Sub>)
                </V>
              </Entra>
            </Formula>
            <Formula tam={54}>
              <Entra at={cY + 4}>
                {Yt}
                <Op>=</Op>
                <V id="y" color={GAS}>
                  Y<Sub>i</Sub>
                </V>
                <Op>−</Op>
                <V id="y" color={GAS}>
                  ℓ̂(X<Sub>i</Sub>)
                </V>
              </Entra>
            </Formula>
          </div>
        </Foco>
        <div style={{ position: "absolute", left: 0, top: 460, display: "flex", flexDirection: "column", gap: 10 }}>
          <Nota at={cD + 20} color={DES} tam={28}>
            <i style={{ fontFamily: serif }}>m̂</i>: modelo que predice el descuento con el historial
          </Nota>
          <Nota at={cY + 20} color={GAS} tam={28}>
            <i style={{ fontFamily: serif }}>ℓ̂</i>: modelo que predice el gasto con el historial
          </Nota>
        </div>
        <div style={{ position: "absolute", left: 0, top: 580, display: "flex", gap: 14 }}>
          {["bosques aleatorios", "boosting", "lasso"].map((m, i) => (
            <Sube key={m} at={cY2 + i * 6}>
              <div style={{ padding: "10px 20px", borderRadius: 40, border: `2px solid ${v.ceniza}`, fontSize: 26 }}>{m}</div>
            </Sube>
          ))}
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Ortogonalidad de Neyman ──────────────────────────────────────────────────
export const Ortogonal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cN = useCue("neyman");
  const cO = useCue("orden");
  const largo = useCueAt("orden", 1) - cO;
  const k1 = transicion(frame, cO + 10, fps, 1000, EXPO_IN_OUT);
  const k2 = transicion(frame, cO + largo * 0.35, fps, 1000, EXPO_IN_OUT);
  const ls = Array.from({ length: 61 }, (_, i) => 2 + (i / 60) * 3);
  return (
    <Escena>
      <Cabeza at={cN} titulo="Errores que se|*multiplican.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <Formula tam={50}>
          <Entra at={cN + 8}>
            sesgo de{" "}
            <Sombrero color={v.hueso}>θ</Sombrero>
            <Op>≈</Op>(<V color={DES}>error de m̂</V>)<Op>×</Op>(<V color={GAS}>error de ℓ̂</V>)
          </Entra>
        </Formula>
        <div style={{ position: "absolute", left: 0, top: 100 }}>
          <Formula tam={54}>
            <Entra at={cO + 4}>
              <span style={{ color: v.azafran }}>O(n</span>
              <sup style={{ fontSize: "0.55em", color: v.azafran }}>−1/4</sup>
              <span style={{ color: v.azafran }}>)</span>
              <Op>×</Op>
              <span style={{ color: v.azafran }}>O(n</span>
              <sup style={{ fontSize: "0.55em", color: v.azafran }}>−1/4</sup>
              <span style={{ color: v.azafran }}>)</span>
              <Op>=</Op>
              <span style={{ color: c.c }}>O(n</span>
              <sup style={{ fontSize: "0.55em", color: c.c }}>−1/2</sup>
              <span style={{ color: c.c }}>)</span>
            </Entra>
          </Formula>
        </div>
        <div style={{ position: "absolute", left: 0, top: 200 }}>
          <Ejes ancho={912} alto={420} x={[2, 5]} y={[0, 0.34]} at={cO} rotuloX="datos (n) →" rotuloY="error" marcasX={[2, 3, 4, 5].map((e) => ({ v: e, t: `10${["²", "³", "⁴", "⁵"][e - 2]}` }))}>
            {({ px, py }) => (
              <g>
                <Traza pts={ls.map((l) => [px(l), py(Math.pow(10, -l / 4))] as P)} k={k1} color={v.azafran} ancho={5} />
                <Traza pts={ls.map((l) => [px(l), py(Math.pow(10, -l / 2))] as P)} k={k2} color={c.c} ancho={5} />
                <text x={px(2.6)} y={py(0.26)} fontFamily={mono} fontSize={26} fill={v.azafran} opacity={k1}>
                  cada modelo: n^−1/4
                </text>
                <text x={px(2.5)} y={py(0.03) - 14} fontFamily={mono} fontSize={26} fill={c.c} opacity={k2}>
                  el producto: n^−1/2
                </text>
              </g>
            )}
          </Ejes>
        </div>
        <Nota at={cO + largo * 0.7} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 650 }}>
          el mismo orden que el error estadístico normal: bastan modelos decentes
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Cross-fitting ────────────────────────────────────────────────────────────
export const Cruzado: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("partes");
  const cR = useCue("rota");
  const largo = useCueAt("rota", 1) - cP;
  const turno = Math.min(4, Math.floor(Math.max(0, frame - cP - 30) / Math.max(12, (largo - 30) / 5)));
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cP} titulo="Cross-|*fitting.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", gap: 12 }}>
          {Array.from({ length: 5 }, (_, i) => {
            const pred = i === turno && frame >= cP + 30;
            return (
              <div key={i} style={{ flex: 1, height: 300, borderRadius: 20, border: `2.5px solid ${pred ? v.azafran : c.b}`, background: pred ? "rgba(255,184,0,0.12)" : relleno, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, opacity: t(cP + 6 + i * 4) }}>
                <Layers size={44} strokeWidth={1.5} color={pred ? v.azafran : c.b} />
                <div style={{ fontFamily: mono, fontSize: 26, color: pred ? v.azafran : c.b }}>{pred ? "predice" : "entrena"}</div>
                <div style={{ fontFamily: serif, fontSize: 40 }}>{i + 1}</div>
              </div>
            );
          })}
        </div>
        <Nota at={cP + 40} color={v.azafran} tam={28} style={{ position: "absolute", left: 0, top: 330 }}>
          cada fila se predice con un modelo que nunca la vio
        </Nota>
        <Panel caja={{ x: 0, y: 410, w: 912, h: 130 }} at={cR + 4} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Shuffle size={46} strokeWidth={1.5} color={c.c} />
          <div style={{ fontSize: 30 }}>el sobreajuste no se confunde con efecto · rotando, usas todos los datos</div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── Resultado: 300 simulaciones ──────────────────────────────────────────────
export const Resultado: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("sims");
  const largo = useCueAt("sims", 1) - at;
  const series: [number[], string, string, number][] = [
    [H_INGENUO, ROJO, "ingenua · 0,90", 0.12],
    [H_LINEAL, v.azafran, "controles lineales · 0,91", 0.3],
    [H_DML, c.c, "double ML · 0,50", 0.5],
  ];
  const max = Math.max(...H_INGENUO, ...H_LINEAL, ...H_DML);
  const res = transicion(frame, at + largo * 0.8, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={at} titulo="300|*simulaciones.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, fontSize: 26 }}>
          {series.map(([, col, txt, f]) => (
            <span key={txt} style={{ opacity: transicion(frame, at + largo * f, fps, 400, EXPO_OUT) }}>
              <span style={{ color: col }}>■</span> {txt}
            </span>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: 70 }}>
          <Ejes ancho={912} alto={440} x={[0.36, 1.04]} y={[0, max * 1.15]} at={at} marcasX={[0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((m) => ({ v: m, t: m.toFixed(1).replace(".", ",") }))}>
            {({ px, py }) => (
              <g>
                <line x1={px(0.5)} y1={py(0)} x2={px(0.5)} y2={py(max * 1.12)} stroke={v.hueso} strokeWidth={2} strokeDasharray="6 7" />
                <text x={px(0.5) + 8} y={py(max * 1.1)} fontFamily={mono} fontSize={22} fill={v.hueso}>
                  real
                </text>
                {series.map(([h, col, txt, f]) => {
                  const k = transicion(frame, at + largo * f, fps, 700, EXPO_OUT);
                  return (
                    <g key={txt}>
                      {h.map((n, i) =>
                        n > 0 ? <rect key={i} x={px(BORDES[i]) + 1} y={py(n * k)} width={px(BORDES[i + 1]) - px(BORDES[i]) - 2} height={py(0) - py(n * k)} fill={col} opacity={0.75} /> : null,
                      )}
                    </g>
                  );
                })}
              </g>
            )}
          </Ejes>
        </div>
        <Panel caja={{ x: 0, y: 560, w: 912, h: 130 }} at={at + largo * 0.72} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div style={{ fontFamily: serif, fontSize: 72, color: c.c, display: "inline-block", whiteSpace: "nowrap", flexShrink: 0, transform: `scale(${res})` }}>95 %</div>
          <div style={{ fontSize: 28 }}>de los intervalos del 95 % de double ML contienen el valor real</div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── Cuándo usarlo ────────────────────────────────────────────────────────────
export const Cuando: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("usar");
  const largo = useCueAt("usar", 1) - at;
  return (
    <Escena>
      <Cabeza at={at} titulo="Cuándo|*usarlo.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <div style={{ borderRadius: 20, border: `2px solid ${c.c}`, background: relleno, padding: "18px 24px", opacity: transicion(frame, at + 4, fps, 400, EXPO_OUT) }}>
          <Rol color={c.c}>úsalo con</Rol>
          {["muchos controles", "relaciones no lineales"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14, fontSize: 32 }}>
              <SlidersHorizontal size={32} strokeWidth={1.6} color={c.c} /> {t}
            </div>
          ))}
        </div>
        <Panel caja={{ x: 0, y: 230, w: 912, h: 150 }} at={at + largo * 0.4} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <EyeOff size={48} strokeWidth={1.5} color={ROJO} />
          <div style={{ fontSize: 30 }}>no arregla confusores que no mediste: sigue necesitando un grafo causal (14) y sensibilidad (15)</div>
        </Panel>
        <Nota at={at + largo * 0.8} color={v.niebla} tam={26} style={{ position: "absolute", left: 0, top: 420 }}>
          implementaciones: DoubleML (Python y R), EconML
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
        <Cinetico at={cCta} texto="ML limpia *la confusión.*|Estadística *estima.*" style={{ fontSize: 80 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próxima y última: 17/17 · mediación
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
