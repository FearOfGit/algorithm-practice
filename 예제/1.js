// 이걸 왜 틀렷지 ㅅㅂ
function solution(puzzle, word) {
  const row = 4;
  const col = 4;
  const wordLen = word.length;
  let check;
  const visited = Array.from({ length: row }, () => new Array(col).fill(false));
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  function dfs(x, y) {
    for (let k = 0; k < 4; k++) {
      const nx = x + dx[k];
      const ny = y + dy[k];

      if (nx < 0 || ny < 0 || nx >= row || ny >= col) continue;
      if (visited[nx][ny]) continue;
      const next = puzzle[nx][ny];
      const index = word.indexOf(next);
      if (index === -1) continue;
      if (check[index] === 1) continue;
      check[index] = 1;
      visited[nx][ny] = true;
      dfs(nx, ny);
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (visited[i][j]) continue;
      const target = puzzle[i][j];
      const index = word.indexOf(target);
      if (index !== -1) {
        check = new Array(wordLen).fill(0);
        check[index] = 1;
        visited[i][j] = true;
        dfs(i, j);
        const size = check.filter((el) => el === 1).length;
        if (size === wordLen) return true;
      }
    }
  }

  return false;
}

console.log(
  solution(
    [
      ['게', '양', '콘', '사'],
      ['보', '린', '스', '세'],
      ['루', '을', '먹', '어'],
      ['마', '블', '틴', '요'],
    ],
    '게보린을먹어요'
  )
);
