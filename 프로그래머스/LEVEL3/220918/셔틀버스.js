function solution(n, t, m, timetable) {
  timetable = timetable
    .map((str) => {
      let [hour, minute] = str.split(':');
      hour = Number(hour);
      minute = Number(minute);

      return hour * 60 + minute;
    })
    .sort((a, b) => a - b);

  let time = 540;
  for (let i = 1; i <= n; i++) {
    const len = timetable.filter((v) => v <= time).length;

    if (i === n) {
      if (len >= m) time = timetable[m - 1] - 1;
    } else {
      timetable.splice(0, len > m ? m : len);
      time += t;
    }
  }

  let hour = Math.floor(time / 60);
  let minute = time % 60;
  return (
    (hour < 10 ? '0' + hour : hour) +
    ':' +
    (minute < 10 ? '0' + minute : minute)
  );
}
