import React from "react";
import { AbsoluteFill } from "remotion";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { camara, Cilindro, Enlace, iso, Lienzo, Punto, Solido } from "../../estilos/vacio/iso";
import { fuente, ss01, v } from "../../estilos/vacio/tokens";

// Piezas del carrusel curvo del gancho: lo que rodea a un agente. Se renderizan como imágenes (960 × 540)
// a public/tec02/piezas/ con `npx remotion still Tec02-Piezas ... --props='{"pieza":N}'`.

const mono: React.CSSProperties = { fontFamily: "'Figtree', ui-monospace, monospace", fontWeight: 500, fontSize: 30, lineHeight: 1.5, letterSpacing: 0 };

const Marco: React.FC<{ children: React.ReactNode; rotulo: string }> = ({ children, rotulo }) => (
  <AbsoluteFill style={{ background: "#0B0B0E", fontFamily: fuente, color: v.hueso, ...ss01, padding: 48 }}>
    <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: v.ceniza }}>{rotulo}</div>
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
  </AbsoluteFill>
);

const Prompt = () => (
  <Marco rotulo="prompt">
    <div style={{ border: `2px solid ${v.ceniza}`, borderRadius: 28, padding: "30px 36px", fontSize: 40, fontWeight: 200, lineHeight: 1.35, width: 760 }}>
      Resume la reunión y propón los <span style={{ color: v.azafran }}>próximos pasos</span>
      <span style={{ display: "inline-block", width: 4, height: 44, background: v.hueso, marginLeft: 6, verticalAlign: "middle" }} />
    </div>
  </Marco>
);

const Grafo = () => {
  const P = camara(2.6, 430, 230);
  return (
    <Marco rotulo="grafo de estados">
      <Lienzo ancho={860} alto={400}>
        <Enlace P={P} pts={[[-70, 0, 14], [0, 0, 14], [70, 0, 14]]} color={iso.medio} />
        {[-70, 0, 70].map((x, i) => (
          <Solido key={x} P={P} x0={x - 16} y0={-16} x1={x + 16} y1={16} z1={i === 1 ? 30 : 18} r={6} luz={i === 1} />
        ))}
        <Punto P={P} at={[0, 0, 30]} r={6} color={v.azafran} />
      </Lienzo>
    </Marco>
  );
};

const Codigo = () => (
  <Marco rotulo="servicio">
    <div style={{ ...mono, width: 820 }}>
      <div>
        <span style={{ color: "#B18CFF" }}>async def</span> <span style={{ color: v.hueso }}>revisar</span>
        <span style={{ color: v.ceniza }}>(peticion):</span>
      </div>
      <div style={{ paddingLeft: 40, color: v.ceniza }}>
        ctx = <span style={{ color: "#B18CFF" }}>await</span> <span style={{ color: v.hueso }}>reunir_contexto</span>(peticion)
      </div>
      <div style={{ paddingLeft: 40, color: v.ceniza }}>
        salida = <span style={{ color: "#B18CFF" }}>await</span> <span style={{ color: v.hueso }}>razonar</span>(ctx)
      </div>
      <div style={{ paddingLeft: 40, color: v.ceniza }}>
        <span style={{ color: "#B18CFF" }}>return</span> <span style={{ color: v.azafran }}>Respuesta</span>(**salida)
      </div>
    </div>
  </Marco>
);

const Json = () => (
  <Marco rotulo="respuesta tipada">
    <div style={{ ...mono, fontSize: 32, width: 700 }}>
      <div style={{ color: v.ceniza }}>{"{"}</div>
      {[
        ["tipo", '"producto"'],
        ["confianza", "0.82"],
        ["recomendacion", '"modificar"'],
        ["fuentes", "3"],
      ].map(([k, val]) => (
        <div key={k} style={{ paddingLeft: 40 }}>
          <span style={{ color: v.ceniza }}>"{k}": </span>
          <span style={{ color: k === "confianza" ? v.azafran : v.hueso }}>{val}</span>
        </div>
      ))}
      <div style={{ color: v.ceniza }}>{"}"}</div>
    </div>
  </Marco>
);

const Rack = () => {
  const P = camara(2.4, 430, 300);
  return (
    <Marco rotulo="servidor">
      <Lienzo ancho={860} alto={400}>
        <Solido P={P} x0={-40} y0={-30} x1={40} y1={30} z0={0} z1={8} r={4} />
        {[0, 1, 2, 3].map((i) => (
          <Solido key={i} P={P} x0={-36} y0={-26 + (i === 1 ? 18 : 0)} x1={36} y1={26 + (i === 1 ? 18 : 0)} z0={10 + i * 14} z1={20 + i * 14} r={3} luz={i === 1} />
        ))}
      </Lienzo>
    </Marco>
  );
};

const Vectores = () => {
  const celdas = Array.from({ length: 12 * 24 }, (_, i) => {
    const x = i % 24;
    const y = Math.floor(i / 24);
    const n = (Math.sin(x * 0.7 + y * 1.3) + Math.sin(x * 0.23 - y * 0.9) + 2) / 4;
    return n;
  });
  return (
    <Marco rotulo="embeddings · 768 dimensiones">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(24, 30px)", gap: 4 }}>
        {celdas.map((n, i) => (
          <div key={i} style={{ width: 30, height: 22, borderRadius: 4, background: n > 0.72 ? v.azafran : n > 0.5 ? v.iris : "#1C1C22", opacity: 0.35 + n * 0.65 }} />
        ))}
      </div>
    </Marco>
  );
};

const Terminal = () => (
  <Marco rotulo="registro">
    <div style={{ ...mono, fontSize: 28, width: 820, color: v.ceniza }}>
      <div>
        <span style={{ color: v.hueso }}>GET</span> /health <span style={{ color: "#2BD4B0" }}>200</span>
      </div>
      <div>
        <span style={{ color: v.hueso }}>POST</span> /api/agente/revisar <span style={{ color: "#2BD4B0" }}>200</span> · 1,8 s
      </div>
      <div>
        rag · top-3 · similitud <span style={{ color: v.azafran }}>0,91</span>
      </div>
      <div>
        grafo · reunir → razonar → guardar <span style={{ color: "#2BD4B0" }}>ok</span>
      </div>
    </div>
  </Marco>
);

const Nube = () => {
  const P = camara(2.2, 430, 250);
  return (
    <Marco rotulo="nube">
      <Lienzo ancho={860} alto={400}>
        <Solido P={P} x0={-90} y0={-60} x1={90} y1={60} z0={0} z1={4} r={10} />
        <Cilindro P={P} cx={-45} cy={-20} R={18} z0={4} z1={40} />
        <Cilindro P={P} cx={10} cy={-30} R={18} z0={4} z1={30} />
        <Solido P={P} x0={30} y0={10} x1={70} y1={45} z0={4} z1={18} r={5} luz />
      </Lienzo>
    </Marco>
  );
};

const Cerebro = () => (
  <Marco rotulo="agente">
    <Constelacion at={-200} ancho={620} cantidad={520} />
  </Marco>
);

export const piezas = [Prompt, Grafo, Codigo, Json, Rack, Vectores, Terminal, Nube, Cerebro];

export const Piezas: React.FC<{ pieza: number }> = ({ pieza }) => {
  const C = piezas[pieza % piezas.length];
  return <C />;
};
