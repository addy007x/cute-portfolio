const G = '#2f9d78';
const R = '#EF7E7E';

export const legend = [
  { name: 'ต่างประเทศ', pct: '29%', color: '#FFD54F' },
  { name: 'คริปโต', pct: '24%', color: '#80CBC4' },
  { name: 'หุ้นไทย', pct: '18%', color: '#F48FB1' },
  { name: 'ทองคำ', pct: '18%', color: '#B39DDB' },
  { name: 'เงินสด', pct: '12%', color: '#90CAF9' },
];

// conic-gradient stops used for the allocation donut (start%, end%, color)
export const donutSlices = [
  { start: 0, end: 29, color: '#FFD54F' },
  { start: 29, end: 53, color: '#80CBC4' },
  { start: 53, end: 71, color: '#F48FB1' },
  { start: 71, end: 89, color: '#B39DDB' },
  { start: 89, end: 100, color: '#90CAF9' },
];

export type Trend = 'up' | 'down' | 'flat';

export interface Asset {
  bg: string;
  glyph: string;
  name: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  value: string;
  pct: string;
  sub: string;
  color: string;
  trend: Trend;
}

export const assets: Asset[] = [
  { bg: '#FBD5DC', glyph: '📈', name: 'SET50', tag: 'หุ้นไทย', tagBg: '#FCE1E6', tagColor: '#E0798E', value: '฿128,450', pct: '+4.25%', sub: '+฿5,240', color: G, trend: 'up' },
  { bg: '#DCEBFB', glyph: '🇺🇸', name: 'S&P 500', tag: 'ต่างประเทศ', tagBg: '#E4F0FC', tagColor: '#5E96C8', value: '฿214,080', pct: '+6.12%', sub: '+฿12,320', color: G, trend: 'up' },
  { bg: '#FCEBD5', glyph: '₿', name: 'Bitcoin (BTC)', tag: 'คริปโต', tagBg: '#FBF0DE', tagColor: '#D79A4E', value: '฿171,264', pct: '-1.35%', sub: '-฿2,340', color: R, trend: 'down' },
  { bg: '#F6ECC9', glyph: '🪙', name: 'Gold (XAU)', tag: 'ทองคำ', tagBg: '#F7F0D6', tagColor: '#C2A34E', value: '฿128,448', pct: '+2.18%', sub: '+฿2,736', color: G, trend: 'up' },
  { bg: '#E7E1F3', glyph: '💵', name: 'เงินสด', tag: 'เงินสด', tagBg: '#EEE9F7', tagColor: '#9382C0', value: '฿85,632', pct: '0.00%', sub: '฿0', color: '#a99a90', trend: 'flat' },
];

export interface Product {
  coin: string;
  coinBg: [string, string];
  name: string;
  rate: string;
  cardBg: string;
}

export const products: Product[] = [
  { coin: '₮', coinBg: ['#3FBF95', '#26A17B'], name: 'USDT Flexible', rate: '2.80%', cardBg: '#DFF1EA' },
  { coin: '₮', coinBg: ['#3FBF95', '#26A17B'], name: 'USDT Locked 30D', rate: '6.20%', cardBg: '#DFF1EA' },
  { coin: '₿', coinBg: ['#F9A93E', '#F7931A'], name: 'BTC Locked 60D', rate: '4.50%', cardBg: '#FBEEDB' },
];

export interface MyEarn {
  coin: string;
  coinBg: [string, string];
  name: string;
  value: string;
  interest: string;
}

export const myEarn: MyEarn[] = [
  { coin: '₮', coinBg: ['#3FBF95', '#26A17B'], name: 'USDT Flexible', value: '฿15,230', interest: '+฿230' },
  { coin: '₿', coinBg: ['#F9A93E', '#F7931A'], name: 'BTC Locked 60D', value: '฿20,450', interest: '+฿450' },
  { coin: '◆', coinBg: ['#7C8CEC', '#627EEA'], name: 'ETH Locked 30D', value: '฿10,000', interest: '+฿120' },
];

export interface MarketCoin {
  coin: string;
  coinBg: [string, string];
  name: string;
  pair: string;
  priceB: string;
  priceUSD: string;
  change: string;
  color: string;
  up: boolean;
  iconUrl?: string;
  spark?: number[];
}

export const market: MarketCoin[] = [
  { coin: '₿', coinBg: ['#F9A93E', '#F7931A'], name: 'Bitcoin', pair: 'BTC/USDT', priceB: '฿2,312,450.50', priceUSD: '$62,532.10', change: '+2.35%', color: G, up: true },
  { coin: '◆', coinBg: ['#7C8CEC', '#627EEA'], name: 'Ethereum', pair: 'ETH/USDT', priceB: '฿128,540.75', priceUSD: '$3,475.21', change: '+1.62%', color: G, up: true },
  { coin: 'B', coinBg: ['#F6C948', '#F3BA2F'], name: 'BNB', pair: 'BNB/USDT', priceB: '฿19,245.30', priceUSD: '$520.45', change: '-0.45%', color: R, up: false },
  { coin: '◎', coinBg: ['#12C2A0', '#9945FF'], name: 'Solana', pair: 'SOL/USDT', priceB: '฿5,412.80', priceUSD: '$146.52', change: '+3.18%', color: G, up: true },
  { coin: '✕', coinBg: ['#3A4048', '#23292F'], name: 'XRP', pair: 'XRP/USDT', priceB: '฿17.25', priceUSD: '$0.4672', change: '-1.02%', color: R, up: false },
  { coin: 'Ð', coinBg: ['#D9BC4A', '#C2A633'], name: 'Dogecoin', pair: 'DOGE/USDT', priceB: '฿2.68', priceUSD: '$0.0726', change: '+0.88%', color: G, up: true },
];

// Fallback data shown when the live feed is unreachable (offline / host not allowlisted).
export const marketThai: MarketCoin[] = [
  { coin: 'P', coinBg: ['#00A4E4', '#0075C9'], name: 'PTT', pair: 'PTT.BK', priceB: '฿35.25', priceUSD: '$0.97', change: '+0.71%', color: G, up: true },
  { coin: 'K', coinBg: ['#4CAF50', '#2E9E3E'], name: 'KBANK', pair: 'KBANK.BK', priceB: '฿152.50', priceUSD: '$4.18', change: '-0.65%', color: R, up: false },
  { coin: 'A', coinBg: ['#8E44AD', '#732D91'], name: 'AOT', pair: 'AOT.BK', priceB: '฿58.75', priceUSD: '$1.61', change: '+1.29%', color: G, up: true },
  { coin: 'C', coinBg: ['#E67E22', '#CA6510'], name: 'CPALL', pair: 'CPALL.BK', priceB: '฿62.00', priceUSD: '$1.70', change: '+0.81%', color: G, up: true },
  { coin: 'A', coinBg: ['#16A085', '#0E8271'], name: 'ADVANC', pair: 'ADVANC.BK', priceB: '฿238.00', priceUSD: '$6.52', change: '-0.42%', color: R, up: false },
  { coin: 'S', coinBg: ['#9B59B6', '#7D3C98'], name: 'SCB', pair: 'SCB.BK', priceB: '฿118.50', priceUSD: '$3.25', change: '+1.28%', color: G, up: true },
];

export const marketUs: MarketCoin[] = [
  { coin: 'A', coinBg: ['#4B5563', '#1F2937'], name: 'Apple', pair: 'AAPL', priceB: '฿7,940.00', priceUSD: '$217.53', change: '+1.12%', color: G, up: true },
  { coin: 'M', coinBg: ['#2563EB', '#1D4ED8'], name: 'Microsoft', pair: 'MSFT', priceB: '฿15,420.00', priceUSD: '$422.47', change: '+0.58%', color: G, up: true },
  { coin: 'G', coinBg: ['#EA4335', '#C5221F'], name: 'Alphabet', pair: 'GOOGL', priceB: '฿6,530.00', priceUSD: '$178.90', change: '-0.34%', color: R, up: false },
  { coin: 'A', coinBg: ['#FF9900', '#E68A00'], name: 'Amazon', pair: 'AMZN', priceB: '฿6,720.00', priceUSD: '$184.11', change: '+0.92%', color: G, up: true },
  { coin: 'N', coinBg: ['#76B900', '#5E9400'], name: 'NVIDIA', pair: 'NVDA', priceB: '฿4,510.00', priceUSD: '$123.54', change: '+2.41%', color: G, up: true },
  { coin: 'T', coinBg: ['#E82127', '#B71A1F'], name: 'Tesla', pair: 'TSLA', priceB: '฿8,060.00', priceUSD: '$220.80', change: '-1.15%', color: R, up: false },
];

export type TxIconKind = 'buy' | 'sell' | 'deposit' | 'withdraw' | 'interest';

export interface TxItem {
  icon: TxIconKind;
  iconBg: string;
  iconColor: string;
  showDivider: boolean;
  title: string;
  sub: string;
  amount: string;
  amtColor: string;
  status: string;
  statusColor: string;
}

export interface TxGroup {
  date: string;
  items: TxItem[];
}

export const txGroups: TxGroup[] = [
  {
    date: 'วันนี้ · 12 มิ.ย. 2567',
    items: [
      { icon: 'buy', iconBg: '#DFF1EA', iconColor: G, showDivider: false, title: 'ซื้อ Bitcoin (BTC)', sub: '14:32 · ราคา ฿2,312,450', amount: '-฿ 25,000', amtColor: '#4d443d', status: 'สำเร็จ', statusColor: G },
      { icon: 'interest', iconBg: '#FBEEDB', iconColor: '#E7A94E', showDivider: true, title: 'ดอกเบี้ย USDT Flexible', sub: '09:00 · รับดอกเบี้ยรายวัน', amount: '+฿ 230', amtColor: G, status: 'เข้าบัญชี', statusColor: G },
    ],
  },
  {
    date: 'เมื่อวาน · 11 มิ.ย. 2567',
    items: [
      { icon: 'deposit', iconBg: '#DCEBFB', iconColor: '#5E96C8', showDivider: false, title: 'ฝากเงินเข้าพอร์ต', sub: '18:10 · พร้อมเพย์', amount: '+฿ 50,000', amtColor: G, status: 'สำเร็จ', statusColor: G },
      { icon: 'sell', iconBg: '#FBE3E3', iconColor: R, showDivider: true, title: 'ขาย SET50', sub: '11:45 · ราคา ฿128,450', amount: '+฿ 12,320', amtColor: G, status: 'สำเร็จ', statusColor: G },
      { icon: 'buy', iconBg: '#DFF1EA', iconColor: G, showDivider: true, title: 'ซื้อ Gold (XAU)', sub: '10:20 · ราคา ฿128,448', amount: '-฿ 15,000', amtColor: '#4d443d', status: 'สำเร็จ', statusColor: G },
    ],
  },
  {
    date: '9 มิ.ย. 2567',
    items: [
      { icon: 'withdraw', iconBg: '#EFE4C9', iconColor: '#B9992F', showDivider: false, title: 'ถอนเงินออก', sub: '16:05 · ธนาคารกสิกรไทย', amount: '-฿ 7,150', amtColor: R, status: 'สำเร็จ', statusColor: G },
      { icon: 'buy', iconBg: '#DFF1EA', iconColor: G, showDivider: true, title: 'ซื้อ S&P 500', sub: '13:22 · ราคา ฿214,080', amount: '-฿ 20,000', amtColor: '#4d443d', status: 'สำเร็จ', statusColor: G },
    ],
  },
];
