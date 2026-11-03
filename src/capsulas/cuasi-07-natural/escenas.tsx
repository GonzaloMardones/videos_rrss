import React from "react";
import { ArrowRight, Bot, Check, Droplets, Pickaxe, Satellite, ScanSearch, Sigma, Wheat } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, Cinetico, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { serif } from "../../estilos/vacio/mate";
import { c, Ejes, Nota, Panel, ROJO, Rol, Traza } from "../../estilos/vacio/causal";
import { type P } from "../../estilos/vacio/grafo";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { Escenario, mono, relleno } from "../../estilos/vacio/tecnico";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";

const SERIE = "Cuasi-experimentos · 07";

const Cabeza: React.FC<{ at: number; titulo: string; tam?: number }> = ({ at, titulo, tam = 88 }) => (
  <>
    <Rotulo at={at}>{SERIE}</Rotulo>
    <Cinetico at={at + 3} texto={titulo} style={{ marginTop: 16, fontSize: tam }} />
  </>
);

// ─── Gancho: Ghana ────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("ghana");
  const largo = useCueAt("ghana", 1) - at;
  const res = transicion(frame, at + largo * 0.3, fps, 500, backOut);
  return (
    <Escena>
      <Escenario alto={600}>
        <div style={{ display: "flex", gap: 16 }}>
          <Panel caja={{ x: 0, y: 0, w: 448, h: 200 }} at={at + 4} color={ROJO} estilo={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <Pickaxe size={60} strokeWidth={1.4} color={ROJO} />
            <div style={{ fontSize: 28 }}>minas de oro contaminantes</div>
          </Panel>
          <Panel caja={{ x: 0, y: 0, w: 448, h: 200 }} at={at + 14} color={c.c} estilo={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <Wheat size={60} strokeWidth={1.4} color={c.c} />
            <div style={{ fontSize: 28 }}>campos agrícolas cercanos</div>
          </Panel>
        </div>
        <div style={{ position: "absolute", left: 0, top: 240, display: "flex", alignItems: "baseline", gap: 20 }}>
          <span style={{ fontFamily: serif, fontSize: 130, color: ROJO, display: "inline-block", transform: `scale(${res})`, transformOrigin: "left" }}>≈ −40 %</span>
          <span style={{ fontSize: 30, opacity: res }}>productividad agrícola</span>
        </div>
        <Nota at={at + largo * 0.55} color={v.niebla} tam={28} style={{ position: "absolute", left: 0, top: 440 }}>
          Ghana · nadie sorteó dónde poner las minas
        </Nota>
      </Escenario>
      <div style={{ marginTop: 10 }}>
        <Cinetico at={at + largo * 0.75} texto="¿Cómo se sabe|*que es causal?*" style={{ fontSize: 88 }} />
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
      <Cinetico at={6} texto="Experimentos|*naturales.*" style={{ marginTop: 18, fontSize: 130 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>de Londres a las minas de Perú y Ghana · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── John Snow, 1854 ──────────────────────────────────────────────────────────
export const Snow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cL = useCue("londres");
  const cC = useCue("colera");
  const largo = useCueAt("colera", 1) - cC;
  const k1 = transicion(frame, cC + largo * 0.45, fps, 900, EXPO_OUT);
  const k2 = transicion(frame, cC + largo * 0.7, fps, 900, EXPO_OUT);
  const barra = (n: string, val: number, col: string, k: number) => (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
        <span>{n}</span>
        <span style={{ fontFamily: serif, fontSize: 52, color: col }}>{Math.round(val * k)}</span>
      </div>
      <div style={{ height: 40, borderRadius: 10, background: "#16161B", marginTop: 8 }}>
        <div style={{ height: 40, width: `${(val / 330) * 100 * k}%`, borderRadius: 10, background: col }} />
      </div>
    </div>
  );
  return (
    <Escena>
      <Cabeza at={cL} titulo="Londres,|*1854.*" />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            ["Southwark & Vauxhall", "agua del Támesis contaminado", ROJO, 6],
            ["Lambeth", "agua tomada río arriba", c.c, 18],
          ].map(([n, d, col, a]) => (
            <Panel key={n as string} caja={{ x: 0, y: 0, w: 448, h: 170 }} at={cL + (a as number)} color={col as string} estilo={{ position: "relative", display: "flex", alignItems: "center", gap: 18 }}>
              <Droplets size={48} strokeWidth={1.5} color={col as string} />
              <div>
                <div style={{ fontSize: 28 }}>{n as string}</div>
                <div style={{ fontSize: 22, fontWeight: 200, color: v.niebla, marginTop: 4 }}>{d as string}</div>
              </div>
            </Panel>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, top: 220, width: 912, opacity: transicion(frame, cC, fps, 400, EXPO_OUT) }}>
          <div style={{ fontSize: 26, color: v.niebla, opacity: transicion(frame, cC + largo * 0.4, fps, 400, EXPO_OUT) }}>muertes por cólera por cada 10.000 casas</div>
          {barra("agua contaminada", 315, ROJO, k1)}
          {barra("agua río arriba", 37, c.c, k2)}
        </div>
        <Nota at={cC + largo * 0.85} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 560 }}>
          Snow (1855), On the Mode of Communication of Cholera, tabla IX · Freedman (1991), Sociological Methodology 21
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── «Como si fuera al azar» ──────────────────────────────────────────────────
export const Comosi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cA = useCue("comosi");
  const cC = useCue("creible");
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cA} titulo="Como si fuera|*al azar.*" />
      <Escenario alto={660} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: t(cA + 10) }}>
          {["nadie lo diseñó", "asignó el tratamiento", "como si fuera al azar"].map((p, i) => (
            <React.Fragment key={p}>
              <div style={{ padding: "18px 22px", borderRadius: 18, border: `2px solid ${[v.niebla, v.azafran, c.c][i]}`, fontSize: 26, background: relleno, opacity: t(cA + 10 + i * 14) }}>{p}</div>
              {i < 2 ? <ArrowRight size={30} color={v.ceniza} /> : null}
            </React.Fragment>
          ))}
        </div>
        <Panel caja={{ x: 0, y: 200, w: 912, h: 170 }} at={cC + 4} color={ROJO} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ fontFamily: serif, fontSize: 80, color: ROJO }}>?</div>
          <div>
            <div style={{ fontSize: 30 }}>¿qué tan creíble es el «como si»?</div>
            <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 6 }}>no hay fórmula que te salve: hay que conocer el terreno</div>
          </div>
        </Panel>
        <Nota at={cC + 40} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 410 }}>
          Dunning (2012), Natural Experiments in the Social Sciences: A Design-Based Approach, Cambridge University Press
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Perú: Yanacocha ──────────────────────────────────────────────────────────
export const Peru: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cY = useCue("yanacocha");
  const cC = useCue("compras");
  const largo = useCueAt("compras", 1) - cC;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const cadena: [string, string, number][] = [
    ["la mina compra más insumos locales", v.azafran, 0.05],
    ["sube el ingreso real en la ciudad que la abastece y zonas cercanas", c.c, 0.3],
    ["también para trabajadores fuera de la minería", c.c, 0.55],
    ["y suben los precios locales de bienes no transables", c.b, 0.8],
  ];
  return (
    <Escena>
      <Cabeza at={cY} titulo="Perú:|*Yanacocha.*" />
      <Escenario alto={740} style={{ marginTop: 34 }}>
        <Panel caja={{ x: 0, y: 0, w: 912, h: 130 }} at={cY + 4} color={v.azafran} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Pickaxe size={50} strokeWidth={1.5} color={v.azafran} />
          <div>
            <div style={{ fontSize: 30 }}>mina de oro Yanacocha, Cajamarca</div>
            <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 4 }}>encuestas de hogares 1997–2006</div>
          </div>
        </Panel>
        {cadena.map(([txt, col, f], i) => (
          <div key={txt} style={{ position: "absolute", left: 0, top: 170 + i * 110, width: 912, display: "flex", alignItems: "center", gap: 18, opacity: t(cC + largo * f) }}>
            <div style={{ width: 46, height: 46, borderRadius: 23, border: `2px solid ${col}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 22, color: col }}>{i + 1}</div>
            <div style={{ fontSize: 30 }}>{txt}</div>
          </div>
        ))}
        <Nota at={cC + largo * 0.9} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 640 }}>
          Aragón y Rud (2013), American Economic Journal: Economic Policy 5(2):1–25
        </Nota>
      </Escenario>
    </Escena>
  );
};

// ─── Ghana: distancia y satélite ──────────────────────────────────────────────
export const Ghana: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cD = useCue("distancia");
  const cS = useCue("satelite");
  const kE = transicion(frame, cD + 20, fps, 1200, EXPO_IN_OUT);
  const kN = transicion(frame, cS + 20, fps, 1200, EXPO_IN_OUT);
  const ds = Array.from({ length: 61 }, (_, i) => (i / 60) * 40);
  const efecto = (d: number) => -40 * Math.max(0, 1 - d / 20);
  const no2 = (d: number) => 1 + 2.2 * Math.max(0, 1 - d / 20);
  return (
    <Escena>
      <Cabeza at={cD} titulo="Ghana:|*la distancia importa.*" />
      <Escenario alto={760} style={{ marginTop: 34 }}>
        <Ejes ancho={912} alto={300} x={[0, 40]} y={[-45, 5]} at={cD} rotuloX="km a la mina →" rotuloY="productividad agrícola (%)" marcasX={[0, 10, 20, 30, 40].map((m) => ({ v: m, t: `${m}` }))}>
          {({ px, py }) => (
            <g>
              <line x1={px(0)} y1={py(0)} x2={px(40)} y2={py(0)} stroke={v.ceniza} strokeWidth={2} />
              <Traza pts={ds.map((d) => [px(d), py(efecto(d))] as P)} k={kE} color={ROJO} ancho={5} />
              <line x1={px(20)} y1={py(-45)} x2={px(20)} y2={py(5)} stroke={v.ceniza} strokeWidth={2} strokeDasharray="6 7" />
              <text x={px(20) + 8} y={py(-38)} fontFamily={mono} fontSize={22} fill={v.niebla}>
                ~20 km
              </text>
            </g>
          )}
        </Ejes>
        <div style={{ position: "absolute", left: 0, top: 320 }}>
          <Ejes ancho={912} alto={260} x={[0, 40]} y={[0, 3.6]} at={cS} rotuloX="km a la mina →" rotuloY="NO₂ satelital" marcasX={[0, 10, 20, 30, 40].map((m) => ({ v: m, t: `${m}` }))}>
            {({ px, py }) => <Traza pts={ds.map((d) => [px(d), py(no2(d))] as P)} k={kN} color={v.azafran} ancho={5} />}
          </Ejes>
        </div>
        <Nota at={cS + 40} color={v.niebla} tam={22} style={{ position: "absolute", left: 0, top: 610 }}>
          forma de las curvas ilustrativa · magnitud y alcance: Aragón y Rud (2016), The Economic Journal 126:1980–2011
        </Nota>
        <div style={{ position: "absolute", left: 0, top: 660, display: "flex", alignItems: "center", gap: 12, fontSize: 26, color: v.azafran, opacity: kN }}>
          <Satellite size={34} strokeWidth={1.5} color={v.azafran} /> la contaminación sigue el mismo patrón que el daño
        </div>
      </Escenario>
    </Escena>
  );
};

// ─── Dosis-respuesta ──────────────────────────────────────────────────────────
export const Dosis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("dosis");
  const largo = useCueAt("dosis", 1) - at;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={at} titulo="Dosis y|*respuesta.*" />
      <Escenario alto={600} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {[
            ["más cerca", v.niebla],
            ["más contaminación", v.azafran],
            ["más daño", ROJO],
          ].map(([txt, col], i) => (
            <React.Fragment key={txt}>
              <div style={{ flex: 1, height: 150, borderRadius: 20, border: `2px solid ${col}`, background: relleno, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, textAlign: "center", opacity: t(at + 6 + i * 16) }}>{txt}</div>
              {i < 2 ? <ArrowRight size={34} color={v.ceniza} style={{ opacity: t(at + 14 + i * 16) }} /> : null}
            </React.Fragment>
          ))}
        </div>
        <Panel caja={{ x: 0, y: 220, w: 912, h: 140 }} at={at + largo * 0.6} color={c.c} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Check size={46} strokeWidth={2} color={c.c} />
          <div style={{ fontSize: 30 }}>el mismo criterio que GRADE usa para subir la confianza de un observacional</div>
        </Panel>
      </Escenario>
    </Escena>
  );
};

// ─── IA: satélites y agentes ──────────────────────────────────────────────────
export const Ia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useCue("satelital");
  const largo = useCueAt("satelital", 1) - at;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const pasos: [typeof Bot, string, string, string, number][] = [
    [Satellite, "agente de datos", "descarga imágenes y NO₂ por fecha", v.azafran, 0.1],
    [ScanSearch, "agente de visión", "mide cultivos, polvo y actividad", c.b, 0.35],
    [Sigma, "agente causal", "alinea con cada faena y estima por distancia", c.c, 0.6],
  ];
  return (
    <Escena>
      <Cabeza at={at} titulo="Medir donde|*no hay estadísticas.*" tam={80} />
      <Escenario alto={720} style={{ marginTop: 34 }}>
        {pasos.map(([I, n, d, col, f], i) => (
          <React.Fragment key={n}>
            <Panel caja={{ x: 0, y: i * 180, w: 912, h: 130 }} at={at + largo * f} color={col} estilo={{ display: "flex", alignItems: "center", gap: 24 }}>
              <I size={50} strokeWidth={1.5} color={col} />
              <div>
                <div style={{ fontSize: 30 }}>{n}</div>
                <div style={{ fontSize: 24, fontWeight: 200, color: v.niebla, marginTop: 4 }}>{d}</div>
              </div>
            </Panel>
            {i < 2 ? (
              <div style={{ position: "absolute", left: 440, top: i * 180 + 136, fontFamily: mono, fontSize: 20, color: v.ceniza, opacity: t(at + largo * (f + 0.15)) }}>↓ A2A</div>
            ) : null}
          </React.Fragment>
        ))}
        <div style={{ position: "absolute", left: 0, top: 560, opacity: t(at + largo * 0.85) }}>
          <Rol color={v.niebla}>ejemplo ilustrativo de pipeline</Rol>
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
        <Cinetico at={cCta} texto="Reconoce el experimento.|*Defiende el «como si».*" style={{ fontSize: 78 }} />
        <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 26}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={cCta + 34} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 200, color: v.niebla }}>
            <Check size={30} strokeWidth={2} color={c.c} /> próximo: bloque 3 · IA y agentes
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
