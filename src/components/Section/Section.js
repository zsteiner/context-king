import React from 'react';
import classNames from 'classnames';

import styles from './Section.module.scss';

const Section = ({ children, className }) => {
  const sectionClasses = classNames({
    [styles.section]: true,
    [className]: className
  });

  return <section className={sectionClasses}>{children}</section>;
};

export default Section;
