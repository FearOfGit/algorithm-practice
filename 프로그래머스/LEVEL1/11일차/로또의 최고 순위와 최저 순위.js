function solution(lottos, win_nums) {
  const answer = [];
  let win_Count = 0;
  let zero_Count = 0;

  lottos.map((num) => {
    if (win_nums.includes(num)) win_Count++;
    if (num === 0) zero_Count++;
  });

  const total = win_Count + zero_Count;
  answer.push(total >= 2 ? 7 - total : 6);
  answer.push(win_Count >= 2 ? 7 - win_Count : 6);
  return answer;
}
