'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { bucket } from '@/lib/classify';
import {
  totalLost as sumLoss, biggestLosingWeek, favouriteVenue,
  mostActiveTime, percentileRank, realityCheck, leaderboardRows
} from '@/lib/insights';

type Period = 'year' | 'month' | 'week' | 'day';
const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });
const gbp0 = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });
const intFmt = new Intl.NumberFormat('en-GB');
const brand = '#ff1744';

export default function Dashboard() {
  const [txns, setTxns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>('month');

  useEffect(() => {
    setLoading(true);
    fetch('/api/transactions').then(r => r.json()).then(d => setTxns(d.transactions || [])).finally(() => setLoading(false));
  }, []);

  const totals = useMemo(() => bucket(txns, period), [txns, period]);
  const labels = useMemo(() => Object.keys(totals).sort(), [totals]);
  const dataVals = useMemo(() => labels.map(k => totals[k] || 0), [labels, totals]);

  const loss = useMemo(() => sumLoss(txns), [txns]);
  const weekMax = useMemo(() => biggestLosingWeek(txns), [txns]);
  const fav = useMemo(() => favouriteVenue(txns), [txns]);
  const active = useMemo(() => mostActiveTime(txns), [txns]);
  const pct = useMemo(() => percentileRank(loss), [loss]);
  const rc = useMemo(() => realityCheck(loss), [loss]);
  const rows = useMemo(() => leaderboardRows(txns, true).slice(0, 4), [txns]);

  const hasAnyGamblingThisView = dataVals.some(v => v > 0);

  return (
    <main className="p-8 max-w-5xl mx-auto text-center">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold mb-3">The Damage Report</h1>
        <a href="/share" className="inline-block px-3 py-2 rounded bg-[#ff1744] hover:bg-[#d5133a] text-white text-sm">Share My Damage</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <div className="rounded-lg border border-white/10 bg-[#0f1115] p-4 text-center">
          <div className="text-xs text-gray-500 mb-2">Total Lost</div>
          <div className="text-2xl font-semibold text-[#ff1744]">{gbp.format(loss)}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#0f1115] p-4 text-center">
          <div className="text-xs text-gray-500 mb-2">Biggest Losing Week</div>
          <div className="text-2xl font-semibold">{gbp.format(weekMax.amount)}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#0f1115] p-4 text-center">
          <div className="text-xs text-gray-500 mb-2">Favourite Venue</div>
          <div className="text-2xl font-semibold">{fav}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#0f1115] p-4 text-center">
          <div className="text-xs text-gray-500 mb-2">Most Active Time</div>
          <div className="text-2xl font-semibold">{active.label}</div>
          <div className="text-xs text-gray-500 mt-1">{active.tagline}</div>
        </div>
      </div>

      <div className="rounded-lg border border-[#ff1744]/30 p-4 bg-gradient-to-br from-[#ff1744]/10 to-transparent mb-6">
        <span className="inline-flex items-center gap-2 text-[#ff1744] font-medium">
          You lost more than {pct}% of users
        </span>
        <span className="text-gray-600"> (but you tried your best).</span>
      </div>

      <div className="mb-6 bg-[#0f1115] backdrop-blur rounded-lg border border-white/10 p-4 shadow-sm">
        <div className="mb-3 flex justify-center">
          <select
            value={period}
            onChange={e => setPeriod(e.target.value as Period)}
            className="border border-white/10 bg-black/20 text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#ff1744]"
          >
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
        </div>

        {loading ? (
          <div className="text-gray-500">Loading…</div>
        ) : !hasAnyGamblingThisView ? (
          <div className="text-gray-600 border rounded p-4">No gambling transactions detected for this period.</div>
        ) : (
          <Bar
            data={{
              labels,
              datasets: [{ label: 'Gambling Spend', data: dataVals, backgroundColor: brand, borderColor: '#2745A8', borderWidth: 1 }],
            }}
            options={{
              animation: false,
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (ctx) => {
                      const v = Number(ctx.raw || 0);
                      const quip = v > 200 ? ' (the house thanks you)' : v > 0 ? ' (could be worse)' : '';
                      return `${gbp.format(v)}${quip}`;
                    },
                  },
                },
              },
              scales: { y: { beginAtZero: true, ticks: { callback: (v) => gbp0.format(Number(v)) } } },
            }}
          />
        )}
      </div>

      <section className="rounded-lg border border-white/10 bg-[#0f1115] p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Reality Check</h2>
        <div className="text-xs text-gray-500 mb-3">What you could have had instead</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded border">
            If you'd invested that in an S&amp;P500 ETF: <span className="font-semibold">{gbp.format(rc.invested)}</span> today
          </div>
          <div className="p-3 rounded border">
            That's: <span className="font-semibold">{intFmt.format(rc.meals)}</span> Tesco Meal Deals
          </div>
          <div className="p-3 rounded border">
            Equivalent to: Funding <span className="font-semibold">{intFmt.format(rc.entertainment)}</span> Love Island season in bets
          </div>
          <div className="p-3 rounded border">
            Enough to buy: <span className="font-semibold">{rc.travel}</span>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-[#0f1115] p-4">
        <div className="mb-2">
          <h2 className="text-lg font-semibold">Leaderboard of Shame</h2>
          <div className="mt-1"><a className="text-[#ff1744] text-sm hover:underline" href="/leaderboard">View full</a></div>
        </div>
        <div className="border border-white/10 rounded overflow-hidden shadow-sm">
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
                <tr key={r.rank} className={`border-t ${/You/.test(r.name) ? 'bg-[#ff1744]/10' : ''}`}>
                  <td className="px-3 py-2">{r.rank}</td>
                  <td className="px-3 py-2">{r.name}</td>
                  <td className="px-3 py-2 text-right">{gbp.format(r.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}


