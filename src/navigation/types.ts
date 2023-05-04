import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Welcome: undefined;
  Username: undefined;
  BirthDate: { username: string };
  BirthHour: { username: string; birthday: string };
  BirthPlace: { username: string; birthday: string };
};

export type UserStackParamList = {
  Home: undefined;
  Room: { id: string };
  Checkout: undefined;
};

export type MainStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  UserStack: NavigatorScreenParams<UserStackParamList>;
};
