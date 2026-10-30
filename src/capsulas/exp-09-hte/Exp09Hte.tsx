import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Bosque, Cate, Cierre, Gancho, Interaccion, Slearner, Titulo, Tlearner, Trampa, Validar, Xlearner } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp09HteProps = { serie: string; autor: string; volumenMusica: number };

export const EXP09HTE_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "formula", "x", "interaccion", "beta3", "trampa", "slearner", "tlearner", "xlearner", "bosque", "validar", "cta"];

export const Exp09Hte: React.FC<Exp09HteProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-09-hte"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      cate: <Cate />,
      interaccion: <Interaccion />,
      trampa: <Trampa />,
      slearner: <Slearner />,
      tlearner: <Tlearner />,
      xlearner: <Xlearner />,
      bosque: <Bosque />,
      validar: <Validar />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
