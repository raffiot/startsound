import { extendTheme } from "native-base";

const newTheme = {
  colors: {
    aqua: "#3952E2",
    spotify: {
      400: "#1DB954",
    },
  },
  fontConfig: {
    Unbounded: {
      400: {
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
      // 500: {
      //   normal: "Caveat-Regular",
      // },
      // 600: {
      //   normal: "Caveat-SemiBold",
      // },
      // 700: {
      //   normal: "Caveat-Bold",
      // },
    },
    Pacifico: {
      700: {
        normal: "Pacifico-Regular",
      },
    },
  },
  fonts: {
    body: "Unbounded",
    heading: "Unbounded",
  },
};

export default extendTheme(newTheme);
