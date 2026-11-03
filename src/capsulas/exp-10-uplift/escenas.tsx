import React from "react";
import { Ban, Check, FlaskConical, Mail, ShoppingBag, Sparkles, User, X } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cuenta as Contador, Entra, Formula, Op, serif, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Traza } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 10/17";

type Seg = { n: string; d: string; col: string; Icono: typeof User; cuantos: number; u: number };
const SEG: Seg[] = [
  { n: "Persuadibles", d: "compran solo con cupón", col: c.c, Icono: Sparkles, cuantos: 2000, u: 0.3 },
  { n: "Seguros", d: "compran igual", col: v.ceniza, Icono: ShoppingBag, cuantos: 3000, u: 0 },
  { n: "Perdidos", d: "no compran nunca", col: v.ceniza, Icono: X, cuantos: 4000, u: 0 },
  { n: "No molestar", d: "el cupón los espanta", col: ROJO, Icono: Ban, cuantos: 1000, u: -0.2 },
];

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

// Curva Qini ilustrativa: tratar por uplift decreciente (persuadibles 0–20 %, neutros 20–90 %, no molestar 90–100 %).
const qini = (f: number) => (f <= 0.2 ? (f / 0.2) * 600 : f <= 0.9 ? 600 : 600 - ((f - 0.9) / 0.1) * 200);

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("gancho");
  const cS = useCueAt("gancho", 0.45);
  const fila = (y: number, n: number, total: string, compras: number, col: string, a: number) => (
    <Panel caja={{ x: 0, y, w: 912, h: 190 }} at={a} color={col}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Mail size={40} strokeWidth={1.5} color={col} />
        <span style={{ fontSize: 34 }}>cupón a {total}</span>
      </div>
      <div style={{ display: "flex", gap: 3, marginTop: 14, flexWrap: "wrap", width: 860 }}>
        {Array.from({ length: n }, (_, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: col, opacity: transicion(frame, a + i * 0.15, fps, 200, EXPO_OUT) }} />
        ))}
      </div>
      <div style={{ position: "absolute", right: 22, top: 18, fontFamily: serif, fontSize: 52, color: col }}>
        +<Contador at={a + 10} hasta={compras} ms={700} />
      </div>
    </Panel>
  );
  return (
    <Escena>
      <Escenario alto={440}>
        {fila(0, 100, "10.000", 400, v.ceniza, at + 4)}
        {fila(230, 20, "2.000", 600, c.c, cS)}
      </Escenario>
      <div style={{ marginTop: 30 }}>
        <Cinetico at={cS + 40} texto="Menos cupones,|*más ventas.*" style={{ fontSize: 100 }} />
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
      <Cinetico at={6} texto="*Uplift.*" style={{ marginTop: 18, fontSize: 150 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>tratar solo a quien cambia · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Los cuatro segmentos ─────────────────────────────────────────────────────
export const Segmentos: React.FC = () => {
  const cC = useCue("cuatro");
  const ats = [useCue("persuadibles"), useCue("seguros"), useCue("perdidos"), useCue("molestar")];
  return (
    <Escena>
      <Cabeza at={cC} titulo="Cuatro tipos|de *cliente.*" />
      <Escenario alto={680} style={{ marginTop: 40 }}>
        <div style={{ position: "absolute", left: 290, top: -6, width: 600, display: "flex", fontSize: 20, fontWeight: 600, letterSpacing: "0.08em", color: v.ceniza }}>
          <span style={{ width: 300, textAlign: "center" }}>SIN CUPÓN</span>
          <span style={{ width: 300, textAlign: "center" }}>CON CUPÓN</span>
        </div>
        {SEG.map((s, i) => {
          const sin = s.u > 0 ? false : s.u < 0 ? true : s.n === "Seguros";
          const con = s.u > 0 ? true : s.u < 0 ? false : s.n === "Seguros";
          return (
            <Panel key={s.n} caja={{ x: 0, y: 40 + i * 150, w: 912, h: 132 }} at={ats[i]} color={s.col === v.ceniza ? undefined : s.col} estilo={{ display: "flex", alignItems: "center", padding: "0 20px" }}>
              <div style={{ width: 270, display: "flex", alignItems: "center", gap: 12 }}>
                <s.Icono size={40} strokeWidth={1.5} color={s.col} />
                <div>
                  <div style={{ fontSize: 28, color: s.col === v.ceniza ? v.hueso : s.col }}>{s.n}</div>
                  <div style={{ fontSize: 20, fontWeight: 200, color: v.niebla }}>{s.d}</div>
                </div>
              </div>
              {[sin, con].map((b, j) => (
                <div key={j} style={{ width: 300, display: "flex", justifyContent: "center" }}>
                  {b ? <ShoppingBag size={44} strokeWidth={1.6} color={c.c} /> : <X size={44} strokeWidth={1.6} color={v.ceniza} />}
                </div>
              ))}
            </Panel>
          );
        })}
      </Escenario>
    </Escena>
  );
};

// ─── El error clásico ─────────────────────────────────────────────────────────
export const Propension: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("propension");
  const largo = useCueAt("propension", 1) - at;
  const filas: [string, number, string, boolean][] = [
    ["Seguros", 0.92, v.ceniza, true],
    ["Persuadibles", 0.55, c.c, false],
    ["No molestar", 0.48, ROJO, false],
    ["Perdidos", 0.03, v.ceniza, false],
  ];
  return (
    <Escena>
      <Cabeza at={at} titulo="El error: predecir|*quién compra.*" tam={80} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Rol>Modelo de propensión: P(compra)</Rol>
        {filas.map(([n, p, col, malo], i) => {
          const k = transicion(frame, at + largo * (0.15 + i * 0.08), fps, 600, EXPO_OUT);
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 22 }}>
              <span style={{ width: 240, fontSize: 30, color: col === v.ceniza ? v.hueso : col }}>{n}</span>
              <div style={{ flex: 1, height: 34, borderRadius: 10, background: "#16161B" }}>
                <div style={{ height: 34, width: `${p * 100 * k}%`, borderRadius: 10, background: malo ? ROJO : col }} />
              </div>
              <span style={{ fontFamily: serif, fontSize: 36, width: 90 }}>{Math.round(p * 100)} %</span>
            </div>
          );
        })}
        <Nota at={at + largo * 0.6} color={ROJO} tam={28} style={{ position: "absolute", left: 0, top: 420 }}>
          el primero de la lista son los seguros: cupones regalados a quien compra igual · ilustrativo
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── La fórmula del uplift ────────────────────────────────────────────────────
export const FormulaEsc: React.FC = () => {
  const at = useCue("formula");
  const largo = useCueAt("formula", 1) - at;
  return (
    <Escena>
      <Cabeza at={at} titulo="Medir *el cambio.*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Formula tam={50}>
          <Entra at={at + 6}>
            <V color={c.c}>u</V>(<V color={c.d}>x</V>)<Op>=</Op>
            P(compra | <V color={v.azafran}>T</V>=1, <V color={c.d}>x</V>)<Op>−</Op>
            P(compra | <V color={c.b}>T</V>=0, <V color={c.d}>x</V>)
          </Entra>
        </Formula>
        <div style={{ position: "absolute", left: 0, top: 150, display: "flex", flexDirection: "column", gap: 14 }}>
          <Nota at={at + largo * 0.35} color={v.azafran} tam={28}>
            la probabilidad de comprar si le mandas el cupón
          </Nota>
          <Nota at={at + largo * 0.5} color={c.b} tam={28}>
            menos la probabilidad de comprar sin cupón
          </Nota>
          <Nota at={at + largo * 0.7} color={c.c} tam={28}>
            es el CATE de la idea 09, usado para decidir a quién tratar
          </Nota>
        </div>
        <div style={{ position: "absolute", left: 0, top: 380, display: "flex", gap: 14 }}>
          {SEG.map((s, i) => (
            <Sube key={s.n} at={at + largo * (0.75 + i * 0.05)}>
              <div style={{ width: 214, height: 130, borderRadius: 16, border: `2px solid ${s.col}`, background: relleno, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 22, color: v.niebla }}>{s.n}</div>
                <div style={{ fontFamily: serif, fontSize: 48, color: s.col }}>{s.u > 0 ? "+" : ""}{Math.round(s.u * 100)} %</div>
              </div>
            </Sube>
          ))}
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── La cuenta ────────────────────────────────────────────────────────────────
export const Cuenta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("cuenta");
  const largo = useCueAt("cuenta", 1) - at;
  const filas = SEG.map((s) => ({ ...s, aporte: Math.round(s.cuantos * s.u) }));
  const res = transicion(frame, at + largo * 0.75, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={at} titulo="Hagamos la *cuenta.*" tam={96} />
      <Escenario alto={680} style={{ marginTop: 40 }}>
        {filas.map((s, i) => {
          const k = transicion(frame, at + largo * (0.05 + i * 0.12), fps, 400, EXPO_OUT);
          return (
            <div key={s.n} style={{ display: "grid", gridTemplateColumns: "250px 160px 140px 1fr", alignItems: "center", height: 74, borderBottom: `1px solid ${linea}`, opacity: k }}>
              <span style={{ fontSize: 30, color: s.col === v.ceniza ? v.hueso : s.col }}>{s.n}</span>
              <span style={{ fontFamily: mono, fontSize: 28 }}>{s.cuantos.toLocaleString("es-CL")}</span>
              <span style={{ fontFamily: mono, fontSize: 28, color: v.niebla }}>× {s.u > 0 ? "+" : ""}{Math.round(s.u * 100)} %</span>
              <span style={{ fontFamily: serif, fontSize: 40, color: s.aporte > 0 ? c.c : s.aporte < 0 ? ROJO : v.ceniza, textAlign: "right" }}>
                {s.aporte > 0 ? "+" : ""}
                {s.aporte}
              </span>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 0, top: 360, width: 912, display: "flex", gap: 16 }}>
          {[
            ["a todos", "10.000 cupones", 400, v.ceniza],
            ["solo persuadibles", "2.000 cupones", 600, c.c],
          ].map(([t, d, n, col], i) => (
            <div key={t as string} style={{ flex: 1, height: 200, borderRadius: 20, border: `2.5px solid ${col}`, background: relleno, padding: "16px 22px", boxSizing: "border-box", opacity: transicion(frame, at + largo * (0.55 + i * 0.15), fps, 400, EXPO_OUT) }}>
              <Rol color={col as string}>{t}</Rol>
              <div style={{ fontFamily: serif, fontSize: 80, color: col as string, transform: i ? `scale(${res})` : undefined, transformOrigin: "left" }}>+{n}</div>
              <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla }}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: 590, fontSize: 24, fontWeight: 200, color: v.ceniza }}>compras extra · números ilustrativos</div>
      </Escenario>
    </Escena>
  );
};

// ─── La curva Qini ────────────────────────────────────────────────────────────
export const Qini: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cQ = useCue("qini");
  const cF = useCue("forma");
  const cA = useCue("area");
  const fs = Array.from({ length: 101 }, (_, i) => i / 100);
  const kR = transicion(frame, cF, fps, 700, EXPO_IN_OUT);
  const kC = transicion(frame, cF + 20, fps, 1500, EXPO_IN_OUT);
  const kA = transicion(frame, cA + 4, fps, 700, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cQ} titulo="La curva *Qini.*" tam={96} />
      <Escenario alto={680} style={{ marginTop: 40 }}>
        <Ejes ancho={912} alto={460} x={[0, 1]} y={[0, 820]} at={cQ + 10} rotuloX="% tratados →" rotuloY="compras extra acumuladas" marcasX={[{ v: 0.2, t: "20 %" }, { v: 0.9, t: "90 %" }]}>
          {({ px, py }) => (
            <g>
              {kA > 0 ? (
                <path d={`M${px(0)},${py(0)}L${fs.map((f) => `${px(f)},${py(qini(f))}`).join("L")}L${px(1)},${py(400)}Z`} fill={c.c} opacity={0.18 * kA} />
              ) : null}
              <Traza pts={[[px(0), py(0)], [px(1), py(400)]]} k={kR} color={v.ceniza} ancho={3} discontinuo />
              <Traza pts={fs.map((f) => [px(f), py(qini(f))] as [number, number])} k={kC} color={c.c} ancho={5} />
              <text x={px(0.55)} y={py(300)} fontFamily={mono} fontSize={22} fill={v.ceniza} opacity={kR}>
                al azar
              </text>
              <text x={px(0.4)} y={py(600) - 18} fontFamily={mono} fontSize={22} fill={c.c} opacity={kC}>
                modelo de uplift
              </text>
              {kC > 0.9 ? (
                <g>
                  <text x={px(0.22)} y={py(600) + 50} textAnchor="start" fontFamily={serif} fontSize={30} fill={c.c}>
                    persuadibles
                  </text>
                  <text x={px(0.97)} y={py(560) - 40} textAnchor="end" fontFamily={serif} fontSize={28} fill={ROJO}>
                    no molestar
                  </text>
                </g>
              ) : null}
            </g>
          )}
        </Ejes>
        <Nota at={cA + 10} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 510 }}>
          el área entre la curva y la recta: el coeficiente Qini, cuánto mejor que el azar
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Los datos ────────────────────────────────────────────────────────────────
export const Datos: React.FC = () => {
  const at = useCue("datos");
  const largo = useCueAt("datos", 1) - at;
  return (
    <Escena>
      <Cabeza at={at} titulo="Primero, un|*experimento.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 200 }} at={at + 6} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <FlaskConical size={60} strokeWidth={1.4} color={c.c} />
          <div>
            <Rol color={c.c}>Para entrenar el modelo</Rol>
            <div style={{ fontSize: 32, marginTop: 6 }}>tratados y control asignados al azar</div>
          </div>
        </Panel>
        <Panel caja={{ x: 0, y: 240, w: 912, h: 200 }} at={at + largo * 0.6} color={ROJO} discontinuo estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <X size={60} strokeWidth={1.4} color={ROJO} />
          <div>
            <Rol color={ROJO}>Sin experimento</Rol>
            <div style={{ fontSize: 32, marginTop: 6 }}>el modelo aprende sesgos, no efectos</div>
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
        <Cinetico at={cCta} texto="No a quien compra.|A quien *cambia.*" style={{ fontSize: 88 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 11/17 · bandits
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
