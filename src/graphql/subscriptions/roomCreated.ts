import { gql } from "@apollo/client";

export default gql`
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
