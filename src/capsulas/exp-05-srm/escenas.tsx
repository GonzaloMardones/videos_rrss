import React from "react";
import { ArrowRightLeft, Bot, Bug, Check, Database, Lock, Loader, RotateCcw, Search, Timer, User, Wrench } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Formula, Frac, Op, serif, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Traza } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Chip, Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 05/17";

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

const Barras: React.FC<{ at: number; alto?: number }> = ({ at, alto = 300 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 900, EXPO_OUT);
  const escala = (n: number) => ((n - 46000) / 5500) * alto;
  return (
    <div style={{ position: "relative", height: alto + 90, width: 912 }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 60 + escala(50000), height: 2, borderTop: `3px dashed ${v.hueso}`, opacity: k }} />
      <div style={{ position: "absolute", right: 0, bottom: 70 + escala(50000), fontFamily: mono, fontSize: 22, color: v.niebla, opacity: k }}>esperado 50.000</div>
      {[
        ["A", 50800, v.azafran, 120],
        ["B", 49200, c.b, 420],
      ].map(([g, n, col, x]) => (
        <div key={g as string} style={{ position: "absolute", left: x as number, bottom: 0, width: 220, textAlign: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 32, marginBottom: 8, opacity: k }}>{(n as number).toLocaleString("es-CL")}</div>
          <div style={{ height: escala(n as number) * k, background: col as string, borderRadius: 14 }} />
          <div style={{ fontFamily: mono, fontSize: 30, marginTop: 12 }}>{g}</div>
        </div>
      ))}
    </div>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("gancho");
  const cRoto = useCueAt("gancho", 0.8);
  const sello = transicion(frame, cRoto, fps, 500, backOut);
  return (
    <Escena>
      <Escenario alto={480}>
        <Barras at={at + 10} />
        {sello > 0 ? (
          <div style={{ position: "absolute", left: 640, top: 250, padding: "8px 22px", borderRadius: 12, border: `4px solid ${ROJO}`, color: ROJO, fontSize: 48, fontWeight: 600, letterSpacing: "0.1em", transform: `rotate(-8deg) scale(${sello})` }}>ROTO</div>
        ) : null}
      </Escenario>
      <div style={{ marginTop: 40 }}>
        <Cinetico at={cRoto - 10} texto="Pediste 50/50.|*No llegó.*" style={{ fontSize: 100 }} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, display: "flex", justifyContent: "center" }}>
      <Constelacion at={-60} ancho={700} forma="red" cantidad={520} />
    </div>
    <div style={{ marginTop: 450 }}>
      <Rotulo at={2}>{SERIE}</Rotulo>
      <Cinetico at={6} texto="Desbalance|de *muestra.*" style={{ marginTop: 18, fontSize: 116 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>SRM, sample ratio mismatch · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Qué es ───────────────────────────────────────────────────────────────────
export const Que: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("que");
  return (
    <Escena>
      <Cabeza at={at} titulo="Lo que diseñaste|*vs. lo que llegó.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", width: 912 }}>
          {Array.from({ length: 30 }, (_, i) => {
            const k = transicion(frame, at + 6 + i * 1.5, fps, 400, EXPO_OUT);
            const g = i % 2 === 0 || i === 7 || i === 19 ? "A" : "B";
            return (
              <div key={i} style={{ opacity: k, transform: `translateY(${(1 - k) * 20}px)` }}>
                <User size={48} strokeWidth={1.6} color={g === "A" ? v.azafran : c.b} />
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 0, top: 260, display: "flex", gap: 20 }}>
          <Panel caja={{ x: 0, y: 0, w: 440, h: 170 }} at={at + 40} estilo={{ position: "relative" }}>
            <Rol>Diseñaste</Rol>
            <div style={{ fontFamily: serif, fontSize: 64, marginTop: 6 }}>50 / 50</div>
          </Panel>
          <Panel caja={{ x: 0, y: 0, w: 440, h: 170 }} at={at + 54} color={ROJO} estilo={{ position: "relative" }}>
            <Rol color={ROJO}>Llegó</Rol>
            <div style={{ fontFamily: serif, fontSize: 64, marginTop: 6, color: ROJO }}>50,8 / 49,2</div>
          </Panel>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── La prueba ────────────────────────────────────────────────────────────────
export const Prueba: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cF = useCue("formula");
  const cC = useCue("cuenta");
  const res = transicion(frame, cC + 40, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cF} titulo="Chi *cuadrado.*" tam={96} />
      <Escenario alto={680} style={{ marginTop: 40 }}>
        <Formula tam={76}>
          <Entra at={cF + 6}>
            <V color={ROJO}>χ²</V>
            <Op>=</Op>Σ
            <Frac
              arriba={
                <>
                  (<V color={v.azafran}>O</V> − <V color={c.b}>E</V>)²
                </>
              }
              abajo={<V color={c.b}>E</V>}
            />
          </Entra>
        </Formula>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
          <Nota at={cF + 24} color={v.azafran} tam={28}>
            <i style={{ fontFamily: serif }}>O</i>: los usuarios observados en cada grupo
          </Nota>
          <Nota at={cF + 32} color={c.b} tam={28}>
            <i style={{ fontFamily: serif }}>E</i>: los que esperabas según tu diseño
          </Nota>
        </div>
        <div style={{ position: "absolute", left: 0, top: 360 }}>
          <Formula tam={54}>
            <Entra at={cC}>
              <Frac arriba="800²" abajo="50.000" />
              <Op>+</Op>
              <Frac arriba="800²" abajo="50.000" />
              <Op>=</Op>12,8<Op>+</Op>12,8<Op>=</Op>
              <span style={{ color: ROJO, fontSize: 76, display: "inline-block", transform: `scale(${res})` }}>25,6</span>
            </Entra>
          </Formula>
          <div style={{ fontFamily: serif, fontSize: 44, marginTop: 20, opacity: transicion(frame, cC + 60, fps, 400, EXPO_OUT) }}>
            p ≈ <span style={{ color: ROJO }}>0,0000004</span>
          </div>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── La intuición ─────────────────────────────────────────────────────────────
export const Intuicion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cI = useCue("intuicion");
  const cN = useCue("normal");
  const se = 0.158;
  const xs = Array.from({ length: 121 }, (_, i) => 49.3 + (i / 120) * 1.7);
  const dens = (x: number) => Math.exp(-((x - 50) ** 2) / (2 * se * se));
  const k = transicion(frame, cI + 6, fps, 900, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cI} titulo="¿Cuánto mueve|el *azar?*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Ejes ancho={912} alto={420} x={[49.3, 51]} y={[0, 1.15]} at={cI + 2} rotuloX="% en el grupo A →" marcasX={[{ v: 49.5, t: "49,5" }, { v: 50, t: "50" }, { v: 50.5, t: "50,5" }, { v: 51, t: "51" }]}>
          {({ px, py }) => (
            <g>
              <path d={`M${px(49.3)},${py(0)}L${xs.map((x) => `${px(x)},${py(dens(x))}`).join("L")}L${px(51)},${py(0)}Z`} fill={c.c} opacity={0.15 * k} />
              <Traza pts={xs.map((x) => [px(x), py(dens(x))] as [number, number])} k={k} color={c.c} ancho={4} />
              {[
                [50.1, "50,1 · normal", c.c],
                [50.8, "50,8 · roto", ROJO],
              ].map(([x, t, col], i) => (
                <g key={i} opacity={transicion(frame, (i ? cN + 30 : cN) + 4, fps, 400, EXPO_OUT)}>
                  <line x1={px(x as number)} y1={py(0)} x2={px(x as number)} y2={py(1.05)} stroke={col as string} strokeWidth={4} />
                  <text x={px(x as number) + (i ? -12 : 12)} y={py(i ? 0.7 : 1.1)} textAnchor={i ? "end" : "start"} fontFamily={mono} fontSize={24} fill={col as string}>
                    {t}
                  </text>
                </g>
              ))}
            </g>
          )}
        </Ejes>
        <Nota at={cI + 30} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 460 }}>
          con 100.000 usuarios, el azar mueve la proporción ± 0,16 puntos (una desviación)
        </Nota>
        <Nota at={cN + 40} color={ROJO} tam={28} style={{ position: "absolute", left: 0, top: 540 }}>
          0,8 puntos son 5 desviaciones: z = 5,06, y z² = 25,6 = χ²
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Por qué importa ──────────────────────────────────────────────────────────
export const Porque: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("porque");
  const cL = useCue("lento");
  const sale = transicion(frame, cL + 30, fps, 1200, EXPO_IN_OUT);
  const fila = (y: number, nombre: string, col: string, lento: boolean) => (
    <div style={{ position: "absolute", left: 0, top: y, width: 912 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, marginBottom: 12 }}>
        <span style={{ color: col }}>{nombre}</span>
        {lento ? <Loader size={30} strokeWidth={1.8} color={ROJO} style={{ transform: `rotate(${frame * 8}deg)` }} /> : null}
        {lento ? <span style={{ fontSize: 24, color: ROJO }}>carga lenta</span> : null}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {Array.from({ length: 12 }, (_, i) => {
          const impaciente = i % 3 === 0;
          const se = lento && impaciente ? sale : 0;
          return (
            <div key={i} style={{ opacity: 1 - se, transform: `translateY(${-se * 60}px)` }}>
              <User size={52} strokeWidth={1.6} color={impaciente ? v.ceniza : col} />
            </div>
          );
        })}
      </div>
    </div>
  );
  return (
    <Escena>
      <Cabeza at={cP} titulo="Los que faltan,|*no faltan al azar.*" tam={80} />
      <Escenario alto={680} style={{ marginTop: 40 }}>
        {fila(0, "A · versión actual", v.azafran, false)}
        {frame >= cL ? fila(190, "B · variante", c.b, true) : null}
        <Nota at={cL + 20} color={v.ceniza} tam={28} style={{ position: "absolute", left: 0, top: 400 }}>
          gris: los impacientes. En B se van antes de ser contados
        </Nota>
        <Nota at={cL + 60} color={ROJO} tam={30} style={{ position: "absolute", left: 0, top: 480 }}>
          en B quedan solo los pacientes: la variante parece mejor de lo que es
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Causas ───────────────────────────────────────────────────────────────────
export const Causas: React.FC = () => {
  const at = useCue("causas");
  const largo = useCueAt("causas", 1) - at;
  const items: { Icono: typeof Timer; t: string }[] = [
    { Icono: Timer, t: "una variante más lenta" },
    { Icono: ArrowRightLeft, t: "redirecciones" },
    { Icono: Bot, t: "bots filtrados distinto" },
    { Icono: Bug, t: "errores en la asignación" },
    { Icono: Database, t: "datos perdidos en el camino" },
  ];
  return (
    <Escena>
      <Cabeza at={at} titulo="Las causas|*típicas.*" />
      <Escenario alto={680} style={{ marginTop: 40 }}>
        {items.map((it, i) => (
          <Panel key={it.t} caja={{ x: 0, y: i * 124, w: 912, h: 106 }} at={at + largo * (0.12 + i * 0.15)} estilo={{ display: "flex", alignItems: "center", gap: 22, padding: "0 24px" }}>
            <it.Icono size={44} strokeWidth={1.6} color={ROJO} />
            <span style={{ fontSize: 34 }}>{it.t}</span>
          </Panel>
        ))}
      </Escenario>
    </Escena>
  );
};

// ─── Qué hacer ────────────────────────────────────────────────────────────────
export const Hacer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cH = useCue("hacer");
  const cP = useCue("primero");
  const largo = cP - cH;
  const pasos: { Icono: typeof Search; t: string; col: string }[] = [
    { Icono: Lock, t: "no lo analices", col: ROJO },
    { Icono: Search, t: "busca la causa", col: v.azafran },
    { Icono: Wrench, t: "corrígela", col: c.b },
    { Icono: RotateCcw, t: "vuelve a correrlo", col: c.c },
  ];
  return (
    <Escena>
      <Cabeza at={cH} titulo="¿Qué *hacer?*" tam={96} />
      <Escenario alto={680} style={{ marginTop: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: 912 }}>
          {pasos.map((p, i) => {
            const k = transicion(frame, cH + largo * (0.15 + i * 0.18), fps, 500, backOut);
            return (
              <div key={p.t} style={{ height: 150, borderRadius: 20, border: `2.5px solid ${p.col}`, background: relleno, display: "flex", alignItems: "center", gap: 18, padding: "0 22px", opacity: Math.min(1, k * 1.5), transform: `scale(${0.85 + 0.15 * Math.min(1, k)})` }}>
                <span style={{ fontFamily: mono, fontSize: 30, color: p.col }}>{i + 1}</span>
                <p.Icono size={42} strokeWidth={1.6} color={p.col} />
                <span style={{ fontSize: 30 }}>{p.t}</span>
              </div>
            );
          })}
        </div>
        <Panel caja={{ x: 0, y: 360, w: 912, h: 200 }} at={cP + 4} color={c.c}>
          <Rol color={c.c}>Antes de cualquier resultado</Rol>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14 }}>
            <Check size={40} strokeWidth={2.4} color={c.c} />
            <span style={{ fontSize: 34 }}>revisión automática de SRM</span>
          </div>
          <div style={{ marginTop: 14 }}>
            <Chip texto="alarma si p < 0,001 · también por segmento" tam={24} activo />
          </div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const cCta = useCue("cta");
  return (
    <Escena>
      <div style={{ position: "absolute", left: -80, right: -80, top: -110, display: "flex", justifyContent: "center" }}>
        <Constelacion at={cCta - 30} ancho={560} forma="cerebro" desde="red" cambio={cCta} />
      </div>
      <div style={{ marginTop: 300 }}>
        <Cinetico at={cCta} texto="Antes de leer,|*cuenta a la gente.*" style={{ fontSize: 88 }} />
        <div style={{ marginTop: 30, padding: "14px 20px", borderRadius: 20, border: `1.5px solid ${linea}`, background: relleno, display: "inline-block" }}>
          <Formula tam={44}>
            <V color={ROJO}>χ²</V>
            <Op>=</Op>Σ<Frac arriba={<>(O − E)²</>} abajo="E" />
          </Formula>
        </div>
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 06/17 · métricas de guarda
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
