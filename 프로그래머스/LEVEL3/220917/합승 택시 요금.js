/*
 플로이드-와샬 알고리즘
 - 모든 정점에서 각각의 정점으로 향하는 최단 경로

  S(시작지점)에서 A, B로 이동하는 최소 택시 요금을 구해야한다.
  택시 요금을 가중치라고 볼 수 있고 최단 거리를 구하는 문제라고 보면 된다.
  여기까지는 다익스트라 알고리즘을 사용해서도 구할 수 있다.
  그러나 문제에서는 '합승' 이라는 개념이 존재한다.
  따라서 플로이드-와샬 알고리즘을 사용해야 한다.
  기본값은 S -> A + S -> B이고 모든 노드는 합승하는 곳이 될 수 있다.
*/
function solution(n, s, a, b, fares) {
  // 1. 2차원 DP배열 생성
  const board = Array.from({ length: n }, () => new Array(n).fill(Infinity));

  for (let i = 0; i < n; i++) {
    board[i][i] = 0; // 자기 자신
  }

  fares.forEach(([x, y, w]) => {
    board[x - 1][y - 1] = w;
    board[y - 1][x - 1] = w;
  });

  // 2. 플로이드 와샬 알고리즘 수행 (200 * 200 * 200)
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][k] + board[k][j] < board[i][j]) {
          board[i][j] = board[i][k] + board[k][j];
        }
      }
    }
  }

  // 3. 최소 합승 요금 구하기
  let answer = board[s - 1][a - 1] + board[s - 1][b - 1]; // 합승 없을 때

  // 모든 노드를 합승하는 곳으로 설정
  for (let i = 0; i < n; i++) {
    let cand = board[s - 1][i] + board[i][a - 1] + board[i][b - 1];
    answer = Math.min(answer, cand);
  }

  return answer;
}
