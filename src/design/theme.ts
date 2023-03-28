import { extendTheme } from "native-base";

const newTheme = {
  colors: {
    lightRose: "#FFE9FE",
    love: "#ED99FF",
    aqua: "#3952E2",
    lightGray: "#7d7882",
    spotify: {
      400: "#1DB954",
    },
  },
  fontConfig: {
    Unbounded: {
      400: {
        normal: "Unbounded-Regular",
      },
      500: {
        normal: "Unbounded-Medium",
      },
      700: {
        normal: "Unbounded-Bold",
      },
    },
    Caveat: {
      400: {
        normal: "Caveat-Medium",
      },
    },
    Pacifico: {
      700: {
        normal: "Pacifico-Regular",
      },
    },
  },
  fonts: {
    body: "Unbounded-Bold",
    heading: "Unbounded",
  },
};

export default extendTheme(newTheme);
