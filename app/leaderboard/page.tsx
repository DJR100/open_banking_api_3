'use client';

import { useEffect, useMemo, useState } from 'react';
import { totalLost } from '@/lib/insights';

const MOCK = [
  { name: 'Zac Saber', amount: 8120.42 },
  { name: 'Daniil Bekirov', amount: 6422.10 },
  { name: 'Andy Tyler', amount: 5118.88 },
  { name: 'Alex P', amount: 3891.50 },
  { name: 'Jamie K', amount: 2107.33 },
];

const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

export default function Leaderboard() {
  const [txns, setTxns] = useState<any[]>([]);
  const [anon, setAnon] = useState(true);

  useEffect(() => {
    fetch('/api/transactions').then(r => r.json()).then(d => setTxns(d.transactions || []));
  }, []);

  const you = useMemo(() => ({ name: anon ? 'Anonymous' : 'You', amount: totalLost(txns) }), [txns, anon]);
  const rows = useMemo(() => {
    const data = [...MOCK, you].sort((a, b) => b.amount - a.amount);
    return data.map((r, i) => ({ rank: i + 1, ...r }));
  }, [you]);

  const bigLoss = you.amount > 5000;

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Leaderboard of Shame</h1>
        <label className="text-sm flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={anon} onChange={e => setAnon(e.target.checked)} />
          Anonymous Mode
        </label>
      </div>

      <div className="border border-white/10 bg-[#0f1115] rounded overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#ff1744] text-white">
            <tr>
              <th className="text-left px-3 py-2">#</th>
              <th className="text-left px-3 py-2">Name</th>
              <th className="text-right px-3 py-2">Losses</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.rank} className={`border-t ${r.name === (anon ? 'Anonymous' : 'You') ? 'bg-[#ff1744]/10' : ''}`}>
                <td className="px-3 py-2">{r.rank}</td>
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2 text-right">{gbp.format(r.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bigLoss && (
        <div className="mt-4 px-3 py-2 rounded bg-[#ff1744] text-white inline-block shadow-[0_0_20px_#ff1744AA]">
          Jackpot! Over £5,000 – congrats (to the casino).
        </div>
      )}
    </main>
  );
}


