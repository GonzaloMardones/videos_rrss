import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Caminos, Cierre, Contrafactual, Cuidado, Gancho, Mapa, Producto, Titulo, Trampa } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp17MediacionProps = { serie: string; autor: string; volumenMusica: number };

export const EXP17MEDIACION_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "caminos", "a", "b", "suma", "nie", "nunca", "talento", "falso", "ojo", "mapa", "cta"];

export const Exp17Mediacion: React.FC<Exp17MediacionProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-17-mediacion"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      caminos: <Caminos />,
      producto: <Producto />,
      contrafactual: <Contrafactual />,
      trampa: <Trampa />,
      cuidado: <Cuidado />,
      mapa: <Mapa />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
