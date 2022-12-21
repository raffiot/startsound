import { gql } from "@apollo/client";

export default gql`
  query RoomById($id: UUID!) {
    roomById(id: $id) {
      id
      compatibility_score
      is_favorite
      user {
        id
        username
      }
    }
  }
`;
