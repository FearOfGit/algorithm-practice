const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = Array.from({ length: N }, () => Array(N).fill(null));
const visited = Array(N).fill(false);
let answer = Infinity;

for (let i = 1; i <= N; i++) {
  const temp = input[i].split(" ").map((el) => +el);
  for (let j = 0; j < N; j++) {
    arr[i - 1][j] = temp[j];
  }
}

dfs(0);
console.log(answer);

function dfs(cnt) {
  if (cnt === N) {
    let startScore = 0;
    let linkScore = 0;

    for (let i = 0; i < N - 1; i++) {
      for (let j = i + 1; j < N; j++) {
        if (visited[i] && visited[j]) startScore += arr[i][j] + arr[j][i];
        if (!visited[i] && !visited[j]) linkScore += arr[i][j] + arr[j][i];
      }
    }

    const cand = Math.abs(startScore - linkScore);
    answer = Math.min(answer, cand);

    return;
  }

  visited[cnt] = true;
  dfs(cnt + 1);

  visited[cnt] = false;
  dfs(cnt + 1);
}

/*
  스타트 팀과 링크 팀의 능력치의 차이의 최솟값을 구한다. 이때 두 팀의 인원수는 같지 않아도 되지만, 한 명 이상이어야 한다.

  - 조합 알고리즘을 활용해 visited 배열에 true, false를 저장하여 팀을 분리한다.
  
  - 한명의 직원은 true 또는 false가 모두 될 수 있기 때문에 2번의 경우를 모두 탐색한다.
*/
