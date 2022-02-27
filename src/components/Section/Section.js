import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Section.module.scss';

function Section({ children, className }) {
  const sectionClasses = classNames({
    [styles.section]: true,
    [className]: className,
  });

  return <section className={sectionClasses}>{children}</section>;
}

Section.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Section;
