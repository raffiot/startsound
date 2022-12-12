import { AuthContext } from "@/context/AuthContext";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  FetchResult,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Constants from "expo-constants";
import { GraphQLError } from "graphql";
import { useContext } from "react";

const fetchRefreshToken = async (
  refreshToken: string,
): Promise<{ refreshToken: string; accessToken: string }> => {
  const response = await fetch(Constants.manifest?.extra?.graphqlApiUrl, {
    method: "post",
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
  const {
    refreshToken: { refresh_token: newRefreshToken, access_token: accessToken },
  } = await response.json();
  return { refreshToken: newRefreshToken, accessToken };
};

const buildApolloLink = (): ApolloLink => {
  const { auth, setAuth } = useContext(AuthContext);
  const refreshToken = auth?.refreshToken;
  const accessToken = auth?.accessToken;
  const httpLink = createHttpLink({
    uri: Constants.manifest?.extra?.graphqlApiUrl,
  });
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          switch (err.extensions.code) {
            case "UNAUTHENTICATED":
              // ignore 401 error for a refresh request
              if (operation.operationName === "refreshToken" || !refreshToken)
                return;

              const observable = new Observable<
                FetchResult<Record<string, any>>
              >((observer) => {
                // used an annonymous function for using an async function
                (async () => {
                  try {
                    const token = await fetchRefreshToken(refreshToken);
                    await setAuth(token);
                    if (!accessToken) {
                      throw new GraphQLError("Empty AccessToken");
                    }

                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };

                    forward(operation).subscribe(subscriber);
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              });

              return observable;
          }
        }
      }

      if (networkError) console.log(`[Network error]: ${networkError}`);
    },
  );

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  return ApolloLink.from([errorLink, authLink, httpLink]);
};

export const generateApolloClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: buildApolloLink(),
  });
