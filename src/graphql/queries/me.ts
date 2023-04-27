import { gql } from "@apollo/client";

export default gql`
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
