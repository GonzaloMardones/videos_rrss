import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Costo, Gancho, Numeros, Pipeline, Solucion, Sutva, Titulo, Trazas } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cuasi08InterferenciaProps = { serie: string; autor: string; volumenMusica: number };

export const CUASI08INTERFERENCIA_FRAMES = duracionCapitulo(timeline);

const POPS = ["ab", "desaparece", "dos", "fila", "supuesto", "vector", "sim", "johari", "switch", "grupos", "diseno", "seis", "contexto", "cta"];

export const Cuasi08Interferencia: React.FC<Cuasi08InterferenciaProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cuasi-08-interferencia"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      pipeline: <Pipeline />,
      sutva: <Sutva />,
      numeros: <Numeros />,
      solucion: <Solucion />,
      costo: <Costo />,
      trazas: <Trazas />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
