import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Bases, Cierre, Contraste, Fusion, Gancho, Infonce, Nube, Propios, Siglip, Titulo, Tokens } from "./escenas";
import timelineJson from "./en/timeline.json";

const timeline = timelineJson as Timeline;

export type Cap07MultimodalENProps = { serie: string; autor: string; volumenMusica: number };

export const CAP07MULTIMODALEN_FRAMES = duracionCapitulo(timeline);

const POPS = ["clip", "pares", "parches", "audio", "matriz", "diagonal", "clasificar", "cota", "sigmoide", "sesgo", "tipos", "flamingo", "negativos", "matrioska", "gcp", "bases", "cta"];

export const Cap07MultimodalEN: React.FC<Cap07MultimodalENProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap-07-multimodal-en"
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
