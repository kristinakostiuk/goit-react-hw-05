import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
    getTrendingMovies();
  }, []);

  return (
    <main>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </main>
  );
}
