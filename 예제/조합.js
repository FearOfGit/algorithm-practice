// arr: 조합에 사용될 배열, n: 조합될 개수
const getCombination = (arr, n) => {
  // n이 1이 되는 겨우는 현재값을 선택하는 것과 동일
  // 이 경우 재귀가 종료되면 1부터 n으로 거슬러 올라가며 조합을 구성
  if (n === 1) return arr.map((el) => [el]);
  const result = [];

  arr.forEach((fixed, idx, origin) => {
    // 현재 고정값을 제외한 나머지 부분
    const rest = origin.slice(idx + 1);

    const combination = getCombination(rest, n - 1);

    const attached = combination.map((com) => [fixed, ...com]);

    result.push(...attached);
  });

  return result;
};

console.log(getCombination([1, 2, 3, 4], 3));
