function solution(s) {
  let n = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? s[n - 1] + s[n] : s[n];
}
