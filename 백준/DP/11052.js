const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

input = input.join('');

console.log(input);

function solution(n, arr) {
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i < j) break;
      dp[i][j] = Math.max(...dp[i - j]) + arr[j - 1];
    }
  }

  // return temp;
  return Math.max(...dp[n]);
}
