import React from "react";
import { Check, ClipboardList, CreditCard, Crosshair, Database, FileCode2, ShieldQuestion, Sigma, UserCheck } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Formula, Op, serif } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Traza } from "../../estilos/vacio/causal";
import { type P } from "../../estilos/vacio/grafo";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Codigo, Escenario, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "Cuasi-experimentos · 11";

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
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const iconos = [ClipboardList, Database, Crosshair, Sigma, ShieldQuestion];
  return (
    <Escena>
      <Escenario alto={560}>
        <div style={{ display: "flex", justifyContent: "space-between", width: 912 }}>
          {iconos.map((I, i) => (
            <div key={i} style={{ width: 160, height: 160, borderRadius: 24, border: `2px solid ${[v.niebla, c.b, v.azafran, c.c, ROJO][i]}`, background: relleno, display: "flex", alignItems: "center", justifyContent: "center", opacity: t(at + 6 + i * 6) }}>
              <I size={64} strokeWidth={1.4} color={[v.niebla, c.b, v.azafran, c.c, ROJO][i]} />
            </div>
          ))}
        </div>
        <Panel caja={{ x: 0, y: 240, w: 912, h: 170 }} at={at + largo * 0.5} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 26 }}>
          <CreditCard size={60} strokeWidth={1.4} color={v.azafran} />
          <div style={{ fontSize: 34 }}>subir el límite de la tarjeta, ¿aumenta el endeudamiento?</div>
        </Panel>
      </Escenario>
      <div style={{ marginTop: 10 }}>
        <Cinetico at={at + largo * 0.8} texto="Inferencia causal|*de punta a punta.*" style={{ fontSize: 88 }} />
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
      <Cinetico at={6} texto="Un equipo|de agentes que hace|*inferencia causal.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>cierre de la serie · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── El caso real: Agarwal et al. ─────────────────────────────────────────────
export const Caso: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cA = useCue("agarwal");
  const cH = useCue("hallazgo");
  const largoA = useCueAt("agarwal", 1) - cA;
  const largoH = useCueAt("hallazgo", 1) - cH;
  const kE = transicion(frame, cA + largoA * 0.6, fps, 1000, EXPO_IN_OUT);
  const t = (a: number) => transicion(frame, a, fps, 600, EXPO_OUT);
  const escalon = (s: number) => 2000 + (s >= 620 ? 1500 : 0) + (s >= 660 ? 1500 : 0) + (s >= 720 ? 2000 : 0) + (s - 560) * 8;
  const ss = Array.from({ length: 121 }, (_, i) => 560 + i * 2.5);
  const k127 = t(cH + largoH * 0.55);
  const k2203 = t(cH + largoH * 0.75);
  return (
    <Escena>
      <Cabeza at={cA} titulo="Un caso real:|*límites y puntajes.*" />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", gap: 30, fontSize: 26, opacity: t(cA + 6) }}>
          <span>
            <span style={{ fontFamily: serif, fontSize: 48, color: c.c }}>8,5 M</span> tarjetas
          </span>
          <span>
            <span style={{ fontFamily: serif, fontSize: 48, color: v.azafran }}>743</span> discontinuidades
          </span>
        </div>
        <div style={{ position: "absolute", left: 0, top: 80 }}>
          <Ejes ancho={912} alto={300} x={[560, 860]} y={[0, 10000]} at={cA + largoA * 0.5} rotuloX="puntaje de crédito (FICO) →" rotuloY="límite asignado" marcasX={[620, 660, 720].map((m) => ({ v: m, t: String(m) }))}>
            {({ px, py }) => (
              <g>
                <Traza pts={ss.map((s) => [px(s), py(escalon(s))] as P)} k={kE} color={v.azafran} ancho={5} />
                {[620, 660, 720].map((m) => (
                  <line key={m} x1={px(m)} y1={py(0)} x2={px(m)} y2={py(10000)} stroke={ROJO} strokeWidth={2} strokeDasharray="6 7" opacity={kE} />
                ))}
              </g>
            )}
          </Ejes>
        </div>
        <div style={{ position: "absolute", left: 0, top: 400, width: 912, opacity: t(cH) }}>
          <div style={{ fontSize: 26 }}>alza óptima del límite por cada punto menos de costo de fondos</div>
          {[
            ["FICO < 660 (se endeudan más)", 127, ROJO, k127],
            ["FICO > 740", 2203, c.c, k2203],
          ].map(([n, val, col, k]) => (
            <div key={n as string} style={{ marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}>
                <span>{n as string}</span>
                <span style={{ fontFamily: serif, fontSize: 44, color: col as string }}>US$ {Math.round((val as number) * (k as number)).toLocaleString("es-CL")}</span>
              </div>
              <div style={{ height: 30, borderRadius: 8, background: "#16161B", marginTop: 6 }}>
                <div style={{ height: 30, width: `${((val as number) / 2300) * 100 * (k as number)}%`, minWidth: (k as number) > 0 ? 6 : 0, borderRadius: 8, background: col as string }} />
              </div>
            </div>
          ))}
        </div>
        <Nota at={cH + largoH * 0.85} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 710 }}>
          Agarwal, Chomsisengphet, Mahoney y Stroebel (2018), Quarterly Journal of Economics 133(1) · escalones ilustrativos
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El equipo ────────────────────────────────────────────────────────────────
const AGENTES: [typeof Sigma, string, string, string][] = [
  [ClipboardList, "planificador", "formula la pregunta y deja escrito el plan", v.niebla],
  [Database, "datos", "arma la base de cuentas y límites", c.b],
  [Crosshair, "identificación", "encuentra la regla: cortes de puntaje → RDD", v.azafran],
  [Sigma, "estimador", "calcula el salto en cada corte", c.c],
  [ShieldQuestion, "crítico", "cortes falsos · McCrary · sensibilidad", ROJO],
];

export const Equipo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("planificador");
  const cI = useCue("identifica");
  const cC = useCue("critico");
  const largoI = useCueAt("identifica", 1) - cI;
  const largoC = useCueAt("critico", 1) - cC;
  const aparece = [cP + 6, cI + 4, cI + largoI * 0.35, cC + 4, cC + largoC * 0.35];
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cP} titulo="El|*equipo.*" />
      <Escenario alto={780} style={{ marginTop: 34 }}>
        {AGENTES.map(([I, n, d, col], i) => (
          <Panel key={n} caja={{ x: 0, y: i * 140, w: 912, h: 120 }} at={aparece[i]} color={col} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
            <I size={44} strokeWidth={1.5} color={col} />
            <div>
              <div style={{ fontSize: 30 }}>agente {n}</div>
              <div style={{ fontSize: 23, fontWeight: 200, color: v.niebla, marginTop: 2 }}>{d}</div>
            </div>
          </Panel>
        ))}
        <div style={{ position: "absolute", left: 0, top: 710, display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: v.azafran, opacity: t(cC + largoC * 0.8) }}>
          <ShieldQuestion size={30} strokeWidth={1.6} color={v.azafran} /> el crítico intenta romper el resultado antes de que llegue a una persona
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── A2A: tarjetas y estados ──────────────────────────────────────────────────
const ESTADOS: [string, number, number, string][] = [
  ["enviada", 0, 80, v.niebla],
  ["en curso", 230, 80, c.b],
  ["completada", 470, 20, c.c],
  ["requiere información", 470, 150, ROJO],
];

export const A2a: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cT = useCue("tarjeta");
  const cP = useCue("persona");
  const largoT = useCueAt("tarjeta", 1) - cT;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const K = "#C792EA";
  const S = "#C3E88D";
  const kRojo = t(cP + 4);
  return (
    <Escena>
      <Cabeza at={cT} titulo="Coordinados|*por A2A.*" />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <Codigo
          caja={{ x: 0, y: 0, w: 912, h: 270 }}
          at={cT + 6}
          archivo="tarjeta del agente crítico"
          Icono={FileCode2}
          tam={22}
          lineas={[
            [["{ "], ["name", K], [": "], ['"critico-causal"', S], [","]],
            [["  skills", K], [": ["], ['"placebo_cortes"', S], [", "], ['"densidad_mccrary"', S], [", "], ['"e_value"', S], ["],"]],
            [["  url", K], [": "], ['"https://agentes.banco.example/critico"', S], [" }"]],
          ]}
        />
        <svg width={912} height={260} style={{ position: "absolute", left: 0, top: 300, overflow: "visible" }}>
          {ESTADOS.map(([n, x, y, col], i) => {
            const k = t(cT + largoT * (0.45 + i * 0.12));
            const w = i === 3 ? 330 : 190;
            return (
              <g key={n} opacity={i === 3 ? Math.max(k * 0.5, kRojo) : k}>
                <rect x={x} y={y} width={w} height={70} rx={16} fill={relleno} stroke={col} strokeWidth={3} />
                <text x={x + w / 2} y={y + 44} textAnchor="middle" fontSize={24} fill={col}>
                  {n}
                </text>
              </g>
            );
          })}
          <g stroke={v.ceniza} strokeWidth={3} opacity={t(cT + largoT * 0.6)}>
            <line x1={190} y1={115} x2={230} y2={115} />
            <line x1={420} y1={105} x2={470} y2={60} />
            <line x1={420} y1={125} x2={470} y2={180} />
          </g>
        </svg>
        <Panel caja={{ x: 0, y: 580, w: 912, h: 130 }} at={cP + 10} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <UserCheck size={46} strokeWidth={1.5} color={ROJO} />
          <div style={{ fontSize: 28 }}>si el crítico encuentra un problema, la tarea vuelve a una persona</div>
        </Panel>
        <Nota at={cP + 40} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 725 }}>
          Agent2Agent (A2A): Google, abril de 2025; proyecto de la Linux Foundation desde junio de 2025 · tarjeta ilustrativa
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── El riesgo: los senderos que se bifurcan ──────────────────────────────────
export const Riesgo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("senderos");
  const cC = useCue("cuenta");
  const largoC = useCueAt("cuenta", 1) - cC;
  const k = transicion(frame, cS + 20, fps, 1400, EXPO_IN_OUT);
  const res = transicion(frame, cC + largoC * 0.35, fps, 500, backOut);
  const ks = Array.from({ length: 100 }, (_, i) => i + 1);
  return (
    <Escena>
      <Cabeza at={cS} titulo="Cien pruebas|*casi gratis.*" />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <Ejes ancho={912} alto={340} x={[1, 100]} y={[0, 1.05]} at={cS} rotuloX="especificaciones probadas →" rotuloY="P(≥ 1 falso positivo)" marcasX={[1, 20, 50, 100].map((m) => ({ v: m, t: String(m) }))}>
          {({ px, py }) => (
            <g>
              <Traza pts={ks.map((kk) => [px(kk), py(1 - Math.pow(0.95, kk))] as P)} k={k} color={ROJO} ancho={5} />
              <circle cx={px(100)} cy={py(1 - Math.pow(0.95, 100))} r={12} fill={ROJO} opacity={k} />
            </g>
          )}
        </Ejes>
        <div style={{ position: "absolute", left: 0, top: 370 }}>
          <Formula tam={56}>
            <Entra at={cC + 4}>
              1 − 0,95<sup style={{ fontSize: "0.55em" }}>100</sup>
              <Op>=</Op>
              <span style={{ color: ROJO, fontSize: 84, display: "inline-block", transform: `scale(${res})` }}>99 %</span>
            </Entra>
          </Formula>
        </div>
        <Panel caja={{ x: 0, y: 500, w: 912, h: 130 }} at={cC + largoC * 0.6} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <ClipboardList size={46} strokeWidth={1.5} color={c.c} />
          <div style={{ fontSize: 28 }}>el plan se escribe antes, y el crítico lleva la cuenta de cada prueba</div>
        </Panel>
        <Nota at={cC + largoC * 0.85} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 650 }}>
          Gelman y Loken (2014), «The statistical crisis in science», American Scientist 102(6)
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
        <Cinetico at={cCta} texto="Los agentes *aceleran.*|El diseño sigue|*siendo humano.*" style={{ fontSize: 80 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> serie Cuasi-experimentos completa
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
