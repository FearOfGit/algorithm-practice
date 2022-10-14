function solution(p) {
  if (p === '') return '';

  let left_cnt = 0;
  let right_cnt = 0;
  let u = '';
  let v = '';
  for (let i = 0; i < p.length; i++) {
    if (p[i] === '(') left_cnt++;
    if (p[i] === ')') right_cnt++;

    if (left_cnt === right_cnt) {
      u = p.substring(0, i + 1);
      v = p.substring(i + 1, p.length);
      break;
    }
  }

  if (isGood(u)) {
    return u + solution(v);
  } else {
    let temp = '(' + solution(v) + ')';
    u = u
      .substring(1, u.length - 1)
      .split('')
      .map((el) => (el === '(' ? ')' : '('))
      .join('');
    return temp + u;
  }
}

function isGood(u) {
  let arr = u.split('');
  let stack = [];

  for (let i = 0; i < arr.length; i++) {
    if (
      stack.length >= 1 &&
      stack[stack.length - 1] === '(' &&
      arr[i] === ')'
    ) {
      stack.pop();
    } else {
      stack.push(arr[i]);
    }
  }

  return stack.length === 0 ? true : false;
}
