import React from "react";
import { BellRing, Check, Eye, Mountain, ScanFace, Truck } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, mono } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";
import { DER, IZQ, TRAMOS } from "./datos";

const SERIE = "Cuasi-experimentos · 06";
const CORTE = 0.6;

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

// Gráfico de discontinuidad: promedios por tramo, corte y rectas locales.
const Grafico: React.FC<{ at: number; kRectas: number; kBanda: number; alto?: number }> = ({ at, kRectas, kBanda, alto = 440 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Ejes ancho={912} alto={alto} x={[0, 1]} y={[0, 0.2]} at={at} rotuloX="puntaje de fatiga →" rotuloY="incidentes por hora" marcasX={[0, 0.2, 0.4, 0.6, 0.8, 1].map((m) => ({ v: m, t: m.toFixed(1).replace(".", ",") }))}>
      {({ px, py }) => (
        <g>
          <rect x={px(0.5)} y={py(0.2)} width={px(0.7) - px(0.5)} height={py(0) - py(0.2)} fill={v.azafran} opacity={0.08 * kBanda} />
          <line x1={px(CORTE)} y1={py(0)} x2={px(CORTE)} y2={py(0.2)} stroke={ROJO} strokeWidth={3} strokeDasharray="8 7" />
          <text x={px(CORTE) + 8} y={py(0.19)} fontFamily={mono} fontSize={22} fill={ROJO}>
            alarma ≥ 0,6
          </text>
          {TRAMOS.map(([s, y], i) => (
            <circle key={i} cx={px(s)} cy={py(y)} r={9} fill={s < CORTE ? v.niebla : c.c} opacity={transicion(frame, at + 6 + i * 1.2, fps, 300, EXPO_OUT)} />
          ))}
          <g opacity={kRectas}>
            <line x1={px(0.5)} y1={py(IZQ[0] + IZQ[1] * 0.5)} x2={px(CORTE)} y2={py(IZQ[0] + IZQ[1] * CORTE)} stroke={v.hueso} strokeWidth={5} />
            <line x1={px(CORTE)} y1={py(DER[0] + DER[1] * CORTE)} x2={px(0.7)} y2={py(DER[0] + DER[1] * 0.7)} stroke={c.c} strokeWidth={5} />
            <line x1={px(CORTE) + 14} y1={py(IZQ[0] + IZQ[1] * CORTE)} x2={px(CORTE) + 14} y2={py(DER[0] + DER[1] * CORTE)} stroke={v.azafran} strokeWidth={4} />
            <text x={px(CORTE) + 24} y={py(0.06)} fontFamily={serif} fontSize={30} fill={v.azafran}>
              τ ≈ −0,063
            </text>
          </g>
        </g>
      )}
    </Ejes>
  );
};

// ─── Gancho: la paradoja de la alarma ─────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("camion");
  const cP = useCue("paradoja");
  const largo = useCueAt("paradoja", 1) - cP;
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  const res = transicion(frame, cP + largo * 0.25, fps, 500, backOut);
  return (
    <Escena>
      <Escenario alto={620}>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            [Truck, "camión", 0],
            [ScanFace, "cámara de fatiga", 0.3],
            [BellRing, "alarma si ≥ 0,6", 0.6],
          ].map(([I, txt, f]) => {
            const Icono = I as typeof Truck;
            return (
              <div key={txt as string} style={{ flex: 1, height: 180, borderRadius: 20, border: `2px solid ${v.azafran}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, opacity: t(cC + 6 + (f as number) * 60) }}>
                <Icono size={56} strokeWidth={1.4} color={v.azafran} />
                <div style={{ fontSize: 28 }}>{txt as string}</div>
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 0, top: 240, width: 912, opacity: t(cP) }}>
          <div style={{ fontSize: 30, color: v.niebla }}>incidentes: horas con alarma − horas sin alarma</div>
          <div style={{ fontFamily: serif, fontSize: 120, color: ROJO, display: "inline-block", transform: `scale(${res})`, transformOrigin: "left" }}>+4 pts</div>
        </div>
        <Panel caja={{ x: 0, y: 470, w: 912, h: 120 }} at={cP + largo * 0.6} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Eye size={46} strokeWidth={1.5} color={c.c} />
          <div style={{ fontSize: 30 }}>la alarma suena justo cuando hay más fatiga</div>
        </Panel>
      </Escenario>
      <div style={{ marginTop: 10 }}>
        <Cinetico at={cP + largo * 0.85} texto="¿La alarma *empeora?*" style={{ fontSize: 92 }} />
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
      <Cinetico at={6} texto="Umbrales y|*regresión discontinua.*" style={{ marginTop: 18, fontSize: 104 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>alarmas de fatiga en camiones mineros · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── La idea: en el umbral, un sorteo ─────────────────────────────────────────
export const Idea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cU = useCue("umbral");
  const cS = useCue("sorteo");
  const largo = useCueAt("umbral", 1) - cU;
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  const px = (x: number) => 40 + x * 830;
  return (
    <Escena>
      <Cabeza at={cU} titulo="En el umbral,|*un sorteo.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <svg width={912} height={300} style={{ position: "absolute", left: 0, top: 40, overflow: "visible", opacity: t(cU + 4) }}>
          <line x1={px(0)} y1={150} x2={px(1)} y2={150} stroke={v.ceniza} strokeWidth={3} />
          <line x1={px(0.6)} y1={60} x2={px(0.6)} y2={240} stroke={ROJO} strokeWidth={3} strokeDasharray="8 7" />
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((m) => (
            <text key={m} x={px(m)} y={200} textAnchor="middle" fontFamily={mono} fontSize={22} fill={v.niebla}>
              {m.toFixed(1).replace(".", ",")}
            </text>
          ))}
          <g opacity={t(cU + largo * 0.6)}>
            <circle cx={px(0.59)} cy={150} r={16} fill={v.niebla} />
            <circle cx={px(0.61)} cy={150} r={16} fill={c.c} />
            <text x={px(0.59) - 20} y={110} textAnchor="end" fontFamily={serif} fontSize={34} fill={v.niebla}>
              0,59 · sin alarma
            </text>
            <text x={px(0.61) + 20} y={110} fontFamily={serif} fontSize={34} fill={c.c}>
              0,61 · alarma
            </text>
          </g>
        </svg>
        <Panel caja={{ x: 0, y: 350, w: 912, h: 130 }} at={cS + 4} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <BellRing size={46} strokeWidth={1.5} color={v.azafran} />
          <div style={{ fontSize: 30 }}>prácticamente iguales: solo difieren en la alarma</div>
        </Panel>
        <Nota at={cS + 30} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 510 }}>
          Thistlethwaite y Campbell (1960), Journal of Educational Psychology 51(6)
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El salto ─────────────────────────────────────────────────────────────────
export const Salto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cG = useCue("grafico");
  const cN = useCue("numeros");
  const largoG = useCueAt("grafico", 1) - cG;
  const largoN = useCueAt("numeros", 1) - cN;
  const kR = transicion(frame, cG + largoG * 0.6, fps, 800, EXPO_IN_OUT);
  const filas: [string, string, string, number][] = [
    ["comparación ingenua", "+4,0", ROJO, 0.15],
    ["regresión discontinua", "−6,3", c.c, 0.45],
    ["efecto real (simulado)", "−6,0", v.hueso, 0.75],
  ];
  return (
    <Escena>
      <Cabeza at={cG} titulo="El salto|*es el efecto.*" />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <Grafico at={cG} kRectas={kR} kBanda={0} />
        <div style={{ position: "absolute", left: 0, top: 480, width: 912 }}>
          {filas.map(([n, val, col, f]) => (
            <div key={n} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #2A2A33", opacity: transicion(frame, cN + largoN * f, fps, 400, EXPO_OUT) }}>
              <span style={{ fontSize: 30 }}>{n}</span>
              <span style={{ fontFamily: serif, fontSize: 52, color: col }}>{val} pts</span>
            </div>
          ))}
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── La fórmula y el ancho de banda ───────────────────────────────────────────
export const FormulaEsc: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cL = useCue("limites");
  const cB = useCue("banda");
  const largoL = useCueAt("limites", 1) - cL;
  const activas = frame >= cB ? [] : frame >= cL + largoL * 0.65 ? ["izq"] : frame >= cL + largoL * 0.3 ? ["der"] : [];
  const kB = transicion(frame, cB, fps, 600, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cL} titulo="Dos límites,|*una resta.*" />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <Foco activas={activas}>
          <Formula tam={50}>
            <Entra at={cL + 6}>
              τ<Op>=</Op>
              <V id="der" color={c.c} italica={false}>
                lim
                <Sub>x↓c</Sub> E[Y|X=x]
              </V>
              <Op>−</Op>
              <V id="izq" color={v.hueso} italica={false}>
                lim
                <Sub>x↑c</Sub> E[Y|X=x]
              </V>
            </Entra>
          </Formula>
        </Foco>
        <div style={{ position: "absolute", left: 0, top: 110 }}>
          <Grafico at={cL + 10} kRectas={1} kBanda={kB} alto={400} />
        </div>
        <div style={{ position: "absolute", left: 0, top: 540, width: 912, display: "flex", gap: 16, opacity: kB }}>
          <div style={{ flex: 1, borderRadius: 18, border: `2px solid ${v.azafran}`, padding: "14px 18px" }}>
            <div style={{ fontSize: 26, color: v.azafran }}>h angosto</div>
            <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla }}>menos sesgo, más ruido</div>
          </div>
          <div style={{ flex: 1, borderRadius: 18, border: `2px solid ${c.b}`, padding: "14px 18px" }}>
            <div style={{ fontSize: 26, color: c.b }}>h ancho</div>
            <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla }}>menos ruido, más sesgo</div>
          </div>
        </div>
        <Nota at={cB + 40} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 680 }}>
          h = 0,1 en la simulación · Imbens y Lemieux (2008) · Calonico, Cattaneo y Titiunik (2014)
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── La trampa: manipulación ──────────────────────────────────────────────────
export const Trampa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("manipula");
  const cC = useCue("mccrary");
  const k = transicion(frame, cC, fps, 900, EXPO_IN_OUT);
  const barras = Array.from({ length: 20 }, (_, i) => {
    const x = (i + 0.5) / 20;
    const base = 1;
    const monton = x >= 0.55 && x < 0.6 ? 1.8 : x >= 0.6 && x < 0.65 ? 0.35 : 1;
    return [x, base + (monton - base) * k];
  });
  return (
    <Escena>
      <Cabeza at={cM} titulo="Ojo con|*la manipulación.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <Nota at={cM + 10} color={ROJO} tam={28}>
          si la gente puede mover su puntaje, el corte deja de ser un sorteo
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 80 }}>
          <Ejes ancho={912} alto={400} x={[0, 1]} y={[0, 2]} at={cM} rotuloX="puntaje →" rotuloY="cantidad de casos">
            {({ px, py }) => (
              <g>
                {barras.map(([x, h], i) => (
                  <rect key={i} x={px(x - 0.023)} y={py(h)} width={px(0.046) - px(0)} height={py(0) - py(h)} fill={x >= 0.55 && x < 0.65 && k > 0.1 ? ROJO : v.ceniza} opacity={0.85} />
                ))}
                <line x1={px(CORTE)} y1={py(0)} x2={px(CORTE)} y2={py(2)} stroke={ROJO} strokeWidth={3} strokeDasharray="8 7" />
                <text x={px(0.3)} y={py(1.85)} fontFamily={mono} fontSize={22} fill={ROJO} opacity={k}>
                  amontonamiento justo bajo el corte
                </text>
              </g>
            )}
          </Ejes>
        </div>
        <Panel caja={{ x: 0, y: 520, w: 912, h: 120 }} at={cC + 30} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ fontSize: 28 }}>prueba de densidad de McCrary (2008): ¿hay más casos a un lado del umbral de lo esperable?</div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── IA: umbrales por todas partes ────────────────────────────────────────────
export const Ia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("confianza");
  const cG = useCue("guarda");
  const largo = useCueAt("confianza", 1) - cC;
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cC} titulo="La IA está llena|*de umbrales.*" />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        {[
          [Mountain, "confianza < 0,7", "el caso va a un geólogo", 0.15],
          [Truck, "riesgo > umbral", "se detiene el equipo", 0.55],
        ].map(([I, a, b, f], i) => {
          const Icono = I as typeof Truck;
          return (
            <Panel key={a as string} caja={{ x: 0, y: i * 150, w: 912, h: 130 }} at={cC + largo * (f as number)} color={c.b} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Icono size={48} strokeWidth={1.5} color={c.b} />
              <div style={{ fontFamily: mono, fontSize: 30, color: c.b, width: 340 }}>{a as string}</div>
              <div style={{ fontSize: 28 }}>→ {b as string}</div>
            </Panel>
          );
        })}
        <div style={{ position: "absolute", left: 0, top: 340, width: 912, opacity: t(cG) }}>
          <div style={{ fontSize: 30 }}>guarda el puntaje continuo, no solo la decisión:</div>
          <div style={{ fontFamily: mono, fontSize: 26, color: c.c, marginTop: 16, lineHeight: 1.6 }}>
            log({"{"} caso, puntaje: 0.6931, decision: "geologo" {"}"})
          </div>
          <div style={{ fontSize: 28, color: v.azafran, marginTop: 20 }}>cada umbral te regala una regresión discontinua</div>
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
        <Cinetico at={cCta} texto="Donde hay un umbral,|*hay un experimento.*" style={{ fontSize: 84 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próximo: 07 · experimentos naturales
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
