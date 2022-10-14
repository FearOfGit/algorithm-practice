// 이중 map
function solution(s) {
  return s
    .split(' ')
    .map((word) =>
      word
        .split('')
        .map((v, i) => (i % 2 === 0 ? v.toUpperCase() : v.toLowerCase()))
        .join('')
    )
    .join(' ');
}

// 다른 사람의 풀이

/*
  각 단어의 개수가 짝수개이면 짝이 맞아 떨어지고
  홀수개이면 짝이 맞아 떨어지지 않는다.
*/
return s.toUpperCase().replace(/(\w)(\w)/g, function (a) {
  return a[0].toUpperCase() + a[1].toLowerCase();
});
