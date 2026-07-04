import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import ScreenContainer from '../components/ScreenContainer';
import { Screen } from '../components/BottomNav';
import { TxIcon } from '../components/icons';
import { txGroups } from '../data/mockData';
import { colors, fonts } from '../theme';

interface Props {
  onNavigate: (screen: Screen) => void;
}

export default function HistoryScreen({ onNavigate }: Props) {
  return (
    <ScreenContainer active="history" onNavigate={onNavigate}>
      {/* header */}
      <View style={styles.header}>
        <AppText style={styles.bunny}>🐰</AppText>
        <AppText style={styles.receipt}>🧾</AppText>
        <AppText style={styles.title}>ประวัติธุรกรรม</AppText>
        <AppText style={styles.subtitle}>รายการเคลื่อนไหวทั้งหมดของคุณ</AppText>
      </View>

      {/* month summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <AppText style={styles.summaryLabel}>ซื้อเดือนนี้</AppText>
          <AppText style={[styles.summaryValue, { color: colors.green }]}>+฿ 82,400</AppText>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <AppText style={styles.summaryLabel}>ขายเดือนนี้</AppText>
          <AppText style={[styles.summaryValue, { color: colors.red }]}>-฿ 47,150</AppText>
        </View>
      </View>

      {/* filter chips */}
      <View style={styles.filterRow}>
        <View style={styles.filterActive}>
          <AppText style={styles.filterActiveText}>ทั้งหมด</AppText>
        </View>
        <View style={styles.filter}>
          <AppText style={styles.filterText}>ซื้อ</AppText>
        </View>
        <View style={styles.filter}>
          <AppText style={styles.filterText}>ขาย</AppText>
        </View>
        <View style={styles.filter}>
          <AppText style={styles.filterText}>ดอกเบี้ย</AppText>
        </View>
      </View>

      {/* grouped transactions */}
      {txGroups.map((g, gi) => (
        <View key={gi} style={{ marginTop: 14 }}>
          <AppText style={styles.groupDate}>{g.date}</AppText>
          <View style={styles.groupCard}>
            {g.items.map((t, ti) => (
              <View key={ti} style={[styles.txRow, t.showDivider && styles.txDivider]}>
                <View style={[styles.txIconWrap, { backgroundColor: t.iconBg }]}>
                  <TxIcon kind={t.icon} color={t.iconColor} />
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <AppText style={styles.txTitle}>{t.title}</AppText>
                  <AppText style={styles.txSub}>{t.sub}</AppText>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <AppText style={[styles.txAmount, { color: t.amtColor }]}>{t.amount}</AppText>
                  <AppText style={[styles.txStatus, { color: t.statusColor }]}>{t.status}</AppText>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: 16, position: 'relative' },
  bunny: { position: 'absolute', right: 2, top: -6, fontSize: 46 },
  receipt: { position: 'absolute', right: 46, top: 6, fontSize: 15 },
  title: { fontFamily: fonts.heading, fontSize: 28, color: colors.textDark },
  subtitle: { fontSize: 12.5, color: colors.textMuted, marginTop: 5 },
  summaryCard: {
    borderRadius: 22,
    paddingVertical: 15,
    paddingHorizontal: 8,
    backgroundColor: '#FDE9EF',
    flexDirection: 'row',
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryLabel: { fontSize: 11, color: colors.textMuted2 },
  summaryValue: { fontFamily: fonts.heading, fontSize: 17, marginTop: 4 },
  divider: { width: 1, backgroundColor: 'rgba(180,150,150,0.25)', marginVertical: 2 },
  filterRow: { flexDirection: 'row', gap: 8, paddingVertical: 14, paddingHorizontal: 2 },
  filterActive: { backgroundColor: '#FCE0E6', borderRadius: 16, paddingVertical: 7, paddingHorizontal: 16 },
  filterActiveText: { color: colors.brandPink, fontFamily: fonts.bodySemiBold, fontSize: 12.5 },
  filter: { paddingVertical: 7, paddingHorizontal: 12 },
  filterText: { color: colors.textMuted, fontSize: 12.5 },
  groupDate: { fontSize: 12, color: colors.textFaint, fontFamily: fonts.bodySemiBold, marginBottom: 8, marginHorizontal: 4 },
  groupCard: { backgroundColor: '#fff', borderRadius: 22, paddingVertical: 4, paddingHorizontal: 6 },
  txRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 11, paddingHorizontal: 9 },
  txDivider: { borderTopWidth: 1, borderTopColor: '#F6EDE8' },
  txIconWrap: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  txTitle: { fontFamily: fonts.heading, fontSize: 14.5, color: colors.textDark },
  txSub: { fontSize: 11.5, color: colors.textFaint, marginTop: 1 },
  txAmount: { fontFamily: fonts.heading, fontSize: 14 },
  txStatus: { fontSize: 10.5, marginTop: 1 },
});
