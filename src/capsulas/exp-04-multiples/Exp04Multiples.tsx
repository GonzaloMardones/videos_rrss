import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Bh, Bonferroni, Cierre, Cual, Cuenta, Curva, Ejemplo, Gancho, Holm, Principal, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp04MultiplesProps = { serie: string; autor: string; volumenMusica: number };

export const EXP04MULTIPLES_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "esperado", "almenos", "curva", "bonferroni", "precio", "holm", "bh", "umbral", "ejemplo", "cual", "principal", "cta"];

export const Exp04Multiples: React.FC<Exp04MultiplesProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-04-multiples"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      cuenta: <Cuenta />,
      curva: <Curva />,
      bonferroni: <Bonferroni />,
      holm: <Holm />,
      bh: <Bh />,
      ejemplo: <Ejemplo />,
      cual: <Cual />,
      principal: <Principal />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
