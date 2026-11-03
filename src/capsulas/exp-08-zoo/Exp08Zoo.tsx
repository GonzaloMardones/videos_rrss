import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Ate, Att, Cate, Cierre, Dios, Gancho, Ingenuo, Late, Metodos, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp08ZooProps = { serie: string; autor: string; volumenMusica: number };

export const EXP08ZOO_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "dios", "individual", "ate", "att", "atu", "cate", "late", "ingenuo", "sesgo", "metodos", "cta"];

export const Exp08Zoo: React.FC<Exp08ZooProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-08-zoo"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      dios: <Dios />,
      ate: <Ate />,
      att: <Att />,
      cate: <Cate />,
      late: <Late />,
      ingenuo: <Ingenuo />,
      metodos: <Metodos />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
