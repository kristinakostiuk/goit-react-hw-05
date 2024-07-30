import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const makeClass = ({ isActive }) => clsx(css.link, isActive && css.active);

export default function Navigation() {
  return (
    <header className={css.header}>
      <NavLink className={makeClass} to="/">
        Home
      </NavLink>
      <NavLink className={makeClass} to="/movies">
        Movies
      </NavLink>
    </header>
  );
}
