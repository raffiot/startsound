import { extendTheme } from "native-base";

const newTheme = {
  colors: {
    spotify: {
      400: "#1DB954",
    },
  },
  fontConfig: {
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
  },
  fonts: {
    body: "Caveat",
    heading: "Pacifico-Regular",
  },
};

export default extendTheme(newTheme);
