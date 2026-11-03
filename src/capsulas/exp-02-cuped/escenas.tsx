import React from "react";
import { BarChart3, BrainCircuit, CalendarDays, Check, Clock, UserPlus } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Op, serif, V } from "../../estilos/vacio/mate";
import { c, Ejes, Media, Nota, Panel, ROJO, Rol, Traza, ultimo } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Chip, Escenario, linea, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 02/17";
// Ruido pseudoaleatorio determinista en [-1, 1] (hash de seno; no forma líneas como un congruencial con i chico).
const azar = (i: number) => {
  const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
};
const normal = (x: number, mu: number, s: number) => Math.exp(-((x - mu) ** 2) / (2 * s * s)) / s;

// Personas ilustrativas: compras antes (X) y durante (Y), con correlación alta.
const PERSONAS = Array.from({ length: 40 }, (_, i) => {
  const x = 50 + azar(i) * 38;
  const y = 0.85 * x + 8 + azar(i + 17) * 14;
  return { x, y };
});

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

const Calendario: React.FC<{ at: number; dias: number; atRecorte?: number }> = ({ at, dias, atRecorte }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const recorte = atRecorte === undefined ? 0 : transicion(frame, atRecorte, fps, 900, EXPO_IN_OUT);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, width: 912 }}>
      {Array.from({ length: dias }, (_, i) => {
        const fuera = i >= 14;
        return (
          <div key={i} style={{ height: 70, borderRadius: 12, border: `2px solid ${fuera ? (recorte > 0.5 ? linea : v.azafran) : v.azafran}`, background: fuera ? `rgba(255,184,41,${0.25 * (1 - recorte)})` : `${v.azafran}40`, opacity: transicion(frame, at + i * 0.8, fps, 300, EXPO_OUT) * (fuera ? 1 - recorte * 0.75 : 1) }} />
        );
      })}
    </div>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const at = useCue("gancho");
  const cMitad = useCueAt("gancho", 0.55);
  return (
    <Escena>
      <Escenario alto={420}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 34, marginBottom: 20 }}>
          <CalendarDays size={40} strokeWidth={1.6} color={v.azafran} /> 4 semanas de experimento
        </div>
        <Calendario at={at + 4} dias={28} atRecorte={cMitad + 10} />
      </Escenario>
      <div style={{ marginTop: 40 }}>
        <Cinetico at={cMitad} texto="Mismos usuarios,|*la mitad* del tiempo." style={{ fontSize: 88 }} />
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
      <Cinetico at={6} texto="*CUPED.*" style={{ marginTop: 18, fontSize: 150 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>reducir la varianza con datos de antes · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── El ruido ─────────────────────────────────────────────────────────────────
export const Ruido: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cD = useCue("distintas");
  const cE = useCue("esconde");
  const xs = Array.from({ length: 81 }, (_, i) => -4 + (i / 80) * 8);
  const k = transicion(frame, cE + 4, fps, 900, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cD} titulo="¿De dónde viene|el *ruido?*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 230 }}>
          {PERSONAS.slice(0, 20).map((p, i) => (
            <div key={i} style={{ width: 36, height: p.x * 2.6 * transicion(frame, cD + 6 + i, fps, 400, EXPO_OUT), borderRadius: 8, background: p.x > 65 ? v.azafran : p.x < 35 ? c.b : v.ceniza }} />
          ))}
        </div>
        <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 12 }}>compras por persona antes del experimento · unos mucho, otros casi nada</div>
        <div style={{ position: "absolute", left: 0, top: 330 }}>
          <Ejes ancho={912} alto={300} x={[-4, 4]} y={[0, 0.48]} at={cE}>
            {({ px, py }) => (
              <g>
                <Traza pts={xs.map((x) => [px(x), py(normal(x, -0.25, 1.6) * 0.4)] as [number, number])} k={k} color={c.b} ancho={4} />
                <Traza pts={xs.map((x) => [px(x), py(normal(x, 0.25, 1.6) * 0.4)] as [number, number])} k={k} color={v.azafran} ancho={4} />
                <text x={px(0)} y={py(0.42)} textAnchor="middle" fontSize={26} fontFamily="Inter" fill={v.niebla} opacity={k}>
                  control y tratamiento: casi encima
                </text>
              </g>
            )}
          </Ejes>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── La idea ──────────────────────────────────────────────────────────────────
export const Idea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("idea");
  const k = transicion(frame, at + 30, fps, 900, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={at} titulo="Usa lo que ya|*sabías.*" />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <div style={{ position: "relative", height: 200 }}>
          <div style={{ position: "absolute", left: 0, top: 80, width: 912, height: 6, background: linea, borderRadius: 3 }} />
          <div style={{ position: "absolute", left: 0, top: 80, width: 912 * k, height: 6, background: v.azafran, borderRadius: 3 }} />
          <div style={{ position: "absolute", left: 456, top: 50, width: 4, height: 70, background: v.hueso }} />
          <div style={{ position: "absolute", left: 0, top: 120, width: 440 }}>
            <Rol color={c.b}>Antes del experimento</Rol>
            <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 64, color: c.b }}>X</div>
          </div>
          <div style={{ position: "absolute", left: 480, top: 120, width: 430 }}>
            <Rol color={v.azafran}>Durante</Rol>
            <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 64, color: v.azafran }}>Y</div>
          </div>
          <div style={{ position: "absolute", left: 400, top: 0, fontSize: 24, color: v.niebla }}>inicio</div>
        </div>
        <Nota at={at + 50} color={c.b} tam={30} style={{ marginTop: 110 }}>
          <i style={{ fontFamily: serif }}>X</i>: la misma métrica, medida antes, por ejemplo las compras del mes pasado
        </Nota>
        <Sube at={at + 70} style={{ marginTop: 40 }}>
          <Chip texto="Deng, Xu, Kohavi y Walker · Microsoft · 2013" tam={24} />
        </Sube>
      </Escenario>
    </Escena>
  );
};

// ─── La fórmula ───────────────────────────────────────────────────────────────
export const FormulaEsc: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cF = useCue("formula");
  const cX = useCue("x");
  const cT = useCue("theta");
  const fase = ultimo(frame, [cX, cT]);
  const activas = [[], ["x"], ["t"]][fase + 1];
  const kL = transicion(frame, cT + 10, fps, 900, EXPO_IN_OUT);
  const p = PERSONAS.reduce((a, b) => (b.x > a.x ? b : a));
  return (
    <Escena>
      <Cabeza at={cF} titulo="Restar lo|*predecible.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Foco activas={activas}>
          <Formula tam={72}>
            <Entra at={cF + 6}>
              <V color={c.c}>Y′</V>
              <Op>=</Op>
              <V>Y</V>
              <Op>−</Op>
              <V id="t" color={v.azafran}>
                θ
              </V>
              (
              <V id="x" color={c.b} italica={false}>
                <i>X</i> − <Media color={c.b}>X</Media>
              </V>
              )
            </Entra>
          </Formula>
        </Foco>
        <div style={{ position: "absolute", left: 0, top: 120 }}>
          <Ejes ancho={912} alto={400} x={[0, 100]} y={[0, 110]} at={cF + 10} rotuloX="X: compras antes →" rotuloY="Y: compras durante">
            {({ px, py }) => (
              <g>
                {PERSONAS.map((q, i) => (
                  <circle key={i} cx={px(q.x)} cy={py(q.y)} r={8} fill={v.ceniza} opacity={transicion(frame, cF + 14 + i * 0.5, fps, 300, EXPO_OUT) * 0.8} />
                ))}
                {fase >= 0 ? (
                  <g>
                    <line x1={px(50)} y1={py(0)} x2={px(50)} y2={py(110)} stroke={c.b} strokeWidth={2} strokeDasharray="6 6" />
                    <line x1={px(50)} y1={py(p.y)} x2={px(p.x)} y2={py(p.y)} stroke={c.b} strokeWidth={5} />
                    <circle cx={px(p.x)} cy={py(p.y)} r={12} fill={c.b} />
                    <text x={px(50) + 8} y={py(104)} fontFamily={serif} fontSize={30} fill={c.b}>
                      X̄
                    </text>
                  </g>
                ) : null}
                <Traza pts={[[px(8), py(0.85 * 8 + 8)], [px(96), py(0.85 * 96 + 8)]]} k={kL} color={v.azafran} ancho={5} />
              </g>
            )}
          </Ejes>
        </div>
        <div style={{ position: "absolute", left: 0, top: 550, display: "flex", flexDirection: "column", gap: 8 }}>
          <Nota at={cX + 4} color={c.b} tam={28}>
            <i style={{ fontFamily: serif }}>X − X̄</i>: cuánto más compraba esta persona antes que el promedio
          </Nota>
          <Nota at={cT + 4} color={v.azafran} tam={28}>
            <i style={{ fontFamily: serif }}>θ</i> = Cov(Y, X) / Var(X): la pendiente, cuánto de eso se repite
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── La varianza ──────────────────────────────────────────────────────────────
export const Varianza: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("varianza");
  const largo = useCueAt("varianza", 1) - at;
  const k = transicion(frame, at + largo * 0.45, fps, 1100, EXPO_IN_OUT);
  const rs = Array.from({ length: 51 }, (_, i) => i / 50);
  return (
    <Escena>
      <Cabeza at={at} titulo="La varianza|se *achica.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Formula tam={62}>
          <Entra at={at + 6}>
            Var(<V color={c.c}>Y′</V>)<Op>=</Op>Var(<V>Y</V>)<Op>·</Op>(1 − <V color={v.azafran}>ρ²</V>)
          </Entra>
        </Formula>
        <Nota at={at + 20} color={v.azafran} tam={28} style={{ marginTop: 12 }}>
          <i style={{ fontFamily: serif }}>ρ</i>: la correlación entre el antes y el durante
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 200 }}>
          <Ejes ancho={912} alto={420} x={[0, 1]} y={[0, 1]} at={at + largo * 0.4} rotuloX="ρ →" rotuloY="varianza que queda" marcasX={[{ v: 0, t: "0" }, { v: 0.5, t: "0,5" }, { v: 1, t: "1" }]}>
            {({ px, py }) => (
              <g>
                <Traza pts={rs.map((r) => [px(r), py(1 - r * r)] as [number, number])} k={k} color={c.c} ancho={5} />
                {[
                  [0.5, "75 %"],
                  [0.7, "51 %"],
                  [0.9, "19 %"],
                ].map(([r, t], i) => (
                  <g key={i} opacity={transicion(frame, at + largo * 0.7 + i * 6, fps, 400, EXPO_OUT)}>
                    <circle cx={px(r as number)} cy={py(1 - (r as number) ** 2)} r={12} fill={r === 0.7 ? v.azafran : c.c} />
                    <text x={px(r as number) - 16} y={py(1 - (r as number) ** 2) - 20} textAnchor="end" fontFamily={serif} fontSize={34} fill={r === 0.7 ? v.azafran : c.c}>
                      {t}
                    </text>
                  </g>
                ))}
              </g>
            )}
          </Ejes>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El ejemplo ───────────────────────────────────────────────────────────────
export const Ejemplo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cR = useCue("rho");
  const cS = useCue("semanas");
  const res = transicion(frame, cR + 40, fps, 500, backOut);
  const xs = Array.from({ length: 81 }, (_, i) => -4 + (i / 80) * 8);
  const s = 1.6 - 0.45 * transicion(frame, cS + 4, fps, 1100, EXPO_IN_OUT);
  return (
    <Escena>
      <Cabeza at={cR} titulo="Con ρ = 0,7,|*la mitad.*" />
      <Escenario alto={680} style={{ marginTop: 34 }}>
        <Formula tam={70}>
          <Entra at={cR + 6}>
            1<Op>−</Op>0,7²<Op>=</Op>1<Op>−</Op>0,49<Op>=</Op>
            <span style={{ color: v.azafran, fontSize: 92, display: "inline-block", transform: `scale(${res})` }}>0,51</span>
          </Entra>
        </Formula>
        <div style={{ position: "absolute", left: 0, top: 150 }}>
          <Ejes ancho={912} alto={300} x={[-4, 4]} y={[0, 0.48]} at={cS - 4}>
            {({ px, py }) => (
              <g>
                <Traza pts={xs.map((x) => [px(x), py(normal(x, -0.25, s) * 0.4)] as [number, number])} k={1} color={c.b} ancho={4} />
                <Traza pts={xs.map((x) => [px(x), py(normal(x, 0.25, s) * 0.4)] as [number, number])} k={1} color={v.azafran} ancho={4} />
              </g>
            )}
          </Ejes>
        </div>
        <div style={{ position: "absolute", left: 0, top: 480, opacity: transicion(frame, cS, fps, 500, EXPO_OUT) }}>
          <div style={{ fontSize: 30, marginBottom: 14 }}>
            la muestra necesaria es proporcional a la varianza: <span style={{ color: v.azafran }}>4 semanas → 2</span>
          </div>
          <div style={{ transform: "scale(0.6)", transformOrigin: "top left" }}>
            <Calendario at={cS + 4} dias={28} atRecorte={cS + 30} />
          </div>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── No sesga ─────────────────────────────────────────────────────────────────
export const Sesgo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("sesgo");
  const largo = useCueAt("sesgo", 1) - at;
  const k = transicion(frame, at + 20, fps, 700, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={at} titulo="¿Sesga? *No.*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 60, height: 240, paddingLeft: 80 }}>
          {[
            ["tratamiento", v.azafran],
            ["control", c.b],
          ].map(([t, col]) => (
            <div key={t} style={{ textAlign: "center" }}>
              <div style={{ width: 180, height: 180 * k, borderRadius: 12, background: col }} />
              <div style={{ fontSize: 28, marginTop: 10 }}>{t}</div>
            </div>
          ))}
          <div style={{ fontSize: 28, fontWeight: 200, color: v.niebla, paddingBottom: 60 }}>
            mismo <i style={{ fontFamily: serif }}>X̄</i> en promedio:
            <br />
            el grupo se sorteó
          </div>
        </div>
        <div style={{ marginTop: 60 }}>
          <Formula tam={58}>
            <Entra at={at + largo * 0.5}>
              <V color={c.c}>Δ′</V>
              <Op>=</Op>
              <V>Δ</V>
              <Op>−</Op>
              <V color={v.azafran}>θ</V>(
              <Media color={c.b} sub="T">
                X
              </Media>
              <Op>−</Op>
              <Media color={c.b} sub="C">
                X
              </Media>
              )
            </Entra>
          </Formula>
          <Nota at={at + largo * 0.7} color={c.c} tam={30} style={{ marginTop: 18 }}>
            el paréntesis vale cero en promedio: quitas ruido, no efecto
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Cuidados ─────────────────────────────────────────────────────────────────
export const Cuidado: React.FC = () => {
  const cA = useCue("antes");
  const cN = useCue("nuevos");
  const cE = useCue("estables");
  const items: { at: number; Icono: typeof Clock; t: string; d: string; col: string }[] = [
    { at: cA, Icono: Clock, t: "Medir antes", d: "una X medida durante el experimento puede estar afectada por el tratamiento", col: ROJO },
    { at: cN, Icono: UserPlus, t: "Usuarios nuevos", d: "sin historia: usa otra covariable o una marca de ‘nuevo’", col: c.b },
    { at: cE, Icono: BarChart3, t: "Métricas estables", d: "compras, sesiones, ingresos: lo que se repite semana a semana", col: c.c },
  ];
  return (
    <Escena>
      <Cabeza at={cA} titulo="Tres *cuidados.*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        {items.map((it, i) => (
          <Panel key={it.t} caja={{ x: 0, y: i * 180, w: 912, h: 160 }} at={it.at} color={it.col} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
            <it.Icono size={50} strokeWidth={1.5} color={it.col} />
            <div>
              <div style={{ fontSize: 36 }}>{it.t}</div>
              <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>{it.d}</div>
            </div>
          </Panel>
        ))}
      </Escenario>
    </Escena>
  );
};

// ─── CUPAC ────────────────────────────────────────────────────────────────────
export const Extension: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("cupac");
  return (
    <Escena>
      <Cabeza at={at} titulo="La versión|*moderna.*" tam={96} />
      <Escenario alto={660} style={{ marginTop: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["compras previas", "sesiones", "días activo", "categoría"].map((t, i) => (
              <div key={t} style={{ padding: "8px 16px", borderRadius: 12, border: `1.5px solid ${linea}`, background: relleno, fontSize: 24, opacity: transicion(frame, at + 6 + i * 4, fps, 300, EXPO_OUT) }}>
                {t}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 50, color: v.ceniza }}>→</div>
          <Panel caja={{ x: 330, y: 20, w: 260, h: 160 }} at={at + 26} color={c.b} estilo={{ position: "relative", left: 0, top: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <BrainCircuit size={56} strokeWidth={1.4} color={c.b} />
            <div style={{ fontSize: 26, marginTop: 6 }}>modelo de ML</div>
          </Panel>
          <div style={{ fontSize: 50, color: v.ceniza }}>→</div>
          <div style={{ fontFamily: serif, fontSize: 64, color: v.azafran, opacity: transicion(frame, at + 40, fps, 400, EXPO_OUT) }}>
            <i>X̂</i>
          </div>
        </div>
        <Nota at={at + 50} color={v.azafran} tam={30} style={{ marginTop: 50 }}>
          la predicción del modelo reemplaza a <i style={{ fontFamily: serif }}>X</i>: más correlación, menos varianza
        </Nota>
        <Sube at={at + 60} style={{ marginTop: 30 }}>
          <Chip texto="CUPAC · DoorDash · 2020" tam={24} />
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
        <Cinetico at={cCta} texto="Menos ruido,|*mismo* experimento." style={{ fontSize: 90 }} />
        <div style={{ marginTop: 30, padding: "14px 20px", borderRadius: 20, border: `1.5px solid ${linea}`, background: relleno, display: "inline-block" }}>
          <Formula tam={44}>
            <V color={c.c}>Y′</V>
            <Op>=</Op>
            <V>Y</V>
            <Op>−</Op>
            <V color={v.azafran}>θ</V>(<V color={c.b}>X</V> − <Media color={c.b}>X</Media>)
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
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 03/17 · mirar antes de tiempo
          </div>
        </Sube>
      </div>
    </Escena>
  );
};

