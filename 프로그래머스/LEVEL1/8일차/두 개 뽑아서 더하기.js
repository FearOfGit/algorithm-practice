// filter, indexOf
function solution(numbers) {
  const answer = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i === j) continue;
      answer.push(numbers[i] + numbers[j]);
    }
  }
  return answer.filter((v, i) => answer.indexOf(v) === i).sort((a, b) => a - b);
}
