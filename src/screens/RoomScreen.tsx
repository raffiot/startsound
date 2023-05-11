import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";
import {
  Box,
  Heading,
  Center,
  Flex,
  Pressable,
  Text,
  ScrollView,
  Spinner,
} from "native-base";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserStackParamList } from "src/navigation/types";
import { MusicPreview } from "@/components/MusicPreview/MusicPreview";
import { useRoomByIdQuery } from "@/graphql/__generated__/hooks";
import { FreemiumLayout } from "@/components/Layouts/FreemiumLayout";

type Props = NativeStackScreenProps<UserStackParamList, "Room">;
export const RoomScreen = ({ navigation, route }: Props) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [songIsPlaying, setSoundIsPlaying] = useState(false);
  const [isMusicPlayerLoading, setIsMusicPlayerLoading] = useState(true);

  const { data, loading } = useRoomByIdQuery({
    variables: { id: route.params.id },
  });
  const room = data?.roomById ?? null;

  // const goBack = useCallback(async () => {
  //   if (sound) {
  //     const status = await sound.getStatusAsync();
  //     if (status.isLoaded && (status as AVPlaybackStatusSuccess).isPlaying) {
  //       await sound.unloadAsync();
  //     }
  //   }
  //   return navigation.goBack();
  // }, [navigation, sound]);

  const playSound = useCallback(async () => {
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (status.isLoaded && (status as AVPlaybackStatusSuccess).isPlaying) {
      setSoundIsPlaying(false);
      await sound.pauseAsync();
    } else {
      setSoundIsPlaying(true);
      await sound.playAsync();
    }
  }, [sound]);

  useEffect(() => {
    const loadAudio = async () => {
      const { sound } = await Audio.Sound.createAsync({
        uri: room?.songs?.[0]?.preview_url || "",
      });
      setSound(sound);
      setIsMusicPlayerLoading(false);
    };
    if (room?.songs?.[0]?.preview_url) {
      loadAudio();
    }
  }, [room?.songs]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const navigateCheckout = useCallback(() => {
    return navigation.navigate("Checkout");
  }, [navigation]);

  if (loading || !room) {
    return <Spinner />;
  }

  const song = room.songs?.[0];

  return (
    <FreemiumLayout title="UNLOCK MORE CONTENT" onPress={navigateCheckout}>
      <Box px="4" my={8}>
        <Flex alignItems="center">
          <Heading size="lg" textAlign="center">
            YOUR COMPATIBILITY
          </Heading>
          <Heading fontFamily="heading" size="2xl" textAlign="center">
            {`WITH ${room.user.username?.toLocaleUpperCase()}`}
          </Heading>
        </Flex>
        <ScrollView mb="10%">
          {/* Compatibility */}
          <Center pt="8">
            <Heading
              size="2xl"
              color="aqua"
              fontWeight={700}
            >{`${room.compatibility_score}%`}</Heading>
          </Center>

          {/* Attributes */}
          <Flex pt="2" mx="auto">
            {(room.features || []).map((item, i) => (
              <Text
                fontWeight={400}
                fontSize="md"
                py="4"
                key={`attribute-${i}`}
                textAlign="center"
              >
                {item}
              </Text>
            ))}
          </Flex>

          {/* Song */}
          <Center pt="4">
            {isMusicPlayerLoading ? (
              <Spinner size="lg" />
            ) : (
              <MusicPreview
                image={song?.picture_url || ""}
                artist={song?.artist || ""}
                title={song?.name || "Song ?"}
                onPress={playSound}
                isPlaying={songIsPlaying}
              />
            )}
          </Center>
          {/* <Flex pt="8" alignItems="center">
            <Heading fontSize="2xl" textAlign="center">
              YOUR ASTROSONG
            </Heading>
            <Center mt="8">
              {isMusicPlayerLoading ? (
                <Spinner size="lg" />
              ) : (
                <MusicPreview
                  image={song?.picture_url || ""}
                  artist={song?.artist || ""}
                  title={song?.name || "Song ?"}
                  onPress={playSound}
                  isPlaying={songIsPlaying}
                />
              )}
            </Center>
          </Flex> */}
        </ScrollView>
      </Box>
    </FreemiumLayout>
  );
};
