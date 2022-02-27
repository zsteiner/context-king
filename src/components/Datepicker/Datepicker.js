import React from 'react';
import PropTypes from 'prop-types';

import * as PikaDate from 'react-pikaday-datepicker';

import styles from './Datepicker.module.scss';

function Datepicker({ date, onChange }) {
  return (
    <div className={styles.date}>
      <PikaDate
        value={date}
        onChange={onChange}
        className={styles.dateInput}
        bound={false}
      />
    </div>
  );
}

Datepicker.propTypes = {
  date: PropTypes.string,
  onChange: PropTypes.func,
};

export default Datepicker;
