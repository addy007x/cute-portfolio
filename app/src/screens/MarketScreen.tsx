import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import AppText from '../components/AppText';
import ScreenContainer from '../components/ScreenContainer';
import { Screen } from '../components/BottomNav';
import CoinIcon from '../components/CoinIcon';
import { SearchIcon, PlusIcon, StarFlagIcon, LiveSparkline, ChevronRightIcon } from '../components/icons';
import { useMarketData } from '../hooks/useMarketData';
import { MarketTab } from '../services/marketData';
import { colors, fonts } from '../theme';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const TABS: { key: MarketTab; label: string }[] = [
  { key: 'crypto', label: 'คริปโต' },
  { key: 'thai', label: 'หุ้นไทย' },
  { key: 'us', label: 'หุ้นต่างประเทศ' },
];

function formatTime(ts: number): string {
  const d = new Date(ts);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

export default function MarketScreen({ onNavigate }: Props) {
  const [tab, setTab] = useState<MarketTab>('crypto');
  const { data, loading, live, updatedAt, refresh } = useMarketData(tab);

  return (
    <ScreenContainer active="market" onNavigate={onNavigate} refreshing={loading} onRefresh={refresh}>
      {/* header */}
      <View style={styles.header}>
        <View>
          <AppText style={styles.title}>ตลาดวันนี้</AppText>
          <Pressable onPress={refresh}>
            <View style={styles.statusRow}>
              <View style={[styles.dot, { backgroundColor: live ? colors.green : '#c9b8ae' }]} />
              <AppText style={styles.subtitle}>
                {loading
                  ? 'กำลังอัปเดตราคา…'
                  : live && updatedAt
                    ? `อัปเดตล่าสุด ${formatTime(updatedAt)}`
                    : 'ข้อมูลตัวอย่าง · แตะเพื่อลองใหม่'}
              </AppText>
            </View>
          </Pressable>
        </View>
        <View style={styles.headerIcons}>
          <View style={styles.iconButton}>
            <SearchIcon />
          </View>
          <View style={styles.iconButton}>
            <PlusIcon strokeWidth={2.2} />
          </View>
          <View style={styles.iconButton}>
            <StarFlagIcon />
          </View>
        </View>
      </View>

      {/* tabs */}
      <View style={styles.tabsRow}>
        {TABS.map((t) => {
          const activeTab = t.key === tab;
          return (
            <Pressable
              key={t.key}
              onPress={() => setTab(t.key)}
              style={activeTab ? styles.tabActive : styles.tab}
            >
              <AppText style={activeTab ? styles.tabActiveText : styles.tabText}>{t.label}</AppText>
            </Pressable>
          );
        })}
      </View>

      {/* table header */}
      <View style={styles.tableHeader}>
        <AppText style={[styles.tableHeaderText, { flex: 1 }]}>ชื่อ</AppText>
        <AppText style={[styles.tableHeaderText, { width: 78, textAlign: 'right' }]}>ราคา</AppText>
        <AppText style={[styles.tableHeaderText, { width: 60, textAlign: 'right' }]}>24 ชม.</AppText>
        <AppText style={[styles.tableHeaderText, { width: 60, textAlign: 'center' }]}>กราฟ</AppText>
        <View style={{ width: 18 }} />
      </View>

      {/* rows */}
      {data.map((m, i) => (
        <View key={m.pair} style={[styles.row, i > 0 && styles.rowBorder]}>
          <View style={styles.rowLeft}>
            <CoinIcon iconUrl={m.iconUrl} coin={m.coin} coinBg={m.coinBg} />
            <View style={{ minWidth: 0 }}>
              <AppText style={styles.coinName}>{m.name}</AppText>
              <AppText style={styles.coinPair}>{m.pair}</AppText>
            </View>
          </View>
          <View style={{ width: 78, alignItems: 'flex-end' }}>
            <AppText style={styles.priceB}>{m.priceB}</AppText>
            <AppText style={styles.priceUSD}>{m.priceUSD}</AppText>
          </View>
          <AppText style={[styles.change, { width: 60, color: m.color }]}>{m.change}</AppText>
          <View style={{ width: 60, alignItems: 'center' }}>
            <LiveSparkline data={m.spark} color={m.color} up={m.up} />
          </View>
          <View style={{ width: 18, alignItems: 'flex-end' }}>
            <ChevronRightIcon size={17} color="#d3c3b9" strokeWidth={1.8} />
          </View>
        </View>
      ))}

      {loading && data.length === 0 && (
        <ActivityIndicator color={colors.brandPink} style={{ marginTop: 24 }} />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  title: { fontFamily: fonts.heading, fontSize: 28, color: colors.textDark },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 5 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  subtitle: { fontSize: 12.5, color: colors.textMuted },
  headerIcons: { flexDirection: 'row', gap: 10 },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  tabActive: { backgroundColor: '#FCE0E6', borderRadius: 16, paddingVertical: 7, paddingHorizontal: 16 },
  tabActiveText: { color: colors.brandPink, fontFamily: fonts.bodySemiBold, fontSize: 12.5 },
  tab: { paddingVertical: 7, paddingHorizontal: 12 },
  tabText: { color: colors.textMuted, fontSize: 12.5 },
  tableHeader: { flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingBottom: 4, paddingHorizontal: 4 },
  tableHeaderText: { fontSize: 10.5, color: colors.textFaint2 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11, paddingHorizontal: 4 },
  rowBorder: { borderTopWidth: 1, borderTopColor: '#f4e9e4' },
  rowLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 9, minWidth: 0 },
  coinName: { fontFamily: fonts.heading, fontSize: 14, color: colors.textDark, lineHeight: 16 },
  coinPair: { fontSize: 10, color: colors.textFaint2 },
  priceB: { fontFamily: fonts.heading, fontSize: 12.5, color: '#4d443d', lineHeight: 15 },
  priceUSD: { fontSize: 9.5, color: colors.textFaint2 },
  change: { fontFamily: fonts.heading, fontSize: 12.5, textAlign: 'right' },
});
