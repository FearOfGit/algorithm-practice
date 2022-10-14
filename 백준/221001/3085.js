// 사탕 게임

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.trim().split(''));

input.shift();
// console.log(input);

solution(input);

function solution(board) {
  const n = board.length;
  let max = 0;
  dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < 4; k++) {
        const nx = i + dir[k][0];
        const ny = j + dir[k][1];

        if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue;
        if (board[i][j] === board[nx][ny]) continue;

        // console.log(i, j, nx, ny);
        let temp = board[i][j];
        board[i][j] = board[nx][ny];
        board[nx][ny] = temp;

        for (let x = 0; x < n; x++) {
          let cnt = 1;
          for (let y = 1; y < n; y++) {
            if (board[x][y - 1] !== board[x][y]) {
              max = Math.max(max, cnt);
              cnt = 1;
            } else {
              cnt++;
              max = Math.max(max, cnt);
            }
          }
        }

        for (let y = 0; y < n; y++) {
          let cnt = 1;
          for (let x = 1; x < n; x++) {
            if (board[x - 1][y] !== board[x][y]) {
              max = Math.max(max, cnt);
              cnt = 1;
            } else {
              cnt++;
              max = Math.max(max, cnt);
            }
          }
        }

        temp = board[i][j];
        board[i][j] = board[nx][ny];
        board[nx][ny] = temp;
      }
    }
  }

  console.log(max);
}
