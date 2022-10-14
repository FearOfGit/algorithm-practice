function solution(nums) {
  const half = nums.length / 2;
  const noDup = new Set(nums).size; // 해시 대신 집합 사용 가능
  return Math.min(half, noDup);
}
