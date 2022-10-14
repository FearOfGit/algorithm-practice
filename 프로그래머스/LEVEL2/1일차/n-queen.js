function solution(n) {
  let answer = 0;
  const board = new Array(n + 1).fill(0);

  function dfs(idx) {
    if (idx > n) {
      answer++;
      return;
    }
    for (let i = 1; i <= n; i++) {
      board[idx] = i;
      if (isValid(idx)) dfs(idx + 1); // 백트랙킹
      board[idx] = 0;
    }
  }

  function isValid(idx) {
    for (let i = 1; i < idx; i++) {
      if (board[i] === board[idx]) return false;
      if (Math.abs(board[i] - board[idx]) === Math.abs(i - idx)) return false;
    }

    return true;
  }

  dfs(1);
  return answer;
}
