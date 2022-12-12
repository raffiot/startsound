import { gql } from "@apollo/client";

export default gql`
  mutation Login($input: UserLoginInput) {
    login(input: $input) {
      access_token
      refresh_token
      token_type
    }
  }
`;
