const calculateTime = (time) => {
  const [hour, min, sec] = time.split(':');
  const total = hour * 3600 + min * 60 + sec * 1;
  return total;
};

const formatterTime = (time) => {
  let HH = Math.floor(time / 3600);
  let MM = Math.floor(time / 60) % 60;
  let SS = time % 60;

  HH = HH > 9 ? HH : '0' + HH;
  MM = MM > 9 ? MM : '0' + MM;
  SS = SS > 9 ? SS : '0' + SS;

  return `${HH}:${MM}:${SS}`;
};

function solution(play_time, adv_time, logs) {
  const pt = calculateTime(play_time);
  const times = Array(pt).fill(0);

  logs.forEach((log) => {
    const [start, end] = log.split('-');

    const ws = calculateTime(start);
    const we = calculateTime(end);

    times[ws]++;
    times[we]--;
  });

  for (let k = 0; k < 2; k++) {
    for (let i = 1; i <= pt; i++) {
      times[i] += times[i - 1];
    }
  }

  const at = calculateTime(adv_time);
  let sum = times[at - 1];
  let idx = 0;

  for (let i = at - 1; i < pt; i++) {
    if (sum < times[i] - times[i - at]) {
      sum = times[i] - times[i - at];
      idx = i - at + 1;
    }
  }

  return formatterTime(idx);
}
