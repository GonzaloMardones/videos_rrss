// Pantallas nuevas de la app (10 y 11 de noviembre de 2026) armadas para el video con el sistema visual de la app
// (DESIGN.md / Theme.swift) y los textos de ios/CLAUDE.md y de los ADR 0026–0034. Los montos y horas de ejemplo van
// rotulados en el video; los que salen de los ADR (Uber ~$4.800–$7.000, Metro + micro $870) son los suyos.
import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import {
  ArrowUpDown,
  BellRing,
  Bus,
  Calendar,
  Camera,
  Car,
  Check,
  ChevronRight,
  Flag,
  Footprints,
  House,
  Lock,
  MapPin,
  Mail,
  Navigation,
  Scale,
  ScanFace,
  TrainFront,
  TriangleAlert,
  Users,
  Wallet,
} from "lucide-react";
import { Card, CircleButton, IconBadge, Pantalla, Pill, PrimaryButton, redonda, SecondaryButton, t, texto, Titulo } from "../beandgo-app/ios";

const cap: React.CSSProperties = { fontSize: 13, color: t.inkSoft, lineHeight: 1.35 };
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- Cotizar con "Soy flexible" y el deslizador de presupuesto ----------
export const CotizarFlexible: React.FC<{ f: number }> = ({ f }) => {
  const flex = f > 40;
  const sel = Math.min(3, Math.max(0, Math.floor((f - 50) / 14) + 1));
  const budget = interpolate(f, [90, 150], [0.15, 0.58], { ...clamp });
  const amount = Math.round((300000 + budget * 1200000) / 50000) * 50000;
  return (
    <Pantalla tabs={null}>
      <div style={{ width: 38, height: 5, borderRadius: 3, background: t.lineStrong, margin: "4px auto 12px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Titulo tam={24}>Cotizar viaje</Titulo>
        <span style={{ color: t.copihue, fontWeight: 600, fontSize: 15 }}>Cancelar</span>
      </div>
      <div style={{ position: "relative", marginTop: 14, background: t.surface, borderRadius: 28, border: `1px solid ${t.line}` }}>
        {[
          [<MapPin key="o" size={18} />, "Origen", "Santiago"],
          [<Flag key="d" size={18} />, "Destino", "Puerto Natales"],
        ].map(([ic, r, v], i) => (
          <div key={String(r)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderTop: i ? `1px solid ${t.line}` : "none" }}>
            <span style={{ color: t.inkSoft, display: "flex" }}>{ic}</span>
            <div>
              <div style={{ fontSize: 12, color: t.inkSoft, fontWeight: 600 }}>{r}</div>
              <div style={{ fontSize: 16.5, fontWeight: 600 }}>{v}</div>
            </div>
          </div>
        ))}
        <div style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)" }}>
          <CircleButton tam={38}>
            <ArrowUpDown size={16} strokeWidth={2.4} />
          </CircleButton>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        {[
          ["Ida", "sáb 13 mar"],
          ["Vuelta", "sáb 20 mar"],
        ].map(([r, v]) => (
          <div key={r} style={{ flex: 1, height: 52, borderRadius: 999, background: t.panel, display: "flex", alignItems: "center", gap: 10, padding: "0 16px" }}>
            <Calendar size={17} color={t.inkSoft} />
            <div>
              <div style={{ fontSize: 11.5, color: t.inkSoft, fontWeight: 600 }}>{r}</div>
              <div style={{ fontSize: 15.5, fontWeight: 600 }}>{v}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, background: flex ? t.copihueSoft : t.surface, borderRadius: 22, border: `1px solid ${flex ? "transparent" : t.line}`, padding: "12px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Soy flexible</div>
            <div style={cap}>Cotizamos las fechas más baratas, mismas noches</div>
          </div>
          <div style={{ width: 52, height: 32, borderRadius: 16, background: flex ? t.copihue : t.lineStrong, position: "relative" }}>
            <div style={{ position: "absolute", top: 3, left: flex ? 23 : 3, width: 26, height: 26, borderRadius: 13, background: "#fff" }} />
          </div>
        </div>
        {flex ? (
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {["± 1 día", "± 2 días", "± 3 días"].map((c, i) => (
              <span key={c} style={{ flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 999, fontWeight: 600, fontSize: 14, background: i + 1 === sel ? t.ink : t.surface, color: i + 1 === sel ? t.ground : t.ink }}>
                {c}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div style={{ marginTop: 12, background: t.surface, borderRadius: 22, border: `1px solid ${t.line}`, padding: "12px 16px" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Users size={18} color={t.inkSoft} />
          <div style={{ fontWeight: 600, fontSize: 15.5 }}>2 adultos · 3 niños (6, 9 y 11)</div>
        </div>
        <div style={{ ...cap, marginTop: 4, marginLeft: 28 }}>Guaguas (menores de 2): 0</div>
      </div>
      <div style={{ marginTop: 12, background: t.surface, borderRadius: 22, border: `1px solid ${t.line}`, padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Wallet size={18} color={t.inkSoft} />
            <span style={{ fontWeight: 600, fontSize: 15.5 }}>Presupuesto</span>
          </div>
          <span style={{ fontFamily: redonda, fontWeight: 800, fontSize: 18 }}>${amount.toLocaleString("es-CL")}</span>
        </div>
        <div style={{ position: "relative", height: 26, marginTop: 10 }}>
          <div style={{ position: "absolute", top: 11, left: 0, right: 0, height: 5, borderRadius: 3, background: t.panel }} />
          <div style={{ position: "absolute", top: 11, left: 0, width: `${budget * 100}%`, height: 5, borderRadius: 3, background: t.copihue }} />
          <div style={{ position: "absolute", top: 1, left: `calc(${budget * 100}% - 13px)`, width: 26, height: 26, borderRadius: 13, background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", ...cap, fontSize: 11.5 }}>
          <span>$300.000</span>
          <span>$1.500.000+</span>
        </div>
      </div>
      <PrimaryButton style={{ marginTop: 16 }}>Cotizar</PrimaryButton>
    </Pantalla>
  );
};

// ---------- Mi viaje con el plan estimado ----------
export const PlanEstimado: React.FC = () => (
  <Pantalla tabs="viajes">
    <div style={{ color: t.copihue, fontWeight: 600, fontSize: 16, marginTop: 4 }}>‹ Viajes</div>
    <div style={{ marginTop: 10, position: "relative", height: 170, borderRadius: 28, overflow: "hidden", background: t.plate }}>
      <Img src={staticFile("beandgo-app/art/art-puerto-natales.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,46,74,0) 35%, rgba(11,46,74,0.92) 100%)" }} />
      <div style={{ position: "absolute", left: 18, bottom: 14, color: "#fff" }}>
        <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 24 }}>Puerto Natales</div>
        <div style={{ fontSize: 13, opacity: 0.9 }}>13 al 20 mar · 2 adultos, 3 niños</div>
      </div>
    </div>
    <Card pad={16} style={{ marginTop: 12, gap: 4 }}>
      <div style={{ ...cap, fontWeight: 600 }}>Plan estimado</div>
      <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 30 }}>$1.641.800</div>
      <div style={cap}>La forma más barata del veredicto · cubre transporte, alojamiento, traslados y comida</div>
    </Card>
    <Card pad={14} style={{ marginTop: 12, flexDirection: "row", alignItems: "center", gap: 12 }}>
      <IconBadge color={t.sky} tam={40}>
        <Navigation size={18} strokeWidth={2.4} />
      </IconBadge>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Tu ruta</div>
        <div style={cap}>De tu puerta a la de destino</div>
      </div>
      <ChevronRight size={18} color={t.lineStrong} />
    </Card>
    <Card pad={14} style={{ marginTop: 12, flexDirection: "row", alignItems: "center", gap: 12 }}>
      <IconBadge color={t.copihue} tam={40}>
        <BellRing size={18} strokeWidth={2.4} />
      </IconBadge>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Copiloto encendido</div>
        <div style={cap}>Te avisa solo cuando algo cambia</div>
      </div>
    </Card>
  </Pantalla>
);

// ---------- Tu ruta: la tarjeta como trayecto ----------
const Extremo: React.FC<{ icon: React.ReactNode; rotulo: string; lugar: string; sub: string }> = ({ icon, rotulo, lugar, sub }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 14px" }}>
    <IconBadge color={t.ink} tam={36}>
      {icon}
    </IconBadge>
    <div style={{ flex: 1 }}>
      <div style={{ ...cap, fontWeight: 600 }}>{rotulo}</div>
      <div style={{ fontWeight: 700, fontSize: 16 }}>{lugar}</div>
      <div style={{ ...cap, fontSize: 12.5 }}>{sub}</div>
    </div>
    <ChevronRight size={17} color={t.lineStrong} />
  </div>
);

export const TuRuta: React.FC<{ map?: number }> = ({ map = 1 }) => (
  <Pantalla tabs="viajes">
    <div style={{ color: t.copihue, fontWeight: 600, fontSize: 16, marginTop: 4 }}>‹ Mi viaje</div>
    <Titulo tam={28} style={{ marginTop: 8 }}>
      Tu ruta
    </Titulo>
    <div style={{ marginTop: 12, background: t.surface, borderRadius: 28, border: `1px solid ${t.line}`, overflow: "hidden", boxShadow: "0 8px 16px rgba(91,70,52,0.10)" }}>
      <Extremo icon={<House size={17} strokeWidth={2.4} />} rotulo="Salgo de" lugar="Providencia" sub="Metro + micro al terminal · 34 min · $870 aprox." />
      <div style={{ background: t.navy, color: "#fff", padding: "12px 14px", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bus size={18} strokeWidth={2.4} />
        </div>
        <div>
          <div style={{ fontSize: 12.5, opacity: 0.8, fontWeight: 600 }}>Tu bus</div>
          <div style={{ fontWeight: 700, fontSize: 15.5 }}>Buses Altas Cumbres · 17:00 → 19:15</div>
          <div style={{ fontSize: 12.5, opacity: 0.85 }}>Terminal Alameda → Terminal de Curicó</div>
        </div>
      </div>
      <Extremo icon={<Flag size={17} strokeWidth={2.4} />} rotulo="Llego a" lugar="Plaza de Armas de Curicó" sub="A pie desde el terminal" />
      <div style={{ height: 150 * map, overflow: "hidden" }}>
        <MapaGoogle prog={1} alto={150} />
      </div>
      <div style={{ padding: "12px 14px", borderTop: `1px solid ${t.line}`, display: "flex", justifyContent: "space-between" }}>
        <span style={{ ...cap, fontWeight: 600 }}>Puerta a puerta</span>
        <span style={{ fontWeight: 700, fontSize: 14.5 }}>Ver detalle de cada tramo</span>
      </div>
    </div>
    <div style={{ marginTop: 12, ...cap, fontSize: 12 }}>Tiempos, líneas y tarifas: Google Maps. Trazado del mapa: Google Maps.</div>
  </Pantalla>
);

/** Un mapa estilizado a la manera de Google: calles grises, parque verde, Metro en rojo, micro en azul, caminata punteada. */
export const MapaGoogle: React.FC<{ prog: number; alto?: number; paradas?: boolean }> = ({ prog, alto = 300, paradas }) => (
  <svg width={393} height={alto} viewBox={`0 0 393 ${alto}`} style={{ display: "block" }} preserveAspectRatio="xMidYMid slice">
    <rect width="393" height={alto} fill="#F1F3F4" />
    <rect x="230" y={alto * 0.12} width="120" height={alto * 0.32} rx="10" fill="#CEEAD6" />
    {[0.2, 0.42, 0.66, 0.86].map((y) => (
      <line key={y} x1="0" y1={alto * y} x2="393" y2={alto * y - 18} stroke="#FFFFFF" strokeWidth="7" />
    ))}
    {[70, 170, 300].map((x) => (
      <line key={x} x1={x} y1="0" x2={x + 30} y2={alto} stroke="#FFFFFF" strokeWidth="6" />
    ))}
    <path d={`M 340 ${alto * 0.2} L 230 ${alto * 0.36} L 120 ${alto * 0.5}`} stroke="#E3001B" strokeWidth="6" fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${Math.min(1, prog * 2)} 1`} />
    <path d={`M 120 ${alto * 0.5} L 90 ${alto * 0.75}`} stroke="#1A73E8" strokeWidth="6" fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${Math.max(0, prog * 2 - 1)} 1`} />
    <path d={`M 90 ${alto * 0.75} L 60 ${alto * 0.86}`} stroke="#5F6368" strokeWidth="4" fill="none" strokeDasharray="2 6" strokeLinecap="round" opacity={prog >= 1 ? 1 : 0} />
    <circle cx="340" cy={alto * 0.2} r="8" fill="#fff" stroke={t.ink} strokeWidth="3" />
    <circle cx="60" cy={alto * 0.86} r="9" fill={t.navy} stroke="#fff" strokeWidth="3" />
    {paradas ? (
      <g>
        <circle cx="230" cy={alto * 0.36} r="22" fill={`${t.copihue}22`} stroke={t.copihue} strokeDasharray="4 4" />
        <circle cx="230" cy={alto * 0.36} r="7" fill={t.copihue} stroke="#fff" strokeWidth="2" />
      </g>
    ) : null}
  </svg>
);

/** "¿Cómo llegas al terminal?" con Uber y su rango aproximado (ADR 0028). */
export const HojaModos: React.FC<{ sel: number }> = ({ sel }) => {
  const opts: [React.ReactNode, string, string][] = [
    [<TrainFront key="m" size={18} />, "Transporte público", "Metro + micro · 34 min · $870 aprox."],
    [<Car key="c" size={18} />, "Auto particular", "22 min con tráfico"],
    [<Car key="u" size={18} />, "Uber", "~$4.800–$7.000 aprox. (estimado, puede variar con la demanda)"],
    [<Footprints key="p" size={18} />, "A pie", "Más de 2 km: no lo sugerimos"],
  ];
  return (
    <AbsoluteFill>
      <TuRuta />
      <AbsoluteFill style={{ background: "rgba(20,16,12,0.35)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: t.ground, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: "10px 16px 40px", fontFamily: texto }}>
        <div style={{ width: 38, height: 5, borderRadius: 3, background: t.lineStrong, margin: "0 auto 12px" }} />
        <Titulo tam={21}>¿Cómo llegas al terminal?</Titulo>
        <div style={{ ...cap, marginTop: 2 }}>Desde Providencia al Terminal Alameda</div>
        {opts.map(([ic, n, d], i) => (
          <div key={n} style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 10, padding: "12px 14px", borderRadius: 20, background: i === sel ? t.copihueSoft : t.surface, border: `1px solid ${i === sel ? t.copihue : t.line}` }}>
            <span style={{ color: i === sel ? t.copihue : t.inkSoft, display: "flex" }}>{ic}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{n}</div>
              <div style={{ ...cap, fontSize: 12.5 }}>{d}</div>
            </div>
            {i === sel ? <Check size={18} color={t.copihue} strokeWidth={3} /> : null}
          </div>
        ))}
        <div style={{ ...cap, fontSize: 11.5, marginTop: 10 }}>Uber: estimado de Be&Go con tarifas publicadas, solo en Santiago. Be&Go no usa la API de Uber.</div>
      </div>
    </AbsoluteFill>
  );
};

/** El mapa completo con una parada y su alarma. */
export const RutaMapa: React.FC<{ prog: number }> = ({ prog }) => (
  <AbsoluteFill style={{ background: "#F1F3F4" }}>
    <div style={{ position: "absolute", top: 0, left: 0 }}>
      <MapaGoogle prog={prog} alto={600} paradas={prog > 0.9} />
    </div>
    <div style={{ position: "absolute", top: 62, left: 16, display: "flex", gap: 8 }}>
      <Pill tono="bad" style={{ background: "#FCE8E6", color: "#C5221F", fontSize: 13, padding: "6px 12px" }}>
        Metro L1
      </Pill>
      <Pill tono="sky" style={{ background: "#E8F0FE", color: "#1967D2", fontSize: 13, padding: "6px 12px" }}>
        Micro
      </Pill>
      <Pill style={{ fontSize: 13, padding: "6px 12px" }}>A pie</Pill>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: t.ground, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: "12px 16px 40px" }}>
      <div style={{ width: 38, height: 5, borderRadius: 3, background: t.lineStrong, margin: "0 auto 10px" }} />
      <Titulo tam={19}>Paradas en el camino</Titulo>
      <Card pad={12} style={{ marginTop: 10, flexDirection: "row", alignItems: "center", gap: 10 }}>
        <IconBadge color={t.copihue} tam={34}>
          <BellRing size={16} strokeWidth={2.4} />
        </IconBadge>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Estación Universidad de Santiago</div>
          <div style={cap}>Alarma · avisarme a 500 m</div>
        </div>
      </Card>
      <SecondaryButton style={{ marginTop: 10, fontSize: 15 }}>Agregar parada</SecondaryButton>
    </div>
  </AbsoluteFill>
);

// ---------- Pantalla bloqueada genérica ----------
export const Bloqueo: React.FC<{ hora: string; fecha: string; children?: React.ReactNode; fondo?: string; controles?: React.ReactNode }> = ({ hora, fecha, children, fondo, controles }) => (
  <AbsoluteFill style={{ background: fondo ?? `linear-gradient(180deg, ${t.navy} 0%, #1C4A6E 60%, #2E6A8F 100%)`, color: "#fff", fontFamily: texto }}>
    <div style={{ position: "absolute", top: 70, left: 0, right: 0, textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Lock size={18} />
      </div>
      <div style={{ fontSize: 19, fontWeight: 600, marginTop: 4, opacity: 0.9 }}>{fecha}</div>
      <div style={{ fontFamily: redonda, fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em" }}>{hora}</div>
    </div>
    <div style={{ position: "absolute", left: 10, right: 10, top: 290, display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    {controles ?? (
      <div style={{ position: "absolute", bottom: 54, left: 40, right: 40, display: "flex", justifyContent: "space-between" }}>
        {[0, 1].map((i) => (
          <div key={i} style={{ width: 50, height: 50, borderRadius: 25, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {i === 0 ? <TriangleAlert size={20} /> : <Camera size={20} />}
          </div>
        ))}
      </div>
    )}
  </AbsoluteFill>
);

/** Notificación del sistema dentro del teléfono (ancho de pantalla). */
export const Noti: React.FC<{ titulo: string; cuerpo: string; hora?: string; urgente?: boolean; botones?: string[]; style?: React.CSSProperties }> = ({ titulo, cuerpo, hora = "ahora", urgente, botones, style }) => (
  <div style={{ background: "rgba(245,242,238,0.96)", color: t.ink, borderRadius: 22, padding: "11px 13px", boxShadow: "0 10px 24px rgba(0,0,0,0.25)", ...style }}>
    <div style={{ display: "flex", gap: 10 }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: t.copihue, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: redonda, fontWeight: 800, fontSize: 12, flexShrink: 0 }}>B&G</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>
            {urgente ? <span style={{ color: t.bad }}>Urgente · </span> : null}
            {titulo}
          </span>
          <span style={{ fontSize: 12, color: t.inkSoft, flexShrink: 0 }}>{hora}</span>
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.32, marginTop: 1 }}>{cuerpo}</div>
      </div>
    </div>
    {botones ? (
      <div style={{ display: "flex", gap: 6, marginTop: 9 }}>
        {botones.map((b, i) => (
          <div key={b} style={{ flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 12, background: i === 0 ? t.copihue : "rgba(0,0,0,0.07)", color: i === 0 ? "#fff" : t.ink, fontWeight: 700, fontSize: 13 }}>
            {b}
          </div>
        ))}
      </div>
    ) : null}
  </div>
);

// ---------- Aviso antes de salir (ADR 0028) ----------
export const AvisoAntes: React.FC<{ f: number }> = ({ f }) => (
  <Bloqueo hora="17:02" fecha="jueves 13 de noviembre">
    <div style={{ opacity: interpolate(f, [10, 24], [0, 1], clamp), transform: `translateY(${interpolate(f, [10, 24], [-30, 0], clamp)}px)` }}>
      <Noti
        titulo="Antes de salir: Santiago → Curicó"
        cuerpo="Mañana, bus a las 17:00. Pronóstico: Santiago despejado, Rancagua (a mitad de camino) nublado, Curicó despejado. Google Maps prevé más tráfico de lo normal al salir de Santiago. Revisa el estado de la ruta (MOP)."
        hora="hace 1 min"
        botones={["Ver Tu ruta"]}
      />
    </div>
  </Bloqueo>
);

// ---------- Viaje con dos buses (ADR 0031) ----------
export const DosBuses: React.FC = () => (
  <Pantalla tabs="viajes">
    <div style={{ color: t.copihue, fontWeight: 600, fontSize: 16, marginTop: 4 }}>‹ Mi viaje</div>
    <Titulo tam={26} style={{ marginTop: 8 }}>
      Tu trayecto · 2 buses
    </Titulo>
    <div style={cap}>Curicó → Santiago → Viña del Mar</div>
    {[
      { n: "1", ruta: "Curicó → Santiago", horas: "07:30 → 09:45", emp: "Buses Altas Cumbres", term: "Terminal de Curicó → Terminal Alameda" },
      { n: "2", ruta: "Santiago → Viña del Mar", horas: "10:30 → 12:10", emp: "Otra empresa", term: "Terminal Alameda → Terminal Viña del Mar" },
    ].map((l, i) => (
      <React.Fragment key={l.n}>
        <Card pad={14} style={{ marginTop: 12, gap: 4 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <IconBadge color={t.sky} tam={34}>
              <Bus size={16} strokeWidth={2.4} />
            </IconBadge>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15.5 }}>
                Tramo {l.n} · {l.ruta}
              </div>
              <div style={cap}>
                {l.emp} · {l.horas}
              </div>
            </div>
          </div>
          <div style={{ ...cap, fontSize: 12.5 }}>{l.term}</div>
        </Card>
        {i === 0 ? (
          <div style={{ display: "flex", gap: 10, alignItems: "center", margin: "10px 6px 0" }}>
            <div style={{ width: 3, height: 34, borderRadius: 2, background: t.lineStrong, marginLeft: 16 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Cambio en Santiago · 45 min</div>
              <div style={cap}>Margen sugerido por Be&Go: 45 min, mismo terminal</div>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    ))}
    <div style={{ marginTop: 12, background: t.warnSoft, color: t.warn, borderRadius: 14, padding: 12, fontSize: 13.5, fontWeight: 600 }}>Un solo trayecto: una Live Activity y un solo «Terminar viaje», al llegar a Viña del Mar.</div>
  </Pantalla>
);

export const RiesgoConexion: React.FC<{ f: number }> = ({ f }) => (
  <Bloqueo hora="09:58" fecha="viernes 14 de noviembre" fondo="linear-gradient(180deg, #3B1A20 0%, #6B2B36 100%)">
    <div style={{ transform: `translateX(${interpolate(f, [8, 20], [-8, 0], clamp) * Math.sin(f)}px)`, opacity: interpolate(f, [4, 14], [0, 1], clamp) }}>
      <Noti urgente titulo="Riesgo de perder la conexión" cuerpo="Llegarías a Santiago cerca de las 10:20. Tu bus a Viña del Mar sale a las 10:30 del Terminal Alameda." />
    </div>
  </Bloqueo>
);

// ---------- Boleta rápida (ADR 0026) ----------
export const BoletaRapida: React.FC<{ fase: "control" | "faceid" | "camara" | "lectura" | "listo"; f: number }> = ({ fase, f }) => {
  if (fase === "control" || fase === "faceid") {
    const pressed = fase === "faceid" || f > 30;
    return (
      <Bloqueo
        hora="16:41"
        fecha="domingo 16 de noviembre"
        controles={
          <div style={{ position: "absolute", bottom: 54, left: 40, right: 40, display: "flex", justifyContent: "space-between" }}>
            <div style={{ position: "relative", width: 50, height: 50 }}>
              {fase === "control" ? (
                <div style={{ position: "absolute", inset: -((f % 30) / 30) * 18, borderRadius: 999, border: "3px solid #FFB1C8", opacity: 1 - (f % 30) / 30 }} />
              ) : null}
              <div style={{ width: 50, height: 50, borderRadius: 25, background: pressed ? "#fff" : "rgba(255,255,255,0.22)", color: pressed ? t.copihue : "#fff", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pressed ? 1.12 : 1})` }}>
                <Camera size={22} />
              </div>
            </div>
            <div style={{ width: 50, height: 50, borderRadius: 25, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Camera size={20} />
            </div>
          </div>
        }
      >
        {fase === "faceid" ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 120, gap: 10 }}>
            <div style={{ width: 92, height: 92, borderRadius: 24, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: f > 22 ? "#7EE2A8" : "#fff" }}>
              {f > 22 ? <Check size={52} strokeWidth={2.6} /> : <ScanFace size={52} strokeWidth={1.8} />}
            </div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{f > 22 ? "Desbloqueado" : "Face ID"}</div>
          </div>
        ) : (
          <div style={{ marginTop: 140, textAlign: "center", fontSize: 14, fontWeight: 600, opacity: 0.9 }}>Control «Foto de la boleta»</div>
        )}
      </Bloqueo>
    );
  }
  if (fase === "camara") {
    const flash = interpolate(f, [40, 44, 52], [0, 0.9, 0], clamp);
    return (
      <AbsoluteFill style={{ background: "#0E0E0E" }}>
        <div style={{ position: "absolute", top: 120, left: 60, right: 60, height: 420, borderRadius: 18, background: "#3A3530", display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(-4deg)" }}>
          <div style={{ width: 210, background: "#FFFDF8", borderRadius: 6, padding: "16px 14px", fontFamily: "'JetBrains Mono', monospace", color: "#2B2620", fontSize: 11.5, lineHeight: 1.6 }}>
            <div style={{ fontWeight: 800, fontSize: 13 }}>TIENDAS SAN CAMILO</div>
            <div>BOLETA ELECTRÓNICA</div>
            <div style={{ borderTop: "1px dashed #bbb", margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>AGUA 500 ML</span>
              <span>990</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>GALLETAS</span>
              <span>300</span>
            </div>
            <div style={{ borderTop: "1px dashed #bbb", margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800 }}>
              <span>TOTAL</span>
              <span>$1.290</span>
            </div>
          </div>
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ position: "absolute", width: 34, height: 34, borderColor: "#FFD60A", borderStyle: "solid", borderWidth: 0, ...(i === 0 ? { top: 150, left: 70, borderTopWidth: 4, borderLeftWidth: 4 } : i === 1 ? { top: 150, right: 70, borderTopWidth: 4, borderRightWidth: 4 } : i === 2 ? { top: 500, left: 70, borderBottomWidth: 4, borderLeftWidth: 4 } : { top: 500, right: 70, borderBottomWidth: 4, borderRightWidth: 4 }) }} />
        ))}
        <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <div style={{ width: 74, height: 74, borderRadius: 37, border: "4px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: 30, background: "#fff", transform: `scale(${f > 38 && f < 46 ? 0.85 : 1})` }} />
          </div>
        </div>
        <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", color: "#fff", fontSize: 14, fontWeight: 600 }}>Foto de la boleta</div>
        <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
      </AbsoluteFill>
    );
  }
  const done = fase === "listo";
  return (
    <Pantalla tabs={null}>
      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div style={{ width: 72, height: 72, borderRadius: 36, background: done ? t.okSoft : t.copihueSoft, color: done ? t.ok : t.copihue, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {done ? <Check size={38} strokeWidth={3} /> : <Wallet size={34} strokeWidth={2.2} />}
        </div>
        <Titulo tam={24}>{done ? "Anotado" : "Revisa y confirma"}</Titulo>
        <div style={{ ...cap, fontSize: 15, textAlign: "center" }}>{done ? "$1.290 en Tiendas San Camilo" : "Leímos tu boleta"}</div>
      </div>
      {!done ? (
        <>
          <Card pad={16} style={{ marginTop: 18, gap: 8 }}>
            {[
              ["Monto", "$1.290"],
              ["Dónde", "Tiendas San Camilo"],
              ["Categoría", "Comida"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 15.5 }}>
                <span style={{ color: t.inkSoft, fontWeight: 600 }}>{k}</span>
                <span style={{ fontWeight: 700 }}>{v}</span>
              </div>
            ))}
            <div style={{ ...cap, fontSize: 12 }}>Sin nombre, RUT ni tarjeta: no se leen ni se guardan.</div>
          </Card>
          <PrimaryButton style={{ marginTop: 16 }}>Confirmar</PrimaryButton>
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <SecondaryButton style={{ flex: 1, fontSize: 15 }}>Corregir</SecondaryButton>
            <SecondaryButton style={{ flex: 1, fontSize: 15 }}>Descartar</SecondaryButton>
          </div>
        </>
      ) : null}
    </Pantalla>
  );
};

// ---------- «Tu caso» (ADR 0034) ----------
export const TuCaso: React.FC<{ f: number }> = ({ f }) => {
  const marcado = f > 60;
  return (
    <Pantalla tabs="perfil">
      <div style={{ color: t.copihue, fontWeight: 600, fontSize: 16, marginTop: 4 }}>‹ Mis reclamos</div>
      <Titulo tam={26} style={{ marginTop: 8 }}>
        Tu caso
      </Titulo>
      <div style={cap}>Bus cancelado · Santiago → Curicó · 9 nov</div>
      <Card pad={14} style={{ marginTop: 12, gap: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>¿Reclamo? ¿Demanda?</div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1, background: t.okSoft, borderRadius: 16, padding: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.ok }}>RECLAMO</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 2 }}>Candidato, con la prueba que tienes</div>
          </div>
          <div style={{ flex: 1, background: t.panel, borderRadius: 16, padding: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.inkSoft }}>DEMANDA</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 2 }}>Falta prueba para evaluarla</div>
          </div>
        </div>
        <div style={{ ...cap, fontSize: 11.5 }}>Las reglas deciden; la IA solo redacta el titular.</div>
      </Card>
      <Card pad={14} style={{ marginTop: 10, gap: 6 }}>
        <div style={{ fontWeight: 700, fontSize: 15.5 }}>Gastos que te causó</div>
        {[
          ["Uber de vuelta a casa", "$6.900", marcado],
          ["Comida en el terminal", "$1.290", false],
        ].map(([n, v, on]) => (
          <div key={String(n)} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${on ? t.copihue : t.lineStrong}`, background: on ? t.copihue : "transparent", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{on ? <Check size={14} strokeWidth={3.4} /> : null}</div>
            <span style={{ flex: 1 }}>{n}</span>
            <span style={{ fontWeight: 700 }}>{v}</span>
          </div>
        ))}
        <div style={{ ...cap, fontSize: 11.5 }}>Tú marcas cada línea; el total lo suma el servidor.</div>
      </Card>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <PrimaryButton style={{ flex: 1, fontSize: 14.5, padding: "13px 0", display: "flex", justifyContent: "center", gap: 6 }}>
          <Mail size={16} /> Ver la carta
        </PrimaryButton>
        <SecondaryButton style={{ flex: 1, fontSize: 14.5 }}>Enviar a SERNAC</SecondaryButton>
      </div>
      <Card pad={14} style={{ marginTop: 10, flexDirection: "row", alignItems: "center", gap: 10 }}>
        <IconBadge color={t.sky} tam={34}>
          <Scale size={16} strokeWidth={2.4} />
        </IconBadge>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5 }}>¿Necesitas un abogado?</div>
          <div style={cap}>Revisión con costo, solo con tu consentimiento</div>
        </div>
        <ChevronRight size={17} color={t.lineStrong} />
      </Card>
    </Pantalla>
  );
};

