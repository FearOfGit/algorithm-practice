const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const board = Array.from({ length: 40 }, () => Array(40).fill(0));
let index = 1;
let R;
let C;
let sticker;
let T = 0;

while (T++ < K) {
  [R, C] = input[index].split(" ").map(Number);
  const r = R;
  sticker = Array.from({ length: 10 }, () => Array(10));

  for (let i = index + 1; i < index + R + 1; i++) {
    const temp = input[i].split(" ").map(Number);
    for (let j = 0; j < C; j++) {
      sticker[i - (index + 1)][j] = temp[j];
    }
  }

  if (isAttach()) {
    index += R + 1;
    continue;
  }

  for (let k = 0; k < 3; k++) {
    rotate();
    if (isAttach()) break;
  }

  index += r + 1;
}

console.log([].concat(...board).filter((el) => el === 1).length);

function isAttach() {
  // 스티커가 노트북의 범위를 초과하지 않는 선에서 탐색
  for (let i = 0; i < N - R + 1; i++) {
    for (let j = 0; j < M - C + 1; j++) {
      if (check(i, j)) {
        attach(i, j);

        return true;
      }
    }
  }
  return false;
}

function attach(x, y) {
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      const nx = x + i;
      const ny = y + j;

      if (sticker[i][j] === 1) board[nx][ny] = 1;
    }
  }
}

function check(x, y) {
  // 현재 위치(x, y)에서 스티커 범위 만큼 탐색
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      const nx = x + i;
      const ny = y + j;

      if (sticker[i][j] === 1 && board[nx][ny] === 1) return false;
    }
  }

  return true;
}

function rotate() {
  const arr = Array.from({ length: 10 }, () => Array(10));

  // 배열 90도 돌리기 (오른쪽)
  for (let i = 0; i < C; i++) {
    for (let j = 0; j < R; j++) {
      arr[i][R - 1 - j] = sticker[j][i];
    }
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      sticker[i][j] = arr[i][j];
    }
  }

  const temp = R;
  R = C;
  C = temp;
}

/*
  - 시간복잡도가 40 * 40 * 100 * 4 으로 충분히 완전 탐색으로 풀 수 있는 문제이다.
  - 노트북와 스티커를 비교할 때 스티커가 노트북의 범위를 벗어나지 않도록 범위를 지정해준다.
  - 스티커의 값도 1이고 노트북의 값도 1이면 해당 위치에 스티커를 붙일 수 없다.
  - 스티커의 세로의 길이와 가로의 길이가 다를 수 있기 때문에 회전 시 세로의 길이와 가로의 길이를 스왑해준다.
*/
