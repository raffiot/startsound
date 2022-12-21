import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { WelcomeScreen } from "@/screens/WelcomeScreen";
import { UsernameScreen } from "@/screens/UsernameScreen";
import { BirthScreen } from "@/screens/BirthScreen";
import { AuthStackParamList } from "./types";
import Theme from "./theme";

export const AuthStack = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Username" component={UsernameScreen} />
      <Stack.Screen name="Birth" component={BirthScreen} />
    </Stack.Navigator>
  );
};
