import React from 'react';
import PropTypes from 'prop-types';
import { BASE_IMG_URL } from '../../services/movie-api';
import defaultImg from '../../images/no_image_found.jpg';
import s from './Cast.module.css';

const Cast = ({ castInfo }) => {
  return (
    <>
      {castInfo && (
        <ul>
          {castInfo.map(actor => {
            return (
              <li key={actor.id}>
                <div className={s.CastProfileImgContainer}>
                  <img
                    src={
                      actor.profile_path
                        ? `${BASE_IMG_URL}${actor.profile_path}`
                        : defaultImg
                    }
                    alt={actor.original_name}
                    className={s.CastProfileImg}
                  ></img>
                </div>
                <h2>{actor.original_name}</h2>
                <p>Character: {actor.character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

Cast.defaultProps = {
  imgURL: '../../images/no_poster_found.png',
};

Cast.propTypes = {
  castInfo: PropTypes.arrayOf(PropTypes.shape),
};

export default Cast;
