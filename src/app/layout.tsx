/** @format */

import { ReduxProvider } from '@/redux/provider';
import './globals.scss';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const goshaSans = localFont({
  src: [
    { path: '../fonts/PPGoshaSans-Bold.otf', weight: '700' },
    { path: '../fonts/PPGoshaSans-Regular.otf', weight: '400' },
  ],
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
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
