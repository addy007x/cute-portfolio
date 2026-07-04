import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { donutSlices } from '../data/mockData';

const SIZE = 118;
const HOLE_INSET = 22;
const OUTER_R = SIZE / 2 - 0; // 59
const HOLE_R = SIZE / 2 - HOLE_INSET; // 37
const STROKE = OUTER_R - HOLE_R; // 22
const RING_R = (OUTER_R + HOLE_R) / 2; // 48
const CIRC = 2 * Math.PI * RING_R;
const CENTER = SIZE / 2;

export default function AllocationDonut() {
  return (
    <View style={styles.wrap}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <G rotation={-90} origin={`${CENTER}, ${CENTER}`}>
          {donutSlices.map((s, i) => {
            const dash = ((s.end - s.start) / 100) * CIRC;
            const offset = -((s.start / 100) * CIRC);
            return (
              <Circle
                key={i}
                cx={CENTER}
                cy={CENTER}
                r={RING_R}
                stroke={s.color}
                strokeWidth={STROKE}
                strokeDasharray={`${dash} ${CIRC - dash}`}
                strokeDashoffset={offset}
                fill="none"
              />
            );
          })}
        </G>
      </Svg>
      <View style={styles.hole}>
        <Text style={styles.emoji}>💗</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
  },
  hole: {
    position: 'absolute',
    left: HOLE_INSET,
    top: HOLE_INSET,
    width: SIZE - HOLE_INSET * 2,
    height: SIZE - HOLE_INSET * 2,
    borderRadius: (SIZE - HOLE_INSET * 2) / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 26,
  },
});
