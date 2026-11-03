import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Bases, Cero, Cierre, Contaminacion, Dinamicas, Error, Gancho, Juez, Nube, Ppi, Redteam, Titulo } from "./escenas";
import timelineJson from "./en/timeline.json";

const timeline = timelineJson as Timeline;

export type Cap08EvaluacionENProps = { serie: string; autor: string; volumenMusica: number };

export const CAP08EVALUACIONEN_FRAMES = duracionCapitulo(timeline);

const POPS = ["dos", "nose", "se", "pares", "fuga", "detectar", "vivas", "tests", "sesgos", "calibrar", "rectificar", "ganancia", "ataques", "sufijos", "cien", "tres", "gcp", "bases", "cta"];

export const Cap08EvaluacionEN: React.FC<Cap08EvaluacionENProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap-08-evaluacion-en"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoNube />}
    Subtitulos={SubtitulosNube}
    progreso={{ color: n.azul, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      error: <Error />,
      contaminacion: <Contaminacion />,
      dinamicas: <Dinamicas />,
      juez: <Juez />,
      ppi: <Ppi />,
      redteam: <Redteam />,
      cero: <Cero />,
      nube: <Nube />,
      bases: <Bases />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
