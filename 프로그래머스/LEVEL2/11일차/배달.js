function solution(N, road, K) {
  var answer = 0;

  // 거리 및 인접 배열 초기화
  const dist = Array(N + 1).fill(Infinity);
  const adj = Array.from({ length: N + 1 }, () => []);

  // 인접 배열 설정
  road.forEach(([a, b, c]) => {
    adj[a].push({ to: b, time: c });
    adj[b].push({ to: a, time: c });
  });

  // 시작
  const pq = [1];
  dist[1] = 0;

  while (pq.length) {
    const node = pq.pop();

    adj[node].forEach((next) => {
      if (dist[next.to] > dist[node] + next.time) {
        dist[next.to] = dist[node] + next.time;
        pq.push(next.to);
      }
    });
  }

  return dist.filter((el) => el <= K).length;
}
