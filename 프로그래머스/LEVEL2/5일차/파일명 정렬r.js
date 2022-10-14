// \D : /[^0-9]/
// \d : /[0-9]/
// 문자열 비교 : localeCompare()
// match 함수 : 배열을 리턴
function solution(files) {
  return files.sort((a, b) => {
    // 1. HEAD 문자열 비교
    const headA = a.match(/^\D+/)[0].toLowerCase();
    const headB = b.match(/^\D+/)[0].toLowerCase();

    if (headA !== headB) {
      return headA.localeCompare(headB);
    }

    // 2. NUMBER 비교
    const numberA = Number(a.match(/\d+/)[0]);
    const numberB = Number(b.match(/\d+/)[0]);

    return numberA - numberB;
  });
}
