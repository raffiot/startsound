import React, { useState, useEffect } from "react";
import { Box, Heading, Center, Progress, Text } from "native-base";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigators/types";

type Props = NativeStackScreenProps<RootStackParamList, "Loading">;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const LoadingScreen = ({ navigation }: Props) => {
  const [loadingValue, setLoadingValue] = useState(0);
  const fakeLoading = async () => {
    await sleep(2000);
    setLoadingValue(27);
    await sleep(1000);
    setLoadingValue(62);
    await sleep(2000);
    setLoadingValue(100);
    navigation.navigate("Home");
  };

  useEffect(() => {
    fakeLoading();
  }, []);

  return (
    <Box my="8" flex="1">
      <Center>
        <Heading lineHeight={64} fontFamily="heading" size="2xl">
          ✨ StarSound ✨
        </Heading>
      </Center>
      <Box flex="1" my="auto">
        <Center my="auto">
          <Text fontSize="2xl">Loading your star profile...</Text>
          <Box w="90%">
            <Progress size="2xl" value={loadingValue} />
          </Box>
        </Center>
      </Box>
    </Box>
  );
};
