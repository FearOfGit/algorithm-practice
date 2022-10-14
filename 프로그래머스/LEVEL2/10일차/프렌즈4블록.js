function solution(m, n, board) {
  let answer = 0;
  board = board.map((v) => v.split(''));

  while (true) {
    const arr = [];

    // 1. 제거되는 영역 구하기
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (
          board[i][j] &&
          board[i][j] === board[i][j + 1] &&
          board[i][j] === board[i + 1][j] &&
          board[i][j] === board[i + 1][j + 1]
        ) {
          arr.push([i, j]);
        }
      }
    }

    // 종료조건
    if (!arr.length) {
      return [].concat(...board).filter((v) => !v).length;
    }

    // 2. 제거된 영역 0으로 설정하기
    arr.forEach(([row, col]) => {
      board[row][col] = 0;
      board[row][col + 1] = 0;
      board[row + 1][col] = 0;
      board[row + 1][col + 1] = 0;
    });

    // 3. 블록 배치 업데이트
    for (let i = m - 1; i > 0; i--) {
      // 해당 행에 0인 부분이 없으면
      if (!board[i].some((v) => !v)) continue;

      for (let j = 0; j < n; j++) {
        for (let k = i - 1; k >= 0 && !board[i][j]; k--) {
          if (board[k][j]) {
            board[i][j] = board[k][j];
            board[k][j] = 0;
          }
        }
      }
    }
  }
  return answer;
}
