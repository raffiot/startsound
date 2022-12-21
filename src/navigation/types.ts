import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Welcome: undefined;
  Username: undefined;
  Birth: { username: string };
};

export type UserStackParamList = {
  Home: undefined;
  Room: { id: string };
};

export type MainStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  UserStack: NavigatorScreenParams<UserStackParamList>;
};
