function solution(n) {
  let answer = '';

  while (n > 0) {
    if (n % 3 === 1) {
      answer = '1' + answer;
      n = Math.floor(n / 3);
    } else if (n % 3 === 2) {
      answer = '2' + answer;
      n = Math.floor(n / 3);
    } else {
      answer = '4' + answer;
      n = n / 3 - 1;
    }
  }

  return answer;
}
