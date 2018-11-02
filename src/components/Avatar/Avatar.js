import React from 'react';
import PropTypes from 'prop-types';

import styles from './Avatar.module.scss';

const Avatar = ({ name, src }) => {
  return (
    <figure className={styles.avatar}>
      <img src={src} alt={name} className={styles.avatarImg} />
    </figure>
  );
};

Avatar.PropTypes = {
  name: PropTypes.string,
  src: PropTypes.string
};

export default Avatar;
