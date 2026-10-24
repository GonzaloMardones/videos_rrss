import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { Acelera, Agente, Busqueda, Capas, Cierre, Como, Gancho, Porque, Saber, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Capsula01Props = { serie: string; autor: string; volumenMusica: number };

export const CAPSULA01_FRAMES = duracionCapitulo(timeline);

const POPS = ["sistema", "capas", "ingesta", "conocimiento", "orquestacion", "integraciones", "persistencia", "noconoce", "caro", "minutos", "chunks", "vector", "guardar", "pregunta", "coseno", "modos", "grafo", "json", "fallback", "tradeoff", "umbral", "escala", "semanas", "fuentes", "demo", "cta"];

export const Capsula01: React.FC<Capsula01Props> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="tec01"
    volumenMusica={volumenMusica}
    pops={POPS}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      capas: <Capas />,
      porque: <Porque />,
      como: <Como />,
      busqueda: <Busqueda />,
      agente: <Agente />,
      saber: <Saber />,
      acelera: <Acelera />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
