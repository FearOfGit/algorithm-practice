const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const eggs = []; // [내구도, 무게], 내구도 - 무게, 내구도 > 무게무게
let answer = 0;

for (let i = 1; i <= N; i++) eggs.push(input[i].split(" ").map(Number));

dfs(0);
console.log(answer);

function dfs(idx) {
  answer = Math.max(answer, eggs.filter((egg) => egg[0] <= 0).length);

  if (idx === N) return;

  const [s, w] = eggs[idx];

  // 손에 들 계란이 깨진 경우
  if (s <= 0) {
    dfs(idx + 1);
    return;
  }

  for (let target = 0; target < N; target++) {
    const [s, w] = eggs[target];
    if (idx === target) continue; // 같은 계란 예외 처리
    if (s <= 0) continue; // 칠 계란이 깨진 경우

    eggs[idx][0] -= eggs[target][1];
    eggs[target][0] -= eggs[idx][1];

    dfs(idx + 1);

    eggs[idx][0] += eggs[target][1];
    eggs[target][0] += eggs[idx][1];
  }
}

/*
  - 왼쪽부터 마지막 계란까지 손에 들 계란을 증가시켜야 하기 때문에 재귀를 돌 때마다 idx를 증가시킨다.
  - 재귀 함수 내부 for문에서는 아직 깨지지 않은 계란을 선택해 치는 작업을 수행한다.
  - 재귀를 돌고 복귀할 때 반드시 계란의 내구성을 원상복구 해준다.
*/
