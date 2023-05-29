const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0]; // 일정의 개수
const arr = [];
const calendar = new Array(365 + 1).fill(0);
let w = 0;
let h = 0;
let answer = 0;

for (let i = 1; i <= N; i++) {
  const plan = input[i].split(" ").map(Number);

  arr.push(plan);
}

// 시작 날짜가 빠른순으로 정렬
arr.sort((arr1, arr2) => {
  if (arr1[0] === arr2[0]) return arr2[1] - arr1[1];
  return arr1[0] - arr2[0];
});

for (const [start, end] of arr) {
  for (let day = start; day <= end; day++) {
    calendar[day] += 1;
  }
}

for (let i = 1; i <= 365; i++) {
  if (calendar[i] >= 1) {
    w += 1;
    h = Math.max(h, calendar[i]);
  }

  if (calendar[i] === 0 || i === 365) {
    answer += w * h;
    w = 0;
    h = 0;
  }
}

console.log(answer);
