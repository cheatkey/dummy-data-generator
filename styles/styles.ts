import tw, { css } from "twin.macro";
import colors from "tailwindcss/colors";
import { StylesConfig } from "react-select";

export const GradientText = css`
  color: #86acff;
`;

export const blockCSS = tw`bg-dark-700 w-full rounded-3xl px-10 py-8 flex flex-col gap-2`;
export const descriptionCSS = tw`text-gray-300 font-normal tracking-tight`;
export const baseInputCSS = tw`border-none outline-none bg-dark-800 text-gray-200 rounded-xl py-2 px-4 placeholder:text-gray-500`;

export const tailwindColor = {
  ...colors,
  dark: {
    "900": "#1A1A1A",
    "800": "#242424",
    "700": "#2F2F2F",
  },
};

export const selectDarkStyle: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: tailwindColor.dark[900],
    borderRadius: "10px",
    border: `1px solid ${tailwindColor.zinc[800]}`,
    ":hover": {
      border: `1px solid ${tailwindColor.zinc[600]}`,
    },
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: tailwindColor.dark[800],
    ":hover": {
      backgroundColor: tailwindColor.dark[700],
    },
  }),
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: tailwindColor.gray[300],
    ":focus": {
      borderColor: tailwindColor.sky[500],
    },
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: tailwindColor.dark[800],
    borderRadius: "10px",
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: "15px",
  }),
};
