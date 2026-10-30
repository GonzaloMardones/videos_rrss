import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Delta, Ejemplo, Gancho, Margen, Oec, Razon, Regla, Tipos, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp06GuardasProps = { serie: string; autor: string; volumenMusica: number };

export const EXP06GUARDAS_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "oec", "negocio", "confianza", "margen", "intervalo", "razon", "parecen", "delta", "covarianza", "ejemplo", "regla", "cta"];

export const Exp06Guardas: React.FC<Exp06GuardasProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-06-guardas"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      oec: <Oec />,
      tipos: <Tipos />,
      margen: <Margen />,
      razon: <Razon />,
      delta: <Delta />,
      ejemplo: <Ejemplo />,
      regla: <Regla />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
