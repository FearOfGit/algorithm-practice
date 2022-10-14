// n의 약수이면 홀수인 수
function solution(n) {
  let answer = 0;

  for (let i = 1; i <= n; i++) {
    if (n % i === 0 && i % 2 === 1) answer++;
  }
  return answer;
}
