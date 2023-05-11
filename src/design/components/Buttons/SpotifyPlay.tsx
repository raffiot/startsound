import Ionicons from "@expo/vector-icons/Ionicons";
import { IPressableProps, Pressable, Image, Text, Icon } from "native-base";

type SpotifyPlayProps = {
  isPlaying: boolean;
} & IPressableProps;
export const SpotifyPlay = ({
  isPlaying,
  onPress,
  ...props
}: SpotifyPlayProps) => {
  return (
    <Pressable
      flexDir="row"
      bg="spotify.400"
      borderRadius="full"
      p="2"
      alignItems="center"
      justifyContent="center"
      opacity={80}
      onPress={onPress}
      {...props}
    >
      <Icon
        as={Ionicons}
        name={isPlaying ? "pause" : "play"}
        size="lg"
        color="gray.600"
      />
    </Pressable>
  );
};
