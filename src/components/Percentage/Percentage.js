import React from 'react';
import PropTypes from 'prop-types';

const Percentage = ({ number }) => {
  const percentage = number * 100;
  return <span>{percentage} %</span>;
};

Percentage.propTypes = {
  number: PropTypes.number
};

export default Percentage;
