/*
  A가 B를 이기고 B가 C를 이기면 A는 C를 이긴다.
  한 선수가 자기 자신을 제외하고 모든 선수와 지고 이김을 매길 수 있다면
  최종적으로 순위를 매길 수 있다.
*/
function solution(n, results) {
  // 1. 2차원 DP 배열 생성
  const board = Array.from({ length: n }, () => new Array(n).fill(false));

  results.forEach(([a, b]) => {
    board[a - 1][b - 1] = true;
  });

  // 2. 플로이드-와샬 알고리즘 수행
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][k] && board[k][j]) {
          board[i][j] = true;
        }
      }
    }
  }

  // 3. 선수의 수 구하기
  let answer = 0;
  for (let i = 0; i < n; i++) {
    let cnt = 0;
    for (let j = 0; j < n; j++) {
      if (board[i][j] || board[j][i]) cnt++;
    }
    if (cnt === n - 1) answer++;
  }
  return answer;
}
