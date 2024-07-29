import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../movies-api';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul className={css.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewItem}>
              <h3 className={css.reviewAuthor}>{review.author}</h3>
              <p className={css.reviewContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
