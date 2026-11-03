import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Bases, Batching, Cierre, Fases, Gancho, Little, Nube, Paged, Ruteo, Semantico, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cap11ServingProps = { serie: string; autor: string; volumenMusica: number };

export const CAP11SERVING_FRAMES = duracionCapitulo(timeline);

const POPS = ["60", "4", "prefill", "decode", "bloques", "prefijo", "estatico", "continuo", "ley", "p99", "cascada", "costo", "intencion", "borde", "gcp", "bases", "cta"];

export const Cap11Serving: React.FC<Cap11ServingProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap-11-serving"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoNube />}
    Subtitulos={SubtitulosNube}
    progreso={{ color: n.azul, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      fases: <Fases />,
      paged: <Paged />,
      batching: <Batching />,
      little: <Little />,
      ruteo: <Ruteo />,
      semantico: <Semantico />,
      nube: <Nube />,
      bases: <Bases />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
