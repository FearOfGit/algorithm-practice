function solution(n, lost, reserve) {
  let answer = 0;
  const arr = Array(n + 1).fill(1);
  lost.map((i) => arr[i]--);
  reserve.map((i) => arr[i]++);

  for (let i = 1; i <= n; i++) {
    if (arr[i] >= 1) {
      answer++;
      arr[i]--;
      continue;
    }

    if (i === 1) {
      if (arr[i + 1] >= 2) {
        answer++;
        arr[i + 1]--;
      }
    } else if (i === n) {
      if (arr[i - 1] >= 1) {
        answer++;
        arr[i - 1]--;
      }
    } else {
      if (arr[i - 1] >= 1) {
        answer++;
        arr[i - 1]--;
        continue;
      }

      if (arr[i + 1] >= 2) {
        answer++;
        arr[i + 1]--;
      }
    }
  }
  return answer;
}
