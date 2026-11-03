import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { Cierre } from "./escenas/Cierre";
import { Gancho, Titulo } from "./escenas/Apertura";
import { Cobre, Crecimiento, Empleo, Fiscal, Inflacion, Tasa } from "./escenas/Indicadores";
import { BancoCentral, Deuda, Futuro, ParaTi } from "./escenas/Contexto";
import { CORTE } from "./data";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Capitulo01Props = {
  serie: string;
  autor: string;
  volumenMusica: number;
};

export const CAPITULO01_FRAMES = duracionCapitulo(timeline);

// Momentos en que suena un "pop": cuando aparece una cifra clave.
const POPS = ["cobre", "pib", "barras", "proyeccion", "precio", "cantidad", "hoy", "mision", "quieta", "tasa", "deficit", "intereses", "regla", "rebote", "sueldo", "creditos", "colchon", "cta"];

export const Capitulo01: React.FC<Capitulo01Props> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="cap01"
    volumenMusica={volumenMusica}
    pops={POPS}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      crecimiento: <Crecimiento />,
      cobre: <Cobre />,
      inflacion: <Inflacion />,
      bancocentral: <BancoCentral />,
      tasa: <Tasa />,
      empleo: <Empleo />,
      fiscal: <Fiscal />,
      deuda: <Deuda />,
      futuro: <Futuro />,
      tu: <ParaTi />,
      cierre: <Cierre autor={autor} corte={CORTE} />,
    }}
  />
);
