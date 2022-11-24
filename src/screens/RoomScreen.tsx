import React, { useCallback } from "react";
import {
  Box,
  Heading,
  Center,
  Flex,
  Pressable,
  Text,
  FlatList,
} from "native-base";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigators/types";
import { AdditionalContent } from "@/components/Buttons/AdditionalContent";

type Props = NativeStackScreenProps<RootStackParamList, "Room">;
export const RoomScreen = ({ navigation, route }: Props) => {
  const { name, isFavorite } = route.params.item;
  const percentage = Math.floor(Math.random() * 50) + 50;
  const colorShade = Math.floor(percentage / 10) * 100;
  const attributes = [
    "🔥 You share great positivity",
    "🕺 You are both higly energize",
    "🙉 You have both a strong introspection",
  ];

  const goBack = useCallback(() => {
    return navigation.goBack();
  }, [navigation]);

  return (
    <Box my="8" px="4">
      <Box flexDir="row" alignItems="center" justifyContent="space-between">
        <Pressable onPress={goBack}>
          <Text fontFamily="heading" fontSize="2xl">
            {"<-"}
          </Text>
        </Pressable>
        <Heading lineHeight={64} fontFamily="heading" size="2xl">
          {`With ${name}`}
        </Heading>
        {/* Second arrow transparent to have the text at middle */}
        <Flex>
          <Text fontFamily="heading" fontSize="2xl" color="transparent">
            {"<-"}
          </Text>
        </Flex>
      </Box>

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
          >{`${percentage}%`}</Text>
        </Box>
      </Center>

      {/* Attributes */}
      <Flex pt="12">
        <FlatList
          data={attributes}
          renderItem={({ item }: { item: string }) => {
            return (
              <Text fontSize="2xl" p="2">
                {item}
              </Text>
            );
          }}
          ListFooterComponent={() => {
            return (
              <Center pt="4">
                <AdditionalContent title="🔓 Unlock more attributes" />
              </Center>
            );
          }}
        />
      </Flex>
    </Box>
  );
};
