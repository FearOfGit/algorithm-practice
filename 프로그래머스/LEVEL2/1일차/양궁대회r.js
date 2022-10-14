function solution(n, info) {
  let result = Array.from({ length: 11 }, () => 0);
  let max = 0;

  // count : 쏜 횟수, idx : 표적 점수
  function shot(peachScore, ryanScore, count, idx, scoreBoard) {
    if (n < count) return; // 화살 개수 초과

    if (idx > 10) {
      // 0부터 10까지 표적 계산 완료
      let scoreDiff = ryanScore - peachScore;

      if (max < scoreDiff) {
        scoreBoard[10] = n - count;
        max = scoreDiff;
        result = scoreBoard;
      }

      return;
    }

    if (n > count) {
      let board = [...scoreBoard];
      board[10 - idx] = info[10 - idx] + 1;

      shot(
        peachScore,
        ryanScore + idx,
        count + info[10 - idx] + 1,
        idx + 1,
        board
      );
    }

    if (info[10 - idx] > 0) {
      shot(peachScore + idx, ryanScore, count, idx + 1, scoreBoard);
    } else {
      shot(peachScore, ryanScore, count, idx + 1, scoreBoard);
    }
  }
  shot(0, 0, 0, 0, result);
  if (max <= 0) return [-1];
  else return result;
}
