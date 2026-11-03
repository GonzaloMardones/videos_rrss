import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Aprende, Cierre, Cuando, Dilema, Gancho, Regret, Resultado, Thompson, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp11BanditsProps = { serie: string; autor: string; volumenMusica: number };

export const EXP11BANDITS_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "maquinas", "dilema", "regret", "cien", "beta", "sorteo", "proporcion", "aprende", "resultado", "ojo", "usar", "cta"];

export const Exp11Bandits: React.FC<Exp11BanditsProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-11-bandits"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      dilema: <Dilema />,
      regret: <Regret />,
      thompson: <Thompson />,
      aprende: <Aprende />,
      resultado: <Resultado />,
      cuando: <Cuando />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
