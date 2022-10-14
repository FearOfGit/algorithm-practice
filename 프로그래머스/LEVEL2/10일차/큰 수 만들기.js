function solution(number, k) {
  const stack = [];
  number = number.split('');

  let cnt = 0;
  number.forEach((num) => {
    while (
      stack.length &&
      cnt < k &&
      Number(stack[stack.length - 1]) < Number(num)
    ) {
      cnt++;
      stack.pop();
    }

    stack.push(num);
  });

  for (let i = cnt; i < k; i++) {
    stack.pop();
  }

  return stack.join('');
}
