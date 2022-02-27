import React from 'react';
import PropTypes from 'prop-types';

import styles from './LocationResults.module.scss';

function LocationResults({ results, selectLocation }) {
  const resultItems = results.map((item) => (
    <li
      key={item.place_name}
      className={styles.resultsItem}
    >
      <button
        className={styles.resultsButton}
        onClick={() => selectLocation(item)}
        type="button"
      >
        {item.place_name}
      </button>
    </li>
  ));

  return (
    <ul className={`${styles.results} list-clear`}>
      {results.length > 0 ? resultItems : <li>Could not find that location</li>}
    </ul>
  );
}

LocationResults.propTypes = {
  results: PropTypes.array,
  selectLocation: PropTypes.func,
};

export default LocationResults;
