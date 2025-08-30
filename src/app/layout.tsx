import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Jersey_10 } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const jersey = Jersey_10({
  variable: '--font-jersey',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'lolf',
  description: 'lolf guessing game',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${jersey.className} antialiased`}>{children}</body>
    </html>
  );
}
