function solution(n, t, m, p) {
  let answer = '';
  const len = t * m;

  // 말해야 하는 숫자 * 인원수 만큼의 길이만 구해주면 됨
  let num = 0;
  while (answer.length < len) {
    answer += num.toString(n);
    num++;
  }

  answer = answer.substring(0, len);

  // 순서에 맞는 값: 인덱스 % 인원수 + 1
  return answer
    .split('')
    .filter((v, i) => (i % m) + 1 === p)
    .join('')
    .toUpperCase();
}
