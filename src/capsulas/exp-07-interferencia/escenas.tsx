import React from "react";
import { Car, Check, Clock, Share2, Syringe, Tag, TriangleAlert, User } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cuenta, Entra, Formula, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Nota, Panel, ROJO, Rol } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 07/17";
const azar = (i: number) => {
  const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
};

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

// El mercado: pasajeros tratados a la izquierda, control a la derecha, autos que se van con los tratados.
const Mercado: React.FC<{ at: number; atRobo: number; alto?: number }> = ({ at, atRobo, alto = 420 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const robo = transicion(frame, atRobo, fps, 1500, EXPO_IN_OUT);
  return (
    <div style={{ position: "relative", width: 912, height: alto }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 260 }}>
        <Rol color={v.azafran}>Con descuento</Rol>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 14 }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{ position: "relative", opacity: transicion(frame, at + i, fps, 300, EXPO_OUT) }}>
              <User size={56} strokeWidth={1.6} color={v.azafran} />
              <Tag size={22} strokeWidth={2} color={v.azafran} style={{ position: "absolute", right: 6, top: 0 }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", right: 0, top: 0, width: 260, textAlign: "right" }}>
        <Rol color={c.b}>Control</Rol>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 14 }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{ opacity: transicion(frame, at + 4 + i, fps, 300, EXPO_OUT) }}>
              <User size={56} strokeWidth={1.6} color={c.b} />
            </div>
          ))}
        </div>
        {robo > 0.7 ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, marginTop: 14, fontSize: 24, color: ROJO }}>
            <Clock size={26} strokeWidth={1.8} color={ROJO} /> sin conductores
          </div>
        ) : null}
      </div>
      {Array.from({ length: 8 }, (_, i) => {
        const x0 = 330 + (i % 4) * 66;
        const y0 = 40 + Math.floor(i / 4) * 80;
        const destino = i < 6;
        const x = x0 - (destino ? robo * (x0 - 60 - (i % 3) * 60) : 0);
        const y = y0 + (destino ? robo * (230 - y0 + Math.floor(i / 3) * 70) : 0);
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, opacity: transicion(frame, at + 10 + i, fps, 300, EXPO_OUT) }}>
            <Car size={52} strokeWidth={1.6} color={v.hueso} />
          </div>
        );
      })}
    </div>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const at = useCue("gancho");
  const cR = useCueAt("gancho", 0.45);
  const cM = useCueAt("gancho", 0.85);
  return (
    <Escena>
      <Escenario alto={460}>
        <Mercado at={at + 4} atRobo={cR} />
      </Escenario>
      <div style={{ marginTop: 40 }}>
        <Cinetico at={cM} texto="Tu experimento|*mintió.*" style={{ fontSize: 110 }} />
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
      <Cinetico at={6} texto="*Interferencia.*" style={{ marginTop: 18, fontSize: 124 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>y la unidad de aleatorización · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── SUTVA ────────────────────────────────────────────────────────────────────
export const Sutva: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("supuesto");
  const cN = useCue("nombre");
  const tacha = transicion(frame, cS + 50, fps, 500, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cS} titulo="El supuesto que|*nadie dice.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Formula tam={64}>
          <Entra at={cS + 10}>
            <V color={v.azafran}>Y</V>
            <Sub>i</Sub>(<V color={c.c}>T</V>
            <Sub>i</Sub>)
            <Op>,</Op>
            <span style={{ position: "relative", color: v.ceniza }}>
              no <V color={v.ceniza}>Y</V>
              <Sub>i</Sub>(<V color={v.ceniza}>T</V>
              <Sub>1</Sub>, …, <V color={v.ceniza}>T</V>
              <Sub>n</Sub>)
              <span style={{ position: "absolute", left: 0, top: "50%", height: 4, width: `${tacha * 100}%`, background: ROJO }} />
            </span>
          </Entra>
        </Formula>
        <svg width={912} height={260} style={{ position: "absolute", left: 0, top: 150, overflow: "visible" }}>
          {[0, 1, 2, 3, 4].map((i) => {
            const ang = (-90 + i * 45 - 90) * (Math.PI / 180);
            const x = 456 + Math.cos(ang) * 260;
            const y = 230 + Math.sin(ang) * 200;
            return (
              <g key={i} opacity={transicion(frame, cS + 20 + i * 4, fps, 400, EXPO_OUT)}>
                <line x1={x} y1={y} x2={456} y2={230} stroke={tacha > 0.5 ? linea : v.ceniza} strokeWidth={3} strokeDasharray="8 8" />
                <circle cx={x} cy={y} r={26} fill={relleno} stroke={v.ceniza} strokeWidth={3} />
              </g>
            );
          })}
          <circle cx={456} cy={230} r={34} fill={relleno} stroke={v.azafran} strokeWidth={4} />
          <text x={456} y={242} textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize={34} fill={v.azafran}>
            i
          </text>
        </svg>
        <Nota at={cN + 6} color={c.c} tam={30} style={{ position: "absolute", left: 0, top: 470 }}>
          SUTVA: mi resultado depende solo de mi tratamiento
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Dónde se rompe ───────────────────────────────────────────────────────────
export const Donde: React.FC = () => {
  const at = useCue("donde");
  const largo = useCueAt("donde", 1) - at;
  const casos: { Icono: typeof Car; t: string; d: string }[] = [
    { Icono: Car, t: "Marketplaces", d: "tratados y control comparten la misma oferta" },
    { Icono: Share2, t: "Redes sociales", d: "tus amigos te influyen" },
    { Icono: Syringe, t: "Vacunas", d: "mi vacuna también te protege a ti" },
  ];
  return (
    <Escena>
      <Cabeza at={at} titulo="Dónde *se rompe.*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        {casos.map((k, i) => (
          <Panel key={k.t} caja={{ x: 0, y: i * 180, w: 912, h: 160 }} at={at + largo * (0.08 + i * 0.3)} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
            <k.Icono size={56} strokeWidth={1.5} color={ROJO} />
            <div>
              <div style={{ fontSize: 38 }}>{k.t}</div>
              <div style={{ fontSize: 28, fontWeight: 200, color: v.niebla }}>{k.d}</div>
            </div>
          </Panel>
        ))}
      </Escenario>
    </Escena>
  );
};

// ─── El sesgo ─────────────────────────────────────────────────────────────────
export const Sesgo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cI = useCue("infla");
  const cR = useCue("real");
  const k1 = transicion(frame, cR + 6, fps, 800, EXPO_OUT);
  const k2 = transicion(frame, cR + 40, fps, 800, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cI} titulo="La diferencia|se *infla.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <div style={{ transform: "scale(0.8)", transformOrigin: "top left" }}>
          <Mercado at={cI - 40} atRobo={cI - 30} alto={360} />
        </div>
        {frame >= cR ? (
          <div style={{ position: "absolute", left: 0, top: 330, width: 912 }}>
            {[
              ["en el experimento", 10, ROJO, k1],
              ["lanzado a todos", 3, c.c, k2],
            ].map(([t, n, col, k]) => (
              <div key={t as string} style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
                  <span>{t}</span>
                  <span style={{ fontFamily: serif, fontSize: 44, color: col as string }}>+{n} %</span>
                </div>
                <div style={{ height: 34, borderRadius: 10, background: "#16161B", marginTop: 8 }}>
                  <div style={{ height: 34, width: `${(n as number) * 9 * (k as number)}%`, borderRadius: 10, background: col as string }} />
                </div>
              </div>
            ))}
            <div style={{ fontSize: 24, fontWeight: 200, color: v.ceniza, marginTop: 16 }}>viajes · números ilustrativos</div>
          </div>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── Aleatorizar por grupos ───────────────────────────────────────────────────
export const Cluster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cG = useCue("grupos");
  const cD = useCue("deff");
  const cS = useCue("seis");
  const res = transicion(frame, cS + 30, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cG} titulo="Sortear|*por grupos.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, width: 912 }}>
          {Array.from({ length: 12 }, (_, i) => {
            const a = azar(i * 3 + 1) > 0;
            return (
              <div key={i} style={{ height: 96, borderRadius: 14, border: `2.5px solid ${a ? v.azafran : c.b}`, background: `${a ? v.azafran : c.b}1f`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 22, color: a ? v.azafran : c.b, opacity: transicion(frame, cG + 6 + i * 2, fps, 300, EXPO_OUT) }}>
                zona {String.fromCharCode(65 + i)}
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 0, top: 260 }}>
          <Formula tam={64}>
            <Entra at={cD}>
              DEFF<Op>=</Op>1<Op>+</Op>(<V color={v.azafran}>m</V> − 1)<Op>·</Op>
              <V color={c.b}>ρ</V>
            </Entra>
          </Formula>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
            <Nota at={cD + 16} color={v.azafran} tam={26}>
              <i style={{ fontFamily: serif }}>m</i>: personas por grupo
            </Nota>
            <Nota at={cD + 24} color={c.b} tam={26}>
              <i style={{ fontFamily: serif }}>ρ</i>: cuánto se parecen entre sí los de un mismo grupo
            </Nota>
          </div>
        </div>
        {frame >= cS ? (
          <div style={{ position: "absolute", left: 0, top: 500 }}>
            <Formula tam={58}>
              <Entra at={cS}>
                1<Op>+</Op>99<Op>·</Op>0,05<Op>=</Op>
                <span style={{ color: ROJO, fontSize: 80, display: "inline-block", transform: `scale(${res})` }}>
                  <Cuenta at={cS + 10} hasta={5.95} decimales={2} ms={800} />
                </span>
                <span style={{ fontSize: 28, fontFamily: "inherit", color: v.niebla, marginLeft: 14 }}>veces más datos</span>
              </Entra>
            </Formula>
          </div>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── Switchback ───────────────────────────────────────────────────────────────
export const Switchback: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("switchback");
  const cA = useCue("arrastre");
  const bloques = Array.from({ length: 12 }, (_, i) => (azar(i + 40) > 0 ? "A" : "B"));
  return (
    <Escena>
      <Cabeza at={cS} titulo="Alternar|*en el tiempo.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Rol>Toda la zona · hora a hora</Rol>
        <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
          {bloques.map((b, i) => (
            <div key={i} style={{ width: 70, height: 110, borderRadius: 12, background: b === "A" ? v.azafran : c.b, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: v.vacio, opacity: transicion(frame, cS + 10 + i * 3, fps, 300, EXPO_OUT) }}>
              <span style={{ fontFamily: mono, fontSize: 30, fontWeight: 600 }}>{b}</span>
              <span style={{ fontFamily: mono, fontSize: 18 }}>{8 + i}:00</span>
            </div>
          ))}
        </div>
        <Nota at={cS + 40} color={c.c} tam={28} style={{ marginTop: 26 }}>
          el orden se sortea; cada hora todos ven la misma versión
        </Nota>
        <Panel caja={{ x: 0, y: 330, w: 912, h: 170 }} at={cA + 4} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <TriangleAlert size={52} strokeWidth={1.5} color={ROJO} />
          <div>
            <Rol color={ROJO}>Arrastre</Rol>
            <div style={{ fontSize: 30, marginTop: 6 }}>si lo que pasa a las 9 sigue afectando a las 10, el diseño se contamina</div>
          </div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── El dilema: sesgo contra varianza ─────────────────────────────────────────
const Diana: React.FC<{ x: number; titulo: string; sub: string; centro: [number, number]; disp: number; col: string; at: number }> = ({ x, titulo, sub, centro, disp, col, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: x, top: 0, width: 430, textAlign: "center" }}>
      <svg width={360} height={360} style={{ overflow: "visible" }}>
        {[160, 110, 60].map((r, i) => (
          <circle key={r} cx={180} cy={180} r={r} fill="none" stroke={i === 2 ? v.hueso : linea} strokeWidth={3} />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={i} cx={180 + centro[0] + azar(i + 7 * x) * disp} cy={180 + centro[1] + azar(i + 100 + x) * disp} r={9} fill={col} opacity={transicion(frame, at + i * 2, fps, 300, EXPO_OUT)} />
        ))}
      </svg>
      <div style={{ fontSize: 34, marginTop: 10, color: col }}>{titulo}</div>
      <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>{sub}</div>
    </div>
  );
};

export const Dilema: React.FC = () => {
  const at = useCue("dilema");
  const largo = useCueAt("dilema", 1) - at;
  return (
    <Escena>
      <Cabeza at={at} titulo="Sesgo|o *ruido.*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Diana x={0} titulo="por usuario" sub="preciso, pero sesgado" centro={[70, -60]} disp={22} col={ROJO} at={at + largo * 0.1} />
        <Diana x={482} titulo="por grupo" sub="insesgado, pero ruidoso" centro={[0, 0]} disp={90} col={c.c} at={at + largo * 0.4} />
        <Nota at={at + largo * 0.7} color={v.azafran} tam={28} style={{ position: "absolute", left: 0, top: 520 }}>
          elige según cuánto se contagian tus unidades
        </Nota>
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
        <Cinetico at={cCta} texto="¿A quién afecta|*el tratamiento?*" style={{ fontSize: 88 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 08/17 · el zoológico de efectos
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
