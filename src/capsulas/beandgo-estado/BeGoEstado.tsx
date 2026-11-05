import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoBG, SubtitulosHD } from "../../estilos/beandgo/kit";
import { b } from "../../estilos/beandgo/tokens";
import { Cierre, Correr, Dentro, Gancho, NoPuede, Numeros, Pantalla, Pendiente, Puede, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type BeGoEstadoProps = { serie: string; autor: string; volumenMusica: number };

export const BEGOESTADO_FRAMES = duracionCapitulo(timeline);

const POPS = ["tests", "boletas", "costo", "veredicto", "vuelo", "pestanas", "control", "llegada", "prod", "tres", "pasos", "lema"];

// Video horizontal (1920×1080): estado del MVP de Be&Go al 8-nov-2026, qué puede y qué no, y cómo correrlo.
export const BeGoEstado: React.FC<BeGoEstadoProps> = ({ autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="beandgo-estado"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoBG />}
    Subtitulos={SubtitulosHD}
    progreso={{ color: b.copihue, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo autor={autor} />,
      numeros: <Numeros />,
      puede: <Puede />,
      pantalla: <Pantalla />,
      dentro: <Dentro />,
      nopuede: <NoPuede />,
      pendiente: <Pendiente />,
      correr: <Correr />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
