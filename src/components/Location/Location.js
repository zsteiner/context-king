/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import debounce from 'lodash/debounce';
import config from '../../config/config';

import LocationContext from '../../contexts/LocationContext';

import Input from '../Input/Input';
import LocationButton from '../LocationButton/LocationButton';
import LocationName from '../LocationName/LocationName';
import LocationResults from '../LocationResults/LocationResults';

import styles from './Location.module.scss';

const geocodingClient = mbxGeocoding({ accessToken: config.mapboxKey });

const clearText = (event) => {
  // eslint-disable-next-line no-param-reassign
  event.target.value = '';
};

class Location extends Component {
  updateLocationName = debounce((query) => {
    geocodingClient
      .forwardGeocode({
        query,
        types: ['place', 'neighborhood', 'postcode', 'address', 'poi'],
      })
      .send()
      .then((response) => {
        this.setState({
          results: response.body.features,
          resultsVisible: true,
        });
      });
  }, 500);

  constructor(props, context) {
    super(props);

    this.state = {
      coordinates: [],
      locationName: context.locationName,
      enteredLocation: '',
      results: [],
      resultsVisible: false,
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  reverseLookup = (lon, lat) => {
    const { setLoading } = this.context;

    setLoading();

    geocodingClient
      .reverseGeocode({
        query: [lon, lat],
        limit: 2,
        types: ['place'],
      })
      .send()
      .then((response) => {
        const location = response.body.features[0];
        this.selectLocation(location);
      });
  };

  getLocation = () => {
    const { sinceUpdate } = this.context;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { coordinates, location } = this.context;

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const storedCoordinates = coordinates;

        if (sinceUpdate < 30 && lon === storedCoordinates[0]) {
          this.selectLocation(location);
        } else {
          this.reverseLookup(lon, lat);
        }
      },
      // eslint-disable-next-line no-console
      (error) => console.error(error.message),
      { enableHighAccuracy: true, timeout: 40000, maximumAge: 1000 },
    );
  };

  handleChange = (event) => {
    const query = event.target.value;
    this.setState({ enteredLocation: query });

    if (query) {
      this.updateLocationName(query);
    } else {
      this.setState({
        resultsVisible: false,
      });
    }
  };

  submitLocation = (event) => {
    const { results } = this.state;

    event.preventDefault();

    if (results.length > 0) {
      this.selectLocation(results[0]);
    }
  };

  selectLocation = (location) => {
    const { setLocation } = this.context;
    const name = location.text;
    const state = location.context ? `, ${location.context[0].text}` : '';
    const locationName = `${name}${state}`;

    localStorage.setItem('storedLocationName', locationName);

    setLocation(location, locationName, location.center);

    this.setState({
      enteredLocation: locationName,
      locationName,
      resultsVisible: false,
    });
  };

  render() {
    const { enteredLocation, results, resultsVisible } = this.state;

    return (
      <LocationContext.Consumer>
        {(context) => (
          <header className={styles.location}>
            <div className={styles.row}>
              <div className={styles.typeahead}>
                <Input
                  placeholder="Enter Location"
                  onSubmit={this.submitLocation}
                  value={enteredLocation}
                  onChange={this.handleChange}
                  onFocus={clearText}
                />
                {resultsVisible ? (
                  <LocationResults
                    results={results}
                    selectLocation={this.selectLocation}
                  />
                ) : null}
              </div>
              <LocationButton onClick={this.getLocation} />
            </div>
            <LocationName
              locationName={context.locationName}
              coordinates={context.coordinates}
              forecastRefresh={context.forecastRefresh}
              fetchingForecast={context.fetchingForecast}
              updateDate={context.updateDate}
            />
          </header>
        )}
      </LocationContext.Consumer>
    );
  }
}

Location.contextType = LocationContext;
Location.propTypes = {
  coordinates: PropTypes.array,
  getLocation: PropTypes.func,
};

export default Location;
