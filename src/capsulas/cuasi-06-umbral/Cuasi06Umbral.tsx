import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, FormulaEsc, Gancho, Ia, Idea, Salto, Titulo, Trampa } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cuasi06UmbralProps = { serie: string; autor: string; volumenMusica: number };

export const CUASI06UMBRAL_FRAMES = duracionCapitulo(timeline);

const POPS = ["camion", "paradoja", "umbral", "sorteo", "grafico", "numeros", "limites", "banda", "manipula", "mccrary", "confianza", "guarda", "cta"];

export const Cuasi06Umbral: React.FC<Cuasi06UmbralProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cuasi-06-umbral"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      idea: <Idea />,
      salto: <Salto />,
      formula: <FormulaEsc />,
      trampa: <Trampa />,
      ia: <Ia />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
