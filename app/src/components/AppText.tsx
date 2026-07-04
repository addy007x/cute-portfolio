import React from 'react';
import { Text, TextProps } from 'react-native';
import { fonts } from '../theme';

export default function AppText({ style, ...rest }: TextProps) {
  return <Text style={[{ fontFamily: fonts.body }, style]} {...rest} />;
}
