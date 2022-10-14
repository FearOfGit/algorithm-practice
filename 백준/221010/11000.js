// 강의실 배정
// 강의가 시작할 때 강의실 +1
// 강의가 끝날 때 강의실 -1

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

let [n, ...times] = input;
n = +n;
times = times.map((el) => el.split(' ').map((el) => +el));
solution();
// console.log(times);
function solution() {
  let answer = 0;
  let classroom = 0;
  const obj = [];

  for (let i = 0; i < n; i++) {
    obj.push({ time: times[i][0], start: 1 });
    obj.push({ time: times[i][1], start: -1 });
  }

  obj.sort((a, b) => (a.time === b.time ? a.start - b.start : a.time - b.time));

  obj.forEach((schedule) => {
    if (schedule.start === -1) {
      classroom -= 1;
    } else if (schedule.start === 1) {
      classroom += 1;
    }

    answer = Math.max(answer, classroom);
  });

  console.log(answer);
}
