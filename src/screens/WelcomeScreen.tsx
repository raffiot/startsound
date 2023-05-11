import React, { useCallback, useContext, useState } from "react";
import { Box, Heading, Center, Spinner, Image } from "native-base";
import { SpotifyLogin } from "@/components/Buttons/SpotifyLogin";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/types";
import { useLogin } from "@/hooks/useLogin";
import { useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { SafeAreaLayout } from "@/components/Layouts/SafeAreaLayout";
import { Alert } from "react-native";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;
export const WelcomeScreen = ({ navigation }: Props) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { login } = useLogin();

  const connectSpotify = useCallback(async () => {
    setLoading(true);
    try {
      await login();
    } catch (error) {
      Alert.alert(`Failed to connect to spotify: ${error}`);
    }
    setLoading(false);
  }, [login]);

  useEffect(() => {
    if (user) {
      return navigation.navigate("Username");
    }
  }, [user]);

  return (
    <SafeAreaLayout>
      <Box flex="1" my="12" p="4" display="flex" justifyContent="space-between">
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
          <Center mt="32">
            <SpotifyLogin title="LOG IN" onPress={connectSpotify} />
          </Center>
        )}
      </Box>
    </SafeAreaLayout>
  );
};
