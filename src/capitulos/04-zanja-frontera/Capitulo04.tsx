import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { Beneficio, Calculo, Causas, Cierre, Costo, Falta, Gancho, Resultados, Riesgos, Tamano, Titulo, Trampa } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Capitulo04Props = { serie: string; autor: string; volumenMusica: number };

export const CAPITULO04_FRAMES = duracionCapitulo(timeline);

const POPS = ["zanja", "meta", "frontera", "seis", "obras", "anual", "militares", "noventa", "colchane", "ojo", "denuncias", "sola", "real", "autos", "pie", "riesgos", "km", "total", "porIngreso", "falta", "comparar", "vecinos", "cta"];

export const Capitulo04: React.FC<Capitulo04Props> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap04"
    volumenMusica={volumenMusica}
    pops={POPS}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      tamano: <Tamano />,
      costo: <Costo />,
      resultados: <Resultados />,
      trampa: <Trampa />,
      causas: <Causas />,
      beneficio: <Beneficio />,
      riesgos: <Riesgos />,
      calculo: <Calculo />,
      falta: <Falta />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
