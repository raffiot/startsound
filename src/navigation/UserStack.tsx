import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "@/screens/HomeScreen";
import { RoomScreen } from "@/screens/RoomScreen";
import { UserStackParamList } from "./types";
import Theme from "./theme";

export const UserStack = () => {
  const Stack = createNativeStackNavigator<UserStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Room" component={RoomScreen} />
    </Stack.Navigator>
  );
};
