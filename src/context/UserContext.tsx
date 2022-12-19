import { createContext, useState } from "react";
import { useUpdateUserMutation } from "@/graphql/__generated__/hooks";
import { User } from "@/graphql/__generated__/schemas";

export type Room = {
  id: string;
  compatibilityScore: number;
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
  setUser: (user: User) => Promise<void>;
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

  const setUser = async (user: User) => {
    setUserState({
      ...user,
      rooms: (user.rooms ?? []).map((room) => ({
        ...room,
        compatibilityScore: room.compatibility_score,
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
