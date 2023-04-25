import { gql } from "@apollo/client";

export default gql`
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
        artist
      }
      user {
        id
        username
      }
    }
  }
`;
