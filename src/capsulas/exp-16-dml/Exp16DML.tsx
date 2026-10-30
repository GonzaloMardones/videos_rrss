import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Cruzado, Cuando, FormulaEsc, Gancho, Ortogonal, Problema, Residuos, Resultado, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp16DMLProps = { serie: string; autor: string; volumenMusica: number };

export const EXP16DML_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "curvas", "ml", "fwl", "dos", "pendiente", "formula", "dres", "yres", "neyman", "orden", "partes", "rota", "sims", "usar", "cta"];

export const Exp16DML: React.FC<Exp16DMLProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-16-dml"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      problema: <Problema />,
      residuos: <Residuos />,
      formula: <FormulaEsc />,
      ortogonal: <Ortogonal />,
      cruzado: <Cruzado />,
      resultado: <Resultado />,
      cuando: <Cuando />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
