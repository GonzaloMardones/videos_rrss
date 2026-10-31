import React from "react";
import { Bot, Check, FlaskConical, MessageSquareText, RotateCcw, Users } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Frac, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Sombrero, Traza } from "../../estilos/vacio/causal";
import { type P } from "../../estilos/vacio/grafo";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "Cuasi-experimentos · 01";

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

// ─── Gancho: terapia hormonal, observacional vs aleatorizado ─────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cO = useCue("obs");
  const cR = useCue("rct");
  const largo = useCueAt("rct", 1) - cR;
  const r1 = transicion(frame, cO + 20, fps, 500, backOut);
  const r2 = transicion(frame, cR + 20, fps, 500, backOut);
  const tarjeta = (anio: string, tipoE: string, cifra: string, detalle: string, fuente: string, col: string, a: number, r: number, y: number) => (
    <Panel caja={{ x: 0, y, w: 912, h: 220 }} at={a} color={col} estilo={{ display: "flex", alignItems: "center", gap: 30 }}>
      <div style={{ width: 380 }}>
        <div style={{ fontFamily: mono, fontSize: 26, color: v.niebla }}>{anio}</div>
        <div style={{ fontSize: 34, marginTop: 6 }}>{tipoE}</div>
        <div style={{ fontSize: 22, fontWeight: 200, color: v.niebla, marginTop: 8 }}>{fuente}</div>
      </div>
      <div>
        <div style={{ fontFamily: serif, fontSize: 104, color: col, display: "inline-block", transform: `scale(${r})`, transformOrigin: "left" }}>{cifra}</div>
        <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla }}>{detalle}</div>
      </div>
    </Panel>
  );
  return (
    <Escena>
      <Escenario alto={560}>
        <div style={{ fontSize: 30, color: v.niebla, opacity: transicion(frame, cO, fps, 400, EXPO_OUT) }}>terapia hormonal (estrógeno + progestina) y riesgo coronario</div>
        {tarjeta("1996", "estudio observacional", "−61 %", "riesgo relativo 0,39", "Grodstein et al., NEJM · enfermeras", c.c, cO + 6, r1, 60)}
        {tarjeta("2002", "experimento aleatorizado", "+29 %", "hazard ratio 1,29", "Women's Health Initiative, JAMA", ROJO, cR + 4, r2, 310)}
      </Escenario>
      <div style={{ marginTop: 20 }}>
        <Cinetico at={cR + largo * 0.8} texto="¿A cuál le *crees?*" style={{ fontSize: 96 }} />
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
      <Cinetico at={6} texto="La pirámide de|*la evidencia.*" style={{ marginTop: 18, fontSize: 116 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>serie Cuasi-experimentos · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── La pirámide ──────────────────────────────────────────────────────────────
const NIVELES: [string, string, string][] = [
  ["opinión de expertos · casos", "la anécdota · «al jefe le parece»", v.ceniza],
  ["caso-control", "el dashboard", v.niebla],
  ["cohortes", "cohortes de usuarios", v.niebla],
  ["cuasi-experimentos", "despliegue por región", v.azafran],
  ["aleatorizados", "prueba A/B", c.c],
  ["revisiones|sistemáticas", "meta-análisis|de pruebas", c.b],
];

export const Piramide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cB = useCue("base");
  const cC = useCue("cima");
  const cT = useCue("tech");
  const largoB = useCueAt("base", 1) - cB;
  const largoC = useCueAt("cima", 1) - cC;
  const kT = transicion(frame, cT + 6, fps, 600, EXPO_IN_OUT);
  const H = 96;
  const ancho = (i: number) => 912 - i * ((912 - 150) / 6);
  const aparece = (i: number) => (i < 3 ? cB + largoB * (0.15 + i * 0.25) : cC + largoC * (0.05 + (i - 3) * 0.3));
  return (
    <Escena>
      <Cabeza at={cB} titulo="Más arriba,|*menos sesgo.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <svg width={912} height={6 * H + 20} style={{ position: "absolute", left: 0, top: 30, overflow: "visible" }}>
          {NIVELES.map(([med, tec, col], i) => {
            const k = transicion(frame, aparece(i), fps, 500, EXPO_OUT);
            const y = (5 - i) * H;
            const a0 = ancho(i);
            const a1 = ancho(i + 1);
            const x0 = (912 - a0) / 2;
            const x1 = (912 - a1) / 2;
            const pts = `${x0},${y + H - 6} ${x0 + a0},${y + H - 6} ${x1 + a1},${y} ${x1},${y}`;
            const texto = (t: string, op: number) =>
              t.split("|").map((linea, j, arr) => (
                <text key={linea} x={456} y={y + H / 2 + 9 + (j - (arr.length - 1) / 2) * 26} textAnchor="middle" fontSize={arr.length > 1 ? 22 : 27} fill={v.hueso} opacity={op}>
                  {linea}
                </text>
              ));
            return (
              <g key={i} opacity={k} transform={`translate(0,${(1 - k) * 20})`}>
                <polygon points={pts} fill={relleno} stroke={col} strokeWidth={3} />
                {texto(med, 1 - kT)}
                {texto(tec, kT)}
              </g>
            );
          })}
        </svg>
        <div style={{ position: "absolute", left: 0, top: 640, display: "flex", justifyContent: "space-between", width: 912, fontSize: 24, fontWeight: 200, color: v.niebla, opacity: transicion(frame, cC + largoC * 0.9, fps, 400, EXPO_OUT) }}>
          <span>↑ menos espacio para el sesgo</span>
          <span>Sackett et al. (1996), BMJ</span>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── El error cuadrático medio: sesgo² + varianza/n ────────────────────────────────────────────
export const Ecm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("mse");
  const cO = useCue("orden");
  const fS = useCueAt("mse", 0.62);
  const fV = useCueAt("mse", 0.85);
  const largoO = useCueAt("orden", 1) - cO;
  const activas = frame >= cO + largoO * 0.4 ? ["s"] : frame >= cO ? ["v"] : frame >= fV ? ["v"] : frame >= fS ? ["s"] : [];
  const k = transicion(frame, cO, fps, 1400, EXPO_IN_OUT);
  const ls = Array.from({ length: 81 }, (_, i) => 1 + (i / 80) * 4);
  const B2 = 0.01;
  return (
    <Escena>
      <Cabeza at={cM} titulo="El error tiene|*dos partes.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <Foco activas={activas}>
          <Formula tam={60}>
            <Entra at={cM + 6}>
              ECM<Op>=</Op>
              <V id="s" color={ROJO} italica={false}>
                sesgo²
              </V>
              <Op>+</Op>
              <Frac
                arriba={
                  <V id="v" color={v.azafran}>
                    σ²
                  </V>
                }
                abajo={
                  <V id="v" color={v.azafran}>
                    n
                  </V>
                }
              />
            </Entra>
          </Formula>
        </Foco>
        <div style={{ position: "absolute", left: 0, top: 150 }}>
          <Ejes ancho={912} alto={420} x={[1, 5]} y={[0, 0.11]} at={cO} rotuloX="datos (n) →" rotuloY="error" marcasX={[1, 2, 3, 4, 5].map((e) => ({ v: e, t: `10${["", "²", "³", "⁴", "⁵"][e - 1]}` }))}>
            {({ px, py }) => (
              <g>
                <Traza pts={ls.map((l) => [px(l), py(Math.min(0.11, Math.pow(10, -l)))] as P)} k={k} color={v.azafran} ancho={4} discontinuo />
                <Traza pts={ls.map((l) => [px(l), py(Math.min(0.11, B2 + Math.pow(10, -l)))] as P)} k={k} color={c.c} ancho={5} />
                <line x1={px(1)} y1={py(B2)} x2={px(5)} y2={py(B2)} stroke={ROJO} strokeWidth={3} strokeDasharray="10 8" opacity={k} />
                <text x={px(3.3)} y={py(B2) - 14} fontFamily={mono} fontSize={24} fill={ROJO} opacity={k}>
                  sesgo²: no baja
                </text>
                <text x={px(1.25)} y={py(0.095)} fontFamily={mono} fontSize={24} fill={c.c} opacity={k}>
                  error total
                </text>
              </g>
            )}
          </Ejes>
        </div>
        <div style={{ position: "absolute", left: 0, top: 600, display: "flex", gap: 16, width: 912 }}>
          {[
            ["varianza", "O(1/n)", v.azafran, cO + largoO * 0.1],
            ["sesgo", "O(1)", ROJO, cO + largoO * 0.4],
          ].map(([t, o, col, a]) => (
            <Panel key={t as string} caja={{ x: 0, y: 0, w: 448, h: 110 }} at={a as number} color={col as string} estilo={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 30 }}>{t as string}</span>
              <span style={{ fontFamily: serif, fontSize: 52, color: col as string }}>{o as string}</span>
            </Panel>
          ))}
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Meng: 2,3 millones ≈ 400 ─────────────────────────────────────────────────
export const Meng: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cM = useCue("meng");
  const c4 = useCue("cuatrocientos");
  const largo = useCueAt("cuatrocientos", 1) - c4;
  const kG = transicion(frame, cM + 10, fps, 1200, EXPO_OUT);
  const kP = transicion(frame, c4 + largo * 0.55, fps, 900, EXPO_OUT);
  const res = transicion(frame, c4 + largo * 0.55, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cM} titulo="Big data,|*poca muestra.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
          <div style={{ width: 430 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(46, 1fr)", gap: 2 }}>
              {Array.from({ length: 46 * 28 }, (_, i) => (
                <div key={i} style={{ height: 7, borderRadius: 2, background: v.niebla, opacity: i / 1288 < kG ? 0.55 : 0 }} />
              ))}
            </div>
            <div style={{ fontFamily: serif, fontSize: 52, marginTop: 14 }}>2.300.000</div>
            <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla }}>respuestas voluntarias</div>
          </div>
          <div style={{ fontFamily: serif, fontSize: 80, color: v.azafran, opacity: kP }}>≈</div>
          <div style={{ width: 360, opacity: kP }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(20, 1fr)", gap: 4, width: 200 }}>
              {Array.from({ length: 400 }, (_, i) => (
                <div key={i} style={{ height: 6, borderRadius: 3, background: c.c, opacity: i / 400 < kP ? 0.9 : 0 }} />
              ))}
            </div>
            <div style={{ fontFamily: serif, fontSize: 52, marginTop: 14, color: c.c, display: "inline-block", transform: `scale(${res})`, transformOrigin: "left" }}>≈ 400</div>
            <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla }}>personas al azar</div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, top: 440 }}>
          <Formula tam={52}>
            <Entra at={c4 + 6}>
              n<Sub>ef</Sub>
              <Op>≈</Op>
              <Frac arriba="f" abajo="1 − f" />
              <Op>·</Op>
              <Frac arriba="1" abajo={<V color={ROJO}>ρ²</V>} />
            </Entra>
          </Formula>
          <Nota at={c4 + largo * 0.3} color={v.niebla} tam={26} style={{ marginTop: 12 }}>
            f = 1 % de los votantes · ρ = 0,005 → 0,0101 × 40.000 ≈ 400
          </Nota>
          <Nota at={c4 + largo * 0.4} color={ROJO} tam={26} style={{ marginTop: 6 }}>
            ρ: correlación entre responder y lo que respondes
          </Nota>
          <Nota at={c4 + largo * 0.7} color={v.niebla} tam={22} style={{ marginTop: 16 }}>
            Meng (2018), Annals of Applied Statistics 12(2)
          </Nota>
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── La mirada bayesiana ──────────────────────────────────────────────────────
const normal = (x: number, m: number, s: number) => Math.exp(-0.5 * ((x - m) / s) ** 2);

export const Bayes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("prior");
  const cT = useCue("tau");
  const cH = useCue("techo");
  const largoP = useCueAt("prior", 1) - cP;
  const kFase = transicion(frame, cT, fps, 600, EXPO_IN_OUT);
  const kA = transicion(frame, cP + 10, fps, 700, EXPO_OUT);
  const kB = transicion(frame, cP + largoP * 0.4, fps, 700, EXPO_OUT);
  const kC = transicion(frame, cP + largoP * 0.7, fps, 900, EXPO_IN_OUT);
  const kW = transicion(frame, cT + 30, fps, 1300, EXPO_IN_OUT);
  const xs = Array.from({ length: 121 }, (_, i) => -3 + (i / 120) * 6);
  // A: impreciso (m = −1, s = 1); B: preciso (m = 0,6, s = 0,5) → posterior por precisión.
  const wA = 1;
  const wB = 4;
  const mC = (wA * -1 + wB * 0.6) / (wA + wB);
  const sC = Math.sqrt(1 / (wA + wB));
  const ls = Array.from({ length: 81 }, (_, i) => 1 + (i / 80) * 5);
  return (
    <Escena>
      <Cabeza at={cP} titulo="Cuánto le|*creo a cada estudio.*" tam={80} />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <Formula tam={54}>
          <Entra at={cP + 6}>
            <Sombrero color={v.hueso}>θ</Sombrero>
            <Op>=</Op>
            <Frac
              arriba={
                <>
                  Σ <V color={v.azafran}>w</V>
                  <Sub>i</Sub> θ<Sub>i</Sub>
                </>
              }
              abajo={
                <>
                  Σ <V color={v.azafran}>w</V>
                  <Sub>i</Sub>
                </>
              }
            />
            <span style={{ marginLeft: 40 }} />
            <V color={v.azafran}>w</V>
            <Sub>i</Sub>
            <Op>=</Op>
            <Frac
              arriba="1"
              abajo={
                <>
                  σ<Sub>i</Sub>²/n<Sub>i</Sub>
                  <span style={{ opacity: kFase }}>
                    {" "}
                    + <V color={ROJO}>τ</V>
                    <Sub>i</Sub>²
                  </span>
                </>
              }
            />
          </Entra>
        </Formula>
        <div style={{ position: "absolute", left: 0, top: 170, opacity: 1 - kFase }}>
          <Ejes ancho={912} alto={360} x={[-3, 3]} y={[0, 1.15]} at={cP + 6} rotuloX="efecto →">
            {({ px, py }) => (
              <g>
                <Traza pts={xs.map((x) => [px(x), py(normal(x, -1, 1) * 0.45)] as P)} k={kA} color={v.niebla} ancho={4} />
                <Traza pts={xs.map((x) => [px(x), py(normal(x, 0.6, 0.5) * 0.75)] as P)} k={kB} color={c.b} ancho={4} />
                <Traza pts={xs.map((x) => [px(x), py(normal(x, mC, sC))] as P)} k={kC} color={v.azafran} ancho={6} />
                <text x={px(-2.6)} y={py(0.5)} fontFamily={mono} fontSize={22} fill={v.niebla} opacity={kA}>
                  estudio impreciso
                </text>
                <text x={px(1.2)} y={py(0.8)} fontFamily={mono} fontSize={22} fill={c.b} opacity={kB}>
                  estudio preciso
                </text>
                <text x={px(0.55)} y={py(1.08)} fontFamily={mono} fontSize={22} fill={v.azafran} opacity={kC}>
                  creencia combinada
                </text>
              </g>
            )}
          </Ejes>
        </div>
        <div style={{ position: "absolute", left: 0, top: 170, opacity: kFase }}>
          <Ejes ancho={912} alto={400} x={[1, 6]} y={[0, 220]} at={cT} rotuloX="datos del estudio (n) →" rotuloY="peso" marcasX={[1, 2, 3, 4, 5, 6].map((e) => ({ v: e, t: `10${["", "²", "³", "⁴", "⁵", "⁶"][e - 1]}` }))}>
            {({ px, py }) => (
              <g>
                <Traza pts={ls.filter((l) => Math.pow(10, l) <= 220).map((l) => [px(l), py(Math.pow(10, l))] as P)} k={kW} color={c.c} ancho={5} />
                <Traza pts={ls.map((l) => [px(l), py(1 / (Math.pow(10, -l) + 0.01))] as P)} k={kW} color={ROJO} ancho={5} />
                <line x1={px(1)} y1={py(100)} x2={px(6)} y2={py(100)} stroke={ROJO} strokeWidth={2} strokeDasharray="8 8" opacity={kW} />
                <text x={px(4.2)} y={py(100) - 14} fontFamily={mono} fontSize={24} fill={ROJO} opacity={kW}>
                  techo: 1/τ² = 100
                </text>
                <text x={px(2.05)} y={py(205)} fontFamily={mono} fontSize={24} fill={c.c} opacity={kW}>
                  sin sesgo (τ = 0)
                </text>
              </g>
            )}
          </Ejes>
        </div>
        <Panel caja={{ x: 0, y: 610, w: 912, h: 130 }} at={cH + 4} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ fontFamily: serif, fontSize: 52, color: ROJO, whiteSpace: "nowrap" }}>n → ∞</div>
          <div style={{ fontSize: 28 }}>con τ = 0,1 y σ = 1, un observacional infinito pesa lo mismo que un experimento de 100 personas</div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── GRADE: la pirámide no es una ley ─────────────────────────────────────────
export const Grade: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cB = useCue("baja");
  const cS = useCue("sube");
  const largoB = useCueAt("baja", 1) - cB;
  const largoS = useCueAt("sube", 1) - cS;
  const t = (a: number) => transicion(frame, a, fps, 400, EXPO_OUT);
  const baja = ["riesgo de sesgo", "inconsistencia", "imprecisión", "evidencia indirecta", "sesgo de publicación"];
  const sube = ["efecto muy grande", "dosis-respuesta", "confusión que iría en contra"];
  return (
    <Escena>
      <Cabeza at={cB} titulo="La pirámide|*no es una ley.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", gap: 16, width: 912 }}>
          <div style={{ flex: 1, borderRadius: 20, border: `2px solid ${ROJO}`, background: relleno, padding: "16px 20px", opacity: t(cB + 4) }}>
            <Rol color={ROJO}>baja la confianza ↓</Rol>
            {baja.map((b, i) => (
              <div key={b} style={{ fontSize: 28, marginTop: 14, opacity: t(cB + largoB * (0.3 + i * 0.12)) }}>
                {b}
              </div>
            ))}
          </div>
          <div style={{ flex: 1, borderRadius: 20, border: `2px solid ${c.c}`, background: relleno, padding: "16px 20px", opacity: t(cS) }}>
            <Rol color={c.c}>sube la confianza ↑</Rol>
            {sube.map((s, i) => (
              <div key={s} style={{ fontSize: 28, marginTop: 14, opacity: t(cS + largoS * (0.1 + i * 0.15)) }}>
                {s}
              </div>
            ))}
          </div>
        </div>
        <Panel caja={{ x: 0, y: 420, w: 912, h: 120 }} at={cS + largoS * 0.6} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <FlaskConical size={48} strokeWidth={1.5} color={v.azafran} />
          <div style={{ fontSize: 30 }}>un buen cuasi-experimento puede valer más que un mal experimento</div>
        </Panel>
        <Nota at={cS + largoS * 0.8} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 570 }}>
          Guyatt et al. (2008), BMJ · Murad et al. (2016), BMJ Evidence-Based Medicine
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Kohavi: la intuición falla ───────────────────────────────────────────────
export const Kohavi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("tercio");
  const largo = useCueAt("tercio", 1) - at;
  const k = transicion(frame, at + largo * 0.45, fps, 1100, EXPO_IN_OUT);
  const partes: [string, string, number][] = [
    ["mejora", c.c, 1],
    ["no cambia", v.ceniza, 1],
    ["empeora", ROJO, 1],
  ];
  return (
    <Escena>
      <Cabeza at={at} titulo="La intuición|*falla.*" />
      <Escenario alto={600} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32, opacity: transicion(frame, at + 6, fps, 400, EXPO_OUT) }}>
          <Users size={44} strokeWidth={1.5} color={v.niebla} /> ideas probadas con experimentos en Microsoft
        </div>
        <div style={{ display: "flex", width: 912, height: 120, marginTop: 30, borderRadius: 16, overflow: "hidden" }}>
          {partes.map(([t, col], i) => (
            <div key={t} style={{ width: `${33.33 * Math.min(1, Math.max(0, k * 3 - i))}%`, background: col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: v.vacio, fontWeight: 600 }}>
              ≈ ⅓ {t}
            </div>
          ))}
        </div>
        <Nota at={at + largo * 0.8} color={v.niebla} tam={22} style={{ marginTop: 24 }}>
          Kohavi, Crook y Longbotham (2009), «Online Experimentation at Microsoft» · Kohavi, Tang y Xu (2020)
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── IA en producción: cuánta evidencia pedir ─────────────────────────────────
export const Ia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cC = useCue("costo");
  const cR = useCue("revertir");
  const largo = useCueAt("revertir", 1) - cR;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const pasos: [typeof Bot, string, string, string, number][] = [
    [RotateCcw, "cambio de prompt", "reversible en un minuto → cuasi-experimento", v.azafran, cR + largo * 0.05],
    [Bot, "agente nuevo en una región", "costo medio → cuasi robusto o A/B", c.b, cR + largo * 0.35],
    [MessageSquareText, "reemplazar un proceso humano", "difícil de revertir → aleatorizado", c.c, cR + largo * 0.65],
  ];
  return (
    <Escena>
      <Cabeza at={cC} titulo="¿Cuánta evidencia|*para producción?*" tam={80} />
      <Escenario alto={700} style={{ marginTop: 34 }}>
        <div style={{ fontSize: 28, color: v.niebla, opacity: t(cC + 10) }}>la evidencia exigida sube con el costo de equivocarse</div>
        {pasos.map(([I, tt, d, col, a], i) => (
          <Panel key={tt} caja={{ x: i * 90, y: 80 + i * 170, w: 912 - 180, h: 140 }} at={a} color={col} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
            <I size={48} strokeWidth={1.5} color={col} />
            <div>
              <div style={{ fontSize: 32 }}>{tt}</div>
              <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 4 }}>{d}</div>
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
        <Cinetico at={cCta} texto="No cuántos datos.|*De qué nivel.*" style={{ fontSize: 90 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próximo: 02 · qué es un cuasi-experimento
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
