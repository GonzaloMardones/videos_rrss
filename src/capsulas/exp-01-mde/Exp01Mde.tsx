import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Cuadruple, Curvas, Ejemplo, Errores, FormulaEsc, Gancho, Palancas, Regla, Titulo, Trampa } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp01MdeProps = { serie: string; autor: string; volumenMusica: number };

export const EXP01MDE_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "positivo", "negativo", "campanas", "corte", "formula", "z", "sigma", "raiz", "regla", "conversion", "cuenta", "dias", "mitad", "palancas", "trampa", "cta"];

export const Exp01Mde: React.FC<Exp01MdeProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-01-mde"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      errores: <Errores />,
      curvas: <Curvas />,
      formula: <FormulaEsc />,
      regla: <Regla />,
      ejemplo: <Ejemplo />,
      cuadruple: <Cuadruple />,
      palancas: <Palancas />,
      trampa: <Trampa />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
