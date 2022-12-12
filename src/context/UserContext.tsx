import { createContext, useState } from "react";

type UserDetails = {
  id: string;
  username?: string | null;
  birthplace?: string | null;
  bitrhday?: Date | null;
};

export interface UserContextProps {
  user: UserDetails | null;
  isProfileComplete: boolean;
  setUser: (user: UserDetails) => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  isProfileComplete: false,
  setUser: async () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<UserDetails | null>(null);

  const setUser = (user: UserDetails) => {
    setUserState(user);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isProfileComplete: Boolean(user?.username) && Boolean(user?.bitrhday),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
