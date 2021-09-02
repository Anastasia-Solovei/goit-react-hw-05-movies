import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import * as movieAPI from '../../services/movie-api';
import s from './HomePage.module.css';

export default function Home() {
  const location = useLocation();
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    movieAPI
      .fetchTrendingMovies()
      .then(response => setTrendingMovies(response.results));
  }, []);

  return (
    <>
      <h1 className={s.HomeTitle}>Trending today</h1>

      {trendingMovies && (
        <ul>
          {trendingMovies.map(movie => {
            return (
              <li key={movie.id} className={s.HomeListItem}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: { from: location },
                  }}
                  className={s.HomeListLink}
                >
                  {movie.title}
                  {movie.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
