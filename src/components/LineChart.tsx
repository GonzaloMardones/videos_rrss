import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";
import { fmt } from "./format";

export type LinePoint = { label: string; value: number };

type Props = {
  data: LinePoint[];
  yMin: number;
  yMax: number;
  width?: number;
  height?: number;
  delay?: number;
  duration?: number;
  color?: string;
  decimals?: number;
  unit?: string;
  band?: { min: number; max: number; label: string };
  target?: { value: number; label: string };
  annotation?: { index: number; lines: string[]; color?: string };
  xLabelSize?: number;
};

// Línea que se dibuja de izquierda a derecha, con la cifra sobre cada punto.
export const LineChart: React.FC<Props> = ({
  data,
  yMin,
  yMax,
  width = 880,
  height = 520,
  delay = 0,
  duration = 50,
  color = colors.blue,
  decimals = 1,
  unit = "",
  band,
  target,
  annotation,
  xLabelSize = 24,
}) => {
  const frame = useCurrentFrame();
  const padX = 34;
  const padTop = annotation ? 120 : 60;
  const padBottom = 56;
  const plotW = width - padX * 2;
  const plotH = height - padTop - padBottom;
  const x = (i: number) => padX + (i * plotW) / (data.length - 1);
  const y = (v: number) => padTop + ((yMax - v) / (yMax - yMin)) * plotH;

  const progress = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const decor = interpolate(frame - delay + 12, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const points = data.map((d, i) => [x(i), y(d.value)] as const);
  let length = 0;
  for (let i = 1; i < points.length; i++) {
    length += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  }
  const reached = progress * (data.length - 1);

  const annotationOpacity = annotation
    ? interpolate(reached, [annotation.index - 0.2, annotation.index + 0.4], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <svg width={width} height={height} style={{ overflow: "visible", fontFamily: fonts.sans }}>
      {band ? (
        <g opacity={decor}>
          <rect x={0} y={y(band.max)} width={width} height={y(band.min) - y(band.max)} fill={colors.blueMist} opacity={0.45} />
          <text x={width - 8} y={y(band.min) - 12} textAnchor="end" fontSize={22} fontWeight={600} fill={colors.navy} opacity={0.75}>
            {band.label}
          </text>
        </g>
      ) : null}

      {target ? (
        <g opacity={decor}>
          <line x1={0} x2={width} y1={y(target.value)} y2={y(target.value)} stroke={colors.navy} strokeWidth={2} strokeDasharray="10 8" />
          <text x={width - 8} y={y(target.value) + 32} textAnchor="end" fontSize={22} fontWeight={700} fill={colors.navy}>
            {target.label}
          </text>
        </g>
      ) : null}

      {annotation ? (
        <g opacity={annotationOpacity}>
          <line
            x1={x(annotation.index)}
            x2={x(annotation.index)}
            y1={padTop - 10}
            y2={height - padBottom}
            stroke={annotation.color ?? colors.alert}
            strokeWidth={2}
            strokeDasharray="4 6"
          />
          {annotation.lines.map((line, i) => (
            <text
              key={line}
              x={x(annotation.index) - 14}
              y={padTop - 30 + i * 28 - (annotation.lines.length - 1) * 28}
              textAnchor="end"
              fontSize={23}
              fontWeight={600}
              fill={annotation.color ?? colors.alert}
            >
              {line}
            </text>
          ))}
        </g>
      ) : null}

      <polyline
        points={points.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={length * (1 - progress)}
      />

      {points.map(([px, py], i) => {
        const shown = interpolate(reached, [i - 0.3, i], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const isLast = i === points.length - 1;
        return (
          <g key={data[i].label} opacity={shown}>
            <circle cx={px} cy={py} r={isLast ? 11 : 7} fill={isLast ? color : colors.paper} stroke={color} strokeWidth={4} />
            <text
              x={px}
              y={py - 20}
              textAnchor="middle"
              fontSize={isLast ? 34 : 24}
              fontWeight={isLast ? 800 : 600}
              fill={isLast ? color : colors.ink}
              stroke={colors.paper}
              strokeWidth={6}
              paintOrder="stroke"
            >
              {fmt(data[i].value, decimals)}
              {unit}
            </text>
          </g>
        );
      })}

      {data.map((d, i) => (
        <text key={d.label} x={x(i)} y={height - padBottom + 40} textAnchor="middle" fontSize={xLabelSize} fill={colors.muted}>
          {d.label}
        </text>
      ))}
    </svg>
  );
};
