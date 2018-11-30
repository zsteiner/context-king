import React from 'react';
import * as PikaDate from 'react-pikaday-datepicker';

import styles from './Datepicker.module.scss';

const Datepicker = ({ date, onChange }) => {
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
};

export default Datepicker;
