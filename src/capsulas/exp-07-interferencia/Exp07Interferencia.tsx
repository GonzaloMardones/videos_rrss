import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Cluster, Dilema, Donde, Gancho, Sesgo, Sutva, Switchback, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp07InterferenciaProps = { serie: string; autor: string; volumenMusica: number };

export const EXP07INTERFERENCIA_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "supuesto", "nombre", "donde", "infla", "real", "grupos", "deff", "seis", "switchback", "arrastre", "dilema", "cta"];

export const Exp07Interferencia: React.FC<Exp07InterferenciaProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-07-interferencia"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      sutva: <Sutva />,
      donde: <Donde />,
      sesgo: <Sesgo />,
      cluster: <Cluster />,
      switchback: <Switchback />,
      dilema: <Dilema />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
