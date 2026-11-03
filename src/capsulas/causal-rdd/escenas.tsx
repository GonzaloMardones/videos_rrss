import React from "react";
import { BookOpen, Check, Dices, GraduationCap, User, X } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Frac, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Traza, ultimo } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Chip, Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

// Datos ilustrativos: puntaje de 400 a 800, nota universitaria con un salto de 0,5 en el corte de 600.
const CORTE = 600;
const azar = (i: number) => (((i * 9301 + 49297) % 233280) / 233280) * 2 - 1;
const ALUMNOS = Array.from({ length: 72 }, (_, i) => {
  const x = 400 + ((i * 137) % 400) + azar(i + 7) * 3;
  const y = 3.1 + 0.004 * (x - 400) + (x >= CORTE ? 0.5 : 0) + azar(i) * 0.38;
  return { x, y };
});
const recta = (x: number, lado: 1 | -1) => 3.1 + 0.004 * (x - 400) + (lado === 1 ? 0.5 : 0);


const Dispersion: React.FC<{ at: number; ancho?: number; alto?: number; atRectas?: number; atSalto?: number; ventana?: number }> = ({ at, ancho = 912, alto = 460, atRectas, atSalto, ventana }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const kR = atRectas === undefined ? 0 : transicion(frame, atRectas, fps, 800, EXPO_IN_OUT);
  const kS = atSalto === undefined ? 0 : transicion(frame, atSalto, fps, 500, backOut);
  const lo = ventana === undefined ? 400 : CORTE - ventana;
  const hi = ventana === undefined ? 800 : CORTE + ventana;
  return (
    <Ejes ancho={ancho} alto={alto} x={[400, 800]} y={[2.6, 6.6]} at={at} rotuloX="puntaje →" rotuloY="nota en la universidad" marcasX={[{ v: 400, t: "400" }, { v: 600, t: "600" }, { v: 800, t: "800" }]}>
      {({ px, py }) => (
        <g>
          {ventana !== undefined ? <rect x={px(lo)} y={py(6.6)} width={px(hi) - px(lo)} height={py(2.6) - py(6.6)} fill={c.b} opacity={0.1} /> : null}
          <line x1={px(CORTE)} y1={py(2.6)} x2={px(CORTE)} y2={py(6.6)} stroke={v.hueso} strokeWidth={2.5} strokeDasharray="8 8" opacity={transicion(frame, at, fps, 500, EXPO_OUT)} />
          {ALUMNOS.map((a, i) => {
            const k = transicion(frame, at + 6 + i * 0.5, fps, 300, EXPO_OUT);
            const fuera = a.x < lo || a.x > hi;
            return <circle key={i} cx={px(a.x)} cy={py(a.y)} r={7} fill={a.x >= CORTE ? v.azafran : c.b} opacity={k * (fuera ? 0.18 : 0.95)} />;
          })}
          <Traza pts={[[px(lo), py(recta(lo, -1))], [px(CORTE), py(recta(CORTE, -1))]]} k={kR} color={c.b} ancho={5} />
          <Traza pts={[[px(CORTE), py(recta(CORTE, 1))], [px(hi), py(recta(hi, 1))]]} k={kR} color={v.azafran} ancho={5} />
          {kS > 0 ? (
            <g opacity={Math.min(1, kS)}>
              <line x1={px(CORTE) + 14} y1={py(recta(CORTE, -1))} x2={px(CORTE) + 14} y2={py(recta(CORTE, 1))} stroke={c.c} strokeWidth={6} />
              <text x={px(CORTE) + 30} y={(py(recta(CORTE, -1)) + py(recta(CORTE, 1))) / 2 + 12} fontFamily={serif} fontStyle="italic" fontSize={44} fill={c.c}>
                τ
              </text>
            </g>
          ) : null}
        </g>
      )}
    </Ejes>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cBeca = useCue("beca");
  const cSesgo = useCue("sesgo");
  const k = transicion(frame, cBeca + 8, fps, 900, EXPO_OUT);
  return (
    <Escena>
      <Escenario alto={420}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 200 }} at={cBeca + 2} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <GraduationCap size={70} strokeWidth={1.4} color={v.azafran} />
          <div>
            <Rol color={v.azafran}>Beca universitaria</Rol>
            <div style={{ fontSize: 44, marginTop: 4 }}>
              puntaje <span style={{ fontFamily: serif }}>≥ 600</span>
            </div>
          </div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 250, width: 912, height: 40, borderRadius: 20, background: "#16161B" }}>
          <div style={{ width: `${(k * 100).toFixed(1)}%`, height: 40, borderRadius: 20, background: `linear-gradient(90deg, ${c.b} 0%, ${c.b} 50%, ${v.azafran} 50%, ${v.azafran} 100%)` }} />
          <div style={{ position: "absolute", left: "50%", top: -14, width: 4, height: 68, background: v.hueso }} />
          <div style={{ position: "absolute", left: "50%", top: 64, transform: "translateX(-50%)", fontFamily: mono, fontSize: 26 }}>600</div>
          <div style={{ position: "absolute", left: 0, top: 64, fontFamily: mono, fontSize: 22, color: v.ceniza }}>400</div>
          <div style={{ position: "absolute", right: 0, top: 64, fontFamily: mono, fontSize: 22, color: v.ceniza }}>800</div>
        </div>
      </Escenario>
      <div style={{ marginTop: 50 }}>
        <Cinetico at={cBeca + 30} texto="¿La beca sube|las *notas?*" style={{ fontSize: 100 }} />
        <Sube at={cSesgo + 10} style={{ marginTop: 26 }}>
          <div style={{ fontSize: 34, fontWeight: 200, color: v.niebla }}>
            comparar becados vs no becados mezcla la beca con <span style={{ color: ROJO }}>el talento previo</span>
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
      <Cinetico at={6} texto="Regresión|*discontinua.*" style={{ marginTop: 18, fontSize: 120 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── La idea: mirar el borde ──────────────────────────────────────────────────
export const Idea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cBorde = useCue("borde");
  const cSorteo = useCue("sorteo");
  const alumno = (x: number, puntaje: string, beca: boolean, at: number) => (
    <Panel caja={{ x, y: 0, w: 400, h: 400 }} at={at} color={beca ? v.azafran : c.b}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <User size={60} strokeWidth={1.4} color={beca ? v.azafran : c.b} />
        <div style={{ fontFamily: serif, fontSize: 64 }}>{puntaje}</div>
      </div>
      {[
        ["estudio previo", 0.72],
        ["ingreso familiar", 0.55],
        ["motivación", 0.66],
      ].map(([t, val], i) => (
        <div key={t as string} style={{ marginTop: 18 }}>
          <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla }}>{t}</div>
          <div style={{ height: 12, borderRadius: 6, background: "#16161B", marginTop: 6 }}>
            <div style={{ height: 12, borderRadius: 6, width: `${(val as number) * 100 * transicion(frame, at + 10 + i * 4, fps, 600, EXPO_OUT)}%`, background: v.ceniza }} />
          </div>
        </div>
      ))}
      <div style={{ marginTop: 20, fontSize: 30, color: beca ? v.azafran : v.ceniza }}>{beca ? "con beca" : "sin beca"}</div>
    </Panel>
  );
  return (
    <Escena>
      <Rotulo at={cBorde}>La idea</Rotulo>
      <Cinetico at={cBorde + 4} texto="Mira el *borde.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        {alumno(0, "599", false, cBorde + 10)}
        {alumno(512, "601", true, cBorde + 18)}
        <div style={{ position: "absolute", left: 412, top: 160, width: 88, textAlign: "center", fontFamily: serif, fontSize: 80, color: v.hueso, opacity: transicion(frame, cBorde + 30, fps, 400, EXPO_OUT) }}>≈</div>
        <Sube at={cSorteo + 4} style={{ position: "absolute", left: 0, top: 460, width: 912 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 200 }}>
            <Dices size={52} strokeWidth={1.4} color={c.c} /> junto al corte, quién recibe la beca es <span style={{ color: c.c }}>casi un sorteo</span>
          </div>
        </Sube>
      </Escenario>
    </Escena>
  );
};

// ─── Las tres piezas ──────────────────────────────────────────────────────────
export const Piezas: React.FC = () => {
  const frame = useCurrentFrame();
  const cA = useCue("asignacion");
  const cC = useCue("corte");
  const cT = useCue("tratamiento");
  const fase = ultimo(frame, [cA, cC, cT]);
  const activas = [[], ["x"], ["c"], ["d"]][fase + 1];
  return (
    <Escena>
      <Rotulo at={cA}>Tres piezas</Rotulo>
      <Cinetico at={cA + 4} texto="Puntaje, corte,|*tratamiento.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={700} style={{ marginTop: 40 }}>
        <Foco activas={activas}>
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <Formula tam={96}>
              <Entra at={cA + 6}>
                <V id="d" color={c.c}>
                  D
                </V>
                <Op>=</Op>
                <V id="d" color={c.c} italica={false}>
                  1
                </V>
                [
                <V id="x" color={v.azafran}>
                  X
                </V>
                <Op>≥</Op>
                <V id="c" color={c.d}>
                  c
                </V>
                ]
              </Entra>
            </Formula>
          </div>
        </Foco>
        <div style={{ position: "absolute", left: 0, right: 0, top: 200, display: "flex", flexDirection: "column", gap: 22 }}>
          <Nota at={cA + 12} color={v.azafran} tam={34}>
            <span style={{ fontFamily: serif, fontStyle: "italic", color: v.azafran }}>X</span>: la variable de asignación, el puntaje
          </Nota>
          <Nota at={cC + 4} color={c.d} tam={34}>
            <span style={{ fontFamily: serif, fontStyle: "italic", color: c.d }}>c</span>: el corte, 600
          </Nota>
          <Nota at={cT + 4} color={c.c} tam={34}>
            <span style={{ fontFamily: serif, fontStyle: "italic", color: c.c }}>D</span>: vale 1 si cruzaste el corte (beca) y 0 si no
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El salto ─────────────────────────────────────────────────────────────────
export const Salto: React.FC = () => {
  const frame = useCurrentFrame();
  const cG = useCue("grafico");
  const cF = useCue("formula");
  const activas = frame >= cF ? ["der", "izq"] : [];
  const lim = (dir: string, id: string, col: string) => (
    <V id={id} color={col} italica={false}>
      <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", lineHeight: 1 }}>
        <span>lím</span>
        <span style={{ fontSize: "0.42em", fontStyle: "italic" }}>x {dir} c</span>
      </span>
      <span style={{ marginLeft: 8 }}>
        E[<i>Y</i> | <i>X</i>=<i>x</i>]
      </span>
    </V>
  );
  return (
    <Escena>
      <Rotulo at={cG}>El efecto</Rotulo>
      <Cinetico at={cG + 4} texto="Es el *salto.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <Dispersion at={cG + 8} atRectas={cG + 40} atSalto={cG + 70} />
        <Foco activas={activas}>
          <div style={{ position: "absolute", left: 0, top: 500 }}>
            {frame >= cF ? (
              <Formula tam={50}>
                <Entra at={cF + 2}>
                  <V color={c.c}>τ</V>
                  <Op>=</Op>
                  {lim("↓", "der", v.azafran)}
                  <Op>−</Op>
                  {lim("↑", "izq", c.b)}
                </Entra>
              </Formula>
            ) : null}
          </div>
        </Foco>
        <Nota at={cF + 30} color={v.hueso} style={{ position: "absolute", left: 0, top: 630 }} tam={28}>
          lo que vale la nota justo a la derecha del corte, menos justo a la izquierda
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Estimar: rectas locales y la ventana ─────────────────────────────────────
export const Estimar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cR = useCue("rectas");
  const cV = useCue("ventana");
  const cAncha = useCueAt("ventana", 0.55);
  const angosta = transicion(frame, cV + 4, fps, 800, EXPO_IN_OUT);
  const ancha = transicion(frame, cAncha, fps, 800, EXPO_IN_OUT);
  const h = 100 - 60 * angosta + 140 * ancha;
  const etiqueta = frame >= cAncha ? "ancha: más datos, más sesgo" : frame >= cV ? "angosta: menos sesgo, más ruido" : "";
  return (
    <Escena>
      <Rotulo at={cR}>Estimar</Rotulo>
      <Cinetico at={cR + 4} texto="Una recta|a cada *lado.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <Dispersion at={cR - 10} atRectas={cR + 16} atSalto={cR + 40} ventana={h} />
        <div style={{ position: "absolute", left: 0, top: 500, display: "flex", alignItems: "center", gap: 20 }}>
          <Formula tam={56}>
            <V color={c.b}>h</V>
            <Op>=</Op>
            <span style={{ fontFamily: mono, fontSize: 40 }}>{Math.round(h)}</span>
          </Formula>
          <span style={{ fontSize: 28, fontWeight: 200, color: v.niebla }}>puntos a cada lado del corte</span>
        </div>
        {etiqueta ? (
          <div style={{ position: "absolute", left: 0, top: 600, fontSize: 32, color: c.b }}>
            ventana {etiqueta}
          </div>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── El diseño difuso ─────────────────────────────────────────────────────────
export const Difusa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cD = useCue("difusa");
  const cDiv = useCue("division");
  const k = transicion(frame, cD + 10, fps, 1000, EXPO_IN_OUT);
  const res = transicion(frame, cDiv + 40, fps, 500, backOut);
  return (
    <Escena>
      <Rotulo at={cD}>Diseño difuso</Rotulo>
      <Cinetico at={cD + 4} texto="Cuando el corte|solo *empuja.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <Ejes ancho={912} alto={330} x={[400, 800]} y={[0, 1]} at={cD + 4} rotuloY="probabilidad de beca" rotuloX="puntaje →" marcasX={[{ v: 400, t: "400" }, { v: 600, t: "600" }, { v: 800, t: "800" }]}>
          {({ px, py }) => (
            <g>
              <line x1={px(600)} y1={py(0)} x2={px(600)} y2={py(1)} stroke={v.hueso} strokeWidth={2.5} strokeDasharray="8 8" />
              <Traza pts={[[px(400), py(0.05)], [px(600), py(0.15)]]} k={k} color={c.b} ancho={5} />
              <Traza pts={[[px(600), py(0.75)], [px(800), py(0.85)]]} k={k} color={v.azafran} ancho={5} />
              <line x1={px(600) + 14} y1={py(0.15)} x2={px(600) + 14} y2={py(0.75)} stroke={c.d} strokeWidth={6} opacity={k} />
              <text x={px(600) + 30} y={py(0.45) + 10} fontFamily={serif} fontSize={34} fill={c.d} opacity={k}>
                +0,6
              </text>
            </g>
          )}
        </Ejes>
        <div style={{ position: "absolute", left: 0, top: 380 }}>
          {frame >= cDiv ? (
            <Formula tam={64}>
              <Entra at={cDiv}>
                <V color={c.c}>τ</V>
                <Sub>difuso</Sub>
                <Op>=</Op>
                <Frac arriba={<span style={{ color: c.c }}>salto en la nota</span>} abajo={<span style={{ color: c.d }}>salto en la beca</span>} />
                <Op>=</Op>
                <Frac arriba={<span style={{ color: c.c }}>0,3</span>} abajo={<span style={{ color: c.d }}>0,6</span>} />
                <Op>=</Op>
                <span style={{ color: v.azafran, fontSize: 84, display: "inline-block", transform: `scale(${res})` }}>0,5</span>
              </Entra>
            </Formula>
          ) : null}
        </div>
        <Nota at={cDiv + 50} color={v.hueso} style={{ position: "absolute", left: 0, top: 620 }} tam={28}>
          es una variable instrumental en el corte · números ilustrativos
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Las pruebas ──────────────────────────────────────────────────────────────
export const Pruebas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("manipulacion");
  const cP = useCue("placebo");
  const hist = (trampa: boolean, at: number) => (
    <svg width={400} height={170}>
      {Array.from({ length: 16 }, (_, i) => {
        const alto = (78 - Math.abs(i - 7.5) * 3 + (trampa && i === 8 ? 62 : 0) - (trampa && i === 7 ? 30 : 0)) * transicion(frame, at + i, fps, 400, EXPO_OUT);
        return <rect key={i} x={8 + i * 24} y={150 - alto} width={20} height={alto} rx={4} fill={i >= 8 ? v.azafran : c.b} />;
      })}
      <line x1={200} y1={10} x2={200} y2={156} stroke={v.hueso} strokeWidth={2.5} strokeDasharray="6 6" />
    </svg>
  );
  const sello = (at: number, ok: boolean) => (
    <div style={{ width: 54, height: 54, borderRadius: 27, background: ok ? c.c : ROJO, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${transicion(frame, at, fps, 400, backOut)})`, flexShrink: 0 }}>
      {ok ? <Check size={34} strokeWidth={3} color={v.vacio} /> : <X size={34} strokeWidth={3} color={v.vacio} />}
    </div>
  );
  return (
    <Escena>
      <Rotulo at={cM}>Las pruebas</Rotulo>
      <Cinetico at={cM + 4} texto="¿Alguien hizo|*trampa?*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 240 }} at={cM + 6} estilo={{ display: "flex", alignItems: "center", gap: 20 }}>
          {hist(false, cM + 8)}
          <div style={{ flex: 1, fontSize: 28, fontWeight: 200 }}>cuántos alumnos hay en cada puntaje: sin amontonarse en el borde</div>
          {sello(cM + 40, true)}
        </Panel>
        <Panel caja={{ x: 0, y: 260, w: 912, h: 240 }} at={cM + 50} color={ROJO} discontinuo estilo={{ display: "flex", alignItems: "center", gap: 20 }}>
          {hist(true, cM + 52)}
          <div style={{ flex: 1, fontSize: 28, fontWeight: 200 }}>muchos justo arriba de 600: manipulación (prueba de McCrary)</div>
          {sello(cM + 80, false)}
        </Panel>
        <Panel caja={{ x: 0, y: 520, w: 912, h: 180 }} at={cP + 4} estilo={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width={400} height={130}>
            <polyline points="8,90 200,64 392,38" fill="none" stroke={c.d} strokeWidth={5} opacity={transicion(frame, cP + 10, fps, 600, EXPO_OUT)} />
            <line x1={200} y1={10} x2={200} y2={124} stroke={v.hueso} strokeWidth={2.5} strokeDasharray="6 6" />
          </svg>
          <div style={{ flex: 1, fontSize: 28, fontWeight: 200 }}>el ingreso familiar no salta en el corte (placebo)</div>
          {sello(cP + 30, true)}
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── El límite y el origen ────────────────────────────────────────────────────
export const Limite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cL = useCue("local");
  const cO = useCue("origen");
  return (
    <Escena>
      <Rotulo at={cL}>El límite</Rotulo>
      <Cinetico at={cL + 4} texto="Un efecto|*local.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <Ejes ancho={912} alto={360} x={[400, 800]} y={[2.6, 6.6]} at={cL + 4} rotuloX="puntaje →" marcasX={[{ v: 400, t: "400" }, { v: 600, t: "600" }, { v: 800, t: "800" }]}>
          {({ px, py }) => (
            <g>
              <rect x={px(560)} y={py(6.6)} width={px(640) - px(560)} height={py(2.6) - py(6.6)} fill={c.c} opacity={0.16 * transicion(frame, cL + 14, fps, 500, EXPO_OUT)} />
              <text x={px(600)} y={py(6.4)} textAnchor="middle" fontFamily={mono} fontSize={22} fill={c.c} opacity={transicion(frame, cL + 14, fps, 500, EXPO_OUT)}>
                aquí vale
              </text>
              <Traza pts={[[px(400), py(recta(400, -1))], [px(600), py(recta(600, -1))]]} k={1} color={c.b} ancho={5} />
              <Traza pts={[[px(600), py(recta(600, 1))], [px(800), py(recta(800, 1))]]} k={1} color={v.azafran} ancho={5} />
              <text x={px(420)} y={py(5.6)} fontFamily={serif} fontSize={64} fill={ROJO} opacity={transicion(frame, cL + 40, fps, 400, backOut)}>
                ?
              </text>
            </g>
          )}
        </Ejes>
        <Panel caja={{ x: 0, y: 420, w: 912, h: 170 }} at={cO + 4} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <BookOpen size={56} strokeWidth={1.4} color={v.azafran} />
          <div>
            <Rol color={v.azafran}>El origen · 1960</Rol>
            <div style={{ fontSize: 32, marginTop: 4 }}>Thistlethwaite y Campbell</div>
            <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>certificados de mérito según un puntaje de corte</div>
          </div>
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
        <Cinetico at={cCta} texto="Un corte,|un *salto.*" style={{ fontSize: 100 }} />
        <div style={{ marginTop: 30, padding: "14px 20px", borderRadius: 20, border: `1.5px solid ${linea}`, background: relleno, display: "inline-block" }}>
          <Formula tam={44}>
            <V color={c.c}>τ</V>
            <Op>=</Op>
            <span style={{ color: v.azafran }}>Y(c⁺)</span>
            <Op>−</Op>
            <span style={{ color: c.b }}>Y(c⁻)</span>
          </Formula>
        </div>
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 30} style={{ marginTop: 20 }}>
          <Chip texto="datos de la beca: ilustrativos" tam={20} />
        </Sube>
      </div>
    </Escena>
  );
};
