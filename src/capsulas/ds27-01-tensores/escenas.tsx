import React from "react";
import { Check, Cpu, MessageCircleQuestion, Server } from "lucide-react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { backOut, EXPO_IN_OUT, EXPO_OUT, transicion } from "../../estilos/vacio/movimiento";
import { Cabeza, Chip, Cinetico, Codigo, Ejes, Escena, Formula, Nota, Op, Pildora, Sube, sx, Tarjeta, Var } from "../../estilos/nube/kit";
import { codigo, n, tipo } from "../../estilos/nube/tokens";

const SERIE = "Data Scientist 2027 · etapa 1";

// Las 12 etapas de la hoja de ruta, como puntos de avance.
const Ruta: React.FC<{ at: number; actual: number }> = ({ at, actual }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const colores = [n.azul, n.rojo, n.amarillo, n.verde];
  return (
    <div style={{ display: "flex", gap: 12 }}>
      {Array.from({ length: 12 }, (_, i) => {
        const k = transicion(frame, at + i * 2, fps, 400, EXPO_OUT);
        const on = i === actual;
        return <div key={i} style={{ width: on ? 64 : 40, height: 14, borderRadius: 7, background: on ? colores[i % 4] : n.borde, opacity: k }} />;
      })}
    </div>
  );
};

// ─── Gancho ───────────────────────────────────────────────────────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("pesos");
  const cE = useCue("etapa");
  const largo = useCueAt("pesos", 1) - cP;
  const filas: [string, number, string, number][] = [
    ["FP32", 28, n.rojo, 0.05],
    ["BF16", 14, n.azul, 0.35],
    ["FP8", 7, n.verde, 0.6],
  ];
  return (
    <Escena>
      <div style={{ ...tipo.cuerpo, color: n.texto2 }}>modelo de 7.000 millones de parámetros</div>
      <div style={{ marginTop: 30 }}>
        {filas.map(([nom, gb, col, f]) => {
          const k = transicion(frame, cP + largo * f, fps, 800, EXPO_OUT);
          return (
            <div key={nom} style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 26, opacity: Math.min(1, k * 2) }}>
              <div style={{ width: 120, fontFamily: codigo, fontSize: 34, color: col }}>{nom}</div>
              <div style={{ flex: 1, height: 64, borderRadius: 14, background: n.superficie, border: `2px solid ${n.borde}` }}>
                <div style={{ height: "100%", width: `${(gb / 28) * 100 * k}%`, borderRadius: 12, background: col }} />
              </div>
              <div style={{ width: 150, textAlign: "right", fontSize: 48, fontWeight: 500, color: col }}>{Math.round(gb * k)} GB</div>
            </div>
          );
        })}
      </div>
      <Sube at={cP + largo * 0.85} style={{ marginTop: 40 }}>
        <Chip at={cP + largo * 0.85} color={n.verde}>
          4× menos memoria, la misma red
        </Chip>
      </Sube>
      <div style={{ marginTop: 60 }}>
        <Cinetico at={cE + 6} texto="Cómo vive un número|*en la memoria.*" tam={84} />
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ autor }) => (
  <Escena>
    <div style={{ marginTop: 300 }}>
      <Ruta at={0} actual={0} />
      <div style={{ ...tipo.rotulo, color: n.texto2, marginTop: 40 }}>DATA SCIENTIST 2027 · ETAPA 1 DE 12</div>
      <Cinetico at={8} texto="Tensores y|*PyTorch por dentro.*" tam={110} style={{ marginTop: 18 }} />
      <Sube at={28}>
        <div style={{ ...tipo.cuerpo, color: n.texto2, marginTop: 24 }}>strides · autograd · memoria · precisión · por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── Strides ──────────────────────────────────────────────────────────────────
export const Strides: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("plano");
  const cB = useCue("bytes");
  const cD = useCue("direccion");
  const largoD = useCueAt("direccion", 1) - cD;
  const tT = cD + largoD * 0.45;
  const kT = transicion(frame, tT, fps, 900, EXPO_IN_OUT);
  const ciclo = Math.floor(Math.max(0, frame - cB) / 10) % 6;
  const cel = 120;
  const pos = (idx: number) => {
    const fila = Math.floor(idx / 3);
    const col = idx % 3;
    // transpuesta: (i, j) → (j, i)
    const x = col + (fila - col) * kT;
    const y = fila + (col - fila) * kT;
    return { x: x * (cel + 12), y: y * (cel + 12) };
  };
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cP} serie={SERIE} titulo="Un bloque plano|*y una receta.*" />
      <div style={{ position: "relative", height: 820, marginTop: 30 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 420, height: 400 }}>
          {Array.from({ length: 6 }, (_, i) => {
            const p = pos(i);
            const on = frame >= cB && frame < cD && i === ciclo;
            return (
              <div key={i} style={{ position: "absolute", left: p.x, top: p.y, width: cel, height: cel, borderRadius: 16, border: `2px solid ${on ? n.azul : n.borde}`, background: on ? n.azulClaro : n.fondo, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 40, color: n.texto, opacity: t(cP + 6 + i * 2) }}>
                {i}
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 440, top: 10, width: 470, opacity: t(cB) }}>
          <div style={{ fontFamily: codigo, fontSize: 30, color: n.texto2 }}>{kT > 0.5 ? "a.T  ·  3×2" : "a  ·  2×3 · FP32"}</div>
          <div style={{ fontFamily: codigo, fontSize: 40, marginTop: 14 }}>
            strides = (<span style={{ color: n.rojo }}>{kT > 0.5 ? 4 : 12}</span>, <span style={{ color: n.azul }}>{kT > 0.5 ? 12 : 4}</span>)
          </div>
          <div style={{ fontSize: 26, color: n.texto2, marginTop: 10 }}>bytes para bajar una fila, y para avanzar una columna</div>
          <div style={{ marginTop: 20, fontFamily: codigo, fontSize: 30, color: kT > 0.5 ? n.rojo : n.verde, opacity: t(tT) }}>contiguo: {kT > 0.5 ? "False" : "True"}</div>
        </div>
        <div style={{ position: "absolute", left: 0, top: 430, width: 912 }}>
          <div style={{ fontSize: 24, color: n.texto2, opacity: t(cP + 20) }}>memoria: un solo bloque de 24 bytes</div>
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {Array.from({ length: 6 }, (_, i) => {
              const on = frame >= cB && frame < cD && i === ciclo;
              return (
                <div key={i} style={{ flex: 1, height: 84, borderRadius: 10, border: `2px solid ${on ? n.azul : n.borde}`, background: on ? n.azulClaro : n.superficie, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: t(cP + 20 + i * 2) }}>
                  <span style={{ fontFamily: codigo, fontSize: 30 }}>{i}</span>
                  <span style={{ fontFamily: codigo, fontSize: 18, color: n.texto3 }}>+{i * 4} B</span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, top: 590, opacity: t(cD) }}>
          <Formula tam={50}>
            dir(<Var>i</Var>, <Var>j</Var>)<Op>=</Op>inicio<Op>+</Op>
            <Var color={n.rojo}>i</Var>·<Var color={n.rojo}>s</Var>
            <sub style={{ fontSize: "0.5em" }}>0</sub>
            <Op>+</Op>
            <Var color={n.azul}>j</Var>·<Var color={n.azul}>s</Var>
            <sub style={{ fontSize: "0.5em" }}>1</sub>
          </Formula>
          <Nota at={tT + 10} color={n.texto} tam={28} style={{ marginTop: 16 }}>
            transponer solo intercambia los strides: <b style={{ fontWeight: 500, color: n.azul }}>cero copias, O(1)</b>
          </Nota>
        </div>
      </div>
    </Escena>
  );
};

// ─── Autograd ─────────────────────────────────────────────────────────────────
export const Autograd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cG = useCue("grafo");
  const cI = useCue("inverso");
  const cC = useCue("custom");
  const largoG = useCueAt("grafo", 1) - cG;
  const largoI = useCueAt("inverso", 1) - cI;
  const kAtras = transicion(frame, cG + largoG * 0.5, fps, 1200, EXPO_IN_OUT);
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const nodos: [string, number][] = [
    ["x", 40],
    ["W·x", 250],
    ["+ b", 460],
    ["pérdida", 670],
  ];
  const enCodigo = frame >= cC;
  return (
    <Escena>
      <Cabeza at={cG} serie={SERIE} titulo="Autograd:|*la cadena al revés.*" />
      <div style={{ position: "relative", height: 820, marginTop: 30 }}>
        <svg width={912} height={260} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", opacity: enCodigo ? 0 : 1 }}>
          {nodos.slice(0, -1).map(([, x], i) => (
            <g key={i}>
              <line x1={x + 160} y1={70} x2={nodos[i + 1][1]} y2={70} stroke={n.texto3} strokeWidth={3} opacity={t(cG + 10 + i * 6)} />
              <line x1={nodos[i + 1][1]} y1={170} x2={nodos[i + 1][1] - (nodos[i + 1][1] - x - 160) * kAtras} y2={170} stroke={n.rojo} strokeWidth={4} opacity={kAtras > 0 ? 1 : 0} />
              <text x={(x + 160 + nodos[i + 1][1]) / 2} y={215} textAnchor="middle" fontFamily={codigo} fontSize={22} fill={n.rojo} opacity={kAtras}>
                ∂L/∂·
              </text>
            </g>
          ))}
          {nodos.map(([nom, x], i) => (
            <g key={nom} opacity={t(cG + 4 + i * 6)}>
              <rect x={x} y={30} width={160} height={80} rx={16} fill={n.fondo} stroke={i === 3 ? n.azul : n.borde} strokeWidth={2.5} />
              <text x={x + 80} y={80} textAnchor="middle" fontFamily={codigo} fontSize={28} fill={n.texto}>
                {nom}
              </text>
            </g>
          ))}
          <text x={40} y={170 + 8} fontFamily={codigo} fontSize={22} fill={n.rojo} opacity={kAtras}>
            backward ←
          </text>
        </svg>
        <div style={{ position: "absolute", left: 0, top: 270, width: 912, opacity: enCodigo ? 0 : t(cI) }}>
          {[
            ["modo inverso (backprop)", "O(1) · costo(f)", n.verde, 0.2, 0.06],
            ["modo directo", "O(n) · costo(f)", n.rojo, 0.55, 1],
          ].map(([nom, o, col, f, ancho]) => {
            const k = transicion(frame, cI + largoI * (f as number), fps, 800, EXPO_OUT);
            return (
              <div key={nom as string} style={{ marginTop: 24, opacity: Math.min(1, k * 2) }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
                  <span>{nom as string}</span>
                  <span style={{ fontFamily: codigo, color: col as string }}>{o as string}</span>
                </div>
                <div style={{ height: 40, borderRadius: 10, background: n.superficie, border: `2px solid ${n.borde}`, marginTop: 10 }}>
                  <div style={{ height: "100%", width: `${Math.max(4, (ancho as number) * 100) * k}%`, borderRadius: 8, background: col as string }} />
                </div>
              </div>
            );
          })}
          <Nota at={cI + largoI * 0.8} tam={24} style={{ marginTop: 20 }}>
            n = número de parámetros · el gradiente completo cuesta del orden de una pasada hacia adelante (Griewank y Walther, 2008)
          </Nota>
        </div>
        {enCodigo ? (
          <Codigo
            at={cC + 2}
            archivo="gelu_rapida.py"
            tam={25}
            resaltar={[2, 3, 7, 8]}
            lineas={[
              [["class ", sx.clave], ["GeluRapida", sx.fn], ["(torch.autograd.Function):"]],
              [["    @staticmethod", sx.clave]],
              [["    def ", sx.clave], ["forward", sx.fn], ["(ctx, x):"]],
              [["        ctx.save_for_backward(x)"]],
              [["        return ", sx.clave], ["x * torch.sigmoid(", n.texto], ["1.702", sx.num], [" * x)"]],
              [[""]],
              [["    @staticmethod", sx.clave]],
              [["    def ", sx.clave], ["backward", sx.fn], ["(ctx, g):"]],
              [["        x, = ctx.saved_tensors"]],
              [["        s = torch.sigmoid(", n.texto], ["1.702", sx.num], [" * x)"]],
              [["        return ", sx.clave], ["g * (s + ", n.texto], ["1.702", sx.num], [" * x * s * (", n.texto], ["1", sx.num], [" - s))"]],
            ]}
          />
        ) : null}
      </div>
    </Escena>
  );
};

// ─── La pirámide de memoria ───────────────────────────────────────────────────
const NIVELES: [string, string, string][] = [
  ["registros", "los más rápidos", n.verde],
  ["memoria compartida", "KB por multiprocesador", n.amarillo],
  ["caché L2", "50 MB", n.rojo],
  ["HBM", "80 GB · 3,35 TB/s", n.azul],
];

export const Memoria: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cP = useCue("piramide");
  const cH = useCue("h100");
  const largoP = useCueAt("piramide", 1) - cP;
  const largoH = useCueAt("h100", 1) - cH;
  const t = (a: number) => transicion(frame, a, fps, 500, EXPO_OUT);
  return (
    <Escena>
      <Cabeza at={cP} serie={SERIE} titulo="La memoria|*es una pirámide.*" />
      <div style={{ position: "relative", height: 820, marginTop: 30 }}>
        {NIVELES.map(([nom, det, col], i) => {
          const w = 560 + i * 117;
          return (
            <div key={nom} style={{ position: "absolute", left: (912 - w) / 2, top: i * 98, width: w, height: 84, borderRadius: 16, background: n.fondo, border: `2.5px solid ${col}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: t(cP + largoP * (0.1 + i * 0.15)) }}>
              <span style={{ fontSize: 30, fontWeight: 500, whiteSpace: "nowrap" }}>{nom}</span>
              <span style={{ fontFamily: codigo, fontSize: 22, color: n.texto2, whiteSpace: "nowrap" }}>{det}</span>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 0, top: 410, fontSize: 24, color: n.texto2, opacity: t(cP + largoP * 0.8) }}>↓ más grande y más lenta</div>
        <div style={{ position: "absolute", left: 0, top: 470, width: 912, display: "flex", gap: 16 }}>
          <Tarjeta at={cH + 4} color={n.azul} style={{ flex: 1 }}>
            <div style={{ fontSize: 24, color: n.texto2 }}>H100 · cómputo BF16 (denso)</div>
            <div style={{ fontSize: 60, fontWeight: 500, color: n.azul }}>989 TFLOPS</div>
          </Tarjeta>
          <Tarjeta at={cH + largoH * 0.55} color={n.rojo} style={{ flex: 1 }}>
            <div style={{ fontSize: 24, color: n.texto2 }}>H100 · ancho de banda HBM3</div>
            <div style={{ fontSize: 60, fontWeight: 500, color: n.rojo }}>3,35 TB/s</div>
          </Tarjeta>
        </div>
        <Nota at={cH + largoH * 0.8} tam={22} style={{ position: "absolute", left: 0, top: 660 }}>
          ficha técnica NVIDIA H100 SXM (989 TFLOPS sin dispersión; 1.979 con dispersión)
        </Nota>
      </div>
    </Escena>
  );
};

// ─── Roofline ─────────────────────────────────────────────────────────────────
const PICO = 989;
const BW = 3.35;
const lg = Math.log10;
export const Roofline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cI = useCue("intensidad");
  const cC = useCue("casos");
  const largoC = useCueAt("casos", 1) - cC;
  const k = transicion(frame, cI + 10, fps, 1200, EXPO_IN_OUT);
  const t = (a: number) => transicion(frame, a, fps, 500, backOut);
  const xs = Array.from({ length: 81 }, (_, i) => -1 + (i / 80) * 5);
  return (
    <Escena>
      <Cabeza at={cI} serie={SERIE} titulo="Operaciones|*por byte.*" />
      <div style={{ marginTop: 26 }}>
        <Formula tam={44}>
          rendimiento<Op>=</Op>min(<Var color={n.azul} recta>pico</Var>, <Var color={n.rojo} recta>ancho de banda</Var>
          <Op>×</Op>
          <Var color={n.verde} recta>intensidad</Var>)
        </Formula>
      </div>
      <div style={{ marginTop: 20 }}>
        <Ejes ancho={912} alto={500} x={[-1, 4]} y={[-1, 3.2]} at={cI} rotuloX="intensidad (FLOP/byte, log) →" rotuloY="TFLOPS (log)" marcasX={[-1, 0, 1, 2, 3, 4].map((e) => ({ v: e, t: `10${["⁻¹", "⁰", "¹", "²", "³", "⁴"][e + 1]}` }))} marcasY={[0, 1, 2, 3].map((e) => ({ v: e, t: `10${["⁰", "¹", "²", "³"][e]}` }))}>
          {({ px, py }) => {
            const pts = xs.map((x) => [px(x), py(lg(Math.min(PICO, BW * Math.pow(10, x))))]);
            const nVis = Math.max(2, Math.round(pts.length * k));
            return (
              <g>
                <path d={`M${pts.slice(0, nVis).map((p) => p.join(",")).join("L")}`} fill="none" stroke={n.azul} strokeWidth={5} />
                <line x1={px(lg(295))} y1={py(-1)} x2={px(lg(295))} y2={py(lg(PICO))} stroke={n.texto3} strokeWidth={2} strokeDasharray="8 8" opacity={k} />
                <text x={px(lg(295)) + 10} y={py(-0.6)} fontFamily={codigo} fontSize={22} fill={n.texto2} opacity={k}>
                  ≈ 295
                </text>
                <g opacity={t(cC + largoC * 0.05)}>
                  <circle cx={px(lg(1 / 6))} cy={py(lg(BW / 6))} r={13} fill={n.rojo} />
                  <text x={px(lg(1 / 6)) + 20} y={py(lg(BW / 6)) + 40} fontFamily={codigo} fontSize={22} fill={n.rojo}>
                    suma BF16 · 1/6 · memoria
                  </text>
                </g>
                <g opacity={t(cC + largoC * 0.55)}>
                  <circle cx={px(lg(1365))} cy={py(lg(PICO))} r={13} fill={n.verde} />
                  <text x={px(lg(1365)) + 10} y={py(lg(PICO)) - 22} textAnchor="end" fontFamily={codigo} fontSize={22} fill={n.verde}>
                    matmul 4096 · 1.365 · cómputo
                  </text>
                </g>
              </g>
            );
          }}
        </Ejes>
      </div>
      <Nota at={cC + largoC * 0.9} tam={22} style={{ marginTop: 12 }}>
        989 / 3,35 ≈ 295 FLOP/byte · Williams, Waterman y Patterson (2009), Communications of the ACM 52(4)
      </Nota>
    </Escena>
  );
};

// ─── Fusión de operadores ─────────────────────────────────────────────────────
export const Fusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cS = useCue("seis");
  const cD = useCue("dos");
  const largoD = useCueAt("dos", 1) - cD;
  const t = (a: number) => transicion(frame, a, fps, 450, EXPO_OUT);
  const fusion = frame >= cD;
  const kernels = fusion ? ["mul + add + gelu"] : ["mul", "add", "gelu"];
  const ancho = fusion ? 600 : 250;
  const res = transicion(frame, cD + largoD * 0.4, fps, 500, backOut);
  return (
    <Escena>
      <Cabeza at={cS} serie={SERIE} titulo="Fusionar|*para no viajar.*" />
      <div style={{ position: "relative", height: 820, marginTop: 30 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 912, height: 90, borderRadius: 16, background: n.azulClaro, border: `2px solid ${n.azul}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, color: n.azul, fontWeight: 500, opacity: t(cS) }}>HBM · memoria principal</div>
        {kernels.map((k, i) => {
          const x = fusion ? 156 : 15 + i * 304;
          return (
            <div key={k} style={{ position: "absolute", left: x, top: 260, width: ancho, opacity: t((fusion ? cD : cS) + 6 + i * 8) }}>
              <svg width={ancho} height={170} style={{ position: "absolute", left: 0, top: -170, overflow: "visible" }}>
                <line x1={ancho * 0.33} y1={4} x2={ancho * 0.33} y2={160} stroke={n.azul} strokeWidth={4} markerEnd="" />
                <polygon points={`${ancho * 0.33 - 12},146 ${ancho * 0.33 + 12},146 ${ancho * 0.33},166`} fill={n.azul} />
                <line x1={ancho * 0.66} y1={166} x2={ancho * 0.66} y2={10} stroke={n.rojo} strokeWidth={4} />
                <polygon points={`${ancho * 0.66 - 12},24 ${ancho * 0.66 + 12},24 ${ancho * 0.66},4`} fill={n.rojo} />
                <text x={ancho * 0.33 - 18} y={90} textAnchor="end" fontFamily={codigo} fontSize={20} fill={n.azul}>
                  lee
                </text>
                <text x={ancho * 0.66 + 18} y={90} fontFamily={codigo} fontSize={20} fill={n.rojo}>
                  escribe
                </text>
              </svg>
              <div style={{ height: 110, borderRadius: 16, border: `2.5px solid ${fusion ? n.verde : n.borde}`, background: n.fondo, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: codigo, fontSize: 30 }}>{k}</div>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 0, top: 420, display: "flex", alignItems: "baseline", gap: 24 }}>
          <span style={{ fontSize: 34, color: n.texto2 }}>viajes a HBM:</span>
          <span style={{ fontSize: 96, fontWeight: 500, color: fusion ? n.verde : n.rojo, display: "inline-block", transform: `scale(${fusion ? res : 1})` }}>{fusion ? 2 : 6}</span>
          {fusion ? <span style={{ fontSize: 34, color: n.verde, opacity: res }}>3× menos tráfico</span> : null}
        </div>
        <div style={{ position: "absolute", left: 0, top: 580, display: "flex", gap: 16, opacity: t(cD + largoD * 0.6) }}>
          <Chip at={cD + largoD * 0.6} color={n.azul}>
            torch.compile
          </Chip>
          <Chip at={cD + largoD * 0.75} color={n.verde}>
            FlashAttention
          </Chip>
        </div>
        <Nota at={cD + largoD * 0.85} tam={22} style={{ position: "absolute", left: 0, top: 670 }}>
          Dao et al. (2022), «FlashAttention: fast and memory-efficient exact attention with IO-awareness», NeurIPS
        </Nota>
      </div>
    </Escena>
  );
};

// ─── Precisión mixta ──────────────────────────────────────────────────────────
const FORMATOS: [string, number, number, string, string][] = [
  ["FP32", 8, 23, "3,4 · 10³⁸", "bits"],
  ["BF16", 8, 7, "3,4 · 10³⁸", "bits"],
  ["FP16", 5, 10, "65.504", "fp16"],
  ["FP8 E4M3", 4, 3, "448", "fp8"],
  ["FP8 E5M2", 5, 2, "57.344", "fp8"],
];

export const Precision: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues: Record<string, number> = { bits: useCue("bits"), fp16: useCue("fp16"), fp8: useCue("fp8") };
  const largoB = useCueAt("bits", 1) - cues.bits;
  const u = 22;
  return (
    <Escena>
      <Cabeza at={cues.bits} serie={SERIE} titulo="Precisión|*mixta.*" />
      <div style={{ display: "flex", gap: 22, marginTop: 30, fontSize: 24 }}>
        {[
          ["signo", n.texto3],
          ["exponente: rango", n.azul],
          ["mantisa: precisión", n.amarillo],
        ].map(([t, c]) => (
          <span key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 20, height: 20, borderRadius: 4, background: c }} /> {t}
          </span>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        {FORMATOS.map(([nom, e, m, max, cue], i) => {
          const a = cue === "bits" ? cues.bits + largoB * (0.15 + i * 0.35) : cues[cue] + 4 + (i === 4 ? 30 : 0);
          const k = transicion(frame, a, fps, 600, EXPO_OUT);
          return (
            <div key={nom} style={{ marginTop: 26, opacity: Math.min(1, k * 2) }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
                <span style={{ fontFamily: codigo }}>{nom}</span>
                <span style={{ color: n.texto2 }}>
                  máx <b style={{ fontWeight: 500, color: n.texto }}>{max}</b>
                </span>
              </div>
              <div style={{ display: "flex", gap: 2, marginTop: 8 }}>
                {Array.from({ length: 1 + e + m }, (_, b) => (
                  <div key={b} style={{ width: u, height: 36, borderRadius: 4, background: b === 0 ? n.texto3 : b <= e ? n.azul : n.amarillo, opacity: b / (1 + e + m) < k ? 1 : 0 }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Nota at={cues.fp8 + 40} tam={22} style={{ marginTop: 20 }}>
        E4M3 para pesos y activaciones; E5M2 para gradientes · Micikevicius et al. (2022), arXiv:2209.05433
      </Nota>
    </Escena>
  );
};

// ─── En la nube de Google ─────────────────────────────────────────────────────
export const Nube: React.FC = () => {
  const at = useCue("tpu");
  const largo = useCueAt("tpu", 1) - at;
  return (
    <Escena>
      <Cabeza at={at} serie={SERIE} titulo="En la nube|*de Google.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 40 }}>
        <Tarjeta at={at + 8} color={n.azul}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Cpu size={52} strokeWidth={1.5} color={n.azul} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>Cloud TPU</div>
              <div style={{ fontSize: 28, color: n.texto2, marginTop: 6 }}>multiplica matrices en BF16 y acumula en FP32</div>
            </div>
          </div>
        </Tarjeta>
        <Tarjeta at={at + largo * 0.55} color={n.verde}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Server size={52} strokeWidth={1.5} color={n.verde} />
            <div>
              <div style={{ fontSize: 34, fontWeight: 500 }}>VM A3 · NVIDIA H100</div>
              <div style={{ fontSize: 28, color: n.texto2, marginTop: 6 }}>Tensor Cores con FP8 para entrenar e inferir</div>
            </div>
          </div>
        </Tarjeta>
      </div>
      <Nota at={at + largo * 0.85} tam={22} style={{ marginTop: 26 }}>
        documentación de Cloud TPU: «bfloat16» · Wang y Kanwar (2019), Google Cloud Blog
      </Nota>
    </Escena>
  );
};

// ─── Preguntas de entrevista ──────────────────────────────────────────────────
export const Entrevista: React.FC = () => {
  const at = useCue("preguntas");
  const largo = useCueAt("preguntas", 1) - at;
  const preguntas: [string, string, number][] = [
    ["¿Por qué transponer no copia?", "solo cambian los strides", 0.15],
    ["¿Cuándo manda la memoria?", "intensidad < ~295 FLOP/byte en una H100", 0.4],
    ["¿Por qué BF16 casi no escala la pérdida?", "tiene el mismo rango que FP32", 0.7],
  ];
  return (
    <Escena>
      <Cabeza at={at} serie={SERIE} titulo="Lo que te van|*a preguntar.*" />
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 40 }}>
        {preguntas.map(([p, r, f], i) => (
          <Tarjeta key={p} at={at + largo * f} color={[n.azul, n.rojo, n.verde][i]}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <MessageCircleQuestion size={44} strokeWidth={1.5} color={[n.azul, n.rojo, n.verde][i]} />
              <div>
                <div style={{ fontSize: 32, fontWeight: 500 }}>{p}</div>
                <div style={{ fontSize: 26, color: n.texto2, marginTop: 4 }}>{r}</div>
              </div>
            </div>
          </Tarjeta>
        ))}
      </div>
    </Escena>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const at = useCue("cta");
  return (
    <Escena>
      <div style={{ marginTop: 240 }}>
        <Ruta at={at - 10} actual={1} />
        <Cinetico at={at} texto="Primero, cómo viven|*los números.*" tam={96} style={{ marginTop: 40 }} />
        <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={at + 20}>Compártelo · Sígueme</Pildora>
          <Sube at={at + 26}>
            <div style={{ fontSize: 30, color: n.texto2 }}>{autor}</div>
          </Sube>
        </div>
        <Sube at={at + 34} style={{ marginTop: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, color: n.texto2 }}>
            <Check size={30} strokeWidth={2} color={n.verde} /> próxima: etapa 2 · curación de datos y pipelines sintéticos
          </div>
        </Sube>
      </div>
    </Escena>
  );
};
