const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, K] = input[0].split(' ').map(Number);

const queue = [];
const visited = Array(100001).fill(false);
queue.push([N, 0]);

while (queue.length) {
  const [x, cnt] = queue.shift();
  visited[x] = true;

  if (x === K) {
    return console.log(cnt);
  }

  if (x * 2 <= 100000 && !visited[x * 2]) {
    queue.unshift([x * 2, cnt]);
  }

  if (x < K && x < 100000 && !visited[x + 1]) {
    queue.push([x + 1, cnt + 1]);
  }

  if (x > 0 && !visited[x - 1]) {
    queue.push([x - 1, cnt + 1]);
  }
}
