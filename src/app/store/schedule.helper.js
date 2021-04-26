import moment from 'moment';

export const formatAndCompressSchedule = (schedule, calendarDate) => {
  if (!schedule) return [];
  const filterByMonth = schedule.filter(({ date }) => date && moment(date).isSame(calendarDate, 'month'));

  const removeNonIndicativeTime = filterByMonth.map((data) => ({
    ...data,
    time: data.time?.filter((t) => (t.time || t).endsWith('00')) || [],
  }));

  const compressDateAndTime = removeNonIndicativeTime.map(({ time, type, date }) => ({
    [type]: time.map((t) => `${date.substr(-2)}${(t.time || t).substr(0, 2)}`),
  }));

  return compressDateAndTime.reduce((acum, value) => {
    const [key, v] = Object.entries(value)[0];

    return { ...acum, [key]: [...(acum[key] || []), ...v] };
  }, {});
};

export const formatBeforePostRequest = (selected, calendarDate, timeStep) => {
  const dateMap = selected.reduce((acum, ddhh) => {
    const dd = moment(calendarDate).date(ddhh.slice(0, 2)).format('YYYY-MM-DD');
    const hh = ddhh.slice(2);

    const timeArr = new Array(60 / timeStep)
      .fill('')
      .map((v, i) => {
        const m = i * timeStep;
        return `${hh}:${m < 10 ? `0${m}` : m}`;
      });

    acum.set(dd, [...(acum.get(dd) || []), ...timeArr]);
    return acum;
  }, new Map());

  const timeMap = [...dateMap].reduce((acum, [date, time]) => {
    const timeKey = JSON.stringify(time);

    acum.set(timeKey, [...(acum.get(timeKey) || []), date]);
    return acum;
  }, new Map());

  return timeMap;
};

export const formatBeforeRemoveRequest = (selected, calendarDate) => selected
  .reduce((acum, ddhh) => {
    const dd = moment(calendarDate).date(ddhh.slice(0, 2)).format('YYYY-MM-DD');

    return acum.includes(dd) ? acum : [...acum, dd];
  }, []);
