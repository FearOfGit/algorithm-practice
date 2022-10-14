// 뱀(V)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());
const K = Number(input.shift());
const board = Array.from({ length: N + 2 }, () => new Array(N + 2).fill(1));
const change = [];

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    board[i][j] = 0;
  }
}

for (let i = 0; i < K; i++) {
  const [x, y] = input
    .shift()
    .split(' ')
    .map((el) => +el);
  board[x][y] = 2;
}

const L = Number(input.shift());
for (let i = 0; i < L; i++) {
  const [sec, dir] = input.shift().split(' ');
  change.push([Number(sec), dir.trim()]);
}
solution();

function solution() {
  const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let dirNum = 0;
  let time = 0;
  let head = [1, 1];
  let tail = [1, 1];
  let changeTime = change[0][0];
  const path = [];

  while (true) {
    const nx = head[0] + dir[dirNum][0];
    const ny = head[1] + dir[dirNum][1];

    if (board[nx][ny] === 1) break;

    if (board[nx][ny] === 2) {
      board[nx][ny] = 1;
      path.push([nx, ny]);
      head[0] = nx;
      head[1] = ny;
    }

    if (board[nx][ny] === 0) {
      head[0] = nx;
      head[1] = ny;
      board[nx][ny] = 1;
      path.push([nx, ny]);
      board[tail[0]][tail[1]] = 0;
      let next = path.shift();
      tail[0] = next[0];
      tail[1] = next[1];
    }

    time++;

    if (time === changeTime) {
      if (change[0][1] === 'D') {
        dirNum++;
        if (dirNum > 3) dirNum = 0;
      } else {
        dirNum--;
        if (dirNum < 0) dirNum = 3;
      }

      change.shift();
      if (change.length) changeTime = change[0][0];
      else changeTime = 0;
    }
  }

  console.log(time + 1);
}
