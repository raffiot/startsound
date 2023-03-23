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
      display="flex"
      flexDir="row"
      justifyContent="center"
      py={2}
      px={8}
      alignItems="center"
      borderWidth={2}
      borderRadius="3xl"
      onPress={onPress}
      width="80%"
      {...props}
    >
      <Image
        source={require("../../../../assets/button-icons/Spotify_Icon_CMYK_Black.png")}
        alt="spotify_logo"
        size="xs"
      />
      <Text ml="4" fontSize="2xl" fontWeight="medium">
        {title}
      </Text>
    </Pressable>
  );
};

/*
    <Pressable
      px="4"
      borderRadius="full"
      borderWidth="1"
      onPress={onPress}
      {...props}
    >
      <Image
        source={require("../../../../assets/button-icons/Spotify_Logo_RGB_White.png")}
        alt="spotify_logo"
        size="xl"
        resizeMode="contain"
      />
    </Pressable>
*/
