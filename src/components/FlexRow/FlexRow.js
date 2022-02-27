import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './FlexRow.module.scss';

function FlexRow({ children, className }) {
  const rowClasses = classNames({
    [styles.row]: true,
    [className]: className,
  });

  return <div className={rowClasses}>{children}</div>;
}

FlexRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default FlexRow;
