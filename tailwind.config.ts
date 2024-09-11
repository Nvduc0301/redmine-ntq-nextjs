import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // color Mainstream
        primary: {
          DEFAULT: "#628db7",
          light: "#507AAA",
          dark: "#3d5b75",
          blue: "#116699",
          text: "#505050",
          border: "#dcdcdc",
          sub_bg: "#eeeeee",
          bgError: "#ffe3e3",
          bgLogin: "#ffebc1",
          borderLogin: "#fdbf3b",
          borderError: "#ee7878",
          lightBlue: "#8db0d8",
          darkBlue: "#159",
          red: "#c61a1a",
          pink: "#ffc4c4",
          gray: "[#f6f7f8]",
          loading: "34d2c8",
          text_gray: "#555",
          bg_gray: "#fcfcfc",
        },
      },
      borderWidth: {
        1: "1px",
        3: "3px",
        5: "5px",
      },
      minWidth: {
        900: "900px",
        463: "463px",
      },
      minHeight: {
        615: "615px",
      },
      height: {
        88: "88px",
      },
      fontSize: {
        10: ["10px", { lineHeight: "14px" }],
        11: ["11px", { lineHeight: "15px" }],
        13: ["13px", { lineHeight: "18px" }],
      },
    },
  },
  plugins: [],
};
export default config;
