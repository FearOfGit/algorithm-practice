/*
  1. brown + yellow -> 카펫의 총 크기를 구할 수 있다.
  2. height를 키워가며 완전 탐색을 수행
    - 최소값은 3이다. (yellow 격자가 1개일 때 높이는 3)
  3. sum / height를 수행하면 weight를 구할 수 있다.
    - 사각형 넓이 구하는 공식
  4. weight과 height의 테두리 제거(-2) 한 값이 yellow 격자의 개수와 같을 때 정답
*/
function solution(brown, yellow) {
  let sum = brown + yellow;

  for (let height = 3; height <= brown; height++) {
    if (sum % height === 0) {
      let weight = sum / height;

      if ((height - 2) * (weight - 2) === yellow) {
        return [weight, height];
      }
    }
  }
}
