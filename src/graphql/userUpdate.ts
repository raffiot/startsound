import { gql } from "@apollo/client";

export default gql`
  mutation UpdateUser($id: UUID!, $input: UserUpdateInput) {
    userUpdate(id: $id, input: $input) {
      id
    }
  }
`;
