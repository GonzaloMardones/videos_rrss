import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoNube, SubtitulosNube } from "../../estilos/nube/kit";
import { n } from "../../estilos/nube/tokens";
import { Bases, Cierre, Colapso, Escala, Gancho, Jaccard, Lsh, Minhash, Nube, Sintetico, Titulo, Verificador } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type DS27DatosProps = { serie: string; autor: string; volumenMusica: number };

export const DS27DATOS_FRAMES = duracionCapitulo(timeline);

const POPS = ["c4", "diez", "shingles", "indice", "pares", "truco", "firma", "bandas", "curva", "chinchilla", "mezcla", "evol", "filtro", "bayes", "posterior", "cola", "sigma", "gcp", "bases", "cta"];

export const DS27Datos: React.FC<DS27DatosProps> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="ds27-02-datos"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoNube />}
    Subtitulos={SubtitulosNube}
    progreso={{ color: n.azul, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      jaccard: <Jaccard />,
      minhash: <Minhash />,
      lsh: <Lsh />,
      escala: <Escala />,
      sintetico: <Sintetico />,
      verificador: <Verificador />,
      colapso: <Colapso />,
      nube: <Nube />,
      bases: <Bases />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
