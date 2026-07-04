import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppText from './AppText';
import { fonts } from '../theme';

interface Props {
  iconUrl?: string;
  coin: string;
  coinBg: [string, string];
  size?: number;
}

// Shows the real logo (e.g. CoinGecko coin image) when available, and falls
// back to the cute gradient-circle glyph if there's no URL or the image fails.
export default function CoinIcon({ iconUrl, coin, coinBg, size = 34 }: Props) {
  const [failed, setFailed] = useState(false);
  const radius = size / 2;

  if (iconUrl && !failed) {
    return (
      <View style={[styles.imageWrap, { width: size, height: size, borderRadius: radius }]}>
        <Image
          source={{ uri: iconUrl }}
          onError={() => setFailed(true)}
          style={{ width: size, height: size, borderRadius: radius }}
        />
      </View>
    );
  }

  return (
    <LinearGradient colors={coinBg} style={[styles.glyph, { width: size, height: size, borderRadius: radius }]}>
      <AppText style={[styles.glyphText, { fontSize: size * 0.44 }]}>{coin}</AppText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  imageWrap: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  glyph: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyphText: {
    fontFamily: fonts.heading,
    color: '#fff',
  },
});
