function solution(n) {
  const dp = [0, 3, 11];
  const index = n >> 1;

  if (n % 2 !== 0) return 0; // 홀수인 경우 방법의 수는 0

  if (index < 3) return dp[index];

  for (let i = 3; i <= index; i++) {
    dp[i] = dp[i - 1] * 3 + 2;

    for (let j = 1; j < i - 1; j++) {
      dp[i] += dp[j] * 2;
    }

    dp[i] %= 1000000007;
  }
  return dp[index];
}
