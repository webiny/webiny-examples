import { gql } from '@apollo/client';

export const listNotes = gql`
  query ListNotes {
    listNotes {
      data {
        id
        title
        description
      }
    }
  }
`;