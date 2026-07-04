import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenContainer from '../components/ScreenContainer';
import { Screen } from '../components/BottomNav';
import AllocationDonut from '../components/AllocationDonut';
import {
  BellIcon,
  EyeIcon,
  ChevronRightIcon,
  PieQuickIcon,
  AddAssetQuickIcon,
  AnalyzeQuickIcon,
  PlanQuickIcon,
  SparklineUp,
  SparklineDown,
  SparklineFlat,
} from '../components/icons';
import { legend } from '../data/mockData';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { colors, fonts } from '../theme';

const heroCat = require('../../assets/images/hero_cat.png');

interface Props {
  onNavigate: (screen: Screen) => void;
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

export default function PortfolioScreen({ onNavigate }: Props) {
  const { assets, loading, live, updatedAt, refresh } = usePortfolioData();

  return (
    <ScreenContainer active="portfolio" onNavigate={onNavigate} refreshing={loading} onRefresh={refresh}>
      {/* header */}
      <View style={styles.header}>
        <LinearGradient colors={['#FFE0C2', '#FFC9D6']} style={styles.avatar}>
          <AppText style={styles.avatarEmoji}>🧑‍🦱</AppText>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <AppText style={styles.title}>My Portfolio</AppText>
          <AppText style={styles.subtitle}>จัดพอร์ตอย่างชาญฉลาด ✨</AppText>
        </View>
        <View style={styles.bellButton}>
          <BellIcon />
          <View style={styles.bellDot} />
        </View>
      </View>

      {/* total value card */}
      <LinearGradient
        colors={['#FDF7EE', '#FBF3EA', '#EEF4F0']}
        locations={[0, 0.46, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        <Image source={heroCat} style={styles.heroCat} resizeMode="contain" />
        <View>
          <View style={styles.heroLabelRow}>
            <AppText style={styles.heroLabel}>มูลค่าพอร์ตรวม</AppText>
            <EyeIcon />
          </View>
          <AppText style={styles.heroValue}>฿ 856,320</AppText>
          <AppText style={styles.heroLabel}>กำไร/ขาดทุนรวม</AppText>
          <View style={styles.gainPill}>
            <AppText style={styles.gainText}>▲ +35,420 (+4.32%)</AppText>
          </View>
        </View>
      </LinearGradient>

      {/* quick actions */}
      <View style={styles.quickRow}>
        <View style={[styles.quickCard, { backgroundColor: '#FCE0E6' }]}>
          <PieQuickIcon />
          <AppText style={styles.quickLabel}>จัดพอร์ต</AppText>
        </View>
        <View style={[styles.quickCard, { backgroundColor: '#FCF0DA' }]}>
          <AddAssetQuickIcon />
          <AppText style={styles.quickLabel}>เพิ่มสินทรัพย์</AppText>
        </View>
        <View style={[styles.quickCard, { backgroundColor: '#DDF0EA' }]}>
          <AnalyzeQuickIcon />
          <AppText style={styles.quickLabel}>วิเคราะห์</AppText>
        </View>
        <View style={[styles.quickCard, { backgroundColor: '#EBE4F5' }]}>
          <PlanQuickIcon />
          <AppText style={styles.quickLabel}>บันทึกแผน</AppText>
        </View>
      </View>

      {/* allocation card */}
      <View style={styles.allocationCard}>
        <View style={styles.rowBetween}>
          <AppText style={styles.sectionTitle}>สัดส่วนพอร์ต</AppText>
          <View style={styles.linkRow}>
            <AppText style={styles.linkText}>ดูรายละเอียด</AppText>
            <ChevronRightIcon />
          </View>
        </View>
        <View style={styles.allocationBody}>
          <AllocationDonut />
          <View style={styles.legendList}>
            {legend.map((a, i) => (
              <View key={i} style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: a.color }]} />
                <AppText style={styles.legendName}>{a.name}</AppText>
                <AppText style={styles.legendPct}>{a.pct}</AppText>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* asset list */}
      <View style={[styles.rowBetween, { marginTop: 18, marginBottom: 2, marginHorizontal: 4 }]}>
        <AppText style={styles.sectionTitle}>รายการสินทรัพย์</AppText>
        <View style={styles.linkRow}>
          <AppText style={styles.linkText}>ดูทั้งหมด</AppText>
          <ChevronRightIcon />
        </View>
      </View>
      <View style={styles.statusRow}>
        <View style={[styles.statusDot, { backgroundColor: live ? colors.green : '#c9b8ae' }]} />
        <AppText style={styles.statusText}>
          {loading
            ? 'กำลังอัปเดตราคา…'
            : live && updatedAt
              ? `ราคาเรียลไทม์ · อัปเดต ${formatTime(updatedAt)}`
              : 'ข้อมูลตัวอย่าง · ดึงลงเพื่อรีเฟรช'}
        </AppText>
      </View>
      <View style={{ gap: 10 }}>
        {assets.map((a, i) => (
          <View key={i} style={styles.assetRow}>
            <View style={[styles.assetGlyph, { backgroundColor: a.bg }]}>
              <AppText style={{ fontSize: 21 }}>{a.glyph}</AppText>
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <View style={styles.assetNameRow}>
                <AppText style={styles.assetName}>{a.name}</AppText>
                <AppText style={[styles.assetTag, { color: a.tagColor, backgroundColor: a.tagBg }]}>{a.tag}</AppText>
              </View>
              <AppText style={styles.assetValue}>มูลค่า {a.value}</AppText>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <AppText style={[styles.assetPct, { color: a.color }]}>{a.pct}</AppText>
              <AppText style={[styles.assetSub, { color: a.color }]}>{a.sub}</AppText>
            </View>
            <View style={styles.sparkWrap}>
              {a.trend === 'up' && <SparklineUp color={a.color} />}
              {a.trend === 'down' && <SparklineDown color={a.color} />}
              {a.trend === 'flat' && <SparklineFlat />}
            </View>
            <ChevronRightIcon size={16} color="#cbbdb3" strokeWidth={2.2} />
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarEmoji: { fontSize: 30 },
  title: { fontFamily: fonts.heading, fontSize: 24, color: colors.textDark, lineHeight: 26 },
  subtitle: { fontSize: 12.5, color: colors.textMuted, marginTop: 2 },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF7A93',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  heroCard: {
    borderRadius: 26,
    padding: 20,
    paddingBottom: 22,
    overflow: 'hidden',
  },
  heroCat: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: '100%',
    width: 140,
  },
  heroLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  heroLabel: { color: colors.textMuted2, fontSize: 12.5, fontFamily: fonts.bodyMedium },
  heroValue: { fontFamily: fonts.heading, fontSize: 34, color: '#4d443d', marginVertical: 4 },
  gainPill: {
    alignSelf: 'flex-start',
    marginTop: 3,
    backgroundColor: 'rgba(63,174,139,0.14)',
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  gainText: { fontFamily: fonts.heading, color: colors.green, fontSize: 14 },
  quickRow: { flexDirection: 'row', gap: 10, marginTop: 16, marginBottom: 4 },
  quickCard: { flex: 1, borderRadius: 20, paddingTop: 14, paddingBottom: 10, paddingHorizontal: 6, alignItems: 'center' },
  quickLabel: { fontSize: 11.5, color: '#7a6a62', marginTop: 6 },
  allocationCard: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#F3DCE1',
    borderRadius: 24,
    padding: 16,
    marginTop: 14,
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontFamily: fonts.bodyBold, fontSize: 16.5, color: colors.textBody },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  linkText: { fontSize: 12, color: colors.brandPink },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginHorizontal: 4, marginBottom: 8 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, color: colors.textFaint },
  allocationBody: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 10 },
  legendList: { flex: 1, gap: 9 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendName: { flex: 1, fontSize: 12.5, color: '#6a5e56' },
  legendPct: { fontFamily: fonts.heading, fontSize: 12.5, color: colors.textBody },
  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 11,
    paddingHorizontal: 13,
  },
  assetGlyph: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  assetNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  assetName: { fontFamily: fonts.heading, fontSize: 14.5, color: colors.textDark },
  assetTag: { fontSize: 10, paddingVertical: 1, paddingHorizontal: 7, borderRadius: 8, overflow: 'hidden' },
  assetValue: { fontSize: 11.5, color: colors.textFaint, marginTop: 1 },
  assetPct: { fontFamily: fonts.heading, fontSize: 13.5 },
  assetSub: { fontSize: 11, opacity: 0.85 },
  sparkWrap: { width: 56 },
});
