import React, { useCallback } from "react";
import { Box, Heading, Pressable, Center, Image, Text } from "native-base";
import { SpotifyLogin } from "../design/components/Buttons/SpotifyLogin";

export const WelcomeScreen = () => {
  const connectSpotify = useCallback(() => {}, []);

  return (
    <Box flex="1" my="16" display="flex" justifyContent="space-between">
      <Center>
        <Heading lineHeight={64} fontFamily="heading" size="2xl">
          ✨ StarSound ✨
        </Heading>
      </Center>
      <Center>
        <SpotifyLogin title="Connect with Spotify" onPress={connectSpotify} />
      </Center>
    </Box>
  );
};
