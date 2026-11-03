import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { Apuesta, Calculo, Cierre, DeNuevo, FondoE, Gancho, Giro, Manada, Mitigar, Personas, Titulo, Verlo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Capitulo05Props = { serie: string; autor: string; volumenMusica: number };

export const CAPITULO05_FRAMES = duracionCapitulo(timeline);

const POPS = ["diez", "swap", "nocional", "ganaban", "pierden", "fondoE", "caida", "saldo", "pension", "personas", "regla", "catorce", "verlo", "super", "central", "privado", "manada", "iguales", "panico", "retiro", "postergar", "limite", "triple", "leccion", "cta"];

export const Capitulo05: React.FC<Capitulo05Props> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap05"
    volumenMusica={volumenMusica}
    pops={POPS}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      apuesta: <Apuesta />,
      giro: <Giro />,
      fondoE: <FondoE />,
      personas: <Personas />,
      calculo: <Calculo />,
      verlo: <Verlo />,
      manada: <Manada />,
      mitigar: <Mitigar />,
      denuevo: <DeNuevo />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
