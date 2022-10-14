// 슬라이드 윈도우 알고리즘
function solution(gems) {
  const cnt = new Set(gems).size;
  const map = new Map();
  let answer = [1, gems.length];

  gems.forEach((gem, i) => {
    map.delete(gem);
    map.set(gem, i);
    if (map.size === cnt) {
      const cand = [map.values().next().value + 1, i + 1];
      answer = answer[1] - answer[0] > cand[1] - cand[0] ? cand : answer;
    }
  });
  return answer;
}
