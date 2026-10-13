import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { VIDEO } from "./theme";
import { Capitulo01, CAPITULO01_FRAMES } from "./capitulos/01-chile-2026/Capitulo01";
import { Capitulo02, CAPITULO02_FRAMES } from "./capitulos/02-stolper-samuelson/Capitulo02";

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
      <MyComposition />
    </>
  );
};
