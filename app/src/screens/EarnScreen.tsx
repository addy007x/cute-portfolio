import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenContainer from '../components/ScreenContainer';
import { Screen } from '../components/BottomNav';
import { ChevronRightIcon } from '../components/icons';
import { products, myEarn } from '../data/mockData';
import { colors, fonts } from '../theme';

interface Props {
  onNavigate: (screen: Screen) => void;
}

export default function EarnScreen({ onNavigate }: Props) {
  return (
    <ScreenContainer active="earn" onNavigate={onNavigate}>
      {/* header */}
      <View style={styles.header}>
        <AppText style={styles.pig}>🐷</AppText>
        <AppText style={styles.coin}>🪙</AppText>
        <AppText style={styles.sparkle}>✨</AppText>
        <AppText style={styles.title}>Earn</AppText>
        <AppText style={styles.subtitle}>สร้างผลตอบแทนจากสินทรัพย์ของคุณ</AppText>
      </View>

      {/* summary card */}
      <LinearGradient colors={['#FDE6EF', '#FBEFF2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <AppText style={styles.summaryLabel}>มูลค่า Earn รวม</AppText>
          <AppText style={styles.summaryValue}>฿ 45,680</AppText>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <AppText style={styles.summaryLabel}>กำไรวันนี้</AppText>
          <AppText style={[styles.summaryValue, { color: colors.green }]}>+฿ 681</AppText>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <AppText style={styles.summaryLabel}>ผลตอบแทนเฉลี่ยต่อปี</AppText>
          <AppText style={[styles.summaryValue, { color: colors.green }]}>4.35%</AppText>
        </View>
      </LinearGradient>

      {/* recommended products */}
      <View style={[styles.rowBetween, { marginTop: 20, marginBottom: 12 }]}>
        <AppText style={styles.sectionTitle}>ผลิตภัณฑ์แนะนำ</AppText>
        <View style={styles.linkRow}>
          <AppText style={styles.linkText}>ดูทั้งหมด</AppText>
          <ChevronRightIcon />
        </View>
      </View>
      <View style={styles.productsRow}>
        {products.map((p, i) => (
          <View key={i} style={[styles.productCard, { backgroundColor: p.cardBg }]}>
            <LinearGradient colors={p.coinBg} style={styles.productCoin}>
              <AppText style={styles.productCoinText}>{p.coin}</AppText>
            </LinearGradient>
            <AppText style={styles.productName}>{p.name}</AppText>
            <AppText style={styles.productRateLabel}>ดอกเบี้ยต่อปี</AppText>
            <AppText style={styles.productRate}>{p.rate}</AppText>
            <View style={styles.depositButton}>
              <AppText style={styles.depositButtonText}>ฝากเลย</AppText>
            </View>
          </View>
        ))}
      </View>

      {/* my earn */}
      <AppText style={[styles.sectionTitle, { marginTop: 22, marginBottom: 10 }]}>รายการ Earn ของฉัน</AppText>
      <View style={{ gap: 11 }}>
        {myEarn.map((e, i) => (
          <View key={i} style={styles.earnRow}>
            <LinearGradient colors={e.coinBg} style={styles.earnCoin}>
              <AppText style={styles.earnCoinText}>{e.coin}</AppText>
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <AppText style={styles.earnName}>{e.name}</AppText>
              <AppText style={styles.earnValue}>มูลค่า {e.value}</AppText>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <AppText style={styles.earnInterestLabel}>ดอกเบี้ยสะสม</AppText>
              <AppText style={styles.earnInterest}>{e.interest}</AppText>
            </View>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: 18, position: 'relative' },
  pig: { position: 'absolute', right: 2, top: -4, fontSize: 52 },
  coin: { position: 'absolute', right: 52, top: -6, fontSize: 20 },
  sparkle: { position: 'absolute', right: 8, top: 44, fontSize: 13 },
  title: { fontFamily: fonts.heading, fontSize: 30, color: colors.textDark },
  subtitle: { fontSize: 12.5, color: colors.textMuted, marginTop: 5 },
  summaryCard: { borderRadius: 24, paddingVertical: 18, paddingHorizontal: 8, flexDirection: 'row' },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryLabel: { fontSize: 11, color: colors.textMuted2, textAlign: 'center' },
  summaryValue: { fontFamily: fonts.heading, fontSize: 19, color: '#4d443d', marginTop: 5 },
  divider: { width: 1, backgroundColor: 'rgba(180,150,150,0.25)', marginVertical: 2 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontFamily: fonts.bodyBold, fontSize: 16.5, color: colors.textBody },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  linkText: { fontSize: 12, color: colors.brandPink },
  productsRow: { flexDirection: 'row', gap: 10 },
  productCard: { flex: 1, borderRadius: 20, paddingVertical: 14, paddingHorizontal: 8, alignItems: 'center' },
  productCoin: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  productCoinText: { fontFamily: fonts.heading, color: '#fff', fontSize: 19 },
  productName: { fontFamily: fonts.heading, fontSize: 13, color: colors.textDark, marginTop: 9, textAlign: 'center' },
  productRateLabel: { fontSize: 10, color: colors.textFaint, marginTop: 9 },
  productRate: { fontFamily: fonts.heading, fontSize: 20, color: colors.green, marginTop: 1 },
  depositButton: { marginTop: 10, borderWidth: 1.4, borderColor: '#7CCBB0', borderRadius: 14, paddingVertical: 6, width: '100%', alignItems: 'center' },
  depositButtonText: { color: colors.green, fontSize: 12, fontFamily: fonts.bodySemiBold },
  earnRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 20, paddingVertical: 13, paddingHorizontal: 14 },
  earnCoin: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  earnCoinText: { fontFamily: fonts.heading, color: '#fff', fontSize: 18 },
  earnName: { fontFamily: fonts.heading, fontSize: 14.5, color: colors.textDark },
  earnValue: { fontSize: 11.5, color: colors.textFaint, marginTop: 1 },
  earnInterestLabel: { fontSize: 11, color: colors.textFaint },
  earnInterest: { fontFamily: fonts.heading, fontSize: 14, color: colors.green, marginTop: 1 },
});
