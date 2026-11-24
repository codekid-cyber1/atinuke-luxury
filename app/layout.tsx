import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Atinuke Luxury — Statement Wear, Made to Stand Out',
  description:
    'Handcrafted 2-piece sets, embroidered boubous, and bespoke fabrics tailored in Ilorin, Kwara State, Nigeria by Haleemah Aderonke.',
  openGraph: {
    title: 'Atinuke Luxury — Statement Wear, Made to Stand Out',
    description:
      'Handcrafted 2-piece sets, embroidered boubous, and bespoke fabrics tailored in Ilorin, Kwara State, Nigeria.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atinuke Luxury — Statement Wear, Made to Stand Out',
    description:
      'Handcrafted 2-piece sets, embroidered boubous, and bespoke fabrics tailored in Ilorin, Kwara State, Nigeria.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body
        suppressHydrationWarning
        className="font-sans bg-[#F5F0E6] text-[#111111] antialiased selection:bg-[#C5A059]/30 selection:text-[#111111]"
      >
        {children}
      </body>
    </html>
  );
}
