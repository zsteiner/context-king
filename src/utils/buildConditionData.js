import getDate from './getDate';

export default function buildConditionData(
  conditionList,
  hourlyData,
  timezone,
) {
  const hourlyConditions = {};

  conditionList.map((item) => {
    const specificConditions = [];
    const conditionKey = item;

    hourlyData.map((hourlyDataItem) => {
      const conditionValue = hourlyDataItem[conditionKey];
      const timeValue = getDate(hourlyDataItem.time, timezone);

      specificConditions.push({
        x: timeValue,
        y: conditionValue,
      });
      return specificConditions;
    });

    hourlyConditions[conditionKey] = [
      {
        id: conditionKey,
        data: specificConditions,
      },
    ];
    return hourlyConditions;
  });

  return hourlyConditions;
}
