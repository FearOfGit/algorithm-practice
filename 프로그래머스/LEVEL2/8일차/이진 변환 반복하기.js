function solution(s) {
  const answer = [0, 0];

  while (true) {
    if (s === '1') break;
    answer[0]++;
    let len = s.length;
    s = s
      .split('')
      .filter((v) => v === '1')
      .join('');

    answer[1] += len - s.length;
    s = s.length.toString(2);
  }
  return answer;
}
