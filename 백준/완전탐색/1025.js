const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map((el) => +el);
const arr = Array.from({ length: N }, () => Array(M).fill(null));
let answer = -1;

for (let i = 1; i <= N; i++) {
  const temp = input[i].split("").map((el) => +el);
  for (let j = 0; j < M; j++) {
    arr[i - 1][j] = temp[j];
  }
}

// 최대 약 9 * 9 * 18 * 18
// 시작 위치 : (x, y), 등차 : (i, j)
for (let x = 0; x < N; x++) {
  for (let y = 0; y < M; y++) {
    for (let i = -N; i < N; i++) {
      for (let j = -M; j < M; j++) {
        if (i === 0 && j === 0) continue; // 등차가 없을 때

        let posX = x;
        let posY = y;
        let target = 0;

        // 등차로 증가하면서 하나씩 계속 확인한다.
        while (posX >= 0 && posX < N && posY >= 0 && posY < M) {
          target *= 10;
          target += arr[posX][posY];

          if (check(target)) answer = Math.max(answer, target);

          posX += i;
          posY += j;
        }
      }
    }
  }
}

console.log(answer);

function check(target) {
  const sqrt = Math.floor(Math.sqrt(target));

  if (sqrt * sqrt === target) return true;
  else return false;
}
