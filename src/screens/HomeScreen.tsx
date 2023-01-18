import React, { memo, useState, useCallback, useContext } from "react";
import { Share } from "react-native";
import * as Linking from "expo-linking";
import {
  Box,
  Heading,
  Center,
  Pressable,
  Text,
  ArrowForwardIcon,
  Flex,
  FlatList,
  Spinner,
} from "native-base";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserStackParamList } from "@/navigation/types";
import { RoomItem } from "@/components/RoomItem/RoomItem";
import { UserContext } from "@/context/UserContext";
import {
  useMeQuery,
  useRoomFavoriteUpdateMutation,
} from "@/graphql/__generated__/hooks";
import { MeQuery } from "@/graphql/__generated__/operations";
import { useRoomRedirection } from "@/hooks/useRoomRedirection";

type Room = NonNullable<NonNullable<MeQuery["me"]>["rooms"]>[number];

const ListRoomItem = ({
  item,
  onPressTitle,
  onPressFavorite: onPressFavoriteProps,
}: {
  item: Room;
  onPressTitle: (id: string) => void;
  onPressFavorite: (id: string, isFavorite: boolean) => Promise<void>;
}) => {
  const [isFavorite, setIsFavorite] = useState(item.is_favorite);
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
    return onPressTitle(item.id);
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
  // Deeplink for room redirection/creation
  const url = Linking.useURL();
  const { roomRedirection } = useRoomRedirection(navigation);
  const { queryParams } = (
    url ? Linking.parse(url) : { queryParams: null }
  ) as { queryParams: { user_id: string } | null };
  roomRedirection(queryParams);

  const { user } = useContext(UserContext);
  const redirectUri = Linking.createURL("main/home", {
    queryParams: { user_id: user?.id },
  });
  const { data, loading } = useMeQuery({
    fetchPolicy: "network-only",
  });

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
    (id: string) => {
      return navigation.navigate("Room", { id });
    },
    [navigation],
  );

  const onShareLink = useCallback(async () => {
    try {
      await Share.share({
        message: redirectUri,
      });
    } catch (error: any) {
      alert(error.message);
    }
  }, [redirectUri]);

  return (
    <Box my="8" flex="1">
      <Center>
        <Heading lineHeight={64} fontFamily="heading" size="xl">
          {`✨ Welcome ${user?.username || ""} ✨`}
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
                    {redirectUri}
                  </Text>
                </Box>
                <ArrowForwardIcon ml="2" />
              </Flex>
            </Pressable>
          </Center>
        </Box>
        <Box p="2" mt="8">
          <Text fontSize="3xl">My rooms history</Text>
          {!loading ? (
            <FlatList
              contentContainerStyle={{ paddingBottom: 128 }}
              mb={8}
              data={data?.me?.rooms}
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
          ) : (
            <Center>
              <Spinner />
            </Center>
          )}
        </Box>
      </Box>
    </Box>
  );
};
