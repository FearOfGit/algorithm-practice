const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = Array.from({ length: N }, () => Array(M).fill(0));
let answer = 0; // 2 * 2 사각형을 이루지 않는 모든 배치의 가짓수

dfs(0, 0);
console.log(answer);
function dfs(x, y) {
  if (x === N) {
    for (let i = 0; i < N - 1; i++) {
      for (let j = 0; j < M - 1; j++) {
        if (
          arr[i][j] === 1 &&
          arr[i][j] === arr[i + 1][j] &&
          arr[i][j] === arr[i][j + 1] &&
          arr[i][j] === arr[i + 1][j + 1]
        ) {
          return;
        }
      }
    }

    answer += 1;
    return;
  }

  const nx = y + 1 === M ? x + 1 : x;
  const ny = y + 1 === M ? 0 : y + 1;

  // 해당 위치에 넴모를 배치하거나 안하거나
  arr[x][y] = 1;
  dfs(nx, ny);

  arr[x][y] = 0;
  dfs(nx, ny);
}

/*
 - 모든 위치에 넴모를 배치한 경우 그렇지 않은 경우 2가지 탐색을 모두 진행한다.
*/
