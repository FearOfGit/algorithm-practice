function solution(n, left, right) {
  const answer = [];

  // 각 원소 : max(행, 열) + 1
  // 행 구하기 -> 몫
  // 열 구하기 -> 나머지
  while (left <= right) {
    answer.push(Math.max(Math.floor(left / n), left % n) + 1);
    left += 1;
  }
  return answer;
}
