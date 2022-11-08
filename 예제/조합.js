// 1. 조합
const getCombination = (arr, n) => {
  if (n === 1) return arr.map((el) => [el]);
  const result = [];

  arr.forEach((fixed, idx, origin) => {
    const rest = origin.slice(idx + 1);
    const combination = getCombination(rest, n - 1);
    const attached = combination.map((com) => [fixed, ...com]);
    result.push(...attached);
  });

  return result;
};

// 2. 순열
const getPermutation = (arr, n) => {
  if (n === 1) return arr.map((el) => [el]);
  const result = [];

  arr.forEach((fixed, idx, origin) => {
    const rest = [...origin.slice(0, idx), ...origin.slice(idx + 1)];
    const permutation = getPermutation(rest, n - 1);
    const attached = permutation.map((per) => [fixed, ...per]);
    result.push(...attached);
  });

  return result;
};

// 3. 중복 순열
function permutation(arr, selectNum) {
  const result = [];
  if (selectNum === 1) return arr.map((v) => [v]);

  arr.forEach((v, idx, arr) => {
    const fixed = v;
    const restArr = arr;
    const permutationArr = permutation(restArr, selectNum - 1);
    const combineFix = permutationArr.map((v) => [fixed, ...v]);
    result.push(...combineFix);
  });
  return result;
}
