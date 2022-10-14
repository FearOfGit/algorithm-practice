function solution(board, moves) {
  let answer = 0;
  const stack = [];
  moves.map((move) => {
    const col = move - 1;

    for (let row = 0; row < board.length; row++) {
      if (board[row][col] >= 1) {
        if (stack.length > 0 && stack[stack.length - 1] === board[row][col]) {
          stack.pop();
          answer += 2;
        } else {
          stack.push(board[row][col]);
        }
        board[row][col] = 0;
        break;
      }
    }
  });
  return answer;
}
