import { gql } from 'apollo-boost';

export const GET_BOOKS = gql`{
    listBooks {
      data {
        title
        isbn
        image
        description
      }
    }
}`;
