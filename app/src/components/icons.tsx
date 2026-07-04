import React from 'react';
import Svg, { Path, Circle, Line, Rect, Polyline } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function BellIcon({ size = 20, color = '#8a7a70', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8" />
      <Path d="M10.5 20a1.8 1.8 0 0 0 3 0" />
    </Svg>
  );
}

export function EyeIcon({ size = 16, color = '#9a857c', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <Circle cx={12} cy={12} r={2.6} />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 14, color = '#EE7C93', strokeWidth = 2.2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 6l6 6-6 6" />
    </Svg>
  );
}

export function SearchIcon({ size = 20, color = '#8a7a70', strokeWidth = 1.9 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <Circle cx={11} cy={11} r={7} />
      <Path d="M20 20l-3.5-3.5" />
    </Svg>
  );
}

export function PlusIcon({ size = 20, color = '#8a7a70', strokeWidth = 2.2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <Path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function StarFlagIcon({ size = 20, color = '#8a7a70', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
      <Path d="M12 4l2.4 5 5.6.5-4.2 3.7 1.3 5.4L12 15.8 6.9 18.6l1.3-5.4L4 9.5 9.6 9Z" />
    </Svg>
  );
}

// ---- Quick action icons ----

export function PieQuickIcon({ size = 26, color = '#EE7C93' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7}>
      <Path d="M12 3a9 9 0 1 0 9 9h-9Z" />
      <Path d="M12 3v9h9A9 9 0 0 0 12 3Z" fill={color} opacity={0.3} />
    </Svg>
  );
}

export function AddAssetQuickIcon({ size = 26, color = '#E7A94E' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M5 8h14l-1 12H6L5 8Z" />
      <Path d="M9 8a3 3 0 0 1 6 0" />
      <Path d="M12 12v4M10 14h4" />
    </Svg>
  );
}

export function AnalyzeQuickIcon({ size = 26, color = '#3FAE8B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round">
      <Rect x={4} y={12} width={4} height={7} rx={1.2} />
      <Rect x={10} y={8} width={4} height={11} rx={1.2} />
      <Rect x={16} y={4} width={4} height={15} rx={1.2} />
    </Svg>
  );
}

export function PlanQuickIcon({ size = 26, color = '#9A82C9' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M6 3h9l4 4v14H6Z" />
      <Path d="M9 9h7M9 13h7M9 17h4" />
    </Svg>
  );
}

// ---- Sparklines ----

export function SparklineUp({ width = 56, height = 26, color }: { width?: number; height?: number; color: string }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 62 26" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M0,22 10,16 20,19 30,10 40,13 50,5 62,7" />
    </Svg>
  );
}

export function SparklineDown({ width = 56, height = 26, color }: { width?: number; height?: number; color: string }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 62 26" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M0,6 10,11 20,8 30,15 40,12 50,19 62,22" />
    </Svg>
  );
}

export function SparklineFlat({ width = 56, height = 26 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 62 26" fill="none" stroke="#c9bcb2" strokeWidth={2} strokeDasharray="1 5">
      <Line x1={0} y1={13} x2={62} y2={13} />
    </Svg>
  );
}

export function MarketSparklineUp({ width = 52, height = 30, color }: { width?: number; height?: number; color: string }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 88 36" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M0,30 12,24 24,27 36,16 48,20 60,10 72,14 88,5" />
    </Svg>
  );
}

export function MarketSparklineDown({ width = 52, height = 30, color }: { width?: number; height?: number; color: string }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 88 36" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M0,8 12,13 24,9 36,17 48,13 60,21 72,17 88,26" />
    </Svg>
  );
}

// ---- Bottom nav icons ----

export function NavHomeIcon({ size = 24, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round">
      <Path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1Z" />
    </Svg>
  );
}

export function NavEarnIcon({ size = 24, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
      <Path d="M12 4a8 8 0 1 0 8 8h-8Z" />
      <Path d="M12 4v8h8a8 8 0 0 0-8-8Z" />
    </Svg>
  );
}

export function NavMeIcon({ size = 24, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round">
      <Path d="M6 5 8.5 8h7L18 5v6a6 6 0 0 1-12 0Z" />
      <Circle cx={9.5} cy={12} r={0.9} fill={color} stroke="none" />
      <Circle cx={14.5} cy={12} r={0.9} fill={color} stroke="none" />
    </Svg>
  );
}

export function NavPlusIcon({ size = 26 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.6} strokeLinecap="round">
      <Path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

// ---- Transaction icons ----

const txPaths: Record<string, string[]> = {
  buy: ['M12 5v10', 'M7.5 10.5 12 15l4.5-4.5', 'M5 19h14'],
  sell: ['M12 19V9', 'M7.5 13.5 12 9l4.5 4.5', 'M5 5h14'],
  deposit: ['M4 10h16', 'M6 10V7l6-3 6 3v3', 'M6 10v7M10 10v7M14 10v7M18 10v7', 'M4 20h16'],
  withdraw: ['M12 4v9', 'M8.5 9.5 12 13l3.5-3.5', 'M5 16v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3'],
  interest: ['M9 9h.01', 'M15 15h.01', 'M8 16 16 8', 'M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z'],
};

export function TxIcon({ kind, color, size = 20 }: { kind: keyof typeof txPaths; color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      {txPaths[kind].map((d, i) => (
        <Path key={i} d={d} />
      ))}
    </Svg>
  );
}

// ---- Live sparkline built from real price points ----

const VB_W = 88;
const VB_H = 36;

function sparkPoints(data: number[]): string {
  if (!data || data.length < 2) return '';
  const pad = 3;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * (VB_W - pad * 2) + pad;
      const y = VB_H - pad - ((v - min) / span) * (VB_H - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export function LiveSparkline({
  data,
  color,
  up,
  width = 52,
  height = 30,
}: {
  data?: number[];
  color: string;
  up: boolean;
  width?: number;
  height?: number;
}) {
  // Fall back to the stylised up/down shapes when we have no real points.
  if (!data || data.length < 2) {
    return up ? (
      <MarketSparklineUp color={color} width={width} height={height} />
    ) : (
      <MarketSparklineDown color={color} width={width} height={height} />
    );
  }
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${VB_W} ${VB_H}`} fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <Polyline points={sparkPoints(data)} />
    </Svg>
  );
}
