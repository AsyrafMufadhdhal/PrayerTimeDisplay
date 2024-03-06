export const filterData = (prayerTimeList) => {
  function shapeData(prayerTimes) {
    // Convert data to array with object as value on each index
    let lists = [],
      i = 0;
    for (let data in prayerTimes) {
      lists[i] = {};
      lists[i][data] = prayerTimes[data];
      i++;
    }
    return lists;
  }

  delete prayerTimeList.date;
  delete prayerTimeList.tanggal;

  return shapeData(prayerTimeList);
};

export const checkNext = (prayerTime, minutesHour) => {
  let i = 0;
  let check = String(Object.values(prayerTime[i])) <= minutesHour;

  // console.log(prayerTime);
  while (check) {
    i++;
    if (i < prayerTime.length) {
      check = String(Object.values(prayerTime[i])) <= minutesHour;
    } else {
      check = false;
    }
  }

  if (i < prayerTime.length) {
    return prayerTime[i];
  } else {
    return prayerTime[0];
  }
};
