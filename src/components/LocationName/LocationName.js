import React from 'react';

import updateDateString from '../../utils/updateDateString';

import styles from './LocationName.module.scss';

const LocationName = ({
  coordinates,
  fetchingForecast,
  forecastRefresh,
  locationName,
  updateDate
}) => {
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
    <React.Fragment>
      <h1 className={styles.locationName}>{locationName}</h1>
      <small className={styles.locationCoordinates}>
        {coordinates.length > 0
          ? `${coordinates[0]}, ${coordinates[1]}`
          : '0.00, 0.00'}
      </small>
      <small className={styles.locationRefresh}>{refreshLabel}</small>
      <small className={styles.locationRefresh}>Updated {dateString}</small>
    </React.Fragment>
  );
};

export default LocationName;
