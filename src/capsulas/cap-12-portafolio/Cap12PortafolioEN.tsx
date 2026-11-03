import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Bases, Cierre, Desmontar, Estructura, Evidencia, Ficha, Finetune, Gancho, Nube, Reproducir, Titulo } from "./escenas";
import timelineJson from "./en/timeline.json";

const timeline = timelineJson as Timeline;

export type Cap12PortafolioENProps = { serie: string; autor: string; volumenMusica: number };

export const CAP12PORTAFOLIOEN_FRAMES = duracionCapitulo(timeline);

const POPS = ["linea", "repo", "odds", "diez", "adaptador", "licencia", "secciones", "grupos", "paper", "honesto", "errores", "ranking", "pasos", "gcp", "bases", "cta"];

export const Cap12PortafolioEN: React.FC<Cap12PortafolioENProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap-12-portafolio-en"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoNube />}
    Subtitulos={SubtitulosNube}
    progreso={{ color: n.azul, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      evidencia: <Evidencia />,
      finetune: <Finetune />,
      ficha: <Ficha />,
      reproducir: <Reproducir />,
      desmontar: <Desmontar />,
      estructura: <Estructura />,
      nube: <Nube />,
      bases: <Bases />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
