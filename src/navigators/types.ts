import { Room } from "@/types/room";

export type RootStackParamList = {
  Welcome: undefined;
  Username: undefined;
  Birth: undefined;
  Loading: undefined;
  Home: undefined;
  Room: { item: Room };
};
