import React from "react";
import { Check, Network, X as Equis } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 14/17";

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

// ─── Kit de grafos ────────────────────────────────────────────────────────────
type P = [number, number];
const R = 46;

const Nodo: React.FC<{ p: P; letra: string; nombre?: string; color: string; k: number; marco?: boolean; r?: number; arriba?: boolean }> = ({ p, letra, nombre, color, k, marco, r = R, arriba }) => (
  <g opacity={k} transform={`translate(${p[0]},${p[1]}) scale(${0.7 + 0.3 * k})`}>
    {marco ? <rect x={-r - 12} y={-r - 12} width={2 * r + 24} height={2 * r + 24} rx={14} fill="none" stroke={ROJO} strokeWidth={4} /> : null}
    <circle r={r} fill={relleno} stroke={color} strokeWidth={3.5} />
    <text y={r * 0.36} textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize={r * 1.05} fill={color}>
      {letra}
    </text>
    {nombre ? (
      <text y={arriba ? -r - 20 : r + 40} textAnchor="middle" fontSize={28} fill={v.hueso} fontWeight={300}>
        {nombre}
      </text>
    ) : null}
  </g>
);

// Flecha de borde a borde de dos nodos, con la punta dibujada a mano.
const Flecha: React.FC<{ de: P; a: P; k: number; color?: string; ancho?: number; discontinua?: boolean; r?: number; punta?: boolean }> = ({ de, a, k, color = v.ceniza, ancho = 4, discontinua, r = R, punta = true }) => {
  if (k <= 0) return null;
  const dx = a[0] - de[0];
  const dy = a[1] - de[1];
  const L = Math.hypot(dx, dy);
  const ux = dx / L;
  const uy = dy / L;
  const x1 = de[0] + ux * (r + 8);
  const y1 = de[1] + uy * (r + 8);
  const xf = a[0] - ux * (r + 10);
  const yf = a[1] - uy * (r + 10);
  const x2 = x1 + (xf - x1) * k;
  const y2 = y1 + (yf - y1) * k;
  const s = 16;
  const pa = `${x2},${y2} ${x2 - ux * s * 1.4 - uy * s * 0.8},${y2 - uy * s * 1.4 + ux * s * 0.8} ${x2 - ux * s * 1.4 + uy * s * 0.8},${y2 - uy * s * 1.4 - ux * s * 0.8}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - (punta ? ux * s : 0)} y2={y2 - (punta ? uy * s : 0)} stroke={color} strokeWidth={ancho} strokeDasharray={discontinua ? "10 9" : undefined} strokeLinecap="round" />
      {punta && k > 0.9 ? <polygon points={pa} fill={color} /> : null}
    </g>
  );
};

const Lienzo: React.FC<{ alto: number; top?: number; children: React.ReactNode }> = ({ alto, top = 0, children }) => (
  <svg width={912} height={alto} style={{ position: "absolute", left: 0, top, overflow: "visible" }}>
    {children}
  </svg>
);

// Barras horizontales para comparar coeficientes.
const Barras: React.FC<{ filas: [string, number, string, number][]; max: number; top: number }> = ({ filas, max, top }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 0, top, width: 912 }}>
      {filas.map(([t, val, col, a]) => {
        const k = transicion(frame, a, fps, 700, EXPO_OUT);
        return (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 16, opacity: Math.min(1, k * 2) }}>
            <div style={{ width: 300, fontSize: 30 }}>{t}</div>
            <div style={{ flex: 1, height: 40, borderRadius: 10, background: "#16161B" }}>
              <div style={{ height: 40, width: `${(val / max) * 100 * k}%`, borderRadius: 10, background: col }} />
            </div>
            <div style={{ width: 110, textAlign: "right", fontFamily: serif, fontSize: 46, color: col }}>{(val * k).toFixed(2).replace(".", ",")}</div>
          </div>
        );
      })}
    </div>
  );
};

// Nube de puntos de talento y carisma (independientes), con sin-hash + Box-Muller.
const azar = (i: number) => {
  const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
};
const PERSONAS = Array.from({ length: 320 }, (_, i) => {
  const u1 = Math.max(1e-6, azar(i * 2 + 1));
  const u2 = azar(i * 2 + 2);
  const m = Math.sqrt(-2 * Math.log(u1));
  return { t: m * Math.cos(2 * Math.PI * u2), c: m * Math.sin(2 * Math.PI * u2) };
});
const UMBRAL = 1.5;

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("gancho");
  const largo = useCueAt("gancho", 1) - at;
  const aFiltro = at + largo * 0.6;
  const kF = transicion(frame, aFiltro, fps, 800, EXPO_IN_OUT);
  const kL = transicion(frame, aFiltro + 20, fps, 800, EXPO_IN_OUT);
  return (
    <Escena>
      <Escenario alto={700}>
        <div style={{ display: "flex", gap: 30, fontSize: 28 }}>
          <span>
            <span style={{ color: v.niebla }}>●</span> todos · r ≈ 0
          </span>
          <span style={{ opacity: kF }}>
            <span style={{ color: v.azafran }}>●</span> famosos · r ≈ −0,68
          </span>
        </div>
        <div style={{ position: "absolute", left: 0, top: 60 }}>
          <Ejes ancho={912} alto={560} x={[-3.2, 3.2]} y={[-3.2, 3.2]} at={at} rotuloX="talento →" rotuloY="carisma">
            {({ px, py }) => (
              <g>
                {PERSONAS.map((q, i) => {
                  const fam = q.t + q.c > UMBRAL;
                  const k0 = transicion(frame, at + 4 + i * 0.12, fps, 300, EXPO_OUT);
                  return <circle key={i} cx={px(q.t)} cy={py(q.c)} r={fam ? 8 : 6} fill={fam && kF > 0 ? v.azafran : v.niebla} opacity={k0 * (fam ? 0.9 : 0.6 - 0.45 * kF)} />;
                })}
                <line x1={px(UMBRAL + 1.6)} y1={py(-1.6)} x2={px(-1.6)} y2={py(UMBRAL + 1.6)} stroke={v.azafran} strokeWidth={2} strokeDasharray="8 8" opacity={kF * 0.7} />
                <line x1={px(0.2)} y1={py(2.5)} x2={px(0.2 + 2.6 * kL)} y2={py(2.5 - 2.6 * 0.72 * kL)} stroke={ROJO} strokeWidth={5} strokeLinecap="round" opacity={kL} />
                <text x={px(-3)} y={py(-2.85)} fontFamily={mono} fontSize={24} fill={v.azafran} opacity={kF}>
                  famosos: talento + carisma alto
                </text>
              </g>
            )}
          </Ejes>
        </div>
      </Escenario>
      <div style={{ marginTop: 10 }}>
        <Cinetico at={at + largo * 0.85} texto="La correlación *la creaste tú.*" style={{ fontSize: 80 }} />
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
      <Cinetico at={6} texto="Grafos|*causales.*" style={{ marginTop: 18, fontSize: 140 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>puertas traseras y colisionadores · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── El grafo y sus tres piezas ───────────────────────────────────────────────
export const Grafo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cG = useCue("grafo");
  const cP = useCue("piezas");
  const largo = useCueAt("piezas", 1) - cP;
  const t = (a: number, ms = 500) => transicion(frame, a, fps, ms, EXPO_OUT);
  const piezas: { nombre: string; col: string; a: number; nodos: [P, string][]; flechas: [number, number][] }[] = [
    { nombre: "cadena", col: c.c, a: cP + largo * 0.35, nodos: [[[150, 0], "X"], [[150, 150], "M"], [[150, 300], "Y"]], flechas: [[0, 1], [1, 2]] },
    { nombre: "bifurcación", col: v.azafran, a: cP + largo * 0.48, nodos: [[[150, 0], "Z"], [[60, 300], "X"], [[240, 300], "Y"]], flechas: [[0, 1], [0, 2]] },
    { nombre: "colisionador", col: ROJO, a: cP + largo * 0.62, nodos: [[[60, 0], "X"], [[240, 0], "Y"], [[150, 300], "C"]], flechas: [[0, 2], [1, 2]] },
  ];
  return (
    <Escena>
      <Cabeza at={cG} titulo="Un dibujo de|*tus supuestos.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <div style={{ opacity: 1 - t(cP, 400) * 0.85 }}>
          <Lienzo alto={200}>
            <Nodo p={[180, 80]} letra="A" color={c.b} k={t(cG + 10)} />
            <Nodo p={[732, 80]} letra="B" color={c.b} k={t(cG + 14)} />
            <Flecha de={[180, 80]} a={[732, 80]} k={transicion(frame, cG + 24, fps, 700, EXPO_IN_OUT)} color={c.b} />
            <text x={456} y={60} textAnchor="middle" fontSize={30} fill={v.niebla} opacity={t(cG + 34)}>
              A causa B
            </text>
          </Lienzo>
          <Nota at={cG + 60} color={c.b} tam={28} style={{ position: "absolute", left: 0, top: 180 }}>
            sin ciclos: grafo acíclico dirigido (DAG)
          </Nota>
        </div>
        <div style={{ position: "absolute", left: 0, top: 260, width: 912, display: "flex" }}>
          {piezas.map((pz) => (
            <div key={pz.nombre} style={{ width: 304, position: "relative", height: 440 }}>
              <Lienzo alto={440} top={110}>
                <g transform="translate(2,0)">
                  {pz.flechas.map(([i, j]) => (
                    <Flecha key={`${i}${j}`} de={pz.nodos[i][0]} a={pz.nodos[j][0]} k={transicion(frame, pz.a + 12, fps, 600, EXPO_IN_OUT)} color={pz.col} r={40} />
                  ))}
                  {pz.nodos.map(([p, l]) => (
                    <Nodo key={l} p={p} letra={l} color={pz.col} k={t(pz.a)} r={40} />
                  ))}
                </g>
              </Lienzo>
              <div style={{ position: "absolute", top: 0, width: 304, textAlign: "center", fontSize: 32, color: pz.col, opacity: t(pz.a) }}>{pz.nombre}</div>
            </div>
          ))}
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Confusor ─────────────────────────────────────────────────────────────────
const ZC: P = [456, 110];
const XC: P = [170, 320];
const YC: P = [742, 320];

const Triangulo: React.FC<{ at: number; resalte?: number; zMarco?: boolean }> = ({ at, resalte = 0, zMarco }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (a: number) => transicion(frame, a, fps, 500, EXPO_OUT);
  const f = (a: number) => transicion(frame, a, fps, 600, EXPO_IN_OUT);
  const rojo = (base: string) => (resalte > 0 ? ROJO : base);
  return (
    <Lienzo alto={420}>
      <Flecha de={ZC} a={XC} k={f(at + 14)} color={rojo(v.azafran)} ancho={resalte > 0 ? 6 : 4} />
      <Flecha de={ZC} a={YC} k={f(at + 18)} color={rojo(v.azafran)} ancho={resalte > 0 ? 6 : 4} />
      <Flecha de={XC} a={YC} k={f(at + 26)} color={c.c} />
      <Nodo p={ZC} letra="Z" nombre="tamaño de la ciudad" color={v.azafran} k={t(at)} marco={zMarco} arriba />
      <Nodo p={XC} letra="X" nombre="publicidad" color={c.c} k={t(at + 4)} />
      <Nodo p={YC} letra="Y" nombre="ventas" color={c.b} k={t(at + 8)} />
    </Lienzo>
  );
};

export const Confusor: React.FC = () => {
  const cC = useCue("ciudad");
  const cS = useCue("sesgo");
  const largo = useCueAt("sesgo", 1) - cS;
  return (
    <Escena>
      <Cabeza at={cC} titulo="El confusor|*causa las dos.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <Triangulo at={cC + 6} />
        <Barras
          max={1.6}
          top={430}
          filas={[
            ["efecto real", 0.5, c.c, cS + largo * 0.08],
            ["regresión ingenua", 1.47, ROJO, cS + largo * 0.3],
            ["controlando Z", 0.5, v.azafran, cS + largo * 0.7],
          ]}
        />
      </Escenario>
    </Escena>
  );
};

// ─── La puerta trasera ────────────────────────────────────────────────────────
export const Puerta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cT = useCue("trasera");
  const cC = useCue("criterio");
  const cA = useCue("ajuste");
  const fDo = useCueAt("ajuste", 0.08);
  const fS = useCueAt("ajuste", 0.4);
  const fP = useCueAt("ajuste", 0.62);
  const fZ = useCueAt("ajuste", 0.88);
  const activas = frame >= fZ ? ["pz"] : frame >= fP ? ["py"] : frame >= fS ? ["s"] : frame >= fDo ? ["do"] : [];
  const kF = transicion(frame, cA, fps, 500, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cT} titulo="La puerta|*trasera.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <div style={{ transform: `scale(${1 - 0.3 * kF})`, transformOrigin: "top left", opacity: 1 - 0.4 * kF }}>
          <Triangulo at={cT - 60} resalte={frame >= cT + 10 ? 1 : 0} zMarco={frame >= cC + 20} />
          <div style={{ position: "absolute", left: 0, top: 120, fontFamily: mono, fontSize: 26, color: ROJO, opacity: transicion(frame, cT + 20, fps, 400, EXPO_OUT) }}>X ← Z → Y</div>
        </div>
        <Panel caja={{ x: 0, y: 440, w: 912, h: 130 }} at={cC + 4} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Network size={46} strokeWidth={1.5} color={v.azafran} />
          <div style={{ fontSize: 28 }}>bloquea todas las puertas traseras, sin controlar nada que X produce → el efecto se puede estimar</div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 600 }}>
          <Foco activas={activas}>
            <Formula tam={56}>
              <Entra at={cA + 4}>
                P(Y |{" "}
                <V id="do" color={c.c} italica={false}>
                  do(X)
                </V>
                )<Op>=</Op>
                <V id="s" color={v.niebla} italica={false}>
                  Σ<Sub>z</Sub>
                </V>
                <V id="py" color={c.b} italica={false}>
                  P(Y | X, z)
                </V>
                <Op>·</Op>
                <V id="pz" color={v.azafran} italica={false}>
                  P(z)
                </V>
              </Entra>
            </Formula>
          </Foco>
          <div style={{ height: 60, marginTop: 14, position: "relative" }}>
            {[
              ["do", "do(X): tú fijas X, como en un experimento", c.c],
              ["s", "Σ: recorres cada nivel de Z", v.niebla],
              ["py", "el efecto dentro de cada nivel de Z", c.b],
              ["pz", "ponderado por cuánto pesa ese nivel en la población", v.azafran],
            ].map(([id, t, col]) => (
              <div key={id} style={{ position: "absolute", left: 0, top: 0, fontSize: 28, color: col, opacity: activas.includes(id) ? 1 : 0 }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El colisionador ──────────────────────────────────────────────────────────
export const Colisionador: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cCh = useCue("choque");
  const cA = useCue("abre");
  const largo = useCueAt("abre", 1) - cA;
  const t = (a: number) => transicion(frame, a, fps, 500, EXPO_OUT);
  const f = (a: number) => transicion(frame, a, fps, 600, EXPO_IN_OUT);
  const aMarco = cA + largo * 0.3;
  const kAbre = f(aMarco + 20);
  const res = transicion(frame, cA + largo * 0.75, fps, 500, backOut);
  const T: P = [170, 80];
  const C: P = [742, 80];
  const F: P = [456, 330];
  return (
    <Escena>
      <Cabeza at={cCh} titulo="El|*colisionador.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <Lienzo alto={460}>
          <Flecha de={T} a={F} k={f(cCh + 20)} color={ROJO} />
          <Flecha de={C} a={F} k={f(cCh + 24)} color={ROJO} />
          {kAbre > 0 ? (
            <g opacity={kAbre}>
              <line x1={T[0] + 60} y1={T[1]} x2={C[0] - 60} y2={C[1]} stroke={ROJO} strokeWidth={4} strokeDasharray="10 9" />
              <text x={456} y={T[1] - 18} textAnchor="middle" fontFamily={mono} fontSize={26} fill={ROJO}>
                camino abierto
              </text>
            </g>
          ) : null}
          <Nodo p={T} letra="T" nombre="talento" color={c.c} k={t(cCh + 4)} />
          <Nodo p={C} letra="C" nombre="carisma" color={c.b} k={t(cCh + 8)} />
          <Nodo p={F} letra="F" nombre="fama" color={ROJO} k={t(cCh + 12)} marco={frame >= aMarco} />
        </Lienzo>
        <Nota at={cA + 4} color={v.niebla} tam={28} style={{ position: "absolute", left: 0, top: 470 }}>
          sin controlar: el camino T → F ← C está bloqueado
        </Nota>
        <Panel caja={{ x: 0, y: 540, w: 912, h: 150 }} at={cA + largo * 0.65} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 30 }}>
          <div style={{ fontSize: 30 }}>correlación talento–carisma</div>
          <div style={{ fontFamily: serif, fontSize: 56, color: v.niebla }}>0</div>
          <div style={{ fontSize: 40, color: v.niebla }}>→</div>
          <div style={{ fontFamily: serif, fontSize: 72, color: ROJO, display: "inline-block", transform: `scale(${res})` }}>−0,68</div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── El mediador ──────────────────────────────────────────────────────────────
export const Mediador: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("cadena");
  const cB = useCue("borra");
  const largo = useCueAt("borra", 1) - cB;
  const t = (a: number) => transicion(frame, a, fps, 500, EXPO_OUT);
  const f = (a: number) => transicion(frame, a, fps, 600, EXPO_IN_OUT);
  const X: P = [130, 260];
  const M: P = [456, 80];
  const Y: P = [782, 260];
  const kM = frame >= cB + 10;
  return (
    <Escena>
      <Cabeza at={cC} titulo="El mediador:|*la cadena.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <Lienzo alto={400}>
          <Flecha de={X} a={M} k={f(cC + 16)} color={kM ? v.ceniza : c.c} discontinua={kM} />
          <Flecha de={M} a={Y} k={f(cC + 22)} color={kM ? v.ceniza : c.c} discontinua={kM} />
          <Flecha de={X} a={Y} k={f(cC + 30)} color={c.c} />
          <Nodo p={X} letra="X" nombre="publicidad" color={c.c} k={t(cC + 4)} />
          <Nodo p={M} letra="M" nombre="visitas" color={v.azafran} k={t(cC + 8)} marco={kM} />
          <Nodo p={Y} letra="Y" nombre="ventas" color={c.b} k={t(cC + 12)} />
        </Lienzo>
        <Barras
          max={0.6}
          top={400}
          filas={[
            ["efecto total", 0.5, c.c, cB + largo * 0.4],
            ["controlando M", 0.2, ROJO, cB + largo * 0.75],
          ]}
        />
        <Nota at={cB + largo * 0.85} color={v.niebla} tam={26} style={{ position: "absolute", left: 0, top: 620 }}>
          queda solo el efecto directo: el camino por las visitas se borró (más en la idea 17)
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── La regla ─────────────────────────────────────────────────────────────────
export const Regla: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cR = useCue("regla");
  const cL = useCue("lineal");
  const largo = useCueAt("regla", 1) - cR;
  const col = (titulo: string, items: string[], color: string, Icono: typeof Check, a: number) => (
    <div style={{ flex: 1, borderRadius: 20, border: `2px solid ${color}`, background: relleno, padding: "18px 22px", opacity: transicion(frame, a, fps, 400, EXPO_OUT) }}>
      <Rol color={color}>{titulo}</Rol>
      {items.map((it) => (
        <div key={it} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, fontSize: 30 }}>
          <Icono size={32} strokeWidth={2} color={color} /> {it}
        </div>
      ))}
    </div>
  );
  return (
    <Escena>
      <Cabeza at={cR} titulo="Más controles|*no es mejor.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", gap: 16, width: 912 }}>
          {col("controla", ["confusores", "lo que pasa antes de X"], c.c, Check, cR + 6)}
          {col("no controles", ["colisionadores", "mediadores", "nada que X produce"], ROJO, Equis, cR + largo * 0.5)}
        </div>
        <Panel caja={{ x: 0, y: 330, w: 912, h: 150 }} at={cL + 4} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div style={{ fontFamily: serif, fontSize: 64, color: v.azafran, whiteSpace: "nowrap" }}>O(V + E)</div>
          <div style={{ fontSize: 28 }}>revisar si tus controles bloquean todos los caminos: lineal en vértices y aristas</div>
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
        <Cinetico at={cCta} texto="No más controles:|los *correctos.*" style={{ fontSize: 88 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 15/17 · análisis de sensibilidad
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
