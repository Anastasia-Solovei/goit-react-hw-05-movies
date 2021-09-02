import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav>
      <NavLink
        exact
        to="/"
        className={s.navLink}
        activeClassName={s.activeNavLink}
      >
        Home
      </NavLink>

      <NavLink
        to="/movies"
        className={s.navLink}
        activeClassName={s.activeNavLink}
      >
        Movies
      </NavLink>
    </nav>
  );
}
