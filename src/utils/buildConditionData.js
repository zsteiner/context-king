export default function buildConditionData(condition, hourlyData) {
  let hourlyConditions = [];

  if (hourlyData) {
    hourlyData.map((item, index) => {
      const conditionValue = item[condition];
      const timeValue = item['time'];

      hourlyConditions.push({
        time: timeValue,
        condition: conditionValue
      });
      return hourlyConditions;
    });
  }

  return hourlyConditions;
}
