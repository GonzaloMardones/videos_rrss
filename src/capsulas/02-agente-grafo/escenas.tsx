import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { useCue, useCueAt } from "../../components/narracion";
import { Constelacion } from "../../estilos/vacio/Particulas";
import { fuente, tipo, v } from "../../estilos/vacio/tokens";
import { Acento, Cuerpo, Escena, Pildora, Rotulo, Sube, Titular } from "../../estilos/vacio/ui";
import { ambientes, estado, nodos, nube, respuesta } from "./data";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Fila de lista: número fino, nombre en blanco y detalle liviano. Sin cajas.
const Item: React.FC<{ at: number; n: string; nombre: React.ReactNode; detalle?: React.ReactNode; activo?: boolean }> = ({ at, n, nombre, detalle, activo = true }) => (
  <Sube at={at} dist={24}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 28, opacity: activo ? 1 : 0.35 }}>
      <div style={{ ...tipo.dato, color: v.ceniza, width: 56, fontVariantNumeric: "tabular-nums" }}>{n}</div>
      <div>
        <div style={{ ...tipo.item, color: v.hueso }}>{nombre}</div>
        {detalle ? <div style={{ ...tipo.dato, color: v.niebla, marginTop: 6 }}>{detalle}</div> : null}
      </div>
    </div>
  </Sube>
);

// Nodo del grafo: un círculo de trazo fino; el activo se llena de violeta.
const Punto: React.FC<{ activo: boolean; listo: boolean; size?: number }> = ({ activo, listo, size = 34 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      border: `2px solid ${listo ? v.iris : v.ceniza}`,
      background: activo ? v.iris : "transparent",
      boxShadow: activo ? `0 0 0 10px rgba(128,82,255,0.18)` : "none",
    }}
  />
);

// Gancho: la constelación se arma mientras aparece la pregunta.
export const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const cDonde = useCue("donde");
  const cNo = useCueAt("donde", 0.55);
  const cConv = useCue("conversan");
  const tacha = interpolate(frame - cNo, [0, 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <Escena>
      <div style={{ position: "absolute", left: -80, right: -80, top: -70, display: "flex", justifyContent: "center" }}>
        <Constelacion at={cDonde - 10} ancho={820} />
      </div>
      <div style={{ marginTop: 600 }}>
        <Titular at={cDonde} size="titulo" style={{ fontSize: 100 }}>
          ¿Dónde vive
          <br />
          tu agente?
        </Titular>
        <Sube at={cNo} style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ ...tipo.subtitulo, fontSize: 56, color: v.ceniza, position: "relative" }}>
            No en el prompt.
            <div style={{ position: "absolute", left: 0, top: "55%", height: 3, width: `${tacha * 100}%`, background: v.azafran }} />
          </div>
        </Sube>
        <Sube at={cConv} style={{ marginTop: 24 }}>
          <div style={{ ...tipo.subtitulo, fontSize: 56 }}>
            grafo <Acento color={v.ceniza}>·</Acento> servidor <Acento color={v.ceniza}>·</Acento> nube
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
    <div style={{ marginTop: 470 }}>
      <Rotulo at={2}>{serie} · 02</Rotulo>
      <Titular at={6} size="display">
        El agente
        <br />
        como <Acento>grafo</Acento>
        <br />
        de estados.
      </Titular>
      <Cuerpo at={18}>por {autor}</Cuerpo>
    </div>
  </Escena>
);

// El estado: un objeto que se llena al pasar por los tres nodos.
export const Estado: React.FC = () => {
  const frame = useCurrentFrame();
  const cObj = useCue("objeto");
  const cCampos = useCueAt("objeto", 0.45);
  const cPasa = useCue("pasa");
  const avanza = interpolate(frame - cPasa - 4, [0, 50], [0, 1], clamp);
  const paso = Math.min(2, Math.floor(avanza * 3));
  const lleno = (i: number) => i < 2 || ((i === 2 || i === 3) && paso >= 1 && frame >= cPasa) || (i === 4 && paso >= 2);
  return (
    <Escena>
      <Rotulo at={cObj}>El estado</Rotulo>
      <Titular at={cObj + 4}>
        Un objeto
        <br />
        que <Acento>viaja.</Acento>
      </Titular>
      <div style={{ marginTop: 50, display: "flex", flexDirection: "column", gap: 14 }}>
        {estado.map((k, i) => (
          <Sube key={k} at={cCampos + i * 6} dist={14}>
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <div style={{ ...tipo.dato, fontSize: 36, color: lleno(i) ? v.hueso : v.ceniza, width: 340 }}>{k}</div>
              <div style={{ height: 2, flex: 1, background: lleno(i) ? v.azafran : "rgba(255,255,255,0.14)" }} />
            </div>
          </Sube>
        ))}
      </div>
      <Sube at={cPasa} style={{ marginTop: 70 }}>
        <div style={{ position: "relative", height: 120 }}>
          <div style={{ position: "absolute", left: 17, right: 17, top: 16, height: 2, background: "rgba(255,255,255,0.14)" }} />
          <div style={{ position: "absolute", left: 17, top: 16, height: 2, width: `calc((100% - 34px) * ${avanza})`, background: v.iris }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {nodos.map((n, i) => (
              <div key={n.nombre} style={{ display: "flex", flexDirection: "column", alignItems: i === 0 ? "flex-start" : i === 2 ? "flex-end" : "center", gap: 18 }}>
                <Punto activo={paso === i && frame >= cPasa} listo={paso >= i && frame >= cPasa} />
                <div style={{ ...tipo.dato, color: paso >= i ? v.hueso : v.ceniza }}>{n.nombre}</div>
              </div>
            ))}
          </div>
        </div>
      </Sube>
    </Escena>
  );
};

// Los tres nodos, uno debajo del otro.
export const Nodos: React.FC = () => {
  const frame = useCurrentFrame();
  const cReunir = useCue("reunir");
  const cParalelo = useCueAt("reunir", 0.55);
  const cRazonar = useCue("razonar");
  const cValida = useCueAt("razonar", 0.75);
  const cGuardar = useCue("guardar");
  const cCond = useCueAt("guardar", 0.6);
  const activo = frame >= cGuardar ? 2 : frame >= cRazonar ? 1 : 0;
  return (
    <Escena>
      <Rotulo at={cReunir}>Tres nodos</Rotulo>
      <Titular at={cReunir + 4} size="subtitulo" style={{ fontSize: 80 }}>
        Con tres <Acento>basta.</Acento>
      </Titular>
      <div style={{ marginTop: 80, display: "flex", flexDirection: "column", gap: 80 }}>
        <Item
          at={cReunir + 8}
          n="01"
          activo={activo === 0}
          nombre="Reunir contexto"
          detalle={
            <>
              búsqueda RAG <Acento>+</Acento> memoria del tema
              <span style={{ color: v.azafran, opacity: frame >= cParalelo ? 1 : 0 }}> · en paralelo</span>
            </>
          }
        />
        <Item
          at={cRazonar}
          n="02"
          activo={activo === 1}
          nombre="Razonar"
          detalle={
            <>
              prompt → modelo → esquema <span style={{ color: v.azafran, opacity: frame >= cValida ? 1 : 0 }}>✓ validado</span>
            </>
          }
        />
        <Item
          at={cGuardar}
          n="03"
          activo={activo === 2}
          nombre="Guardar"
          detalle={
            <>
              persiste lo aprendido <span style={{ color: v.azafran, opacity: frame >= cCond ? 1 : 0 }}>· solo si se cumple la condición</span>
            </>
          }
        />
      </div>
    </Escena>
  );
};

// Por qué un grafo: el desvío cuando el grafo entero falla.
export const Porque: React.FC = () => {
  const frame = useCurrentFrame();
  const cPlanB = useCue("planb");
  const cCada = useCueAt("planb", 0.5);
  const cDirecto = useCue("directo");
  const cNunca = useCueAt("directo", 0.6);
  const rompe = interpolate(frame - cDirecto - 4, [0, 12], [0, 1], clamp);
  const desvio = interpolate(frame - cDirecto - 14, [0, 30], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <Escena>
      <Rotulo at={cPlanB}>¿Por qué un grafo?</Rotulo>
      <Titular at={cPlanB + 4}>
        Cada nodo
        <br />
        se prueba <Acento>solo.</Acento>
      </Titular>
      <Sube at={cCada} style={{ marginTop: 30 }}>
        <div style={{ ...tipo.cuerpo, color: v.niebla }}>se mide solo · tiene su propio plan B</div>
      </Sube>
      <Sube at={cDirecto} style={{ marginTop: 90 }}>
        <svg width={912} height={300} style={{ overflow: "visible" }}>
          <line x1={40} y1={80} x2={872} y2={80} stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
          <circle cx={40} cy={80} r={16} fill={v.iris} />
          <circle cx={456} cy={80} r={16} fill="none" stroke={v.ceniza} strokeWidth={2} opacity={1 - rompe * 0.7} />
          <circle cx={872} cy={80} r={16} fill="none" stroke={v.hueso} strokeWidth={2} />
          <g opacity={rompe} stroke={v.azafran} strokeWidth={3} strokeLinecap="round">
            <line x1={440} y1={64} x2={472} y2={96} />
            <line x1={472} y1={64} x2={440} y2={96} />
          </g>
          <path d="M40 80 C 40 250, 872 250, 872 80" stroke={v.iris} strokeWidth={3} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - desvio} />
          <text x={40} y={40} fill={v.ceniza} fontFamily={fuente} fontSize={26} fontWeight={200}>
            servidor
          </text>
          <text x={456} y={40} fill={v.ceniza} fontFamily={fuente} fontSize={26} fontWeight={200} textAnchor="middle">
            grafo
          </text>
          <text x={872} y={40} fill={v.ceniza} fontFamily={fuente} fontSize={26} fontWeight={200} textAnchor="end">
            modelo
          </text>
          <text x={456} y={260} fill={v.hueso} fontFamily={fuente} fontSize={32} fontWeight={400} textAnchor="middle" opacity={desvio}>
            llamada directa
          </text>
        </svg>
      </Sube>
      <Cuerpo at={cNunca} style={{ color: v.hueso, fontSize: 44, fontWeight: 400, letterSpacing: "-0.02em" }}>
        El usuario nunca ve el error.
      </Cuerpo>
    </Escena>
  );
};

// La interfaz: petición, espera, objeto tipado.
export const Frontend: React.FC = () => {
  const frame = useCurrentFrame();
  const cNoSabe = useCue("nosabe");
  const cTipado = useCue("tipado");
  const cRecibe = useCueAt("tipado", 0.6);
  const cRender = useCue("renderizar");
  const ida = interpolate(frame - cTipado - 4, [0, 24], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const vuelta = interpolate(frame - cRecibe, [0, 24], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const enViaje = ida > 0 && vuelta < 1;
  const x = vuelta > 0 ? 1 - vuelta : ida;
  return (
    <Escena>
      <Rotulo at={cNoSabe}>La interfaz</Rotulo>
      <Titular at={cNoSabe + 4}>
        No sabe
        <br />
        que hay un <Acento>grafo.</Acento>
      </Titular>
      <Sube at={cTipado} style={{ marginTop: 70, position: "relative", height: 90 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 30, height: 2, background: "rgba(255,255,255,0.14)" }} />
        <div style={{ position: "absolute", left: 0, top: 50, ...tipo.dato, color: v.niebla }}>interfaz</div>
        <div style={{ position: "absolute", right: 0, top: 50, ...tipo.dato, color: v.niebla }}>endpoint</div>
        <div style={{ position: "absolute", left: 0, top: 14, width: 32, height: 32, borderRadius: 16, background: v.hueso }} />
        <div style={{ position: "absolute", right: 0, top: 14, width: 32, height: 32, borderRadius: 16, border: `2px solid ${v.hueso}` }} />
        <div style={{ position: "absolute", left: `calc(${x * 100}% - ${x * 32}px)`, top: -30, opacity: enViaje ? 1 : 0, ...tipo.rotulo, fontSize: 24, color: vuelta > 0 ? v.azafran : v.iris }}>
          {vuelta > 0 ? "JSON" : "POST"}
        </div>
      </Sube>
      <Sube at={cRecibe} style={{ marginTop: 60 }}>
        <div style={{ ...tipo.dato, fontSize: 36, lineHeight: 1.55 }}>
          {respuesta.campos.map((c, i) => (
            <div key={c.k} style={{ opacity: interpolate(frame, [cRecibe + 8 + i * 5, cRecibe + 14 + i * 5], [0, 1], clamp) }}>
              <span style={{ color: v.ceniza }}>{c.k}</span>
              <span style={{ color: v.ceniza }}> → </span>
              <span style={{ color: v.hueso, fontWeight: 400 }}>{c.v.replace(/"/g, "")}</span>
            </div>
          ))}
        </div>
      </Sube>
      <Titular at={cRender} size="subtitulo" style={{ marginTop: 50 }}>
        Renderiza. <Acento>No razona.</Acento>
      </Titular>
    </Escena>
  );
};

// El servidor: rebanadas verticales y auth inyectada.
export const Backend: React.FC = () => {
  const frame = useCurrentFrame();
  const cReb = useCue("rebanadas");
  const cCapas = useCueAt("rebanadas", 0.45);
  const cAuth = useCue("auth");
  const cInyecta = useCueAt("auth", 0.5);
  const columnas = ["agente", "conocimiento", "usuarios", "calendario"];
  const capas = ["router", "service", "schema"];
  const auth = interpolate(frame - cInyecta, [0, 20], [0, 1], clamp);
  return (
    <Escena>
      <Rotulo at={cReb}>El servidor</Rotulo>
      <Titular at={cReb + 4}>
        Rebanadas
        <br />
        <Acento>verticales.</Acento>
      </Titular>
      <div style={{ marginTop: 60, display: "flex", gap: 22 }}>
        {columnas.map((c, i) => (
          <Sube key={c} at={cReb + 10 + i * 4} style={{ flex: 1 }}>
            <div style={{ ...tipo.dato, fontSize: 28, color: i === 0 ? v.azafran : v.ceniza, fontWeight: i === 0 ? 400 : 200 }}>{c}</div>
            {capas.map((k, j) => (
              <div key={k} style={{ marginTop: 18, opacity: interpolate(frame, [cCapas + j * 6, cCapas + j * 6 + 8], [0, 1], clamp) }}>
                <div style={{ height: 2, background: i === 0 ? v.iris : "rgba(255,255,255,0.2)" }} />
                <div style={{ ...tipo.dato, fontSize: 30, color: i === 0 ? v.hueso : v.ceniza, marginTop: 10 }}>{k}</div>
              </div>
            ))}
          </Sube>
        ))}
      </div>
      <Sube at={cAuth} style={{ marginTop: 80 }}>
        <div style={{ ...tipo.subtitulo, fontSize: 56 }}>
          La <Acento>auth</Acento> se inyecta.
        </div>
        <div style={{ display: "flex", gap: 22, marginTop: 24 }}>
          {columnas.map((c) => (
            <div key={c} style={{ flex: 1, height: 2, background: v.azafran, opacity: auth, transform: `scaleX(${auth})`, transformOrigin: "left" }} />
          ))}
        </div>
        <div style={{ ...tipo.dato, color: v.niebla, marginTop: 16 }}>ningún endpoint la implementa a mano</div>
      </Sube>
    </Escena>
  );
};

// La nube: lista sobria de cinco piezas.
export const Nube: React.FC = () => {
  const cAdm = useCue("administrados");
  const cBases = useCue("bases");
  const cProxy = useCue("proxy");
  const cues = [cAdm + 8, cBases, cBases + 10, cProxy, cProxy + 12];
  return (
    <Escena>
      <div style={{ position: "absolute", right: -420, top: 330, opacity: 0.32 }}>
        <Constelacion at={cAdm - 20} ancho={760} forma="anillo" cantidad={300} semilla={23} />
      </div>
      <Rotulo at={cAdm}>La nube</Rotulo>
      <Titular at={cAdm + 4}>
        Todo
        <br />
        <Acento>administrado.</Acento>
      </Titular>
      <div style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 34 }}>
        {nube.map((n, i) => (
          <Item key={n.nombre} at={cues[i]} n={`0${i + 1}`} nombre={n.nombre} detalle={n.detalle} />
        ))}
      </div>
    </Escena>
  );
};

// Configuración por ambiente e infraestructura como código.
export const Config: React.FC = () => {
  const frame = useCurrentFrame();
  const cAmb = useCue("ambientes");
  const cVive = useCueAt("ambientes", 0.55);
  const cIac = useCue("iac");
  const sel = Math.min(2, Math.floor(interpolate(frame, [cAmb + 6, cAmb + 60], [0, 3], clamp)));
  const lineas = [
    ["modelo", "configurable"],
    ["umbral", "0.87"],
    ["trozo", "800 / 150"],
  ];
  return (
    <Escena>
      <Rotulo at={cAmb}>Configuración</Rotulo>
      <Titular at={cAmb + 4}>
        Lo que cambia,
        <br />
        <Acento>no es código.</Acento>
      </Titular>
      <Sube at={cAmb + 10} style={{ marginTop: 60, display: "flex", gap: 40 }}>
        {ambientes.map((a, i) => (
          <div key={a}>
            <div style={{ ...tipo.item, fontSize: 44, color: sel === i ? v.hueso : v.ceniza }}>{a}</div>
            <div style={{ height: 3, marginTop: 10, background: v.azafran, opacity: sel === i ? 1 : 0 }} />
          </div>
        ))}
      </Sube>
      <Sube at={cVive} style={{ marginTop: 50 }}>
        {lineas.map(([k, val], i) => (
          <div key={k} style={{ ...tipo.dato, fontSize: 36, opacity: interpolate(frame, [cVive + i * 6, cVive + i * 6 + 8], [0, 1], clamp) }}>
            <span style={{ color: v.ceniza }}>{k}: </span>
            <span style={{ color: v.hueso, fontWeight: 400 }}>{val}</span>
          </div>
        ))}
      </Sube>
      <Sube at={cIac} style={{ marginTop: 70 }}>
        <div style={{ ...tipo.subtitulo, fontSize: 56 }}>
          Infraestructura <Acento>como código.</Acento>
        </div>
        <div style={{ ...tipo.dato, color: v.niebla, marginTop: 12 }}>un espacio de trabajo por ambiente</div>
      </Sube>
    </Escena>
  );
};

// Detalles de producción: tres afirmaciones grandes.
export const Detalles: React.FC = () => {
  const frame = useCurrentFrame();
  const cAsync = useCue("async");
  const cSingle = useCue("singleton");
  const cSalud = useCue("salud");
  const late = 0.5 + 0.5 * Math.sin(frame * 0.2);
  const fila = (at: number, n: string, grande: React.ReactNode, chico: string) => (
    <Sube at={at}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 28 }}>
        <div style={{ ...tipo.dato, color: v.ceniza, width: 56 }}>{n}</div>
        <div>
          <div style={{ ...tipo.titulo, fontSize: 96 }}>{grande}</div>
          <div style={{ ...tipo.dato, color: v.niebla, marginTop: 6 }}>{chico}</div>
        </div>
      </div>
    </Sube>
  );
  return (
    <Escena>
      <Rotulo at={cAsync}>En producción</Rotulo>
      <div style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 70 }}>
        {fila(cAsync, "01", "Asíncrono.", "ninguna llamada a la nube bloquea el servidor")}
        {fila(
          cSingle,
          "02",
          <>
            Clientes <Acento>×1.</Acento>
          </>,
          "se crean una vez y se reutilizan",
        )}
        {fila(
          cSalud,
          "03",
          <>
            /health <span style={{ color: v.azafran, opacity: 0.6 + 0.4 * late }}>200</span>
          </>,
          "sin auth: la plataforma sabe que sigue vivo",
        )}
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
        <Constelacion at={cCerebro - 30} ancho={780} forma="cerebro" desde="red" cambio={cCerebro} />
      </div>
      <div style={{ marginTop: 570 }}>
        <Titular at={cCerebro} size="titulo" style={{ fontSize: 100 }}>
          Cerebro
          <br />
          con <Acento>cuerpo.</Acento>
        </Titular>
        <Sube at={cSin} style={{ marginTop: 26 }}>
          <div style={{ ...tipo.subtitulo, fontSize: 48, color: v.niebla }}>interfaz · servidor · nube</div>
        </Sube>
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
