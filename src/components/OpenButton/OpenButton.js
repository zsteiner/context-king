import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Plus } from '../../assets/plus.svg';
import { ReactComponent as Minus } from '../../assets/minus.svg';

import styles from './OpenButton.module.scss';

function OpenButton({ onClick, isOpen }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type="button"
    >
      {isOpen ? <Minus className="svg-icon" /> : <Plus className="svg-icon" />}
    </button>
  );
}

OpenButton.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
};

export default OpenButton;
