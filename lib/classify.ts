const gamblingRe = /(bet365|betfair|ladbrokes|william ?hill|sky ?bet|coral|paddy ?power|pokerstars|888|casino)/i;

export function isGambling(t: any) {
  const mcc = t?.mcc ? String(t.mcc) : null;
  const byMcc = mcc === '7995';
  const byPfc = typeof t?.pfc === 'string' && /gambl/i.test(t.pfc);
  const byCat = Array.isArray(t?.category) && t.category.some((c: string) => /gambl/i.test(c));
  const byName = gamblingRe.test(String(t?.merchant_name || t?.name || ''));
  return byMcc || byPfc || byCat || byName;
}

// Spend semantics per source: Plaid spend positive; CSV spend negative -> use abs(negatives)
export function spendValue(t: any): number {
  const isCsv = t?._source === 'csv';
  const amt = Number(t?.amount || 0);
  if (isCsv) return amt < 0 ? Math.abs(amt) : 0;
  return amt > 0 ? amt : 0;
}

export function bucket(transactions: any[], granularity: 'year'|'month'|'week'|'day') {
  const fmt = (d: Date) => {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    if (granularity === 'year') return `${y}`;
    if (granularity === 'month') return `${y}-${m}`;
    if (granularity === 'week') {
      const tmp = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
      const day = (d.getUTCDay() + 6) % 7; // Monday=0
      tmp.setUTCDate(d.getUTCDate() - day);
      const wm = String(tmp.getUTCMonth() + 1).padStart(2, '0');
      const wd = String(tmp.getUTCDate()).padStart(2, '0');
      return `${tmp.getUTCFullYear()}-W${wm}-${wd}`;
    }
    return `${y}-${m}-${dd}`;
  };

  const out: Record<string, number> = {};
  for (const t of transactions) {
    if (!isGambling(t)) continue;
    const dateStr = t?.date || (t?.datetime ? String(t.datetime).slice(0, 10) : null);
    if (!dateStr) continue;
    const date = new Date(`${dateStr}T00:00:00Z`);
    const key = fmt(date);
    const spend = spendValue(t);
    out[key] = (out[key] || 0) + spend;
  }
  return out;
}

export function totalSpend(transactions: any[]) {
  return transactions.reduce((acc, t) => acc + (isGambling(t) ? spendValue(t) : 0), 0);
}

export function topMerchants(transactions: any[], windowDays = 90) {
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setUTCDate(now.getUTCDate() - windowDays);
  const sums: Record<string, number> = {};
  for (const t of transactions) {
    if (!isGambling(t)) continue;
    const dateStr = t?.date || (t?.datetime ? String(t.datetime).slice(0, 10) : null);
    if (!dateStr) continue;
    const dt = new Date(`${dateStr}T00:00:00Z`);
    if (dt < cutoff) continue;
    const merchant = String(t?.merchant_name || t?.name || 'Unknown');
    sums[merchant] = (sums[merchant] || 0) + spendValue(t);
  }
  return Object.entries(sums)
    .map(([merchant, amount]) => ({ merchant, amount }))
    .sort((a, b) => b.amount - a.amount);
}


