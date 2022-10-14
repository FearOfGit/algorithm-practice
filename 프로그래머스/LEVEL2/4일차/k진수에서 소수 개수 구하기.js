function solution(n, k) {
  let answer = 0;
  const arr = n.toString(k).split('0');

  arr.forEach((v) => {
    if (v === '' || v === '1') return;
    if (isPrime(Number(v))) answer++;
  });
  return answer;
}

function isPrime(num) {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
