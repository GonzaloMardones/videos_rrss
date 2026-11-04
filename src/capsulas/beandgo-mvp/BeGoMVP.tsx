import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoBG, SubtitulosHD } from "../../estilos/beandgo/kit";
import { b } from "../../estilos/beandgo/tokens";
import { Arquitectura, Cierre, Comer, Funciones, Gancho, Idea, Limites, MiViaje, Moverse, Plan, Titulo, Vuelo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type BeGoMVPProps = { serie: string; autor: string; volumenMusica: number };

export const BEGOMVP_FRAMES = duracionCapitulo(timeline);

const POPS = ["push", "solucion", "lista", "memoria", "platos", "opciones", "letrero", "cancelado", "orquestador", "especialistas", "guarda", "costo", "lema"];

// Video horizontal (1920×1080): diseño del primer MVP de Be&Go, sus funciones y su arquitectura.
export const BeGoMVP: React.FC<BeGoMVPProps> = ({ autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="beandgo-mvp"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoBG />}
    Subtitulos={SubtitulosHD}
    progreso={{ color: b.copihue, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo autor={autor} />,
      idea: <Idea />,
      funciones: <Funciones />,
      miviaje: <MiViaje />,
      comer: <Comer />,
      moverse: <Moverse />,
      vuelo: <Vuelo />,
      arquitectura: <Arquitectura />,
      limites: <Limites />,
      plan: <Plan />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
