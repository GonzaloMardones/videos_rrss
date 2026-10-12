import React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Cierre, Gancho, Titulo } from "./escenas/Portada";
import { Cobre, Crecimiento, Empleo, Fiscal, Inflacion, LoQueViene, Tasa } from "./escenas/Indicadores";
import { Resumen } from "./escenas/Resumen";
import { CORTE } from "./data";

export type Capitulo01Props = {
  serie: string;
  programa: string;
  autor: string;
};

const TRANSITION = 12;

// Duración de cada escena en frames (30 fps). Las láminas con gráfico dan ~10 s para leer.
const scenes: { id: string; frames: number; render: (p: Capitulo01Props) => React.ReactNode }[] = [
  { id: "gancho", frames: 180, render: () => <Gancho /> },
  { id: "titulo", frames: 120, render: (p) => <Titulo {...p} /> },
  { id: "crecimiento", frames: 300, render: () => <Crecimiento /> },
  { id: "cobre", frames: 345, render: () => <Cobre /> },
  { id: "inflacion", frames: 330, render: () => <Inflacion /> },
  { id: "tasa", frames: 315, render: () => <Tasa /> },
  { id: "empleo", frames: 300, render: () => <Empleo /> },
  { id: "fiscal", frames: 285, render: () => <Fiscal /> },
  { id: "lo-que-viene", frames: 300, render: () => <LoQueViene /> },
  { id: "resumen", frames: 270, render: () => <Resumen /> },
  { id: "cierre", frames: 210, render: (p) => <Cierre autor={p.autor} corte={CORTE} /> },
];

export const CAPITULO01_FRAMES =
  scenes.reduce((sum, s) => sum + s.frames, 0) - TRANSITION * (scenes.length - 1);

export const Capitulo01: React.FC<Capitulo01Props> = (props) => (
  <TransitionSeries>
    {scenes.flatMap((scene, i) => {
      const seq = (
        <TransitionSeries.Sequence key={scene.id} durationInFrames={scene.frames}>
          {scene.render(props)}
        </TransitionSeries.Sequence>
      );
      return i === 0
        ? [seq]
        : [
            <TransitionSeries.Transition
              key={`${scene.id}-in`}
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION })}
            />,
            seq,
          ];
    })}
  </TransitionSeries>
);
