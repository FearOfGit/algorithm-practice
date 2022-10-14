function solution(numbers, target) {
  let answer = 0;
  let len = numbers.length;
  function dfs(num, idx) {
    if (len === idx) {
      if (num === target) answer++;
      return;
    }

    dfs(num + numbers[idx], idx + 1);
    dfs(num - numbers[idx], idx + 1);
  }

  dfs(0, 0);
  return answer;
}
