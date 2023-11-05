/** @format */

import './globals.scss';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const goshaSans = localFont({
  src: '../fonts/PPGoshaSans-Bold.otf',
  variable: '--font-gosha',
});

const poppins = localFont({
  src: [
    {
      path: '../fonts/Poppins-Light.ttf',
      weight: '300',
    },
    {
      path: '../fonts/Poppins-Regular.ttf',
      weight: '400',
    },
    {
      path: '../fonts/Poppins-Bold.ttf',
      weight: '700',
    },
  ],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Rabble',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${goshaSans.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
