function solution(fees, records) {
  const cars = {};

  records.forEach((v) => {
    let [time, car, type] = v.split(' ');
    let [hour, minute] = time.split(':');

    time = hour * 60 + Number(minute);

    // time: 누적 시간, car: 정렬 시 사용
    if (!cars[car]) {
      cars[car] = { time: 0, car };
    }

    // type: out이 없는 차량 확인
    cars[car].type = type;

    if (type === 'OUT') {
      cars[car].time += time - cars[car].lastInTime;
      return;
    }

    // lastInTime: 마지막 입차 시간
    cars[car].lastInTime = time;
  });
  return Object.values(cars)
    .sort((a, b) => a.car - b.car)
    .map((v) => {
      // 1439 = 23:59
      if (v.type === 'IN') {
        v.time += 1439 - v.lastInTime;
      }

      if (fees[0] >= v.time) return fees[1];

      return fees[1] + Math.ceil((v.time - fees[0]) / fees[2]) * fees[3];
    });
}
