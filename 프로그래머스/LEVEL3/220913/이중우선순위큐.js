/*
    우선순위 큐
    insert - 삽입 후 정렬
*/
function solution(operations) {
  const answer = [];
  for (let i = 0; i < operations.length; i++) {
    let [op, target] = operations[i].split(' ');
    target = Number(target);

    if (op === 'I') {
      answer.push(target);
      answer.sort((a, b) => a - b);
      continue;
    }

    if (op === 'D') {
      if (target === 1) answer.pop();
      else answer.shift();
      continue;
    }
  }
  if (answer.length === 0) return [0, 0];
  return [answer[answer.length - 1], answer[0]];
}
