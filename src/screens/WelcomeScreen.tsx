import React, { useCallback } from "react";
import { Box, Heading, Center } from "native-base";
import { SpotifyLogin } from "@/components/Buttons/SpotifyLogin";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigators/types";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;
export const WelcomeScreen = ({ navigation }: Props) => {
  const connectSpotify = useCallback(() => {
    return navigation.navigate("Username");
  }, []);

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
