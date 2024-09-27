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
        primary: {
          // DEFAULT: '#628db7',
          // light: '#507AAA',
          // dark: '#3d5b75',
          // blue: '#116699',
          text: '#505050',
          border: '#dcdcdc',
          sub_bg: '#eeeeee',
          bgError: '#ffe3e3',
          bgLogin: '#ffebc1',
          borderLogin: '#fdbf3b',
          borderError: '#ee7878',
          // lightBlue: '#8db0d8',
          // darkBlue: '#159',
          red: '#c61a1a',
          // pink: '#ffc4c4',
          gray: '[#f6f7f8]',
          loading: '34d2c8',
          text_gray: '#555',
          bg_gray: '#fcfcfc',
        },

        blue: {
          100: '#8db0d8', // light blue variant
          200: '#507AAA', // primary light
          300: '#628db7', // primary default
          400: '#3d5b75', // primary dark
          500: '#159', // dark blue variant
          600: '#116699', // primary blue
        },
        red: {
          100: '#ffc4c4', // pink variant
          200: '#ff9999', // lighter red
          300: '#ff6666', // mid-tone red
          400: '#c61a1a', // primary red
        },
        gray: {
          100: '#f6f7f8', // primary gray
          200: '#eeeeee', // sub background gray
          300: '#dcdcdc', // border gray
          400: '#fcfcfc', // background gray
          500: '#555', // text gray
        },
        yellow: {
          100: '#ffebc1', // background login yellow
          200: '#fdbf3b', // border login yellow
        },
        orange: {
          100: '#ffe3e3', // error background
          200: '#ee7878', // error border
        },
        green: {
          100: '#34d2c8', // loading green
        },
        text: {
          100: '#505050', // primary text color
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
