// 공백도 고려
// 90 초과 (대문자 Z의 아스키 코드가 90) -> -26(알파벳 개수)
// v.charCodeAt : 문자의 아스키코드
// String.fromCharCode : 아스키코드 -> 문자
function solution(s, n) {
  return s
    .split('')
    .map((v) => {
      if (v === ' ') return v;
      const temp = v.charCodeAt();
      return v.toUpperCase().charCodeAt() + n > 90
        ? String.fromCharCode(temp + n - 26)
        : String.fromCharCode(temp + n);
    })
    .join('');
}
