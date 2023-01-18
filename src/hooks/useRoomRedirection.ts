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
        console.log("ERROR: Room was not created");
      }
    },
  });

  const roomRedirection = (queryParams: { user_id: string } | null) => {
    useRoomByUserIdQuery({
      variables: { user_id: queryParams?.user_id },
      skip: !queryParams?.user_id,
      onError: (error) => {
        console.log(error, " error");
      },
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
