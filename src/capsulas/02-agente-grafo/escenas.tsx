import React from "react";
import {
  AppWindow,
  Binary,
  Braces,
  BrainCircuit,
  Cloud,
  Container,
  Database,
  DatabaseZap,
  FileCode2,
  Folder,
  HeartPulse,
  Layers,
  Library,
  MousePointer2,
  Network,
  Plug,
  Save,
  Search,
  Server,
  ShieldCheck,
  Timer,
  TriangleAlert,
  User,
  Workflow,
} from "lucide-react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, resorte, transicion } from "../../estilos/vacio/movimiento";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { ancla, Cable, Cables, Cargando, type Caja, Chip, Codigo, Escenario, linea, mono, Navegador, punto, sintaxis as s, Tarjeta } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const PIEZAS = Array.from({ length: 9 }, (_, i) => ({ src: staticFile(`tec02/piezas/0${i}.png`), alt: "" }));

const Lectura: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ ...tipo.dato, fontSize: 30, color: v.niebla, ...style }}>{children}</div>
);

// ─── Gancho: el carrusel curvo de lo que rodea a un agente ───────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cDonde = useCue("donde");
  const cNo = useCueAt("donde", 0.55);
  const cConv = useCue("conversan");
  const tacha = transicion(frame, cNo + 8, fps, 500, EXPO_OUT);
  const palabras = ["grafo", "servidor", "nube"];
  return (
    <Escena>
      <div style={{ position: "absolute", left: -72, top: -60, width: 1080, height: 600 }}>
        <TiltedGridHero images={PIEZAS} time={frame / fps} size={{ width: 1080, height: 600 }} speed={1.8} tileHeight={50} curve={70} axis={50} fade={10} ImageComponent={Img} className="h-full w-full" />
      </div>
      <div style={{ marginTop: 560 }}>
        <Cinetico at={cDonde} texto="¿Dónde vive|tu agente?" style={{ fontSize: 104 }} />
        <Sube at={cNo} style={{ marginTop: 22 }}>
          <div style={{ ...tipo.subtitulo, fontSize: 56, color: v.ceniza, position: "relative", display: "inline-block" }}>
            No en el prompt.
            <div style={{ position: "absolute", left: 0, top: "56%", height: 3, width: `${tacha * 100}%`, background: v.azafran }} />
          </div>
        </Sube>
        <div style={{ display: "flex", gap: 30, marginTop: 26 }}>
          {palabras.map((p, i) => {
            const k = transicion(frame, cConv + i * 4, fps, 500, backOut);
            return (
              <div key={p} style={{ ...tipo.subtitulo, fontSize: 60, opacity: Math.min(1, k * 1.5), transform: `translateY(${(1 - k) * 40}px) scale(${0.8 + 0.2 * k})` }}>
                {p}
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
      <Constelacion at={-60} ancho={700} forma="red" cantidad={520} />
    </div>
    <div style={{ marginTop: 470 }}>
      <Rotulo at={2}>{serie} · 02</Rotulo>
      <Cinetico at={6} texto="El agente|como *grafo*|de estados." size="display" style={{ marginTop: 18 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── El estado: un objeto que pasa de nodo en nodo y se va llenando ──────────
export const Estado: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cObj = useCue("objeto");
  const cPasa = useCue("pasa");
  const largo = cPasa - cObj;
  const nombra = (f: number) => cObj + largo * f;
  const N: Caja[] = [0, 311, 622].map((x) => ({ x, y: 0, w: 290, h: 228 }));
  const leg1 = transicion(frame, cPasa + 4, fps, 600, EXPO_IN_OUT);
  const leg2 = transicion(frame, cPasa + 40, fps, 600, EXPO_IN_OUT);
  const xs = [0, 166, 332];
  const x = xs[0] + (xs[1] - xs[0]) * leg1 + (xs[2] - xs[1]) * leg2;
  const nodo = leg2 >= 1 ? 2 : leg1 >= 1 ? 1 : 0;
  const campos: { k: string; v: string; nombrado: number; lleno: number }[] = [
    { k: "peticion", v: '"revisar actividad"', nombrado: nombra(0.48), lleno: nombra(0.48) },
    { k: "usuario", v: '"ana@empresa.com"', nombrado: nombra(0.6), lleno: nombra(0.6) },
    { k: "contexto_rag", v: "[3 trozos · 0.91]", nombrado: nombra(0.72), lleno: cPasa - 6 },
    { k: "memoria", v: "[2 decisiones]", nombrado: nombra(0.72), lleno: cPasa - 2 },
    { k: "respuesta", v: "{ tipo, confianza }", nombrado: nombra(0.88), lleno: cPasa + 30 },
  ];
  const guardado = transicion(frame, cPasa + 62, fps, 500, backOut);
  // La flecha que baja del nodo activo al objeto: el nodo lo está leyendo.
  const lee = N[nodo].x + N[nodo].w / 2;
  return (
    <Escena>
      <Rotulo at={cObj}>El estado</Rotulo>
      <Cinetico at={cObj + 4} texto="Un objeto|que *viaja.*" style={{ marginTop: 18 }} />
      <Escenario alto={680} style={{ marginTop: 40 }}>
        <Cables alto={680}>
          <Cable de={ancla(N[0], "r")} a={ancla(N[1], "l")} at={cObj + 20} envios={[{ at: cPasa + 4, ms: 600 }]} />
          <Cable de={ancla(N[1], "r")} a={ancla(N[2], "l")} at={cObj + 24} envios={[{ at: cPasa + 40, ms: 600 }]} />
          {frame >= nombra(0.4) ? <line x1={lee} y1={N[0].h + 6} x2={lee} y2={276} stroke={v.azafran} strokeWidth={2.2} strokeDasharray="6 8" opacity={transicion(frame, nombra(0.4), fps, 500, EXPO_OUT)} /> : null}
        </Cables>
        <Tarjeta vertical caja={N[0]} at={cObj + 8} Icono={Search} rol="Nodo 1" titulo="Reunir" sub="RAG + memoria" activo={frame >= cPasa - 10 && nodo === 0} />
        <Tarjeta vertical caja={N[1]} at={cObj + 12} Icono={BrainCircuit} rol="Nodo 2" titulo="Razonar" sub="LLM + esquema" activo={nodo === 1 && leg2 === 0} />
        <Tarjeta vertical caja={N[2]} at={cObj + 16} Icono={Save} rol="Nodo 3" titulo="Guardar" sub="si aplica" activo={nodo === 2} />
        <div
          style={{
            position: "absolute",
            left: x,
            top: 280,
            width: 580,
            boxSizing: "border-box",
            borderRadius: 22,
            border: `2.5px solid ${v.azafran}`,
            background: "#0A0A0D",
            padding: "18px 24px",
            fontFamily: mono,
            fontSize: 27,
            lineHeight: 1.65,
            opacity: transicion(frame, nombra(0.4), fps, 500, EXPO_OUT),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: v.azafran, marginBottom: 6 }}>
            <Braces size={28} strokeWidth={1.6} color={v.azafran} /> estado
            {guardado > 0 ? <span style={{ marginLeft: "auto", fontSize: 23, color: s.tipo, transform: `scale(${guardado})` }}>✓ guardado</span> : null}
          </div>
          {campos.map((c) => {
            const visto = frame >= c.nombrado;
            const lleno = frame >= c.lleno;
            return (
              <div key={c.k} style={{ whiteSpace: "nowrap", opacity: visto ? 1 : 0.3 }}>
                <span style={{ color: s.clave }}>{c.k}</span>
                <span style={{ color: v.ceniza }}>: </span>
                <span style={{ color: lleno ? v.hueso : v.ceniza }}>{lleno ? c.v : "…"}</span>
              </div>
            );
          })}
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Los tres nodos, con el RAG a la vista ───────────────────────────────────
export const Nodos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cReunir = useCue("reunir");
  const cParalelo = useCueAt("reunir", 0.55);
  const cRazonar = useCue("razonar");
  const cValida = useCueAt("razonar", 0.75);
  const cGuardar = useCue("guardar");
  const cCond = useCueAt("guardar", 0.6);
  const VDB: Caja = { x: 0, y: 30, w: 380, h: 170 };
  const MEM: Caja = { x: 0, y: 290, w: 380, h: 170 };
  const N1: Caja = { x: 480, y: 0, w: 432, h: 214 };
  const N2: Caja = { x: 480, y: 264, w: 432, h: 214 };
  const N3: Caja = { x: 480, y: 528, w: 432, h: 162 };
  const activo = frame >= cGuardar ? 2 : frame >= cRazonar ? 1 : 0;
  const top = [0.91, 0.88, 0.84];
  const ok = transicion(frame, cValida + 20, fps, 500, backOut);
  return (
    <Escena>
      <Rotulo at={cReunir}>Tres nodos</Rotulo>
      <Cinetico at={cReunir + 4} texto="Con tres|*basta.*" style={{ marginTop: 18 }} />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <Cables alto={700}>
          <Cable de={ancla(VDB, "r")} a={ancla(N1, "l", -20)} at={cReunir + 14} etiqueta="RAG" envios={[{ at: cParalelo, ms: 800 }]} />
          <Cable de={ancla(MEM, "r")} a={ancla(N1, "l", 40)} at={cReunir + 16} envios={[{ at: cParalelo + 2, ms: 800 }]} />
          <Cable de={ancla(N1, "b")} a={ancla(N2, "t")} at={cReunir + 18} envios={[{ at: cRazonar + 6, ms: 700 }]} />
          <Cable de={ancla(N2, "b")} a={ancla(N3, "t")} at={cReunir + 20} envios={[{ at: cGuardar + 6, ms: 700 }]} />
          <Cable de={ancla(N3, "l")} a={ancla(MEM, "b")} at={cCond} ms={600} color={v.azafran} etiqueta="persistir" envios={[{ at: cCond + 12, ms: 800 }]} />
        </Cables>
        <Tarjeta caja={VDB} at={cReunir + 6} Icono={DatabaseZap} rol="Base vectorial" titulo="Firestore" sub="trozos · 768 dims" activo={activo === 0 && frame >= cParalelo} />
        <Tarjeta caja={MEM} at={cReunir + 9} Icono={Library} rol="Memoria del tema" titulo="Base SQL" sub="decisiones previas" activo={frame >= cCond + 30} />
        <Tarjeta caja={N1} at={cReunir + 10} Icono={Search} rol="Nodo 1" titulo="Reunir" sub="en paralelo" activo={activo === 0}>
          <div style={{ display: "flex", gap: 14, marginTop: 14, opacity: frame >= cParalelo + 22 ? 1 : 0 }}>
            {top.map((sim, i) => {
              const k = transicion(frame, cParalelo + 24 + i * 4, fps, 500, EXPO_OUT);
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, opacity: k }}>
                  <div style={{ height: 10, width: 40 * sim * k, borderRadius: 5, background: v.azafran }} />
                  <span style={{ fontFamily: mono, fontSize: 21, color: v.niebla }}>{sim.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </Tarjeta>
        <Tarjeta caja={N2} at={cReunir + 13} Icono={BrainCircuit} rol="Nodo 2 · LLM" titulo="Razonar" sub="Gemini · Vertex AI" activo={activo === 1}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, opacity: frame >= cValida ? 1 : 0 }}>
            <Braces size={24} strokeWidth={1.6} color={ok > 0.5 ? s.tipo : v.ceniza} />
            <span style={{ fontFamily: mono, fontSize: 22, color: v.niebla }}>esquema JSON</span>
            <span style={{ fontSize: 26, color: s.tipo, display: "inline-block", transform: `scale(${ok})` }}>✓</span>
          </div>
        </Tarjeta>
        <Tarjeta caja={N3} at={cReunir + 16} Icono={Save} rol="Nodo 3" titulo="Guardar" sub="si tipo = producto" activo={activo === 2} />
      </Escenario>
    </Escena>
  );
};

// ─── Por qué un grafo: si falla, el backend llama directo al modelo ──────────
export const Porque: React.FC = () => {
  const frame = useCurrentFrame();
  const cPlanB = useCue("planb");
  const cCada = useCueAt("planb", 0.5);
  const cDirecto = useCue("directo");
  const cNunca = useCueAt("directo", 0.55);
  const BE: Caja = { x: 0, y: 100, w: 400, h: 164 };
  const LLM: Caja = { x: 512, y: 100, w: 400, h: 164 };
  const GR: Caja = { x: 256, y: 330, w: 400, h: 164 };
  const US: Caja = { x: 512, y: 560, w: 400, h: 164 };
  const falla = frame >= cDirecto + 4;
  return (
    <Escena>
      <Rotulo at={cPlanB}>¿Por qué un grafo?</Rotulo>
      <Cinetico at={cPlanB + 4} texto="Cada nodo|se prueba *solo.*" style={{ marginTop: 18 }} />
      <Sube at={cCada}>
        <Lectura style={{ marginTop: 14 }}>se mide solo · tiene su propio plan B</Lectura>
      </Sube>
      <Escenario alto={730} style={{ marginTop: 10 }}>
        <Cables alto={730}>
          <Cable de={ancla(BE, "b")} a={ancla(GR, "l")} at={cPlanB + 16} opacidad={falla ? 0.35 : 1} flujo={{ desde: cPlanB + 30, hasta: cDirecto + 4 }} />
          <Cable de={ancla(GR, "r")} a={ancla(LLM, "b")} at={cPlanB + 20} opacidad={falla ? 0.35 : 1} flujo={{ desde: cPlanB + 44, hasta: cDirecto + 4 }} />
          <Cable de={ancla(BE, "t")} a={ancla(LLM, "t")} at={cDirecto + 16} ms={800} curvatura={0.16} color={v.iris} etiqueta="plan B · directo" flujo={{ desde: cDirecto + 40, periodo: 44, n: 2, color: v.iris }} />
          <Cable de={ancla(LLM, "r")} a={ancla(US, "r")} at={cNunca} ms={600} curvatura={0.12} envios={[{ at: cNunca + 10, ms: 700, color: s.tipo }]} />
        </Cables>
        <Tarjeta caja={BE} at={cPlanB + 8} Icono={Server} rol="Backend" titulo="FastAPI" sub="recibe la petición" />
        <Tarjeta caja={GR} at={cPlanB + 11} Icono={falla ? TriangleAlert : Workflow} rol="Agente" titulo="LangGraph" sub={falla ? "falló un nodo" : "grafo de 3 nodos"} error={falla} />
        <Tarjeta caja={LLM} at={cPlanB + 14} Icono={BrainCircuit} rol="Modelo" titulo="Gemini" sub="Vertex AI" activo={frame >= cDirecto + 40} />
        <Tarjeta caja={US} at={cNunca + 4} Icono={User} rol="Usuario" titulo="200 OK" sub="nunca ve el error" activo />
      </Escenario>
    </Escena>
  );
};

// ─── El frontend: un navegador que pide, espera y pinta ──────────────────────
export const Frontend: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cNoSabe = useCue("nosabe");
  const cTipado = useCue("tipado");
  const cRecibe = useCueAt("tipado", 0.62);
  const cRender = useCue("renderizar");
  const NAV: Caja = { x: 0, y: 56, w: 912, h: 350 };
  const BE: Caja = { x: 0, y: 520, w: 440, h: 164 };
  const cursor = transicion(frame, cTipado - 14, fps, 600, EXPO_IN_OUT);
  const click = frame >= cTipado + 4 && frame < cTipado + 10;
  const cargando = frame >= cTipado + 8 && frame < cRecibe + 24;
  const pinta = (i: number) => transicion(frame, cRecibe + 24 + i * 5, fps, 500, EXPO_OUT);
  return (
    <Escena>
      <Rotulo at={cNoSabe}>Frontend</Rotulo>
      <Cinetico at={cNoSabe + 4} texto="No sabe que|hay un *grafo.*" style={{ marginTop: 18 }} />
      <Escenario alto={700} style={{ marginTop: 30 }}>
        <Cables alto={700}>
          <Cable
            de={ancla(NAV, "b", BE.x + BE.w / 2 - NAV.w / 2)}
            a={ancla(BE, "t")}
            at={cNoSabe + 16}
            etiqueta={frame < cRecibe ? "POST /api/agente" : "200 · JSON"}
            envios={[
              { at: cTipado + 8, ms: 800 },
              { at: cRecibe, ms: 800, reverso: true, color: v.hueso },
            ]}
          />
        </Cables>
        <Sube at={cNoSabe + 4} style={{ position: "absolute", left: 0, top: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <AppWindow size={30} strokeWidth={1.6} color={v.azafran} />
            <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: "0.1em", color: v.azafran }}>FRONTEND</span>
            <span style={{ fontSize: 28, fontWeight: 200, color: v.niebla }}>· React + TypeScript</span>
          </div>
        </Sube>
        <Navegador caja={NAV} at={cNoSabe + 6} url="app.empresa.com/revision">
          <div style={{ display: "flex", gap: 28 }}>
            <div style={{ width: 380, flexShrink: 0 }}>
              <div style={{ fontSize: 36, fontWeight: 400, letterSpacing: "-0.02em" }}>Revisión del agente</div>
              <div style={{ fontSize: 24, fontWeight: 200, color: v.ceniza, marginTop: 4 }}>actividad #42</div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 30 }}>
                <div style={{ padding: "14px 26px", borderRadius: 999, background: v.iris, fontSize: 24, fontWeight: 600, letterSpacing: "0.04em", transform: `scale(${click ? 0.94 : 1})` }}>Revisar con IA</div>
                {cargando ? <Cargando tam={40} /> : null}
              </div>
            </div>
            <div style={{ flex: 1, borderRadius: 18, border: `1.5px solid ${linea}`, padding: "18px 20px", opacity: pinta(0), transform: `translateY(${(1 - pinta(0)) * 16}px)` }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Chip texto="tipo: producto" activo />
                <Chip texto="modificar" />
              </div>
              <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 16 }}>confianza</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
                <div style={{ flex: 1, height: 12, borderRadius: 6, background: linea }}>
                  <div style={{ height: 12, borderRadius: 6, width: `${82 * pinta(1)}%`, background: v.azafran }} />
                </div>
                <span style={{ fontFamily: mono, fontSize: 24 }}>{Math.round(82 * pinta(1))}%</span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 14, opacity: pinta(2) }}>3 fuentes citadas</div>
            </div>
          </div>
          <div style={{ position: "absolute", left: 150 + (1 - cursor) * 300, top: 150 + (1 - cursor) * 200, opacity: frame >= cTipado - 14 && frame < cTipado + 30 ? 1 : 0 }}>
            <MousePointer2 size={40} strokeWidth={1.6} color={v.hueso} fill={v.vacio} />
          </div>
        </Navegador>
        <Tarjeta caja={BE} at={cNoSabe + 12} Icono={Server} rol="Backend" titulo="FastAPI" sub="endpoint del agente" activo={cargando} />
        <div style={{ position: "absolute", left: 500, top: BE.y + 10, opacity: transicion(frame, cRender, fps, 500, EXPO_OUT) }}>
          <div style={{ ...tipo.subtitulo, fontSize: 60 }}>Renderiza.</div>
          <div style={{ ...tipo.subtitulo, fontSize: 60, color: v.azafran }}>No razona.</div>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El backend: carpetas por capacidad y auth inyectada ─────────────────────
export const Backend: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cReb = useCue("rebanadas");
  const cCapas = useCueAt("rebanadas", 0.4);
  const cAuth = useCue("auth");
  const cInyecta = useCueAt("auth", 0.5);
  const columnas = ["agente", "conocimiento", "usuarios", "calendario"];
  const archivos: [string, string][] = [
    ["router.py", "solo HTTP"],
    ["service.py", "lógica + IA"],
    ["schema.py", "tipos"],
  ];
  // Dos filas de capacidades y, entre ellas, la autenticación que se inyecta hacia arriba y hacia abajo.
  const AUTH: Caja = { x: 0, y: 300, w: 912, h: 150 };
  const col = (i: number): Caja => ({ x: (i % 2) * 472, y: i < 2 ? 60 : 490, w: 440, h: 200 });
  return (
    <Escena>
      <Rotulo at={cReb}>Backend</Rotulo>
      <Cinetico at={cReb + 4} texto="Rebanadas|*verticales.*" style={{ marginTop: 18 }} />
      <Escenario alto={700} style={{ marginTop: 30 }}>
        <Cables alto={700}>
          {columnas.map((c, i) => (
            <Cable
              key={c}
              de={i < 2 ? ancla({ ...AUTH, x: col(i).x, w: col(i).w }, "t") : ancla({ ...AUTH, x: col(i).x, w: col(i).w }, "b")}
              a={ancla(col(i), i < 2 ? "b" : "t")}
              at={cInyecta + i * 3}
              ms={400}
              color={v.azafran}
              curvatura={0.2}
              envios={[{ at: cInyecta + 10 + i * 3, ms: 500 }]}
            />
          ))}
        </Cables>
        <Sube at={cReb + 6}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: mono, fontSize: 27, color: v.hueso }}>
            <Network size={30} strokeWidth={1.6} color={v.ceniza} /> main.py <span style={{ fontFamily: fuenteSans, fontWeight: 200, color: v.niebla }}>· solo conecta los routers</span>
          </div>
        </Sube>
        {columnas.map((c, i) => {
          const k = resorte(frame, cReb + 10 + i * 4, fps, { k: 140, c: 16 });
          const caja = col(i);
          return (
            <div key={c} style={{ position: "absolute", left: caja.x, top: caja.y, width: caja.w, height: caja.h, boxSizing: "border-box", borderRadius: 20, border: `${i === 0 ? 2.5 : 1.5}px solid ${i === 0 ? v.azafran : linea}`, background: "#0A0A0D", padding: "16px 20px", opacity: Math.min(1, k * 1.6), transform: `translateY(${(1 - k) * 40}px)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: mono, fontSize: 27, color: i === 0 ? v.azafran : v.hueso }}>
                <Folder size={30} strokeWidth={1.6} color={i === 0 ? v.azafran : v.ceniza} /> {c}/
              </div>
              {archivos.map(([f, d], j) => {
                const a = transicion(frame, cCapas + j * 5 + i * 2, fps, 500, EXPO_OUT);
                const protegido = j === 0 && frame >= cInyecta + 20 + i * 3;
                return (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, opacity: a, transform: `translateX(${(1 - a) * 14}px)` }}>
                    <FileCode2 size={24} strokeWidth={1.6} color={v.ceniza} />
                    <span style={{ fontFamily: mono, fontSize: 24, color: v.hueso, width: 160 }}>{f}</span>
                    <span style={{ fontSize: 23, fontWeight: 200, color: v.niebla }}>{d}</span>
                    {protegido ? <ShieldCheck size={26} strokeWidth={1.8} color={v.azafran} style={{ marginLeft: "auto" }} /> : null}
                  </div>
                );
              })}
            </div>
          );
        })}
        <Tarjeta caja={AUTH} at={cAuth} Icono={ShieldCheck} rol="Autenticación inyectada" titulo="Depends(usuario)" sub="ningún endpoint la escribe a mano" activo={frame >= cInyecta} />
      </Escenario>
    </Escena>
  );
};
const fuenteSans = "Inter, sans-serif";

// ─── La nube: los servicios de Google Cloud y sus equivalentes ───────────────
export const Nube: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cAdm = useCue("administrados");
  const cBases = useCue("bases");
  const cProxy = useCue("proxy");
  const marco = transicion(frame, cAdm - 4, fps, 600, EXPO_OUT);
  const c = (col: number, fila: number): Caja => ({ x: 20 + col * 446, y: 92 + fila * 200, w: 426, h: 184 });
  const IAP = c(0, 0);
  const RUN = c(1, 0);
  const LLM = c(0, 1);
  const EMB = c(1, 1);
  const FS = c(0, 2);
  const SQL = c(1, 2);
  return (
    <Escena>
      <Rotulo at={cAdm}>Infraestructura</Rotulo>
      <Cinetico at={cAdm + 4} texto="Todo|*administrado.*" style={{ marginTop: 18 }} />
      <Escenario alto={720} style={{ marginTop: 26 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 912, height: 712, boxSizing: "border-box", borderRadius: 28, border: `2px dashed ${linea}`, opacity: marco }} />
        <Sube at={cAdm - 2} style={{ position: "absolute", left: 24, top: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Cloud size={40} strokeWidth={1.6} color={v.hueso} />
            <span style={{ fontSize: 40, fontWeight: 400, letterSpacing: "-0.02em" }}>Google Cloud</span>
            <span style={{ fontSize: 26, fontWeight: 200, color: v.ceniza }}>· GCP</span>
          </div>
        </Sube>
        <Sube at={cProxy + 50} style={{ position: "absolute", right: 24, top: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 22, fontWeight: 200, color: v.ceniza }}>
            equivalente en <Chip texto="AWS" activo /> <Chip texto="Azure" activo />
          </div>
        </Sube>
        <Cables alto={720}>
          <Cable de={punto(IAP.x + IAP.w / 2, -50, [0, 1])} a={ancla(IAP, "t")} at={cProxy + 20} ms={500} curvatura={0.2} flujo={{ desde: cProxy + 34, periodo: 40, n: 2 }} />
          <Cable de={ancla(IAP, "r")} a={ancla(RUN, "l")} at={cProxy + 26} ms={500} flujo={{ desde: cProxy + 40, periodo: 40, n: 2 }} />
          <Cable de={ancla(RUN, "b", -80)} a={ancla(LLM, "t", 80)} at={cProxy + 32} ms={500} curvatura={0.25} flujo={{ desde: cProxy + 46, periodo: 44, n: 1 }} />
          <Cable de={ancla(RUN, "b", 40)} a={ancla(EMB, "t", 40)} at={cProxy + 34} ms={500} curvatura={0.2} flujo={{ desde: cProxy + 48, periodo: 44, n: 1 }} />
        </Cables>
        <Tarjeta caja={LLM} at={cAdm + 8} Icono={BrainCircuit} rol="LLM · Gemini" titulo="Vertex AI" nota={"AWS Bedrock\nAzure OpenAI"} activo={frame >= cAdm + 8 && frame < cBases} />
        <Tarjeta caja={EMB} at={cAdm + 16} Icono={Binary} rol="Embeddings" titulo="Vertex AI" nota={"AWS Titan\nAzure OpenAI"} activo={frame >= cAdm + 16 && frame < cBases} />
        <Tarjeta caja={FS} at={cBases} Icono={DatabaseZap} rol="Vectores" titulo="Firestore" nota={"AWS OpenSearch\nAzure AI Search"} activo={frame >= cBases && frame < cProxy} />
        <Tarjeta caja={SQL} at={cBases + 10} Icono={Database} rol="Relacional" titulo="Cloud SQL" nota={"AWS RDS\nAzure SQL"} activo={frame >= cBases + 10 && frame < cProxy} />
        <Tarjeta caja={RUN} at={cProxy} Icono={Container} rol="Contenedores" titulo="Cloud Run" nota={"AWS App Runner\nAzure Container Apps"} activo={frame >= cProxy} />
        <Tarjeta caja={IAP} at={cProxy + 12} Icono={ShieldCheck} rol="Identidad" titulo="IAP" nota={"AWS Cognito\nAzure Entra ID"} activo={frame >= cProxy + 12} />
      </Escenario>
    </Escena>
  );
};

// ─── Configuración por ambiente e infraestructura como código ────────────────
export const Config: React.FC = () => {
  const frame = useCurrentFrame();
  const cAmb = useCue("ambientes");
  const cIac = useCue("iac");
  const pasos = [cAmb + 6, cAmb + 40, cAmb + 74];
  const sel = frame >= pasos[2] ? 2 : frame >= pasos[1] ? 1 : 0;
  const env = ["local", "dev", "prod"][sel];
  return (
    <Escena>
      <Rotulo at={cAmb}>Configuración</Rotulo>
      <Cinetico at={cAmb + 4} texto="Lo que cambia,|*no es código.*" style={{ marginTop: 18 }} />
      <Escenario alto={680} style={{ marginTop: 30 }}>
        <Codigo
          caja={{ x: 0, y: 0, w: 912, h: 330 }}
          at={cAmb + 8}
          archivo={`application-${env}.yaml`}
          Icono={Layers}
          resaltar={[0]}
          derecha={["local", "dev", "prod"].map((e, i) => <Chip key={e} texto={e} activo={sel === i} />)}
          lineas={[
            [["proyecto", s.clave], [": "], [`mi-app-${env}`, s.valor]],
            [["modelo", s.clave], [": "], ["gemini-2.5-flash", s.texto]],
            [["temperatura", s.clave], [": "], ["0.1", s.texto]],
            [["umbral_similitud", s.clave], [": "], ["0.87", s.texto]],
            [["trozo", s.clave], [": "], ["800", s.texto], ["   # traslape 150", s.tenue]],
          ]}
        />
        <Codigo
          caja={{ x: 0, y: 380, w: 912, h: 290 }}
          at={cIac}
          archivo="infra/main.tf"
          Icono={FileCode2}
          derecha={["dev", "int", "prod"].map((e, i) => <Chip key={e} texto={e} activo={frame >= cIac + 30 + i * 12} />)}
          lineas={[
            [["resource ", s.clave], ['"google_cloud_run_v2_service"', s.valor]],
            [["resource ", s.clave], ['"google_firestore_database"', s.valor]],
            [["resource ", s.clave], ['"google_service_account"', s.valor]],
            [["# un workspace por ambiente", s.tenue]],
          ]}
        />
      </Escenario>
    </Escena>
  );
};

// ─── En producción: tres detalles con su código ──────────────────────────────
const Fila: React.FC<{ at: number; y: number; n: string; titulo: React.ReactNode; detalle: string; Icono: typeof Timer; codigo: React.ReactNode; children: React.ReactNode }> = ({ at, y, n, titulo, detalle, Icono, codigo, children }) => (
  <Sube at={at} style={{ position: "absolute", left: 0, top: y, width: 912 }}>
    <div style={{ display: "flex", gap: 30 }}>
      <div style={{ width: 480, flexShrink: 0, borderRadius: 20, border: `1.5px solid ${linea}`, background: "#0A0A0D", padding: "16px 20px", boxSizing: "border-box" }}>
        <div style={{ fontFamily: mono, fontSize: 25, lineHeight: 1.6, whiteSpace: "pre" }}>{codigo}</div>
        <div style={{ marginTop: 10 }}>{children}</div>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, ...tipo.dato, color: v.ceniza }}>
          <Icono size={30} strokeWidth={1.6} color={v.azafran} /> {n}
        </div>
        <div style={{ ...tipo.titulo, fontSize: 68, marginTop: 6 }}>{titulo}</div>
        <Lectura style={{ fontSize: 28, marginTop: 8 }}>{detalle}</Lectura>
      </div>
    </div>
  </Sube>
);

export const Detalles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cAsync = useCue("async");
  const cSingle = useCue("singleton");
  const cSalud = useCue("salud");
  const carril = (i: number) => (((frame - cAsync - i * 5) / (40 + i * 12)) % 1 + 1) % 1;
  const pulso = (((frame - cSalud) % 45) + 45) % 45 / 45;
  const ecg = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    const yy = t > 0.42 && t < 0.58 ? Math.sin(((t - 0.42) / 0.16) * Math.PI * 2) * (t < 0.5 ? 26 : 14) : 0;
    return [t * 420, 32 - yy] as [number, number];
  });
  const vis = Math.max(2, Math.min(ecg.length, Math.floor(pulso * ecg.length * 1.4)));
  const consumidores = ["conocimiento", "temas", "agente"];
  return (
    <Escena>
      <Rotulo at={cAsync}>En producción</Rotulo>
      <Escenario alto={980} style={{ marginTop: 30 }}>
        <Fila
          at={cAsync}
          y={0}
          n="01"
          Icono={Timer}
          titulo="Asíncrono."
          detalle="ninguna llamada bloquea el servidor"
          codigo={
            <>
              <span style={{ color: s.clave }}>await</span> asyncio.<span style={{ color: s.valor }}>to_thread</span>(
              {"\n"}    firestore.stream)
            </>
          }
        >
          {["RAG", "memoria", "LLM"].map((r, i) => (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
              <span style={{ fontFamily: mono, fontSize: 21, color: v.niebla, width: 110 }}>{r}</span>
              <div style={{ flex: 1, height: 10, borderRadius: 5, background: linea, position: "relative" }}>
                <div style={{ position: "absolute", left: `${carril(i) * 80}%`, width: "20%", height: 10, borderRadius: 5, background: v.azafran }} />
              </div>
            </div>
          ))}
        </Fila>
        <Fila
          at={cSingle}
          y={340}
          n="02"
          Icono={Plug}
          titulo={
            <>
              Clientes <span style={{ color: v.azafran }}>×1.</span>
            </>
          }
          detalle="se crean una vez y se reutilizan"
          codigo={
            <>
              cliente = <span style={{ color: s.valor }}>get_client</span>()
              {"\n"}
              <span style={{ color: s.tenue }}># una instancia por proceso</span>
            </>
          }
        >
          <div style={{ display: "flex", gap: 10 }}>
            {consumidores.map((c2, i) => (
              <Chip key={c2} texto={c2} activo={Math.floor((frame - cSingle) / 15) % 3 === i && frame >= cSingle} />
            ))}
          </div>
        </Fila>
        <Fila
          at={cSalud}
          y={660}
          n="03"
          Icono={HeartPulse}
          titulo={
            <>
              /health <span style={{ color: v.azafran }}>200</span>
            </>
          }
          detalle="sin auth: la plataforma sabe que vive"
          codigo={
            <>
              <span style={{ color: s.clave }}>GET</span> /health → <span style={{ color: s.tipo }}>200 OK</span>
            </>
          }
        >
          <svg width={440} height={64}>
            <path d={`M${ecg.slice(0, vis).map((p) => `${p[0]},${p[1]}`).join("L")}`} fill="none" stroke={v.azafran} strokeWidth={3} strokeLinejoin="round" />
            <circle cx={ecg[vis - 1][0]} cy={ecg[vis - 1][1]} r={5} fill={v.azafran} opacity={transicion(frame, cSalud, fps, 300, EXPO_OUT)} />
          </svg>
        </Fila>
      </Escenario>
    </Escena>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const frame = useCurrentFrame();
  const cCerebro = useCue("cerebro");
  const cSin = useCueAt("cerebro", 0.45);
  const cCta = useCue("cta");
  const piezas: { Icono: typeof Server; rol: string; titulo: string }[] = [
    { Icono: AppWindow, rol: "Frontend", titulo: "React" },
    { Icono: Server, rol: "Backend", titulo: "FastAPI" },
    { Icono: Cloud, rol: "Nube", titulo: "GCP" },
  ];
  return (
    <Escena>
      <div style={{ position: "absolute", left: -80, right: -80, top: -90, display: "flex", justifyContent: "center" }}>
        <Constelacion at={cCerebro - 30} ancho={700} forma="cerebro" desde="red" cambio={cCerebro} />
      </div>
      <div style={{ marginTop: 480 }}>
        <Cinetico at={cCerebro} texto="Cerebro|con *cuerpo.*" style={{ fontSize: 100 }} />
        <Escenario alto={140} style={{ marginTop: 30 }}>
          {piezas.map((p, i) => (
            <Tarjeta key={p.rol} caja={{ x: i * 312, y: 0, w: 288, h: 132 }} at={cSin + i * 5} Icono={p.Icono} rol={p.rol} titulo={p.titulo} activo={frame >= cSin + 20 + i * 5 && frame < cSin + 40 + i * 5} />
          ))}
        </Escenario>
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 8}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
      </div>
    </Escena>
  );
};
