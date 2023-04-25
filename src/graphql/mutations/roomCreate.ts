import { gql } from "@apollo/client";

export default gql`
  mutation roomCreate($user_id: UUID!) {
    roomCreate(user_id: $user_id) {
      id
    }
  }
`;
