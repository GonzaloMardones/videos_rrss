import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Bell, Brain, Camera, Car, Check, CloudRain, Database, FileText, MapPin, Plane, Receipt, ScanLine, Server, ShieldCheck, Smartphone, Star, TerminalSquare, Utensils, Wallet, X } from "lucide-react";
import { useCue } from "../../components/narracion";
import { EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Aparece, Burbuja, Cabeza, Chip, Cinetico, clamp, Escena, Marca, Rotulo, Sube, Tarjeta, Telefono } from "../../estilos/beandgo/kit";
import { b, cat, fuente } from "../../estilos/beandgo/tokens";

const I = { strokeWidth: 2.4 } as const;

// Captura real de la app (docs/demo/iphone-15-pro-max), a pantalla completa dentro del teléfono.
const Captura: React.FC<{ src: string }> = ({ src }) => (
  <div style={{ position: "absolute", top: -52, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
    <Img src={staticFile(`beandgo-estado/${src}`)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
  </div>
);

const Punto: React.FC<{ at: number; color?: string; children: React.ReactNode; no?: boolean }> = ({ at, color = b.copihue, children, no }) => (
  <Sube at={at} dist={14} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginTop: 20 }}>
    <div style={{ width: 34, height: 34, borderRadius: 17, background: no ? b.mal : color, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
      {no ? <X size={20} strokeWidth={3.2} /> : <Check size={20} strokeWidth={3.2} />}
    </div>
    <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.3, color: b.tinta }}>{children}</div>
  </Sube>
);

// Cifra grande que cuenta hasta su valor.
const Cifra: React.FC<{ at: number; valor: number; formato?: (n: number) => string; rotulo: string; color?: string; nota?: string }> = ({ at, valor, formato = (n) => String(Math.round(n)), rotulo, color = b.copihue, nota }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 1100, EXPO_OUT);
  if (frame < at - 1) return null;
  return (
    <div style={{ opacity: Math.min(1, k * 2) }}>
      <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, color, fontVariantNumeric: "tabular-nums" }}>{formato(valor * k)}</div>
      <div style={{ fontSize: 28, fontWeight: 700, marginTop: 10 }}>{rotulo}</div>
      {nota ? <div style={{ fontSize: 21, fontWeight: 600, color: b.tinta2, marginTop: 4 }}>{nota}</div> : null}
    </div>
  );
};

// ---------- 1. Gancho ----------
export const Gancho: React.FC = () => {
  const hoy = useCue("hoy");
  const hon = useCue("honesto");
  return (
    <Escena pleno fondo={<AbsoluteFill style={{ background: `linear-gradient(160deg, ${b.noche} 0%, #061D30 100%)` }} />}>
      <div style={{ position: "absolute", left: 130, top: 200, width: 1000, color: "#FFFFFF" }}>
        <Sube at={hoy}>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9CC3DC" }}>1 al 8 de noviembre de 2026</div>
        </Sube>
        <Cinetico at={hoy + 6} texto="De un diseño|a una app en el *iPhone*" tam={92} acento="#FF8DB8" style={{ marginTop: 22, color: "#FFFFFF" }} />
        <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
          {[["716 tests", hoy + 60], ["Demo sin gastar un peso", hoy + 70], ["Qué puede y qué no", hon]].map(([t, at]) => (
            <Chip key={String(t)} at={Number(at)} color="#9CC3DC" tam={26} style={{ background: "transparent", color: "#DCEAF3" }}>
              {t}
            </Chip>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", right: 170, top: 90 }}>
        <Telefono hora="19:38">
          <Captura src="02-mi-viaje.png" />
        </Telefono>
      </div>
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
          <Marca tam={200} />
        </div>
        <Cinetico at={marca + 14} texto="Estado del *MVP*" tam={64} style={{ marginTop: 10, color: b.tinta2 }} />
        <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
          <Chip at={marca + 40} color={b.noche} lleno>
            8 de noviembre de 2026
          </Chip>
          <Chip at={marca + 46} color={b.noche}>
            main, PR #33
          </Chip>
        </div>
        <Sube at={marca + 60} style={{ marginTop: 40, fontSize: 22, fontWeight: 700, color: b.tinta3 }}>
          {autor}
        </Sube>
      </div>
    </Escena>
  );
};

// ---------- 3. Números ----------
export const Numeros: React.FC = () => {
  const intro = useCue("intro");
  const tests = useCue("tests");
  const bol = useCue("boletas");
  const costo = useCue("costo");
  return (
    <Escena>
      <Cabeza at={intro - 4} rotulo="Medido en el repositorio" titulo="Los *números*" />
      <div style={{ position: "absolute", top: 270, left: 0, right: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        <Tarjeta at={tests} color={b.copihue} style={{ padding: "34px 36px" }}>
          <Cifra at={tests + 4} valor={716} rotulo="tests en el backend" nota="126 en el frontend · 34 de punta a punta · 0 llamadas de red" />
        </Tarjeta>
        <Tarjeta at={tests + 30} color={b.noche} style={{ padding: "34px 36px" }}>
          <Cifra at={tests + 34} valor={72} rotulo="respuestas de Claude grabadas" nota="434 fragmentos de conocimiento con fuente y fecha" color={b.noche} />
        </Tarjeta>
        <Tarjeta at={bol} color={cat.comida} style={{ padding: "34px 36px" }}>
          <Cifra at={bol + 4} valor={20} formato={(n) => `${Math.round(n)}/20`} rotulo="boletas leídas, 0 % de error en el monto" nota="0 fugas de datos personales · cartas 20/20, 274 platos" color={cat.comida} />
        </Tarjeta>
        <Tarjeta at={costo} color={b.sol} style={{ padding: "34px 36px" }}>
          <Cifra at={costo + 4} valor={0.18} formato={(n) => `USD ${n.toFixed(2)}`} rotulo="de IA por viaje de 7 días" nota="el plan estimaba USD 1,5 a 4 · USD 0,0024 por aviso" color={b.alerta} />
        </Tarjeta>
      </div>
    </Escena>
  );
};

// ---------- 4. Lo que puede ----------
export const Puede: React.FC = () => {
  const intro = useCue("intro");
  const ver = useCue("veredicto");
  const av = useCue("avisos");
  const com = useCue("comer");
  const bol = useCue("boleta");
  const vue = useCue("vuelo");
  const items: [number, React.ReactNode, string, string, string][] = [
    [ver, <Wallet key="1" size={30} {...I} />, b.copihue, "Veredicto", "¿Te alcanza? Cuánto falta, qué pesa más; cada precio con fuente y fecha"],
    [av, <Bell key="2" size={30} {...I} />, b.noche, "Avisos por eventos", "Despierta solo cuando algo cambia; push con la app cerrada"],
    [com, <Utensils key="3" size={30} {...I} />, cat.comida, "Dónde comer y la carta", "Con lo que te queda del día; foto de la carta → 3 platos"],
    [bol, <Receipt key="4" size={30} {...I} />, cat.alojamiento, "Boleta y sobres", "Foto → gasto, sin nombre, RUT ni tarjeta; avisos al 80 % y 100 %"],
    [vue, <Plane key="5" size={30} {...I} />, cat.transporte, "Lluvia y vuelo cancelado", "Plan B; derechos citados, vuelos con precio y reclamo redactado"],
  ];
  return (
    <Escena>
      <Cabeza at={intro - 4} rotulo="Verificado" titulo="Lo que *sí* puede hacer" acento={b.ok} />
      <div style={{ position: "absolute", top: 250, left: 0, width: 1060 }}>
        {items.map(([at, ic, c, t, d]) => (
          <Sube key={t} at={at} dist={14} style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 22 }}>
            <Burbuja color={c} tam={62} lleno>
              {ic}
            </Burbuja>
            <div>
              <div style={{ fontSize: 31, fontWeight: 800 }}>{t}</div>
              <div style={{ fontSize: 23, fontWeight: 600, color: b.tinta2, marginTop: 2 }}>{d}</div>
            </div>
            <div style={{ marginLeft: "auto", color: b.ok, flexShrink: 0 }}>
              <Check size={34} strokeWidth={3.2} />
            </div>
          </Sube>
        ))}
      </div>
      <div style={{ position: "absolute", left: 1180, top: 120 }}>
        <Telefono hora="19:38" escala={0.86}>
          <Captura src="03-vuelo-cancelado.png" />
        </Telefono>
      </div>
    </Escena>
  );
};

// ---------- 5. Pantallas reales ----------
export const Pantalla: React.FC = () => {
  const ins = useCue("instala");
  const pes = useCue("pestanas");
  const caps: [string, string][] = [
    ["02-mi-viaje.png", "Mi viaje"],
    ["04-donde-comer.png", "Comer"],
    ["06-gastos.png", "Gastos"],
    ["07-chat.png", "Chat"],
    ["08-preferencias.png", "Preferencias"],
  ];
  return (
    <Escena>
      <Rotulo at={ins - 4}>Capturas reales · iPhone 15 Pro Max</Rotulo>
      <Cinetico at={ins} texto="Instalada desde *Safari,* sin App Store" tam={56} style={{ marginTop: 12 }} />
      <div style={{ position: "absolute", top: 180, left: 40, right: 40, display: "flex", justifyContent: "space-between" }}>
        {caps.map(([src, t], i) => (
          <Aparece key={src} at={i === 0 ? ins + 20 : pes + i * 12} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 264 }}>
            <div style={{ width: 264, height: 560, position: "relative" }}>
              <Telefono hora="19:38" escala={0.66} style={{ position: "absolute", left: -68, top: 0 }}>
                <Captura src={src} />
              </Telefono>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: i === 0 ? b.copihue : b.tinta }}>{t}</div>
          </Aparece>
        ))}
      </div>
    </Escena>
  );
};

// ---------- 6. Por dentro ----------
export const Dentro: React.FC = () => {
  const regla = useCue("regla");
  const ctrl = useCue("control");
  const cols: [React.ReactNode, string, string, string[]][] = [
    [<Brain key="a" size={34} {...I} />, b.copihue, "La IA redacta y lee", ["Avisos y chat (Sonnet 5.5)", "Boletas y cartas (Haiku 5.5)", "Nunca decide montos"]],
    [<ShieldCheck key="b" size={34} {...I} />, b.noche, "El código decide", ["Veredicto, sobres, ranking de platos", "Citas ubicadas en la fuente, palabra por palabra", "Un número sin dato citado se rechaza"]],
    [<Database key="c" size={34} {...I} />, cat.alojamiento, "Si una fuente falla, sigue", ["Cada API detrás de un adaptador", "Degrada a estimación y lo dice", "Todo grabado: la demo corre sin claves"]],
  ];
  return (
    <Escena>
      <Cabeza at={regla - 4} rotulo="Por dentro" titulo="La IA *no* decide los números" acento={b.noche} />
      <div style={{ position: "absolute", top: 260, left: 0, right: 0, display: "flex", gap: 28 }}>
        {cols.map(([ic, c, t, ls], i) => (
          <Tarjeta key={t} at={(i < 2 ? regla : ctrl) + i * 12} color={c} style={{ flex: 1, padding: "32px 30px 30px 38px", minHeight: 400 }}>
            <Burbuja color={c} tam={74}>
              {ic}
            </Burbuja>
            <div style={{ fontSize: 36, fontWeight: 800, marginTop: 22, lineHeight: 1.1 }}>{t}</div>
            {ls.map((l, j) => (
              <Sube key={l} at={(i < 2 ? regla : ctrl) + i * 12 + 14 + j * 8} dist={8} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 16, fontSize: 24, fontWeight: 600, color: b.tinta2 }}>
                <Check size={22} strokeWidth={3} color={c} style={{ flexShrink: 0, marginTop: 4 }} />
                {l}
              </Sube>
            ))}
          </Tarjeta>
        ))}
      </div>
    </Escena>
  );
};

// ---------- 7. Lo que no puede ----------
export const NoPuede: React.FC = () => {
  const intro = useCue("intro");
  const lleg = useCue("llegada");
  const pla = useCue("places");
  const ub = useCue("uber");
  const vu = useCue("vuelos");
  const pr = useCue("prod");
  const items: [number, React.ReactNode, string, string, string][] = [
    [lleg, <MapPin key="1" size={30} {...I} />, "Reaccionar sola al llegar", "PWA: iOS no permite geocercas en segundo plano", "Fase E: Capacitor"],
    [pla, <Star key="2" size={30} {...I} />, "Reseñas de restoranes", "Sin clave de Google Places; usa OpenStreetMap", "Clave en Google Cloud"],
    [ub, <Car key="3" size={30} {...I} />, "Precio real de Uber ni check-in automático", "Uber no lo entrega; automatizar aerolíneas viola términos", "A propósito: estimado y asistido"],
    [vu, <Plane key="4" size={30} {...I} />, "Detectar una cancelación real", "Sin clave de AeroDataBox; la demo es simulada", "Cuenta gratis, 400 consultas"],
    [pr, <Server key="5" size={30} {...I} />, "Vivir fuera de tu Mac", "Backend local tras un túnel, una sola instancia", "Supabase + Vercel + Inngest"],
  ];
  return (
    <Escena>
      <Cabeza at={intro - 4} rotulo="Con honestidad" titulo="Lo que *no* puede hacer todavía" acento={b.mal} />
      <div style={{ position: "absolute", top: 250, left: 0, right: 0 }}>
        {items.map(([at, ic, t, por, que]) => (
          <Sube key={t} at={at} dist={14} style={{ display: "grid", gridTemplateColumns: "70px 620px 1fr 360px", gap: 18, alignItems: "center", padding: "14px 0", borderBottom: `1.5px solid ${b.linea}` }}>
            <Burbuja color={b.mal} tam={58}>
              {ic}
            </Burbuja>
            <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.15 }}>{t}</div>
            <div style={{ fontSize: 23, fontWeight: 600, color: b.tinta2, lineHeight: 1.3 }}>{por}</div>
            <Chip at={at + 10} color={b.noche} tam={20}>
              {que}
            </Chip>
          </Sube>
        ))}
      </div>
    </Escena>
  );
};

// ---------- 8. Construido, no probado ----------
export const Pendiente: React.FC = () => {
  const tres = useCue("tres");
  const run = useCue("runbook");
  const items: [React.ReactNode, string, string][] = [
    [<Bell key="a" size={36} {...I} />, "Push en el iPhone con la app cerrada", "Verificado en el Mac (Safari y Chrome)"],
    [<FileText key="b" size={36} {...I} />, "Foto elegida desde Archivos", "Diseñada y testeada en Chromium; no en Safari real"],
    [<Camera key="c" size={36} {...I} />, "La cámara real", "Orientación y lectura en vivo (USD 0,001 por foto)"],
  ];
  return (
    <Escena>
      <Cabeza at={tres - 4} rotulo="Construido, no probado por una persona" titulo="Tres cosas por *confirmar*" acento={b.alerta} />
      <div style={{ position: "absolute", top: 260, left: 0, right: 0, display: "flex", gap: 28 }}>
        {items.map(([ic, t, d], i) => (
          <Tarjeta key={t} at={tres + 10 + i * 14} color={b.sol} style={{ flex: 1, padding: "32px 30px 30px 38px", minHeight: 300 }}>
            <Burbuja color={b.alerta} tam={74}>
              {ic}
            </Burbuja>
            <div style={{ fontSize: 34, fontWeight: 800, marginTop: 22, lineHeight: 1.15 }}>{t}</div>
            <div style={{ fontSize: 23, fontWeight: 600, color: b.tinta2, marginTop: 10 }}>{d}</div>
          </Tarjeta>
        ))}
      </div>
      <Sube at={run} style={{ position: "absolute", top: 640, left: 0, display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 700 }}>
        <Burbuja color={b.copihue} tam={54} lleno>
          <TerminalSquare size={28} {...I} />
        </Burbuja>
        10 minutos con <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 26, background: b.panel, padding: "4px 12px", borderRadius: 8 }}>docs/RUNBOOK.md</span>
      </Sube>
    </Escena>
  );
};

// ---------- 9. Cómo correrla ----------
const Term: React.FC<{ at: number; lineas: [string, string?][]; titulo: string }> = ({ at, lineas, titulo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 500, EXPO_OUT);
  return (
    <div style={{ borderRadius: 18, background: "#10161A", color: "#E6EDF3", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 21, lineHeight: 1.55, overflow: "hidden", opacity: k, transform: `translateY(${(1 - k) * 14}px)`, boxShadow: "0 10px 30px rgba(11,46,74,0.18)" }}>
      <div style={{ padding: "10px 18px", background: "#1C252B", fontFamily: fuente, fontSize: 19, fontWeight: 700, color: "#9CC3DC", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ display: "inline-flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: 6, background: c }} />
          ))}
        </span>
        {titulo}
      </div>
      <div style={{ padding: "14px 18px" }}>
        {lineas.map(([l, c], i) => {
          const kl = transicion(frame, at + 8 + i * 5, fps, 350, EXPO_OUT);
          return (
            <div key={i} style={{ opacity: kl, color: c ?? "#E6EDF3", whiteSpace: "pre" }}>
              {l}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Correr: React.FC = () => {
  const cmd = useCue("comandos");
  const pasos = useCue("pasos");
  return (
    <Escena>
      <Cabeza at={cmd - 4} rotulo="docs/RUNBOOK.md" titulo="Cómo *encenderla*" acento={b.noche} />
      <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Term at={cmd} titulo="Terminal 1 · backend" lineas={[["$ cd backend", "#8B949E"], ["$ LIVE_PUSH=1 npm run dev:mock"], ["[dev:mock] demo@bego.local / demo1234", "#7CF2B5"], ["[dev:mock] demo trip demo-puerto-natales ready", "#7CF2B5"], ["listening on http://localhost:4000", "#7CF2B5"]]} />
        <Term at={cmd + 14} titulo="Terminal 2 · frontend" lineas={[["$ cd frontend", "#8B949E"], ["$ VITE_API_URL=/ VITE_DEMO=1 npm run dev"], ["  ➜  Local:   http://localhost:3000/", "#7CF2B5"], ["  ➜  Network: use --host to expose", "#8B949E"]]} />
        <Term at={cmd + 28} titulo="Terminal 3 · iPhone (URL fija)" lineas={[["$ Tailscale funnel 3000"], ["Available on the internet:", "#8B949E"], ["https://mac.tailnet.ts.net", "#7CF2B5"], ["Safari → Compartir → Agregar a inicio", "#9CC3DC"]]} />
        <Term at={pasos} titulo="Terminal 4 · la demo" lineas={[["$ npm run demo:play -- --step 2"], ["→ Hora de cenar (push enviado, 201)", "#7CF2B5"], ["$ npm run demo:play -- --step 5"], ["→ Vuelo SIM502 cancelado: qué hacer", "#7CF2B5"], ["  derechos · 2 vuelos con precio · reclamo", "#8B949E"]]} />
      </div>
    </Escena>
  );
};

// ---------- 10. Cierre ----------
export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const meta = useCue("meta");
  const lema = useCue("lema");
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, lema - 6, fps, 900, EXPO_OUT);
  return (
    <Escena>
      <div style={{ position: "absolute", left: 0, top: 170, width: 860 }}>
        <Rotulo at={meta - 4}>Para el 28 de noviembre</Rotulo>
        <Cinetico at={meta} texto="Falta verla correr|y *contarlo bien*" style={{ marginTop: 16 }} />
        <Punto at={meta + 30}>Push y fotos confirmados en el iPhone</Punto>
        <Punto at={meta + 50} color={cat.transporte}>
          La toma del video con el guion de 3 minutos
        </Punto>
        <Punto at={meta + 70} color={cat.comida}>
          Equipo, validación y uso de fondos en la postulación
        </Punto>
      </div>
      <div style={{ position: "absolute", right: 0, top: 160, width: 720, height: 460, borderRadius: 32, background: b.noche, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: k, transform: `scale(${0.94 + 0.06 * k})` }}>
        <Marca tam={150} claro />
        <div style={{ fontSize: 44, fontWeight: 800, color: "#FFFFFF", marginTop: 6 }}>Viaja acompañado.</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#9CC3DC", marginTop: 24 }}>Estado del MVP · 8-nov-2026 · {autor}</div>
      </div>
    </Escena>
  );
};

// Evita avisos de imports sin uso cuando una escena cambia.
void interpolate;
void clamp;
void ScanLine;
void Smartphone;
void CloudRain;
