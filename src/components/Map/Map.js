import React from 'react';
import PropTypes from 'prop-types';

import styles from './Map.module.scss';

function Map({
  coordinates,
  fieldControl,
  mapField,
  timeControl,
  units,
  zoom,
}) {
  const calcUnits = (newUnits) => {
    switch (mapField) {
      case 'temperature':
      case 'apparent_temperature':
      case 'dew_point':
        return newUnits === 'metric' ? '_c' : '_f';
      case 'radar':
        return newUnits === 'metric' ? '_mmph' : '_inph';
      case 'wind_gust':
      case 'wind_speed':
        return newUnits === 'metric' ? '_kmph' : '_mph';
      case 'sea_level_pressure':
        return newUnits === 'metric' ? '_hpa' : '_inhg';
      case 'ozone':
        return '_du';
      default:
        return '';
    }
  };

  const uom = calcUnits(units);

  const url = `https://maps.darksky.net/@${mapField},${coordinates[1].toString()},${coordinates[0].toString()},${zoom.toString()}?embed=true&timeControl=${timeControl.toString()}&fieldControl=${fieldControl.toString()}&defaultField=${mapField}&defaultUnits=${uom}`;

  return (
    <section className={`${styles.map} embed`}>
      <iframe frameBorder="0" title="Map" src={url} />
    </section>
  );
}

Map.propTypes = {
  coordinates: PropTypes.array,
  fieldControl: PropTypes.bool,
  mapField: PropTypes.oneOf([
    'temperature',
    'precipitation_rate',
    'radar',
    'apparent_temperature',
    'cloud_cover',
    'wind_speed',
    'wind_gust',
    'dew_point',
    'uv_index',
    'sea_level_pressure',
    'ozone',
  ]),
  timeControl: PropTypes.bool,
  units: PropTypes.oneOf(['standard', 'metric']),
  zoom: PropTypes.number,
};

Map.defaultProps = {
  mapField: 'radar',
  fieldControl: false,
  timeControl: false,
  units: 'standard',
  zoom: 7,
};

export default Map;
