import React, { Component } from 'react';
import PropTypes from 'prop-types';

import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import debounce from 'lodash/debounce';
import config from '../../config/config';

import { LocationContext } from '../../contexts/LocationContext';

import Input from '../Input/Input';
import LocationButton from '../LocationButton/LocationButton';
import LocationName from '../LocationName/LocationName';
import LocationResults from '../LocationResults/LocationResults';

import styles from './Location.module.scss';

const geocodingClient = mbxGeocoding({ accessToken: config.mapboxKey });

class Location extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      coordinates: [],
      locationName: context.locationName,
      enteredLocation: '',
      results: [],
      resultsVisible: false
    };
  }

  static contextType = LocationContext;

  static propTypes = {
    coordinates: PropTypes.array,
    getLocation: PropTypes.func
  };

  reverseLookup = (lon, lat) => {
    this.context.setLoading();
    geocodingClient
      .reverseGeocode({
        query: [lon, lat],
        limit: 2,
        types: ['place']
      })
      .send()
      .then(response => {
        const location = response.body.features[0];
        this.selectLocation(location);
      });
  };

  getLocation = () => {
    const sinceUpdate = this.context.sinceUpdate;

    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const storedCoordinates = this.context.coordinates;

        if (sinceUpdate < 30 && lon === storedCoordinates[0]) {
          this.selectLocation(this.context.location);
        } else {
          this.reverseLookup(lon, lat);
        }
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 40000, maximumAge: 1000 }
    );
  };

  updateLocationName = debounce(query => {
    geocodingClient
      .forwardGeocode({
        query: query,
        types: ['place', 'neighborhood', 'postcode', 'address', 'poi']
      })
      .send()
      .then(response => {
        this.setState({
          results: response.body.features,
          resultsVisible: true
        });
      });
  }, 500);

  handleChange = event => {
    const query = event.target.value;
    this.setState({ enteredLocation: query });

    if (query) {
      this.updateLocationName(query);
    } else {
      this.setState({
        resultsVisible: false
      });
    }
  };

  submitLocation = event => {
    event.preventDefault();

    if (this.state.results.length > 0) {
      this.selectLocation(this.state.results[0]);
    }
  };

  selectLocation = location => {
    const name = location.text;
    const state = location.context ? `, ${location.context[0].text}` : '';
    const locationName = `${name}${state}`;

    localStorage.setItem('storedLocationName', locationName);

    this.context.setLocation(location, locationName, location.center);

    this.setState({
      enteredLocation: locationName,
      locationName: locationName,
      resultsVisible: false
    });
  };

  clearText = event => {
    event.target.value = '';
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    return (
      <LocationContext.Consumer>
        {context => (
          <header className={styles.location}>
            <div className={styles.row}>
              <div className={styles.typeahead}>
                <Input
                  placeholder="Enter Location"
                  onSubmit={this.submitLocation}
                  value={this.state.enteredLocation}
                  onChange={this.handleChange}
                  onFocus={this.clearText}
                />
                {this.state.resultsVisible ? (
                  <LocationResults
                    results={this.state.results}
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

export default Location;
