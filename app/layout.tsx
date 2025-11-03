export const metadata = {
  title: 'Gambling Spend Demo',
  description: 'In-memory demo. No data is stored.',
};

import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0d12] text-gray-100">
        <div className="fixed inset-0 -z-10 pointer-events-none" style={{ background: 'radial-gradient(60% 60% at 50% 20%, rgba(255,23,68,0.08) 0%, transparent 60%), radial-gradient(40% 40% at 80% 80%, rgba(255,23,68,0.06) 0%, transparent 60%)' }} />
        {children}
      </body>
    </html>
  );
}


