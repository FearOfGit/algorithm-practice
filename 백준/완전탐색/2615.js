const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const board = Array.from({ length: 19 }, () => Array(19).fill(null));
const dir = [
  [1, 0],
  [0, 1],
  [1, 1],
  [-1, 1],
];

for (let i = 0; i < 19; i++) {
  const temp = input[i].split(" ").map((el) => +el);
  for (let j = 0; j < 19; j++) {
    board[i][j] = temp[j];
  }
}

for (let i = 0; i < 19; i++) {
  for (let j = 0; j < 19; j++) {
    if (board[i][j] !== 0) {
      if (search(i, j)) {
        console.log(board[i][j]);
        console.log(i + 1, j + 1);

        return;
      }
    }
  }
}

console.log(0);

function search(x, y) {
  const target = board[x][y];

  for (let k = 0; k < 4; k++) {
    let cnt = 1;
    let nx = x + dir[k][0];
    let ny = y + dir[k][1];

    while (
      nx >= 0 &&
      nx < 19 &&
      ny >= 0 &&
      ny < 19 &&
      board[nx][ny] === target
    ) {
      cnt += 1;

      if (cnt === 5) {
        const bx = x - dir[k][0];
        const by = y - dir[k][1];
        const fx = nx + dir[k][0];
        const fy = ny + dir[k][1];

        if (
          bx >= 0 &&
          bx < 19 &&
          by >= 0 &&
          by < 19 &&
          board[bx][by] === target
        )
          break;
        if (
          fx >= 0 &&
          fx < 19 &&
          fy >= 0 &&
          fy < 19 &&
          board[fx][fy] === target
        )
          break;

        return true;
      }

      nx += dir[k][0];
      ny += dir[k][1];
    }
  }

  return false;
}
