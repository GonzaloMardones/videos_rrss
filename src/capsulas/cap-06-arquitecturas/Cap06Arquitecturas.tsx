import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Atencion, Bases, Cierre, Gancho, Gqa, Lineal, Mamba, Moe, Nube, Router, Ssm, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cap06ArquitecturasProps = { serie: string; autor: string; volumenMusica: number };

export const CAP06ARQUITECTURAS_FRAMES = duracionCapitulo(timeline);

const POPS = ["x32", "x1024", "n2", "kv", "gqa", "ocho", "expertos", "mixtral", "mezcla", "topk", "asociar", "rnn", "estado", "conv", "selectivo", "hibrido", "gcp", "bases", "cta"];

export const Cap06Arquitecturas: React.FC<Cap06ArquitecturasProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap-06-arquitecturas"
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
