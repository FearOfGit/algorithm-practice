function solution(s) {
  const answer = [];

  for (const str of s) {
    const stack = [];
    let cnt = 0;

    for (const ch of str) {
      if (ch === '0' && stack.length > 1) {
        const second = stack.pop();
        const first = stack.pop();

        if (first === '1' && second === '1') {
          cnt++;
          continue;
        }
        stack.push(first, second, ch);
      } else {
        stack.push(ch);
      }
    }

    const arr = [];
    while (stack.length) {
      const target = stack.pop();

      if (target === '1') {
        arr.unshift(target);
      }

      if (target === '0') {
        stack.push(target);
        break;
      }
    }

    for (let i = 0; i < cnt; i++) {
      const temp = '110';
      stack.push(...temp);
    }
    stack.push(...arr);
    answer.push(stack.join(''));
  }
  return answer;
}
