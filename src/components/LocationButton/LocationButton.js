import React from 'react';
import PropTypes from 'prop-types';

import styles from './LocationButton.module.scss';

import { ReactComponent as Location } from '../../assets/location.svg';

const LocationButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <Location className={styles.icon} />
      find current location
    </button>
  );
};

LocationButton.propTypes = {
  onClick: PropTypes.func
};

export default LocationButton;
