import React from 'react';

import { NavLink } from 'react-router-dom';

import styles from './Nav.module.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={styles.navItem}
        // className={({isActive}) => styles.active + (isActive ?' demo' : '')}
      >
        Forecast
      </NavLink>
      <NavLink
        to="/timemachine"
        // activeClassName={styles.active}
        className={styles.navItem}
      >
        Time Machine
      </NavLink>
    </nav>
  );
};

export default Nav;
