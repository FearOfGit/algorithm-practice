function solution(n) {
  var answer = 0;

  const three = n.toString(3);
  for (let i = 0; i < three.length; i++) {
    if (three[i] >= 1) {
      answer += three[i] * Math.pow(3, i);
    }
  }
  return answer;
}
