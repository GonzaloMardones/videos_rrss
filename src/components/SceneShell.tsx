import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, SAFE } from "../theme";
import { clamp } from "./motion";
import { useScene } from "./narracion";

export type Transition = "zoom" | "rise" | "slide" | "tilt" | "none";

export const ENTER = 16;
export const EXIT = 14;

type Props = {
  entrada?: Transition;
  source?: string;
  children: React.ReactNode;
};

const enterStyle = (kind: Transition, p: number): React.CSSProperties => {
  const q = 1 - p;
  switch (kind) {
    case "zoom":
      return { transform: `scale(${1 + q * 0.25})`, filter: `blur(${q * 24}px)`, opacity: p };
    case "rise":
      return { transform: `translateY(${q * 260}px) scale(${1 - q * 0.08})`, filter: `blur(${q * 16}px)`, opacity: p };
    case "slide":
      return { transform: `translateX(${q * 420}px) rotate(${q * 4}deg)`, filter: `blur(${q * 16}px)`, opacity: p };
    case "tilt":
      return {
        transform: `perspective(1600px) rotateX(${q * 28}deg) translateY(${q * 140}px)`,
        filter: `blur(${q * 14}px)`,
        opacity: p,
      };
    default:
      return {};
  }
};

// Envoltorio de cada escena: transición de entrada y salida, y la fuente al pie.
export const SceneShell: React.FC<Props> = ({ entrada = "zoom", source, children }) => {
  const frame = useCurrentFrame();
  const { duration } = useScene();
  const pIn = entrada === "none" ? 1 : interpolate(frame, [0, ENTER], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const pOut = interpolate(frame, [duration - EXIT, duration], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const enter = enterStyle(entrada, pIn);

  return (
    <AbsoluteFill
      style={{
        opacity: ((enter.opacity as number | undefined) ?? 1) * (1 - pOut),
        transform: `${enter.transform ?? ""} scale(${1 - pOut * 0.12})`,
        filter: `${enter.filter ?? ""} blur(${pOut * 18}px)`,
        fontFamily: fonts.sans,
        color: colors.text,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: SAFE.top + 20,
          left: SAFE.left,
          right: SAFE.right,
          bottom: 1920 - SAFE.contentBottom + 56,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>

      {source ? (
        <div
          style={{
            position: "absolute",
            left: SAFE.left,
            right: SAFE.right,
            top: SAFE.contentBottom - 36,
            fontSize: 22,
            fontWeight: 500,
            color: colors.faint,
          }}
        >
          Fuente: {source}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
