const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const words = [];
let result = [];
let answer = "";
let visited;

for (let i = 1; i <= N; i++) words.push(input[i].trim().split("").sort());

for (const word of words) {
  result = [];
  visited = new Array(word.length).fill(false);

  dfs(word, "", 0);

  if (answer !== "") answer += "\n";
  answer += result.join("\n");
}

console.log(answer);

function dfs(word, str, idx) {
  if (idx === word.length) {
    result.push(str);
    return;
  }

  for (let i = 0; i < word.length; i++) {
    if (
      result.length !== 0 &&
      result[result.length - 1].slice(0, idx + 1) === str + word[i]
    )
      continue;
    if (visited[i]) continue;

    visited[i] = true;
    dfs(word, str + word[i], idx + 1);
    visited[i] = false;
  }
}
