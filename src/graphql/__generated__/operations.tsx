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
    bitrhday?: any | null;
  } | null;
};
