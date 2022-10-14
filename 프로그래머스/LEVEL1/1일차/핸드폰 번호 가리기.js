function solution(phone_number) {
  // 자바스크립트 정규표현식 이용
  // ?= 앞쪽일치
  return phone_number.replace(/\d(?=\d{4})/g, '*');
}
