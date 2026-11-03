import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cadena, Caminos, Cierre, Confusor, Gancho, Mediacion, Practica, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cuasi09CadenaProps = { serie: string; autor: string; volumenMusica: number };

export const CUASI09CADENA_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "cadena", "trazas", "divide", "cuenta", "complejidad", "sesgo", "caminos", "practica", "cta"];

export const Cuasi09Cadena: React.FC<Cuasi09CadenaProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cuasi-09-cadena"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      cadena: <Cadena />,
      mediacion: <Mediacion />,
      confusor: <Confusor />,
      caminos: <Caminos />,
      practica: <Practica />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
