import React, { Component } from 'react';
import moment from 'moment';
import 'react-dates/initialize';

import { DayPickerRangeController } from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';

class Timemachine extends Component {
  constructor(props) {
    super(props);

    const currentDate = moment();
    this.state = {
      startDate: currentDate,
      endDate: null,
      focusedInput: 'startDate'
    };
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="header--strong">Time Machine</h1>
        <DayPickerRangeController
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          }
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
        />
      </React.Fragment>
    );
  }
}

export default Timemachine;
