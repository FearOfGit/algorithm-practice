function solution(s) {
  var answer = [];

  s = s.split('},{');
  s[0] = s[0].replace('{{', '');
  s[s.length - 1] = s[s.length - 1].replace('}}', '');
  s.sort((a, b) => a.length - b.length);
  s.map((el) => {
    let arr = el.split(',');
    arr.map((a) => {
      if (!answer.includes(Number(a))) answer.push(Number(a));
    });
  });
  return answer;
}
