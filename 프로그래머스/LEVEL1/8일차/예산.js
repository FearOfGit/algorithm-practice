function solution(d, budget) {
  let answer = 0;
  const arr = d.sort((a, b) => a - b);
  for (let i = 0; i < d.length; i++) {
    if (budget - arr[i] >= 0) {
      answer++;
      budget -= arr[i];
    } else {
      break;
    }
  }
  return answer;
}
