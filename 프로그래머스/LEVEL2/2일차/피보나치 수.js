function solution(n) {
  const answer = [0, 1];
  // if (n <= 1) return answer[n];

  for (let i = 2; i <= n; i++) {
    answer[i] = (answer[i - 2] + answer[i - 1]) % 1234567;
  }
  return answer[n];
}
