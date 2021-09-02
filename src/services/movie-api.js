const API_KEY = 'dedcc9c8af32298039f3be2c94f909f1';
const BASE_URL = 'https://api.themoviedb.org/3';
export const BASE_IMG_URL = `https://image.tmdb.org/t/p/w200/`;

const TRENDING_URL = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);

  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendingMovies() {
  return fetchWithErrorHandling(TRENDING_URL);
}

export function fetchSearchMovies(query, page) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=en-US&page=1&include_adult=false`,
  );
}

export function fetchFullInfoOfMovie(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchCastInfoOfMovie(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchReviewsInfoOfMovie(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`,
  );
}
