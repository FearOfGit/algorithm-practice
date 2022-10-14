function solution(arr) {
  let score = 0;
  let answer = [0];
  let temp = 0;

  for (let i = 0; i < arr.length; i++) {
    // 숫자 표현
    if (arr[i] >= 0 && arr[i] <= 9) {
      if (arr[i] === '1' && arr[i + 1] === '0') {
        temp = 10;
        i++;
      } else {
        temp = arr[i];
      }
    } else if (arr[i] === 'S') {
      answer.push(temp);
    } else if (arr[i] === 'D') {
      answer.push(temp * temp);
    } else if (arr[i] === 'T') {
      answer.push(temp * temp * temp);
    } else if (arr[i] === '#') {
      answer[answer.length - 1] *= -1;
    } else if (arr[i] === '*') {
      answer[answer.length - 1] *= 2;
      answer[answer.length - 2] *= 2;
    }
  }
  for (let i = 1; i < answer.length; i++) {
    score += Number(answer[i]);
  }
  return score;
}
