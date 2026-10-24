import React from "react";
import { AbsoluteFill, Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { gradients, VIDEO } from "../theme";
import { Background } from "./Background";
import { Captions } from "./Captions";
import { clamp } from "./motion";
import { SceneProvider, type Timeline } from "./narracion";

// La escena entra un poco antes de que empiece su voz y se cruza con la siguiente.
const LEAD = 10;
const OVERLAP = 8;
const OUTRO = 2.4; // segundos que se mantiene el cierre tras la última palabra

export const duracionCapitulo = (timeline: Timeline) => Math.ceil((timeline.duracion + OUTRO) * VIDEO.fps);

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: "rgba(255,255,255,0.08)" }}>
      <div style={{ width: `${(frame / durationInFrames) * 100}%`, height: "100%", background: gradients.brand }} />
    </div>
  );
};

type Props = {
  timeline: Timeline;
  escenas: Record<string, React.ReactNode>;
  carpeta: string; // carpeta en public/ con narracion.mp3 y musica.mp3
  volumenMusica: number;
  pops: string[]; // cues en que suena un "pop" (cuando aparece una cifra clave)
  tono?: number; // rotación de matiz en grados: otra paleta sin tocar las escenas (0 = la de la serie)
};

// Estructura común de cada capítulo: fondo, escenas sincronizadas con la voz, subtítulos, música y efectos.
export const Capitulo: React.FC<Props> = ({ timeline, escenas, carpeta, volumenMusica, pops, tono = 0 }) => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={tono ? { filter: `hue-rotate(${tono}deg)` } : undefined}>
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

      <Html5Audio src={staticFile(`${carpeta}/narracion.mp3`)} />
      <Html5Audio
        src={staticFile(`${carpeta}/musica.mp3`)}
        volume={(f) => volumenMusica * interpolate(f, [durationInFrames - 2 * fps, durationInFrames], [1, 0], clamp)}
      />
      {timeline.escenas.slice(1).map((e) => (
        <Sequence key={`whoosh-${e.id}`} from={Math.max(0, Math.round(e.inicio * fps) - LEAD - 4)} durationInFrames={20}>
          <Html5Audio src={staticFile("sfx/whoosh.wav")} volume={0.32} />
        </Sequence>
      ))}
      {timeline.frases
        .filter((f) => f.cue && pops.includes(f.cue))
        .map((f) => (
          <Sequence key={`pop-${f.escena}-${f.cue}`} from={Math.round(f.inicio * fps) + 4} durationInFrames={8}>
            <Html5Audio src={staticFile("sfx/pop.wav")} volume={0.22} />
          </Sequence>
        ))}
    </AbsoluteFill>
  );
};
