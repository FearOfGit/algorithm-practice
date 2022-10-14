/*
 현재 단어에서 갈 수 있는 모든 단어로 이동
*/
function solution(begin, target, words) {
  if (!words.includes(target)) return 0;

  let answer = 0;
  const visited = [];
  const queue = [];

  queue.push([begin, 0]);
  while (queue.length) {
    let [v, cnt] = queue.shift();

    if (v === target) return cnt;

    words.forEach((word) => {
      let count = 0;

      if (visited.includes(word)) return;

      for (let i = 0; i < word.length; i++) {
        if (v[i] !== word[i]) count++;
      }

      if (count === 1) {
        queue.push([word, cnt + 1]);
        visited.push(word);
      }
    });
  }
  return answer;
}
