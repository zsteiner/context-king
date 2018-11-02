import React from 'react';
import PropTypes from 'prop-types';

import styles from './Card.module.scss';

const Card = ({ person }) => {
  const profile = person.profile;

  return (
    <article className={styles.card}>
      <h2>
        {profile.first_name
          ? `${profile.first_name} ${profile.last_name}`
          : profile.display_name}
      </h2>
    </article>
  );
};

Card.PropTypes = {
  person: PropTypes.array.isRequired
};

export default Card;
