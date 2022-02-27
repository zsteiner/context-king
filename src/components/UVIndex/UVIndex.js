import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './UVIndex.module.scss';

function UVIndex({ uvIndex }) {
  let level;

  switch (true) {
    case uvIndex >= 1 && uvIndex < 2:
      level = 'low';
      break;
    case uvIndex >= 2 && uvIndex < 3:
      level = 'med';
      break;
    case uvIndex >= 3 && uvIndex < 4:
      level = 'high';
      break;
    case uvIndex >= 4:
      level = 'exHigh';
      break;
    default:
      level = 'exLow';
  }

  const uvClasses = classNames({
    [styles.uv]: true,
    [styles[level]]: level,
  });

  return <span className={uvClasses}>{Math.round(uvIndex)}</span>;
}

UVIndex.propTypes = {
  uvIndex: PropTypes.number,
};

export default UVIndex;
