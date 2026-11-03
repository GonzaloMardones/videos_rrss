import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Autograd, Bases, Cierre, Fusion, Gancho, Mantisa, Memoria, Nube, Precision, Roofline, Strides, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type DS27TensoresProps = { serie: string; autor: string; volumenMusica: number };

export const DS27TENSORES_FRAMES = duracionCapitulo(timeline);

const POPS = ["pesos", "etapa", "plano", "bytes", "direccion", "grafo", "inverso", "custom", "piramide", "h100", "intensidad", "casos", "seis", "dos", "flotante", "partes", "pi", "bits", "fp16", "fp8", "tpu", "bases", "cta"];

export const DS27Tensores: React.FC<DS27TensoresProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="ds27-01-tensores"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoNube />}
    Subtitulos={SubtitulosNube}
    progreso={{ color: n.azul, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      strides: <Strides />,
      autograd: <Autograd />,
      memoria: <Memoria />,
      roofline: <Roofline />,
      fusion: <Fusion />,
      mantisa: <Mantisa />,
      precision: <Precision />,
      nube: <Nube />,
      bases: <Bases />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
