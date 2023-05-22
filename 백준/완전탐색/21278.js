const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map((el) => +el);
const arr = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
let min = Infinity;
let answer;

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    if (i === j) continue;
    arr[i][j] = Infinity;
  }
}

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map((el) => +el);

  arr[a][b] = 1;
  arr[b][a] = 1;
}

// 플로이드 와샬
for (let k = 1; k <= N; k++) {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (arr[i][j] > arr[i][k] + arr[k][j]) {
        arr[i][j] = arr[i][k] + arr[k][j];
      }
    }
  }
}

// 치킨집 위치 : (i, j)
for (let i = 1; i < N; i++) {
  for (let j = i + 1; j <= N; j++) {
    let sum = 0;

    // 플로이드 와샬 알고리즘을 통해 이미 최단 거리를 구했다.
    for (let k = 1; k <= N; k++) {
      sum += Math.min(arr[k][i] * 2, arr[k][j] * 2);
    }

    if (min > sum) {
      min = sum;
      answer = [i, j];
    }
  }
}

console.log(answer[0] + " " + answer[1] + " " + min);

/*
  키친 도시에서 2개의 건물을 골라서 치킨집을 열려고 한다. 이 때 아무 곳이나 열 순 없어서 모든 건물에서의 접근성의 합을 최소화하려고 한다. 
  건물 X 의 접근성은 X 에서 가장 가까운 호석이 두마리 치킨집까지 왕복하는 최단 시간이다. 즉, "모든 건물에서 가장 가까운 치킨집까지 왕복하는 최단 시간의 총합"을 최소화할 수 있는 건물 2개를 골라서 치킨집을 열려고 하는 것이다.
*/
