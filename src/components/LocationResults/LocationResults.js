import React from 'react';
import PropTypes from 'prop-types';

import styles from './LocationResults.module.scss';

const LocationResults = ({ results, selectLocation }) => {
  const resultItems = results.map((item, index) => {
    return (
      <li
        key={index}
        onClick={() => selectLocation(item)}
        className={styles.resultsItem}
      >
        {item.place_name}
      </li>
    );
  });

  return (
    <ul className={`${styles.results} list-clear`}>
      {results.length > 0 ? resultItems : <li>Couldn't find that location</li>}
    </ul>
  );
};

LocationResults.propTypes = {
  results: PropTypes.array,
  selectLocation: PropTypes.func
};

export default LocationResults;
