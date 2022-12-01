import React, { useCallback, useEffect } from "react";
import { Box, Heading, Center } from "native-base";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import Constants from "expo-constants";
import { SpotifyLogin } from "@/components/Buttons/SpotifyLogin";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/types";
import { useSpotifyLogin } from "@/hooks/useSpotifyLogin";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;
export const WelcomeScreen = ({ navigation }: Props) => {
  const { spotifyLogin } = useSpotifyLogin();

  const connectSpotify = useCallback(async () => {
    await spotifyLogin();
    return navigation.navigate("Username");
  }, [spotifyLogin, navigation]);

  return (
    <Box flex="1" my="16" px="4" display="flex" justifyContent="space-between">
      <Center>
        <Heading lineHeight={64} fontFamily="heading" size="2xl">
          ✨ StarSound ✨
        </Heading>
      </Center>
      <Center>
        <Heading
          lineHeight={64}
          fontFamily="heading"
          size="2xl"
          opacity={80}
          textAlign="center"
        >
          Music & Astro compatibility
        </Heading>
      </Center>
      <Center>
        <SpotifyLogin title="Connect with Spotify" onPress={connectSpotify} />
      </Center>
    </Box>
  );
};
