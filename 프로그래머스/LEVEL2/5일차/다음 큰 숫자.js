function solution(n) {
  const len = n
    .toString(2)
    .split('')
    .filter((v) => v === '1').length;

  for (let i = n + 1; i <= 1000000; i++) {
    const temp = i
      .toString(2)
      .split('')
      .filter((v) => v === '1').length;

    if (len === temp) return i;
  }
}
