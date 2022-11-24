import { Box } from "native-base";
import { storiesOf } from "@storybook/react-native";
import { RoomItem } from "@/components/RoomItem/RoomItem";

storiesOf("Room", module).add("RoomItem", () => (
  <>
    <RoomItem
      title="With Agate"
      onPressFavorite={() => {}}
      onPressShare={() => {}}
      onPressTitle={() => {}}
      w="80%"
    />
    <RoomItem
      title="With Agate"
      isFavorite
      onPressFavorite={() => {}}
      onPressShare={() => {}}
      onPressTitle={() => {}}
      mt="16"
      w="80%"
    />
  </>
));
