import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

export const metadata: Metadata = {
  title: 'BitBoard',
  description: 'A communication platform by EABit Software',
};

const montserrat = Montserrat({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
