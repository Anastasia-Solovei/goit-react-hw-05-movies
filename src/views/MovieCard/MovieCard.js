import React from 'react';
import PropTypes from 'prop-types';

import { BASE_IMG_URL } from '../../services/movie-api';
import defaultImg from '../../images/no_poster_found.png';
import s from './MovieCard.module.css';

const MovieCard = ({
  fullInfo: { poster_path, title, release_date, overview, genres, popularity },
}) => {
  const moviePoplarity = popularity.toFixed();

  return (
    <div className={s.MovieCardContent}>
      <img
        src={poster_path ? `${BASE_IMG_URL}${poster_path}` : defaultImg}
        alt={title}
        className={s.MovieCardPoster}
      ></img>
      <div className={s.MovieCardInfo}>
        <h2>
          {title}
          <br />
          <span>{release_date.slice(0, 4)}</span>
        </h2>
        <p className={s.MovieCardInfoParams}>
          User Score
          <span className={s.MovieCardScore}>{moviePoplarity}%</span>
        </p>
        <p className={s.MovieCardInfoParams}>
          Overview:
          <span className={s.MovieCardOverview}>{overview}</span>
        </p>
        <ul className={s.MovieCardInfoParams}>
          Genres
          {genres.map(genre => {
            return (
              <li key={genre.id} className={s.MovieCardGenre}>
                {genre.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  fullInfo: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.shape),
    // vote_average: PropTypes.number.isRequired,
  }),
};

export default MovieCard;
