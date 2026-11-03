import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Cierre, Cuenta, Datos, FormulaEsc, Gancho, Propension, Qini, Segmentos, Titulo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Exp10UpliftProps = { serie: string; autor: string; volumenMusica: number };

export const EXP10UPLIFT_FRAMES = duracionCapitulo(timeline);

const POPS = ["gancho", "cuatro", "persuadibles", "seguros", "perdidos", "molestar", "propension", "formula", "cuenta", "qini", "forma", "area", "datos", "cta"];

export const Exp10Uplift: React.FC<Exp10UpliftProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="exp-10-uplift"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      segmentos: <Segmentos />,
      propension: <Propension />,
      formula: <FormulaEsc />,
      cuenta: <Cuenta />,
      qini: <Qini />,
      datos: <Datos />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
