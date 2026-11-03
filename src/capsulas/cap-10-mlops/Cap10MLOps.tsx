import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Bases, Bayes, Busqueda, Cierre, Datos, Gancho, Hyperband, Niveles, Nube, Run, Semillas, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cap10MLOpsProps = { serie: string; autor: string; volumenMusica: number };

export const CAP10MLOPS_FRAMES = duracionCapitulo(timeline);

const POPS = ["dos", "caja", "registro", "metricas", "varianza", "reportar", "grilla", "azar", "gp", "ucb", "mitades", "presupuesto", "hash", "sesgo", "nivel", "gcp", "bases", "cta"];

export const Cap10MLOps: React.FC<Cap10MLOpsProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap-10-mlops"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoNube />}
    Subtitulos={SubtitulosNube}
    progreso={{ color: n.azul, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      run: <Run />,
      semillas: <Semillas />,
      busqueda: <Busqueda />,
      bayes: <Bayes />,
      hyperband: <Hyperband />,
      datos: <Datos />,
      niveles: <Niveles />,
      nube: <Nube />,
      bases: <Bases />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
