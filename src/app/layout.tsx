import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Spark — Modern Dating & Instant Connections',
  description: 'Find real chemistry with curated profiles, interactive swiping, icebreakers, and real-time chat.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className="antialiased bg-[#0D0F14] text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
