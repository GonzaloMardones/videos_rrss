import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Ajuste, Cierre, Cuidado, Efecto, FormulaEsc, Gancho, Placebo, Problema, Receta, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp12SinteticoProps = { serie: string; autor: string; volumenMusica: number };

export const EXP12SINTETICO_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "uno", "promedio", "mezcla", "pesos", "formula", "reglas", "minimo", "ajuste", "abre", "brecha", "placebo", "extremo", "ojo", "calza", "cta"];

export const Exp12Sintetico: React.FC<Exp12SinteticoProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-12-sintetico"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      problema: <Problema />,
      receta: <Receta />,
      formula: <FormulaEsc />,
      ajuste: <Ajuste />,
      efecto: <Efecto />,
      placebo: <Placebo />,
      cuidado: <Cuidado />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
