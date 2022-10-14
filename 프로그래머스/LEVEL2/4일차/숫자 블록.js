// 도로 전체 길이 : 1,000,000,000 (10억)
// 블록 번호(n) : 1 ~ 10,000,000번
// 약수 중 자기 자신을 제외한 최대값 -> n * 1은 하지 않기 때문에
function solution(begin, end) {
  const answer = new Array(end - begin + 1).fill(0);

  for (let i = begin; i <= end; i++) {
    answer[i - begin] = getNum(i);
  }

  if (begin === 1) answer[0] = 0;
  return answer;
}

// 자기 자신을 제외한 최대 약수 구하기
// 블록 번호는 1e7를 초과하면 안된다.
// 좌측의 약수를 통해 우측의 약수를 구할 수 있다.
function getNum(n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0 && n / i <= 1e7) {
      return n / i;
    }
  }

  return 1;
}
