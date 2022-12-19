import { gql } from "@apollo/client";

export default gql`
  mutation RoomFavoriteUpdate($id: UUID!, $input: RoomUpdate) {
    roomUpdate(id: $id, input: $input) {
      id
    }
  }
`;
