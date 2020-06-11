import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ title, isbn, image, description }) => {
    return (
        <div className="book-container">
            <h3 className="book-title">{title}</h3>
            <img src={image} alt="Not found" className="book-image"/>
            <p>ISBN #: {isbn}</p>
            <p className="book-description">{description}</p>
        </div>
    )
};

Book.propTypes = {
    title: PropTypes.string.isRequired,
    isbn: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default Book;