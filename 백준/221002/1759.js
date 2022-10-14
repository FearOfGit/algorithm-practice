// 암호 만들기

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [L, C] = input
  .shift()
  .split(' ')
  .map((el) => +el);
const arr = input[0].split(' ').sort();
solution(L, C, arr);

function solution(L, C, arr) {
  const answer = [];
  const vowel = ['a', 'e', 'i', 'o', 'u'];
  const prev = [];
  function dfs(cnt, start) {
    if (cnt === L) {
      const len1 = prev.filter((el) => vowel.includes(el)).length;
      const len2 = prev.filter((el) => !vowel.includes(el)).length;

      if (len1 >= 1 && len2 >= 2) answer.push([...prev]);
      return;
    }

    for (let i = start; i < C; i++) {
      prev.push(arr[i]);
      dfs(cnt + 1, i + 1);
      prev.pop();
    }
  }

  dfs(0, 0);

  console.log(answer.map((el) => el.join('')).join('\n'));
}
