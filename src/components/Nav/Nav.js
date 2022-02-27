import React from 'react';

import { NavLink } from 'react-router-dom';

import styles from './Nav.module.scss';

const navLinkClasses = (isActive) => styles.navItem + (isActive ? ` ${styles.active}` : '');

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        className={({ isActive }) => navLinkClasses(isActive)}
        to="/"
      >
        Forecast
      </NavLink>
      <NavLink
        className={({ isActive }) => navLinkClasses(isActive)}
        to="/timemachine"
      >
        Time Machine
      </NavLink>
    </nav>
  );
};

export default Nav;
