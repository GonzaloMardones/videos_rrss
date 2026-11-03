import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Bases, Cierre, Dora, Gancho, Lora, Nube, Qlora, Rango, Slerp, Ties, Titulo, Vectores } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cap03PeftProps = { serie: string; autor: string; volumenMusica: number };

export const CAP03PEFT_FRAMES = duracionCapitulo(timeline);

const POPS = ["780", "48", "congela", "ba", "pct", "svd", "gpt3", "nf4", "doble", "dora", "tarea", "suma", "lerp", "arco", "pasos", "ejemplo", "gcp", "bases", "cta"];

export const Cap03Peft: React.FC<Cap03PeftProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap-03-peft"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoNube />}
    Subtitulos={SubtitulosNube}
    progreso={{ color: n.azul, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      lora: <Lora />,
      rango: <Rango />,
      qlora: <Qlora />,
      dora: <Dora />,
      vectores: <Vectores />,
      slerp: <Slerp />,
      ties: <Ties />,
      nube: <Nube />,
      bases: <Bases />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
