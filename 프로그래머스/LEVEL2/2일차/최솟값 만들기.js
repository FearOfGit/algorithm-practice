function solution(a, b) {
  let answer = 0;

  a.sort((a, b) => a - b);
  b.sort((a, b) => b - a);

  for (let i = 0; i < a.length; i++) {
    answer += a[i] * b[i];
  }

  return answer;
}
