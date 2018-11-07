import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LocationContext } from '../../contexts/LocationContext';

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
          <section>
            <form onSubmit={context.updateLocation}>
              <input
                placeholder="Enter Location"
                value={this.state.locationName}
                onChange={this.handleChange}
              />
            </form>
            <button onClick={this.props.getLocation}>
              use current location
            </button>
            <p>
              {context.coordinates[0]}, {context.coordinates[1]}
            </p>
            <p>{context.locationName}</p>
          </section>
        )}
      </LocationContext.Consumer>
    );
  }
}

export default Location;
