// 2048(V)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());
const board = input.map((el) =>
  el
    .trim()
    .split(' ')
    .map((el) => +el)
);

// console.log(board);
solution();

function solution() {
  let answer = 0;

  function dfs(board, cnt) {
    if (cnt === 5) {
      answer = Math.max(answer, getMax(board));
      return;
    }

    for (let k = 0; k < 4; k++) {
      const newBoard = up(board);
      dfs(newBoard, cnt + 1);
      rotate(board);
    }
  }

  dfs(board, 0);
  console.log(answer);
}

function rotate(board) {
  const temp = Array.from({ length: N }, () => new Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      temp[i][j] = board[N - j - 1][i];
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      board[i][j] = temp[i][j];
    }
  }
}

function up(board) {
  const temp = Array.from({ length: N }, () => new Array(N).fill(0));

  for (let j = 0; j < N; j++) {
    let target = -1;
    let flag = 0;
    for (let i = 0; i < N; i++) {
      if (board[i][j] === 0) continue;

      if (flag === 1 && board[i][j] === temp[target][j]) {
        temp[target][j] *= 2;
        flag = 0;
      } else {
        temp[++target][j] = board[i][j];
        flag = 1;
      }
    }
    for (++target; target < N; target++) {
      temp[target][j] = 0;
    }
  }

  return temp;
}

function getMax(board) {
  let result = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      result = Math.max(result, board[i][j]);
    }
  }

  return result;
}
