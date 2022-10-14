function solution(answers) {
  const answer = [];
  const score = [0, 0, 0];
  const pattern = [
    [1, 2, 3, 4, 5], // 5
    [2, 1, 2, 3, 2, 4, 2, 5], // 8
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5], // 10
  ];

  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === pattern[0][i % 5]) score[0]++;
    if (answers[i] === pattern[1][i % 8]) score[1]++;
    if (answers[i] === pattern[2][i % 10]) score[2]++;
  }

  const max = Math.max(...score);

  score.map((v, i) => {
    if (v === max) answer.push(i + 1);
  });
  return answer;
}
