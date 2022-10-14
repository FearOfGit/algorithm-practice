// ^: 시작, $: 끝, \d: 숫자, | : or
// test : true 또는 false 반환

function solution(s) {
  let regex = /^\d{4}$|^\d{6}$/;

  return regex.test(s);
}
