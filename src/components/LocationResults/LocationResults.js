import React from 'react';
import PropTypes from 'prop-types';

const LocationResults = ({ results }) => {
  const resultItems = results.map((item, index) => {
    return <li key={index}>{item.place_name}</li>;
  });

  return <ul className="list-clear">{resultItems}</ul>;
};

LocationResults.propTypes = {
  results: PropTypes.array
};

export default LocationResults;
