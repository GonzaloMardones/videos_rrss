import React from "react";
import { BrainCircuit, Check, GitBranch, Shuffle, TriangleAlert, Trees } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Traza } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 09/17";
const azar = (i: number) => {
  const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
};
// Efecto ilustrativo según la edad: τ(edad) = 13 − 0,25·edad (20 años → 8; 56 años → −1).
const tau = (edad: number) => 13 - 0.25 * edad;

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

const Barras: React.FC<{ at: number; atSplit: number; alto?: number }> = ({ at, atSplit, alto = 300 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const split = transicion(frame, atSplit, fps, 900, EXPO_IN_OUT);
  const k = transicion(frame, at, fps, 700, EXPO_OUT);
  const grupos: [string, number, string][] = [
    ["jóvenes", 8, c.c],
    ["adultos", 3, v.azafran],
    ["mayores", -1, ROJO],
  ];
  const base = alto * 0.7;
  const esc = 26;
  return (
    <div style={{ position: "relative", width: 912, height: alto + 60 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: base, height: 2, background: v.ceniza }} />
      {grupos.map(([n, e, col], i) => {
        const valor = 3.33 + (e - 3.33) * split;
        const h = Math.abs(valor) * esc * k;
        const x = 456 - 110 + (i - 1) * 300 * split;
        return (
          <div key={n} style={{ position: "absolute", left: x, width: 220, top: valor >= 0 ? base - h : base, height: h, background: split > 0.3 ? col : v.hueso, borderRadius: 12, opacity: i === 1 || split > 0.05 ? 1 : 0 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: valor >= 0 ? -54 : h + 6, textAlign: "center", fontFamily: serif, fontSize: 44, color: split > 0.3 ? col : v.hueso }}>
              {valor > 0 ? "+" : ""}
              {valor.toFixed(1).replace(".", ",")}
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, top: (valor >= 0 ? h : h + 54) + 20, textAlign: "center", fontSize: 28, opacity: split }}>{n}</div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const at = useCue("gancho");
  const cS = useCueAt("gancho", 0.3);
  const cE = useCueAt("gancho", 0.8);
  return (
    <Escena>
      <Escenario alto={480}>
        <Barras at={at + 4} atSplit={cS} />
      </Escenario>
      <div style={{ marginTop: 30 }}>
        <Cinetico at={cE} texto="El promedio|*escondía.*" style={{ fontSize: 110 }} />
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
      <Cinetico at={6} texto="Efectos|*heterogéneos.*" style={{ marginTop: 18, fontSize: 116 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>HTE y CATE · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── CATE ─────────────────────────────────────────────────────────────────────
export const Cate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cF = useCue("formula");
  const cX = useCue("x");
  const edades = Array.from({ length: 41 }, (_, i) => 18 + i);
  const k = transicion(frame, cX + 10, fps, 1200, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cF} titulo="El efecto,|*dado quién eres.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Formula tam={60}>
          <Entra at={cF + 6}>
            <V color={c.b}>τ</V>(<V color={c.d}>x</V>)<Op>=</Op>E[<V color={v.azafran}>Y(1)</V>
            <Op>−</Op>
            <V color={c.b}>Y(0)</V> | <V color={c.d}>X</V>=<V color={c.d}>x</V>]
          </Entra>
        </Formula>
        <Nota at={cX + 4} color={c.d} tam={28} style={{ marginTop: 16 }}>
          <i style={{ fontFamily: serif }}>x</i>: algo medido antes del tratamiento: edad, país, compras previas
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 200 }}>
          <Ejes ancho={912} alto={400} x={[18, 58]} y={[-3, 10]} at={cX} rotuloX="edad →" rotuloY="τ(edad)" marcasX={[{ v: 20, t: "20" }, { v: 40, t: "40" }, { v: 56, t: "56" }]}>
            {({ px, py }) => (
              <g>
                <line x1={px(18)} y1={py(0)} x2={px(58)} y2={py(0)} stroke={linea} strokeWidth={2} />
                {edades.map((e, i) => (
                  <circle key={i} cx={px(e)} cy={py(tau(e) + azar(i) * 1.6)} r={6} fill={v.ceniza} opacity={0.5 * k} />
                ))}
                <Traza pts={edades.map((e) => [px(e), py(tau(e))] as [number, number])} k={k} color={c.c} ancho={5} />
              </g>
            )}
          </Ejes>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Interacción ──────────────────────────────────────────────────────────────
export const Interaccion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cI = useCue("interaccion");
  const cB = useCue("beta3");
  const activas = frame >= cB ? ["b3"] : [];
  const k = transicion(frame, cB + 20, fps, 1000, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cI} titulo="Una regresión con|*interacción.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Foco activas={activas}>
          <Formula tam={52}>
            <Entra at={cI + 6}>
              <V>Y</V>
              <Op>=</Op>β<Sub>0</Sub>
              <Op>+</Op>β<Sub>1</Sub>
              <V color={v.azafran}>T</V>
              <Op>+</Op>β<Sub>2</Sub>
              <V color={c.d}>x</V>
              <Op>+</Op>
              <V id="b3" color={c.c} italica={false}>
                β<Sub>3</Sub>·<i>T</i>·<i>x</i>
              </V>
            </Entra>
          </Formula>
        </Foco>
        <div style={{ position: "absolute", left: 0, top: 120 }}>
          <Formula tam={44}>
            <Entra at={cB}>
              efecto(<V color={c.d}>x</V>)<Op>=</Op>β<Sub>1</Sub>
              <Op>+</Op>
              <V color={c.c} italica={false}>
                β<Sub>3</Sub>
              </V>
              <V color={c.d}>x</V>
              <Op>=</Op>13<Op>−</Op>
              <span style={{ color: c.c }}>0,25</span>·edad
            </Entra>
          </Formula>
        </div>
        <div style={{ position: "absolute", left: 0, top: 220 }}>
          <Ejes ancho={912} alto={340} x={[18, 58]} y={[9, 23]} at={cB + 10} rotuloX="edad →" rotuloY="ventas" marcasX={[{ v: 20, t: "20" }, { v: 56, t: "56" }]}>
            {({ px, py }) => {
              const ctl = (e: number) => 8 + 0.2 * e;
              const tr = (e: number) => ctl(e) + tau(e);
              return (
                <g>
                  <Traza pts={[[px(18), py(ctl(18))], [px(58), py(ctl(58))]]} k={k} color={c.b} ancho={5} />
                  <Traza pts={[[px(18), py(tr(18))], [px(58), py(tr(58))]]} k={k} color={v.azafran} ancho={5} />
                  <text x={px(20)} y={py(tr(20)) - 14} fontFamily={mono} fontSize={22} fill={v.azafran} opacity={k}>
                    tratados
                  </text>
                  <text x={px(20)} y={py(ctl(20)) + 34} fontFamily={mono} fontSize={22} fill={c.b} opacity={k}>
                    control
                  </text>
                  <line x1={px(22)} y1={py(ctl(22))} x2={px(22)} y2={py(tr(22))} stroke={c.c} strokeWidth={4} opacity={k} />
                  <line x1={px(52)} y1={py(ctl(52))} x2={px(52)} y2={py(tr(52))} stroke={c.c} strokeWidth={4} opacity={k} />
                </g>
              );
            }}
          </Ejes>
        </div>
        <Nota at={cB + 50} color={c.c} tam={26} style={{ position: "absolute", left: 0, top: 590 }}>
          la distancia entre las rectas se achica con la edad: eso es β₃ · ilustrativo
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── La trampa de los subgrupos ───────────────────────────────────────────────
export const Trampa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("trampa");
  const cortes = ["edad < 25", "edad < 30", "mujeres", "iOS", "Android", "Santiago", "regiones", "nuevos", "frecuentes", "noche", "mañana", "fin de semana", "móvil", "escritorio", "+40", "−40", "premium", "gratis", "norte", "sur"];
  return (
    <Escena>
      <Cabeza at={at} titulo="Buscar subgrupos|*a mano.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, width: 912 }}>
          {cortes.map((t, i) => {
            const on = i === 11 && frame >= at + 50;
            return (
              <div key={t} style={{ height: 76, borderRadius: 14, border: `2px solid ${on ? ROJO : linea}`, background: on ? `${ROJO}2a` : relleno, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: on ? ROJO : v.niebla, opacity: transicion(frame, at + 4 + i, fps, 300, EXPO_OUT) }}>
                {on ? "¡p = 0,03!" : t}
              </div>
            );
          })}
        </div>
        <Sube at={at + 70} style={{ position: "absolute", left: 0, top: 470, display: "flex", alignItems: "center", gap: 14, fontSize: 30 }}>
          <TriangleAlert size={40} strokeWidth={1.6} color={ROJO} /> 20 cortes: alguno sale por azar · idea 04
        </Sube>
      </Escenario>
    </Escena>
  );
};

// ─── Meta-learners ────────────────────────────────────────────────────────────
const Modelo: React.FC<{ x: number; y: number; w?: number; texto: React.ReactNode; color: string; at: number }> = ({ x, y, w = 280, texto, color, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 500, backOut);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: 120, boxSizing: "border-box", borderRadius: 18, border: `2.5px solid ${color}`, background: relleno, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, opacity: Math.min(1, k * 1.5), transform: `scale(${0.85 + 0.15 * Math.min(1, k)})` }}>
      <BrainCircuit size={40} strokeWidth={1.5} color={color} />
      <span style={{ fontFamily: serif, fontSize: 36 }}>{texto}</span>
    </div>
  );
};

export const Slearner: React.FC = () => {
  const at = useCue("slearner");
  const largo = useCueAt("slearner", 1) - at;
  return (
    <Escena>
      <Cabeza at={at} titulo="S-learner:|*un modelo.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <div style={{ display: "flex", gap: 10, fontFamily: mono, fontSize: 26 }}>
          {["x₁", "x₂", "…", "T"].map((t, i) => (
            <Sube key={t} at={at + largo * 0.25 + i * 4}>
              <div style={{ padding: "10px 18px", borderRadius: 12, border: `1.5px solid ${t === "T" ? v.azafran : linea}`, color: t === "T" ? v.azafran : v.hueso }}>{t}</div>
            </Sube>
          ))}
        </div>
        <Modelo x={316} y={110} texto={<i>μ(x, T)</i>} color={c.b} at={at + largo * 0.4} />
        <div style={{ position: "absolute", left: 0, top: 290 }}>
          <Formula tam={56}>
            <Entra at={at + largo * 0.65}>
              <V color={c.c}>τ̂</V>(<V color={c.d}>x</V>)<Op>=</Op>
              <i>μ</i>(<V color={c.d}>x</V>, <span style={{ color: v.azafran }}>1</span>)<Op>−</Op>
              <i>μ</i>(<V color={c.d}>x</V>, <span style={{ color: c.b }}>0</span>)
            </Entra>
          </Formula>
        </div>
        <Nota at={at + largo * 0.8} color={ROJO} tam={26} style={{ position: "absolute", left: 0, top: 410 }}>
          riesgo: si el modelo ignora T, el efecto estimado se encoge hacia cero
        </Nota>
      </Escenario>
    </Escena>
  );
};

export const Tlearner: React.FC = () => {
  const at = useCue("tlearner");
  const largo = useCueAt("tlearner", 1) - at;
  return (
    <Escena>
      <Cabeza at={at} titulo="T-learner:|*dos modelos.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Rol color={v.azafran}>solo tratados</Rol>
        <Modelo x={0} y={40} w={420} texto={<>μ₁(x)</>} color={v.azafran} at={at + largo * 0.25} />
        <div style={{ position: "absolute", left: 492, top: 0 }}>
          <Rol color={c.b}>solo control</Rol>
        </div>
        <Modelo x={492} y={40} w={420} texto={<>μ₀(x)</>} color={c.b} at={at + largo * 0.4} />
        <div style={{ position: "absolute", left: 0, top: 240 }}>
          <Formula tam={64}>
            <Entra at={at + largo * 0.6}>
              <V color={c.c}>τ̂</V>(<V color={c.d}>x</V>)<Op>=</Op>
              <V color={v.azafran}>μ₁</V>(<V color={c.d}>x</V>)<Op>−</Op>
              <V color={c.b}>μ₀</V>(<V color={c.d}>x</V>)
            </Entra>
          </Formula>
        </div>
        <Nota at={at + largo * 0.8} color={ROJO} tam={26} style={{ position: "absolute", left: 0, top: 370 }}>
          riesgo: los errores de dos modelos se suman en la resta
        </Nota>
      </Escenario>
    </Escena>
  );
};

export const Xlearner: React.FC = () => {
  const at = useCue("xlearner");
  const largo = useCueAt("xlearner", 1) - at;
  const pasos: [string, React.ReactNode, string][] = [
    ["1 · imputar en tratados", <>D₁ = Y − μ₀(x)</>, v.azafran],
    ["2 · imputar en control", <>D₀ = μ₁(x) − Y</>, c.b],
    ["3 · aprender y combinar", <>τ̂ = e·τ̂₀ + (1 − e)·τ̂₁</>, c.c],
  ];
  return (
    <Escena>
      <Cabeza at={at} titulo="X-learner:|*cruzar.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        {pasos.map(([t, f, col], i) => (
          <Panel key={t} caja={{ x: 0, y: i * 160, w: 912, h: 140 }} at={at + largo * (0.1 + i * 0.22)} color={col}>
            <Rol color={col}>{t}</Rol>
            <div style={{ fontFamily: serif, fontSize: 44, marginTop: 8 }}>{f}</div>
          </Panel>
        ))}
        <Nota at={at + largo * 0.78} color={c.c} tam={26} style={{ position: "absolute", left: 0, top: 500 }}>
          e: el puntaje de propensión · útil cuando un grupo es mucho más chico (Künzel y otros, 2019)
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Bosque causal ────────────────────────────────────────────────────────────
export const Bosque: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("bosque");
  const largo = useCueAt("bosque", 1) - at;
  const cH = at + largo * 0.6;
  const nodo = (x: number, y: number, t: string, col: string, a: number) => (
    <div style={{ position: "absolute", left: x - 120, top: y, width: 240, height: 76, borderRadius: 16, border: `2px solid ${col}`, background: relleno, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, opacity: transicion(frame, a, fps, 400, EXPO_OUT) }}>
      {t}
    </div>
  );
  const kH = transicion(frame, cH, fps, 600, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={at} titulo="Bosque causal:|dividir donde *cambia.*" tam={80} />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <svg width={912} height={300} style={{ position: "absolute", left: 0, top: 0 }}>
          {[
            [456, 76, 220, 150],
            [456, 76, 692, 150],
            [220, 226, 110, 300],
            [220, 226, 370, 300],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={linea} strokeWidth={3} opacity={transicion(frame, at + 16 + i * 6, fps, 400, EXPO_OUT)} />
          ))}
        </svg>
        {nodo(456, 0, "edad < 35", v.hueso, at + 10)}
        {nodo(220, 150, "compras > 2", v.hueso, at + 18)}
        {nodo(692, 150, "τ = −0,8", ROJO, at + 24)}
        <div style={{ position: "absolute", left: 0, top: 300, display: "flex", gap: 20 }}>
          {nodo(120, 0, "τ = +8,4", c.c, at + 30)}
          {nodo(380, 0, "τ = +4,1", v.azafran, at + 34)}
        </div>
        <div style={{ position: "absolute", left: 0, top: 410, display: "flex", alignItems: "center", gap: 14, opacity: transicion(frame, at + 40, fps, 400, EXPO_OUT) }}>
          <GitBranch size={36} strokeWidth={1.6} color={c.c} />
          <span style={{ fontSize: 28 }}>cada corte maximiza la diferencia de efectos, no el ajuste de ventas</span>
        </div>
        <div style={{ position: "absolute", left: 0, top: 490, width: 912, display: "flex", gap: 16, opacity: kH }}>
          {[
            ["mitad A", "decide los cortes", v.hueso],
            ["mitad B", "estima los efectos", c.c],
          ].map(([t, d, col]) => (
            <div key={t} style={{ flex: 1, height: 110, borderRadius: 18, border: `2px solid ${col}`, background: relleno, padding: "14px 20px", boxSizing: "border-box" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 28, color: col }}>
                <Shuffle size={28} strokeWidth={1.6} color={col} /> {t}
              </div>
              <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 6 }}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: 620, display: "flex", alignItems: "center", gap: 10, fontSize: 24, fontWeight: 200, color: v.niebla, opacity: kH }}>
          <Trees size={28} strokeWidth={1.6} color={v.ceniza} /> honestidad · Wager y Athey (2018) · valores ilustrativos
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Validar ──────────────────────────────────────────────────────────────────
export const Validar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("validar");
  const largo = useCueAt("validar", 1) - at;
  const grupos = [-0.6, 1.4, 3.1, 4.8, 7.2];
  return (
    <Escena>
      <Cabeza at={at} titulo="¿Cómo validas lo|que *nunca ves?*" tam={80} />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Ejes ancho={912} alto={440} x={[0.4, 5.6]} y={[-2, 9]} at={at + largo * 0.3} rotuloX="quintil del efecto predicho →" rotuloY="efecto real (datos nuevos)" marcasX={[1, 2, 3, 4, 5].map((n) => ({ v: n, t: `Q${n}` }))}>
          {({ px, py }) => (
            <g>
              <line x1={px(0.4)} y1={py(0)} x2={px(5.6)} y2={py(0)} stroke={linea} strokeWidth={2} />
              {grupos.map((g, i) => {
                const k = transicion(frame, at + largo * (0.4 + i * 0.08), fps, 500, EXPO_OUT);
                const h = py(0) - py(g);
                return <rect key={i} x={px(i + 1) - 60} y={g >= 0 ? py(0) - h * k : py(0)} width={120} height={Math.abs(h) * k} rx={10} fill={g >= 0 ? c.c : ROJO} />;
              })}
            </g>
          )}
        </Ejes>
        <Nota at={at + largo * 0.8} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 480 }}>
          sube en escalera: el modelo separa bien · ilustrativo
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
        <Cinetico at={cCta} texto="El promedio dice *si.*|El CATE dice *para quién.*" style={{ fontSize: 76 }} />
        <div style={{ marginTop: 30, padding: "14px 20px", borderRadius: 20, border: `1.5px solid ${linea}`, background: relleno, display: "inline-block" }}>
          <Formula tam={44}>
            <V color={c.b}>τ</V>(<V color={c.d}>x</V>)<Op>=</Op>E[<V color={v.azafran}>Y(1)</V> − <V color={c.b}>Y(0)</V> | <V color={c.d}>x</V>]
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
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 10/17 · uplift
          </div>
        </Sube>
      </div>
    </Escena>
  );
};

