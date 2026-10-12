import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { fmt } from "./format";

type Props = {
  value: number;
  from?: number;
  decimals?: number;
  delay?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  signed?: boolean;
};

// Cuenta desde `from` hasta `value` para que el número "se arme" frente al espectador.
export const AnimatedNumber: React.FC<Props> = ({
  value,
  from = 0,
  decimals = 1,
  delay = 0,
  duration = 30,
  prefix = "",
  suffix = "",
  signed = false,
}) => {
  const frame = useCurrentFrame();
  const current = interpolate(frame - delay, [0, duration], [from, value], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const sign = signed && value > 0 ? "+" : current < 0 ? "−" : "";

  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {sign}
      {fmt(Math.abs(current), decimals)}
      {suffix}
    </span>
  );
};
