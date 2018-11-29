import React, { Component } from 'react';

import Datepicker from '../components/Datepicker/Datepicker';

class Timemachine extends Component {
  constructor(props) {
    super(props);

    const currentDate = new Date();
    this.state = {
      date: currentDate
    };
  }

  render() {
    const { date } = this.state;
    const dateOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-us', dateOptions);

    return (
      <React.Fragment>
        <h1 className="header--strong">Time Machine</h1>
        <p>Selected date is {formattedDate}</p>
        <Datepicker date={date} onChange={date => this.setState({ date })} />
      </React.Fragment>
    );
  }
}

export default Timemachine;
