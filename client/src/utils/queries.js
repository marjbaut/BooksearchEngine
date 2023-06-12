import { gql } from '@apollo/client';

export const QUERY_USERS= gql`
query getUserById {
    user {
      _id
      email
      password
      username
    }
  }
`