import React, { useCallback, useContext, useState } from "react";
import { Box, Heading, Center, Spinner } from "native-base";
import { SpotifyLogin } from "@/components/Buttons/SpotifyLogin";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/types";
import { useLogin } from "@/hooks/useLogin";
import { useEffect } from "react";
import { UserContext } from "@/context/UserContext";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;
export const WelcomeScreen = ({ navigation }: Props) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { login } = useLogin();

  const connectSpotify = useCallback(async () => {
    setLoading(true);
    await login();
    setLoading(false);
  }, [login]);

  useEffect(() => {
    if (user) {
      return navigation.navigate("Username");
    }
  }, [user]);

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
      {loading ? (
        <Spinner />
      ) : (
        <Center>
          <SpotifyLogin title="Connect with Spotify" onPress={connectSpotify} />
        </Center>
      )}
    </Box>
  );
};
