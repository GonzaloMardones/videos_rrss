import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { VIDEO } from "./theme";
import { Capitulo01, CAPITULO01_FRAMES } from "./capitulos/01-chile-2026/Capitulo01";
import { Capitulo02, CAPITULO02_FRAMES } from "./capitulos/02-stolper-samuelson/Capitulo02";
import { Capitulo03, CAPITULO03_FRAMES } from "./capitulos/03-inflacion-autonomia/Capitulo03";
import { Capitulo04, CAPITULO04_FRAMES } from "./capitulos/04-zanja-frontera/Capitulo04";
import { Capitulo05, CAPITULO05_FRAMES } from "./capitulos/05-apuesta-afp/Capitulo05";
import { Capitulo06, CAPITULO06_FRAMES } from "./capitulos/06-quien-gana/Capitulo06";
import { Capsula01, CAPSULA01_FRAMES } from "./capsulas/01-anatomia-ia/Capsula01";
import { Capsula02, CAPSULA02_FRAMES } from "./capsulas/02-agente-grafo/Capsula02";
import { Capsula03, CAPSULA03_FRAMES } from "./capsulas/03-causal-ai-scientist/Capsula03";
import { CausalDiD, CAUSALDID_FRAMES } from "./capsulas/causal-did/CausalDiD";
import { CausalRDD, CAUSALRDD_FRAMES } from "./capsulas/causal-rdd/CausalRDD";
import { CausalIV, CAUSALIV_FRAMES } from "./capsulas/causal-iv/CausalIV";
import { CausalEmparejamiento, CAUSALEMPAREJAMIENTO_FRAMES } from "./capsulas/causal-emparejamiento/CausalEmparejamiento";
import { CausalMapa, CAUSALMAPA_FRAMES } from "./capsulas/causal-mapa/CausalMapa";
import { Piezas } from "./capsulas/02-agente-grafo/Piezas";
import { Exp01Mde, EXP01MDE_FRAMES } from "./capsulas/exp-01-mde/Exp01Mde";
import { Exp02Cuped, EXP02CUPED_FRAMES } from "./capsulas/exp-02-cuped/Exp02Cuped";
import { Exp03Peeking, EXP03PEEKING_FRAMES } from "./capsulas/exp-03-peeking/Exp03Peeking";
import { Exp04Multiples, EXP04MULTIPLES_FRAMES } from "./capsulas/exp-04-multiples/Exp04Multiples";
import { Exp05Srm, EXP05SRM_FRAMES } from "./capsulas/exp-05-srm/Exp05Srm";
import { Exp06Guardas, EXP06GUARDAS_FRAMES } from "./capsulas/exp-06-guardas/Exp06Guardas";
import { Exp07Interferencia, EXP07INTERFERENCIA_FRAMES } from "./capsulas/exp-07-interferencia/Exp07Interferencia";
import { Exp08Zoo, EXP08ZOO_FRAMES } from "./capsulas/exp-08-zoo/Exp08Zoo";
import { Exp09Hte, EXP09HTE_FRAMES } from "./capsulas/exp-09-hte/Exp09Hte";
import { Exp10Uplift, EXP10UPLIFT_FRAMES } from "./capsulas/exp-10-uplift/Exp10Uplift";
import { Exp11Bandits, EXP11BANDITS_FRAMES } from "./capsulas/exp-11-bandits/Exp11Bandits";
import { Exp12Sintetico, EXP12SINTETICO_FRAMES } from "./capsulas/exp-12-sintetico/Exp12Sintetico";
import { Exp13Series, EXP13SERIES_FRAMES } from "./capsulas/exp-13-series/Exp13Series";
import { Exp14Dags, EXP14DAGS_FRAMES } from "./capsulas/exp-14-dags/Exp14Dags";
import { Exp15Sensibilidad, EXP15SENSIBILIDAD_FRAMES } from "./capsulas/exp-15-sensibilidad/Exp15Sensibilidad";
import { Exp16DML, EXP16DML_FRAMES } from "./capsulas/exp-16-dml/Exp16DML";
import { Exp17Mediacion, EXP17MEDIACION_FRAMES } from "./capsulas/exp-17-mediacion/Exp17Mediacion";
import { Cuasi01Piramide, CUASI01PIRAMIDE_FRAMES } from "./capsulas/cuasi-01-piramide/Cuasi01Piramide";
import { Cuasi02Definicion, CUASI02DEFINICION_FRAMES } from "./capsulas/cuasi-02-definicion/Cuasi02Definicion";
import { Cuasi03Amenazas, CUASI03AMENAZAS_FRAMES } from "./capsulas/cuasi-03-amenazas/Cuasi03Amenazas";
import { Cuasi04Regresion, CUASI04REGRESION_FRAMES } from "./capsulas/cuasi-04-regresion/Cuasi04Regresion";
import { Cuasi05Escalonado, CUASI05ESCALONADO_FRAMES } from "./capsulas/cuasi-05-escalonado/Cuasi05Escalonado";
import { Cuasi06Umbral, CUASI06UMBRAL_FRAMES } from "./capsulas/cuasi-06-umbral/Cuasi06Umbral";
import { Cuasi07Natural, CUASI07NATURAL_FRAMES } from "./capsulas/cuasi-07-natural/Cuasi07Natural";
import { Cuasi08Interferencia, CUASI08INTERFERENCIA_FRAMES } from "./capsulas/cuasi-08-interferencia/Cuasi08Interferencia";
import { Cuasi09Cadena, CUASI09CADENA_FRAMES } from "./capsulas/cuasi-09-cadena/Cuasi09Cadena";
import { Cuasi10Juez, CUASI10JUEZ_FRAMES } from "./capsulas/cuasi-10-juez/Cuasi10Juez";
import { Cuasi11Equipo, CUASI11EQUIPO_FRAMES } from "./capsulas/cuasi-11-equipo/Cuasi11Equipo";
import { DS27Tensores, DS27TENSORES_FRAMES } from "./capsulas/ds27-01-tensores/DS27Tensores";
import { BeGoMVP, BEGOMVP_FRAMES } from "./capsulas/beandgo-mvp/BeGoMVP";
import { BeGoEstado, BEGOESTADO_FRAMES } from "./capsulas/beandgo-estado/BeGoEstado";
import { HD } from "./estilos/beandgo/tokens";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Cap01-Chile2026"
        component={Capitulo01}
        durationInFrames={CAPITULO01_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Economía en simple",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cap02-StolperSamuelson"
        component={Capitulo02}
        durationInFrames={CAPITULO02_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Economía en simple",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cap03-InflacionAutonomia"
        component={Capitulo03}
        durationInFrames={CAPITULO03_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Economía en simple",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cap04-ZanjaFrontera"
        component={Capitulo04}
        durationInFrames={CAPITULO04_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Economía en simple",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cap05-ApuestaAFP"
        component={Capitulo05}
        durationInFrames={CAPITULO05_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Economía en simple",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cap06-QuienGana"
        component={Capitulo06}
        durationInFrames={CAPITULO06_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Economía en simple",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Tec01-AnatomiaIA"
        component={Capsula01}
        durationInFrames={CAPSULA01_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cápsulas técnicas",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Tec02-AgenteGrafo"
        component={Capsula02}
        durationInFrames={CAPSULA02_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cápsulas técnicas",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Tec03-CausalAIScientist"
        component={Capsula03}
        durationInFrames={CAPSULA03_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cápsulas técnicas",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Causal-DiD"
        component={CausalDiD}
        durationInFrames={CAUSALDID_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Métodos causales",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Causal-RDD"
        component={CausalRDD}
        durationInFrames={CAUSALRDD_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Métodos causales",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Causal-IV"
        component={CausalIV}
        durationInFrames={CAUSALIV_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Métodos causales",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Causal-Emparejamiento"
        component={CausalEmparejamiento}
        durationInFrames={CAUSALEMPAREJAMIENTO_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Métodos causales",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Causal-Mapa"
        component={CausalMapa}
        durationInFrames={CAUSALMAPA_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Métodos causales",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp01-MDE"
        component={Exp01Mde}
        durationInFrames={EXP01MDE_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp02-CUPED"
        component={Exp02Cuped}
        durationInFrames={EXP02CUPED_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp03-Peeking"
        component={Exp03Peeking}
        durationInFrames={EXP03PEEKING_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp04-Multiples"
        component={Exp04Multiples}
        durationInFrames={EXP04MULTIPLES_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp05-SRM"
        component={Exp05Srm}
        durationInFrames={EXP05SRM_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp06-Guardas"
        component={Exp06Guardas}
        durationInFrames={EXP06GUARDAS_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp07-Interferencia"
        component={Exp07Interferencia}
        durationInFrames={EXP07INTERFERENCIA_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp08-Zoo"
        component={Exp08Zoo}
        durationInFrames={EXP08ZOO_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp09-HTE"
        component={Exp09Hte}
        durationInFrames={EXP09HTE_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp10-Uplift"
        component={Exp10Uplift}
        durationInFrames={EXP10UPLIFT_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp11-Bandits"
        component={Exp11Bandits}
        durationInFrames={EXP11BANDITS_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp12-Sintetico"
        component={Exp12Sintetico}
        durationInFrames={EXP12SINTETICO_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp13-Series"
        component={Exp13Series}
        durationInFrames={EXP13SERIES_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp14-DAGs"
        component={Exp14Dags}
        durationInFrames={EXP14DAGS_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp15-Sensibilidad"
        component={Exp15Sensibilidad}
        durationInFrames={EXP15SENSIBILIDAD_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp16-DML"
        component={Exp16DML}
        durationInFrames={EXP16DML_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Exp17-Mediacion"
        component={Exp17Mediacion}
        durationInFrames={EXP17MEDIACION_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "El mapa de la experimentación",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cuasi01-Piramide"
        component={Cuasi01Piramide}
        durationInFrames={CUASI01PIRAMIDE_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cuasi-experimentos",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cuasi02-Definicion"
        component={Cuasi02Definicion}
        durationInFrames={CUASI02DEFINICION_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cuasi-experimentos",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cuasi03-Amenazas"
        component={Cuasi03Amenazas}
        durationInFrames={CUASI03AMENAZAS_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cuasi-experimentos",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cuasi04-Regresion"
        component={Cuasi04Regresion}
        durationInFrames={CUASI04REGRESION_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cuasi-experimentos",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cuasi05-Escalonado"
        component={Cuasi05Escalonado}
        durationInFrames={CUASI05ESCALONADO_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cuasi-experimentos",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cuasi06-Umbral"
        component={Cuasi06Umbral}
        durationInFrames={CUASI06UMBRAL_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cuasi-experimentos",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cuasi07-Natural"
        component={Cuasi07Natural}
        durationInFrames={CUASI07NATURAL_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cuasi-experimentos",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cuasi08-Interferencia"
        component={Cuasi08Interferencia}
        durationInFrames={CUASI08INTERFERENCIA_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cuasi-experimentos",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cuasi09-Cadena"
        component={Cuasi09Cadena}
        durationInFrames={CUASI09CADENA_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cuasi-experimentos",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cuasi10-Juez"
        component={Cuasi10Juez}
        durationInFrames={CUASI10JUEZ_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cuasi-experimentos",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="Cuasi11-Equipo"
        component={Cuasi11Equipo}
        durationInFrames={CUASI11EQUIPO_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Cuasi-experimentos",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="DS27-01-Tensores"
        component={DS27Tensores}
        durationInFrames={DS27TENSORES_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          serie: "Data Scientist 2027",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.14,
        }}
      />
      <Composition
        id="BeGo-MVP"
        component={BeGoMVP}
        durationInFrames={BEGOMVP_FRAMES}
        fps={HD.fps}
        width={HD.width}
        height={HD.height}
        defaultProps={{
          serie: "Be&Go",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.12,
        }}
      />
      <Composition
        id="BeGo-Estado"
        component={BeGoEstado}
        durationInFrames={BEGOESTADO_FRAMES}
        fps={HD.fps}
        width={HD.width}
        height={HD.height}
        defaultProps={{
          serie: "Be&Go",
          autor: "Gonzalo Mardones",
          volumenMusica: 0.12,
        }}
      />
      <Composition id="Tec02-Piezas" component={Piezas} durationInFrames={1} fps={VIDEO.fps} width={960} height={540} defaultProps={{ pieza: 0 }} />
      <MyComposition />
    </>
  );
};
