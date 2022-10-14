function solution(n, words) {
  const answer = [0, 0];
  const duplicate = [];
  let target = -1;

  for (let i = 0; i < words.length; i++) {
    if (i > 0) {
      let prev = words[i - 1];
      let cur = words[i];
      if (prev[prev.length - 1] !== cur[0]) {
        target = i;
        break;
      }
    }

    if (duplicate.length && duplicate.includes(words[i])) {
      target = i;
      break;
    }

    if (words[i].length === 1) {
      target = i;
      return;
    }

    duplicate.push(words[i]);
  }

  if (target === -1) return [0, 0];

  answer[0] = (target % n) + 1;
  answer[1] = Math.floor(target / n) + 1;

  return answer;
}
