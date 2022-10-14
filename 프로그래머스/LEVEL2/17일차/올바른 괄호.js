function solution(s) {
  if (s.length % 2 !== 0) return false;
  let answer = 0;
  for (let target of s) {
    answer += target === '(' ? 1 : -1;
    if (answer < 0) return false;
  }
  return answer === 0 ? true : false;
}
