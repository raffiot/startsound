import { useContext, useEffect } from "react";
import Constants from "expo-constants";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { AuthContext } from "@/context/AuthContext";
import { UserContext } from "@/context/UserContext";
import {
  useLoginMutation,
  useMeLazyQuery,
} from "@/graphql/__generated__/hooks";

const SPOTIFY_DISCOVERY = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};
const SCOPES = ["user-read-email", "user-top-read"];

export const useLogin = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const redirectUri = makeRedirectUri({});
  const [_, response, promptAsync] = useAuthRequest(
    {
      clientId: Constants.manifest?.extra?.spotifyClientId,
      scopes: SCOPES,
      usePKCE: false,
      redirectUri: redirectUri,
    },
    SPOTIFY_DISCOVERY,
  );

  const [loginMutation] = useLoginMutation({
    onCompleted: (data) => {
      if (data.login?.access_token && data.login?.refresh_token) {
        setAuth({
          accessToken: data.login?.access_token,
          refreshToken: data.login?.refresh_token,
        });
      } else {
        console.log("ERROR: Loggin didnt worked");
      }
    },
  });

  const [meQuery] = useMeLazyQuery({
    onCompleted: (data) => {
      if (data.me) {
        setUser(data.me);
      }
    },
  });

  useEffect(() => {
    if (response?.type === "success") {
      try {
        loginMutation({ variables: { input: { code: response.params.code } } });
      } catch (error) {
        console.log(error);
      }
    }
  }, [response]);

  useEffect(() => {
    if (auth?.accessToken) {
      meQuery();
    }
  }, [auth]);

  return {
    login: promptAsync,
  };
};
