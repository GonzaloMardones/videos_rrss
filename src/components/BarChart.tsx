import React, { useId } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { fmt } from "./format";

export type BarItem = {
  label: string;
  value?: number;
  // Para proyecciones: se dibuja una barra sólida hasta `min` y un tramo rayado hasta `max`.
  range?: { min: number; max: number };
  color?: string;
};

type Props = {
  items: BarItem[];
  maxValue: number;
  width?: number;
  height?: number;
  delay?: number;
  stagger?: number;
  decimals?: number;
  unit?: string;
  labelSize?: number;
};

export const BarChart: React.FC<Props> = ({
  items,
  maxValue,
  width = 880,
  height = 460,
  delay = 0,
  stagger = 8,
  decimals = 1,
  unit = "%",
  labelSize = 34,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const patternId = `hatch-${useId().replace(/:/g, "")}`;

  const padTop = 70;
  const padBottom = 64;
  const baseline = height - padBottom;
  const plotHeight = baseline - padTop;
  const slot = width / items.length;
  const barWidth = Math.min(160, slot * 0.58);
  const y = (v: number) => baseline - (v / maxValue) * plotHeight;

  const rangeLabel = (r: { min: number; max: number }) => {
    // Muestra solo los decimales que el dato tiene: 2 → "2", 0,25 → "0,25".
    const d = (n: number) => (Number.isInteger(n) ? 0 : Math.round(n * 10) === n * 10 ? 1 : 2);
    return `${fmt(r.min, d(r.min))}–${fmt(r.max, d(r.max))}${unit}`;
  };

  return (
    <svg width={width} height={height} style={{ overflow: "visible", fontFamily: fonts.sans }}>
      <defs>
        <pattern id={patternId} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="14" height="14" fill={colors.paper} />
          <line x1="0" y1="0" x2="0" y2="14" stroke={colors.blue} strokeWidth="6" />
        </pattern>
      </defs>

      <line x1={0} x2={width} y1={baseline} y2={baseline} stroke={colors.navy} strokeWidth={2} />

      {items.map((item, i) => {
        const progress = spring({
          frame: frame - delay - i * stagger,
          fps,
          config: { damping: 200 },
          durationInFrames: 28,
        });
        const cx = slot * i + slot / 2;
        const x = cx - barWidth / 2;
        const solidValue = item.range ? item.range.min : item.value ?? 0;
        const color = item.color ?? (item.range ? colors.blue : colors.navy);
        const solidTop = y(solidValue * progress);
        const topValue = item.range ? item.range.max : solidValue;
        const labelY = y(topValue * progress) - 18;

        return (
          <g key={item.label}>
            <rect x={x} y={solidTop} width={barWidth} height={baseline - solidTop} fill={color} />
            {item.range ? (
              <rect
                x={x}
                y={y(item.range.max * progress)}
                width={barWidth}
                height={Math.max(0, y(item.range.min * progress) - y(item.range.max * progress))}
                fill={`url(#${patternId})`}
                stroke={colors.blue}
                strokeWidth={3}
              />
            ) : null}
            <text
              x={cx}
              y={labelY}
              textAnchor="middle"
              fontSize={labelSize}
              fontWeight={700}
              fill={color}
              opacity={progress}
            >
              {item.range ? rangeLabel(item.range) : `${fmt(solidValue, decimals)}${unit}`}
            </text>
            <text x={cx} y={baseline + 44} textAnchor="middle" fontSize={28} fontWeight={600} fill={colors.ink}>
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
