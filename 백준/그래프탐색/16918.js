const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [R, C, N] = input[0].split(" ").map((el) => +el);
const map = Array.from({ length: R }, () => Array(C).fill(null));
const bombtime = Array.from({ length: R }, () => Array(C).fill(0));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let time = 1;

for (let i = 1; i <= R; i++) {
  const temp = input[i].split("");
  for (let j = 0; j < C; j++) {
    map[i - 1][j] = temp[j];
    if (temp[j] === "O") bombtime[i - 1][j] = 3;
  }
}

while (time <= N) {
  if (time % 2 === 0) {
    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        if (map[i][j] === ".") {
          map[i][j] = "O";
          bombtime[i][j] = time + 3;
        }
      }
    }
  } else {
    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        if (bombtime[i][j] === time) {
          map[i][j] = ".";

          for (let k = 0; k < 4; k++) {
            const nx = i + dir[k][0];
            const ny = j + dir[k][1];

            if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;

            if (map[nx][ny] === "O" && bombtime[nx][ny] !== time) {
              map[nx][ny] = ".";
              bombtime[nx][ny] = 0;
            }
          }
        }
      }
    }
  }

  time += 1;
}

let answer = "";
for (let i = 0; i < R; i++) {
  answer += map[i].join("");
  answer += "\n";
}

console.log(answer);

/*
  폭탄을 설치해놓은 초기 상태가 주어졌을 때, N초가 흐른 후의 격자판 상태를 구한다.

  - bombtime 배열에 폭탄이 터져야 하는 시간을 저장한다.

  - while문을 통해 N까지 time을 증가시키며 3과 4를 반복한다.

  - 인접한 곳의 폭탄을 파괴시킬 때 현재 time에 폭발되어지는 폭탄은 파괴하지 않는다.
*/
