import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { Bonos, Cierre, Comision, Encaje, Gancho, Iguales, OtroLado, Politica, Titulo, Utilidades } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Capitulo06Props = { serie: string; autor: string; volumenMusica: number };

export const CAPITULO06_FRAMES = duracionCapitulo(timeline);

const POPS = ["perdieron", "cuanto", "comision", "rango", "misma", "ingresos", "ganaron", "encaje", "veintiocho", "minima", "bonos", "marcel", "todas", "punto", "sumacero", "bancos", "duenos", "puerta", "culpa", "fiscalia", "diseno", "propuestas", "cta"];

export const Capitulo06: React.FC<Capitulo06Props> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap06"
    volumenMusica={volumenMusica}
    pops={POPS}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      comision: <Comision />,
      utilidades: <Utilidades />,
      encaje: <Encaje />,
      bonos: <Bonos />,
      iguales: <Iguales />,
      otrolado: <OtroLado />,
      politica: <Politica />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
