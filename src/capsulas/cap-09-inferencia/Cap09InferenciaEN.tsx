import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Bases, Cierre, Cuantizar, Especulativa, Gancho, Memoria, Nube, Outliers, Rope, Sumideros, Titulo } from "./escenas";
import timelineJson from "./en/timeline.json";

const timeline = timelineJson as Timeline;

export type Cap09InferenciaENProps = { serie: string; autor: string; volumenMusica: number };

export const CAP09INFERENCIAEN_FRAMES = duracionCapitulo(timeline);

const POPS = ["140", "42", "intensidad", "lote", "escala", "bits", "raros", "gptq", "borrador", "aceptar", "rotar", "estirar", "sink", "ventana", "gcp", "bases", "cta"];

export const Cap09InferenciaEN: React.FC<Cap09InferenciaENProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap-09-inferencia-en"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoNube />}
    Subtitulos={SubtitulosNube}
    progreso={{ color: n.azul, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      memoria: <Memoria />,
      cuantizar: <Cuantizar />,
      outliers: <Outliers />,
      especulativa: <Especulativa />,
      rope: <Rope />,
      sumideros: <Sumideros />,
      nube: <Nube />,
      bases: <Bases />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
