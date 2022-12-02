// https://www.acmicpc.net/problem/18513

class Queue {
  constructor() {
    this.dat = [];
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.dat[this.tail++] = item;
  }

  pop() {
    this.head++;
  }

  front() {
    return this.dat[this.head];
  }

  rear() {
    return this.dat[this.tail - 1];
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return Math.abs(this.head - this.tail);
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, K] = input[0].split(' ').map(Number);
const water = input[1].split(' ').map(Number);

// console.log(N, K, water);
const queue = new Queue();
const set = new Set();

for (let i = 0; i < N; i++) {
  queue.push(water[i]);
  set.add(water[i]);
}

const dir = [1, -1];
let distance = 1;
let cnt = 0;
let answer = 0;

while (!queue.isEmpty()) {
  let size = queue.size();
  while (size--) {
    const cur = queue.front();
    queue.pop();

    for (let k = 0; k < 2; k++) {
      const next = cur + dir[k];
      if (set.has(next)) continue;
      set.add(next);
      queue.push(next);
      cnt++;
      answer += distance;
      if (cnt === K) return console.log(answer);
    }
  }
  distance++;
}
console.log(answer);
