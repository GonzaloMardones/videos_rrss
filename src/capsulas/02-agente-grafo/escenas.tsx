import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { useCue, useCueAt } from "../../components/narracion";
import { camara, Cilindro, Enlace, iso, Lienzo, Paquete, Punto, Solido } from "../../estilos/vacio/iso";
import { backOut, Cinetico, Deriva, EXPO_IN_OUT, EXPO_OUT, resorte, transicion } from "../../estilos/vacio/movimiento";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { tipo, v } from "../../estilos/vacio/tokens";
import { Escena, Pildora, Rotulo, Sube } from "../../estilos/vacio/ui";
import { ambientes, estado, nube, respuesta } from "./data";

type P3 = [number, number, number];

const PIEZAS = Array.from({ length: 9 }, (_, i) => ({ src: staticFile(`tec02/piezas/0${i}.png`), alt: "" }));

// Lectura: el nombre de lo que está pasando, fuera del dibujo (regla 10 de hairline).
const Lectura: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ ...tipo.dato, fontSize: 32, color: v.niebla, ...style }}>{children}</div>
);

// Un tramo de recorrido entre dos cuadros, con la curva de morph (expo.inOut).
const tramo = (frame: number, at: number, fps: number, ms = 800) => transicion(frame, at, fps, ms, EXPO_IN_OUT);

// Paquetes que circulan en bucle por un enlace (flujo continuo).
const Flujo: React.FC<{ P: ReturnType<typeof camara>; pts: P3[]; desde: number; hasta?: number; periodo?: number; n?: number; color?: string }> = ({ P, pts, desde, hasta = 1e9, periodo = 36, n = 3, color }) => {
  const frame = useCurrentFrame();
  if (frame < desde || frame > hasta) return null;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const t = ((frame - desde) / periodo + i / n) % 1;
        return <Paquete key={i} P={P} pts={pts} t={t} lado={6} color={color} />;
      })}
    </>
  );
};

// ─── Gancho: el carrusel curvo de lo que rodea a un agente ───────────────────
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cDonde = useCue("donde");
  const cNo = useCueAt("donde", 0.55);
  const cConv = useCue("conversan");
  const tacha = transicion(frame, cNo + 8, fps, 500, EXPO_OUT);
  const palabras = ["grafo", "servidor", "nube"];
  return (
    <Escena>
      <div style={{ position: "absolute", left: -72, top: -60, width: 1080, height: 600 }}>
        <TiltedGridHero
          images={PIEZAS}
          time={frame / fps}
          size={{ width: 1080, height: 600 }}
          speed={1.8}
          tileHeight={50}
          curve={70}
          axis={50}
          fade={10}
          ImageComponent={Img}
          className="h-full w-full"
        />
      </div>
      <div style={{ marginTop: 560 }}>
        <Cinetico at={cDonde} texto="¿Dónde vive|tu agente?" style={{ fontSize: 104 }} />
        <Sube at={cNo} style={{ marginTop: 22 }}>
          <div style={{ ...tipo.subtitulo, fontSize: 56, color: v.ceniza, position: "relative", display: "inline-block" }}>
            No en el prompt.
            <div style={{ position: "absolute", left: 0, top: "56%", height: 3, width: `${tacha * 100}%`, background: v.azafran }} />
          </div>
        </Sube>
        <div style={{ display: "flex", gap: 30, marginTop: 26 }}>
          {palabras.map((p, i) => {
            const k = transicion(frame, cConv + i * 4, fps, 500, backOut);
            return (
              <div key={p} style={{ ...tipo.subtitulo, fontSize: 60, opacity: Math.min(1, k * 1.5), transform: `translateY(${(1 - k) * 40}px) scale(${0.8 + 0.2 * k})` }}>
                {p}
              </div>
            );
          })}
        </div>
      </div>
    </Escena>
  );
};

export const Titulo: React.FC<{ serie: string; autor: string }> = ({ serie, autor }) => (
  <Escena>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, display: "flex", justifyContent: "center" }}>
      <Deriva amp={6}>
        <Constelacion at={-60} ancho={700} forma="red" cantidad={520} />
      </Deriva>
    </div>
    <div style={{ marginTop: 470 }}>
      <Rotulo at={2}>{serie} · 02</Rotulo>
      <Cinetico at={6} texto="El agente|como *grafo*|de estados." size="display" style={{ marginTop: 18 }} />
      <Sube at={26}>
        <div style={{ ...tipo.cuerpo, color: v.niebla, marginTop: 18 }}>por {autor}</div>
      </Sube>
    </div>
  </Escena>
);

// ─── El estado viaja por los tres nodos y se va llenando ─────────────────────
export const Estado: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cObj = useCue("objeto");
  const cCampos = useCueAt("objeto", 0.45);
  const cPasa = useCue("pasa");
  const P = camara(2.6, 456, 230);
  const xs = [-80, 0, 80];
  // Llega desde la izquierda, se procesa en cada nodo y termina guardado en el tercero.
  const entra = tramo(frame, cCampos - 6, fps, 700);
  const leg1 = tramo(frame, cPasa + 14, fps, 800);
  const leg2 = tramo(frame, cPasa + 52, fps, 800);
  const baja = tramo(frame, cPasa + 80, fps, 600);
  const x = leg2 > 0 ? xs[1] + (xs[2] - xs[1]) * leg2 : leg1 > 0 ? xs[0] + (xs[1] - xs[0]) * leg1 : -150 + (xs[0] + 150) * entra;
  const enNodo = baja > 0 ? 2 : leg2 >= 1 ? 2 : leg1 >= 1 ? 1 : entra >= 1 ? 0 : -1;
  const llegadas = [cCampos + 14, cPasa + 14 + 24, cPasa + 52 + 24];
  const llenos = [frame >= cCampos, frame >= cCampos, frame >= cPasa + 4, frame >= cPasa + 4, frame >= cPasa + 46];
  const zc = 46 - 26 * baja;
  return (
    <Escena>
      <Rotulo at={cObj}>El estado</Rotulo>
      <Cinetico at={cObj + 4} texto="Un objeto|que *viaja.*" style={{ marginTop: 18 }} />
      <Deriva style={{ marginTop: 40 }}>
        <Lienzo alto={420}>
          <Solido P={P} x0={-120} y0={-36} x1={120} y1={36} z0={0} z1={6} r={10} />
          <Enlace P={P} pts={[[xs[0], 0, 24], [xs[2], 0, 24]]} discontinuo />
          {xs.map((nx, i) => {
            const sube = resorte(frame, llegadas[i], fps);
            return <Solido key={nx} P={P} x0={nx - 18} y0={-18} x1={nx + 18} y1={18} z0={6} z1={24 + 12 * sube} r={7} luz={enNodo === i} />;
          })}
          {entra > 0 ? (
            <g>
              <Solido P={P} x0={x - 14} y0={-10} x1={x + 14} y1={10} z0={zc} z1={zc + 5} r={3} color={iso.dato} />
              {llenos.map((l, i) => (
                <Punto key={i} P={P} at={[x - 10 + i * 5, 0, zc + 5]} r={3.2} color={l ? iso.dato : iso.tenue} />
              ))}
            </g>
          ) : null}
        </Lienzo>
      </Deriva>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px", marginTop: 10 }}>
        {estado.map((k, i) => (
          <Lectura key={k} style={{ color: llenos[i] ? v.hueso : v.ceniza, opacity: frame >= cCampos ? 1 : 0 }}>
            <span style={{ color: llenos[i] ? v.azafran : v.ceniza }}>●</span> {k}
          </Lectura>
        ))}
      </div>
    </Escena>
  );
};

// ─── Los tres nodos: contexto en paralelo, razonar con esquema, guardar con condición ─
export const Nodos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cReunir = useCue("reunir");
  const cParalelo = useCueAt("reunir", 0.55);
  const cRazonar = useCue("razonar");
  const cValida = useCueAt("razonar", 0.75);
  const cGuardar = useCue("guardar");
  const cCond = useCueAt("guardar", 0.6);
  const P = camara(2.4, 456, 230);
  const N1: P3 = [-30, 0, 30];
  const N2: P3 = [45, 0, 20];
  const N3: P3 = [115, 0, 26];
  const rag: P3[] = [[-105, -55, 34], [-30, -55, 34], N1];
  const mem: P3[] = [[-105, 50, 16], [-30, 50, 16], N1];
  const t1 = tramo(frame, cParalelo, fps, 900);
  const t2 = tramo(frame, cParalelo + 3, fps, 900);
  const t3 = tramo(frame, cRazonar + 8, fps, 800);
  const t4 = tramo(frame, cCond, fps, 800);
  const check = transicion(frame, cValida, fps, 700, EXPO_OUT);
  const tapa = resorte(frame, cCond + 22, fps, { k: 120, c: 12 });
  const activo = frame >= cGuardar ? 2 : frame >= cRazonar ? 1 : 0;
  const anillo: P3[] = Array.from({ length: 33 }, (_, i) => [N2[0] + 30 * Math.cos((i / 32) * Math.PI * 2), 30 * Math.sin((i / 32) * Math.PI * 2), 4]);
  const lecturas = [
    ["01 · Reunir contexto", "búsqueda RAG + memoria del tema, en paralelo"],
    ["02 · Razonar", "prompt → modelo → salida validada con esquema"],
    ["03 · Guardar", "persiste lo aprendido, solo si se cumple la condición"],
  ];
  const cambio = transicion(frame, [cReunir, cRazonar, cGuardar][activo], fps, 500, EXPO_OUT);
  return (
    <Escena>
      <Rotulo at={cReunir}>Tres nodos</Rotulo>
      <Cinetico at={cReunir + 4} texto="Con tres|*basta.*" style={{ marginTop: 18 }} />
      <Deriva style={{ marginTop: 30 }}>
        <Lienzo alto={430}>
          <Enlace P={P} pts={rag} discontinuo opacidad={0.8} />
          <Enlace P={P} pts={mem} discontinuo opacidad={0.8} />
          <Enlace P={P} pts={[N1, N2, N3]} discontinuo />
          <Cilindro P={P} cx={-105} cy={-55} R={16} z0={0} z1={34} />
          <Solido P={P} x0={-125} y0={34} x1={-85} y1={66} z0={0} z1={16} r={4} />
          <Solido P={P} x0={-48} y0={-18} x1={-12} y1={18} z0={0} z1={30} r={7} luz={activo === 0} />
          <Enlace P={P} pts={anillo} avance={check} color={iso.dato} />
          <Solido P={P} x0={25} y0={-20} x1={65} y1={20} z0={0} z1={10} r={5} luz={activo === 1} />
          <Solido P={P} x0={35} y0={-10} x1={55} y1={10} z0={10} z1={20} r={3} luz={activo === 1} />
          <Cilindro P={P} cx={115} cy={0} R={16} z0={0} z1={24} luz={activo === 2} />
          <Cilindro P={P} cx={115} cy={0} R={16} z0={24 + 10 * tapa} z1={27 + 10 * tapa} luz={activo === 2} />
          <Paquete P={P} pts={rag} t={t1} />
          <Paquete P={P} pts={mem} t={t2} />
          <Paquete P={P} pts={[N1, N2]} t={t3} />
          <Paquete P={P} pts={[N2, [115, 0, 40]]} t={t4} />
        </Lienzo>
      </Deriva>
      <div style={{ marginTop: 6, opacity: cambio, transform: `translateY(${(1 - cambio) * 16}px)` }}>
        <div style={{ ...tipo.item, fontSize: 46 }}>{lecturas[activo][0]}</div>
        <Lectura style={{ marginTop: 6 }}>{lecturas[activo][1]}</Lectura>
      </div>
    </Escena>
  );
};

// ─── Por qué un grafo: si se cae, la llamada directa lo rodea ────────────────
export const Porque: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cPlanB = useCue("planb");
  const cCada = useCueAt("planb", 0.5);
  const cDirecto = useCue("directo");
  const cNunca = useCueAt("directo", 0.6);
  const P = camara(2.5, 456, 250);
  const cae = resorte(frame, cDirecto + 4, fps, { k: 140, c: 10 });
  const arco = transicion(frame, cDirecto + 16, fps, 800, EXPO_IN_OUT);
  const curva: P3[] = Array.from({ length: 25 }, (_, i) => {
    const t = i / 24;
    return [-100 + 200 * t, 0, 22 + 70 * Math.sin(Math.PI * t)];
  });
  const linea: P3[] = [[-100, 0, 22], [100, 0, 22]];
  return (
    <Escena>
      <Rotulo at={cPlanB}>¿Por qué un grafo?</Rotulo>
      <Cinetico at={cPlanB + 4} texto="Cada nodo|se prueba *solo.*" style={{ marginTop: 18 }} />
      <Sube at={cCada}>
        <Lectura style={{ marginTop: 18 }}>se mide solo · tiene su propio plan B</Lectura>
      </Sube>
      <Deriva style={{ marginTop: 30 }}>
        <Lienzo alto={420}>
          <Enlace P={P} pts={linea} discontinuo opacidad={1 - cae * 0.6} />
          <Enlace P={P} pts={curva} avance={arco} color={iso.activo} grosor={3} />
          <Solido P={P} x0={-125} y0={-22} x1={-75} y1={22} z0={0} z1={34} r={6} />
          <Solido P={P} x0={-16} y0={-16} x1={16} y1={16} z0={0} z1={Math.max(5, 32 - 26 * cae)} r={6} opacidad={1 - 0.5 * cae} />
          <Solido P={P} x0={80} y0={-20} x1={120} y1={20} z0={0} z1={10} r={5} luz={arco >= 1} />
          <Solido P={P} x0={90} y0={-10} x1={110} y1={10} z0={10} z1={20} r={3} luz={arco >= 1} />
          <Flujo P={P} pts={linea} desde={cPlanB} hasta={cDirecto + 2} />
          <Flujo P={P} pts={curva} desde={cDirecto + 40} periodo={40} />
        </Lienzo>
      </Deriva>
      <Cinetico at={cNunca} texto="El usuario nunca *ve el error.*" size="subtitulo" style={{ fontSize: 52, marginTop: 10 }} />
    </Escena>
  );
};

// ─── La interfaz: pide, espera, recibe un objeto tipado y lo pinta ───────────
export const Frontend: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cNoSabe = useCue("nosabe");
  const cTipado = useCue("tipado");
  const cRecibe = useCueAt("tipado", 0.6);
  const cRender = useCue("renderizar");
  const P = camara(2.4, 456, 260);
  const ida = tramo(frame, cTipado + 4, fps, 900);
  const vuelta = tramo(frame, cRecibe, fps, 900);
  const abre = resorte(frame, cRender, fps, { k: 110, c: 14 });
  const gap = 8 + 16 * abre;
  const espera = frame > cTipado + 30 && frame < cRecibe ? 0.5 + 0.5 * Math.sin(frame * 0.4) : 0;
  const pide: P3[] = [[-55, 0, 34], [75, 0, 34]];
  const xv = 75 - 130 * vuelta;
  return (
    <Escena>
      <Rotulo at={cNoSabe}>La interfaz</Rotulo>
      <Cinetico at={cNoSabe + 4} texto="No sabe que|hay un *grafo.*" style={{ marginTop: 18 }} />
      <Deriva style={{ marginTop: 20 }}>
        <Lienzo alto={400}>
          <Enlace P={P} pts={pide} discontinuo />
          {[2, 1, 0].map((i) => (
            <Solido key={i} P={P} x0={-110} y0={-30 + i * gap} x1={-55} y1={-26 + i * gap} z0={4} z1={66} r={2} b={1} luz={i === 0 && abre > 0.3} />
          ))}
          <Solido P={P} x0={60} y0={-28} x1={110} y1={28} z0={0} z1={48} r={6} luz={espera > 0.5} />
          <Paquete P={P} pts={pide} t={ida} lado={8} />
          {vuelta > 0 && vuelta < 1 ? <Solido P={P} x0={xv - 12} y0={-9} x1={xv + 12} y1={9} z0={34} z1={37} r={2} color={iso.luz} /> : null}
        </Lienzo>
      </Deriva>
      <div style={{ ...tipo.dato, fontSize: 32, lineHeight: 1.5 }}>
        {respuesta.campos.map((c, i) => {
          const k = transicion(frame, cRecibe + 22 + i * 3, fps, 500, EXPO_OUT);
          return (
            <div key={c.k} style={{ opacity: k, transform: `translateX(${(1 - k) * 24}px)` }}>
              <span style={{ color: v.ceniza }}>{c.k} → </span>
              <span style={{ color: v.hueso, fontWeight: 400 }}>{c.v.replace(/"/g, "")}</span>
            </div>
          );
        })}
      </div>
      <Cinetico at={cRender} texto="Renderiza. *No razona.*" size="subtitulo" style={{ fontSize: 56, marginTop: 20 }} />
    </Escena>
  );
};

// ─── El servidor: un rack de rebanadas que se deslizan, y la auth que las cruza ─
export const Backend: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cReb = useCue("rebanadas");
  const cCapas = useCueAt("rebanadas", 0.45);
  const cAuth = useCue("auth");
  const cInyecta = useCueAt("auth", 0.5);
  const P = camara(2.5, 456, 280);
  const columnas = ["agente", "conocimiento", "usuarios", "calendario"];
  const baja = tramo(frame, cInyecta, fps, 1200);
  return (
    <Escena>
      <Rotulo at={cReb}>El servidor</Rotulo>
      <Cinetico at={cReb + 4} texto="Rebanadas|*verticales.*" style={{ marginTop: 18 }} />
      <Deriva style={{ marginTop: 20 }}>
        <Lienzo alto={430}>
          <Solido P={P} x0={-50} y0={-36} x1={50} y1={36} z0={0} z1={8} r={6} />
          {[3, 2, 1, 0].map((i) => {
            // Escalonado por distancia desde la rebanada del agente (regla 02): 40 ms por paso.
            const sale = resorte(frame, cReb + 10 + i * 1.2, fps);
            const dy = (i === 0 ? 30 : 12) * sale;
            const z = 12 + (3 - i) * 16;
            const capas = [0, 1, 2].map((j) => transicion(frame, cCapas + j * 4 + i * 2, fps, 600, EXPO_OUT));
            const tocada = baja * 4 > 3 - i + 0.5;
            return (
              <g key={i}>
                <Solido P={P} x0={-44} y0={-30 + dy} x1={44} y1={30 + dy} z0={z} z1={z + 10} r={4} luz={i === 0} />
                {capas.map((k, j) =>
                  k > 0 ? <Solido key={j} P={P} x0={-36 + j * 26} y0={-2 + dy + 14} x1={-16 + j * 26} y1={12 + dy + 14} z0={z + 10} z1={z + 10 + 4 * k} r={2} b={1} color={i === 0 ? iso.luz : iso.medio} /> : null,
                )}
                {tocada ? <Punto P={P} at={[44, 30 + dy - 6, z + 6]} r={4.5} color={iso.dato} /> : null}
              </g>
            );
          })}
          {frame >= cAuth ? (
            <>
              <Solido P={P} x0={52} y0={20} x1={58} y1={60} z0={8} z1={86} r={2} b={1} luz={frame >= cInyecta} />
              {baja > 0 && baja < 1 ? <Punto P={P} at={[55, 40, 86 - 74 * baja]} r={6} color={iso.dato} /> : null}
            </>
          ) : null}
        </Lienzo>
      </Deriva>
      <div style={{ display: "flex", gap: 24 }}>
        {columnas.map((c, i) => (
          <Lectura key={c} style={{ color: i === 0 ? v.azafran : v.ceniza, fontSize: 28 }}>
            {c}
          </Lectura>
        ))}
      </div>
      <Sube at={cCapas}>
        <Lectura style={{ marginTop: 6 }}>router · service · schema</Lectura>
      </Sube>
      <Cinetico at={cAuth} texto="La *auth* se inyecta." size="subtitulo" style={{ fontSize: 56, marginTop: 18 }} />
    </Escena>
  );
};

// ─── La nube: una región que se arma pieza a pieza ───────────────────────────
export const Nube: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cAdm = useCue("administrados");
  const cBases = useCue("bases");
  const cProxy = useCue("proxy");
  const P = camara(2.3, 456, 240);
  const crece = (at: number) => resorte(frame, at, fps, { k: 120, c: 14 });
  const plato = transicion(frame, cAdm - 4, fps, 700, EXPO_OUT);
  const piezas = [cAdm + 8, cBases, cBases + 10, cProxy, cProxy + 12];
  const entrada: P3[] = [[95, 150, 8], [95, 70, 8], [60, 10, 8]];
  return (
    <Escena>
      <Rotulo at={cAdm}>La nube</Rotulo>
      <Cinetico at={cAdm + 4} texto="Todo|*administrado.*" style={{ marginTop: 18 }} />
      <Deriva style={{ marginTop: 10 }}>
        <Lienzo alto={420}>
          {plato > 0.01 ? <Solido P={P} x0={-130 * plato} y0={-90 * plato} x1={130 * plato} y1={90 * plato} z0={0} z1={4} r={14} opacidad={plato} /> : null}
          <Enlace P={P} pts={entrada} discontinuo opacidad={frame >= cProxy + 12 ? 1 : 0} />
          {crece(piezas[0]) > 0.01 ? (
            <>
              <Solido P={P} x0={-30} y0={-75} x1={20} y1={-30} z0={4} z1={4 + 12 * crece(piezas[0])} r={6} luz={frame < cBases} />
              <Solido P={P} x0={-17} y0={-62} x1={7} y1={-43} z0={16} z1={16 + 10 * crece(piezas[0])} r={3} luz={frame < cBases} />
            </>
          ) : null}
          {crece(piezas[1]) > 0.01 ? <Cilindro P={P} cx={-90} cy={-20} R={20} z0={4} z1={4 + 40 * crece(piezas[1])} luz={frame >= cBases && frame < cProxy} /> : null}
          {crece(piezas[2]) > 0.01 ? <Cilindro P={P} cx={-60} cy={45} R={20} z0={4} z1={4 + 30 * crece(piezas[2])} /> : null}
          {[0, 1, 2, 3].map((i) => {
            const k = crece(piezas[3] + i * 3);
            const late = k > 0.9 ? 0.5 + 0.5 * Math.sin(frame * 0.18 + i * 1.6) : 0;
            return k > 0.01 ? <Solido key={i} P={P} x0={30 + i * 24} y0={-60} x1={48 + i * 24} y1={-42} z0={4} z1={4 + (14 + 6 * late) * k} r={3} luz={late > 0.85} /> : null;
          })}
          {crece(piezas[4]) > 0.01 ? (
            <>
              <Solido P={P} x0={78} y0={60} x1={86} y1={68} z0={4} z1={4 + 30 * crece(piezas[4])} r={2} />
              <Solido P={P} x0={104} y0={60} x1={112} y1={68} z0={4} z1={4 + 30 * crece(piezas[4])} r={2} />
              <Solido P={P} x0={78} y0={60} x1={112} y1={68} z0={34} z1={38} r={2} luz />
            </>
          ) : null}
          <Flujo P={P} pts={entrada} desde={cProxy + 24} periodo={42} n={2} />
        </Lienzo>
      </Deriva>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {nube.map((n, i) => {
          const k = transicion(frame, piezas[i], fps, 500, EXPO_OUT);
          return (
            <div key={n.nombre} style={{ display: "flex", gap: 18, alignItems: "baseline", opacity: 0.25 + 0.75 * k, transform: `translateX(${(1 - k) * 20}px)` }}>
              <div style={{ ...tipo.item, fontSize: 36, width: 400, whiteSpace: "nowrap" }}>{n.nombre}</div>
              <Lectura style={{ fontSize: 26 }}>{n.detalle}</Lectura>
            </div>
          );
        })}
      </div>
    </Escena>
  );
};

// ─── Configuración: la misma hoja viaja por los ambientes; la infra se declara igual ─
export const Config: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cAmb = useCue("ambientes");
  const cVive = useCueAt("ambientes", 0.55);
  const cIac = useCue("iac");
  const P = camara(2.5, 456, 250);
  const xs = [-90, 0, 90];
  const pasos = [cAmb + 6, cAmb + 34, cAmb + 62];
  const sel = frame >= pasos[2] ? 2 : frame >= pasos[1] ? 1 : 0;
  const hx = sel === 0 ? xs[0] : xs[sel - 1] + (xs[sel] - xs[sel - 1]) * tramo(frame, pasos[sel], fps, 700);
  const aterriza = transicion(frame, pasos[sel] + 18, fps, 400, EXPO_OUT);
  const lineas = [
    ["modelo", "configurable"],
    ["umbral", "0.87"],
    ["trozo", "800 / 150"],
  ];
  return (
    <Escena>
      <Rotulo at={cAmb}>Configuración</Rotulo>
      <Cinetico at={cAmb + 4} texto="Lo que cambia,|*no es código.*" style={{ marginTop: 18 }} />
      <Deriva style={{ marginTop: 20 }}>
        <Lienzo alto={380}>
          {xs.map((x, i) => (
            <Solido key={x} P={P} x0={x - 32} y0={-32} x1={x + 32} y1={32} z0={0} z1={6} r={8} luz={sel === i && aterriza > 0.5} />
          ))}
          {xs.map((x, i) =>
            [0, 1, 2].map((j) => {
              // Escalonado por distancia desde el ambiente de producción.
              const k = resorte(frame, cIac + 8 + Math.abs(2 - i) * 2 + j * 2, fps);
              return k > 0.01 ? <Solido key={`${i}-${j}`} P={P} x0={x - 24 + j * 17} y0={-8} x1={x - 12 + j * 17} y1={8} z0={6} z1={6 + (10 + j * 6) * k} r={2} /> : null;
            }),
          )}
          <Solido P={P} x0={hx - 20} y0={-14} x1={hx + 20} y1={14} z0={34 - 14 * aterriza} z1={37 - 14 * aterriza} r={3} color={iso.dato} />
        </Lienzo>
      </Deriva>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0 70px" }}>
        {ambientes.map((a, i) => (
          <Lectura key={a} style={{ color: sel === i ? v.hueso : v.ceniza, borderBottom: `3px solid ${sel === i ? v.azafran : "transparent"}`, paddingBottom: 6 }}>
            {a}
          </Lectura>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        {lineas.map(([k, val], i) => {
          const p = transicion(frame, cVive + i * 4, fps, 500, EXPO_OUT);
          return (
            <Lectura key={k} style={{ opacity: p, transform: `translateX(${(1 - p) * 20}px)` }}>
              {k}: <span style={{ color: v.hueso, fontWeight: 400 }}>{val}</span>
            </Lectura>
          );
        })}
      </div>
      <Cinetico at={cIac} texto="Infraestructura *como código.*" size="subtitulo" style={{ fontSize: 52, marginTop: 16 }} />
    </Escena>
  );
};

// ─── En producción: tres miniaturas en movimiento ────────────────────────────
const Mini: React.FC<{ at: number; n: string; titulo: React.ReactNode; detalle: string; children: React.ReactNode }> = ({ at, n, titulo, detalle, children }) => (
  <Sube at={at}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, height: 290 }}>
      <svg width={400} height={260} style={{ overflow: "visible", flexShrink: 0 }}>
        {children}
      </svg>
      <div>
        <div style={{ ...tipo.dato, color: v.ceniza }}>{n}</div>
        <div style={{ ...tipo.titulo, fontSize: 76 }}>{titulo}</div>
        <Lectura style={{ fontSize: 28, marginTop: 6 }}>{detalle}</Lectura>
      </div>
    </div>
  </Sube>
);

export const Detalles: React.FC = () => {
  const frame = useCurrentFrame();
  const cAsync = useCue("async");
  const cSingle = useCue("singleton");
  const cSalud = useCue("salud");
  const Pa = camara(1.9, 200, 130);
  const Ps = camara(1.9, 200, 140);
  const Ph = camara(1.9, 200, 160);
  const carriles: P3[][] = [-30, 0, 30].map((y) => [[-80, y, 6], [80, y, 6]]);
  const hojas: P3[] = [[-70, -40, 8], [70, -40, 8], [-70, 40, 8], [70, 40, 8]];
  const pulso = (((frame - cSalud) % 40) + 40) % 40 / 40;
  const ecg = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    const y = t > 0.42 && t < 0.58 ? Math.sin(((t - 0.42) / 0.16) * Math.PI * 2) * (t < 0.5 ? 60 : 30) : 0;
    return [20 + t * 360, 70 - y] as [number, number];
  });
  const vis = Math.max(0, Math.min(ecg.length, Math.floor(pulso * ecg.length * 1.4)));
  return (
    <Escena>
      <Rotulo at={cAsync}>En producción</Rotulo>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column" }}>
        <Mini at={cAsync} n="01" titulo="Asíncrono." detalle="nada bloquea el servidor">
          {carriles.map((c, i) => (
            <Enlace key={i} P={Pa} pts={c} color={iso.tenue} />
          ))}
          {carriles.map((c, i) => (
            <Flujo key={`f${i}`} P={Pa} pts={c} desde={cAsync} periodo={30 + i * 11} n={2} />
          ))}
        </Mini>
        <Mini
          at={cSingle}
          n="02"
          titulo={
            <>
              Clientes <span style={{ color: v.azafran }}>×1.</span>
            </>
          }
          detalle="se crean una vez y se reutilizan"
        >
          {hojas.map((h, i) => (
            <Enlace key={i} P={Ps} pts={[[0, 0, 14], h]} color={iso.tenue} />
          ))}
          {hojas.map((h, i) => (
            <Solido key={`h${i}`} P={Ps} x0={h[0] - 12} y0={h[1] - 12} x1={h[0] + 12} y1={h[1] + 12} z0={0} z1={10} r={3} />
          ))}
          <Solido P={Ps} x0={-18} y0={-18} x1={18} y1={18} z0={0} z1={16} r={5} luz />
          {hojas.map((h, i) => (
            <Flujo key={`p${i}`} P={Ps} pts={[[0, 0, 16], [h[0], h[1], 10]]} desde={cSingle + i * 5} periodo={36} n={1} />
          ))}
        </Mini>
        <Mini
          at={cSalud}
          n="03"
          titulo={
            <>
              /health <span style={{ color: v.azafran }}>200</span>
            </>
          }
          detalle="sin auth: la plataforma sabe que vive"
        >
          <Solido P={Ph} x0={-30} y0={-30} x1={30} y1={30} z0={0} z1={22} r={6} />
          {frame >= cSalud && vis > 1 ? (
            <>
              <path d={`M${ecg.slice(0, vis).map((p) => `${p[0]},${p[1]}`).join("L")}`} fill="none" stroke={v.azafran} strokeWidth={3} strokeLinejoin="round" transform="translate(0,-20)" />
              <circle cx={ecg[vis - 1][0]} cy={ecg[vis - 1][1] - 20} r={6} fill={v.azafran} />
            </>
          ) : null}
        </Mini>
      </div>
    </Escena>
  );
};

export const Cierre: React.FC<{ autor: string }> = ({ autor }) => {
  const cCerebro = useCue("cerebro");
  const cSin = useCueAt("cerebro", 0.4);
  const cCta = useCue("cta");
  return (
    <Escena>
      <div style={{ position: "absolute", left: -80, right: -80, top: -70, display: "flex", justifyContent: "center" }}>
        <Deriva amp={5} zoom={0.06}>
          <Constelacion at={cCerebro - 30} ancho={780} forma="cerebro" desde="red" cambio={cCerebro} />
        </Deriva>
      </div>
      <div style={{ marginTop: 570 }}>
        <Cinetico at={cCerebro} texto="Cerebro|con *cuerpo.*" style={{ fontSize: 100 }} />
        <Cinetico at={cSin} texto="interfaz · servidor · nube" size="subtitulo" color={v.niebla} style={{ fontSize: 48, marginTop: 24 }} />
        <div style={{ marginTop: 44, display: "flex", alignItems: "center", gap: 28 }}>
          <Pildora at={cCta}>Compártelo · Sígueme</Pildora>
          <Sube at={cCta + 8}>
            <div style={{ ...tipo.dato, color: v.ceniza }}>{autor}</div>
          </Sube>
        </div>
      </div>
    </Escena>
  );
};
