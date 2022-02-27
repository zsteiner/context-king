import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

function Button({ text, onClick }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default Button;
