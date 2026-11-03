import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Cuanto, Fijo, Gancho, Grupos, Paseo, Pocock, Regla, Siempre, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp03PeekingProps = { serie: string; autor: string; volumenMusica: number };

export const EXP03PEEKING_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "paseo", "vistazo", "cuanto", "fijo", "grupos", "obf", "exigente", "pocock", "siempre", "regla", "cta"];

export const Exp03Peeking: React.FC<Exp03PeekingProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-03-peeking"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      paseo: <Paseo />,
      cuanto: <Cuanto />,
      fijo: <Fijo />,
      grupos: <Grupos />,
      pocock: <Pocock />,
      siempre: <Siempre />,
      regla: <Regla />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
