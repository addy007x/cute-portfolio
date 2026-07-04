import React from 'react';
import { StyleSheet, ScrollView, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNav, { Screen } from './BottomNav';

interface Props {
  active: Screen;
  onNavigate: (screen: Screen) => void;
  children: React.ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export default function ScreenContainer({ active, onNavigate, children, refreshing, onRefresh }: Props) {
  return (
    <LinearGradient colors={['#FFF7F2', '#FFEFF3']} style={styles.fill}>
      <SafeAreaView style={styles.fill} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            onRefresh ? (
              <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} tintColor="#EE7C93" colors={['#EE7C93']} />
            ) : undefined
          }
        >
          {children}
        </ScrollView>
        <View style={styles.navWrap}>
          <BottomNav active={active} onNavigate={onNavigate} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { padding: 18, paddingBottom: 8 },
  navWrap: {},
});
