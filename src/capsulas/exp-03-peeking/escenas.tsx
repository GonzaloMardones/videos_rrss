import React from "react";
import { CalendarDays, Check, Eye, Infinity as Infinito, Layers } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cuenta, Formula, Op, serif, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Traza } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Chip, Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 03/17";
// Un paseo ilustrativo del estadístico z bajo "no hay efecto": cruza 1,96 el día 9 y termina cerca de cero.
const PASEO = [0.9, 0.9, 1.4, 1.5, 1.4, 1.78, 1.6, 1.85, 2.08, 1.9, 2.1, 1.9, 1.75, 1.8, 1.6, 1.5, 1.55, 1.4, 1.2, 1.0, 1.1, 0.9, 0.7, 0.8, 0.6, 0.4, 0.3, 0.1, -0.05, -0.1];
const OBF = [4.56, 3.23, 2.63, 2.28, 2.04];

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

const GraficoPaseo: React.FC<{ at: number; alto?: number; marcar?: number }> = ({ at, alto = 440, marcar }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 1800, EXPO_IN_OUT);
  const m = marcar === undefined ? 0 : transicion(frame, marcar, fps, 400, backOut);
  return (
    <Ejes ancho={912} alto={alto} x={[1, 30]} y={[-2.8, 2.8]} at={at - 4} rotuloX="días →" rotuloY="estadístico z" marcasX={[{ v: 1, t: "1" }, { v: 9, t: "9" }, { v: 30, t: "30" }]}>
      {({ px, py }) => (
        <g>
          <rect x={px(1)} y={py(1.96)} width={px(30) - px(1)} height={py(-1.96) - py(1.96)} fill={c.c} opacity={0.06} />
          {[1.96, -1.96].map((u) => (
            <line key={u} x1={px(1)} y1={py(u)} x2={px(30)} y2={py(u)} stroke={v.azafran} strokeWidth={2.5} strokeDasharray="8 8" />
          ))}
          <line x1={px(1)} y1={py(0)} x2={px(30)} y2={py(0)} stroke={linea} strokeWidth={2} />
          <text x={px(30)} y={py(1.96) - 10} textAnchor="end" fontFamily={serif} fontSize={28} fill={v.azafran}>
            1,96
          </text>
          <Traza pts={PASEO.map((z, i) => [px(i + 1), py(z)] as [number, number])} k={k} color={v.hueso} ancho={4} />
          {m > 0 ? (
            <g opacity={Math.min(1, m)}>
              <circle cx={px(9)} cy={py(PASEO[8])} r={14 * Math.min(1.2, m)} fill={ROJO} />
              <text x={px(9) + 22} y={py(PASEO[8]) - 18} fontFamily={mono} fontSize={24} fill={ROJO}>
                día 9: “significativo”
              </text>
            </g>
          ) : null}
        </g>
      )}
    </Ejes>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("gancho");
  const cStop = useCueAt("gancho", 0.45);
  const pvals = ["0,41", "0,38", "0,16", "0,13", "0,16", "0,08", "0,11", "0,06", "0,04"];
  const sello = transicion(frame, cStop + 10, fps, 500, backOut);
  return (
    <Escena>
      <Escenario alto={480}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 32, marginBottom: 16 }}>
          <CalendarDays size={38} strokeWidth={1.6} color={v.azafran} /> cada mañana, el p-valor
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, width: 912 }}>
          {pvals.map((p, i) => {
            const rojo = i === 8;
            return (
              <div key={i} style={{ height: 110, borderRadius: 16, border: `2px solid ${rojo ? ROJO : linea}`, background: rojo ? `${ROJO}22` : relleno, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: transicion(frame, at + 4 + i * 4, fps, 300, EXPO_OUT) }}>
                <div style={{ fontFamily: mono, fontSize: 20, color: v.ceniza }}>día {i + 1}</div>
                <div style={{ fontFamily: serif, fontSize: 40, color: rojo ? ROJO : v.hueso }}>{p}</div>
              </div>
            );
          })}
        </div>
        {sello > 0 ? (
          <div style={{ position: "absolute", left: 560, top: 320, padding: "8px 22px", borderRadius: 12, border: `4px solid ${ROJO}`, color: ROJO, fontSize: 44, fontWeight: 600, letterSpacing: "0.1em", transform: `rotate(-8deg) scale(${sello})` }}>STOP</div>
        ) : null}
      </Escenario>
      <div style={{ marginTop: 40 }}>
        <Cinetico at={cStop + 30} texto="Mirar cada día|*infla el error.*" style={{ fontSize: 96 }} />
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
      <Cinetico at={6} texto="Mirar antes|de *tiempo.*" style={{ marginTop: 18, fontSize: 120 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>peeking y pruebas secuenciales · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── El paseo aleatorio ───────────────────────────────────────────────────────
export const Paseo: React.FC = () => {
  const cP = useCue("paseo");
  const cV = useCue("vistazo");
  return (
    <Escena>
      <Cabeza at={cP} titulo="El azar|*también camina.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <GraficoPaseo at={cP + 6} marcar={cV + 20} />
        <Nota at={cP + 20} color={v.hueso} tam={28} style={{ position: "absolute", left: 0, top: 470 }}>
          el tratamiento no hace nada, y aun así el estadístico sube y baja · ilustrativo
        </Nota>
        <Nota at={cV + 30} color={v.azafran} tam={28} style={{ position: "absolute", left: 0, top: 550 }}>
          1,96 vale para una sola mirada: cada vistazo es otra oportunidad de cruzarlo
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Cuánto crece el error ────────────────────────────────────────────────────
export const Cuanto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("cuanto");
  const largo = useCueAt("cuanto", 1) - at;
  const filas: [string, number][] = [
    ["1 mirada", 5],
    ["5 miradas", 14],
    ["10 miradas", 19],
    ["30 miradas", 28],
  ];
  return (
    <Escena>
      <Cabeza at={at} titulo="¿Cuánto crece|el *error?*" />
      <Escenario alto={680} style={{ marginTop: 40 }}>
        {filas.map(([t, p], i) => {
          const a = at + largo * (0.12 + i * 0.2);
          const k = transicion(frame, a, fps, 700, EXPO_OUT);
          const col = p <= 5 ? c.c : p < 20 ? v.azafran : ROJO;
          return (
            <div key={t} style={{ position: "absolute", left: 0, top: i * 130, width: 912 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <span style={{ fontSize: 32 }}>{t}</span>
                <span style={{ fontFamily: serif, fontSize: 48, color: col, opacity: k }}>
                  <Cuenta at={a} hasta={p} ms={700} /> %
                </span>
              </div>
              <div style={{ height: 30, borderRadius: 10, background: "#16161B", marginTop: 8 }}>
                <div style={{ height: 30, width: `${(p / 30) * 100 * k}%`, borderRadius: 10, background: col }} />
              </div>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 0, top: 560, fontSize: 24, fontWeight: 200, color: v.ceniza }}>probabilidad de algún falso positivo con umbral 1,96 en cada mirada · simulación con 200.000 experimentos sin efecto</div>
      </Escenario>
    </Escena>
  );
};

// ─── Solución 1: tamaño fijo ──────────────────────────────────────────────────
export const Fijo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("fijo");
  const k = transicion(frame, at + 10, fps, 1400, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={at} titulo="Solución 1:|*mirar una vez.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <div style={{ position: "relative", height: 200 }}>
          <div style={{ position: "absolute", left: 0, top: 90, width: 912, height: 8, borderRadius: 4, background: linea }} />
          <div style={{ position: "absolute", left: 0, top: 90, width: 912 * k, height: 8, borderRadius: 4, background: c.c }} />
          <div style={{ position: "absolute", left: 870, top: 30, opacity: transicion(frame, at + 50, fps, 400, backOut) }}>
            <Eye size={56} strokeWidth={1.6} color={c.c} />
          </div>
          <div style={{ position: "absolute", left: 0, top: 130, fontSize: 28, color: v.niebla }}>inicio</div>
          <div style={{ position: "absolute", right: 0, top: 130, fontSize: 28, color: c.c }}>n del MDE · una mirada</div>
        </div>
        <Panel caja={{ x: 0, y: 260, w: 912, h: 170 }} at={at + 30} color={c.c}>
          <Rol color={c.c}>Antes de lanzar</Rol>
          <Formula tam={54} style={{ marginTop: 8 }}>
            <V>n</V>
            <Op>≈</Op>16<V color={c.b}>σ²</V> / <V color={v.azafran}>δ²</V>
            <span style={{ fontSize: 28, fontFamily: "inherit", color: v.niebla, marginLeft: 16 }}>idea 01</span>
          </Formula>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── Solución 2: secuencial por grupos ────────────────────────────────────────
const Fronteras: React.FC<{ atObf: number; atPocock?: number }> = ({ atObf, atPocock }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const kO = transicion(frame, atObf, fps, 1200, EXPO_IN_OUT);
  const kP = atPocock === undefined ? 0 : transicion(frame, atPocock, fps, 800, EXPO_IN_OUT);
  return (
    <Ejes ancho={912} alto={420} x={[0.7, 5.3]} y={[1.5, 5]} at={atObf - 6} rotuloX="mirada →" rotuloY="umbral z" marcasX={[1, 2, 3, 4, 5].map((n) => ({ v: n, t: String(n) }))}>
      {({ px, py }) => (
        <g>
          <line x1={px(0.7)} y1={py(1.96)} x2={px(5.3)} y2={py(1.96)} stroke={v.ceniza} strokeWidth={2} strokeDasharray="6 8" />
          <text x={px(5.3)} y={py(1.96) + 32} textAnchor="end" fontFamily={serif} fontSize={26} fill={v.ceniza}>
            1,96 de una sola mirada
          </text>
          <Traza pts={OBF.map((b, i) => [px(i + 1), py(b)] as [number, number])} k={kO} color={c.c} ancho={5} />
          {OBF.map((b, i) => (
            <g key={i} opacity={transicion(frame, atObf + 8 + i * 6, fps, 400, EXPO_OUT)}>
              <circle cx={px(i + 1)} cy={py(b)} r={11} fill={c.c} />
              <text x={px(i + 1) + 16} y={py(b) - 12} fontFamily={serif} fontSize={30} fill={c.c}>
                {b.toFixed(2).replace(".", ",")}
              </text>
            </g>
          ))}
          {kP > 0 ? <Traza pts={[[px(1), py(2.41)], [px(5), py(2.41)]]} k={kP} color={c.b} ancho={5} /> : null}
          {kP > 0 ? (
            <text x={px(1)} y={py(2.41) + 36} fontFamily={serif} fontSize={30} fill={c.b} opacity={kP}>
              Pocock: 2,41 en cada mirada
            </text>
          ) : null}
        </g>
      )}
    </Ejes>
  );
};

export const Grupos: React.FC = () => {
  const cG = useCue("grupos");
  const cO = useCue("obf");
  const cE = useCue("exigente");
  return (
    <Escena>
      <Cabeza at={cG} titulo="Solución 2:|repartir el *5 %.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Fronteras atObf={cO} />
        <Nota at={cG + 20} hasta={cO} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 460 }}>
          decides antes cuántas miradas, y el 5 % se reparte entre ellas
        </Nota>
        <Nota at={cE + 4} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 470 }}>
          O’Brien-Fleming: muy exigente al principio, casi 1,96 al final
        </Nota>
        <Nota at={cE + 24} color={v.azafran} tam={28} style={{ position: "absolute", left: 0, top: 550 }}>
          solo paras temprano si el efecto es enorme
        </Nota>
      </Escenario>
    </Escena>
  );
};

export const Pocock: React.FC = () => {
  const at = useCue("pocock");
  return (
    <Escena>
      <Cabeza at={at} titulo="O un umbral|*parejo.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Fronteras atObf={at - 60} atPocock={at + 10} />
        <Nota at={at + 30} color={c.b} tam={28} style={{ position: "absolute", left: 0, top: 470 }}>
          más fácil parar temprano, pero al final exige más que 1,96
        </Nota>
        <Sube at={at + 40} style={{ position: "absolute", left: 0, top: 560 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <Chip texto="ambas suman α = 5 % · 5 miradas" tam={22} />
          </div>
        </Sube>
      </Escenario>
    </Escena>
  );
};

// ─── Solución 3: siempre válidas ──────────────────────────────────────────────
export const Siempre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("siempre");
  const k = transicion(frame, at + 10, fps, 1600, EXPO_IN_OUT);
  const ts = Array.from({ length: 30 }, (_, i) => i + 1);
  const ancho = (t: number) => 2.4 * Math.sqrt(Math.log(t + 3) / (t + 1)) + 0.15;
  return (
    <Escena>
      <Cabeza at={at} titulo="Solución 3: mirar|*cuando quieras.*" tam={80} />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Ejes ancho={912} alto={400} x={[1, 30]} y={[-2.3, 2.7]} at={at + 4} rotuloX="días →" rotuloY="efecto estimado">
          {({ px, py }) => (
            <g>
              <path
                d={`M${ts.map((t) => `${px(t)},${py(0.25 + ancho(t))}`).join("L")}L${ts
                  .slice()
                  .reverse()
                  .map((t) => `${px(t)},${py(0.25 - ancho(t))}`)
                  .join("L")}Z`}
                fill={c.c}
                opacity={0.18 * k}
              />
              <Traza pts={ts.map((t) => [px(t), py(0.25 + ancho(t))] as [number, number])} k={k} color={c.c} ancho={3} />
              <Traza pts={ts.map((t) => [px(t), py(0.25 - ancho(t))] as [number, number])} k={k} color={c.c} ancho={3} />
              <line x1={px(1)} y1={py(0)} x2={px(30)} y2={py(0)} stroke={v.ceniza} strokeWidth={2} strokeDasharray="6 8" />
            </g>
          )}
        </Ejes>
        <Nota at={at + 40} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 440 }}>
          un intervalo que vale en cualquier momento: se cierra a medida que llegan datos
        </Nota>
        <Sube at={at + 60} style={{ position: "absolute", left: 0, top: 530, display: "flex", gap: 12, alignItems: "center" }}>
          <Infinito size={34} strokeWidth={1.6} color={c.c} />
          <Chip texto="mSPRT · Johari y otros (2017)" tam={22} />
          <span style={{ fontSize: 24, fontWeight: 200, color: v.niebla }}>costo: un poco menos de poder</span>
        </Sube>
      </Escenario>
    </Escena>
  );
};

// ─── La regla práctica ────────────────────────────────────────────────────────
export const Regla: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("regla");
  const largo = useCueAt("regla", 1) - at;
  const items = ["cuánto dura", "cuántas veces miras", "qué te hace parar"];
  const dias = ["L", "M", "M", "J", "V", "S", "D"];
  return (
    <Escena>
      <Cabeza at={at} titulo="Escríbelo|*antes.*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        {items.map((t, i) => (
          <Panel key={t} caja={{ x: 0, y: i * 110, w: 912, h: 92 }} at={at + largo * (0.08 + i * 0.12)} estilo={{ display: "flex", alignItems: "center", gap: 18, padding: "0 22px" }}>
            <Check size={36} strokeWidth={2.2} color={c.c} />
            <span style={{ fontSize: 34 }}>{t}</span>
          </Panel>
        ))}
        <div style={{ position: "absolute", left: 0, top: 370, opacity: transicion(frame, at + largo * 0.55, fps, 500, EXPO_OUT) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 30, marginBottom: 14 }}>
            <Layers size={34} strokeWidth={1.6} color={v.azafran} /> semanas completas
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1].map((s) =>
              dias.map((d, i) => (
                <div key={`${s}-${i}`} style={{ width: 58, height: 58, borderRadius: 10, border: `2px solid ${v.azafran}`, background: `${v.azafran}${i >= 5 ? "66" : "22"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 22 }}>
                  {d}
                </div>
              )),
            )}
          </div>
          <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 12 }}>para no confundir el efecto con el día de la semana</div>
        </div>
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
        <Cinetico at={cCta} texto="Mirar no es el problema.|Decidir mirando, *sí.*" style={{ fontSize: 76 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 04/17 · comparaciones múltiples
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
