import { Pressable, Text, Flex, IFlexProps } from "native-base";
import { Share } from "../Pressables/Share";
import { Favorite } from "../Pressables/Favorite";

export type SubmitProps = {
  title: string;
  isFavorite?: boolean;
  onPressTitle: () => void;
  onPressFavorite: () => void;
  onPressShare: () => void;
} & IFlexProps;
export const RoomItem = ({
  title,
  isFavorite = false,
  onPressFavorite,
  onPressTitle,
  onPressShare,
  ...props
}: SubmitProps) => {
  return (
    <Flex
      width="80%"
      mx="auto"
      flexDir="row"
      alignItems="center"
      pt="2"
      {...props}
    >
      <Favorite isFavorite={isFavorite} onPress={onPressFavorite} />
      <Pressable
        onPress={onPressTitle}
        px="4"
        flexDir="row"
        flex={1}
        flexWrap="wrap"
      >
        <Text fontWeight={700} color="#4C494F" fontSize="2xl">
          {title}
        </Text>
      </Pressable>
      <Share onPress={onPressShare} ml="auto" />
    </Flex>
  );
};
