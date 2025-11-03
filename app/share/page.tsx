'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { totalSpend } from '@/lib/classify';
import { percentileRank } from '@/lib/insights';
import { useRouter } from 'next/navigation';

export default function Share() {
  const [txns, setTxns] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => { fetch('/api/transactions').then(r => r.json()).then(d => setTxns(d.transactions || [])); }, []);
  const loss = useMemo(() => totalSpend(txns), [txns]);
  const pctBelow = useMemo(() => percentileRank(loss), [loss]);

  const level = loss > 10000 ? 'High-Roller Catastrophe' : loss > 5000 ? 'Intermediate Disaster' : loss > 1000 ? 'Mild Mishap' : 'Beginner’s Luck';
  const gbp0 = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });
  const nf = new Intl.NumberFormat('en-GB');
  const save = async () => {
    const { toPng } = await import('html-to-image');
    if (!ref.current) return;
    const dataUrl = await toPng(ref.current, { pixelRatio: 2, cacheBust: true });
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'gambling-damage-card.png';
    a.click();
  };

  const shareWhatsApp = () => {
    const msg = `I lost ${gbp0.format(loss)} this year — Top ${nf.format(Math.max(1, 100 - pctBelow))}% of gamblers. Check your card: ${window.location.origin}`;
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => router.back()}
          aria-label="Close"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-gray-300 hover:bg-white/5"
        >
          ×
        </button>
        <h1 className="text-2xl font-semibold">Share your damage</h1>
      </div>

      <div ref={ref} className="rounded-2xl overflow-hidden border-2 border-[#ff1744] bg-[radial-gradient(120%_120%_at_30%_10%,#2a0c10_0%,#111318_60%)] text-white shadow-[0_0_40px_#ff174433]">
        <div className="p-6">
          <div className="inline-block text-xs px-3 py-1 rounded-full bg-[#ff1744]/20 border border-[#ff1744]/40 mb-4">GAMBLER LEVEL</div>
          <div className="text-2xl font-semibold">{level}</div>
          <div className="text-5xl font-extrabold mt-2 text-[#ff1744]">{gbp0.format(loss)}</div>
          <div className="text-sm opacity-70 mt-1">Total Lost This Year</div>

          <div className="mt-5 rounded-lg bg-white/5 border border-white/10 p-4 text-center">
            <div className="text-sm">I lost {gbp0.format(loss)} this year — Top {nf.format(Math.max(1, 100 - pctBelow))}% of Gamblers.</div>
          </div>

          <div className="mt-4 text-xs text-[#fbbf24]">• Top {Math.max(1, 100 - pctBelow)}% Globally</div>
        </div>
        <div className="px-6 py-3 bg-[#161a22] text-gray-300 text-xs flex items-center justify-between">
          <span>gambling-spend-demo</span>
          <span>We promise not to tell your girlfriend.</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button onClick={save} className="w-full px-4 py-3 rounded bg-[#ff1744] hover:bg-[#d5133a] text-white font-medium">
          ⬇ Download Card
        </button>
        <button onClick={shareWhatsApp} className="w-full px-4 py-3 rounded bg-[#25D366] hover:bg-[#1ebe5d] text-white font-medium">
          WhatsApp
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Share your shame on social media</p>
    </main>
  );
}


