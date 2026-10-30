import React from "react";
import { Check, Eye, User } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Formula, Op, serif, V } from "../../estilos/vacio/mate";
import { c, Panel, ROJO, Rol } from "../../estilos/vacio/causal";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, linea, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "El mapa de la experimentación · 08/17";

// La población "vista por dios": ocho personas con sus dos resultados potenciales.
type Persona = { g: "joven" | "mayor"; t: 0 | 1; y0: number; y1: number; cumple: boolean };
const P: Persona[] = [
  { g: "joven", t: 1, y0: 10, y1: 18, cumple: false },
  { g: "joven", t: 1, y0: 12, y1: 19, cumple: true },
  { g: "joven", t: 0, y0: 11, y1: 17, cumple: false },
  { g: "mayor", t: 1, y0: 14, y1: 16, cumple: true },
  { g: "mayor", t: 0, y0: 15, y1: 16, cumple: true },
  { g: "mayor", t: 0, y0: 13, y1: 13, cumple: false },
  { g: "joven", t: 0, y0: 9, y1: 14, cumple: true },
  { g: "mayor", t: 1, y0: 16, y1: 19, cumple: false },
];

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 84 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

const Tabla: React.FC<{
  at: number;
  y?: boolean;
  tau?: boolean;
  activa?: (p: Persona) => boolean;
  color?: string;
  observado?: boolean;
  cumplidores?: boolean;
}> = ({ at, y = true, tau = true, activa, color = v.azafran, observado = false, cumplidores = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cols = "80px 140px 160px 140px 140px 1fr";
  return (
    <div style={{ width: 912 }}>
      <div style={{ display: "grid", gridTemplateColumns: cols, fontSize: 20, fontWeight: 600, letterSpacing: "0.08em", color: v.ceniza, paddingBottom: 8, borderBottom: `1.5px solid ${linea}` }}>
        <span />
        <span>GRUPO</span>
        <span>TRATADO</span>
        <span style={{ color: c.b }}>Y(0)</span>
        <span style={{ color: v.azafran }}>Y(1)</span>
        <span style={{ color: c.c }}>EFECTO</span>
      </div>
      {P.map((p, i) => {
        const on = activa ? activa(p) : true;
        const k = transicion(frame, at + i * 2, fps, 300, EXPO_OUT);
        const ocultaY0 = observado && p.t === 1;
        const ocultaY1 = observado && p.t === 0;
        return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: cols, alignItems: "center", height: 58, borderBottom: `1px solid ${linea}`, background: activa && on ? `${color}1c` : "transparent", opacity: k * (on ? 1 : 0.3) }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <User size={34} strokeWidth={1.6} color={p.g === "joven" ? c.c : c.d} />
              {cumplidores && p.cumple ? <Eye size={20} strokeWidth={2} color={v.azafran} /> : null}
            </span>
            <span style={{ fontSize: 26, color: p.g === "joven" ? c.c : c.d }}>{p.g}</span>
            <span style={{ fontSize: 28 }}>{p.t ? "sí" : "no"}</span>
            <span style={{ fontFamily: serif, fontSize: 34, color: c.b, opacity: y ? 1 : 0 }}>{ocultaY0 ? <span style={{ color: v.ceniza }}>?</span> : p.y0}</span>
            <span style={{ fontFamily: serif, fontSize: 34, color: v.azafran, opacity: y ? 1 : 0 }}>{ocultaY1 ? <span style={{ color: v.ceniza }}>?</span> : p.y1}</span>
            <span style={{ fontFamily: serif, fontSize: 34, color: c.c, opacity: tau && !observado ? 1 : 0 }}>{p.y1 - p.y0}</span>
          </div>
        );
      })}
    </div>
  );
};

const Resultado: React.FC<{ at: number; children: React.ReactNode; top?: number }> = ({ at, children, top = 540 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = transicion(frame, at, fps, 500, backOut);
  return <div style={{ position: "absolute", left: 0, top, opacity: Math.min(1, k * 1.5), transform: `scale(${0.9 + 0.1 * Math.min(1, k)})`, transformOrigin: "left" }}>{children}</div>;
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const at = useCue("gancho");
  const cB = useCueAt("gancho", 0.35);
  const cR = useCueAt("gancho", 0.75);
  return (
    <Escena>
      <Escenario alto={440}>
        {[
          [0, "Analista 1", "4", v.azafran, at + 6],
          [472, "Analista 2", "5", c.b, cB],
        ].map(([x, t, n, col, a]) => (
          <Panel key={t as string} caja={{ x: x as number, y: 0, w: 440, h: 300 }} at={a as number} color={col as string} estilo={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Rol color={col as string}>{t}</Rol>
            <div style={{ fontFamily: serif, fontSize: 150, color: col as string, lineHeight: 1 }}>{n}</div>
          </Panel>
        ))}
        <Sube at={cR} style={{ position: "absolute", left: 0, top: 340, width: 912, display: "flex", justifyContent: "center", gap: 16, alignItems: "center", fontSize: 34 }}>
          <Check size={40} strokeWidth={2.4} color={c.c} /> los dos tienen razón
        </Sube>
      </Escenario>
      <div style={{ marginTop: 40 }}>
        <Cinetico at={cR + 10} texto="¿Efecto *en quién?*" style={{ fontSize: 108 }} />
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
      <Cinetico at={6} texto="El zoológico|de *efectos.*" style={{ marginTop: 18, fontSize: 116 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>ATE, ATT, ATU, CATE y LATE · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── La vista de dios ─────────────────────────────────────────────────────────
export const Dios: React.FC = () => {
  const frame = useCurrentFrame();
  const cD = useCue("dios");
  const cI = useCue("individual");
  return (
    <Escena>
      <Cabeza at={cD} titulo="Ocho personas,|*dos mundos.*" />
      <Escenario alto={680} style={{ marginTop: 30 }}>
        <Tabla at={cD + 6} tau={frame >= cI} />
        <Resultado at={cI + 20}>
          <div style={{ fontSize: 30, fontWeight: 200 }}>
            efecto individual: <span style={{ fontFamily: serif, color: c.c }}>Y(1) − Y(0)</span> · en la vida real nunca vemos los dos
          </div>
        </Resultado>
      </Escenario>
    </Escena>
  );
};

// ─── ATE ──────────────────────────────────────────────────────────────────────
export const Ate: React.FC = () => {
  const at = useCue("ate");
  return (
    <Escena>
      <Cabeza at={at} titulo="ATE: el promedio|de *todos.*" />
      <Escenario alto={680} style={{ marginTop: 30 }}>
        <Tabla at={at - 40} activa={() => true} color={v.hueso} />
        <Resultado at={at + 30}>
          <Formula tam={62}>
            <V color={v.hueso} italica={false}>
              ATE
            </V>
            <Op>=</Op>
            <span style={{ fontSize: 40 }}>(8+7+6+2+1+0+5+3)/8</span>
            <Op>=</Op>
            <span style={{ color: c.c, fontSize: 84 }}>4</span>
          </Formula>
        </Resultado>
      </Escenario>
    </Escena>
  );
};

// ─── ATT y ATU ────────────────────────────────────────────────────────────────
export const Att: React.FC = () => {
  const frame = useCurrentFrame();
  const cT = useCue("att");
  const cU = useCue("atu");
  const fase = frame >= cU ? 1 : 0;
  return (
    <Escena>
      <Cabeza at={cT} titulo={fase ? "ATU: los *no tratados.*" : "ATT: los *tratados.*"} />
      <Escenario alto={680} style={{ marginTop: 30 }}>
        <Tabla at={cT - 40} activa={(p) => (fase ? p.t === 0 : p.t === 1)} color={fase ? c.b : v.azafran} />
        {fase === 0 ? (
          <Resultado at={cT + 30}>
            <Formula tam={62}>
              <V color={v.azafran} italica={false}>
                ATT
              </V>
              <Op>=</Op>
              <span style={{ fontSize: 40 }}>(8+7+2+3)/4</span>
              <Op>=</Op>
              <span style={{ color: v.azafran, fontSize: 84 }}>5</span>
            </Formula>
          </Resultado>
        ) : (
          <Resultado at={cU + 6}>
            <Formula tam={52}>
              <V color={c.b} italica={false}>
                ATU
              </V>
              <Op>=</Op>
              <span style={{ color: c.b }}>3</span>
              <span style={{ margin: "0 24px", color: v.ceniza }}>·</span>
              ATE<Op>=</Op>½·<span style={{ color: v.azafran }}>5</span>
              <Op>+</Op>½·<span style={{ color: c.b }}>3</span>
              <Op>=</Op>
              <span style={{ color: c.c }}>4</span>
            </Formula>
          </Resultado>
        )}
      </Escenario>
    </Escena>
  );
};

// ─── CATE ─────────────────────────────────────────────────────────────────────
export const Cate: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useCue("cate");
  const cM = useCueAt("cate", 0.75);
  const mayores = frame >= cM;
  return (
    <Escena>
      <Cabeza at={at} titulo="CATE: dentro de|un *subgrupo.*" />
      <Escenario alto={680} style={{ marginTop: 30 }}>
        <Tabla at={at - 40} activa={(p) => p.g === (mayores ? "mayor" : "joven")} color={mayores ? c.d : c.c} />
        <Resultado at={at + 30}>
          <Formula tam={56}>
            CATE(<span style={{ color: c.c }}>joven</span>)<Op>=</Op>
            <span style={{ color: c.c }}>6,5</span>
            {mayores ? (
              <>
                <span style={{ margin: "0 20px", color: v.ceniza }}>·</span>
                CATE(<span style={{ color: c.d }}>mayor</span>)<Op>=</Op>
                <span style={{ color: c.d }}>1,5</span>
              </>
            ) : null}
          </Formula>
        </Resultado>
      </Escenario>
    </Escena>
  );
};

// ─── LATE ─────────────────────────────────────────────────────────────────────
export const Late: React.FC = () => {
  const at = useCue("late");
  return (
    <Escena>
      <Cabeza at={at} titulo="LATE: los que|*cambiaron.*" />
      <Escenario alto={680} style={{ marginTop: 30 }}>
        <Tabla at={at - 40} activa={(p) => p.cumple} cumplidores color={v.azafran} />
        <Resultado at={at + 40}>
          <Formula tam={58}>
            <V color={v.azafran} italica={false}>
              LATE
            </V>
            <Op>=</Op>
            <span style={{ fontSize: 40 }}>(7+2+1+5)/4</span>
            <Op>=</Op>
            <span style={{ color: v.azafran, fontSize: 80 }}>3,75</span>
          </Formula>
          <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 6 }}>ojo: quienes se trataron solo porque el instrumento los empujó</div>
        </Resultado>
      </Escenario>
    </Escena>
  );
};

// ─── La comparación ingenua ───────────────────────────────────────────────────
export const Ingenuo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cI = useCue("ingenuo");
  const cS = useCue("sesgo");
  const k = transicion(frame, cS + 10, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cI} titulo="La comparación|*ingenua.*" />
      <Escenario alto={680} style={{ marginTop: 30 }}>
        <Tabla at={cI - 30} observado />
        <Resultado at={cI + 30}>
          <Formula tam={54}>
            <span style={{ color: v.azafran }}>18</span>
            <Op>−</Op>
            <span style={{ color: c.b }}>12</span>
            <Op>=</Op>
            <span style={{ color: ROJO }}>6</span>
            {frame >= cS ? (
              <span style={{ display: "inline-flex", alignItems: "center", opacity: k }}>
                <Op>=</Op>
                <span style={{ color: v.azafran }}>5</span>
                <span style={{ fontSize: 26, color: v.niebla, margin: "0 8px" }}>ATT</span>
                <Op>+</Op>
                <span style={{ color: ROJO }}>1</span>
                <span style={{ fontSize: 26, color: v.niebla, margin: "0 8px" }}>sesgo</span>
              </span>
            ) : null}
          </Formula>
        </Resultado>
      </Escenario>
    </Escena>
  );
};

// ─── Qué estima cada método ───────────────────────────────────────────────────
export const Metodos: React.FC = () => {
  const at = useCue("metodos");
  const largo = useCueAt("metodos", 1) - at;
  const filas: [string, string, string][] = [
    ["experimento con sorteo", "ATE", v.hueso],
    ["emparejamiento · diferencias en diferencias", "ATT", v.azafran],
    ["variable instrumental", "LATE", v.azafran],
    ["regresión discontinua", "en el corte", c.d],
  ];
  return (
    <Escena>
      <Cabeza at={at} titulo="Cada método,|*un animal.*" />
      <Escenario alto={680} style={{ marginTop: 40 }}>
        {filas.map(([m, e, col], i) => (
          <Panel key={m} caja={{ x: 0, y: i * 140, w: 912, h: 120 }} at={at + largo * (0.08 + i * 0.2)} estilo={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px" }}>
            <span style={{ fontSize: 30 }}>{m}</span>
            <span style={{ fontFamily: mono, fontSize: 36, color: col }}>{e}</span>
          </Panel>
        ))}
        <div style={{ position: "absolute", left: 0, top: 590, fontSize: 24, fontWeight: 200, color: v.ceniza }}>con supuestos y diseños concretos; la regla general, no la única</div>
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
        <Cinetico at={cCta} texto="Antes del número,|*¿en quién?*" style={{ fontSize: 90 }} />
        <div style={{ display: "flex", gap: 10, marginTop: 30, flexWrap: "wrap" }}>
          {["ATE", "ATT", "ATU", "CATE", "LATE"].map((t) => (
            <div key={t} style={{ padding: "10px 18px", borderRadius: 14, border: `1.5px solid ${linea}`, background: relleno, fontFamily: mono, fontSize: 30, color: v.azafran }}>
              {t}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próxima: 09/17 · efectos heterogéneos
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
