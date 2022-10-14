const getNextPosition = (left, right, board) => {
  const result = [];
  const X = 0;
  const Y = 1;
  const moves = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; // 상, 하, 좌, 우

  // 회전하지 않은 상태에서 이동
  for (const move of moves) {
    const [dx, dy] = move;
    const next_left = [left[X] + dx, left[Y] + dy];
    const next_right = [right[X] + dx, right[Y] + dy];

    if (
      board[next_left[X]][next_left[Y]] === 0 &&
      board[next_right[X]][next_right[Y]] === 0
    ) {
      result.push([next_left, next_right]);
    }
  }

  // 회전 경우의 수
  // 회전이 가능한 경우
  // 가로 상태일 때, left, right 모두 위, 아래에 벽이 없거나 범위를 벗어나지 않음
  // 세로 상태일 때, left, right 모두 좌, 우에 벽이 없거나 범위를 벗어나지 않음
  const toward = [-1, 1];

  if (left[X] === right[X]) {
    for (const dx of toward) {
      if (
        board[left[X] + dx][left[Y]] === 0 &&
        board[right[X] + dx][right[Y]] === 0
      ) {
        result.push([left, [left[X] + dx, left[Y]]]);
        result.push([[right[X] + dx, right[Y]], right]);
      }
    }
  } else {
    for (const dy of toward) {
      if (
        board[left[X]][left[Y] + dy] === 0 &&
        board[right[X]][right[Y] + dy] === 0
      ) {
        result.push([[left[X], left[Y] + dy], left]);
        result.push([right, [right[X], right[Y] + dy]]);
      }
    }
  }

  return result;
};
function solution(board) {
  const N = board.length;
  // 문제에서 좌표가 (1, 1)로 시작한다는 점과
  // 회전 또는 이동시 범위가 벗어나는 문제를 해결하기 위해
  // N + 2로 설정
  const newBoard = Array.from({ length: N + 2 }, () => Array(N + 2).fill(1));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 0, 0 -> 1, 1
      // 0, 1 -> 1, 2
      newBoard[i + 1][j + 1] = board[i][j];
    }
  }

  const goal = N + '' + N;
  const queue = [[[1, 1], [1, 2], 0]];
  const visit = new Set(['1112']);

  // BFS 수행
  while (queue.length) {
    const [left, right, count] = queue.shift();

    // left, right 중 하나라도 목적지에 도착하면 return
    if (left.join('') === goal || right.join('') === goal) return count;

    // 현재 위치에서 가능한 다음 상태를 모두 구하기(이동, 회전)
    const nextPosition = getNextPosition(left, right, newBoard);
    for (const next of nextPosition) {
      const [next_left, next_right] = next;
      const key = next_left.join('') + next_right.join('');
      if (!visit.has(key)) {
        queue.push([next_left, next_right, count + 1]);
        visit.add(key);
      }
    }
  }
  // return answer;
}
