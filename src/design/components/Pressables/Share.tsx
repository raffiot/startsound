import { Pressable, Icon, IPressableProps } from "native-base";
import { Entypo } from "@expo/vector-icons";

export type ShareProps = {
  onPress?: () => void;
} & IPressableProps;
export const Share = ({ onPress, ...props }: ShareProps) => {
  return (
    <Pressable
      p={1}
      onPress={onPress}
      disabled={!onPress}
      borderWidth={2}
      borderColor="aqua"
      rounded="full"
      {...props}
    >
      <Icon as={Entypo} name="arrow-bold-right" color="aqua" size="2xl" />
    </Pressable>
  );
};
