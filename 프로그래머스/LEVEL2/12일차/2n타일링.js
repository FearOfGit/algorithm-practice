function solution(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;

  const arr = [];
  arr[1] = 1;
  arr[2] = 2;

  for (let i = 3; i <= n; i++) {
    arr[i] = (arr[i - 2] + arr[i - 1]) % 1000000007;
  }
  return arr[n];
}
