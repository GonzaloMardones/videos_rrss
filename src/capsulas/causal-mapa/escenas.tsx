import React from "react";
import { Check, Gauge, Shuffle, TriangleAlert, X } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Formula, Frac, Op, Raiz, serif, Sup, V } from "../../estilos/vacio/mate";
import { c, Ejes, Media, Nota, Panel, ROJO, Rol, Sombrero, Traza } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { ancla, Cable, Cables, type Caja, Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const BLOQUES = {
  A: { nombre: "A · Diseñar y leer", color: v.azafran },
  B: { nombre: "B · A quién le sirve", color: c.b },
  C: { nombre: "C · Más métodos causales", color: c.c },
};
const azar = (i: number) => (((i * 9301 + 49297) % 233280) / 233280) * 2 - 1;

// La plantilla de cada idea: bloque, número, título y el área del visual.
const Punto: React.FC<{ at: number; n: number; bloque: keyof typeof BLOQUES; titulo: string; children: React.ReactNode; alto?: number }> = ({ at, n, bloque, titulo, children, alto = 700 }) => {
  const b = BLOQUES[bloque];
  return (
    <Escena>
      <Rotulo at={at} color={b.color}>
        {b.nombre} · {String(n).padStart(2, "0")}/17
      </Rotulo>
      <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: 84 }} />
      <Escenario alto={alto} style={{ marginTop: 34 }}>
        {children}
      </Escenario>
    </Escena>
  );
};

const Sello: React.FC<{ at: number; ok: boolean; x?: number; y?: number }> = ({ at, ok, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 400, backOut);
  return (
    <div style={{ position: x === undefined ? "static" : "absolute", left: x, top: y, width: 54, height: 54, borderRadius: 27, background: ok ? c.c : ROJO, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${k})`, flexShrink: 0 }}>
      {ok ? <Check size={34} strokeWidth={3} color={v.vacio} /> : <X size={34} strokeWidth={3} color={v.vacio} />}
    </div>
  );
};

// ─── Gancho y título ──────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cL = useCue("lanzar");
  const cM = useCue("mapa");
  const partes = Object.values(BLOQUES);
  return (
    <Escena>
      <Escenario alto={460}>
        <div style={{ position: "absolute", left: 0, top: 0, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, width: 912 }}>
          {Array.from({ length: 17 }, (_, i) => {
            const bloque = i < 7 ? partes[0] : i < 11 ? partes[1] : partes[2];
            const k = transicion(frame, cL + 4 + i * 2, fps, 400, backOut);
            const on = frame >= cM;
            return (
              <div key={i} style={{ height: 120, borderRadius: 18, border: `2px solid ${on ? bloque.color : linea}`, background: relleno, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 34, color: on ? bloque.color : v.hueso, opacity: Math.min(1, k * 1.5), transform: `scale(${0.7 + 0.3 * k})` }}>
                {String(i + 1).padStart(2, "0")}
              </div>
            );
          })}
        </div>
      </Escenario>
      <div style={{ marginTop: 30 }}>
        <Cinetico at={cL + 30} texto="17 ideas para no|creerle a un *falso positivo.*" style={{ fontSize: 76 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 30 }}>
          {partes.map((p, i) => (
            <Sube key={p.nombre} at={cM + 4 + i * 6}>
              <div style={{ fontSize: 32, color: p.color }}>{p.nombre}</div>
            </Sube>
          ))}
        </div>
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
      <Cinetico at={6} texto="El mapa de la|*experimentación.*" style={{ marginTop: 18, fontSize: 104 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── A1 · MDE y poder ─────────────────────────────────────────────────────────
export const Mde: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("mde");
  const cC = useCue("cuadruple");
  const k1 = transicion(frame, cC + 4, fps, 600, EXPO_OUT);
  const k2 = transicion(frame, cC + 14, fps, 900, EXPO_OUT);
  return (
    <Punto at={at} n={1} bloque="A" titulo="Efecto mínimo|*detectable.*">
      <Formula tam={80}>
        <Entra at={at + 10}>
          <V>n</V>
          <Op>≈</Op>
          <Frac
            arriba={
              <>
                16<V color={c.b}>σ²</V>
              </>
            }
            abajo={
              <>
                <V color={v.azafran}>δ²</V>
              </>
            }
          />
          <span style={{ fontSize: 30, fontFamily: "inherit", color: v.niebla, marginLeft: 16 }}>por grupo</span>
        </Entra>
      </Formula>
      <div style={{ position: "absolute", left: 0, top: 210, display: "flex", flexDirection: "column", gap: 8 }}>
        <Nota at={at + 30} color={c.b} tam={28}>
          <i style={{ fontFamily: serif }}>σ</i>: cuánto varía la métrica · <i style={{ fontFamily: serif }}>δ</i>: el efecto que quieres detectar
        </Nota>
        <Nota at={at + 40} color={v.hueso} tam={28}>
          16 ≈ 2·(1,96 + 0,84)²: significancia 5 % y poder 80 %
        </Nota>
      </div>
      <div style={{ position: "absolute", left: 0, top: 360, width: 912 }}>
        {[
          ["δ", "n", 200 * k1, v.azafran],
          ["δ / 2", "4n", 800 * k2, ROJO],
        ].map(([d, n, w, col], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, marginTop: i ? 26 : 0, opacity: frame >= cC ? 1 : 0 }}>
            <span style={{ fontFamily: serif, fontSize: 40, color: col as string, width: 100 }}>{d}</span>
            <div style={{ height: 36, width: w as number, borderRadius: 10, background: col as string }} />
            <span style={{ fontFamily: serif, fontSize: 40 }}>{n}</span>
          </div>
        ))}
      </div>
    </Punto>
  );
};

// ─── A2 · CUPED ───────────────────────────────────────────────────────────────
export const Cuped: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("cuped");
  const k = transicion(frame, at + 70, fps, 1200, EXPO_IN_OUT);
  const ancho = 0.16 - 0.08 * k;
  const pts: [number, number][] = [];
  return (
    <Punto at={at} n={2} bloque="A" titulo="CUPED: menos|ruido, *gratis.*">
      <Formula tam={64}>
        <Entra at={at + 8}>
          <V color={c.c}>Y</V>
          <span style={{ fontSize: "0.6em", verticalAlign: "0.9em", color: c.c }}>′</span>
          <Op>=</Op>
          <V>Y</V>
          <Op>−</Op>
          <V color={v.azafran}>θ</V>(<V color={c.b}>X</V>
          <Op>−</Op>
          <Media color={c.b}>X</Media>)
        </Entra>
      </Formula>
      <Nota at={at + 24} color={c.b} tam={28} style={{ position: "absolute", left: 0, top: 120 }}>
        <i style={{ fontFamily: serif }}>X</i>: la misma métrica antes del experimento · <i style={{ fontFamily: serif }}>θ</i> = Cov(Y, X) / Var(X)
      </Nota>
      <div style={{ position: "absolute", left: 0, top: 210 }}>
        <Ejes ancho={912} alto={300} x={[0, 1]} y={[0, 1.05]} at={at + 40}>
          {({ px, py }) => {
            for (let i = 0; i <= 80; i++) {
              const x = i / 80;
              pts[i] = [px(x), py(Math.exp(-((x - 0.5) ** 2) / (2 * ancho * ancho)) * (0.16 / ancho) * 0.5)];
            }
            return <Traza pts={pts} k={transicion(frame, at + 44, fps, 700, EXPO_OUT)} color={k > 0.5 ? c.c : v.ceniza} ancho={5} />;
          }}
        </Ejes>
      </div>
      <div style={{ position: "absolute", left: 0, top: 540, opacity: transicion(frame, at + 80, fps, 500, EXPO_OUT) }}>
        <Formula tam={52}>
          Var<Op>×</Op>(1 − <V color={v.azafran}>ρ²</V>)<Op>:</Op>
          <span style={{ fontSize: 34, fontFamily: "inherit", color: v.niebla }}>con ρ = 0,7, la varianza baja a la mitad</span>
        </Formula>
      </div>
    </Punto>
  );
};

// ─── A3 · Mirar antes de tiempo ───────────────────────────────────────────────
export const Peeking: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("peeking");
  const cSec = useCueAt("peeking", 0.7);
  const dias = 30;
  const p = Array.from({ length: dias }, (_, d) => 0.35 + 0.22 * Math.sin(d * 0.55) + 0.12 * azar(d) - (d === 11 ? 0.32 : 0));
  const k = transicion(frame, at + 6, fps, 1600, EXPO_IN_OUT);
  const kS = transicion(frame, cSec, fps, 900, EXPO_IN_OUT);
  return (
    <Punto at={at} n={3} bloque="A" titulo="No mires|*todos los días.*">
      <Ejes ancho={912} alto={420} x={[0, dias - 1]} y={[0, 0.8]} at={at + 2} rotuloX="días →" rotuloY="p-valor" marcasX={[{ v: 0, t: "1" }, { v: 29, t: "30" }]}>
        {({ px, py }) => (
          <g>
            <line x1={px(0)} y1={py(0.05)} x2={px(29)} y2={py(0.05)} stroke={v.azafran} strokeWidth={2.5} strokeDasharray="8 8" />
            <text x={px(29)} y={py(0.05) - 10} textAnchor="end" fontFamily={serif} fontSize={28} fill={v.azafran}>
              0,05
            </text>
            <Traza pts={p.map((y, d) => [px(d), py(Math.max(0.01, y))])} k={k} color={v.hueso} ancho={4} />
            {k > 0.4 ? (
              <g opacity={transicion(frame, at + 40, fps, 400, EXPO_OUT)}>
                <circle cx={px(11)} cy={py(Math.max(0.01, p[11]))} r={14} fill={ROJO} />
                <text x={px(11) + 20} y={py(Math.max(0.01, p[11])) + 50} fontFamily={mono} fontSize={22} fill={ROJO}>
                  “¡significativo!” un día
                </text>
              </g>
            ) : null}
            <Traza pts={Array.from({ length: 30 }, (_, d) => [px(d), py(Math.max(0.002, 0.05 * Math.pow((d + 1) / 30, 2.2)))] as [number, number])} k={kS} color={c.c} ancho={4} />
          </g>
        )}
      </Ejes>
      <Nota at={cSec + 10} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 470 }}>
        prueba secuencial: el umbral es más exigente al principio
      </Nota>
    </Punto>
  );
};

// ─── A4 · Comparaciones múltiples ─────────────────────────────────────────────
export const Multiples: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("multiples");
  const cCor = useCueAt("multiples", 0.62);
  return (
    <Punto at={at} n={4} bloque="A" titulo="20 métricas,|un *falso positivo.*">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 10, width: 912 }}>
        {Array.from({ length: 20 }, (_, i) => {
          const malo = i === 13 && frame >= at + 50;
          return (
            <div key={i} style={{ height: 70, borderRadius: 12, border: `2px solid ${malo ? ROJO : linea}`, background: malo ? `${ROJO}33` : relleno, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 22, color: malo ? ROJO : v.niebla, opacity: transicion(frame, at + 4 + i, fps, 300, EXPO_OUT) }}>
              m{i + 1}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 0, top: 200, display: "flex", flexDirection: "column", gap: 18 }}>
        <Formula tam={54}>
          <Entra at={at + 30}>
            20<Op>×</Op>0,05<Op>=</Op>
            <span style={{ color: ROJO }}>1</span>
            <span style={{ fontSize: 28, fontFamily: "inherit", color: v.niebla, marginLeft: 14 }}>falso positivo esperado</span>
          </Entra>
        </Formula>
        <Formula tam={54}>
          <Entra at={at + 44}>
            1<Op>−</Op>0,95<Sup>20</Sup>
            <Op>=</Op>
            <span style={{ color: ROJO }}>64 %</span>
            <span style={{ fontSize: 28, fontFamily: "inherit", color: v.niebla, marginLeft: 14 }}>de ver al menos uno</span>
          </Entra>
        </Formula>
      </div>
      <Panel caja={{ x: 0, y: 420, w: 912, h: 200 }} at={cCor} color={c.c}>
        <Rol color={c.c}>Corrección</Rol>
        <Formula tam={50} style={{ marginTop: 10 }}>
          Bonferroni<Op>:</Op>
          <Frac arriba={<V color={v.azafran}>α</V>} abajo={<V>m</V>} />
          <Op>=</Op>
          <Frac arriba="0,05" abajo="20" />
          <Op>=</Op>0,0025
        </Formula>
        <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 6 }}>o Benjamini-Hochberg: controla la tasa de falsos descubrimientos</div>
      </Panel>
    </Punto>
  );
};

// ─── A5 · SRM ─────────────────────────────────────────────────────────────────
export const Srm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("srm");
  const k = transicion(frame, at + 6, fps, 900, EXPO_OUT);
  return (
    <Punto at={at} n={5} bloque="A" titulo="¿Llegó la mitad|a cada *grupo?*">
      <div style={{ display: "flex", alignItems: "flex-end", gap: 60, height: 260, paddingLeft: 60 }}>
        {[
          ["A", 50800, v.azafran],
          ["B", 49200, c.b],
        ].map(([g, n, col]) => (
          <div key={g as string} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: mono, fontSize: 30, marginBottom: 8 }}>{(n as number).toLocaleString("es-CL")}</div>
            <div style={{ width: 200, height: (((n as number) - 45000) / 6000) * 200 * k, background: col as string, borderRadius: 12 }} />
            <div style={{ fontFamily: mono, fontSize: 28, marginTop: 8 }}>{g}</div>
          </div>
        ))}
        <div style={{ fontSize: 28, fontWeight: 200, color: v.niebla, paddingBottom: 40 }}>esperado: 50.000 y 50.000</div>
      </div>
      <div style={{ position: "absolute", left: 0, top: 330 }}>
        <Formula tam={58}>
          <Entra at={at + 30}>
            <V color={ROJO}>χ</V>
            <Sup>2</Sup>
            <Op>=</Op>Σ
            <Frac arriba={<>(O − E)²</>} abajo={<>E</>} />
            <Op>=</Op>
            <span style={{ color: ROJO }}>25,6</span>
          </Entra>
        </Formula>
      </div>
      <div style={{ position: "absolute", left: 0, top: 520, display: "flex", alignItems: "center", gap: 18, opacity: transicion(frame, at + 60, fps, 400, EXPO_OUT) }}>
        <TriangleAlert size={48} strokeWidth={1.6} color={ROJO} />
        <span style={{ fontSize: 32 }}>
          p &lt; 0,0001: <span style={{ color: ROJO }}>el experimento está roto</span>, no lo leas todavía
        </span>
      </div>
    </Punto>
  );
};

// ─── A6 · Métricas de guarda y de razón ───────────────────────────────────────
export const Guardas: React.FC = () => {
  const at = useCue("guardas");
  const cR = useCueAt("guardas", 0.55);
  const filas: [string, string, boolean][] = [
    ["conversión", "+2,1 %", true],
    ["latencia", "+0,4 %", true],
    ["cancelaciones", "+3,8 %", false],
  ];
  return (
    <Punto at={at} n={6} bloque="A" titulo="Lo que *no puede*|empeorar.">
      {filas.map(([m, d, ok], i) => (
        <Panel key={m} caja={{ x: 0, y: i * 110, w: 912, h: 92 }} at={at + 6 + i * 6} color={ok ? undefined : ROJO} estilo={{ display: "flex", alignItems: "center", gap: 20, padding: "0 20px" }}>
          <Gauge size={36} strokeWidth={1.6} color={i === 0 ? v.azafran : v.ceniza} />
          <span style={{ fontSize: 32, flex: 1 }}>
            {m} <span style={{ fontSize: 22, color: v.ceniza }}>{i === 0 ? "· principal" : "· guarda"}</span>
          </span>
          <span style={{ fontFamily: serif, fontSize: 38, color: ok ? v.hueso : ROJO }}>{d}</span>
          <Sello at={at + 30 + i * 6} ok={ok} />
        </Panel>
      ))}
      <div style={{ position: "absolute", left: 0, top: 380 }}>
        <Formula tam={56}>
          <Entra at={cR}>
            métrica de razón<Op>=</Op>
            <Frac arriba={<V color={v.azafran}>clics</V>} abajo={<V color={c.b}>sesiones</V>} />
          </Entra>
        </Formula>
        <Nota at={cR + 16} color={c.c} tam={28} style={{ marginTop: 14 }}>
          numerador y denominador varían juntos: la varianza se calcula con el método delta
        </Nota>
      </div>
    </Punto>
  );
};

// ─── A7 · Interferencia ───────────────────────────────────────────────────────
export const Interferencia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("interferencia");
  const cSol = useCueAt("interferencia", 0.5);
  const nodos = Array.from({ length: 14 }, (_, i) => ({ x: 70 + (i % 7) * 128 + (Math.floor(i / 7) % 2) * 50, y: 60 + Math.floor(i / 7) * 150 }));
  const contagio = transicion(frame, at + 30, fps, 900, EXPO_OUT);
  const bloques = transicion(frame, cSol, fps, 600, EXPO_OUT);
  return (
    <Punto at={at} n={7} bloque="A" titulo="Cuando tratar a uno|*afecta a otro.*">
      <svg width={912} height={290} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        {bloques > 0 ? (
          <g opacity={bloques}>
            <rect x={10} y={10} width={430} height={270} rx={20} fill={v.azafran} opacity={0.08} stroke={v.azafran} strokeWidth={2} />
            <rect x={470} y={10} width={432} height={270} rx={20} fill={c.b} opacity={0.08} stroke={c.b} strokeWidth={2} />
          </g>
        ) : null}
        {nodos.map((a, i) =>
          nodos.slice(i + 1).map((b, j) => (Math.hypot(a.x - b.x, a.y - b.y) < 190 ? <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={linea} strokeWidth={2} /> : null)),
        )}
        {nodos.map((n, i) => {
          const tratado = i === 3;
          const vecino = [2, 4, 9, 10].includes(i);
          const col = bloques > 0.5 ? (n.x < 455 ? v.azafran : c.b) : tratado ? v.azafran : vecino && contagio > 0.5 ? ROJO : v.ceniza;
          return <circle key={i} cx={n.x} cy={n.y} r={22} fill={relleno} stroke={col} strokeWidth={4} />;
        })}
      </svg>
      <Nota at={at + 40} hasta={cSol} color={ROJO} tam={28} style={{ position: "absolute", left: 0, top: 320 }}>
        el efecto se contagia a sus vecinos del grupo de control
      </Nota>
      <div style={{ position: "absolute", left: 0, top: 380, display: "flex", gap: 14 }}>
        {["por grupos", "por zonas", "alternando en el tiempo"].map((t, i) => (
          <Sube key={t} at={cSol + 10 + i * 8}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderRadius: 999, border: `2px solid ${c.c}`, background: relleno, fontSize: 28 }}>
              <Shuffle size={26} strokeWidth={1.6} color={c.c} /> {t}
            </div>
          </Sube>
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, top: 480, display: "flex", gap: 6, opacity: transicion(frame, cSol + 40, fps, 500, EXPO_OUT) }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ width: 70, height: 60, borderRadius: 10, background: i % 2 ? c.b : v.azafran, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 24, color: v.vacio }}>
            {i % 2 ? "B" : "A"}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, top: 554, fontSize: 24, fontWeight: 200, color: v.ceniza, opacity: transicion(frame, cSol + 40, fps, 500, EXPO_OUT) }}>switchback: cada hora, toda la zona en A o en B</div>
    </Punto>
  );
};

// ─── B8 · El zoológico de efectos ─────────────────────────────────────────────
export const Zoo: React.FC = () => {
  const at = useCue("zoo");
  const largo = useCueAt("zoo", 1) - at;
  const efectos: [string, string, string, string][] = [
    ["ATE", "en todos", "", v.hueso],
    ["ATT", "en los tratados", "T = 1", v.azafran],
    ["LATE", "en quienes el instrumento movió", "cumplidores", c.c],
    ["CATE", "en un subgrupo", "X = x", c.b],
  ];
  return (
    <Punto at={at} n={8} bloque="B" titulo="El zoológico|de *efectos.*">
      {efectos.map(([n, t, cond, col], i) => (
        <Panel key={n} caja={{ x: 0, y: i * 150, w: 912, h: 130 }} at={at + largo * (0.18 + i * 0.18)} color={col} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontFamily: mono, fontSize: 40, color: col, width: 120 }}>{n}</span>
          <div>
            <Formula tam={40}>
              E[<V color={v.azafran}>Y(1)</V>
              <Op>−</Op>
              <V color={c.b}>Y(0)</V>
              {cond ? <span style={{ color: col }}> | {cond}</span> : null}]
            </Formula>
            <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>{t}</div>
          </div>
        </Panel>
      ))}
    </Punto>
  );
};

// ─── B9 · HTE / CATE ──────────────────────────────────────────────────────────
export const Hte: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("hte");
  const cM = useCueAt("hte", 0.6);
  const grupos: [string, number][] = [
    ["18–29", 8],
    ["30–49", 3],
    ["50+", -1],
  ];
  return (
    <Punto at={at} n={9} bloque="B" titulo="Efectos|*heterogéneos.*">
      <Formula tam={62}>
        <Entra at={at + 6}>
          <V color={c.b}>τ</V>(<V color={c.d}>x</V>)<Op>=</Op>E[<V color={v.azafran}>Y(1)</V>
          <Op>−</Op>
          <V color={c.b}>Y(0)</V> | <V color={c.d}>X</V>=<V color={c.d}>x</V>]
        </Entra>
      </Formula>
      <div style={{ position: "absolute", left: 0, top: 130, width: 912, height: 260 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 170, height: 2, background: v.ceniza }} />
        {grupos.map(([g, e], i) => {
          const k = transicion(frame, at + 30 + i * 6, fps, 600, EXPO_OUT);
          const h = Math.abs(e) * 18 * k;
          return (
            <div key={g} style={{ position: "absolute", left: 60 + i * 290, width: 180, top: e >= 0 ? 170 - h : 170, height: h, background: e >= 0 ? c.c : ROJO, borderRadius: 10 }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: e >= 0 ? -44 : -44, textAlign: "center", fontFamily: serif, fontSize: 34, color: e >= 0 ? c.c : ROJO }}>
                {e > 0 ? "+" : ""}
                {e}
              </div>
            </div>
          );
        })}
        {grupos.map(([g], i) => (
          <div key={g} style={{ position: "absolute", left: 60 + i * 290, width: 180, top: 220, textAlign: "center", fontFamily: mono, fontSize: 24, color: v.niebla }}>
            {g} años
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, top: 440, display: "flex", flexWrap: "wrap", gap: 12 }}>
        {["S-learner", "T-learner", "X-learner", "bosque causal"].map((t, i) => (
          <Sube key={t} at={cM + i * 6}>
            <div style={{ padding: "10px 18px", borderRadius: 999, border: `2px solid ${i === 3 ? c.b : linea}`, background: relleno, fontFamily: mono, fontSize: 26, color: i === 3 ? c.b : v.hueso }}>{t}</div>
          </Sube>
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, top: 540, fontSize: 24, fontWeight: 200, color: v.ceniza }}>el promedio general (+3,3) escondía que a los mayores no les sirve · ilustrativo</div>
    </Punto>
  );
};

// ─── B10 · Uplift ─────────────────────────────────────────────────────────────
export const Uplift: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("uplift");
  const cQ = useCueAt("uplift", 0.6);
  const seg: [string, string, string, boolean][] = [
    ["Persuadibles", "compran solo si los tratas", c.c, true],
    ["Seguros", "compran igual", v.ceniza, false],
    ["Perdidos", "no compran igual", v.ceniza, false],
    ["No molestar", "el trato los espanta", ROJO, false],
  ];
  const k = transicion(frame, cQ + 6, fps, 900, EXPO_IN_OUT);
  return (
    <Punto at={at} n={10} bloque="B" titulo="Trata solo a quien|*cambia.*">
      {seg.map(([t, d, col, si], i) => (
        <Panel key={t} caja={{ x: (i % 2) * 472, y: Math.floor(i / 2) * 140, w: 440, h: 124 }} at={at + 6 + i * 4} color={si ? c.c : col === ROJO ? ROJO : undefined}>
          <div style={{ fontSize: 32, color: col === v.ceniza ? v.hueso : col }}>{t}</div>
          <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla }}>{d}</div>
        </Panel>
      ))}
      <div style={{ position: "absolute", left: 0, top: 300 }}>
        <Ejes ancho={912} alto={300} x={[0, 1]} y={[0, 1]} at={cQ} rotuloX="% de clientes tratados →" rotuloY="ganancia incremental">
          {({ px, py }) => (
            <g>
              <Traza pts={[[px(0), py(0)], [px(1), py(0.6)]]} k={k} color={v.ceniza} ancho={3} discontinuo />
              <Traza pts={Array.from({ length: 30 }, (_, i) => { const x = i / 29; return [px(x), py(Math.min(0.95, 1.9 * x - 1.3 * x * x))] as [number, number]; })} k={k} color={c.c} ancho={5} />
              <text x={px(0.5)} y={py(0.85)} fontFamily={mono} fontSize={22} fill={c.c} opacity={k}>
                curva Qini del modelo
              </text>
              <text x={px(0.7)} y={py(0.3)} fontFamily={mono} fontSize={22} fill={v.ceniza} opacity={k}>
                al azar
              </text>
            </g>
          )}
        </Ejes>
      </div>
    </Punto>
  );
};

// ─── B11 · Bandits ────────────────────────────────────────────────────────────
export const Bandits: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("bandits");
  const pasos = 10;
  const fila = (y: number, titulo: string, porc: (i: number) => number, atF: number) => (
    <div style={{ position: "absolute", left: 0, top: y, width: 912 }}>
      <Rol>{titulo}</Rol>
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        {Array.from({ length: pasos }, (_, i) => {
          const k = transicion(frame, atF + i * 4, fps, 400, EXPO_OUT);
          const a = porc(i);
          return (
            <div key={i} style={{ width: 84, height: 180, display: "flex", flexDirection: "column", borderRadius: 10, overflow: "hidden", opacity: k }}>
              <div style={{ height: `${a}%`, background: c.c }} />
              <div style={{ flex: 1, background: c.b, opacity: 0.6 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
  return (
    <Punto at={at} n={11} bloque="B" titulo="Explorar y|explotar *a la vez.*">
      {fila(0, "A/B fijo · 50 / 50 hasta el final", () => 50, at + 6)}
      {fila(250, "Bandit · más tráfico a la que gana", (i) => Math.min(88, 50 + i * i * 0.6), at + 40)}
      <div style={{ position: "absolute", left: 0, top: 500, display: "flex", gap: 24, fontSize: 28 }}>
        <span>
          <span style={{ color: c.c }}>■</span> variante ganadora
        </span>
        <span>
          <span style={{ color: c.b }}>■</span> la otra
        </span>
      </div>
      <Nota at={at + 80} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 560 }}>
        muestreo de Thompson: reparte según la probabilidad de que cada una sea la mejor
      </Nota>
    </Punto>
  );
};

// ─── C12 · Control sintético ──────────────────────────────────────────────────
export const Sintetico: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("sintetico");
  const t = Array.from({ length: 21 }, (_, i) => i);
  const sint = t.map((i) => 50 + i * 0.9 + Math.sin(i * 0.7) * 2);
  const real = t.map((i, j) => sint[j] + azar(i) * 0.6 - (i > 12 ? (i - 12) * 1.6 : 0));
  const k = transicion(frame, at + 6, fps, 1600, EXPO_IN_OUT);
  return (
    <Punto at={at} n={12} bloque="C" titulo="Un gemelo hecho|de *otras regiones.*">
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          ["0,40", "región A"],
          ["0,35", "región B"],
          ["0,25", "región C"],
        ].map(([w, r], i) => (
          <Sube key={r} at={at + 4 + i * 6}>
            <div style={{ padding: "10px 18px", borderRadius: 999, border: `2px solid ${c.c}`, background: relleno, fontSize: 28 }}>
              <span style={{ fontFamily: serif, color: c.c }}>{w}</span> × {r}
            </div>
          </Sube>
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, top: 110 }}>
        <Ejes ancho={912} alto={420} x={[0, 20]} y={[40, 72]} at={at + 4} rotuloX="años →" marcasX={[{ v: 12, t: "política" }]}>
          {({ px, py }) => (
            <g>
              <line x1={px(12)} y1={py(40)} x2={px(12)} y2={py(72)} stroke={v.ceniza} strokeWidth={2} strokeDasharray="6 6" />
              <Traza pts={t.map((i) => [px(i), py(sint[i])] as [number, number])} k={k} color={c.c} ancho={4} discontinuo />
              <Traza pts={t.map((i) => [px(i), py(real[i])] as [number, number])} k={k} color={v.azafran} ancho={5} />
              <text x={px(20)} y={py(sint[20]) - 12} textAnchor="end" fontFamily={mono} fontSize={22} fill={c.c} opacity={k}>
                gemelo sintético
              </text>
              <text x={px(20)} y={py(real[20]) + 32} textAnchor="end" fontFamily={mono} fontSize={22} fill={v.azafran} opacity={k}>
                la región tratada
              </text>
            </g>
          )}
        </Ejes>
      </div>
      <div style={{ position: "absolute", left: 0, top: 570, fontSize: 24, fontWeight: 200, color: v.ceniza }}>Abadie, Diamond y Hainmueller (2010) · datos ilustrativos</div>
    </Punto>
  );
};

// ─── C13 · Series de tiempo interrumpidas ─────────────────────────────────────
export const Impacto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("impacto");
  const t = Array.from({ length: 31 }, (_, i) => i);
  const base = t.map((i) => 100 + Math.sin(i * 0.8) * 6 + i * 0.4);
  const real = t.map((i) => base[i] + azar(i + 3) * 2 + (i > 20 ? 14 : 0));
  const k = transicion(frame, at + 6, fps, 1600, EXPO_IN_OUT);
  const kB = transicion(frame, at + 50, fps, 800, EXPO_OUT);
  return (
    <Punto at={at} n={13} bloque="C" titulo="Lo que habría pasado|*sin la campaña.*">
      <Ejes ancho={912} alto={460} x={[0, 30]} y={[85, 135]} at={at + 2} rotuloX="días →" marcasX={[{ v: 20, t: "campaña" }]}>
        {({ px, py }) => (
          <g>
            <line x1={px(20)} y1={py(85)} x2={px(20)} y2={py(135)} stroke={v.ceniza} strokeWidth={2} strokeDasharray="6 6" />
            <path
              d={`M${t.filter((i) => i >= 20).map((i) => `${px(i)},${py(base[i] + 4 + (i - 20) * 0.5)}`).join("L")}L${t.filter((i) => i >= 20).reverse().map((i) => `${px(i)},${py(base[i] - 4 - (i - 20) * 0.5)}`).join("L")}Z`}
              fill={c.b}
              opacity={0.2 * kB}
            />
            <Traza pts={t.filter((i) => i >= 20).map((i) => [px(i), py(base[i])] as [number, number])} k={kB} color={c.b} ancho={4} discontinuo />
            <Traza pts={t.map((i) => [px(i), py(real[i])] as [number, number])} k={k} color={v.azafran} ancho={5} />
            {kB > 0 ? (
              <text x={px(25)} y={py(base[25] - 9)} textAnchor="middle" fontFamily={mono} fontSize={22} fill={c.b} opacity={kB}>
                pronóstico sin campaña
              </text>
            ) : null}
            {kB > 0 ? (
              <text x={px(25)} y={py(real[25] + 6)} textAnchor="middle" fontFamily={serif} fontSize={32} fill={c.c} opacity={kB}>
                efecto
              </text>
            ) : null}
          </g>
        )}
      </Ejes>
      <div style={{ position: "absolute", left: 0, top: 500, fontSize: 24, fontWeight: 200, color: v.ceniza }}>CausalImpact (Brodersen y otros, 2015) · datos ilustrativos</div>
    </Punto>
  );
};

// ─── C14 · Grafos causales ────────────────────────────────────────────────────
export const Dags: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("dags");
  const cNo = useCueAt("dags", 0.55);
  const T: Caja = { x: 0, y: 230, w: 240, h: 100 };
  const Y: Caja = { x: 672, y: 230, w: 240, h: 100 };
  const C: Caja = { x: 336, y: 40, w: 240, h: 100 };
  const M: Caja = { x: 336, y: 230, w: 240, h: 100 };
  const K: Caja = { x: 336, y: 420, w: 240, h: 100 };
  const nodo = (caja: Caja, letra: string, nombre: string, col: string, ok: boolean | null, atN: number) => (
    <Panel caja={caja} at={atN} color={col} estilo={{ display: "flex", alignItems: "center", gap: 12, padding: "0 16px" }}>
      <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 44, color: col }}>{letra}</span>
      <span style={{ fontSize: 26, flex: 1 }}>{nombre}</span>
      {ok !== null ? <Sello at={atN + 30} ok={ok} /> : null}
    </Panel>
  );
  return (
    <Punto at={at} n={14} bloque="C" titulo="Qué controlar|y qué *no tocar.*">
      <Cables alto={540}>
        <Cable de={ancla(C, "l")} a={ancla(T, "t")} at={at + 10} color={v.azafran} />
        <Cable de={ancla(C, "r")} a={ancla(Y, "t")} at={at + 12} color={v.azafran} />
        <Cable de={ancla(T, "r")} a={ancla(M, "l")} at={cNo} color={c.b} />
        <Cable de={ancla(M, "r")} a={ancla(Y, "l")} at={cNo + 4} color={c.b} />
        <Cable de={ancla(T, "b")} a={ancla(K, "l")} at={cNo + 20} color={ROJO} />
        <Cable de={ancla(Y, "b")} a={ancla(K, "r")} at={cNo + 22} color={ROJO} />
      </Cables>
      {nodo(T, "T", "tratamiento", v.hueso, null, at + 4)}
      {nodo(Y, "Y", "resultado", v.hueso, null, at + 6)}
      {nodo(C, "C", "confusor", v.azafran, true, at + 8)}
      {frame >= cNo - 2 ? nodo(M, "M", "mediador", c.b, false, cNo) : null}
      {frame >= cNo + 16 ? nodo(K, "K", "colisionador", ROJO, false, cNo + 16) : null}
      <div style={{ position: "absolute", left: 0, top: 560, fontSize: 26, fontWeight: 200, color: v.niebla, opacity: transicion(frame, cNo + 50, fps, 500, EXPO_OUT) }}>
        controla <span style={{ color: v.azafran }}>C</span> · no controles <span style={{ color: c.b }}>M</span> (borras el efecto) ni <span style={{ color: ROJO }}>K</span> (creas sesgo)
      </div>
    </Punto>
  );
};

// ─── C15 · Sensibilidad (E-value) ─────────────────────────────────────────────
export const Sensibilidad: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("sensibilidad");
  const res = transicion(frame, at + 60, fps, 500, backOut);
  return (
    <Punto at={at} n={15} bloque="C" titulo="¿Qué tan fuerte|el *confusor oculto?*">
      <Formula tam={70}>
        <Entra at={at + 8}>
          <V color={c.c}>E</V>
          <Op>=</Op>
          <V color={v.azafran}>RR</V>
          <Op>+</Op>
          <Raiz>
            <span>
              <V color={v.azafran}>RR</V>(<V color={v.azafran}>RR</V> − 1)
            </span>
          </Raiz>
        </Entra>
      </Formula>
      <Nota at={at + 24} color={v.azafran} tam={28} style={{ position: "absolute", left: 0, top: 140 }}>
        <i style={{ fontFamily: serif }}>RR</i>: el riesgo relativo que estimaste
      </Nota>
      <div style={{ position: "absolute", left: 0, top: 230 }}>
        <Formula tam={70}>
          <Entra at={at + 40}>
            <span style={{ color: v.azafran }}>RR = 2</span>
            <Op>→</Op>
            <V color={c.c}>E</V>
            <Op>=</Op>2<Op>+</Op>
            <Raiz>
              <span>2</span>
            </Raiz>
            <Op>=</Op>
            <span style={{ color: c.c, fontSize: 92, display: "inline-block", transform: `scale(${res})` }}>3,41</span>
          </Entra>
        </Formula>
      </div>
      <Panel caja={{ x: 0, y: 400, w: 912, h: 170 }} at={at + 70} color={c.c}>
        <div style={{ fontSize: 30, fontWeight: 200, lineHeight: 1.35 }}>
          un confusor oculto tendría que multiplicar por <span style={{ color: c.c }}>3,4</span> el riesgo del tratamiento y del resultado para borrar el efecto
        </div>
      </Panel>
      <div style={{ position: "absolute", left: 0, top: 590, fontSize: 24, fontWeight: 200, color: v.ceniza }}>VanderWeele y Ding (2017)</div>
    </Punto>
  );
};

// ─── C16 · Double machine learning ────────────────────────────────────────────
export const Dml: React.FC = () => {
  const at = useCue("dml");
  const largo = useCueAt("dml", 1) - at;
  const pasos: [string, React.ReactNode, string][] = [
    [
      "1 · limpiar el resultado",
      <>
        <V color={c.b}>Ỹ</V>
        <Op>=</Op>
        <V color={c.b}>Y</V>
        <Op>−</Op>
        <Sombrero color={c.b}>m</Sombrero>(<V color={c.d}>X</V>)
      </>,
      c.b,
    ],
    [
      "2 · limpiar el tratamiento",
      <>
        <V color={v.azafran}>T̃</V>
        <Op>=</Op>
        <V color={v.azafran}>T</V>
        <Op>−</Op>
        <Sombrero color={v.azafran}>e</Sombrero>(<V color={c.d}>X</V>)
      </>,
      v.azafran,
    ],
    [
      "3 · el efecto con lo que queda",
      <>
        <V color={c.b}>Ỹ</V>
        <Op>=</Op>
        <V color={c.c}>θ</V>
        <V color={v.azafran}>T̃</V>
        <Op>+</Op>
        <V>ε</V>
      </>,
      c.c,
    ],
  ];
  return (
    <Punto at={at} n={16} bloque="C" titulo="Double machine|*learning.*">
      {pasos.map(([t, f, col], i) => (
        <Panel key={t} caja={{ x: 0, y: i * 170, w: 912, h: 150 }} at={at + largo * (0.08 + i * 0.25)} color={col}>
          <Rol color={col}>{t}</Rol>
          <Formula tam={54} style={{ marginTop: 8 }}>
            {f}
          </Formula>
        </Panel>
      ))}
      <div style={{ position: "absolute", left: 0, top: 530, fontSize: 26, fontWeight: 200, color: v.niebla }}>
        <i style={{ fontFamily: serif }}>m̂</i> y <i style={{ fontFamily: serif }}>ê</i>: cualquier modelo de ML, con validación cruzada · Chernozhukov y otros (2018)
      </div>
    </Punto>
  );
};

// ─── C17 · Mediación ──────────────────────────────────────────────────────────
export const Mediacion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("mediacion");
  const T: Caja = { x: 0, y: 220, w: 240, h: 100 };
  const M: Caja = { x: 336, y: 20, w: 240, h: 100 };
  const Y: Caja = { x: 672, y: 220, w: 240, h: 100 };
  const res = transicion(frame, at + 60, fps, 500, backOut);
  const nodo = (caja: Caja, l: string, n: string, col: string, atN: number) => (
    <Panel caja={caja} at={atN} color={col} estilo={{ display: "flex", alignItems: "center", gap: 12, padding: "0 16px" }}>
      <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 44, color: col }}>{l}</span>
      <span style={{ fontSize: 26 }}>{n}</span>
    </Panel>
  );
  return (
    <Punto at={at} n={17} bloque="C" titulo="Por dónde pasa|el *efecto.*">
      <Cables alto={360}>
        <Cable de={ancla(T, "t")} a={ancla(M, "l")} at={at + 10} color={c.b} etiqueta="a = 0,5" />
        <Cable de={ancla(M, "r")} a={ancla(Y, "t")} at={at + 14} color={c.b} etiqueta="b = 0,4" />
        <Cable de={ancla(T, "r")} a={ancla(Y, "l")} at={at + 18} color={v.azafran} etiqueta="c′ = 0,3" />
      </Cables>
      {nodo(T, "T", "curso", v.hueso, at + 4)}
      {nodo(M, "M", "habilidades", c.b, at + 6)}
      {nodo(Y, "Y", "sueldo", v.hueso, at + 8)}
      <div style={{ position: "absolute", left: 0, top: 380 }}>
        <Formula tam={60}>
          <Entra at={at + 30}>
            total<Op>=</Op>
            <V color={v.azafran}>c′</V>
            <Op>+</Op>
            <V color={c.b}>a·b</V>
            <Op>=</Op>
            <span style={{ color: v.azafran }}>0,3</span>
            <Op>+</Op>
            <span style={{ color: c.b }}>0,2</span>
            <Op>=</Op>
            <span style={{ color: c.c, fontSize: 80, display: "inline-block", transform: `scale(${res})` }}>0,5</span>
          </Entra>
        </Formula>
        <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 12 }}>directo + indirecto, en el caso lineal · números ilustrativos</div>
      </div>
    </Punto>
  );
};

// ─── Cierre ───────────────────────────────────────────────────────────────────
export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cCta = useCue("cta");
  const partes = Object.values(BLOQUES);
  return (
    <Escena>
      <div style={{ position: "absolute", left: -80, right: -80, top: -110, display: "flex", justifyContent: "center" }}>
        <Constelacion at={cCta - 30} ancho={560} forma="cerebro" desde="red" cambio={cCta} />
      </div>
      <div style={{ marginTop: 300 }}>
        <Cinetico at={cCta} texto="17 ideas,|17 *cápsulas.*" style={{ fontSize: 100 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 8, marginTop: 30, width: 912 }}>
          {Array.from({ length: 17 }, (_, i) => {
            const b = i < 7 ? partes[0] : i < 11 ? partes[1] : partes[2];
            return (
              <div key={i} style={{ height: 56, borderRadius: 12, border: `2px solid ${b.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 22, color: b.color, opacity: transicion(frame, cCta + 10 + i, fps, 300, EXPO_OUT) }}>
                {String(i + 1).padStart(2, "0")}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 30}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 36}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 40} style={{ marginTop: 18 }}>
          <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>¿cuál quieres primero? déjalo en los comentarios</div>
        </Sube>
      </div>
    </Escena>
  );
};

