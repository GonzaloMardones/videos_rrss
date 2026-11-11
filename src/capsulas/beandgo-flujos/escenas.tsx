import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CircleUser, CloudSun, House, Luggage, Lock, Map, ReceiptText, Route, Scale, Sparkles, Wallet } from "lucide-react";
import { useCue } from "../../components/narracion";
import { Phone } from "../beandgo-app/ios";
import { Bloqueada, CapturaVeredicto } from "../beandgo-app/pantallas";
import {
  Body,
  Card,
  Chip,
  clamp,
  Display,
  EMPHASIZED_DECEL,
  Escena,
  FlowBadge,
  Grow,
  gs,
  In,
  Label,
  m,
  MarcaGS,
  Nota,
  Seq,
  Shape,
  SPATIAL_DEFAULT,
  STANDARD,
  Steps,
  useIn,
  useSpring,
} from "./m3";
import { AvisoAntes, Bloqueo, BoletaRapida, CotizarFlexible, DosBuses, HojaModos, Noti, PlanEstimado, RiesgoConexion, RutaMapa, TuCaso, TuRuta } from "./pantallas2";

const I = { strokeWidth: 2.2 } as const;

/** El teléfono a la derecha: entra con un spring y cambia de pantalla con un fundido cruzado ("fade through"). */
const Telefono: React.FC<{ at: number; screens: { from: number; node: React.ReactNode; dark?: boolean; real?: boolean }[]; nota?: string }> = ({ at, screens, nota }) => {
  const frame = useCurrentFrame();
  const s = useSpring(at, SPATIAL_DEFAULT);
  const idx = screens.reduce((acc, sc, i) => (frame >= sc.from ? i : acc), 0);
  const cur = screens[idx];
  const prev = idx > 0 ? screens[idx - 1] : null;
  const k = interpolate(frame - cur.from, [0, 12], [0, 1], { ...clamp, easing: EMPHASIZED_DECEL });
  return (
    <div style={{ position: "absolute", left: 1220, top: 96 + (1 - s) * 160, opacity: Math.min(1, s * 1.5) }}>
      <Phone escala={0.9} oscuro={cur.dark} sinBarra={cur.real} hora="16:41">
        {prev && k < 1 ? <AbsoluteFill style={{ opacity: 1 - k }}>{prev.node}</AbsoluteFill> : null}
        <AbsoluteFill style={{ opacity: prev ? k : 1, transform: `scale(${prev ? 0.96 + 0.04 * k : 1})` }}>{cur.node}</AbsoluteFill>
      </Phone>
      <div style={{ position: "absolute", top: -44, left: 0 }}>
        <Nota>{cur.real ? "Captura real del simulador" : (nota ?? "Pantalla según el diseño · datos de ejemplo")}</Nota>
      </div>
    </div>
  );
};

/** Columna izquierda de un flujo: número en galleta, título y pasos en secuencia. */
const Flujo: React.FC<{ n: number; at: number; titulo: string; fase: string; tono: "primary" | "secondary" | "tertiary"; pasos: string[]; activo: number; children?: React.ReactNode }> = ({ n, at, titulo, fase, tono, pasos, activo, children }) => {
  const color = { primary: [m.primaryContainer, m.onPrimaryContainer], secondary: [m.secondaryContainer, m.onSecondaryContainer], tertiary: [m.tertiaryContainer, m.onTertiaryContainer] }[tono];
  return (
    <div style={{ position: "absolute", left: 120, top: 110, width: 960 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <FlowBadge n={n} at={at} size={112} color={color[0]} on={color[1]} />
        <div>
          <In at={at + 4}>
            <Label color={m.onSurfaceVariant}>{fase}</Label>
          </In>
          <In at={at + 8}>
            <Display size={70}>{titulo}</Display>
          </In>
        </div>
      </div>
      <div style={{ marginTop: 44 }}>
        <Steps at={at + 14} items={pasos} active={activo} />
      </div>
      {children}
    </div>
  );
};

/** Paso activo según los cues: el índice del último cue alcanzado. */
const useActivo = (marcas: number[]) => {
  const frame = useCurrentFrame();
  return marcas.reduce((acc, at, i) => (frame >= at ? i : acc), 0);
};

// ---------- 1. Intro ----------
export const Intro: React.FC = () => {
  const hola = useCue("hola");
  const tres = useCue("tres");
  const frame = useCurrentFrame();
  const morph = interpolate(frame - hola, [0, 40], [1, 0], { ...clamp, easing: STANDARD });
  const fases = [
    { k: "cookie9" as const, c: m.primaryContainer, on: m.onPrimaryContainer, t: "Antes", d: "¿Te alcanza?" },
    { k: "clover4" as const, c: m.secondaryContainer, on: m.onSecondaryContainer, t: "Durante", d: "Te acompaña" },
    { k: "sunny" as const, c: m.tertiaryContainer, on: m.onTertiaryContainer, t: "Después", d: "Si algo sale mal" },
  ];
  return (
    <Escena>
      <div style={{ position: "absolute", left: 120, top: 150, width: 880 }}>
        <Grow at={hola} from={0.4}>
          <Shape kind="cookie12" size={250} color={m.primary} amp={morph} rot={frame / 300}>
            <MarcaGS tam={66} color={m.onPrimary} amp={m.primaryContainer} />
          </Shape>
        </Grow>
        <In at={hola + 10} style={{ marginTop: 34 }}>
          <Display size={84}>Qué hace, y por dónde entrar</Display>
        </In>
        <In at={hola + 18}>
          <Body size={32} style={{ marginTop: 12 }}>
            Para quien nunca ha usado la app
          </Body>
        </In>
      </div>
      <div style={{ position: "absolute", left: 1150, top: 150, display: "flex", flexDirection: "column", gap: 34 }}>
        {fases.map((f, i) => (
          <Grow key={f.t} at={tres + i * 22} from={0.3}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Shape kind={f.k} size={170} color={f.c} rot={frame / 400 + i}>
                <span style={{ fontFamily: gs, fontWeight: 700, fontSize: 30, color: f.on }}>{f.t}</span>
              </Shape>
              <span style={{ fontFamily: gs, fontSize: 36, fontWeight: 500, color: m.onSurface }}>{f.d}</span>
            </div>
          </Grow>
        ))}
      </div>
    </Escena>
  );
};

// ---------- 2. Mapa de la app ----------
export const Mapa: React.FC = () => {
  const tabs = useCue("tabs");
  const flujos = useCue("flujos");
  const items: [React.ReactNode, string][] = [
    [<House key="h" size={30} {...I} />, "Inicio"],
    [<Luggage key="l" size={30} {...I} />, "Viajes"],
    [<Sparkles key="s" size={30} {...I} />, "Copiloto"],
    [<CircleUser key="p" size={30} {...I} />, "Perfil"],
  ];
  const lista: [string, string, "primary" | "secondary" | "tertiary"][] = [
    ["Cotizar", "Antes", "primary"],
    ["Tu ruta", "Antes", "primary"],
    ["Aviso antes de salir", "Antes", "primary"],
    ["Viaje en bus", "Durante", "secondary"],
    ["Boleta rápida", "Durante", "secondary"],
    ["Lo que aprende de ti", "Durante", "secondary"],
    ["Reclamos", "Después", "tertiary"],
  ];
  return (
    <Escena>
      <div style={{ position: "absolute", left: 120, top: 100 }}>
        <In at={tabs}>
          <Display size={64}>Cuatro pestañas</Display>
        </In>
        <div style={{ display: "flex", gap: 14, marginTop: 26, background: m.surfaceContainer, borderRadius: 999, padding: 12 }}>
          {items.map(([ic, n], i) => (
            <Grow key={n} at={tabs + 8 + i * 6} from={0.5}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 26px", borderRadius: 999, background: i === 0 ? m.secondaryContainer : "transparent", color: m.onSurface, fontFamily: gs, fontSize: 28, fontWeight: 500 }}>
                {ic}
                {n}
              </div>
            </Grow>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 120, top: 330 }}>
        <In at={flujos}>
          <Display size={64}>Siete flujos</Display>
        </In>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 400px)", gap: 18, marginTop: 26 }}>
          {lista.map(([n, fase, tono], i) => {
            const c = { primary: [m.primaryContainer, m.onPrimaryContainer], secondary: [m.secondaryContainer, m.onSecondaryContainer], tertiary: [m.tertiaryContainer, m.onTertiaryContainer] }[tono];
            return (
              <Grow key={n} at={flujos + 10 + i * 9} from={0.7}>
                <div style={{ background: m.surfaceContainerLow, borderRadius: 28, padding: "20px 22px", display: "flex", alignItems: "center", gap: 18, border: `1px solid ${m.outlineVariant}` }}>
                  <Shape kind="cookie9" size={64} color={c[0]}>
                    <span style={{ fontFamily: gs, fontWeight: 700, fontSize: 28, color: c[1] }}>{i + 1}</span>
                  </Shape>
                  <div>
                    <div style={{ fontFamily: gs, fontSize: 28, fontWeight: 500, color: m.onSurface }}>{n}</div>
                    <div style={{ fontFamily: gs, fontSize: 20, color: m.onSurfaceVariant }}>{fase}</div>
                  </div>
                </div>
              </Grow>
            );
          })}
        </div>
      </div>
    </Escena>
  );
};

// ---------- 3. Cotizar ----------
export const Cotizar: React.FC = () => {
  const hoja = useCue("hoja");
  const flex = useCue("flexible");
  const ver = useCue("veredicto");
  const frame = useCurrentFrame();
  const activo = useActivo([hoja, hoja + 70, flex, ver, ver + 130]);
  return (
    <Escena>
      <Flujo n={1} at={hoja} titulo="Cotizar" fase="Antes del viaje · Inicio" tono="primary" activo={activo} pasos={["Dónde y cuándo", "Quiénes viajan y cuánto tienes", "Soy flexible: hasta ± 3 días", "El veredicto y tu combinación", "Guardar con su plan estimado"]}>
        <In at={flex + 10} style={{ marginTop: 40 }}>
          <Chip tone="primary" icon={<Wallet size={22} {...I} />}>
            Cotiza la ventana más barata, mismas noches
          </Chip>
        </In>
      </Flujo>
      <Telefono
        at={hoja}
        screens={[
          { from: 0, node: <CotizarFlexible f={frame - hoja} /> },
          { from: ver, node: <CapturaVeredicto />, real: true },
          { from: ver + 130, node: <PlanEstimado /> },
        ]}
      />
    </Escena>
  );
};

// ---------- 4. Tu ruta ----------
export const Ruta: React.FC = () => {
  const tr = useCue("trayecto");
  const mo = useCue("modos");
  const pa = useCue("paradas");
  const frame = useCurrentFrame();
  const sel = frame < mo + 70 ? 0 : frame < mo + 150 ? 2 : 0;
  const prog = interpolate(frame - pa, [0, 60], [0, 1], clamp);
  const activo = useActivo([tr, tr + 40, tr + 80, mo, pa]);
  return (
    <Escena>
      <Flujo n={2} at={tr} titulo="Tu ruta" fase="Antes del viaje · Mi viaje" tono="primary" activo={activo} pasos={["Salgo de", "Tu bus", "Llego a", "Cómo llegas: Metro, micro, auto, a pie o Uber", "Paradas con alarma en el camino"]}>
        <In at={mo + 72} style={{ marginTop: 34 }}>
          <Card tone={m.surfaceContainerHigh} style={{ padding: 24, maxWidth: 820 }}>
            <div style={{ fontSize: 26, fontWeight: 500 }}>Uber: ~$4.800–$7.000 aprox.</div>
            <Body size={22}>Un estimado de Be&Go con tarifas publicadas, solo en Santiago. No es el precio de Uber.</Body>
          </Card>
        </In>
      </Flujo>
      <Telefono
        at={tr}
        screens={[
          { from: 0, node: <TuRuta /> },
          { from: mo, node: <HojaModos sel={sel} /> },
          { from: pa, node: <RutaMapa prog={prog} /> },
        ]}
      />
    </Escena>
  );
};

// ---------- 5. Aviso antes de salir ----------
export const Antes: React.FC = () => {
  const av = useCue("aviso");
  const da = useCue("datos");
  const frame = useCurrentFrame();
  const fuentes: [React.ReactNode, string, string][] = [
    [<CloudSun key="w" size={28} {...I} />, "Pronóstico en origen, mitad de camino y destino", "Open-Meteo"],
    [<Route key="r" size={28} {...I} />, "Tráfico previsto a la hora de salir", "Google Maps"],
    [<Map key="m" size={28} {...I} />, "Estado de las rutas", "Ministerio de Obras Públicas"],
  ];
  return (
    <Escena>
      <div style={{ position: "absolute", left: 120, top: 110, width: 980 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <FlowBadge n={3} at={av} size={112} />
          <div>
            <In at={av + 4}>
              <Label color={m.onSurfaceVariant}>Antes del viaje · un día antes</Label>
            </In>
            <In at={av + 8}>
              <Display size={70}>Aviso antes de salir</Display>
            </In>
          </div>
        </div>
        <In at={av + 20} style={{ marginTop: 30 }}>
          <Chip tone="secondary">Escrito en código con datos, no con un modelo</Chip>
        </In>
        <Seq at={da} step={14} style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 16 }}>
          {fuentes.map(([ic, t, src]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 20, background: m.surfaceContainerLow, borderRadius: 24, padding: "18px 24px", border: `1px solid ${m.outlineVariant}` }}>
              <div style={{ width: 56, height: 56, borderRadius: 18, background: m.secondaryContainer, color: m.onSecondaryContainer, display: "flex", alignItems: "center", justifyContent: "center" }}>{ic}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 500, color: m.onSurface }}>{t}</div>
                <div style={{ fontSize: 22, color: m.onSurfaceVariant }}>{src}</div>
              </div>
            </div>
          ))}
        </Seq>
      </div>
      <Telefono at={av} screens={[{ from: 0, node: <AvisoAntes f={frame - av} />, dark: true }]} />
    </Escena>
  );
};

// ---------- 6. Viaje en bus ----------
export const BusFlujo: React.FC = () => {
  const pa = useCue("pasaje");
  const dos = useCue("dos");
  const ri = useCue("riesgo");
  const frame = useCurrentFrame();
  const activo = useActivo([pa, pa + 60, dos, ri]);
  return (
    <Escena>
      <Flujo n={4} at={pa} titulo="Viaje en bus" fase="Durante el viaje · Copiloto" tono="secondary" activo={activo} pasos={["La foto del pasaje", "Cuenta regresiva y botones en la pantalla bloqueada", "Dos buses, un solo trayecto", "Aviso urgente si peligra la conexión"]}>
        <In at={dos + 20} style={{ marginTop: 34, display: "flex", gap: 12 }}>
          <Chip tone="secondary">45 min mismo terminal</Chip>
          <Chip tone="secondary">90 min si cambia de terminal</Chip>
        </In>
      </Flujo>
      <Telefono
        at={pa}
        screens={[
          { from: 0, node: <Bloqueada estado="antes" f={frame - pa} />, dark: true },
          { from: dos, node: <DosBuses /> },
          { from: ri, node: <RiesgoConexion f={frame - ri} />, dark: true },
        ]}
      />
    </Escena>
  );
};

// ---------- 7. Boleta rápida ----------
export const Boleta: React.FC = () => {
  const co = useCue("control");
  const pa = useCue("pasos");
  const frame = useCurrentFrame();
  const marcas = { faceid: co + 80, camara: pa, lectura: pa + 120, listo: pa + 230 };
  const fase = frame >= marcas.listo ? "listo" : frame >= marcas.lectura ? "lectura" : frame >= marcas.camara ? "camara" : frame >= marcas.faceid ? "faceid" : "control";
  const base = { control: co, faceid: marcas.faceid, camara: marcas.camara, lectura: marcas.lectura, listo: marcas.listo }[fase];
  const activo = useActivo([co, marcas.faceid, marcas.camara, marcas.lectura]);
  return (
    <Escena>
      <Flujo n={5} at={co} titulo="Boleta rápida" fase="Durante el viaje · sin abrir la app" tono="secondary" activo={activo} pasos={["Botón en la pantalla bloqueada o botón de Acción", "Face ID", "La cámara ya abierta", "Confirmar, y sigues tu viaje"]}>
        <In at={pa + 240} style={{ marginTop: 34 }}>
          <Chip tone="ok" icon={<ReceiptText size={22} {...I} />}>
            Anotado: $1.290 en Tiendas San Camilo
          </Chip>
        </In>
      </Flujo>
      <Telefono
        at={co}
        screens={[
          { from: 0, node: <BoletaRapida fase={fase} f={frame - base} />, dark: fase !== "lectura" && fase !== "listo" },
        ]}
      />
    </Escena>
  );
};

// ---------- 8. Lo que aprende de ti (grafo de contexto) ----------
type Nodo = { id: string; x: number; y: number; t: string; sub: string; color: string; on: string; shape: "cookie9" | "cookie12" | "clover4" | "sunny" | "soft6" | "circle" };
const NODOS: Nodo[] = [
  { id: "yo", x: 420, y: 360, t: "Tú", sub: "persona", color: m.primary, on: m.onPrimary, shape: "cookie12" },
  { id: "term", x: 120, y: 150, t: "En el terminal", sub: "momento", color: m.secondaryContainer, on: m.onSecondaryContainer, shape: "clover4" },
  { id: "arriba", x: 120, y: 560, t: "Arriba del bus", sub: "momento", color: m.secondaryContainer, on: m.onSecondaryContainer, shape: "clover4" },
  { id: "comida", x: 720, y: 150, t: "Comida", sub: "categoría", color: m.tertiaryContainer, on: m.onTertiaryContainer, shape: "sunny" },
  { id: "tienda", x: 820, y: 400, t: "Tiendas San Camilo", sub: "lugar · cifrado", color: m.tertiaryContainer, on: m.onTertiaryContainer, shape: "soft6" },
  { id: "aviso", x: 720, y: 600, t: "¿Algo para el viaje?", sub: "aviso", color: m.primaryContainer, on: m.onPrimaryContainer, shape: "cookie9" },
];
const ARISTAS: [string, string, string][] = [
  ["yo", "term", "llegaste · 3 viajes"],
  ["yo", "arriba", "subiste"],
  ["yo", "comida", "gastaste $1.290"],
  ["comida", "tienda", "en"],
  ["yo", "aviso", "abriste"],
];

const Grafo: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const pos = (id: string) => NODOS.find((n) => n.id === id)!;
  return (
    <div style={{ position: "absolute", left: 100, top: 210, width: 1020, height: 720 }}>
      <svg width={1020} height={720} style={{ position: "absolute", inset: 0 }}>
        {ARISTAS.map(([a, b, label], i) => {
          const A = pos(a);
          const B = pos(b);
          const p = interpolate(frame - (at + 18 + i * 16), [0, 18], [0, 1], { ...clamp, easing: STANDARD });
          const mx = A.x + (B.x - A.x) * 0.5;
          const my = A.y + (B.y - A.y) * 0.5;
          return (
            <g key={i}>
              <line x1={A.x} y1={A.y} x2={A.x + (B.x - A.x) * p} y2={A.y + (B.y - A.y) * p} stroke={m.outline} strokeWidth={3} />
              <g opacity={p > 0.6 ? 1 : 0}>
                <rect x={mx - label.length * 6.6 - 14} y={my - 20} width={label.length * 13.2 + 28} height={40} rx={20} fill={m.surface} stroke={m.outlineVariant} />
                <text x={mx} y={my + 7} textAnchor="middle" fontFamily={gs} fontSize={20} fill={m.onSurfaceVariant}>
                  {label}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
      {NODOS.map((n, i) => {
        const size = n.id === "yo" ? 170 : 150;
        return (
          <div key={n.id} style={{ position: "absolute", left: n.x - size / 2, top: n.y - size / 2 }}>
            <Grow at={at + (n.id === "yo" ? 0 : 10 + i * 14)} from={0.2}>
              <Shape kind={n.shape} size={size} color={n.color} rot={frame / 500 + i}>
                <div style={{ textAlign: "center", padding: 16, fontFamily: gs, color: n.on }}>
                  <div style={{ fontSize: n.id === "yo" ? 36 : 21, fontWeight: 700, lineHeight: 1.1 }}>{n.t}</div>
                  <div style={{ fontSize: 15, opacity: 0.8, marginTop: 4 }}>{n.sub}</div>
                </div>
              </Shape>
            </Grow>
          </div>
        );
      })}
    </div>
  );
};

export const Contexto: React.FC = () => {
  const gr = useCue("grafo");
  const ha = useCue("habito");
  const pr = useCue("privado");
  const frame = useCurrentFrame();
  return (
    <Escena>
      <div style={{ position: "absolute", left: 120, top: 92, display: "flex", alignItems: "center", gap: 24 }}>
        <FlowBadge n={6} at={gr} size={96} color={m.secondaryContainer} on={m.onSecondaryContainer} />
        <div>
          <In at={gr + 4}>
            <Label color={m.onSurfaceVariant}>Grafo de contexto · memoria entre viajes</Label>
          </In>
          <In at={gr + 8}>
            <Display size={60}>Lo que aprende de ti</Display>
          </In>
        </div>
      </div>
      <Grafo at={gr + 10} />
      <In at={pr} style={{ position: "absolute", left: 120, top: 860, display: "flex", gap: 12 }}>
        <Chip tone="ok" icon={<Lock size={22} {...I} />}>
          Sin ubicación
        </Chip>
        <Chip tone="ok" icon={<Lock size={22} {...I} />}>
          Nombre de la tienda cifrado con tu clave
        </Chip>
      </In>
      <Telefono
        at={ha}
        nota="Pantalla según el diseño · aviso de producción"
        screens={[
          {
            from: 0,
            dark: true,
            node: (
              <Bloqueo hora="16:35" fecha="domingo 16 de noviembre">
                <div style={{ opacity: interpolate(frame - ha, [14, 26], [0, 1], clamp), transform: `translateY(${interpolate(frame - ha, [14, 26], [-26, 0], clamp)}px)` }}>
                  <Noti titulo="¿Algo para el viaje?" cuerpo="Casi siempre compras algo antes de subir (la última vez, $1.290 en Tiendas San Camilo). Faltan 25 min para la salida: si compras, toca «Foto de la boleta» y queda anotado." botones={["Foto de la boleta"]} />
                </div>
              </Bloqueo>
            ),
          },
        ]}
      />
    </Escena>
  );
};

// ---------- 9. Reclamos ----------
export const Reclamos: React.FC = () => {
  const ca = useCue("caso");
  const ev = useCue("evaluacion");
  const ct = useCue("carta");
  const frame = useCurrentFrame();
  const activo = useActivo([ca, ev, ct, ct + 70, ct + 140]);
  return (
    <Escena>
      <Flujo n={7} at={ca} titulo="Reclamos" fase="Después · Perfil → Mis reclamos" tono="tertiary" activo={activo} pasos={["Tu caso, con su estado", "¿Reclamo? ¿Demanda?, por separado", "Los gastos que te causó", "La carta para la empresa, SERNAC o el Ministerio", "Revisión de un abogado, si quieres"]}>
        <In at={ev + 30} style={{ marginTop: 34 }}>
          <Chip tone="tertiary" icon={<Scale size={22} {...I} />}>
            Las reglas deciden · la IA solo redacta
          </Chip>
        </In>
      </Flujo>
      <Telefono at={ca} screens={[{ from: 0, node: <TuCaso f={frame - ct} /> }]} />
    </Escena>
  );
};

// ---------- 10. Probado ----------
export const Probado: React.FC = () => {
  const pr = useCue("pruebas");
  const frame = useCurrentFrame();
  return (
    <Escena>
      <div style={{ position: "absolute", left: 120, top: 110 }}>
        <In at={pr}>
          <Label color={m.onSurfaceVariant}>En el iPhone, con los textos de producción</Label>
        </In>
        <In at={pr + 6}>
          <Display size={84}>76 avisos, cada uno se prueba</Display>
        </In>
        <In at={pr + 30} style={{ display: "flex", gap: 14, marginTop: 30 }}>
          <Chip tone="primary">Perfil → Prueba de avisos</Chip>
          <Chip tone="secondary">Perfil → Demos de flujo</Chip>
        </In>
      </div>
      <div style={{ position: "absolute", left: 120, top: 420, display: "grid", gridTemplateColumns: "repeat(19, 72px)", gap: 14 }}>
        {Array.from({ length: 76 }, (_, i) => {
          const p = interpolate(frame - (pr + 10 + i * 1.6), [0, 10], [0, 1], { ...clamp, easing: EMPHASIZED_DECEL });
          const tones = [m.primaryContainer, m.secondaryContainer, m.tertiaryContainer];
          return (
            <div key={i} style={{ transform: `scale(${p})`, opacity: p }}>
              <Shape kind={i % 3 === 0 ? "cookie9" : i % 3 === 1 ? "clover4" : "circle"} size={72} color={tones[i % 3]} rot={frame / 300 + i} />
            </div>
          );
        })}
      </div>
    </Escena>
  );
};

// ---------- 11. Cierre ----------
export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const l1 = useCue("lema1");
  const l = useCue("lema");
  const frame = useCurrentFrame();
  const fases = [
    [m.primaryContainer, m.onPrimaryContainer, "Antes", "cookie9"],
    [m.secondaryContainer, m.onSecondaryContainer, "Durante", "clover4"],
    [m.tertiaryContainer, m.onTertiaryContainer, "Después", "sunny"],
  ] as const;
  const s = useIn(l, 20);
  return (
    <Escena>
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", justifyContent: "center", gap: 40 }}>
        {fases.map(([c, on, t, k], i) => (
          <Grow key={t} at={l1 + i * 8} from={0.3}>
            <Shape kind={k} size={210} color={c} rot={frame / 300 + i}>
              <span style={{ fontFamily: gs, fontWeight: 700, fontSize: 34, color: on }}>{t}</span>
            </Shape>
          </Grow>
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 480, textAlign: "center", opacity: s, transform: `translateY(${(1 - s) * 30}px)` }}>
        <MarcaGS tam={150} />
        <div style={{ fontFamily: gs, fontSize: 52, fontWeight: 500, color: m.onSurfaceVariant, marginTop: 8 }}>Viaja acompañado.</div>
        <div style={{ fontFamily: gs, fontSize: 22, color: m.onSurfaceVariant, marginTop: 18 }}>{autor}</div>
      </div>
    </Escena>
  );
};

