function solution(N, stages) {
  let answer = [];
  let people = stages.length;
  for (let i = 1; i <= N + 1; i++) {
    let tmp = stages.filter((v) => v === i).length;
    answer.push([i, tmp / people]);
    people -= tmp;
  }
  answer.pop(); // N + 1은 모두 클리어
  answer = answer.sort((a, b) => b[1] - a[1]);
  return answer.map((v) => v[0]);
}
