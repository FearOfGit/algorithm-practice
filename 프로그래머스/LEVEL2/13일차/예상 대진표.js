/*
  N = 8, A = 4, B = 7

  1 : A는 2이 되고 B는 4가 된다.
  2 : A는 1이 되고 B는 2가 된다.
  3 : A는 1이 되고 B는 1이 된다.

  -> 3
*/

function solution(n, a, b) {
  var answer = 0;

  while (a !== b) {
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    answer++;
  }

  return answer;
}
