import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smile Plus Dental Clinic',
  description: 'Smile Plus Dental Clinic management platform',
  openGraph: {
    title: 'Smile Plus Dental Clinic',
    description: 'Smile Plus Dental Clinic management platform',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
