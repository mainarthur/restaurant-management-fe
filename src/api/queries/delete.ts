import { gql } from "@apollo/client";

export const deleteQuery = gql`
  mutation Delete($id: Int!) {
    deleteRestaurant(id: $id) {
      id
      name
    }
  }
`;
