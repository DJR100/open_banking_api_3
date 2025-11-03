export const metadata = {
  title: 'Gambling Spend Demo',
  description: 'In-memory demo. No data is stored.',
};

import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-white via-[#f0f4ff] to-[#e6edff] text-gray-900">
        {children}
      </body>
    </html>
  );
}


