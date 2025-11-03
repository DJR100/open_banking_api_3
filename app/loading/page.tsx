'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const phrases = [
  'Calculating emotional damage…',
  'Tallying your bad decisions…',
  'Fetching your regret…',
  'Counting your sins…',
  'Asking the pit boss…',
];

export default function LoadingPage() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const minTimer = useRef<NodeJS.Timeout | null>(null);
  const canLeave = useRef(false);

  useEffect(() => {
    const rot = setInterval(() => setI(p => (p + 1) % phrases.length), 1100);
    minTimer.current = setTimeout(() => { canLeave.current = true; }, 5000);

    fetch('/api/transactions')
      .then(r => r.json())
      .finally(() => {
        const go = () => router.push('/dashboard');
        if (canLeave.current) go();
        else {
          const wait = setInterval(() => {
            if (canLeave.current) { clearInterval(wait); go(); }
          }, 200);
        }
      });

    return () => {
      clearInterval(rot);
      if (minTimer.current) clearTimeout(minTimer.current);
    };
  }, [router]);

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="relative w-44 h-44 mb-8">
        <div className="absolute inset-0 rounded-full border-[10px] border-[#190b0d]" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#2b0a0f] to-[#0f0a0a] shadow-[0_0_80px_#ff174433]" />
        <div className="absolute inset-0 rounded-full border-[10px] border-t-[#ff1744] border-r-transparent border-b-transparent border-l-transparent animate-spin [animation-duration:1400ms]" />
      </div>
      <div className="text-3xl md:text-4xl font-semibold text-gray-200 mb-4">{phrases[i]}</div>
      <div className="w-[560px] max-w-[90vw] h-2 rounded-full bg-[#1f1b1b] overflow-hidden">
        <div className="h-full bg-[#ff1744] animate-[bar_2.2s_ease_infinite]" />
      </div>
      <style>{`@keyframes bar{0%{width:0%}50%{width:85%}100%{width:0%}}`}</style>
    </main>
  );
}


