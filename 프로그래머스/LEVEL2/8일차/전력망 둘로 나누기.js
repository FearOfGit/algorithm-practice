function solution(n, wires) {
  const graph = {};

  // start: 시작노드, target: 제외노드
  function bfs(start, target) {
    let count = 0;
    const queue = [start];
    const visited = [];
    visited[start] = true;

    while (queue.length) {
      const node = queue.shift();
      graph[node].forEach((next) => {
        if (next !== target && !visited[next]) {
          visited[next] = true;
          queue.push(next);
        }
      });
      count++;
    }

    return count;
  }

  // 그래프 생성, 양방향 그래프
  wires.forEach(([a, b]) => {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  });

  let answer = 101;
  wires.forEach(([a, b]) => {
    const diff = Math.abs(bfs(a, b) - bfs(b, a));
    answer = Math.min(answer, diff);
  });
  return answer;
}
