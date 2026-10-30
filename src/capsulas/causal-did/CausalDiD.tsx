import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Cuidado, Ejemplo, FormulaEsc, Gancho, Idea, Regresion, Supuesto, Titulo, Trampas } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type CausalDiDProps = { serie: string; autor: string; volumenMusica: number };

export const CAUSALDID_FRAMES = duracionCapitulo(timeline);

const POPS = ["sube", "engano", "tiempo", "grupos", "resta", "contrafactual", "formula", "primera", "segunda", "datos", "resultado", "nobel", "interaccion", "beta", "paralelas", "previas", "riesgos", "cta"];

export const CausalDiD: React.FC<CausalDiDProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="causal-did"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      trampas: <Trampas />,
      idea: <Idea />,
      formula: <FormulaEsc />,
      ejemplo: <Ejemplo />,
      regresion: <Regresion />,
      supuesto: <Supuesto />,
      cuidado: <Cuidado />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
