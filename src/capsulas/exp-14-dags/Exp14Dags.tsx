import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Colisionador, Confusor, Gancho, Grafo, Mediador, Puerta, Regla, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp14DagsProps = { serie: string; autor: string; volumenMusica: number };

export const EXP14DAGS_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "grafo", "piezas", "ciudad", "sesgo", "trasera", "criterio", "ajuste", "choque", "abre", "cadena", "borra", "regla", "lineal", "cta"];

export const Exp14Dags: React.FC<Exp14DagsProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-14-dags"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      grafo: <Grafo />,
      confusor: <Confusor />,
      puerta: <Puerta />,
      colisionador: <Colisionador />,
      mediador: <Mediador />,
      regla: <Regla />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
