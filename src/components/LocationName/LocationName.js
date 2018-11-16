import React from 'react';

import styles from './LocationName.module.scss';

const LocationName = ({ coordinates, locationName }) => {
  return (
    <React.Fragment>
      <h1 className={styles.locationName}>{locationName}</h1>
      <small className={styles.locationCoordinates}>
        {coordinates.length > 0 ? `${coordinates[0]}, ${coordinates[1]}` : null}
      </small>
    </React.Fragment>
  );
};

export default LocationName;
