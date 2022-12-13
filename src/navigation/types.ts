import { Room } from "@/types/room";

export type AuthStackParamList = {
  Welcome: undefined;
  Username: undefined;
  Birth: { username: string };
};

export type UserStackParamList = {
  Home: undefined;
  Room: { item: Room };
};
