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

console.log(getPermutation([1, 2, 3, 4], 3).length);
