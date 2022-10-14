// reduce 함수
function solution(n) {
  return n
    .toString()
    .split('')
    .reduce((acc, cur) => acc + Number(cur), 0);
}
