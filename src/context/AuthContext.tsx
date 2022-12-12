import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TokenDetails = {
  accessToken: string;
  refreshToken: string;
};

export interface AuthContextProps {
  auth: TokenDetails | null;
  setAuth: (auth: TokenDetails | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  auth: null,
  setAuth: async () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuthState] = useState<TokenDetails | null>(null);

  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem("auth");
      const authData: TokenDetails | null =
        authDataString !== null
          ? JSON.parse(authDataString, (key, value) => {
              switch (key) {
                case "access_token":
                case "refresh_token":
                  return String(value);
                default:
                  return value;
              }
            })
          : authDataString;
      // Configure axios headers
      if (authData !== null) {
        setAuthState(authData);
      } else {
        setAuthState(null);
      }
    } catch (err) {
      console.log("Caught Auth Exception", err);
      setAuthState(null);
    }
  };
  // Update AsyncStorage & context state
  const setAuth = async (auth: TokenDetails | null) => {
    if (auth === null) {
      await AsyncStorage.removeItem("auth");
      setAuthState(auth);
    } else {
      try {
        await AsyncStorage.setItem("auth", JSON.stringify(auth));
        setAuthState(auth);
      } catch (error) {
        console.log("Caught Auth Exception", error);
      }
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
