import React from "react";
import { AlertOctagon, Check, Gauge, ShieldCheck, Star, User, X } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Frac, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, ultimo } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Chip, Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 06/17";

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

const Sello: React.FC<{ at: number; ok: boolean }> = ({ at, ok }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 400, backOut);
  return (
    <div style={{ width: 58, height: 58, borderRadius: 29, background: ok ? c.c : ROJO, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${k})`, flexShrink: 0 }}>
      {ok ? <Check size={36} strokeWidth={3} color={v.vacio} /> : <X size={36} strokeWidth={3} color={v.vacio} />}
    </div>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const at = useCue("gancho");
  const cCan = useCueAt("gancho", 0.35);
  return (
    <Escena>
      <Escenario alto={440}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 190 }} at={at + 4} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Star size={56} strokeWidth={1.4} color={c.c} />
          <div style={{ flex: 1 }}>
            <Rol color={c.c}>Conversión · principal</Rol>
            <div style={{ fontFamily: serif, fontSize: 72 }}>+2,1 %</div>
          </div>
          <Sello at={at + 30} ok />
        </Panel>
        <Panel caja={{ x: 0, y: 230, w: 912, h: 190 }} at={cCan} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <ShieldCheck size={56} strokeWidth={1.4} color={ROJO} />
          <div style={{ flex: 1 }}>
            <Rol color={ROJO}>Cancelaciones · guarda</Rol>
            <div style={{ fontFamily: serif, fontSize: 72, color: ROJO }}>+3,8 %</div>
          </div>
          <Sello at={cCan + 24} ok={false} />
        </Panel>
      </Escenario>
      <div style={{ marginTop: 40 }}>
        <Cinetico at={cCan + 30} texto="¿Lo *lanzas?*" style={{ fontSize: 120 }} />
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
      <Cinetico at={6} texto="Métricas de guarda|y de *razón.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>y el método delta · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Principal y guardas ──────────────────────────────────────────────────────
export const Oec: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("oec");
  const largo = useCueAt("oec", 1) - at;
  return (
    <Escena>
      <Cabeza at={at} titulo="Una decide,|las otras *protegen.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Panel caja={{ x: 156, y: 0, w: 600, h: 170 }} at={at + 6} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Star size={56} strokeWidth={1.4} color={v.azafran} fill={v.azafran} />
          <div>
            <Rol color={v.azafran}>Métrica principal</Rol>
            <div style={{ fontSize: 38 }}>la que decide</div>
          </div>
        </Panel>
        <svg width={912} height={120} style={{ position: "absolute", left: 0, top: 170 }}>
          {[150, 456, 762].map((x, i) => (
            <line key={i} x1={456} y1={0} x2={x} y2={110} stroke={linea} strokeWidth={3} opacity={transicion(frame, at + largo * 0.45 + i * 4, fps, 400, EXPO_OUT)} />
          ))}
        </svg>
        {["no empeorar", "no empeorar", "no empeorar"].map((t, i) => (
          <Panel key={i} caja={{ x: i * 312, y: 290, w: 288, h: 170 }} at={at + largo * 0.5 + i * 6} color={c.c} estilo={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <ShieldCheck size={50} strokeWidth={1.4} color={c.c} />
            <div style={{ fontSize: 28 }}>guarda {i + 1}</div>
            <div style={{ fontSize: 22, fontWeight: 200, color: v.niebla }}>{t}</div>
          </Panel>
        ))}
      </Escenario>
    </Escena>
  );
};

// ─── Dos tipos de guarda ──────────────────────────────────────────────────────
export const Tipos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cN = useCue("negocio");
  const cC = useCue("confianza");
  const col = (x: number, titulo: string, items: string[], color: string, at: number, Icono: typeof Gauge) => (
    <div style={{ position: "absolute", left: x, top: 0, width: 440 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: transicion(frame, at, fps, 400, EXPO_OUT) }}>
        <Icono size={40} strokeWidth={1.5} color={color} />
        <span style={{ fontSize: 34, color }}>{titulo}</span>
      </div>
      {items.map((t, i) => (
        <div key={t} style={{ marginTop: 16, height: 90, borderRadius: 16, border: `1.5px solid ${linea}`, background: relleno, display: "flex", alignItems: "center", padding: "0 20px", fontSize: 30, opacity: transicion(frame, at + 8 + i * 6, fps, 400, EXPO_OUT) }}>
          {t}
        </div>
      ))}
    </div>
  );
  return (
    <Escena>
      <Cabeza at={cN} titulo="Dos tipos|de *guarda.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        {col(0, "de negocio", ["cancelaciones", "quejas", "ingresos"], v.azafran, cN + 4, Gauge)}
        {col(472, "de confianza", ["desbalance (SRM)", "latencia", "errores de carga"], c.b, cC + 4, AlertOctagon)}
        <Nota at={cC + 40} color={c.b} tam={26} style={{ position: "absolute", left: 0, top: 470 }}>
          las de confianza avisan que el experimento mismo falla: idea 05
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El margen ────────────────────────────────────────────────────────────────
export const Margen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("margen");
  const cI = useCue("intervalo");
  const filas: [string, number, number, boolean][] = [
    ["latencia", -0.5, 0.7, true],
    ["cancelaciones", 1.9, 5.7, false],
  ];
  return (
    <Escena>
      <Cabeza at={cM} titulo="¿Empeoró menos|que el *margen?*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Ejes ancho={912} alto={420} x={[-2, 6.5]} y={[0, 3]} at={cM + 4} rotuloX="cambio (%) →" marcasX={[{ v: -2, t: "−2" }, { v: 0, t: "0" }, { v: 1, t: "+1" }, { v: 6, t: "+6" }]}>
          {({ px, py }) => (
            <g>
              <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(3)} stroke={linea} strokeWidth={2} />
              <line x1={px(1)} y1={py(0)} x2={px(1)} y2={py(3)} stroke={v.azafran} strokeWidth={3} strokeDasharray="8 8" opacity={transicion(frame, cM + 20, fps, 400, EXPO_OUT)} />
              <text x={px(1) + 10} y={py(2.85)} fontFamily={serif} fontSize={30} fill={v.azafran} opacity={transicion(frame, cM + 20, fps, 400, EXPO_OUT)}>
                margen +1 %
              </text>
              {filas.map(([n, a, b, ok], i) => {
                const y = 2 - i * 1.1;
                const k = transicion(frame, cI + i * 20, fps, 600, EXPO_OUT);
                const col = ok ? c.c : ROJO;
                return (
                  <g key={n} opacity={k}>
                    <line x1={px(a)} y1={py(y)} x2={px(a + (b - a) * k)} y2={py(y)} stroke={col} strokeWidth={10} strokeLinecap="round" />
                    <circle cx={px((a + b) / 2)} cy={py(y)} r={12} fill={col} />
                    <text x={px(-1.9)} y={py(y) - 22} fontFamily={mono} fontSize={24} fill={col}>
                      {n}
                    </text>
                  </g>
                );
              })}
            </g>
          )}
        </Ejes>
        <Nota at={cI + 20} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 460 }}>
          latencia: todo el intervalo bajo +1 %, pasa
        </Nota>
        <Nota at={cI + 44} color={ROJO} tam={28} style={{ position: "absolute", left: 0, top: 520 }}>
          cancelaciones: el intervalo cruza el margen, no lanzas
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Métricas de razón ────────────────────────────────────────────────────────
export const Razon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cR = useCue("razon");
  const cP = useCue("parecen");
  const usuarios = [
    { s: 5, tasa: 0.6, col: v.azafran },
    { s: 2, tasa: 0.15, col: c.b },
    { s: 4, tasa: 0.4, col: c.c },
  ];
  return (
    <Escena>
      <Cabeza at={cR} titulo="Sorteas usuarios,|mides *sesiones.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Formula tam={58}>
          <Entra at={cR + 6}>
            <V>R</V>
            <Op>=</Op>
            <Frac arriba={<V color={v.azafran}>clics</V>} abajo={<V color={c.b}>sesiones</V>} />
          </Entra>
        </Formula>
        {usuarios.map((u, i) => (
          <div key={i} style={{ position: "absolute", left: 0, top: 190 + i * 110, display: "flex", alignItems: "center", gap: 16, opacity: transicion(frame, cR + 20 + i * 8, fps, 400, EXPO_OUT) }}>
            <User size={52} strokeWidth={1.6} color={u.col} />
            <div style={{ display: "flex", gap: 8 }}>
              {Array.from({ length: u.s }, (_, j) => (
                <div key={j} style={{ width: 92, height: 70, borderRadius: 12, border: `2px solid ${u.col}`, background: frame >= cP ? `${u.col}${Math.round(u.tasa * 200).toString(16).padStart(2, "0")}` : relleno, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 20, color: v.hueso }}>
                  sesión
                </div>
              ))}
            </div>
          </div>
        ))}
        <Nota at={cP + 10} color={ROJO} tam={28} style={{ position: "absolute", left: 0, top: 540 }}>
          las sesiones de una persona se parecen: no son independientes
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El método delta ──────────────────────────────────────────────────────────
export const Delta: React.FC = () => {
  const frame = useCurrentFrame();
  const cD = useCue("delta");
  const cDen = useCueAt("delta", 0.55);
  const cCov = useCueAt("delta", 0.8);
  const cC = useCue("covarianza");
  const fase = ultimo(frame, [cD + 20, cDen, cCov, cC]);
  const activas = [[], ["x"], ["y"], ["xy"], ["xy"]][fase + 1];
  return (
    <Escena>
      <Cabeza at={cD} titulo="El método|*delta.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Foco activas={activas}>
          <Formula tam={54}>
            <Entra at={cD + 6}>
              Var(<V>R̂</V>)<Op>≈</Op>
              <Frac
                arriba={
                  <>
                    <V id="x" color={v.azafran}>
                      σ²<Sub>X</Sub>
                    </V>
                    <Op>−</Op>
                    <V id="xy" color={c.c}>
                      2R·σ<Sub>XY</Sub>
                    </V>
                    <Op>+</Op>
                    <V id="y" color={c.b}>
                      R²·σ²<Sub>Y</Sub>
                    </V>
                  </>
                }
                abajo={
                  <>
                    <V color={c.b}>μ²</V>
                    <Sub>Y</Sub> · <V>n</V>
                  </>
                }
              />
            </Entra>
          </Formula>
        </Foco>
        <div style={{ position: "absolute", left: 0, top: 200, display: "flex", flexDirection: "column", gap: 14 }}>
          <Nota at={cD + 24} color={v.azafran} tam={28}>
            σ<sub>X</sub>²: cuánto varían los clics por usuario
          </Nota>
          <Nota at={cDen} color={c.b} tam={28}>
            σ<sub>Y</sub>²: cuánto varían las sesiones por usuario
          </Nota>
          <Nota at={cCov} color={c.c} tam={28}>
            σ<sub>XY</sub>: cuánto se mueven juntos; como suben juntos, resta
          </Nota>
          <Nota at={cC + 20} color={ROJO} tam={28}>
            todo se calcula por usuario, la unidad que sorteaste
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El ejemplo ───────────────────────────────────────────────────────────────
export const Ejemplo: React.FC = () => {
  const at = useCue("ejemplo");
  const largo = useCueAt("ejemplo", 1) - at;
  const filas: [string, string, string, string, boolean][] = [
    ["ingenuo, por sesión", "0,008", "2,5", "0,01", true],
    ["método delta, por usuario", "0,012", "1,67", "0,10", false],
  ];
  return (
    <Escena>
      <Cabeza at={at} titulo="Mismo efecto,|*otra conclusión.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <div style={{ fontFamily: serif, fontSize: 44, marginBottom: 30 }}>
          efecto = <span style={{ color: v.azafran }}>0,02</span> clics por sesión
        </div>
        {filas.map(([t, se, z, p, sig], i) => (
          <Panel key={t} caja={{ x: 0, y: 100 + i * 220, w: 912, h: 190 }} at={at + largo * (0.25 + i * 0.35)} color={sig ? c.c : ROJO}>
            <Rol color={sig ? c.c : ROJO}>{t}</Rol>
            <div style={{ display: "flex", alignItems: "baseline", gap: 30, marginTop: 14, fontFamily: serif, fontSize: 44 }}>
              <span>
                EE = {se}
              </span>
              <span>
                <i>z</i> = {z}
              </span>
              <span style={{ color: sig ? c.c : ROJO }}>
                <i>p</i> = {p}
              </span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 6 }}>{sig ? "“significativo”, pero el ruido estaba subestimado" : "con el ruido bien medido, no es significativo"}</div>
          </Panel>
        ))}
        <div style={{ position: "absolute", left: 0, top: 560, fontSize: 24, fontWeight: 200, color: v.ceniza }}>números ilustrativos</div>
      </Escenario>
    </Escena>
  );
};

// ─── La regla ─────────────────────────────────────────────────────────────────
export const Regla: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("regla");
  return (
    <Escena>
      <Cabeza at={at} titulo="Analiza lo que|*sorteaste.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 200 }} at={at + 6} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <User size={64} strokeWidth={1.4} color={c.c} />
          <div>
            <Rol color={c.c}>Unidad de sorteo = unidad de análisis</Rol>
            <div style={{ fontSize: 34, marginTop: 8 }}>si sorteaste usuarios, el error se mide por usuario</div>
          </div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 250, display: "flex", gap: 14, opacity: transicion(frame, at + 40, fps, 400, EXPO_OUT) }}>
          <Chip texto="método delta" activo tam={28} />
          <Chip texto="bootstrap por usuario" tam={28} />
        </div>
        <Sube at={at + 60} style={{ position: "absolute", left: 0, top: 340 }}>
          <Chip texto="Deng, Knoblich y Lu (2018) · KDD" tam={22} />
        </Sube>
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
        <Cinetico at={cCta} texto="Una decide,|las otras *protegen.*" style={{ fontSize: 92 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 07/17 · interferencia
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
