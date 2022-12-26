import { gql } from "graphql-request";

export const GET_HOME_DATA = gql`
  query Posts {
    posts {
      createdAt
      id
      slug
      title
      updatedAt
    }
  }
`;
