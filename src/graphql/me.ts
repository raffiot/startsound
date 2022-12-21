import { gql } from "@apollo/client";

export default gql`
  query Me {
    me {
      id
      username
      birthplace
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
