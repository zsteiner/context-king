import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card';

import styles from './CardList.module.scss';

const CardList = ({ members }) => {
  const listItems = members.map(person => (
    <li className={styles.listItem}>
      <Card person={person} />
    </li>
  ));

  return <ul className={`list-clear ${styles.list}`}>{listItems}</ul>;
};

CardList.PropTypes = {
  members: PropTypes.array.isRequired,
};

export default CardList;
