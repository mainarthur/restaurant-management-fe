import { gql } from "@apollo/client";

export const updateQuery = gql`
  mutation Update(
    $id: Int!
    $name: String!
    $address: String!
    $email: String!
    $phone: String!
  ) {
    updateRestaurant(
      id: $id
      name: $name
      address: $address
      email: $email
      phone: $phone
    ) {
      id
      name
    }
  }
`;
