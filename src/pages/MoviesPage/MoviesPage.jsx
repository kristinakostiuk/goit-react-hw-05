import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get('query') || '';
    setQuery(queryParam);

    if (queryParam) {
      const fetchMovies = async () => {
        try {
          const moviesData = await searchMovies(queryParam);
          setMovies(moviesData);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };

      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [searchParams]);

  const handleSearch = () => {
    setSearchParams({ query });
  };

  return (
    <>
      <div className={css.searchContainer}>
        <input
          type="text"
          placeholder="Search for movies..."
          className={css.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={css.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
      <main>
        <MovieList movies={movies} />
      </main>
    </>
  );
}
