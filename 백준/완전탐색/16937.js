const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [H, W] = input[0].split(" ").map(Number);
const N = +input[1];
const cand = [];
let answer = 0;

for (let i = 2; i < 2 + N; i++) {
  cand.push(input[i].split(" ").map(Number));
}

/*
  - r1 c1, r2 c2
  - c1 r1, r2 c2
  - r1 c1, c2 r2
  - c1 r1, c2 r2
  (각각에 대해서 가로 및 세로로 연결)
*/
for (let i = 0; i < N - 1; i++) {
  for (let j = i + 1; j < N; j++) {
    const [r1, c1] = cand[i];
    const [r2, c2] = cand[j];

    // r1 c1, r2 c2
    if (r1 + r2 <= H && Math.max(c1, c2) <= W)
      answer = Math.max(answer, r1 * c1 + r2 * c2);
    if (Math.max(r1, r2) <= H && c1 + c2 <= W)
      answer = Math.max(answer, r1 * c1 + r2 * c2);

    // c1 r1, r2 c2
    if (c1 + r2 <= H && Math.max(r1, c2) <= W)
      answer = Math.max(answer, r1 * c1 + r2 * c2);
    if (Math.max(c1, r2) <= H && r1 + c2 <= W)
      answer = Math.max(answer, r1 * c1 + r2 * c2);

    // r1 c1, c2 r2
    if (r1 + c2 <= H && Math.max(c1, r2) <= W)
      answer = Math.max(answer, r1 * c1 + r2 * c2);
    if (Math.max(r1, c2) <= H && c1 + r2 <= W)
      answer = Math.max(answer, r1 * c1 + r2 * c2);

    // c1 r1, c2 r2
    if (c1 + c2 <= H && Math.max(r1, r2) <= W)
      answer = Math.max(answer, r1 * c1 + r2 * c2);
    if (Math.max(c1, c2) <= H && r1 + r2 <= W)
      answer = Math.max(answer, r1 * c1 + r2 * c2);
  }
}

console.log(answer);

/*
  - 전체 스티커의 갯수와 상관없이 2개의 스티커만 붙이면 되기 때문에 이중 for문을 사용했다.
  - 두 스티커는 4가지 케이스로 붙여질 수 있다. (기본, 기본), (기본, 90도 회전), (90도 회전, 기본), (90도 회전, 90도 회전)
  - 각 케이스마다 두 스티커를 가로와 세로 모두 연결할 수 있다.
  - 가로로 연결한 경우 너비는 더하기가 되고 높이는 최댓값이 된다. 반면, 세로로 연결한 경우 너비는 최댓값이 되고 높이는 더하기가 된다.
*/
