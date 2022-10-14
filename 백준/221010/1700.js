// 멀티탭 스케줄링

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
const used = new Array(K + 1);
let answer = 0;
// console.log(N, K);
// console.log(arr);
// solution();
function solution() {
  let idx = 0;
  let cnt = 0;
  // 멀티탭 채우기
  while (true) {
    if (cnt === N) break;
    if (!used[arr[idx]]) {
      used[arr[idx]] = true;
      cnt++;
    }
    idx++;
  }

  while (idx < K) {
    if (!used[arr[idx]]) {
      const list = [];
      for (let i = idx; i < K; i++) {
        if (used[arr[i]] && !list.includes(arr[i])) {
          list.push(arr[i]); // 현재 사용주인 제품 중 앞으로 또 사용될 제품
        }
      }

      // 현재 사용주인 제품 중 모든 제품이 앞으로 또 사용될 경우
      // 가장 마지막에 사용될 제품을 제거
      if (list.length === N) {
        const target = list.pop();
        used[target] = false;
      } else {
        for (let i = 1; i <= K; i++) {
          if (used[i] && !list.includes(i)) {
            used[i] = false;
            break;
          }
        }
      }

      used[arr[idx]] = true;
      answer++;
    }

    idx++;
  }

  console.log(answer);
}
