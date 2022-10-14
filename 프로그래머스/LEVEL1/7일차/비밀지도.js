function solution(n, arr1, arr2) {
  var answer = [];

  for (let i = 0; i < arr1.length; i++) {
    let temp1 = arr1[i].toString(2);
    let temp2 = arr2[i].toString(2);
    while (temp1.length < n) temp1 = '0' + temp1;
    while (temp2.length < n) temp2 = '0' + temp2;

    let str = '';
    for (let j = 0; j < n; j++) {
      if (temp1[j] === '1' || temp2[j] === '1') {
        str += '#';
      } else {
        str += ' ';
      }
    }
    answer.push(str);
  }
  return answer;
}
