import { MarketCoin, market, marketThai, marketUs } from '../data/mockData';

const GREEN = '#2f9d78';
const RED = '#EF7E7E';

const CG = 'https://api.coingecko.com/api/v3';
const YF = 'https://query1.finance.yahoo.com/v8/finance/chart';

const FETCH_TIMEOUT = 12000;

// Fixed fallback used only if the live FX lookup fails; kept realistic, not authoritative.
const FALLBACK_USD_THB = 36.5;

async function getJson(url: string, headers?: Record<string, string>): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    const res = await fetch(url, { headers, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// ---- number formatting ----

function group(n: number, dp: number): string {
  const fixed = Math.abs(n).toFixed(dp);
  const [intPart, frac] = fixed.split('.');
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const sign = n < 0 ? '-' : '';
  return sign + grouped + (frac ? '.' + frac : '');
}

const fmtTHB = (n: number) => '฿' + group(n, 2);
const fmtUSD = (n: number) => '$' + group(n, n < 1 ? 4 : 2);

export function fmtChange(pct: number): { change: string; color: string; up: boolean } {
  const up = pct >= 0;
  return {
    change: (up ? '+' : '') + pct.toFixed(2) + '%',
    color: up ? GREEN : RED,
    up,
  };
}

// Parses a display amount like "฿128,450" or "-฿2,340" back into a number.
export function parseAmount(s: string): number {
  const neg = s.trim().startsWith('-');
  const n = parseFloat(s.replace(/[^0-9.]/g, '')) || 0;
  return neg ? -n : n;
}

// Signed THB with no decimals, e.g. "+฿5,240" / "-฿2,340" / "฿0".
export function fmtSignedTHB(n: number): string {
  const sign = n > 0 ? '+' : n < 0 ? '-' : '';
  return sign + '฿' + group(Math.abs(n), 0);
}

// ---- FX ----

// USDT≈USD, priced in THB — a reliable keyless proxy for the USD→THB rate.
export async function getUsdThb(): Promise<number> {
  try {
    const j = await getJson(`${CG}/simple/price?ids=tether&vs_currencies=thb`);
    const rate = j?.tether?.thb;
    return typeof rate === 'number' && rate > 0 ? rate : FALLBACK_USD_THB;
  } catch {
    return FALLBACK_USD_THB;
  }
}

// ---- Crypto (CoinGecko) ----

// pair label + fallback glyph/gradient, keyed by CoinGecko id. Price/name/icon come from the API.
const CRYPTO_META: Record<string, { pair: string; coin: string; coinBg: [string, string] }> = {
  bitcoin: { pair: 'BTC/USDT', coin: '₿', coinBg: ['#F9A93E', '#F7931A'] },
  ethereum: { pair: 'ETH/USDT', coin: '◆', coinBg: ['#7C8CEC', '#627EEA'] },
  binancecoin: { pair: 'BNB/USDT', coin: 'B', coinBg: ['#F6C948', '#F3BA2F'] },
  solana: { pair: 'SOL/USDT', coin: '◎', coinBg: ['#12C2A0', '#9945FF'] },
  ripple: { pair: 'XRP/USDT', coin: '✕', coinBg: ['#3A4048', '#23292F'] },
  dogecoin: { pair: 'DOGE/USDT', coin: 'Ð', coinBg: ['#D9BC4A', '#C2A633'] },
};
const CRYPTO_ORDER = ['bitcoin', 'ethereum', 'binancecoin', 'solana', 'ripple', 'dogecoin'];

export async function fetchCrypto(): Promise<MarketCoin[]> {
  const ids = CRYPTO_ORDER.join(',');
  const [rows, fx] = await Promise.all([
    getJson(
      `${CG}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`
    ),
    getUsdThb(),
  ]);
  const byId: Record<string, any> = {};
  for (const r of rows) byId[r.id] = r;

  return CRYPTO_ORDER.filter((id) => byId[id]).map((id) => {
    const r = byId[id];
    const meta = CRYPTO_META[id];
    const usd = r.current_price as number;
    const pct = (r.price_change_percentage_24h ?? 0) as number;
    const { change, color, up } = fmtChange(pct);
    const spark: number[] | undefined = r.sparkline_in_7d?.price?.slice(-40);
    return {
      coin: meta.coin,
      coinBg: meta.coinBg,
      name: r.name as string,
      pair: meta.pair,
      priceB: fmtTHB(usd * fx),
      priceUSD: fmtUSD(usd),
      change,
      color,
      up,
      iconUrl: r.image as string,
      spark,
    };
  });
}

// ---- Stocks (Yahoo Finance, unofficial) ----

interface StockMeta {
  symbol: string;
  name: string;
  coin: string;
  coinBg: [string, string];
}

const THAI_STOCKS: StockMeta[] = [
  { symbol: 'PTT.BK', name: 'PTT', coin: 'P', coinBg: ['#00A4E4', '#0075C9'] },
  { symbol: 'KBANK.BK', name: 'KBANK', coin: 'K', coinBg: ['#4CAF50', '#2E9E3E'] },
  { symbol: 'AOT.BK', name: 'AOT', coin: 'A', coinBg: ['#8E44AD', '#732D91'] },
  { symbol: 'CPALL.BK', name: 'CPALL', coin: 'C', coinBg: ['#E67E22', '#CA6510'] },
  { symbol: 'ADVANC.BK', name: 'ADVANC', coin: 'A', coinBg: ['#16A085', '#0E8271'] },
  { symbol: 'SCB.BK', name: 'SCB', coin: 'S', coinBg: ['#9B59B6', '#7D3C98'] },
];

const US_STOCKS: StockMeta[] = [
  { symbol: 'AAPL', name: 'Apple', coin: 'A', coinBg: ['#4B5563', '#1F2937'] },
  { symbol: 'MSFT', name: 'Microsoft', coin: 'M', coinBg: ['#2563EB', '#1D4ED8'] },
  { symbol: 'GOOGL', name: 'Alphabet', coin: 'G', coinBg: ['#EA4335', '#C5221F'] },
  { symbol: 'AMZN', name: 'Amazon', coin: 'A', coinBg: ['#FF9900', '#E68A00'] },
  { symbol: 'NVDA', name: 'NVIDIA', coin: 'N', coinBg: ['#76B900', '#5E9400'] },
  { symbol: 'TSLA', name: 'Tesla', coin: 'T', coinBg: ['#E82127', '#B71A1F'] },
];

interface YahooQuote {
  price: number;
  prevClose: number;
  spark: number[];
}

async function fetchYahoo(symbol: string): Promise<YahooQuote> {
  const j = await getJson(`${YF}/${encodeURIComponent(symbol)}?range=1d&interval=5m`, {
    // Yahoo occasionally rejects requests with no UA; harmless on native.
    'User-Agent': 'Mozilla/5.0',
  });
  const result = j?.chart?.result?.[0];
  if (!result) throw new Error(`No chart data for ${symbol}`);
  const meta = result.meta;
  const price: number = meta.regularMarketPrice;
  const prevClose: number = meta.chartPreviousClose ?? meta.previousClose ?? price;
  const closes: number[] = (result.indicators?.quote?.[0]?.close ?? []).filter(
    (v: number | null): v is number => v != null
  );
  return { price, prevClose, spark: closes.slice(-40) };
}

async function fetchStocks(list: StockMeta[], nativeCurrency: 'THB' | 'USD'): Promise<MarketCoin[]> {
  const fx = await getUsdThb();
  const quotes = await Promise.all(
    list.map(async (m) => {
      try {
        return { m, q: await fetchYahoo(m.symbol) };
      } catch {
        return null;
      }
    })
  );

  const rows = quotes.filter((x): x is { m: StockMeta; q: YahooQuote } => x != null);
  if (rows.length === 0) throw new Error('No stock quotes available');

  return rows.map(({ m, q }) => {
    const pct = q.prevClose ? ((q.price - q.prevClose) / q.prevClose) * 100 : 0;
    const { change, color, up } = fmtChange(pct);
    const priceTHB = nativeCurrency === 'THB' ? q.price : q.price * fx;
    const priceUSD = nativeCurrency === 'USD' ? q.price : q.price / fx;
    return {
      coin: m.coin,
      coinBg: m.coinBg,
      name: m.name,
      pair: m.symbol,
      priceB: fmtTHB(priceTHB),
      priceUSD: fmtUSD(priceUSD),
      change,
      color,
      up,
      spark: q.spark,
    };
  });
}

export const fetchThaiStocks = () => fetchStocks(THAI_STOCKS, 'THB');
export const fetchUsStocks = () => fetchStocks(US_STOCKS, 'USD');

// ---- unified access ----

export type MarketTab = 'crypto' | 'thai' | 'us';

export const fetchers: Record<MarketTab, () => Promise<MarketCoin[]>> = {
  crypto: fetchCrypto,
  thai: fetchThaiStocks,
  us: fetchUsStocks,
};

export const fallbackData: Record<MarketTab, MarketCoin[]> = {
  crypto: market,
  thai: marketThai,
  us: marketUs,
};

// ---- Portfolio holdings: live 24h change per instrument ----

export interface AssetChange {
  pct: number;
  up: boolean;
}

// Keyed by the asset's display name in mockData. SET50 uses the ThaiDEX SET50
// ETF (tracks the index), Gold uses COMEX gold futures.
const PORTFOLIO_INSTRUMENTS: { name: string; kind: 'yahoo' | 'crypto'; symbol?: string; id?: string }[] = [
  { name: 'SET50', kind: 'yahoo', symbol: 'TDEX.BK' },
  { name: 'S&P 500', kind: 'yahoo', symbol: '^GSPC' },
  { name: 'Bitcoin (BTC)', kind: 'crypto', id: 'bitcoin' },
  { name: 'Gold (XAU)', kind: 'yahoo', symbol: 'GC=F' },
];

export async function fetchPortfolioChanges(): Promise<Record<string, AssetChange>> {
  const out: Record<string, AssetChange> = {};
  await Promise.all(
    PORTFOLIO_INSTRUMENTS.map(async (item) => {
      try {
        let pct: number;
        if (item.kind === 'crypto') {
          const j = await getJson(
            `${CG}/simple/price?ids=${item.id}&vs_currencies=usd&include_24hr_change=true`
          );
          pct = j?.[item.id!]?.usd_24h_change ?? 0;
        } else {
          const q = await fetchYahoo(item.symbol!);
          pct = q.prevClose ? ((q.price - q.prevClose) / q.prevClose) * 100 : 0;
        }
        out[item.name] = { pct, up: pct >= 0 };
      } catch {
        // Leave this asset out; the caller keeps its sample value.
      }
    })
  );
  if (Object.keys(out).length === 0) throw new Error('No portfolio changes available');
  return out;
}
