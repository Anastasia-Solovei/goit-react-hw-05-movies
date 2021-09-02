import React from 'react';
import PropTypes from 'prop-types';
// import s from './Reviews.module.css';

const Reviews = ({ reviewsInfo }) => {
  return (
    <>
      {reviewsInfo > 0 ? (
        reviewsInfo.map(review => (
          <li key={review.id}>
            <h2>{review.author}</h2>
            <p>{review.content}</p>
          </li>
        ))
      ) : (
        <p>We don't have any reviews for this movie...</p>
      )}
    </>
  );
};

Reviews.propTypes = {
  reviewsInfo: PropTypes.arrayOf(PropTypes.shape),
};

export default Reviews;
