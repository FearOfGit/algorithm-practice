function solution(grid) {
  const answer = [];
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  const [N, M] = [grid.length, grid[0].length];
  const arr = Array.from({ length: N }, () => []).map((v) => {
    for (let i = 0; i < M; i++) v.push([0, 0, 0, 0]);
    return v;
  });

  function bfs(x, y, d) {
    let cnt = 0;
    while (true) {
      if (arr[x][y][d]) break;
      arr[x][y][d] = 1;
      cnt += 1;

      if (grid[x][y] === 'L') d = [2, 3, 1, 0][d];
      if (grid[x][y] === 'R') d = [3, 2, 0, 1][d];

      x = x + dx[d];
      y = y + dy[d];
      if (x < 0) x = N - 1;
      if (x >= N) x = 0;
      if (y < 0) y = M - 1;
      if (y >= M) y = 0;
    }

    return cnt;
  }

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      for (let d = 0; d < 4; d++) {
        if (!arr[r][c][d]) {
          let cnt = bfs(r, c, d);
          if (cnt) answer.push(cnt);
        }
      }
    }
  }

  return answer.sort((a, b) => a - b);
}
