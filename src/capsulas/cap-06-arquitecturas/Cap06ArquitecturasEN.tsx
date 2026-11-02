import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Atencion, Bases, Cierre, Gancho, Gqa, Lineal, Mamba, Moe, Nube, Router, Ssm, Titulo } from "./escenas";
import timelineJson from "./en/timeline.json";

const timeline = timelineJson as Timeline;

export type Cap06ArquitecturasENProps = { serie: string; autor: string; volumenMusica: number };

export const CAP06ARQUITECTURASEN_FRAMES = duracionCapitulo(timeline);

const POPS = ["x32", "x1024", "n2", "kv", "gqa", "ocho", "expertos", "mixtral", "mezcla", "topk", "asociar", "rnn", "estado", "conv", "selectivo", "hibrido", "gcp", "bases", "cta"];

export const Cap06ArquitecturasEN: React.FC<Cap06ArquitecturasENProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap-06-arquitecturas-en"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoNube />}
    Subtitulos={SubtitulosNube}
    progreso={{ color: n.azul, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      atencion: <Atencion />,
      gqa: <Gqa />,
      moe: <Moe />,
      router: <Router />,
      lineal: <Lineal />,
      ssm: <Ssm />,
      mamba: <Mamba />,
      nube: <Nube />,
      bases: <Bases />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
