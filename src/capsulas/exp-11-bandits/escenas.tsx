import React from "react";
import { Check, Dices, Megaphone, Newspaper, Ruler, Tag, TriangleAlert } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cuenta, Entra, Formula, Op, serif, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Traza } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 11/17";

// Densidad Beta(a, b) en x, normalizada a su máximo para dibujar.
const lgamma = (z: number): number => {
  const g = [76.18009172947, -86.50532032942, 24.01409824083, -1.231739572450, 0.001208650973866179, -0.000005395239384953];
  const x = z;
  let y = z;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.00000000019;
  for (const q of g) ser += q / ++y;
  return -tmp + Math.log((2.506628274631 * ser) / x);
};
const beta = (x: number, a: number, b: number) => Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - (lgamma(a) + lgamma(b) - lgamma(a + b)));

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

// Reparto del tráfico en el tiempo: A/B fijo frente a bandit.
const Reparto: React.FC<{ at: number; titulo: string; porcB: (i: number) => number; color?: string }> = ({ at, titulo, porcB }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div>
      <Rol>{titulo}</Rol>
      <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
        {Array.from({ length: 12 }, (_, i) => {
          const k = transicion(frame, at + i * 3, fps, 300, EXPO_OUT);
          const b = porcB(i);
          return (
            <div key={i} style={{ width: 70, height: 150, display: "flex", flexDirection: "column", borderRadius: 10, overflow: "hidden", opacity: k }}>
              <div style={{ height: `${b}%`, background: c.c }} />
              <div style={{ flex: 1, background: c.b, opacity: 0.55 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const at = useCue("gancho");
  const largo = useCueAt("gancho", 1) - at;
  return (
    <Escena>
      <Escenario alto={500}>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            ["A", "5 %", c.b],
            ["B", "6 %", c.c],
          ].map(([n, p, col]) => (
            <Panel key={n} caja={{ x: 0, y: 0, w: 440, h: 120 }} at={at + 4} color={col} estilo={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: mono, fontSize: 34 }}>versión {n}</span>
              <span style={{ fontFamily: serif, fontSize: 52, color: col }}>{p}</span>
            </Panel>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: 150, width: 912 }}>
          {[
            ["A/B 50/50", 100, ROJO, at + largo * 0.4],
            ["bandit", 25, c.c, at + largo * 0.75],
          ].map(([t, n, col, a]) => (
            <Sube key={t as string} at={a as number} style={{ marginTop: 26 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32 }}>
                <span>{t}</span>
                <span style={{ fontFamily: serif, fontSize: 48, color: col as string }}>
                  −<Cuenta at={a as number} hasta={n as number} ms={700} /> conversiones
                </span>
              </div>
              <div style={{ height: 30, borderRadius: 10, background: "#16161B", marginTop: 8 }}>
                <div style={{ height: 30, width: `${(n as number) * 0.9}%`, borderRadius: 10, background: col as string }} />
              </div>
            </Sube>
          ))}
        </div>
      </Escenario>
      <div style={{ marginTop: 10 }}>
        <Cinetico at={at + largo * 0.85} texto="Ganar *mientras* aprendes." style={{ fontSize: 88 }} />
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
      <Cinetico at={6} texto="*Bandits.*" style={{ marginTop: 18, fontSize: 150 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>y muestreo de Thompson · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── El dilema ────────────────────────────────────────────────────────────────
export const Dilema: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("maquinas");
  const cD = useCue("dilema");
  return (
    <Escena>
      <Cabeza at={cM} titulo="Explorar o|*explotar.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <div style={{ display: "flex", gap: 20 }}>
          {["?", "?", "?"].map((q, i) => (
            <div key={i} style={{ width: 280, height: 220, borderRadius: 24, border: `2.5px solid ${[c.b, c.c, v.azafran][i]}`, background: relleno, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, opacity: transicion(frame, cM + 6 + i * 6, fps, 400, EXPO_OUT) }}>
              <Dices size={60} strokeWidth={1.4} color={[c.b, c.c, v.azafran][i]} style={{ transform: `rotate(${Math.sin(frame / 8 + i) * 12}deg)` }} />
              <div style={{ fontFamily: serif, fontSize: 52 }}>{q}</div>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: 270, width: 912, display: "flex", gap: 16 }}>
          {[
            ["solo explorar", "pierdes probando", c.b],
            ["solo explotar", "puedes quedarte con la equivocada", ROJO],
          ].map(([t, d, col], i) => (
            <div key={t} style={{ flex: 1, height: 170, borderRadius: 20, border: `2px solid ${col}`, background: relleno, padding: "16px 20px", boxSizing: "border-box", opacity: transicion(frame, cD + 6 + i * 20, fps, 400, EXPO_OUT) }}>
              <div style={{ fontSize: 32, color: col }}>{t}</div>
              <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 8 }}>{d}</div>
            </div>
          ))}
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El arrepentimiento ───────────────────────────────────────────────────────
export const Regret: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cR = useCue("regret");
  const cC = useCue("cien");
  const res = transicion(frame, cC + 40, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cR} titulo="Lo que pierdes:|el *arrepentimiento.*" tam={80} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Formula tam={56}>
          <Entra at={cR + 8}>
            arrepentimiento<Op>=</Op>Σ<sub style={{ fontSize: "0.45em" }}>t</sub>(<V color={c.c}>p*</V>
            <Op>−</Op>
            <V color={v.azafran}>p</V>
            <sub style={{ fontSize: "0.5em" }}>elegida</sub>)
          </Entra>
        </Formula>
        <Nota at={cR + 30} color={c.c} tam={28} style={{ marginTop: 16 }}>
          <i style={{ fontFamily: serif }}>p*</i>: la tasa de la mejor versión, que no conoces
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 260 }}>
          <Formula tam={60}>
            <Entra at={cC}>
              10.000<Op>×</Op>(0,06<Op>−</Op>0,05)<Op>=</Op>
              <span style={{ color: ROJO, fontSize: 84, display: "inline-block", transform: `scale(${res})` }}>100</span>
            </Entra>
          </Formula>
          <Nota at={cC + 20} color={ROJO} tam={28} style={{ marginTop: 14 }}>
            A/B 50/50 con 20.000 visitas: la mitad va a la peor
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Thompson ─────────────────────────────────────────────────────────────────
export const Thompson: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cB = useCue("beta");
  const cS = useCue("sorteo");
  const cP = useCue("proporcion");
  const xs = Array.from({ length: 121 }, (_, i) => 0.005 + (i / 120) * 0.14);
  const k = transicion(frame, cB + 30, fps, 900, EXPO_IN_OUT);
  const A = [11, 191];
  const B = [13, 189];
  const max = Math.max(...xs.map((x) => Math.max(beta(x, A[0], A[1]), beta(x, B[0], B[1]))));
  const ciclo = Math.floor(Math.max(0, frame - cS) / 18);
  const sa = 0.055 + 0.025 * Math.sin(ciclo * 2.1);
  const sb = 0.065 + 0.025 * Math.sin(ciclo * 1.3 + 1);
  const gana = sb > sa ? "B" : "A";
  return (
    <Escena>
      <Cabeza at={cB} titulo="Muestreo|de *Thompson.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Formula tam={50}>
          <Entra at={cB + 6}>
            <V color={c.b}>θ</V>
            <sub style={{ fontSize: "0.5em" }}>A</sub>
            <Op>~</Op>Beta(<span style={{ color: c.c }}>éxitos</span> + 1, <span style={{ color: ROJO }}>fracasos</span> + 1)
          </Entra>
        </Formula>
        <div style={{ position: "absolute", left: 0, top: 110 }}>
          <Ejes ancho={912} alto={340} x={[0.005, 0.145]} y={[0, 1.1]} at={cB + 24} rotuloX="conversión →" marcasX={[{ v: 0.02, t: "2 %" }, { v: 0.05, t: "5 %" }, { v: 0.08, t: "8 %" }]}>
            {({ px, py }) => (
              <g>
                <Traza pts={xs.map((x) => [px(x), py(beta(x, A[0], A[1]) / max)] as [number, number])} k={k} color={c.b} ancho={4} />
                <Traza pts={xs.map((x) => [px(x), py(beta(x, B[0], B[1]) / max)] as [number, number])} k={k} color={c.c} ancho={4} />
                {frame >= cS ? (
                  <g>
                    <circle cx={px(sa)} cy={py(0.06)} r={12} fill={c.b} />
                    <circle cx={px(sb)} cy={py(0.06)} r={12} fill={c.c} />
                    <line x1={px(sa)} y1={py(0)} x2={px(sa)} y2={py(1)} stroke={c.b} strokeWidth={2} strokeDasharray="5 6" />
                    <line x1={px(sb)} y1={py(0)} x2={px(sb)} y2={py(1)} stroke={c.c} strokeWidth={2} strokeDasharray="5 6" />
                  </g>
                ) : null}
              </g>
            )}
          </Ejes>
        </div>
        {frame >= cS ? (
          <div style={{ position: "absolute", left: 0, top: 480, display: "flex", alignItems: "center", gap: 16, fontSize: 32 }}>
            <Dices size={40} strokeWidth={1.5} color={v.azafran} /> esta visita ve la versión
            <span style={{ fontFamily: mono, fontSize: 40, color: gana === "B" ? c.c : c.b }}>{gana}</span>
          </div>
        ) : null}
        <Nota at={cP + 4} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 570 }}>
          cada versión se muestra en proporción a la probabilidad de que sea la mejor
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Aprende ──────────────────────────────────────────────────────────────────
export const Aprende: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("aprende");
  const largo = useCueAt("aprende", 1) - at;
  const fase = transicion(frame, at + largo * 0.45, fps, 1000, EXPO_IN_OUT);
  const n = 100 + 900 * fase;
  const A = [1 + 0.05 * n, 1 + 0.95 * n];
  const B = [1 + 0.06 * n, 1 + 0.94 * n];
  const xs = Array.from({ length: 141 }, (_, i) => 0.005 + (i / 140) * 0.13);
  const max = Math.max(...xs.map((x) => Math.max(beta(x, A[0], A[1]), beta(x, B[0], B[1]))));
  const prob = Math.round(62 + 22 * fase);
  return (
    <Escena>
      <Cabeza at={at} titulo="Más datos,|curvas *separadas.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <div style={{ fontFamily: mono, fontSize: 30 }}>
          {Math.round(n).toLocaleString("es-CL")} visitas por versión
        </div>
        <div style={{ position: "absolute", left: 0, top: 60 }}>
          <Ejes ancho={912} alto={360} x={[0.005, 0.135]} y={[0, 1.1]} at={at} rotuloX="conversión →" marcasX={[{ v: 0.02, t: "2 %" }, { v: 0.05, t: "5 %" }, { v: 0.08, t: "8 %" }]}>
            {({ px, py }) => (
              <g>
                <path d={`M${px(xs[0])},${py(0)}L${xs.map((x) => `${px(x)},${py(beta(x, A[0], A[1]) / max)}`).join("L")}L${px(xs[140])},${py(0)}Z`} fill={c.b} opacity={0.18} />
                <path d={`M${px(xs[0])},${py(0)}L${xs.map((x) => `${px(x)},${py(beta(x, B[0], B[1]) / max)}`).join("L")}L${px(xs[140])},${py(0)}Z`} fill={c.c} opacity={0.18} />
                <Traza pts={xs.map((x) => [px(x), py(beta(x, A[0], A[1]) / max)] as [number, number])} k={1} color={c.b} ancho={4} />
                <Traza pts={xs.map((x) => [px(x), py(beta(x, B[0], B[1]) / max)] as [number, number])} k={1} color={c.c} ancho={4} />
              </g>
            )}
          </Ejes>
        </div>
        <div style={{ position: "absolute", left: 0, top: 480, fontFamily: serif, fontSize: 56 }}>
          P(B &gt; A) = <span style={{ color: c.c }}>{prob} %</span>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El resultado ─────────────────────────────────────────────────────────────
export const Resultado: React.FC = () => {
  const at = useCue("resultado");
  const largo = useCueAt("resultado", 1) - at;
  return (
    <Escena>
      <Cabeza at={at} titulo="El tráfico se va|a la *ganadora.*" tam={84} />
      <Escenario alto={680} style={{ marginTop: 40 }}>
        <Reparto at={at + 4} titulo="A/B fijo · 50/50 hasta el final" porcB={() => 50} />
        <div style={{ marginTop: 40 }}>
          <Reparto at={at + largo * 0.3} titulo="bandit · Thompson" porcB={(i) => Math.min(96, 50 + i * 4.2)} />
        </div>
        <div style={{ position: "absolute", left: 0, top: 470, display: "flex", gap: 30, fontSize: 28 }}>
          <span>
            <span style={{ color: c.c }}>■</span> versión B (6 %)
          </span>
          <span>
            <span style={{ color: c.b }}>■</span> versión A (5 %)
          </span>
        </div>
        <Nota at={at + largo * 0.6} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 540 }}>
          simulación: 87 % del tráfico a B y 25 conversiones perdidas, en vez de 100
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Cuándo usarlo ────────────────────────────────────────────────────────────
export const Cuando: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cO = useCue("ojo");
  const cU = useCue("usar");
  return (
    <Escena>
      <Cabeza at={cO} titulo="Optimiza,|*no mide.*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 160 }} at={cO + 6} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <TriangleAlert size={52} strokeWidth={1.5} color={ROJO} />
          <div style={{ fontSize: 30 }}>la peor versión recibe poco tráfico: el tamaño del efecto queda impreciso</div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 200, width: 912, display: "flex", gap: 16 }}>
          <div style={{ flex: 1, borderRadius: 20, border: `2px solid ${c.c}`, background: relleno, padding: "16px 20px", opacity: transicion(frame, cU, fps, 400, EXPO_OUT) }}>
            <Rol color={c.c}>Bandit</Rol>
            {[
              [Newspaper, "titulares"],
              [Megaphone, "creatividades"],
              [Tag, "promociones"],
            ].map(([I, t]) => {
              const Icono = I as typeof Tag;
              return (
                <div key={t as string} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, fontSize: 28 }}>
                  <Icono size={30} strokeWidth={1.6} color={c.c} /> {t as string}
                </div>
              );
            })}
          </div>
          <div style={{ flex: 1, borderRadius: 20, border: `2px solid ${v.azafran}`, background: relleno, padding: "16px 20px", opacity: transicion(frame, cU + 40, fps, 400, EXPO_OUT) }}>
            <Rol color={v.azafran}>A/B</Rol>
            {["saber cuánto vale", "métricas de guarda", "efectos que tardan"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, fontSize: 28 }}>
                <Ruler size={30} strokeWidth={1.6} color={v.azafran} /> {t}
              </div>
            ))}
          </div>
        </div>
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
        <Cinetico at={cCta} texto="A/B dice *cuánto.*|Bandit te hace *ganar.*" style={{ fontSize: 82 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 12/17 · control sintético
          </div>
        </Sube>
      </div>
    </Escena>
  );
};

