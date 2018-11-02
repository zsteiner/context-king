import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar/Avatar';

import styles from './Card.module.scss';

const Card = ({ person }) => {
  const profile = person.profile;

  return (
    <article className={styles.card}>
      <Avatar src={profile.image_192} name={profile.real_name} />
      <header>
        <h2 className={styles.cardName}>
          {profile.first_name
            ? `${profile.first_name} ${profile.last_name}`
            : profile.display_name}
        </h2>
        <p>{profile.title}</p>
      </header>
    </article>
  );
};

Card.PropTypes = {
  person: PropTypes.array.isRequired
};

export default Card;
