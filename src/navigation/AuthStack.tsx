import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { WelcomeScreen } from "@/screens/WelcomeScreen";
import { UsernameScreen } from "@/screens/UsernameScreen";
import { BirthDateScreen } from "@/screens/BirthDateScreen";
import { BirthHourScreen } from "@/screens/BirthHourScreen";
import { BirthPlaceScreen } from "@/screens/BirthPlaceScreen";
import { AuthStackParamList } from "./types";

export const AuthStack = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Username" component={UsernameScreen} />
      <Stack.Screen name="BirthDate" component={BirthDateScreen} />
      <Stack.Screen name="BirthHour" component={BirthHourScreen} />
      <Stack.Screen name="BirthPlace" component={BirthPlaceScreen} />
    </Stack.Navigator>
  );
};
