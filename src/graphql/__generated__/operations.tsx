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

export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    id: any;
    username?: string | null;
    birthplace?: string | null;
    birthday?: any | null;
  } | null;
};

export type UpdateUserMutationVariables = Types.Exact<{
  id: Types.Scalars["UUID"];
  input?: Types.InputMaybe<Types.UserUpdateInput>;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  userUpdate?: { __typename?: "User"; id: any } | null;
};
