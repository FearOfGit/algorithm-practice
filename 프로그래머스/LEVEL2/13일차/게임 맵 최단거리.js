function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, -1, 1];
  const visited = Array.from(Array(n), () => Array(m).fill(false));

  const queue = [[0, 0]];
  maps[n - 1][m - 1] = -1;

  while (queue.length > 0) {
    let [x, y] = queue.shift();

    for (let k = 0; k < 4; k++) {
      let nx = x + dx[k];
      let ny = y + dy[k];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (maps[nx][ny] === 0) continue;
      if (visited[nx][ny]) continue;

      maps[nx][ny] = maps[x][y] + 1;
      visited[nx][ny] = true;
      queue.push([nx, ny]);
    }
  }
  return maps[n - 1][m - 1];
}
