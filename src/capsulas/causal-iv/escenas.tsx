import React from "react";
import { Award, CalendarDays, EyeOff, Scale, User } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Entra, Foco, Formula, Frac, Op, serif, Sub, V } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Sombrero, ultimo } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { ancla, Cable, Cables, type Caja, Chip, Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

// ─── El grafo: instrumento, tratamiento, resultado y el confusor oculto ──────
type Resalte = { zt?: boolean; ty?: boolean; u?: boolean; zy?: boolean; zu?: boolean };
const Nodo: React.FC<{ caja: Caja; letra: string; nombre: string; color: string; at: number; oculto?: boolean; activo?: boolean }> = ({ caja, letra, nombre, color, at, oculto, activo }) => (
  <Panel caja={caja} at={at} color={activo ? color : undefined} discontinuo={oculto} estilo={{ display: "flex", alignItems: "center", gap: 16, borderColor: oculto ? ROJO : undefined }}>
    {oculto ? <EyeOff size={40} strokeWidth={1.6} color={ROJO} /> : <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 56, color, width: 40 }}>{letra}</span>}
    <div>
      <Rol color={oculto ? ROJO : color}>{oculto ? "no se ve" : letra === "Z" ? "instrumento" : letra === "T" ? "tratamiento" : "resultado"}</Rol>
      <div style={{ fontSize: 32 }}>{nombre}</div>
    </div>
  </Panel>
);

const Z: Caja = { x: 0, y: 330, w: 270, h: 120 };
const T: Caja = { x: 321, y: 330, w: 270, h: 120 };
const Yc: Caja = { x: 642, y: 330, w: 270, h: 120 };
const U: Caja = { x: 471, y: 80, w: 300, h: 120 };

const Grafo: React.FC<{ at: number; atU: number; zNombre?: string; r?: Resalte; mostrarZ?: boolean; tachaZY?: number; tachaZU?: number }> = ({ at, atU, zNombre = "empujón", r = {}, mostrarZ = true, tachaZY = 0, tachaZU = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      <Cables alto={500}>
        {mostrarZ ? <Cable de={ancla(Z, "r")} a={ancla(T, "l")} at={at + 10} color={r.zt ? c.c : v.ceniza} envios={r.zt ? [{ at: at + 30, ms: 700, color: c.c }] : []} /> : null}
        <Cable de={ancla(T, "r")} a={ancla(Yc, "l")} at={at + 4} color={r.ty ? v.azafran : v.ceniza} />
        {frame >= atU ? <Cable de={ancla(U, "l")} a={ancla(T, "t")} at={atU + 6} discontinuo color={ROJO} curvatura={0.3} /> : null}
        {frame >= atU ? <Cable de={ancla(U, "r")} a={ancla(Yc, "t")} at={atU + 10} discontinuo color={ROJO} curvatura={0.3} /> : null}
        {tachaZY > 0 ? <path d={`M${Z.x + 135},${Z.y + Z.h} C${Z.x + 135},${Z.y + 260} ${Yc.x + 135},${Yc.y + 260} ${Yc.x + 135},${Yc.y + Yc.h}`} fill="none" stroke={ROJO} strokeWidth={3} strokeDasharray="8 8" opacity={tachaZY} /> : null}
        {tachaZU > 0 ? <path d={`M${Z.x + 135},${Z.y} C${Z.x + 135},${U.y + 60} ${U.x - 80},${U.y + 60} ${U.x},${U.y + 60}`} fill="none" stroke={ROJO} strokeWidth={3} strokeDasharray="8 8" opacity={tachaZU} /> : null}
      </Cables>
      {mostrarZ ? <Nodo caja={Z} letra="Z" nombre={zNombre} color={c.c} at={at} activo={r.zt} /> : null}
      <Nodo caja={T} letra="T" nombre="estudios" color={v.azafran} at={at + 2} activo={r.ty || r.zt} />
      <Nodo caja={Yc} letra="Y" nombre="sueldo" color={c.b} at={at + 4} activo={r.ty} />
      {frame >= atU ? <Nodo caja={U} letra="U" nombre="motivación" color={ROJO} at={atU} oculto /> : null}
    </>
  );
};

const Tacha: React.FC<{ x: number; y: number; k: number }> = ({ x, y, k }) =>
  k > 0 ? (
    <div style={{ position: "absolute", left: x - 26, top: y - 26, width: 52, height: 52, borderRadius: 26, background: ROJO, color: v.vacio, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 600, transform: `scale(${k})` }}>✕</div>
  ) : null;

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("pregunta");
  const cM = useCue("motivacion");
  const pts = Array.from({ length: 40 }, (_, i) => {
    const x = 8 + ((i * 7) % 13) * 0.6 + ((i * 3) % 5) * 0.1;
    const y = 400 + (x - 8) * 90 + ((((i * 9301 + 49297) % 233280) / 233280) * 2 - 1) * 160;
    return [x, y];
  });
  return (
    <Escena>
      <Escenario alto={520}>
        <Ejes ancho={912} alto={360} x={[7.5, 16]} y={[200, 1500]} at={cP + 4} rotuloX="años de estudio →" rotuloY="sueldo">
          {({ px, py }) => (
            <g>
              {pts.map(([x, y], i) => (
                <circle key={i} cx={px(x)} cy={py(y)} r={8} fill={v.azafran} opacity={transicion(frame, cP + 10 + i * 0.6, fps, 300, EXPO_OUT)} />
              ))}
              <line x1={px(8)} y1={py(400)} x2={px(8 + 7.5 * transicion(frame, cP + 40, fps, 800, EXPO_IN_OUT))} y2={py(400 + 7.5 * 90 * transicion(frame, cP + 40, fps, 800, EXPO_IN_OUT))} stroke={v.hueso} strokeWidth={4} />
            </g>
          )}
        </Ejes>
        <Sube at={cM + 20} style={{ position: "absolute", left: 300, top: 380 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 18px", borderRadius: 999, border: `2px dashed ${ROJO}`, background: relleno, fontSize: 30 }}>
            <EyeOff size={32} strokeWidth={1.6} color={ROJO} /> motivación
          </div>
        </Sube>
      </Escenario>
      <div style={{ marginTop: 30 }}>
        <Cinetico at={cP + 30} texto="¿Estudiar más|sube el *sueldo?*" style={{ fontSize: 96 }} />
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
      <Cinetico at={6} texto="Variable|*instrumental.*" style={{ marginTop: 18, fontSize: 120 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── La idea: un empujón limpio ───────────────────────────────────────────────
export const Idea: React.FC = () => {
  const frame = useCurrentFrame();
  const cE = useCue("empuje");
  const cParte = useCue("parte");
  return (
    <Escena>
      <Rotulo at={cE}>La idea</Rotulo>
      <Cinetico at={cE + 4} texto="Un empujón|*limpio.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={700} style={{ marginTop: 30 }}>
        <Grafo at={cE + 6} atU={cE - 30} r={{ zt: frame >= cParte, ty: frame >= cParte + 30 }} />
        <Nota at={cParte + 10} color={c.c} style={{ position: "absolute", left: 0, top: 500 }} tam={30}>
          usas solo la parte de los estudios que movió <span style={{ fontFamily: serif, fontStyle: "italic", color: c.c }}>Z</span>: esa parte no viene de la motivación
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Tres condiciones ─────────────────────────────────────────────────────────
export const Condiciones: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cR = useCue("relevancia");
  const cE = useCue("exclusion");
  const cI = useCue("independencia");
  const fase = ultimo(frame, [cR, cE, cI]);
  const items = [
    { t: "Relevancia", d: "Z mueve de verdad a T", col: c.c },
    { t: "Exclusión", d: "Z no toca a Y por otro camino", col: c.d },
    { t: "Independencia", d: "Z no se relaciona con U", col: v.azafran },
  ];
  return (
    <Escena>
      <Rotulo at={cR}>Tres condiciones</Rotulo>
      <Cinetico at={cR + 4} texto="Un buen|*instrumento.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <div style={{ position: "absolute", left: 0, top: -60, width: 912, height: 500, transform: "scale(0.86)", transformOrigin: "top left" }}>
          <Grafo at={cR - 40} atU={cR - 40} r={{ zt: fase === 0 }} tachaZY={transicion(frame, cE + 6, fps, 500, EXPO_OUT)} tachaZU={transicion(frame, cI + 6, fps, 500, EXPO_OUT)} />
          <Tacha x={456} y={Yc.y + 225} k={transicion(frame, cE + 14, fps, 400, backOut)} />
          <Tacha x={260} y={U.y + 120} k={transicion(frame, cI + 14, fps, 400, backOut)} />
        </div>
        {items.map((it, i) => {
          const at = [cR, cE, cI][i];
          const k = transicion(frame, at, fps, 500, EXPO_OUT);
          return (
            <div key={it.t} style={{ position: "absolute", left: 0, top: 470 + i * 80, width: 912, display: "flex", alignItems: "center", gap: 18, opacity: k, transform: `translateX(${(1 - k) * 30}px)` }}>
              <span style={{ fontFamily: mono, fontSize: 28, color: it.col, width: 30 }}>{i + 1}</span>
              <span style={{ fontSize: 34, color: fase === i ? it.col : v.hueso, width: 250 }}>{it.t}</span>
              <span style={{ fontSize: 28, fontWeight: 200, color: v.niebla }}>{it.d}</span>
            </div>
          );
        })}
      </Escenario>
    </Escena>
  );
};

// ─── El ejemplo clásico ───────────────────────────────────────────────────────
export const Ejemplo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cT = useCue("trimestre");
  const cL = useCue("leyes");
  const barras = [12.5, 12.62, 12.7, 12.74];
  return (
    <Escena>
      <Rotulo at={cT}>Angrist y Krueger, 1991</Rotulo>
      <Cinetico at={cT + 4} texto="El trimestre|de *nacimiento.*" style={{ marginTop: 18, fontSize: 88 }} />
      <Escenario alto={720} style={{ marginTop: 30 }}>
        <div style={{ position: "absolute", left: 0, top: 0, display: "flex", gap: 16 }}>
          {["T1", "T2", "T3", "T4"].map((t, i) => (
            <Panel key={t} caja={{ x: i * 232, y: 0, w: 212, h: 110 }} at={cT + 10 + i * 4} estilo={{ display: "flex", alignItems: "center", gap: 12 }}>
              <CalendarDays size={36} strokeWidth={1.6} color={c.c} />
              <span style={{ fontSize: 36 }}>{t}</span>
            </Panel>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: 150, display: "flex", alignItems: "flex-end", gap: 20, height: 220 }}>
          {barras.map((b, i) => {
            const k = transicion(frame, cL + 10 + i * 5, fps, 600, EXPO_OUT);
            return (
              <div key={i} style={{ width: 212, textAlign: "center" }}>
                <div style={{ height: (b - 12.2) * 300 * k, background: i === 0 ? c.b : v.azafran, borderRadius: 10 }} />
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 0, top: 390, fontSize: 24, fontWeight: 200, color: v.ceniza, opacity: transicion(frame, cL + 30, fps, 400, EXPO_OUT) }}>años de estudio promedio por trimestre · esquemático</div>
        <Panel caja={{ x: 0, y: 450, w: 912, h: 200 }} at={cL + 4} estilo={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Scale size={60} strokeWidth={1.4} color={v.azafran} />
          <div style={{ fontSize: 30, fontWeight: 200, lineHeight: 1.4 }}>
            la ley obliga a estudiar hasta cierta <b style={{ fontWeight: 400 }}>edad</b>, pero se entra al colegio por <b style={{ fontWeight: 400 }}>año</b>: según tu trimestre, al cumplir esa edad llevabas un poco más o menos de estudios
          </div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── La división de Wald ──────────────────────────────────────────────────────
export const Wald: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cA = useCue("arriba");
  const cB = useCue("abajo");
  const cC = useCue("cuenta");
  const fase = ultimo(frame, [cA, cB, cC]);
  const activas = [[], ["num"], ["den"], ["res"]][fase + 1];
  const res = transicion(frame, cC + 40, fps, 500, backOut);
  const dif = (q: string, col: string) => (
    <>
      E[<V color={col}>{q}</V> | <V color={c.c}>Z</V>=1]
      <Op>−</Op>
      E[<V color={col}>{q}</V> | <V color={c.c}>Z</V>=0]
    </>
  );
  return (
    <Escena>
      <Rotulo at={cA}>La cuenta</Rotulo>
      <Cinetico at={cA + 4} texto="Una *división.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={720} style={{ marginTop: 40 }}>
        <Foco activas={activas}>
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <Formula tam={46}>
              <Entra at={cA + 4}>
                <V id="res" color={v.azafran}>
                  β
                </V>
                <Sub>IV</Sub>
                <Op>=</Op>
                <Frac
                  arriba={
                    <V id="num" color={c.b} italica={false}>
                      {dif("Y", c.b)}
                    </V>
                  }
                  abajo={
                    <V id="den" color={v.azafran} italica={false}>
                      {dif("T", v.azafran)}
                    </V>
                  }
                />
              </Entra>
            </Formula>
          </div>
        </Foco>
        <div style={{ position: "absolute", left: 0, right: 0, top: 200, display: "flex", flexDirection: "column", gap: 14 }}>
          <Nota at={cA + 14} color={c.b} tam={30}>
            arriba: cuánto cambia el sueldo cuando cambia <span style={{ fontFamily: serif, fontStyle: "italic", color: c.c }}>Z</span>
          </Nota>
          <Nota at={cB + 4} color={v.azafran} tam={30}>
            abajo: cuánto cambian los estudios cuando cambia <span style={{ fontFamily: serif, fontStyle: "italic", color: c.c }}>Z</span>
          </Nota>
        </div>
        {frame >= cC ? (
          <div style={{ position: "absolute", left: 0, top: 380 }}>
            <Formula tam={72}>
              <Entra at={cC + 4}>
                <V color={v.azafran}>β</V>
                <Sub>IV</Sub>
                <Op>=</Op>
                <Frac arriba={<span style={{ color: c.b }}>1 %</span>} abajo={<span style={{ color: v.azafran }}>0,1 años</span>} />
                <Op>=</Op>
                <span style={{ color: c.c, fontSize: 92, display: "inline-block", transform: `scale(${res})` }}>10 %</span>
              </Entra>
            </Formula>
            <div style={{ fontSize: 28, fontWeight: 200, color: v.niebla, marginTop: 14, opacity: res }}>más sueldo por cada año de estudio · números ilustrativos</div>
          </div>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── Dos etapas ───────────────────────────────────────────────────────────────
export const Etapas: React.FC = () => {
  const frame = useCurrentFrame();
  const cP = useCue("primera");
  const cS = useCue("segunda");
  const E1: Caja = { x: 0, y: 0, w: 912, h: 220 };
  const E2: Caja = { x: 0, y: 300, w: 912, h: 220 };
  return (
    <Escena>
      <Rotulo at={cP}>En la práctica</Rotulo>
      <Cinetico at={cP + 4} texto="Mínimos cuadrados|en *dos etapas.*" style={{ marginTop: 18, fontSize: 80 }} />
      <Escenario alto={720} style={{ marginTop: 40 }}>
        <Cables alto={720}>
          <Cable de={ancla(E1, "b")} a={ancla(E2, "t")} at={cS} ms={500} color={v.azafran} etiqueta="T̂" envios={[{ at: cS + 10, ms: 600 }]} />
        </Cables>
        <Panel caja={E1} at={cP + 6} color={frame < cS ? c.c : undefined}>
          <Rol color={c.c}>Etapa 1 · predecir los estudios</Rol>
          <div style={{ marginTop: 16 }}>
            <Formula tam={62}>
              <Sombrero color={v.azafran}>T</Sombrero>
              <Op>=</Op>
              <V color={v.ceniza}>π</V>
              <Sub>0</Sub>
              <Op>+</Op>
              <V color={c.c}>π</V>
              <Sub>1</Sub>
              <V color={c.c}>Z</V>
            </Formula>
          </div>
          <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 6 }}>solo la parte de los estudios que explica el instrumento</div>
        </Panel>
        <Panel caja={E2} at={cS + 6} color={frame >= cS ? v.azafran : undefined}>
          <Rol color={v.azafran}>Etapa 2 · explicar el sueldo</Rol>
          <div style={{ marginTop: 16 }}>
            <Formula tam={62}>
              <V color={c.b}>Y</V>
              <Op>=</Op>
              <V color={v.ceniza}>β</V>
              <Sub>0</Sub>
              <Op>+</Op>
              <V color={v.azafran}>β</V>
              <Sub>1</Sub>
              <Sombrero color={v.azafran}>T</Sombrero>
              <Op>+</Op>
              <V>ε</V>
            </Formula>
          </div>
          <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 6 }}>
            <span style={{ fontFamily: serif, fontStyle: "italic", color: v.azafran }}>β₁</span> es el efecto de un año más de estudio
          </div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── Instrumento débil ────────────────────────────────────────────────────────
export const Debil: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cD = useCue("debil");
  const cRegla = useCueAt("debil", 0.62);
  const fila = (y: number, nombre: string, F: number, ancho: number, col: string, at: number) => {
    const k = transicion(frame, at, fps, 800, EXPO_IN_OUT);
    return (
      <Panel caja={{ x: 0, y, w: 912, h: 200 }} at={at - 6}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <span style={{ fontSize: 34 }}>{nombre}</span>
          <span style={{ fontFamily: serif, fontSize: 40, color: col }}>
            <i>F</i> = {F}
          </span>
        </div>
        <svg width={872} height={90} style={{ marginTop: 10 }}>
          <line x1={436} y1={6} x2={436} y2={84} stroke={v.ceniza} strokeWidth={2} strokeDasharray="5 6" />
          <line x1={436 - ancho * k} y1={45} x2={436 + ancho * k} y2={45} stroke={col} strokeWidth={8} strokeLinecap="round" />
          <circle cx={436} cy={45} r={12} fill={col} />
          <text x={872} y={20} textAnchor="end" fontFamily={mono} fontSize={22} fill={v.niebla} opacity={k}>
            intervalo de confianza
          </text>
        </svg>
      </Panel>
    );
  };
  return (
    <Escena>
      <Rotulo at={cD}>Cuidado</Rotulo>
      <Cinetico at={cD + 4} texto="El instrumento|*débil.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={700} style={{ marginTop: 40 }}>
        {fila(0, "fuerte", 48, 80, c.c, cD + 12)}
        {fila(230, "débil", 3, 400, ROJO, cD + 40)}
        {frame >= cRegla ? (
          <div style={{ position: "absolute", left: 0, top: 480 }}>
            <Formula tam={84}>
              <Entra at={cRegla}>
                <V color={v.hueso}>F</V>
                <Op>&gt;</Op>
                <span style={{ color: v.azafran }}>10</span>
              </Entra>
            </Formula>
            <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla, marginTop: 8 }}>estadístico de la primera etapa · regla clásica</div>
          </div>
        ) : null}
      </Escenario>
    </Escena>
  );
};

// ─── El efecto local (LATE) ───────────────────────────────────────────────────
export const Late: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cL = useCue("local");
  const cN = useCueAt("local", 0.62);
  const tipos = [
    { t: "siempre estudian", n: 6, col: v.ceniza },
    { t: "cambian por Z", n: 6, col: c.c },
    { t: "nunca estudian más", n: 6, col: v.ceniza },
  ];
  const foco = transicion(frame, cL + 30, fps, 600, EXPO_OUT);
  return (
    <Escena>
      <Rotulo at={cL}>Un detalle fino</Rotulo>
      <Cinetico at={cL + 4} texto="Un efecto|*local.*" style={{ marginTop: 18, fontSize: 96 }} />
      <Escenario alto={700} style={{ marginTop: 40 }}>
        {tipos.map((g, i) => (
          <Panel key={g.t} caja={{ x: 0, y: i * 140, w: 912, h: 120 }} at={cL + 8 + i * 5} color={i === 1 ? c.c : undefined} estilo={{ display: "flex", alignItems: "center", gap: 18, opacity: i === 1 ? 1 : 1 - foco * 0.6 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {Array.from({ length: g.n }, (_, j) => (
                <User key={j} size={40} strokeWidth={1.6} color={g.col} />
              ))}
            </div>
            <span style={{ fontSize: 32, color: i === 1 ? c.c : v.hueso }}>{g.t}</span>
          </Panel>
        ))}
        <Nota at={cL + 40} color={c.c} style={{ position: "absolute", left: 0, top: 440 }} tam={30}>
          el efecto se mide en quienes el instrumento hizo cambiar (LATE)
        </Nota>
        <Panel caja={{ x: 0, y: 540, w: 912, h: 130 }} at={cN} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Award size={56} strokeWidth={1.5} color={v.azafran} />
          <div>
            <div style={{ fontSize: 32 }}>Nobel de Economía 2021</div>
            <div style={{ fontSize: 26, fontWeight: 200, color: v.niebla }}>Angrist e Imbens: análisis de relaciones causales</div>
          </div>
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
        <Cinetico at={cCta} texto="Un empujón,|una *división.*" style={{ fontSize: 96 }} />
        <div style={{ marginTop: 30, padding: "14px 20px", borderRadius: 20, border: `1.5px solid ${linea}`, background: relleno, display: "inline-block" }}>
          <Formula tam={44}>
            <V color={v.azafran}>β</V>
            <Sub>IV</Sub>
            <Op>=</Op>
            <Frac arriba={<span style={{ color: c.b }}>efecto de Z en Y</span>} abajo={<span style={{ color: v.azafran }}>efecto de Z en T</span>} />
          </Formula>
        </div>
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 30} style={{ marginTop: 20 }}>
          <Chip texto="Angrist y Krueger (1991), Quarterly Journal of Economics" tam={20} />
        </Sube>
      </div>
    </Escena>
  );
};
