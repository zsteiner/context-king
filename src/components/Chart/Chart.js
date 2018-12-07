import React from 'react';
import PropTypes from 'prop-types';

import formatValue from './formatValue';

import Section from '../Section/Section';
import { ResponsiveLine } from '@nivo/line';

import styles from './Chart.module.scss';

const Chart = ({ data, title, format }) => {
  const tooltipFormat = value => {
    const formatted = formatValue(value, format);
    return formatted;
  };

  return (
    <Section>
      <h2 className={styles.chartTitle}>{title}</h2>
      <figure className={styles.chart}>
        <ResponsiveLine
          data={[{ data: data }]}
          margin={{
            top: 32,
            right: 16,
            bottom: 32,
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
            min: 'auto',
            max: 'auto'
          }}
          colors="hsl(0, 0%, 50%)"
          curve="cardinal"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
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
    'degrees'
  ]),
  title: PropTypes.string
};

export default Chart;
