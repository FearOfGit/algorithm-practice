const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map((el) => +el);
const arr = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));
let count = 0;

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map((el) => +el);

  arr[a][b] = true;
  arr[b][a] = true;
}

for (let i = 1; i <= N; i++) {
  for (let j = i + 1; j <= N; j++) {
    if (arr[i][j]) continue;

    for (let k = j + 1; k <= N; k++) {
      if (arr[i][k] || arr[j][k]) continue;

      count += 1;
    }
  }
}

console.log(count);
