import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../movies-api';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const castData = await fetchMovieCast(movieId);
        setCast(castData);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul className={css.castList}>
        {cast.map((member) => (
          <li key={member.id} className={css.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
              alt={member.name}
              className={css.castImage}
            />
            <p className={css.castName}>
              {member.name} as {member.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
