import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Bayes, Cierre, Gancho, Instrumento, Juez, Numeros, Ppi, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cuasi10JuezProps = { serie: string; autor: string; volumenMusica: number };

export const CUASI10JUEZ_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "barato", "sesgos", "instrumento", "muestra", "rectificador", "formula", "sim", "rinden", "principio", "cta"];

export const Cuasi10Juez: React.FC<Cuasi10JuezProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cuasi-10-juez"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      juez: <Juez />,
      instrumento: <Instrumento />,
      ppi: <Ppi />,
      numeros: <Numeros />,
      bayes: <Bayes />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
