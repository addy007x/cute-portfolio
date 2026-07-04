import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import AppText from './AppText';
import { LinearGradient } from 'expo-linear-gradient';
import { NavHomeIcon, StarFlagIcon, NavEarnIcon, NavMeIcon, NavPlusIcon } from './icons';
import { fonts } from '../theme';

export type Screen = 'portfolio' | 'market' | 'earn' | 'history';

interface Props {
  active: Screen;
  onNavigate: (screen: Screen) => void;
}

const ACTIVE = '#EE7C93';
const INACTIVE = '#b9a99f';

export default function BottomNav({ active, onNavigate }: Props) {
  const isActive = (s: Screen) => active === s;

  return (
    <View style={styles.bar}>
      <Pressable style={styles.item} onPress={() => onNavigate('portfolio')}>
        <NavHomeIcon color={isActive('portfolio') ? ACTIVE : INACTIVE} />
        <AppText style={[styles.label, { color: isActive('portfolio') ? ACTIVE : INACTIVE }, isActive('portfolio') && styles.labelActive]}>
          พอร์ต
        </AppText>
      </Pressable>

      <Pressable style={styles.item} onPress={() => onNavigate('market')}>
        <StarFlagIcon color={isActive('market') ? ACTIVE : INACTIVE} />
        <AppText style={[styles.label, { color: isActive('market') ? ACTIVE : INACTIVE }, isActive('market') && styles.labelActive]}>
          ติดตาม
        </AppText>
      </Pressable>

      <View style={styles.centerItem}>
        <View style={styles.centerButtonShadow}>
          <LinearGradient colors={['#FF8AA1', '#FF6E8E']} start={{ x: 0.15, y: 0.1 }} end={{ x: 0.9, y: 0.9 }} style={styles.centerButton}>
            <NavPlusIcon />
          </LinearGradient>
        </View>
        <AppText style={[styles.label, { color: INACTIVE }]}>เพิ่มรายการ</AppText>
      </View>

      <Pressable style={styles.item} onPress={() => onNavigate('earn')}>
        <NavEarnIcon color={isActive('earn') ? ACTIVE : INACTIVE} />
        <AppText style={[styles.label, { color: isActive('earn') ? ACTIVE : INACTIVE }, isActive('earn') && styles.labelActive]}>
          Earn
        </AppText>
      </Pressable>

      <Pressable style={styles.item} onPress={() => onNavigate('history')}>
        <NavMeIcon color={isActive('history') ? ACTIVE : INACTIVE} />
        <AppText style={[styles.label, { color: isActive('history') ? ACTIVE : INACTIVE }, isActive('history') && styles.labelActive]}>
          ฉัน
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'relative',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    shadowColor: 'rgba(225,180,185,0.4)',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 10,
  },
  item: {
    alignItems: 'center',
    gap: 3,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 10.5,
  },
  labelActive: {
    fontFamily: fonts.bodySemiBold,
  },
  centerItem: {
    alignItems: 'center',
    gap: 5,
    transform: [{ translateY: -14 }],
  },
  centerButtonShadow: {
    shadowColor: 'rgba(255,120,145,0.45)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 8,
    borderRadius: 27,
  },
  centerButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
});
