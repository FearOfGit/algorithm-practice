const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = Array.from({ length: N }, () => Array(N));
const visited = Array.from({ length: N }, () => Array(N).fill(false));
let answer = Infinity;

for (let i = 1; i <= N; i++) {
  const temp = input[i].split(" ").map(Number);
  for (let j = 0; j < N; j++) {
    arr[i - 1][j] = temp[j];
  }
}

dfs(0);
console.log(answer);

function dfs(cnt) {
  if (cnt === N) {
    let start = 0; // true
    let link = 0; // false

    // 앞에서 계산한 케이스를 뒤에서 다시 계산할 필요는 없다.
    for (let i = 0; i < N - 1; i++) {
      for (let j = i + 1; j < N; j++) {
        if (visited[i] && visited[j]) {
          start += arr[i][j] + arr[j][i];
        }

        if (!visited[i] && !visited[j]) {
          link += arr[i][j] + arr[j][i];
        }
      }
    }

    answer = Math.min(answer, Math.abs(start - link));
    return;
  }

  visited[cnt] = true;
  dfs(cnt + 1);

  visited[cnt] = false;
  dfs(cnt + 1);
}

/*
  - N이 최대 20이라 팀이 될 수 있는 모든 조합을 완전 탐색으로 풀 수 있을까 걱정했는데 완전 탐색으로 풀 수 있는게 신기했다.
  - dfs의 인수로 전달되는 cnt를 하나의 직원의 번호로 생각하여 구현했다. 
  - dfs를 한번 돌릴 때 해당 직원이 스타트 팀(true)과 링크 팀(false)가 되는 경우를 모두 수행했다.
  - 하나의 팀에 0명 있는 경우를 예외 처리해주지 않은 이유는 그 때의 값은 최솟값이 될 수 없기 때문이다.
*/
