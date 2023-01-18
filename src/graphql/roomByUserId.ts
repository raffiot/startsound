import { gql } from "@apollo/client";

export default gql`
  query RoomByUserId($user_id: UUID!) {
    roomByUserId(user_id: $user_id) {
      id
    }
  }
`;
