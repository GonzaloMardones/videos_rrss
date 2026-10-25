import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { Backend, Cierre, Config, Detalles, Estado, Frontend, Gancho, Nodos, Nube, Porque, Titulo } from "./escenas";
import timelineJson from "./timeline.json";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";

const timeline = timelineJson as Timeline;

export type Capsula02Props = { serie: string; autor: string; volumenMusica: number };

export const CAPSULA02_FRAMES = duracionCapitulo(timeline);

const POPS = ["donde", "conversan", "objeto", "pasa", "reunir", "razonar", "guardar", "planb", "directo", "nosabe", "tipado", "renderizar", "rebanadas", "auth", "administrados", "bases", "proxy", "ambientes", "iac", "async", "singleton", "salud", "cerebro", "cta"];

export const Capsula02: React.FC<Capsula02Props> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="tec02"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      estado: <Estado />,
      nodos: <Nodos />,
      porque: <Porque />,
      frontend: <Frontend />,
      backend: <Backend />,
      nube: <Nube />,
      config: <Config />,
      detalles: <Detalles />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
