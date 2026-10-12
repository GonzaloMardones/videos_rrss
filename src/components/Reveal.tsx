import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  delay?: number;
  duration?: number;
  distance?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

// Aparece con un fundido y un leve desplazamiento hacia arriba.
export const Reveal: React.FC<Props> = ({
  delay = 0,
  duration = 18,
  distance = 36,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * distance}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
