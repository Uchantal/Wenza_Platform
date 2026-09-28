import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './fonts.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wenza | African Creators and Brands network',
  description: 'Your Creativity serves the world and deserves recognition.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
