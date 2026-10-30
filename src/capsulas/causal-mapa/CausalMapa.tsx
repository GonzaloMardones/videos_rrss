import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Bandits, Cierre, Cuped, Dags, Dml, Gancho, Guardas, Hte, Impacto, Interferencia, Mde, Mediacion, Multiples, Peeking, Sensibilidad, Sintetico, Srm, Titulo, Uplift, Zoo } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type CausalMapaProps = { serie: string; autor: string; volumenMusica: number };

export const CAUSALMAPA_FRAMES = duracionCapitulo(timeline);

const POPS = ["lanzar", "mapa", "mde", "cuadruple", "cuped", "peeking", "multiples", "srm", "guardas", "interferencia", "zoo", "hte", "uplift", "bandits", "sintetico", "impacto", "dags", "sensibilidad", "dml", "mediacion", "cta"];

export const CausalMapa: React.FC<CausalMapaProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="causal-mapa"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      mde: <Mde />,
      cuped: <Cuped />,
      peeking: <Peeking />,
      multiples: <Multiples />,
      srm: <Srm />,
      guardas: <Guardas />,
      interferencia: <Interferencia />,
      zoo: <Zoo />,
      hte: <Hte />,
      uplift: <Uplift />,
      bandits: <Bandits />,
      sintetico: <Sintetico />,
      impacto: <Impacto />,
      dags: <Dags />,
      sensibilidad: <Sensibilidad />,
      dml: <Dml />,
      mediacion: <Mediacion />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
