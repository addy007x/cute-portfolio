import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { MarketCoin } from '../data/mockData';
import { MarketTab, fetchers, fallbackData } from '../services/marketData';

const POLL_MS = 30000;

export interface MarketState {
  data: MarketCoin[];
  loading: boolean;
  live: boolean;
  updatedAt: number | null;
  refresh: () => void;
}

export function useMarketData(tab: MarketTab): MarketState {
  const [data, setData] = useState<MarketCoin[]>(fallbackData[tab]);
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);

  // Guards against setState after unmount and against a slow response for a
  // tab the user has already navigated away from.
  const activeTab = useRef(tab);
  activeTab.current = tab;
  const mounted = useRef(true);

  const load = useCallback(async (forTab: MarketTab) => {
    setLoading(true);
    try {
      const fresh = await fetchers[forTab]();
      if (!mounted.current || activeTab.current !== forTab) return;
      if (fresh.length > 0) {
        setData(fresh);
        setLive(true);
        setUpdatedAt(Date.now());
      } else {
        setLive(false);
      }
    } catch {
      if (!mounted.current || activeTab.current !== forTab) return;
      // Keep the last good data if we have it; otherwise show the sample set.
      setLive(false);
      setData((prev) => (prev.length ? prev : fallbackData[forTab]));
    } finally {
      if (mounted.current && activeTab.current === forTab) setLoading(false);
    }
  }, []);

  // Reset to the tab's fallback immediately on tab change, then fetch live.
  useEffect(() => {
    setData(fallbackData[tab]);
    setLive(false);
    setUpdatedAt(null);
    load(tab);
    const interval = setInterval(() => load(tab), POLL_MS);
    return () => clearInterval(interval);
  }, [tab, load]);

  // Refresh when the app returns to the foreground.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (s: AppStateStatus) => {
      if (s === 'active') load(activeTab.current);
    });
    return () => sub.remove();
  }, [load]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const refresh = useCallback(() => load(activeTab.current), [load]);

  return { data, loading, live, updatedAt, refresh };
}
