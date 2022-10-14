function solution(n, paths, gates, summits) {
  // 그래프 생성
  const graph = Array.from({ length: n + 1 }, () => []);
  paths.forEach(([a, b, w]) => {
    graph[a].push([w, b]);
    graph[b].push([w, a]);
  });

  // 도착점에서 연결되는 거 제거
  for (let summit of summits) {
    graph[summit] = [];
  }

  let queue = gates;
  const dp = new Array(n + 1).fill(Infinity);
  gates.forEach((v) => (dp[v] = -1));

  while (queue.length) {
    let set = new Set();
    while (queue.length) {
      const node = queue.shift();
      for (let [w, next] of graph[node]) {
        const max = Math.max(dp[node], w);
        if (dp[next] > max) {
          dp[next] = max;
          set.add(next);
        }
      }
    }
    queue = [...set];
  }

  const res = summits.map((v) => [v, dp[v]]);
  res.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }

    return a[1] - b[1];
  });
  return res[0];
}
