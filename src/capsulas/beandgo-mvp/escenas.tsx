import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ArrowRight,
  Bell,
  Brain,
  Bus,
  Camera,
  Car,
  Check,
  Clock,
  CloudRain,
  CloudSun,
  Database,
  Eye,
  FileText,
  Footprints,
  Heart,
  Hotel,
  MapPin,
  Moon,
  Navigation,
  Pencil,
  Plane,
  ShieldCheck,
  Smartphone,
  Star,
  TriangleAlert,
  Users,
  Utensils,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { useCue, useCueAt } from "../../components/narracion";
import { EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import {
  Aparece,
  BarraApp,
  Burbuja,
  Cabeza,
  Chip,
  Cinetico,
  clamp,
  Ejemplo,
  Escena,
  Fila,
  Marca,
  Push,
  Rotulo,
  Sube,
  Tarjeta,
  Telefono,
} from "../../estilos/beandgo/kit";
import { b, cat, fuente } from "../../estilos/beandgo/tokens";

const I = { strokeWidth: 2.4 } as const;

// ---------- piezas comunes de estas escenas ----------

// Varias pantallas en el mismo teléfono: cada una entra en su cuadro y tapa a la anterior.
const Pantallas: React.FC<{ items: [number, React.ReactNode][] }> = ({ items }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {items.map(([at, nodo], i) => {
        const entra = i === 0 ? 1 : interpolate(frame - at, [0, 10], [0, 1], clamp);
        const sig = items[i + 1]?.[0];
        const sale = sig === undefined ? 0 : interpolate(frame - sig, [0, 10], [0, 1], clamp);
        if (entra <= 0 || sale >= 1) return null;
        return (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: entra, transform: `translateX(${(1 - entra) * 40}px)` }}>
            {nodo}
          </div>
        );
      })}
    </>
  );
};

// Punto de una lista a la izquierda, sincronizado con la voz.
const Punto: React.FC<{ at: number; color?: string; children: React.ReactNode }> = ({ at, color = b.copihue, children }) => (
  <Sube at={at} dist={14} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginTop: 22 }}>
    <div style={{ width: 34, height: 34, borderRadius: 17, background: color, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
      <Check size={20} strokeWidth={3.2} />
    </div>
    <div style={{ fontSize: 31, fontWeight: 700, lineHeight: 1.3, color: b.tinta }}>{children}</div>
  </Sube>
);

const Columna: React.FC<{ children: React.ReactNode; ancho?: number }> = ({ children, ancho = 640 }) => <div style={{ position: "absolute", left: 0, top: 30, width: ancho }}>{children}</div>;

const Estado: React.FC<{ tipo: "ok" | "desde" | "est"; children?: React.ReactNode }> = ({ tipo, children }) => {
  const m = { ok: [b.ok, b.okSuave, "Publicado"], desde: [b.alerta, b.alertaSuave, "Desde"], est: [b.mal, b.malSuave, "Estimado"] }[tipo];
  return <span style={{ fontSize: 12.5, fontWeight: 800, color: m[0], background: m[1], borderRadius: 6, padding: "2px 7px", letterSpacing: "0.03em", textTransform: "uppercase" }}>{children ?? m[2]}</span>;
};

// Mapa esquemático de calles (sin datos reales) con tu posición y destinos.
const Mapa: React.FC<{ alto: number; pins?: [number, number, string][]; ruta?: [number, number][]; progreso?: number }> = ({ alto, pins = [], ruta, progreso = 1 }) => {
  const frame = useCurrentFrame();
  const pulso = (frame % 40) / 40;
  const d = ruta ? ruta.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ") : "";
  return (
    <svg width={372} height={alto} viewBox={`0 0 372 ${alto}`} style={{ display: "block", background: "#E9EEF1" }}>
      <rect x={250} y={-10} width={140} height={alto + 20} fill="#CFE3EE" />
      {[40, 110, 180, 250].map((y) => (
        <line key={`h${y}`} x1={0} y1={y} x2={260} y2={y + 12} stroke="#FFFFFF" strokeWidth={10} />
      ))}
      {[50, 130, 210].map((x) => (
        <line key={`v${x}`} x1={x} y1={0} x2={x - 14} y2={alto} stroke="#FFFFFF" strokeWidth={10} />
      ))}
      <rect x={60} y={120} width={58} height={48} rx={8} fill="#D5E8D4" />
      {ruta ? <path d={d} fill="none" stroke={cat.transporte} strokeWidth={6} strokeDasharray="2 12" strokeLinecap="round" pathLength={1} style={{ strokeDashoffset: 0 }} opacity={progreso} /> : null}
      {pins.map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <path d="M0,-30 C-12,-30 -18,-21 -18,-14 C-18,-2 0,10 0,10 C0,10 18,-2 18,-14 C18,-21 12,-30 0,-30 Z" fill={c} stroke="#FFFFFF" strokeWidth={3} />
          <circle cx={0} cy={-15} r={6} fill="#FFFFFF" />
        </g>
      ))}
      <circle cx={92} cy={alto - 46} r={14 + pulso * 26} fill={cat.transporte} opacity={0.35 * (1 - pulso)} />
      <circle cx={92} cy={alto - 46} r={11} fill={cat.transporte} stroke="#FFFFFF" strokeWidth={4} />
    </svg>
  );
};

// ---------- 1. Gancho ----------

const Lluvia: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: 90 }).map((_, i) => {
        const x = (i * 211) % 1960;
        const v = 14 + ((i * 7) % 9);
        const y = ((frame * v + i * 97) % 1200) - 100;
        return <line key={i} x1={x} y1={y} x2={x - 10} y2={y + 46} stroke="#9CC3DC" strokeWidth={2} opacity={0.28} />;
      })}
    </svg>
  );
};

export const Gancho: React.FC = () => {
  const llegada = useCue("llegada");
  const push = useCue("push");
  const sol = useCue("solucion");
  return (
    <Escena pleno fondo={<AbsoluteFill style={{ background: `linear-gradient(160deg, ${b.noche} 0%, #061D30 100%)` }}><Lluvia /></AbsoluteFill>}>
      <div style={{ position: "absolute", left: 130, top: 190, color: "#FFFFFF" }}>
        <Sube at={llegada}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9CC3DC" }}>
            <Plane size={30} {...I} /> Aeropuerto de Punta Arenas
          </div>
        </Sube>
        <Cinetico at={llegada + 6} texto="21:00, llueve|y vas con *tres niños*" tam={98} acento="#FF8DB8" style={{ marginTop: 22, color: "#FFFFFF" }} />
        <Sube at={llegada + 50} style={{ marginTop: 36, display: "flex", gap: 16 }}>
          {[
            [<CloudRain key="c" size={26} {...I} />, "Lluvia toda la noche"],
            [<Users key="u" size={26} {...I} />, "2 adultos + 3 niños"],
            [<MapPin key="m" size={26} {...I} />, "Destino: Puerto Natales"],
          ].map(([ic, t], i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 24, fontWeight: 700, color: "#DCEAF3", border: "2px solid rgba(255,255,255,0.22)", borderRadius: 999, padding: "10px 20px" }}>
              {ic}
              {t}
            </span>
          ))}
        </Sube>
      </div>
      <div style={{ position: "absolute", right: 170, top: 90 }}>
        <Telefono oscuro hora="21:04">
          <div style={{ textAlign: "center", marginTop: 40, color: "#FFFFFF" }}>
            <div style={{ fontSize: 18, fontWeight: 700, opacity: 0.8 }}>sábado 13 de marzo</div>
            <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05 }}>21:04</div>
          </div>
          <div style={{ marginTop: 30 }}>
            <Push at={push} vibra icono={<Bell size={22} {...I} />} titulo="Te ayudo a llegar a Puerto Natales" texto="Toca para ver el plan de esta noche." />
          </div>
          <Aparece at={sol} style={{ margin: "12px 12px 0", borderRadius: 26, background: "rgba(255,255,255,0.96)", padding: "14px 14px 6px", color: b.tinta }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: b.tinta2, margin: "0 4px 10px", letterSpacing: "0.05em" }}>TU PLAN DE ESTA NOCHE</div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
              <Burbuja color={cat.transporte} tam={44}>
                <Bus size={22} {...I} />
              </Burbuja>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 800 }}>Bus a Puerto Natales, 22:00</div>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: b.tinta2 }}>
                  Bus-Sur · $10.000 por persona <Estado tipo="ok" />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
              <Burbuja color={cat.comida} tam={44}>
                <Utensils size={22} {...I} />
              </Burbuja>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 800 }}>Comida sin gluten a 300 m</div>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: b.tinta2 }}>Cierra 21:45 · alcanzas antes del bus</div>
              </div>
            </div>
          </Aparece>
        </Telefono>
      </div>
      <Ejemplo claro style={{ left: 130, top: 840 }} />
    </Escena>
  );
};

// ---------- 2. Título ----------

export const Titulo: React.FC<{ autor: string }> = ({ autor }) => {
  const marca = useCue("marca");
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, marca - 4, fps, 900, EXPO_OUT);
  return (
    <Escena>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ opacity: k, transform: `scale(${0.9 + 0.1 * k})` }}>
          <Marca tam={210} />
        </div>
        <Cinetico at={marca + 14} texto="Copiloto de viaje con *IA*" tam={64} style={{ marginTop: 10, color: b.tinta2 }} />
        <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
          <Chip at={marca + 40} color={b.noche} lleno>
            Diseño del primer MVP
          </Chip>
          <Chip at={marca + 46} color={b.noche}>
            App híbrida
          </Chip>
          <Chip at={marca + 52} color={b.noche}>
            Noviembre 2026
          </Chip>
        </div>
        <Sube at={marca + 60} style={{ marginTop: 40, fontSize: 22, fontWeight: 700, color: b.tinta3 }}>
          {autor}
        </Sube>
      </div>
    </Escena>
  );
};

// ---------- 3. La idea ----------

export const Idea: React.FC = () => {
  const mom = useCue("momentos");
  const ctx = useCue("contexto");
  const calma = useCue("calma");
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const linea = transicion(frame, mom + 10, fps, 1400, EXPO_OUT);
  const etapas: [string, string, React.ReactNode, string][] = [
    ["Antes", "Veredicto y plan: ¿me alcanza?", <Wallet key="a" size={30} {...I} />, b.copihue],
    ["Durante", "Te orienta donde estás, sin saturarte", <Navigation key="d" size={30} {...I} />, cat.transporte],
    ["Después", "Reclamos, gasto real y memoria", <FileText key="p" size={30} {...I} />, cat.alojamiento],
  ];
  const contexto: [React.ReactNode, string][] = [
    [<MapPin key="1" size={24} {...I} />, "Dónde estás"],
    [<Clock key="2" size={24} {...I} />, "Qué hora es"],
    [<CloudSun key="3" size={24} {...I} />, "Qué clima viene"],
    [<Wallet key="4" size={24} {...I} />, "Cuánto te queda"],
    [<Heart key="5" size={24} {...I} />, "Qué te gusta"],
  ];
  return (
    <Escena>
      <Cabeza at={mom - 4} rotulo="La idea" titulo="Un viajero experto|que va *contigo*" />
      <div style={{ position: "absolute", top: 300, left: 0, right: 0, height: 190 }}>
        <div style={{ position: "absolute", left: 120, right: 120, top: 38, height: 6, borderRadius: 3, background: b.linea }}>
          <div style={{ width: `${linea * 100}%`, height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${b.copihue}, ${cat.transporte}, ${cat.alojamiento})` }} />
        </div>
        {etapas.map(([t, d, ic, c], i) => (
          <Aparece key={t} at={mom + 12 + i * 14} style={{ position: "absolute", left: `${(i * 100) / 3}%`, width: "33.3%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <Burbuja color={c} tam={82} lleno>
              {ic}
            </Burbuja>
            <div style={{ fontSize: 38, fontWeight: 800, marginTop: 14 }}>{t}</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: b.tinta2, marginTop: 4 }}>{d}</div>
          </Aparece>
        ))}
      </div>
      <div style={{ position: "absolute", top: 570, left: 0, width: 1060 }}>
        <Rotulo at={ctx}>Lo que sabe en cada momento</Rotulo>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 20 }}>
          {contexto.map(([ic, t], i) => (
            <Chip key={t} at={escalon(ctx, i)} color={b.noche} tam={26}>
              {ic}
              {t}
            </Chip>
          ))}
        </div>
      </div>
      <Tarjeta at={calma} color={b.sol} style={{ position: "absolute", top: 560, right: 0, width: 560 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {[0, 1, 2].map((i) => (
            <Burbuja key={i} color={b.copihue} tam={54} lleno>
              <Bell size={26} {...I} />
            </Burbuja>
          ))}
          <div style={{ fontSize: 30, fontWeight: 800, marginLeft: 6 }}>máx. 3 avisos al día</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, fontSize: 26, fontWeight: 700, color: b.tinta2 }}>
          <Moon size={28} {...I} color={b.noche} /> 22:00 a 08:00, en silencio
        </div>
      </Tarjeta>
    </Escena>
  );
};

// Escalona los chips de contexto a lo largo de la frase "contexto".
const escalon = (base: number, i: number) => base + 10 + i * 14;

// ---------- 4. Las cuatro funciones ----------

const FUNCIONES: { n: string; t: string; d: string; c: string; ic: React.ReactNode; fase: string }[] = [
  { n: "01", t: "Mi viaje", d: "Veredicto, entrevista corta y memoria de preferencias", c: b.copihue, ic: <Wallet size={36} {...I} />, fase: "Fase 0" },
  { n: "02", t: "Dónde comer", d: "Picadas cerca con reseñas y qué pedir según tu régimen", c: cat.comida, ic: <Utensils size={36} {...I} />, fase: "Fase 1" },
  { n: "03", t: "Llegar y moverse", d: "Opciones con precio, a pie al paradero y foto del lugar", c: cat.traslado, ic: <Navigation size={36} {...I} />, fase: "Fase 2" },
  { n: "04", t: "Vuelo vigilado", d: "Check-in asistido y ayuda si te cancelan", c: cat.transporte, ic: <Plane size={36} {...I} />, fase: "Fase 3" },
];

export const Funciones: React.FC = () => {
  const cuatro = useCue("cuatro");
  const lista = useCue("lista");
  const fr = [useCueAt("lista", 0), useCueAt("lista", 0.18), useCueAt("lista", 0.42), useCueAt("lista", 0.72)];
  return (
    <Escena>
      <Cabeza at={cuatro - 4} rotulo="El primer MVP" titulo="Cuatro *funciones*" />
      <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", gap: 28 }}>
        {FUNCIONES.map((f, i) => (
          <Tarjeta key={f.n} at={Math.max(lista - 6, fr[i])} color={f.c} style={{ flex: 1, height: 470, padding: "34px 30px 30px 38px" }}>
            <Burbuja color={f.c} tam={86}>
              {f.ic}
            </Burbuja>
            <div style={{ fontSize: 22, fontWeight: 800, color: f.c, marginTop: 26, letterSpacing: "0.06em" }}>{f.n}</div>
            <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 4, lineHeight: 1.1 }}>{f.t}</div>
            <div style={{ fontSize: 25, fontWeight: 600, color: b.tinta2, marginTop: 14, lineHeight: 1.35 }}>{f.d}</div>
            <div style={{ position: "absolute", bottom: 28, left: 38, fontSize: 20, fontWeight: 800, color: b.tinta3, letterSpacing: "0.05em", textTransform: "uppercase" }}>{f.fase}</div>
          </Tarjeta>
        ))}
      </div>
    </Escena>
  );
};

// ---------- 5. Mi viaje ----------

const PantallaVeredicto: React.FC<{ at: number }> = ({ at }) => (
  <div style={{ height: "100%", background: b.suelo }}>
    <BarraApp titulo="Mi viaje" sub="Santiago → Torres del Paine · 13–20 mar" />
    <div style={{ margin: 14, borderRadius: 22, background: b.superficie, border: `1.5px solid ${b.linea}`, padding: 18 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 800, color: b.alerta, background: b.alertaSuave, borderRadius: 8, padding: "5px 10px" }}>
        <TriangleAlert size={16} {...I} /> AJUSTADO
      </span>
      <div style={{ fontSize: 15, fontWeight: 700, color: b.tinta2, marginTop: 12 }}>Mínimo necesario (p50)</div>
      <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em" }}>$1.536.800</div>
      <div style={{ fontSize: 15.5, fontWeight: 600, color: b.tinta2 }}>Tu presupuesto: $1.500.000 · faltan $36.800</div>
      <Barra at={at + 12} valor={1.02} />
      <div style={{ fontSize: 15, fontWeight: 700, marginTop: 14, display: "flex", gap: 8, alignItems: "center" }}>
        <Plane size={18} {...I} color={cat.transporte} /> Lo que más pesa: vuelos de 5 pasajeros
      </div>
    </div>
    <div style={{ fontSize: 14, fontWeight: 800, color: b.tinta2, letterSpacing: "0.05em", margin: "4px 22px 10px" }}>ALTERNATIVAS</div>
    <Fila at={at + 30} icono={<Plane size={22} {...I} />} color={cat.transporte} titulo="Volar directo a Puerto Natales" detalle="Casi el mismo precio, 6,5 h menos de bus" destacada />
    <Fila at={at + 40} icono={<Bus size={22} {...I} />} color={b.tinta2} titulo="Bus por tierra" detalle="34–40 h por tramo: descartado con niños" />
  </div>
);

const Barra: React.FC<{ at: number; valor: number }> = ({ at, valor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 1100, EXPO_OUT);
  return (
    <div style={{ position: "relative", height: 12, borderRadius: 6, background: b.panel, marginTop: 12 }}>
      <div style={{ width: `${Math.min(1, valor) * 100 * k}%`, height: "100%", borderRadius: 6, background: valor > 0.9 ? b.sol : b.ok }} />
      <div style={{ position: "absolute", left: "98%", top: -4, width: 3, height: 20, background: b.tinta }} />
    </div>
  );
};

const Burbuja2: React.FC<{ at: number; yo?: boolean; children: React.ReactNode }> = ({ at, yo, children }) => (
  <Sube at={at} dist={12} style={{ display: "flex", justifyContent: yo ? "flex-end" : "flex-start", margin: "0 14px 10px" }}>
    <div style={{ maxWidth: 290, borderRadius: 20, borderBottomLeftRadius: yo ? 20 : 6, borderBottomRightRadius: yo ? 6 : 20, background: yo ? b.copihue : b.superficie, color: yo ? "#FFFFFF" : b.tinta, border: yo ? "none" : `1.5px solid ${b.linea}`, padding: "11px 15px", fontSize: 16.5, fontWeight: 600, lineHeight: 1.35 }}>{children}</div>
  </Sube>
);

const PantallaEntrevista: React.FC<{ at: number }> = ({ at }) => (
  <div style={{ height: "100%", background: b.suelo }}>
    <BarraApp titulo="Antes de partir" sub="3 preguntas, menos de un minuto" />
    <div style={{ height: 14 }} />
    <Burbuja2 at={at + 4}>¿Con quién viajas?</Burbuja2>
    <Burbuja2 at={at + 12} yo>
      2 adultos y 3 niños: 6, 9 y 11 años
    </Burbuja2>
    <Burbuja2 at={at + 28}>¿Alguien tiene un régimen alimenticio o alergia?</Burbuja2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "0 14px 12px" }}>
      {["Sin gluten", "Vegetariano", "Sin lactosa", "Ninguno"].map((t, i) => (
        <Chip key={t} at={at + 36 + i * 4} tam={15} color={i === 0 ? b.copihue : b.tinta2} lleno={i === 0}>
          {i === 0 ? <Check size={15} strokeWidth={3} /> : null}
          {t}
        </Chip>
      ))}
    </div>
    <Burbuja2 at={at + 56} yo>
      Sofía, sin gluten
    </Burbuja2>
    <Burbuja2 at={at + 72}>Anotado. ¿Qué les gusta hacer?</Burbuja2>
  </div>
);

export const MiViaje: React.FC = () => {
  const ver = useCue("veredicto");
  const ent = useCue("entrevista");
  const mem = useCue("memoria");
  const items: [React.ReactNode, string][] = [
    [<Users key="u" size={22} {...I} />, "2 adultos + 3 niños (6, 9 y 11)"],
    [<Utensils key="f" size={22} {...I} />, "Sofía: sin gluten"],
    [<Hotel key="h" size={22} {...I} />, "Prefieren cabaña"],
    [<Bus key="b" size={22} {...I} />, "Máx. 12 h seguidas de bus"],
    [<Heart key="g" size={22} {...I} />, "Naturaleza y comer bien"],
  ];
  return (
    <Escena>
      <Columna ancho={600}>
        <Rotulo at={ver - 4}>01 · Mi viaje</Rotulo>
        <Cinetico at={ver} texto="Del veredicto|a tu *memoria*" style={{ marginTop: 16 }} />
        <Punto at={ver + 20}>Veredicto: ¿me alcanza?</Punto>
        <Punto at={ent}>Entrevista corta: régimen, alergias y gustos</Punto>
        <Punto at={mem}>Memoria visible y editable</Punto>
      </Columna>
      <div style={{ position: "absolute", left: 690, top: -6 }}>
        <Telefono hora="10:12">
          <Pantallas items={[[ver, <PantallaVeredicto key="v" at={ver} />], [ent, <PantallaEntrevista key="e" at={ent} />]]} />
        </Telefono>
      </div>
      <Tarjeta at={mem} color={b.copihue} style={{ position: "absolute", left: 1160, top: 120, width: 540 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Burbuja color={b.copihue} tam={56}>
            <Brain size={28} {...I} />
          </Burbuja>
          <div style={{ fontSize: 32, fontWeight: 800 }}>Lo que sé de ustedes</div>
        </div>
        {items.map(([ic, t], i) => (
          <Sube key={t} at={mem + 10 + i * 6} dist={10} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16, fontSize: 25, fontWeight: 700 }}>
            <span style={{ color: b.tinta2, display: "flex" }}>{ic}</span>
            {t}
          </Sube>
        ))}
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <Chip at={mem + 50} tam={20} color={b.copihue}>
            <Pencil size={18} {...I} /> Editar
          </Chip>
          <Chip at={mem + 54} tam={20} color={b.tinta2}>
            <Eye size={18} {...I} /> Visible para ti
          </Chip>
        </div>
      </Tarjeta>
      <div style={{ position: "absolute", left: 1160, top: 680, fontSize: 18, fontWeight: 700, color: b.tinta3 }}>Cifras: caso de prueba Torres del Paine (informe Be&amp;Go)</div>
    </Escena>
  );
};

// ---------- 6. Dónde comer ----------

const PantallaPicadas: React.FC<{ at: number }> = ({ at }) => (
  <div style={{ height: "100%", background: b.suelo }}>
    <BarraApp titulo="Dónde comer" sub="Puerto Natales · a pie desde ti" color={cat.comida} />
    <div style={{ display: "flex", gap: 8, padding: "12px 14px 10px" }}>
      <Chip at={at + 6} tam={14.5} color={cat.comida} lleno>
        <Check size={14} strokeWidth={3} /> Sin gluten
      </Chip>
      <Chip at={at + 10} tam={14.5} color={b.tinta2}>
        Abierto ahora
      </Chip>
      <Chip at={at + 14} tam={14.5} color={b.tinta2}>
        Hasta $12 mil
      </Chip>
    </div>
    <Mapa alto={190} pins={[[150, 70, cat.comida], [220, 140, cat.comida], [60, 100, b.tinta3]]} />
    <div style={{ height: 12 }} />
    {[
      ["Picá del Muelle", "4,7", "1.240", "300 m"],
      ["Fogón Patagón", "4,6", "860", "450 m"],
      ["Cocina de la Costanera", "4,5", "2.010", "600 m"],
    ].map(([n, r, c, d], i) => (
      <Fila
        key={n}
        at={at + 26 + i * 8}
        color={cat.comida}
        destacada={i === 0}
        icono={<Utensils size={21} {...I} />}
        titulo={n}
        detalle={
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <Star size={14} fill={b.sol} color={b.sol} /> {r} · {c} reseñas · {d}
          </span>
        }
      />
    ))}
  </div>
);

const PantallaCamara: React.FC<{ at: number; letrero?: boolean }> = ({ at, letrero }) => {
  const frame = useCurrentFrame();
  const scan = ((frame - at) % 50) / 50;
  const flash = interpolate(frame - at - 26, [0, 3, 12], [0, 0.85, 0], clamp);
  return (
    <div style={{ height: "100%", background: "#0E1418", position: "relative", overflow: "hidden" }}>
      {letrero ? (
        <div style={{ position: "absolute", left: 22, right: 22, top: 140, height: 230, background: "#1F4E79", borderRadius: 10, boxShadow: "0 10px 30px rgba(0,0,0,0.5)", transform: "rotate(-2deg)", color: "#FFFFFF", padding: "20px 22px", fontFamily: fuente }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.08em", opacity: 0.85 }}>TERMINAL DE BUSES</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 26, fontSize: 30, fontWeight: 800 }}>
            <span>← Andenes 1–10</span>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18, fontSize: 30, fontWeight: 800 }}>
            <span>Andenes 11–20 →</span>
          </div>
        </div>
      ) : (
        <div style={{ position: "absolute", left: 40, right: 40, top: 70, height: 420, background: "#F5EFE2", borderRadius: 8, transform: "rotate(3deg)", padding: "22px 24px", fontFamily: "Georgia, serif", color: "#3A2E22", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
          <div style={{ fontSize: 26, fontWeight: 700, textAlign: "center", letterSpacing: "0.1em" }}>CARTA</div>
          {[
            ["Merluza austral a la plancha", "10.900"],
            ["Cazuela de cordero", "11.500"],
            ["Pastel de jaiba", "12.900"],
            ["Sándwich de lomo", "9.500"],
            ["Ensalada de la casa", "6.900"],
            ["Papas fritas", "4.500"],
          ].map(([p, v]) => (
            <div key={p} style={{ display: "flex", justifyContent: "space-between", fontSize: 17, marginTop: 16 }}>
              <span>{p}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ position: "absolute", left: 30, right: 30, top: letrero ? 120 + scan * 280 : 60 + scan * 440, height: 3, background: "#7CF2B5", boxShadow: "0 0 18px #7CF2B5", opacity: 0.8 }} />
      {[
        [24, 40],
        [348, 40],
        [24, 560],
        [348, 560],
      ].map(([x, y], i) => (
        <div key={i} style={{ position: "absolute", left: x - (i % 2 ? 24 : 0), top: y - (i > 1 ? 24 : 0), width: 24, height: 24, borderColor: "#FFFFFF", borderStyle: "solid", borderWidth: `${i < 2 ? 4 : 0}px ${i % 2 ? 4 : 0}px ${i > 1 ? 4 : 0}px ${i % 2 ? 0 : 4}px` }} />
      ))}
      <div style={{ position: "absolute", bottom: 36, left: "50%", marginLeft: -38, width: 76, height: 76, borderRadius: 38, border: "5px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 58, height: 58, borderRadius: 29, background: "#FFFFFF" }} />
      </div>
      <div style={{ position: "absolute", top: 14, left: 0, right: 0, textAlign: "center", color: "#FFFFFF", fontSize: 16, fontWeight: 800, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
        <Camera size={18} {...I} /> {letrero ? "Muéstrame dónde estás" : "Foto de la carta"}
      </div>
      <AbsoluteFill style={{ background: "#FFFFFF", opacity: flash }} />
    </div>
  );
};

export const Comer: React.FC = () => {
  const pic = useCue("picadas");
  const foto = useCue("foto");
  const pla = useCue("platos");
  const platos: [string, string, string, boolean][] = [
    ["Merluza austral a la plancha", "Sin gluten · $10.900", "Para Sofía", true],
    ["Cazuela de cordero", "Pedir sin fideos · $11.500", "Para todos", true],
    ["Pastel de jaiba", "Lleva harina · $12.900", "Para los adultos", false],
  ];
  return (
    <Escena>
      <Columna ancho={600}>
        <Rotulo at={pic - 4}>02 · Dónde comer</Rotulo>
        <Cinetico at={pic} texto="Picadas cerca,|y qué *pedir*" acento={cat.comida} style={{ marginTop: 16 }} />
        <Punto at={pic + 30} color={cat.comida}>
          Cerca de ti, por nota y reseñas
        </Punto>
        <Punto at={pic + 70} color={cat.comida}>
          Filtradas por tu régimen
        </Punto>
        <Punto at={foto} color={cat.comida}>
          Foto de la carta: los 3 mejores platos
        </Punto>
      </Columna>
      <div style={{ position: "absolute", left: 690, top: -6 }}>
        <Telefono hora="20:31">
          <Pantallas items={[[pic, <PantallaPicadas key="p" at={pic} />], [foto, <PantallaCamara key="c" at={foto} />]]} />
        </Telefono>
      </div>
      <Tarjeta at={pla} color={cat.comida} style={{ position: "absolute", left: 1160, top: 70, width: 540 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Burbuja color={cat.comida} tam={56}>
            <Utensils size={28} {...I} />
          </Burbuja>
          <div style={{ fontSize: 30, fontWeight: 800 }}>Para ustedes, en esta carta</div>
        </div>
        {platos.map(([p, d, para, ok], i) => (
          <Sube key={p} at={pla + 12 + i * 10} dist={10} style={{ display: "flex", gap: 16, marginTop: 20, alignItems: "flex-start" }}>
            <div style={{ width: 42, height: 42, borderRadius: 21, background: i === 0 ? cat.comida : b.panel, color: i === 0 ? "#FFFFFF" : b.tinta, fontSize: 22, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
            <div>
              <div style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.2 }}>{p}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: b.tinta2, marginTop: 3, display: "flex", alignItems: "center", gap: 8 }}>
                {ok ? <Check size={18} strokeWidth={3} color={b.ok} /> : <TriangleAlert size={18} {...I} color={b.alerta} />}
                {d} · {para}
              </div>
            </div>
          </Sube>
        ))}
        <Sube at={pla + 50} style={{ marginTop: 24, paddingTop: 18, borderTop: `2px solid ${b.linea}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 700 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Wallet size={22} {...I} color={b.copihue} /> Presupuesto de hoy
            </span>
            <span>quedan $38.000</span>
          </div>
          <Barra at={pla + 54} valor={0.62} />
        </Sube>
      </Tarjeta>
      <Ejemplo style={{ left: 1160, top: 760 }} />
    </Escena>
  );
};

// ---------- 7. Llegar y moverse ----------

const PantallaOpciones: React.FC<{ at: number; op: number }> = ({ at, op }) => (
  <div style={{ height: "100%", background: b.suelo }}>
    <div style={{ paddingTop: 10 }}>
      <Push at={at} icono={<MapPin size={22} {...I} />} color={cat.traslado} titulo="Llegaste al aeropuerto de Puerto Montt" texto="Te muestro cómo llegar a tu hotel." />
    </div>
    <div style={{ fontSize: 14, fontWeight: 800, color: b.tinta2, letterSpacing: "0.05em", margin: "18px 22px 10px" }}>AL HOTEL, CENTRO DE PUERTO MONTT</div>
    <Fila at={op} color={cat.transporte} icono={<Bus size={22} {...I} />} destacada titulo="Bus al centro" detalle={<>Sale cada 30 min · 35 min <Estado tipo="ok" /></>} derecha="$4.000" />
    <Fila at={op + 8} color={cat.traslado} icono={<Users size={22} {...I} />} titulo="Transfer compartido" detalle={<>Puerta a puerta · 40 min <Estado tipo="desde" /></>} derecha="$7.000" />
    <Fila at={op + 16} color={b.tinta} icono={<Car size={22} {...I} />} titulo="Uber" detalle={<>Por distancia × tarifa <Estado tipo="est" /></>} derecha="≈ $18.000" />
    <Sube at={op + 30} style={{ margin: "6px 14px 0" }}>
      <div style={{ borderRadius: 14, background: b.tinta, color: "#FFFFFF", fontSize: 16, fontWeight: 800, padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        Abrir Uber con tu destino <ArrowRight size={18} {...I} />
      </div>
    </Sube>
  </div>
);

const PantallaPie: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at + 6, fps, 1200, EXPO_OUT);
  return (
    <div style={{ height: "100%", background: b.suelo }}>
      <BarraApp titulo="A pie al paradero" sub="180 m · 3 min · sale en 9 min" color={cat.transporte} />
      <Mapa
        alto={430}
        pins={[[214, 120, cat.transporte]]}
        ruta={[
          [92, 384],
          [92, 250],
          [205, 262],
          [214, 130],
        ]}
        progreso={k}
      />
      <Fila at={at + 20} color={cat.transporte} icono={<Footprints size={22} {...I} />} titulo="Camina hasta la esquina" detalle="Luego dobla a la derecha, 120 m" />
    </div>
  );
};

export const Moverse: React.FC = () => {
  const geo = useCue("geocerca");
  const op = useCue("opciones");
  const pie = useCue("pie");
  const let_ = useCue("letrero");
  return (
    <Escena>
      <Columna ancho={600}>
        <Rotulo at={geo - 4}>03 · Llegar y moverse</Rotulo>
        <Cinetico at={geo} texto="Sabe dónde *estás*" acento={cat.traslado} style={{ marginTop: 16 }} />
        <Punto at={geo + 20} color={cat.traslado}>
          Se activa al llegar (geocerca)
        </Punto>
        <Punto at={op} color={cat.traslado}>
          Precios publicados y Uber estimado
        </Punto>
        <Punto at={pie} color={cat.traslado}>
          A pie hasta el paradero
        </Punto>
        <Punto at={let_} color={cat.traslado}>
          Foto del lugar: hacia dónde ir
        </Punto>
      </Columna>
      <div style={{ position: "absolute", left: 690, top: -6 }}>
        <Telefono hora="16:48">
          <Pantallas
            items={[
              [geo, <PantallaOpciones key="o" at={geo + 6} op={op} />],
              [pie, <PantallaPie key="p" at={pie} />],
              [let_, <PantallaCamara key="c" at={let_} letrero />],
            ]}
          />
        </Telefono>
      </div>
      <Tarjeta at={let_ + 34} color={cat.transporte} style={{ position: "absolute", left: 1160, top: 230, width: 540 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Burbuja color={cat.transporte} tam={56}>
            <Eye size={28} {...I} />
          </Burbuja>
          <div style={{ fontSize: 28, fontWeight: 800 }}>Leí el letrero</div>
        </div>
        <div style={{ fontSize: 30, fontWeight: 800, marginTop: 18, lineHeight: 1.25 }}>
          Tu bus sale del <span style={{ color: cat.transporte }}>andén 14</span>: ve a la derecha, unos 40 m.
        </div>
        <div style={{ fontSize: 21, fontWeight: 600, color: b.tinta2, marginTop: 12 }}>Cruza el letrero con tu GPS y tu pasaje.</div>
      </Tarjeta>
      <Ejemplo style={{ left: 1160, top: 760 }} />
    </Escena>
  );
};

// ---------- 8. Vuelo vigilado ----------

const PantallaVuelo: React.FC<{ at: number; cancelado?: boolean }> = ({ at, cancelado }) => (
  <div style={{ height: "100%", background: b.suelo }}>
    <BarraApp titulo="Tu vuelo" sub="Leído de tu correo de confirmación" color={cat.transporte} />
    <div style={{ margin: 14, borderRadius: 22, background: b.superficie, border: `1.5px solid ${cancelado ? b.mal : b.linea}`, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em" }}>SCL → PUQ</div>
        <Plane size={30} {...I} color={cat.transporte} />
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: b.tinta2, marginTop: 4 }}>sáb 13 mar · 07:10 · 5 pasajeros</div>
      <div style={{ marginTop: 12 }}>
        {cancelado ? (
          <span style={{ fontSize: 15, fontWeight: 800, color: "#FFFFFF", background: b.mal, borderRadius: 8, padding: "5px 10px" }}>CANCELADO</span>
        ) : (
          <span style={{ fontSize: 15, fontWeight: 800, color: b.ok, background: b.okSuave, borderRadius: 8, padding: "5px 10px" }}>A TIEMPO</span>
        )}
      </div>
    </div>
    {cancelado ? (
      <>
        <Fila at={at + 10} color={b.mal} icono={<ShieldCheck size={22} {...I} />} titulo="Tus derechos" detalle="Con la fuente citada" />
        <Fila at={at + 18} color={cat.transporte} icono={<Plane size={22} {...I} />} titulo="Cómo seguir" detalle="3 alternativas para hoy" />
        <Fila at={at + 26} color={cat.alojamiento} icono={<FileText size={22} {...I} />} titulo="Reclamo" detalle="Borrador listo para revisar" />
      </>
    ) : (
      <>
        <div style={{ marginTop: 6 }}>
          <Push at={at + 14} icono={<Bell size={22} {...I} />} color={cat.transporte} titulo="Ya abrió el check-in" texto="Tu código y tus datos están listos." />
        </div>
        <Sube at={at + 34} style={{ margin: "14px 14px 0" }}>
          <div style={{ borderRadius: 14, background: cat.transporte, color: "#FFFFFF", fontSize: 17, fontWeight: 800, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            Abrir check-in <ArrowRight size={18} {...I} />
          </div>
          <div style={{ textAlign: "center", fontSize: 14.5, fontWeight: 700, color: b.tinta2, marginTop: 10 }}>Tú tocas el botón final</div>
        </Sube>
      </>
    )}
  </div>
);

export const Vuelo: React.FC = () => {
  const chk = useCue("checkin");
  const can = useCue("cancelado");
  const panel: [React.ReactNode, string, string, string, string][] = [
    [<ShieldCheck key="s" size={28} {...I} />, b.mal, "Tus derechos", "Reubicación o devolución, y qué pedir en el mesón", "Fuente: Código Aeronáutico y condiciones de la aerolínea"],
    [<Plane key="p" size={28} {...I} />, cat.transporte, "Alternativas", "Próximo vuelo, bus, o noche cerca del aeropuerto", "Con precio y horario"],
    [<FileText key="f" size={28} {...I} />, cat.alojamiento, "Reclamo redactado", "Listo para revisar y enviar", "Seguimiento hasta la respuesta"],
  ];
  return (
    <Escena>
      <Columna ancho={600}>
        <Rotulo at={chk - 4}>04 · Vuelo vigilado</Rotulo>
        <Cinetico at={chk} texto="Te avisa antes|que el *mesón*" acento={cat.transporte} style={{ marginTop: 16 }} />
        <Punto at={chk + 16} color={cat.transporte}>
          Lee tu reserva
        </Punto>
        <Punto at={chk + 60} color={cat.transporte}>
          Check-in asistido: tú confirmas
        </Punto>
        <Punto at={can} color={cat.transporte}>
          Si cancelan: derechos, alternativas y reclamo
        </Punto>
      </Columna>
      <div style={{ position: "absolute", left: 690, top: -6 }}>
        <Telefono hora="05:02">
          <Pantallas items={[[chk, <PantallaVuelo key="a" at={chk} />], [can, <PantallaVuelo key="b" at={can} cancelado />]]} />
        </Telefono>
      </div>
      <div style={{ position: "absolute", left: 1160, top: 40, width: 540 }}>
        <Chip at={can + 6} color={b.mal} lleno tam={22}>
          <Zap size={20} {...I} /> En segundos, no en la fila
        </Chip>
        {panel.map(([ic, c, t, d, f], i) => (
          <Tarjeta key={t} at={can + 14 + i * 16} color={c} style={{ marginTop: 18 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <Burbuja color={c} tam={52}>
                {ic}
              </Burbuja>
              <div>
                <div style={{ fontSize: 27, fontWeight: 800 }}>{t}</div>
                <div style={{ fontSize: 21, fontWeight: 600, color: b.tinta2, marginTop: 4, lineHeight: 1.3 }}>{d}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: b.tinta3, marginTop: 6 }}>{f}</div>
              </div>
            </div>
          </Tarjeta>
        ))}
      </div>
    </Escena>
  );
};

// ---------- 9. Arquitectura ----------

type Caja = { x: number; y: number; w: number; h: number };
const NODO_H = 66;
const VIG: (Caja & { t: string; ic: React.ReactNode })[] = [
  { t: "Vuelo", ic: <Plane size={24} {...I} /> },
  { t: "Clima", ic: <CloudSun size={24} {...I} /> },
  { t: "Geocercas", ic: <MapPin size={24} {...I} /> },
  { t: "Hora del día", ic: <Clock size={24} {...I} /> },
].map((v, i) => ({ ...v, x: 330, y: 200 + i * (NODO_H + 14), w: 250, h: NODO_H }));
const ORQ: Caja = { x: 660, y: 250, w: 300, h: 220 };
const ESP: (Caja & { t: string; ic: React.ReactNode; c: string })[] = [
  { t: "Comida", ic: <Utensils size={24} {...I} />, c: cat.comida },
  { t: "Movilidad", ic: <Bus size={24} {...I} />, c: cat.traslado },
  { t: "Vuelos y derechos", ic: <Plane size={24} {...I} />, c: cat.transporte },
  { t: "Presupuesto", ic: <Wallet size={24} {...I} />, c: b.copihue },
].map((v, i) => ({ ...v, x: 1040, y: 200 + i * (NODO_H + 14), w: 290, h: NODO_H }));
const FUE: (Caja & { t: string; s: string })[] = [
  { t: "Mapas y lugares", s: "Google Places · Routes · OSM" },
  { t: "Clima", s: "Open-Meteo" },
  { t: "Vuelos", s: "SerpApi · AeroDataBox" },
  { t: "Alojamiento", s: "LiteAPI" },
  { t: "Tablas propias", s: "CONAF · buses · tarifas" },
].map((v, i) => ({ ...v, x: 1410, y: 178 + i * 76, w: 290, h: 64 }));
const APP: Caja = { x: 0, y: 200, w: 250, h: 306 };
const VUELTA = 600; // altura de la flecha de vuelta: orquestador → teléfono

const Pulso: React.FC<{ desde: [number, number]; hasta: [number, number]; at: number; color: string; veces?: number }> = ({ desde, hasta, at, color, veces = 3 }) => {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < 0 || t > veces * 26) return null;
  const p = (t % 26) / 26;
  return <circle cx={desde[0] + (hasta[0] - desde[0]) * p} cy={desde[1] + (hasta[1] - desde[1]) * p} r={8} fill={color} opacity={1 - p * 0.3} />;
};

const Conector: React.FC<{ desde: [number, number]; hasta: [number, number]; at: number; color?: string; punteado?: boolean }> = ({ desde, hasta, at, color = b.lineaFuerte, punteado }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 600, EXPO_OUT);
  const x = desde[0] + (hasta[0] - desde[0]) * k;
  const y = desde[1] + (hasta[1] - desde[1]) * k;
  if (k <= 0) return null;
  return <line x1={desde[0]} y1={desde[1]} x2={x} y2={y} stroke={color} strokeWidth={3} strokeDasharray={punteado ? "8 8" : undefined} />;
};

const NodoBox: React.FC<{ c: Caja; at: number; color?: string; children: React.ReactNode; fuerte?: boolean }> = ({ c, at, color = b.noche, children, fuerte }) => (
  <Aparece at={at} style={{ position: "absolute", left: c.x, top: c.y, width: c.w, height: c.h }}>
    <div style={{ width: "100%", height: "100%", boxSizing: "border-box", borderRadius: 18, background: fuerte ? color : b.superficie, color: fuerte ? "#FFFFFF" : b.tinta, border: `2px solid ${fuerte ? color : b.linea}`, boxShadow: "0 6px 18px rgba(11,46,74,0.08)", display: "flex", alignItems: "center", gap: 12, padding: "0 16px" }}>{children}</div>
  </Aparece>
);

export const Arquitectura: React.FC = () => {
  const app = useCue("app");
  const vig = useCue("vigilantes");
  const orq = useCue("orquestador");
  const esp = useCue("especialistas");
  const fue = useCue("fuentes");
  const gua = useCue("guarda");
  const cy = (c: Caja) => c.y + c.h / 2;
  const encabezado = (x: number, t: string, at: number, w = 290) => (
    <Sube at={at} dist={8} style={{ position: "absolute", left: x, top: 156, width: w, whiteSpace: "nowrap", fontSize: 17, fontWeight: 800, color: b.tinta2, letterSpacing: "0.07em", textTransform: "uppercase" }}>
      {t}
    </Sube>
  );
  return (
    <Escena>
      <Rotulo at={app - 4}>Arquitectura del MVP</Rotulo>
      <Cinetico at={app} texto="Agentes que *despiertan* cuando algo cambia" tam={52} style={{ marginTop: 12 }} />
      <svg width={1700} height={814} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        {VIG.map((v, i) => (
          <Conector key={`a${i}`} desde={[APP.x + APP.w, cy(APP)]} hasta={[v.x, cy(v)]} at={vig + 6 + i * 3} />
        ))}
        {VIG.map((v, i) => (
          <Conector key={`b${i}`} desde={[v.x + v.w, cy(v)]} hasta={[ORQ.x, cy(ORQ)]} at={orq + 4 + i * 3} />
        ))}
        {ESP.map((e, i) => (
          <Conector key={`c${i}`} desde={[ORQ.x + ORQ.w, cy(ORQ)]} hasta={[e.x, cy(e)]} at={esp + 4 + i * 3} color={e.c} />
        ))}
        {ESP.map((e, i) => (
          <Conector key={`d${i}`} desde={[e.x + e.w, cy(e)]} hasta={[FUE[Math.min(i + (i > 1 ? 1 : 0), 4)].x, cy(FUE[Math.min(i + (i > 1 ? 1 : 0), 4)])]} at={fue + 6 + i * 3} />
        ))}
        <Conector desde={[ORQ.x + ORQ.w / 2, ORQ.y + ORQ.h]} hasta={[ORQ.x + ORQ.w / 2, 650]} at={gua + 6} punteado color={b.copihue} />
        <Conector desde={[ESP[3].x + ESP[3].w / 2, ESP[3].y + ESP[3].h]} hasta={[ESP[3].x + ESP[3].w / 2, 650]} at={gua + 10} punteado color={b.copihue} />
        <Conector desde={[ORQ.x + 50, ORQ.y + ORQ.h]} hasta={[ORQ.x + 50, VUELTA]} at={esp + 36} color={b.copihue} />
        <Conector desde={[ORQ.x + 50, VUELTA]} hasta={[APP.x + APP.w / 2, VUELTA]} at={esp + 44} color={b.copihue} />
        <Conector desde={[APP.x + APP.w / 2, VUELTA]} hasta={[APP.x + APP.w / 2, APP.y + APP.h]} at={esp + 56} color={b.copihue} />
        {VIG.map((v, i) => (
          <Pulso key={`p${i}`} desde={[v.x + v.w, cy(v)]} hasta={[ORQ.x, cy(ORQ)]} at={orq + 14 + i * 5} color={b.sol} veces={2} />
        ))}
        {ESP.map((e, i) => (
          <Pulso key={`q${i}`} desde={[ORQ.x + ORQ.w, cy(ORQ)]} hasta={[e.x, cy(e)]} at={esp + 18} color={e.c} />
        ))}
        <Pulso desde={[ORQ.x + 50, VUELTA]} hasta={[APP.x + APP.w / 2, VUELTA]} at={esp + 64} color={b.copihue} veces={2} />
      </svg>

      {encabezado(0, "Tu teléfono", app)}
      <NodoBox c={APP} at={app + 6} color={b.noche}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, width: "100%" }}>
          <Burbuja color={b.noche} tam={58} lleno>
            <Smartphone size={30} {...I} />
          </Burbuja>
          <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>App híbrida</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: b.tinta2 }}>React + Capacitor</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["GPS", "Cámara", "Push"].map((t, i) => (
              <Chip key={t} at={app + 30 + i * 6} tam={16} color={b.noche}>
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </NodoBox>
      <Sube at={esp + 60} dist={6} style={{ position: "absolute", left: 230, top: VUELTA + 10, width: 420, textAlign: "center", fontSize: 21, fontWeight: 800, color: b.copihue }}>
        1 aviso útil, no diez
      </Sube>

      {encabezado(330, "Vigilantes · sin IA", vig, 260)}
      {VIG.map((v, i) => (
        <NodoBox key={v.t} c={v} at={vig + 4 + i * 6}>
          <span style={{ color: b.sol, display: "flex" }}>{v.ic}</span>
          <span style={{ fontSize: 22, fontWeight: 800 }}>{v.t}</span>
        </NodoBox>
      ))}

      {encabezado(660, "Orquestador", orq, 300)}
      <NodoBox c={ORQ} at={orq + 4} color={b.copihue} fuerte>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%", gap: 8 }}>
          <Brain size={54} strokeWidth={2.2} />
          <div style={{ fontSize: 32, fontWeight: 800 }}>Claude</div>
          <div style={{ fontSize: 18, fontWeight: 700, opacity: 0.9 }}>Estado del viaje: grupo, plan, saldo, memoria</div>
        </div>
      </NodoBox>

      {encabezado(1040, "Especialistas", esp)}
      {ESP.map((e, i) => (
        <NodoBox key={e.t} c={e} at={esp + 4 + i * 6}>
          <span style={{ color: e.c, display: "flex" }}>{e.ic}</span>
          <span style={{ fontSize: 22, fontWeight: 800 }}>{e.t}</span>
        </NodoBox>
      ))}

      <Sube at={fue} dist={8} style={{ position: "absolute", left: 1410, top: 134, width: 290, whiteSpace: "nowrap", fontSize: 17, fontWeight: 800, color: b.tinta2, letterSpacing: "0.07em", textTransform: "uppercase" }}>
        Fuentes intercambiables
      </Sube>
      {FUE.map((f, i) => (
        <NodoBox key={f.t} c={f} at={fue + 4 + i * 5}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.15, color: i === 4 ? b.copihue : b.tinta }}>{f.t}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: b.tinta2 }}>{f.s}</div>
          </div>
        </NodoBox>
      ))}

      {[
        { x: 330, w: 680, t: "Memoria del viajero", s: "Preferencias, régimen, lo que eligió · visible y editable" },
        { x: 1040, w: 660, t: "Observatorio de precios reales", s: "Cada cotización y cada boleta · el activo que crece" },
      ].map((m, i) => (
        <NodoBox key={m.t} c={{ x: m.x, y: 650, w: m.w, h: 100 }} at={gua + 10 + i * 10}>
          <Burbuja color={b.copihue} tam={56}>
            <Database size={28} {...I} />
          </Burbuja>
          <div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{m.t}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: b.tinta2 }}>{m.s}</div>
          </div>
        </NodoBox>
      ))}
    </Escena>
  );
};

// ---------- 10. Límites ----------

export const Limites: React.FC = () => {
  const tres = useCue("tres");
  const cues = [useCue("uber"), useCue("check"), useCue("ar")];
  const items: [string, string, React.ReactNode][] = [
    ["No cotiza el precio real de Uber", "Lo estima por distancia y abre Uber con tu destino", <Car key="c" size={34} {...I} />],
    ["No hace el check-in por ti", "Te lo deja listo: tú tocas confirmar", <Plane key="p" size={34} {...I} />],
    ["No es realidad aumentada", "Lee tu foto y te orienta con el GPS", <Camera key="a" size={34} {...I} />],
  ];
  return (
    <Escena>
      <Cabeza at={tres - 4} rotulo="Con honestidad" titulo="Lo que el MVP *no* promete" />
      <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", gap: 28 }}>
        {items.map(([no, si, ic], i) => (
          <Tarjeta key={no} at={cues[i]} franja={false} style={{ flex: 1, padding: 0 }}>
            <div style={{ background: b.malSuave, padding: "30px 30px 26px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, color: b.mal }}>
                {ic}
                <X size={30} strokeWidth={3.2} />
              </div>
              <div style={{ fontSize: 34, fontWeight: 800, marginTop: 16, lineHeight: 1.15 }}>{no}</div>
            </div>
            <Sube at={cues[i] + 24} style={{ padding: "26px 30px 32px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <Check size={32} strokeWidth={3.2} color={b.ok} style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: 28, fontWeight: 700, color: b.tinta, lineHeight: 1.3 }}>{si}</div>
            </Sube>
          </Tarjeta>
        ))}
      </div>
      <Sube at={cues[2] + 50} style={{ position: "absolute", top: 640, left: 0, fontSize: 24, fontWeight: 700, color: b.tinta2 }}>
        Sin APIs que no existen y sin automatizar sitios de terceros.
      </Sube>
    </Escena>
  );
};

// ---------- 11. Plan ----------

const FASES: [string, number, number, string][] = [
  ["0 · App, viaje y memoria", 1, 2, b.copihue],
  ["1 · Dónde comer", 3, 4, cat.comida],
  ["2 · Llegar y moverse", 5, 7, cat.traslado],
  ["3 · Vuelo vigilado", 8, 9, cat.transporte],
  ["4 · Resumen del día y gastos", 10, 11, cat.alojamiento],
  ["5 · Cinco familias en viaje real", 12, 14, b.noche],
];

export const Plan: React.FC = () => {
  const fases = useCue("fases");
  const orden = useCue("orden");
  const costo = useCue("costo");
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const X0 = 440;
  const W = 1700 - X0;
  const sem = (s: number) => X0 + ((s - 1) / 14) * W;
  const Y0 = 230;
  const FILA = 62;
  const hito = 3.45; // 28-nov, contado desde el 4-nov
  return (
    <Escena>
      <Cabeza at={fases - 4} rotulo="Plan para ir probando" titulo="Seis fases, *14 semanas*" />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <Sube key={i} at={fases + 10 + i} dist={6} style={{ position: "absolute", left: sem(i + 1), top: Y0 - 40, width: W / 14, textAlign: "center", fontSize: 17, fontWeight: 800, color: b.tinta3 }}>
            S{i + 1}
          </Sube>
        ))}
        {FASES.map(([t, d, h, c], i) => {
          const at = orden + i * 16;
          const k = transicion(frame, at, fps, 800, EXPO_OUT);
          return (
            <React.Fragment key={t}>
              <Sube at={at - 4} dist={8} style={{ position: "absolute", left: 0, top: Y0 + i * FILA + 8, width: X0 - 20, fontSize: 24, fontWeight: 800 }}>
                {t}
              </Sube>
              <div style={{ position: "absolute", left: X0, right: 0, top: Y0 + i * FILA + FILA - 2, height: 1.5, background: b.linea }} />
              <div style={{ position: "absolute", left: sem(d) + 3, top: Y0 + i * FILA + 8, height: 40, width: Math.max(0, ((h - d + 1) / 14) * W - 6) * k, borderRadius: 10, background: c }} />
            </React.Fragment>
          );
        })}
        <div style={{ position: "absolute", left: sem(hito + 1) - 1, top: Y0 - 8, width: 3, height: FASES.length * FILA + 14, background: b.copihue, opacity: interpolate(frame - orden - 20, [0, 10], [0, 1], clamp) }} />
        <Sube at={orden + 24} dist={6} style={{ position: "absolute", left: sem(hito + 1) + 10, top: Y0 + FASES.length * FILA - 4, fontSize: 18, fontWeight: 800, color: b.copihue }}>
          Postulación 28-nov
        </Sube>
      </div>
      <div style={{ position: "absolute", top: 636, left: 0, right: 0, display: "flex", gap: 24 }}>
        {[
          ["USD 1,5–4", "por viaje de 7 días", "IA solo ante eventos o preguntas"],
          ["≈ $140 mil/mes", "piloto de 30 viajes", "fijo bajo: capas gratis al inicio"],
          ["15% a Apple o Google", "si se cobra dentro de la app", "mejor cobrar en la web"],
        ].map(([v, s, n], i) => (
          <Tarjeta key={v} at={costo + i * 10} color={[b.copihue, b.sol, b.noche][i]} style={{ flex: 1 }}>
            <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em" }}>{v}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: b.tinta2 }}>
              {s} · {n}
            </div>
          </Tarjeta>
        ))}
      </div>
    </Escena>
  );
};

// ---------- 12. Cierre ----------

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const meta = useCue("meta");
  const lema = useCue("lema");
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, lema - 6, fps, 900, EXPO_OUT);
  return (
    <Escena>
      <div style={{ position: "absolute", left: 0, top: 170, width: 860 }}>
        <Rotulo at={meta - 4}>La meta</Rotulo>
        <Cinetico at={meta} texto="28 de *noviembre*" style={{ marginTop: 16 }} />
        <Punto at={meta + 24}>La app en tu teléfono</Punto>
        <Punto at={meta + 56} color={cat.comida}>
          Dónde comer funcionando
        </Punto>
        <Punto at={meta + 86} color={cat.transporte}>
          Demo del vuelo cancelado
        </Punto>
      </div>
      <div style={{ position: "absolute", right: 0, top: 160, width: 720, height: 460, borderRadius: 32, background: b.noche, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: k, transform: `scale(${0.94 + 0.06 * k})` }}>
        <Marca tam={150} claro />
        <div style={{ fontSize: 44, fontWeight: 800, color: "#FFFFFF", marginTop: 6 }}>Viaja acompañado.</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#9CC3DC", marginTop: 24 }}>Diseño del primer MVP · {autor}</div>
      </div>
    </Escena>
  );
};
