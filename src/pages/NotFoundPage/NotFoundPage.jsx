import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.notFound}>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className={css.homeLink}>
        Go back to Home
      </Link>
    </div>
  );
}
