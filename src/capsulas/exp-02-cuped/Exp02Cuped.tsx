import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Cuidado, Ejemplo, Extension, FormulaEsc, Gancho, Idea, Ruido, Sesgo, Titulo, Varianza } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp02CupedProps = { serie: string; autor: string; volumenMusica: number };

export const EXP02CUPED_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "distintas", "esconde", "idea", "formula", "x", "theta", "varianza", "rho", "semanas", "sesgo", "antes", "nuevos", "estables", "cupac", "cta"];

export const Exp02Cuped: React.FC<Exp02CupedProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-02-cuped"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      ruido: <Ruido />,
      idea: <Idea />,
      formula: <FormulaEsc />,
      varianza: <Varianza />,
      ejemplo: <Ejemplo />,
      sesgo: <Sesgo />,
      cuidado: <Cuidado />,
      extension: <Extension />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
