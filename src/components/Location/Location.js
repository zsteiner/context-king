import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LocationContext } from '../../contexts/LocationContext';

import Input from '../Input/Input';
import LocationButton from '../LocationButton/LocationButton';

import styles from './Location.module.scss';

class Location extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      locationName: context.locationName
    };
  }

  static contextType = LocationContext;

  static propTypes = {
    coordinates: PropTypes.array,
    getLocation: PropTypes.func
  };

  handleChange = event => {
    this.setState({ locationName: event.target.value });
    this.context.updateLocationName(event);
  };

  render() {
    return (
      <LocationContext.Consumer>
        {context => (
          <section className={styles.location}>
            <div className={styles.row}>
              <Input
                placeholder="Enter Location"
                onSubmit={context.updateLocation}
                value={this.state.locationName}
                onChange={this.handleChange}
              />
              <LocationButton onClick={context.getLocation} />
            </div>

            <h1 className={styles.locationName}>{context.locationName}</h1>
            <small>
              {context.coordinates
                ? `${context.coordinates[0]}, ${context.coordinates[1]}`
                : null}
            </small>
          </section>
        )}
      </LocationContext.Consumer>
    );
  }
}

export default Location;
