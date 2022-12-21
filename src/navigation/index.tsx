import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "@/context/UserContext";
import { linkingConfig } from "@/config/deeplink";
import { UserStack } from "./UserStack";
import { AuthStack } from "./AuthStack";
import { MainStackParamList } from "./types";
import Theme from "./theme";

const SCREEN_OPTIONS = {
  headerShown: false,
};
export default function RootNavigation() {
  const { user, isProfileComplete } = useContext(UserContext);
  const MainStack = createNativeStackNavigator<MainStackParamList>();
  return (
    <NavigationContainer theme={Theme} linking={linkingConfig}>
      <MainStack.Navigator screenOptions={SCREEN_OPTIONS}>
        {!user && !isProfileComplete ? (
          <MainStack.Screen name="AuthStack" component={AuthStack} />
        ) : null}
        <MainStack.Screen name="UserStack" component={UserStack} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
