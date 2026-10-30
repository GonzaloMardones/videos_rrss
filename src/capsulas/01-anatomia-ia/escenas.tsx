import React from "react";
import {
  BrainCircuit,
  DatabaseZap,
  FileText,
  Hourglass,
  MessageSquare,
  Plug,
  Quote,
  Save,
  Scissors,
  Sigma,
  SlidersHorizontal,
  TrendingUp,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, resorte, transicion } from "../../estilos/vacio/movimiento";
import { colores as c, Cuenta, Entra, Foco, Formula, Frac, Norma, Op, Raiz, serif, Sub, Suma, Sup, Techo, V } from "../../estilos/vacio/mate";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { ancla, Cable, Cables, type Caja, Chip, Codigo, Escenario, linea, mono, relleno, sintaxis as s, Tarjeta } from "../../estilos/vacio/tecnico";
import { fuente, tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

// Índice del último cue que ya pasó (-1 si ninguno).
const ultimo = (frame: number, cues: number[]) => cues.reduce((acc, cue, i) => (frame >= cue ? i : acc), -1);

const Caption: React.FC<{ at: number; hasta?: number; children: React.ReactNode; color?: string }> = ({ at, hasta, children, color = v.azafran }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 500, EXPO_OUT) * (hasta === undefined ? 1 : 1 - transicion(frame, hasta, fps, 300, EXPO_OUT));
  if (k <= 0) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, opacity: k, transform: `translateY(${(1 - k) * 16}px)`, display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div style={{ width: 12, height: 12, borderRadius: 6, background: color, marginTop: 14, flexShrink: 0 }} />
      <div style={{ fontFamily: fuente, fontSize: 34, fontWeight: 200, lineHeight: 1.3, color: v.hueso }}>{children}</div>
    </div>
  );
};

// ─── Las cinco capas (se usan en el gancho y en la escena de capas) ──────────
const CAPAS: { Icono: LucideIcon; nombre: string; que: string; tec: string }[] = [
  { Icono: FileText, nombre: "Ingesta", que: "documentos → texto limpio", tec: "PDF · Word" },
  { Icono: DatabaseZap, nombre: "Conocimiento", que: "RAG: vectores + metadata", tec: "Firestore" },
  { Icono: Workflow, nombre: "Orquestación", que: "agente con pasos definidos", tec: "LangGraph" },
  { Icono: Plug, nombre: "Integraciones", que: "herramientas y agentes", tec: "MCP · OAuth" },
  { Icono: Save, nombre: "Persistencia", que: "memoria y plan B", tec: "SQL" },
];

const Capa: React.FC<{ i: number; y: number; alto: number; activa?: boolean; opacidad?: number; compacta?: boolean }> = ({ i, y, alto, activa = false, opacidad = 1, compacta = false }) => {
  const { Icono, nombre, que, tec } = CAPAS[i];
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: y,
        width: 912,
        height: alto,
        boxSizing: "border-box",
        borderRadius: 22,
        border: `${activa ? 2.5 : 1.5}px solid ${activa ? v.azafran : linea}`,
        background: relleno,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "0 24px",
        opacity: opacidad,
      }}
    >
      <div style={{ fontFamily: mono, fontSize: 26, color: activa ? v.azafran : v.ceniza, width: 30 }}>{i + 1}</div>
      <div style={{ width: 62, height: 62, flexShrink: 0, borderRadius: 16, border: `1.5px solid ${activa ? v.azafran : linea}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icono size={34} strokeWidth={1.6} color={activa ? v.azafran : v.hueso} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 38, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{nombre}</div>
        {compacta ? null : <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, whiteSpace: "nowrap" }}>{que}</div>}
      </div>
      <Chip texto={tec} activo={activa} tam={22} />
    </div>
  );
};

// ─── Gancho: un prompt que se abre en cinco capas ────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cSis = useCue("sistema");
  const cParte = useCueAt("sistema", 0.55);
  const cCapas = useCue("capas");
  const sale = transicion(frame, cParte, fps, 350, EXPO_OUT);
  return (
    <Escena>
      <Escenario alto={560}>
        <div style={{ position: "absolute", left: 60, top: 200, width: 792, height: 120, boxSizing: "border-box", borderRadius: 28, border: `2px solid ${v.ceniza}`, background: relleno, display: "flex", alignItems: "center", gap: 20, padding: "0 30px", opacity: 1 - sale, transform: `scale(${1 - sale * 0.2})` }}>
          <MessageSquare size={40} strokeWidth={1.6} color={v.hueso} />
          <div style={{ fontSize: 36, fontWeight: 200 }}>
            Resume el informe y dime qué hacer
            <span style={{ display: "inline-block", width: 4, height: 40, background: v.hueso, marginLeft: 6, verticalAlign: "middle", opacity: Math.floor(frame / 15) % 2 ? 0 : 1 }} />
          </div>
        </div>
        {CAPAS.map((_, i) => {
          const k = resorte(frame, cParte + i * 3, fps, { k: 140, c: 16 });
          const y = 220 + (14 + i * 108 - 220) * k;
          return <Capa key={i} i={i} y={y} alto={92} compacta opacidad={Math.min(1, k * 2)} />;
        })}
      </Escenario>
      <div style={{ marginTop: 30 }}>
        <Cinetico at={cSis + 4} texto="No es un prompt.|Es un *sistema.*" style={{ fontSize: 92 }} />
        <div style={{ display: "flex", gap: 16, marginTop: 30 }}>
          {[
            <>
              <Techo>
                <V color={c.a}>L</V>
                <Op>/</Op>650
              </Techo>
            </>,
            <>
              cos <V color={c.b}>θ</V>
            </>,
            <>
              <V color={c.c} italica={false}>
                O
              </V>
              (<V color={c.a}>n</V>
              <Op>·</Op>
              <V color={c.b}>d</V>)
            </>,
          ].map((f, i) => {
            const k = transicion(frame, cCapas + 20 + i * 6, fps, 500, backOut);
            return (
              <div key={i} style={{ padding: "10px 22px", borderRadius: 20, border: `1.5px solid ${linea}`, background: relleno, opacity: Math.min(1, k * 1.5), transform: `translateY(${(1 - k) * 30}px)` }}>
                <Formula tam={48}>{f}</Formula>
              </div>
            );
          })}
        </div>
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ serie, autor }) => (
  <Escena>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, display: "flex", justifyContent: "center" }}>
      <Constelacion at={-60} ancho={700} forma="cerebro" cantidad={560} />
    </div>
    <div style={{ marginTop: 470 }}>
      <Rotulo at={2}>{serie} · 01</Rotulo>
      <Cinetico at={6} texto="Anatomía de un|proyecto de *IA.*" style={{ marginTop: 18, fontSize: 100 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Las cinco capas, una por una ────────────────────────────────────────────
export const Capas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = [useCue("ingesta"), useCue("conocimiento"), useCue("orquestacion"), useCue("integraciones"), useCue("persistencia")];
  const activa = ultimo(frame, cues);
  return (
    <Escena>
      <Rotulo at={cues[0]}>Anatomía</Rotulo>
      <Cinetico at={cues[0] + 4} texto="Cinco *capas.*" style={{ marginTop: 18 }} />
      <Escenario alto={640} style={{ marginTop: 36 }}>
        {CAPAS.map((_, i) => {
          const k = resorte(frame, cues[i] - 6, fps, { k: 140, c: 16 });
          return (
            <div key={i} style={{ opacity: Math.min(1, k * 1.6), transform: `translateX(${(1 - Math.min(1, k)) * 60}px)` }}>
              <Capa i={i} y={i * 128} alto={112} activa={activa === i} />
            </div>
          );
        })}
      </Escenario>
    </Escena>
  );
};

// ─── Por qué RAG: el modelo no conoce tus documentos ─────────────────────────
const Barra: React.FC<{ at: number; y: number; Icono: LucideIcon; nombre: string; largo: number; ms: number; texto: string; color: string }> = ({ at, y, Icono, nombre, largo, ms, texto, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, ms, EXPO_IN_OUT);
  const a = transicion(frame, at - 4, fps, 400, EXPO_OUT);
  return (
    <div style={{ position: "absolute", left: 0, top: y, width: 912, opacity: a }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 32 }}>
        <Icono size={32} strokeWidth={1.6} color={color} /> {nombre}
        <span style={{ marginLeft: "auto", fontSize: 28, fontWeight: 200, color: v.niebla, opacity: k }}>{texto}</span>
      </div>
      <div style={{ marginTop: 12, height: 18, borderRadius: 9, background: "#16161B" }}>
        <div style={{ height: 18, width: largo * k, borderRadius: 9, background: color }} />
      </div>
    </div>
  );
};

export const Porque: React.FC = () => {
  const frame = useCurrentFrame();
  const cNo = useCue("noconoce");
  const cCaro = useCue("caro");
  const cRag = useCueAt("caro", 0.33);
  const cCita = useCueAt("caro", 0.8);
  const MOD: Caja = { x: 0, y: 0, w: 420, h: 176 };
  const DOC: Caja = { x: 492, y: 0, w: 420, h: 176 };
  return (
    <Escena>
      <Rotulo at={cNo}>¿Por qué RAG?</Rotulo>
      <Cinetico at={cNo + 4} texto="El modelo no|conoce *tus datos.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={600} style={{ marginTop: 40 }}>
        <Cables alto={600}>
          <Cable de={ancla(DOC, "l")} a={ancla(MOD, "r")} at={cNo + 20} discontinuo color={v.ceniza} etiqueta="?" />
        </Cables>
        <Tarjeta caja={MOD} at={cNo + 6} Icono={BrainCircuit} rol="Modelo" titulo="Gemini" sub="sabe lo público" />
        <Tarjeta caja={DOC} at={cNo + 12} Icono={FileText} rol="Tu documento" titulo="informe.pdf" sub="nunca lo vio" activo={frame >= cRag} />
        <Barra at={cCaro} y={250} Icono={Hourglass} nombre="Reentrenar" largo={912} ms={1600} texto="semanas · caro" color={v.ceniza} />
        <Barra at={cRag} y={380} Icono={Zap} nombre="RAG" largo={60} ms={300} texto="minutos" color={v.azafran} />
        <Sube at={cCita} style={{ position: "absolute", left: 0, top: 510 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: mono, fontSize: 26, color: v.niebla }}>
            <Quote size={28} strokeWidth={1.6} color={v.azafran} /> fuente: informe.pdf · p. 4
          </div>
        </Sube>
      </Escenario>
    </Escena>
  );
};

// ─── Cuenta 1: los trozos ────────────────────────────────────────────────────
export const Trozos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cTrozo = useCue("trozo");
  const cO = useCueAt("trozo", 0.55);
  const cPaso = useCue("paso");
  const cFormula = useCue("formula");
  const cEjemplo = useCue("ejemplo");
  const cCosto = useCue("costo");
  // Escala: 800 caracteres = 260 px.
  const T = 260;
  const O = (T * 150) / 800;
  const P = T - O;
  const fila = (i: number) => 112 + (i % 2) * 58;
  const fase = ultimo(frame, [cTrozo, cO, cPaso, cFormula, cEjemplo, cCosto]);
  const activas = [["t"], ["t", "o"], ["t", "o"], ["n", "L", "o"], ["n"], ["t", "o"]][Math.max(0, fase)];
  const paso = transicion(frame, cPaso + 6, fps, 600, EXPO_IN_OUT);
  const brace = (x1: number, x2: number, y: number, k: number, color: string) => (
    <path d={`M${x1},${y - 8} L${x1},${y} L${x1 + (x2 - x1) * k},${y} ${k >= 1 ? `L${x2},${y} L${x2},${y - 8}` : ""}`} fill="none" stroke={color} strokeWidth={2.5} />
  );
  return (
    <Escena>
      <Rotulo at={cTrozo}>Cuenta 1 · Trozos</Rotulo>
      <Cinetico at={cTrozo + 4} texto="¿Cuántos *trozos?*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={800} style={{ marginTop: 24 }}>
        <Foco activas={activas}>
          <svg width={912} height={260} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
            {/* El documento completo, de largo L */}
            <rect x={0} y={4} width={912} height={30} rx={8} fill="#121217" stroke={linea} strokeWidth={1.5} />
            {Array.from({ length: 40 }, (_, i) => (
              <rect key={i} x={10 + i * 22.5} y={15} width={14 + ((i * 7) % 5)} height={8} rx={3} fill="#2A2A31" />
            ))}
            {brace(0, 912, 54, transicion(frame, cFormula, fps, 700, EXPO_IN_OUT), c.a)}
            <text x={456} y={86} textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize={34} fill={c.a} opacity={transicion(frame, cFormula, fps, 500, EXPO_OUT)}>
              L = 30.000 caracteres
            </text>
            {/* Los trozos, alternando fila para que se vea el traslape */}
            {[0, 1, 2, 3].map((i) => {
              const k = transicion(frame, cTrozo + 10 + i * 8, fps, 500, EXPO_OUT);
              const x = i * P;
              return (
                <g key={i} opacity={k}>
                  <rect x={x} y={fila(i)} width={T * k} height={46} rx={10} fill={relleno} stroke={v.hueso} strokeWidth={2} />
                  <text x={x + 16} y={fila(i) + 31} fontFamily={mono} fontSize={20} fill={v.ceniza}>
                    #{i + 1}
                  </text>
                </g>
              );
            })}
            {[1, 2, 3].map((i) => {
              const k = transicion(frame, cO + i * 4, fps, 500, EXPO_OUT);
              return <rect key={i} x={i * P} y={fila(i - 1)} width={O} height={104} rx={6} fill={c.d} opacity={0.28 * k} stroke={c.d} strokeWidth={2} strokeOpacity={k} />;
            })}
            {/* t sobre el primer trozo */}
            <text x={T / 2 + 20} y={fila(0) + 32} textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize={32} fill={c.b} opacity={transicion(frame, cTrozo + 14, fps, 500, EXPO_OUT)}>
              t = 800
            </text>
            {/* o bajo el traslape */}
            <text x={P + O / 2} y={fila(1) + 82} textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize={32} fill={c.d} opacity={transicion(frame, cO + 4, fps, 500, EXPO_OUT)}>
              o = 150
            </text>
            {/* el paso: de un inicio al siguiente */}
            {frame >= cPaso ? (
              <g>
                {brace(0, P, 290, paso, c.c)}
                {brace(P, 2 * P, 290, transicion(frame, cPaso + 16, fps, 600, EXPO_IN_OUT), c.c)}
                <text x={2 * P + 24} y={300} fontFamily={serif} fontStyle="italic" fontSize={34} fill={c.c} opacity={paso}>
                  paso = t − o = 650
                </text>
              </g>
            ) : null}
          </svg>
          {/* La fórmula del número de trozos */}
          <div style={{ position: "absolute", left: 0, top: 340 }}>
            {frame >= cFormula - 4 ? (
              <Formula tam={70}>
                <Entra at={cFormula}>
                  <V id="n" color={c.c}>
                    n
                  </V>
                  <Op>=</Op>
                </Entra>
                <Entra at={cFormula + 6}>
                  <Techo>
                    <Frac
                      raya={transicion(frame, cFormula + 6, fps, 500, EXPO_OUT)}
                      arriba={
                        <>
                          <V id="L" color={c.a}>
                            L
                          </V>
                          <Op>−</Op>
                          <V id="o" color={c.d}>
                            o
                          </V>
                        </>
                      }
                      abajo={
                        <>
                          <V id="t" color={c.b}>
                            t
                          </V>
                          <Op>−</Op>
                          <V id="o" color={c.d}>
                            o
                          </V>
                        </>
                      }
                    />
                  </Techo>
                </Entra>
                {frame >= cEjemplo ? (
                  <Entra at={cEjemplo}>
                    <Op>=</Op>
                    <Techo>
                      <Frac
                        arriba={
                          <span style={{ fontStyle: "normal" }}>
                            <Cuenta at={cEjemplo + 4} hasta={29850} ms={700} />
                          </span>
                        }
                        abajo={<span style={{ fontStyle: "normal" }}>650</span>}
                      />
                    </Techo>
                    <Op>=</Op>
                    <span style={{ color: c.c, fontStyle: "normal", fontSize: 92, transform: `scale(${transicion(frame, cEjemplo + 26, fps, 500, backOut)})`, display: "inline-block" }}>46</span>
                  </Entra>
                ) : null}
              </Formula>
            ) : null}
          </div>
          {/* Lectura en palabras */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 580, height: 120 }}>
            <Caption at={cFormula + 20} hasta={cEjemplo} color={c.a}>
              largo menos traslape, dividido por el paso, redondeado hacia arriba
            </Caption>
            <Caption at={cEjemplo + 10} hasta={cCosto} color={c.c}>
              ⌈45,9⌉ = 46: el último trozo queda incompleto, pero existe
            </Caption>
            <Caption at={cCosto} color={c.d}>
              <Formula tam={50} style={{ display: "inline-flex" }}>
                <Frac
                  arriba={
                    <>
                      <V color={c.c}>n</V>
                      <Op>·</Op>
                      <V color={c.b}>t</V>
                    </>
                  }
                  abajo={<V color={c.a}>L</V>}
                />
                <Op>≈</Op>
                <Frac arriba={<V color={c.b}>t</V>} abajo={<span>t − o</span>} />
                <Op>=</Op>
                <span style={{ fontStyle: "normal" }}>1,23</span>
              </Formula>
              <div style={{ marginTop: 6 }}>
                → guardas <span style={{ color: c.d }}>+23 % de texto</span>; ninguna idea queda cortada
              </div>
            </Caption>
          </div>
        </Foco>
      </Escenario>
    </Escena>
  );
};

// ─── Embeddings: un trozo, 768 números, una dirección ────────────────────────
const Flecha: React.FC<{ ang: number; largo: number; color: string; at: number; etiqueta: string; ox: number; oy: number; ancho?: number }> = ({ ang, largo, color, at, etiqueta, ox, oy, ancho = 4 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 700, EXPO_OUT);
  if (k <= 0) return null;
  const r = (ang * Math.PI) / 180;
  const x = ox + Math.cos(r) * largo * k;
  const y = oy - Math.sin(r) * largo * k;
  const g = (Math.atan2(y - oy, x - ox) * 180) / Math.PI;
  return (
    <g>
      <line x1={ox} y1={oy} x2={x} y2={y} stroke={color} strokeWidth={ancho} strokeLinecap="round" />
      <path d="M0,0 L-20,-10 L-20,10 Z" fill={color} transform={`translate(${x},${y}) rotate(${g})`} />
      <text x={x + Math.cos(r) * 18} y={y - Math.sin(r) * 18 - 6} fontFamily={fuente} fontSize={26} fill={color} opacity={k} textAnchor={ang > 90 ? "end" : "start"}>
        {etiqueta}
      </text>
    </g>
  );
};

export const Vector: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cVec = useCue("vector");
  const cFlecha = useCue("flecha");
  const cGuardar = useCue("guardar");
  const TR: Caja = { x: 0, y: 0, w: 390, h: 210 };
  const VE: Caja = { x: 480, y: 0, w: 432, h: 210 };
  const nums = ["0,021", "−0,134", "0,088", "0,310", "−0,052", "0,147", "…", "0,047"];
  const p = resorte(frame, cVec + 6, fps, { k: 140, c: 16 });
  return (
    <Escena>
      <Rotulo at={cVec}>Embeddings</Rotulo>
      <Cinetico at={cVec + 4} texto="Un trozo,|*768 números.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={740} style={{ marginTop: 30 }}>
        <Cables alto={740}>
          <Cable de={ancla(TR, "r")} a={ancla(VE, "l")} at={cVec + 18} envios={[{ at: cVec + 30, ms: 700 }]} />
        </Cables>
        <div style={{ position: "absolute", left: TR.x, top: TR.y, width: TR.w, height: TR.h, boxSizing: "border-box", borderRadius: 22, border: `1.5px solid ${linea}`, background: relleno, padding: "18px 22px", opacity: Math.min(1, p * 1.6) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 600, letterSpacing: "0.1em", color: v.ceniza }}>
            <Scissors size={24} strokeWidth={1.6} color={v.ceniza} /> TROZO #12
          </div>
          <div style={{ fontSize: 28, fontWeight: 200, lineHeight: 1.35, marginTop: 10 }}>“…la espera en el control de seguridad subió 12 minutos…”</div>
        </div>
        <div style={{ position: "absolute", left: VE.x, top: VE.y, width: VE.w, height: VE.h, boxSizing: "border-box", borderRadius: 22, border: `2px solid ${frame >= cVec + 30 ? v.azafran : linea}`, background: relleno, padding: "16px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 600, letterSpacing: "0.1em", color: v.ceniza }}>
            VECTOR
            <span style={{ marginLeft: "auto", fontFamily: serif, fontStyle: "italic", fontSize: 32, letterSpacing: 0, color: c.b }}>d = 768</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px 8px", marginTop: 14, fontFamily: mono, fontSize: 24 }}>
            {nums.map((n, i) => (
              <span key={i} style={{ opacity: transicion(frame, cVec + 34 + i * 3, fps, 300, EXPO_OUT), color: n === "…" ? v.ceniza : v.hueso }}>
                {n}
              </span>
            ))}
          </div>
        </div>
        {/* La flecha: dirección = significado */}
        <svg width={912} height={270} style={{ position: "absolute", left: 0, top: 236, overflow: "visible" }}>
          <g opacity={transicion(frame, cFlecha - 6, fps, 400, EXPO_OUT)}>
            <line x1={70} y1={240} x2={900} y2={240} stroke={linea} strokeWidth={2} />
            <line x1={70} y1={240} x2={70} y2={10} stroke={linea} strokeWidth={2} />
          </g>
          <Flecha ox={70} oy={240} ang={24} largo={430} color={v.azafran} at={cFlecha} etiqueta="control de seguridad" />
          <Flecha ox={70} oy={240} ang={33} largo={380} color={c.b} at={cFlecha + 10} etiqueta="fila en seguridad" />
          <Flecha ox={70} oy={240} ang={82} largo={210} color={v.ceniza} at={cFlecha + 20} etiqueta="menú del café" ancho={3} />
        </svg>
        <Sube at={cFlecha + 30} style={{ position: "absolute", left: 560, top: 400 }}>
          <div style={{ fontSize: 30, fontWeight: 200, color: v.niebla }}>
            dirección = <span style={{ color: v.azafran }}>significado</span>
          </div>
        </Sube>
        <Codigo
          caja={{ x: 0, y: 530, w: 912, h: 210 }}
          at={cGuardar}
          archivo="vectores / trozo-12"
          Icono={DatabaseZap}
          tam={26}
          escalon={3}
          lineas={[
            [["documento", s.clave], [": "], ['"manual-operaciones.pdf"', s.valor]],
            [["tipo", s.clave], [": "], ['"procedimiento"', s.valor], ["   dueño", s.clave], [": "], ['"ana"', s.valor]],
            [["embedding", s.clave], [": "], ["[ 768 números ]", s.tipo]],
          ]}
        />
      </Escenario>
    </Escena>
  );
};

// ─── Cuenta 2: la similitud coseno, término por término ──────────────────────
const Diagrama: React.FC<{ at: number; atD: number }> = ({ at, atD }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const arco = transicion(frame, atD + 16, fps, 600, EXPO_OUT);
  const a1 = (22 * Math.PI) / 180;
  const a2 = (22 + 30 * arco) * (Math.PI / 180);
  const R = 120;
  const ox = 80;
  const oy = 250;
  return (
    <svg width={912} height={270} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      <line x1={ox} y1={oy} x2={560} y2={oy} stroke={linea} strokeWidth={2} />
      <line x1={ox} y1={oy} x2={ox} y2={10} stroke={linea} strokeWidth={2} />
      <Flecha ox={ox} oy={oy} ang={22} largo={420} color={c.a} at={at} etiqueta="" />
      <Flecha ox={ox} oy={oy} ang={52} largo={300} color={c.b} at={atD} etiqueta="" />
      {arco > 0 ? <path d={`M${ox + R * Math.cos(a1)},${oy - R * Math.sin(a1)} A${R},${R} 0 0 0 ${ox + R * Math.cos(a2)},${oy - R * Math.sin(a2)}`} fill="none" stroke={v.hueso} strokeWidth={2.5} /> : null}
      <text x={ox + 140} y={oy - 70} fontFamily={serif} fontStyle="italic" fontSize={40} fill={v.hueso} opacity={arco}>
        θ
      </text>
      <text x={ox + 420 * Math.cos(a1) + 14} y={oy - 420 * Math.sin(a1) + 8} fontFamily={serif} fontStyle="italic" fontSize={46} fill={c.a} opacity={transicion(frame, at + 10, fps, 400, EXPO_OUT)}>
        q
      </text>
      <text x={ox + 300 * Math.cos((52 * Math.PI) / 180) + 10} y={oy - 300 * Math.sin((52 * Math.PI) / 180) - 4} fontFamily={serif} fontStyle="italic" fontSize={46} fill={c.b} opacity={transicion(frame, atD + 10, fps, 400, EXPO_OUT)}>
        d
      </text>
    </svg>
  );
};

const Leyendas: React.FC<{ items: { at: number; s: React.ReactNode; color: string; que: string }[]; x: number; y: number }> = ({ items, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((it, i) => {
        const k = transicion(frame, it.at, fps, 500, EXPO_OUT);
        return (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 14, opacity: k, transform: `translateX(${(1 - k) * 20}px)` }}>
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 44, color: it.color, minWidth: 34 }}>{it.s}</span>
            <span style={{ fontSize: 28, fontWeight: 200, color: v.niebla }}>{it.que}</span>
          </div>
        );
      })}
    </div>
  );
};

export const Coseno: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cPreg = useCue("pregunta");
  const cD = useCueAt("pregunta", 0.55);
  const cNum = useCue("numerador");
  const cDen = useCue("denominador");
  const cRango = useCue("rango");
  const fase = ultimo(frame, [cNum, cDen, cRango]);
  const activas = [[], ["num"], ["den"], ["res"]][fase + 1];
  const marcador = transicion(frame, cRango + 20, fps, 1200, EXPO_IN_OUT);
  return (
    <Escena>
      <Rotulo at={cPreg}>Cuenta 2 · Similitud coseno</Rotulo>
      <Cinetico at={cPreg + 4} texto="¿Apuntan *igual?*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={800} style={{ marginTop: 24 }}>
        <Diagrama at={cPreg + 10} atD={cD} />
        <Leyendas
          x={600}
          y={40}
          items={[
            { at: cPreg + 14, s: "q", color: c.a, que: "la pregunta" },
            { at: cD + 8, s: "d", color: c.b, que: "un trozo" },
            { at: cD + 22, s: "θ", color: v.hueso, que: "el ángulo" },
          ]}
        />
        <Foco activas={activas}>
          <div style={{ position: "absolute", left: 0, top: 290 }}>
            <Formula tam={76}>
              <Entra at={cD + 30}>
                <V id="res" color={v.hueso} italica={false}>
                  cos <span style={{ fontStyle: "italic" }}>θ</span>
                </V>
                <Op>=</Op>
                <Frac
                  arriba={
                    <V id="num" color={c.a} italica={false}>
                      <span style={{ fontStyle: "italic" }}>q</span> · <span style={{ fontStyle: "italic", color: c.b }}>d</span>
                    </V>
                  }
                  abajo={
                    <V id="den" color={c.b} italica={false}>
                      <Norma>
                        <span style={{ fontStyle: "italic", color: c.a }}>q</span>
                      </Norma>
                      <Norma>
                        <span style={{ fontStyle: "italic" }}>d</span>
                      </Norma>
                    </V>
                  }
                />
              </Entra>
              {frame >= cNum ? (
                <Entra at={cNum + 4}>
                  <Op>=</Op>
                  <Frac
                    arriba={
                      <V id="num" color={c.a} italica={false}>
                        <Suma />
                        <span style={{ fontStyle: "italic" }}>q</span>
                        <Sub>i</Sub>
                        <span style={{ fontStyle: "italic", color: c.b }}>d</span>
                        <Sub>i</Sub>
                      </V>
                    }
                    abajo={
                      <V id="den" color={c.b} italica={false}>
                        <Raiz>
                          <span style={{ fontSize: "0.7em" }}>
                            Σ<span style={{ fontStyle: "italic", color: c.a }}>q</span>
                            <Sub>i</Sub>
                            <Sup>2</Sup>
                          </span>
                        </Raiz>
                        <Raiz>
                          <span style={{ fontSize: "0.7em" }}>
                            Σ<span style={{ fontStyle: "italic" }}>d</span>
                            <Sub>i</Sub>
                            <Sup>2</Sup>
                          </span>
                        </Raiz>
                      </V>
                    }
                  />
                </Entra>
              ) : null}
            </Formula>
          </div>
        </Foco>
        <div style={{ position: "absolute", left: 0, right: 0, top: 610, height: 150 }}>
          <Caption at={cNum + 10} hasta={cDen} color={c.a}>
            <b style={{ fontWeight: 400, color: c.a }}>producto punto</b>: multiplica las 768 dimensiones una a una y suma. ¿Apuntan al mismo lado?
          </Caption>
          <Caption at={cDen + 6} hasta={cRango} color={c.b}>
            <b style={{ fontWeight: 400, color: c.b }}>largos</b>: dividir por ellos borra el tamaño del texto; queda solo la dirección
          </Caption>
        </div>
        {frame >= cRango ? (
          <svg width={912} height={160} style={{ position: "absolute", left: 0, top: 630, overflow: "visible", opacity: transicion(frame, cRango, fps, 400, EXPO_OUT) }}>
            <line x1={40} y1={60} x2={872} y2={60} stroke={v.ceniza} strokeWidth={3} />
            {[
              [40, "−1", "opuestos"],
              [456, "0", "nada en común"],
              [872, "1", "mismo sentido"],
            ].map(([x, n, t]) => (
              <g key={n as string}>
                <line x1={x as number} y1={46} x2={x as number} y2={74} stroke={v.hueso} strokeWidth={3} />
                <text x={x as number} y={30} textAnchor="middle" fontFamily={serif} fontSize={40} fill={v.hueso}>
                  {n}
                </text>
                <text x={x as number} y={118} textAnchor="middle" fontFamily={fuente} fontWeight={200} fontSize={28} fill={v.niebla}>
                  {t}
                </text>
              </g>
            ))}
            <circle cx={456 + 416 * marcador} cy={60} r={14} fill={v.azafran} />
          </svg>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── El ejemplo: tres dimensiones, a mano ────────────────────────────────────
const Celda: React.FC<{ valor: string; color: string; k: number }> = ({ valor, color, k }) => (
  <div style={{ width: 190, height: 74, boxSizing: "border-box", borderRadius: 16, border: `2px solid ${color}`, background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, fontSize: 44, color: v.hueso, opacity: k, transform: `scale(${0.85 + 0.15 * k})` }}>{valor}</div>
);

export const Ejemplo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cProd = useCue("producto");
  const cRes = useCue("resultado");
  const cNorma = useCueAt("resultado", 0.3);
  const cTop = useCue("top");
  const cOrdena = useCueAt("top", 0.4);
  const largo = cRes - cProd;
  const col = (i: number) => transicion(frame, cProd + 10 + (largo * i) / 3.2, fps, 500, backOut);
  const q = ["0,8", "0,6", "0"];
  const d = ["0,6", "0,8", "0"];
  const qd = ["0,48", "0,48", "0"];
  const faseA = 1 - transicion(frame, cTop, fps, 400, EXPO_OUT);
  const faseB = transicion(frame, cTop + 6, fps, 500, EXPO_OUT);
  const trozos = [
    { id: 4, s: 0.74 },
    { id: 12, s: 0.96 },
    { id: 19, s: 0.52 },
    { id: 31, s: 0.88 },
    { id: 2, s: 0.31 },
    { id: 7, s: 0.91 },
  ];
  const orden = [...trozos].sort((a, b) => b.s - a.s);
  const mueve = transicion(frame, cOrdena, fps, 800, EXPO_IN_OUT);
  return (
    <Escena>
      <Rotulo at={cProd}>Ejemplo · 3 dimensiones</Rotulo>
      <Cinetico at={cProd + 4} texto="Hagamos la *cuenta.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={800} style={{ marginTop: 30 }}>
        <div style={{ position: "absolute", inset: 0, opacity: faseA }}>
          {[
            { s: "q", color: c.a, vals: q, k: () => 1 },
            { s: "d", color: c.b, vals: d, k: () => 1 },
            { s: "q·d", color: c.c, vals: qd, k: col },
          ].map((fila, r) => (
            <div key={r} style={{ position: "absolute", left: 0, top: r * 96, display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 120, fontFamily: serif, fontStyle: "italic", fontSize: 46, color: fila.color }}>{fila.s}</div>
              {fila.vals.map((x, i) => (
                <Celda key={i} valor={x} color={fila.color} k={r < 2 ? transicion(frame, cProd + 2 + r * 4 + i * 2, fps, 400, EXPO_OUT) : fila.k(i)} />
              ))}
            </div>
          ))}
          <div style={{ position: "absolute", left: 138, top: 300, fontFamily: serif, fontSize: 34, color: v.ceniza, display: "flex", gap: 86 }}>
            {["i = 1", "i = 2", "i = 3"].map((t) => (
              <span key={t} style={{ fontStyle: "italic", width: 120 }}>
                {t}
              </span>
            ))}
          </div>
          <div style={{ position: "absolute", left: 0, top: 370 }}>
            <Formula tam={62}>
              <Entra at={cRes - 4}>
                <Sigma size={52} strokeWidth={1.6} color={c.c} />
                <span style={{ marginLeft: 12 }}>
                  0,48 <Op>+</Op> 0,48 <Op>+</Op> 0 <Op>=</Op> <span style={{ color: c.c }}>0,96</span>
                </span>
              </Entra>
            </Formula>
          </div>
          <div style={{ position: "absolute", left: 0, top: 470 }}>
            <Formula tam={52}>
              <Entra at={cNorma}>
                <Norma>
                  <V color={c.a}>q</V>
                </Norma>
                <Op>=</Op>
                <Raiz>
                  <span>
                    0,8<Sup>2</Sup> + 0,6<Sup>2</Sup>
                  </span>
                </Raiz>
                <Op>=</Op>
                <Raiz>
                  <span>0,64 + 0,36</span>
                </Raiz>
                <Op>=</Op>1
              </Entra>
            </Formula>
          </div>
          <div style={{ position: "absolute", left: 0, top: 590 }}>
            <Formula tam={72}>
              <Entra at={cNorma + 40}>
                cos <V color={v.hueso}>θ</V>
                <Op>=</Op>
                <Frac arriba={<span style={{ color: c.c }}>0,96</span>} abajo={<span>1 · 1</span>} />
                <Op>=</Op>
                <span style={{ color: v.azafran, fontSize: 96, display: "inline-block", transform: `scale(${transicion(frame, cNorma + 52, fps, 500, backOut)})` }}>0,96</span>
              </Entra>
            </Formula>
          </div>
        </div>
        {faseB > 0 ? (
          <div style={{ position: "absolute", inset: 0, opacity: faseB }}>
            {trozos.map((t) => {
              const i0 = trozos.indexOf(t);
              const i1 = orden.indexOf(t);
              const y = (i0 + (i1 - i0) * mueve) * 100;
              const top3 = i1 < 3 && mueve >= 1;
              return (
                <div key={t.id} style={{ position: "absolute", left: 0, top: y, width: 700, height: 82, boxSizing: "border-box", borderRadius: 18, border: `${top3 ? 2.5 : 1.5}px solid ${top3 ? v.azafran : linea}`, background: relleno, display: "flex", alignItems: "center", gap: 18, padding: "0 22px" }}>
                  <FileText size={28} strokeWidth={1.6} color={top3 ? v.azafran : v.ceniza} />
                  <span style={{ fontFamily: mono, fontSize: 26, width: 150, color: v.niebla }}>trozo #{t.id}</span>
                  <div style={{ flex: 1, height: 12, borderRadius: 6, background: "#16161B" }}>
                    <div style={{ height: 12, borderRadius: 6, width: `${t.s * 100}%`, background: top3 ? v.azafran : v.ceniza }} />
                  </div>
                  <span style={{ fontFamily: serif, fontSize: 38, width: 80, textAlign: "right" }}>{t.s.toFixed(2).replace(".", ",")}</span>
                </div>
              );
            })}
            <div style={{ position: "absolute", left: 730, top: 0, height: 282, width: 182, display: "flex", alignItems: "center", gap: 12, opacity: transicion(frame, cOrdena + 26, fps, 500, EXPO_OUT) }}>
              <div style={{ width: 16, alignSelf: "stretch", borderTop: `3px solid ${v.azafran}`, borderRight: `3px solid ${v.azafran}`, borderBottom: `3px solid ${v.azafran}`, borderRadius: "0 10px 10px 0" }} />
              <div>
                <BrainCircuit size={44} strokeWidth={1.6} color={v.azafran} />
                <div style={{ fontSize: 26, lineHeight: 1.2, marginTop: 6 }}>
                  top-3
                  <br />
                  <span style={{ fontWeight: 200, color: v.niebla }}>al modelo</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── Cuenta 3: cuánto cuesta, en notación Big O ──────────────────────────────
const Renglon: React.FC<{ at: number; y: number; children: React.ReactNode; color: string; activo?: boolean }> = ({ at, y, children, color, activo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = resorte(frame, at, fps, { k: 160, c: 18 });
  if (frame < at) return null;
  return (
    <div style={{ position: "absolute", left: 0, top: y, width: 912, height: 62, boxSizing: "border-box", borderRadius: 16, border: `${activo ? 2.5 : 1.5}px solid ${activo ? color : linea}`, background: relleno, display: "flex", alignItems: "center", gap: 16, padding: "0 20px", opacity: Math.min(1, k * 1.5), transform: `translateX(${(1 - Math.min(1, k)) * 40}px)`, fontSize: 28, whiteSpace: "nowrap" }}>
      <div style={{ width: 12, height: 12, borderRadius: 6, background: color, flexShrink: 0 }} />
      {children}
    </div>
  );
};

export const BigO: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cCosto = useCue("costo");
  const cLineal = useCue("lineal");
  const cHoy = useCue("hoy");
  const cMillon = useCue("millon");
  const cOrden = useCue("orden");
  const cIndice = useCue("indice");
  const fase = ultimo(frame, [cLineal, cHoy, cMillon, cOrden, cIndice]);
  const activas = [[], ["n", "d"], ["n"], ["n"], ["n", "k"], ["n"]][fase + 1];
  // Gráfico: n de 0 a 1.000.000 en x, multiplicaciones de 0 a 800 millones en y.
  const X0 = 110;
  const X1 = 880;
  const Y0 = 330;
  const Y1 = 20;
  const px = (n: number) => X0 + ((X1 - X0) * n) / 1e6;
  const py = (m: number) => Y0 - ((Y0 - Y1) * m) / 8e8;
  const linea1 = transicion(frame, cLineal + 10, fps, 900, EXPO_IN_OUT);
  const viaje = transicion(frame, cMillon + 4, fps, 1400, EXPO_IN_OUT);
  const nAhora = frame >= cMillon ? 911 + (1e6 - 911) * viaje : 911;
  const log = transicion(frame, cIndice + 10, fps, 900, EXPO_IN_OUT);
  const curvaLog = Array.from({ length: 50 }, (_, i) => {
    const n = 1 + (i / 49) * 1e6;
    // d · log2 n, escalado ×2000 para que se vea que existe: aun así queda pegada al piso.
    return `${px(n).toFixed(1)},${py(768 * Math.log2(n) * 2000).toFixed(1)}`;
  });
  return (
    <Escena>
      <Rotulo at={cCosto}>Cuenta 3 · Notación Big O</Rotulo>
      <Cinetico at={cCosto + 4} texto="¿Cuánto *cuesta?*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={800} style={{ marginTop: 24 }}>
        <Foco activas={activas}>
          <div style={{ position: "absolute", left: 0, top: 0, display: "flex", alignItems: "center", gap: 28 }}>
            <Formula tam={76}>
              <Entra at={cLineal}>
                <V color={v.azafran} italica={false}>
                  O
                </V>
                (
                <V id="n" color={c.a}>
                  n
                </V>
                <Op>·</Op>
                <V id="d" color={c.b}>
                  d
                </V>
                )
              </Entra>
            </Formula>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 26, fontWeight: 200, color: v.niebla, opacity: transicion(frame, cLineal + 14, fps, 500, EXPO_OUT) }}>
              <span>
                <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 34, color: c.a }}>n</span> = número de trozos
              </span>
              <span>
                <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 34, color: c.b }}>d</span> = 768 dimensiones
              </span>
            </div>
          </div>
        </Foco>
        <svg width={912} height={380} style={{ position: "absolute", left: 0, top: 130, overflow: "visible", opacity: transicion(frame, cLineal, fps, 500, EXPO_OUT) }}>
          <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke={v.ceniza} strokeWidth={2} />
          <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke={v.ceniza} strokeWidth={2} />
          {[0, 250e3, 500e3, 750e3, 1e6].map((n) => (
            <text key={n} x={px(n)} y={Y0 + 34} textAnchor="middle" fontFamily={mono} fontSize={20} fill={v.ceniza}>
              {n === 0 ? "0" : n === 1e6 ? "1 M" : `${n / 1000} mil`}
            </text>
          ))}
          {[200e6, 400e6, 600e6, 800e6].map((m) => (
            <text key={m} x={X0 - 14} y={py(m) + 7} textAnchor="end" fontFamily={mono} fontSize={20} fill={v.ceniza}>
              {m / 1e6} M
            </text>
          ))}
          <text x={X1} y={Y0 + 66} textAnchor="end" fontFamily={serif} fontStyle="italic" fontSize={30} fill={c.a}>
            n trozos →
          </text>
          <line x1={px(0)} y1={py(0)} x2={px(1e6 * linea1)} y2={py(768e6 * linea1)} stroke={v.azafran} strokeWidth={4} strokeLinecap="round" />
          {log > 0 ? <polyline points={curvaLog.slice(0, Math.max(2, Math.round(curvaLog.length * log))).join(" ")} fill="none" stroke={c.c} strokeWidth={4} strokeLinejoin="round" /> : null}
          {log > 0 ? (
            <text x={X1 - 10} y={py(768 * 20 * 2000) - 18} textAnchor="end" fontFamily={fuente} fontSize={26} fill={c.c} opacity={log}>
              índice: crece como log n
            </text>
          ) : null}
          {frame >= cHoy ? (
            <g opacity={transicion(frame, cHoy, fps, 400, EXPO_OUT)}>
              <circle cx={px(nAhora)} cy={py(nAhora * 768)} r={12} fill={v.hueso} />
              <circle cx={px(nAhora)} cy={py(nAhora * 768)} r={24} fill={v.hueso} opacity={0.18} />
            </g>
          ) : null}
        </svg>
        <Renglon at={cHoy} y={540} color={v.hueso} activo={fase === 1}>
          <span style={{ fontFamily: mono, fontSize: 26 }}>911 × 768 =</span>
          <Cuenta at={cHoy + 6} hasta={699648} style={{ fontFamily: mono, fontSize: 28 }} />
          <span style={{ marginLeft: "auto", fontWeight: 200, color: v.niebla }}>milisegundos</span>
        </Renglon>
        <Renglon at={cMillon} y={612} color={v.azafran} activo={fase === 2}>
          <span style={{ fontFamily: mono, fontSize: 26 }}>1 M × 768 =</span>
          <Cuenta at={cMillon + 6} desde={699648} hasta={768e6} ms={1400} style={{ fontFamily: mono, fontSize: 28 }} />
          <span style={{ marginLeft: "auto", fontWeight: 200, color: v.niebla }}>&gt; 3 GB en RAM</span>
        </Renglon>
        <Renglon at={cOrden} y={684} color={c.d} activo={fase === 3}>
          <Formula tam={36}>
            ordenar <Op> </Op>
            <V color={c.d} italica={false}>
              O
            </V>
            (<V color={c.a}>n</V> log <V color={c.a}>n</V>)<Op>→</Op>top-3 <Op> </Op>
            <V color={c.d} italica={false}>
              O
            </V>
            (<V color={c.a}>n</V> log <V color={c.c}>k</V>)
          </Formula>
          <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 22, color: v.niebla, opacity: transicion(frame, cOrden + 50, fps, 500, EXPO_OUT) }}>19,9 M → 1,6 M</span>
        </Renglon>
        <Renglon at={cIndice} y={756} color={c.c} activo={fase === 4}>
          <TrendingUp size={28} strokeWidth={1.6} color={c.c} />
          índice aproximado <span style={{ fontWeight: 200, color: v.niebla }}>(HNSW · ScaNN)</span>
          <Formula tam={36} style={{ marginLeft: "auto" }}>
            ≈ <V color={c.c} italica={false}>O</V>(<V color={c.b}>d</V> log <V color={c.a}>n</V>)
          </Formula>
        </Renglon>
      </Escenario>
    </Escena>
  );
};

// ─── El umbral: 0,87 es configuración ────────────────────────────────────────
export const Umbral: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cUmbral = useCue("umbral");
  const cExiste = useCueAt("umbral", 0.45);
  const cMueve = useCue("mueve");
  const cBaja = useCueAt("mueve", 0.32);
  const cVuelve = useCueAt("mueve", 0.62);
  const sube = transicion(frame, cMueve + 4, fps, 800, EXPO_IN_OUT);
  const baja = transicion(frame, cBaja + 4, fps, 900, EXPO_IN_OUT);
  const vuelve = transicion(frame, cVuelve + 4, fps, 800, EXPO_IN_OUT);
  const u = 0.87 + 0.07 * sube - 0.16 * baja + 0.09 * vuelve;
  const puntajes = [0.64, 0.71, 0.77, 0.82, 0.85, 0.88, 0.9, 0.93, 0.96];
  const X0 = 40;
  const X1 = 872;
  const px = (x: number) => X0 + ((X1 - X0) * (x - 0.6)) / 0.4;
  const existentes = puntajes.filter((p) => p >= u).length;
  const clasifica = frame >= cExiste;
  const etiqueta = frame >= cVuelve + 10 ? "" : frame >= cBaja + 10 ? "mezclas" : frame >= cMueve + 10 ? "fragmentas" : "";
  return (
    <Escena>
      <Rotulo at={cUmbral}>El umbral</Rotulo>
      <Cinetico at={cUmbral + 4} texto="Configuración,|*no código.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={700} style={{ marginTop: 30 }}>
        <Codigo
          caja={{ x: 0, y: 0, w: 912, h: 132 }}
          at={cUmbral + 6}
          archivo="application.yaml"
          Icono={SlidersHorizontal}
          resaltar={[0]}
          lineas={[[["topic-similarity-threshold", s.clave], [": "], [u.toFixed(2), s.valor]]]}
        />
        <svg width={912} height={300} style={{ position: "absolute", left: 0, top: 170, overflow: "visible", opacity: transicion(frame, cUmbral + 10, fps, 500, EXPO_OUT) }}>
          <line x1={X0} y1={200} x2={X1} y2={200} stroke={v.ceniza} strokeWidth={2} />
          {[0.6, 0.7, 0.8, 0.9, 1].map((x) => (
            <text key={x} x={px(x)} y={240} textAnchor="middle" fontFamily={serif} fontSize={30} fill={v.ceniza}>
              {x.toFixed(1).replace(".", ",")}
            </text>
          ))}
          {puntajes.map((p, i) => {
            const sobre = p >= u;
            const k = transicion(frame, cUmbral + 14 + i * 2, fps, 400, backOut);
            const col = !clasifica ? v.hueso : sobre ? c.c : c.b;
            return <circle key={p} cx={px(p)} cy={200 - 70 - (i % 2) * 44} r={18 * k} fill={clasifica && sobre ? col : relleno} stroke={col} strokeWidth={3} />;
          })}
          <line x1={px(u)} y1={20} x2={px(u)} y2={214} stroke={v.azafran} strokeWidth={3} strokeDasharray="8 8" />
          <text x={px(u)} y={8} textAnchor="middle" fontFamily={serif} fontSize={34} fill={v.azafran}>
            {u.toFixed(2).replace(".", ",")}
          </text>
          {etiqueta ? (
            <text x={px(u) + (etiqueta === "mezclas" ? 24 : -24)} y={60} textAnchor={etiqueta === "mezclas" ? "start" : "end"} fontFamily={fuente} fontSize={32} fill={v.azafran}>
              {etiqueta}
            </text>
          ) : null}
        </svg>
        {clasifica ? (
          <Sube at={cExiste} style={{ position: "absolute", left: 0, top: 500, width: 912, display: "flex", gap: 24 }}>
            {[
              { n: existentes, t: "se suman a un tema", col: c.c },
              { n: puntajes.length - existentes, t: "abren tema nuevo", col: c.b },
            ].map((b) => (
              <div key={b.t} style={{ flex: 1, borderRadius: 20, border: `1.5px solid ${linea}`, background: relleno, padding: "16px 22px", display: "flex", alignItems: "center", gap: 18 }}>
                <span style={{ fontFamily: serif, fontSize: 72, color: b.col, width: 50 }}>{b.n}</span>
                <span style={{ fontSize: 28, fontWeight: 200, color: v.niebla }}>{b.t}</span>
              </div>
            ))}
          </Sube>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── Qué acelera: ingerir es lineal ──────────────────────────────────────────
export const Acelera: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cLotes = useCue("lotes");
  const cFuentes = useCue("fuentes");
  const barrido = transicion(frame, cLotes + 40, fps, 2400, (t) => t);
  const lotesListos = Math.min(10, Math.floor(barrido * 10.01));
  return (
    <Escena>
      <Rotulo at={cLotes}>Qué acelera</Rotulo>
      <Cinetico at={cLotes + 4} texto="Minutos,|*no semanas.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={700} style={{ marginTop: 30 }}>
        <div style={{ position: "absolute", left: 0, top: 0 }}>
          <Formula tam={58}>
            <Entra at={cLotes + 8}>
              llamadas<Op>=</Op>
              <Techo>
                <Frac arriba={<V color={c.a}>n</V>} abajo={<V color={c.b}>b</V>} />
              </Techo>
              <Op>=</Op>
              <Techo>
                <Frac arriba={<span style={{ color: c.a }}>46</span>} abajo={<span style={{ color: c.b }}>5</span>} />
              </Techo>
              <Op>=</Op>
              <span style={{ color: v.azafran }}>
                <Cuenta at={cLotes + 40} hasta={10} ms={2400} />
              </span>
            </Entra>
          </Formula>
          <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 8, opacity: transicion(frame, cLotes + 20, fps, 500, EXPO_OUT) }}>
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 32, color: c.a }}>n</span> = 46 trozos ·{" "}
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 32, color: c.b }}>b</span> = 5 por lote · crece como <span style={{ fontFamily: serif, fontSize: 32, color: v.hueso }}>O(n)</span>
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, top: 230, display: "flex", gap: 14 }}>
          {Array.from({ length: 10 }, (_, b) => (
            <div key={b} style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8, borderRadius: 14, border: `1.5px solid ${b < lotesListos ? v.azafran : linea}` }}>
              {Array.from({ length: b === 9 ? 1 : 5 }, (_, i) => (
                <div key={i} style={{ width: 58, height: 26, borderRadius: 6, background: b < lotesListos ? v.azafran : "#1E1E24", opacity: transicion(frame, cLotes + 10 + (b * 5 + i) * 0.4, fps, 300, EXPO_OUT) }} />
              ))}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: 470, width: 912, opacity: transicion(frame, cFuentes + 30, fps, 500, EXPO_OUT) }}>
          <div style={{ borderRadius: 22, border: `1.5px solid ${linea}`, background: relleno, padding: "18px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 20, fontWeight: 600, letterSpacing: "0.1em", color: v.ceniza }}>
              <BrainCircuit size={26} strokeWidth={1.6} color={v.hueso} /> RESPUESTA
            </div>
            <div style={{ fontSize: 30, fontWeight: 200, marginTop: 8 }}>La espera en seguridad subió 12 minutos en la punta de la mañana.</div>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              {["informe.pdf · 0,96", "manual.pdf · 0,91", "acta.pdf · 0,88"].map((t, i) => (
                <span key={t} style={{ opacity: transicion(frame, cFuentes + 40 + i * 5, fps, 400, EXPO_OUT) }}>
                  <Chip texto={t} activo={i === 0} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Cierre: cinco capas, tres cuentas ───────────────────────────────────────
export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cDemo = useCue("demo");
  const cCta = useCue("cta");
  const cuentas: React.ReactNode[] = [
    <>
      <V color={c.c}>n</V>
      <Op>=</Op>
      <Techo>
        <Frac
          arriba={
            <>
              <V color={c.a}>L</V>
              <Op>−</Op>
              <V color={c.d}>o</V>
            </>
          }
          abajo={
            <>
              <V color={c.b}>t</V>
              <Op>−</Op>
              <V color={c.d}>o</V>
            </>
          }
        />
      </Techo>
    </>,
    <>
      cos <V color={v.hueso}>θ</V>
      <Op>=</Op>
      <Frac
        arriba={
          <>
            <V color={c.a}>q</V> · <V color={c.b}>d</V>
          </>
        }
        abajo={
          <>
            <Norma>
              <V color={c.a}>q</V>
            </Norma>
            <Norma>
              <V color={c.b}>d</V>
            </Norma>
          </>
        }
      />
    </>,
    <>
      <V color={v.azafran} italica={false}>
        O
      </V>
      (<V color={c.a}>n</V>·<V color={c.b}>d</V>)<Op>→</Op>
      <V color={c.c} italica={false}>
        O
      </V>
      (log <V color={c.a}>n</V>)
    </>,
  ];
  return (
    <Escena>
      <div style={{ position: "absolute", left: -80, right: -80, top: -110, display: "flex", justifyContent: "center" }}>
        <Constelacion at={cDemo - 30} ancho={560} forma="cerebro" />
      </div>
      <div style={{ marginTop: 290 }}>
        <Cinetico at={cDemo} texto="5 capas.|3 *cuentas.*" style={{ fontSize: 96 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 26 }}>
          {cuentas.map((f, i) => {
            const k = transicion(frame, cDemo + 14 + i * 6, fps, 500, backOut);
            return (
              <div key={i} style={{ height: 108, boxSizing: "border-box", borderRadius: 20, border: `1.5px solid ${linea}`, background: relleno, padding: "0 24px", display: "flex", alignItems: "center", gap: 24, opacity: Math.min(1, k * 1.5), transform: `translateX(${(1 - k) * 40}px)` }}>
                <span style={{ width: 150, fontSize: 22, fontWeight: 600, letterSpacing: "0.1em", color: v.ceniza }}>{["TROZOS", "SIMILITUD", "COSTO"][i]}</span>
                <Formula tam={44}>{f}</Formula>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 8}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
      </div>
    </Escena>
  );
};
