import React from "react";
import { CalendarRange, Check, FlaskConical, MapPin, Route, TriangleAlert, Zap } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cuenta, Entra, Foco, Formula, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Traza } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, mono } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";
import { CALIFORNIA, PLACEBOS, PROMEDIO, SINTETICO } from "./datos";

const SERIE = "El mapa de la experimentación · 12/17";
const ANIOS = CALIFORNIA.map((_, i) => 1970 + i);
const CORTE = 19; // índice de 1989, primer año con el impuesto
const BRECHA = CALIFORNIA.map((y, i) => y - SINTETICO[i]);
const CA = v.azafran;
const SINT = c.b;

const PESOS: [string, number][] = [
  ["Utah", 33.4],
  ["Nevada", 23.4],
  ["Montana", 19.9],
  ["Colorado", 16.4],
  ["Connecticut", 6.9],
];

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

type Plano = { px: (x: number) => number; py: (y: number) => number };
const tramo = (serie: number[], { px, py }: Plano, desde = 0, hasta = serie.length) =>
  serie.slice(desde, hasta).map((y, i) => [px(ANIOS[desde + i]), py(y)] as [number, number]);

const MARCAS = [1970, 1980, 1990, 2000].map((a) => ({ v: a, t: String(a) }));

// Línea vertical del impuesto (entre 1988 y 1989).
const Impuesto: React.FC<{ p: Plano; y: [number, number]; k: number }> = ({ p, y, k }) => (
  <g opacity={k}>
    <line x1={p.px(1988.5)} y1={p.py(y[0])} x2={p.px(1988.5)} y2={p.py(y[1])} stroke={v.ceniza} strokeWidth={2} strokeDasharray="6 7" />
    <text x={p.px(1988.5) + 10} y={p.py(y[1]) + 26} fontFamily={mono} fontSize={22} fill={v.niebla}>
      Prop. 99
    </text>
  </g>
);

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("gancho");
  const largo = useCueAt("gancho", 1) - at;
  const kPre = transicion(frame, at + 6, fps, 1600, EXPO_IN_OUT);
  const kImp = transicion(frame, at + largo * 0.2, fps, 500, EXPO_OUT);
  const kPost = transicion(frame, at + largo * 0.4, fps, 1000, EXPO_IN_OUT);
  const kPreg = transicion(frame, at + largo * 0.62, fps, 800, EXPO_OUT);
  return (
    <Escena>
      <Escenario alto={640}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 34 }}>
          <MapPin size={40} strokeWidth={1.6} color={CA} /> California · cajetillas por persona al año
        </div>
        <div style={{ position: "absolute", left: 0, top: 80 }}>
          <Ejes ancho={912} alto={480} x={[1969, 2001]} y={[30, 140]} at={at} marcasX={MARCAS}>
            {(p) => (
              <g>
                <Impuesto p={p} y={[30, 140]} k={kImp} />
                <Traza pts={tramo(CALIFORNIA, p, 0, CORTE)} k={kPre} color={CA} ancho={5} />
                <Traza pts={tramo(CALIFORNIA, p, CORTE - 1)} k={kPost} color={CA} ancho={5} />
                <g opacity={kPreg}>
                  <Traza pts={[[p.px(1988), p.py(90)], [p.px(2000), p.py(78)]]} k={1} color={v.niebla} ancho={3} discontinuo />
                  <text x={p.px(2000) - 6} y={p.py(78) - 22} textAnchor="end" fontFamily={serif} fontSize={56} fill={v.hueso}>
                    ¿?
                  </text>
                </g>
              </g>
            )}
          </Ejes>
        </div>
      </Escenario>
      <div style={{ marginTop: 10 }}>
        <Cinetico at={at + largo * 0.8} texto="Construir lo que *no pasó.*" style={{ fontSize: 84 }} />
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
      <Cinetico at={6} texto="Control|*sintético.*" style={{ marginTop: 18, fontSize: 140 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>el gemelo que no existe · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── El problema ──────────────────────────────────────────────────────────────
export const Problema: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cU = useCue("uno");
  const cP = useCue("promedio");
  const largo = useCueAt("promedio", 1) - cP;
  const kL = transicion(frame, cP + 6, fps, 1200, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cU} titulo="Un tratado,|*ningún gemelo.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 34, height: 34, borderRadius: 17, background: CA, opacity: transicion(frame, cU + 6, fps, 400, EXPO_OUT) }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(19, 1fr)", gap: 8 }}>
            {Array.from({ length: 38 }, (_, i) => (
              <div key={i} style={{ width: 26, height: 26, borderRadius: 13, background: v.ceniza, opacity: 0.7 * transicion(frame, cU + 12 + i * 0.6, fps, 300, EXPO_OUT) }} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 12, fontSize: 26, fontWeight: 200, color: v.niebla, opacity: transicion(frame, cU + 30, fps, 400, EXPO_OUT) }}>
          <span style={{ color: CA }}>1 tratado</span>
          <span>38 estados sin el impuesto</span>
        </div>
        <div style={{ position: "absolute", left: 0, top: 130 }}>
          <Ejes ancho={912} alto={400} x={[1969, 2001]} y={[30, 150]} at={cP} marcasX={MARCAS}>
            {(p) => (
              <g>
                <Impuesto p={p} y={[30, 150]} k={kL} />
                <Traza pts={tramo(PROMEDIO, p)} k={kL} color={v.niebla} ancho={4} />
                <Traza pts={tramo(CALIFORNIA, p)} k={kL} color={CA} ancho={5} />
                {frame >= cP + largo * 0.35 ? (
                  <g opacity={transicion(frame, cP + largo * 0.35, fps, 500, EXPO_OUT)}>
                    <line x1={p.px(1975)} y1={p.py(CALIFORNIA[5])} x2={p.px(1975)} y2={p.py(PROMEDIO[5])} stroke={ROJO} strokeWidth={4} />
                    <line x1={p.px(1988)} y1={p.py(CALIFORNIA[18])} x2={p.px(1988)} y2={p.py(PROMEDIO[18])} stroke={ROJO} strokeWidth={4} />
                    <text x={p.px(1975) + 10} y={p.py(PROMEDIO[5]) - 12} fontFamily={mono} fontSize={28} fill={ROJO}>
                      −10
                    </text>
                    <text x={p.px(1988) - 10} y={p.py(PROMEDIO[18]) - 12} textAnchor="end" fontFamily={mono} fontSize={28} fill={ROJO}>
                      −24
                    </text>
                  </g>
                ) : null}
              </g>
            )}
          </Ejes>
        </div>
        <div style={{ position: "absolute", left: 0, top: 550, display: "flex", gap: 30, fontSize: 28, opacity: transicion(frame, cP, fps, 400, EXPO_OUT) }}>
          <span>
            <span style={{ color: CA }}>■</span> California
          </span>
          <span>
            <span style={{ color: v.niebla }}>■</span> promedio de los otros 38
          </span>
        </div>
        <Nota at={cP + largo * 0.6} color={ROJO} tam={28} style={{ position: "absolute", left: 0, top: 610 }}>
          antes del impuesto ya se separaban: no hay tendencias paralelas
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── La receta: mezclar estados ───────────────────────────────────────────────
export const Receta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("mezcla");
  const cP = useCue("pesos");
  const largo = useCueAt("pesos", 1) - cP;
  return (
    <Escena>
      <Cabeza at={cM} titulo="Si no existe,|*fabrícalo.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 130 }} at={cM + 8} color={SINT} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <FlaskConical size={52} strokeWidth={1.5} color={SINT} />
          <div style={{ fontSize: 30 }}>
            California sintético: una mezcla de estados que copia a California <span style={{ color: CA }}>antes del impuesto</span>
          </div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 170, width: 912 }}>
          {PESOS.map(([n, w], i) => {
            const a = cP + largo * (0.1 + i * 0.17);
            const k = transicion(frame, a, fps, 600, EXPO_OUT);
            return (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 18, opacity: Math.min(1, k * 2) }}>
                <div style={{ width: 210, fontSize: 32 }}>{n}</div>
                <div style={{ flex: 1, height: 44, borderRadius: 10, background: "#16161B" }}>
                  <div style={{ height: 44, width: `${(w / 35) * 100 * k}%`, borderRadius: 10, background: SINT }} />
                </div>
                <div style={{ width: 120, textAlign: "right", fontFamily: serif, fontSize: 44, color: SINT }}>
                  {Math.round(w * k)} %
                </div>
              </div>
            );
          })}
          <Nota at={cP + largo * 0.95} color={v.niebla} tam={26} style={{ marginTop: 22 }}>
            los otros 33 estados: peso 0 · pesos de Abadie, Diamond y Hainmueller (2010)
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── La fórmula ───────────────────────────────────────────────────────────────
export const FormulaEsc: React.FC = () => {
  const frame = useCurrentFrame();
  const cF = useCue("formula");
  const cR = useCue("reglas");
  const cM = useCue("minimo");
  const fS = useCueAt("formula", 0.45);
  const fW = useCueAt("formula", 0.68);
  const fY = useCueAt("formula", 0.84);
  const activas = frame >= cR ? [] : frame >= fY ? ["y"] : frame >= fW ? ["w"] : frame >= fS ? ["s"] : frame >= cF + 20 ? ["h"] : [];
  return (
    <Escena>
      <Cabeza at={cF} titulo="El gemelo,|*en fórmula.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <Foco activas={activas}>
          <Formula tam={68}>
            <Entra at={cF + 6}>
              <V id="h" color={SINT}>
                Ŷ
              </V>
              <Sub>CA,t</Sub>
              <Op>=</Op>
              <V id="s" color={v.niebla} italica={false}>
                Σ<Sub>j</Sub>
              </V>
              <V id="w" color={c.c}>
                w<Sub>j</Sub>
              </V>
              <Op>·</Op>
              <V id="y" color={v.hueso}>
                Y<Sub>j,t</Sub>
              </V>
            </Entra>
          </Formula>
        </Foco>
        <div style={{ position: "absolute", left: 0, top: 120, display: "flex", flexDirection: "column", gap: 10 }}>
          <Nota at={cF + 20} color={SINT} tam={28}>
            <i style={{ fontFamily: serif }}>Ŷ</i>: California sin impuesto, año <i style={{ fontFamily: serif }}>t</i>
          </Nota>
          <Nota at={fS} color={v.niebla} tam={28}>
            <i style={{ fontFamily: serif }}>Σ</i>: suma sobre cada estado donante <i style={{ fontFamily: serif }}>j</i>
          </Nota>
          <Nota at={fW} color={c.c} tam={28}>
            <i style={{ fontFamily: serif }}>w</i>: su peso en la mezcla
          </Nota>
          <Nota at={fY} color={v.hueso} tam={28}>
            <i style={{ fontFamily: serif }}>Y</i>: su consumo ese año
          </Nota>
        </div>
        <div style={{ position: "absolute", left: 0, top: 330, width: 912, display: "flex", gap: 16 }}>
          {[
            ["w ≥ 0", "no son negativos"],
            ["Σ w = 1", "suman uno"],
          ].map(([f, t], i) => (
            <Panel key={f} caja={{ x: 0, y: 0, w: 448, h: 130 }} at={cR + 8 + i * 30} color={c.c} estilo={{ position: "relative" }}>
              <div style={{ fontFamily: serif, fontSize: 44, color: c.c }}>{f}</div>
              <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 6 }}>{t}</div>
            </Panel>
          ))}
        </div>
        <Nota at={cR + 70} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 480 }}>
          el gemelo queda dentro del rango de los datos reales: no extrapola
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 550 }}>
          <Formula tam={44}>
            <Entra at={cM + 4}>
              min<Sub>w</Sub>
              <span style={{ margin: "0 0.2em" }}>Σ</span>
              <Sub>t &lt; 1989</Sub>(<V color={CA}>Y</V>
              <Sub>CA,t</Sub>
              <Op>−</Op>
              <V color={SINT}>Ŷ</V>
              <Sub>CA,t</Sub>)²
            </Entra>
          </Formula>
          <Nota at={cM + 50} color={v.azafran} tam={26} style={{ marginTop: 10 }}>
            problema cuadrático con J = 38 variables: se resuelve al instante
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El ajuste antes ──────────────────────────────────────────────────────────
const Leyendas: React.FC = () => (
  <div style={{ display: "flex", gap: 30, fontSize: 28 }}>
    <span>
      <span style={{ color: CA }}>■</span> California real
    </span>
    <span>
      <span style={{ color: SINT }}>■</span> California sintético
    </span>
  </div>
);

export const Ajuste: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("ajuste");
  const largo = useCueAt("ajuste", 1) - at;
  const k = transicion(frame, at + 8, fps, 1600, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={at} titulo="Antes, calza|*casi perfecto.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Leyendas />
        <div style={{ position: "absolute", left: 0, top: 60 }}>
          <Ejes ancho={912} alto={440} x={[1969, 1990]} y={[80, 135]} at={at} marcasX={[1970, 1975, 1980, 1985].map((a) => ({ v: a, t: String(a) }))}>
            {(p) => (
              <g>
                <Traza pts={tramo(SINTETICO, p, 0, CORTE)} k={k} color={SINT} ancho={5} />
                <Traza pts={tramo(CALIFORNIA, p, 0, CORTE)} k={k} color={CA} ancho={3} />
              </g>
            )}
          </Ejes>
        </div>
        <div style={{ position: "absolute", left: 0, top: 540, display: "flex", alignItems: "baseline", gap: 18 }}>
          <span style={{ fontSize: 30 }}>error medio antes de 1989:</span>
          <span style={{ fontFamily: serif, fontSize: 64, color: c.c }}>
            <Cuenta at={at + largo * 0.55} hasta={1.8} decimales={1} ms={700} />
          </span>
          <span style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>cajetillas / persona</span>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El efecto ────────────────────────────────────────────────────────────────
export const Efecto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cA = useCue("abre");
  const cB = useCue("brecha");
  const largo = useCueAt("abre", 1) - cA;
  const kPost = transicion(frame, cA + 10, fps, 1500, EXPO_IN_OUT);
  const kEt = transicion(frame, cA + largo * 0.5, fps, 500, EXPO_OUT);
  const kB = transicion(frame, cB, fps, 700, EXPO_OUT);
  const res = transicion(frame, cB + 20, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cA} titulo="Después, las curvas|*se abren.*" tam={80} />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <Leyendas />
        <div style={{ position: "absolute", left: 0, top: 60 }}>
          <Ejes ancho={912} alto={460} x={[1969, 2004]} y={[30, 140]} at={cA - 20} marcasX={MARCAS}>
            {(p) => {
              const sup = tramo(SINTETICO, p, CORTE - 1);
              const inf = tramo(CALIFORNIA, p, CORTE - 1).reverse();
              return (
                <g>
                  <path d={`M${[...sup, ...inf].map((q) => q.join(",")).join("L")}Z`} fill={ROJO} opacity={0.22 * kB} />
                  <Impuesto p={p} y={[30, 140]} k={1} />
                  <Traza pts={tramo(SINTETICO, p, 0, CORTE)} k={1} color={SINT} ancho={5} />
                  <Traza pts={tramo(CALIFORNIA, p, 0, CORTE)} k={1} color={CA} ancho={3} />
                  <Traza pts={tramo(SINTETICO, p, CORTE - 1)} k={kPost} color={SINT} ancho={5} />
                  <Traza pts={tramo(CALIFORNIA, p, CORTE - 1)} k={kPost} color={CA} ancho={5} />
                  <g opacity={kEt} fontFamily={mono} fontSize={26}>
                    <text x={p.px(2000) + 10} y={p.py(67.3) + 8} fill={SINT}>
                      67,3
                    </text>
                    <text x={p.px(2000) + 10} y={p.py(41.6) + 8} fill={CA}>
                      41,6
                    </text>
                  </g>
                </g>
              );
            }}
          </Ejes>
        </div>
        <div style={{ position: "absolute", left: 0, top: 560, display: "flex", alignItems: "baseline", gap: 20, opacity: kB }}>
          <span style={{ fontSize: 30 }}>efecto en 2000:</span>
          <span style={{ fontFamily: serif, fontSize: 80, color: ROJO, display: "inline-block", transform: `scale(${res})` }}>−25,7</span>
          <span style={{ fontSize: 28, fontWeight: 200, color: v.niebla }}>cajetillas / persona · −38 %</span>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Placebo ──────────────────────────────────────────────────────────────────
export const Placebo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("placebo");
  const cE = useCue("extremo");
  const largoE = useCueAt("extremo", 1) - cE;
  const kCA = transicion(frame, cE + 6, fps, 1200, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cP} titulo="¿Y si fue|*suerte?*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <div style={{ fontFamily: mono, fontSize: 28, color: v.niebla }}>brecha = real − sintético, para cada estado</div>
        <div style={{ position: "absolute", left: 0, top: 50 }}>
          <Ejes ancho={912} alto={440} x={[1969, 2001]} y={[-40, 40]} at={cP} marcasX={MARCAS}>
            {(p) => (
              <g>
                <line x1={p.px(1969)} y1={p.py(0)} x2={p.px(2001)} y2={p.py(0)} stroke={v.ceniza} strokeWidth={1.5} />
                <Impuesto p={p} y={[-40, 40]} k={1} />
                {PLACEBOS.map((g, i) => (
                  <Traza key={i} pts={tramo(g, p)} k={transicion(frame, cP + 20 + i * 2, fps, 900, EXPO_IN_OUT)} color={v.niebla} ancho={2} opacidad={frame >= cE ? 0.35 : 0.6} />
                ))}
                <Traza pts={tramo(BRECHA, p)} k={kCA} color={CA} ancho={6} />
              </g>
            )}
          </Ejes>
        </div>
        <div style={{ position: "absolute", left: 0, top: 500, display: "flex", gap: 30, fontSize: 28, opacity: transicion(frame, cP, fps, 400, EXPO_OUT) }}>
          <span>
            <span style={{ color: CA }}>■</span> California
          </span>
          <span>
            <span style={{ color: v.niebla }}>■</span> placebos: estados sin el impuesto
          </span>
        </div>
        <Panel caja={{ x: 0, y: 560, w: 912, h: 140 }} at={cE + largoE * 0.55} color={CA} estilo={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div style={{ fontFamily: serif, fontSize: 64, color: CA, whiteSpace: "nowrap", flexShrink: 0 }}>1 / 39</div>
          <div style={{ fontSize: 28 }}>
            ≈ <Cuenta at={cE + largoE * 0.6} hasta={2.6} decimales={1} ms={700} /> %: la mayor brecha (relativa al ajuste previo) en el estudio original
          </div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── Cuidado ──────────────────────────────────────────────────────────────────
export const Cuidado: React.FC = () => {
  const cO = useCue("ojo");
  const cC = useCue("calza");
  const largo = useCueAt("ojo", 1) - cO;
  const items: [typeof Zap, string, string, number][] = [
    [CalendarRange, "muchos años antes", "para que el ajuste signifique algo", 0.12],
    [Route, "donantes sin efecto", "nadie cruza la frontera a comprar", 0.4],
    [Zap, "ningún otro cambio", "al mismo tiempo que la política", 0.78],
  ];
  return (
    <Escena>
      <Cabeza at={cO} titulo="Tres cosas|*para confiar.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        {items.map(([I, t, d, f], i) => (
          <Panel key={t} caja={{ x: 0, y: i * 150, w: 912, h: 130 }} at={cO + largo * f} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
            <I size={48} strokeWidth={1.5} color={c.c} />
            <div>
              <div style={{ fontSize: 34 }}>{t}</div>
              <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 4 }}>{d}</div>
            </div>
          </Panel>
        ))}
        <Panel caja={{ x: 0, y: 470, w: 912, h: 130 }} at={cC + 4} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <TriangleAlert size={48} strokeWidth={1.5} color={ROJO} />
          <div style={{ fontSize: 32 }}>si el gemelo no calza antes, no confíes en lo que dice después</div>
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
        <Cinetico at={cCta} texto="¿Sin control?|*Constrúyelo.*" style={{ fontSize: 96 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 13/17 · series de tiempo interrumpidas
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
