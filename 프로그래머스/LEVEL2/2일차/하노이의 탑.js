function solution(n) {
  const answer = [];

  function dfs(n, src, dst, mid) {
    if (n === 1) {
      answer.push([src, dst]);
    } else {
      dfs(n - 1, src, mid, dst);
      answer.push([src, dst]);
      dfs(n - 1, mid, dst, src);
    }
  }

  dfs(n, 1, 3, 2);
  return answer;
}
