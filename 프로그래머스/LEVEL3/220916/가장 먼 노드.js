function solution(n, edge) {
  let answer = Array(n + 1).fill(0);
  const graph = {};
  for (let i = 0; i < edge.length; i++) {
    const [v1, v2] = edge[i];
    if (!graph[v1]) graph[v1] = [];
    if (!graph[v2]) graph[v2] = [];
    graph[v1].push(v2);
    graph[v2].push(v1);
  }

  const queue = [];
  const visited = Array(n + 1).fill(false);
  queue.push(1);
  visited[1] = true;
  while (queue.length) {
    let node = queue.shift();
    let arr = graph[node];

    arr.forEach((idx) => {
      if (!visited[idx]) {
        answer[idx] = answer[node] + 1;
        queue.push(idx);
        visited[idx] = true;
      }
    });
  }

  let max = Math.max(...answer);
  answer = answer.filter((el) => el === max);
  return answer.length;
}
