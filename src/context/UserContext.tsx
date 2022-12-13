import { createContext, useState } from "react";
import { useUpdateUserMutation } from "@/graphql/__generated__/hooks";

type UserDetails = {
  id: string;
  username?: string | null;
  birthplace?: string | null;
  birthday?: Date | null;
};

export interface UserContextProps {
  user: UserDetails | null;
  isProfileComplete: boolean;
  setUser: (user: UserDetails) => Promise<void>;
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

  const setUser = async (user: UserDetails) => {
    setUserState(user);
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
