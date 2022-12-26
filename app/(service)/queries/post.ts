import { gql } from "graphql-request";

export const GET_POST_BY_SLUG = gql`
  query Posts($slug: String = "") {
    post(where: { slug: $slug }) {
      slug
      title
      updatedAt
      publishedAt
      createdAt
      content {
        html
      }
    }
  }
`;
