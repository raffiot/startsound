import * as Types from "./schemas";

export type LoginMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.UserLoginInput>;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login?: {
    __typename?: "LoginOutput";
    access_token: string;
    refresh_token: string;
    token_type: string;
  } | null;
};

export type RoomCreateMutationVariables = Types.Exact<{
  user_id: Types.Scalars["UUID"];
}>;

export type RoomCreateMutation = {
  __typename?: "Mutation";
  roomCreate?: { __typename?: "Room"; id: any } | null;
};

export type RoomFavoriteUpdateMutationVariables = Types.Exact<{
  id: Types.Scalars["UUID"];
  input?: Types.InputMaybe<Types.RoomUpdate>;
}>;

export type RoomFavoriteUpdateMutation = {
  __typename?: "Mutation";
  roomUpdate?: { __typename?: "Room"; id: any } | null;
};

export type UpdateUserMutationVariables = Types.Exact<{
  id: Types.Scalars["UUID"];
  input?: Types.InputMaybe<Types.UserUpdateInput>;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  userUpdate?: { __typename?: "User"; id: any } | null;
};

export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    id: any;
    username?: string | null;
    birthplace?: string | null;
    birthplace_pos_lat?: number | null;
    birthplace_pos_lon?: number | null;
    birthday?: any | null;
    rooms?: Array<{
      __typename?: "Room";
      id: any;
      is_favorite: boolean;
      user: {
        __typename?: "UserRestricted";
        id: any;
        username?: string | null;
      };
    }> | null;
  } | null;
};

export type RoomByIdQueryVariables = Types.Exact<{
  id: Types.Scalars["UUID"];
}>;

export type RoomByIdQuery = {
  __typename?: "Query";
  roomById?: {
    __typename?: "Room";
    id: any;
    compatibility_score: number;
    is_favorite: boolean;
    features?: Array<string | null> | null;
    songs?: Array<{
      __typename?: "Song";
      id: string;
      room_id: any;
      name?: string | null;
      picture_url?: string | null;
      preview_url?: string | null;
      spotify_url?: string | null;
      artist?: string | null;
    } | null> | null;
    user: { __typename?: "UserRestricted"; id: any; username?: string | null };
  } | null;
};

export type RoomByUserIdQueryVariables = Types.Exact<{
  user_id: Types.Scalars["UUID"];
}>;

export type RoomByUserIdQuery = {
  __typename?: "Query";
  roomByUserId?: { __typename?: "Room"; id: any } | null;
};

export type RoomCreatedSubscriptionVariables = Types.Exact<{
  [key: string]: never;
}>;

export type RoomCreatedSubscription = {
  __typename?: "Subscription";
  roomCreated?: {
    __typename?: "Room";
    id: any;
    is_favorite: boolean;
    user: { __typename?: "UserRestricted"; id: any; username?: string | null };
  } | null;
};
