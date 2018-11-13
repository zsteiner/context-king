import React from 'react';
import PropTypes from 'prop-types';

import styles from './Attribution.module.scss';

const Attribution = ({ user }) => {
  return (
    <span className={styles.attribution}>
      Image Credit: <a href={user.links.html}>{user.name} on Unsplash</a>
    </span>
  );
};

Attribution.propTypes = {
  user: PropTypes.object
};

export default Attribution;
