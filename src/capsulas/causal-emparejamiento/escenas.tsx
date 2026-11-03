import React from "react";
import { BookOpen, EyeOff, GraduationCap, User, Users } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cuenta, Entra, Foco, Formula, Frac, Op, serif, Sub, Sup, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Traza } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Chip, Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

// Personas ilustrativas: edad, años de estudio e ingreso previo (en miles).
const TRATADOS = [
  { edad: 34, est: 12, ing: 410, y: 620 },
  { edad: 27, est: 14, ing: 380, y: 590 },
  { edad: 45, est: 10, ing: 450, y: 610 },
];
const GEMELOS = [
  { edad: 35, est: 12, ing: 400, y: 560 },
  { edad: 26, est: 14, ing: 390, y: 540 },
  { edad: 44, est: 10, ing: 460, y: 580 },
];

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("pregunta");
  const cG = useCue("gemelos");
  const k = transicion(frame, cP + 10, fps, 900, EXPO_OUT);
  return (
    <Escena>
      <Escenario alto={480}>
        <div style={{ position: "absolute", left: 80, bottom: 60, display: "flex", alignItems: "flex-end", gap: 120 }}>
          {[
            ["con curso", 0.9, v.azafran],
            ["sin curso", 0.6, c.b],
          ].map(([t, h, col]) => (
            <div key={t as string} style={{ textAlign: "center" }}>
              <div style={{ width: 220, height: 340 * (h as number) * k, borderRadius: 14, background: col as string }} />
              <div style={{ fontSize: 30, marginTop: 12 }}>{t}</div>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 600, top: 40, fontFamily: serif, fontSize: 120, color: ROJO, opacity: transicion(frame, cP + 40, fps, 400, backOut) }}>?</div>
      </Escenario>
      <div style={{ marginTop: 40 }}>
        <Cinetico at={cP + 20} texto="¿El curso, o|ya eran *distintos?*" style={{ fontSize: 96 }} />
        <Sube at={cG + 4} style={{ marginTop: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 200 }}>
            <Users size={48} strokeWidth={1.6} color={v.azafran} /> si no puedes sortear, <span style={{ color: v.azafran }}>busca gemelos</span>
          </div>
        </Sube>
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ serie, autor }) => (
  <Escena>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, display: "flex", justifyContent: "center" }}>
      <Constelacion at={-60} ancho={700} forma="red" cantidad={520} />
    </div>
    <div style={{ marginTop: 450 }}>
      <Rotulo at={2}>{serie}</Rotulo>
      <Cinetico at={6} texto="*Emparejamiento.*" style={{ marginTop: 18, fontSize: 120 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── La idea: parejas ─────────────────────────────────────────────────────────
const Ficha: React.FC<{ x: number; y: number; p: { edad: number; est: number; ing: number; y: number }; color: string; at: number; resultado: boolean }> = ({ x, y, p, color, at, resultado }) => (
  <Panel caja={{ x, y, w: 400, h: 150 }} at={at} color={color} estilo={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px" }}>
    <User size={48} strokeWidth={1.5} color={color} />
    <div style={{ fontFamily: mono, fontSize: 22, lineHeight: 1.5, color: v.niebla }}>
      {p.edad} años · {p.est} estudios
      <br />
      ingreso previo {p.ing}
      {resultado ? (
        <>
          <br />
          <span style={{ color }}>ingreso hoy {p.y}</span>
        </>
      ) : null}
    </div>
  </Panel>
);

export const Idea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("parecido");
  const cProm = useCue("promedia");
  const res = frame >= cProm;
  const prom = TRATADOS.reduce((s, t, i) => s + (t.y - GEMELOS[i].y), 0) / TRATADOS.length;
  return (
    <Escena>
      <Rotulo at={cP}>La idea</Rotulo>
      <Cinetico at={cP + 4} texto="Un gemelo|para *cada uno.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <div style={{ position: "absolute", left: 0, top: 0, display: "flex", width: 912, justifyContent: "space-between" }}>
          <Rol color={v.azafran}>Hizo el curso</Rol>
          <Rol color={c.b}>Su gemelo, sin curso</Rol>
        </div>
        {TRATADOS.map((t, i) => (
          <React.Fragment key={i}>
            <Ficha x={0} y={40 + i * 170} p={t} color={v.azafran} at={cP + 10 + i * 6} resultado={res} />
            <Ficha x={512} y={40 + i * 170} p={GEMELOS[i]} color={c.b} at={cP + 30 + i * 6} resultado={res} />
            <div style={{ position: "absolute", left: 400, top: 40 + i * 170 + 60, width: 112, textAlign: "center", fontSize: 30, color: c.c, opacity: transicion(frame, cProm + 10 + i * 6, fps, 400, EXPO_OUT) }}>+{t.y - GEMELOS[i].y}</div>
          </React.Fragment>
        ))}
        <Sube at={cProm + 34} style={{ position: "absolute", left: 0, top: 570 }}>
          <div style={{ fontSize: 34, fontWeight: 200 }}>
            promedio de las diferencias: <span style={{ fontFamily: serif, fontSize: 52, color: c.c }}>+{Math.round(prom)}</span> <span style={{ fontSize: 24, color: v.ceniza }}>· ilustrativo</span>
          </div>
        </Sube>
      </Escenario>
    </Escena>
  );
};

// ─── La fórmula del efecto en los tratados ────────────────────────────────────
export const FormulaEsc: React.FC = () => {
  const frame = useCurrentFrame();
  const cF = useCue("formula");
  const cA = useCue("att");
  const activas = frame >= cA ? ["att"] : frame >= cF ? ["n", "yi", "yj"] : [];
  return (
    <Escena>
      <Rotulo at={cF}>La fórmula</Rotulo>
      <Cinetico at={cF + 4} texto="El efecto en|los *tratados.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={700} style={{ marginTop: 40 }}>
        <Foco activas={activas}>
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <Formula tam={68}>
              <Entra at={cF + 4}>
                <V id="att" color={c.c} italica={false}>
                  ATT
                </V>
                <Op>=</Op>
                <Frac
                  arriba={<span>1</span>}
                  abajo={
                    <V id="n" color={v.azafran}>
                      n<Sub>T</Sub>
                    </V>
                  }
                />
                <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", lineHeight: 1, margin: "0 0.08em" }}>
                  <span style={{ fontSize: "1.3em", color: v.niebla }}>Σ</span>
                  <span style={{ fontSize: "0.4em", fontStyle: "italic", color: v.ceniza }}>i ∈ T</span>
                </span>
                (
                <V id="yi" color={v.azafran}>
                  Y<Sub>i</Sub>
                </V>
                <Op>−</Op>
                <V id="yj" color={c.b}>
                  Y<Sub>j(i)</Sub>
                </V>
                )
              </Entra>
            </Formula>
          </div>
        </Foco>
        <div style={{ position: "absolute", left: 0, right: 0, top: 220, display: "flex", flexDirection: "column", gap: 18 }}>
          <Nota at={cF + 20} color={v.azafran} tam={32}>
            <span style={{ fontFamily: serif, fontStyle: "italic" }}>Y</span>
            <sub>i</sub>: el resultado de cada persona tratada
          </Nota>
          <Nota at={cF + 28} color={c.b} tam={32}>
            <span style={{ fontFamily: serif, fontStyle: "italic" }}>Y</span>
            <sub>j(i)</sub>: el de su gemelo, el control más parecido
          </Nota>
          <Nota at={cF + 36} color={v.azafran} tam={32}>
            <span style={{ fontFamily: serif, fontStyle: "italic" }}>n</span>
            <sub>T</sub>: cuántos tratados hay; dividir por él es promediar
          </Nota>
          <Nota at={cA + 4} color={c.c} tam={32}>
            ATT: el efecto promedio <b style={{ fontWeight: 400 }}>en quienes recibieron</b> el tratamiento
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── La maldición de la dimensión ─────────────────────────────────────────────
export const Dimension: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("combinaciones");
  const cV = useCue("vacias");
  const k = Math.min(20, Math.max(1, Math.round(1 + 19 * transicion(frame, cC + 20, fps, 2200, EXPO_IN_OUT))));
  const celdas = 2 ** k;
  const lado = 32;
  const llenas = new Set(Array.from({ length: 60 }, (_, i) => (i * 389 + 17) % (lado * lado)));
  const vacias = transicion(frame, cV, fps, 600, EXPO_OUT);
  return (
    <Escena>
      <Rotulo at={cC}>El problema</Rotulo>
      <Cinetico at={cC + 4} texto="Demasiadas|*combinaciones.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <div style={{ position: "absolute", left: 0, top: 0, display: "flex", alignItems: "center", gap: 30 }}>
          <Formula tam={84}>
            <Entra at={cC + 8}>
              <span>2</span>
              <Sup>
                <span style={{ color: v.azafran, fontStyle: "italic" }}>{k}</span>
              </Sup>
              <Op>=</Op>
              <span style={{ color: c.c, fontVariantNumeric: "tabular-nums" }}>{celdas.toLocaleString("es-CL")}</span>
            </Entra>
          </Formula>
        </div>
        <div style={{ position: "absolute", left: 0, top: 130, fontSize: 28, fontWeight: 200, color: v.niebla }}>
          celdas posibles con <span style={{ color: v.azafran }}>k</span> características de sí o no
        </div>
        <div style={{ position: "absolute", left: 136, top: 200, display: "grid", gridTemplateColumns: `repeat(${lado}, 18px)`, gap: 2 }}>
          {Array.from({ length: lado * lado }, (_, i) => {
            const lleno = llenas.has(i);
            return <div key={i} style={{ width: 18, height: 18, borderRadius: 3, background: lleno ? v.azafran : vacias > 0 ? `rgba(255,92,108,${0.08 + 0.12 * vacias})` : "#1A1A20" }} />;
          })}
        </div>
        <Nota at={cV + 10} color={ROJO} style={{ position: "absolute", left: 0, top: 860 - 210 }} tam={30}>
          60 personas en 1.024 celdas: casi todas quedan vacías
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El puntaje de propensión ─────────────────────────────────────────────────
export const Propension: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("puntaje");
  const cR = useCue("resume");
  const k = transicion(frame, cR + 6, fps, 1200, EXPO_IN_OUT);
  const puntos = Array.from({ length: 26 }, (_, i) => {
    const trat = i % 2 === 0;
    const base = trat ? 0.55 : 0.4;
    return { trat, e: Math.min(0.97, Math.max(0.03, base + ((((i * 9301 + 49297) % 233280) / 233280) * 2 - 1) * 0.33)) };
  });
  return (
    <Escena>
      <Rotulo at={cP}>Rosenbaum y Rubin, 1983</Rotulo>
      <Cinetico at={cP + 4} texto="Un solo|*número.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={720} style={{ marginTop: 40 }}>
        <div style={{ position: "absolute", left: 0, top: 0 }}>
          <Formula tam={76}>
            <Entra at={cP + 8}>
              <V color={c.c}>e</V>(<V color={c.d}>x</V>)<Op>=</Op>
              <V color={v.hueso} italica={false}>
                P
              </V>
              (<V color={v.azafran}>T</V>=1 | <V color={c.d}>X</V>=<V color={c.d}>x</V>)
            </Entra>
          </Formula>
        </div>
        <Nota at={cP + 30} color={c.c} style={{ position: "absolute", left: 0, top: 120 }} tam={30}>
          la probabilidad de recibir el tratamiento, dadas tus características
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 240, display: "flex", gap: 6, opacity: 1 - k }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} style={{ width: 38, height: 120, borderRadius: 6, background: i % 3 === 0 ? c.d : "#26262E", opacity: transicion(frame, cP + 40 + i, fps, 300, EXPO_OUT) }} />
          ))}
          <span style={{ alignSelf: "center", fontSize: 26, color: v.niebla, marginLeft: 12 }}>20 columnas</span>
        </div>
        <svg width={912} height={260} style={{ position: "absolute", left: 0, top: 400, overflow: "visible", opacity: k }}>
          <line x1={20} y1={110} x2={892} y2={110} stroke={v.ceniza} strokeWidth={3} />
          {[0, 0.5, 1].map((t) => (
            <text key={t} x={20 + 872 * t} y={170} textAnchor="middle" fontFamily={serif} fontSize={34} fill={v.hueso}>
              {String(t).replace(".", ",")}
            </text>
          ))}
          {puntos.map((p, i) => (
            <circle key={i} cx={20 + 872 * p.e} cy={p.trat ? 80 : 140} r={12} fill={p.trat ? v.azafran : c.b} opacity={transicion(frame, cR + 20 + i * 0.8, fps, 300, EXPO_OUT)} />
          ))}
          <text x={20} y={40} fontFamily={mono} fontSize={22} fill={v.azafran}>
            tratados
          </text>
          <text x={20} y={210} fontFamily={mono} fontSize={22} fill={c.b}>
            controles
          </text>
        </svg>
      </Escenario>
    </Escena>
  );
};

// ─── La regresión logística ───────────────────────────────────────────────────
export const Logistica: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cL = useCue("logistica");
  const cCurva = useCueAt("logistica", 0.55);
  const activas = frame >= cCurva ? ["curva"] : frame >= cL + 20 ? ["suma"] : [];
  const k = transicion(frame, cCurva, fps, 1000, EXPO_IN_OUT);
  const pts: [number, number][] = [];
  return (
    <Escena>
      <Rotulo at={cL}>Cómo se estima</Rotulo>
      <Cinetico at={cL + 4} texto="Regresión|*logística.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={720} style={{ marginTop: 40 }}>
        <Foco activas={activas}>
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <Formula tam={64}>
              <Entra at={cL + 6}>
                <V color={c.c}>e</V>(<V color={c.d}>x</V>)<Op>=</Op>
                <V id="curva" color={c.c} italica={false}>
                  <Frac
                    arriba={<span>1</span>}
                    abajo={
                      <span>
                        1 + <i>e</i>
                        <span style={{ fontSize: "0.72em", position: "relative", top: "-0.7em", marginLeft: 4 }}>
                          −<i>z</i>
                        </span>
                      </span>
                    }
                  />
                </V>
              </Entra>
            </Formula>
            <Formula tam={52} style={{ marginTop: 18 }}>
              <Entra at={cL + 16}>
                <V id="suma" color={v.azafran} italica={false}>
                  <i>z</i> = β<Sub>0</Sub> + β<Sub>1</Sub>
                  <i>x</i>
                  <Sub>1</Sub> + … + β<Sub>k</Sub>
                  <i>x</i>
                  <Sub>k</Sub>
                </V>
              </Entra>
            </Formula>
          </div>
        </Foco>
        <Nota at={cL + 24} color={v.azafran} style={{ position: "absolute", left: 0, top: 290 }} tam={28}>
          <i>z</i>: una suma ponderada de tus características
        </Nota>
        <Nota at={cCurva + 4} color={c.c} style={{ position: "absolute", left: 0, top: 336 }} tam={28}>
          la curva en forma de S la deja entre 0 y 1
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 400 }}>
          <Ejes ancho={912} alto={300} x={[-6, 6]} y={[0, 1]} at={cCurva - 4} rotuloX="z, la suma ponderada →" rotuloY="e(x)" marcasX={[{ v: -6, t: "−6" }, { v: 0, t: "0" }, { v: 6, t: "+6" }]}>
            {({ px, py }) => {
              for (let i = 0; i <= 60; i++) {
                const x = -6 + (12 * i) / 60;
                pts[i] = [px(x), py(1 / (1 + Math.exp(-x)))];
              }
              return (
                <g>
                  <line x1={px(-6)} y1={py(0.5)} x2={px(6)} y2={py(0.5)} stroke={linea} strokeWidth={2} strokeDasharray="6 6" />
                  <Traza pts={pts} k={k} color={c.c} ancho={6} />
                </g>
              );
            }}
          </Ejes>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El costo de buscar gemelos ───────────────────────────────────────────────
export const Costo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cF = useCue("fuerza");
  const cO = useCue("ordenar");
  const k1 = transicion(frame, cF + 40, fps, 900, EXPO_OUT);
  const k2 = transicion(frame, cO + 30, fps, 900, EXPO_OUT);
  return (
    <Escena>
      <Rotulo at={cF}>Big O</Rotulo>
      <Cinetico at={cF + 4} texto="¿Cuánto cuesta|*buscar?*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={720} style={{ marginTop: 40 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 300 }} at={cF + 6} color={ROJO}>
          <Rol color={ROJO}>Contra todos</Rol>
          <Formula tam={64} style={{ marginTop: 10 }}>
            <V color={v.azafran} italica={false}>
              O
            </V>
            (<V color={v.azafran}>n</V>
            <Sub>T</Sub>
            <Op>·</Op>
            <V color={c.b}>n</V>
            <Sub>C</Sub>)
          </Formula>
          <div style={{ fontFamily: mono, fontSize: 30, marginTop: 14 }}>
            1.000 × 10.000 = <Cuenta at={cF + 40} hasta={10000000} ms={900} style={{ color: ROJO }} />
          </div>
          <div style={{ height: 22, borderRadius: 11, background: "#16161B", marginTop: 16 }}>
            <div style={{ height: 22, borderRadius: 11, width: `${100 * k1}%`, background: ROJO }} />
          </div>
        </Panel>
        <Panel caja={{ x: 0, y: 340, w: 912, h: 320 }} at={cO + 4} color={c.c}>
          <Rol color={c.c}>Ordenar por el puntaje y buscar en binario</Rol>
          <Formula tam={64} style={{ marginTop: 10 }}>
            <V color={c.c} italica={false}>
              O
            </V>
            (<V color={v.azafran}>n</V> log <V color={v.azafran}>n</V>)
          </Formula>
          <div style={{ fontFamily: mono, fontSize: 30, marginTop: 14 }}>
            ≈ <Cuenta at={cO + 30} hasta={146000} ms={900} style={{ color: c.c }} /> pasos
          </div>
          <div style={{ height: 22, borderRadius: 11, background: "#16161B", marginTop: 16 }}>
            <div style={{ height: 22, borderRadius: 11, width: `${1.46 * k2}%`, minWidth: k2 > 0 ? 8 : 0, background: c.c }} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 10 }}>ordenar 10.000 controles + 1.000 búsquedas de log₂ 10.000 ≈ 13 pasos</div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── Las pruebas: balance y solapamiento ──────────────────────────────────────
export const Pruebas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cB = useCue("balance");
  const cS = useCueAt("balance", 0.55);
  const vars = [
    ["edad", 0.34, 0.04],
    ["estudios", 0.28, 0.06],
    ["ingreso previo", 0.41, 0.03],
  ] as const;
  const despues = transicion(frame, cB + 40, fps, 900, EXPO_IN_OUT);
  const X = (s: number) => (s / 0.45) * 520;
  const curva = (centro: number, col: string, k: number) => {
    const p: [number, number][] = [];
    for (let i = 0; i <= 40; i++) {
      const x = i / 40;
      p.push([20 + 860 * x, 160 - 130 * Math.exp(-((x - centro) ** 2) / 0.03)]);
    }
    return <Traza pts={p} k={k} color={col} ancho={4} />;
  };
  return (
    <Escena>
      <Rotulo at={cB}>Las pruebas</Rotulo>
      <Cinetico at={cB + 4} texto="¿De verdad|se *parecen?*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <Rol>Balance · SMD por covariable</Rol>
        {vars.map(([n, antes, des], i) => {
          const s = antes + (des - antes) * despues;
          const ok = s < 0.1;
          return (
            <div key={n} style={{ position: "absolute", left: 0, top: 40 + i * 74, display: "flex", alignItems: "center", gap: 16, width: 912 }}>
              <span style={{ width: 230, fontSize: 28 }}>{n}</span>
              <div style={{ position: "relative", width: 520, height: 26 }}>
                <div style={{ width: X(s) * transicion(frame, cB + 10 + i * 4, fps, 600, EXPO_OUT), height: 26, borderRadius: 8, background: ok ? c.c : ROJO }} />
                <div style={{ position: "absolute", left: X(0.1), top: -10, width: 3, height: 46, background: v.hueso }} />
              </div>
              <span style={{ fontFamily: serif, fontSize: 34, color: ok ? c.c : ROJO }}>{s.toFixed(2).replace(".", ",")}</span>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 246 + X(0.1) - 20, top: 262, fontFamily: serif, fontSize: 26 }}>0,1</div>
        <div style={{ position: "absolute", left: 0, top: 330 }}>
          <Rol>Solapamiento · puntajes de tratados y controles</Rol>
        </div>
        <svg width={912} height={220} style={{ position: "absolute", left: 0, top: 370, overflow: "visible" }}>
          <rect x={20 + 860 * 0.25} y={10} width={860 * 0.45} height={160} fill={c.c} opacity={0.12 * transicion(frame, cS + 20, fps, 500, EXPO_OUT)} />
          {curva(0.4, c.b, transicion(frame, cS, fps, 900, EXPO_IN_OUT))}
          {curva(0.55, v.azafran, transicion(frame, cS + 8, fps, 900, EXPO_IN_OUT))}
          <text x={20 + 860 * 0.475} y={200} textAnchor="middle" fontFamily={mono} fontSize={22} fill={c.c} opacity={transicion(frame, cS + 20, fps, 500, EXPO_OUT)}>
            zona con gemelos para todos
          </text>
        </svg>
        <div style={{ position: "absolute", left: 0, top: 640, fontSize: 24, fontWeight: 200, color: v.ceniza }}>valores ilustrativos</div>
      </Escenario>
    </Escena>
  );
};

// ─── El límite y LaLonde ──────────────────────────────────────────────────────
export const Limite: React.FC = () => {
  const cO = useCue("oculto");
  const cL = useCue("lalonde");
  return (
    <Escena>
      <Rotulo at={cO}>El límite</Rotulo>
      <Cinetico at={cO + 4} texto="Solo empareja|lo que *mides.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={720} style={{ marginTop: 40 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 200 }} at={cO + 8} color={ROJO} discontinuo estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <EyeOff size={60} strokeWidth={1.4} color={ROJO} />
          <div>
            <Rol color={ROJO}>Lo que no está en tus datos</Rol>
            <div style={{ fontSize: 34, marginTop: 4 }}>motivación, contactos, salud</div>
            <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>siguen sesgando, por perfecto que sea el gemelo</div>
          </div>
        </Panel>
        <Panel caja={{ x: 0, y: 240, w: 912, h: 260 }} at={cL + 4} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <BookOpen size={60} strokeWidth={1.4} color={v.azafran} />
          <div>
            <Rol color={v.azafran}>LaLonde, 1986</Rol>
            <div style={{ fontSize: 30, lineHeight: 1.35, marginTop: 6 }}>con datos de un experimento de capacitación, los métodos sin experimento no recuperaban el efecto verdadero</div>
          </div>
        </Panel>
        <Sube at={cL + 60} style={{ position: "absolute", left: 0, top: 540, width: 912 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 200 }}>
            <GraduationCap size={40} strokeWidth={1.5} color={c.c} /> desde entonces: validar, contrastar y reportar la sensibilidad
          </div>
        </Sube>
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
        <Cinetico at={cCta} texto="Gemelos y|un *puntaje.*" style={{ fontSize: 100 }} />
        <div style={{ marginTop: 30, padding: "14px 20px", borderRadius: 20, border: `1.5px solid ${linea}`, background: relleno, display: "inline-block" }}>
          <Formula tam={44}>
            <V color={c.c}>e</V>(<V color={c.d}>x</V>)<Op>=</Op>
            <span>P</span>(<V color={v.azafran}>T</V>=1 | <V color={c.d}>x</V>)
          </Formula>
        </div>
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 30} style={{ marginTop: 20 }}>
          <Chip texto="Rosenbaum y Rubin (1983) · LaLonde (1986)" tam={20} />
        </Sube>
      </div>
    </Escena>
  );
};
