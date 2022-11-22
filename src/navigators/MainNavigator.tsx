import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeScreen } from "@/screens/WelcomeScreen";
import { UsernameScreen } from "@/screens/UsernameScreen";
import { BirthScreen } from "@/screens/BirthScreen";
import { RootStackParamList } from "./types";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export const MainNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Username" component={UsernameScreen} />
        <Stack.Screen name="Birth" component={BirthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
