import React from "react";
import { CalendarDays, Check, Scale, Users, Waves } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cuenta, Entra, Foco, Formula, Frac, Op, Raiz, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Traza, ultimo } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Chip, Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 01/17";
const normal = (x: number, mu: number) => Math.exp(-((x - mu) ** 2) / 2) / Math.sqrt(2 * Math.PI);
// Función de distribución normal (aproximación de Abramowitz y Stegun, error < 1e-7).
const Phi = (x: number) => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
};

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("gancho");
  const dudas = useCueAt("gancho", 0.45);
  return (
    <Escena>
      <Escenario alto={480}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 220 }} at={at + 4} color={v.ceniza}>
          <Rol>Resultado del experimento</Rol>
          <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginTop: 14 }}>
            <span style={{ fontFamily: serif, fontSize: 84 }}>
              <i>p</i> = 0,21
            </span>
            <span style={{ fontSize: 34, color: v.ceniza }}>no significativo</span>
          </div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 270, display: "flex", gap: 18 }}>
          {[
            ["¿no funciona?", ROJO],
            ["¿muestra muy chica?", v.azafran],
          ].map(([t, col], i) => (
            <div key={t} style={{ padding: "14px 24px", borderRadius: 999, border: `2.5px solid ${col}`, background: relleno, fontSize: 34, color: col, opacity: transicion(frame, dudas + i * 14, fps, 400, EXPO_OUT), transform: `scale(${0.8 + 0.2 * transicion(frame, dudas + i * 14, fps, 400, backOut)})` }}>
              {t}
            </div>
          ))}
        </div>
      </Escenario>
      <div style={{ marginTop: 40 }}>
        <Cinetico at={dudas + 30} texto="No significativo|no es *no funciona.*" style={{ fontSize: 88 }} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, display: "flex", justifyContent: "center" }}>
      <Constelacion at={-60} ancho={700} forma="red" cantidad={520} />
    </div>
    <div style={{ marginTop: 450 }}>
      <Rotulo at={2}>{SERIE}</Rotulo>
      <Cinetico at={6} texto="Efecto mínimo|*detectable.*" style={{ marginTop: 18, fontSize: 112 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>MDE y poder estadístico · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Los dos errores ──────────────────────────────────────────────────────────
export const Errores: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("positivo");
  const cN = useCue("negativo");
  const cPoder = useCueAt("negativo", 0.55);
  const celda = (x: number, y: number, titulo: string, sub: string, col: string, at: number) => {
    const k = transicion(frame, at, fps, 500, backOut);
    return (
      <div style={{ position: "absolute", left: x, top: y, width: 330, height: 170, boxSizing: "border-box", borderRadius: 20, border: `2.5px solid ${col}`, background: `${col}14`, padding: "16px 18px", opacity: Math.min(1, k * 1.5), transform: `scale(${0.85 + 0.15 * Math.min(1, k)})` }}>
        <div style={{ fontSize: 32, color: col }}>{titulo}</div>
        <div style={{ fontFamily: serif, fontSize: 40, marginTop: 8 }}>{sub}</div>
      </div>
    );
  };
  return (
    <Escena>
      <Cabeza at={cP} titulo="Dos formas de|*equivocarse.*" />
      <Escenario alto={600} style={{ marginTop: 40 }}>
        <div style={{ position: "absolute", left: 240, top: 0, width: 690, display: "flex", fontSize: 24, fontWeight: 600, letterSpacing: "0.08em", color: v.ceniza }}>
          <span style={{ width: 345 }}>DICES: FUNCIONA</span>
          <span>DICES: NO FUNCIONA</span>
        </div>
        <div style={{ position: "absolute", left: 0, top: 110, width: 220, fontSize: 26, color: v.niebla }}>
          en realidad
          <br />
          <b style={{ fontWeight: 400, color: v.hueso }}>no hay efecto</b>
        </div>
        <div style={{ position: "absolute", left: 0, top: 300, width: 220, fontSize: 26, color: v.niebla }}>
          en realidad
          <br />
          <b style={{ fontWeight: 400, color: v.hueso }}>hay efecto</b>
        </div>
        {celda(240, 50, "falso positivo", "α = 5 %", ROJO, cP + 20)}
        {celda(586, 50, "correcto", "1 − α", v.ceniza, cP + 40)}
        {celda(586, 240, "falso negativo", "β", c.b, cN + 6)}
        {celda(240, 240, "poder", "1 − β", c.c, cPoder)}
        <Nota at={cPoder + 20} color={c.c} tam={30} style={{ position: "absolute", left: 0, top: 460 }}>
          poder: la probabilidad de detectar un efecto que sí existe
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Dos campanas ─────────────────────────────────────────────────────────────
export const Curvas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("campanas");
  const cCorte = useCue("corte");
  const cJunta = useCueAt("corte", 0.6);
  const kA = transicion(frame, cC + 6, fps, 900, EXPO_IN_OUT);
  const kB = transicion(frame, cC + 26, fps, 900, EXPO_IN_OUT);
  const kCorte = transicion(frame, cCorte, fps, 500, EXPO_OUT);
  const delta = 2.8 - 1.6 * transicion(frame, cJunta, fps, 1200, EXPO_IN_OUT);
  const crit = 1.96;
  const poder = 1 - Phi(crit - delta);
  const xs = Array.from({ length: 121 }, (_, i) => -3.5 + (i / 120) * 9);
  return (
    <Escena>
      <Cabeza at={cC} titulo="Dos *campanas.*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Ejes ancho={912} alto={420} x={[-3.5, 5.5]} y={[0, 0.45]} at={cC + 2} rotuloX="diferencia observada →">
          {({ px, py }) => {
            const area = (desde: number, hasta: number, mu: number) =>
              `M${px(desde)},${py(0)}L${xs
                .filter((x) => x >= desde && x <= hasta)
                .map((x) => `${px(x)},${py(normal(x, mu))}`)
                .join("L")}L${px(hasta)},${py(0)}Z`;
            return (
              <g>
                {kCorte > 0 ? (
                  <g opacity={kCorte}>
                    <path d={area(crit, 5.5, delta)} fill={c.c} opacity={0.3} />
                    <path d={area(-3.5, crit, delta)} fill={c.b} opacity={0.3} />
                    <path d={area(crit, 5.5, 0)} fill={ROJO} opacity={0.55} />
                    <line x1={px(crit)} y1={py(0)} x2={px(crit)} y2={py(0.45)} stroke={v.hueso} strokeWidth={3} strokeDasharray="8 8" />
                  </g>
                ) : null}
                <Traza pts={xs.map((x) => [px(x), py(normal(x, 0))] as [number, number])} k={kA} color={v.ceniza} ancho={4} />
                <Traza pts={xs.map((x) => [px(x), py(normal(x, delta))] as [number, number])} k={kB} color={v.azafran} ancho={4} />
                <text x={px(0)} y={py(0.43)} textAnchor="middle" fontFamily={mono} fontSize={22} fill={v.ceniza} opacity={kA}>
                  sin efecto
                </text>
                <text x={px(delta)} y={py(0.43)} textAnchor="middle" fontFamily={mono} fontSize={22} fill={v.azafran} opacity={kB}>
                  con efecto δ
                </text>
              </g>
            );
          }}
        </Ejes>
        {kCorte > 0 ? (
          <div style={{ position: "absolute", left: 0, top: 450, display: "flex", gap: 28, fontSize: 30, opacity: kCorte }}>
            <span>
              <span style={{ color: ROJO }}>■</span> α
            </span>
            <span>
              <span style={{ color: c.b }}>■</span> β
            </span>
            <span>
              <span style={{ color: c.c }}>■</span> poder
            </span>
          </div>
        ) : null}
        {kCorte > 0 ? (
          <div style={{ position: "absolute", left: 0, top: 520, fontFamily: serif, fontSize: 64, opacity: kCorte }}>
            poder = <span style={{ color: poder > 0.7 ? c.c : ROJO }}>{Math.round(poder * 100)} %</span>
          </div>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── La fórmula ───────────────────────────────────────────────────────────────
export const FormulaEsc: React.FC = () => {
  const frame = useCurrentFrame();
  const cF = useCue("formula");
  const cZ = useCue("z");
  const cS = useCue("sigma");
  const cR = useCue("raiz");
  const fase = ultimo(frame, [cZ, cS, cR]);
  const activas = [[], ["z"], ["s"], ["n"]][fase + 1];
  return (
    <Escena>
      <Cabeza at={cF} titulo="La *fórmula.*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Foco activas={activas}>
          <Formula tam={56}>
            <Entra at={cF + 6}>
              MDE
              <Op>=</Op>(
              <V id="z" color={v.azafran}>
                z<Sub>1−α/2</Sub>
              </V>
              <Op>+</Op>
              <V id="z" color={v.azafran}>
                z<Sub>1−β</Sub>
              </V>
              )<Op>·</Op>
              <V id="s" color={c.b}>
                σ
              </V>
              <Op>·</Op>
              <V id="n" color={c.c} italica={false}>
                <Raiz>
                  <span>
                    <Frac arriba="1" abajo={<i>n<Sub>T</Sub></i>} /> + <Frac arriba="1" abajo={<i>n<Sub>C</Sub></i>} />
                  </span>
                </Raiz>
              </V>
            </Entra>
          </Formula>
        </Foco>
        <div style={{ position: "absolute", left: 0, right: 0, top: 220, display: "flex", flexDirection: "column", gap: 18 }}>
          <Nota at={cZ + 4} color={v.azafran} tam={30}>
            cuánta seguridad pides: 1,96 por α = 5 % y 0,84 por 80 % de poder
          </Nota>
          <Nota at={cS + 4} color={c.b} tam={30}>
            <i style={{ fontFamily: serif }}>σ</i>: cuánto varía tu métrica de persona a persona
          </Nota>
          <Nota at={cR + 4} color={c.c} tam={30}>
            la muestra entra bajo una raíz: cuadruplicar <i style={{ fontFamily: serif }}>n</i> solo divide el MDE por dos
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── La regla del 16 ──────────────────────────────────────────────────────────
export const Regla: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("regla");
  const largo = useCueAt("regla", 1) - at;
  const res = transicion(frame, at + largo * 0.45, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={at} titulo="Todo cabe|en un *16.*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Formula tam={58}>
          <Entra at={at + 8}>
            <V>n</V>
            <Op>=</Op>
            <Frac
              arriba={
                <>
                  2(1,96 + 0,84)²<V color={c.b}>σ²</V>
                </>
              }
              abajo={<V color={v.azafran}>δ²</V>}
            />
          </Entra>
        </Formula>
        <div style={{ marginTop: 40 }}>
          <Formula tam={58}>
            <Entra at={at + largo * 0.25}>
              <Op>=</Op>
              <Frac
                arriba={
                  <>
                    15,7<V color={c.b}>σ²</V>
                  </>
                }
                abajo={<V color={v.azafran}>δ²</V>}
              />
              <Op>≈</Op>
              <span style={{ display: "inline-block", transform: `scale(${res})` }}>
                <Frac
                  arriba={
                    <>
                      <span style={{ color: c.c, fontSize: 88 }}>16</span>
                      <V color={c.b}>σ²</V>
                    </>
                  }
                  abajo={<V color={v.azafran}>δ²</V>}
                />
              </span>
            </Entra>
          </Formula>
        </div>
        <div style={{ position: "absolute", left: 0, top: 470, display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["α = 5 %", "poder 80 %", "50 / 50", "por grupo"].map((t, i) => (
            <span key={t} style={{ opacity: transicion(frame, at + largo * 0.5 + i * 5, fps, 400, EXPO_OUT) }}>
              <Chip texto={t} activo={i === 3} tam={26} />
            </span>
          ))}
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El ejemplo ───────────────────────────────────────────────────────────────
export const Ejemplo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("conversion");
  const cCu = useCue("cuenta");
  const cD = useCue("dias");
  const diasLlenos = Math.floor(15 * transicion(frame, cD + 6, fps, 1400, EXPO_IN_OUT));
  return (
    <Escena>
      <Cabeza at={cC} titulo="Un ejemplo|con *conversión.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            ["p = 10 %", "conversión", v.hueso],
            ["δ = 1 punto", "quieres detectar 10 → 11 %", v.azafran],
            ["σ² = p(1 − p) = 0,09", "varianza de un sí/no", c.b],
          ].map(([f, t, col], i) => (
            <Panel key={f} caja={{ x: 0, y: i * 104, w: 912, h: 90 }} at={cC + 4 + i * 10} estilo={{ display: "flex", alignItems: "center", gap: 20, padding: "0 20px" }}>
              <span style={{ fontFamily: serif, fontSize: 38, color: col, width: 420 }}>{f}</span>
              <span style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>{t}</span>
            </Panel>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: 340 }}>
          <Formula tam={56}>
            <Entra at={cCu}>
              <V>n</V>
              <Op>=</Op>
              <Frac arriba={<>16 × 0,09</>} abajo={<>0,01²</>} />
              <Op>=</Op>
              <span style={{ color: c.c }}>
                <Cuenta at={cCu + 20} hasta={14400} ms={900} />
              </span>
              <span style={{ fontSize: 30, fontFamily: "inherit", color: v.niebla, marginLeft: 12 }}>por grupo</span>
            </Entra>
          </Formula>
        </div>
        {frame >= cD ? (
          <div style={{ position: "absolute", left: 0, top: 500, width: 912 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30 }}>
              <CalendarDays size={36} strokeWidth={1.6} color={v.azafran} />
              28.800 personas ÷ 2.000 al día ≈ <span style={{ color: v.azafran }}>15 días</span>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
              {Array.from({ length: 15 }, (_, i) => (
                <div key={i} style={{ width: 54, height: 54, borderRadius: 10, border: `2px solid ${i < diasLlenos ? v.azafran : linea}`, background: i < diasLlenos ? `${v.azafran}55` : relleno }} />
              ))}
            </div>
          </div>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── El cuádruple ─────────────────────────────────────────────────────────────
export const Cuadruple: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("mitad");
  const k1 = transicion(frame, at + 10, fps, 700, EXPO_OUT);
  const k2 = transicion(frame, at + 30, fps, 1300, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={at} titulo="La mitad del efecto,|el *cuádruple* de datos." tam={76} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        {[
          ["δ = 1 punto", 14400, 220 * k1, v.azafran, at + 10],
          ["δ = 0,5 puntos", 57600, 880 * k2, ROJO, at + 30],
        ].map(([t, n, w, col, a], i) => (
          <div key={i} style={{ position: "absolute", left: 0, top: i * 200, width: 912 }}>
            <div style={{ fontFamily: serif, fontSize: 44, color: col as string }}>{t}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14 }}>
              <div style={{ height: 50, width: w as number, borderRadius: 12, background: col as string }} />
            </div>
            <div style={{ fontFamily: mono, fontSize: 34, marginTop: 10 }}>
              <Cuenta at={a as number} hasta={n as number} ms={i ? 1300 : 700} /> por grupo
            </div>
          </div>
        ))}
        <div style={{ position: "absolute", left: 0, top: 440, opacity: transicion(frame, at + 70, fps, 500, EXPO_OUT) }}>
          <Formula tam={64}>
            <V>n</V>
            <Op>∝</Op>
            <Frac arriba="1" abajo={<V color={v.azafran}>δ²</V>} />
            <span style={{ fontSize: 32, fontFamily: "inherit", color: v.niebla, marginLeft: 16 }}>el efecto entra al cuadrado</span>
          </Formula>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Las palancas ─────────────────────────────────────────────────────────────
export const Palancas: React.FC = () => {
  const at = useCue("palancas");
  const largo = useCueAt("palancas", 1) - at;
  const items: { Icono: typeof Users; t: string; d: React.ReactNode; col: string }[] = [
    { Icono: Users, t: "Más muestra", d: <>más tiempo o más tráfico: sube <i style={{ fontFamily: serif }}>n</i></>, col: c.c },
    { Icono: Waves, t: "Menos ruido", d: <>baja <i style={{ fontFamily: serif }}>σ</i>: la próxima idea, CUPED</>, col: c.b },
    { Icono: Scale, t: "Grupos parejos", d: <>90/10 necesita 2,8 veces la muestra de 50/50</>, col: v.azafran },
  ];
  return (
    <Escena>
      <Cabeza at={at} titulo="Tres *palancas.*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        {items.map((it, i) => (
          <Panel key={it.t} caja={{ x: 0, y: i * 160, w: 912, h: 140 }} at={at + largo * (0.1 + i * 0.2)} color={it.col} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
            <it.Icono size={50} strokeWidth={1.5} color={it.col} />
            <div>
              <div style={{ fontSize: 36 }}>{it.t}</div>
              <div style={{ fontSize: 27, fontWeight: 200, color: v.niebla }}>{it.d}</div>
            </div>
          </Panel>
        ))}
        <Sube at={at + largo * 0.7} style={{ position: "absolute", left: 0, top: 500 }}>
          <Formula tam={44}>
            <Frac arriba={<>1/0,1 + 1/0,9</>} abajo={<>1/0,5 + 1/0,5</>} />
            <Op>=</Op>
            <Frac arriba="11,1" abajo="4" />
            <Op>=</Op>
            <span style={{ color: v.azafran }}>2,8</span>
          </Formula>
        </Sube>
      </Escenario>
    </Escena>
  );
};

// ─── La trampa: la curva de poder ─────────────────────────────────────────────
export const Trampa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("trampa");
  const cDato = useCueAt("trampa", 0.5);
  const se = Math.sqrt((2 * 0.09) / 14400);
  const poder = (d: number) => 1 - Phi(1.96 - d / se);
  const xs = Array.from({ length: 61 }, (_, i) => (i / 60) * 0.015);
  const k = transicion(frame, at + 10, fps, 1200, EXPO_IN_OUT);
  const kP = transicion(frame, cDato, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={at} titulo="No significativo ≠|*no hay efecto.*" tam={80} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Ejes ancho={912} alto={440} x={[0, 0.015]} y={[0, 1]} at={at + 4} rotuloX="efecto real δ →" rotuloY="poder" marcasX={[{ v: 0.005, t: "0,5 pt" }, { v: 0.01, t: "1 pt" }]}>
          {({ px, py }) => (
            <g>
              <line x1={px(0)} y1={py(0.8)} x2={px(0.015)} y2={py(0.8)} stroke={linea} strokeWidth={2} strokeDasharray="6 6" />
              <Traza pts={xs.map((d) => [px(d), py(poder(d))] as [number, number])} k={k} color={c.c} ancho={5} />
              {kP > 0 ? (
                <g opacity={Math.min(1, kP)}>
                  <circle cx={px(0.005)} cy={py(poder(0.005))} r={14} fill={ROJO} />
                  <text x={px(0.005) + 22} y={py(poder(0.005)) + 10} fontFamily={serif} fontSize={40} fill={ROJO}>
                    29 %
                  </text>
                  <circle cx={px(0.01)} cy={py(poder(0.01))} r={14} fill={c.c} />
                  <text x={px(0.01) + 22} y={py(poder(0.01)) + 40} fontFamily={serif} fontSize={40} fill={c.c}>
                    80 %
                  </text>
                </g>
              ) : null}
            </g>
          )}
        </Ejes>
        <Nota at={cDato + 20} color={ROJO} tam={30} style={{ position: "absolute", left: 0, top: 480 }}>
          con 14.400 por grupo, un efecto real de medio punto se ve solo 3 de cada 10 veces
        </Nota>
        <Nota at={cDato + 40} color={c.c} tam={30} style={{ position: "absolute", left: 0, top: 570 }}>
          reporta el intervalo de confianza, no solo el p-valor
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
        <Cinetico at={cCta} texto="Calcúlalo|*antes* de lanzar." style={{ fontSize: 96 }} />
        <div style={{ marginTop: 30, padding: "14px 20px", borderRadius: 20, border: `1.5px solid ${linea}`, background: relleno, display: "inline-block" }}>
          <Formula tam={46}>
            <V>n</V>
            <Op>≈</Op>
            <Frac
              arriba={
                <>
                  16<V color={c.b}>σ²</V>
                </>
              }
              abajo={<V color={v.azafran}>δ²</V>}
            />
          </Formula>
        </div>
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 02/17 · CUPED
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
