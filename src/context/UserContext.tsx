import { createContext, useEffect, useState } from "react";
import {
  useMeQuery,
  useUpdateUserMutation,
} from "@/graphql/__generated__/hooks";
import { MeQuery } from "@/graphql/__generated__/operations";

export type Room = {
  id: string;
  isFavorite: boolean;
  user: {
    id: string;
    username: string;
  };
};

export type UserDetails = {
  id: string;
  username?: string | null;
  birthplace?: string | null;
  birthplace_pos_lat?: number | null;
  birthplace_pos_lon?: number | null;
  birthday?: Date | null;
  rooms: Room[];
};

export type Birthplace = Pick<
  UserDetails,
  "birthplace" | "birthplace_pos_lat" | "birthplace_pos_lon"
>;

export interface UserContextProps {
  user: UserDetails | null;
  isProfileComplete: boolean;
  isLoading: boolean;
  setUser: (user: MeQuery["me"]) => Promise<void>;
  updateUser: (user: UserDetails) => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  isProfileComplete: false,
  isLoading: true,
  setUser: async () => {},
  updateUser: async () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<UserDetails | null>(null);
  const [updateUserMutation] = useUpdateUserMutation();

  const setUser = async (user: MeQuery["me"]) => {
    if (!user) return;
    setUserState({
      ...user,
      rooms: (user.rooms ?? []).map((room) => ({
        ...room,
        isFavorite: room.is_favorite,
        user: {
          ...room.user,
          username: room.user.username || "unknown",
        },
      })),
    });
  };

  const updateUser = async (user: UserDetails) => {
    await updateUserMutation({
      variables: {
        id: user.id,
        input: {
          birthplace: user.birthplace,
          birthplace_pos_lat: user.birthplace_pos_lat,
          birthplace_pos_lon: user.birthplace_pos_lon,
          birthday: user.birthday?.toISOString(),
          username: user.username,
        },
      },
    });
    setUserState(user);
  };

  const { loading: isLoading } = useMeQuery({
    onCompleted: (data) => setUser(data.me),
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        isLoading,
        isProfileComplete: Boolean(user?.username) && Boolean(user?.birthday),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
