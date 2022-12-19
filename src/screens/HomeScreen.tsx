import React, { memo, useMemo, useState, useCallback, useContext } from "react";
import { Share } from "react-native";
import {
  Box,
  Heading,
  Center,
  Pressable,
  Text,
  ArrowForwardIcon,
  Flex,
  FlatList,
} from "native-base";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserStackParamList } from "@/navigation/types";
import { RoomItem } from "@/components/RoomItem/RoomItem";
import { UserContext, UserDetails } from "@/context/UserContext";
import { useRoomFavoriteUpdateMutation } from "@/graphql/__generated__/hooks";

type Room = UserDetails["rooms"][0];

const ListRoomItem = ({
  item,
  onPressTitle,
  onPressFavorite: onPressFavoriteProps,
}: {
  item: UserDetails["rooms"][0];
  onPressTitle: (item: Room) => void;
  onPressFavorite: (id: string, isFavorite: boolean) => Promise<void>;
}) => {
  const [isFavorite, setIsFavorite] = useState(item.isFavorite);
  const onPressFavorite = useCallback(async () => {
    await onPressFavoriteProps(item.id, !isFavorite);
    setIsFavorite(!isFavorite);
  }, [isFavorite]);

  const onShare = useCallback(async () => {
    try {
      await Share.share({
        message: `Share my match photo with ${item.user.username}`,
      });
    } catch (error: any) {
      alert(error.message);
    }
  }, [item.user.username]);

  const onPressTitleCb = useCallback(() => {
    return onPressTitle(item);
  }, [item]);

  return (
    <RoomItem
      title={`With ${item.user.username}`}
      isFavorite={isFavorite}
      onPressTitle={onPressTitleCb}
      onPressFavorite={onPressFavorite}
      onPressShare={onShare}
      mt="4"
      w="90%"
    />
  );
};

const MemoListRoomItem = memo(ListRoomItem);

type Props = NativeStackScreenProps<UserStackParamList, "Home">;
export const HomeScreen = ({ navigation }: Props) => {
  const { user } = useContext(UserContext);
  const name = user?.username;
  const rooms = user?.rooms ?? [];
  const link = "https://www.soundstar.com/invite/alexandre";

  const [favoriteMutation] = useRoomFavoriteUpdateMutation();

  const onPressFavorite = useCallback(
    async (id: string, isFavorite: boolean) => {
      await favoriteMutation({
        variables: { id, input: { is_favorite: isFavorite } },
      });
    },
    [favoriteMutation],
  );

  const navigateRoom = useCallback(
    (item: Room) => {
      return navigation.navigate("Room", { item });
    },
    [navigation],
  );

  const onShareLink = useCallback(async () => {
    try {
      await Share.share({
        message: link,
      });
    } catch (error: any) {
      alert(error.message);
    }
  }, [link]);

  return (
    <Box my="8" flex="1">
      <Center>
        <Heading lineHeight={64} fontFamily="heading" size="xl">
          {`✨ Welcome ${name} ✨`}
        </Heading>
      </Center>
      <Box flex="1" my="auto" mt="8">
        <Box p="2">
          <Text fontSize="3xl">Invite AstroFriends </Text>
          <Center>
            <Pressable
              bg="white"
              w="70%"
              p="2"
              rounded="lg"
              mt="4"
              onPress={onShareLink}
            >
              <Flex flexDir="row" alignItems="center">
                <Box width="90%">
                  <Text color="gray.400" fontSize="2xl" isTruncated>
                    {link}
                  </Text>
                </Box>
                <ArrowForwardIcon ml="2" />
              </Flex>
            </Pressable>
          </Center>
        </Box>
        <Box p="2" mt="8">
          <Text fontSize="3xl">My rooms history</Text>
          <FlatList
            contentContainerStyle={{ paddingBottom: 128 }}
            mb={8}
            data={rooms}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <Center>
                  <MemoListRoomItem
                    item={item}
                    onPressTitle={navigateRoom}
                    onPressFavorite={onPressFavorite}
                  />
                </Center>
              );
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
