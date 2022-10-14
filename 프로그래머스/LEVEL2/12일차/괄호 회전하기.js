// 최적화
function solution(s) {
  const arr = s.split('');
  let answer = 0;

  // 검사 - 회전 순으로 코드를 작성하면 더 깔끔하게 풀 수 있다.
  for (let i = 0; i < s.length; i++) {
    if (isValid(arr)) answer++;
    arr.push(arr.shift());
  }

  return answer;
}

function isValid(arr) {
  const pair = { '}': '{', ']': '[', ')': '(' };
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    let tar = arr[i];
    if (!pair[tar]) stack.push(tar);
    else {
      if (stack[stack.length - 1] !== pair[tar]) return false;
      stack.pop();
    }
  }
  if (stack.length) return false;
  return true;
}
