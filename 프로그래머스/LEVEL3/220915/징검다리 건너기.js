// 아분탐색 -> 성공
// 구현 -> 미흡
// 다리 사이의 거리 구하기 부분
function solution(stones, k) {
  let left = 1;
  let right = 200000000;

  function isValid(mid) {
    let cnt = 0;
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] < mid) {
        cnt++;
      } else {
        cnt = 0;
      }
      if (cnt >= k) return false;
    }

    return true;
  }

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (isValid(mid)) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return right;
}
