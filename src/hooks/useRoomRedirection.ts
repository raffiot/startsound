import {
  useRoomByUserIdQuery,
  useRoomCreateMutation,
} from "@/graphql/__generated__/hooks";

export const useRoomRedirection = (navigation: any) => {
  const [roomMutation] = useRoomCreateMutation({
    onCompleted: (data) => {
      if (data.roomCreate?.id) {
        return navigation.navigate("Room", { id: data.roomCreate.id });
      } else {
        throw new Error("Fail to create the room");
      }
    },
  });

  const roomRedirection = (queryParams: { user_id: string } | null) => {
    useRoomByUserIdQuery({
      variables: { user_id: queryParams?.user_id },
      skip: !queryParams?.user_id,
      onCompleted: (data) => {
        if (data.roomByUserId?.id) {
          return navigation.navigate("Room", { id: data.roomByUserId.id });
        } else {
          roomMutation({
            variables: {
              user_id: queryParams?.user_id,
            },
          });
        }
      },
    });
  };

  return { roomRedirection };
};
