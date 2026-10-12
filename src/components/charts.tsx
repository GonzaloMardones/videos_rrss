import React, { useId } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { clamp } from "./motion";
import { fmt, fmtAuto } from "./ui";

const stops = {
  warm: [colors.orange, colors.pink],
  cool: [colors.cyan, colors.violet],
  white: ["#FFFFFF", "#C9C3E8"],
  gold: [colors.gold, colors.orange],
} as const;
export type Tone = keyof typeof stops;

const useUid = () => useId().replace(/:/g, "");

export type GlowBar = { label: string; value?: number; range?: { min: number; max: number }; tone: Tone; at: number };

// Barras con degradado y brillo. Una proyección se dibuja rayada entre su mínimo y su máximo.
export const GlowBars: React.FC<{ items: GlowBar[]; max: number; width?: number; height?: number; unit?: string }> = ({
  items,
  max,
  width = 936,
  height = 520,
  unit = "%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const id = useUid();
  const padTop = 84;
  const base = height - 70;
  const slot = width / items.length;
  const bw = Math.min(170, slot * 0.6);
  const y = (v: number) => base - (v / max) * (base - padTop);

  return (
    <svg width={width} height={height} style={{ overflow: "visible", fontFamily: fonts.display }}>
      <defs>
        {Object.entries(stops).map(([k, [a, b]]) => (
          <linearGradient key={k} id={`${id}-${k}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={a} />
            <stop offset="100%" stopColor={b} />
          </linearGradient>
        ))}
        {Object.entries(stops).map(([k, [a]]) => (
          <pattern key={k} id={`${id}-hatch-${k}`} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="16" stroke={a} strokeWidth="7" />
          </pattern>
        ))}
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <line x1={0} x2={width} y1={base} y2={base} stroke={colors.line} strokeWidth={3} />
      {items.map((it, i) => {
        const p = spring({ frame: frame - it.at, fps, config: { damping: 14, stiffness: 120 } });
        const cx = slot * i + slot / 2;
        const x = cx - bw / 2;
        const solid = it.range ? it.range.min : it.value ?? 0;
        const top = it.range ? it.range.max : solid;
        const solidTop = y(solid * p);
        const fill = `url(#${id}-${it.tone})`;
        const label = it.range ? `${fmtAuto(it.range.min)}–${fmtAuto(it.range.max)}${unit}` : `${fmt(solid * Math.min(1, p))}${unit}`;
        const shown = interpolate(frame - it.at, [0, 6], [0, 1], clamp);
        return (
          <g key={it.label} opacity={shown}>
            <rect x={x} y={y(top * p)} width={bw} height={base - y(top * p)} rx={22} fill={fill} filter={`url(#${id}-glow)`} opacity={0.55} />
            {it.range ? (
              <rect
                x={x}
                y={y(it.range.max * p)}
                width={bw}
                height={Math.max(0, base - y(it.range.max * p))}
                rx={22}
                fill={`url(#${id}-hatch-${it.tone})`}
                stroke={stops[it.tone][0]}
                strokeWidth={4}
                opacity={0.95}
              />
            ) : null}
            <rect x={x} y={solidTop} width={bw} height={Math.max(0, base - solidTop)} rx={solid > 0.4 ? 22 : 8} fill={fill} />
            <text x={cx} y={y(top * p) - 24} textAnchor="middle" fontSize={it.range ? 38 : 46} fontWeight={800} fill={colors.text}>
              {label}
            </text>
            <text x={cx} y={base + 50} textAnchor="middle" fontSize={30} fontWeight={600} fill={colors.dim}>
              {it.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

type LineProps = {
  data: { label: string; value: number }[];
  yMin: number;
  yMax: number;
  reached: number; // índice (fraccional) hasta donde se ha dibujado la línea
  width?: number;
  height?: number;
  tone?: Tone;
  unit?: string;
  band?: { min: number; max: number; label: string; opacity: number };
  target?: { value: number; label: string; opacity: number };
  annotation?: { index: number; lines: string[]; opacity: number };
  labelSize?: number;
};

// Línea luminosa con degradado que se dibuja a medida que avanza la historia.
export const GlowLine: React.FC<LineProps> = ({
  data,
  yMin,
  yMax,
  reached,
  width = 936,
  height = 560,
  tone = "warm",
  unit = "%",
  band,
  target,
  annotation,
  labelSize = 26,
}) => {
  const frame = useCurrentFrame();
  const id = useUid();
  const padX = 40;
  const padTop = annotation ? 130 : 70;
  const padBottom = 60;
  const x = (i: number) => padX + (i * (width - padX * 2)) / (data.length - 1);
  const y = (v: number) => padTop + ((yMax - v) / (yMax - yMin)) * (height - padTop - padBottom);
  const [a, b] = stops[tone];

  const full = Math.floor(reached);
  const frac = reached - full;
  const pts: [number, number][] = data.slice(0, full + 1).map((d, i) => [x(i), y(d.value)]);
  if (full < data.length - 1 && frac > 0) {
    const [x0, y0] = [x(full), y(data[full].value)];
    const [x1, y1] = [x(full + 1), y(data[full + 1].value)];
    pts.push([x0 + (x1 - x0) * frac, y0 + (y1 - y0) * frac]);
  }
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const area = pts.length > 1 ? `${path} L${pts[pts.length - 1][0]},${height - padBottom} L${pts[0][0]},${height - padBottom} Z` : "";
  const head = pts[pts.length - 1];
  const isDone = reached >= data.length - 1;
  const pulse = 1 + Math.sin(frame * 0.25) * 0.25;

  return (
    <svg width={width} height={height} style={{ overflow: "visible", fontFamily: fonts.display }}>
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={b} />
          <stop offset="100%" stopColor={a} />
        </linearGradient>
        <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={a} stopOpacity={0.35} />
          <stop offset="100%" stopColor={a} stopOpacity={0} />
        </linearGradient>
        <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {band ? (
        <g opacity={band.opacity}>
          <rect x={0} y={y(band.max)} width={width} height={y(band.min) - y(band.max)} rx={18} fill="rgba(34,211,238,0.10)" stroke="rgba(34,211,238,0.35)" strokeWidth={2} />
          <text x={width - 16} y={y(band.min) - 16} textAnchor="end" fontSize={22} fontWeight={600} fill={colors.cyan}>
            {band.label}
          </text>
        </g>
      ) : null}
      {target ? (
        <g opacity={target.opacity}>
          <line x1={0} x2={width} y1={y(target.value)} y2={y(target.value)} stroke={colors.text} strokeOpacity={0.7} strokeWidth={3} strokeDasharray="12 10" />
          <text x={16} y={y(target.value) + 36} fontSize={26} fontWeight={800} fill={colors.text}>
            {target.label}
          </text>
        </g>
      ) : null}
      {annotation ? (
        <g opacity={annotation.opacity}>
          <line x1={x(annotation.index)} x2={x(annotation.index)} y1={padTop - 14} y2={height - padBottom} stroke={colors.orange} strokeWidth={3} strokeDasharray="5 8" />
          {annotation.lines.map((l, i) => (
            <text key={l} x={x(annotation.index) - 18} y={padTop - 70 + i * 32} textAnchor="end" fontSize={27} fontWeight={700} fill={colors.orange}>
              {l}
            </text>
          ))}
        </g>
      ) : null}

      {area ? <path d={area} fill={`url(#${id}-area)`} /> : null}
      {pts.length > 1 ? (
        <>
          <path d={path} fill="none" stroke={`url(#${id}-stroke)`} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" filter={`url(#${id}-glow)`} opacity={0.8} />
          <path d={path} fill="none" stroke={`url(#${id}-stroke)`} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}

      {data.map((d, i) => {
        if (i > reached) return null;
        const last = i === data.length - 1;
        return (
          <g key={d.label}>
            <circle cx={x(i)} cy={y(d.value)} r={last ? 12 : 7} fill={last ? a : colors.bg} stroke={a} strokeWidth={4} />
            {!last ? (
              <text x={x(i)} y={y(d.value) - 22} textAnchor="middle" fontSize={labelSize} fontWeight={700} fill={colors.dim}>
                {fmt(d.value)}
              </text>
            ) : null}
          </g>
        );
      })}
      {head && !isDone ? <circle cx={head[0]} cy={head[1]} r={10} fill={a} /> : null}
      {isDone ? (
        <circle cx={head[0]} cy={head[1]} r={12 * pulse * 2} fill={a} opacity={0.25} />
      ) : null}

      {data.map((d, i) => (
        <text key={`x-${d.label}`} x={x(i)} y={height - padBottom + 44} textAnchor="middle" fontSize={23} fontWeight={600} fill={colors.faint}>
          {d.label}
        </text>
      ))}
      {isDone ? (
        <text x={head[0] + 12} y={head[1] - 64} textAnchor="end" fontSize={46} fontWeight={900} fill={a}>
          {fmt(data[data.length - 1].value)}
          {unit}
        </text>
      ) : null}
    </svg>
  );
};
