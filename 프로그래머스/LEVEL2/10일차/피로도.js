function solution(k, dungeons) {
  const answer = [];
  const len = dungeons.length;
  const visited = [];

  function dfs(pts, cnt) {
    for (let i = 0; i < len; i++) {
      if (visited[i]) continue;
      if (pts < dungeons[i][0]) continue;
      visited[i] = true;
      dfs(pts - dungeons[i][1], cnt + 1);
      visited[i] = false;
    }

    answer.push(cnt);
  }

  dfs(k, 0);
  return Math.max(...answer);
}
