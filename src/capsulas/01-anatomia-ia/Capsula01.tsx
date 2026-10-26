import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Acelera, BigO, Capas, Cierre, Coseno, Ejemplo, Gancho, Porque, Titulo, Trozos, Umbral, Vector } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Capsula01Props = { serie: string; autor: string; volumenMusica: number };

export const CAPSULA01_FRAMES = duracionCapitulo(timeline);

const POPS = ["sistema", "capas", "ingesta", "conocimiento", "orquestacion", "integraciones", "persistencia", "noconoce", "caro", "trozo", "paso", "formula", "ejemplo", "costo", "vector", "flecha", "guardar", "pregunta", "numerador", "denominador", "rango", "producto", "resultado", "top", "lineal", "hoy", "millon", "orden", "indice", "umbral", "mueve", "lotes", "fuentes", "demo", "cta"];

export const Capsula01: React.FC<Capsula01Props> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="tec01"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      capas: <Capas />,
      porque: <Porque />,
      trozos: <Trozos />,
      vector: <Vector />,
      coseno: <Coseno />,
      ejemplo: <Ejemplo />,
      bigo: <BigO />,
      umbral: <Umbral />,
      acelera: <Acelera />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
