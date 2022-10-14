// 현재 위치를 기준으로
// 양 옆의 최소값이 모두 자기 자신보다 작으면 살아남지 못한다.
function solution(a) {
  const size = a.length;
  const left = new Array(size);
  const right = new Array(size);

  left[0] = a[0];
  right[size - 1] = a[size - 1];

  for (let i = 1; i < size; i++) {
    left[i] = Math.min(left[i - 1], a[i]);
  }
  for (let i = size - 2; i >= 0; i--) {
    right[i] = Math.min(right[i + 1], a[i]);
  }

  const set = new Set();
  for (let i = 0; i < size; i++) {
    set.add(left[i]);
    set.add(right[i]);
  }
  return set.size;
}
