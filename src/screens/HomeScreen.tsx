import React, { memo, useState, useCallback, useContext } from "react";
import { Share } from "react-native";
import uniqBy from "lodash.uniqby";
import * as Linking from "expo-linking";
import {
  Box,
  Heading,
  Center,
  Pressable,
  Text,
  Flex,
  FlatList,
  Spinner,
} from "native-base";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserStackParamList } from "@/navigation/types";
import { RoomItem } from "@/components/RoomItem/RoomItem";
import { UserContext } from "@/context/UserContext";
import {
  RoomCreatedDocument,
  useMeQuery,
  useRoomFavoriteUpdateMutation,
} from "@/graphql/__generated__/hooks";
import {
  MeQuery,
  RoomCreatedSubscription,
} from "@/graphql/__generated__/operations";
import { useRoomRedirection } from "@/hooks/useRoomRedirection";
import { Share as SharePressable } from "@/components/Pressables/Share";
import { FreemiumLayout } from "@/components/Layouts/FreemiumLayout";

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

  const { data, loading, subscribeToMore } = useMeQuery({
    fetchPolicy: "network-only",
  });

  subscribeToMore<RoomCreatedSubscription>({
    document: RoomCreatedDocument,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      return Object.assign({}, prev, {
        me: {
          ...prev.me,
          rooms: uniqBy(
            [
              subscriptionData.data.roomCreated,
              ...(prev.me?.rooms ? prev.me?.rooms : []),
            ],
            "id",
          ),
        },
      });
    },
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

  const navigateCheckout = useCallback(() => {
    return navigation.navigate("Checkout");
  }, [navigation]);

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
    <FreemiumLayout title="UNLOCK MORE CONTENT" onPress={navigateCheckout}>
      <Box my="12" width="90%" flex="1" mx="auto">
        <Center>
          <Heading size="xl" textAlign="center">
            WELCOME!
          </Heading>
          <Heading fontFamily="heading" size="xl" textAlign="center">
            {user?.username || ""}
          </Heading>
        </Center>
        <Box flex="1" my="auto" mt="8">
          <Heading size="xl" textAlign="center">
            INVITE ASTROFRIENDS
          </Heading>
          <Pressable
            backgroundColor="lightRose"
            rounded="2xl"
            borderWidth={0}
            px="4"
            py="6"
            mt="4"
            onPress={onShareLink}
          >
            <Flex
              flexDir="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Text color="lightGray" fontSize="xl" isTruncated>
                  Share my profile
                </Text>
              </Box>
              <SharePressable />
            </Flex>
          </Pressable>
          {!loading && data?.me?.rooms?.length === 0 ? null : (
            <Box p="2" mt="8">
              <Heading fontFamily="heading" size="xl" textAlign="center">
                MY ROOMS HISTORY
              </Heading>
              {!loading ? (
                <FlatList
                  height="100%"
                  mt="4"
                  bg="lightRose"
                  borderRadius={32}
                  contentContainerStyle={{ paddingBottom: 128 }}
                  data={data?.me?.rooms}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <MemoListRoomItem
                        item={item}
                        onPressTitle={navigateRoom}
                        onPressFavorite={onPressFavorite}
                      />
                    );
                  }}
                />
              ) : (
                <Center mt="8">
                  <Spinner />
                </Center>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </FreemiumLayout>
  );
};
