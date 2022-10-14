// 구슬 탈출2(V)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input
  .shift()
  .split(' ')
  .map((el) => +el);
const board = input.map((el) => el.trim().split(''));

solution(N, M, board);

function solution(N, M, board) {
  const start = {};
  const visited = new Set();

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 'R') {
        start.rx = i;
        start.ry = j;
      }

      if (board[i][j] === 'B') {
        start.bx = i;
        start.by = j;
      }
    }
  }

  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const queue = [[start.rx, start.ry, start.bx, start.by, 0]];
  visited.add(
    String(start.rx) + String(start.ry) + String(start.bx) + String(start.by)
  );

  function bfs() {
    while (queue.length) {
      const [rx, ry, bx, by, count] = queue.shift();
      if (count > 10) return -1;
      // if (board[rx][ry] === 'O' && board[bx][by] === 'O') return -1;
      if (board[rx][ry] === 'O' && board[bx][by] !== 'O') return count;

      for (let k = 0; k < 4; k++) {
        let next_rx = rx;
        let next_ry = ry;
        let next_bx = bx;
        let next_by = by;

        while (true) {
          if (
            board[next_rx][next_ry] !== '#' &&
            board[next_rx][next_ry] !== 'O'
          ) {
            next_rx += dir[k][0];
            next_ry += dir[k][1];
          } else {
            if (board[next_rx][next_ry] === '#') {
              next_rx -= dir[k][0];
              next_ry -= dir[k][1];
            }
            break;
          }
        }

        while (true) {
          if (
            board[next_bx][next_by] !== '#' &&
            board[next_bx][next_by] !== 'O'
          ) {
            next_bx += dir[k][0];
            next_by += dir[k][1];
          } else {
            if (board[next_bx][next_by] === '#') {
              next_bx -= dir[k][0];
              next_by -= dir[k][1];
            }
            break;
          }
        }

        if (next_rx === next_bx && next_ry === next_by) {
          if (board[next_rx][next_ry] !== 'O') {
            const r_dist = Math.abs(next_rx - rx) + Math.abs(next_ry - ry);
            const b_dist = Math.abs(next_bx - bx) + Math.abs(next_by - by);

            if (r_dist > b_dist) {
              next_rx -= dir[k][0];
              next_ry -= dir[k][1];
            } else {
              next_bx -= dir[k][0];
              next_by -= dir[k][1];
            }
          }
        }
        const temp =
          String(next_rx) + String(next_ry) + String(next_bx) + String(next_by);
        if (visited.has(temp)) continue;

        visited.add(temp);
        queue.push([next_rx, next_ry, next_bx, next_by, count + 1]);
      }
    }

    return -1;
  }

  const answer = bfs();
  console.log(answer);
}
