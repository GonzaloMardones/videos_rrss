import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Costo, Dimension, FormulaEsc, Gancho, Idea, Limite, Logistica, Propension, Pruebas, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type CausalEmparejamientoProps = { serie: string; autor: string; volumenMusica: number };

export const CAUSALEMPAREJAMIENTO_FRAMES = duracionCapitulo(timeline);

const POPS = ["pregunta", "gemelos", "parecido", "promedia", "formula", "att", "combinaciones", "vacias", "puntaje", "resume", "logistica", "fuerza", "ordenar", "balance", "oculto", "lalonde", "cta"];

export const CausalEmparejamiento: React.FC<CausalEmparejamientoProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="causal-emparejamiento"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      idea: <Idea />,
      formula: <FormulaEsc />,
      dimension: <Dimension />,
      propension: <Propension />,
      logistica: <Logistica />,
      costo: <Costo />,
      pruebas: <Pruebas />,
      limite: <Limite />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
