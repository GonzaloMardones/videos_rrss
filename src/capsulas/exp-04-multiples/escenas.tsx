import React from "react";
import { Check, Compass, Rocket, Star, X } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cuenta as Contador, Entra, Formula, Frac, Op, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Traza } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Chip, Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 04/17";
// Diez p-valores ilustrativos, ya ordenados.
const P = [0.001, 0.008, 0.012, 0.029, 0.041, 0.09, 0.2, 0.35, 0.6, 0.8];
const fmt = (x: number, d = 3) => x.toFixed(d).replace(".", ",");

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

const Rejilla: React.FC<{ at: number; resaltar?: number; color?: string; etiqueta?: string }> = ({ at, resaltar, color = c.c, etiqueta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, width: 912 }}>
      {Array.from({ length: 20 }, (_, i) => {
        const on = i === 13 && resaltar !== undefined && frame >= resaltar;
        return (
          <div key={i} style={{ height: 76, borderRadius: 14, border: `2px solid ${on ? color : linea}`, background: on ? `${color}2a` : relleno, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: mono, fontSize: 22, color: on ? color : v.niebla, opacity: transicion(frame, at + i * 1.2, fps, 300, EXPO_OUT) }}>
            {on && etiqueta ? etiqueta : `métrica ${i + 1}`}
          </div>
        );
      })}
    </div>
  );
};

// Lista de p-valores ordenados con su umbral y si se rechaza o no.
const ListaP: React.FC<{ at: number; umbral: (k: number) => number; rechaza: number; atDecision: number; titulo: string }> = ({ at, umbral, rechaza, atDecision, titulo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ width: 912 }}>
      <div style={{ display: "grid", gridTemplateColumns: "80px 220px 260px 1fr", fontSize: 20, fontWeight: 600, letterSpacing: "0.08em", color: v.ceniza, marginBottom: 8 }}>
        <span>k</span>
        <span>P-VALOR</span>
        <span>{titulo}</span>
        <span />
      </div>
      {P.slice(0, 6).map((p, i) => {
        const k = transicion(frame, at + i * 3, fps, 300, EXPO_OUT);
        const d = transicion(frame, atDecision + i * 5, fps, 300, backOut);
        const si = i < rechaza;
        const tope = i === rechaza;
        return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 220px 260px 1fr", alignItems: "center", height: 64, opacity: k * (i > rechaza && d > 0 ? 0.4 : 1), borderBottom: `1px solid ${linea}` }}>
            <span style={{ fontFamily: mono, fontSize: 26, color: v.ceniza }}>{i + 1}</span>
            <span style={{ fontFamily: mono, fontSize: 30 }}>{fmt(p)}</span>
            <span style={{ fontFamily: mono, fontSize: 30, color: v.azafran }}>{fmt(umbral(i + 1), 4)}</span>
            <span style={{ transform: `scale(${d})`, display: "inline-flex", alignItems: "center", gap: 10, fontSize: 26, color: si ? c.c : ROJO }}>
              {i <= rechaza ? si ? <Check size={30} strokeWidth={2.5} color={c.c} /> : <X size={30} strokeWidth={2.5} color={ROJO} /> : null}
              {tope ? "se detiene" : si ? "significativo" : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const at = useCue("gancho");
  const cUna = useCueAt("gancho", 0.35);
  return (
    <Escena>
      <Escenario alto={460}>
        <Rejilla at={at + 2} resaltar={cUna} etiqueta="p = 0,03 ✓" />
      </Escenario>
      <div style={{ marginTop: 40 }}>
        <Cinetico at={cUna + 20} texto="¿Hallazgo,|o *azar?*" style={{ fontSize: 110 }} />
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
      <Cinetico at={6} texto="Comparaciones|*múltiples.*" style={{ marginTop: 18, fontSize: 112 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>Bonferroni, Holm y Benjamini-Hochberg · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── La cuenta ────────────────────────────────────────────────────────────────
export const Cuenta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cE = useCue("esperado");
  const cA = useCue("almenos");
  const res = transicion(frame, cA + 40, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cE} titulo="Uno, por puro|*azar.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Rejilla at={cE - 10} resaltar={cE + 30} color={ROJO} etiqueta="falso positivo" />
        <div style={{ position: "absolute", left: 0, top: 420 }}>
          <Formula tam={64}>
            <Entra at={cE + 20}>
              20<Op>×</Op>0,05<Op>=</Op>
              <span style={{ color: ROJO }}>1</span>
              <span style={{ fontSize: 30, fontFamily: "inherit", color: v.niebla, marginLeft: 14 }}>esperado</span>
            </Entra>
          </Formula>
          <div style={{ marginTop: 24 }}>
            <Formula tam={64}>
              <Entra at={cA + 4}>
                1<Op>−</Op>0,95<sup style={{ fontSize: "0.55em" }}>20</sup><Op>=</Op>
                <span style={{ color: ROJO, fontSize: 88, display: "inline-block", transform: `scale(${res})` }}>64 %</span>
              </Entra>
            </Formula>
          </div>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── La curva y los segmentos ─────────────────────────────────────────────────
export const Curva: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("curva");
  const cSeg = useCueAt("curva", 0.55);
  const ms = Array.from({ length: 50 }, (_, i) => i + 1);
  const k = transicion(frame, at + 4, fps, 1400, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={at} titulo="Más pruebas,|*más azar.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Ejes ancho={912} alto={380} x={[1, 50]} y={[0, 1]} at={at} rotuloX="número de pruebas →" rotuloY="P(al menos un falso positivo)" marcasX={[{ v: 1, t: "1" }, { v: 10, t: "10" }, { v: 20, t: "20" }, { v: 50, t: "50" }]}>
          {({ px, py }) => (
            <g>
              <Traza pts={ms.map((m) => [px(m), py(1 - 0.95 ** m)] as [number, number])} k={k} color={ROJO} ancho={5} />
              {[
                [5, "23 %"],
                [10, "40 %"],
                [20, "64 %"],
                [50, "92 %"],
              ].map(([m, t], i) => (
                <g key={i} opacity={transicion(frame, at + 20 + i * 10, fps, 400, EXPO_OUT)}>
                  <circle cx={px(m as number)} cy={py(1 - 0.95 ** (m as number))} r={10} fill={ROJO} />
                  <text x={px(m as number) + (m === 50 ? -14 : 14)} y={py(1 - 0.95 ** (m as number)) + 36} textAnchor={m === 50 ? "end" : "start"} fontFamily="'STIX Two Text', serif" fontSize={32} fill={v.hueso}>
                    {t}
                  </text>
                </g>
              ))}
            </g>
          )}
        </Ejes>
        <div style={{ position: "absolute", left: 0, top: 430, opacity: transicion(frame, cSeg, fps, 500, EXPO_OUT) }}>
          <Formula tam={40}>
            5 métricas<Op>×</Op>4 países<Op>×</Op>3 dispositivos<Op>=</Op>
            <span style={{ color: ROJO }}>60 pruebas</span>
          </Formula>
          <Nota at={cSeg + 20} color={ROJO} tam={30} style={{ marginTop: 18 }}>
            1 − 0,95<sup>60</sup> = 95 %: casi seguro que algo “sale”
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Bonferroni ───────────────────────────────────────────────────────────────
export const Bonferroni: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cB = useCue("bonferroni");
  const cP = useCue("precio");
  const poder = 0.8 - 0.36 * transicion(frame, cP + 20, fps, 1000, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cB} titulo="Bonferroni:|*dividir.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Formula tam={76}>
          <Entra at={cB + 6}>
            <Frac arriba={<V color={v.azafran}>α</V>} abajo={<V>m</V>} />
            <Op>=</Op>
            <Frac arriba="0,05" abajo="20" />
            <Op>=</Op>
            <span style={{ color: c.c }}>0,0025</span>
          </Entra>
        </Formula>
        <Nota at={cB + 30} color={c.c} tam={30} style={{ marginTop: 20 }}>
          así, la probabilidad de cualquier falso positivo queda bajo 5 % (error familiar)
        </Nota>
        {frame >= cP ? (
          <Panel caja={{ x: 0, y: 330, w: 912, h: 220 }} at={cP} color={ROJO}>
            <Rol color={ROJO}>El precio</Rol>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20 }}>
              <span style={{ fontSize: 30, width: 150 }}>poder</span>
              <div style={{ flex: 1, height: 34, borderRadius: 10, background: "#16161B" }}>
                <div style={{ height: 34, width: `${poder * 100}%`, borderRadius: 10, background: poder > 0.6 ? c.c : ROJO }} />
              </div>
              <span style={{ fontFamily: "'STIX Two Text', serif", fontSize: 40, width: 100 }}>{Math.round(poder * 100)} %</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 14 }}>mismo experimento, umbral 0,0025 en vez de 0,05 · ilustrativo</div>
          </Panel>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── Holm ─────────────────────────────────────────────────────────────────────
export const Holm: React.FC = () => {
  const at = useCue("holm");
  const largo = useCueAt("holm", 1) - at;
  return (
    <Escena>
      <Cabeza at={at} titulo="Holm: de uno|*en uno.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <ListaP at={at + 6} umbral={(k) => 0.05 / (10 - k + 1)} rechaza={1} atDecision={at + largo * 0.55} titulo="α / (m − k + 1)" />
        <Nota at={at + largo * 0.75} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 470 }}>
          nunca rechaza menos que Bonferroni, y controla el mismo error familiar
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Benjamini-Hochberg ───────────────────────────────────────────────────────
export const Bh: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cB = useCue("bh");
  const cU = useCue("umbral");
  const k = transicion(frame, cU + 4, fps, 900, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cB} titulo="Benjamini-Hochberg:|*la proporción.*" tam={78} />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Nota at={cB + 20} color={c.b} tam={30}>
          controla qué fracción de tus “descubrimientos” son falsos (FDR)
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 80 }}>
          <Ejes ancho={912} alto={420} x={[0.5, 10.5]} y={[0, 0.1]} at={cU - 4} rotuloX="posición k →" rotuloY="p-valor" marcasX={[1, 2, 3, 4, 5, 6].map((n) => ({ v: n, t: String(n) }))}>
            {({ px, py }) => (
              <g>
                <Traza pts={[[px(0.5), py(0.0025)], [px(10.5), py(0.0525)]]} k={k} color={v.azafran} ancho={4} />
                <text x={px(10.3)} y={py(0.052) - 14} textAnchor="end" fontFamily="'STIX Two Text', serif" fontStyle="italic" fontSize={32} fill={v.azafran} opacity={k}>
                  k·α/m
                </text>
                {P.map((p, i) => {
                  const dentro = p <= 0.05 * (i + 1) / 10 && i < 3;
                  return p <= 0.1 ? <circle key={i} cx={px(i + 1)} cy={py(p)} r={12} fill={dentro ? c.c : ROJO} opacity={transicion(frame, cU + 10 + i * 3, fps, 300, EXPO_OUT)} /> : null;
                })}
              </g>
            )}
          </Ejes>
        </div>
        <Nota at={cU + 40} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 540 }}>
          rechazas hasta el último punto bajo la línea: aquí, los tres primeros
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El ejemplo ───────────────────────────────────────────────────────────────
export const Ejemplo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("ejemplo");
  const largo = useCueAt("ejemplo", 1) - at;
  const cols: [string, number, string][] = [
    ["sin corregir", 5, ROJO],
    ["Bonferroni", 1, c.c],
    ["Holm", 1, c.c],
    ["Benjamini-Hochberg", 3, c.b],
  ];
  return (
    <Escena>
      <Cabeza at={at} titulo="Diez métricas,|*cuatro respuestas.*" tam={80} />
      <Escenario alto={680} style={{ marginTop: 40 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 30, flexWrap: "wrap" }}>
          {P.map((p, i) => (
            <span key={i} style={{ fontFamily: mono, fontSize: 22, padding: "6px 10px", borderRadius: 10, border: `1.5px solid ${p <= 0.05 ? v.azafran : linea}`, color: p <= 0.05 ? v.azafran : v.niebla, opacity: transicion(frame, at + i * 2, fps, 300, EXPO_OUT) }}>
              {fmt(p)}
            </span>
          ))}
        </div>
        {cols.map(([t, n, col], i) => {
          const a = at + largo * (0.2 + i * 0.18);
          const k = transicion(frame, a, fps, 600, EXPO_OUT);
          return (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 18, opacity: k }}>
              <span style={{ fontSize: 30, width: 320 }}>{t}</span>
              <div style={{ display: "flex", gap: 8 }}>
                {Array.from({ length: n }, (_, j) => (
                  <div key={j} style={{ width: 56, height: 56, borderRadius: 12, background: col, transform: `scale(${transicion(frame, a + j * 3, fps, 300, backOut)})` }} />
                ))}
              </div>
              <span style={{ fontFamily: "'STIX Two Text', serif", fontSize: 48, color: col, marginLeft: "auto" }}>
                <Contador at={a} hasta={n} ms={500} />
              </span>
            </div>
          );
        })}
      </Escenario>
    </Escena>
  );
};

// ─── Cuál usar ────────────────────────────────────────────────────────────────
export const Cual: React.FC = () => {
  const at = useCue("cual");
  const cF = useCueAt("cual", 0.55);
  return (
    <Escena>
      <Cabeza at={at} titulo="¿Cuál *usar?*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 250 }} at={at + 8} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Rocket size={64} strokeWidth={1.4} color={c.c} />
          <div>
            <Rol color={c.c}>Decidir un lanzamiento</Rol>
            <div style={{ fontSize: 36, marginTop: 6 }}>un falso positivo es caro</div>
            <div style={{ fontSize: 28, fontWeight: 200, color: v.niebla, marginTop: 6 }}>error familiar · Holm (o Bonferroni)</div>
          </div>
        </Panel>
        <Panel caja={{ x: 0, y: 290, w: 912, h: 250 }} at={cF} color={c.b} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Compass size={64} strokeWidth={1.4} color={c.b} />
          <div>
            <Rol color={c.b}>Explorar muchas métricas</Rol>
            <div style={{ fontSize: 36, marginTop: 6 }}>aceptas algunos falsos</div>
            <div style={{ fontSize: 28, fontWeight: 200, color: v.niebla, marginTop: 6 }}>tasa de falsos descubrimientos · Benjamini-Hochberg</div>
          </div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── Una métrica principal ────────────────────────────────────────────────────
export const Principal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("principal");
  return (
    <Escena>
      <Cabeza at={at} titulo="Una métrica|*principal.*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 200 }} at={at + 6} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Star size={64} strokeWidth={1.4} color={v.azafran} fill={v.azafran} />
          <div>
            <Rol color={v.azafran}>Principal · se decide antes</Rol>
            <div style={{ fontSize: 40, marginTop: 6 }}>conversión</div>
          </div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 240, display: "flex", gap: 12, flexWrap: "wrap", width: 912 }}>
          {[
            ["secundaria", "ticket promedio"],
            ["secundaria", "sesiones"],
            ["guarda", "latencia"],
            ["guarda", "cancelaciones"],
          ].map(([r, t], i) => (
            <div key={t} style={{ padding: "12px 20px", borderRadius: 16, border: `1.5px solid ${r === "guarda" ? ROJO : linea}`, background: relleno, opacity: transicion(frame, at + 20 + i * 5, fps, 400, EXPO_OUT) }}>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "0.1em", color: r === "guarda" ? ROJO : v.ceniza, textTransform: "uppercase" }}>{r}</div>
              <div style={{ fontSize: 30 }}>{t}</div>
            </div>
          ))}
        </div>
        <Sube at={at + 50} style={{ position: "absolute", left: 0, top: 420 }}>
          <Chip texto="idea 06: métricas de guarda" tam={24} />
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
        <Cinetico at={cCta} texto="Más métricas no es|*más evidencia.*" style={{ fontSize: 84 }} />
        <div style={{ marginTop: 30, padding: "14px 20px", borderRadius: 20, border: `1.5px solid ${linea}`, background: relleno, display: "inline-block" }}>
          <Formula tam={44}>
            1<Op>−</Op>(1<Op>−</Op>
            <V color={v.azafran}>α</V>)<sup style={{ fontSize: "0.55em" }}>m</sup>
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
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 05/17 · SRM, ¿está roto tu experimento?
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
