import { Room } from "@/context/UserContext";

export type AuthStackParamList = {
  Welcome: undefined;
  Username: undefined;
  Birth: { username: string };
};

export type UserStackParamList = {
  Home: undefined;
  Room: { item: Room };
};
