function solution(n) {
  let answer = 0;

  // 짝수가 아닐 때 +1
  // 순간이동은 * 2, 홀수라는 건 1칸 점프로 이동했다는 것을 의미
  while (n > 0) {
    if (n % 2 !== 0) answer += 1;

    n = Math.floor(n / 2);
  }

  return answer;
}
