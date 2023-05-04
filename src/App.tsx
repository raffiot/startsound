import React, { useCallback, useEffect } from "react";
import { ImageBackground } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { CustomApolloProvider } from "./apollo/CustomApolloProvider";
import { theme, config } from "@/design";
import RootNavigation from "@/navigation/index";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Unbounded-Regular": require("../assets/fonts/Unbounded-Regular.ttf"),
    "Unbounded-Medium": require("../assets/fonts/Unbounded-Medium.ttf"),
    "Unbounded-Bold": require("../assets/fonts/Unbounded-Bold.ttf"),
    "Unbounded-ExtraBold": require("../assets/fonts/Unbounded-ExtraBold.ttf"),
    "Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf"),
    "Caveat-Medium": require("../assets/fonts/Caveat-Medium.ttf"),
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
      <CustomApolloProvider>
        <AuthProvider>
          <UserProvider>
            <ImageBackground
              style={{ flex: 1 }}
              source={require("../assets/background.png")}
              onLayout={onLayoutRootView}
            >
              <RootNavigation />
            </ImageBackground>
          </UserProvider>
        </AuthProvider>
      </CustomApolloProvider>
    </NativeBaseProvider>
  );
}
