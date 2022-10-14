function solution(A, B) {
  let answer = 0;
  let left = 0;
  const len = A.length;

  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);

  for (let i = 0; i < len; i++) {
    if (A[left] < B[i]) {
      left++;
      answer++;
    }
  }
  return answer;
}
