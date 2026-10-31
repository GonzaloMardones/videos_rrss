import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Escalon, Eventos, Gancho, Nube, Prohibidas, Titulo, Twfe } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Cuasi05EscalonadoProps = { serie: string; autor: string; volumenMusica: number };

export const CUASI05ESCALONADO_FRAMES = duracionCapitulo(timeline);

const POPS = ["gaby", "trampa", "olas", "ideal", "receta", "crece", "usa", "mitad", "alinea", "previos", "callaway", "bandera", "guarda", "cta"];

export const Cuasi05Escalonado: React.FC<Cuasi05EscalonadoProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cuasi-05-escalonado"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      escalon: <Escalon />,
      twfe: <Twfe />,
      prohibidas: <Prohibidas />,
      eventos: <Eventos />,
      nube: <Nube />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
