function solution(array, commands) {
  const answer = [];

  commands.forEach(([i, j, k]) => {
    let temp = array.slice(i - 1, j).sort((a, b) => a - b);
    answer.push(temp[k - 1]);
  });
  return answer;
}
