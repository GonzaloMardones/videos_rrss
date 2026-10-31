import React from "react";
import { ArrowDownUp, Bot, CalendarClock, Check, CircleOff, Cog, Filter, Gauge, Hourglass, Mountain, Pickaxe } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Formula, Frac, Op, serif } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Traza } from "../../estilos/vacio/causal";
import { Flecha, Lienzo, type P } from "../../estilos/vacio/grafo";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "Cuasi-experimentos · 03";

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

const azar = (i: number) => {
  const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
};

// ─── Gancho: el molino y el mineral blando ────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("molino");
  const cB = useCue("blando");
  const largo = useCueAt("molino", 1) - cM;
  const res = transicion(frame, cM + largo * 0.45, fps, 500, backOut);
  const kB = transicion(frame, cB + 4, fps, 500, EXPO_OUT);
  return (
    <Escena>
      <Escenario alto={600}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 140 }} at={cM + 4} color={c.b} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Cog size={60} strokeWidth={1.4} color={c.b} style={{ transform: `rotate(${frame * 2}deg)` }} />
          <div>
            <div style={{ fontSize: 26, color: v.niebla }}>molino SAG</div>
            <div style={{ fontSize: 34 }}>+ control experto</div>
          </div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 180, display: "flex", alignItems: "baseline", gap: 20 }}>
          <span style={{ fontFamily: serif, fontSize: 130, color: c.c, display: "inline-block", transform: `scale(${res})`, transformOrigin: "left" }}>+8 %</span>
          <span style={{ fontSize: 32, opacity: res }}>toneladas por hora</span>
        </div>
        <Panel caja={{ x: 0, y: 380, w: 912, h: 140 }} at={cB + 2} color={ROJO} discontinuo estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Mountain size={56} strokeWidth={1.4} color={ROJO} />
          <div style={{ fontSize: 34 }}>
            el mismo mes: <span style={{ color: ROJO }}>mineral más blando</span>
          </div>
        </Panel>
        <div style={{ position: "absolute", left: 720, top: 190, fontFamily: serif, fontSize: 120, color: ROJO, opacity: kB }}>¿?</div>
      </Escenario>
      <div style={{ marginTop: 20 }}>
        <Cinetico at={cB + 24} texto="¿Fue el control|*o fue la mina?*" style={{ fontSize: 88 }} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, display: "flex", justifyContent: "center" }}>
      <Constelacion at={-60} ancho={700} forma="red" cantidad={520} />
    </div>
    <div style={{ marginTop: 430 }}>
      <Rotulo at={2}>{SERIE}</Rotulo>
      <Cinetico at={6} texto="Amenazas a|*la validez.*" style={{ marginTop: 18, fontSize: 130 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>en una planta minera · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Las seis amenazas ────────────────────────────────────────────────────────
const AMENAZAS: [string, string, typeof Cog, string, string][] = [
  ["historia", "historia", CalendarClock, "otro cambio en la misma fecha", "dureza, mezcla de la mina, agua"],
  ["maduracion", "maduración", Hourglass, "el sistema cambia solo", "revestimientos gastados, operadores que aprenden"],
  ["seleccion", "selección", Filter, "grupos distintos desde antes", "la línea con el mejor mineral"],
  ["regresion", "regresión a la media", ArrowDownUp, "los extremos vuelven solos", "intervenir tras la peor semana"],
  ["instrumento", "instrumentación", Gauge, "cambia la regla de medir", "analizador recalibrado, modelo reentrenado"],
  ["desgaste", "desgaste de la muestra", CircleOff, "se pierden datos de forma desigual", "días con detención descartados solo en la prueba"],
];

export const Amenazas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cL = useCue("lista");
  const cues = [useCue("historia"), useCue("maduracion"), useCue("seleccion"), useCue("regresion"), useCue("instrumento"), useCue("desgaste")];
  const activa = cues.reduce((acc, a, i) => (frame >= a ? i : acc), -1);
  const kR = transicion(frame, cues[3] + 30, fps, 500, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cL} titulo="Seis enemigos|*en una concentradora.*" tam={80} />
      <Escenario alto={780} style={{ marginTop: 30 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, width: 912 }}>
          {AMENAZAS.map(([id, nombre, I, que, ej], i) => {
            const on = i === activa;
            const visto = i < activa;
            const k = transicion(frame, cL + 20 + i * 4, fps, 400, EXPO_OUT);
            const col = on ? v.azafran : visto ? ROJO : "#2A2A33";
            return (
              <div key={id} style={{ height: 222, boxSizing: "border-box", borderRadius: 20, border: `2.5px solid ${col}`, background: on ? "rgba(255,184,0,0.08)" : relleno, padding: "16px 18px", opacity: k * (activa >= 0 && !on && !visto ? 0.45 : 1), transform: `scale(${on ? 1.02 : 1})` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontFamily: mono, fontSize: 24, color: col === "#2A2A33" ? v.niebla : col }}>{i + 1}</span>
                  <I size={34} strokeWidth={1.5} color={on ? v.azafran : visto ? ROJO : v.niebla} />
                  <span style={{ fontSize: 28 }}>{nombre}</span>
                </div>
                <div style={{ fontSize: 23, fontWeight: 300, color: v.hueso, marginTop: 12 }}>{que}</div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 21, fontWeight: 200, color: v.niebla, marginTop: 8, opacity: on || visto ? 1 : 0 }}>
                  <Pickaxe size={22} strokeWidth={1.6} color={v.niebla} style={{ flexShrink: 0, marginTop: 2 }} />
                  {ej}
                </div>
                {id === "regresion" && kR > 0 ? (
                  <div style={{ fontFamily: serif, fontSize: 26, color: v.azafran, marginTop: 8, opacity: kR }}>
                    E[X₂ | X₁] = μ + ρ (X₁ − μ)
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <Nota at={cL + 30} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 710 }}>
          Campbell y Stanley (1963) · Shadish, Cook y Campbell (2002), cap. 2
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Autocorrelación y tamaño efectivo ────────────────────────────────────────
const SERIE_REC = (() => {
  const out: number[] = [];
  let e = 0;
  for (let i = 0; i < 60; i++) {
    e = 0.7 * e + (azar(i + 7) * 2 - 1) * 1.2;
    out.push(88 + e);
  }
  return out;
})();

export const Autocorr: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("silenciosa");
  const cN = useCue("neff");
  const cP = useCue("napier");
  const largoN = useCueAt("neff", 1) - cN;
  const k = transicion(frame, cS + 10, fps, 1600, EXPO_IN_OUT);
  const kEf = transicion(frame, cN + largoN * 0.7, fps, 900, EXPO_IN_OUT);
  const efectivos = new Set(Array.from({ length: 11 }, (_, i) => Math.round(i * 5.5)));
  return (
    <Escena>
      <Cabeza at={cS} titulo="La amenaza|*silenciosa.*" />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <Ejes ancho={912} alto={300} x={[0, 59]} y={[84, 92]} at={cS} rotuloX="días →" rotuloY="recuperación %">
          {({ px, py }) => (
            <g>
              <Traza pts={SERIE_REC.map((r, i) => [px(i), py(r)] as P)} k={k} color={c.c} ancho={4} />
              {SERIE_REC.map((r, i) => (
                <circle key={i} cx={px(i)} cy={py(r)} r={4} fill={c.c} opacity={k} />
              ))}
            </g>
          )}
        </Ejes>
        <div style={{ position: "absolute", left: 0, top: 330 }}>
          <Formula tam={58}>
            <Entra at={cN + 4}>
              n<sub style={{ fontSize: "0.5em" }}>ef</sub>
              <Op>=</Op>n<Op>·</Op>
              <Frac
                arriba={
                  <>
                    1 − <span style={{ color: ROJO }}>ρ</span>
                  </>
                }
                abajo={
                  <>
                    1 + <span style={{ color: ROJO }}>ρ</span>
                  </>
                }
              />
              <Op>=</Op>60<Op>·</Op>
              <Frac arriba="0,3" abajo="1,7" />
              <Op>≈</Op>
              <span style={{ color: v.azafran }}>11</span>
            </Entra>
          </Formula>
        </div>
        <div style={{ position: "absolute", left: 0, top: 480, display: "grid", gridTemplateColumns: "repeat(20, 1fr)", gap: 8, width: 912 }}>
          {Array.from({ length: 60 }, (_, i) => {
            const ef = efectivos.has(i);
            return <div key={i} style={{ height: 30, borderRadius: 6, background: ef ? v.azafran : v.ceniza, opacity: transicion(frame, cN + 10 + i * 0.4, fps, 300, EXPO_OUT) * (ef ? 1 : 1 - 0.75 * kEf) }} />;
          })}
        </div>
        <Nota at={cN + largoN * 0.75} color={v.azafran} tam={26} style={{ position: "absolute", left: 0, top: 610 }}>
          60 días autocorrelacionados (ρ = 0,7) informan como 11 días independientes
        </Nota>
        <Nota at={cP + 4} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 700 }}>
          Napier-Munn y Meyer (1999), Minerals Engineering 12(9) · Napier-Munn (2014), JKMRC
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El ensayo encendido/apagado ──────────────────────────────────────────────
export const Onoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cA = useCue("alterna");
  const cP = useCue("pares");
  const cR = useCue("raglan");
  const largoA = useCueAt("alterna", 1) - cA;
  const kPares = transicion(frame, cP + 6, fps, 600, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cA} titulo="Encender|*y apagar.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", gap: 24, fontSize: 26, opacity: transicion(frame, cA + 10, fps, 400, EXPO_OUT) }}>
          <span>
            <span style={{ color: c.c }}>■</span> control experto ON
          </span>
          <span>
            <span style={{ color: v.ceniza }}>■</span> OFF
          </span>
        </div>
        <div style={{ position: "absolute", left: 0, top: 60, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, width: 912 }}>
          {Array.from({ length: 16 }, (_, par) => {
            const primeroOn = azar(par + 3) > 0.5;
            return (
              <div key={par} style={{ display: "flex", gap: 6, padding: 6, borderRadius: 16, border: `2px solid ${kPares > 0 ? v.azafran : "transparent"}`, opacity: transicion(frame, cA + largoA * 0.3 + par * 2, fps, 300, EXPO_OUT) }}>
                {[primeroOn, !primeroOn].map((on, j) => (
                  <div key={j} style={{ flex: 1, height: 70, borderRadius: 10, background: on ? c.c : "#26262E", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 20, color: on ? v.vacio : v.niebla }}>
                    {on ? "ON" : "OFF"}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <Nota at={cP + 10} color={v.azafran} tam={28} style={{ position: "absolute", left: 0, top: 470 }}>
          cada par de días vecinos comparte mineral, revestimientos y operadores
        </Nota>
        <Panel caja={{ x: 0, y: 545, w: 912, h: 150 }} at={cR + 4} color={c.b} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Pickaxe size={50} strokeWidth={1.5} color={c.b} />
          <div>
            <div style={{ fontSize: 30 }}>Raglan (níquel, Canadá): prueba de colector on-off</div>
            <div style={{ fontSize: 22, fontWeight: 200, color: v.niebla, marginTop: 6 }}>con 3 meses de distribución de referencia, diseñada para bloquear la autocorrelación (CIM, 2009)</div>
          </div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── Agentes que registran la historia ────────────────────────────────────────
export const Agentes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cA = useCue("agente");
  const c2 = useCue("a2a");
  const largo = useCueAt("a2a", 1) - c2;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const kF = transicion(frame, c2 + largo * 0.3, fps, 800, EXPO_IN_OUT);
  const A: P = [456, 120];
  const B: P = [456, 400];
  return (
    <Escena>
      <Cabeza at={cA} titulo="Agentes que|*registran la historia.*" tam={80} />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <Lienzo alto={520}>
          <Flecha de={A} a={B} k={kF} color={v.azafran} ancho={5} r={80} />
        </Lienzo>
        <Panel caja={{ x: 156, y: 50, w: 600, h: 140 }} at={c2 + 4} color={c.b} estilo={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Mountain size={46} strokeWidth={1.5} color={c.b} />
          <div>
            <div style={{ fontSize: 30 }}>agente de planificación</div>
            <div style={{ fontSize: 22, fontWeight: 200, color: v.niebla }}>mina: mezcla de mineral</div>
          </div>
        </Panel>
        <div style={{ position: "absolute", left: 480, top: 240, fontFamily: mono, fontSize: 22, color: v.azafran, opacity: kF, lineHeight: 1.5 }}>
          A2A · tarea
          <br />
          «cambio de mezcla 14:00, dureza +12 %»
        </div>
        <Panel caja={{ x: 156, y: 340, w: 600, h: 190 }} at={cA + 6} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Bot size={50} strokeWidth={1.5} color={c.c} />
          <div>
            <div style={{ fontSize: 30 }}>agente de control</div>
            <div style={{ fontSize: 22, fontWeight: 200, color: v.niebla }}>planta: alterna ON/OFF según calendario sorteado</div>
            <div style={{ fontFamily: mono, fontSize: 20, color: c.c, marginTop: 8, opacity: t(cA + 40) }}>log: turno · modo · ley · dureza · evento</div>
          </div>
        </Panel>
        <Nota at={c2 + largo * 0.75} color={v.azafran} tam={26} style={{ position: "absolute", left: 0, top: 580 }}>
          la amenaza de historia queda registrada, no escondida
        </Nota>
        <Nota at={c2 + largo * 0.85} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 640 }}>
          protocolo Agent2Agent (A2A): especificación abierta, Linux Foundation · ejemplo ilustrativo
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
        <Cinetico at={cCta} texto="El enemigo no es el ruido.|Es *lo que cambia a la vez.*" style={{ fontSize: 74 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próximo: 04 · regresión a la media
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
