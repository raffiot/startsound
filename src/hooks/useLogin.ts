import { useContext, useEffect } from "react";
import Constants from "expo-constants";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import LOGIN_MUTATION from "@/graphql/login";
import ME_QUERY from "@/graphql/user";
import { AuthContext } from "@/context/AuthContext";
import { UserContext } from "@/context/UserContext";

const SPOTIFY_DISCOVERY = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};
const SCOPES = ["user-read-email", "user-top-read"];

export const useLogin = () => {
  const [getMeUser, { data }] = useLazyQuery(ME_QUERY);
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

  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({
      login: { access_token: accessToken, refresh_token: refreshToken },
    }) => {
      setAuth({ accessToken, refreshToken });
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
      getMeUser({
        onCompleted: ({ me }) => {
          setUser(me);
        },
      });
    }
  }, [auth]);

  return {
    login: promptAsync,
  };
};
