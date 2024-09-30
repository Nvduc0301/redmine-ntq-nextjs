import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // color Mainstream
        blue: {
          100: '#8db0d8', // light blue variant
          200: '#507AAA', // primary light
          300: '#628db7', // primary default
          400: '#3d5b75', // primary dark
          500: '#159', // dark blue variant
          600: '#116699', // primary blue
          700: '#1c63d5',
          800: '#169',
        },
        red: {
          100: '#ffc4c4', // pink variant
          150: '#ffd4d4', // pink variant
          200: '#ff9999', // lighter red
          300: '#ee7878', // error border
          400: '#ff6666', // mid-tone red
          500: '#c61a1a', // primary red
          600: '#b2290f',
          700: '#bb0000',
        },
        gray: {
          50: '#f6f6f6',
          100: '#f6f7f8', // primary gray
          150: '#f6f7f9', // primary gray
          200: '#eeeeee', // sub background gray
          250: '#f2f2f2', // sub background gray
          300: '#dcdcdc', // border gray
          350: '#d7d7d7',
          400: '#fcfcfc', // background gray
          450: '#c3c2c2',
          500: '#555',
          550: '#ddd',
          600: '#505050', // primary text color
          700: '#cccccc',
          800: '#999',
        },
        black: {
          200: '#666',
          300: '#888',
          400: '#808080',
          500: '#484848',
          700: '#222',
        },
        yellow: {
          100: '#ffffdd',
          200: '#ffebc1', // background login yellow
          300: '#fdbf3b', // border login yellow
        },
        orange: {
          100: '#ffe3e3', // error background

          400: '#FFEBC1',
          600: '#FDBF3B',
          700: '#A6750C',
        },
        green: {
          100: '#34d2c8',
          200: '#ccccbb',
          300: '#d3edd3', // loading green
        },
      },
      borderWidth: {
        1: '1px',
        3: '3px',
        5: '5px',
      },
      minWidth: {
        900: '900px',
        463: '463px',
      },
      minHeight: {
        615: '615px',
      },
      height: {
        88: '88px',
      },
      fontSize: {
        10: ['10px', { lineHeight: '14px' }],
        11: ['11px', { lineHeight: '15px' }],
        13: ['13px', { lineHeight: '18px' }],
      },
    },
  },
  plugins: [],
};
export default config;
