import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Difusa, Estimar, Gancho, Idea, Limite, Piezas, Pruebas, Salto, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type CausalRDDProps = { serie: string; autor: string; volumenMusica: number };

export const CAUSALRDD_FRAMES = duracionCapitulo(timeline);

const POPS = ["beca", "sesgo", "borde", "sorteo", "asignacion", "corte", "tratamiento", "grafico", "formula", "rectas", "ventana", "difusa", "division", "manipulacion", "placebo", "local", "origen", "cta"];

export const CausalRDD: React.FC<CausalRDDProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="causal-rdd"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      idea: <Idea />,
      piezas: <Piezas />,
      salto: <Salto />,
      estimar: <Estimar />,
      difusa: <Difusa />,
      pruebas: <Pruebas />,
      limite: <Limite />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
