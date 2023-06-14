const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const dp = new Array(n + 1).fill(0);
dp[1] = 1;
let min;

for (let i = 2; i <= n; i++) {
  min = Infinity;
  for (let j = 1; j * j <= i; j++) {
    const tmp = i - j * j;
    min = Math.min(min, dp[tmp]);
  }

  dp[i] = min + 1;
}

console.log(dp[n]);
