import * as Types from "./operations";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;

export const LoginDocument = gql`
  mutation Login($input: UserLoginInput) {
    login(input: $input) {
      access_token
      refresh_token
      token_type
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  Types.LoginMutation,
  Types.LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.LoginMutation,
    Types.LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.LoginMutation, Types.LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<Types.LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  Types.LoginMutation,
  Types.LoginMutationVariables
>;
export const RoomCreateDocument = gql`
  mutation roomCreate($user_id: UUID!) {
    roomCreate(user_id: $user_id) {
      id
    }
  }
`;
export type RoomCreateMutationFn = Apollo.MutationFunction<
  Types.RoomCreateMutation,
  Types.RoomCreateMutationVariables
>;

/**
 * __useRoomCreateMutation__
 *
 * To run a mutation, you first call `useRoomCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRoomCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [roomCreateMutation, { data, loading, error }] = useRoomCreateMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useRoomCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RoomCreateMutation,
    Types.RoomCreateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.RoomCreateMutation,
    Types.RoomCreateMutationVariables
  >(RoomCreateDocument, options);
}
export type RoomCreateMutationHookResult = ReturnType<
  typeof useRoomCreateMutation
>;
export type RoomCreateMutationResult =
  Apollo.MutationResult<Types.RoomCreateMutation>;
export type RoomCreateMutationOptions = Apollo.BaseMutationOptions<
  Types.RoomCreateMutation,
  Types.RoomCreateMutationVariables
>;
export const RoomFavoriteUpdateDocument = gql`
  mutation RoomFavoriteUpdate($id: UUID!, $input: RoomUpdate) {
    roomUpdate(id: $id, input: $input) {
      id
    }
  }
`;
export type RoomFavoriteUpdateMutationFn = Apollo.MutationFunction<
  Types.RoomFavoriteUpdateMutation,
  Types.RoomFavoriteUpdateMutationVariables
>;

/**
 * __useRoomFavoriteUpdateMutation__
 *
 * To run a mutation, you first call `useRoomFavoriteUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRoomFavoriteUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [roomFavoriteUpdateMutation, { data, loading, error }] = useRoomFavoriteUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRoomFavoriteUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RoomFavoriteUpdateMutation,
    Types.RoomFavoriteUpdateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.RoomFavoriteUpdateMutation,
    Types.RoomFavoriteUpdateMutationVariables
  >(RoomFavoriteUpdateDocument, options);
}
export type RoomFavoriteUpdateMutationHookResult = ReturnType<
  typeof useRoomFavoriteUpdateMutation
>;
export type RoomFavoriteUpdateMutationResult =
  Apollo.MutationResult<Types.RoomFavoriteUpdateMutation>;
export type RoomFavoriteUpdateMutationOptions = Apollo.BaseMutationOptions<
  Types.RoomFavoriteUpdateMutation,
  Types.RoomFavoriteUpdateMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($id: UUID!, $input: UserUpdateInput) {
    userUpdate(id: $id, input: $input) {
      id
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  Types.UpdateUserMutation,
  Types.UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateUserMutation,
    Types.UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UpdateUserMutation,
    Types.UpdateUserMutationVariables
  >(UpdateUserDocument, options);
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<Types.UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateUserMutation,
  Types.UpdateUserMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      username
      birthplace
      birthplace_pos_lat
      birthplace_pos_lon
      birthday
      rooms {
        id
        is_favorite
        user {
          id
          username
        }
      }
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.MeQuery, Types.MeQueryVariables>(
    MeDocument,
    options
  );
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.MeQuery,
    Types.MeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.MeQuery, Types.MeQueryVariables>(
    MeDocument,
    options
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<
  Types.MeQuery,
  Types.MeQueryVariables
>;
export const RoomByIdDocument = gql`
  query RoomById($id: UUID!) {
    roomById(id: $id) {
      id
      compatibility_score
      is_favorite
      features
      songs {
        id
        room_id
        name
        picture_url
        preview_url
        spotify_url
        artist
      }
      user {
        id
        username
      }
    }
  }
`;

/**
 * __useRoomByIdQuery__
 *
 * To run a query within a React component, call `useRoomByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRoomByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.RoomByIdQuery,
    Types.RoomByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.RoomByIdQuery, Types.RoomByIdQueryVariables>(
    RoomByIdDocument,
    options
  );
}
export function useRoomByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.RoomByIdQuery,
    Types.RoomByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.RoomByIdQuery, Types.RoomByIdQueryVariables>(
    RoomByIdDocument,
    options
  );
}
export type RoomByIdQueryHookResult = ReturnType<typeof useRoomByIdQuery>;
export type RoomByIdLazyQueryHookResult = ReturnType<
  typeof useRoomByIdLazyQuery
>;
export type RoomByIdQueryResult = Apollo.QueryResult<
  Types.RoomByIdQuery,
  Types.RoomByIdQueryVariables
>;
export const RoomByUserIdDocument = gql`
  query RoomByUserId($user_id: UUID!) {
    roomByUserId(user_id: $user_id) {
      id
    }
  }
`;

/**
 * __useRoomByUserIdQuery__
 *
 * To run a query within a React component, call `useRoomByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomByUserIdQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useRoomByUserIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.RoomByUserIdQuery,
    Types.RoomByUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.RoomByUserIdQuery,
    Types.RoomByUserIdQueryVariables
  >(RoomByUserIdDocument, options);
}
export function useRoomByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.RoomByUserIdQuery,
    Types.RoomByUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.RoomByUserIdQuery,
    Types.RoomByUserIdQueryVariables
  >(RoomByUserIdDocument, options);
}
export type RoomByUserIdQueryHookResult = ReturnType<
  typeof useRoomByUserIdQuery
>;
export type RoomByUserIdLazyQueryHookResult = ReturnType<
  typeof useRoomByUserIdLazyQuery
>;
export type RoomByUserIdQueryResult = Apollo.QueryResult<
  Types.RoomByUserIdQuery,
  Types.RoomByUserIdQueryVariables
>;
export const RoomCreatedDocument = gql`
  subscription roomCreated {
    roomCreated {
      id
      is_favorite
      user {
        id
        username
      }
    }
  }
`;

/**
 * __useRoomCreatedSubscription__
 *
 * To run a query within a React component, call `useRoomCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRoomCreatedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    Types.RoomCreatedSubscription,
    Types.RoomCreatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    Types.RoomCreatedSubscription,
    Types.RoomCreatedSubscriptionVariables
  >(RoomCreatedDocument, options);
}
export type RoomCreatedSubscriptionHookResult = ReturnType<
  typeof useRoomCreatedSubscription
>;
export type RoomCreatedSubscriptionResult =
  Apollo.SubscriptionResult<Types.RoomCreatedSubscription>;
