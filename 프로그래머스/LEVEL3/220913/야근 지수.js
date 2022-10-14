function solution(n, works) {
  let answer = 0;

  const len = works.length;
  works.sort((a, b) => b - a);
  while (n) {
    const max = works[0];

    for (let i = 0; i < len; i++) {
      if (works[i] >= max) {
        works[i]--;
        n--;
      }
      if (!n) break;
    }
  }

  for (let i = 0; i < works.length; i++) {
    if (works[i] <= 0) continue;

    answer += Math.pow(works[i], 2);
  }
  return answer;
}
