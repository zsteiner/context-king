import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import conditions from '../../utils/conditions';

import styles from './ConditionBar.module.scss';

const ConditionBar = ({ cloudCover, precipIntensity, precipType }) => {
  const condition = conditions(cloudCover, precipIntensity, precipType);

  const conditionClassName = condition.replace(/\s/g, '');

  const conditionClasses = classNames({
    [styles.condition]: true,
    [styles[`condition${conditionClassName}`]]: condition
  });

  return <div className={conditionClasses} title={condition} />;
};

ConditionBar.propTypes = {
  cloudCover: PropTypes.number,
  precipIntensity: PropTypes.number,
  precipType: PropTypes.string
};

export default ConditionBar;
