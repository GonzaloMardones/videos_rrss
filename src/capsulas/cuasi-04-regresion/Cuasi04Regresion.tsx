import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Bayes, Cierre, FormulaEsc, Gancho, Ia, Idea, Simulacion, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cuasi04RegresionProps = { serie: string; autor: string; volumenMusica: number };

export const CUASI04REGRESION_FRAMES = duracionCapitulo(timeline);

const POPS = ["faena", "solas", "suerte", "galton", "formula", "rho", "sim", "baja", "encoge", "peso", "hauer", "modelo", "defensa", "cta"];

export const Cuasi04Regresion: React.FC<Cuasi04RegresionProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cuasi-04-regresion"
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
      simulacion: <Simulacion />,
      bayes: <Bayes />,
      ia: <Ia />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
