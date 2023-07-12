const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const board = Array.from({ length: 9 }, () => Array(9));
for (let i = 0; i < 9; i++) {
  const temp = input[i].split(" ").map(Number);
  for (let j = 0; j < 9; j++) {
    board[i][j] = temp[j];
  }
}
let answer = "";
let flag = false;
const arr = [];
let cnt = 0;

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (board[i][j] !== 0) continue;

    cnt += 1;
    arr.push([i, j]);
  }
}

dfs(0);
console.log(answer);

function dfs(idx) {
  if (idx === cnt) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        answer += board[i][j] + " ";
      }
      answer += "\n";
    }
    flag = true;

    return;
  }

  const [x, y] = arr[idx];
  for (let i = 1; i <= 9; i++) {
    board[x][y] = i;

    if (!check(x, y)) continue;

    dfs(idx + 1);
    if (flag) return;
  }

  board[x][y] = 0;
}

function check(x, y) {
  for (let i = 0; i < 9; i++) {
    if (i !== y && board[x][y] === board[x][i]) return false;
    if (i !== x && board[x][y] === board[i][y]) return false;
  }

  const startX = Math.floor(x / 3);
  const startY = Math.floor(y / 3);

  for (let i = 3 * startX; i < 3 * startX + 3; i++) {
    for (let j = 3 * startY; j < 3 * startY + 3; j++) {
      if (i !== x && j !== y && board[i][j] === board[x][y]) return false;
    }
  }

  return true;
}
