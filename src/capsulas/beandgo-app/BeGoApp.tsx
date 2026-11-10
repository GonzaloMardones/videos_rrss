import React from "react";
import { Capitulo, duracionCapitulo } from "../../components/Capitulo";
import type { Timeline } from "../../components/narracion";
import { BusEsc, Cierre, CombinacionEsc, CopilotoEsc, Dentro, Diseno, Gancho, Honesto, InicioEsc, MapaEsc, Que, ResumenEsc, Titulo, Veredicto } from "./escenas";
import { FondoApp, SubtitulosApp, t } from "./ios";
import timelineJson from "./timeline.json";

const timeline = timelineJson as Timeline;

export type BeGoAppProps = { serie: string; autor: string; volumenMusica: number };

export const BEGOAPP_FRAMES = duracionCapitulo(timeline);

const POPS = ["responde", "marca", "ilustraciones", "veredicto", "total", "avisos", "live", "derechos", "bajada", "fin", "regla", "curico", "lema"];

// Video horizontal (1920×1080): qué es Be&Go y cómo se ve la app de iPhone según el diseño de Figma (10-nov-2026).
export const BeGoApp: React.FC<BeGoAppProps> = ({ autor, volumenMusica }) => (
  <Capitulo
    timeline={timeline}
    carpeta="beandgo-app"
    volumenMusica={volumenMusica}
    pops={POPS}
    fondo={<FondoApp />}
    Subtitulos={SubtitulosApp}
    progreso={{ color: t.copihue, alto: 6 }}
    escenas={{
      gancho: <Gancho />,
      titulo: <Titulo autor={autor} />,
      que: <Que />,
      diseno: <Diseno />,
      inicio: <InicioEsc />,
      veredicto: <Veredicto />,
      combinacion: <CombinacionEsc />,
      copiloto: <CopilotoEsc />,
      bus: <BusEsc />,
      mapa: <MapaEsc />,
      resumen: <ResumenEsc />,
      dentro: <Dentro />,
      honesto: <Honesto />,
      cierre: <Cierre autor={autor} />,
    }}
  />
);
