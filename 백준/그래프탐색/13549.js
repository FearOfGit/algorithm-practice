const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, K] = input[0].split(' ').map(Number);
const MAX_SIZE = 100000 + 1;

function bfs() {
  const queue = [N];
  const visited = [];
  visited[N] = 1;

  while (queue.length) {
    const currentPos = queue.shift();

    if (currentPos === K) return visited[K] - 1;

    if (currentPos * 2 < MAX_SIZE && !visited[currentPos * 2]) {
      queue.unshift(currentPos * 2);
      visited[currentPos * 2] = visited[currentPos];
    }

    if (currentPos + 1 < MAX_SIZE && !visited[currentPos + 1]) {
      queue.push(currentPos + 1);
      visited[currentPos + 1] = visited[currentPos] + 1;
    }

    if (currentPos - 1 >= 0 && !visited[currentPos - 1]) {
      queue.push(currentPos - 1);
      visited[currentPos - 1] = visited[currentPos] + 1;
    }
  }
}

console.log(bfs());
