import { isGambling, spendValue, topMerchants, bucket } from '@/lib/classify';

export function totalLost(transactions: any[]) {
  return transactions.reduce((a, t) => a + (isGambling(t) ? spendValue(t) : 0), 0);
}

export function biggestLosingWeek(transactions: any[]) {
  const w = bucket(transactions, 'week');
  let maxKey = '';
  let maxVal = 0;
  for (const [k, v] of Object.entries(w)) {
    if (v > maxVal) { maxVal = Number(v); maxKey = k; }
  }
  return { week: maxKey, amount: maxVal };
}

export function favouriteVenue(transactions: any[], windowDays = 365) {
  const top = topMerchants(transactions, windowDays)[0];
  return top ? top.merchant : '—';
}

export function mostActiveTime(transactions: any[]) {
  const counts: Record<number, number> = {};
  for (const t of transactions) {
    if (!isGambling(t)) continue;
    const dtStr = t?.datetime || null;
    if (!dtStr) continue;
    const hour = new Date(dtStr).getUTCHours();
    counts[hour] = (counts[hour] || 0) + 1;
  }
  const [hour, cnt] = Object.entries(counts).sort((a,b)=>Number(b[1])-Number(a[1]))[0] || [null, 0];
  if (hour == null) return { label: '—', tagline: 'No time data' };
  const h = Number(hour);
  const ampm = h === 0 ? '12:00 AM' : h < 12 ? `${h}:00 AM` : h === 12 ? '12:00 PM' : `${h-12}:00 PM`;
  const quips: Record<string,string> = {
    night: 'Midnight Meltdown',
    morning: 'Breakfast Bets',
    afternoon: 'Afternoon Action',
    evening: 'Prime-time Punt',
  };
  const slot = h < 6 ? 'night' : h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
  return { label: ampm, tagline: quips[slot], count: cnt };
}

export function percentileRank(yourLoss: number) {
  const pool = [200, 450, 680, 820, 1100, 1500, 2200, 3400, 4700, 6500, 9200, yourLoss].sort((a,b)=>a-b);
  const rank = pool.indexOf(yourLoss) + 1;
  return Math.round((rank / pool.length) * 100);
}

export function realityCheck(loss: number) {
  const tescoMealDeal = Math.floor(loss / 3.5);
  const sp500Year = Math.round(loss * 1.15);
  const loveIslandSeason = Math.max(1, Math.floor(loss / 500));
  const vegasTicket = loss >= 450 ? 'A one-way ticket to Vegas (and lose more there)' : 'A domestic flight (to think about your choices)';
  return {
    invested: sp500Year,
    meals: tescoMealDeal,
    entertainment: loveIslandSeason,
    travel: vegasTicket,
  };
}

export function leaderboardRows(transactions: any[], anon = true) {
  const youName = anon ? 'You (Anonymous)' : 'You';
  const youAmt = totalLost(transactions);
  const MOCK = [
    { name: 'Zac Saber', amount: 12491 },
    { name: 'Daniil Bekirov', amount: 8672 },
    { name: 'Andy Tyler', amount: 5034 },
  ];
  return [...MOCK, { name: youName, amount: youAmt }]
    .sort((a,b)=>b.amount - a.amount)
    .map((r,i)=>({ rank: i+1, ...r }));
}


