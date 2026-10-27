import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Condiciones, Debil, Ejemplo, Etapas, Gancho, Idea, Late, Titulo, Wald } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type CausalIVProps = { serie: string; autor: string; volumenMusica: number };

export const CAUSALIV_FRAMES = duracionCapitulo(timeline);

const POPS = ["pregunta", "motivacion", "empuje", "parte", "relevancia", "exclusion", "independencia", "trimestre", "leyes", "arriba", "abajo", "cuenta", "primera", "segunda", "debil", "local", "cta"];

export const CausalIV: React.FC<CausalIVProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="causal-iv"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      idea: <Idea />,
      condiciones: <Condiciones />,
      ejemplo: <Ejemplo />,
      wald: <Wald />,
      etapas: <Etapas />,
      debil: <Debil />,
      late: <Late />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
