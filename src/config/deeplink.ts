import * as Linking from "expo-linking";
import { LinkingOptions } from "@react-navigation/native";
import { MainStackParamList } from "@/navigation/types";

const prefix = Linking.createURL("/");
export const linkingConfig: LinkingOptions<MainStackParamList> = {
  prefixes: [prefix],
  config: {
    screens: {
      UserStack: {
        path: "main",
        initialRouteName: "Home",
        screens: {
          Home: {
            path: "home",
          },
          Room: {
            path: "room/:id",
          },
        },
      },
    },
  },
  // deal with deeplinks when the app is closed
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
  },
  // deal with deeplinks when the app is opened
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => {
      return listener(url);
    };
    const subscription = Linking.addEventListener("url", onReceiveURL);

    return () => subscription.remove();
  },
};
