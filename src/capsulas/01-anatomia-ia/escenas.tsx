import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { clamp, Pop, useEase, useSpring, WordsIn } from "../../components/motion";
import { useCue, useCueAt } from "../../components/narracion";
import { Counter, Glass, GradientText, Note } from "../../components/ui";
import { Title } from "../../components/comun";
import {
  Alerta,
  BaseDatos,
  Burbuja,
  Chip,
  Documento,
  Engranaje,
  Escudo,
  Flecha,
  Intercambio,
  Lupa,
  paletas,
  Persona,
  RelojArena,
} from "../../components/iconos";
import { colors, fonts, gradients } from "../../theme";
import { acelera, agente, capas, rag } from "./data";

const big: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 800, letterSpacing: -5, lineHeight: 1 };
const mono: React.CSSProperties = { fontFamily: "'Figtree', monospace", fontWeight: 700, letterSpacing: 0 };

const Float: React.FC<{ children: React.ReactNode; amp?: number; phase?: number }> = ({ children, amp = 10, phase = 0 }) => {
  const frame = useCurrentFrame();
  return <div style={{ transform: `translateY(${Math.sin(frame * 0.06 + phase) * amp}px)` }}>{children}</div>;
};

const Etiq: React.FC<{ children: React.ReactNode; color?: string; size?: number }> = ({ children, color = colors.dim, size = 34 }) => (
  <div style={{ fontFamily: fonts.display, fontSize: size, fontWeight: 700, color, textAlign: "center", whiteSpace: "nowrap" }}>{children}</div>
);

const iconoCapa = (n: number, size = 90) =>
  [<Documento size={size} key="d" />, <BaseDatos size={size} key="b" />, <Engranaje size={size} key="e" />, <Intercambio size={size} paleta={paletas.calido} key="i" />, <Escudo size={size} key="s" />][n - 1];

// Gancho: un prompt solo frente a un sistema de capas.
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const cSistema = useCue("sistema");
  const cNo = useCueAt("sistema", 0.5);
  const cCapas = useCue("capas");
  const tacha = useSpring(cNo, { damping: 10 });
  const latido = 1 + 0.04 * Math.sin(frame * 0.2);
  return (
    <SceneShell entrada="none">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
        <Pop at={cSistema} from="zoom" style={{ position: "relative" }}>
          <Burbuja size={300} texto="prompt" />
          <div style={{ position: "absolute", left: 90, top: -30, ...big, fontSize: 220, color: colors.pink, opacity: tacha, transform: `scale(${0.6 + 0.4 * tacha}) rotate(-12deg)` }}>✕</div>
        </Pop>
        <Pop at={cNo + 10} from="zoom">
          <div style={{ ...big, fontSize: 120, transform: `scale(${latido})` }}>
            <GradientText gradient={gradients.cool}>Es un sistema</GradientText>
          </div>
        </Pop>
        <div style={{ display: "flex", flexDirection: "column-reverse", gap: 10, width: 560 }}>
          {capas.map((c, i) => (
            <Pop key={c.n} at={cCapas + i * 4} from="up">
              <div style={{ height: 54, borderRadius: 14, background: i === 1 ? gradients.gold : colors.glassStrong, border: `1.5px solid ${colors.line}`, display: "flex", alignItems: "center", paddingLeft: 24, fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: i === 1 ? colors.bg : colors.text }}>
                {c.nombre}
              </div>
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
        <div style={{ fontFamily: fonts.display, fontSize: 40, fontWeight: 600, color: colors.dim }}>{serie} · 01</div>
      </Pop>
      <div style={{ ...big, letterSpacing: -6, lineHeight: 0.98 }}>
        <Pop at={4} from="zoom" style={{ transformOrigin: "left center" }}>
          <div style={{ fontSize: 170, letterSpacing: -8 }}>
            <GradientText gradient={gradients.cool}>Anatomía</GradientText>
          </div>
        </Pop>
        <WordsIn at={12} stagger={3} text="de un proyecto de IA" style={{ fontSize: 118, display: "block", marginTop: 10 }} />
      </div>
      <Pop at={24}>
        <Note style={{ fontSize: 30, marginTop: 20 }}>por {autor}</Note>
      </Pop>
    </div>
  </SceneShell>
);

// Las cinco capas, una por una.
export const Capas: React.FC = () => {
  const cues = [useCue("ingesta"), useCue("conocimiento"), useCue("orquestacion"), useCue("integraciones"), useCue("persistencia")];
  const frame = useCurrentFrame();
  return (
    <SceneShell entrada="rise">
      <Title at={cues[0]} gradient={gradients.cool} size={104}>
        Las 5 capas
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 0 }}>
        {capas.map((c, i) => {
          const activa = frame >= cues[i] && (i === 4 || frame < cues[i + 1]);
          return (
            <Pop key={c.n} at={cues[i]} from="left">
              <Glass
                glow={activa ? "rgba(34,211,238,0.35)" : undefined}
                style={{ display: "flex", alignItems: "center", gap: 24, padding: "18px 26px", height: 160, transform: `scale(${activa ? 1.02 : 1})`, opacity: frame >= cues[i] ? 1 : 0 }}
              >
                <div style={{ ...big, fontSize: 70, width: 60 }}>
                  <GradientText gradient={i === 1 ? gradients.gold : gradients.cool}>{c.n}</GradientText>
                </div>
                <div style={{ width: 110, display: "flex", justifyContent: "center" }}>{iconoCapa(c.n)}</div>
                <div>
                  <Etiq color={colors.text} size={40}>
                    {c.nombre}
                  </Etiq>
                  <Note style={{ fontSize: 26, marginTop: 2 }}>{c.detalle}</Note>
                </div>
              </Glass>
            </Pop>
          );
        })}
      </div>
    </SceneShell>
  );
};

// Por qué importa: el modelo no conoce tus documentos; reentrenar vs. RAG.
export const Porque: React.FC = () => {
  const frame = useCurrentFrame();
  const cNo = useCue("noconoce");
  const cTacha = useCueAt("noconoce", 0.7);
  const cCaro = useCue("caro");
  const cMin = useCue("minutos");
  const cCita = useCueAt("minutos", 0.7);
  const tacha = useSpring(cTacha, { damping: 10 });
  const giro = interpolate(frame, [cCaro, cCaro + 60], [0, 180], clamp);
  return (
    <SceneShell entrada="zoom">
      <Title at={cNo} gradient={gradients.gold} size={104}>
        ¿Por qué RAG?
      </Title>
      <Pop at={cNo + 6} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <Chip size={170} />
        <div style={{ position: "relative", width: 160, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ height: 6, width: 160, borderTop: `6px dashed ${colors.faint}` }} />
          <div style={{ position: "absolute", ...big, fontSize: 110, color: colors.pink, opacity: tacha, transform: `scale(${0.5 + 0.5 * tacha})` }}>✕</div>
        </div>
        <Documento size={150} />
      </Pop>
      <Pop at={cNo + 12}>
        <Note style={{ fontSize: 32, textAlign: "center" }}>el modelo no conoce tus documentos</Note>
      </Pop>
      <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
        <Pop at={cCaro} from="up" style={{ flex: 1 }}>
          <Glass style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "26px 16px", height: 300, justifyContent: "center" }}>
            <div style={{ transform: `rotate(${giro}deg)` }}>
              <RelojArena size={120} />
            </div>
            <Etiq color={colors.text} size={36}>
              reentrenar
            </Etiq>
            <div style={{ ...big, fontSize: 56, letterSpacing: -2 }}>
              <GradientText gradient={gradients.warm}>semanas</GradientText>
            </div>
          </Glass>
        </Pop>
        <Pop at={cMin} from="up" style={{ flex: 1 }}>
          <Glass glow="rgba(255,193,94,0.35)" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "26px 16px", height: 300, justifyContent: "center" }}>
            <Float>
              <BaseDatos size={120} paleta={paletas.cobre} />
            </Float>
            <Etiq color={colors.text} size={36}>
              RAG
            </Etiq>
            <div style={{ ...big, fontSize: 56, letterSpacing: -2 }}>
              <GradientText gradient={gradients.gold}>minutos</GradientText>
            </div>
          </Glass>
        </Pop>
      </div>
      <Pop at={cCita} from="zoom" style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 18 }}>
        <Lupa size={90} />
        <Note style={{ fontSize: 34 }}>y cita de dónde salió</Note>
      </Pop>
    </SceneShell>
  );
};

// Cómo se compone: documento → trozos → vectores → base.
export const Como: React.FC = () => {
  const frame = useCurrentFrame();
  const cChunks = useCue("chunks");
  const cParte = useCueAt("chunks", 0.4);
  const cVector = useCue("vector");
  const cNums = useCueAt("vector", 0.6);
  const cGuardar = useCue("guardar");
  const parte = useEase(cParte, 30);
  const trozos = [0, 1, 2, 3];
  const nums = Array.from({ length: 12 }, (_, i) => ((Math.sin(i * 12.9898 + frame * 0.05) + 1) / 2).toFixed(2));
  return (
    <SceneShell entrada="slide">
      <Title at={cChunks} gradient={gradients.cool} size={104} sub="ingesta de un documento">
        El pipeline
      </Title>
      <Pop at={cChunks + 4} style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Documento size={130} />
        <Flecha up color={colors.cyan} size={50} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {trozos.map((t) => (
            <div key={t} style={{ width: 300, height: 44, borderRadius: 10, background: colors.glassStrong, border: `1.5px solid ${colors.line}`, transform: `translateX(${(1 - parte) * -40}px)`, opacity: parte, position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 300 * (rag.chunkOverlap / rag.chunkSize), borderRadius: 10, background: "rgba(255,193,94,0.35)" }} />
            </div>
          ))}
        </div>
        <div style={{ opacity: parte }}>
          <div style={{ ...big, fontSize: 64, letterSpacing: -2 }}>
            <GradientText gradient={gradients.gold}>{rag.chunkSize}</GradientText>
          </div>
          <Note style={{ fontSize: 26 }}>caracteres</Note>
          <Note style={{ fontSize: 26, color: colors.gold }}>+{rag.chunkOverlap} traslape</Note>
        </div>
      </Pop>
      <Pop at={cVector} style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ width: 120, height: 44, borderRadius: 10, background: colors.glassStrong, border: `1.5px solid ${colors.line}` }} />
        <Flecha up color={colors.cyan} size={50} />
        <Chip size={110} />
        <Flecha up color={colors.cyan} size={50} />
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, width: 330 }}>
            {nums.map((n, i) => (
              <div key={i} style={{ ...mono, fontSize: 22, color: colors.cyan, opacity: interpolate(frame, [cNums + i * 2, cNums + i * 2 + 6], [0, 1], clamp) }}>
                {n}
              </div>
            ))}
            <div style={{ ...mono, fontSize: 22, color: colors.dim, opacity: interpolate(frame, [cNums + 24, cNums + 30], [0, 1], clamp) }}>…</div>
          </div>
          <div style={{ ...big, fontSize: 60, letterSpacing: -2, marginTop: 6 }}>
            <GradientText gradient={gradients.cool}>
              <Counter to={rag.dimensiones} at={cNums} duration={30} decimals={0} /> números
            </GradientText>
          </div>
        </div>
      </Pop>
      <Pop at={cGuardar} from="zoom" style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 24 }}>
        <BaseDatos size={140} />
        <div>
          <Etiq color={colors.text} size={40}>
            base vectorial
          </Etiq>
          <Note style={{ fontSize: 28 }}>vector + metadata: documento · tipo · dueño</Note>
        </div>
      </Pop>
    </SceneShell>
  );
};

// Búsqueda: la pregunta se vuelve vector, coseno, top-k, modos.
export const Busqueda: React.FC = () => {
  const frame = useCurrentFrame();
  const cPreg = useCue("pregunta");
  const cCos = useCue("coseno");
  const cTopK = useCueAt("coseno", 0.45);
  const cModos = useCue("modos");
  const gira = useEase(cCos, 40);
  const ang = interpolate(gira, [0, 1], [70, 18]);
  const rad = (ang * Math.PI) / 180;
  const cx = 160;
  const cy = 200;
  const L = 180;
  return (
    <SceneShell entrada="tilt">
      <Title at={cPreg} gradient={gradients.gold} size={104}>
        La búsqueda
      </Title>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 30 }}>
        <Pop at={cPreg + 4} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Persona size={110} />
          <Burbuja size={150} texto="¿…?" />
          <Flecha up={false} color={colors.gold} size={44} />
          <div style={{ ...mono, fontSize: 24, color: colors.gold }}>[0.12, 0.87, …]</div>
        </Pop>
        <Pop at={cCos} style={{ flex: 1 }}>
          <svg width={420} height={300} style={{ overflow: "visible" }}>
            <line x1={cx} y1={cy} x2={cx + L} y2={cy} stroke={colors.cyan} strokeWidth={8} strokeLinecap="round" />
            <line x1={cx} y1={cy} x2={cx + L * Math.cos(rad)} y2={cy - L * Math.sin(rad)} stroke={colors.gold} strokeWidth={8} strokeLinecap="round" />
            <path d={`M${cx + 60} ${cy} A60 60 0 0 0 ${cx + 60 * Math.cos(rad)} ${cy - 60 * Math.sin(rad)}`} stroke={colors.pink} strokeWidth={4} fill="none" />
            <text x={cx + 80} y={cy - 24} fontSize={30} fontWeight={800} fill={colors.text} fontFamily="'Bricolage Grotesque', sans-serif">
              cos θ = {(Math.cos(rad)).toFixed(2)}
            </text>
            <text x={cx + L + 12} y={cy + 10} fontSize={24} fontWeight={700} fill={colors.cyan} fontFamily="'Bricolage Grotesque', sans-serif">
              trozo
            </text>
            <text x={cx + L * Math.cos(rad) + 10} y={cy - L * Math.sin(rad)} fontSize={24} fontWeight={700} fill={colors.gold} fontFamily="'Bricolage Grotesque', sans-serif">
              pregunta
            </text>
          </svg>
          <Note style={{ fontSize: 28, marginTop: -10 }}>similitud coseno: más cerca, más relevante</Note>
        </Pop>
      </div>
      <Pop at={cTopK} from="left" style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 16 }}>
        {[0.91, 0.88, 0.84, 0.61, 0.4].map((s, i) => (
          <div key={i} style={{ width: 150, height: 70, borderRadius: 14, background: i < rag.topK ? gradients.cool : colors.glassStrong, border: `1.5px solid ${colors.line}`, display: "flex", alignItems: "center", justifyContent: "center", ...mono, fontSize: 28, color: i < rag.topK ? colors.bg : colors.faint, opacity: interpolate(frame, [cTopK + i * 3, cTopK + i * 3 + 8], [0, 1], clamp) }}>
            {s.toFixed(2)}
          </div>
        ))}
      </Pop>
      <Pop at={cTopK + 16}>
        <Note style={{ fontSize: 30, marginTop: 10 }}>
          top-{rag.topK} → contexto del prompt
        </Note>
      </Pop>
      <Pop at={cModos} from="zoom" style={{ marginTop: 40 }}>
        <Glass glow="rgba(255,122,61,0.3)" style={{ display: "flex", alignItems: "center", gap: 20, padding: "22px 28px" }}>
          <Alerta size={90} />
          <div>
            <Etiq color={colors.text} size={36}>
              modo de embedding
            </Etiq>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              {rag.modos.map((m) => (
                <div key={m} style={{ padding: "6px 16px", borderRadius: 999, background: colors.glassStrong, border: `1.5px solid ${colors.line}`, fontSize: 26, fontWeight: 700 }}>
                  {m}
                </div>
              ))}
            </div>
          </div>
        </Glass>
      </Pop>
    </SceneShell>
  );
};

// El agente: grafo de tres nodos, salida con esquema, plan B.
export const Agente: React.FC = () => {
  const frame = useCurrentFrame();
  const cGrafo = useCue("grafo");
  const cJson = useCue("json");
  const cFall = useCue("fallback");
  const avanza = useEase(cGrafo + 10, 50);
  const W = 900;
  const xs = [90, 450, 810];
  const activo = Math.min(2, Math.floor(avanza * 3));
  return (
    <SceneShell entrada="rise">
      <Title at={cGrafo} gradient={gradients.cool} size={104} sub="grafo de estados, pocos nodos">
        El agente
      </Title>
      <Pop at={cGrafo + 4} style={{ position: "relative", height: 230, width: W }}>
        <svg width={W} height={230} style={{ position: "absolute", left: 0, top: 0 }}>
          <line x1={xs[0]} y1={80} x2={xs[2]} y2={80} stroke={colors.line} strokeWidth={6} />
          <line x1={xs[0]} y1={80} x2={xs[0] + (xs[2] - xs[0]) * avanza} y2={80} stroke={colors.cyan} strokeWidth={6} strokeLinecap="round" />
        </svg>
        {agente.nodos.map((n, i) => (
          <div key={n} style={{ position: "absolute", left: xs[i] - 70, top: 10, width: 140, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: 70,
                background: i <= activo ? gradients.cool : colors.glassStrong,
                border: `2px solid ${colors.line}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: i === activo ? "0 0 40px rgba(34,211,238,0.6)" : "none",
                transform: `scale(${i === activo ? 1.08 : 1})`,
              }}
            >
              {[<Lupa size={70} paleta={paletas.blanco} key="l" />, <Chip size={70} paleta={paletas.blanco} key="c" />, <BaseDatos size={70} paleta={paletas.blanco} key="b" />][i]}
            </div>
            <Etiq size={26} color={colors.text}>
              {n}
            </Etiq>
          </div>
        ))}
      </Pop>
      <Pop at={cJson} from="left" style={{ marginTop: 20 }}>
        <Glass style={{ display: "flex", alignItems: "center", gap: 24, padding: "20px 28px" }}>
          <div style={{ ...mono, fontSize: 24, color: colors.cyan, lineHeight: 1.3 }}>
            {"{"}
            <br />
            &nbsp;&nbsp;"tipo": "…",
            <br />
            &nbsp;&nbsp;"confianza": 0.0–1.0
            <br />
            {"}"}
          </div>
          <div>
            <Etiq color={colors.text} size={38}>
              salida con esquema
            </Etiq>
            <Note style={{ fontSize: 28 }}>validada antes de llegar al usuario</Note>
          </div>
        </Glass>
      </Pop>
      <Pop at={cFall} from="up" style={{ marginTop: 20 }}>
        <Glass glow="rgba(255,193,94,0.3)" style={{ padding: "20px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
            <Escudo size={70} paleta={paletas.cobre} />
            <Etiq color={colors.text} size={38}>
              plan B en cada nodo
            </Etiq>
          </div>
          {agente.fallbacks.slice(0, 2).map((f, i) => (
            <div key={f} style={{ fontSize: 28, color: colors.dim, fontWeight: 600, opacity: interpolate(frame, [cFall + 10 + i * 10, cFall + 18 + i * 10], [0, 1], clamp) }}>
              → {f}
            </div>
          ))}
        </Glass>
      </Pop>
    </SceneShell>
  );
};

// Tres cosas que saber: tamaño del trozo, umbral, escala.
export const Saber: React.FC = () => {
  const frame = useCurrentFrame();
  const cTrade = useCue("tradeoff");
  const cUmbral = useCue("umbral");
  const cEscala = useCue("escala");
  const dial = (at: number, valor: string, izq: string, der: string, pos: number) => {
    const p = interpolate(frame, [at + 6, at + 36], [0.5, pos], clamp);
    return (
      <div style={{ position: "relative", width: 520 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: colors.faint, fontWeight: 700 }}>
          <span>{izq}</span>
          <span>{der}</span>
        </div>
        <div style={{ height: 14, borderRadius: 7, background: colors.glassStrong, border: `1.5px solid ${colors.line}`, marginTop: 6 }} />
        <div style={{ position: "absolute", left: `calc(${p * 100}% - 22px)`, top: 26, width: 44, height: 44, borderRadius: 22, background: gradients.gold, boxShadow: `0 0 24px ${colors.gold}` }} />
        <div style={{ ...big, fontSize: 44, letterSpacing: -1, marginTop: 40 }}>{valor}</div>
      </div>
    );
  };
  const fila = (at: number, n: string, icono: React.ReactNode, texto: string, contenido: React.ReactNode) => (
    <Pop at={at} from="right">
      <Glass style={{ display: "flex", alignItems: "center", gap: 22, padding: "18px 26px", height: 220 }}>
        <div style={{ ...big, fontSize: 70, width: 50 }}>
          <GradientText gradient={gradients.gold}>{n}</GradientText>
        </div>
        <div style={{ width: 100, display: "flex", justifyContent: "center" }}>{icono}</div>
        <div style={{ flex: 1 }}>
          <Etiq color={colors.text} size={34}>
            {texto}
          </Etiq>
          <div style={{ marginTop: 6 }}>{contenido}</div>
        </div>
      </Glass>
    </Pop>
  );
  return (
    <SceneShell entrada="zoom">
      <Title at={cTrade} gradient={gradients.gold} size={104}>
        Lo que hay que saber
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {fila(cTrade, "1", <Documento size={80} />, "tamaño del trozo", dial(cTrade, `${rag.chunkSize} caracteres`, "precisión", "contexto", 0.42))}
        {fila(cUmbral, "2", <Engranaje size={80} />, "umbral de similitud", dial(cUmbral, `${rag.umbral} · en configuración`, "agrupa más", "separa más", 0.87))}
        {fila(
          cEscala,
          "3",
          <BaseDatos size={80} />,
          "escala de la búsqueda",
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ padding: "8px 16px", borderRadius: 999, background: colors.glassStrong, border: `1.5px solid ${colors.line}`, fontSize: 26, fontWeight: 700 }}>en memoria · {rag.limiteMemoria}</div>
            <Flecha up color={colors.cyan} size={40} />
            <div style={{ padding: "8px 16px", borderRadius: 999, background: gradients.cool, color: colors.bg, fontSize: 26, fontWeight: 800 }}>base vectorial</div>
          </div>,
        )}
      </div>
    </SceneShell>
  );
};

// Qué acelera: semanas → minutos, respuestas con fuentes.
export const Acelera: React.FC = () => {
  const cSem = useCue("semanas");
  const cMin = useCueAt("semanas", 0.7);
  const cFuentes = useCue("fuentes");
  const largo = useEase(cSem + 6, 40);
  const corto = useSpring(cMin, { damping: 12 });
  return (
    <SceneShell entrada="slide">
      <Title at={cSem} gradient={gradients.cool} size={104} sub="incorporar conocimiento nuevo">
        ¿Qué acelera?
      </Title>
      <Pop at={cSem + 4}>
        <Note style={{ fontSize: 30 }}>{acelera.sinRAG.etiqueta}</Note>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8 }}>
          <div style={{ height: 70, width: 780 * largo, borderRadius: 18, background: gradients.warm }} />
          <div style={{ ...big, fontSize: 56, letterSpacing: -2, opacity: largo }}>{acelera.sinRAG.tiempo}</div>
        </div>
      </Pop>
      <Pop at={cMin} style={{ marginTop: 30 }}>
        <Note style={{ fontSize: 30 }}>{acelera.conRAG.etiqueta} en un RAG</Note>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8 }}>
          <div style={{ height: 70, width: 40 * corto + 12, borderRadius: 18, background: gradients.gold, boxShadow: `0 0 30px ${colors.gold}` }} />
          <div style={{ ...big, fontSize: 56, letterSpacing: -2 }}>
            <GradientText gradient={gradients.gold}>{acelera.conRAG.tiempo}</GradientText>
          </div>
        </div>
      </Pop>
      <Pop at={cFuentes} from="zoom" style={{ marginTop: 60 }}>
        <Glass glow="rgba(34,211,238,0.3)" style={{ display: "flex", alignItems: "center", gap: 24, padding: "26px 30px" }}>
          <Burbuja size={150} paleta={paletas.frio} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Documento size={40} />
                <div style={{ height: 10, width: 160 - i * 30, borderRadius: 5, background: colors.faint }} />
              </div>
            ))}
          </div>
          <div>
            <Etiq color={colors.text} size={38}>
              respuesta con fuentes
            </Etiq>
            <Note style={{ fontSize: 28 }}>revisión humana más rápida</Note>
          </div>
        </Glass>
      </Pop>
    </SceneShell>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const frame = useCurrentFrame();
  const cDemo = useCue("demo");
  const cCta = useCue("cta");
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.18);
  return (
    <SceneShell entrada="zoom">
      <Title at={cDemo} gradient={gradients.gold} size={104}>
        ¿Sistema o demo?
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {capas.map((c, i) => (
          <Pop key={c.n} at={cDemo + 6 + i * 4} from="left">
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 54, height: 54, borderRadius: 14, background: gradients.cool, display: "flex", alignItems: "center", justifyContent: "center", ...big, fontSize: 36, color: colors.bg }}>✓</div>
              <div style={{ width: 70, display: "flex", justifyContent: "center" }}>{iconoCapa(c.n, 56)}</div>
              <Etiq color={colors.text} size={36}>
                {c.nombre}
              </Etiq>
            </div>
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
