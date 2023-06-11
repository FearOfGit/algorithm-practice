// 배열 90도 돌리기 (오른쪽), 행과 열 다를 때
function rotate() {
  const arr = Array.from({ length: 10 }, () => Array(10));

  for (let i = 0; i < C; i++) {
    for (let j = 0; j < R; j++) {
      arr[i][R - 1 - j] = sticker[j][i];
    }
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      sticker[i][j] = arr[i][j];
    }
  }

  const temp = R;
  R = C;
  C = temp;
}
