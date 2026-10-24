import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { clamp, Pop, useEase, useSpring, WordsIn } from "../../components/motion";
import { useCue, useCueAt } from "../../components/narracion";
import { Glass, GradientText, Note } from "../../components/ui";
import { Title } from "../../components/comun";
import {
  BaseDatos,
  Burbuja,
  Chip,
  Documento,
  Engranaje,
  Escudo,
  Flecha,
  Lupa,
  paletas,
  Persona,
  RelojArena,
} from "../../components/iconos";
import { colors, fonts, gradients } from "../../theme";
import { ambientes, configurable, estado, nodos, nube, rebanada, respuesta } from "./data";

const big: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 800, letterSpacing: -5, lineHeight: 1 };
const mono: React.CSSProperties = { fontFamily: "'Figtree', monospace", fontWeight: 700, letterSpacing: 0 };

const Float: React.FC<{ children: React.ReactNode; amp?: number; phase?: number }> = ({ children, amp = 10, phase = 0 }) => {
  const frame = useCurrentFrame();
  return <div style={{ transform: `translateY(${Math.sin(frame * 0.06 + phase) * amp}px)` }}>{children}</div>;
};

const Etiq: React.FC<{ children: React.ReactNode; color?: string; size?: number }> = ({ children, color = colors.dim, size = 34 }) => (
  <div style={{ fontFamily: fonts.display, fontSize: size, fontWeight: 700, color, textAlign: "center", whiteSpace: "nowrap" }}>{children}</div>
);

// Nodo circular del grafo.
const Nodo: React.FC<{ icono: React.ReactNode; texto: string; activo: boolean; listo: boolean; size?: number }> = ({ icono, texto, activo, listo, size = 130 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: size + 40 }}>
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        background: listo ? gradients.cool : colors.glassStrong,
        border: `2px solid ${colors.line}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: activo ? "0 0 40px rgba(34,211,238,0.6)" : "none",
        transform: `scale(${activo ? 1.08 : 1})`,
      }}
    >
      {icono}
    </div>
    <Etiq size={24} color={colors.text}>
      {texto}
    </Etiq>
  </div>
);

// Tres cajas: interfaz, servidor, nube.
const Caja: React.FC<{ icono: React.ReactNode; texto: string; activa?: boolean; gradient?: string }> = ({ icono, texto, activa = false, gradient = gradients.cool }) => (
  <div
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      padding: "18px 10px",
      borderRadius: 24,
      background: activa ? gradient : colors.glass,
      border: `1.5px solid ${colors.line}`,
      boxShadow: activa ? "0 0 40px rgba(34,211,238,0.4)" : "none",
    }}
  >
    {icono}
    <Etiq size={28} color={activa ? colors.bg : colors.text}>
      {texto}
    </Etiq>
  </div>
);

// Gancho: el prompt tachado y las tres capas donde vive el agente.
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const cDonde = useCue("donde");
  const cNo = useCueAt("donde", 0.55);
  const cConv = useCue("conversan");
  const tacha = useSpring(cNo, { damping: 10 });
  const latido = 1 + 0.04 * Math.sin(frame * 0.2);
  return (
    <SceneShell entrada="none">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 46 }}>
        <Pop at={cDonde} from="zoom">
          <div style={{ ...big, fontSize: 120, textAlign: "center", transform: `scale(${latido})` }}>
            <GradientText gradient={gradients.cool}>¿Dónde vive?</GradientText>
          </div>
        </Pop>
        <Pop at={cDonde + 8} from="zoom" style={{ position: "relative" }}>
          <Burbuja size={260} texto="prompt" />
          <div style={{ position: "absolute", left: 80, top: -30, ...big, fontSize: 190, color: colors.pink, opacity: tacha, transform: `scale(${0.6 + 0.4 * tacha}) rotate(-12deg)` }}>✕</div>
        </Pop>
        <div style={{ display: "flex", gap: 16, width: 880 }}>
          {[
            { at: cConv, icono: <Engranaje size={80} />, texto: "grafo" },
            { at: cConv + 6, icono: <Escudo size={80} />, texto: "servidor" },
            { at: cConv + 12, icono: <BaseDatos size={80} />, texto: "nube" },
          ].map((c) => (
            <Pop key={c.texto} at={c.at} from="up" style={{ flex: 1, display: "flex" }}>
              <Caja icono={c.icono} texto={c.texto} />
            </Pop>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ serie, autor }) => (
  <SceneShell entrada="zoom">
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
      <Pop at={2}>
        <div style={{ fontFamily: fonts.display, fontSize: 40, fontWeight: 600, color: colors.dim }}>{serie} · 02</div>
      </Pop>
      <div style={{ ...big, letterSpacing: -6, lineHeight: 0.98 }}>
        <Pop at={4} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ fontSize: 160, letterSpacing: -8 }}>
            <GradientText gradient={gradients.cool}>El agente</GradientText>
          </div>
        </Pop>
        <WordsIn at={12} stagger={3} text="como grafo de estados" style={{ fontSize: 112, display: "block", marginTop: 10 }} />
      </div>
      <Pop at={24}>
        <Note style={{ fontSize: 30, marginTop: 20 }}>por {autor}</Note>
      </Pop>
    </div>
  </SceneShell>
);

// El estado: un objeto que se va llenando al pasar por los nodos.
export const Estado: React.FC = () => {
  const frame = useCurrentFrame();
  const cObj = useCue("objeto");
  const cCampos = useCueAt("objeto", 0.45);
  const cPasa = useCue("pasa");
  const avanza = useEase(cPasa + 4, 50);
  const paso = Math.min(2, Math.floor(avanza * 3));
  return (
    <SceneShell entrada="rise">
      <Title at={cObj} gradient={gradients.cool} size={104} sub="un objeto que viaja por los nodos">
        El estado
      </Title>
      <Pop at={cObj + 6} style={{ display: "flex", justifyContent: "center" }}>
        <Glass style={{ width: 620, padding: "26px 34px" }}>
          <div style={{ ...mono, fontSize: 30, color: colors.dim }}>estado {"{"}</div>
          {estado.map((k, i) => {
            const vis = interpolate(frame, [cCampos + i * 6, cCampos + i * 6 + 8], [0, 1], clamp);
            const lleno = i < 2 || (i === 2 && paso >= 1) || (i === 3 && paso >= 1) || (i === 4 && paso >= 2);
            return (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: 30, marginTop: 8, opacity: vis }}>
                <div style={{ ...mono, fontSize: 30, color: colors.cyan }}>{k}:</div>
                <div style={{ height: 22, width: lleno ? 160 : 60, borderRadius: 11, background: lleno ? gradients.gold : colors.glassStrong, border: `1.5px solid ${colors.line}` }} />
              </div>
            );
          })}
          <div style={{ ...mono, fontSize: 30, color: colors.dim, marginTop: 8 }}>{"}"}</div>
        </Glass>
      </Pop>
      <Pop at={cPasa} style={{ marginTop: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {nodos.map((n, i) => (
          <React.Fragment key={n.nombre}>
            <Nodo icono={[<Lupa size={64} paleta={paletas.blanco} key="l" />, <Chip size={64} paleta={paletas.blanco} key="c" />, <BaseDatos size={64} paleta={paletas.blanco} key="b" />][i]} texto={n.nombre} activo={paso === i} listo={paso >= i} size={120} />
            {i < 2 ? (
              <div style={{ marginTop: 40, opacity: paso > i ? 1 : 0.3 }}>
                <Flecha up color={colors.cyan} size={50} />
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </Pop>
    </SceneShell>
  );
};

// Los tres nodos en detalle, con la rama paralela del primero.
export const Nodos: React.FC = () => {
  const frame = useCurrentFrame();
  const cReunir = useCue("reunir");
  const cParalelo = useCueAt("reunir", 0.55);
  const cRazonar = useCue("razonar");
  const cValida = useCueAt("razonar", 0.75);
  const cGuardar = useCue("guardar");
  const cCond = useCueAt("guardar", 0.6);
  const ok = useSpring(cValida, { damping: 10 });
  const cond = useSpring(cCond, { damping: 10 });
  const fila = (at: number, n: string, icono: React.ReactNode, texto: string, contenido: React.ReactNode) => (
    <Pop at={at} from="left">
      <Glass style={{ display: "flex", alignItems: "center", gap: 22, padding: "18px 26px", height: 230 }}>
        <div style={{ ...big, fontSize: 70, width: 50 }}>
          <GradientText gradient={gradients.cool}>{n}</GradientText>
        </div>
        <div style={{ width: 100, display: "flex", justifyContent: "center" }}>{icono}</div>
        <div style={{ flex: 1 }}>
          <Etiq color={colors.text} size={36}>
            {texto}
          </Etiq>
          <div style={{ marginTop: 10 }}>{contenido}</div>
        </div>
      </Glass>
    </Pop>
  );
  const pastilla = (t: string, on: boolean, g = gradients.gold) => (
    <div style={{ padding: "8px 16px", borderRadius: 999, background: on ? g : colors.glassStrong, border: `1.5px solid ${colors.line}`, fontSize: 24, fontWeight: 700, color: on ? colors.bg : colors.dim, whiteSpace: "nowrap" }}>{t}</div>
  );
  return (
    <SceneShell entrada="zoom">
      <Title at={cReunir} gradient={gradients.gold} size={104}>
        Tres nodos
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {fila(
          cReunir,
          "1",
          <Lupa size={80} />,
          "reunir contexto",
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {pastilla("búsqueda RAG", frame >= cParalelo)}
              {pastilla("memoria del tema", frame >= cParalelo)}
            </div>
            <Note style={{ fontSize: 26, opacity: frame >= cParalelo ? 1 : 0 }}>en paralelo</Note>
          </div>,
        )}
        {fila(
          cRazonar,
          "2",
          <Chip size={80} />,
          "razonar",
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {pastilla("prompt + contexto", true, gradients.cool)}
            <Flecha up color={colors.cyan} size={30} />
            {pastilla("modelo", true, gradients.cool)}
            <Flecha up color={colors.cyan} size={30} />
            <div style={{ position: "relative" }}>
              {pastilla("esquema", ok > 0.5, "linear-gradient(135deg,#7CF29A,#22B07D)")}
              <div style={{ position: "absolute", right: -16, top: -20, ...big, fontSize: 40, color: "#7CF29A", opacity: ok, transform: `scale(${ok})` }}>✓</div>
            </div>
          </div>,
        )}
        {fila(
          cGuardar,
          "3",
          <BaseDatos size={80} />,
          "guardar",
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ ...mono, fontSize: 26, color: colors.gold, opacity: cond }}>si tipo == producto</div>
            <Flecha up color={colors.gold} size={30} />
            {pastilla("persistir aprendizajes", cond > 0.5)}
          </div>,
        )}
      </div>
    </SceneShell>
  );
};

// Por qué grafo: cada nodo se prueba y tiene plan B; si todo falla, llamada directa.
export const Porque: React.FC = () => {
  const frame = useCurrentFrame();
  const cPlanB = useCue("planb");
  const cCada = useCueAt("planb", 0.5);
  const cDirecto = useCue("directo");
  const cNunca = useCueAt("directo", 0.6);
  const rompe = useSpring(cDirecto + 4, { damping: 8 });
  const directo = useEase(cDirecto + 14, 30);
  return (
    <SceneShell entrada="tilt">
      <Title at={cPlanB} gradient={gradients.cool} size={104} sub="y no una cadena de prompts">
        ¿Por qué un grafo?
      </Title>
      <Pop at={cCada} style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        {["se prueba solo", "se mide solo", "plan B propio"].map((t, i) => (
          <Pop key={t} at={cCada + i * 6} from="up" style={{ flex: 1, display: "flex" }}>
            <Glass style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "18px 10px" }}>
              {[<Lupa size={60} key="l" />, <Engranaje size={60} key="e" />, <Escudo size={60} paleta={paletas.cobre} key="s" />][i]}
              <Etiq size={26} color={colors.text}>
                {t}
              </Etiq>
            </Glass>
          </Pop>
        ))}
      </Pop>
      <Pop at={cDirecto} style={{ position: "relative", height: 330, marginTop: 40 }}>
        <svg width={900} height={330} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <line x1={120} y1={90} x2={780} y2={90} stroke={colors.line} strokeWidth={6} />
          <g opacity={rompe}>
            <path d={`M${450 - 30 * rompe} ${60} L${450} ${90} L${450 - 30 * rompe} ${120}`} stroke={colors.pink} strokeWidth={8} fill="none" strokeLinecap="round" />
            <path d={`M${450 + 30 * rompe} ${60} L${450} ${90} L${450 + 30 * rompe} ${120}`} stroke={colors.pink} strokeWidth={8} fill="none" strokeLinecap="round" />
          </g>
          <path d="M120 90 C 120 260, 780 260, 780 90" stroke={colors.gold} strokeWidth={8} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - directo} />
          <text x={450} y={250} textAnchor="middle" fontSize={30} fontWeight={800} fill={colors.gold} fontFamily="'Bricolage Grotesque', sans-serif" opacity={directo}>
            llamada directa al modelo
          </text>
        </svg>
        <div style={{ position: "absolute", left: 50, top: 20 }}>
          <Escudo size={130} />
        </div>
        <div style={{ position: "absolute", left: 385, top: 30, opacity: 1 - rompe * 0.6 }}>
          <Engranaje size={120} />
        </div>
        <div style={{ position: "absolute", left: 720, top: 20 }}>
          <Chip size={130} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 290, textAlign: "center", opacity: interpolate(frame, [cNunca, cNunca + 10], [0, 1], clamp) }}>
          <Etiq size={34} color={colors.text}>
            el usuario nunca ve el error
          </Etiq>
        </div>
      </Pop>
    </SceneShell>
  );
};

// Frontend: petición, carga, objeto tipado.
export const Frontend: React.FC = () => {
  const frame = useCurrentFrame();
  const cNoSabe = useCue("nosabe");
  const cTipado = useCue("tipado");
  const cCarga = useCueAt("tipado", 0.35);
  const cRecibe = useCueAt("tipado", 0.6);
  const cRender = useCue("renderizar");
  const viaja = useEase(cTipado + 4, 24);
  const vuelve = useEase(cRecibe, 24);
  const gira = frame * 6;
  return (
    <SceneShell entrada="slide">
      <Title at={cNoSabe} gradient={gradients.gold} size={104} sub="no sabe que hay un grafo">
        La interfaz
      </Title>
      <Pop at={cNoSabe + 6} style={{ position: "relative", height: 260 }}>
        <div style={{ position: "absolute", left: 0, top: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Persona size={130} />
          <Etiq size={26}>interfaz</Etiq>
        </div>
        <div style={{ position: "absolute", right: 0, top: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Glass style={{ padding: "16px 20px", borderRadius: 24 }}>
            <Engranaje size={90} />
          </Glass>
          <Etiq size={26}>endpoint</Etiq>
        </div>
        <div style={{ position: "absolute", left: 150 + viaja * 560, top: 40, opacity: viaja > 0 && vuelve < 1 ? 1 : 0 }}>
          <Burbuja size={120} texto="POST" paleta={paletas.calido} />
        </div>
        <div style={{ position: "absolute", left: 150 + (1 - vuelve) * 560, top: 140, opacity: vuelve > 0 ? 1 : 0 }}>
          <Documento size={90} paleta={paletas.frio} />
        </div>
        <div style={{ position: "absolute", left: 60, top: 170, opacity: frame >= cCarga && vuelve < 1 ? 1 : 0, transform: `rotate(${gira}deg)` }}>
          <RelojArena size={60} />
        </div>
      </Pop>
      <Pop at={cRecibe} from="zoom" style={{ display: "flex", justifyContent: "center" }}>
        <Glass glow="rgba(34,211,238,0.3)" style={{ width: 560, padding: "22px 30px" }}>
          <div style={{ ...mono, fontSize: 28, color: colors.dim }}>{"{"}</div>
          {respuesta.campos.map((c, i) => (
            <div key={c.k} style={{ ...mono, fontSize: 28, marginLeft: 30, opacity: interpolate(frame, [cRecibe + 10 + i * 5, cRecibe + 16 + i * 5], [0, 1], clamp) }}>
              <span style={{ color: colors.cyan }}>"{c.k}"</span>: <span style={{ color: colors.gold }}>{c.v}</span>
            </div>
          ))}
          <div style={{ ...mono, fontSize: 28, color: colors.dim }}>{"}"}</div>
        </Glass>
      </Pop>
      <Pop at={cRender} from="zoom" style={{ marginTop: 30, textAlign: "center" }}>
        <div style={{ ...big, fontSize: 70, letterSpacing: -2 }}>
          <GradientText gradient={gradients.gold}>renderizar, no razonar</GradientText>
        </div>
      </Pop>
    </SceneShell>
  );
};

// Backend: rebanadas verticales y auth como dependencia.
export const Backend: React.FC = () => {
  const frame = useCurrentFrame();
  const cReb = useCue("rebanadas");
  const cCapas = useCueAt("rebanadas", 0.45);
  const cAuth = useCue("auth");
  const cInyecta = useCueAt("auth", 0.5);
  const inyecta = useSpring(cInyecta, { damping: 12 });
  const columnas = ["agente", "conocimiento", "usuarios", "calendario"];
  return (
    <SceneShell entrada="rise">
      <Title at={cReb} gradient={gradients.cool} size={104} sub="rebanadas verticales">
        El servidor
      </Title>
      <Pop at={cReb + 6} style={{ display: "flex", gap: 14 }}>
        {columnas.map((c, i) => (
          <Pop key={c} at={cReb + 8 + i * 4} from="up" style={{ flex: 1, display: "flex" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <Etiq size={24} color={i === 0 ? colors.gold : colors.dim}>
                {c}
              </Etiq>
              {rebanada.map((r, j) => (
                <div
                  key={r}
                  style={{
                    height: 86,
                    borderRadius: 16,
                    background: i === 0 ? gradients.cool : colors.glassStrong,
                    border: `1.5px solid ${colors.line}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 700,
                    color: i === 0 ? colors.bg : colors.dim,
                    textAlign: "center",
                    padding: "0 8px",
                    opacity: interpolate(frame, [cCapas + j * 6, cCapas + j * 6 + 8], [0, 1], clamp),
                  }}
                >
                  {i === 0 ? r : r.split(" · ")[0]}
                </div>
              ))}
            </div>
          </Pop>
        ))}
      </Pop>
      <Pop at={cAuth} style={{ marginTop: 40 }}>
        <Glass glow="rgba(255,193,94,0.3)" style={{ display: "flex", alignItems: "center", gap: 24, padding: "22px 30px" }}>
          <div style={{ transform: `translateX(${(1 - inyecta) * -40}px)`, opacity: 0.4 + 0.6 * inyecta }}>
            <Escudo size={110} paleta={paletas.cobre} />
          </div>
          <Flecha up color={colors.gold} size={44} />
          <div>
            <Etiq color={colors.text} size={38}>
              auth como dependencia
            </Etiq>
            <Note style={{ fontSize: 28 }}>se inyecta en cada endpoint · nadie la implementa a mano</Note>
          </div>
        </Glass>
      </Pop>
    </SceneShell>
  );
};

// La nube: servicios administrados, dos bases, contenedores, proxy de identidad.
export const Nube: React.FC = () => {
  const cAdm = useCue("administrados");
  const cBases = useCue("bases");
  const cProxy = useCue("proxy");
  const cues = [cAdm, cBases, cBases + 8, cProxy, cProxy + 10];
  const iconos = [<Chip size={70} key="c" />, <BaseDatos size={70} key="b1" />, <BaseDatos size={70} paleta={paletas.cobre} key="b2" />, <Engranaje size={70} key="e" />, <Escudo size={70} paleta={paletas.cobre} key="s" />];
  return (
    <SceneShell entrada="zoom">
      <Title at={cAdm} gradient={gradients.gold} size={104} sub="todo administrado, nada que parchar">
        La nube
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {nube.map((n, i) => (
          <Pop key={n.nombre} at={cues[i]} from="right">
            <Glass style={{ display: "flex", alignItems: "center", gap: 22, padding: "16px 26px", height: 128 }}>
              <div style={{ width: 90, display: "flex", justifyContent: "center" }}>{iconos[i]}</div>
              <div>
                <Etiq color={colors.text} size={34}>
                  {n.nombre}
                </Etiq>
                <Note style={{ fontSize: 26 }}>{n.detalle}</Note>
              </div>
            </Glass>
          </Pop>
        ))}
      </div>
    </SceneShell>
  );
};

// Configuración por ambiente e infraestructura como código.
export const Config: React.FC = () => {
  const frame = useCurrentFrame();
  const cAmb = useCue("ambientes");
  const cVive = useCueAt("ambientes", 0.55);
  const cIac = useCue("iac");
  const sel = Math.min(2, Math.floor(interpolate(frame, [cAmb + 6, cAmb + 60], [0, 3], clamp)));
  return (
    <SceneShell entrada="slide">
      <Title at={cAmb} gradient={gradients.cool} size={104}>
        Configuración
      </Title>
      <Pop at={cAmb + 4} style={{ display: "flex", gap: 14 }}>
        {ambientes.map((a, i) => (
          <div key={a} style={{ flex: 1, padding: "16px 10px", borderRadius: 999, textAlign: "center", background: sel === i ? gradients.gold : colors.glassStrong, border: `1.5px solid ${colors.line}`, fontFamily: fonts.display, fontSize: 30, fontWeight: 800, color: sel === i ? colors.bg : colors.dim }}>
            {a}
          </div>
        ))}
      </Pop>
      <Pop at={cVive} style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
        <Glass style={{ width: 700, padding: "22px 30px" }}>
          <div style={{ ...mono, fontSize: 26, color: colors.dim }}># application-{ambientes[sel].slice(0, 4)}.yaml</div>
          {configurable.map((c, i) => (
            <div key={c} style={{ ...mono, fontSize: 30, marginTop: 8, opacity: interpolate(frame, [cVive + i * 6, cVive + i * 6 + 8], [0, 1], clamp) }}>
              <span style={{ color: colors.cyan }}>{c.split(" ")[0]}</span>: <span style={{ color: colors.gold }}>{c.split(" ").slice(1).join(" ") || "…"}</span>
            </div>
          ))}
        </Glass>
      </Pop>
      <Pop at={cIac} from="zoom" style={{ marginTop: 40 }}>
        <Glass glow="rgba(34,211,238,0.3)" style={{ display: "flex", alignItems: "center", gap: 24, padding: "22px 30px" }}>
          <Documento size={100} paleta={paletas.frio} />
          <div>
            <Etiq color={colors.text} size={38}>
              infraestructura como código
            </Etiq>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              {ambientes.map((a, i) => (
                <div key={a} style={{ padding: "6px 14px", borderRadius: 999, background: colors.glassStrong, border: `1.5px solid ${colors.line}`, fontSize: 24, fontWeight: 700, opacity: interpolate(frame, [cIac + 10 + i * 5, cIac + 16 + i * 5], [0, 1], clamp) }}>
                  workspace {a}
                </div>
              ))}
            </div>
          </div>
        </Glass>
      </Pop>
    </SceneShell>
  );
};

// Detalles de producción: asíncrono, clientes reutilizados, endpoint de salud.
export const Detalles: React.FC = () => {
  const frame = useCurrentFrame();
  const cAsync = useCue("async");
  const cSingle = useCue("singleton");
  const cSalud = useCue("salud");
  const t = ((frame - cAsync) % 60) / 60;
  const pulso = 0.5 + 0.5 * Math.sin(frame * 0.25);
  const fila = (at: number, icono: React.ReactNode, texto: string, sub: string, extra: React.ReactNode) => (
    <Pop at={at} from="left">
      <Glass style={{ display: "flex", alignItems: "center", gap: 22, padding: "18px 26px", height: 200 }}>
        <div style={{ width: 100, display: "flex", justifyContent: "center" }}>{icono}</div>
        <div style={{ flex: 1 }}>
          <Etiq color={colors.text} size={36}>
            {texto}
          </Etiq>
          <Note style={{ fontSize: 26 }}>{sub}</Note>
        </div>
        <div style={{ width: 220, display: "flex", justifyContent: "center" }}>{extra}</div>
      </Glass>
    </Pop>
  );
  return (
    <SceneShell entrada="tilt">
      <Title at={cAsync} gradient={gradients.gold} size={104}>
        En producción
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {fila(
          cAsync,
          <RelojArena size={80} />,
          "todo asíncrono",
          "ninguna llamada bloquea el servidor",
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 200 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ height: 14, borderRadius: 7, background: colors.glassStrong, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${((t + i * 0.33) % 1) * 100}%`, background: gradients.cool }} />
              </div>
            ))}
          </div>,
        )}
        {fila(
          cSingle,
          <Chip size={80} />,
          "clientes reutilizados",
          "se crean una vez, viven todo el proceso",
          <div style={{ ...big, fontSize: 70, letterSpacing: -2 }}>
            <GradientText gradient={gradients.gold}>×1</GradientText>
          </div>,
        )}
        {fila(
          cSalud,
          <Escudo size={80} paleta={paletas.cobre} />,
          "endpoint de salud",
          "sin auth · la plataforma sabe que vive",
          <div style={{ ...mono, fontSize: 30, color: "#7CF29A", textShadow: `0 0 ${20 * pulso}px #7CF29A` }}>/health · 200</div>,
        )}
      </div>
    </SceneShell>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const frame = useCurrentFrame();
  const cCerebro = useCue("cerebro");
  const cSin = useCueAt("cerebro", 0.4);
  const cCta = useCue("cta");
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.18);
  return (
    <SceneShell entrada="zoom">
      <Title at={cCerebro} gradient={gradients.cool} size={104}>
        Cerebro con cuerpo
      </Title>
      <Pop at={cCerebro + 6} style={{ display: "flex", justifyContent: "center" }}>
        <Float>
          <Chip size={170} />
        </Float>
      </Pop>
      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        {[
          { icono: <Persona size={70} />, texto: "interfaz" },
          { icono: <Engranaje size={70} />, texto: "servidor" },
          { icono: <BaseDatos size={70} />, texto: "nube" },
        ].map((c, i) => (
          <Pop key={c.texto} at={cSin + i * 6} from="up" style={{ flex: 1, display: "flex" }}>
            <Caja icono={c.icono} texto={c.texto} activa />
          </Pop>
        ))}
      </div>
      <Pop at={cCta} from="zoom" style={{ marginTop: 50 }}>
        <div
          style={{
            display: "inline-flex",
            padding: "24px 40px",
            borderRadius: 999,
            background: gradients.brand,
            color: colors.bg,
            fontFamily: fonts.display,
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: -1,
            whiteSpace: "nowrap",
            boxShadow: `0 0 ${50 + 40 * pulse}px rgba(255,77,141,${0.35 + 0.3 * pulse})`,
          }}
        >
          Compártelo · Sígueme →
        </div>
      </Pop>
      <Pop at={cCta + 8}>
        <Note style={{ fontSize: 30, marginTop: 18 }}>{autor}</Note>
      </Pop>
    </SceneShell>
  );
};
