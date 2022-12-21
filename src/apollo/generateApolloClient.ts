import Constants from "expo-constants";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  fromPromise,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isRefreshing = false;
let pendingRequests: any[] = [];

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const fetchRefreshToken = async (
  refreshToken: string,
): Promise<{ refreshToken: string; accessToken: string }> => {
  const response = await fetch(Constants.manifest?.extra?.graphqlApiUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      mutation RefreshToken($input: UserRefreshTokenInput){
        refreshToken(input: $input) {
          refresh_token
          access_token
        }
      }
      `,
      variables: {
        input: {
          refresh_token: refreshToken,
        },
      },
    }),
  });
  const responseData = await response.json();
  const {
    data: {
      refreshToken: {
        refresh_token: newRefreshToken,
        access_token: accessToken,
      },
    },
  } = responseData;
  return { refreshToken: newRefreshToken, accessToken };
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            let forward$;

            if (!isRefreshing) {
              isRefreshing = true;
              fromPromise(
                AsyncStorage.getItem("auth")
                  .then((authString) => {
                    const authData = JSON.parse(authString ?? "{}") as {
                      refreshToken: string;
                    };
                    return fetchRefreshToken(authData.refreshToken);
                  })
                  .then((data) => {
                    return AsyncStorage.setItem("auth", JSON.stringify(data));
                  })
                  .then(() => {
                    resolvePendingRequests();
                  })
                  .catch((error) => {
                    pendingRequests = [];
                    // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                    return;
                  })
                  .finally(() => {
                    isRefreshing = false;
                  }),
              );
            } else {
              forward$ = fromPromise<void>(
                new Promise((resolve) => {
                  pendingRequests.push(() => resolve());
                }),
              );
            }

            return forward$?.flatMap(() => forward(operation));
        }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      // if you would also like to retry automatically on
      // network errors, we recommend that you use
      // apollo-link-retry
    }
  },
);

const buildApolloLink = (): ApolloLink => {
  const httpLink = createHttpLink({
    uri: Constants.manifest?.extra?.graphqlApiUrl,
  });

  const authLink = setContext(async (_, { headers }) => {
    const authString = await AsyncStorage.getItem("auth");
    const authData = JSON.parse(authString ?? "{}") as {
      accessToken: string;
    };
    return {
      headers: {
        ...headers,
        authorization: authData.accessToken
          ? `Bearer ${authData.accessToken}`
          : "",
      },
    };
  });

  return ApolloLink.concat(errorLink, ApolloLink.concat(authLink, httpLink));
};

export const generateApolloClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: buildApolloLink(),
  });
