/** @format */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/navigation/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      'primary-light-1': 'var(--primary-color-light-1)',
      'primary-light-2': 'var(--primary-color-light-2)',
      'grey-1': 'var(--grey-color-1)',
      'grey-2': 'var(--grey-color-2)',
      'grey-3': 'var(--grey-color-3)',
      'grey-4': 'var(--grey-color-4)',
      'grey-5': 'var(--grey-color-5)',
      'grey-6': 'var(--grey-color-6)',
      'grey-7': 'var(--grey-color-7)',
      'blue-1': 'var(--blue-color-1)',
      'green-1': 'var(--green-color-1)',
      black: 'var(--black-color)',
      white: 'var(--white-color)',
      'white-1': 'var(--white-color-1)',
      'white-2': 'var(--white-color-2)',
      'white-3': 'var(--white-color-3)',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        gosha: ['var(--font-gosha)'],
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
};
export default config;
