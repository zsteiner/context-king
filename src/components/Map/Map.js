import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';

import styles from './Map.module.scss';

class Map extends Component {
  static propTypes = {
    coordinates: PropTypes.array
  };

  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoienN0ZWluZXIiLCJhIjoiTXR4U0tyayJ9.6BxBAjPyMHbt1YfD5HWGXA';
    this.map = new mapboxgl.Map({
      container: this.refs.map,
      center: this.props.coordinates,
      zoom: 8,
      style: 'mapbox://styles/mapbox/outdoors-v10'
    });
  }

  render() {
    return <section className={styles.map} ref="map" />;
  }
}

export default Map;
