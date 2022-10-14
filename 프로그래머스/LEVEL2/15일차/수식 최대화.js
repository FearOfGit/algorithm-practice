function solution(expression) {
  var answer = [];
  const priority = [
    ['+', '-', '*'],
    ['+', '*', '-'],
    ['-', '+', '*'],
    ['-', '*', '+'],
    ['*', '+', '-'],
    ['*', '-', '+'],
  ];

  for (let opArr of priority) {
    let temp = expression.split(/(\D)/);
    for (let op of opArr) {
      while (temp.includes(op)) {
        let idx = temp.indexOf(op);
        temp.splice(idx - 1, 3, eval(temp.slice(idx - 1, idx + 2).join('')));
      }
    }

    answer.push(Math.abs(temp[0]));
  }

  return Math.max(...answer);
}
