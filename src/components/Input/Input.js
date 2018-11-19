import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.module.scss';

const Input = ({ onSubmit, onChange, onFocus, placeholder, value }) => {
  return (
    <form onSubmit={onSubmit} className={styles.inputForm}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        className={styles.input}
      />
    </form>
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default Input;
