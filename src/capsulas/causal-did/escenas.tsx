import React from "react";
import { Award, CalendarRange, Clock, Network, TriangleAlert, Check, X } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Media, Nota, Panel, ROJO, Rol, Traza, ultimo } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Chip, Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

// Card y Krueger (1994), tabla 3: empleo equivalente a tiempo completo por local.
const NJ = [20.44, 21.03];
const PA = [23.33, 21.17];
const CONTRA = NJ[0] + (PA[1] - PA[0]); // 18,28: Nueva Jersey si hubiera seguido a Pensilvania
const fmt = (x: number) => x.toFixed(2).replace(".", ",");

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cSube = useCue("sube");
  const cEng = useCue("engano");
  const estado = (x: number, nombre: string, color: string, antes: string, despues: string | null, at: number) => (
    <Panel caja={{ x, y: 0, w: 440, h: 260 }} at={at} color={color}>
      <Rol color={color}>{nombre}</Rol>
      <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 14 }}>salario mínimo por hora</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 10, fontFamily: serif, fontSize: 60 }}>
        <span style={{ color: despues ? v.ceniza : v.hueso, textDecoration: despues ? "line-through" : "none" }}>{antes}</span>
        {despues ? <span style={{ color, transform: `scale(${transicion(frame, at + 20, fps, 500, backOut)})`, display: "inline-block" }}>{despues}</span> : <span style={{ fontSize: 30, fontFamily: "inherit", color: v.ceniza }}>sin cambio</span>}
      </div>
    </Panel>
  );
  return (
    <Escena>
      <Escenario alto={300}>
        {estado(0, "Nueva Jersey", v.azafran, "US$ 4,25", "5,05", cSube + 6)}
        {estado(472, "Pensilvania", c.b, "US$ 4,25", null, cSube + 30)}
      </Escenario>
      <div style={{ marginTop: 40 }}>
        <Cinetico at={cSube + 40} texto="¿Se perdieron|*empleos?*" style={{ fontSize: 110 }} />
        <Sube at={cEng + 14} style={{ marginTop: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 34, fontWeight: 200, color: v.niebla }}>
            <TriangleAlert size={40} strokeWidth={1.6} color={ROJO} /> “antes y después” engaña
          </div>
        </Sube>
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ serie, autor }) => (
  <Escena>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, display: "flex", justifyContent: "center" }}>
      <Constelacion at={-60} ancho={700} forma="red" cantidad={520} />
    </div>
    <div style={{ marginTop: 450 }}>
      <Rotulo at={2}>{serie}</Rotulo>
      <Cinetico at={6} texto="Diferencias en|*diferencias.*" style={{ marginTop: 18, fontSize: 112 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Las dos trampas ──────────────────────────────────────────────────────────
export const Trampas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cT = useCue("tiempo");
  const cG = useCue("grupos");
  const malo = (at: number) => (
    <div style={{ position: "absolute", right: 20, top: 20, width: 56, height: 56, borderRadius: 28, background: ROJO, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${transicion(frame, at, fps, 400, backOut)})` }}>
      <X size={36} strokeWidth={3} color={v.vacio} />
    </div>
  );
  return (
    <Escena>
      <Rotulo at={cT}>Dos trampas</Rotulo>
      <Cinetico at={cT + 4} texto="Restar una vez|*no basta.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={700} style={{ marginTop: 30 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 320 }} at={cT + 8}>
          <Rol>Antes vs después (solo Nueva Jersey)</Rol>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 12 }}>
            <Ejes ancho={420} alto={220} x={[0, 1]} y={[19, 23]} at={cT + 10} marcasX={[{ v: 0, t: "antes" }, { v: 1, t: "después" }]}>
              {({ px, py }) => <Traza pts={[[px(0), py(NJ[0])], [px(1), py(NJ[1])]]} k={transicion(frame, cT + 20, fps, 700, EXPO_IN_OUT)} color={v.azafran} />}
            </Ejes>
            <div style={{ fontSize: 30, fontWeight: 200, lineHeight: 1.35 }}>
              mezcla la medida con
              <br />
              <span style={{ color: ROJO }}>la temporada y la economía</span>
            </div>
          </div>
          {malo(cT + 40)}
        </Panel>
        <Panel caja={{ x: 0, y: 360, w: 912, h: 320 }} at={cG}>
          <Rol>Tratado vs control (solo después)</Rol>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 40, marginTop: 20, height: 200 }}>
            {[
              ["NJ", NJ[1], v.azafran],
              ["PA", PA[1], c.b],
            ].map(([n, val, col]) => (
              <div key={n as string} style={{ textAlign: "center" }}>
                <div style={{ width: 120, height: ((val as number) - 15) * 24 * transicion(frame, cG + 10, fps, 700, EXPO_OUT), background: col as string, borderRadius: 10 }} />
                <div style={{ fontFamily: mono, fontSize: 24, marginTop: 8 }}>{n}</div>
              </div>
            ))}
            <div style={{ fontSize: 30, fontWeight: 200, lineHeight: 1.35, marginLeft: 20 }}>
              mezcla la medida con
              <br />
              <span style={{ color: ROJO }}>lo que ya los hacía distintos</span>
            </div>
          </div>
          {malo(cG + 40)}
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── La idea: el control muestra el contrafactual ─────────────────────────────
const GraficoDiD: React.FC<{ at: number; atContra: number; ancho?: number; alto?: number }> = ({ at, atContra, ancho = 912, alto = 520 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const kPA = transicion(frame, at, fps, 900, EXPO_IN_OUT);
  const kNJ = transicion(frame, at + 20, fps, 900, EXPO_IN_OUT);
  const kC = transicion(frame, atContra, fps, 900, EXPO_IN_OUT);
  const kE = transicion(frame, atContra + 30, fps, 500, backOut);
  return (
    <Ejes ancho={ancho} alto={alto} x={[-0.15, 1.35]} y={[17, 24.5]} at={at - 6} marcasX={[{ v: 0, t: "feb 1992" }, { v: 1, t: "nov 1992" }]} rotuloY="empleo por local">
      {({ px, py }) => (
        <g>
          <Traza pts={[[px(0), py(PA[0])], [px(1), py(PA[1])]]} k={kPA} color={c.b} />
          <Traza pts={[[px(0), py(NJ[0])], [px(1), py(NJ[1])]]} k={kNJ} color={v.azafran} />
          <Traza pts={[[px(0), py(NJ[0])], [px(1), py(CONTRA)]]} k={kC} color={v.azafran} discontinuo opacidad={0.7} />
          {[
            [PA[0], 0, c.b],
            [PA[1], 1, c.b],
            [NJ[0], 0, v.azafran],
            [NJ[1], 1, v.azafran],
          ].map(([y, x, col], i) => (
            <g key={i} opacity={i < 2 ? kPA : kNJ}>
              <circle cx={px(x as number)} cy={py(y as number)} r={9} fill={col as string} />
              <text x={px(x as number) + (x === 0 ? -16 : 16)} y={py(y as number) + 9 + (x === 1 ? (i === 1 ? -16 : 20) : 0)} textAnchor={x === 0 ? "end" : "start"} fontFamily={serif} fontSize={30} fill={col as string}>
                {fmt(y as number)}
              </text>
            </g>
          ))}
          <text x={px(1) + 16} y={py(CONTRA) + 9} fontFamily={serif} fontSize={30} fill={v.azafran} opacity={kC * 0.8}>
            {fmt(CONTRA)} sin la medida
          </text>
          {kE > 0 ? (
            <g opacity={Math.min(1, kE)}>
              <line x1={px(1.0) - 30} y1={py(NJ[1])} x2={px(1.0) - 30} y2={py(CONTRA)} stroke={c.c} strokeWidth={5} />
              <text x={px(1.0) - 44} y={(py(NJ[1]) + py(CONTRA)) / 2 + 10} textAnchor="end" fontFamily={serif} fontSize={36} fill={c.c}>
                efecto
              </text>
            </g>
          ) : null}
          <text x={px(-0.12)} y={py(PA[0]) - 26} fontFamily={mono} fontSize={22} fill={c.b} opacity={kPA}>
            Pensilvania (control)
          </text>
          <text x={px(-0.12)} y={py(NJ[0]) + 52} fontFamily={mono} fontSize={22} fill={v.azafran} opacity={kNJ}>
            Nueva Jersey (tratado)
          </text>
        </g>
      )}
    </Ejes>
  );
};

export const Idea: React.FC = () => {
  const cResta = useCue("resta");
  const cContra = useCue("contrafactual");
  return (
    <Escena>
      <Rotulo at={cResta}>La idea</Rotulo>
      <Cinetico at={cResta + 4} texto="El control dice|qué *habría pasado.*" style={{ marginTop: 18, fontSize: 80 }} />
      <Escenario alto={600} style={{ marginTop: 40 }}>
        <GraficoDiD at={cResta + 10} atContra={cContra + 6} />
      </Escenario>
    </Escena>
  );
};

// ─── La fórmula, resta por resta ──────────────────────────────────────────────
const FormulaDiD: React.FC<{ tam?: number; at: number }> = ({ tam = 58, at }) => (
  <Formula tam={tam}>
    <Entra at={at}>
      <V id="res" color={c.c} italica={false}>
        DiD
      </V>
      <Op>=</Op>(
      <V id="dt" color={v.azafran} italica={false}>
        <Media color={v.azafran} sub="T,1">
          Y
        </Media>
        <Op>−</Op>
        <Media color={v.azafran} sub="T,0">
          Y
        </Media>
      </V>
      )
      <V id="m" color={c.d} italica={false}>
        <Op style={{ color: "inherit" }}>−</Op>
      </V>
      (
      <V id="dc" color={c.b} italica={false}>
        <Media color={c.b} sub="C,1">
          Y
        </Media>
        <Op>−</Op>
        <Media color={c.b} sub="C,0">
          Y
        </Media>
      </V>
      )
    </Entra>
  </Formula>
);

export const FormulaEsc: React.FC = () => {
  const frame = useCurrentFrame();
  const cF = useCue("formula");
  const cP = useCue("primera");
  const cS = useCue("segunda");
  const fase = ultimo(frame, [cF, cP, cS]);
  const activas = [[], ["dt", "dc"], ["dt", "dc"], ["m"]][fase + 1];
  return (
    <Escena>
      <Rotulo at={cF}>La fórmula</Rotulo>
      <Cinetico at={cF + 4} texto="Dos *restas.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={700} style={{ marginTop: 40 }}>
        <Foco activas={activas}>
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <FormulaDiD at={cF + 6} />
          </div>
        </Foco>
        <div style={{ position: "absolute", left: 0, right: 0, top: 170, display: "flex", flexDirection: "column", gap: 14 }}>
          <Nota at={cF + 26} color={v.azafran}>
            <span style={{ fontFamily: serif, fontStyle: "italic" }}>Ȳ</span>
            <span style={{ fontSize: 22 }}>T,1</span>: promedio de los tratados, después (1) o antes (0)
          </Nota>
          <Nota at={cF + 34} color={c.b}>
            <span style={{ fontFamily: serif, fontStyle: "italic" }}>Ȳ</span>
            <span style={{ fontSize: 22 }}>C,1</span>: lo mismo para el grupo de control
          </Nota>
          <Nota at={cP + 4} color={v.azafran}>
            cada paréntesis es un <b style={{ fontWeight: 400 }}>antes y después</b> dentro del mismo grupo: borra lo que es fijo en él
          </Nota>
          <Nota at={cS + 4} color={c.d}>
            la resta del medio quita lo que les pasó <b style={{ fontWeight: 400 }}>a los dos a la vez</b>: temporada, economía
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El ejemplo real ──────────────────────────────────────────────────────────
export const Ejemplo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cD = useCue("datos");
  const cPA = useCueAt("datos", 0.6);
  const cR = useCue("resultado");
  const cN = useCue("nobel");
  const fila = (y: number, nombre: string, col: string, vals: number[], at: number) => {
    const k = transicion(frame, at, fps, 500, EXPO_OUT);
    const d = vals[1] - vals[0];
    return (
      <div style={{ position: "absolute", left: 0, top: y, width: 912, display: "grid", gridTemplateColumns: "240px 190px 190px 1fr", alignItems: "center", opacity: k, transform: `translateX(${(1 - k) * 30}px)` }}>
        <span style={{ fontSize: 30, color: col }}>{nombre}</span>
        <span style={{ fontFamily: serif, fontSize: 46 }}>{fmt(vals[0])}</span>
        <span style={{ fontFamily: serif, fontSize: 46 }}>{fmt(vals[1])}</span>
        <span style={{ fontFamily: serif, fontSize: 52, color: col }}>
          {d >= 0 ? "+" : "−"}
          {fmt(Math.abs(d))}
        </span>
      </div>
    );
  };
  const res = transicion(frame, cR + 4, fps, 600, backOut);
  return (
    <Escena>
      <Rotulo at={cD}>Card y Krueger, 1994</Rotulo>
      <Cinetico at={cD + 4} texto="Con datos|*reales.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 912, display: "grid", gridTemplateColumns: "240px 190px 190px 1fr", fontSize: 22, fontWeight: 600, letterSpacing: "0.1em", color: v.ceniza }}>
          <span>EMPLEO POR LOCAL</span>
          <span>ANTES</span>
          <span>DESPUÉS</span>
          <span>CAMBIO</span>
        </div>
        {fila(50, "Nueva Jersey", v.azafran, NJ, cD + 10)}
        {fila(140, "Pensilvania", c.b, PA, cPA)}
        <div style={{ position: "absolute", left: 0, top: 230, width: 912, height: 2, background: linea }} />
        <div style={{ position: "absolute", left: 0, top: 270, opacity: Math.min(1, res * 1.5) }}>
          <Formula tam={70}>
            <V color={c.c} italica={false}>
              DiD
            </V>
            <Op>=</Op>
            <span style={{ color: v.azafran }}>0,59</span>
            <Op>−</Op>(<span style={{ color: c.b }}>−2,16</span>)<Op>=</Op>
            <span style={{ color: c.c, fontSize: 96, display: "inline-block", transform: `scale(${res})` }}>+2,75</span>
          </Formula>
          <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 10 }}>empleos por local · el paper reporta 2,76 con valores sin redondear</div>
        </div>
        <Panel caja={{ x: 0, y: 470, w: 912, h: 130 }} at={cN + 4} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Award size={56} strokeWidth={1.5} color={v.azafran} />
          <div>
            <div style={{ fontSize: 34 }}>Nobel de Economía 2021 · David Card</div>
            <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla }}>por sus aportes empíricos a la economía laboral</div>
          </div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── En una regresión ─────────────────────────────────────────────────────────
export const Regresion: React.FC = () => {
  const frame = useCurrentFrame();
  const cI = useCue("interaccion");
  const cB = useCue("beta");
  const fase = ultimo(frame, [cI, cB]);
  const activas = [[], ["int", "b3"], ["b3"]][fase + 1];
  const B = (n: string, id: string, col: string) => (
    <V id={id} color={col}>
      β<Sub>{n}</Sub>
    </V>
  );
  const filas: [string, string, string, string][] = [
    ["0", "nivel del control, antes", "23,33", v.ceniza],
    ["1", "diferencia fija entre grupos", "−2,89", c.b],
    ["2", "cambio común en el tiempo", "−2,16", c.d],
    ["3", "el efecto: la diferencia en diferencias", "+2,75", c.c],
  ];
  return (
    <Escena>
      <Rotulo at={cI}>En una regresión</Rotulo>
      <Cinetico at={cI + 4} texto="Todo en|*un coeficiente.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={700} style={{ marginTop: 40 }}>
        <Foco activas={activas}>
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <Formula tam={50}>
              <Entra at={cI + 6}>
                <V>Y</V>
                <Op>=</Op>
                {B("0", "b0", v.ceniza)}
                <Op>+</Op>
                {B("1", "b1", c.b)}
                <V color={c.b} italica={false}>
                  T
                </V>
                <Op>+</Op>
                {B("2", "b2", c.d)}
                <V color={c.d} italica={false}>
                  P
                </V>
                <Op>+</Op>
                {B("3", "b3", c.c)}
                <V id="int" color={c.c} italica={false}>
                  (T·P)
                </V>
                <Op>+</Op>
                <V>ε</V>
              </Entra>
            </Formula>
          </div>
        </Foco>
        <div style={{ position: "absolute", left: 0, top: 110, fontSize: 26, fontWeight: 200, color: v.niebla }}>
          <span style={{ fontFamily: serif, color: c.b }}>T</span> = 1 si es Nueva Jersey · <span style={{ fontFamily: serif, color: c.d }}>P</span> = 1 si es después
        </div>
        {filas.map(([n, t, val, col], i) => (
          <Panel key={n} caja={{ x: 0, y: 180 + i * 116, w: 912, h: 100 }} at={cI + 30 + i * 8} color={fase >= 1 && n === "3" ? c.c : undefined} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 50, color: col, width: 70 }}>
              β<sub style={{ fontSize: "0.55em" }}>{n}</sub>
            </span>
            <span style={{ flex: 1, fontSize: 30, fontWeight: 200 }}>{t}</span>
            <span style={{ fontFamily: serif, fontSize: 44, color: col }}>{val}</span>
          </Panel>
        ))}
      </Escenario>
    </Escena>
  );
};

// ─── El supuesto: tendencias paralelas ────────────────────────────────────────
const Tendencias: React.FC<{ at: number; diverge: boolean }> = ({ at, diverge }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 1100, EXPO_IN_OUT);
  const t = [-3, -2, -1, 0, 1, 2];
  const ctl = t.map((x) => 20 + x * 0.4);
  const trt = t.map((x) => (diverge ? 17.4 + x * 1.1 : 18 + x * 0.4) + (x >= 1 ? 1.6 : 0));
  return (
    <Ejes ancho={400} alto={230} x={[-3.3, 2.3]} y={[13, 23]} at={at - 4} marcasX={[{ v: -3, t: "−3" }, { v: 0, t: "0" }, { v: 2, t: "+2" }]}>
      {({ px, py }) => (
        <g>
          <line x1={px(0.5)} y1={py(13)} x2={px(0.5)} y2={py(23)} stroke={v.ceniza} strokeDasharray="5 6" strokeWidth={2} />
          <Traza pts={t.map((x, i) => [px(x), py(ctl[i])])} k={k} color={c.b} ancho={4} />
          <Traza pts={t.map((x, i) => [px(x), py(trt[i])])} k={k} color={v.azafran} ancho={4} />
        </g>
      )}
    </Ejes>
  );
};

export const Supuesto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("paralelas");
  const cPrev = useCue("previas");
  const sello = (at: number, ok: boolean) => (
    <div style={{ position: "absolute", right: 18, top: 18, width: 54, height: 54, borderRadius: 27, background: ok ? c.c : ROJO, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${transicion(frame, at, fps, 400, backOut)})` }}>
      {ok ? <Check size={34} strokeWidth={3} color={v.vacio} /> : <X size={34} strokeWidth={3} color={v.vacio} />}
    </div>
  );
  return (
    <Escena>
      <Rotulo at={cP}>El supuesto</Rotulo>
      <Cinetico at={cP + 4} texto="Tendencias|*paralelas.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={700} style={{ marginTop: 40 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 320 }} at={cP + 8}>
          <Rol color={c.c}>Antes de la medida van juntas</Rol>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 6 }}>
            <Tendencias at={cP + 12} diverge={false} />
            <div style={{ fontSize: 28, fontWeight: 200, lineHeight: 1.35 }}>la brecha previa es estable: el control es un buen espejo</div>
          </div>
          {sello(cP + 50, true)}
        </Panel>
        <Panel caja={{ x: 0, y: 350, w: 912, h: 320 }} at={cPrev + 4} color={ROJO} discontinuo>
          <Rol color={ROJO}>Antes de la medida ya se separaban</Rol>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 6 }}>
            <Tendencias at={cPrev + 8} diverge />
            <div style={{ fontSize: 28, fontWeight: 200, lineHeight: 1.35 }}>la diferencia mezcla el efecto con una tendencia previa: desconfía</div>
          </div>
          {sello(cPrev + 46, false)}
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── Cuidado ──────────────────────────────────────────────────────────────────
export const Cuidado: React.FC = () => {
  const cR = useCue("riesgos");
  const largo = useCueAt("riesgos", 1) - cR;
  const riesgos = [
    { Icono: Clock, t: "Anticipación", d: "la gente reacciona antes de que llegue la medida" },
    { Icono: Network, t: "Contagio", d: "el efecto se filtra al grupo de control" },
    { Icono: CalendarRange, t: "Fechas distintas", d: "cada grupo recibe la medida en otro momento" },
  ];
  return (
    <Escena>
      <Rotulo at={cR}>Cuidado</Rotulo>
      <Cinetico at={cR + 4} texto="Tres *trampas* más." style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={700} style={{ marginTop: 40 }}>
        {riesgos.map((r, i) => (
          <Panel key={r.t} caja={{ x: 0, y: i * 150, w: 912, h: 130 }} at={cR + largo * (0.1 + i * 0.22)} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
            <r.Icono size={48} strokeWidth={1.5} color={ROJO} />
            <div>
              <div style={{ fontSize: 36 }}>{r.t}</div>
              <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>{r.d}</div>
            </div>
          </Panel>
        ))}
        <Sube at={cR + largo * 0.75} style={{ position: "absolute", left: 0, top: 480, width: 912 }}>
          <div style={{ fontSize: 28, fontWeight: 200, color: v.niebla, lineHeight: 1.4 }}>
            con fechas distintas, la regresión clásica puede mezclar efectos: usa estimadores modernos como <span style={{ color: v.azafran }}>Callaway y Sant’Anna</span> o <span style={{ color: v.azafran }}>Sun y Abraham</span>
          </div>
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
        <Cinetico at={cCta} texto="Dos restas,|un *supuesto.*" style={{ fontSize: 96 }} />
        <div style={{ marginTop: 30, padding: "14px 20px", borderRadius: 20, border: `1.5px solid ${linea}`, background: relleno, display: "inline-block" }}>
          <Foco activas={[]}>
            <FormulaDiD tam={42} at={cCta + 10} />
          </Foco>
        </div>
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 30} style={{ marginTop: 20 }}>
          <Chip texto="Card y Krueger (1994), American Economic Review" tam={20} />
        </Sube>
      </div>
    </Escena>
  );
};
