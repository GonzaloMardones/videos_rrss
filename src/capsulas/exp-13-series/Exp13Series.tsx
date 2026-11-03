import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Cuidado, FormulaEsc, Gancho, Idea, Impacto, Lectura, Real, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp13SeriesProps = { serie: string; autor: string; volumenMusica: number };

export const EXP13SERIES_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "pasado", "proyecta", "formula", "b1", "b2", "b3", "grafico", "efecto", "google", "banda", "acumulado", "real", "ojo", "control", "cta"];

export const Exp13Series: React.FC<Exp13SeriesProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-13-series"
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
      lectura: <Lectura />,
      impacto: <Impacto />,
      real: <Real />,
      cuidado: <Cuidado />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
