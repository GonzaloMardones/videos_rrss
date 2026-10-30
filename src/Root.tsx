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
      <Composition id="Tec02-Piezas" component={Piezas} durationInFrames={1} fps={VIDEO.fps} width={960} height={540} defaultProps={{ pieza: 0 }} />
      <MyComposition />
    </>
  );
};
