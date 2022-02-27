import React from 'react';
import PropTypes from 'prop-types';

import styles from './LocationButton.module.scss';

import { ReactComponent as Location } from '../../assets/location.svg';

function LocationButton({ onClick }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type="button"
    >
      <Location className={styles.icon} />
      find current location
    </button>
  );
}

LocationButton.propTypes = {
  onClick: PropTypes.func,
};

export default LocationButton;
