import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Asignacion, Bayes, Cierre, Definicion, Gancho, Mapa, Mecanismo, Sesgo, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cuasi02DefinicionProps = { serie: string; autor: string; volumenMusica: number };

export const CUASI02DEFINICION_FRAMES = duracionCapitulo(timeline);

const POPS = ["casos", "sorteo", "falta", "decide", "mecanismo", "depende", "formula", "sel", "ejemplo", "mapa", "disenos", "funcion", "hash", "log", "rubin", "garantiza", "cta"];

export const Cuasi02Definicion: React.FC<Cuasi02DefinicionProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cuasi-02-definicion"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      definicion: <Definicion />,
      mecanismo: <Mecanismo />,
      sesgo: <Sesgo />,
      mapa: <Mapa />,
      asignacion: <Asignacion />,
      bayes: <Bayes />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
