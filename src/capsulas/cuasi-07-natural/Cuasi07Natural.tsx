import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Comosi, Dosis, Gancho, Ghana, Ia, Peru, Snow, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cuasi07NaturalProps = { serie: string; autor: string; volumenMusica: number };

export const CUASI07NATURAL_FRAMES = duracionCapitulo(timeline);

const POPS = ["ghana", "londres", "colera", "comosi", "creible", "yanacocha", "compras", "distancia", "satelite", "dosis", "satelital", "cta"];

export const Cuasi07Natural: React.FC<Cuasi07NaturalProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cuasi-07-natural"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      snow: <Snow />,
      comosi: <Comosi />,
      peru: <Peru />,
      ghana: <Ghana />,
      dosis: <Dosis />,
      ia: <Ia />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
