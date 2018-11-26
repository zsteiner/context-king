import React from 'react';

import styles from './LocationName.module.scss';

const LocationName = ({
  coordinates,
  forecastRefresh,
  locationName,
  updateDate
}) => {
  const todaysDate = new Date();
  const formatDate = new Date(updateDate);

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric'
  };
  const time = formatDate.toLocaleTimeString('en-US', timeOptions);
  let dateString;

  if (formatDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
    dateString = `Today at ${time}`;
  } else {
    dateString = `${formatDate.toLocaleDateString()} at ${time}`;
  }

  return (
    <React.Fragment>
      <h1 className={styles.locationName}>{locationName}</h1>
      <small className={styles.locationCoordinates}>
        {coordinates.length > 0
          ? `${coordinates[0]}, ${coordinates[1]}`
          : '0.00, 0.00'}
      </small>
      <small className={styles.locationRefresh}>
        {forecastRefresh ? 'New Forecast' : 'Existing Forecast'}
      </small>
      <small className={styles.locationRefresh}>{dateString}</small>
    </React.Fragment>
  );
};

export default LocationName;
