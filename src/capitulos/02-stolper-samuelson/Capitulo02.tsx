import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { CerezasSuben, Cierre, Experimento, Gancho, Idea, Realidad, Recetas, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Capitulo02Props = { serie: string; autor: string; volumenMusica: number };

export const CAPITULO02_FRAMES = duracionCapitulo(timeline);

const POPS = ["cobre", "sueldo", "nombre", "regla", "sube", "capital", "salario", "magnificacion", "trabajo", "peso", "reparte", "cta"];

export const Capitulo02: React.FC<Capitulo02Props> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap02"
    volumenMusica={volumenMusica}
    pops={POPS}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      idea: <Idea />,
      recetas: <Recetas />,
      experimento: <Experimento />,
      cerezas: <CerezasSuben />,
      realidad: <Realidad />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
