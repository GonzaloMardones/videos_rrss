import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { VIDEO } from "./theme";
import { Capitulo01, CAPITULO01_FRAMES } from "./capitulos/01-chile-2026/Capitulo01";

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
          programa: "Apuntes del MAE Weekend · FEN",
          autor: "Gonzalo Mardones",
        }}
      />
      <MyComposition />
    </>
  );
};
