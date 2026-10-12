import React from "react";
import { AbsoluteFill, Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { SceneProvider, type Timeline } from "../../components/narracion";
import { clamp } from "../../components/motion";
import { gradients, VIDEO } from "../../theme";
import { Cierre } from "./escenas/Cierre";
import { Gancho, Titulo } from "./escenas/Apertura";
import { Cobre, Crecimiento, Empleo, Fiscal, Futuro, Inflacion, Tasa } from "./escenas/Indicadores";
import { CORTE } from "./data";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Capitulo01Props = {
  serie: string;
  programa: string;
  autor: string;
  volumenMusica: number;
};

// La escena entra un poco antes de que empiece su voz y se cruza con la siguiente.
const LEAD = 10;
const OVERLAP = 8;
const OUTRO = 2.4; // segundos que se mantiene el cierre tras la última palabra

export const CAPITULO01_FRAMES = Math.ceil((timeline.duracion + OUTRO) * VIDEO.fps);

// Momentos en que suena un "pop": cuando aparece una cifra clave.
const POPS = ["cobre", "pib", "barras", "proyeccion", "precio", "cantidad", "hoy", "quieta", "tasa", "deficit", "deuda", "rebote", "cta"];

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: "rgba(255,255,255,0.08)" }}>
      <div style={{ width: `${(frame / durationInFrames) * 100}%`, height: "100%", background: gradients.brand }} />
    </div>
  );
};

export const Capitulo01: React.FC<Capitulo01Props> = ({ serie, programa, autor, volumenMusica }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const escenas: Record<string, React.ReactNode> = {
    gancho: <Gancho />,
    titulo: <Titulo serie={serie} autor={autor} programa={programa} />,
    crecimiento: <Crecimiento />,
    cobre: <Cobre />,
    inflacion: <Inflacion />,
    tasa: <Tasa />,
    empleo: <Empleo />,
    fiscal: <Fiscal />,
    futuro: <Futuro />,
    cierre: <Cierre autor={autor} programa={programa} corte={CORTE} />,
  };

  return (
    <AbsoluteFill>
      <Background />

      {timeline.escenas.map((e, i) => {
        const last = i === timeline.escenas.length - 1;
        const from = i === 0 ? 0 : Math.round(e.inicio * fps) - LEAD;
        const to = last ? durationInFrames : Math.round(e.fin * fps) + OVERLAP;
        return (
          <Sequence key={e.id} from={from} durationInFrames={to - from} name={e.id}>
            <SceneProvider id={e.id} from={from} duration={to - from} timeline={timeline}>
              {escenas[e.id]}
            </SceneProvider>
          </Sequence>
        );
      })}

      <Captions timeline={timeline} />
      <ProgressBar />

      <Html5Audio src={staticFile("cap01/narracion.mp3")} />
      <Html5Audio
        src={staticFile("cap01/musica.mp3")}
        volume={(f) => volumenMusica * interpolate(f, [durationInFrames - 2 * fps, durationInFrames], [1, 0], clamp)}
      />
      {timeline.escenas.slice(1).map((e) => (
        <Sequence key={`whoosh-${e.id}`} from={Math.max(0, Math.round(e.inicio * fps) - LEAD - 4)} durationInFrames={20}>
          <Html5Audio src={staticFile("sfx/whoosh.wav")} volume={0.32} />
        </Sequence>
      ))}
      {timeline.frases
        .filter((f) => f.cue && POPS.includes(f.cue))
        .map((f) => (
          <Sequence key={`pop-${f.escena}-${f.cue}`} from={Math.round(f.inicio * fps) + 4} durationInFrames={8}>
            <Html5Audio src={staticFile("sfx/pop.wav")} volume={0.22} />
          </Sequence>
        ))}
    </AbsoluteFill>
  );
};
