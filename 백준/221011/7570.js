// 줄 세우기
// LCS(최장 공통 부분 수열) 알고리즘
// 5 2 4 1 3 -> 2, 3

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = parseInt(input[0]);
const arr = input[1].split(' ').map(Number);

solution();
function solution() {
  const dp = new Array(N + 1).fill(0);
  let max = 0;
  for (let i = 1; i <= N; i++) {
    const num = arr[i - 1];
    dp[num] = dp[num - 1] + 1;
    max = Math.max(max, dp[num]);
  }
  console.log(N - max);
}
