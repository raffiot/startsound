import { IPressableProps, Pressable, Image, Text } from "native-base";

export type SocialLoginProps = {
  title: string;
} & IPressableProps;
export const SpotifyLogin = ({
  onPress,
  title,
  ...props
}: SocialLoginProps) => {
  return (
    <Pressable
      flexDir="row"
      bg="spotify.400"
      alignItems="center"
      p="4"
      borderRadius="full"
      onPress={onPress}
      {...props}
    >
      <Image
        source={require("../../../../assets/button-icons/spotify.png")}
        alt="spotify_logo"
        size="xs"
      />
      <Text ml="4" fontSize="2xl">
        {title}
      </Text>
    </Pressable>
  );
};
