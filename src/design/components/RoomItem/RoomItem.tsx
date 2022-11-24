import {
  FavouriteIcon,
  Pressable,
  Text,
  Flex,
  ArrowForwardIcon,
  IFlexProps,
} from "native-base";

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
      bg="white"
      px="4"
      py="2"
      rounded="2xl"
      borderColor="gray.400"
      borderWidth="2"
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <Flex pl="2" flexDir="row">
        <Pressable
          onPress={onPressFavorite}
          rounded="full"
          borderColor="gray.400"
          borderWidth="1"
          justifyContent="center"
          alignItems="center"
          p="4"
        >
          <FavouriteIcon color={isFavorite ? "red.400" : "gray.400"} />
        </Pressable>
        <Pressable onPress={onPressTitle} pl="8" py="2">
          <Text color="black" fontSize="2xl">
            {title}
          </Text>
        </Pressable>
      </Flex>
      <Pressable onPress={onPressShare}>
        <ArrowForwardIcon />
      </Pressable>
    </Flex>
  );
};
