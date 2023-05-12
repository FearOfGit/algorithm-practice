class Queue {
  constructor() {
    this.data = [];
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.data[this.tail++] = item;
  }

  pop() {
    this.head++;
  }

  front() {
    return this.data[this.head];
  }

  rear() {
    return this.data[this.tail - 1];
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return Math.abs(this.head - this.tail);
  }
}

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map((el) => +el);
const [S, E] = input[M + 1].split(" ").map((el) => +el);
const graph = [];
const visited = [];
const answer = [];

for (let i = 1; i <= N; i++) {
  graph[i] = [];
  visited[i] = [false, []];
}

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map((el) => +el);

  graph[a].push(b);
  graph[b].push(a);
}

// 딱히 의미가 있는거 같지는 않음, 어차피 길이를 구하는 문제
for (let i = 1; i <= N; i++) {
  graph[i].sort((a, b) => a - b);
}

bfs(S, E);
answer[0] = visited[E][1].length - 1;

const temp = [...visited[E][1]];
for (let i = 1; i <= N; i++) visited[i] = [false, []];
for (const node of temp) visited[node][0] = true;
visited[S][0] = false;
visited[E][0] = false;

bfs(E, S);
answer[1] = visited[S][1].length - 1;

console.log(answer[0] + answer[1]);

function bfs(s, e) {
  const queue = new Queue();
  queue.push(s);
  visited[s][0] = true;

  while (!queue.isEmpty()) {
    const x = queue.front();
    queue.pop();
    visited[x][1].push(x);

    if (x === e) return; // 이 문제는 반드시 경로가 존재한다.

    for (const next of graph[x]) {
      if (visited[next][0]) continue;

      visited[next][0] = true;
      visited[next][1] = [...visited[x][1]];
      queue.push(next);
    }
  }
}
