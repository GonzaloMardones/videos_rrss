import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { A2a, Caso, Cierre, Equipo, Gancho, Riesgo, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cuasi11EquipoProps = { serie: string; autor: string; volumenMusica: number };

export const CUASI11EQUIPO_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "agarwal", "hallazgo", "planificador", "identifica", "critico", "tarjeta", "persona", "senderos", "cuenta", "cta"];

export const Cuasi11Equipo: React.FC<Cuasi11EquipoProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cuasi-11-equipo"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      caso: <Caso />,
      equipo: <Equipo />,
      a2a: <A2a />,
      riesgo: <Riesgo />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
