import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { Abril, Autonomia, Cierre, Gancho, Herramienta, Mandato, Titulo, Turquia, Volatiles } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Capitulo03Props = { serie: string; autor: string; volumenMusica: number };

export const CAPITULO03_FRAMES = duracionCapitulo(timeline);

const POPS = ["quiroz", "meta", "hoy", "sinvolatiles", "combustibles", "abril", "tresCuartos", "mepco", "rezago", "costo", "antes", "despues", "ochenta", "coordinar", "cta"];

export const Capitulo03: React.FC<Capitulo03Props> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap03"
    volumenMusica={volumenMusica}
    pops={POPS}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      mandato: <Mandato />,
      volatiles: <Volatiles />,
      abril: <Abril />,
      herramienta: <Herramienta />,
      autonomia: <Autonomia />,
      turquia: <Turquia />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
