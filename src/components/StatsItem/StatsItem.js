import React from 'react';
import PropTypes from 'prop-types';

import styles from './StatsItem.module.scss';

const StatsItem = ({ children, label, value }) => {
  return (
    <div className={styles.statsItem}>
      {children ? (
        children
      ) : (
        <React.Fragment>
          <strong>{label}</strong> {value}
        </React.Fragment>
      )}
    </div>
  );
};

StatsItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  value: PropTypes.any
};

export default StatsItem;
