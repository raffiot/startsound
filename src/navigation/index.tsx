import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "@/context/UserContext";
import { linkingConfig } from "@/config/deeplink";
import { UserStack } from "./UserStack";
import { AuthStack } from "./AuthStack";
import { MainStackParamList } from "./types";
import Theme from "./theme";
import { Box } from "native-base";

const SCREEN_OPTIONS = {
  headerShown: false,
};
export default function RootNavigation() {
  const { user, isProfileComplete } = useContext(UserContext);
  const MainStack = createNativeStackNavigator<MainStackParamList>();
  return (
    <NavigationContainer
      theme={Theme}
      linking={linkingConfig}
      fallback={<ActivityIndicator />}
    >
      <MainStack.Navigator screenOptions={SCREEN_OPTIONS}>
        {!user || !isProfileComplete ? (
          <MainStack.Screen name="AuthStack" component={AuthStack} />
        ) : null}
        <MainStack.Screen name="UserStack" component={UserStack} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
