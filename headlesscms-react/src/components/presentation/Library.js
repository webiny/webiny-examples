import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOKS } from '../../graphql/queries';
import { Book } from './';

const Library = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);
    if(loading)
      return <p>Loading...</p>;
    if(error) {
      return <p>Error fetching books</p>;
    }
    return (
      <div className="library-container">
        {
            data.listBooks.data.map((book) => (
              <Book key={book.title} {...book} />
            ))
        }
      </div>
    )
};

export default Library;
