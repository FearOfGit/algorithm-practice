const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((el) => +el);

input.shift();
const arr = solution(Math.max(...input));
for (let i = 0; i < input.length; i++) {
  console.log(arr[input[i]]);
}
function solution(n) {
  const dp = [0, 1, 2, 4];

  for (let i = 4; i <= n; i++) {
    dp[i] = (dp[i - 3] + dp[i - 2] + dp[i - 1]) % 1000000009;
  }

  return dp;
}
