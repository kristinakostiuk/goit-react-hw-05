import { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import Navigation from '../../components/Navigation/Navigation';
import css from './MoviesPage.module.css';

const API_KEY = '3d90b1702fc7399f17ce95b7105cf37e';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: API_KEY,
            query: query,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <>
      <Navigation />
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
