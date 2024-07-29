import { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useLocation, Link, Route, Routes } from 'react-router-dom';
import { fetchMovieDetails } from '../../movies-api';
import css from './MovieDetailsPage.module.css';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../../components/MovieReviews/MovieReviews')
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <>
      <button className={css.backButton}>
        <Link to={location?.state?.from ?? '/movies'}>Go back</Link>
      </button>
      <main className={css.detailsPage}>
        <h1 className={css.movieTitle}>{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className={css.moviePoster}
        />
        <p className={css.movieInfo}>{movie.overview}</p>

        <nav className={css.navLinks}>
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
