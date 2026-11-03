import React from "react";
import { CalendarDays, Check, CreditCard, FileCode2, Gavel, Ruler, Smartphone, Users, X as Equis } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Op, serif, V } from "../../estilos/vacio/mate";
import { c, Nota, Panel, ROJO, Rol } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Codigo, Escenario, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "Cuasi-experimentos · 02";

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

// ─── Gancho: tres situaciones sin sorteo ──────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("casos");
  const cS = useCue("sorteo");
  const largo = useCueAt("casos", 1) - cC;
  const casos: [typeof Gavel, string, string, string, number][] = [
    [CreditCard, "crédito", "solo si puntaje ≥ 650", c.c, 0.05],
    [Gavel, "ley", "rige desde el 1 de marzo", v.azafran, 0.4],
    [Smartphone, "app", "función en Chile antes que en Perú", c.b, 0.7],
  ];
  const kS = transicion(frame, cS, fps, 500, EXPO_OUT);
  return (
    <Escena>
      <Escenario alto={600}>
        {casos.map(([I, t, d, col, f], i) => (
          <Panel key={t} caja={{ x: 0, y: i * 150, w: 912, h: 130 }} at={cC + largo * f} color={col} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
            <I size={52} strokeWidth={1.5} color={col} />
            <div>
              <div style={{ fontSize: 26, color: v.niebla }}>{t}</div>
              <div style={{ fontSize: 34 }}>{d}</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, fontFamily: mono, fontSize: 24, color: ROJO, opacity: kS }}>
              <Equis size={30} strokeWidth={2} color={ROJO} /> sin sorteo
            </div>
          </Panel>
        ))}
      </Escenario>
      <div style={{ marginTop: 0 }}>
        <Cinetico at={cS + 20} texto="Sin sorteo.|*Con causalidad.*" style={{ fontSize: 92 }} />
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
      <Cinetico at={6} texto="¿Qué es un|*cuasi-experimento?*" style={{ marginTop: 18, fontSize: 112 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>serie Cuasi-experimentos · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Definición ───────────────────────────────────────────────────────────────
export const Definicion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cF = useCue("falta");
  const cD = useCue("decide");
  const largoF = useCueAt("falta", 1) - cF;
  const largoD = useCueAt("decide", 1) - cD;
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  const filas: [string, boolean, number][] = [
    ["tratamiento", true, 0.2],
    ["grupo de comparación", true, 0.4],
    ["sorteo", false, 0.75],
  ];
  const ok = (si: boolean) => (si ? <Check size={40} strokeWidth={2.2} color={c.c} /> : <Equis size={40} strokeWidth={2.2} color={ROJO} />);
  return (
    <Escena>
      <Cabeza at={cF} titulo="Le falta|*una sola cosa.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", fontFamily: mono, fontSize: 24, color: v.niebla, opacity: t(cF + 6) }}>
          <div style={{ width: 400 }} />
          <div style={{ width: 250, textAlign: "center" }}>experimento</div>
          <div style={{ width: 250, textAlign: "center", color: v.azafran }}>cuasi</div>
        </div>
        {filas.map(([n, cuasi, f]) => (
          <div key={n} style={{ display: "flex", alignItems: "center", marginTop: 18, padding: "14px 0", borderBottom: "1px solid #2A2A33", opacity: t(cF + largoF * f) }}>
            <div style={{ width: 400, fontSize: 34 }}>{n}</div>
            <div style={{ width: 250, display: "flex", justifyContent: "center" }}>{ok(true)}</div>
            <div style={{ width: 250, display: "flex", justifyContent: "center" }}>{ok(cuasi)}</div>
          </div>
        ))}
        <div style={{ position: "absolute", left: 0, top: 360, fontSize: 30, color: v.niebla, opacity: t(cD) }}>¿quién decide quién recibe el tratamiento?</div>
        <div style={{ position: "absolute", left: 0, top: 420, width: 912, display: "flex", gap: 16 }}>
          {[
            [Ruler, "una regla", 0.2],
            [CalendarDays, "una fecha", 0.32],
            [Users, "las personas", 0.45],
          ].map(([I, txt, f]) => {
            const Icono = I as typeof Ruler;
            return (
              <div key={txt as string} style={{ flex: 1, height: 170, borderRadius: 20, border: `2px solid ${v.azafran}`, background: relleno, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, opacity: t(cD + largoD * (f as number)) }}>
                <Icono size={50} strokeWidth={1.5} color={v.azafran} />
                <div style={{ fontSize: 30 }}>{txt as string}</div>
              </div>
            );
          })}
        </div>
        <Nota at={cD + largoD * 0.7} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 620 }}>
          Shadish, Cook y Campbell (2002), Experimental and Quasi-Experimental Designs for Generalized Causal Inference
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El mecanismo de asignación ───────────────────────────────────────────────
export const Mecanismo: React.FC = () => {
  const frame = useCurrentFrame();
  const cM = useCue("mecanismo");
  const cD = useCue("depende");
  const fX = useCueAt("mecanismo", 0.72);
  const fY = useCueAt("mecanismo", 0.86);
  const largoD = useCueAt("depende", 1) - cD;
  const activas = frame >= cD ? [] : frame >= fY ? ["y"] : frame >= fX ? ["x"] : [];
  return (
    <Escena>
      <Cabeza at={cM} titulo="El mecanismo|*de asignación.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <Foco activas={activas}>
          <Formula tam={62}>
            <Entra at={cM + 8}>
              P(<V color={v.azafran}>T</V> = 1 |{" "}
              <V id="x" color={c.c}>
                X
              </V>
              ,{" "}
              <V id="y" color={c.b}>
                Y(0), Y(1)
              </V>
              )
            </Entra>
          </Formula>
        </Foco>
        <div style={{ position: "absolute", left: 0, top: 110, display: "flex", flexDirection: "column", gap: 10 }}>
          <Nota at={fX} color={c.c} tam={28}>
            <i style={{ fontFamily: serif }}>X</i>: tus características (región, historial, puntaje)
          </Nota>
          <Nota at={fY} color={c.b} tam={28}>
            <i style={{ fontFamily: serif }}>Y(0), Y(1)</i>: tus resultados posibles, sin y con tratamiento
          </Nota>
        </div>
        <Panel caja={{ x: 0, y: 270, w: 912, h: 150 }} at={cD + 4} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 26 }}>
          <Rol color={c.c}>experimento</Rol>
          <div style={{ fontFamily: serif, fontSize: 56, color: c.c }}>= 0,5</div>
          <div style={{ fontSize: 26, color: v.niebla }}>la fijas tú: no depende de nada</div>
        </Panel>
        <Panel caja={{ x: 0, y: 450, w: 912, h: 150 }} at={cD + largoD * 0.45} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 26 }}>
          <Rol color={v.azafran}>cuasi</Rol>
          <div style={{ fontFamily: serif, fontSize: 48, color: v.azafran, whiteSpace: "nowrap" }}>= f(fecha, región…)</div>
          <div style={{ fontSize: 26, color: v.niebla }}>depende de algo: ¿de qué?</div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── El sesgo de selección ────────────────────────────────────────────────────
export const Sesgo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cF = useCue("formula");
  const cS = useCue("sel");
  const cE = useCue("ejemplo");
  const largoF = useCueAt("formula", 1) - cF;
  const largoE = useCueAt("ejemplo", 1) - cE;
  const fA = cF + largoF * 0.6;
  const activas = frame >= cE ? [] : frame >= cS ? ["s"] : frame >= fA ? ["a"] : [];
  const kBar = transicion(frame, cE + largoE * 0.45, fps, 900, EXPO_IN_OUT);
  const kRojo = transicion(frame, cE + largoE * 0.7, fps, 600, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cF} titulo="Lo que ves =|*efecto + sesgo.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <Foco activas={activas}>
          <Formula tam={50}>
            <Entra at={cF + 6}>
              E[Y|T=1] − E[Y|T=0]
              <Op>=</Op>
            </Entra>
          </Formula>
          <div style={{ display: "flex", alignItems: "flex-start", marginTop: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Formula tam={50}>
                <Entra at={cF + 12}>
                  <V id="a" color={c.c} italica={false}>
                    ATT
                  </V>
                  <Op>+</Op>
                </Entra>
              </Formula>
              <span style={{ fontSize: 24, color: c.c, opacity: transicion(frame, fA, fps, 400, EXPO_OUT) }}>efecto en los tratados</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: 10 }}>
              <Formula tam={50}>
                <Entra at={cF + 16}>
                  <V id="s" color={ROJO} italica={false}>
                    E[Y(0)|T=1] − E[Y(0)|T=0]
                  </V>
                </Entra>
              </Formula>
              <span style={{ fontSize: 24, color: ROJO, opacity: transicion(frame, cS, fps, 400, EXPO_OUT) }}>sesgo de selección</span>
            </div>
          </div>
        </Foco>
        <Nota at={cS + 10} color={ROJO} tam={28} style={{ marginTop: 20 }}>
          cuánto se diferenciaban los grupos aunque nadie recibiera nada
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 300, width: 912, opacity: transicion(frame, cE, fps, 400, EXPO_OUT) }}>
          <div style={{ fontSize: 28 }}>agente de IA lanzado en las regiones con más demanda</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 20 }}>
            <span style={{ fontSize: 28, color: v.niebla }}>diferencia observada:</span>
            <span style={{ fontFamily: serif, fontSize: 72 }}>+12</span>
          </div>
          <div style={{ display: "flex", width: 912, height: 80, marginTop: 14, borderRadius: 14, overflow: "hidden", background: "#16161B" }}>
            <div style={{ width: `${(5 / 12) * 100 * kBar}%`, background: c.c, display: "flex", alignItems: "center", paddingLeft: 18, fontSize: 30, color: v.vacio, fontWeight: 600, whiteSpace: "nowrap" }}>efecto real +5</div>
            <div style={{ width: `${(7 / 12) * 100 * kRojo}%`, background: ROJO, display: "flex", alignItems: "center", paddingLeft: 18, fontSize: 30, color: v.vacio, fontWeight: 600, whiteSpace: "nowrap" }}>demanda previa +7</div>
          </div>
          <Nota at={cE + largoE * 0.9} color={v.niebla} tam={22} style={{ marginTop: 16 }}>
            ejemplo ilustrativo · descomposición: Angrist y Pischke (2009), Mostly Harmless Econometrics, cap. 2
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Mapa de diseños ──────────────────────────────────────────────────────────
const DISENOS: [string, string, string][] = [
  ["una fecha", "series de tiempo interrumpidas", "nada más cambia esa fecha"],
  ["un grupo y una fecha", "diferencias en diferencias", "tendencias paralelas"],
  ["un umbral", "regresión discontinua", "continuidad en el corte"],
  ["un empujón externo", "variable instrumental", "el empujón solo actúa vía T"],
  ["una sola unidad", "control sintético", "buen ajuste previo"],
];

export const Mapa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("mapa");
  const cD = useCue("disenos");
  const largo = useCueAt("disenos", 1) - cD;
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cM} titulo="Un sesgo,|*cinco antídotos.*" />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", fontFamily: mono, fontSize: 22, color: v.niebla, opacity: t(cM + 10) }}>
          <div style={{ width: 250 }}>si depende de…</div>
          <div style={{ width: 340 }}>diseño</div>
          <div style={{ flex: 1 }}>supuesto que defiendes</div>
        </div>
        {DISENOS.map(([dep, dis, sup], i) => (
          <div key={dis} style={{ display: "flex", alignItems: "center", marginTop: 14, padding: "18px 16px", borderRadius: 16, border: `2px solid ${[v.azafran, c.c, c.b, ROJO, v.niebla][i]}`, background: relleno, opacity: t(cD + largo * (0.03 + i * 0.19)) }}>
            <div style={{ width: 234, fontSize: 26 }}>{dep}</div>
            <div style={{ width: 340, fontSize: 28, color: [v.azafran, c.c, c.b, ROJO, v.hueso][i] }}>{dis}</div>
            <div style={{ flex: 1, fontSize: 22, fontWeight: 200, color: v.niebla }}>{sup}</div>
          </div>
        ))}
      </Escenario>
    </Escena>
  );
};

// ─── La asignación como código ────────────────────────────────────────────────
const K = "#C792EA";
const S = "#C3E88D";
const G = "#6B7280";
export const Asignacion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cF = useCue("funcion");
  const cH = useCue("hash");
  const cL = useCue("log");
  const largoH = useCueAt("hash", 1) - cH;
  const resaltar = frame >= cL ? [9] : frame >= cH + largoH * 0.4 ? [3, 5, 7] : frame >= cH ? [1] : [];
  return (
    <Escena>
      <Cabeza at={cF} titulo="La asignación|*es código.*" />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <Codigo
          caja={{ x: 0, y: 0, w: 912, h: 540 }}
          at={cF + 6}
          archivo="despliegue.ts"
          Icono={FileCode2}
          tam={24}
          escalon={5}
          resaltar={resaltar}
          lineas={[
            [["// experimento: sorteo con hash", G]],
            [["if ", K], ["(hash(usuario + "], ['"exp42"', S], [") % 100 < 10) agenteNuevo()"]],
            [["// cuasi → diferencias en diferencias", G]],
            [["if ", K], ["(region === "], ['"CL"', S], [") agenteNuevo()"]],
            [["// cuasi → regresión discontinua", G]],
            [["if ", K], ["(confianza < 0.7) escalarAHumano()"]],
            [["// cuasi → series interrumpidas", G]],
            [["if ", K], ["(hoy >= "], ['"2026-03-01"', S], [") agenteNuevo()"]],
            [[""]],
            [["log", c.c], ["({ usuario, regla, confianza, fecha })"]],
          ]}
        />
        <Panel caja={{ x: 0, y: 570, w: 912, h: 130 }} at={cL + 4} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Check size={46} strokeWidth={2} color={c.c} />
          <div style={{ fontSize: 30 }}>guardar la regla, el puntaje y la fecha es guardar la mitad del diseño</div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 720, fontSize: 22, fontWeight: 200, color: v.niebla, opacity: transicion(frame, cL + 30, fps, 400, EXPO_OUT) }}>
          asignación por hash: Kohavi, Tang y Xu (2020), cap. 4
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Bayes: ignorabilidad (Rubin 1978) ────────────────────────────────────────
export const Bayes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cR = useCue("rubin");
  const cG = useCue("garantiza");
  const largoR = useCueAt("rubin", 1) - cR;
  const largoG = useCueAt("garantiza", 1) - cG;
  const kTacha = transicion(frame, cR + largoR * 0.65, fps, 600, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cR} titulo="Cuándo puedes|*ignorar la asignación.*" tam={80} />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <Formula tam={54}>
          <Entra at={cR + 10}>
            P(T | X,{" "}
            <span style={{ position: "relative", display: "inline-block", color: c.b }}>
              Y(0), Y(1)
              <span style={{ position: "absolute", left: -4, right: -4, top: "50%", height: 5, background: ROJO, transform: `scaleX(${kTacha})`, transformOrigin: "left" }} />
            </span>
            )<Op>=</Op>P(T | X)
          </Entra>
        </Formula>
        <Nota at={cR + largoR * 0.7} color={ROJO} tam={28} style={{ marginTop: 16 }}>
          la asignación no depende de los resultados que no ves: es «ignorable»
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 230, width: 912, display: "flex", gap: 16 }}>
          <Panel caja={{ x: 0, y: 0, w: 448, h: 230 }} at={cG + 4} color={c.c} estilo={{ position: "relative" }}>
            <Rol color={c.c}>sorteo</Rol>
            <div style={{ fontSize: 30, marginTop: 14 }}>se cumple por diseño</div>
            <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 10 }}>el posterior del efecto no depende de cómo asignaste</div>
          </Panel>
          <Panel caja={{ x: 0, y: 0, w: 448, h: 230 }} at={cG + largoG * 0.4} color={v.azafran} estilo={{ position: "relative" }}>
            <Rol color={v.azafran}>cuasi</Rol>
            <div style={{ fontSize: 30, marginTop: 14 }}>argumentarlo o modelarlo</div>
            <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 10 }}>la regla de asignación entra en el modelo</div>
          </Panel>
        </div>
        <Nota at={cG + largoG * 0.8} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 500 }}>
          Rubin (1978), «Bayesian inference for causal effects: the role of randomization», Annals of Statistics 6(1)
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
        <Cinetico at={cCta} texto="Cuasi no es *casi.*|Es un supuesto|*que defiendes.*" style={{ fontSize: 88 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próximo: 03 · amenazas a la validez
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
