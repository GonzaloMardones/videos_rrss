import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Cornfield, Cuidado, Curva, Evalue, FormulaEsc, Gancho, Problema, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp15SensibilidadProps = { serie: string; autor: string; volumenMusica: number };

export const EXP15SENSIBILIDAD_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "oculta", "pregunta", "historia", "nueve", "sesgo", "ux", "uy", "maximo", "valor", "tres", "limite", "curva", "comparar", "ojo", "cta"];

export const Exp15Sensibilidad: React.FC<Exp15SensibilidadProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-15-sensibilidad"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      problema: <Problema />,
      cornfield: <Cornfield />,
      formula: <FormulaEsc />,
      evalue: <Evalue />,
      curva: <Curva />,
      cuidado: <Cuidado />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
