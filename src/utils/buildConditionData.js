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

    hourlyData.map((item) => {
      const conditionValue = item[conditionKey];
      const timeValue = getDate(item.time, timezone);

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
