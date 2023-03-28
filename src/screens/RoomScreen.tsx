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
import { AdditionalContent } from "@/components/Buttons/AdditionalContent";
import { MusicPreview } from "@/components/MusicPreview/MusicPreview";
import { useRoomByIdQuery } from "@/graphql/__generated__/hooks";

type Props = NativeStackScreenProps<UserStackParamList, "Room">;
export const RoomScreen = ({ navigation, route }: Props) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [songIsPlaying, setSoundIsPlaying] = useState(false);
  const [isMusicPlayerLoading, setIsMusicPlayerLoading] = useState(true);

  const { data, loading } = useRoomByIdQuery({
    variables: { id: route.params.id },
  });
  const room = data?.roomById ?? null;

  const colorShade = useMemo(() => {
    const value = Math.floor((room ? room.compatibility_score : 0) / 10) * 100;
    return value;
  }, [room]);

  const attributes = [
    "🔥 You share great positivity",
    "🕺 You are both higly energize",
    "🙉 You have both a strong introspection",
  ];

  const goBack = useCallback(async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && (status as AVPlaybackStatusSuccess).isPlaying) {
        await sound.unloadAsync();
      }
    }
    return navigation.goBack();
  }, [navigation, sound]);

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
        uri: "https://p.scdn.co/mp3-preview/95a5bddd5c989e229caf575ef420cc45a0f2fc21?cid=774b29d4f13844c495f206cafdad9c86",
      });
      setSound(sound);
      setIsMusicPlayerLoading(false);
    };
    loadAudio();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  if (loading || !room) {
    return <Spinner />;
  }

  return (
    <Box my="8" px="4" safeArea>
      <Box flexDir="row" alignItems="center" justifyContent="space-between">
        <Pressable onPress={goBack}>
          <Text fontFamily="heading" fontSize="2xl">
            {"<-"}
          </Text>
        </Pressable>
        <Heading lineHeight={64} fontFamily="heading" size="2xl">
          {`With ${room.user.username}`}
        </Heading>
        {/* Second arrow transparent to have the text at middle */}
        <Flex>
          <Text fontFamily="heading" fontSize="2xl" color="transparent">
            {"<-"}
          </Text>
        </Flex>
      </Box>
      <ScrollView mb={8}>
        {/* Compatibility */}
        <Center pt="12">
          <Box
            rounded="full"
            borderWidth="6"
            borderColor={`rose.${colorShade}`}
            p="8"
          >
            <Text
              fontFamily="heading"
              fontSize="4xl"
              color={`rose.${colorShade}`}
            >{`${room.compatibility_score}%`}</Text>
          </Box>
        </Center>

        {/* Attributes */}
        <Flex pt="8">
          <Heading fontFamily="heading" fontSize="2xl" lineHeight={64}>
            Your Compatibility:
          </Heading>
          {attributes.map((item, i) => (
            <Text fontSize="2xl" p="2" key={`attribute-${i}`}>
              {item}
            </Text>
          ))}
          <Center pt="4">
            <AdditionalContent title="🔓 Unlock more attributes" />
          </Center>
        </Flex>

        {/* Song */}
        <Flex pt="12">
          <Heading fontFamily="heading" fontSize="2xl" lineHeight={32}>
            Your astro song:
          </Heading>
          <Center mt="4">
            {isMusicPlayerLoading ? (
              <Spinner size="lg" />
            ) : (
              <MusicPreview
                artist="Alicia Keys"
                title="If I Ain't Got You"
                onPress={playSound}
                isPlaying={songIsPlaying}
              />
            )}
          </Center>
        </Flex>
      </ScrollView>
    </Box>
  );
};
