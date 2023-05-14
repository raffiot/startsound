import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "@/context/UserContext";
import { linkingConfig } from "@/config/deeplink";
import { UserStack } from "./UserStack";
import { AuthStack } from "./AuthStack";
import { SplashScreen } from "@/screens/SplashScreen";
import { MainStackParamList } from "./types";
import Theme from "./theme";

const SCREEN_OPTIONS = {
  headerShown: false,
};
export default function RootNavigation() {
  const { user, isProfileComplete, isLoading } = useContext(UserContext);
  const MainStack = createNativeStackNavigator<MainStackParamList>();

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <NavigationContainer
      theme={Theme}
      linking={linkingConfig}
      fallback={<ActivityIndicator />}
    >
      <MainStack.Navigator screenOptions={SCREEN_OPTIONS}>
        {!user || !isProfileComplete ? (
          <MainStack.Screen name="AuthStack" component={AuthStack} />
        ) : (
          <MainStack.Screen name="UserStack" component={UserStack} />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
