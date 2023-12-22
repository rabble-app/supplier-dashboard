/** @format */

import { ReduxProvider } from '@/redux/provider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';
import PublicRouteWrapper from './PublicRouteWrapper';

const goshaSans = localFont({
  src: [
    { path: '../../public/fonts/PPGoshaSans-Bold.otf', weight: '700' },
    { path: '../../public/fonts/PPGoshaSans-Regular.otf', weight: '400' },
  ],
  variable: '--font-gosha',
});

const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/Poppins-Light.ttf',
      weight: '300',
    },
    {
      path: '../../public/fonts/Poppins-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Poppins-Bold.ttf',
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
        <ReduxProvider>
          <PublicRouteWrapper>{children}</PublicRouteWrapper>{' '}
        </ReduxProvider>
      </body>
    </html>
  );
}
