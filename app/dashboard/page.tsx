'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { bucket, topMerchants } from '@/lib/classify';
import {
  totalLost as sumLoss, biggestLosingWeek, favouriteVenue,
  percentileRank, realityCheck, leaderboardRows
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
  const pct = useMemo(() => percentileRank(loss), [loss]);
  const rc = useMemo(() => realityCheck(loss), [loss]);
  const rows = useMemo(() => leaderboardRows(txns, true).slice(0, 4), [txns]);
  const merch90All = useMemo(() => topMerchants(txns, 90), [txns]);
  const [showAllMerch, setShowAllMerch] = useState(false);
  const merch90 = useMemo(() => (showAllMerch ? merch90All : merch90All.slice(0, 3)), [showAllMerch, merch90All]);
  const cards = useMemo(() => [
    {
      key: 'invested',
      content: (
        <>
          If you'd invested that in an S&SP500 ETF: <span className="font-semibold">{gbp.format(rc.invested)}</span> today
        </>
      ),
    },
    {
      key: 'meals',
      content: (
        <>
          That's: <span className="font-semibold">{intFmt.format(rc.meals)}</span> Tesco Meal Deals
        </>
      ),
    },
    {
      key: 'travel',
      content: (
        <>
          Enough to buy: <span className="font-semibold">{rc.travel}</span>
        </>
      ),
    },
  ], [rc]);
  const [rcIdx, setRcIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setRcIdx(i => (i + 1) % cards.length), 3000);
    return () => clearInterval(id);
  }, [cards.length]);

  const hasAnyGamblingThisView = dataVals.some(v => v > 0);

  return (
    <main className="p-8 max-w-5xl mx-auto text-center">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold mb-3">The Damage Report</h1>
        <a href="/share" className="inline-block px-3 py-2 rounded bg-[#ff1744] hover:bg-[#d5133a] text-white text-sm">Share My Damage</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
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

      <section className="rounded-lg border border-white/10 bg-[#0f1115] p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Reality Check</h2>
        <div className="text-xs text-gray-500 mb-4">What you could have had instead</div>
        <div className="relative max-w-3xl mx-auto">
          <div
            key={cards[rcIdx].key}
            className="p-6 rounded-2xl border border-[#ff1744]/40 bg-[radial-gradient(120%_120%_at_30%_10%,#2a0c10_0%,#101318_60%)] shadow-[0_0_40px_#ff174422]"
            style={{ animation: 'popIn 400ms ease' }}
            onClick={() => setRcIdx((rcIdx + 1) % cards.length)}
          >
            <div className="text-base md:text-lg leading-relaxed">
              {cards[rcIdx].content}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            {cards.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 w-6 rounded-full ${idx === rcIdx ? 'bg-[#ff1744]' : 'bg-white/15'}`}
              />
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-500">Click card to skip</div>
        </div>
        <style>{`@keyframes popIn{0%{opacity:0;transform:translateY(6px) scale(.98)}100%{opacity:1;transform:translateY(0) scale(1)}}`}</style>
      </section>

      {/* Top vendors (90 days) */}
      <section className="rounded-lg border border-white/10 bg-[#0f1115] p-6 mb-6 shadow-[0_0_40px_#ff17441a]">
        <h2 className="text-lg font-semibold mb-2">Top vendors (90 days)</h2>
        {merch90.length === 0 ? (
          <div className="text-gray-500">No gambling transactions in the last 90 days.</div>
        ) : (
          <div className="border border-white/10 rounded overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-[#ff1744] text-white">
                <tr>
                  <th className="text-left px-4 py-2">Merchant</th>
                  <th className="text-right px-4 py-2">Spend</th>
                </tr>
              </thead>
              <tbody>
                {merch90.map((m) => (
                  <tr key={m.merchant} className="border-t border-white/10 hover:bg-white/5">
                    <td className="px-4 py-2">{m.merchant}</td>
                    <td className="px-4 py-2 text-right">{gbp.format(m.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {merch90All.length > 3 && (
              <div className="p-3 text-center border-t border-white/10 bg-black/20">
                <button
                  onClick={() => setShowAllMerch(s => !s)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[#ff1744] text-[#ff1744] hover:bg-[#ff1744] hover:text-white transition-colors"
                >
                  {showAllMerch ? 'Show top 3' : `Show all (${merch90All.length})`}
                </button>
              </div>
            )}
          </div>
        )}
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


