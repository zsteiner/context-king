import React from 'react';
import PropTypes from 'prop-types';

import styles from './LocationResults.module.scss';

const LocationResults = ({ results }) => {
  const resultItems = results.map((item, index) => {
    return <li key={index}>{item.place_name}</li>;
  });

  return <ul className={`${styles.results} list-clear`}>{resultItems}</ul>;
};

LocationResults.propTypes = {
  results: PropTypes.array
};

export default LocationResults;
