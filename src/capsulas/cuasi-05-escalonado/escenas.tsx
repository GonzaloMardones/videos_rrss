import React from "react";
import { Check, FileCode2, Truck, TriangleAlert } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Traza } from "../../estilos/vacio/causal";
import { type P } from "../../estilos/vacio/grafo";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Codigo, Escenario, mono } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";
import { ADOPCION, EVENTOS, PANEL } from "./datos";

const SERIE = "Cuasi-experimentos · 05";
const COLOR_OLA: Record<number, string> = { 3: v.azafran, 5: c.c, 7: c.b, 99: v.niebla };

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
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 18, opacity: Math.min(1, k * 2) }}>
            <div style={{ width: 290, fontSize: 28 }}>{t}</div>
            <div style={{ flex: 1, height: 42, borderRadius: 10, background: "#16161B" }}>
              <div style={{ height: 42, width: `${(val / max) * 100 * k}%`, borderRadius: 10, background: col }} />
            </div>
            <div style={{ width: 110, textAlign: "right", fontFamily: serif, fontSize: 48, color: col }}>{(val * k).toFixed(1).replace(".", ",")}</div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Gancho: Gabriela Mistral ─────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cG = useCue("gaby");
  const cT = useCue("trampa");
  const largo = useCueAt("gaby", 1) - cG;
  const res = transicion(frame, cG + largo * 0.6, fps, 500, backOut);
  return (
    <Escena>
      <Escenario alto={620}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 170 }} at={cG + 4} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 26 }}>
          <Truck size={70} strokeWidth={1.3} color={v.azafran} />
          <div>
            <div style={{ fontFamily: mono, fontSize: 26, color: v.niebla }}>2008 · Codelco, División Gabriela Mistral</div>
            <div style={{ fontSize: 34, marginTop: 6 }}>primer despliegue comercial de camiones autónomos (Komatsu)</div>
          </div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 210, display: "flex", alignItems: "baseline", gap: 20 }}>
          <span style={{ fontFamily: serif, fontSize: 120, color: c.c, display: "inline-block", transform: `scale(${res})`, transformOrigin: "left" }}>100 %</span>
          <span style={{ fontSize: 32, opacity: res }}>flota autónoma hoy</span>
        </div>
        <Panel caja={{ x: 0, y: 420, w: 912, h: 140 }} at={cT + 4} color={ROJO} discontinuo estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <TriangleAlert size={50} strokeWidth={1.5} color={ROJO} />
          <div style={{ fontSize: 30 }}>¿cuánta productividad por la autonomía? no hay un estudio controlado</div>
        </Panel>
      </Escenario>
      <div style={{ marginTop: 0 }}>
        <Cinetico at={cT + 30} texto="Y medirlo *tiene trampa.*" style={{ fontSize: 88 }} />
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
      <Cinetico at={6} texto="Despliegues|*escalonados.*" style={{ marginTop: 18, fontSize: 130 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>camiones autónomos por olas · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Olas de adopción ─────────────────────────────────────────────────────────
const Panel6: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 1500, EXPO_IN_OUT);
  return (
    <Ejes ancho={912} alto={460} x={[0, 9]} y={[96, 126]} at={at - 10} rotuloX="año →" rotuloY="productividad (índice)" marcasX={[0, 3, 5, 7, 9].map((a) => ({ v: a, t: String(a) }))}>
      {({ px, py }) => (
        <g>
          {PANEL.map((serie, i) => (
            <g key={i}>
              <Traza pts={serie.map((y, t) => [px(t), py(y)] as P)} k={k} color={COLOR_OLA[ADOPCION[i]]} ancho={4} />
              {ADOPCION[i] < 10 ? <circle cx={px(ADOPCION[i])} cy={py(serie[ADOPCION[i]])} r={10} fill={COLOR_OLA[ADOPCION[i]]} opacity={k > 0.6 ? 1 : 0} /> : null}
            </g>
          ))}
        </g>
      )}
    </Ejes>
  );
};

export const Escalon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cO = useCue("olas");
  const cI = useCue("ideal");
  return (
    <Escena>
      <Cabeza at={cO} titulo="Llega|*por olas.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", gap: 24, fontSize: 26, opacity: transicion(frame, cO + 6, fps, 400, EXPO_OUT) }}>
          {[
            [3, "ola año 3"],
            [5, "ola año 5"],
            [7, "ola año 7"],
            [99, "nunca"],
          ].map(([g, t]) => (
            <span key={t as string}>
              <span style={{ color: COLOR_OLA[g as number] }}>●</span> {t as string}
            </span>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: 60 }}>
          <Panel6 at={cO + 14} />
        </div>
        <Nota at={cI + 4} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 560 }}>
          siempre hay faenas que todavía no adoptan: parece ideal para diferencias en diferencias
        </Nota>
        <Nota at={cI + 30} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 640 }}>
          6 faenas simuladas · efecto real que crece: 2 + 2·(años desde la adopción)
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── La receta clásica: TWFE ──────────────────────────────────────────────────
export const Twfe: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cR = useCue("receta");
  const cC = useCue("crece");
  const largoR = useCueAt("receta", 1) - cR;
  const fA = cR + largoR * 0.5;
  const fL = cR + largoR * 0.65;
  const fB = cR + largoR * 0.82;
  const activas = frame >= cC ? ["b"] : frame >= fB ? ["b"] : frame >= fL ? ["l"] : frame >= fA ? ["a"] : [];
  const k = transicion(frame, cC + 10, fps, 1000, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cR} titulo="La receta|*clásica.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <Foco activas={activas}>
          <Formula tam={58}>
            <Entra at={cR + 6}>
              Y<Sub>it</Sub>
              <Op>=</Op>
              <V id="a" color={v.azafran}>
                α<Sub>i</Sub>
              </V>
              <Op>+</Op>
              <V id="l" color={c.b}>
                λ<Sub>t</Sub>
              </V>
              <Op>+</Op>
              <V id="b" color={c.c}>
                β
              </V>
              <span style={{ margin: "0 0.1em" }}>·</span>D<Sub>it</Sub>
              <Op>+</Op>ε<Sub>it</Sub>
            </Entra>
          </Formula>
        </Foco>
        <div style={{ position: "absolute", left: 0, top: 110, display: "flex", flexDirection: "column", gap: 8 }}>
          <Nota at={fA} color={v.azafran} tam={26}>
            <i style={{ fontFamily: serif }}>α</i>: lo fijo de cada faena
          </Nota>
          <Nota at={fL} color={c.b} tam={26}>
            <i style={{ fontFamily: serif }}>λ</i>: lo que le pasa a todas en cada año
          </Nota>
          <Nota at={fB} color={c.c} tam={26}>
            <i style={{ fontFamily: serif }}>β</i>: un solo número para el efecto
          </Nota>
        </div>
        <div style={{ position: "absolute", left: 0, top: 290 }}>
          <Ejes ancho={912} alto={340} x={[0, 6]} y={[0, 15]} at={cC} rotuloX="años desde la adopción →" rotuloY="efecto">
            {({ px, py }) => (
              <g>
                <Traza pts={[0, 1, 2, 3, 4, 5, 6].map((kk) => [px(kk), py(2 + 2 * kk)] as P)} k={k} color={ROJO} ancho={5} />
                <line x1={px(0)} y1={py(6.8)} x2={px(6)} y2={py(6.8)} stroke={c.c} strokeWidth={3} strokeDasharray="10 8" opacity={k} />
                <text x={px(3.8)} y={py(6.8) + 34} fontFamily={mono} fontSize={22} fill={c.c} opacity={k}>
                  un solo β no describe esto
                </text>
              </g>
            )}
          </Ejes>
        </div>
        <Nota at={cC + 30} color={ROJO} tam={26} style={{ position: "absolute", left: 0, top: 650 }}>
          el efecto crece mientras operadores y sistema aprenden
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Comparaciones problemáticas ──────────────────────────────────────────────
export const Prohibidas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cU = useCue("usa");
  const cM = useCue("mitad");
  const largo = useCueAt("mitad", 1) - cM;
  const kZ = transicion(frame, cU + 20, fps, 800, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cU} titulo="Controles que|*ya están tratados.*" tam={80} />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <Ejes ancho={912} alto={360} x={[0, 9]} y={[96, 126]} at={cU} rotuloX="año →" marcasX={[3, 5].map((a) => ({ v: a, t: `año ${a}` }))}>
          {({ px, py }) => (
            <g>
              <rect x={px(5)} y={py(126)} width={px(9) - px(5)} height={py(96) - py(126)} fill={ROJO} opacity={0.1 * kZ} />
              <Traza pts={PANEL[0].map((y, t) => [px(t), py(y)] as P)} k={1} color={v.azafran} ancho={4} />
              <Traza pts={PANEL[2].map((y, t) => [px(t), py(y)] as P)} k={1} color={c.c} ancho={4} />
              <text x={px(0.2)} y={py(124)} fontFamily={mono} fontSize={22} fill={ROJO} opacity={kZ}>
                zona roja: la ola 3 hace de «control» de la ola 5
              </text>
              <text x={px(5.3)} y={py(99)} fontFamily={mono} fontSize={22} fill={v.azafran} opacity={kZ}>
                efecto creciendo
              </text>
            </g>
          )}
        </Ejes>
        <Barras
          max={8}
          top={390}
          filas={[
            ["efecto real promedio", 6.8, c.c, cM + largo * 0.4],
            ["regresión clásica", 3.4, ROJO, cM + largo * 0.65],
          ]}
        />
        <Nota at={cM + largo * 0.85} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 620 }}>
          Goodman-Bacon (2021), Journal of Econometrics 225(2) · de Chaisemartin y D'Haultfœuille (2020), AER
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Estudio de eventos y Callaway–Sant'Anna ──────────────────────────────────
export const Eventos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cA = useCue("alinea");
  const cP = useCue("previos");
  const cC = useCue("callaway");
  const largoC = useCueAt("callaway", 1) - cC;
  const kPost = transicion(frame, cA + 20, fps, 900, EXPO_OUT);
  const kPre = transicion(frame, cP, fps, 600, EXPO_OUT);
  const ev = EVENTOS.filter(([kk]) => kk >= -4);
  return (
    <Escena>
      <Cabeza at={cA} titulo="Estudio|*de eventos.*" />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <Formula tam={46}>
          <Entra at={cA + 6}>
            Y<Sub>it</Sub>
            <Op>=</Op>α<Sub>i</Sub>
            <Op>+</Op>λ<Sub>t</Sub>
            <Op>+</Op>Σ<Sub>k</Sub> <V color={c.c}>β</V>
            <Sub>k</Sub>·1[t − G<Sub>i</Sub> = k]
          </Entra>
        </Formula>
        <div style={{ position: "absolute", left: 0, top: 90 }}>
          <Ejes ancho={912} alto={380} x={[-4.5, 6.5]} y={[-2, 16]} at={cA + 6} rotuloX="años desde la adopción (k) →" rotuloY="β_k" marcasX={[-4, -2, 0, 2, 4, 6].map((a) => ({ v: a, t: String(a) }))}>
            {({ px, py }) => (
              <g>
                <line x1={px(-4.5)} y1={py(0)} x2={px(6.5)} y2={py(0)} stroke={v.ceniza} strokeWidth={2} />
                <line x1={px(-0.5)} y1={py(-2)} x2={px(-0.5)} y2={py(16)} stroke={v.ceniza} strokeWidth={2} strokeDasharray="6 7" />
                <circle cx={px(-1)} cy={py(0)} r={9} fill="none" stroke={v.niebla} strokeWidth={2} />
                {ev.map(([kk, b]) => (
                  <circle key={kk} cx={px(kk)} cy={py(b)} r={11} fill={kk < 0 ? v.azafran : c.c} opacity={kk < 0 ? kPre : kPost} />
                ))}
                <text x={px(-4.3)} y={py(5)} fontFamily={mono} fontSize={22} fill={v.azafran} opacity={kPre}>
                  antes ≈ 0: tendencias paralelas
                </text>
              </g>
            )}
          </Ejes>
        </div>
        <Panel caja={{ x: 0, y: 500, w: 912, h: 150 }} at={cC + 4} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div style={{ fontFamily: serif, fontSize: 64, color: c.c, whiteSpace: "nowrap" }}>7,1</div>
          <div>
            <div style={{ fontSize: 28 }}>Callaway y Sant'Anna: cada ola contra quien todavía no adopta</div>
            <div style={{ fontSize: 22, fontWeight: 200, color: v.niebla, marginTop: 4 }}>real 6,8 · regresión clásica 3,4 · Journal of Econometrics 225(2), 2021</div>
          </div>
        </Panel>
        <Nota at={cC + largoC * 0.8} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 680 }}>
          estimadores alternativos: Sun y Abraham (2021); Borusyak, Jaravel y Spiess (2024)
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── En la nube ───────────────────────────────────────────────────────────────
const K = "#C792EA";
const S = "#C3E88D";
const G = "#6B7280";
export const Nube: React.FC = () => {
  const frame = useCurrentFrame();
  const cB = useCue("bandera");
  const cG = useCue("guarda");
  const resaltar = frame >= cG ? [6, 7] : frame >= cB + 30 ? [2, 3, 4, 5] : [];
  return (
    <Escena>
      <Cabeza at={cB} titulo="En la nube,|*lo mismo.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <Codigo
          caja={{ x: 0, y: 0, w: 912, h: 470 }}
          at={cB + 6}
          archivo="flags/agente-planificacion.yaml"
          Icono={FileCode2}
          tam={26}
          resaltar={resaltar}
          lineas={[
            [["# despliegue escalonado por región", G]],
            [["activacion", K], [":"]],
            [["  chile", K], [": "], ['"2026-03-01"', S]],
            [["  peru", K], [": "], ['"2026-05-01"', S]],
            [["  mexico", K], [": "], ['"2026-07-01"', S]],
            [["  argentina", K], [": "], ["null", ROJO], ["   # aún sin activar", G]],
            [["registro", K], [": "], ["[region, fecha_activacion, metrica]", c.c]],
            [["retencion_logs", K], [": "], ['"18 meses"', S]],
          ]}
        />
        <Panel caja={{ x: 0, y: 500, w: 912, h: 130 }} at={cG + 4} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Check size={46} strokeWidth={2} color={c.c} />
          <div style={{ fontSize: 30 }}>fechas de activación + una región sin activar = estudio de eventos listo</div>
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
        <Cinetico at={cCta} texto="Cada ola contra|*quien aún no llega.*" style={{ fontSize: 88 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próximo: 06 · umbrales y alarmas de fatiga
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
