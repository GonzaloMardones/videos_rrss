import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Causas, Cierre, Gancho, Hacer, Intuicion, Porque, Prueba, Que, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp05SrmProps = { serie: string; autor: string; volumenMusica: number };

export const EXP05SRM_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "que", "formula", "cuenta", "intuicion", "normal", "porque", "lento", "causas", "hacer", "primero", "cta"];

export const Exp05Srm: React.FC<Exp05SrmProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-05-srm"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      que: <Que />,
      prueba: <Prueba />,
      intuicion: <Intuicion />,
      porque: <Porque />,
      causas: <Causas />,
      hacer: <Hacer />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
