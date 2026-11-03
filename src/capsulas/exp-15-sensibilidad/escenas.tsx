import React from "react";
import { BadgeX, Check, Cigarette, EyeOff, Gauge, ListChecks, Scale } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Frac, Op, Raiz, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Traza } from "../../estilos/vacio/causal";
import { Flecha, Lienzo, Nodo, type P } from "../../estilos/vacio/grafo";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, mono } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 15/17";
const RR = 1.8;
const UX = c.c;
const UY = c.b;

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("gancho");
  const largo = useCueAt("gancho", 1) - at;
  const res = transicion(frame, at + 10, fps, 500, backOut);
  return (
    <Escena>
      <Escenario alto={560}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 200 }} at={at + 4} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 30 }}>
          <div style={{ fontFamily: serif, fontSize: 110, color: c.c, display: "inline-block", transform: `scale(${res})` }}>×1,8</div>
          <div style={{ fontSize: 32 }}>renuevan quienes usan la app</div>
        </Panel>
        <Panel caja={{ x: 0, y: 240, w: 912, h: 120 }} at={at + largo * 0.4} color={ROJO} discontinuo estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <EyeOff size={48} strokeWidth={1.5} color={ROJO} />
          <div style={{ fontSize: 32 }}>¿y si hay un confusor que no mediste?</div>
        </Panel>
        <Panel caja={{ x: 0, y: 400, w: 912, h: 120 }} at={at + largo * 0.75} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Gauge size={48} strokeWidth={1.5} color={v.azafran} />
          <div style={{ fontSize: 32 }}>mide qué tan fuerte tendría que ser</div>
        </Panel>
      </Escenario>
      <div style={{ marginTop: 20 }}>
        <Cinetico at={at + largo * 0.85} texto="¿Qué tan *fuerte?*" style={{ fontSize: 100 }} />
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
      <Cinetico at={6} texto="Análisis de|*sensibilidad.*" style={{ marginTop: 18, fontSize: 124 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>y el E-value · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── El problema: un confusor oculto ──────────────────────────────────────────
export const Problema: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cO = useCue("oculta");
  const cP = useCue("pregunta");
  const t = (a: number) => transicion(frame, a, fps, 500, EXPO_OUT);
  const f = (a: number) => transicion(frame, a, fps, 600, EXPO_IN_OUT);
  const U: P = [456, 110];
  const X: P = [170, 340];
  const Y: P = [742, 340];
  return (
    <Escena>
      <Cabeza at={cO} titulo="Siempre puede|*quedar algo.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <Lienzo alto={460}>
          <Flecha de={U} a={X} k={f(cO + 30)} color={ROJO} discontinua />
          <Flecha de={U} a={Y} k={f(cO + 36)} color={ROJO} discontinua />
          <Flecha de={X} a={Y} k={f(cO + 10)} color={c.c} />
          <Nodo p={U} letra="U" nombre="motivación (no medida)" color={ROJO} k={t(cO + 24)} arriba oculto />
          <Nodo p={X} letra="X" nombre="usa la app" color={c.c} k={t(cO + 4)} />
          <Nodo p={Y} letra="Y" nombre="renueva" color={c.b} k={t(cO + 8)} />
        </Lienzo>
        <Panel caja={{ x: 0, y: 500, w: 912, h: 150 }} at={cP + 4} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Gauge size={52} strokeWidth={1.5} color={v.azafran} />
          <div style={{ fontSize: 32 }}>
            no es <i>¿existe?</i> · es <span style={{ color: v.azafran }}>¿qué tan fuerte tendría que ser para borrar el efecto?</span>
          </div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── Cornfield, 1959 ──────────────────────────────────────────────────────────
export const Cornfield: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cH = useCue("historia");
  const cN = useCue("nueve");
  const largo = useCueAt("nueve", 1) - cN;
  const res = transicion(frame, cN + largo * 0.55, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cH} titulo="Cornfield,|*1959.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 130 }} at={cH + 8} color={v.niebla} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Cigarette size={52} strokeWidth={1.4} color={v.niebla} />
          <div style={{ fontSize: 30 }}>«el cigarro no causa cáncer: lo explica otra cosa»</div>
        </Panel>
        <div style={{ position: "absolute", left: 0, top: 170, width: 912, display: "flex", gap: 16 }}>
          <Panel caja={{ x: 0, y: 0, w: 448, h: 200 }} at={cN + 4} color={c.c} estilo={{ position: "relative" }}>
            <div style={{ fontSize: 28, color: v.niebla }}>riesgo de cáncer en fumadores</div>
            <div style={{ fontFamily: serif, fontSize: 96, color: c.c }}>×9</div>
          </Panel>
          <Panel caja={{ x: 0, y: 0, w: 448, h: 200 }} at={cN + largo * 0.5} color={ROJO} discontinuo estilo={{ position: "relative" }}>
            <div style={{ fontSize: 28, color: v.niebla }}>«hormona oculta» en fumadores</div>
            <div style={{ fontFamily: serif, fontSize: 96, color: ROJO, display: "inline-block", transform: `scale(${res})`, transformOrigin: "left" }}>≥ ×9</div>
          </Panel>
        </div>
        <Nota at={cN + largo * 0.85} color={v.azafran} tam={28} style={{ position: "absolute", left: 0, top: 410 }}>
          un confusor tan desbalanceado es poco creíble: así nació el análisis de sensibilidad
        </Nota>
        <Nota at={cN + largo * 0.9} color={v.niebla} tam={24} style={{ position: "absolute", left: 0, top: 510 }}>
          Cornfield et al. (1959), Journal of the National Cancer Institute
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El factor de sesgo ───────────────────────────────────────────────────────
export const FormulaEsc: React.FC = () => {
  const frame = useCurrentFrame();
  const cS = useCue("sesgo");
  const cX = useCue("ux");
  const cY = useCue("uy");
  const cM = useCue("maximo");
  const cM2 = useCueAt("maximo", 0.55);
  const activas = frame >= cM ? [] : frame >= cY ? ["uy"] : frame >= cX ? ["ux"] : [];
  return (
    <Escena>
      <Cabeza at={cS} titulo="El factor|*de sesgo.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <Foco activas={activas}>
          <Formula tam={64}>
            <Entra at={cS + 6}>
              <V color={ROJO}>B</V>
              <Op>=</Op>
              <Frac
                arriba={
                  <>
                    <V id="ux" color={UX}>
                      RR<Sub>UX</Sub>
                    </V>
                    <Op>·</Op>
                    <V id="uy" color={UY}>
                      RR<Sub>UY</Sub>
                    </V>
                  </>
                }
                abajo={
                  <>
                    <V id="ux" color={UX}>
                      RR<Sub>UX</Sub>
                    </V>
                    <Op>+</Op>
                    <V id="uy" color={UY}>
                      RR<Sub>UY</Sub>
                    </V>
                    <Op>−</Op>1
                  </>
                }
              />
            </Entra>
          </Formula>
        </Foco>
        <div style={{ position: "absolute", left: 0, top: 220, display: "flex", flexDirection: "column", gap: 12 }}>
          <Nota at={cX + 4} color={UX} tam={28}>
            <i style={{ fontFamily: serif }}>RR</i>
            <sub>UX</sub>: cuántas veces más común es U entre quienes usan la app
          </Nota>
          <Nota at={cY + 4} color={UY} tam={28}>
            <i style={{ fontFamily: serif }}>RR</i>
            <sub>UY</sub>: cuántas veces U aumenta la probabilidad de renovar
          </Nota>
          <Nota at={cM + 4} color={ROJO} tam={28}>
            <i style={{ fontFamily: serif }}>B</i>: el sesgo máximo que U puede crear
          </Nota>
        </div>
        <Panel caja={{ x: 0, y: 420, w: 912, h: 130 }} at={cM2} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Scale size={48} strokeWidth={1.5} color={ROJO} />
          <div style={{ fontSize: 30 }}>
            si <i style={{ fontFamily: serif }}>B</i> ≥ <span style={{ fontFamily: serif }}>1,8</span>, el confusor puede explicar todo el efecto
          </div>
        </Panel>
        <Nota at={cM + 20} color={v.niebla} tam={24} style={{ position: "absolute", left: 0, top: 580 }}>
          Ding y VanderWeele (2016), Epidemiology
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El valor E ───────────────────────────────────────────────────────────────
export const Evalue: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cV = useCue("valor");
  const cT = useCue("tres");
  const cL = useCue("limite");
  const largoT = useCueAt("tres", 1) - cT;
  const cV2 = useCueAt("valor", 0.5);
  const res = transicion(frame, cT + largoT * 0.35, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cV} titulo="El|*E-value.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <Formula tam={72}>
          <Entra at={cV2}>
            <V color={v.azafran}>E</V>
            <Op>=</Op>
            <V color={c.c}>RR</V>
            <Op>+</Op>
            <Raiz>
              <V color={c.c}>RR</V>
              <Op>·</Op>(<V color={c.c}>RR</V>
              <Op>−</Op>1)
            </Raiz>
          </Entra>
        </Formula>
        <Nota at={cV + 10} color={v.niebla} tam={28} style={{ marginTop: 14 }}>
          la fuerza mínima, igual en ambos lados (<i style={{ fontFamily: serif }}>RR</i>
          <sub>UX</sub> = <i style={{ fontFamily: serif }}>RR</i>
          <sub>UY</sub>), que borra el efecto
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 240 }}>
          <Formula tam={64}>
            <Entra at={cT + 4}>
              1,8<Op>+</Op>
              <Raiz>1,44</Raiz>
              <Op>=</Op>
              <span style={{ color: v.azafran, fontSize: 100, display: "inline-block", transform: `scale(${res})` }}>3,0</span>
            </Entra>
          </Formula>
          <Nota at={cT + largoT * 0.55} color={v.azafran} tam={28} style={{ marginTop: 12 }}>
            U tendría que triplicar a la vez el uso de la app y la renovación
          </Nota>
        </div>
        <Panel caja={{ x: 0, y: 500, w: 912, h: 130 }} at={cL + 4} color={c.b} estilo={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div style={{ fontSize: 30 }}>límite inferior del intervalo: 1,3</div>
          <div style={{ fontSize: 40, color: v.niebla }}>→</div>
          <div style={{ fontFamily: serif, fontSize: 64, color: c.b }}>E = 1,9</div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── La curva de combinaciones ────────────────────────────────────────────────
export const Curva: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("curva");
  const cP = useCue("comparar");
  const largoC = useCueAt("curva", 1) - cC;
  const largoP = useCueAt("comparar", 1) - cP;
  const k = transicion(frame, cC + 20, fps, 1300, EXPO_IN_OUT);
  const as = Array.from({ length: 120 }, (_, i) => 1.9 + (i / 119) * 8.1);
  const curva = as.map((a) => [a, Math.min(10.5, (RR * (a - 1)) / (a - RR))] as P);
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cC} titulo="Todas las|*combinaciones.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <Ejes ancho={912} alto={560} x={[1, 10]} y={[1, 10]} at={cC} rotuloX="U más común entre usuarios →" rotuloY="U aumenta la renovación" marcasX={[1, 2, 3, 5, 10].map((m) => ({ v: m, t: `×${m}` }))}>
          {({ px, py }) => (
            <g>
              <path d={`M${curva.map(([a, b]) => `${px(a)},${py(b)}`).join("L")}L${px(10)},${py(10)}Z`} fill={ROJO} opacity={0.16 * k} />
              <Traza pts={curva.map(([a, b]) => [px(a), py(b)] as P)} k={k} color={ROJO} ancho={5} />
              <text x={px(6.5)} y={py(7.5)} fontSize={30} fill={ROJO} opacity={k}>
                borra el efecto
              </text>
              <text x={px(7)} y={py(1.25)} fontSize={30} fill={v.niebla} opacity={k}>
                no alcanza
              </text>
              <g opacity={t(cC + largoC * 0.35)}>
                <circle cx={px(3)} cy={py(3)} r={14} fill={v.azafran} />
                <text x={px(3) + 22} y={py(3) - 16} fontFamily={mono} fontSize={26} fill={v.azafran}>
                  E = 3 · (3, 3)
                </text>
              </g>
              <g opacity={t(cC + largoC * 0.75)}>
                <circle cx={px(2)} cy={py(9)} r={14} fill={c.b} />
                <text x={px(2) + 22} y={py(9) + 8} fontFamily={mono} fontSize={26} fill={c.b}>
                  (2, 9)
                </text>
              </g>
              <g opacity={t(cP + largoP * 0.3)}>
                <circle cx={px(1.5)} cy={py(1.5)} r={14} fill={c.c} />
                <text x={px(1.5) + 22} y={py(1.5) - 14} fontFamily={mono} fontSize={26} fill={c.c}>
                  tu confusor medido · B = 1,1
                </text>
              </g>
            </g>
          )}
        </Ejes>
        <Nota at={cP + largoP * 0.6} color={c.c} tam={28} style={{ position: "absolute", left: 0, top: 600 }}>
          un oculto tendría que ser mucho más fuerte que todo lo que conoces
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Cuidado ──────────────────────────────────────────────────────────────────
export const Cuidado: React.FC = () => {
  const cO = useCue("ojo");
  const largo = useCueAt("ojo", 1) - cO;
  const items: [typeof Check, string, string, string, number][] = [
    [BadgeX, "no prueba causalidad", "solo dice cuánto aguanta tu conclusión", ROJO, 0.05],
    [BadgeX, "no es un p-valor", "mide confusión, no azar", ROJO, 0.18],
    [Gauge, "E alto ≠ sin confusión", "dice que tendría que ser fuerte", v.azafran, 0.35],
    [ListChecks, "reporta los dos", "el del estimado y el del intervalo", c.c, 0.78],
  ];
  return (
    <Escena>
      <Cabeza at={cO} titulo="Lo que|*no dice.*" />
      <Escenario alto={660} style={{ marginTop: 34 }}>
        {items.map(([I, t, d, col, f], i) => (
          <Panel key={t} caja={{ x: 0, y: i * 140, w: 912, h: 124 }} at={cO + largo * f} color={col} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
            <I size={46} strokeWidth={1.5} color={col} />
            <div>
              <div style={{ fontSize: 34 }}>{t}</div>
              <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 4 }}>{d}</div>
            </div>
          </Panel>
        ))}
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
        <Cinetico at={cCta} texto="No digas *no hay.*|Di *cuánto tendría.*" style={{ fontSize: 84 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 16/17 · double machine learning
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
