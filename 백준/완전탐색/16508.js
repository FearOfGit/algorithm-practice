const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const str = input[0].trim();
const N = +input[1];
const book = [];
let answer = Infinity;

for (let i = 2; i < 2 + N; i++) {
  const [price, name] = input[i].split(" ");

  book.push([Number(price), name.trim()]);
}

dfs(0, [...str], 0);

console.log(answer === Infinity ? -1 : answer);

function dfs(total, target, start) {
  if (target.length === 0) {
    answer = Math.min(answer, total);
    return;
  }

  // 조합 알고리즘
  for (let i = start; i < N; i++) {
    let newTarget = [...target];
    const [price, name] = book[i];

    for (const ch of name) {
      const index = newTarget.indexOf(ch);

      if (index !== -1) {
        newTarget.splice(index, 1).join("");
      }
    }

    dfs(total + price, newTarget, i + 1);
  }
}

/*
  - N과 W의 범위가 크지 않다고 생각해서 조합 알고리즘을 통해 구현했고 다행히 시간초과가 발생하지 않았다.
  - 하나의 전공서적 이름의 문자를 탐색하여 찾는 단어가 있으면 제거하고 다음 dfs로 이동한다.
  - 단어의 모든 문자가 제거된 경우 최소 가격을 갱신하고 dfs를 종료한다.
  - 자바스크립트에서 배열은 참조값이라서 원본 배열을 훼손시키지 않기 위해 깊은 복사를 수행했다.
*/
