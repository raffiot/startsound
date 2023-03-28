import { Pressable, FavouriteIcon, IPressableProps, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

export type FavoriteProps = {
  isFavorite: boolean;
  onPress?: () => void;
} & IPressableProps;
export const Favorite = ({ isFavorite, onPress, ...props }: FavoriteProps) => {
  return (
    <Pressable
      p={1}
      onPress={onPress}
      borderWidth={2}
      borderColor="aqua"
      backgroundColor="aqua"
      rounded="full"
      {...props}
    >
      <Icon
        as={Entypo}
        name="heart"
        color={isFavorite ? "love" : "lightgray"}
        size="2xl"
      />
    </Pressable>
  );
};
