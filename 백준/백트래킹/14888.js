const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input[1].split(" ").map(Number);
const op = input[2].split(" ").map(Number); // +, -, *, /
const answer = [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];

dfs(1, arr[0]);
console.log(answer[0] === 0 ? 0 : answer[0]);
console.log(answer[1] === 0 ? 0 : answer[1]);

function dfs(idx, total) {
  if (idx === N) {
    answer[0] = Math.max(answer[0], total);
    answer[1] = Math.min(answer[1], total);

    return;
  }

  for (let i = 0; i < 4; i++) {
    if (op[i] >= 1) {
      op[i] -= 1;
      let newTotal = total;

      if (i === 0) newTotal += arr[idx];
      if (i === 1) newTotal -= arr[idx];
      if (i === 2) newTotal *= arr[idx];
      if (i === 3) newTotal = parseInt(total / arr[idx]);

      dfs(idx + 1, newTotal);
      op[i] += 1;
    }
  }
}
