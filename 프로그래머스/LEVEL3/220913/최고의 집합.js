function solution(n, s) {
  if (n > s) return [-1];

  const answer = [];
  for (let i = 0; i < n; i++) {
    const number = Math.floor(s / (n - i));
    answer.push(number);
    s = s - number;
  }
  return answer;
}
