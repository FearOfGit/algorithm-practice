/*
    규칙을 찾아보자
    1. 짝수일 경우 : num + 1
    2. 홀수일 경우 : 뒤에서 부터 '0'을 찾고 '10'
*/
// lastIndexOf 함수
// slice 함수
// parseInt 함수
function solution(numbers) {
  const answer = [];

  numbers.forEach((num) => {
    if (num % 2 === 0) {
      answer.push(num + 1);
    } else {
      let str = '0' + num.toString(2); // 자릿수 확장
      let index = str.lastIndexOf('0');
      answer.push(
        parseInt(`${str.slice(0, index)}10${str.slice(index + 2)}`, 2)
      );
    }
  });
  return answer;
}
