import getShortTime from './getShortTime';

export default function buildConditionData(condition, hourlyData, timezone) {
  let hourlyConditions = [];

  if (hourlyData) {
    hourlyData.map((item, index) => {
      const conditionValue = item[condition];
      const timeValue = getShortTime(item['time'], timezone);

      hourlyConditions.push({
        x: timeValue,
        y: conditionValue
      });
      return hourlyConditions;
    });
  }

  return hourlyConditions;
}
