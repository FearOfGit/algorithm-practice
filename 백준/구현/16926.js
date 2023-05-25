const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M, R] = input[0].split(" ").map(Number);
const arr = Array.from({ length: N }, () => Array(M).fill(null));
let visited;
let r = 0;
let answer = "";

for (let i = 1; i <= N; i++) {
  const temp = input[i].split(" ").map(Number);
  for (let j = 0; j < M; j++) {
    arr[i - 1][j] = temp[j];
  }
}

while (r++ < R) {
  visited = Array.from({ length: N }, () => Array(M).fill(false));
  rotate();
}

for (let i = 0; i < N; i++) {
  answer += arr[i].join(" ");
  answer += "\n";
}

console.log(answer);

function rotate() {
  const temp = Array.from({ length: N }, () => Array(M).fill(null));
  const count = Math.floor(Math.min(M, N) / 2);

  for (let k = 0; k < count; k++) {
    let x = k;
    let y = k;

    while (!visited[x][y]) {
      visited[x][y] = true;

      if (x === k && y !== M - 1 - k) {
        temp[x][y] = arr[x][y + 1];
        y += 1;
      } else if (y === M - 1 - k && x !== N - 1 - k) {
        temp[x][y] = arr[x + 1][y];
        x += 1;
      } else if (x === N - 1 - k && y !== k) {
        temp[x][y] = arr[x][y - 1];
        y -= 1;
      } else if (y === k && x !== k) {
        temp[x][y] = arr[x - 1][y];
        x -= 1;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      arr[i][j] = temp[i][j];
    }
  }
}
