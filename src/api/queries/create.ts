import { gql } from "@apollo/client";

export const createQuery = gql`
  mutation Create(
    $name: String!
    $address: String!
    $email: String!
    $phone: String!
  ) {
    createRestaurant(
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
