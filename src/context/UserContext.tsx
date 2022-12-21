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
  birthday?: Date | null;
  rooms: Room[];
};

export interface UserContextProps {
  user: UserDetails | null;
  isProfileComplete: boolean;
  setUser: (user: MeQuery["me"]) => Promise<void>;
  updateUser: (user: UserDetails) => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  isProfileComplete: false,
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
          birthday: user.birthday?.toISOString(),
          username: user.username,
        },
      },
    });
    setUserState(user);
  };

  useMeQuery({ onCompleted: (data) => setUser(data.me) });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        isProfileComplete: Boolean(user?.username) && Boolean(user?.birthday),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
