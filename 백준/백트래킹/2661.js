const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
let answer = "";
let flag = false;

dfs(0, "");
console.log(answer);

function dfs(idx, str) {
  if (idx === N) {
    answer = str;
    flag = true;
    return;
  }

  for (let i = 1; i <= 3; i++) {
    const newStr = str + i;

    if (!check(newStr)) continue;

    dfs(idx + 1, newStr);
    if (flag) return;
  }
}

function check(str) {
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      const temp1 = str.slice(i, j);
      const temp2 = str.slice(j, j + temp1.length);

      if (temp1 === temp2) return false;
    }
  }

  return true;
}

/*
  - N의 최대 길이가 80, 그러나 최소값만 구하면 되기 때문에 백트래킹으로 구현했다.
  - 내부 for문이 1부터 시작하기 때문에 처음 목표 길이에 도달한 값이 최소값이다. 이를 구현하기 위해 flag 변수를 사용했다.
  - 새로운 문자가 만들어질 때마다 좋은수열인지 확인하고 나쁜수열일 경우 다음으로 넘어가지 않는다.
  - str값을 계속 문자열로 유지해야 하는데 처음에는 중간에 숫자로 변경되어 Number의 범위가 초과돼 문제를 틀렸다.  
*/
