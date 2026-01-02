import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jubilee Private Internet - SSO & Inspire Web Spaces',
  description: 'The Jubilee Private Internet (JPI) - A faith-aligned, private internet architecture for trust, safety, and purpose. Register your Inspire Web Space today.',
  keywords: ['Jubilee Private Internet', 'JPI', 'Inspire Web Spaces', 'Jubilee Browser', 'Faith-Based Internet', 'Worldwide Bible Web'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          {children}
        </div>
      </body>
    </html>
  );
}
