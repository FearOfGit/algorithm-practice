function solution(n, computers) {
  let visited = [false];
  let answer = 0;

  function dfs(i) {
    visited[i] = true;

    for (let j = 0; j < n; j++) {
      if (computers[i][j] === 0) continue;
      if (visited[j]) continue;
      dfs(j);
    }
  }

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    dfs(i);
    answer++;
  }
  return answer;
}
