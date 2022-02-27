import React from 'react';
import PropTypes from 'prop-types';

import styles from './Attribution.module.scss';

function Attribution({ user }) {
  return (
    <section className={styles.attribution}>
      Image Credit:
      {' '}
      <a href={`${user.links.html}?utm_source=forecast&utm_medium=referral`}>
        {user.name}
        {' '}
        on Unsplash
      </a>
    </section>
  );
}

Attribution.propTypes = {
  user: PropTypes.object,
};

export default Attribution;
