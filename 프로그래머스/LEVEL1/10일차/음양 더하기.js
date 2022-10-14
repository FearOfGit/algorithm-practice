function solution(absolutes, signs) {
  var answer = 0;

  signs.map((sign, i) => {
    sign ? (answer += absolutes[i]) : (answer -= absolutes[i]);
  });
  return answer;
}
