// https://www.acmicpc.net/problem/13549

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, K] = input[0].split(' ').map(Number);

const visited = Array(100001).fill(false);
const queue = [];
queue.push([N, 0]);

while (queue.length) {
  const [x, time] = queue.shift();
  visited[x] = true;

  if (x === K) {
    return console.log(time);
  }

  if (x * 2 <= 100000 && !visited[x * 2]) {
    queue.unshift([x * 2, time]);
  }
  if (x < K && x < 100000 && !visited[x + 1]) {
    queue.push([x + 1, time + 1]);
  }
  if (x > 0 && !visited[x - 1]) {
    queue.push([x - 1, time + 1]);
  }
}
