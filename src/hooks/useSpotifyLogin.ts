import { useEffect } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import Constants from "expo-constants";
import { httpsCallable } from "firebase/functions";

import { functions } from "@/config/firebase";

const SPOTIFY_DISCOVERY = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const SCOPES = ["user-read-email", "user-top-read"];

export function useSpotifyLogin() {
  const token = httpsCallable(functions, "token");
  const uri = makeRedirectUri({});
  const [_, response, promptAsync] = useAuthRequest(
    {
      clientId: Constants.manifest?.extra?.spotifyClientId,
      scopes: SCOPES,
      usePKCE: false,
      redirectUri: uri,
    },
    SPOTIFY_DISCOVERY,
  );

  useEffect(() => {
    if (response?.type === "success") {
      token({ redirectUri: uri, code: response.params.code })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          // TODO: Error handling to change
          const { code, message, details } = error;
          console.error(`Spotify Login: ${code},${message}, ${details}`);
        });
    }
  }, [response]);

  return {
    spotifyLogin: promptAsync,
  };
}
