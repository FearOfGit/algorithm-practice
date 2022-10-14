function solution(n) {
  n = String(n); // 문자열로 변환
  return Number(
    n
      .split('')
      .sort((a, b) => b - a)
      .join('')
  );
}
