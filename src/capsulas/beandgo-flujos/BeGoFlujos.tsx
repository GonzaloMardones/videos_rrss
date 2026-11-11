import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { Antes, Boleta, BusFlujo, Cierre, Contexto, Cotizar, Intro, Mapa, Probado, Reclamos, Ruta } from "./escenas";
import { FondoM3, m, SubtitulosM3 } from "./m3";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type BeGoFlujosProps = { serie: string; autor: string; volumenMusica: number };

export const BEGOFLUJOS_FRAMES = duracionCapitulo(timeline);

const POPS = ["tres", "flujos", "flexible", "veredicto", "modos", "aviso", "dos", "riesgo", "pasos", "habito", "evaluacion", "pruebas", "lema"];

// Video horizontal (1920×1080): Be&Go para quien no la conoce, los siete flujos y las novedades del 10 y 11 de
// noviembre de 2026, con tipografía y movimiento de Material 3 Expressive y la paleta tonal de Be&Go.
export const BeGoFlujos: React.FC<BeGoFlujosProps> = ({ autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="beandgo-flujos"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoM3 />}
    Subtitulos={SubtitulosM3}
    progreso={{ color: m.primary, alto: 6 }}
    escenas={{
      intro: <Intro />,
      mapa: <Mapa />,
      cotizar: <Cotizar />,
      ruta: <Ruta />,
      antes: <Antes />,
      bus: <BusFlujo />,
      boleta: <Boleta />,
      contexto: <Contexto />,
      reclamos: <Reclamos />,
      probado: <Probado />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
