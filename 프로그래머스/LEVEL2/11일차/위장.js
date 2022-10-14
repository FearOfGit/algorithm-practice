function solution(clothes) {
  let answer = 1;
  const map = {};

  clothes.forEach(([name, type]) => {
    if (map[type]) {
      map[type] += 1;
    } else {
      map[type] = 1;
    }
  });

  for (const key in map) {
    answer *= map[key] + 1;
  }
  return answer - 1;
}
