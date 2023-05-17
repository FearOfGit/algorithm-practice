const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const S = input[0].trim();
const T = input[1].trim();
let answer = 0;

dfs(T);

console.log(answer);

function dfs(t) {
  if (S === t) {
    answer = 1;

    return;
  }

  if (t.length === 0) return;

  if (t[t.length - 1] === "A") dfs(t.slice(0, t.length - 1));

  if (t[0] === "B") dfs([...t.slice(1)].reverse().join(""));
}

/*
  문자열 S를 문자열 T로 바꿀 수 있는지 구한다. 바꿀 수 있으면 1, 없으면 0을 출력한다.

  - 발상의 전환이 필요한 문제였다. 구현을 할 때는 문자열 T를 문자열 S로 바꾸는 방식으로 해야 한다.

  - 마지막 문자가 'A' 이면 해당 문자를 제거하고 DFS를 수행한다. (1)

  - 첫 번째 문자가 'B' 이면 해당 문자를 제거하고 전체 문자열을 뒤집어서 DFS를 수행한다. (2)

  - 문자열에서 동시에 1과 2의 상황있을 수 있다. 따라서 2가지 경우를 모두 고려해준다.
*/
