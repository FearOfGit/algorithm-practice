const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

input = input.join('');

console.log(solution(input));

function solution(str) {
  if (str[0] === '0') return 0;
  const n = str.length;
  const dp = [1, 1];

  for (let i = 2; i <= n; i++) {
    dp[i] = 0;
    if (str[i - 1] !== '0') {
      dp[i] = dp[i - 1] % 1000000;
    }
    const temp = Number(str[i - 2] + str[i - 1]);
    // console.log(temp);
    if (temp >= 10 && temp <= 26) {
      dp[i] = (dp[i] + dp[i - 2]) % 1000000;
    }
  }

  return dp[n];
}
