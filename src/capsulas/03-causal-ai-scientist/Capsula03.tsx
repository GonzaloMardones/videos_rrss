import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { FondoVacio } from "../../estilos/vacio/Particulas";
import { v } from "../../estilos/vacio/tokens";
import { SubtitulosVacio } from "../../estilos/vacio/ui";
import { Arbol, Balance, Cais, Cierre, Contrafactual, Correlacion, Ejemplo, Etapas, Experimento, Gancho, Limites, Metodos, Problema, Titulo, Validacion } from "./escenas";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type Capsula03Props = { serie: string; autor: string; volumenMusica: number };

export const CAPSULA03_FRAMES = duracionCapitulo(timeline);

const POPS = ["ventas", "agente", "helados", "confusor", "formula", "nunca", "promedios", "did", "rdd", "iv", "emparejar", "directo", "entrada", "salida", "leer", "elegir", "validar", "ejecutar", "ramas", "auditar", "paralelas", "fuerte", "vuelve", "resta", "divide", "camino", "resultado", "ocultos", "metodo", "cta"];

export const Capsula03: React.FC<Capsula03Props> = ({ serie, autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="tec03"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoVacio />}
    Subtitulos={SubtitulosVacio}
    progreso={{ color: v.iris, alto: 4 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo serie={serie} autor={autor} />,
      correlacion: <Correlacion />,
      contrafactual: <Contrafactual />,
      experimento: <Experimento />,
      metodos: <Metodos />,
      problema: <Problema />,
      cais: <Cais />,
      etapas: <Etapas />,
      arbol: <Arbol />,
      validacion: <Validacion />,
      balance: <Balance />,
      ejemplo: <Ejemplo />,
      limites: <Limites />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
