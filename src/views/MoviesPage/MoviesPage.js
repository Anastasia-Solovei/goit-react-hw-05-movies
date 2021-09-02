import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';

import * as movieAPI from '../../services/movie-api';
import SearchBar from '../SearchBar';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const searchQuery = new URLSearchParams(location.search).get('query') ?? '';

  const onSubmitHandler = input => {
    history.push({
      ...location,
      search: `query=${input}`,
    });
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    movieAPI.fetchSearchMovies(searchQuery).then(({ results }) => {
      setMovies(results);
    });
  }, [searchQuery]);

  return (
    <div className={s.moviesPage}>
      <SearchBar onSubmit={onSubmitHandler} />

      {movies && (
        <ul>
          {movies.map(movie => {
            return (
              <li key={movie.id} className={s.MoviesListItem}>
                <Link
                  to={{
                    pathname: `${url}/${movie.id}`,
                    state: { from: location },
                  }}
                  className={s.MoviesListLink}
                >
                  {movie.title}
                  {movie.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
