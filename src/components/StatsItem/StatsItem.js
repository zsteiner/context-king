import React from 'react';
import PropTypes from 'prop-types';

import styles from './StatsItem.module.scss';

function StatsItem({
  children, label, value, title,
}) {
  return (
    <div className={styles.statsItem} title={title}>
      {children || (
        <>
          <strong>{label}</strong>
          {value}
        </>
      )}
    </div>
  );
}

StatsItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  title: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
};

export default StatsItem;
