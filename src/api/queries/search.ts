import { gql } from "@apollo/client";

export const searchQuery = gql`
  query Query($searchTerm: String!, $page: Int, $pageSize: Int) {
    searchRestaurants(
      searchTerm: $searchTerm
      page: $page
      pageSize: $pageSize
    ) {
      total
      result {
        id
        name
        address
        phone
        email
      }
    }
  }
`;
