const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
let answer = 0;

dfs(0, 0);
console.log(S === 0 ? answer - 1 : answer); // S가 0인 경우 초기값을 포함하기 때문에 -1

function dfs(cnt, sum) {
  if (cnt === N) {
    if (sum === S) answer += 1;
    return;
  }

  // 현재값을 포함
  dfs(cnt + 1, sum + arr[cnt]);
  // 현재값을 포함하지 않음
  dfs(cnt + 1, sum);
}
