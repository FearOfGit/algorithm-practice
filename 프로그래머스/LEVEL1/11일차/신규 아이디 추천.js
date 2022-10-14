// toLowerCase
// [^\w-_.]
function solution(new_id) {
  let answer = new_id
    .toLowerCase()
    .replace(/[^\w-_.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace(/^\.|\.$/g, '')
    .replace(/^$/, 'a')
    .slice(0, 15)
    .replace(/\.$/, '');

  const len = answer.length;
  return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);
}
