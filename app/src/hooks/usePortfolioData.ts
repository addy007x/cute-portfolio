import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { Asset, assets as mockAssets } from '../data/mockData';
import { fetchPortfolioChanges, fmtChange, fmtSignedTHB, parseAmount } from '../services/marketData';

const POLL_MS = 30000;

export interface PortfolioState {
  assets: Asset[];
  loading: boolean;
  live: boolean;
  updatedAt: number | null;
  refresh: () => void;
}

// Merges live 24h changes onto the holdings: updates the percentage, trend
// direction, colour, and recomputes the gain from the (static) holding value.
// Anything without a live quote — e.g. Cash — keeps its sample values.
function applyChanges(changes: Record<string, { pct: number; up: boolean }>): Asset[] {
  return mockAssets.map((a) => {
    const live = changes[a.name];
    if (!live) return a;
    const { change, color, up } = fmtChange(live.pct);
    const gain = parseAmount(a.value) * (live.pct / 100);
    return {
      ...a,
      pct: change,
      color,
      trend: up ? 'up' : 'down',
      sub: fmtSignedTHB(gain),
    };
  });
}

export function usePortfolioData(): PortfolioState {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const changes = await fetchPortfolioChanges();
      if (!mounted.current) return;
      setAssets(applyChanges(changes));
      setLive(true);
      setUpdatedAt(Date.now());
    } catch {
      if (!mounted.current) return;
      setLive(false);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    const interval = setInterval(load, POLL_MS);
    const sub = AppState.addEventListener('change', (s: AppStateStatus) => {
      if (s === 'active') load();
    });
    return () => {
      mounted.current = false;
      clearInterval(interval);
      sub.remove();
    };
  }, [load]);

  return { assets, loading, live, updatedAt, refresh: load };
}
