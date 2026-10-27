import React from "react";
import {
  BookOpen,
  BrainCircuit,
  Check,
  Code,
  Dices,
  EyeOff,
  FileText,
  FlaskConical,
  Gift,
  GitBranch,
  GraduationCap,
  IceCreamCone,
  Megaphone,
  MessageSquare,
  RotateCcw,
  ScanSearch,
  ShieldCheck,
  Sun,
  Table,
  TriangleAlert,
  User,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, resorte, transicion } from "../../estilos/vacio/movimiento";
import { colores as c, Entra, Foco, Formula, Frac, Op, Raiz, serif, Sub, Sup, V } from "../../estilos/vacio/mate";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { ancla, Cable, Cables, type Caja, Chip, Escenario, linea, mono, punto, relleno, Tarjeta } from "../../estilos/vacio/tecnico";
import { fuente, tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const ROJO = "#FF5C6C";
const ultimo = (frame: number, cues: number[]) => cues.reduce((acc, cue, i) => (frame >= cue ? i : acc), -1);

// Una línea de lectura con punto de color, que entra y (opcionalmente) sale.
const Nota: React.FC<{ at: number; hasta?: number; color?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, hasta, color = v.azafran, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 500, EXPO_OUT) * (hasta === undefined ? 1 : 1 - transicion(frame, hasta, fps, 300, EXPO_OUT));
  if (k <= 0) return null;
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start", opacity: k, transform: `translateY(${(1 - k) * 14}px)`, ...style }}>
      <div style={{ width: 12, height: 12, borderRadius: 6, background: color, marginTop: 14, flexShrink: 0 }} />
      <div style={{ fontSize: 32, fontWeight: 200, lineHeight: 1.3 }}>{children}</div>
    </div>
  );
};

// Una tarjeta simple, posicionada, con borde de estado.
const Caja_: React.FC<{ caja: Caja; at: number; color?: string; children: React.ReactNode; estilo?: React.CSSProperties }> = ({ caja, at, color, children, estilo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = resorte(frame, at, fps, { k: 140, c: 16 });
  return (
    <div style={{ position: "absolute", left: caja.x, top: caja.y, width: caja.w, height: caja.h, boxSizing: "border-box", borderRadius: 22, border: `${color ? 2.5 : 1.5}px solid ${color ?? linea}`, background: relleno, padding: "16px 20px", opacity: Math.min(1, p * 1.6), transform: `translateY(${(1 - Math.min(1, p)) * 24}px)`, ...estilo }}>
      {children}
    </div>
  );
};

const Rol: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = v.ceniza }) => <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color }}>{children}</div>;

// Media con barra: x̄.
const Media: React.FC<{ children: React.ReactNode; color?: string; sub?: string }> = ({ children, color, sub }) => (
  <V color={color}>
    <span style={{ borderTop: `3px solid ${color ?? v.hueso}`, paddingTop: 2 }}>{children}</span>
    {sub ? <Sub>{sub}</Sub> : null}
  </V>
);

// ─── Gancho: ¿la campaña o diciembre? ─────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cVentas = useCue("ventas");
  const cAgente = useCue("agente");
  const ventas = [52, 50, 55, 53, 57, 56, 58, 60, 59, 62, 68, 96];
  const X0 = 40;
  const X1 = 880;
  const px = (i: number) => X0 + ((X1 - X0) * i) / 11;
  const py = (y: number) => 380 - (y - 40) * 5.2;
  const k = transicion(frame, cVentas + 4, fps, 1400, EXPO_IN_OUT);
  const visibles = Math.max(2, Math.round(1 + 11 * k));
  const dudas = transicion(frame, cVentas + 50, fps, 500, backOut);
  return (
    <Escena>
      <Escenario alto={500}>
        <svg width={912} height={440} style={{ position: "absolute", left: 0, top: 30, overflow: "visible" }}>
          <line x1={X0} y1={400} x2={X1} y2={400} stroke={linea} strokeWidth={2} />
          {["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
            <text key={i} x={px(i)} y={432} textAnchor="middle" fontFamily={mono} fontSize={22} fill={v.ceniza}>
              {m}
            </text>
          ))}
          <polyline points={ventas.slice(0, visibles).map((y, i) => `${px(i)},${py(y)}`).join(" ")} fill="none" stroke={v.azafran} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
          {visibles >= 12 ? <circle cx={px(11)} cy={py(96)} r={12} fill={v.azafran} /> : null}
          <rect x={px(9.5)} y={40} width={px(11) - px(9.5) + 24} height={360} rx={12} fill={c.b} opacity={0.12 * dudas} />
        </svg>
        <div style={{ position: "absolute", left: 300, top: 0, display: "flex", gap: 18, opacity: Math.min(1, dudas * 1.4), transform: `scale(${0.8 + 0.2 * dudas})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 999, border: `2px solid ${c.b}`, background: relleno, fontSize: 30 }}>
            <Megaphone size={30} strokeWidth={1.6} color={c.b} /> ¿campaña?
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 999, border: `2px solid ${c.d}`, background: relleno, fontSize: 30 }}>
            <Gift size={30} strokeWidth={1.6} color={c.d} /> ¿diciembre?
          </div>
        </div>
      </Escenario>
      <div style={{ marginTop: 40 }}>
        <Cinetico at={cVentas + 10} texto="¿Causa o|*coincidencia?*" style={{ fontSize: 100 }} />
        <Sube at={cAgente + 20} style={{ marginTop: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 200, color: v.niebla }}>
            <BrainCircuit size={44} strokeWidth={1.6} color={v.azafran} /> un agente de IA que lo responde solo
          </div>
        </Sube>
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ serie, autor }) => (
  <Escena>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, display: "flex", justifyContent: "center" }}>
      <Constelacion at={-60} ancho={700} forma="red" cantidad={540} />
    </div>
    <div style={{ marginTop: 450 }}>
      <Rotulo at={2}>{serie} · 03</Rotulo>
      <Cinetico at={6} texto="Causal AI|*Scientist.*" size="display" style={{ marginTop: 18, fontSize: 130 }} />
      <Sube at={24}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>inferencia causal de punta a punta, con modelos de lenguaje</div>
      </Sube>
      <Sube at={34}>
        <div style={{ fontSize: 24, fontWeight: 200, color: v.ceniza, marginTop: 18 }}>Verma, Acharya, … Schölkopf, Jin · explicado por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Correlación no es causalidad: el confusor ────────────────────────────────
const Mini: React.FC<{ x: number; y: number; w: number; h: number; serie: number[]; color: string; k: number; titulo: string; Icono: LucideIcon }> = ({ x, y, w, h, serie, color, k, titulo, Icono }) => {
  const n = serie.length - 1;
  const max = Math.max(...serie);
  const min = Math.min(...serie);
  const pts = serie.slice(0, Math.max(2, Math.round(1 + n * k))).map((s, i) => `${x + (w * i) / n},${y + h - ((s - min) / (max - min)) * h}`);
  return (
    <g>
      <foreignObject x={x} y={y - 54} width={w} height={44}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: fuente, fontSize: 28, color }}>
          <Icono size={30} strokeWidth={1.6} color={color} /> {titulo}
        </div>
      </foreignObject>
      <line x1={x} y1={y + h + 6} x2={x + w} y2={y + h + 6} stroke={linea} strokeWidth={2} />
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={4.5} strokeLinejoin="round" />
    </g>
  );
};

export const Correlacion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cJuntas = useCue("juntas");
  const cHelados = useCue("helados");
  const cConf = useCue("confusor");
  const helados = [20, 24, 34, 48, 66, 80, 86, 78, 60, 40, 28, 22];
  const ahog = [10, 12, 18, 30, 44, 56, 60, 52, 40, 26, 16, 12];
  const k = transicion(frame, cJuntas + 10, fps, 1500, EXPO_IN_OUT);
  const H: Caja = { x: 0, y: 470, w: 380, h: 140 };
  const A: Caja = { x: 532, y: 470, w: 380, h: 140 };
  const C: Caja = { x: 256, y: 290, w: 400, h: 120 };
  const tacha = transicion(frame, cConf + 4, fps, 400, EXPO_OUT);
  return (
    <Escena>
      <Rotulo at={cJuntas}>Lo básico</Rotulo>
      <Cinetico at={cJuntas + 4} texto="Correlación no es|*causalidad.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={640} style={{ marginTop: 30 }}>
        <svg width={912} height={240} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <Mini x={0} y={70} w={420} h={150} serie={helados} color={v.azafran} k={k} titulo="helados" Icono={IceCreamCone} />
          <Mini x={492} y={70} w={420} h={150} serie={ahog} color={c.b} k={k} titulo="ahogamientos" Icono={Waves} />
        </svg>
        <Cables alto={640}>
          <Cable de={ancla(H, "r")} a={ancla(A, "l")} at={cHelados + 6} discontinuo color={tacha > 0 ? ROJO : v.ceniza} etiqueta="?" opacidad={1 - tacha * 0.4} />
          <Cable de={ancla(C, "l")} a={ancla(H, "t")} at={cConf + 10} color={v.azafran} curvatura={0.35} />
          <Cable de={ancla(C, "r")} a={ancla(A, "t")} at={cConf + 14} color={v.azafran} curvatura={0.35} />
        </Cables>
        <Tarjeta caja={H} at={cHelados} Icono={IceCreamCone} rol="Variable" titulo="Helados" />
        <Tarjeta caja={A} at={cHelados + 4} Icono={Waves} rol="Variable" titulo="Ahogamientos" />
        {frame >= cConf ? <Tarjeta caja={C} at={cConf} Icono={Sun} rol="Confusor" titulo="Calor" activo /> : null}
        {tacha > 0 ? (
          <div style={{ position: "absolute", left: 456 - 30, top: 540 - 30, width: 60, height: 60, borderRadius: 30, background: ROJO, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${tacha})` }}>
            <X size={40} strokeWidth={3} color={v.vacio} />
          </div>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── El contrafactual: dos mundos y una resta ─────────────────────────────────
export const Contrafactual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cMundos = useCue("mundos");
  const cFormula = useCue("formula");
  const cNunca = useCue("nunca");
  const fase = ultimo(frame, [cFormula, cNunca]);
  const activas = [["y1", "y0"], ["y1", "y0", "tau"], ["y0"]][fase + 1];
  const sello = transicion(frame, cNunca + 6, fps, 500, backOut);
  const mundo = (x: number, titulo: string, color: string, valor: React.ReactNode, fantasma: boolean, at: number) => (
    <Caja_ caja={{ x, y: 0, w: 440, h: 300 }} at={at} color={fantasma ? undefined : color} estilo={{ borderStyle: fantasma ? "dashed" : "solid", borderColor: fantasma ? v.ceniza : color }}>
      <Rol color={color}>{titulo}</Rol>
      <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 20 }}>
        <div style={{ width: 110, height: 110, borderRadius: 55, border: `2px ${fantasma ? "dashed" : "solid"} ${color}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: fantasma ? 0.55 : 1 }}>
          <User size={64} strokeWidth={1.4} color={color} />
        </div>
        <Formula tam={64}>{valor}</Formula>
      </div>
    </Caja_>
  );
  return (
    <Escena>
      <Rotulo at={cMundos}>El contrafactual</Rotulo>
      <Cinetico at={cMundos + 4} texto="Dos mundos,|*una persona.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={700} style={{ marginTop: 30 }}>
        <Foco activas={activas}>
          {mundo(
            0,
            "con tratamiento",
            v.azafran,
            <V id="y1" color={v.azafran}>
              Y(1)
            </V>,
            false,
            cMundos + 10,
          )}
          {mundo(
            472,
            "sin tratamiento",
            c.b,
            <V id="y0" color={c.b}>
              Y(0)
            </V>,
            true,
            cMundos + 16,
          )}
          {sello > 0 ? (
            <div style={{ position: "absolute", left: 540, top: 214, padding: "6px 16px", borderRadius: 10, border: `3px solid ${ROJO}`, color: ROJO, fontSize: 26, fontWeight: 600, letterSpacing: "0.1em", transform: `rotate(-6deg) scale(${sello})` }}>NUNCA OBSERVADO</div>
          ) : null}
          <div style={{ position: "absolute", left: 0, top: 350 }}>
            {frame >= cFormula ? (
              <Formula tam={76}>
                <Entra at={cFormula}>
                  <V id="tau" color={c.c}>
                    τ
                  </V>
                  <Op>=</Op>
                  <V id="tau" color={c.c} italica={false}>
                    E
                  </V>
                  [
                  <V id="y1" color={v.azafran}>
                    Y(1)
                  </V>
                  <Op>−</Op>
                  <V id="y0" color={c.b}>
                    Y(0)
                  </V>
                  ]
                </Entra>
              </Formula>
            ) : null}
          </div>
        </Foco>
        <div style={{ position: "absolute", left: 0, right: 0, top: 480, display: "flex", flexDirection: "column", gap: 10 }}>
          <Nota at={cFormula + 14} color={v.azafran}>
            <span style={{ fontFamily: serif, fontStyle: "italic", color: v.azafran }}>Y(1)</span>: el resultado si recibe el tratamiento
          </Nota>
          <Nota at={cFormula + 22} color={c.b}>
            <span style={{ fontFamily: serif, fontStyle: "italic", color: c.b }}>Y(0)</span>: el resultado si no lo recibe
          </Nota>
          <Nota at={cFormula + 30} color={c.c}>
            <span style={{ fontFamily: serif, color: c.c }}>E[ ]</span>: el promedio sobre todas las personas
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El experimento: sortear y restar promedios ───────────────────────────────
export const Experimento: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cSorteo = useCue("sorteo");
  const cProm = useCue("promedios");
  const n = 24;
  // Sorteo determinista: la mitad a cada grupo, en un orden revuelto.
  const grupo = Array.from({ length: n }, (_, i) => ((i * 7 + 3) % n) % 2);
  const mueve = transicion(frame, cSorteo + 30, fps, 1100, EXPO_IN_OUT);
  return (
    <Escena>
      <Rotulo at={cSorteo}>El experimento</Rotulo>
      <Cinetico at={cSorteo + 4} texto="Sortear|*y restar.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={700} style={{ marginTop: 30 }}>
        <div style={{ position: "absolute", left: 406, top: 120, opacity: 1 - mueve, transform: `rotate(${frame * 6}deg)` }}>
          <Dices size={100} strokeWidth={1.4} color={v.hueso} />
        </div>
        {Array.from({ length: n }, (_, i) => {
          const g = grupo[i];
          const enGrupo = Math.floor(i / 2);
          const x0 = 300 + (i % 6) * 54;
          const y0 = 40 + Math.floor(i / 6) * 54;
          const x1 = (g === 0 ? 30 : 512) + (enGrupo % 4) * 90;
          const y1 = 60 + Math.floor(enGrupo / 4) * 90;
          const x = x0 + (x1 - x0) * mueve;
          const y = y0 + (y1 - y0) * mueve;
          const col = mueve > 0.5 ? (g === 0 ? v.azafran : c.b) : v.ceniza;
          return (
            <div key={i} style={{ position: "absolute", left: x, top: y, opacity: transicion(frame, cSorteo + 6 + i * 0.6, fps, 300, EXPO_OUT) }}>
              <User size={52} strokeWidth={1.6} color={col} />
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 30, top: 0, opacity: mueve }}>
          <Rol color={v.azafran}>Tratados (T)</Rol>
        </div>
        <div style={{ position: "absolute", left: 512, top: 0, opacity: mueve }}>
          <Rol color={c.b}>Control (C)</Rol>
        </div>
        <Nota at={cSorteo + 70} color={c.c} style={{ position: "absolute", left: 0, top: 360 }}>
          el azar reparte por igual la edad, los estudios y lo que no ves
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 470 }}>
          {frame >= cProm ? (
            <Formula tam={84}>
              <Entra at={cProm}>
                <span style={{ position: "relative", display: "inline-block" }}>
                  <V color={c.c}>τ</V>
                  <span style={{ position: "absolute", left: "0.12em", top: "-0.42em", fontSize: "0.7em", color: c.c }}>^</span>
                </span>
                <Op>=</Op>
                <Media color={v.azafran} sub="T">
                  Y
                </Media>
                <Op>−</Op>
                <Media color={c.b} sub="C">
                  Y
                </Media>
              </Entra>
            </Formula>
          ) : null}
          <Nota at={cProm + 24} color={v.hueso} style={{ marginTop: 18 }}>
            promedio de los tratados menos promedio del control
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Los trucos de la econometría ─────────────────────────────────────────────
const MiniDiD: React.FC<{ k: number }> = ({ k }) => (
  <svg width={380} height={150}>
    <line x1={190} y1={10} x2={190} y2={140} stroke={v.ceniza} strokeDasharray="5 6" strokeWidth={2} />
    <polyline points={`10,110 190,90 ${190 + 180 * k},${90 - 10 * k}`} fill="none" stroke={c.b} strokeWidth={4} />
    <polyline points={`10,80 190,60 ${190 + 180 * k},${60 - 50 * k}`} fill="none" stroke={v.azafran} strokeWidth={4} />
    <text x={196} y={140} fontFamily={mono} fontSize={18} fill={v.ceniza}>
      t₀
    </text>
  </svg>
);
const MiniRDD: React.FC<{ k: number }> = ({ k }) => (
  <svg width={380} height={150}>
    <line x1={190} y1={10} x2={190} y2={140} stroke={v.ceniza} strokeDasharray="5 6" strokeWidth={2} />
    {Array.from({ length: 22 }, (_, i) => {
      const x = 14 + i * 16.5;
      const y = 120 - i * 2.6 - (x > 190 ? 38 : 0) + ((i * 37) % 11) - 5;
      return <circle key={i} cx={x} cy={y} r={4.5} fill={x > 190 ? v.azafran : c.b} opacity={Math.min(1, k * 2)} />;
    })}
    <text x={196} y={140} fontFamily={mono} fontSize={18} fill={v.ceniza}>
      umbral
    </text>
  </svg>
);
const MiniIV: React.FC<{ k: number }> = ({ k }) => (
  <svg width={380} height={150}>
    {[
      [40, "Z", c.c],
      [190, "T", v.azafran],
      [340, "Y", c.b],
    ].map(([x, t, col]) => (
      <g key={t as string}>
        <circle cx={x as number} cy={60} r={30} fill={relleno} stroke={col as string} strokeWidth={3} />
        <text x={x as number} y={72} textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize={34} fill={col as string}>
          {t}
        </text>
      </g>
    ))}
    <line x1={72} y1={60} x2={72 + 82 * k} y2={60} stroke={v.hueso} strokeWidth={3} />
    <line x1={222} y1={60} x2={222 + 82 * k} y2={60} stroke={v.hueso} strokeWidth={3} />
    <path d="M40,96 Q190,160 340,96" fill="none" stroke={ROJO} strokeWidth={2.5} strokeDasharray="6 7" opacity={k} />
    <text x={190} y={146} textAnchor="middle" fontFamily={fuente} fontSize={18} fill={ROJO} opacity={k}>
      sin camino directo
    </text>
  </svg>
);
const MiniMatch: React.FC<{ k: number }> = ({ k }) => (
  <svg width={380} height={150}>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <circle cx={60 + i * 86} cy={40} r={14} fill={v.azafran} />
        <circle cx={60 + i * 86 + 8} cy={112} r={14} fill={c.b} />
        <line x1={60 + i * 86} y1={56} x2={60 + i * 86 + 8 * k} y2={56 + 40 * k} stroke={v.hueso} strokeWidth={2.5} />
      </g>
    ))}
  </svg>
);

export const Metodos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cTrucos = useCue("trucos");
  const cues = [useCue("did"), useCue("rdd"), useCue("iv"), useCue("emparejar")];
  const activo = ultimo(frame, cues);
  const items: { nombre: string; cuando: string; Mini: React.FC<{ k: number }> }[] = [
    { nombre: "Diferencias en diferencias", cuando: "hay un antes y un después", Mini: MiniDiD },
    { nombre: "Regresión discontinua", cuando: "hay un umbral", Mini: MiniRDD },
    { nombre: "Variable instrumental", cuando: "algo empuja el tratamiento", Mini: MiniIV },
    { nombre: "Emparejamiento", cuando: "mides los confusores", Mini: MiniMatch },
  ];
  return (
    <Escena>
      <Rotulo at={cTrucos}>Sin sorteo</Rotulo>
      <Cinetico at={cTrucos + 4} texto="Los trucos de la|*econometría.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={700} style={{ marginTop: 30 }}>
        {items.map((it, i) => {
          const caja: Caja = { x: (i % 2) * 472, y: Math.floor(i / 2) * 350, w: 440, h: 320 };
          const k = transicion(frame, cues[i] + 4, fps, 900, EXPO_IN_OUT);
          return (
            <Caja_ key={i} caja={caja} at={cues[i] - 6} color={activo === i ? v.azafran : undefined}>
              <it.Mini k={k} />
              <div style={{ fontSize: 30, marginTop: 10, letterSpacing: "-0.01em" }}>{it.nombre}</div>
              <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 4 }}>si {it.cuando}</div>
            </Caja_>
          );
        })}
      </Escenario>
    </Escena>
  );
};

// ─── El problema: el modelo elige solo ────────────────────────────────────────
export const Problema: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cDir = useCue("directo");
  const cMal = useCueAt("directo", 0.55);
  const LLM: Caja = { x: 0, y: 0, w: 912, h: 170 };
  const errores = [
    { t: "método: variable instrumental", d: "pero no hay instrumento" },
    { t: "código: KeyError 'edad'", d: "la columna no existe" },
    { t: "efecto: 3,2", d: "sin revisar ningún supuesto" },
  ];
  return (
    <Escena>
      <Rotulo at={cDir}>El problema</Rotulo>
      <Cinetico at={cDir + 4} texto="Elegir es|lo *difícil.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={680} style={{ marginTop: 30 }}>
        <Tarjeta caja={LLM} at={cDir + 8} Icono={BrainCircuit} rol="Modelo de lenguaje" titulo="“Elige tú el método”" sub="sin reglas ni pruebas" />
        {errores.map((e, i) => {
          const at = cMal + i * 14;
          const k = transicion(frame, at, fps, 500, backOut);
          if (frame < at) return null;
          return (
            <div key={i} style={{ position: "absolute", left: 0, top: 220 + i * 150, width: 912, height: 128, boxSizing: "border-box", borderRadius: 20, border: `2px dashed ${ROJO}`, background: relleno, display: "flex", alignItems: "center", gap: 20, padding: "0 24px", opacity: Math.min(1, k * 1.5), transform: `translateX(${(1 - Math.min(1, k)) * 40}px)` }}>
              <TriangleAlert size={40} strokeWidth={1.8} color={ROJO} />
              <div>
                <div style={{ fontFamily: mono, fontSize: 28 }}>{e.t}</div>
                <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>{e.d}</div>
              </div>
            </div>
          );
        })}
      </Escenario>
    </Escena>
  );
};

// ─── CAIS: entra una pregunta, sale un efecto con su explicación ──────────────
export const Cais: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cIn = useCue("entrada");
  const cOut = useCue("salida");
  const ins: { Icono: LucideIcon; rol: string; titulo: string }[] = [
    { Icono: MessageSquare, rol: "Pregunta", titulo: "¿sube el ingreso?" },
    { Icono: Table, rol: "Datos", titulo: "datos.csv" },
    { Icono: FileText, rol: "Descripción", titulo: "qué es cada columna" },
  ];
  const IN = (i: number): Caja => ({ x: 0, y: i * 112, w: 430, h: 96 });
  const AG: Caja = { x: 0, y: 380, w: 912, h: 130 };
  const OUT: Caja = { x: 0, y: 560, w: 912, h: 150 };
  return (
    <Escena>
      <Rotulo at={cIn}>Causal AI Scientist</Rotulo>
      <Cinetico at={cIn + 4} texto="Pregunta adentro,|*efecto afuera.*" style={{ marginTop: 18, fontSize: 84 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <Cables alto={720}>
          {ins.map((_, i) => (
            <Cable key={i} de={ancla(IN(i), "r")} a={punto(600 + i * 60, AG.y, [0, -1])} at={cIn + 26 + i * 4} envios={[{ at: cIn + 40 + i * 4, ms: 700 }]} />
          ))}
          <Cable de={ancla(AG, "b")} a={ancla(OUT, "t")} at={cOut} ms={500} envios={[{ at: cOut + 6, ms: 600 }]} />
        </Cables>
        {ins.map((it, i) => (
          <div key={i} style={{ position: "absolute", left: 0, top: 0 }}>
            <Caja_ caja={IN(i)} at={cIn + 8 + i * 5} estilo={{ display: "flex", alignItems: "center", gap: 16, padding: "0 20px" }}>
              <it.Icono size={36} strokeWidth={1.6} color={v.hueso} />
              <div>
                <Rol>{it.rol}</Rol>
                <div style={{ fontSize: 30 }}>{it.titulo}</div>
              </div>
            </Caja_>
          </div>
        ))}
        <Tarjeta caja={AG} at={cIn + 20} Icono={FlaskConical} rol="Agente" titulo="Causal AI Scientist" sub="árbol de decisión + pruebas + código" activo />
        {frame >= cOut ? (
          <Caja_ caja={OUT} at={cOut + 10} color={c.c}>
            <Rol color={c.c}>Respuesta</Rol>
            <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
              {["efecto", "error estándar", "intervalo 95 %", "explicación"].map((t, i) => (
                <span key={t} style={{ opacity: transicion(frame, cOut + 18 + i * 5, fps, 400, EXPO_OUT) }}>
                  <Chip texto={t} activo={i === 0} tam={24} />
                </span>
              ))}
            </div>
          </Caja_>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── Las cuatro etapas ────────────────────────────────────────────────────────
export const Etapas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = [useCue("leer"), useCue("elegir"), useCue("validar"), useCue("ejecutar")];
  const activa = ultimo(frame, cues);
  const etapas: { Icono: LucideIcon; nombre: string; que: string }[] = [
    { Icono: ScanSearch, nombre: "Leer", que: "tratamiento · resultado · covariables" },
    { Icono: GitBranch, nombre: "Elegir", que: "un árbol de decisión, no una corazonada" },
    { Icono: ShieldCheck, nombre: "Validar", que: "pruebas de los supuestos" },
    { Icono: Code, nombre: "Ejecutar y explicar", que: "código probado + lenguaje simple" },
  ];
  const lazo = transicion(frame, cues[2] + 20, fps, 800, EXPO_IN_OUT);
  return (
    <Escena>
      <Rotulo at={cues[0]}>Cómo funciona</Rotulo>
      <Cinetico at={cues[0] + 4} texto="Cuatro *etapas.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={660} style={{ marginTop: 34 }}>
        <svg width={912} height={660} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          {lazo > 0 ? (
            <g opacity={lazo}>
              <path d="M824,388 C900,388 900,228 824,228" fill="none" stroke={ROJO} strokeWidth={3} strokeDasharray="8 8" />
              <path d="M0,0 L-16,-8 L-16,8 Z" fill={ROJO} transform="translate(824,228) rotate(180)" />
            </g>
          ) : null}
        </svg>
        {etapas.map((e, i) => {
          const k = resorte(frame, cues[i] - 6, fps, { k: 140, c: 16 });
          const on = activa === i;
          return (
            <div key={i} style={{ position: "absolute", left: 0, top: i * 160, width: 820, height: 136, boxSizing: "border-box", borderRadius: 22, border: `${on ? 2.5 : 1.5}px solid ${on ? v.azafran : linea}`, background: relleno, display: "flex", alignItems: "center", gap: 20, padding: "0 24px", opacity: Math.min(1, k * 1.6), transform: `translateX(${(1 - Math.min(1, k)) * 60}px)` }}>
              <div style={{ fontFamily: mono, fontSize: 30, color: on ? v.azafran : v.ceniza, width: 30 }}>{i + 1}</div>
              <div style={{ width: 66, height: 66, borderRadius: 16, border: `1.5px solid ${on ? v.azafran : linea}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <e.Icono size={36} strokeWidth={1.6} color={on ? v.azafran : v.hueso} />
              </div>
              <div>
                <div style={{ fontSize: 40, letterSpacing: "-0.02em" }}>{e.nombre}</div>
                <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>{e.que}</div>
              </div>
            </div>
          );
        })}
        {lazo > 0 ? (
          <div style={{ position: "absolute", left: 560, top: 360, padding: "4px 14px", borderRadius: 999, border: `2px solid ${ROJO}`, background: relleno, fontSize: 24, color: ROJO, opacity: lazo }}>si falla, vuelve</div>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── El árbol de decisión ─────────────────────────────────────────────────────
type Nodo = { caja: Caja; texto: string; hoja?: boolean };
export const Arbol: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cSorteo = useCue("sorteo");
  const cRamas = useCue("ramas");
  const cAud = useCue("auditar");
  const largo = cAud - cRamas;
  const paso = (i: number) => cRamas + (largo * i) / 3.2;
  const q = (y: number, texto: string): Nodo => ({ caja: { x: 0, y, w: 400, h: 96 }, texto });
  const h = (y: number, texto: string): Nodo => ({ caja: { x: 492, y, w: 420, h: 96 }, texto, hoja: true });
  const Q = [q(0, "¿Hubo sorteo?"), q(140, "¿Antes y después?"), q(280, "¿Hay un umbral?"), q(420, "¿Hay un instrumento?")];
  const H = [h(0, "Diferencia de medias · OLS"), h(140, "Diferencias en diferencias"), h(280, "Regresión discontinua"), h(420, "Variable instrumental")];
  const FIN: Nodo = { caja: { x: 0, y: 560, w: 912, h: 96 }, texto: "Emparejamiento por propensión", hoja: true };
  const ats = [cSorteo + 8, paso(0), paso(1), paso(2)];
  const caja = (n: Nodo, at: number, on: boolean) => {
    const k = resorte(frame, at, fps, { k: 160, c: 18 });
    return (
      <div key={n.texto} style={{ position: "absolute", left: n.caja.x, top: n.caja.y, width: n.caja.w, height: n.caja.h, boxSizing: "border-box", borderRadius: n.hoja ? 22 : 48, border: `${on ? 2.5 : 1.5}px solid ${on ? (n.hoja ? c.c : v.azafran) : linea}`, background: relleno, display: "flex", alignItems: "center", justifyContent: n.hoja ? "flex-start" : "center", gap: 14, padding: "0 22px", fontSize: 30, opacity: Math.min(1, k * 1.6), transform: `scale(${0.9 + 0.1 * Math.min(1, k)})` }}>
        {n.hoja ? <Check size={30} strokeWidth={2} color={on ? c.c : v.ceniza} /> : null}
        {n.texto}
      </div>
    );
  };
  return (
    <Escena>
      <Rotulo at={cSorteo}>Etapa 2 · El árbol</Rotulo>
      <Cinetico at={cSorteo + 4} texto="Reglas,|no *corazonadas.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={700} style={{ marginTop: 30 }}>
        <Cables alto={700}>
          {Q.map((n, i) => (
            <Cable key={`s${i}`} de={ancla(n.caja, "r")} a={ancla(H[i].caja, "l")} at={ats[i] + 6} ms={400} color={v.azafran} etiqueta="sí" />
          ))}
          {Q.slice(0, 3).map((n, i) => (
            <Cable key={`n${i}`} de={ancla(n.caja, "b")} a={ancla(Q[i + 1].caja, "t")} at={(i === 0 ? cRamas : paso(i)) - 2} ms={300} color={v.ceniza} />
          ))}
          <Cable de={ancla(Q[3].caja, "b")} a={punto(200, FIN.caja.y, [0, -1])} at={paso(3) - 2} ms={300} color={v.ceniza} etiqueta="no" />
        </Cables>
        {Q.map((n, i) => caja(n, i === 0 ? cSorteo + 4 : ats[i] - 4, frame >= ats[i] && frame < (ats[i + 1] ?? paso(3))))}
        {H.map((n, i) => caja(n, ats[i] + 10, frame >= ats[i] + 10 && frame < (ats[i + 1] ?? paso(3))))}
        {caja(FIN, paso(3), frame >= paso(3))}
        <Sube at={cAud + 10} style={{ position: "absolute", left: 0, top: 680 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <ShieldCheck size={32} strokeWidth={1.6} color={c.c} /> cada elección queda escrita: se puede <span style={{ color: c.c }}>auditar</span>
          </div>
        </Sube>
      </Escenario>
    </Escena>
  );
};

// ─── Validación: tres pruebas y el regreso al árbol ───────────────────────────
const Prueba: React.FC<{ y: number; at: number; titulo: string; detalle: React.ReactNode; grafico: React.ReactNode; ok: boolean; falla?: number }> = ({ y, at, titulo, detalle, grafico, ok, falla = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = resorte(frame, at, fps, { k: 150, c: 18 });
  const sello = transicion(frame, at + 30, fps, 400, backOut);
  const col = falla > 0 ? ROJO : c.c;
  if (frame < at - 2) return null;
  return (
    <div style={{ position: "absolute", left: 0, top: y, width: 912, height: 170, boxSizing: "border-box", borderRadius: 22, border: `${falla > 0 ? 2.5 : 1.5}px ${falla > 0 ? "dashed" : "solid"} ${falla > 0 ? ROJO : linea}`, background: relleno, display: "flex", alignItems: "center", gap: 20, padding: "0 20px", opacity: Math.min(1, p * 1.6), transform: `translateX(${(1 - Math.min(1, p)) * 40}px)` }}>
      <div style={{ width: 300, flexShrink: 0 }}>{grafico}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 32 }}>{titulo}</div>
        <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 4 }}>{detalle}</div>
      </div>
      <div style={{ width: 64, height: 64, borderRadius: 32, background: col, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${sello})` }}>
        {ok && falla === 0 ? <Check size={40} strokeWidth={3} color={v.vacio} /> : <X size={40} strokeWidth={3} color={v.vacio} />}
      </div>
    </div>
  );
};

export const Validacion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cPar = useCue("paralelas");
  const cFuerte = useCue("fuerte");
  const cUmbral = useCue("umbral");
  const cVuelve = useCue("vuelve");
  const falla = transicion(frame, cVuelve + 4, fps, 400, EXPO_OUT);
  const regreso = transicion(frame, cVuelve + 20, fps, 900, EXPO_IN_OUT);
  const fBar = transicion(frame, cFuerte + 16, fps, 900, EXPO_OUT);
  return (
    <Escena>
      <Rotulo at={cPar}>Etapa 3 · Validar</Rotulo>
      <Cinetico at={cPar + 4} texto="Probar antes|de *responder.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <Prueba
          y={0}
          at={cPar + 10}
          titulo="Tendencias paralelas"
          detalle="diferencias en diferencias: antes del tratamiento, los grupos van igual"
          ok
          grafico={
            <svg width={300} height={130}>
              <polyline points="10,90 150,70" fill="none" stroke={c.b} strokeWidth={4} />
              <polyline points="10,60 150,40" fill="none" stroke={v.azafran} strokeWidth={4} />
              <line x1={150} y1={10} x2={150} y2={120} stroke={v.ceniza} strokeDasharray="5 6" strokeWidth={2} />
              <polyline points="150,70 290,60" fill="none" stroke={c.b} strokeWidth={4} opacity={0.5} />
              <polyline points="150,40 290,10" fill="none" stroke={v.azafran} strokeWidth={4} opacity={0.5} />
            </svg>
          }
        />
        <Prueba
          y={190}
          at={cFuerte}
          titulo="Instrumento fuerte"
          detalle={
            <span>
              variable instrumental: estadístico <span style={{ fontFamily: serif, fontStyle: "italic", color: v.hueso }}>F</span> &gt; 10
            </span>
          }
          ok
          grafico={
            <svg width={300} height={130}>
              <rect x={10} y={50} width={280} height={30} rx={8} fill="#16161B" />
              <rect x={10} y={50} width={250 * fBar} height={30} rx={8} fill={v.azafran} />
              <line x1={10 + 280 * (10 / 40)} y1={30} x2={10 + 280 * (10 / 40)} y2={100} stroke={v.hueso} strokeWidth={3} />
              <text x={10 + 280 * (10 / 40)} y={124} textAnchor="middle" fontFamily={serif} fontSize={26} fill={v.hueso}>
                F = 10
              </text>
            </svg>
          }
        />
        <Prueba
          y={380}
          at={cUmbral}
          titulo="Sin trampa en el umbral"
          detalle="regresión discontinua: nadie se acumula justo al lado del corte"
          ok
          falla={falla}
          grafico={
            <svg width={300} height={130}>
              {Array.from({ length: 14 }, (_, i) => {
                const alto = 50 + Math.sin(i * 0.5) * 12 + (falla > 0 && i === 7 ? 50 * falla : 0);
                return <rect key={i} x={10 + i * 20} y={120 - alto} width={16} height={alto} rx={3} fill={i >= 7 ? v.azafran : c.b} opacity={0.85} />;
              })}
              <line x1={150} y1={10} x2={150} y2={124} stroke={v.ceniza} strokeDasharray="5 6" strokeWidth={2} />
            </svg>
          }
        />
        {regreso > 0 ? (
          <div style={{ position: "absolute", left: 0, top: 580, width: 912, display: "flex", alignItems: "center", gap: 18, opacity: regreso, transform: `translateY(${(1 - regreso) * 20}px)` }}>
            <RotateCcw size={44} strokeWidth={1.8} color={ROJO} />
            <div style={{ fontSize: 32, fontWeight: 200 }}>
              falla → <span style={{ textDecoration: "line-through", color: v.ceniza }}>regresión discontinua</span> → vuelve al <span style={{ color: v.azafran }}>árbol</span>
            </div>
          </div>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── Una prueba en detalle: el balance (diferencia de medias estandarizada) ───
export const Balance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cResta = useCue("resta");
  const cDivide = useCue("divide");
  const cUmbral = useCue("umbral");
  const fase = ultimo(frame, [cResta, cDivide, cUmbral]);
  const activas = [[], ["num"], ["den"], ["res"]][fase + 1];
  const antes = transicion(frame, cUmbral + 10, fps, 700, EXPO_OUT);
  const despues = transicion(frame, cUmbral + 30, fps, 700, EXPO_OUT);
  const X = (n: number) => 10 + 760 * (n / 0.4);
  return (
    <Escena>
      <Rotulo at={cResta}>Una prueba en detalle</Rotulo>
      <Cinetico at={cResta + 4} texto="¿Los grupos|se *parecen?*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <Foco activas={activas}>
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <Formula tam={72}>
              <Entra at={cResta + 8}>
                <V id="res" color={c.c} italica={false}>
                  SMD
                </V>
                <Op>=</Op>
                <Frac
                  arriba={
                    <V id="num" color={v.azafran} italica={false}>
                      |&nbsp;
                      <Media color={v.azafran} sub="T">
                        x
                      </Media>
                      <Op>−</Op>
                      <Media color={c.b} sub="C">
                        x
                      </Media>
                      &nbsp;|
                    </V>
                  }
                  abajo={
                    <V id="den" color={c.d} italica={false}>
                      <Raiz>
                        <span style={{ fontSize: "0.8em" }}>
                          (<i>s</i>
                          <Sub>T</Sub>
                          <Sup>2</Sup> + <i>s</i>
                          <Sub>C</Sub>
                          <Sup>2</Sup>) / 2
                        </span>
                      </Raiz>
                    </V>
                  }
                />
              </Entra>
            </Formula>
          </div>
        </Foco>
        <div style={{ position: "absolute", left: 0, right: 0, top: 250, display: "flex", flexDirection: "column", gap: 10 }}>
          <Nota at={cResta + 30} color={v.azafran}>
            <span style={{ fontFamily: serif, fontStyle: "italic" }}>x̄</span>: el promedio de una covariable, por ejemplo la edad
          </Nota>
          <Nota at={cDivide + 6} color={c.d}>
            <span style={{ fontFamily: serif, fontStyle: "italic" }}>s</span>: cuánto varía; dividir quita las unidades
          </Nota>
        </div>
        {frame >= cUmbral ? (
          <div style={{ position: "absolute", left: 0, top: 440, width: 912 }}>
            <svg width={912} height={260} style={{ overflow: "visible" }}>
              <line x1={X(0.1)} y1={0} x2={X(0.1)} y2={200} stroke={v.hueso} strokeWidth={3} strokeDasharray="8 8" />
              <text x={X(0.1)} y={234} textAnchor="middle" fontFamily={serif} fontSize={32} fill={v.hueso}>
                0,1
              </text>
              <text x={10} y={36} fontFamily={fuente} fontSize={26} fill={v.niebla}>
                edad, antes de emparejar
              </text>
              <rect x={10} y={50} width={(X(0.36) - 10) * antes} height={36} rx={8} fill={ROJO} />
              <text x={X(0.36) + 14} y={78} fontFamily={serif} fontSize={32} fill={ROJO} opacity={antes}>
                0,36 sesgado
              </text>
              <text x={10} y={130} fontFamily={fuente} fontSize={26} fill={v.niebla}>
                después de emparejar
              </text>
              <rect x={10} y={144} width={(X(0.045) - 10) * despues} height={36} rx={8} fill={c.c} />
              <text x={X(0.045) + 14} y={172} fontFamily={serif} fontSize={32} fill={c.c} opacity={despues}>
                0,05 parecidos
              </text>
            </svg>
          </div>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── Un ejemplo completo ──────────────────────────────────────────────────────
export const Ejemplo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cPreg = useCue("pregunta");
  const cCamino = useCue("camino");
  const cRes = useCue("resultado");
  const vars: { s: string; t: string; color: string }[] = [
    { s: "T", t: "capacitación: sí / no", color: v.azafran },
    { s: "Y", t: "ingreso", color: c.b },
    { s: "X", t: "edad, estudios", color: c.d },
  ];
  const camino = ["observacional", "T binario", "hay covariables", "emparejar"];
  return (
    <Escena>
      <Rotulo at={cPreg}>Ejemplo</Rotulo>
      <Cinetico at={cPreg + 4} texto="¿La capacitación|sube el *ingreso?*" style={{ marginTop: 18, fontSize: 80 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <div style={{ position: "absolute", left: 0, top: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {vars.map((x, i) => {
            const k = transicion(frame, cPreg + 30 + i * 6, fps, 500, EXPO_OUT);
            return (
              <div key={x.s} style={{ display: "flex", alignItems: "center", gap: 18, opacity: k, transform: `translateX(${(1 - k) * 30}px)` }}>
                <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 52, color: x.color, width: 44 }}>{x.s}</span>
                <span style={{ fontSize: 32, fontWeight: 200 }}>{x.t}</span>
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 0, top: 250, width: 912, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          {camino.map((t, i) => {
            const k = transicion(frame, cCamino + 10 + i * 12, fps, 400, backOut);
            return (
              <React.Fragment key={t}>
                <span style={{ opacity: Math.min(1, k * 1.5), transform: `scale(${0.8 + 0.2 * k})`, display: "inline-block" }}>
                  <Chip texto={t} activo={i === camino.length - 1} tam={26} />
                </span>
                {i < camino.length - 1 ? <span style={{ fontSize: 30, color: v.ceniza, opacity: k }}>→</span> : null}
              </React.Fragment>
            );
          })}
        </div>
        {frame >= cRes ? (
          <Caja_ caja={{ x: 0, y: 380, w: 912, h: 320 }} at={cRes + 4} color={c.c}>
            <Rol color={c.c}>Lo que entrega</Rol>
            {[
              ["balance", "revisado: SMD bajo 0,1", c.c],
              ["efecto", "en los capacitados, con intervalo 95 %", v.azafran],
              ["supuestos", "sin confusores ocultos · grupos comparables", c.d],
            ].map(([k, t, col], i) => (
              <div key={k} style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 16, opacity: transicion(frame, cRes + 14 + i * 14, fps, 400, EXPO_OUT) }}>
                <span style={{ fontFamily: mono, fontSize: 26, color: col, width: 150 }}>{k}</span>
                <span style={{ fontSize: 30, fontWeight: 200 }}>{t}</span>
              </div>
            ))}
          </Caja_>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── Qué mostró y qué no puede hacer ──────────────────────────────────────────
export const Limites: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cBench = useCue("bench");
  const cOcultos = useCue("ocultos");
  const subs: { Icono: LucideIcon; t: string }[] = [
    { Icono: BookOpen, t: "estudios reales" },
    { Icono: FlaskConical, t: "datos sintéticos" },
    { Icono: GraduationCap, t: "libros de texto" },
  ];
  const T: Caja = { x: 0, y: 420, w: 300, h: 110 };
  const Y: Caja = { x: 612, y: 420, w: 300, h: 110 };
  const U: Caja = { x: 256, y: 270, w: 400, h: 100 };
  const fantasma = transicion(frame, cOcultos + 30, fps, 600, EXPO_OUT);
  return (
    <Escena>
      <Rotulo at={cBench}>Resultados y límites</Rotulo>
      <Cinetico at={cBench + 4} texto="Menos errores,|no *infalible.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={700} style={{ marginTop: 30 }}>
        <div style={{ position: "absolute", left: 0, top: 0, display: "flex", gap: 14 }}>
          {subs.map((s, i) => (
            <Caja_ key={s.t} caja={{ x: i * 304, y: 0, w: 290, h: 130 }} at={cBench + 10 + i * 5} estilo={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
              <s.Icono size={36} strokeWidth={1.6} color={v.hueso} />
              <div style={{ fontSize: 28 }}>{s.t}</div>
            </Caja_>
          ))}
        </div>
        <Sube at={cBench + 40} style={{ position: "absolute", left: 0, top: 160 }}>
          <div style={{ fontSize: 30, fontWeight: 200, color: v.niebla }}>
            benchmark CauSciBench · árbol + validación: <span style={{ color: c.c }}>menos errores</span> que dejar al modelo elegir solo
          </div>
        </Sube>
        {frame >= cOcultos ? (
          <>
            <Cables alto={700}>
              <Cable de={ancla(T, "r")} a={ancla(Y, "l")} at={cOcultos + 6} color={v.hueso} etiqueta="efecto" />
              <Cable de={ancla(U, "l")} a={ancla(T, "t")} at={cOcultos + 34} discontinuo color={ROJO} />
              <Cable de={ancla(U, "r")} a={ancla(Y, "t")} at={cOcultos + 38} discontinuo color={ROJO} />
            </Cables>
            <Tarjeta caja={T} at={cOcultos + 2} Icono={GraduationCap} rol="T" titulo="capacitación" />
            <Tarjeta caja={Y} at={cOcultos + 4} Icono={Table} rol="Y" titulo="ingreso" />
            <div style={{ position: "absolute", left: U.x, top: U.y, width: U.w, height: U.h, boxSizing: "border-box", borderRadius: 22, border: `2.5px dashed ${ROJO}`, background: relleno, display: "flex", alignItems: "center", gap: 16, padding: "0 22px", opacity: fantasma }}>
              <EyeOff size={36} strokeWidth={1.6} color={ROJO} />
              <div>
                <Rol color={ROJO}>Confusor oculto</Rol>
                <div style={{ fontSize: 28 }}>¿motivación?</div>
              </div>
            </div>
            <Sube at={cOcultos + 60} style={{ position: "absolute", left: 0, top: 590 }}>
              <div style={{ fontSize: 32, fontWeight: 200 }}>
                ningún dato lo prueba: <span style={{ color: v.azafran }}>es tu responsabilidad</span>
              </div>
            </Sube>
          </>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── Cierre: el método, no la corazonada ──────────────────────────────────────
export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cMet = useCue("metodo");
  const cCta = useCue("cta");
  const pasos = ["Pregunta", "Supuestos", "Prueba", "Respuesta"];
  const largo = cCta - cMet;
  return (
    <Escena>
      <div style={{ position: "absolute", left: -80, right: -80, top: -110, display: "flex", justifyContent: "center" }}>
        <Constelacion at={cMet - 30} ancho={560} forma="cerebro" desde="red" cambio={cMet} />
      </div>
      <div style={{ marginTop: 300 }}>
        <Cinetico at={cMet} texto="Que la IA no|*adivine.*" style={{ fontSize: 96 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 30 }}>
          {pasos.map((p, i) => {
            const k = transicion(frame, cMet + largo * (0.45 + i * 0.12), fps, 400, backOut);
            return (
              <React.Fragment key={p}>
                <div style={{ padding: "10px 16px", borderRadius: 16, border: `2px solid ${i === 3 ? v.azafran : linea}`, background: relleno, fontSize: 28, opacity: Math.min(1, k * 1.5), transform: `scale(${0.8 + 0.2 * k})` }}>{p}</div>
                {i < pasos.length - 1 ? <span style={{ fontSize: 28, color: v.ceniza, opacity: k }}>→</span> : null}
              </React.Fragment>
            );
          })}
        </div>
        <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 8}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 16} style={{ marginTop: 24 }}>
          <div style={{ fontSize: 24, fontWeight: 200, color: v.ceniza }}>se presenta en causalscience.org · programa 2026 · código: github.com/causalNLP/causal-agent</div>
        </Sube>
      </div>
    </Escena>
  );
};
