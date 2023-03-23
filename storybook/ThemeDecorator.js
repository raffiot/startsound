import React from "react";
import { ImageBackground } from "react-native";
import * as Font from "expo-font";
import { Box, Center, NativeBaseProvider } from "native-base";
import { theme, config } from "../src/design";

export const ThemeDecorator = (getStory) => {
  Font.loadAsync({
    "Unbounded-Medium": require("../assets/fonts/Unbounded-Medium.ttf"),
    "Unbounded-Bold": require("../assets/fonts/Unbounded-Bold.ttf"),
    "Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf"),
    "Caveat-Medium": require("../assets/fonts/Caveat-Medium.ttf"),
    // "Caveat-Regular": require("../assets/fonts/Caveat-Regular.ttf"),
    // "Caveat-SemiBold": require("../assets/fonts/Caveat-SemiBold.ttf"),
    // "Caveat-Bold": require("../assets/fonts/Caveat-Bold.ttf"),
  });

  return (
    <NativeBaseProvider theme={theme} config={config}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/background.png")}
      ></ImageBackground>
      <Box width="100%" height="100%" p="4" safeArea>
        <Center>{getStory()}</Center>
      </Box>
    </NativeBaseProvider>
  );
};
