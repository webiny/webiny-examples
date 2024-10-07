import { gql } from '@apollo/client';

export const createNote = gql`
  mutation CreateNote($data: NoteInput!) {
    createNote(data: $data) {
      data {
        id
        title
        description
      }
    }
  }
`;

export const deleteNote = gql`
  mutation DeleteNote(
    $revision: ID!, $options: CmsDeleteEntryOptions
  ) {
    deleteNote(revision: $revision, options: $options) {
      data
    }
  }
`;