function solution(n) {
  const answer = [];

  // 각 행에 대한 열의 개수
  for (let i = 1; i < n + 1; i++) {
    const tmp = Array(i).fill(0);
    answer.push(tmp);
  }

  let y = -1;
  let x = 0;
  let num = 1;

  // 규칙을 반영한 for문
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (i % 3 === 0) {
        y += 1;
      } else if (i % 3 === 1) {
        x += 1;
      } else {
        x -= 1;
        y -= 1;
      }

      answer[y][x] = num;
      num += 1;
    }
  }
  return [].concat(...answer);
}
