function solution(sizes) {
  const answer = [0, 0];
  sizes = sizes.map(([w, h]) => (w < h ? [h, w] : [w, h]));

  for (let i = 0; i < sizes.length; i++) {
    let [w, h] = sizes[i];

    answer[0] = Math.max(w, answer[0]);
    answer[1] = Math.max(h, answer[1]);
  }
  return answer[0] * answer[1];
}
