// imos법
function solution(board, skill) {
  let answer = 0;
  const row = board.length;
  const col = board[0].length;
  const imos = Array.from(Array(row + 1), () => Array(col + 1).fill(0));

  skill.forEach(([type, r1, c1, r2, c2, degree]) => {
    imos[r1][c1] += type === 1 ? -degree : degree;
    imos[r1][c2 + 1] += type === 1 ? degree : -degree;
    imos[r2 + 1][c1] += type === 1 ? degree : -degree;
    imos[r2 + 1][c2 + 1] += type === 1 ? -degree : degree;
  });

  for (let i = 0; i < row; i++) {
    let sum = 0;

    for (let j = 0; j < col; j++) {
      sum += imos[i][j];
      imos[i][j] = sum;
    }
  }

  for (let i = 0; i < col; i++) {
    let sum = 0;

    for (let j = 0; j < row; j++) {
      sum += imos[j][i];
      imos[j][i] = sum;
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      board[i][j] += imos[i][j];

      if (board[i][j] > 0) answer++;
    }
  }
  return answer;
}
