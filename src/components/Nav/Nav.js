import React from 'react';

import { NavLink } from 'react-router-dom';

import styles from './Nav.module.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        exact
        className={styles.navItem}
        activeClassName={styles.active}
      >
        Forecast
      </NavLink>
      <NavLink
        to="/timemachine"
        strict
        activeClassName={styles.active}
        className={styles.navItem}
      >
        Time Machine
      </NavLink>
    </nav>
  );
};

export default Nav;
