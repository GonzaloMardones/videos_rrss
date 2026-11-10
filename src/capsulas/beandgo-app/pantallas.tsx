// Pantallas de la app iOS de Be&Go armadas para el video, siguiendo los frames de Figma descritos en
// ios/CLAUDE.md y docs/progress/ios.md. Los datos son los del repo: el fixture de Torres del Paine, la demo
// de Puerto Natales (shared/src/demo.ts) y el pasaje de prueba de Altas Cumbres (backend/fixtures/bus-tickets).
import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import {
  ArrowUpDown,
  Bell,
  Bus,
  Calendar,
  Camera,
  Check,
  ChevronRight,
  CloudRain,
  Flag,
  Footprints,
  Lock,
  MapPin,
  Plane,
  Scale,
  Search,
  SlidersHorizontal,
  Users,
  Utensils,
  Wallet,
  BedDouble,
  Ticket,
  TriangleAlert,
  BellRing,
} from "lucide-react";
import { Arco, Card, CardButton, Chip, CircleButton, clamp, Heroe, IconBadge, Marca, Pantalla, Pill, PrimaryButton, redonda, RowHeader, SecondaryButton, t, texto, Thumb, Titulo } from "./ios";

const cap: React.CSSProperties = { fontSize: 13, color: t.inkSoft, lineHeight: 1.35 };
const cuerpo: React.CSSProperties = { fontSize: 16, color: t.ink, lineHeight: 1.35 };

// ---------- Inicio (Figma 03, 9-nov-2026) ----------
export const Inicio: React.FC<{ scroll?: number }> = ({ scroll = 0 }) => (
  <Pantalla scroll={scroll} tabs="inicio">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
      <div>
        <Marca tam={18} />
        <Titulo tam={30} style={{ marginTop: 2 }}>
          Hola, Demo
        </Titulo>
      </div>
      <CircleButton badge="2">
        <Bell size={19} strokeWidth={2.3} />
      </CircleButton>
    </div>
    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
      <div style={{ flex: 1, height: 56, borderRadius: 999, background: t.surface, border: `1px solid ${t.line}`, boxShadow: "0 5px 12px rgba(91,70,52,0.10)", display: "flex", alignItems: "center", gap: 10, padding: "0 18px", color: t.inkSoft, fontSize: 16.5 }}>
        <Search size={19} strokeWidth={2.4} /> ¿A dónde quieres ir?
      </div>
      <CircleButton tam={56}>
        <SlidersHorizontal size={21} strokeWidth={2.2} />
      </CircleButton>
    </div>

    <RowHeader titulo="Viaje activo" />
    <Card pad={14}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Thumb slug="curico" tam={58} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 17 }}>Bus a Curicó</div>
          <div style={cap}>hoy 17:00 · Sal a las 15:26</div>
        </div>
        <CardButton style={{ padding: "8px 14px", fontSize: 13.5 }}>Ver viaje</CardButton>
      </div>
      <div style={{ height: 1, background: t.line }} />
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <IconBadge color={t.copihue} tam={30}>
          <Footprints size={15} strokeWidth={2.4} />
        </IconBadge>
        <div style={{ ...cap, color: t.ink, fontWeight: 600 }}>Sal al terminal a las 15:26</div>
      </div>
    </Card>

    <RowHeader titulo="Accesos rápidos" />
    <Card pad={14} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <IconBadge color={t.sky} tam={40}>
        <MapPin size={19} strokeWidth={2.4} />
      </IconBadge>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 16 }}>Hoy en Providencia, Santiago</div>
        <div style={cap}>Cerca de ti · dónde comer con el sobre del día</div>
      </div>
      <ChevronRight size={18} color={t.lineStrong} />
    </Card>

    <RowHeader titulo="Para soñar" accion="Explorar" />
    <Card pad={10} style={{ alignItems: "center", paddingBottom: 34 }}>
      <Arco slug="torres-del-paine" ancho={339} alto={220}>
        <Pill style={{ position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,0.9)" }}>Patagonia</Pill>
      </Arco>
      <Titulo tam={22} style={{ marginTop: 6 }}>
        Torres del Paine
      </Titulo>
      <div style={{ ...cap, display: "flex", gap: 4, alignItems: "center", fontWeight: 600, fontSize: 14 }}>
        <MapPin size={14} /> Magallanes
      </div>
      <div style={cap}>Las torres, el glaciar Grey y el viento</div>
    </Card>
    <div style={{ display: "flex", justifyContent: "center", marginTop: -20 }}>
      <CardButton>Cotizar</CardButton>
    </div>
  </Pantalla>
);

// ---------- Hoja de cotizar (QuoteSheet) ----------
const FilaHoja: React.FC<{ icono: React.ReactNode; rotulo: string; valor: string }> = ({ icono, rotulo, valor }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px" }}>
    <span style={{ color: t.inkSoft, width: 20, display: "flex" }}>{icono}</span>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 12, color: t.inkSoft, fontWeight: 600 }}>{rotulo}</div>
      <div style={{ fontSize: 16.5, fontWeight: 600 }}>{valor}</div>
    </div>
  </div>
);

export const HojaCotizar: React.FC<{ sube: number }> = ({ sube }) => (
  <AbsoluteFill>
    <Inicio />
    <AbsoluteFill style={{ background: `rgba(20,16,12,${0.38 * sube})` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 70 + (1 - sube) * 800, bottom: 0, background: t.ground, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: "10px 16px", zIndex: 6 }}>
      <div style={{ width: 38, height: 5, borderRadius: 3, background: t.lineStrong, margin: "0 auto 12px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Titulo tam={24}>Cotizar viaje</Titulo>
        <span style={{ color: t.copihue, fontWeight: 600, fontSize: 15 }}>Cancelar</span>
      </div>
      <div style={{ position: "relative", marginTop: 14, background: t.surface, borderRadius: 28, border: `1px solid ${t.line}` }}>
        <FilaHoja icono={<MapPin size={18} />} rotulo="Origen" valor="Santiago" />
        <div style={{ height: 1, background: t.line, margin: "0 16px" }} />
        <FilaHoja icono={<Flag size={18} />} rotulo="Destino" valor="Puerto Natales" />
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
          <div key={r} style={{ flex: 1, height: 54, borderRadius: 999, background: t.panel, display: "flex", alignItems: "center", gap: 10, padding: "0 16px" }}>
            <Calendar size={17} color={t.inkSoft} />
            <div>
              <div style={{ fontSize: 11.5, color: t.inkSoft, fontWeight: 600 }}>{r}</div>
              <div style={{ fontSize: 15.5, fontWeight: 600 }}>{v}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ ...cap, marginTop: 6, marginLeft: 16 }}>Ida · Vuelta · 7 noches</div>
      <div style={{ marginTop: 10, background: t.surface, borderRadius: 28, border: `1px solid ${t.line}` }}>
        <FilaHoja icono={<Users size={18} />} rotulo="Quiénes viajan" valor="2 adultos · 3 niños (6, 9 y 11)" />
        <div style={{ height: 1, background: t.line, margin: "0 16px" }} />
        <FilaHoja icono={<Wallet size={18} />} rotulo="Presupuesto" valor="$1.000.000" />
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: t.inkSoft, margin: "14px 0 8px 4px" }}>Qué necesitas</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {["Transporte", "Alojamiento", "Traslados", "Comida"].map((c) => (
          <Chip key={c} on icono={<Check size={14} strokeWidth={3} />}>
            {c}
          </Chip>
        ))}
        <Chip>Actividades</Chip>
      </div>
      <PrimaryButton style={{ marginTop: 20 }}>Cotizar</PrimaryButton>
    </div>
  </AbsoluteFill>
);

// ---------- Cotizando (QuotingCard) ----------
export const Cotizando: React.FC<{ f: number }> = ({ f }) => {
  const necesidades = ["Transporte", "Alojamiento", "Traslados", "Comida"];
  const activa = Math.min(necesidades.length - 1, Math.floor(f / 26));
  const franja = ["puerto-natales", "torres-del-paine", "punta-arenas", "santiago", "puerto-montt", "valparaiso", "puerto-natales", "torres-del-paine"];
  const dx = -((f * 1.4) % 116);
  const fuentes = [
    ["CONAF", "pasesparques.cl"],
    ["Bus-Sur", "bussur.com"],
  ];
  return (
    <Pantalla tabs="inicio">
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: t.copihue, fontWeight: 600, fontSize: 16, marginTop: 4 }}>‹ Inicio</div>
      <Titulo tam={26} style={{ marginTop: 10 }}>
        Santiago → Puerto Natales
      </Titulo>
      <div style={cap}>13 al 20 mar · 2 adultos, 3 niños · $1.000.000</div>
      <Card style={{ marginTop: 16, overflow: "hidden" }} pad={16}>
        <div style={{ position: "relative", height: 96, overflow: "hidden", borderRadius: 18, background: t.plate }}>
          <div style={{ position: "absolute", top: 8, left: dx, display: "flex", gap: 12 }}>
            {[...franja, ...franja].map((s, i) => (
              <Arco key={i} slug={s} ancho={104} alto={80} pie={14} />
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 4, left: 18 + ((f * 2) % 260), color: t.navy }}>
            <Bus size={26} strokeWidth={2.4} />
          </div>
        </div>
        <Titulo tam={19} style={{ marginTop: 4 }}>
          Estoy cotizando, te aviso
        </Titulo>
        <div style={cap}>La primera vez toma entre 20 y 90 segundos.</div>
        {necesidades.map((n, i) => {
          const lista = i < activa;
          const ahora = i === activa;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, opacity: lista || ahora ? 1 : 0.45 }}>
              <div style={{ width: 24, height: 24, borderRadius: 12, background: lista ? t.ok : ahora ? t.copihueSoft : t.panel, display: "flex", alignItems: "center", justifyContent: "center", color: lista ? "#fff" : t.copihue }}>
                {lista ? <Check size={14} strokeWidth={3} /> : ahora ? <div style={{ width: 8, height: 8, borderRadius: 4, background: t.copihue, opacity: 0.5 + 0.5 * Math.sin(f / 4) }} /> : null}
              </div>
              <span style={{ fontWeight: 600, fontSize: 15.5, flex: 1 }}>{n}</span>
              <span style={{ ...cap, color: ahora ? t.copihue : t.inkSoft, fontWeight: 600 }}>{lista ? "listo" : ahora ? "buscando…" : ""}</span>
            </div>
          );
        })}
        <div style={{ height: 1, background: t.line, margin: "4px 0" }} />
        <div style={{ fontSize: 12.5, fontWeight: 700, color: t.inkSoft, letterSpacing: "0.04em", textTransform: "uppercase" }}>Respondieron</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {fuentes.map(([n, d], i) =>
            f > 20 + i * 30 ? (
              <Pill key={n} tono="ok" icono={<Check size={12} strokeWidth={3} />}>
                {n} · {d}
              </Pill>
            ) : null,
          )}
        </div>
      </Card>
      <Card style={{ marginTop: 14 }} pad={16}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: t.inkSoft, letterSpacing: "0.04em", textTransform: "uppercase" }}>Mientras tanto</div>
        <div style={cuerpo}>Los menores de 13 años entran gratis al Parque Nacional Torres del Paine.</div>
        <div style={cap}>CONAF · pasesparques.cl</div>
      </Card>
    </Pantalla>
  );
};

// ---------- Captura real del veredicto (docs/ios/round-5) ----------
export const CapturaVeredicto: React.FC = () => (
  <AbsoluteFill style={{ background: t.ground }}>
    <Img src={staticFile("beandgo-app/captura-veredicto.png")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
  </AbsoluteFill>
);

// ---------- Arma tu combinación (Figma 42–46, 49) ----------
export const Combinacion: React.FC<{ elegido: number; total: string; faltan: string; actualizando?: boolean }> = ({ elegido, total, faltan, actualizando }) => (
  <Pantalla tabs="inicio">
    <div style={{ display: "flex", alignItems: "center", gap: 6, color: t.copihue, fontWeight: 600, fontSize: 16, marginTop: 4 }}>‹ Veredicto</div>
    <Titulo tam={26} style={{ marginTop: 8 }}>
      Arma tu combinación
    </Titulo>
    <Card pad={12} style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 12 }}>
      <Arco slug="puerto-natales" ancho={70} alto={70} pie={16} />
      <div>
        <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 18 }}>Puerto Natales</div>
        <div style={cap}>13 al 20 mar · 2 adultos, 3 niños</div>
      </div>
    </Card>
    <div style={{ display: "flex", gap: 8, marginTop: 14, overflow: "hidden" }}>
      <Chip icono={<Plane size={14} />}>Vuelos</Chip>
      <Chip on icono={<Bus size={14} />}>
        Buses
      </Chip>
      <Chip icono={<BedDouble size={14} />}>Alojamiento</Chip>
      <Chip icono={<Ticket size={14} />}>Actividades</Chip>
    </div>
    {[
      { titulo: "Bus-Sur", ruta: "Punta Arenas → Puerto Natales", precio: "Desde $11.000 por tramo", fuente: "bussur.com · 5 nov 2026" },
      { titulo: "Bus al parque", ruta: "Puerto Natales → Torres del Paine", precio: "$35.000 ida y vuelta por persona", fuente: "fixture Torres del Paine" },
    ].map((o, i) => {
      const on = elegido === i;
      return (
        <div key={o.titulo} style={{ position: "relative", marginTop: 12 }}>
          <Card pad={14} style={{ border: on ? `2.5px solid ${t.copihue}` : `1px solid ${t.line}`, gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <IconBadge color={t.sky} tam={34}>
                <Bus size={17} strokeWidth={2.4} />
              </IconBadge>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15.5 }}>{o.titulo}</div>
                <div style={cap}>{o.ruta}</div>
              </div>
              {on ? (
                <div style={{ width: 26, height: 26, borderRadius: 13, background: t.copihue, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={15} strokeWidth={3} />
                </div>
              ) : null}
            </div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{o.precio}</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <Pill tono="warn">Desde</Pill>
              <span style={{ ...cap, fontSize: 12 }}>{o.fuente}</span>
            </div>
          </Card>
        </div>
      );
    })}
    <div style={{ marginTop: 12, background: t.panel, borderRadius: 14, padding: 12, display: "flex", gap: 10 }}>
      <Scale size={18} color={t.inkSoft} style={{ flexShrink: 0, marginTop: 2 }} />
      <div style={{ ...cap, color: t.ink }}>Santiago → Punta Arenas por tierra: 34 a 40 h. Se descarta por la regla de 12 h de bus con niños.</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 612, padding: "0 0" }}>
      <Card pad={14} style={{ gap: 4, boxShadow: "0 -6px 18px rgba(91,70,52,0.12)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", opacity: actualizando ? 0.45 : 1 }}>
          <span style={{ ...cap, fontWeight: 600 }}>Total estimado</span>
          <span style={{ fontFamily: redonda, fontWeight: 800, fontSize: 24 }}>{total}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={cap}>{actualizando ? "Actualizando total…" : "Presupuesto $1.000.000"}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: t.bad }}>Te faltan {faltan}</span>
        </div>
      </Card>
    </div>
  </Pantalla>
);

// ---------- Pestaña Copiloto ----------
const Aviso: React.FC<{ icono: React.ReactNode; color: string; titulo: string; detalle: string; nuevo?: boolean }> = ({ icono, color, titulo, detalle, nuevo }) => (
  <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0" }}>
    <IconBadge color={color} tam={34}>
      {icono}
    </IconBadge>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontWeight: 600, fontSize: 14.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{titulo}</div>
      <div style={{ ...cap, fontSize: 12 }}>{detalle}</div>
    </div>
    {nuevo ? <div style={{ width: 9, height: 9, borderRadius: 5, background: t.copihue }} /> : null}
  </div>
);

export const Copiloto: React.FC = () => (
  <Pantalla tabs="copiloto">
    <Titulo tam={30} style={{ marginTop: 6 }}>
      Copiloto
    </Titulo>
    <div style={{ marginTop: 12 }}>
      <Heroe slug="puerto-natales" alto={136}>
        <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 22 }}>Puerto Natales</div>
        <div style={{ fontSize: 13, opacity: 0.9 }}>Hoy · vie 19 mar · familia de 5</div>
      </Heroe>
    </div>
    <Card pad={14} style={{ marginTop: 12, flexDirection: "row", alignItems: "center", gap: 12 }}>
      <IconBadge color={t.activities} tam={40}>
        <Footprints size={19} strokeWidth={2.4} />
      </IconBadge>
      <div style={{ flex: 1 }}>
        <div style={{ ...cap, fontWeight: 600 }}>Próximo · mañana 09:00</div>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Cueva del Milodón</div>
      </div>
      <ChevronRight size={18} color={t.lineStrong} />
    </Card>
    <Card pad={0} style={{ marginTop: 12, overflow: "hidden", gap: 0 }}>
      <MapaDia />
    </Card>
    <RowHeader titulo="Avisos" accion="3 sin leer" />
    <Card pad={12} style={{ gap: 2 }}>
      <Aviso icono={<CloudRain size={16} strokeWidth={2.4} />} color={t.sky} titulo="Lluvia en Cueva del Milodón: plan B" detalle="Pronóstico e itinerario" nuevo />
      <Aviso icono={<Wallet size={16} strokeWidth={2.4} />} color={t.warn} titulo="Se pasó el sobre del día" detalle="$14.600 sobre los $60.000" nuevo />
      <Aviso icono={<Utensils size={16} strokeWidth={2.4} />} color={t.food} titulo="Hora de cenar" detalle="Unos $12.000 por persona" nuevo />
    </Card>
  </Pantalla>
);

// Mapa estilizado del día: dos paradas numeradas.
const MapaDia: React.FC = () => (
  <svg width={361} height={130} viewBox="0 0 361 130" style={{ display: "block" }}>
    <rect width="361" height="130" fill="#EAF1E4" />
    <path d="M0 96 C 80 80, 140 120, 220 92 S 330 70, 361 60" stroke="#CFE8F7" strokeWidth="18" fill="none" />
    <path d="M30 20 L 120 70 L 250 50 L 330 110" stroke="#FFFFFF" strokeWidth="7" fill="none" />
    <path d="M70 110 L 120 70 L 160 10" stroke="#FFFFFF" strokeWidth="5" fill="none" />
    <path d="M120 70 L 250 50" stroke={t.copihue} strokeWidth="4" strokeDasharray="2 7" strokeLinecap="round" fill="none" />
    {[
      [120, 70, "1"],
      [250, 50, "2"],
    ].map(([x, y, n]) => (
      <g key={String(n)}>
        <circle cx={Number(x)} cy={Number(y)} r="13" fill={t.copihue} stroke="#fff" strokeWidth="3" />
        <text x={Number(x)} y={Number(y) + 5} textAnchor="middle" fontFamily={texto} fontWeight="700" fontSize="13" fill="#fff">
          {n}
        </text>
      </g>
    ))}
    <text x="102" y="100" fontFamily={texto} fontWeight="600" fontSize="11" fill={t.ink}>
      Cabaña
    </text>
    <text x="216" y="32" fontFamily={texto} fontWeight="600" fontSize="11" fill={t.ink}>
      Cueva del Milodón
    </text>
  </svg>
);

// ---------- Notificación del sistema ----------
export const Notificacion: React.FC<{ titulo: string; texto: React.ReactNode; hora?: string; ancho?: number; style?: React.CSSProperties; botones?: string[] }> = ({ titulo, texto: cuerpoTxt, hora = "ahora", ancho = 520, style, botones }) => (
  <div style={{ width: ancho, background: "rgba(255,255,255,0.97)", borderRadius: 30, padding: "16px 20px", boxShadow: "0 18px 40px rgba(60,42,28,0.22)", border: `1px solid ${t.line}`, fontFamily: texto, ...style }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 42, height: 42, borderRadius: 11, background: t.copihue, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: redonda, fontWeight: 800, fontSize: 17, flexShrink: 0 }}>B&G</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: 19 }}>{titulo}</span>
          <span style={{ fontSize: 15, color: t.inkSoft }}>{hora}</span>
        </div>
        <div style={{ fontSize: 17, lineHeight: 1.35, color: t.ink, marginTop: 2 }}>{cuerpoTxt}</div>
      </div>
    </div>
    {botones ? (
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {botones.map((b) => (
          <div key={b} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 14, background: t.panel, fontWeight: 600, fontSize: 16 }}>
            {b}
          </div>
        ))}
      </div>
    ) : null}
  </div>
);

// ---------- Pasaje: foto y lectura ----------
export const PasajePapel: React.FC<{ scan: number }> = ({ scan }) => (
  <div style={{ position: "relative", width: 430, background: "#FFFDF8", borderRadius: 14, padding: "22px 26px", boxShadow: "0 22px 44px rgba(60,42,28,0.22)", fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: "#2B2620", transform: "rotate(-3deg)", overflow: "hidden" }}>
    <div style={{ fontWeight: 800, fontSize: 21, letterSpacing: "0.02em" }}>BUSES ALTAS CUMBRES</div>
    <div style={{ fontSize: 15, color: "#6B625A", marginTop: 2 }}>chilepasajes.cl · boleto electrónico</div>
    <div style={{ borderTop: "2px dashed #D8CFC2", margin: "14px 0" }} />
    {[
      ["ORIGEN", "TERMINAL SUR, SANTIAGO"],
      ["DESTINO", "TERMINAL CURICÓ"],
      ["SALIDA", "05/03/2027  17:00"],
      ["LLEGADA", "19:15"],
      ["ASIENTO", "52  SALON CAMA"],
      ["VALOR", "$6.000"],
      ["PASAJERO", "PASAJERA DE PRUEBA"],
    ].map(([k, v]) => (
      <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 16, marginTop: 6 }}>
        <span style={{ color: "#8A8076" }}>{k}</span>
        <span style={{ fontWeight: 700 }}>{v}</span>
      </div>
    ))}
    <div style={{ borderTop: "2px dashed #D8CFC2", margin: "14px 0 8px" }} />
    <div style={{ fontSize: 12.5, color: "#6B625A", lineHeight: 1.4 }}>Anulaciones hasta 4 horas antes de la salida. Se retendrá un 15% del valor del pasaje (Art. 67 D.S 212/92).</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: `${scan * 100}%`, height: 4, background: t.copihue, boxShadow: `0 0 18px ${t.copihue}`, opacity: scan > 0 && scan < 1 ? 0.9 : 0 }} />
  </div>
);

const Campo: React.FC<{ rotulo: string; valor: string; nota?: string; at: number; f: number }> = ({ rotulo, valor, nota, at, f }) => {
  const p = interpolate(f - at, [0, 10], [0, 1], clamp);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "8px 0", borderBottom: `1px solid ${t.line}`, opacity: p, transform: `translateY(${(1 - p) * 8}px)` }}>
      <span style={{ ...cap, fontWeight: 600, fontSize: 13.5 }}>{rotulo}</span>
      <span style={{ textAlign: "right" }}>
        <span style={{ fontWeight: 600, fontSize: 14.5 }}>{valor}</span>
        {nota ? <div style={{ ...cap, fontSize: 11.5 }}>{nota}</div> : null}
      </span>
    </div>
  );
};

export const RevisarPasaje: React.FC<{ f: number }> = ({ f }) => (
  <Pantalla tabs={null}>
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
      <span style={{ color: t.copihue, fontWeight: 600 }}>Cancelar</span>
      <span style={{ fontWeight: 700 }}>Revisa tu pasaje</span>
      <span style={{ width: 60 }} />
    </div>
    <Card pad={16} style={{ marginTop: 16, gap: 0 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
        <IconBadge color={t.sky}>
          <Bus size={18} strokeWidth={2.4} />
        </IconBadge>
        <div>
          <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 18 }}>Santiago → Curicó</div>
          <div style={cap}>vie 5 mar 2027</div>
        </div>
      </div>
      <Campo f={f} at={6} rotulo="Empresa" valor="Buses Altas Cumbres" />
      <Campo f={f} at={12} rotulo="Sale" valor="17:00 · Terminal Sur" nota="Andenes 26 al 36" />
      <Campo f={f} at={18} rotulo="Llega" valor="19:15 · Terminal Curicó" />
      <Campo f={f} at={24} rotulo="Asiento" valor="52 · Salón cama" />
      <Campo f={f} at={30} rotulo="Anulas hasta" valor="13:00 (4 h antes)" nota="retienen 15 %" />
      <Campo f={f} at={36} rotulo="Pasajera" valor="•••• cifrado" />
    </Card>
    <div style={{ marginTop: 12, background: t.okSoft, color: t.ok, borderRadius: 14, padding: 12, fontSize: 14, fontWeight: 600 }}>Leímos todo con confianza. Revisa y confírmalo.</div>
    <PrimaryButton style={{ marginTop: 16 }}>Confirmar pasaje</PrimaryButton>
  </Pantalla>
);

// ---------- Pantalla bloqueada con la Live Activity ----------
export const Bloqueada: React.FC<{ estado: "antes" | "salida"; f: number }> = ({ estado, f }) => {
  const antes = estado === "antes";
  const seg = Math.max(0, 48 * 60 + 10 - Math.floor(f / 30));
  const mm = Math.floor(seg / 60);
  const ss = String(seg % 60).padStart(2, "0");
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${t.navy} 0%, #1C4A6E 60%, #2E6A8F 100%)`, color: "#fff", fontFamily: texto }}>
      <Img src={staticFile("beandgo-app/art/art-curico.jpg")} style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: 360, objectFit: "cover", opacity: 0.35 }} />
      <div style={{ position: "absolute", top: 70, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Lock size={18} />
        </div>
        <div style={{ fontSize: 19, fontWeight: 600, marginTop: 4, opacity: 0.9 }}>viernes 5 de marzo</div>
        <div style={{ fontFamily: redonda, fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em" }}>{antes ? "16:12" : "17:01"}</div>
      </div>
      <div style={{ position: "absolute", left: 12, right: 12, top: 300, background: "rgba(20,18,16,0.72)", borderRadius: 26, padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: t.copihue, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bus size={19} strokeWidth={2.4} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Santiago → Curicó</div>
            <div style={{ fontSize: 13, opacity: 0.75 }}>Buses Altas Cumbres · Andenes 26 al 36</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 12 }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.75 }}>{antes ? "Sale en" : "Sale a las 17:00"}</div>
            <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 34, fontVariantNumeric: "tabular-nums" }}>{antes ? `0:${String(mm).padStart(2, "0")}:${ss}` : "¿Salió tu bus?"}</div>
          </div>
          <div style={{ fontSize: 13, opacity: 0.8, textAlign: "right" }}>Llegas ~19:15</div>
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < (antes ? 1 : 3) ? "#FF8DB8" : "rgba(255,255,255,0.22)" }} />
          ))}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 10, color: "#FFD3E3" }}>{antes ? "Próximo: Sal al terminal" : "Responde sin abrir la app"}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {(antes ? ["Estoy en el terminal", "Ya subí"] : ["Sí, salió", "Todavía no"]).map((b, i) => (
            <div key={b} style={{ flex: 1, textAlign: "center", padding: "11px 0", borderRadius: 999, background: i === 0 ? t.copihue : "rgba(255,255,255,0.16)", fontWeight: 700, fontSize: 14.5 }}>
              {b}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 54, left: 40, right: 40, display: "flex", justifyContent: "space-between" }}>
        {[0, 1].map((i) => (
          <div key={i} style={{ width: 50, height: 50, borderRadius: 25, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {i === 0 ? <TriangleAlert size={20} /> : <Camera size={20} />}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Paso del viaje en bus con derechos citados ----------
export const PasoAtraso: React.FC = () => (
  <Pantalla tabs="copiloto">
    <div style={{ color: t.copihue, fontWeight: 600, fontSize: 16, marginTop: 4 }}>‹ Copiloto</div>
    <Card pad={16} style={{ marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 19 }}>Santiago → Curicó</div>
        <Pill tono="bad">Atrasado 25 min</Pill>
      </div>
      <div style={cap}>Debía salir a las 17:00 · Andenes 26 al 36</div>
      <div style={{ display: "flex", gap: 8 }}>
        <SecondaryButton style={{ flex: 1, padding: "10px 0", fontSize: 14.5 }}>Ya salió</SecondaryButton>
        <SecondaryButton style={{ flex: 1, padding: "10px 0", fontSize: 14.5 }}>Todavía no</SecondaryButton>
      </div>
    </Card>
    <Card pad={16} style={{ marginTop: 12 }}>
      <Titulo tam={18}>Qué hacer ahora</Titulo>
      {["Pide en la boletería que timbren tu pasaje.", "Pide una constancia escrita del atraso.", "Fotografía el letrero de salidas."].map((s, i) => (
        <div key={s} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ width: 24, height: 24, borderRadius: 12, background: t.copihueSoft, color: t.copihue, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
          <div style={{ ...cuerpo, fontSize: 15 }}>{s}</div>
        </div>
      ))}
      <div style={{ height: 1, background: t.line }} />
      <div style={{ fontSize: 12.5, fontWeight: 700, color: t.inkSoft, letterSpacing: "0.04em", textTransform: "uppercase" }}>Citado de</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <Pill tono="sky" icono={<Scale size={12} />}>
          Decreto 212 MTT, art. 70 · LeyChile
        </Pill>
        <Pill tono="sky" icono={<Scale size={12} />}>
          Ley 19.496, art. 12 · BCN
        </Pill>
      </div>
      <div style={{ ...cap, fontSize: 12.5 }}>Ninguna fuente fija desde cuántos minutos de atraso te devuelven el pasaje. Por eso el aviso no lo dice.</div>
    </Card>
    <PrimaryButton style={{ marginTop: 14 }}>Preparar reclamo</PrimaryButton>
  </Pantalla>
);

// ---------- Mapa del viaje ----------
export const MapaViaje: React.FC<{ avance: number; alerta: number }> = ({ avance, alerta }) => {
  // Ruta estilizada Santiago (arriba) → Curicó (abajo).
  const ruta = "M 120 120 C 150 190, 110 250, 160 320 S 230 420, 210 500 S 250 600, 262 640";
  return (
    <AbsoluteFill style={{ background: "#EEF2E6" }}>
      <svg width={393} height={852} viewBox="0 0 393 852" style={{ position: "absolute", inset: 0 }}>
        <rect width="393" height="852" fill="#EEF2E6" />
        <path d="M -20 300 C 90 280, 140 380, 393 330" stroke="#CFE8F7" strokeWidth="22" fill="none" />
        <path d="M 0 560 L 393 520" stroke="#FFFFFF" strokeWidth="6" fill="none" />
        <path d="M 60 0 L 140 852" stroke="#FFFFFF" strokeWidth="5" fill="none" />
        <path d="M 300 0 L 330 852" stroke="#FFFFFF" strokeWidth="4" fill="none" />
        <path d={ruta} stroke="#C9BFB0" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d={ruta} stroke={t.copihue} strokeWidth="7" fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${avance} 1`} />
        <circle cx="262" cy="640" r={70} fill={`${t.copihue}12`} stroke={t.copihue} strokeWidth="2" strokeDasharray="6 6" />
        <circle cx="120" cy="120" r="9" fill={t.navy} stroke="#fff" strokeWidth="3" />
        <text x="136" y="116" fontFamily={texto} fontWeight="700" fontSize="13" fill={t.ink}>
          Terminal Sur
        </text>
        <text x="190" y="700" fontFamily={texto} fontWeight="700" fontSize="13" fill={t.ink}>
          Plaza de Armas de Curicó
        </text>
        <text x="206" y="582" fontFamily={texto} fontWeight="600" fontSize="11.5" fill={t.copihue}>
          ~2 km
        </text>
      </svg>
      <BusEnRuta avance={avance} />
      <div style={{ position: "absolute", left: 250, top: 612, color: t.copihue }}>
        <MapPin size={28} fill={t.copihue} color="#fff" strokeWidth={1.6} />
      </div>
      <div style={{ position: "absolute", top: 62, left: 16, right: 16, display: "flex", justifyContent: "space-between" }}>
        <CircleButton>
          <span style={{ fontSize: 20, color: t.copihue, fontWeight: 700 }}>‹</span>
        </CircleButton>
        <Pill tono="ok" style={{ fontSize: 14, padding: "8px 14px", alignSelf: "center" }}>
          En camino
        </Pill>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: t.ground, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: "10px 16px 30px", boxShadow: "0 -8px 20px rgba(60,42,28,0.12)" }}>
        <div style={{ width: 38, height: 5, borderRadius: 3, background: t.lineStrong, margin: "0 auto 10px" }} />
        <div style={{ display: "flex", gap: 4 }}>
          {["Inicio", "Terminal", "Arriba", "En camino", "Llegada", "Fin"].map((e, i) => (
            <div key={e} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ height: 5, borderRadius: 3, background: i < 4 ? t.copihue : t.line }} />
              <div style={{ fontSize: 10.5, fontWeight: 600, color: i < 4 ? t.ink : t.inkSoft, marginTop: 4 }}>{e}</div>
            </div>
          ))}
        </div>
        <Card pad={12} style={{ marginTop: 12, flexDirection: "row", alignItems: "center", gap: 10 }}>
          <IconBadge color={t.copihue} tam={34}>
            <MapPin size={16} strokeWidth={2.4} />
          </IconBadge>
          <div style={{ flex: 1 }}>
            <div style={{ ...cap, fontWeight: 600 }}>Me bajo en otro lugar</div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Plaza de Armas de Curicó</div>
          </div>
        </Card>
        <Card pad={12} style={{ marginTop: 10, flexDirection: "row", alignItems: "center", gap: 10 }}>
          <IconBadge color={t.food} tam={34}>
            <BellRing size={16} strokeWidth={2.4} />
          </IconBadge>
          <div style={{ flex: 1 }}>
            <div style={{ ...cap, fontWeight: 600 }}>Alarma en ruta</div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Avisar a mamá que me pase a buscar</div>
          </div>
        </Card>
      </div>
      {alerta > 0 ? (
        <div style={{ position: "absolute", top: 58 + (1 - alerta) * -120, left: 10, right: 10, opacity: alerta, zIndex: 8 }}>
          <div style={{ background: "rgba(255,255,255,0.98)", borderRadius: 24, padding: "12px 14px", boxShadow: "0 14px 30px rgba(60,42,28,0.25)", display: "flex", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: t.copihue, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: redonda, fontWeight: 800, fontSize: 13, flexShrink: 0 }}>B&G</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>Prepárate para bajar</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.3 }}>Estás a unos 2 km de Plaza de Armas de Curicó. Avisa al conductor o al auxiliar.</div>
            </div>
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const BusEnRuta: React.FC<{ avance: number }> = ({ avance }) => {
  // Posición aproximada sobre la curva por tramos rectos (suficiente para el video).
  const pts = [
    [120, 120],
    [140, 230],
    [160, 320],
    [215, 420],
    [210, 500],
    [240, 590],
    [262, 640],
  ];
  const k = avance * (pts.length - 1);
  const i = Math.min(pts.length - 2, Math.floor(k));
  const r = k - i;
  const x = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * r;
  const y = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * r;
  return (
    <div style={{ position: "absolute", left: x - 18, top: y - 18, width: 36, height: 36, borderRadius: 18, background: t.navy, border: "3px solid #fff", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(11,46,74,0.35)" }}>
      <Bus size={17} strokeWidth={2.5} />
    </div>
  );
};

// ---------- Resumen del viaje y Perfil ----------
const Hora: React.FC<{ rotulo: string; plan: string; real: string }> = ({ rotulo, plan, real }) => (
  <div style={{ display: "flex", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${t.line}` }}>
    <span style={{ flex: 1, fontWeight: 600, fontSize: 15 }}>{rotulo}</span>
    <span style={{ width: 84, textAlign: "right", ...cap }}>{plan}</span>
    <span style={{ width: 84, textAlign: "right", fontWeight: 700, fontSize: 15 }}>{real}</span>
  </div>
);

export const Resumen: React.FC = () => (
  <Pantalla tabs="viajes">
    <div style={{ color: t.copihue, fontWeight: 600, fontSize: 16, marginTop: 4 }}>‹ Viajes</div>
    <div style={{ marginTop: 10 }}>
      <Heroe slug="curico" alto={150}>
        <div style={{ fontSize: 13, opacity: 0.9 }}>Viaje terminado</div>
        <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 22 }}>Tu viaje a Curicó, en resumen</div>
      </Heroe>
    </div>
    <Card pad={16} style={{ marginTop: 12, gap: 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <IconBadge color={t.sky} tam={34}>
          <Bus size={16} strokeWidth={2.4} />
        </IconBadge>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Bus Santiago → Curicó</div>
      </div>
      <div style={{ display: "flex", padding: "4px 0" }}>
        <span style={{ flex: 1 }} />
        <span style={{ width: 84, textAlign: "right", fontSize: 11.5, fontWeight: 700, color: t.inkSoft }}>PLANEADA</span>
        <span style={{ width: 84, textAlign: "right", fontSize: 11.5, fontWeight: 700, color: t.inkSoft }}>REPORTADA</span>
      </div>
      <Hora rotulo="Salida" plan="17:00" real="17:06" />
      <Hora rotulo="Llegada" plan="19:15" real="19:21" />
    </Card>
    <Card pad={16} style={{ marginTop: 12, gap: 8 }}>
      <Titulo tam={17}>Línea de tiempo</Titulo>
      {[
        ["15:30", "Iniciar viaje"],
        ["16:20", "En el terminal"],
        ["16:42", "Arriba del bus"],
        ["17:06", "Salió"],
        ["19:21", "Llegaste"],
      ].map(([h, e]) => (
        <div key={h} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ width: 46, ...cap, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{h}</span>
          <div style={{ width: 9, height: 9, borderRadius: 5, background: t.copihue }} />
          <span style={{ fontSize: 15 }}>{e}</span>
        </div>
      ))}
    </Card>
  </Pantalla>
);

export const Perfil: React.FC = () => (
  <Pantalla tabs="perfil">
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 16 }}>
      <div style={{ width: 104, height: 104, borderRadius: 52, background: `linear-gradient(135deg, ${t.copihue}, ${t.copihueDeep})`, border: `4px solid ${t.surface}`, boxShadow: "0 4px 10px rgba(91,70,52,0.15)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: redonda, fontWeight: 800, fontSize: 40 }}>D</div>
      <Titulo tam={24} style={{ marginTop: 10 }}>
        Demo
      </Titulo>
      <div style={cap}>demo@bego.local</div>
    </div>
    <RowHeader titulo="Tus viajes" />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {[
        ["1", "viaje", t.copihue],
        ["1", "bus", t.sky],
        ["1", "ciudad", t.activities],
        ["2 h 15", "a bordo", t.food],
      ].map(([n, r, c]) => (
        <Card key={r} pad={14} style={{ gap: 2 }}>
          <div style={{ fontFamily: redonda, fontWeight: 800, fontSize: 26, color: c }}>{n}</div>
          <div style={{ ...cap, fontWeight: 600 }}>{r}</div>
        </Card>
      ))}
    </div>
    <Card pad={14} style={{ marginTop: 10, flexDirection: "row", alignItems: "center", gap: 12 }}>
      <IconBadge color={t.ok} tam={38}>
        <Check size={18} strokeWidth={2.8} />
      </IconBadge>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 15.5 }}>Puntualidad</div>
        <div style={cap}>Horas que tú reportaste, no estimadas</div>
      </div>
    </Card>
    <Card pad={6} style={{ marginTop: 10, gap: 0 }}>
      {["Preferencias", "Permisos", "Cerrar sesión"].map((x, i) => (
        <div key={x} style={{ display: "flex", justifyContent: "space-between", padding: "12px 12px", borderTop: i ? `1px solid ${t.line}` : "none", fontSize: 15.5, fontWeight: 500, color: i === 2 ? t.bad : t.ink }}>
          {x}
          {i < 2 ? <ChevronRight size={17} color={t.lineStrong} /> : null}
        </div>
      ))}
    </Card>
  </Pantalla>
);

