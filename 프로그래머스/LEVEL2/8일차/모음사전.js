function solution(word) {
  const vowel = ['A', 'E', 'I', 'O', 'U'];
  const answer = [];

  function dfs(curVowel, idx) {
    if (idx === 6) return;
    answer.push(curVowel);
    for (let nextVowel of vowel) {
      dfs(curVowel + nextVowel, idx + 1);
    }
  }

  vowel.forEach((v) => {
    dfs(v, 1);
  });

  return answer.indexOf(word) + 1;
}
