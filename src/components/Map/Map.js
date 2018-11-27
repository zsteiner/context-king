import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Map.module.scss';

class Map extends Component {
  static propTypes = {
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
      'ozone'
    ]),
    timeControl: PropTypes.bool,
    units: PropTypes.oneOf(['standard', 'metric']),
    zoom: PropTypes.number
  };

  static defaultProps = {
    mapField: 'radar',
    fieldControl: false,
    timeControl: false,
    units: 'standard',
    zoom: 7
  };

  uom(units) {
    switch (this.props.mapField) {
      case 'temperature':
      case 'apparent_temperature':
      case 'dew_point':
        return units === 'metric' ? '_c' : '_f';
      case 'radar':
        return units === 'metric' ? '_mmph' : '_inph';
      case 'wind_gust':
      case 'wind_speed':
        return units === 'metric' ? '_kmph' : '_mph';
      case 'sea_level_pressure':
        return units === 'metric' ? '_hpa' : '_inhg';
      case 'ozone':
        return '_du';
      default:
        return '';
    }
  }

  render() {
    const {
      coordinates,
      fieldControl,
      mapField,
      timeControl,
      units,
      zoom
    } = this.props;

    const uom = this.uom(units);

    const url = `https://maps.darksky.net/@${mapField},${coordinates[1].toString()},${coordinates[0].toString()},${zoom.toString()}?embed=true&timeControl=${timeControl.toString()}&fieldControl=${fieldControl.toString()}&defaultField=${mapField}&defaultUnits=${uom}`;

    return (
      <section className={`${styles.map} embed`} ref="map">
        <iframe frameBorder="0" title="Map" src={url} />
      </section>
    );
  }
}

export default Map;
