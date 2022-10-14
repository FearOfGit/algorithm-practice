function solution(arr) {
  const answer = [0, 0];
  const size = arr.length;
  quad(arr, size, answer, [0, 0]);
  return answer;
}

// 재귀함수의 종료조건 -> size === 1, 영역이 모두 같은 값일 때
// 재귀는 항상 4등분으로 수행이 된다.
function quad(arr, size, answer, start) {
  const first = arr[start[0]][start[1]];
  if (size === 1) {
    first === 0 ? (answer[0] += 1) : (answer[1] += 1);
    return;
  }

  const half = size / 2;
  let flag = true;

  for (let i = start[0]; i < start[0] + size; i++) {
    for (let j = start[1]; j < start[1] + size; j++) {
      if (first !== arr[i][j]) {
        flag = false;
        break;
      }
    }
    if (!flag) break;
  }

  if (flag) {
    first === 0 ? (answer[0] += 1) : (answer[1] += 1);
    return;
  }

  quad(arr, half, answer, start);
  quad(arr, half, answer, [start[0], start[1] + half]);
  quad(arr, half, answer, [start[0] + half, start[1]]);
  quad(arr, half, answer, [start[0] + half, start[1] + half]);
}
