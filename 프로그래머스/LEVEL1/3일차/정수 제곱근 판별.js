// Math.floor : 내림차순
// Math.sqrt : 루트
// Math.pow : n제곱
function solution(n) {
  let num = Math.floor(Math.sqrt(n));
  if (num * num === n) {
    return Math.pow(num + 1, 2);
  }
  return -1;
}
