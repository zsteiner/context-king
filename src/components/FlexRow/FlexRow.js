import React from 'react';
import classNames from 'classnames';

import styles from './FlexRow.module.scss';

const FlexRow = ({ children, className }) => {
  const rowClasses = classNames({
    [styles.row]: true,
    [className]: className
  });

  return <div className={rowClasses}>{children}</div>;
};

export default FlexRow;
