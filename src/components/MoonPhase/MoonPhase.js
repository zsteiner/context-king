import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import styles from './MoonPhase.module.scss';

function MoonPhase({ moonPhase }) {
  let phase = 'New';
  let moonIcon = 'MoonNew';

  switch (true) {
    case moonPhase === 0:
      phase = 'New';
      moonIcon = 'MoonNew';
      break;
    case moonPhase > 0 && moonPhase < 0.25:
      phase = 'Waxing Crescent';
      moonIcon = 'MoonWaxingCrescent';
      break;
    case moonPhase === 0.25:
      phase = 'First Quarter';
      moonIcon = 'MoonFirstQuarter';
      break;
    case moonPhase > 0.25 && moonPhase < 0.5:
      phase = 'Waxing Gibbous';
      moonIcon = 'MoonWaxingGibbous';
      break;
    case moonPhase === 0.5:
      phase = 'Full Moon';
      moonIcon = 'MoonFull';
      break;
    case moonPhase > 0.5 && moonPhase < 0.75:
      phase = 'Waning Gibbous';
      moonIcon = 'MoonWaningGibbous';
      break;
    case moonPhase === 0.75:
      phase = 'Last Quarter';
      moonIcon = 'MoonLastQuarter';
      break;
    case moonPhase > 0.75 && moonPhase < 1:
      phase = 'Waning Crescent';
      moonIcon = 'MoonWaningCrescent';
      break;
    default:
      phase = 'New';
      moonIcon = 'MoonNew';
  }

  return (
    <span title={`Lunation number ${moonPhase}`}>
      <WeatherIcon icon={moonIcon} className={styles.moon} />
      {phase}
    </span>
  );
}

MoonPhase.propTypes = {
  moonPhase: PropTypes.number,
};
export default MoonPhase;
