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

const N = +input[0];
const arr = Array(N + 1).fill(0);
let visited;
const answer = [];

for (let i = 1; i <= N; i++) arr[i] = +input[i];

for (let i = 1; i <= N; i++) {
  visited = Array(N + 1).fill(false);

  if (dfs(i, i)) answer.push(i);
}

console.log(answer.length + "\n" + answer.join("\n"));

function dfs(start, current) {
  if (!visited[current]) {
    visited[current] = true;

    return dfs(start, arr[current]);
  } else {
    if (start === current) return true;

    return false;
  }
}
