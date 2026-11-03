import React from "react";
import { CalendarRange, CalendarX, Check, CigaretteOff, Globe, HeartPulse, History, Hourglass, Link, Search } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cuenta, Entra, Foco, Formula, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Traza } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";
import { AJUSTE, BANDA, CONTRAFACTUAL, T0, VENTAS } from "./datos";

const SERIE = "El mapa de la experimentación · 13/17";
const N = VENTAS.length;
const REAL = v.azafran;
const CF = c.b;
const MARCAS = [0, 12, 24, 36, 48].map((m) => ({ v: m, t: m === T0 ? "cambio" : `${m - T0 > 0 ? "+" : ""}${m - T0}` }));
const Y: [number, number] = [180, 310];

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

type Plano = { px: (x: number) => number; py: (y: number) => number };
const tramo = (serie: number[], { px, py }: Plano, desde = 0, hasta = serie.length) => serie.slice(desde, hasta).map((y, i) => [px(desde + i), py(y)] as [number, number]);

const Corte: React.FC<{ p: Plano; k?: number }> = ({ p, k = 1 }) => (
  <g opacity={k}>
    <line x1={p.px(T0 - 0.5)} y1={p.py(Y[0])} x2={p.px(T0 - 0.5)} y2={p.py(Y[1])} stroke={v.ceniza} strokeWidth={2} strokeDasharray="6 7" />
    <text x={p.px(T0 - 0.5) + 10} y={p.py(Y[1]) + 26} fontFamily={mono} fontSize={22} fill={v.niebla}>
      sube el precio
    </text>
  </g>
);

const Puntos: React.FC<{ p: Plano; at: number; hasta?: number; tenue?: boolean }> = ({ p, at, hasta = N, tenue }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <g>
      {VENTAS.slice(0, hasta).map((y, i) => (
        <circle key={i} cx={p.px(i)} cy={p.py(y)} r={6} fill={i < T0 ? v.niebla : REAL} opacity={(tenue ? 0.45 : 0.85) * transicion(frame, at + i * 0.6, fps, 300, EXPO_OUT)} />
      ))}
    </g>
  );
};

const Leyenda: React.FC<{ items: [string, string, boolean?][] }> = ({ items }) => (
  <div style={{ display: "flex", gap: 28, fontSize: 26 }}>
    {items.map(([col, t, punteada]) => (
      <span key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 34, height: 0, borderTop: `4px ${punteada ? "dashed" : "solid"} ${col}` }} /> {t}
      </span>
    ))}
  </div>
);

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("gancho");
  const largo = useCueAt("gancho", 1) - at;
  const aNo = at + largo * 0.62;
  const tacha = transicion(frame, aNo, fps, 400, EXPO_OUT);
  const res = transicion(frame, at + largo * 0.72, fps, 500, backOut);
  return (
    <Escena>
      <Escenario alto={560}>
        <div style={{ fontSize: 32, color: v.niebla }}>ventas diarias promedio</div>
        <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
          {[
            ["antes", 226, v.niebla, at + 6],
            ["después", 238, REAL, at + largo * 0.2],
          ].map(([t, n, col, a]) => (
            <Panel key={t as string} caja={{ x: 0, y: 0, w: 446, h: 170 }} at={a as number} color={col as string} estilo={{ position: "relative" }}>
              <div style={{ fontSize: 28, color: v.niebla }}>{t as string}</div>
              <div style={{ fontFamily: serif, fontSize: 84, color: col as string }}>
                <Cuenta at={a as number} hasta={n as number} ms={700} />
              </div>
            </Panel>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: 290, display: "flex", alignItems: "center", gap: 20, fontSize: 40 }}>
          <span style={{ fontFamily: serif, fontSize: 64, color: c.c, position: "relative", opacity: transicion(frame, at + largo * 0.3, fps, 400, EXPO_OUT) }}>
            +11
            <span style={{ position: "absolute", left: -6, right: -6, top: "52%", height: 6, background: ROJO, transform: `scaleX(${tacha})`, transformOrigin: "left" }} />
          </span>
          <span style={{ fontSize: 30, color: v.niebla, opacity: transicion(frame, at + largo * 0.3, fps, 400, EXPO_OUT) }}>antes vs después</span>
        </div>
        <div style={{ position: "absolute", left: 0, top: 400, display: "flex", alignItems: "baseline", gap: 20, opacity: Math.min(1, res) }}>
          <span style={{ fontFamily: serif, fontSize: 96, color: ROJO, display: "inline-block", transform: `scale(${res})` }}>−33</span>
          <span style={{ fontSize: 30 }}>el efecto real, al día</span>
        </div>
      </Escenario>
      <div style={{ marginTop: 20 }}>
        <Cinetico at={at + largo * 0.85} texto="Venías *subiendo.*" style={{ fontSize: 96 }} />
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
      <Cinetico at={6} texto="Series de tiempo|*interrumpidas.*" style={{ marginTop: 18, fontSize: 112 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>y CausalImpact · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── La idea: tu pasado es el control ─────────────────────────────────────────
export const Idea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("pasado");
  const cY = useCue("proyecta");
  const kFit = transicion(frame, cY + 10, fps, 1100, EXPO_IN_OUT);
  const kProy = transicion(frame, cY + 50, fps, 1300, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cP} titulo="Tu pasado|*es el control.*" />
      <Escenario alto={660} style={{ marginTop: 34 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 110 }} at={cP + 8} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <History size={48} strokeWidth={1.5} color={c.c} />
          <div style={{ fontSize: 30 }}>sin grupo de control ni donantes: solo la serie de antes</div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 140 }}>
          <Ejes ancho={912} alto={420} x={[-1, 61]} y={Y} at={cP + 10} marcasX={MARCAS} rotuloX="meses →">
            {(p) => (
              <g>
                <Corte p={p} k={transicion(frame, cP + 20, fps, 400, EXPO_OUT)} />
                <Puntos p={p} at={cP + 14} hasta={T0} />
                <Traza pts={tramo(CONTRAFACTUAL, p, 0, T0)} k={kFit} color={CF} ancho={4} />
                <Traza pts={tramo(CONTRAFACTUAL, p, T0 - 1)} k={kProy} color={CF} ancho={4} discontinuo opacidad={kProy} />
              </g>
            )}
          </Ejes>
        </div>
        <Nota at={cY + 60} color={CF} tam={28} style={{ position: "absolute", left: 0, top: 590 }}>
          tendencia + estacionalidad, proyectadas: lo que habría pasado sin el cambio
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── La fórmula: regresión segmentada ─────────────────────────────────────────
export const FormulaEsc: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cF = useCue("formula");
  const c1 = useCue("b1");
  const c2 = useCue("b2");
  const c2b = useCueAt("b2", 0.5);
  const c3 = useCue("b3");
  const c3b = useCueAt("b3", 0.7);
  const activas = frame >= c3b ? ["s"] : frame >= c3 ? ["b3"] : frame >= c2b ? ["b2"] : frame >= c2 ? ["d"] : frame >= c1 ? ["b1"] : [];
  const filas: [string, string, React.ReactNode, string, number][] = [
    ["b1", "β₁", "tendencia antes del cambio", "+1,5 / mes", c1],
    ["d", "D", "interruptor: 0 antes, 1 después", "0 → 1", c2],
    ["b2", "β₂", "salto de nivel", "−23", c2b],
    ["b3", "β₃", "cambio de pendiente", "−0,8 / mes", c3],
  ];
  return (
    <Escena>
      <Cabeza at={cF} titulo="Regresión|*segmentada.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <Foco activas={activas}>
          <Formula tam={58}>
            <Entra at={cF + 6}>
              <V color={REAL}>Y</V>
              <Sub>t</Sub>
              <Op>=</Op>β<Sub>0</Sub>
              <Op>+</Op>
              <V id="b1" color={c.c}>
                β<Sub>1</Sub>t
              </V>
              <Op>+</Op>
              <V id="b2" color={ROJO}>
                β<Sub>2</Sub>
              </V>
              <V id="d" color={v.azafran}>
                D<Sub>t</Sub>
              </V>
              <Op>+</Op>
              <V id="b3" color={CF}>
                β<Sub>3</Sub>(t−T<Sub>0</Sub>)
              </V>
              <V id="d" color={v.azafran}>
                D<Sub>t</Sub>
              </V>
              <Op>+</Op>
              <V id="s" color={v.niebla}>
                s(t)
              </V>
            </Entra>
          </Formula>
        </Foco>
        <div style={{ position: "absolute", left: 0, top: 110, width: 912 }}>
          {filas.map(([id, s, t, val, a]) => {
            const k = transicion(frame, a, fps, 400, EXPO_OUT);
            const col = { b1: c.c, d: v.azafran, b2: ROJO, b3: CF }[id] as string;
            const on = activas.includes(id);
            return (
              <div key={id} style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 14, padding: "14px 20px", borderRadius: 18, border: `2px solid ${on ? col : "#2A2A33"}`, background: relleno, opacity: k }}>
                <div style={{ width: 70, fontFamily: serif, fontSize: 48, color: col }}>{s}</div>
                <div style={{ flex: 1, fontSize: 28 }}>{t}</div>
                <div style={{ fontFamily: serif, fontSize: 40, color: col }}>{val}</div>
              </div>
            );
          })}
          <Nota at={c3b} color={v.niebla} tam={26} style={{ marginTop: 18 }}>
            <i style={{ fontFamily: serif }}>s(t)</i>: estacionalidad (senos y cosenos de 12 meses) · coeficientes del ajuste a la serie del ejemplo
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── La lectura en el gráfico ─────────────────────────────────────────────────
export const Lectura: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cG = useCue("grafico");
  const cE = useCue("efecto");
  const largo = useCueAt("efecto", 1) - cE;
  const kL = transicion(frame, cG + 14, fps, 1300, EXPO_IN_OUT);
  const kB = transicion(frame, cE, fps, 700, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cG} titulo="Salto y|*pendiente.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <Leyenda
          items={[
            [REAL, "ajuste real"],
            [CF, "sin el cambio", true],
          ]}
        />
        <div style={{ position: "absolute", left: 0, top: 50 }}>
          <Ejes ancho={912} alto={440} x={[-1, 61]} y={Y} at={cG} marcasX={MARCAS} rotuloX="meses →">
            {(p) => {
              const sup = tramo(CONTRAFACTUAL, p, T0);
              const inf = tramo(AJUSTE, p, T0).reverse();
              return (
                <g>
                  <path d={`M${[...sup, ...inf].map((q) => q.join(",")).join("L")}Z`} fill={ROJO} opacity={0.22 * kB} />
                  <Corte p={p} />
                  <Puntos p={p} at={cG} tenue />
                  <Traza pts={tramo(AJUSTE, p, 0, T0)} k={kL} color={v.hueso} ancho={4} />
                  <Traza pts={tramo(CONTRAFACTUAL, p, T0 - 1)} k={kL} color={CF} ancho={4} discontinuo opacidad={kL} />
                  <Traza pts={tramo(AJUSTE, p, T0)} k={kL} color={REAL} ancho={5} />
                </g>
              );
            }}
          </Ejes>
        </div>
        <div style={{ position: "absolute", left: 0, top: 520, width: 912, display: "flex", gap: 16 }}>
          <Panel caja={{ x: 0, y: 0, w: 448, h: 150 }} at={cE + 4} color={ROJO} estilo={{ position: "relative" }}>
            <div style={{ fontSize: 26, color: v.niebla }}>efecto medio, 24 meses</div>
            <div style={{ fontFamily: serif, fontSize: 64, color: ROJO }}>−33 / día</div>
          </Panel>
          <Panel caja={{ x: 0, y: 0, w: 448, h: 150 }} at={cE + largo * 0.5} color={v.ceniza} estilo={{ position: "relative" }}>
            <div style={{ fontSize: 26, color: v.niebla }}>antes vs después ingenuo</div>
            <div style={{ fontFamily: serif, fontSize: 64, color: v.niebla }}>+11 / día</div>
          </Panel>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── CausalImpact ─────────────────────────────────────────────────────────────
export const Impacto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cG = useCue("google");
  const cB = useCue("banda");
  const largoB = useCueAt("banda", 1) - cB;
  const cA = useCue("acumulado");
  const kBanda = transicion(frame, cB + largoB * 0.55, fps, 1200, EXPO_IN_OUT);
  const kCtrl = transicion(frame, cB + 4, fps, 900, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cG} titulo="Causal|*Impact.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", gap: 14 }}>
          {[
            [Search, "búsquedas"],
            [Globe, "ventas en otro país"],
          ].map(([I, t], i) => {
            const Icono = I as typeof Search;
            return (
              <div key={t as string} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", borderRadius: 40, border: `2px solid ${c.c}`, fontSize: 28, opacity: transicion(frame, cB + 10 + i * 12, fps, 400, EXPO_OUT) }}>
                <Icono size={30} strokeWidth={1.6} color={c.c} /> {t as string}
              </div>
            );
          })}
          <div style={{ display: "flex", alignItems: "center", fontSize: 24, fontWeight: 200, color: v.niebla, opacity: transicion(frame, cB + 34, fps, 400, EXPO_OUT) }}>series de control</div>
        </div>
        <div style={{ position: "absolute", left: 0, top: 90 }}>
          <Ejes ancho={912} alto={430} x={[-1, 61]} y={Y} at={cG + 6} marcasX={MARCAS} rotuloX="meses →">
            {(p) => {
              const hi = CONTRAFACTUAL.slice(T0).map((y, i) => [p.px(T0 + i), p.py(y + BANDA[T0 + i] * kBanda)]);
              const lo = CONTRAFACTUAL.slice(T0).map((y, i) => [p.px(T0 + i), p.py(y - BANDA[T0 + i] * kBanda)]).reverse();
              return (
                <g>
                  <path d={`M${[...hi, ...lo].map((q) => q.join(",")).join("L")}Z`} fill={CF} opacity={0.22} />
                  <Corte p={p} />
                  <Puntos p={p} at={cG} tenue />
                  {[0, 1].map((j) => (
                    <Traza key={j} pts={VENTAS.map((_, i) => [p.px(i), p.py(Y[0] + 8 + j * 14 + 0.12 * (CONTRAFACTUAL[i] - 200) + 3 * Math.sin(i * (0.9 + j)))] as [number, number])} k={kCtrl} color={c.c} ancho={2} opacidad={0.7} />
                  ))}
                  <Traza pts={tramo(CONTRAFACTUAL, p, T0 - 1)} k={kCtrl} color={CF} ancho={4} discontinuo opacidad={kCtrl} />
                </g>
              );
            }}
          </Ejes>
        </div>
        <Nota at={cB + largoB * 0.6} color={CF} tam={26} style={{ position: "absolute", left: 0, top: 540 }}>
          la banda de incertidumbre se abre a medida que el pronóstico se aleja
        </Nota>
        <Panel caja={{ x: 0, y: 590, w: 912, h: 120 }} at={cA + 4} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ fontFamily: serif, fontSize: 48, whiteSpace: "nowrap" }}>Σ brechas</div>
          <div style={{ fontSize: 28 }}>
            efecto acumulado: ≈ <span style={{ color: ROJO, fontFamily: serif, fontSize: 40 }}>−23.600</span> ventas en 24 meses
          </div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── Un caso real ─────────────────────────────────────────────────────────────
export const Real: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("real");
  const largo = useCueAt("real", 1) - at;
  const res = transicion(frame, at + largo * 0.6, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={at} titulo="Un caso|*real.*" />
      <Escenario alto={660} style={{ marginTop: 34 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 150 }} at={at + 6} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <CigaretteOff size={60} strokeWidth={1.4} color={c.c} />
          <div>
            <div style={{ fontSize: 34 }}>Italia, enero de 2005</div>
            <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 4 }}>prohibición de fumar en lugares públicos</div>
          </div>
        </Panel>
        <Panel caja={{ x: 0, y: 180, w: 912, h: 200 }} at={at + largo * 0.45} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 30 }}>
          <HeartPulse size={64} strokeWidth={1.4} color={ROJO} />
          <div>
            <div style={{ fontFamily: serif, fontSize: 96, color: ROJO, display: "inline-block", transform: `scale(${res})`, transformOrigin: "left" }}>≈ −4 %</div>
            <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>ingresos por eventos coronarios, menores de 70 años</div>
          </div>
        </Panel>
        <Nota at={at + largo * 0.8} color={v.niebla} tam={24} style={{ position: "absolute", left: 0, top: 410 }}>
          Barone-Adesi et al. (2011) · usado como ejemplo en el tutorial de Bernal, Cummins y Gasparrini (2017)
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Trampas ──────────────────────────────────────────────────────────────────
export const Cuidado: React.FC = () => {
  const cO = useCue("ojo");
  const cC = useCue("control");
  const largo = useCueAt("ojo", 1) - cO;
  const items: [typeof Link, string, string, number][] = [
    [CalendarX, "otro evento en la misma fecha", "¿fue el precio o fue la competencia?", 0.12],
    [Link, "errores autocorrelacionados", "intervalos falsamente estrechos", 0.3],
    [CalendarRange, "pocos meses antes y después", "la tendencia queda mal estimada", 0.62],
    [Hourglass, "anticipación o efecto gradual", "el corte no es tan limpio", 0.8],
  ];
  return (
    <Escena>
      <Cabeza at={cO} titulo="Cuatro|*trampas.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        {items.map(([I, t, d, f], i) => (
          <Panel key={t} caja={{ x: 0, y: i * 130, w: 912, h: 114 }} at={cO + largo * f} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
            <I size={44} strokeWidth={1.5} color={ROJO} />
            <div>
              <div style={{ fontSize: 32 }}>{t}</div>
              <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 2 }}>{d}</div>
            </div>
          </Panel>
        ))}
        <Panel caja={{ x: 0, y: 545, w: 912, h: 110 }} at={cC + 4} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Check size={44} strokeWidth={1.8} color={c.c} />
          <div style={{ fontSize: 30 }}>¿hay un grupo de control? → diferencias en diferencias o control sintético</div>
        </Panel>
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
        <Cinetico at={cCta} texto="Sin control,|tu pasado *es el control.*" style={{ fontSize: 84 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 14/17 · grafos causales
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
