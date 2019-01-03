import React from 'react';
import PropTypes from 'prop-types';

import formatValue from './formatValue';

import Section from '../Section/Section';
import { ResponsiveLine } from '@nivo/line';

import styles from './Chart.module.scss';

const Chart = ({ data, title, format, timezone }) => {
  const tooltipFormat = value => {
    const formatted = formatValue(value, format);
    return formatted;
  };

  const tooltip = value => {
    const condition = formatValue(value.data[0].data.y, format);
    const time = new Date(value.data[0].data.x);
    const dateOptions = {
      hour: 'numeric',
      timeZone: timezone
    };

    const formatTime = time.toLocaleTimeString('en-us', dateOptions);

    return `${condition} at ${formatTime}`;
  };

  const isZero = format === 'percent' || format === 'mph';

  return (
    <Section>
      <h2 className={styles.chartTitle}>{title}</h2>
      <figure className={styles.chart}>
        <ResponsiveLine
          data={data}
          margin={{
            top: 32,
            right: 16,
            bottom: 48,
            left: 16
          }}
          xScale={{
            type: 'time',
            format: '%d/%m/%Y, %H %p',
            precision: 'hour'
          }}
          yScale={{
            type: 'linear',
            stacked: true,
            min: isZero ? 0 : 'auto',
            max: format === 'percent' ? 1 : 'auto'
          }}
          colors="hsl(0, 0%, 50%)"
          curve="cardinal"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 24,
            tickRotation: 0,
            legendOffset: 0,
            type: 'time',
            format: '%-I %p',
            precision: 'hours'
          }}
          axisLeft={null}
          dotSize={8}
          dotColor="inherit:darker(0.1)"
          enableGridX={false}
          enableGridY={false}
          dotLabel="y"
          dotLabelYOffset={-12}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          tooltipFormat={tooltipFormat}
          tooltip={tooltip}
        />
      </figure>
    </Section>
  );
};

Chart.propTypes = {
  data: PropTypes.array,
  format: PropTypes.oneOf([
    'percent',
    'number',
    'decimal',
    'mph',
    'mb',
    'mi',
    'degrees'
  ]),
  title: PropTypes.string,
  timezone: PropTypes.string
};

export default Chart;
