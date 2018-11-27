import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Map.module.scss';

class Map extends Component {
  static propTypes = {
    coordinates: PropTypes.array
  };

  render() {
    const { coordinates } = this.props;

    const field = 'radar';
    const zoom = 7;
    const timeControl = false;
    const fieldControl = false;

    const url = `https://maps.darksky.net/@${field},${coordinates[1]},${
      coordinates[0]
    },${zoom}?embed=true&timeControl=${timeControl}&fieldControl=${fieldControl}&defaultField=${field}`;

    return (
      <section className={`${styles.map} embed`} ref="map">
        <iframe frameBorder="0" title="Map" src={url} />
      </section>
    );
  }
}

export default Map;
