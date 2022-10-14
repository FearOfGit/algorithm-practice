// split, join
function solution(s) {
  const arr = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];

  arr.map((num, i) => {
    s = s.split(num);
    s = s.join(i);
  });

  return Number(s);
}
