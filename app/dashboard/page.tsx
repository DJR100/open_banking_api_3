'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { bucket, topMerchants, totalSpend } from '@/lib/classify';

type Period = 'year' | 'month' | 'week' | 'day';
const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

export default function Dashboard() {
  const [txns, setTxns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>('month');

  useEffect(() => {
    setLoading(true);
    fetch('/api/transactions')
      .then(r => r.json())
      .then(d => setTxns(d.transactions || []))
      .finally(() => setLoading(false));
  }, []);

  const totals = useMemo(() => bucket(txns, period), [txns, period]);
  const labels = useMemo(() => Object.keys(totals).sort(), [totals]);
  const dataVals = useMemo(() => labels.map(k => totals[k] || 0), [labels, totals]);
  const totalValue = useMemo(() => totalSpend(txns), [txns]);
  const merchantRows = useMemo(() => topMerchants(txns, 90).slice(0, 10), [txns]);

  const hasAnyGamblingThisView = dataVals.some(v => v > 0);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Gambling Spend</h1>

      <div className="mb-4">
        <select
          value={period}
          onChange={e => setPeriod(e.target.value as Period)}
          className="border px-2 py-1 rounded"
        >
          <option value="year">Year</option>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>
      </div>

      <div className="text-lg font-medium mb-4">Total: {gbp.format(totalValue)}</div>

      {loading ? (
        <div className="text-gray-500">Loading…</div>
      ) : txns.length === 0 ? (
        <div className="text-gray-600 border rounded p-4">
          No transactions loaded. Go back and connect or upload a CSV.
        </div>
      ) : !hasAnyGamblingThisView ? (
        <div className="text-gray-600 border rounded p-4">
          No gambling transactions detected for this period.
        </div>
      ) : (
        <div className="mb-8">
          <Bar
            data={{
              labels,
              datasets: [
                {
                  label: 'Gambling Spend',
                  data: dataVals,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              ],
            }}
            options={{
              animation: false,
              responsive: true,
              scales: {
                y: { beginAtZero: true, ticks: { callback: (v) => gbp.format(Number(v)) } },
              },
            }}
          />
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold mb-2">Top gambling merchants (90 days)</h2>
        {merchantRows.length === 0 ? (
          <div className="text-gray-600 border rounded p-4">
            No gambling transactions in the last 90 days.
          </div>
        ) : (
          <div className="border rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2">Merchant</th>
                  <th className="text-right px-3 py-2">Spend</th>
                </tr>
              </thead>
              <tbody>
                {merchantRows.map(row => (
                  <tr key={row.merchant} className="border-t">
                    <td className="px-3 py-2">{row.merchant}</td>
                    <td className="px-3 py-2 text-right">{gbp.format(row.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}


