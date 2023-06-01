const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0]; // 수식의 길이
const expression = input[1].trim();
let answer = -Infinity;

dfs(0, 0);
console.log(answer);

function dfs(idx, total) {
  if (idx > N - 1) {
    answer = Math.max(answer, total);
    return;
  }

  const preOp = idx === 0 ? "+" : expression[idx - 1]; // 이전 수식과 연결하는 연산

  // 괄호 적용하기
  if (idx + 2 < N) {
    const temp = calc(
      Number(expression[idx]),
      expression[idx + 1],
      Number(expression[idx + 2])
    );
    dfs(idx + 4, calc(total, preOp, temp));
  }

  // 괄호 적용 안하기
  dfs(idx + 2, calc(total, preOp, Number(expression[idx])));
}

function calc(a, op, b) {
  if (op === "+") {
    return a + b;
  } else if (op === "-") {
    return a - b;
  } else {
    return a * b;
  }
}

/*
  - 코드 구조를 신경쓰지 않고 풀 수 있는 방법이 생각이 났는데 깔끔하게 구현하고 싶어서 해당 방법을 사용하지 않았다.
  - 문자열인 수식을 순차적으로 탐색하며 상황에 맞게 idx를 증가시킨다.
  - dfs를 수행할 때 '괄호로 묶은 경우'와 '괄호로 묶지 않은 경우'를 모두 수행해준다.
  - 이전 수식과 계산을 연결할 때와 괄호를 묶어 계산할 때 calc함수를 재사용했다.
  - 최댓값이 음수가 될 수 있기 때문에 answer의 초기값을 -Infinity로 설정했다.
*/
