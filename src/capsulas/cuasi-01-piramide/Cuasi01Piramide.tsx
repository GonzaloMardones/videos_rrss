import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Bayes, Cierre, Ecm, Gancho, Grade, Ia, Kohavi, Meng, Piramide, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cuasi01PiramideProps = { serie: string; autor: string; volumenMusica: number };

export const CUASI01PIRAMIDE_FRAMES = duracionCapitulo(timeline);

const POPS = ["obs", "rct", "base", "cima", "tech", "mse", "orden", "meng", "cuatrocientos", "prior", "tau", "techo", "baja", "sube", "tercio", "costo", "revertir", "cta"];

export const Cuasi01Piramide: React.FC<Cuasi01PiramideProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cuasi-01-piramide"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      piramide: <Piramide />,
      ecm: <Ecm />,
      meng: <Meng />,
      bayes: <Bayes />,
      grade: <Grade />,
      kohavi: <Kohavi />,
      ia: <Ia />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
