// 감시

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input
  .shift()
  .split(' ')
  .map((el) => +el);
const board = input.map((el) => el.split(' ').map((el) => +el));
const cctv = [];
let answer = 100;
const rot_size = [4, 2, 4, 4, 1];
solution();

function arr_copy(dest, src) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      dest[i][j] = src[i][j];
    }
  }
}

function update(dir, x, y) {
  dir = dir % 4;

  if (dir === 0) {
    for (let ny = y + 1; ny < M; ny++) {
      if (board[x][ny] === 6) break;
      board[x][ny] = -1;
    }
  }
  if (dir === 1) {
    for (let nx = x - 1; nx >= 0; nx--) {
      if (board[nx][y] === 6) break;
      board[nx][y] = -1;
    }
  }
  if (dir === 2) {
    for (let ny = y - 1; ny >= 0; ny--) {
      if (board[x][ny] === 6) break;
      board[x][ny] = -1;
    }
  }
  if (dir === 3) {
    for (let nx = x + 1; nx < N; nx++) {
      if (board[nx][y] === 6) break;
      board[nx][y] = -1;
    }
  }
}

function dfs(idx) {
  if (idx >= cctv.length) {
    let count = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (board[i][j] === 0) count++;
      }
    }
    answer = Math.min(answer, count);
    return;
  }
  const backup = Array.from({ length: N }, () => new Array(M).fill(null));
  const [x, y, type] = cctv[idx];
  for (let dir = 0; dir < rot_size[type]; dir++) {
    arr_copy(backup, board);

    if (type === 0) {
      update(dir, x, y);
    }
    if (type === 1) {
      update(dir, x, y);
      update(dir + 2, x, y);
    }
    if (type === 2) {
      update(dir, x, y);
      update(dir + 1, x, y);
    }
    if (type === 3) {
      update(dir, x, y);
      update(dir + 1, x, y);
      update(dir + 2, x, y);
    }
    if (type === 4) {
      update(dir, x, y);
      update(dir + 1, x, y);
      update(dir + 2, x, y);
      update(dir + 3, x, y);
    }
    dfs(idx + 1);
    arr_copy(board, backup);
  }
}

function solution() {
  // 1. cctv 위치 및 타입 저장
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] !== 0 && board[i][j] !== 6) {
        cctv.push([i, j, board[i][j] - 1]);
      }
    }
  }

  // 2.dfs 수행
  dfs(0);
  console.log(answer);
}
