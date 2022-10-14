function solution(left, right) {
  let answer = 0;

  for (let i = left; i <= right; i++) {
    isEven(i) ? (answer += i) : (answer -= i);
  }
  return answer;
}

function isEven(num) {
  let count = 0;
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) count++;
  }

  return count % 2 === 0 ? true : false;
}
