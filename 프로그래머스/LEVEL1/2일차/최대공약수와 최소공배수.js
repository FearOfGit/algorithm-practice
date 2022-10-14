function solution(n, m) {
  const max = Math.max(n, m);
  const min = Math.min(n, m);

  // 유클리드 호제 알고리즘 -> 최대공약수 구하는 알고리즘
  const greatest = (a, b) => {
    if (b === 0) return a;
    return greatest(b, a % b);
  };

  const least = (a, b) => {
    return (a * b) / greatest(a, b);
  };

  return [greatest(max, min), least(max, min)];
}
