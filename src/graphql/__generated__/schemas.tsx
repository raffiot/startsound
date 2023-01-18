export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  UUID: any;
};

export type LoginOutput = {
  __typename?: "LoginOutput";
  access_token: Scalars["String"];
  refresh_token: Scalars["String"];
  token_type: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  login?: Maybe<LoginOutput>;
  refreshToken?: Maybe<LoginOutput>;
  roomCreate?: Maybe<Room>;
  roomUpdate?: Maybe<Room>;
  userUpdate?: Maybe<User>;
};

export type MutationLoginArgs = {
  input?: InputMaybe<UserLoginInput>;
};

export type MutationRefreshTokenArgs = {
  input?: InputMaybe<UserRefreshTokenInput>;
};

export type MutationRoomCreateArgs = {
  user_id: Scalars["UUID"];
};

export type MutationRoomUpdateArgs = {
  id: Scalars["UUID"];
  input?: InputMaybe<RoomUpdate>;
};

export type MutationUserUpdateArgs = {
  id: Scalars["UUID"];
  input?: InputMaybe<UserUpdateInput>;
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
  roomById?: Maybe<Room>;
  roomByUserId?: Maybe<Room>;
};

export type QueryRoomByIdArgs = {
  id: Scalars["UUID"];
};

export type QueryRoomByUserIdArgs = {
  user_id: Scalars["UUID"];
};

export type Room = {
  __typename?: "Room";
  compatibility_score: Scalars["Int"];
  id: Scalars["UUID"];
  is_favorite: Scalars["Boolean"];
  song_id?: Maybe<Scalars["String"]>;
  user: UserRestricted;
};

export type RoomUpdate = {
  is_favorite?: InputMaybe<Scalars["Boolean"]>;
};

export type User = {
  __typename?: "User";
  birthday?: Maybe<Scalars["DateTime"]>;
  birthplace?: Maybe<Scalars["String"]>;
  birthplace_pos_lat?: Maybe<Scalars["Float"]>;
  birthplace_pos_lon?: Maybe<Scalars["Float"]>;
  id: Scalars["UUID"];
  rooms?: Maybe<Array<Room>>;
  username?: Maybe<Scalars["String"]>;
};

export type UserLoginInput = {
  code: Scalars["String"];
  state?: InputMaybe<Scalars["String"]>;
};

export type UserRefreshTokenInput = {
  refresh_token: Scalars["String"];
};

export type UserRestricted = {
  __typename?: "UserRestricted";
  id: Scalars["UUID"];
  username?: Maybe<Scalars["String"]>;
};

export type UserUpdateInput = {
  birthday?: InputMaybe<Scalars["DateTime"]>;
  birthplace?: InputMaybe<Scalars["String"]>;
  birthplace_pos_lat?: InputMaybe<Scalars["Float"]>;
  birthplace_pos_lon?: InputMaybe<Scalars["Float"]>;
  username?: InputMaybe<Scalars["String"]>;
};
