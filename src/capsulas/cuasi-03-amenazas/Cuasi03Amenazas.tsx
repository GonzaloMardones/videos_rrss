import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Agentes, Amenazas, Autocorr, Cierre, Gancho, Onoff, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cuasi03AmenazasProps = { serie: string; autor: string; volumenMusica: number };

export const CUASI03AMENAZAS_FRAMES = duracionCapitulo(timeline);

const POPS = ["molino", "blando", "lista", "historia", "maduracion", "seleccion", "regresion", "instrumento", "desgaste", "silenciosa", "neff", "napier", "alterna", "pares", "raglan", "agente", "a2a", "cta"];

export const Cuasi03Amenazas: React.FC<Cuasi03AmenazasProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cuasi-03-amenazas"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      amenazas: <Amenazas />,
      autocorr: <Autocorr />,
      onoff: <Onoff />,
      agentes: <Agentes />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
