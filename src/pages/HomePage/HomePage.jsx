import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import Navigation from '../../components/Navigation/Navigation';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies()
      .then((data) => setMovies(data.results))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <h1>Trending Movies</h1>
        <MovieList movies={movies} />
      </main>
    </>
  );
}
