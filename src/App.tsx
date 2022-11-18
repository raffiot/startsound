import React, { useCallback, useEffect } from "react";
import { NativeBaseProvider, Box } from "native-base";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { theme, config } from "./design";
import { WelcomeScreen } from "./screens/WelcomeScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf"),
    // "Caveat-Medium": require("../assets/fonts/Caveat-Medium.ttf"),
    // "Caveat-Regular": require("../assets/fonts/Caveat-Regular.ttf"),
    // "Caveat-SemiBold": require("../assets/fonts/Caveat-SemiBold.ttf"),
    // "Caveat-Bold": require("../assets/fonts/Caveat-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

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
        safeArea
        onLayout={onLayoutRootView}
      >
        <WelcomeScreen />
      </Box>
    </NativeBaseProvider>
  );
}
