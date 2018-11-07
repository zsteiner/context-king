import React from 'react';
import PropTypes from 'prop-types';

import styles from './LocationButton.module.scss';

const LocationButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={styles.icon}
      >
        <path d="M12 18.984c3.891 0 6.984-3.094 6.984-6.984s-3.094-6.984-6.984-6.984-6.984 3.094-6.984 6.984 3.094 6.984 6.984 6.984zM20.953 11.016h2.063v1.969h-2.063c-0.469 4.172-3.797 7.5-7.969 7.969v2.063h-1.969v-2.063c-4.172-0.469-7.5-3.797-7.969-7.969h-2.063v-1.969h2.063c0.469-4.172 3.797-7.5 7.969-7.969v-2.063h1.969v2.063c4.172 0.469 7.5 3.797 7.969 7.969zM12 8.016c2.203 0 3.984 1.781 3.984 3.984s-1.781 3.984-3.984 3.984-3.984-1.781-3.984-3.984 1.781-3.984 3.984-3.984z" />
      </svg>
      find current location
    </button>
  );
};

LocationButton.propTypes = {
  onClick: PropTypes.func
};

export default LocationButton;
