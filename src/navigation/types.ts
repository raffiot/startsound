import { Room } from "@/types/room";

export type AuthStackParamList = {
  Welcome: undefined;
  Username: undefined;
  Birth: undefined;
};

export type UserStackParamList = {
  Home: undefined;
  Room: { item: Room };
};
