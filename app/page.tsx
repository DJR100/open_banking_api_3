'use client';

import { useEffect, useRef, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export default function ConnectPage() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    fetch('/api/create-link-token')
      .then(r => r.json())
      .then(d => setLinkToken(d.link_token))
      .catch(() => setLinkToken(null));
  }, []);

  const onSuccess = async (public_token: string) => {
    const r = await fetch('/api/exchange-public-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token }),
    });
    if (!r.ok) return alert('Token exchange failed');
    window.location.href = '/loading';
  };

  const { open, ready } = usePlaidLink({ token: linkToken || '', onSuccess });

  function splitCsvLine(line: string): string[] {
    const out: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else { inQuotes = !inQuotes; }
      } else if (ch === ',' && !inQuotes) {
        out.push(cur); cur = '';
      } else {
        cur += ch;
      }
    }
    out.push(cur);
    return out.map(s => s.trim());
  }

  function parseCsvToObjects(text: string): any[] {
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length === 0) return [];
    const headers = splitCsvLine(lines[0]).map(h => h.replace(/^\uFEFF/, ''));
    const rows = lines.slice(1).map(splitCsvLine);
    return rows.map(cols => Object.fromEntries(headers.map((h, i) => [h, cols[i] ?? ''])));
  }

  function pick(obj: any, keys: string[]): any | null {
    for (const k of keys) {
      if (obj[k] !== undefined && obj[k] !== null && obj[k] !== '') return obj[k];
    }
    return null;
  }

  async function onSubmitCsv(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    const text = await file.text();
    const records: any[] = parseCsvToObjects(text);
    const txns = records.map((r, i) => {
      const dateRaw = pick(r, ['date', 'Date', 'posted', 'Posting Date', 'Transaction Date']);
      const dateStr = String(dateRaw || '').slice(0, 10);
      const amountRaw = pick(r, ['amount', 'Amount', 'value', 'Value', 'Transaction Amount']);
      const merchantRaw = pick(r, ['merchant_name', 'Merchant', 'Description', 'Name', 'Narrative', 'Details']);
      const mccRaw = pick(r, ['mcc', 'MCC']);
      const catRaw = pick(r, ['category', 'Category']);
      const pfcRaw = pick(r, ['pfc', 'Personal Finance Category']);
      const currencyRaw = pick(r, ['currency', 'Currency']) || 'GBP';
      const timeRaw = pick(r, ['time', 'Time', 'Transaction Time']);

      const amtNum = Number(String(amountRaw || '0').replace(/,/g, ''));
      const cat: string[] =
        typeof catRaw === 'string'
          ? catRaw.split(/[>,]/).map(s => s.trim()).filter(Boolean)
          : Array.isArray(catRaw)
          ? catRaw
          : [];

      let datetime: string | null = null;
      if (dateStr && timeRaw) {
        const tClean = String(timeRaw).trim();
        const maybeIso = new Date(`${dateStr} ${tClean}`);
        if (!isNaN(maybeIso.getTime())) {
          datetime = maybeIso.toISOString();
        }
      }

      return {
        id: r.id || r.transaction_id || `csv-${i}-${dateStr}`,
        date: dateStr,
        datetime,
        amount: isFinite(amtNum) ? amtNum : 0,
        merchant_name: String(merchantRaw || 'Unknown'),
        mcc: mccRaw ? String(mccRaw) : null,
        category: cat,
        pfc: pfcRaw ? String(pfcRaw) : null,
        currency: String(currencyRaw || 'GBP'),
        _source: 'csv',
      };
    });

    try {
      localStorage.setItem('override_txns', JSON.stringify(txns));
    } catch {}
    window.location.href = '/loading';
  }

  return (
    <main className="relative p-8 max-w-3xl mx-auto text-center">
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(60% 60% at 50% 30%, #ff1744 0%, transparent 55%), radial-gradient(40% 40% at 70% 80%, #ff1744 0%, transparent 55%)' }} />

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
        <span className="block text-white">Expose your</span>
        <span className="block text-[#ff1744]">gambling addiction.</span>
      </h1>
      <p className="mt-4 text-lg text-gray-400">Your bank knows. The house knows. It's time you knew.</p>

      <div className="mt-8">
        <button
          disabled={!ready || !linkToken}
          onClick={() => open()}
          className="px-6 py-3 rounded bg-[#ff1744] hover:bg-[#d5133a] text-white disabled:opacity-50 shadow-[0_0_30px_#ff1744AA]"
        >
          {linkToken ? 'Connect your bank and face the truth →' : 'Preparing…'}
        </button>
      </div>

      <div className="my-8 flex items-center gap-2">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-gray-500 text-sm">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <div className="mt-2">
        <p className="mb-2">Upload a statement (CSV):</p>
        <form onSubmit={onSubmitCsv} className="flex justify-center items-center gap-3">
          <input
            ref={fileRef}
            id="csv-file"
            type="file"
            name="file"
            accept=".csv"
            className="hidden"
            required
            onChange={(e) => setFileName(e.currentTarget.files?.[0]?.name || '')}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="px-3 py-1.5 rounded border border-white/20 bg-black/30 text-white hover:border-[#ff1744] hover:text-[#ff1744] transition-colors"
          >
            Choose file
          </button>
          <span className="text-sm text-gray-400 max-w-[240px] truncate">{fileName || 'No file selected'}</span>
          <button className="px-3 py-1.5 rounded border border-[#ff1744] text-[#ff1744] hover:bg-[#ff1744] hover:text-white transition-colors" type="submit">Upload</button>
        </form>
        <div className="text-sm text-gray-500 mt-2">
          Need sample data? Download{' '}
          <a className="underline text-[#ff1744]" href="/samples/small.csv">small.csv</a> or{' '}
          <a className="underline text-[#ff1744]" href="/samples/large.csv">large.csv</a>.
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-10">We promise not to tell your girlfriend.</p>
    </main>
  );
}


