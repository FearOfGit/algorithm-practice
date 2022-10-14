function solution(arr, divisor) {
  arr = arr.filter((v) => !(v % divisor));
  return arr.length !== 0 ? arr.sort((a, b) => a - b) : [-1];
}
