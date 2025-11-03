'use client';

import { useEffect, useRef, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export default function ConnectPage() {
  const [linkToken, setLinkToken] = useState<string | null>(null);

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
        <form action="/api/upload-csv" method="post" encType="multipart/form-data" className="flex justify-center items-center gap-3">
          {/* Accessible hidden file input */}
          {/* Using a custom trigger to avoid the default browser style */}
          {(() => {
            const fileRef = useRef<HTMLInputElement | null>(null);
            const [fileName, setFileName] = useState('');
            return (
              <>
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
              </>
            );
          })()}
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


