import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';

import * as movieAPI from '../../services/movie-api';
import defaultImg from '../../images/error_404.jpg';
import Button from '../../components/Button';
import MovieCard from '../MovieCard';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();

  const [error, setError] = useState(null);
  const [fullInfo, setFullInfo] = useState(null);
  const [castInfo, setCastInfo] = useState(null);
  const [reviewsInfo, setReviewsInfo] = useState(null);

  useEffect(() => {
    movieAPI
      .fetchFullInfoOfMovie(movieId)
      .then(setFullInfo)
      .catch(error => setError(error.message));
    movieAPI
      .fetchCastInfoOfMovie(movieId)
      .then(response => setCastInfo(response.cast))
      .catch(error => error.message);
    movieAPI
      .fetchReviewsInfoOfMovie(movieId)
      .then(response => setReviewsInfo(response.results))
      .catch(error => error.message);
  }, [movieId]);

  const onGoBack = () => {
    history.push(
      location?.state?.from?.state?.from?.state?.from ??
        location?.state?.from?.state?.from ??
        location?.state?.from ??
        '/',
    );
  };

  return (
    <>
      <Button onClick={onGoBack} />

      {error && (
        <div className={s.MovieDetailsError}>
          <img
            src={defaultImg}
            alt="{error}"
            className={s.MovieDetailsErrorImg}
          ></img>
          <h2 className={s.MovieDetailsErrorMsg}>{error}</h2>
        </div>
      )}

      {fullInfo && <MovieCard fullInfo={fullInfo} />}
      <hr />
      <h2 className={s.MovieDetailsPageSubtitle}>Additional information</h2>

      {castInfo && (
        <NavLink
          to={{
            pathname: `${url}/cast`,
            state: { from: location },
          }}
          className={s.MovieDetailsLink}
        >
          Cast
        </NavLink>
      )}

      {reviewsInfo && (
        <NavLink
          to={{
            pathname: `${url}/reviews`,
            state: { from: location },
          }}
          className={s.MovieDetailsLink}
        >
          Reviews
        </NavLink>
      )}
      <hr />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path={`${path}/cast`}>
            <Cast castInfo={castInfo} />
          </Route>

          <Route path={`${path}/reviews`}>
            <Reviews reviewsInfo={reviewsInfo} />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
