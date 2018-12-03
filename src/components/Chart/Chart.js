import React from 'react';
import PropTypes from 'prop-types';

import formatValue from './formatValue';

import Section from '../Section/Section';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory';

import styles from './Chart.module.scss';

const Chart = ({ data, title, format }) => {
  return (
    <Section>
      <h2 className={styles.chartTitle}>{title}</h2>
      <figure className={styles.chart}>
        <VictoryChart
          domainPadding={{ x: [32, 32], y: [100, 32] }}
          data={data}
          height={350}
          width={1200}
          padding={80}
          style={{
            parent: { fontSize: 16, fontFamily: 'inherit' }
          }}
          containerComponent={<VictoryVoronoiContainer />}
          x={'time'}
          y={'condition'}
        >
          <VictoryAxis
            fixLabelOverlap
            style={{
              tickLabels: { fontSize: 16, fontFamily: 'inherit' }
            }}
          />
          <VictoryAxis
            dependentAxis
            fixLabelOverlap
            domain={format === 'percent' ? [0, 1] : null}
            tickFormat={tick => `${formatValue(tick, format)}`}
            style={{
              tickLabels: { fontSize: 16, fontFamily: 'inherit' }
            }}
          />
          <VictoryLine
            labels={datum =>
              `${formatValue(datum.condition, format)} at ${datum.time}`
            }
            labelComponent={
              <VictoryTooltip
                style={{
                  fontFamily: 'inherit'
                }}
                cornerRadius={0}
              />
            }
            data={data}
            style={{
              data: {
                stroke: 'grey',
                strokeWidth: 6
              }
            }}
            interpolation="natural"
            x={'time'}
            y={'condition'}
          />
        </VictoryChart>
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
