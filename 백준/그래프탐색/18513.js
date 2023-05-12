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

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, K] = input[0].split(' ').map(Number);
const water = input[1].split(' ').map(Number);

const queue = new Queue();
const set = new Set();

// 불행도를 최소로 해야하기 때문에 샘물의 위치를 기준으로 bfs 수행
for (let i = 0; i < N; i++) {
  queue.push(water[i]);
  set.add(water[i]);
}

const dir = [-1, 1];
let answer = 0;
let cnt = 0;
let distance = 1;

function bfs() {
  while (!queue.isEmpty()) {
    let repeat = queue.size();

    // 특정 시점의 큐에 같이 들어있는 좌표들은 샘물과의 distance가 같다.
    while (repeat) {
      const cur = queue.front();
      queue.pop();

      for (let k = 0; k < 2; k++) {
        const next = cur + dir[k];

        if (set.has(next)) continue;

        queue.push(next);
        set.add(next);
        cnt += 1;
        answer += distance;

        if (cnt === K) return console.log(answer);
      }
      repeat -= 1;
    }
    distance += 1;
  }
}

bfs();
