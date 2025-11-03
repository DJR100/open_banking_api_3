'use client';

import { useEffect, useState } from 'react';
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
    window.location.href = '/dashboard';
  };

  const { open, ready } = usePlaidLink({ token: linkToken || '', onSuccess });

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Connect your bank</h1>

      <button
        disabled={!ready || !linkToken}
        onClick={() => open()}
        className="px-4 py-2 rounded bg-[#4169E1] hover:bg-[#3657c7] text-white disabled:opacity-50 shadow-md"
      >
        {linkToken ? 'Connect with Plaid' : 'Preparing…'}
      </button>

      <div className="my-6 flex items-center gap-2">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-500 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="mt-2">
        <p className="mb-2">Upload a statement (CSV):</p>
        <form action="/api/upload-csv" method="post" encType="multipart/form-data">
          <input className="border p-1 rounded" type="file" name="file" accept=".csv" required />
          <button className="ml-2 px-3 py-1 rounded border border-[#4169E1] text-[#4169E1] hover:bg-[#4169E1] hover:text-white transition-colors" type="submit">Upload</button>
        </form>
        <div className="text-sm text-gray-500 mt-2">
          Need sample data? Download{' '}
          <a className="underline text-[#4169E1]" href="/samples/small.csv">small.csv</a> or{' '}
          <a className="underline text-[#4169E1]" href="/samples/large.csv">large.csv</a>.
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        In-memory demo. No data is stored.
      </p>
    </main>
  );
}


