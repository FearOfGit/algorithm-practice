const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const question = [];
let answer = 0;

for (let i = 1; i <= N; i++) {
  question.push(input[i].split(" ").map(Number));
}

// 가능한 모든 세자리 숫자를 탐색
for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    for (let k = 1; k <= 9; k++) {
      if (i === j || j === k || i === k) continue; // 중복 처리
      let check = 0;

      for (const [target, s, b] of question) {
        const str = "" + target;
        const cur = String(i) + String(j) + String(k);
        const count = [0, 0];

        for (let l = 0; l < str.length; l++) {
          const index = cur.indexOf(str[l]);

          if (index === l) count[0] += 1;
          else if (index !== -1) count[1] += 1;
        }

        if (s === count[0] && b === count[1]) check += 1;
      }
      if (check === N) answer += 1;
    }
  }
}

console.log(answer);

/*
  - 시간복잡도가 최악의 경우 약 9 * 9 * 9 * 100 * 3 * 3으로 충분히 완전 탐색으로 풀 수 있었다.
  - 세자리 숫자 중 중복이 존재하는 경우에는 해당 숫자는 확인하지 않고 넘어갔다.
  - 해당 문자의 스트라이크와 볼을 구하는 과정에서 indexOf를 사용했다.
  - check 변수를 통해 모든 조건이 만족하는 경우에 answer 값을 +1 증가시켰다.
*/
