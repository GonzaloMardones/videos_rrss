import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Brain, CloudRain, Database, Layers, Lock, MapPin, Palette, Plane, Scale, Server, ShieldCheck, Smartphone, Bus, Users, Wallet } from "lucide-react";
import { useCue, useScene } from "../../components/narracion";
import { Arco, clamp, Marca, Phone, Pill, Pop, redonda, Rotulo, Sube, t, texto, useP } from "./ios";
import { Bloqueada, CapturaVeredicto, Combinacion, Copiloto, Cotizando, HojaCotizar, Inicio, MapaViaje, Notificacion, PasajePapel, PasoAtraso, Perfil, Resumen, RevisarPasaje } from "./pantallas";

const ARTES = [
  "torres-del-paine",
  "san-pedro-de-atacama",
  "rapa-nui",
  "puerto-varas",
  "pucon",
  "castro",
  "valparaiso",
  "valle-del-elqui",
  "puerto-natales",
  "santiago",
  "arica",
  "puerto-montt",
  "punta-arenas",
  "la-serena",
  "valdivia",
  "concepcion",
  "temuco",
  "iquique",
  "antofagasta",
  "calama",
  "copiapo",
  "coyhaique",
  "chillan",
  "talca",
  "curico",
  "rancagua",
  "osorno",
  "norte",
  "sur",
];

// Contenedor de escena: entra y sale con un desplazamiento corto.
const Escena: React.FC<{ children: React.ReactNode; fondo?: React.ReactNode }> = ({ children, fondo }) => {
  const frame = useCurrentFrame();
  const { duration } = useScene();
  const entra = interpolate(frame, [0, 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const sale = interpolate(frame, [duration - 12, duration], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill style={{ opacity: entra * (1 - sale), fontFamily: texto, color: t.ink }}>
      {fondo}
      <AbsoluteFill style={{ transform: `translateY(${(1 - entra) * 20 - sale * 20}px)` }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

// Bloque de texto a la izquierda: rótulo, titular y puntos.
const Lado: React.FC<{ at: number; rotulo: string; titulo: React.ReactNode; children?: React.ReactNode; style?: React.CSSProperties; ancho?: number }> = ({ at, rotulo, titulo, children, style, ancho = 760 }) => (
  <div style={{ position: "absolute", left: 120, top: 150, width: ancho, ...style }}>
    <Sube at={at}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 12, height: 12, borderRadius: 6, background: t.copihue }} />
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: t.inkSoft }}>{rotulo}</span>
      </div>
    </Sube>
    <Sube at={at + 4}>
      <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 70, lineHeight: 1.06, letterSpacing: "-0.02em", marginTop: 18 }}>{titulo}</div>
    </Sube>
    <div style={{ marginTop: 30 }}>{children}</div>
  </div>
);

const Punto: React.FC<{ at: number; icono: React.ReactNode; color?: string; children: React.ReactNode }> = ({ at, icono, color = t.copihue, children }) => (
  <Sube at={at} dist={14} style={{ display: "flex", gap: 18, alignItems: "flex-start", marginTop: 22 }}>
    <div style={{ width: 52, height: 52, borderRadius: 26, background: `${color}1F`, color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icono}</div>
    <div style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.32, paddingTop: 7 }}>{children}</div>
  </Sube>
);

const ac = (s: string) => <span style={{ color: t.copihue }}>{s}</span>;

// Teléfono a la derecha, con entrada desde abajo.
const TelDerecha: React.FC<{ at: number; children: React.ReactNode; left?: number; top?: number; escala?: number; hora?: string; oscuro?: boolean; sinBarra?: boolean; fondo?: string }> = ({
  at,
  children,
  left = 1180,
  top = 92,
  escala = 0.92,
  ...rest
}) => {
  const p = useP(at, 22);
  return (
    <div style={{ position: "absolute", left, top: top + (1 - p) * 120, opacity: p }}>
      <Phone escala={escala} {...rest}>
        {children}
      </Phone>
    </div>
  );
};

// Franja de arcos que se desliza (portada y cierre).
const Franja: React.FC<{ top: number; vel?: number; alto?: number }> = ({ top, vel = 1.2, alto = 210 }) => {
  const frame = useCurrentFrame();
  const ancho = alto * 0.86;
  const paso = ancho + 22;
  const dx = -((frame * vel) % (paso * ARTES.length));
  return (
    <div style={{ position: "absolute", top, left: 0, right: 0, height: alto, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: dx, display: "flex", gap: 22 }}>
        {[...ARTES, ...ARTES].map((s, i) => (
          <Arco key={i} slug={s} ancho={ancho} alto={alto} pie={24} style={{ boxShadow: "0 8px 16px rgba(91,70,52,0.10)" }} />
        ))}
      </div>
    </div>
  );
};

// ---------- 1. Gancho ----------
export const Gancho: React.FC = () => {
  const pre = useCue("pregunta");
  const res = useCue("responde");
  return (
    <Escena>
      <div style={{ position: "absolute", left: 120, top: 140 }}>
        <Sube at={pre}>
          <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 150, letterSpacing: "-0.03em", lineHeight: 1 }}>
            ¿Me {ac("alcanza")}?
          </div>
        </Sube>
        <Sube at={pre + 20}>
          <div style={{ fontSize: 36, fontWeight: 500, color: t.inkSoft, marginTop: 22, maxWidth: 1100 }}>La pregunta de una familia antes de gastar un peso.</div>
        </Sube>
        <Sube at={res} style={{ marginTop: 34, display: "flex", gap: 14 }}>
          <Rotulo style={{ fontSize: 24, padding: "10px 20px" }}>Antes del viaje: el veredicto</Rotulo>
          <Rotulo style={{ fontSize: 24, padding: "10px 20px" }}>Durante: el copiloto</Rotulo>
        </Sube>
      </div>
      <Franja top={650} />
    </Escena>
  );
};

// ---------- 2. Título ----------
export const Titulo: React.FC<{ autor: string }> = ({ autor }) => {
  const m = useCue("marca");
  return (
    <Escena fondo={<AbsoluteFill style={{ background: `linear-gradient(150deg, ${t.navy} 0%, #061D30 100%)` }} />}>
      <div style={{ position: "absolute", left: 120, top: 250, color: "#fff" }}>
        <Pop at={m}>
          <Marca tam={190} claro />
        </Pop>
        <Sube at={m + 10}>
          <div style={{ fontFamily: redonda, fontWeight: 700, fontSize: 64, marginTop: 6 }}>Qué es y cómo se ve</div>
        </Sube>
        <Sube at={m + 22} style={{ display: "flex", gap: 14, marginTop: 34 }}>
          <Rotulo claro>App nativa de iPhone</Rotulo>
          <Rotulo claro>Diseño en Figma</Rotulo>
          <Rotulo claro>Noviembre de 2026</Rotulo>
        </Sube>
        <Sube at={m + 34}>
          <div style={{ fontSize: 24, color: "#9CC3DC", marginTop: 40 }}>{autor}</div>
        </Sube>
      </div>
      <div style={{ position: "absolute", right: 120, top: 210 }}>
        <Pop at={m + 6}>
          <Arco slug="puerto-natales" ancho={520} alto={600} pie={36} style={{ boxShadow: "0 30px 60px rgba(0,0,0,0.35)" }} />
        </Pop>
      </div>
    </Escena>
  );
};

// ---------- 3. Qué es ----------
const Tarjeta: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, children, style }) => (
  <Pop at={at} desde={0.94}>
    <div style={{ background: t.surface, borderRadius: 40, border: `1px solid ${t.line}`, boxShadow: "0 12px 26px rgba(91,70,52,0.12)", padding: 40, ...style }}>{children}</div>
  </Pop>
);

export const Que: React.FC = () => {
  const mo = useCue("motor");
  const co = useCue("copiloto");
  return (
    <Escena>
      <div style={{ position: "absolute", left: 120, top: 100 }}>
        <Sube at={mo}>
          <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 64, letterSpacing: "-0.02em" }}>No es un buscador de pasajes</div>
        </Sube>
      </div>
      <div style={{ position: "absolute", left: 120, right: 120, top: 250, display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <Tarjeta at={mo + 12} style={{ height: 560 }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: t.inkSoft }}>Antes · el motor</div>
            <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 50, marginTop: 14, lineHeight: 1.1 }}>¿Te alcanza el viaje?</div>
            <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
              <Pill tono="ok" style={{ fontSize: 24, padding: "10px 20px" }}>Viable</Pill>
              <Pill tono="warn" style={{ fontSize: 24, padding: "10px 20px" }}>Ajustado</Pill>
              <Pill tono="bad" style={{ fontSize: 24, padding: "10px 20px" }}>No alcanza</Pill>
            </div>
            {["El mínimo necesario", "Cuánto falta", "Qué pesa más"].map((x, i) => (
              <Sube key={x} at={mo + 30 + i * 12} style={{ fontSize: 32, fontWeight: 600, marginTop: 26, display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 12, height: 12, borderRadius: 6, background: t.copihue }} />
                {x}
              </Sube>
            ))}
          </Tarjeta>
        </div>
        <div style={{ flex: 1 }}>
          <Tarjeta at={co} style={{ height: 560 }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: t.inkSoft }}>Durante · el copiloto</div>
            <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 50, marginTop: 14, lineHeight: 1.1 }}>Despierta cuando algo cambia</div>
            {[
              [<CloudRain key="r" size={30} />, "Lluvia mañana", t.sky],
              [<Plane key="p" size={30} />, "Un vuelo cancelado", t.bad],
              [<Bus key="b" size={30} />, "Un bus atrasado", t.warn],
            ].map(([ic, x, c], i) => (
              <Sube key={String(x)} at={co + 18 + i * 12} style={{ display: "flex", gap: 18, alignItems: "center", marginTop: 26 }}>
                <div style={{ width: 62, height: 62, borderRadius: 31, background: `${c}1F`, color: String(c), display: "flex", alignItems: "center", justifyContent: "center" }}>{ic}</div>
                <span style={{ fontSize: 32, fontWeight: 600 }}>{x}</span>
              </Sube>
            ))}
          </Tarjeta>
        </div>
      </div>
    </Escena>
  );
};

// ---------- 4. Diseño (Figma) ----------
export const Diseno: React.FC = () => {
  const fi = useCue("figma");
  const il = useCue("ilustraciones");
  const pa = useCue("paleta");
  const frame = useCurrentFrame();
  const colores: [string, string, string][] = [
    ["Crema", "ground", t.ground],
    ["Tarjeta", "surface", t.surface],
    ["Panel", "panel", t.panel],
    ["Tinta", "ink", t.ink],
    ["Cielo", "plate", t.plate],
    ["Copihue", "tint", t.copihue],
  ];
  return (
    <Escena>
      <div style={{ position: "absolute", left: 120, top: 92, width: 600 }}>
        <Sube at={fi}>
          <Rotulo style={{ fontSize: 20 }}>
            <Layers size={18} /> Figma · archivo «Be&Go iOS» · 50 pantallas
          </Rotulo>
        </Sube>
        <Sube at={fi + 6}>
          <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 70, lineHeight: 1.05, letterSpacing: "-0.02em", marginTop: 20 }}>
            El destino {ac("primero")}
          </div>
        </Sube>
        <Sube at={il} style={{ fontSize: 30, fontWeight: 600, color: t.inkSoft, marginTop: 20, lineHeight: 1.35 }}>
          29 lugares de Chile con ilustraciones propias. Sin fotos de terceros.
        </Sube>
        <div style={{ marginTop: 40 }}>
          <Sube at={pa}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 700, color: t.inkSoft, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              <Palette size={20} /> Un solo color para tocar
            </div>
          </Sube>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 16 }}>
            {colores.map(([n, k, c], i) => {
              const realce = k === "tint" ? interpolate(frame - pa - 50, [0, 12], [0, 1], clamp) : 0;
              return (
                <Pop key={k} at={pa + 6 + i * 5}>
                  <div style={{ background: t.surface, borderRadius: 22, border: `${1 + realce * 2}px solid ${realce ? t.copihue : t.line}`, padding: 10, transform: `scale(${1 + realce * 0.06})` }}>
                    <div style={{ height: 58, borderRadius: 14, background: c, border: `1px solid ${t.line}` }} />
                    <div style={{ fontSize: 19, fontWeight: 700, marginTop: 8 }}>{n}</div>
                    <div style={{ fontSize: 15, color: t.inkSoft, fontFamily: "'JetBrains Mono', monospace" }}>{c}</div>
                  </div>
                </Pop>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 790, top: 92, display: "grid", gridTemplateColumns: "repeat(6, 160px)", gap: 14 }}>
        {ARTES.map((s, i) => (
          <Pop key={s} at={il + i * 2.4} desde={0.7}>
            <Arco slug={s} ancho={160} alto={150} pie={20} style={{ boxShadow: "0 6px 12px rgba(91,70,52,0.10)" }} />
          </Pop>
        ))}
      </div>
    </Escena>
  );
};

// ---------- 5. Inicio ----------
export const InicioEsc: React.FC = () => {
  const ho = useCue("hola");
  const act = useCue("activo");
  const frame = useCurrentFrame();
  const scroll = interpolate(frame, [act + 70, act + 140], [0, 300], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <Escena>
      <Lado at={ho} rotulo="Inicio" titulo={<>Hola. ¿A dónde {ac("quieres ir")}?</>}>
        <Punto at={act} icono={<Bus size={26} />}>
          El viaje en curso arriba, con la hora de salir.
        </Punto>
        <Punto at={act + 40} icono={<MapPin size={26} />} color={t.sky}>
          Hoy en tu ciudad.
        </Punto>
        <Punto at={act + 70} icono={<Palette size={26} />} color={t.activities}>
          Lugares para soñar.
        </Punto>
      </Lado>
      <TelDerecha at={ho}>
        <Inicio scroll={scroll} />
      </TelDerecha>
      <Sube at={ho + 20} style={{ position: "absolute", left: 1180, top: 52 }}>
        <Rotulo>Pantalla según Figma · ejemplo</Rotulo>
      </Sube>
    </Escena>
  );
};

// ---------- 6. Cotizar y veredicto ----------
export const Veredicto: React.FC = () => {
  const ho = useCue("hoja");
  const cot = useCue("cotizando");
  const ver = useCue("veredicto");
  const frame = useCurrentFrame();
  const sube = interpolate(frame - ho, [6, 26], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const fase = frame < cot ? 0 : frame < ver ? 1 : 2;
  return (
    <Escena>
      <Lado at={ho} rotulo="Cotizar" titulo={fase < 2 ? <>Una hoja {ac("corta")}</> : <>El {ac("veredicto")}</>}>
        {fase === 0 ? (
          <>
            <Punto at={ho + 10} icono={<MapPin size={26} />}>Origen, destino y fechas.</Punto>
            <Punto at={ho + 30} icono={<Users size={26} />} color={t.sky}>El grupo con sus edades.</Punto>
            <Punto at={ho + 50} icono={<Wallet size={26} />} color={t.activities}>El presupuesto.</Punto>
          </>
        ) : fase === 1 ? (
          <>
            <Punto at={cot} icono={<Brain size={26} />}>Muestra qué está buscando.</Punto>
            <Punto at={cot + 30} icono={<ShieldCheck size={26} />} color={t.ok}>Solo las fuentes que respondieron.</Punto>
          </>
        ) : (
          <>
            <Sube at={ver}>
              <div style={{ fontSize: 30, fontWeight: 600, color: t.inkSoft }}>2 adultos y 3 niños a Puerto Natales</div>
            </Sube>
            <Sube at={ver + 50}>
              <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 104, letterSpacing: "-0.03em", marginTop: 8 }}>$1.641.800</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: t.inkSoft }}>mínimo necesario</div>
            </Sube>
            <Sube at={ver + 150} style={{ display: "flex", gap: 14, marginTop: 26, alignItems: "center" }}>
              <Pill tono="bad" style={{ fontSize: 26, padding: "10px 20px" }}>No alcanza con $1.000.000</Pill>
            </Sube>
            <Sube at={ver + 200}>
              <div style={{ fontSize: 28, fontWeight: 600, marginTop: 22 }}>Lo que más pesa: el transporte, 38 %.</div>
            </Sube>
          </>
        )}
      </Lado>
      <TelDerecha at={ho} sinBarra={fase === 2}>
        {fase === 0 ? <HojaCotizar sube={sube} /> : fase === 1 ? <Cotizando f={frame - cot} /> : <CapturaVeredicto />}
      </TelDerecha>
      <div style={{ position: "absolute", left: 1180, top: 52 }}>
        <Rotulo>{fase === 2 ? "Captura real del simulador · 7-nov-2026" : "Pantalla según Figma · ejemplo"}</Rotulo>
      </div>
    </Escena>
  );
};

// ---------- 7. Arma tu combinación ----------
export const CombinacionEsc: React.FC = () => {
  const pe = useCue("pestanas");
  const to = useCue("total");
  const frame = useCurrentFrame();
  const elegido = frame < to + 40 ? 0 : 1;
  const actualizando = frame >= to + 40 && frame < to + 70;
  return (
    <Escena>
      <Lado at={pe} rotulo="Arma tu combinación" titulo={<>Tú eliges, {ac("el motor suma")}</>}>
        <Sube at={pe + 20} style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {["Vuelos", "Buses", "Alojamiento", "Actividades", "Comida"].map((x) => (
            <Rotulo key={x} style={{ fontSize: 24, padding: "10px 20px", background: t.surface }}>
              {x}
            </Rotulo>
          ))}
        </Sube>
        <Sube at={to} style={{ display: "flex", gap: 12, marginTop: 36 }}>
          <Pill tono="ok" style={{ fontSize: 24, padding: "10px 18px" }}>Verificado</Pill>
          <Pill tono="warn" style={{ fontSize: 24, padding: "10px 18px" }}>Desde</Pill>
          <Pill tono="bad" style={{ fontSize: 24, padding: "10px 18px" }}>Estimado</Pill>
        </Sube>
        <Punto at={to + 30} icono={<Scale size={26} />}>Cada precio con su fuente y su fecha.</Punto>
        <Punto at={to + 60} icono={<Wallet size={26} />} color={t.sky}>El total se recalcula con cada elección.</Punto>
      </Lado>
      <TelDerecha at={pe}>
        <Combinacion elegido={elegido} actualizando={actualizando} total="$1.641.800" faltan="$641.800" />
      </TelDerecha>
      <div style={{ position: "absolute", left: 1180, top: 52 }}>
        <Rotulo>Pantalla según Figma · cifras del fixture</Rotulo>
      </div>
    </Escena>
  );
};

// ---------- 8. Copiloto ----------
export const CopilotoEsc: React.FC = () => {
  const tab = useCue("tab");
  const av = useCue("avisos");
  const co = useCue("comer");
  return (
    <Escena>
      <TelDerecha at={tab} left={120} top={92}>
        <Copiloto />
      </TelDerecha>
      <div style={{ position: "absolute", left: 120, top: 52 }}>
        <Rotulo>Pestaña Copiloto · demo de Puerto Natales</Rotulo>
      </div>
      <div style={{ position: "absolute", left: 640, top: 120, width: 1160 }}>
        <Sube at={tab}>
          <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 64, letterSpacing: "-0.02em" }}>Durante el viaje, {ac("te avisa")}</div>
        </Sube>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 40 }}>
          <Pop at={av}>
            <Notificacion ancho={980} titulo="Lluvia en Cueva del Milodón: plan B" texto="Mañana a las 09:00 hay 90 % de lluvia. Te propongo lugares bajo techo cerca de la cabaña." />
          </Pop>
          <Pop at={av + 70}>
            <Notificacion ancho={980} titulo="Sky cancela el vuelo PUQ → SCL" texto="Código Aeronáutico, art. 133 B: te embarcan en el siguiente vuelo o te devuelven el pasaje. Quedan Sky 16:53 y LATAM 22:14. El reclamo está listo." />
          </Pop>
          <Pop at={co}>
            <Notificacion ancho={980} titulo="Hora de cenar" texto="Les quedan $60.000 del sobre de hoy, unos $12.000 por persona." />
          </Pop>
          <Pop at={co + 60}>
            <Notificacion ancho={980} titulo="Se pasó el sobre del día" texto="Boleta de $74.600 leída y confirmada por ti: $14.600 sobre los $60.000. Sin guardar nombre, RUT ni tarjeta." />
          </Pop>
        </div>
      </div>
    </Escena>
  );
};

// ---------- 9. Bus ----------
export const BusEsc: React.FC = () => {
  const pa = useCue("pasaje");
  const li = useCue("live");
  const de = useCue("derechos");
  const frame = useCurrentFrame();
  const fase = frame < li ? 0 : frame < de ? 1 : 2;
  const scan = interpolate(frame - pa, [30, 80], [0, 1], clamp);
  const estado = frame < li + 150 ? "antes" : "salida";
  return (
    <Escena>
      {fase === 0 ? (
        <>
          <div style={{ position: "absolute", left: 120, top: 110 }}>
            <Sube at={pa}>
              <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 64, letterSpacing: "-0.02em" }}>El viaje en {ac("bus")}</div>
            </Sube>
            <Sube at={pa + 10}>
              <div style={{ fontSize: 28, fontWeight: 600, color: t.inkSoft, marginTop: 8 }}>La foto del pasaje, leída por la IA</div>
            </Sube>
          </div>
          <div style={{ position: "absolute", left: 200, top: 360 }}>
            <Pop at={pa + 14}>
              <PasajePapel scan={scan} />
            </Pop>
            <Sube at={pa + 20} style={{ marginTop: 26, marginLeft: 20 }}>
              <Rotulo>Pasaje de prueba, sintético</Rotulo>
            </Sube>
          </div>
          <TelDerecha at={pa + 60} left={1180}>
            <RevisarPasaje f={frame - pa - 70} />
          </TelDerecha>
        </>
      ) : fase === 1 ? (
        <>
          <Lado at={li} rotulo="Live Activity" titulo={<>En la pantalla {ac("bloqueada")}</>}>
            <Punto at={li + 20} icono={<Lock size={26} />}>Cuenta regresiva, andén y el próximo paso.</Punto>
            <Punto at={li + 60} icono={<Smartphone size={26} />} color={t.sky}>
              Respondes sin abrir la app: Ya subí, Ya salió, Todavía no.
            </Punto>
          </Lado>
          <TelDerecha at={li} oscuro sinBarra>
            <Bloqueada estado={estado} f={frame - li} />
          </TelDerecha>
        </>
      ) : (
        <>
          <Lado at={de} rotulo="Si el bus se atrasa" titulo={<>Qué hacer, {ac("citado")}</>}>
            <Punto at={de + 20} icono={<Scale size={26} />}>Decreto 212 del MTT y Ley del Consumidor, con su texto y su fuente.</Punto>
            <Punto at={de + 80} icono={<ShieldCheck size={26} />} color={t.ok}>
              Si una fuente no lo dice, el aviso tampoco.
            </Punto>
          </Lado>
          <TelDerecha at={de}>
            <PasoAtraso />
          </TelDerecha>
          <div style={{ position: "absolute", left: 1180, top: 52 }}>
            <Rotulo>Pantalla según Figma · ejemplo</Rotulo>
          </div>
        </>
      )}
    </Escena>
  );
};

// ---------- 10. Mapa ----------
export const MapaEsc: React.FC = () => {
  const ba = useCue("bajada");
  const pr = useCue("privado");
  const frame = useCurrentFrame();
  const avance = interpolate(frame - ba, [0, 220], [0.45, 0.82], clamp);
  const alerta = interpolate(frame - ba, [150, 166], [0, 1], clamp);
  return (
    <Escena>
      <Lado at={ba} rotulo="Mapa del viaje" titulo={<>Te avisa {ac("antes de bajar")}</>}>
        <Punto at={ba + 30} icono={<MapPin size={26} />}>Marcas dónde te bajas.</Punto>
        <Punto at={ba + 90} icono={<Bus size={26} />} color={t.sky}>
          El teléfono avisa unos 2 km antes.
        </Punto>
        <Punto at={pr} icono={<Lock size={26} />} color={t.ok}>
          Recorrido y alarmas: solo en el teléfono, nunca en el servidor.
        </Punto>
      </Lado>
      <TelDerecha at={ba} hora="18:58">
        <MapaViaje avance={avance} alerta={alerta} />
      </TelDerecha>
      <div style={{ position: "absolute", left: 1180, top: 52 }}>
        <Rotulo>Pantalla según Figma · ejemplo</Rotulo>
      </div>
    </Escena>
  );
};

// ---------- 11. Resumen ----------
export const ResumenEsc: React.FC = () => {
  const fi = useCue("fin");
  const pe = useCue("perfil");
  return (
    <Escena>
      <div style={{ position: "absolute", left: 120, top: 110, width: 560 }}>
        <Sube at={fi}>
          <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 64, lineHeight: 1.06, letterSpacing: "-0.02em" }}>
            Al llegar, {ac("un resumen")}
          </div>
        </Sube>
        <Punto at={fi + 30} icono={<Bus size={26} />}>El viaje termina solo.</Punto>
        <Punto at={fi + 70} icono={<ShieldCheck size={26} />} color={t.ok}>
          Horas planeadas y reportadas, nunca inventadas.
        </Punto>
        <Punto at={pe} icono={<Users size={26} />} color={t.sky}>
          En Perfil se suman tus viajes.
        </Punto>
        <Sube at={fi + 40} style={{ marginTop: 34 }}>
          <Rotulo>Pantallas según Figma · horas de ejemplo</Rotulo>
        </Sube>
      </div>
      <TelDerecha at={fi} left={760} escala={0.88}>
        <Resumen />
      </TelDerecha>
      <TelDerecha at={pe} left={1290} escala={0.88}>
        <Perfil />
      </TelDerecha>
    </Escena>
  );
};

// ---------- 12. Por dentro ----------
const Caja: React.FC<{ at: number; icono: React.ReactNode; titulo: string; detalle: string; color?: string; style?: React.CSSProperties }> = ({ at, icono, titulo, detalle, color = t.copihue, style }) => (
  <Pop at={at} style={style}>
    <div style={{ background: t.surface, borderRadius: 32, border: `1px solid ${t.line}`, boxShadow: "0 10px 22px rgba(91,70,52,0.10)", padding: "30px 30px", display: "flex", gap: 22, alignItems: "center" }}>
      <div style={{ width: 76, height: 76, borderRadius: 38, background: `${color}1F`, color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icono}</div>
      <div>
        <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 34 }}>{titulo}</div>
        <div style={{ fontSize: 23, color: t.inkSoft, marginTop: 2, lineHeight: 1.3 }}>{detalle}</div>
      </div>
    </div>
  </Pop>
);

const Flecha: React.FC<{ at: number; style: React.CSSProperties }> = ({ at, style }) => {
  const p = useP(at, 14);
  return <div style={{ position: "absolute", height: 4, borderRadius: 2, background: t.lineStrong, transformOrigin: "left center", transform: `scaleX(${p})`, ...style }} />;
};

export const Dentro: React.FC = () => {
  const nu = useCue("nube");
  const re = useCue("regla");
  return (
    <Escena>
      <div style={{ position: "absolute", left: 120, top: 92 }}>
        <Sube at={nu}>
          <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 64, letterSpacing: "-0.02em" }}>Por {ac("dentro")}</div>
        </Sube>
      </div>
      <div style={{ position: "absolute", left: 120, top: 230, width: 500, display: "flex", flexDirection: "column", gap: 30 }}>
        <Caja at={nu + 6} icono={<Smartphone size={30} />} titulo="App de iPhone" detalle="Nativa, avisos y Live Activity" />
        <Caja at={nu + 14} icono={<Layers size={30} />} titulo="Web instalable" detalle="El veredicto en el navegador" color={t.sky} />
      </div>
      <Flecha at={nu + 30} style={{ left: 630, top: 400, width: 90 }} />
      <div style={{ position: "absolute", left: 730, top: 230, width: 520, display: "flex", flexDirection: "column", gap: 30 }}>
        <Caja at={nu + 34} icono={<Server size={30} />} titulo="Backend" detalle="Google Cloud Run, en Santiago" color={t.navy} />
        <Caja at={nu + 44} icono={<Database size={30} />} titulo="Base de datos" detalle="Postgres, datos cifrados por usuario" color={t.local} />
      </div>
      <Flecha at={re} style={{ left: 1260, top: 400, width: 90 }} />
      <div style={{ position: "absolute", left: 1360, top: 230, width: 440, display: "flex", flexDirection: "column", gap: 30 }}>
        <Caja at={re + 4} icono={<Brain size={30} />} titulo="IA" detalle="Solo lee y redacta" color={t.activities} />
        <Caja at={re + 30} icono={<Scale size={30} />} titulo="Código" detalle="Números, decisiones y citas" color={t.copihue} />
      </div>
      <Sube at={re + 90} style={{ position: "absolute", left: 120, right: 120, top: 680 }}>
        <div style={{ background: t.surface, borderRadius: 32, border: `1px solid ${t.line}`, padding: "22px 30px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <span style={{ fontSize: 24, fontWeight: 700 }}>Fuentes intercambiables:</span>
          {["Google Flights (SerpApi)", "Google Places", "Open-Meteo", "AeroDataBox", "OpenStreetMap", "LeyChile"].map((x) => (
            <Pill key={x} style={{ fontSize: 20, padding: "8px 16px" }}>
              {x}
            </Pill>
          ))}
        </div>
      </Sube>
    </Escena>
  );
};

// ---------- 13. Honesto ----------
export const Honesto: React.FC = () => {
  const cu = useCue("curico");
  const fa = useCue("falta");
  return (
    <Escena>
      <div style={{ position: "absolute", left: 120, top: 100, width: 800 }}>
        <Sube at={cu}>
          <Rotulo>9 de noviembre de 2026 · 17:00</Rotulo>
        </Sube>
        <Sube at={cu + 6}>
          <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 64, lineHeight: 1.06, letterSpacing: "-0.02em", marginTop: 16 }}>
            Primer viaje {ac("real")}
          </div>
        </Sube>
        <Sube at={cu + 14}>
          <div style={{ fontSize: 30, fontWeight: 600, color: t.inkSoft, marginTop: 10 }}>Bus Santiago → Curicó, con la app en un iPhone</div>
        </Sube>
        <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            ["Tocó «Todavía no» antes de la hora", "Ahora, antes de la hora no hay atraso"],
            ["Se bajó antes del terminal", "Ahora marcas dónde te bajas"],
            ["A las 21:45 seguía «Viaje activo»", "Ahora el viaje termina solo"],
          ].map(([a, b], i) => (
            <Sube key={a} at={cu + 40 + i * 25}>
              <div style={{ background: t.surface, borderRadius: 26, border: `1px solid ${t.line}`, padding: "16px 22px" }}>
                <div style={{ fontSize: 22, color: t.inkSoft, fontWeight: 600 }}>{a}</div>
                <div style={{ fontSize: 26, fontWeight: 700, marginTop: 2 }}>{b}</div>
              </div>
            </Sube>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 1010, top: 100, width: 790 }}>
        <Sube at={fa}>
          <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 52, letterSpacing: "-0.02em", marginTop: 52 }}>Lo que falta</div>
        </Sube>
        <Pop at={fa + 20}>
          <div style={{ background: t.surface, borderRadius: 32, border: `1px solid ${t.line}`, boxShadow: "0 10px 22px rgba(91,70,52,0.10)", padding: 30, marginTop: 24 }}>
            <Pill tono="warn" style={{ fontSize: 20, padding: "6px 14px" }}>
              Acuerdo
            </Pill>
            <div style={{ fontSize: 32, fontWeight: 700, marginTop: 12 }}>Precio de bus para una fecha</div>
            <div style={{ fontSize: 23, color: t.inkSoft, marginTop: 6, lineHeight: 1.35 }}>Sin scraping: exige una API con Busbud o con las empresas. Mientras, «desde» con su fuente.</div>
          </div>
        </Pop>
        <Pop at={fa + 110}>
          <div style={{ background: t.surface, borderRadius: 32, border: `1px solid ${t.line}`, boxShadow: "0 10px 22px rgba(91,70,52,0.10)", padding: 30, marginTop: 20 }}>
            <Pill tono="sky" style={{ fontSize: 20, padding: "6px 14px" }}>
              Validación
            </Pill>
            <div style={{ fontSize: 32, fontWeight: 700, marginTop: 12 }}>Familias que la usen</div>
            <div style={{ fontSize: 23, color: t.inkSoft, marginTop: 6, lineHeight: 1.35 }}>Medir cuánto se equivoca el presupuesto contra el gasto real. Meta: error mediano bajo 15 %.</div>
          </div>
        </Pop>
      </div>
    </Escena>
  );
};

// ---------- 14. Cierre ----------
export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const l1 = useCue("lema1");
  const l = useCue("lema");
  return (
    <Escena>
      <div style={{ position: "absolute", left: 0, right: 0, top: 120, textAlign: "center" }}>
        <Sube at={l1}>
          <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 68, letterSpacing: "-0.02em" }}>
            Te dice si te alcanza, {ac("antes de gastar un peso")}
          </div>
        </Sube>
        <Pop at={l}>
          <div style={{ marginTop: 30 }}>
            <Marca tam={150} />
          </div>
        </Pop>
        <Sube at={l + 10}>
          <div style={{ fontFamily: redonda, fontWeight: 700, fontSize: 48, color: t.inkSoft }}>Viaja acompañado.</div>
        </Sube>
        <Sube at={l + 20}>
          <div style={{ fontSize: 22, color: t.inkSoft, marginTop: 16 }}>{autor}</div>
        </Sube>
      </div>
      <Franja top={650} vel={1.6} />
    </Escena>
  );
};
