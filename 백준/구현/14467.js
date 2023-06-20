const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const cows = Array(10 + 1).fill(-1);
const arr = [];
let answer = 0;

for (let i = 1; i <= N; i++) {
  arr.push(input[i].split(" ").map(Number));
}

for (let i = 0; i < N; i++) {
  const [cow, pos] = arr[i];

  if (cows[cow] !== -1 && cows[cow] !== pos) answer += 1;

  cows[cow] = pos;
}

console.log(answer);
