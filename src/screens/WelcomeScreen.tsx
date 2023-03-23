import React, { useCallback, useContext, useState } from "react";
import { Box, Heading, Center, Spinner, Image } from "native-base";
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
        <Image
          source={require("../../assets/logo.png")}
          size="2xl"
          alt="Logo"
          resizeMode="contain"
        />
      </Center>
      <Center>
        <Heading fontFamily="heading" size="xl">
          MUSIC & ASTRO COMPATIBILITY
        </Heading>
      </Center>
      {loading ? (
        <Spinner />
      ) : (
        <Center>
          <SpotifyLogin title="LOG IN" onPress={connectSpotify} />
        </Center>
      )}
    </Box>
  );
};
