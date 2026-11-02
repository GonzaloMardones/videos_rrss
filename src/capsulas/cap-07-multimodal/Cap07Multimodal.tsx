import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Bases, Cierre, Contraste, Fusion, Gancho, Infonce, Nube, Propios, Siglip, Titulo, Tokens } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cap07MultimodalProps = { serie: string; autor: string; volumenMusica: number };

export const CAP07MULTIMODAL_FRAMES = duracionCapitulo(timeline);

const POPS = ["clip", "pares", "parches", "audio", "matriz", "diagonal", "clasificar", "cota", "sigmoide", "sesgo", "tipos", "flamingo", "negativos", "matrioska", "gcp", "bases", "cta"];

export const Cap07Multimodal: React.FC<Cap07MultimodalProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap-07-multimodal"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoNube />}
    Subtitulos={SubtitulosNube}
    progreso={{ color: n.azul, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      tokens: <Tokens />,
      contraste: <Contraste />,
      infonce: <Infonce />,
      siglip: <Siglip />,
      fusion: <Fusion />,
      propios: <Propios />,
      nube: <Nube />,
      bases: <Bases />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
