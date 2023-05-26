const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = input[0].trim();
let min = Infinity;
let max = 0;

dfs(N, 0);

console.log(min, max);

/*
   1 - 2, 3, 4
   2 - 3, 4
   3 - 4
*/
function dfs(str, cnt) {
  if (str.length >= 3) {
    for (let i = 1; i < str.length; i++) {
      for (let j = i + 1; j < str.length; j++) {
        const a = str.slice(0, i);
        const b = str.slice(i, j);
        const c = str.slice(j);

        const newStr = String(Number(a) + Number(b) + Number(c));
        dfs(newStr, cnt + check(newStr));
      }
    }
  } else if (str.length === 2) {
    const newStr = String(Number(str[0]) + Number(str[1]));
    dfs(newStr, cnt + check(newStr));
  } else if (str.length === 1) {
    min = Math.min(min, cnt + check(N));
    max = Math.max(max, cnt + check(N));
  }
}

function check(str) {
  let count = 0;

  for (const x of str) count += Number(x) % 2;

  return count;
}
