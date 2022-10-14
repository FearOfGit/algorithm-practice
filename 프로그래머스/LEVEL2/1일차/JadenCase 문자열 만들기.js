function solution(s) {
  s = s.toLowerCase();

  return s
    .split(' ')
    .map((str) => str.substring(0, 1).toUpperCase() + str.substring(1))
    .join(' ');
}
