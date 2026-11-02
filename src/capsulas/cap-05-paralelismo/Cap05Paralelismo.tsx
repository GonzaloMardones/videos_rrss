import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Bases, Checkpoint, Cierre, Datos, Gancho, Memoria, Nube, Pipeline, Tensor, Titulo, Tresd, Zero } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cap05ParalelismoProps = { serie: string; autor: string; volumenMusica: number };

export const CAP05PARALELISMO_FRAMES = duracionCapitulo(timeline);

const POPS = ["120", "19", "16", "adam", "dp", "ring", "copias", "etapas", "tp", "columnas", "etapa", "burbuja", "3d", "trillon", "ckpt", "raiz", "gcp", "bases", "cta"];

export const Cap05Paralelismo: React.FC<Cap05ParalelismoProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap-05-paralelismo"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoNube />}
    Subtitulos={SubtitulosNube}
    progreso={{ color: n.azul, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      memoria: <Memoria />,
      datos: <Datos />,
      zero: <Zero />,
      tensor: <Tensor />,
      pipeline: <Pipeline />,
      tresd: <Tresd />,
      checkpoint: <Checkpoint />,
      nube: <Nube />,
      bases: <Bases />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
