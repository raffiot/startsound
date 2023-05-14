import React from "react";
import { ImageBackground } from "react-native";

export const SplashScreen = () => {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../assets/splash.png")}
    ></ImageBackground>
  );
};
