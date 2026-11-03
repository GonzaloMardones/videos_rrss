import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Bases, Bayes, Bradley, Cierre, Dpo, Gancho, Hacking, Kto, Nube, Orpo, Rechazo, Rlhf, Titulo } from "./escenas";
import timelineJson from "./en/timeline.json";

const timeline = timelineJson as Timeline;

export type Cap04AlineamientoENProps = { serie: string; autor: string; volumenMusica: number };

export const CAP04ALINEAMIENTOEN_FRAMES = duracionCapitulo(timeline);

const POPS = ["13", "pref", "sft", "kl", "bt", "sigma", "prior", "beta", "dpo", "perdida", "kto", "kahneman", "odds", "modelos", "bon", "klbon", "goodhart", "curva", "gcp", "bases", "cta"];

export const Cap04AlineamientoEN: React.FC<Cap04AlineamientoENProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap-04-alineamiento-en"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoNube />}
    Subtitulos={SubtitulosNube}
    progreso={{ color: n.azul, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      rlhf: <Rlhf />,
      bradley: <Bradley />,
      bayes: <Bayes />,
      dpo: <Dpo />,
      kto: <Kto />,
      orpo: <Orpo />,
      rechazo: <Rechazo />,
      hacking: <Hacking />,
      nube: <Nube />,
      bases: <Bases />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
