import React from "react";
import * as Font from "expo-font";
import { Box, Center, NativeBaseProvider } from "native-base";
import { theme, config } from "../src/design";

export const ThemeDecorator = (getStory) => {
  Font.loadAsync({
    "Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf"),
    "Caveat-Medium": require("../assets/fonts/Caveat-Medium.ttf"),
    // "Caveat-Regular": require("../assets/fonts/Caveat-Regular.ttf"),
    // "Caveat-SemiBold": require("../assets/fonts/Caveat-SemiBold.ttf"),
    // "Caveat-Bold": require("../assets/fonts/Caveat-Bold.ttf"),
  });

  return (
    <NativeBaseProvider theme={theme} config={config}>
      <Box
        bg={{
          linearGradient: {
            colors: ["lightBlue.300", "violet.800"],
            start: [0, 0],
            end: [1, 1],
          },
        }}
        width="100%"
        height="100%"
        p="4"
        safeArea
      >
        <Center>{getStory()}</Center>
      </Box>
    </NativeBaseProvider>
  );
};
