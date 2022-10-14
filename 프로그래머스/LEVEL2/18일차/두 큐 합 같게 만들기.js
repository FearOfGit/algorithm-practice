function solution(queue1, queue2) {
  let sum1 = sum(queue1);
  let sum2 = sum(queue2);

  let a = 0;
  let b = queue1.length;

  const target = (sum1 + sum2) / 2;
  const queue = [...queue1, ...queue2];
  const len = queue1.length * 3; // 두 큐의 길이가 같다

  // 한쪽의 값이 절반값이 되면 다른쪽도 절반값이 된다.
  for (let i = 0; i < len; i++) {
    if (sum1 === target) {
      return i;
    }

    if (sum1 > target) {
      sum1 -= queue[a++];
    } else {
      sum1 += queue[b++];
    }
  }
  return -1;
}

const sum = (arr) => arr.reduce((acc, cur) => acc + cur, 0);
