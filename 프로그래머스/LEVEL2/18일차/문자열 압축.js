function solution(s) {
  let answer = 1000;
  const len = s.length;

  for (let i = 0; i < len; i++) {
    let cnt = 1;
    let num = i + 1;
    let newStr = '';

    for (let j = 0; j < len; j += num) {
      let str1 = s.substring(j, j + num);
      let str2 = s.substring(j + num, j + num + num);

      if (str1 === str2) {
        cnt++;
      } else {
        newStr += cnt > 1 ? cnt + str1 : str1;
        cnt = 1;
      }
    }

    answer = Math.min(answer, newStr.length);
  }
  return answer;
}
