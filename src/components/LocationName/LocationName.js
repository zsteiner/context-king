import React from 'react';
import PropTypes from 'prop-types';

import styles from './LocationName.module.scss';
import updateDateString from '../../utils/updateDateString';

function LocationName({
  coordinates,
  fetchingForecast,
  forecastRefresh,
  locationName,
  updateDate,
}) {
  const dateString = updateDateString(updateDate);
  let refreshLabel;

  switch (true) {
    case forecastRefresh && !fetchingForecast:
      refreshLabel = 'New Forecast';
      break;
    case fetchingForecast:
      refreshLabel = 'Getting Location';
      break;
    default:
      refreshLabel = 'Existing Forecast';
  }

  return (
    <>
      <h1 className={styles.locationName}>{locationName}</h1>
      <small className={styles.locationCoordinates}>
        {coordinates.length > 0
          ? `${coordinates[0]}, ${coordinates[1]}`
          : '0.00, 0.00'}
      </small>
      <small className={styles.locationRefresh}>{refreshLabel}</small>
      <small className={styles.locationRefresh}>
        Updated
        {dateString}
      </small>
    </>
  );
}

LocationName.propTypes = {
  coordinates: PropTypes.array,
  fetchingForecast: PropTypes.bool,
  forecastRefresh: PropTypes.bool,
  locationName: PropTypes.string,
  updateDate: PropTypes.string,
};

export default LocationName;
